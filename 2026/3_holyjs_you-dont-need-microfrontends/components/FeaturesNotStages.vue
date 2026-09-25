<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { computed } from 'vue'

/**
 * «Это не этапы, а независимые решения».
 * Доклад идёт по порядку — модули, монорепо, реестр, микрофронтенды — и это легко
 * прочитать как лестницу к «серьёзному проекту». Слайд ломает лестницу:
 * каждая часть — ответ на своё требование, и их берут в любых сочетаниях.
 *
 *   0 — лестница строится на глазах: ступень → стрелка → следующая ступень → «серьёзный проект»
 *   1 — лестница рассыпается в ряд, у каждого решения появляется требование, на которое оно отвечает
 *   2 — реальные проекты: только модули; модули в репозиториях через реестр
 *   3 — микрофронтенды внутри монорепо и микрофронтенды без модулей и монорепо
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(3, step)))

const features = [
  { name: 'Модули', need: 'нужны границы ответственности', color: '#34d399' },
  { name: 'Монорепо', need: 'нужны свои пайплайны', color: '#60a5fa' },
  { name: 'Реестр пакетов', need: 'нужна независимая публикация', color: '#f472b6' },
  { name: 'Микрофронтенды', need: 'нужна сборка в рантайме', color: '#fbbf24' },
]

// лестница: снизу слева вверх направо; на ступенях блок низкий — только название
const STAIR_H = 50
const ROW_H = 86
const STAIR = features.map((_, i) => ({ x: 100 + i * 192, y: 310 - i * 76 }))
// ряд независимых решений: колонки над матрицей проектов
const COL_X = 200
const COL_W = 190
const ROW = features.map((_, i) => ({ x: COL_X + i * COL_W, y: 76 }))
const BLOCK_W = 186

const projects = [
  { name: 'Монолит с модулями', has: [1, 0, 0, 0], at: 2 },
  { name: 'Модули по репозиториям', has: [1, 0, 1, 0], at: 2 },
  { name: 'Микрофронтенды в монорепо', has: [1, 1, 0, 1], at: 3 },
  { name: 'Микрофронтенды из разных репо', has: [0, 0, 0, 1], at: 3 },
]

/** порядковый номер проекта среди появившихся на том же шаге — для очереди */
const queue = (r: number) => projects.slice(0, r).filter(p => p.at === projects[r].at).length

const titles = ['Похоже на эволюцию?', 'Не этапы, а независимые решения']
const captions = [
  'Мы шли по порядку, и это легко принять за лестницу к «серьёзному» проекту',
  'Каждое решение — ответ на своё требование, а не следующая ступень',
  'Их берут по отдельности: модулям не нужны ни монорепо, ни микрофронтенды',
  'И в любых сочетаниях: микрофронтенды отлично живут внутри монорепо',
]

/*
 * Стрелки лестницы в координатах сцены: из середины верха ступени вверх
 * и направо — в середину левого края следующей ступени.
 */
const R = 10
const arrows = STAIR.slice(0, -1).map((a, i) => {
  const b = STAIR[i + 1]
  const sx = a.x + BLOCK_W / 2
  const cy = b.y + STAIR_H / 2
  return `M ${sx} ${a.y} V ${cy + R} Q ${sx} ${cy} ${sx + R} ${cy} H ${b.x - 3}`
})
const TOP = STAIR[STAIR.length - 1]
const SUMMIT_Y = TOP.y - 44
const summitArrow = `M ${TOP.x + BLOCK_W / 2} ${TOP.y} V ${SUMMIT_Y + 3}`

// хореография построения: ступень, затем стрелка к следующей
const STEP_T = 0.9
const blockDelay = (i: number) => i * STEP_T
const arrowDelay = (i: number) => i * STEP_T + 0.4

// Slidev заранее рендерит соседние слайды — строим лестницу только когда слайд на экране
const { $renderContext } = useSlideContext()
const active = useIsSlideActive()
const waiting = computed(() => $renderContext.value === 'slide' && !active.value)

