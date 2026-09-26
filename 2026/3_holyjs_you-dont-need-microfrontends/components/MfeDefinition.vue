<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { station } from '../universe/scene'
import { stationScreen } from '../universe/screen'

/**
 * Определение микрофронтендов: тезис и три свойства, каждое показывает станция справа.
 * Состояние станции (отстыковка cart) задаётся во frontmatter слайда через timeline.
 *
 *   0 — только заголовок: он прилетает из вопроса предыдущего слайда (XSlide)
 *   1 — тезис: архитектурный подход (раньше — заголовок пролетал бы сквозь текст)
 *   2 — независимая разработка: у каждого модуля своя команда (подписи на модулях)
 *   3 — независимый деплой: cart отстыковывается и выкатывается сам
 *   4 — но единый продукт: модуль снова в станции
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(4, step)))

const { $slidev } = useSlideContext()
const W = computed(() => $slidev.configs.canvasWidth ?? 980)
const H = computed(() => W.value / ($slidev.configs.aspectRatio ?? 16 / 9))

const props = [
  { title: 'Независимая разработка', note: 'у каждой части своя команда и свой код', color: '#34d399' },
  { title: 'Независимый деплой', note: 'часть выкатывается без остальных', color: '#f472b6' },
  { title: 'Но единый продукт', note: 'пользователь видит одно приложение', color: '#c4b5fd' },
]

const css = (c: number[]) => `rgb(${c.map(v => Math.round(v * 255)).join(' ')})`

/** подписи команд над модулями: на шаге разработки — все, на шаге деплоя — только отстыкованный */
const labels = computed(() => {
  const screen = stationScreen.value
  if (!screen || (s.value !== 2 && s.value !== 3))
    return []
  // центр станции на экране — подписи выносим от него наружу, веером
  const pts = Object.values(screen).filter(p => p.mode !== 'hidden')
  const cx = pts.reduce((a, p) => a + p.port[0], 0) / (pts.length || 1) * W.value
  const cy = pts.reduce((a, p) => a + p.port[1], 0) / (pts.length || 1) * H.value
  return station.modules.flatMap((m) => {
    const p = screen[m.id]
    if (!p || p.mode === 'hidden')
      return []
    const deploy = s.value === 3
    if (deploy && p.mode !== 'detached')
      return []
    const x = p.module[0] * W.value
    const y = p.module[1] * H.value
    const len = Math.hypot(x - cx, y - cy) || 1
    return [{
      id: m.id,
      text: deploy ? `${m.id} выкатывается сам` : m.id,
      color: css(m.color),
      x: x + (x - cx) / len * 46,
      y: y + (y - cy) / len * 46,
    }]
  })
})
</script>

<template>
  <div class="def">
    <div class="def__card glass">
      <!-- прилетает из вопроса на предыдущем слайде -->
      <h1 class="def__title">
        <XSlide name="mfe-word" as="span">Микрофронтенды</XSlide>
      </h1>
      <p class="def__lead" :class="s >= 1 ? 'mf-on' : 'mf-off'">
        архитектурный подход к организации проекта
      </p>
    </div>

    <div class="def__props">
      <HudBlock
        v-for="(p, i) in props"
        :key="p.title"
        class="def__prop"
        :shown="i < s - 1"
        :color="p.color"
        solid
      >
        <b>{{ p.title }}</b>
        <small>{{ p.note }}</small>
      </HudBlock>
    </div>

    <!-- подписи на модулях станции -->
    <span
      v-for="l in labels"
      :key="l.id + s"
      class="def__label hud-frame hud-sm hud-solid"
      :style="{ 'left': `${l.x}px`, 'top': `${l.y}px`, '--hud-c': l.color, 'color': l.color }"
    >{{ l.text }}</span>
  </div>
</template>

<style scoped>
.def {
  position: absolute;
  inset: 0;
  padding: 70px 70px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.def__card {
  width: 440px;
  padding: 20px 24px 22px;
}

.def__title {
  margin: 0;
  font-size: 2.6em;
  font-weight: 700;
  line-height: 1.1;
}

.def__lead {
  margin: 8px 0 0;
  max-width: 420px;
  font-size: 22px;
  line-height: 1.3;
  color: rgb(255 255 255 / 0.75);
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
}

.def__props {
  display: grid;
  gap: 12px;
  width: 440px;
  margin-top: 16px;
}

.def__prop {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 18px;

  & b {
    font-size: 19px;
    color: color-mix(in oklab, var(--hud-c) 70%, white);
  }

  & small {
    font-size: 14px;
    color: rgb(255 255 255 / 0.7);
  }
}

/* подпись над модулем — ездит за станцией каждый кадр, без переходов на координатах */
.def__label {
  position: absolute;
  translate: -50% -50%;
  padding: 3px 9px;
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  animation: label-in 0.5s ease 0.2s backwards;
}

@keyframes label-in {
  from { opacity: 0; transform: translateY(6px); }
}
</style>
