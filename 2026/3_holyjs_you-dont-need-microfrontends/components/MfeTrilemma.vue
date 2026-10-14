<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { onBeforeUnmount, ref, watch } from 'vue'

/**
 * «Быстро, качественно, дёшево — выбери два», но про микрофронтенды: три свойства-тумблера.
 * Включить можно любые два — третье блокируется замком. Подписей-морали нет: её проговаривает докладчик,
 * на экране — механика (тумблеры + шина блокировки).
 *
 * Кликов нет: после входа на слайд пары свойств сменяют друг друга по кругу, с паузой на каждой:
 *   0 — все выключены (сюда же морфятся плитки предыдущего слайда)
 *   1 — независимость
 *   2 — независимость + целостность → простота заблокирована
 *   3 — независимость + простота → заблокирована целостность
 *   4 — целостность + простота → заблокирована независимость
 *   и снова с 1
 *
 * Переход с предыдущего слайда: плитки требований и плашка проекта имеют те же view-transition-name,
 * поэтому «Сборка в рантайме» летит в тумблер «Независимость», остальные — в соседние, плашка — в шину.
 */
/** пауза на каждом положении, мс; первое положение (после перехода) держится чуть дольше */
const HOLD_MS = 2800
const FIRST_MS = 1800

const { $renderContext } = useSlideContext()
const active = useIsSlideActive()
// вне показа (печать, обзор) цикла нет — стоит поучительное положение с замком
const s = ref($renderContext.value === 'slide' ? 0 : 2)

let timer = 0
const stop = () => clearTimeout(timer)
const next = (delay: number) => {
  timer = window.setTimeout(() => {
    s.value = s.value >= 4 ? 1 : s.value + 1
    next(HOLD_MS)
  }, delay)
}

watch(active, (a) => {
  if ($renderContext.value !== 'slide')
    return
  stop()
  s.value = 0
  if (a)
    next(FIRST_MS)
}, { immediate: true })

onBeforeUnmount(stop)

const props = [
  { id: 'independence', name: 'Независимость', color: '#fbbf24', vt: 'x-tg-t3' },
  { id: 'integrity', name: 'Целостность', color: '#60a5fa', vt: 'x-tg-t0' },
  { id: 'simplicity', name: 'Простота', color: '#34d399', vt: 'x-tg-t1' },
] as const

const configs = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
]

const on = (i: number) => configs[s.value][i] === 1
/** третье свойство блокируется, когда включены два остальных */
const locked = (i: number) => configs[s.value].reduce((a, b) => a + b, 0) === 2 && !on(i)

const vt = (name: string) => ({ viewTransitionName: name, viewTransitionClass: 'x-site' })
</script>

<template>
  <div class="tg">
    <div class="tg__row">
      <div
        v-for="(p, i) in props"
        :key="p.id"
        class="tile hud-frame hud-solid"
        :class="{ 'is-on': on(i), 'is-locked': locked(i) }"
        :style="{ '--hud-c': p.color, '--c': p.color, ...vt(p.vt) }"
      >
        <span class="tile__toggle" aria-hidden="true"><i /></span>

        <!-- образ свойства -->
        <svg class="tile__glyph" viewBox="0 0 160 100" aria-hidden="true">
          <!-- независимость: блоки сами по себе, у каждого свой релиз -->
          <g v-if="p.id === 'independence'" class="g-ind">
            <g v-for="k in 3" :key="k" :transform="`translate(${(k - 1) * 52 + 6} 0)`">
              <rect x="0" y="40" width="42" height="42" rx="7" class="g-box" />
              <path d="M 21 32 V 8 M 12 17 L 21 8 L 30 17" class="g-line g-rise" :style="{ '--k': k }" />
            </g>
          </g>
          <!-- целостность: блоки собраны в одно целое -->
          <g v-else-if="p.id === 'integrity'" class="g-int">
            <rect x="6" y="14" width="148" height="72" rx="12" class="g-ring" />
            <rect x="18" y="38" width="30" height="30" rx="6" class="g-box" />
            <rect x="65" y="38" width="30" height="30" rx="6" class="g-box" />
            <rect x="112" y="38" width="30" height="30" rx="6" class="g-box" />
            <path d="M 48 53 H 65 M 95 53 H 112" class="g-line g-link" />
          </g>
          <!-- простота: один блок, одна линия -->
          <g v-else class="g-sim">
            <rect x="48" y="26" width="64" height="48" rx="9" class="g-box" />
            <path d="M 64 50 L 76 62 L 98 38" class="g-line g-check" />
          </g>
        </svg>

        <b class="tile__name">{{ p.name }}</b>

        <!-- замок: свойство недоступно, пока включены два других -->
        <span class="tile__lock" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M 8 11 V 8 a 4 4 0 0 1 8 0 V 11" /></svg>
        </span>
      </div>
    </div>

    <!-- шина блокировки: защёлки под каждым свойством; третья всегда закрыта -->
    <div class="bus hud-frame hud-sm hud-solid" style="--hud-c: rgb(255 255 255 / 0.7)" :style="vt('x-tg-rail')">
      <span
        v-for="(p, i) in props"
        :key="p.id"
        class="bus__latch"
        :class="{ 'is-open': on(i), 'is-locked': locked(i) }"
        :style="{ '--c': p.color }"
      />
    </div>
  </div>
