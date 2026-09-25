<script setup lang="ts">
import { computed } from 'vue'

/**
 * Линковка при сборке против подгрузки в рантайме.
 * Слева модули вшиваются в бандл Shop на CI, справа оболочка в браузере
 * сама загружает модули с серверов команд при открытии страницы.
 *
 *   0 — две схемы, пока пустые
 *   1 — сборка: пакеты → сборка Shop → один бандл → браузер
 *   2 — рантайм: браузер грузит оболочку, та тянет модули по сети
 *   3 — Cart выпустил 2.2: слева нужен релиз Shop, справа — обновить страницу
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(3, step)))

const W = 430
const modules = [
  { id: 'catalog', v: '1.5', color: '#34d399' },
  { id: 'cart', v: '2.1', color: '#f472b6' },
  { id: 'search', v: '4.3', color: '#60a5fa' },
]
/** центры колонок модулей внутри панели */
const X = [85, 215, 345]

/** версия модуля в проде слева / справа */
const leftV = (m: typeof modules[number]) => m.v
const rightV = (m: typeof modules[number]) => (m.id === 'cart' && s.value >= 3 ? '2.2' : m.v)
const srcV = (m: typeof modules[number]) => (m.id === 'cart' && s.value >= 3 ? '2.2' : m.v)

/** задержка появления: на своём шаге — по хореографии, на следующих — сразу */
const d = (at: number, t: number) => `${s.value === at ? t : 0}s`

const captions = [
  'Два способа собрать страницу из модулей разных команд',
  'Сборка: модули линкуются в один бандл, версии зафиксированы в CI',
  'Рантайм: оболочка в браузере сама загружает модули с их серверов',
  'Cart выпустил 2.2: слева нужен релиз Shop, справа достаточно обновить страницу',
]
const state = (i: number) => (i === s.value ? 'mf-on' : i < s.value ? 'mf-out' : 'mf-off')
</script>

