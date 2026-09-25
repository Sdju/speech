<script setup lang="ts">
import { computed } from 'vue'

/**
 * Схема «где стыкуются части продукта» — вместо картинок mf.png / modules.png.
 *
 * Сверху браузер (runtime), снизу сборка (CI), между ними — линия стыковки.
 * mode="mfe"     0: host · 1: части подгружаются в браузере · 2: у каждой своя сборка и деплой
 * mode="modules" 0: та же картинка микрофронтендов · 1: части опускаются в одну сборку ·
 *                2: панч — схема та же, меняется момент стыковки
 *
 * Одна и та же геометрия в обоих режимах — зритель узнаёт схему со слайда про МФ.
 * Клики — снаружи: `clicks: 2` во frontmatter и `:step="$clicks"`.
 */
const { mode = 'mfe', step = 0 } = defineProps<{
  mode?: 'mfe' | 'modules'
  step?: number
}>()

const W = 920
const H = 440
const LINE = 228

const parts = [
  { id: 'catalog', name: 'Catalog', color: '#34d399' },
  { id: 'cart', name: 'Cart', color: '#60a5fa' },
  { id: 'profile', name: 'Profile', color: '#f472b6' },
]
const HOST = '#a78bfa'
const head = (c: string) => `arch-head-${c.slice(1)}`

// состояние: во что складывается режим + шаг
const s = computed(() => {
  const mfe = mode === 'mfe'
  return {
    remotes: mfe ? step >= 1 : true,
    pipes: mfe ? step >= 2 : step === 0,
    merged: !mfe && step >= 1, // части внизу, в одной сборке
    punch: !mfe && step >= 2,
  }
})

const deploys = computed(() => s.value.merged ? 1 : s.value.pipes ? 4 : 0)

const caption = computed(() => {
  if (mode === 'mfe')
    return ['Host собирает страницу из частей', 'Части подгружаются прямо в браузере', 'У каждой части — своя сборка и свой деплой'][step]
  return ['Микрофронтенды: стыковка в браузере', 'Модули: те же части, но собираются вместе', 'Схема та же — меняется только момент стыковки'][step]
})

interface Box { x: number, y: number, w: number, h: number }
const host = computed<Box>(() => ({ x: 460, y: 62, w: 300, h: 64 }))
const remote = (i: number): Box => s.value.merged
  ? { x: 330 + i * 130, y: 356, w: 116, h: 48 }
  : { x: 290 + i * 170, y: 172, w: 150, h: 52 }
const pipe = (i: number): Box => ({ x: i < 0 ? 110 : 290 + i * 170, y: 330, w: 150, h: 56 })
const build: Box = { x: 460, y: 340, w: 520, h: 128 }

const place = (b: Box) => ({
  width: `${b.w}px`,
  height: `${b.h}px`,
  transform: `translate(${b.x - b.w / 2}px, ${b.y - b.h / 2}px)`,
})

// стрелки: host → части (рантайм), сборки → браузер (деплой)
const curve = (x1: number, y1: number, x2: number, y2: number, k = 0.5) => {
  const dy = (y2 - y1) * k
  return `M${x1} ${y1} C${x1} ${y1 + dy} ${x2} ${y2 - dy} ${x2} ${y2}`
}
const runtimeArrows = parts.map((_, i) => curve(380 + i * 80, 94, 290 + i * 170, 146))
const deployArrows = [
  `M110 302 C110 150 200 62 306 62`,
  ...parts.map((_, i) => `M${290 + i * 170} 302 L${290 + i * 170} 200`),
]
const singleDeploy = 'M460 276 L460 96'
</script>