const state = (i: number) => (i === s.value ? 'mf-on' : i < s.value ? 'mf-out' : 'mf-off')
</script>

<template>
  <div class="fns" :class="{ 'is-broken': s >= 1, 'is-waiting': waiting }">
    <div class="fns__titles">
      <h1 :class="state(0)">
        {{ titles[0] }}
      </h1>
      <h1 :class="s >= 1 ? 'mf-on' : 'mf-off'">
        {{ titles[1] }}
      </h1>
    </div>

    <div class="fns__stage">
      <!-- стрелки между ступенями и «вершина» лестницы: гаснут, когда лестница ломается -->
      <svg class="stairs" aria-hidden="true">
        <defs>
          <marker id="fns-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(255 255 255 / 0.6)" />
          </marker>
        </defs>
        <g v-for="(d, i) in [...arrows, summitArrow]" :key="i">
          <path class="stairs__arrow" :d="d" pathLength="1" :style="{ animationDelay: `${arrowDelay(i)}s` }" />
          <!-- наконечник отдельно: появляется, когда линия дорисовалась -->
          <path class="stairs__head" :d="d" marker-end="url(#fns-head)" :style="{ animationDelay: `${arrowDelay(i) + 0.4}s` }" />
        </g>
      </svg>
      <span
        class="summit"
        :style="{ left: `${TOP.x + BLOCK_W / 2}px`, top: `${SUMMIT_Y}px`, animationDelay: `${arrowDelay(3) + 0.4}s` }"
      >
        «серьёзный» проект
      </span>

      <!-- решения: ступени лестницы → независимые колонки -->
      <div
        v-for="(f, i) in features"
        :key="f.name"
        class="feat"
        :style="{
          '--c': f.color,
          '--i': i,
          'width': `${BLOCK_W}px`,
          'height': `${s >= 1 ? ROW_H : STAIR_H}px`,
          'left': `${(s >= 1 ? ROW : STAIR)[i].x}px`,
          'top': `${(s >= 1 ? ROW : STAIR)[i].y}px`,
          'animationDelay': `${blockDelay(i)}s`,
        }"
      >
        <small class="feat__need">{{ f.need }}</small>
        <b>{{ f.name }}</b>
      </div>

      <!-- проекты: какие решения в них включены -->
      <div
        v-for="(p, r) in projects"
        :key="p.name"
        class="proj"
        :class="{ 'is-on': s >= p.at }"
        :style="{ 'top': `${196 + r * 56}px`, '--d': `${queue(r) * 0.35}s` }"
      >
        <span class="proj__name">{{ p.name }}</span>
        <span
          v-for="(on, i) in p.has"
          :key="i"
          class="dot"
          :class="{ 'is-lit': on }"
          :style="{ 'left': `${COL_X + i * COL_W + BLOCK_W / 2}px`, '--c': features[i].color, '--k': i }"
        />
      </div>
    </div>

    <div class="fns__captions">
      <div v-for="(text, i) in captions" :key="i" :class="state(i)">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.fns {
  position: absolute;
  inset: 0;
  padding: 40px 0 36px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.fns__titles,
.fns__captions {
  display: grid;
  padding: 0 50px;

  & > * {
    grid-area: 1 / 1;
    transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
  }
}

.fns__titles h1 {
  margin: 0;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.fns__captions {
  margin-top: auto;
  font-size: 20px;
  line-height: 1.3;
  text-shadow: 0 2px 16px rgb(0 0 0 / 0.8);
}

.fns__stage {
  position: relative;
  flex: none;
  height: 410px;
}

/* ── лестница ───────────────────────────────────────────────────── */
.stairs {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.8s ease;
}

/* стрелка «прорастает» от ступени к следующей; наконечник — маркер, проявляется в конце */
.stairs__arrow {
  fill: none;
  stroke: rgb(255 255 255 / 0.5);
  stroke-width: 1.5;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: draw 0.45s ease-out backwards;
}

.stairs__head {
  fill: none;
  stroke: none;
  stroke-width: 1.5;
  animation: fade 0.15s ease backwards;
}

.summit {
  position: absolute;
  translate: -50% -100%;
  font-size: 16px;
  font-style: italic;
  color: rgb(255 255 255 / 0.75);
  white-space: nowrap;
  transition: opacity 0.4s ease, transform 0.8s ease;
  animation: appear 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.is-broken .stairs,
.is-broken .summit {
  opacity: 0;
  transform: translateY(30px);
}

/* ── решение ────────────────────────────────────────────────────── */
.feat {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  overflow: hidden;
  padding: 10px 12px 12px;
  border-radius: 12px;
  border: 1.5px solid var(--c);
  background: color-mix(in oklab, var(--c) 16%, rgb(10 10 20 / 0.82));
  backdrop-filter: blur(8px);
  animation: appear 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  /* перестройка из лестницы в ряд — с небольшой очередью, ступени «разлетаются» */
  transition:
    left 1s cubic-bezier(0.65, 0, 0.35, 1) calc(0.25s + var(--i) * 0.08s),
    top 1s cubic-bezier(0.65, 0, 0.35, 1) calc(0.25s + var(--i) * 0.08s),
    height 0.5s cubic-bezier(0.65, 0, 0.35, 1) calc(1.05s + var(--i) * 0.08s);

  & b {
    flex: none;
    font-size: 17px;
    font-weight: 700;
    white-space: nowrap;
  }
}

/* требование: на ступени спрятано, в ряду проявляется, когда блок вырос */
.feat__need {
  flex: none;
  font-size: 13px;
  line-height: 1.25;
  color: color-mix(in oklab, var(--c) 70%, white);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.is-broken .feat__need {
  opacity: 1;
  transform: none;
  transition-delay: 1.4s;
}

/* слайд ещё не на экране: лестница не построена, анимации не идут */
.is-waiting {
  & .feat,
  & .stairs__arrow,
  & .stairs__head,
  & .summit {
    animation: none;
    opacity: 0;
  }
}

/* ── проекты ────────────────────────────────────────────────────── */
.proj {
  position: absolute;
  left: 0;
  right: 0;
  height: 0;

  &::before {
    content: '';
    position: absolute;
    left: 50px;
    right: 50px;
    top: 0;
    border-top: 1px solid rgb(255 255 255 / 0.1);
    opacity: 0;
    transition: opacity 0.5s ease var(--d);
  }

  &.is-on::before {
    opacity: 1;
  }
}

.proj__name {
  position: absolute;
  left: 50px;
  top: 0;
  width: 140px;
  translate: 0 -50%;
  font-size: 15px;
  line-height: 1.2;
  opacity: 0;
  transform: translateX(-16px);
  filter: blur(6px);
  transition: opacity 0.5s ease var(--d), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d), filter 0.5s ease var(--d);
}

.proj.is-on .proj__name {
  opacity: 1;
  transform: none;
  filter: none;
}

.dot {
  position: absolute;
  top: 0;
  width: 14px;
  height: 14px;
  translate: -50% -50%;
  border-radius: 50%;
  border: 1.5px solid rgb(255 255 255 / 0.22);
  opacity: 0;
  scale: 0.3;
  transition:
    opacity 0.35s ease calc(var(--d) + 0.3s + var(--k) * 0.08s),
    scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--d) + 0.3s + var(--k) * 0.08s);

  &.is-lit {
    width: 20px;
    height: 20px;
    border-color: var(--c);
    background: var(--c);
    box-shadow: 0 0 14px color-mix(in oklab, var(--c) 70%, transparent);
  }
}

.proj.is-on .dot {
  opacity: 1;
  scale: 1;
}
@keyframes draw {
  from { stroke-dashoffset: 1; }
}

@keyframes fade {
  from { opacity: 0; }
}

@keyframes appear {
  from { opacity: 0; transform: translateY(14px) scale(0.96); }
}
</style>
