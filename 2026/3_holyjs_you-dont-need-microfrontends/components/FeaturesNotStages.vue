<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { computed, ref, watch } from 'vue'

/**
 * «Это не этапы, а независимые решения» — требования включают решения.
 * Доклад идёт по порядку — модули, монорепо, реестр, микрофронтенды — и это легко прочитать как
 * лестницу к «серьёзному проекту». Слайд показывает обратное: сверху требования (фичи) с тумблерами,
 * ниже — решения, которые каждое из них включает, и проект, получившийся из включённого.
 * Раскладка не двигается: меняются только положения тумблеров, подсветка решений и подпись проекта.
 *
 *   0 — «эволюция»: решения по очереди проявляются слева направо со стрелками, шкала «Серьёзность проекта»
 *       заполняется слева направо (требований пока не видно)
 *   1 — появляются требования с выключенными тумблерами, решения гаснут
 *   2 — граница ответственности → монолит с модулями
 *   3 — границы + независимая публикация → модули по репозиториям (монорепо не нужно)
 *   4 — границы + пайплайны + рантайм → микрофронтенды в монорепо
 *   5 — только сборка в рантайме → микрофронтенды отдельными приложениями
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(5, step)))

const features = [
  { need: 'Границы ответственности', name: 'Модули', color: '#34d399' },
  { need: 'Свои пайплайны', name: 'Монорепо', color: '#60a5fa' },
  { need: 'Независимая публикация', name: 'Реестр пакетов', color: '#f472b6' },
  { need: 'Сборка в рантайме', name: 'Микрофронтенды', color: '#fbbf24' },
]

/** какие требования включены на шагах 1…5 и что получилось */
const configs: { has: number[], name: string }[] = [
  { has: [0, 0, 0, 0], name: 'Каждое решение — ответ на своё требование' },
  { has: [1, 0, 0, 0], name: 'Монолит с модулями' },
  { has: [1, 0, 1, 0], name: 'Модули по репозиториям' },
  { has: [1, 1, 0, 1], name: 'Микрофронтенды в монорепо' },
  { has: [0, 0, 0, 1], name: 'Микрофронтенды из разных репо' },
]

// общие имена с MfeTrilemma (следующий слайд): плитки и плашка морфятся в тумблеры и шину
const vt = (name: string) => ({ viewTransitionName: name, viewTransitionClass: 'x-site' })

const titles = ['Похоже на эволюцию?', 'Не этапы, а независимые решения']

/** на шаге 0 решения проявляются по очереди — «путь по докладу» */
const STEP_T = 0.9
const PATH_S = STEP_T * features.length

/*
 * Анимация эволюции должна играть при каждом входе на слайд. Slidev рендерит соседние слайды заранее,
 * а на открытом слайде первый кадр сразу финальный — transition не стартует. Поэтому «запуск» —
 * отдельный флаг: сбрасывается, пока слайд не активен, и поднимается через пару кадров после входа.
 */
const { $renderContext } = useSlideContext()
const active = useIsSlideActive()
const started = ref($renderContext.value !== 'slide')
watch(active, (a) => {
  if ($renderContext.value !== 'slide')
    return
  started.value = false
  if (a)
    requestAnimationFrame(() => requestAnimationFrame(() => started.value = true))
}, { immediate: true })

const isOn = (i: number) => s.value >= 1 && configs[s.value - 1].has[i] === 1
/** решение подсвечено: на шаге 0 — когда до него дошла очередь, дальше — если включено его требование */
const lit = (i: number) => started.value && (s.value === 0 || isOn(i))
/** на шаге 0 решения ещё не «пришли»; со второго шага стоят на местах (тусклые, если не включены) */
const shown = (i: number) => s.value >= 1 || started.value
const delay = (i: number) => s.value === 0 ? 0.3 + i * STEP_T : i * 0.07
const state = (i: number) => (i === Math.min(s.value, 1) ? 'mf-on' : 'mf-off')
</script>