</template>

<style scoped>
.tg {
  position: absolute;
  inset: 0;
  padding: 70px 50px 60px;
  display: flex;
  flex-direction: column;
  gap: 38px;
  color: #fff;
  text-align: left;
}

.tg__row {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

/* ── свойство-тумблер ───────────────────────────────────────────── */
.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 20px 22px;
  filter: saturate(0.3) brightness(0.72);
  transition: filter 0.6s ease;
}

.tile.is-on {
  filter: none;
  --hud-bg: color-mix(in srgb, var(--c) 16%, rgb(10 10 20 / 0.72));
}

.tile.is-locked {
  filter: saturate(0.2) brightness(0.55);
  --hud-bg: color-mix(in srgb, #f87171 10%, rgb(10 10 20 / 0.8));
  animation: tg-jolt 0.5s ease;
}

.tile__toggle {
  align-self: flex-start;
  width: 62px;
  height: 32px;
  padding: 4px;
  border-radius: 999px;
  border: 2px solid color-mix(in srgb, var(--c) 60%, transparent);
  background: rgb(255 255 255 / 0.06);
  transition: background 0.4s ease, box-shadow 0.4s ease;

  & i {
    display: block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgb(255 255 255 / 0.5);
    transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease;
  }
}

.is-on .tile__toggle {
  background: color-mix(in srgb, var(--c) 35%, transparent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--c) 60%, transparent);

  & i {
    background: var(--c);
    transform: translateX(30px);
  }
}

.tile__glyph {
  flex: 1;
  width: 100%;
  min-height: 0;
  margin: 4px 0;
  transition: opacity 0.4s ease;
}

.is-locked .tile__glyph {
  opacity: 0.18;
}

.tile__name {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: color-mix(in oklab, var(--c) 55%, white);
}

.is-locked .tile__name {
  color: rgb(255 255 255 / 0.55);
  text-decoration: line-through;
  text-decoration-color: #f87171;
  text-decoration-thickness: 3px;
}

/* ── образы ─────────────────────────────────────────────────────── */
.g-box {
  fill: color-mix(in srgb, var(--c) 18%, transparent);
  stroke: var(--c);
  stroke-width: 2.5;
}

.g-ring {
  fill: none;
  stroke: var(--c);
  stroke-width: 2;
  stroke-dasharray: 6 6;
}

.g-line {
  fill: none;
  stroke: var(--c);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* у независимых блоков свои «релизы» — стрелки взлетают вразнобой */
.is-on .g-rise {
  animation: tg-rise 1.8s ease-in-out infinite;
  animation-delay: calc(var(--k) * 0.45s);
}

@keyframes tg-rise {
  0%, 100% { transform: translateY(4px); opacity: 0.4; }
  50% { transform: translateY(-3px); opacity: 1; }
}

.is-on .g-link {
  stroke-dasharray: 5 5;
  animation: tg-flow 0.9s linear infinite;
}

@keyframes tg-flow {
  to { stroke-dashoffset: -10; }
}

.g-check {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  transition: stroke-dashoffset 0.6s ease 0.2s;
}

.is-on .g-check {
  stroke-dashoffset: 0;
}

/* ── замок ──────────────────────────────────────────────────────── */
.tile__lock {
  position: absolute;
  left: 50%;
  top: 46%;
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  translate: -50% -50%;
  border-radius: 50%;
  border: 3px solid #f87171;
  background: rgb(60 12 16 / 0.85);
  box-shadow: 0 0 28px rgb(239 68 68 / 0.5);
  opacity: 0;
  scale: 0.4;
  transition: opacity 0.35s ease, scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  & svg {
    width: 46px;
    height: 46px;
    fill: none;
    stroke: #fca5a5;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

.is-locked .tile__lock {
  opacity: 1;
  scale: 1;
  transition-delay: 0.25s;
}

@keyframes tg-jolt {
  0%, 100% { translate: 0 0; }
  20% { translate: -6px 0; }
  40% { translate: 5px 0; }
  60% { translate: -3px 0; }
  80% { translate: 2px 0; }
}

/* ── шина блокировки ────────────────────────────────────────────── */
.bus {
  flex: none;
  height: 56px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  align-items: center;
  padding: 0 20px;
}

.bus__latch {
  justify-self: center;
  width: 62%;
  height: 12px;
  border-radius: 6px;
  background: rgb(255 255 255 / 0.12);
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

.bus__latch.is-open {
  background: var(--c);
  box-shadow: 0 0 14px var(--c);
}

.bus__latch.is-locked {
  background: #f87171;
  box-shadow: 0 0 14px rgb(239 68 68 / 0.7);
}
</style>
