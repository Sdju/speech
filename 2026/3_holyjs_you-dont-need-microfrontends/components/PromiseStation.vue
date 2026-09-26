<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import XSlide from '../addon/components/crosslide/XSlide.vue'
import { stationScreen } from '../universe/screen'

/**
 * Сквозной слайд «Что обещают микрофронтенды?». Каждое обещание — модуль станции:
 * когда обещание выполнено без микрофронтендов, модуль отстыковывается и улетает.
 * Секретный четвёртый модуль прилетает только в финале — динамическую подгрузку
 * без стыковки на орбите не получить.
 *
 * Состояние станции (кто пристыкован) задаётся во frontmatter слайда (`station:` / timeline),
 * а подписи — здесь, из `stage` (какой это повтор слайда) и `step` (клик внутри него).
 *
 *   stage 0 — слайд 11: клики 1–3 показывают обещания, клик 4 — размытый бонус
 *   stage 1 — после модулей: клик 1 закрывает «границы»
 *   stage 2 — после монорепозитория: клик 1 закрывает «пайплайны»
 *   stage 3 — после распределённого монолита: клик 1 закрывает «деплой»,
 *             клик 2 раскрывает бонус
 */
const { stage = 0, step = 0 } = defineProps<{ stage?: number, step?: number }>()

const { $slidev } = useSlideContext()
const W = computed(() => $slidev.configs.canvasWidth ?? 980)
const H = computed(() => W.value / ($slidev.configs.aspectRatio ?? 16 / 9))

interface PromiseItem {
  module: string
  text: string
  color: string
  /** чем закрыли без микрофронтендов и на каком повторе */
  solved?: { by: string, stage: number }
  secret?: boolean
}

const promises: PromiseItem[] = [
  { module: 'catalog', text: 'Чёткие границы ответственности', color: '#34d399', solved: { by: 'Модули', stage: 1 } },
  { module: 'search', text: 'Свои пайплайны в репозитории', color: '#60a5fa', solved: { by: 'Монорепозиторий', stage: 2 } },
  { module: 'cart', text: 'Независимый деплой', color: '#f472b6', solved: { by: 'Распределённый монолит', stage: 3 } },
  { module: 'checkout', text: 'Динамическая подгрузка', color: '#a78bfa', secret: true },
]

type State = 'off' | 'on' | 'solved' | 'teaser' | 'revealed'

function state(p: PromiseItem, i: number): State {
  if (p.secret) {
    if (stage === 3 && step >= 2)
      return 'revealed'
    return stage === 0 && step < 4 ? 'off' : 'teaser'
  }
  if (stage === 0)
    return step > i ? 'on' : 'off'
  const s = p.solved!.stage
  // закрыто на прошлых повторах — или на этом, после клика
  if (s < stage || (s === stage && step >= 1))
    return 'solved'
  return 'on'
}

const rows = computed(() => promises.map((p, i) => ({ ...p, state: state(p, i) })))

/**
 * Пункт, с которого начинается следующий раздел: на повторе `stage` это пункт stage+1.
 * Он помечен XSlide `promise-N` — при переходе к разделу морфится в его заголовок
 * (тот же XSlide на первом слайде раздела).
 */
const lead = computed(() => stage)

// ── выноски ────────────────────────────────────────────────────────
const LIST_X = 80
const LIST_Y = 150
const ROW = 74
const LABEL_W = 330

const lines = computed(() => {
  const screen = stationScreen.value
  if (!screen)
    return []
  return rows.value.flatMap((r, i) => {
    const m = screen[r.module]
    const visible = (r.state === 'on' || r.state === 'revealed') && m && m.mode === 'docked'
    if (!visible)
      return []
    const x1 = LIST_X + LABEL_W + 8
    const y1 = LIST_Y + i * ROW + 22
    const x2 = m.module[0] * W.value
    const y2 = m.module[1] * H.value
    // ломаная: горизонтальный вынос от подписи, затем прямо к модулю
    const xm = x1 + 40
    return [{ id: r.module, color: r.color, d: `M ${x1} ${y1} L ${xm} ${y1} L ${x2} ${y2}`, x2, y2, faint: !m.front }]
  })
})
</script>

