<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { stationScreen } from '../universe/screen'

/**
 * Экипаж вокруг станции — рост проекта без чётких границ.
 * Минималистичные 2D-астронавты поверх 3D-станции; тросы тянутся к модулям
 * по их экранным позициям (universe/screen.ts).
 *
 *   0 — один астронавт на тросе: один разработчик, всё понятно
 *   1 — людей всё больше: прилетает экипаж; трос тянется, когда астронавт долетел
 *   2 — кода всё больше: каждый разработчик без остановки шлёт в свой модуль конверты-коммиты
 *   3 — зоны ответственности размываются: тросы плавно перестраиваются к чужим модулям,
 *       цвета команд гаснут
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
/**
 * 0 — тросы к модулям своих команд, 1 — к чужим. Между шагами 2 и 3 перетекает плавно:
 * точка крепления интерполируется в коде, а не CSS-переходом на координатах — так трос
 * и переезжает к новому модулю, и не отстаёт от вращающейся станции.
 */
const swap = ref(s.value >= 3 ? 1 : 0)
let swapRaf = 0
watch(() => (s.value >= 3 ? 1 : 0), (to) => {
  cancelAnimationFrame(swapRaf)
  const from = swap.value
  const start = performance.now()
  const tick = (now: number) => {
    const k = Math.min(1, (now - start) / 1100)
    const e = k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2
    swap.value = from + (to - from) * e
    if (k < 1)
      swapRaf = requestAnimationFrame(tick)
  }
  swapRaf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(swapRaf))

// клубок связей между людьми
const knots: [number, number][] = [[0, 4], [1, 5], [2, 3], [3, 7], [4, 8], [5, 0], [6, 1], [7, 4], [8, 2], [0, 6], [2, 5], [1, 7]]

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
    const [ox, oy] = sc.mod(c.team)
    const [nx, ny] = sc.mod(swapped[i])
    const k = swap.value
    const tx = ox + (nx - ox) * k
    const ty = oy + (ny - oy) * k
    const target = k > 0.5 ? swapped[i] : c.team
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
      target: [tx, ty] as [number, number],
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

/*
 * Коммиты — конверты, которые каждый разработчик по кругу отправляет в «свой» модуль
 * (туда же, куда держится его трос; на шаге размытых границ — уже в чужой).
 * Траектория считается каждый кадр от руки астронавта до модуля — вслед за вращением станции,
 * CSS-переходов на координатах нет. Ритм у всех свой, поэтому поток выглядит живым, а не строем.
 */
const active = useIsSlideActive()
const FLY = 1.7 // с, полёт конверта
const DOCK = 0.55 // с, вспышка приёма у модуля
const now = ref(0)
let mailStart = 0
let mailRaf = 0
function mailLoop(t: number) {
  now.value = (t - mailStart) / 1000
  mailRaf = requestAnimationFrame(mailLoop)
}
watch(() => active.value && s.value >= 2, (on) => {
  cancelAnimationFrame(mailRaf)
  if (!on)
    return
  mailStart = performance.now()
  now.value = 0
  mailRaf = requestAnimationFrame(mailLoop)
}, { immediate: true })
onBeforeUnmount(() => cancelAnimationFrame(mailRaf))

const ease = (k: number) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2)
const bez = (a: number, c: number, b: number, k: number) => (1 - k) ** 2 * a + 2 * (1 - k) * k * c + k * k * b