<template>
  <div class="fns" :class="{ 'is-evolution': s === 0, 'is-started': started }">
    <div class="fns__titles">
      <h1 :class="state(0)">
        {{ titles[0] }}
      </h1>
      <h1 :class="state(1)">
        {{ titles[1] }}
      </h1>
    </div>

    <div class="board">
      <!-- ряд 1: требования с тумблерами (на шаге 0 их ещё нет) -->
      <template v-for="(f, i) in features" :key="`n${f.need}`">
        <div
          class="need hud-frame hud-sm hud-solid"
          :class="{ 'is-lit': isOn(i), 'is-shown': s >= 1 }"
          :style="{ '--hud-c': f.color, '--c': f.color, 'grid-column': i * 2 + 1, 'transition-delay': `${s >= 1 ? 0.15 + i * 0.07 : 0}s`, ...vt(`x-tg-t${i}`) }"
        >
          <span class="need__toggle" aria-hidden="true"><i /></span>
          <b>{{ f.need }}</b>
        </div>
      </template>

      <!-- провода: требование → решение -->
      <span
        v-for="(f, i) in features"
        :key="`w1${f.name}`"
        class="wire wire--top"
        :class="{ 'is-lit': isOn(i) }"
        :style="{ '--c': f.color, '--i': i }"
      />

      <!-- ряд 2: решения; на шаге 0 между ними — стрелки «лестницы» -->
      <template v-for="(f, i) in features" :key="`s${f.name}`">
        <div
          class="sol hud-frame hud-solid"
          :class="{ 'is-lit': lit(i), 'is-shown': shown(i) }"
          :style="{ '--hud-c': f.color, '--c': f.color, 'grid-column': i * 2 + 1, 'transition-delay': `${delay(i)}s` }"
        >
          <b>{{ f.name }}</b>
        </div>
        <svg
          v-if="i < features.length - 1"
          class="arrow"
          :class="{ 'is-shown': s === 0 && started }"
          :style="{ 'grid-column': i * 2 + 2, 'transition-delay': s === 0 ? `${0.3 + i * STEP_T + 0.5}s` : '0s' }"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M 4 12 H 18 M 12 5 L 19 12 L 12 19" />
        </svg>
      </template>

      <!-- провода: решение → проект -->
      <span
        v-for="(f, i) in features"
        :key="`w2${f.name}`"
        class="wire wire--bottom"
        :class="{ 'is-lit': s >= 2 && isOn(i) }"
        :style="{ '--c': f.color, '--i': i }"
      />

      <!-- проект: на шаге 0 — путь до «серьёзного» проекта, дальше — то, что собрано из включённого -->
      <div class="proj hud-frame hud-solid" style="--hud-c: rgb(255 255 255 / 0.7)" :style="vt('x-tg-rail')">
        <span class="proj__path" :style="{ transitionDuration: s === 0 ? `${PATH_S}s` : '0.5s' }" :class="{ 'is-go': s === 0 && started }" />
        <span class="proj__caption proj__caption--path" :class="{ 'is-shown': s === 0 && started }" :style="{ transitionDelay: s === 0 && started ? '0.3s' : '0s' }">
          Серьёзность проекта
        </span>
        <span
          v-for="(c, k) in configs"
          :key="c.name"
          class="proj__caption"
          :class="{ 'is-shown': s === k + 1, 'proj__caption--note': k === 0 }"
        >
          {{ c.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fns {
  position: absolute;
  inset: 0;
  padding: 40px 50px 60px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.fns__titles {
  display: grid;

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

/*
 * Сетка из 4 колонок с узкими зазорами под стрелки. Ряды: требования · провод · решения · провод · проект.
 * Высоты фиксированные — на любом шаге всё стоит на своих местах.
 */
.board {
  --need-h: 98px;
  --wire-h: 32px;
  --sol-h: 84px;
  position: relative;
  margin-top: 26px;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 26px 1fr 26px 1fr 26px 1fr;
  grid-template-rows: var(--need-h) var(--wire-h) var(--sol-h) var(--wire-h) 1fr;
}

/* ── требования с тумблерами ────────────────────────────────────── */
.need {
  grid-row: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
  padding: 10px 14px 12px;
  filter: saturate(0.25) brightness(0.7);
  opacity: 0;
  transform: translateY(0.4em);
  transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;

  & b {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.15;
    color: rgb(255 255 255 / 0.92);
  }
}

.need.is-shown {
  opacity: 1;
  transform: none;
}

.need.is-lit {
  filter: none;
  --hud-bg: color-mix(in srgb, var(--c) 14%, rgb(10 10 20 / 0.72));

  & b {
    color: color-mix(in oklab, var(--c) 55%, white);
  }
}

.need__toggle {
  align-self: flex-start;
  width: 46px;
  height: 24px;
  padding: 3px;
  border-radius: 999px;
  border: 1.5px solid color-mix(in srgb, var(--c) 60%, transparent);
  background: rgb(255 255 255 / 0.06);
  transition: background 0.4s ease, box-shadow 0.4s ease;

  & i {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(255 255 255 / 0.5);
    transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease;
  }
}

.is-lit .need__toggle {
  background: color-mix(in srgb, var(--c) 35%, transparent);
  box-shadow: 0 0 14px color-mix(in srgb, var(--c) 60%, transparent);

  & i {
    background: var(--c);
    transform: translateX(22px);
  }
}

/* ── решения ────────────────────────────────────────────────────── */
.sol {
  grid-row: 3;
  display: grid;
  place-items: center;
  padding: 0 10px;
  filter: saturate(0.25) brightness(0.7);
  opacity: 0;
  transform: translateY(0.5em) scale(0.96);
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;

  & b {
    font-size: 23px;
    font-weight: 700;
    line-height: 1.1;
    text-align: center;
    color: color-mix(in oklab, var(--c) 75%, white);
  }
}

.sol.is-shown {
  opacity: 1;
  transform: none;
}

.sol.is-lit {
  filter: none;
  --hud-bg: color-mix(in srgb, var(--c) 18%, rgb(10 10 20 / 0.72));
}

/* ── стрелки «лестницы» между решениями ─────────────────────────── */
.arrow {
  grid-row: 3;
  align-self: center;
  width: 26px;
  height: 26px;
  fill: none;
  stroke: rgb(255 255 255 / 0.7);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.arrow.is-shown {
  opacity: 1;
}

/* ── провода ────────────────────────────────────────────────────── */
.wire {
  position: absolute;
  /* центр i-й колонки: ширина колонки (100% − 3·26px)/4, плюс зазоры слева */
  left: calc((100% - 78px) / 4 * (var(--i) + 0.5) + 26px * var(--i));
  width: 2px;
  height: var(--wire-h);
  translate: -50% 0;
  background: var(--c);
  box-shadow: 0 0 10px var(--c);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.35s ease;
}

.wire--top {
  top: var(--need-h);
}

.wire--bottom {
  top: calc(var(--need-h) + var(--wire-h) + var(--sol-h));
}

.wire.is-lit {
  transform: scaleY(1);
}

.wire--top.is-lit {
  transition-delay: 0.3s;
}

.wire--bottom.is-lit {
  transition-delay: 0.6s;
}

/* ── проект ─────────────────────────────────────────────────────── */
.proj {
  grid-column: 1 / -1;
  grid-row: 5;
  position: relative;
  display: grid;
  align-items: center;
  /* padding нулевой: абсолютный слой в сетке отсчитывается от области ячейки, отступы — у подписей */
  padding: 0;
  min-height: 0;
  overflow: hidden;

  & > * {
    grid-area: 1 / 1;
  }
}

/* шкала «серьёзности»: градиент всегда в полный размер, открывается маской слева направо */
.proj__path {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #34d399, #60a5fa, #f472b6, #fbbf24);
  clip-path: inset(0 100% 0 0);
  opacity: 0;
  transition: clip-path 0.5s ease, opacity 0.5s ease;
}

.is-evolution .proj__path {
  opacity: 0.32;
}

.proj__path.is-go {
  clip-path: inset(0 0 0 0);
  transition-timing-function: linear;
  transition-delay: 0.3s;
}

.proj__caption {
  margin-inline: 28px;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  opacity: 0;
  transform: translateY(0.35em);
  filter: blur(8px);
  transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
}

.proj__caption.is-shown {
  opacity: 1;
  transform: none;
  filter: none;
}

.proj__caption:not(.proj__caption--path).is-shown {
  transition-delay: 0.45s;
}

.proj__caption--path {
  position: relative;
  color: rgb(255 255 255 / 0.95);
  text-shadow: 0 2px 12px rgb(0 0 0 / 0.55);
}

.proj__caption--note {
  font-size: 28px;
  font-weight: 600;
  color: rgb(255 255 255 / 0.9);
}
</style>
