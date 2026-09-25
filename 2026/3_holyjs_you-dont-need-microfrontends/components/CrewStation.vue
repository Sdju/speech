<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { stationScreen } from '../universe/screen'

/**
 * Экипаж вокруг станции — рост проекта без чётких границ.
 * Минималистичные 2D-астронавты поверх 3D-станции; тросы тянутся к модулям
 * по их экранным позициям (universe/screen.ts).
 *
 *   0 — один астронавт на тросе: один разработчик, всё понятно (слайд 13 и вход на 14)
 *   1 — людей всё больше: прилетает экипаж, у каждого трос к модулю своей команды
 *   2 — кода всё больше: вокруг копятся контейнеры
 *   3 — зоны ответственности размываются: тросы к чужим модулям, цвета команд гаснут
 *   4 — связи становятся комплексными: тросы между людьми, клубок
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(4, step)))

const { $slidev } = useSlideContext()
const W = computed(() => $slidev.configs.canvasWidth ?? 980)
const H = computed(() => W.value / ($slidev.configs.aspectRatio ?? 16 / 9))

const TEAMS: Record<string, string> = {
  catalog: '#34d399',
  search: '#60a5fa',
  cart: '#f472b6',
}
const MODULES = Object.keys(TEAMS)

// позиции в долях от центра станции (x в радиусах R, y в радиусах R), поворот, масштаб
const crew = [
  { x: -1.15, y: -0.1, rot: -14, scale: 1, team: 'catalog' },
  { x: -0.9, y: -0.85, rot: 18, scale: 0.8, team: 'search' },
  { x: -0.55, y: 0.95, rot: -30, scale: 0.85, team: 'cart' },
  { x: 0.25, y: -1.05, rot: 40, scale: 0.7, team: 'catalog' },
  { x: 0.95, y: -0.7, rot: -20, scale: 0.75, team: 'search' },
  { x: 1.05, y: 0.55, rot: 25, scale: 0.8, team: 'cart' },
  { x: 0.35, y: 1.05, rot: -8, scale: 0.7, team: 'search' },
  { x: -1.55, y: 0.5, rot: 12, scale: 0.7, team: 'cart' },
  { x: -1.45, y: -0.55, rot: -35, scale: 0.65, team: 'catalog' },
]

// «кто теперь за что держится» на шаге размытых границ
const swapped = ['cart', 'catalog', 'search', 'cart', 'catalog', 'search', 'catalog', 'search', 'cart']
// клубок связей между людьми
const knots: [number, number][] = [[0, 4], [1, 5], [2, 3], [3, 7], [4, 8], [5, 0], [6, 1], [7, 4], [8, 2], [0, 6], [2, 5], [1, 7]]

// контейнеры с кодом
const crates = [
  { x: -0.35, y: -0.55, r: 12 }, { x: 0.55, y: -0.35, r: -20 }, { x: 0.7, y: 0.25, r: 8 },
  { x: -0.25, y: 0.55, r: -12 }, { x: 0.05, y: 0.75, r: 25 }, { x: -0.7, y: 0.25, r: -5 },
  { x: 0.95, y: -0.1, r: 15 }, { x: -0.6, y: -0.3, r: 30 },
]

const R = 190

const scene = computed(() => {
  const screen = stationScreen.value
  if (!screen)
    return null
  const pts = MODULES.map(m => screen[m]).filter(Boolean)
  if (!pts.length)
    return null
  const cx = pts.reduce((a, p) => a + p.module[0], 0) / pts.length * W.value
  const cy = pts.reduce((a, p) => a + p.module[1], 0) / pts.length * H.value
  const mod = (id: string) => {
    const p = screen[id]
    return p ? [p.module[0] * W.value, p.module[1] * H.value] : [cx, cy]
  }
  return { cx, cy, mod }
})

const people = computed(() => {
  const sc = scene.value
  if (!sc)
    return []
  return crew.map((c, i) => {
    const x = sc.cx + c.x * R
    const y = sc.cy + c.y * R * 0.66
    const visible = i === 0 || s.value >= 1
    const target = s.value >= 3 ? swapped[i] : c.team
    const [tx, ty] = sc.mod(target)
    // трос провисает между рукой и модулем
    const mx = (x + tx) / 2
    const my = (y + ty) / 2 + 40
    return {
      ...c,
      i,
      x,
      y,
      visible,
      color: s.value >= 3 ? '#9ca3af' : TEAMS[c.team],
      tether: `M ${x} ${y} Q ${mx} ${my} ${tx} ${ty}`,
      tetherColor: TEAMS[target],
    }
  })
})

const tangle = computed(() => {
  if (s.value < 4)
    return []
  const p = people.value
  return knots.map(([a, b], k) => {
    const A = p[a]
    const B = p[b]
    const bend = (k % 2 ? 1 : -1) * 60
    return `M ${A.x} ${A.y} Q ${(A.x + B.x) / 2 + bend} ${(A.y + B.y) / 2 - bend} ${B.x} ${B.y}`
  })
})

const boxes = computed(() => {
  const sc = scene.value
  if (!sc || s.value < 2)
    return []
  return crates.map(c => ({ x: sc.cx + c.x * R * 1.1, y: sc.cy + c.y * R * 0.75, r: c.r }))
})

const captions = [
  'Людей на проекте всё больше',
  'Кода всё больше, и растёт он всё быстрее',
  'Всё сложнее понять, кто за что отвечает',
  'Связи в проекте становятся запутанными',
]
</script>

<template>
  <div class="crew">
    <svg v-if="scene" class="crew__svg" :viewBox="`0 0 ${W} ${H}`">
      <!-- тросы к модулям -->
      <path
        v-for="p in people"
        :key="`t${p.i}`"
        class="tether"
        :class="{ 'is-on': p.visible }"
        :d="p.tether"
        :style="{ stroke: p.tetherColor }"
      />
      <!-- клубок между людьми -->
      <path v-for="(d, k) in tangle" :key="`k${k}`" class="knot" :d="d" />

      <!-- контейнеры с кодом -->
      <g
        v-for="(b, k) in boxes"
        :key="`b${k}`"
        class="crate"
        :style="{ transform: `translate(${b.x}px, ${b.y}px) rotate(${b.r}deg)`, animationDelay: `${k * 0.08}s` }"
      >
        <rect x="-11" y="-8" width="22" height="16" rx="2" />
        <!-- наклейка вместо <text>: с CSS zoom Slidev текст в SVG встаёт не на место -->
        <rect class="crate__label" x="-6" y="-3" width="12" height="6" rx="1" />
      </g>

      <!-- астронавты -->
      <g
        v-for="p in people"
        :key="`a${p.i}`"
        class="astro"
        :class="{ 'is-on': p.visible }"
        :style="{
          transform: `translate(${p.x}px, ${p.y}px)`,
          '--team': p.color,
          '--delay': `${p.i * 0.09}s`,
          '--float': `${5 + (p.i % 3)}s`,
        }"
      >
        <g class="astro__enter" :style="{ '--from-x': `${Math.sign(p.x - (scene?.cx ?? 0)) * 70}px` }">
        <g class="astro__pose" :style="{ transform: `rotate(${p.rot}deg) scale(${p.scale})` }">
        <g class="astro__body">
          <!-- ранец -->
          <rect x="-11" y="-6" width="22" height="24" rx="5" class="pack" />
          <!-- ноги -->
          <path d="M -5 20 L -8 38" class="limb" />
          <path d="M 5 20 L 9 37" class="limb" />
          <!-- туловище -->
          <rect x="-10" y="-4" width="20" height="26" rx="8" class="suit" />
          <!-- полоса команды -->
          <rect x="-10" y="6" width="20" height="4" class="team" />
          <!-- руки -->
          <path d="M -9 2 L -20 12" class="limb" />
          <path d="M 9 2 L 19 -6" class="limb" />
          <!-- шлем -->
          <circle cy="-14" r="11" class="suit" />
          <ellipse cx="2" cy="-14" rx="7" ry="5.5" class="visor" />
        </g>
        </g>
        </g>
      </g>
    </svg>

    <div class="crew__captions">
      <div
        v-for="(text, i) in captions"
        :key="i"
        class="crew__caption"
        :class="i + 1 === s ? 'mf-on' : i + 1 < s ? 'mf-out' : 'mf-off'"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.crew {
  position: absolute;
  inset: 0;
  color: #fff;
  text-align: left;
}

.crew__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.tether {
  fill: none;
  stroke-width: 1.4;
  stroke-opacity: 0;
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  transition: stroke-opacity 0.6s ease, stroke-dashoffset 1.2s ease 0.3s, stroke 0.8s ease;
}

.tether.is-on {
  stroke-opacity: 0.75;
  stroke-dashoffset: 0;
}

.knot {
  fill: none;
  stroke: #fca5a5;
  stroke-width: 1.1;
  stroke-opacity: 0.7;
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: draw 1.4s ease forwards;
}

.crate {
  animation: pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;

  & rect {
    fill: #d6b36a;
    stroke: #8a6a2e;
    stroke-width: 1;
  }

  & .crate__label {
    fill: #f3e2b8;
    stroke: none;
  }
}

/*
 * Положение астронавта и тросов пересчитывается каждый кадр вслед за станцией —
 * никаких переходов на координатах, иначе тросы отстают и «догоняют» станцию.
 * Плавными остаются только появление (внутренняя группа) и цвета.
 */