const mail = computed(() => {
  const sc = scene.value
  if (!sc || s.value < 2)
    return []
  const t = now.value
  return people.value.flatMap((p) => {
    // у каждого свой период и сдвиг: первые конверты уходят «волной», дальше — вразнобой
    const period = 2.5 + (p.i % 4) * 0.45 + p.scale * 0.4
    const local = t - 0.2 - p.i * 0.33
    if (local < 0)
      return []
    const cyc = local % period
    // рука, которая бросает: правая рука из позы астронавта (с поворотом и масштабом)
    const a = (p.rot * Math.PI) / 180
    const hx = p.x + (19 * Math.cos(a) + 6 * Math.sin(a)) * p.scale
    const hy = p.y + (19 * Math.sin(a) - 6 * Math.cos(a)) * p.scale
    const [tx, ty] = p.target
    // дуга наружу от центра станции — конверт «заходит» в модуль, а не летит по линейке
    const side = Math.sign(hx - sc.cx) || 1
    const cxp = (hx + tx) / 2 + side * 50
    const cyp = (hy + ty) / 2 - 70
    const out: { kind: 'env' | 'dock', key: string, x: number, y: number, rot?: number, scale?: number, opacity: number, color: string, r?: number }[] = []
    if (cyc < FLY) {
      const k = cyc / FLY
      const e = ease(k)
      const x = bez(hx, cxp, tx, e)
      const y = bez(hy, cyp, ty, e)
      // касательная — конверт летит «носом» вперёд, с лёгким покачиванием
      const dx = 2 * (1 - e) * (cxp - hx) + 2 * e * (tx - cxp)
      const dy = 2 * (1 - e) * (cyp - hy) + 2 * e * (ty - cyp)
      const heading = (Math.atan2(dy, dx) * 180) / Math.PI
      out.push({
        kind: 'env',
        key: `e${p.i}`,
        x,
        y,
        rot: heading * 0.35 + Math.sin(k * Math.PI * 2 + p.i) * 8,
        // вылетает из руки маленьким, в полёте крупнее, у модуля «втягивается» внутрь
        scale: (0.55 + Math.sin(k * Math.PI) * 0.55) * (k > 0.85 ? 1 - (k - 0.85) / 0.15 * 0.6 : 1),
        opacity: Math.min(1, k / 0.1, (1 - k) / 0.06),
        color: p.color,
      })
    }
    else if (cyc < FLY + DOCK) {
      // модуль принял коммит: короткое кольцо цвета модуля
      const k = (cyc - FLY) / DOCK
      out.push({ kind: 'dock', key: `d${p.i}`, x: tx, y: ty, r: 4 + k * 16, opacity: (1 - k) * 0.9, color: p.tetherColor })
    }
    return out
  })
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
        :style="{ 'stroke': p.tetherColor, '--delay': `${p.i * 0.09}s` }"
      />
      <!-- клубок между людьми -->
      <path v-for="(d, k) in tangle" :key="`k${k}`" class="knot" :d="d" />

      <!-- коммиты: конверты от разработчиков к модулям -->
      <template v-for="m in mail" :key="m.key">
        <g
          v-if="m.kind === 'env'"
          class="env"
          :style="{ transform: `translate(${m.x}px, ${m.y}px) rotate(${m.rot}deg) scale(${m.scale})`, opacity: m.opacity, '--seal': m.color }"
        >
          <rect x="-11" y="-7.5" width="22" height="15" rx="2" class="env__body" />
          <path d="M -10.5 -6.5 L 0 1.5 L 10.5 -6.5" class="env__flap" />
          <circle cy="1.5" r="2.6" class="env__seal" />
        </g>
        <circle
          v-else
          class="dock"
          :cx="m.x"
          :cy="m.y"
          :r="m.r"
          :style="{ stroke: m.color, opacity: m.opacity }"
        />
      </template>

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
  /* исчезает сразу, вместе с астронавтом */
  transition: stroke-opacity 0.35s ease, stroke-dashoffset 0.5s ease, stroke 0.8s ease;
}

/* появляется, когда астронавт долетел (его полёт — 1.2 с с той же задержкой --delay),
   иначе трос тянется от точки, где астронавта ещё нет */
.tether.is-on {
  stroke-opacity: 0.75;
  stroke-dashoffset: 0;
  transition:
    stroke-opacity 0.4s ease calc(var(--delay) + 0.9s),
    stroke-dashoffset 1s ease calc(var(--delay) + 0.9s),
    stroke 0.8s ease;
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

.env__body {
  fill: #f4f1ea;
  stroke: rgb(0 0 0 / 0.25);
  stroke-width: 0.8;
}

.env__flap {
  fill: none;
  stroke: #b9b4a8;
  stroke-width: 1.1;
  stroke-linejoin: round;
}

.env__seal {
  fill: var(--seal);
  transition: fill 0.8s ease;
}

.env {
  filter: drop-shadow(0 0 5px rgb(255 255 255 / 0.35));
}

.dock {
  fill: none;
  stroke-width: 1.6;
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

</style>