<template>
  <div class="arch" :style="{ width: `${W}px`, height: `${H + 44}px` }">
    <!-- зоны и линия стыковки -->
    <div class="arch__zone hud-label" :style="{ top: '0px' }">
      runtime · браузер
    </div>
    <div class="arch__zone hud-label" :style="{ top: `${LINE + 12}px` }">
      build · CI
    </div>
    <div class="arch__line" :class="{ 'is-hot': s.punch }" :style="{ top: `${LINE}px` }" />

    <svg class="arch__svg" :viewBox="`0 0 ${W} ${H}`" :width="W" :height="H">
      <defs>
        <marker
          v-for="c in [HOST, ...parts.map(p => p.color)]"
          :id="head(c)"
          :key="c"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 1 L9 5 L0 9 z" :fill="c" />
        </marker>
      </defs>
      <path
        v-for="(d, i) in runtimeArrows"
        :key="`r${i}`"
        :d="d"
        pathLength="1"
        class="arch__arrow"
        :class="{ 'is-on': s.remotes && !s.merged }"
        :style="{ stroke: parts[i].color, transitionDelay: `${0.15 + i * 0.12}s` }"
        :marker-end="`url(#${head(parts[i].color)})`"
      />
      <path
        v-for="(d, i) in deployArrows"
        :key="`d${i}`"
        :d="d"
        pathLength="1"
        class="arch__arrow arch__arrow--deploy"
        :class="{ 'is-on': s.pipes && !s.merged }"
        :style="{ stroke: i ? parts[i - 1].color : HOST, transitionDelay: `${0.3 + i * 0.1}s` }"
        :marker-end="`url(#${head(i ? parts[i - 1].color : HOST)})`"
      />
      <path
        :d="singleDeploy"
        pathLength="1"
        class="arch__arrow arch__arrow--deploy arch__arrow--single"
        :class="{ 'is-on': s.merged }"
        :style="{ stroke: HOST, transitionDelay: '0.7s' }"
        :marker-end="`url(#${head(HOST)})`"
      />
    </svg>

    <!-- одна сборка (модули) -->
    <div class="arch__box arch__build" :class="{ 'is-hidden': !s.merged }" :style="place(build)">
      <span class="hud-label arch__build-label">1 репозиторий · 1 сборка</span>
    </div>

    <!-- host -->
    <div class="arch__box hud-frame" :style="{ ...place(host), '--hud-c': HOST }">
      <Transition name="arch-swap" mode="out-in">
        <div :key="s.merged ? 'app' : 'host'" class="arch__text">
          <b>{{ s.merged ? 'Single App' : 'Host · Shell' }}</b>
          <small>{{ s.merged ? 'один бандл' : 'router · auth · layout' }}</small>
        </div>
      </Transition>
    </div>

    <!-- части продукта -->
    <div
      v-for="(p, i) in parts"
      :key="p.id"
      class="arch__box hud-frame arch__part"
      :class="{ 'is-hidden': !s.remotes }"
      :style="{ ...place(remote(i)), '--hud-c': p.color, transitionDelay: s.merged ? `${i * 0.08}s` : `${i * 0.12}s` }"
    >
      <div class="arch__text">
        <b :style="{ color: p.color }">{{ p.name }}</b>
        <Transition name="arch-swap" mode="out-in">
          <small :key="s.merged ? 'm' : 'r'">{{ s.merged ? 'модуль' : 'remoteEntry.js' }}</small>
        </Transition>
      </div>
    </div>

    <!-- у каждого своя сборка -->
    <div
      v-for="i in [-1, 0, 1, 2]"
      :key="`pipe${i}`"
      class="arch__box arch__pipe"
      :class="{ 'is-hidden': !s.pipes || s.merged }"
      :style="{ ...place(pipe(i)), '--hud-c': i < 0 ? HOST : parts[i].color, transitionDelay: `${0.1 + (i + 1) * 0.08}s` }"
    >
      <div class="arch__text">
        <b>{{ i < 0 ? 'Host' : parts[i].name }}</b>
        <small>repo → CI → CDN</small>
      </div>
    </div>

    <!-- счётчик деплоев -->
    <div class="arch__counter" :class="{ 'is-hidden': !deploys }">
      <Transition name="arch-swap" mode="out-in">
        <b :key="deploys">{{ deploys }}</b>
      </Transition>
      <span class="hud-label">{{ deploys === 1 ? 'деплой' : 'деплоя' }}</span>
    </div>

    <div class="arch__caption">
      <Transition name="arch-swap" mode="out-in">
        <span :key="caption">{{ caption }}</span>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.arch {
  --ease: cubic-bezier(0.65, 0, 0.35, 1);
  position: relative;
  margin: 0 auto;
  text-align: left;
}

.arch__zone {
  position: absolute;
  left: 0;
  opacity: 0.7;
}

.arch__line {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1px dashed var(--v-color);
  box-shadow: 0 0 10px var(--v-color);
  opacity: 0.55;
  transition: opacity 0.6s, box-shadow 0.6s;
}
.arch__line.is-hot {
  opacity: 1;
  box-shadow: 0 0 22px var(--v-color), 0 0 4px var(--v-color);
}

.arch__svg {
  position: absolute;
  inset: 0;
  overflow: visible;
  pointer-events: none;
}
.arch__arrow {
  fill: none;
  stroke-width: 1.6;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0;
  transition:
    stroke-dashoffset 0.8s var(--ease),
    opacity 0.4s ease;
}
.arch__arrow.is-on {
  stroke-dashoffset: 0;
  opacity: 0.9;
}
.arch__arrow--deploy {
  stroke-width: 1.3;
}
.arch__arrow--single.is-on {
  stroke-width: 2.4;
  filter: drop-shadow(0 0 6px currentColor);
}

.arch__box {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  transition:
    transform 0.9s var(--ease),
    width 0.9s var(--ease),
    height 0.9s var(--ease),
    opacity 0.5s ease,
    filter 0.5s ease;
}
.arch__box.is-hidden {
  opacity: 0;
  filter: blur(6px);
}

.arch__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
  white-space: nowrap;
}
.arch__text b {
  font-size: 1.05rem;
}
.arch__text small {
  font-family: var(--slidev-code-font-family, monospace);
  font-size: 0.68rem;
  opacity: 0.65;
}

.arch__pipe {
  border: 1px dashed color-mix(in srgb, var(--hud-c) 70%, transparent);
  border-radius: 6px;
  background: color-mix(in srgb, var(--hud-c) 7%, transparent);
}
.arch__pipe b {
  color: var(--hud-c);
  font-size: 0.95rem;
}

.arch__build {
  align-items: flex-start;
  justify-content: flex-start;
  padding: 8px 12px;
  border: 1px dashed color-mix(in srgb, #a78bfa 70%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, #a78bfa 8%, transparent);
  transition-delay: 0.25s;
}
.arch__build-label {
  font-size: 0.65rem;
}

.arch__counter {
  position: absolute;
  right: 0;
  top: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110px;
  transition: opacity 0.5s ease 0.5s;
}
.arch__counter.is-hidden {
  opacity: 0;
}
.arch__counter b {
  font-size: 3.2rem;
  line-height: 1;
  color: var(--v-color);
  text-shadow: 0 0 18px var(--v-color);
}

.arch__caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  font-size: 1.15rem;
  opacity: 0.85;
}

.arch-swap-enter-active,
.arch-swap-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.arch-swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.arch-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