.astro__enter {
  opacity: 0;
  transform: translateX(var(--from-x));
  transition: opacity 0.8s ease var(--delay), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) var(--delay);
}

.astro.is-on .astro__enter {
  opacity: 1;
  transform: none;
}

/* лёгкое покачивание вокруг точки крепления троса — трос не отрывается от руки */
.astro__body {
  animation: drift var(--float) ease-in-out infinite alternate;
}

.suit {
  fill: #f1f1f4;
}

.pack {
  fill: #b9bac4;
}

.team {
  fill: var(--team);
  transition: fill 0.8s ease;
}

.visor {
  fill: #1f1b3a;
  stroke: #a78bfa;
  stroke-width: 1;
}

.limb {
  stroke: #f1f1f4;
  stroke-width: 6;
  stroke-linecap: round;
  fill: none;
}

.crew__captions {
  position: absolute;
  left: 80px;
  bottom: 64px;
  display: grid;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 20px rgb(0 0 0 / 0.8);

  & > * {
    grid-area: 1 / 1;
  }
}

.crew__caption {
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
}

@keyframes drift {
  from { transform: rotate(-4deg); }
  to { transform: rotate(5deg); }
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}

@keyframes pop {
  from { opacity: 0; scale: 0.3; }
  to { opacity: 1; scale: 1; }
}
</style>