<template>
  <div class="bvr">
    <h1 class="bvr__title">
      Уникальная сила микрофронтендов — подгрузка в рантайме
    </h1>

    <div class="bvr__panels">
      <!-- ── сборка ─────────────────────────────────────────────── -->
      <section class="panel glass" :class="{ 'is-on': s >= 1, 'is-update': s >= 3 }" :style="{ width: `${W}px` }">
        <h2>Линковка при сборке</h2>

        <svg class="wires" aria-hidden="true">
          <path
            v-for="(x, i) in X"
            :key="i"
            class="wire"
            :d="`M ${x} 88 C ${x} 112 215 104 215 124`"
            :style="{ '--c': modules[i].color, 'transitionDelay': d(1, 0.35 + i * 0.08) }"
          />
          <path class="wire" d="M 215 164 V 190" :style="{ transitionDelay: d(1, 1.05) }" />
          <path class="wire" d="M 215 232 V 256" :style="{ transitionDelay: d(1, 1.6) }" />
        </svg>

        <!-- пакеты в реестре -->
        <span
          v-for="(m, i) in modules"
          :key="m.id"
          class="pkg"
          :class="{ 'is-new': m.id === 'cart' && s >= 3 }"
          :style="{ 'left': `${X[i]}px`, '--c': m.color, 'transitionDelay': d(1, i * 0.1) }"
        >
          {{ m.id }} <b>{{ srcV(m) }}</b>
        </span>

        <!-- сборщик -->
        <div class="bundler" :style="{ transitionDelay: d(1, 0.7) }">
          <span class="bundler__text">сборка Shop</span>
          <span class="bundler__warn">нужна пересборка Shop</span>
        </div>

        <!-- бандл: модули вшиты внутрь -->
        <div class="bundle" :style="{ transitionDelay: d(1, 1.25) }">
          <span class="bundle__name">shop.a91f.js</span>
          <span class="bundle__stripes">
            <i v-for="m in modules" :key="m.id" :style="{ background: m.color }" />
          </span>
        </div>

        <!-- браузер -->
        <div class="browser browser--left" :style="{ transitionDelay: d(1, 1.8) }">
          <span class="browser__bar"><i /><i /><i /></span>
          <span class="browser__page">
            <span
              v-for="m in modules"
              :key="m.id"
              class="block is-filled"
              :class="{ 'is-stale': m.id === 'cart' && s >= 3 }"
              :style="{ '--c': m.color }"
            >{{ m.id }} {{ leftV(m) }}</span>
          </span>
        </div>
      </section>

      <!-- ── рантайм ────────────────────────────────────────────── -->
      <section class="panel glass" :class="{ 'is-on': s >= 2, 'is-update': s >= 3 }" :style="{ width: `${W}px` }">
        <h2>Подгрузка в рантайме</h2>

        <svg class="wires" aria-hidden="true">
          <path
            v-for="(x, i) in X"
            :key="i"
            class="wire wire--net"
            :d="`M ${x} 256 V 168`"
            :style="{ '--c': modules[i].color, 'transitionDelay': d(2, 0.7 + i * 0.08) }"
          />
        </svg>

        <!-- браузер с оболочкой и слотами -->
        <div class="browser browser--right" :style="{ transitionDelay: d(2, 0) }">
          <span class="browser__bar"><i /><i /><i /><span class="browser__url">shop.ru</span></span>
          <span class="shell">оболочка Shop</span>
        </div>
        <span
          v-for="(m, i) in modules"
          :key="m.id"
          class="slot"
          :class="{ 'is-flash': m.id === 'cart' && s >= 3 }"
          :style="{
            'left': `${X[i]}px`,
            '--c': m.color,
            '--fill': d(2, 1.7 + i * 0.25),
            '--flash': `${s === 3 ? 1.7 : 0}s`,
          }"
        >
          <span :key="rightV(m)" class="slot__v">{{ m.id }} {{ rightV(m) }}</span>
        </span>

        <!-- пакеты по сети: на шаге загрузки — все, на шаге обновления — только cart -->
        <template v-for="(m, i) in modules" :key="m.id">
          <span
            v-if="s === 2 || (s === 3 && m.id === 'cart')"
            :key="`${m.id}${s}`"
            class="packet"
            :style="{ 'left': `${X[i]}px`, '--c': m.color, 'animationDelay': s === 2 ? `${1.1 + i * 0.25}s` : '1.1s' }"
          />
        </template>

        <!-- серверы команд -->
        <span
          v-for="(m, i) in modules"
          :key="m.id"
          class="host"
          :style="{ 'left': `${X[i]}px`, '--c': m.color, 'transitionDelay': d(2, 0.4 + i * 0.1) }"
        >
          <span class="host__rack"><i /><i /></span>
          <span class="host__name">{{ m.id }}.cdn</span>
          <b :key="srcV(m)" class="host__v" :class="{ 'is-new': m.id === 'cart' && s >= 3 }">{{ srcV(m) }}</b>
        </span>
      </section>
    </div>

    <div class="bvr__captions">
      <div v-for="(text, i) in captions" :key="i" :class="state(i)">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bvr {
  position: absolute;
  inset: 0;
  padding: 36px 50px 30px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.bvr__title {
  margin: 0 0 16px;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.bvr__panels {
  display: flex;
  justify-content: space-between;
}

.bvr__captions {
  display: grid;
  margin-top: auto;
  font-size: 20px;
  line-height: 1.3;
  text-shadow: 0 2px 16px rgb(0 0 0 / 0.8);

  & > * {
    grid-area: 1 / 1;
    transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
  }
}

/* ── панель ─────────────────────────────────────────────────────── */
.panel {
  position: relative;
  height: 340px;
  flex: none;

  & h2 {
    position: absolute;
    left: 20px;
    top: 14px;
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: rgb(255 255 255 / 0.45);
    transition: color 0.5s ease;
  }

  &.is-on h2 {
    color: #fff;
  }
}

/* всё содержимое панели проявляется на её шаге, по очереди */
.panel > :not(h2, svg) {
  opacity: 0;
  translate: 0 8px;
  transition: opacity 0.5s ease, translate 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: inherit;
}

.panel.is-on > :not(h2, svg) {
  opacity: 1;
  translate: none;
}

.wires {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.wire {
  fill: none;
  stroke: color-mix(in oklab, var(--c, #fff) 60%, transparent);
  stroke-width: 1.6;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  transition: stroke-dashoffset 0.6s ease;
}

.is-on .wire {
  stroke-dashoffset: 0;
}

/* сетевые запросы — пунктиром: это не ссылка в коде, а поход по сети */
.wire--net {
  stroke-dasharray: 4 5;
  stroke-dashoffset: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.is-on .wire--net {
  opacity: 1;
}

/* ── сборка ─────────────────────────────────────────────────────── */
.pkg {
  position: absolute;
  top: 58px;
  translate: -50% 0;
  padding: 4px 11px;
  border-radius: 999px;
  border: 1.5px solid var(--c);
  background: color-mix(in oklab, var(--c) 22%, #0b0b12);
  font-size: 14px;
  white-space: nowrap;

  & b {
    font-variant-numeric: tabular-nums;
  }
}

.panel.is-on > .pkg {
  translate: -50% 0;
}

.pkg.is-new {
  animation: flash 1.2s ease;
}

.bundler {
  position: absolute;
  left: 100px;
  top: 124px;
  width: 230px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  border: 1.5px solid rgb(255 255 255 / 0.4);
  background: rgb(255 255 255 / 0.06);
  font-size: 15px;
  font-weight: 600;
  transition: border-color 0.5s ease 0.6s, background 0.5s ease 0.6s;
}

/* надписи сменяют друг друга в одной ячейке */
.bundler > span {
  grid-area: 1 / 1;
  white-space: nowrap;
  transition: opacity 0.4s ease 0.6s;
}

.bundler__warn {
  color: #fcd34d;
  opacity: 0;
}

.is-update .bundler__text {
  opacity: 0;
}

.is-update .bundler {
  border-color: #fbbf24;
  background: rgb(251 191 36 / 0.12);
}

.is-update .bundler__warn {
  opacity: 1;
}

.bundle {
  position: absolute;
  left: 120px;
  top: 190px;
  width: 190px;
  height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid rgb(255 255 255 / 0.2);
  background: rgb(10 10 20 / 0.7);
}

.bundle__name {
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  color: rgb(255 255 255 / 0.8);
}

.bundle__stripes {
  display: flex;
  gap: 3px;
  height: 6px;

  & i {
    flex: 1;
    border-radius: 3px;
  }
}

/* ── браузер ────────────────────────────────────────────────────── */
.browser {
  position: absolute;
  border-radius: 10px;
  border: 1px solid rgb(255 255 255 / 0.22);
  background: rgb(12 12 22 / 0.85);
  overflow: hidden;
}

.browser__bar {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 20px;
  padding: 0 9px;
  background: rgb(255 255 255 / 0.06);

  & i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgb(255 255 255 / 0.3);
  }
}

.browser__url {
  margin-left: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  color: rgb(255 255 255 / 0.55);
}

.browser--left {
  left: 30px;
  top: 256px;
  width: 370px;
  height: 66px;
}

.browser__page {
  display: flex;
  gap: 8px;
  padding: 8px 10px;
}

.block {
  flex: 1;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--c);
  background: color-mix(in oklab, var(--c) 28%, #0b0b12);
  transition: opacity 0.5s ease 0.6s;
}

/* в проде слева остаётся старая версия cart, пока Shop не пересоберут */
.block.is-stale {
  opacity: 0.45;
}

.browser--right {
  left: 30px;
  top: 44px;
  width: 370px;
  height: 124px;
}

.shell {
  display: block;
  padding: 7px 12px 0;
  font-size: 12px;
  color: rgb(255 255 255 / 0.6);
}

/* слот оболочки: пустой пунктир, пока модуль не доехал по сети */
.slot {
  position: absolute;
  top: 100px;
  width: 110px;
  height: 52px;
  translate: -50% 0;
  display: grid;
  place-items: center;
  border-radius: 8px;
  border: 1.5px dashed rgb(255 255 255 / 0.25);
  font-size: 12px;
  font-weight: 600;
}

.panel.is-on > .slot {
  translate: -50% 0;
}

.slot__v {
  opacity: 0;
}

.panel.is-on .slot {
  animation: fill 0.5s ease var(--fill) forwards;
}

.panel.is-on .slot__v {
  animation: fade-in 0.4s ease var(--fill) forwards;
}

.slot.is-flash {
  animation: flash 1.2s ease var(--flash) both !important;
  border-style: solid;
  border-color: var(--c);
  background: color-mix(in oklab, var(--c) 28%, #0b0b12);

  /* новая версия появляется, когда пакет доехал */
  & .slot__v {
    animation: fade-in 0.4s ease var(--flash) forwards !important;
  }
}

.packet {
  position: absolute;
  top: 256px;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 12px var(--c);
  opacity: 0;
  animation: fly 0.6s cubic-bezier(0.45, 0, 0.55, 1) both;
}

.panel > .packet {
  translate: none;
}

/* сервер команды */
.host {
  position: absolute;
  top: 258px;
  translate: -50% 0;
  display: grid;
  justify-items: center;
  gap: 3px;
  font-size: 12px;
}

.panel.is-on > .host {
  translate: -50% 0;
}

.host__rack {
  display: grid;
  gap: 3px;
  width: 44px;
  padding: 4px;
  border-radius: 5px;
  border: 1.5px solid var(--c);
  background: color-mix(in oklab, var(--c) 18%, #0b0b12);

  & i {
    height: 6px;
    border-radius: 2px;
    background: color-mix(in oklab, var(--c) 55%, transparent);
  }
}

.host__name {
  font-family: 'Fira Code', monospace;
  color: rgb(255 255 255 / 0.75);
}

.host__v {
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.host__v.is-new {
  color: var(--c);
  animation: bump 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s backwards;
}

@keyframes fly {
  0% { opacity: 0; transform: translateY(0); }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-96px); }
}

@keyframes fill {
  to {
    border-style: solid;
    border-color: var(--c);
    background: color-mix(in oklab, var(--c) 28%, #0b0b12);
  }
}

@keyframes fade-in {
  to { opacity: 1; }
}

@keyframes flash {
  0%, 30% { box-shadow: 0 0 0 2px var(--c), 0 0 18px var(--c); }
  100% { box-shadow: none; }
}

@keyframes bump {
  from { opacity: 0; transform: scale(1.5); }
}
</style>