<template>
  <div class="ps">
    <h2 class="ps__title">
      Что обещают микрофронтенды?
    </h2>

    <ol class="ps__list" :style="{ left: `${LIST_X}px`, top: `${LIST_Y}px`, width: `${LABEL_W}px` }">
      <li
        v-for="(r, i) in rows"
        :key="r.module"
        class="ps__item"
        :class="`ps__item--${r.state}`"
        :style="{ '--c': r.color, top: `${i * ROW}px` }"
      >
        <span class="ps__num hud-frame hud-sm">{{ i + 1 }}</span>
        <span class="ps__body">
          <XSlide v-if="i === lead" :name="`promise-${i + 1}`" as="span" class="ps__lead">
            <span class="ps__text">{{ r.text }}</span>
          </XSlide>
          <span v-else class="ps__text">{{ r.text }}</span>
          <span v-if="r.solved" class="ps__solved">✓ {{ r.solved.by }}</span>
          <span v-if="r.secret" class="ps__only">только на орбите</span>
        </span>
      </li>
    </ol>

    <svg class="ps__lines" :viewBox="`0 0 ${W} ${H}`">
      <g v-for="l in lines" :key="l.id" :style="{ '--c': l.color }" :class="{ faint: l.faint }">
        <path :d="l.d" />
        <circle :cx="l.x2" :cy="l.y2" r="4" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.ps {
  position: absolute;
  inset: 0;
  color: #fff;
  text-align: left;
}

.ps__title {
  position: absolute;
  left: 80px;
  top: 64px;
  margin: 0;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.ps__list {
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ps__item {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 44px;
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;

  /* сбросить маркер списка из общих стилей */
  &::before { display: none; }
}

.ps__num {
  display: grid;
  place-items: center;
  flex: none;
  width: 34px;
  height: 34px;
  padding: 0;
  --hud-c: var(--c);
  font-weight: 700;
  font-size: 16px;
  transition: all 0.6s ease;
}

.ps__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.ps__text {
  position: relative;
  width: fit-content;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.15;
  /* зачёркивание по каждой строке; проявляется цветом, а не прыжком */
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: transparent;
  transition: color 0.6s ease, filter 0.6s ease, text-decoration-color 0.6s ease 0.1s;
}

.ps__lead {
  display: block;
  width: fit-content;
}

.ps__solved,
.ps__only {
  font-size: 14px;
  font-weight: 600;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.6s ease, opacity 0.6s ease 0.2s;
}

.ps__solved { color: #6ee7b7; }
.ps__only { color: #c4b5fd; }

.ps__item--off {
  opacity: 0;
  transform: translateY(10px);
  filter: blur(8px);
}

.ps__item--solved {
  & .ps__text {
    color: rgb(255 255 255 / 0.45);
    text-decoration-color: #34d399;
  }
  & .ps__solved { max-height: 20px; opacity: 1; }
  & .ps__num {
    --hud-c: #34d399;
    color: #6ee7b7;
  }
}

/* бонус: на месте, но не прочитать */
.ps__item--teaser .ps__text {
  filter: blur(7px);
  user-select: none;
}

.ps__item--teaser .ps__num {
  filter: blur(3px);
}

.ps__item--revealed {
  & .ps__only { max-height: 20px; opacity: 1; }
  & .ps__num { box-shadow: 0 0 18px var(--c); }
}

.ps__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;

  & path {
    fill: none;
    stroke: var(--c);
    stroke-width: 1.5;
    stroke-opacity: 0.8;
  }

  & circle {
    fill: var(--c);
    stroke: #0b0b12;
    stroke-width: 2;
  }

  & .faint { opacity: 0.35; }
}
</style>
