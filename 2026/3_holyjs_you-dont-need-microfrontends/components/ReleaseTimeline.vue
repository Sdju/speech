<script setup lang="ts">
import { computed } from 'vue'

/**
 * Блокирующие релизы в распределённом монолите — таймлайн одной недели.
 * Три пакета публикуются в реестр, корневое приложение Shop забирает их версии.
 * Понедельник — спокойная неделя как обычно; со вторника начинается проблема.
 * Две нижние дорожки — две стратегии обновления Shop, чтобы разница была видна рядом.
 *
 *   0 — исходные версии: Shop собран из Catalog 1.4, Profile 3.0, Cart 2.1
 *   1 — пн: все выпускают патчи, Shop спокойно релизится
 *   2 — вт: Catalog 2.0 — ломающее обновление
 *   3 — ср: Profile 3.1 — стабильное и независимое
 *   4 — ср: Cart 2.2 — стабильное, но требует Catalog 2.0
 *   5 — хорошо: Shop берёт только Profile, релиз в среду; Catalog и Cart ждут друг друга
 *   6 — плохо: Shop первым берёт Catalog 2.0, сборка падает, Profile стоит в очереди
 *   7 — чт: Catalog 2.0.1 чинит совместимость, в пятницу выезжает всё разом
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(7, step)))

const DAYS = ['пн', 'вт', 'ср', 'чт', 'пт']
const X0 = 262
const DX = 142
const x = (d: number) => X0 + d * DX
/** исходные версии — левее понедельника */
const BASE_X = 208
/** понедельник: утро, день, вечер — пакеты выходят по очереди, Shop сразу релизит каждый */
const MON = [x(0) - 18, x(0) + 30, x(0) + 78]
/** пауза между понедельничными релизами, с */
const STAGGER = 0.9

const COLORS = { catalog: '#34d399', profile: '#f472b6', cart: '#60a5fa', shop: '#a78bfa' }

const lanes = [
  { id: 'catalog', name: 'Catalog', note: 'пакет', y: 84, base: '1.4', monday: '1.5' },
  { id: 'profile', name: 'Profile', note: 'пакет', y: 136, base: '3.0', monday: '3.0.1' },
  { id: 'cart', name: 'Cart', note: 'пакет, зависит от Catalog', y: 188, base: '2.1', monday: '2.1.1' },
] as const

const GOOD_Y = 276
const BAD_Y = 348

const captions = [
  'Shop собран из опубликованных пакетов, каждый релизится сам',
  'Понедельник: все выпускают патчи, Shop спокойно забирает их и релизится',
  'Вторник: Catalog выпускает 2.0 с ломающим изменением API',
  'Среда: Profile выпускает 3.1 — стабильно и без связи с Catalog',
  'Среда: Cart выпускает 2.2, которому уже нужен Catalog 2.0',
  'Хорошо: Profile выехал в среду, но Catalog и Cart застряли вместе',
  'Плохо: Shop взял Catalog 2.0 — сборка упала, Profile ждёт в очереди',
  'Четверг: фикс Catalog 2.0.1 — в пятницу выезжает всё разом',
]
</script>

<template>
  <div class="rt">
    <h1 class="rt__title">
      Блокирующие релизы
    </h1>

    <!--
      Графика — SVG, подписи — HTML поверх в тех же координатах (1 единица = 1px).
      Slidev масштабирует слайд CSS-свойством zoom, а Chrome с zoom неверно ставит <text> в SVG.
    -->
    <div class="rt__stage">
      <svg class="rt__svg" viewBox="0 0 900 400" width="900" height="400">
        <defs>
          <pattern id="rt-wait" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="rgb(255 255 255 / 0.03)" />
            <rect width="3" height="8" fill="rgb(255 255 255 / 0.12)" />
          </pattern>
          <pattern id="rt-broken" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="rgb(239 68 68 / 0.08)" />
            <rect width="3" height="8" fill="rgb(239 68 68 / 0.3)" />
          </pattern>
          <marker id="rt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(255 255 255 / 0.6)" />
          </marker>
        </defs>

        <line v-for="(d, i) in DAYS" :key="d" :x1="x(i)" :x2="x(i)" y1="44" y2="380" class="axis__tick" />
        <line v-for="l in lanes" :key="l.id" :x1="BASE_X" x2="870" :y1="l.y" :y2="l.y" class="lane__line" :style="{ '--c': COLORS[l.id] }" />

        <!-- ср: Cart 2.2 → Catalog 2.0 -->
        <g class="ev" :class="{ 'is-on': s >= 4 }">
          <path
            class="dep"
            :d="`M ${x(2) - 24} ${lanes[2].y - 12} C ${x(2) - 60} ${lanes[0].y + 40}, ${x(1) + 60} ${lanes[0].y + 30}, ${x(1) + 26} ${lanes[0].y + 12}`"
            marker-end="url(#rt-arrow)"
          />
        </g>

        <!-- Shop: общая история понедельника, потом «первым взяли Profile» -->
        <g class="root" :class="{ 'is-on': s >= 1, 'is-dim': s >= 6 }">
          <line :x1="BASE_X" x2="870" :y1="GOOD_Y" :y2="GOOD_Y" class="lane__line lane__line--root" />
          <g v-for="(mx, i) in MON" :key="mx" class="ev" :class="{ 'is-on': s >= 1 }" :style="{ '--d': `${i * STAGGER + 0.4}s` }">
            <path :d="`M ${mx} ${lanes[i].y + 14} L ${mx} ${GOOD_Y - 12}`" class="flow flow--calm" marker-end="url(#rt-arrow)" />
          </g>
          <g class="ev" :class="{ 'is-on': s >= 5 }">
            <path :d="`M ${x(2)} ${lanes[1].y + 14} C ${x(2) - 30} ${lanes[2].y}, ${x(2) - 30} ${lanes[2].y + 30}, ${x(2)} ${GOOD_Y - 16}`" class="flow" marker-end="url(#rt-arrow)" />
            <rect :x="x(3) - 30" :y="GOOD_Y - 13" :width="870 - x(3) + 30" height="26" rx="4" fill="url(#rt-wait)" />
          </g>
        </g>

        <!-- Shop: «первым взяли Catalog» -->
        <g class="root" :class="{ 'is-on': s >= 6 }">
          <line :x1="BASE_X" x2="870" :y1="BAD_Y" :y2="BAD_Y" class="lane__line lane__line--root" />
          <path :d="`M ${x(1)} ${lanes[0].y + 14} L ${x(1)} ${BAD_Y - 16}`" class="flow flow--bad" marker-end="url(#rt-arrow)" />
          <rect :x="x(1) + 58" :y="BAD_Y - 13" :width="(s >= 7 ? x(3) : 870) - x(1) - 58" height="26" rx="4" fill="url(#rt-broken)" class="blocked" />
          <path :d="`M ${x(2)} ${lanes[1].y + 14} L ${x(2)} ${BAD_Y - 16}`" class="flow flow--queued" marker-end="url(#rt-arrow)" />
          <g class="ev" :class="{ 'is-on': s >= 7 }">
            <path :d="`M ${x(3)} ${lanes[0].y + 14} L ${x(4) - 30} ${BAD_Y - 16}`" class="flow" marker-end="url(#rt-arrow)" />
          </g>
        </g>
      </svg>

      <!-- подписи -->
      <span v-for="(d, i) in DAYS" :key="d" class="lbl lbl--day" :style="{ left: `${x(i)}px`, top: '34px' }">{{ d }}</span>

      <template v-for="(l, li) in lanes" :key="l.id">
        <span class="lbl lbl--lane" :style="{ left: '20px', top: `${l.y - 4}px` }">{{ l.name }}<small>{{ l.note }}</small></span>
        <span class="pill pill--base" :style="{ left: `${BASE_X}px`, top: `${l.y}px`, '--c': COLORS[l.id] }">{{ l.base }}</span>
        <!-- пн: спокойные патчи -->
        <span class="ev pill pill--calm" :class="{ 'is-on': s >= 1 }" :style="{ left: `${MON[li]}px`, top: `${l.y}px`, '--c': COLORS[l.id], '--d': `${li * STAGGER}s` }">{{ l.monday }}</span>
      </template>

      <span class="ev pill pill--breaking" :class="{ 'is-on': s >= 2 }" :style="{ left: `${x(1)}px`, top: `${lanes[0].y}px`, '--c': COLORS.catalog }">2.0</span>
      <span class="ev lbl lbl--tag lbl--bad" :class="{ 'is-on': s >= 2 }" :style="{ left: `${x(1) + 38}px`, top: `${lanes[0].y - 26}px` }">ломает API</span>

      <span class="ev pill" :class="{ 'is-on': s >= 3 }" :style="{ left: `${x(2)}px`, top: `${lanes[1].y}px`, '--c': COLORS.profile }">3.1</span>

      <span class="ev pill" :class="{ 'is-on': s >= 4 }" :style="{ left: `${x(2)}px`, top: `${lanes[2].y}px`, '--c': COLORS.cart }">2.2</span>
      <span class="ev lbl lbl--tag" :class="{ 'is-on': s >= 4 }" :style="{ left: `${x(2) + 40}px`, top: `${lanes[2].y - 8}px` }">нужен Catalog 2.0</span>

      <span class="ev pill pill--fix" :class="{ 'is-on': s >= 7 }" :style="{ left: `${x(3)}px`, top: `${lanes[0].y}px`, '--c': COLORS.catalog }">2.0.1</span>
      <span class="ev lbl lbl--tag lbl--good" :class="{ 'is-on': s >= 7 }" :style="{ left: `${x(3) + 44}px`, top: `${lanes[0].y - 26}px` }">фикс</span>

      <div class="root" :class="{ 'is-on': s >= 1, 'is-dim': s >= 6 }">
        <span class="lbl lbl--lane" :style="{ left: '20px', top: `${GOOD_Y - 14}px` }">Shop<small>{{ s >= 5 ? 'первым взяли Profile' : 'корневое приложение' }}</small></span>
        <span
          v-for="(mx, i) in MON"
          :key="mx"
          class="ev pill pill--ok pill--check"
          :class="{ 'is-on': s >= 1 }"
          :style="{ left: `${mx}px`, top: `${GOOD_Y}px`, '--d': `${i * STAGGER + 0.7}s` }"
        >✓</span>
        <span class="ev pill pill--ok" :class="{ 'is-on': s >= 5 }" :style="{ left: `${x(2)}px`, top: `${GOOD_Y}px` }">релиз ✓</span>
        <span class="ev lbl lbl--wait" :class="{ 'is-on': s >= 5 }" :style="{ left: `${x(3) - 18}px`, top: `${GOOD_Y - 8}px` }">Catalog 2.0 и Cart 2.2 ждут друг друга</span>
      </div>

      <div class="root" :class="{ 'is-on': s >= 6 }">
        <span class="lbl lbl--lane" :style="{ left: '20px', top: `${BAD_Y - 14}px` }">Shop<small>первым взяли Catalog</small></span>
        <span v-for="mx in MON" :key="mx" class="pill pill--ok pill--check" :style="{ left: `${mx}px`, top: `${BAD_Y}px` }">✓</span>
        <span class="pill pill--fail" :style="{ left: `${x(1) + 10}px`, top: `${BAD_Y}px` }">сборка ✕</span>
        <span class="lbl lbl--wait lbl--bad" :style="{ left: `${x(2) + 12}px`, top: `${BAD_Y - 8}px` }">Profile 3.1 в очереди</span>
        <span class="ev pill pill--ok" :class="{ 'is-on': s >= 7 }" :style="{ left: `${x(4)}px`, top: `${BAD_Y}px` }">релиз всего</span>
      </div>
    </div>

    <div class="rt__captions">
      <div
        v-for="(text, i) in captions"
        :key="i"
        class="rt__caption"
        :class="i === s ? 'mf-on' : i < s ? 'mf-out' : 'mf-off'"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.rt {
  position: absolute;
  inset: 0;
  padding: 44px 50px 40px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.rt__title {
  margin: 0 0 6px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.rt__stage {
  position: relative;
  flex: none;
  width: 900px;
  height: 400px;
}

.rt__svg {
  position: absolute;
  inset: 0;
  display: block;
  overflow: visible;
}

.axis__tick {
  stroke: rgb(255 255 255 / 0.08);
}

.lane__line {
  stroke: var(--c, rgb(255 255 255 / 0.4));
  stroke-opacity: 0.35;
  stroke-width: 2;
}

.lane__line--root {
  stroke: #a78bfa;
}

.dep {
  fill: none;
  stroke: #60a5fa;
  stroke-width: 1.5;
  stroke-dasharray: 5 4;
}

.flow {
  fill: none;
  stroke: rgb(255 255 255 / 0.5);
  stroke-width: 1.5;
}

.flow--bad { stroke: #fca5a5; }
.flow--queued { stroke-dasharray: 3 4; stroke: rgb(255 255 255 / 0.35); }

.blocked {
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ── подписи ─────────────────────────────────────────────────── */

.lbl,
.pill {
  position: absolute;
  white-space: nowrap;
}

.lbl--day {
  translate: -50% -50%;
  font-size: 14px;
  color: rgb(255 255 255 / 0.5);
}

.lbl--lane {
  display: flex;
  flex-direction: column;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.1;

  & small {
    font-size: 11px;
    font-weight: 400;
    color: rgb(255 255 255 / 0.45);
  }
}

.lbl--tag {
  font-size: 12px;
  color: rgb(255 255 255 / 0.6);
}

.lbl--wait {
  font-size: 12px;
  color: rgb(255 255 255 / 0.75);
}

.lbl--bad { color: #fca5a5; }
.lbl--good { color: #6ee7b7; }

.pill {
  translate: -50% -50%;
  padding: 3px 14px;
  border-radius: 999px;
  border: 1.5px solid var(--c, #a78bfa);
  background: color-mix(in oklab, var(--c, #a78bfa) 28%, #0b0b12);
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.pill--base {
  background: #12121c;
  border-color: color-mix(in oklab, var(--c) 50%, transparent);
  padding-inline: 10px;
}

.pill--breaking {
  border-color: #ef4444;
  border-width: 2px;
}

.pill--fix {
  border-style: dashed;
}

.pill--check {
  padding: 2px 7px;
  font-size: 12px;
}

.flow--calm {
  stroke: rgb(255 255 255 / 0.35);
}

/* понедельничные патчи — спокойные, без акцента */
.pill--calm {
  background: #12121c;
  padding-inline: 10px;
}

.pill--ok {
  --c: #34d399;
}

.pill--fail {
  --c: #ef4444;
}

/* появление шагов */
.ev,
.root {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.ev.is-on,
.root.is-on {
  opacity: 1;
  transform: none;
}

/* понедельничные релизы идут по очереди: задержка только на появлении, исчезают сразу */
.ev.is-on {
  transition-delay: var(--d, 0s);
}

/* хороший сценарий приглушаем, когда показываем плохой, — но оставляем для сравнения */
.root.is-dim {
  opacity: 0.45;
}

.rt__captions {
  display: grid;
  font-size: 20px;
  line-height: 1.3;
  min-height: 2.6em;

  & > * {
    grid-area: 1 / 1;
  }
}

.rt__caption {
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
}
</style>
