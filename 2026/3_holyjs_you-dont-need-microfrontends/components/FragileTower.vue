<script setup lang="ts">
import { computed } from 'vue'

/**
 * «Динамика — опасная штука»: башня из модулей, как в дженге.
 *   0 — башня стоит, но чуть дышит: система собрана из кусков, подгруженных в рантайме
 *   1 — «хрупкая и шаткая»: версии модулей меняются на ходу, башню раскачивает всё сильнее
 *   2 — «испытание для тришейкинга»: встряхиваем — лишнее в локальных модулях осыпается,
 *       а в подгружаемых по сети сборщик ничего не видит, и всё остаётся висеть
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(2, step)))

type Block = {
  name: string
  color: string
  /** true — модуль приходит по сети: сборщик его не видит */
  remote: boolean
  versions: [string, string]
  dx: number
  /** невостребованные экспорты */
  dead: string[]
}

const blocks: Block[] = [
  { name: 'widget', color: '#fbbf24', remote: true, versions: ['1.0', '1.1'], dx: 14, dead: ['legacyApi', 'oldTheme'] },
  { name: 'profile', color: '#f472b6', remote: true, versions: ['3.0', '3.1'], dx: -10, dead: ['utils', 'polyfills'] },
  { name: 'cart', color: '#60a5fa', remote: true, versions: ['2.1', '2.2'], dx: 12, dead: ['helpers', 'mocks'] },
  { name: 'catalog', color: '#34d399', remote: false, versions: ['1.5', '2.0'], dx: -8, dead: ['unused', 'demo'] },
  { name: 'shop', color: '#a78bfa', remote: false, versions: ['5.0', '5.0'], dx: 0, dead: ['debug', 'stubs'] },
]
</script>

<template>
  <div class="ft">
    <h1 class="ft__title">
      Динамика — опасная штука
    </h1>

    <div class="ft__body">
      <ul class="ft__list">
        <li class="glass" :class="s >= 1 ? 'mf-on' : 'mf-off'">Система может быть хрупкой и шаткой</li>
        <li class="glass" :class="s >= 2 ? 'mf-on' : 'mf-off'">Испытание для тришейкинга</li>
      </ul>

      <div class="ft__stage" :class="`is-s${s}`">
        <div class="tower">
          <div
            v-for="(b, i) in blocks"
            :key="b.name"
            class="layer"
            :class="{ 'layer--remote': b.remote }"
            :style="{ '--i': blocks.length - 1 - i, '--dx': `${s >= 1 ? b.dx : 0}px`, '--c': b.color }"
          >
            <div class="hud-frame hud-solid block" :style="{ '--hud-c': b.color }">
              <span class="block__name">{{ b.name }}</span>
              <span class="block__ver">
                <span class="ver" :class="{ 'is-on': s < 1 || !b.remote && b.name !== 'catalog' }">{{ b.versions[0] }}</span>
                <span v-if="b.versions[0] !== b.versions[1]" class="ver ver--new" :class="{ 'is-on': s >= 1 }">{{ b.versions[1] }}</span>
              </span>
              <span v-if="b.remote" class="block__net">по сети</span>
            </div>

            <!-- невостребованный код: осыпается только у локальных модулей -->
            <span
              v-for="(d, j) in b.dead"
              :key="d"
              class="chip"
              :class="[{ 'is-shown': s >= 2, 'is-fall': s >= 2 && !b.remote }, j ? 'chip--r' : 'chip--l']"
              :style="{ '--j': j }"
            >{{ d }}</span>
          </div>
        </div>
        <div class="ground" />

      </div>
    </div>

  </div>
</template>

<style scoped>
.ft {
  position: absolute;
  inset: 0;
  padding: 44px 50px 40px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.ft__title {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.ft__body {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 40px;
  min-height: 0;
}

.ft__list {
  flex: none;
  width: 340px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 22px;
  line-height: 1.3;

  & li {
    margin-bottom: 16px;
    padding: 14px 20px;
    transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
  }
}

.ft__stage {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 30px;
}

/* ── башня ───────────────────────────────────────────────────── */

.tower {
  position: relative;
  width: 230px;
  display: flex;
  flex-direction: column;
  transform-origin: 50% 100%;
  animation: breathe 5s ease-in-out infinite;
}

.is-s1 .tower { animation: sway 2.6s ease-in-out infinite; }
.is-s2 .tower { animation: shake 0.22s linear 6, sway-small 2.6s ease-in-out 1.4s infinite; }

.layer {
  position: relative;
  translate: var(--dx, 0) 0;
  transition: translate 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

/* каждый слой качается чуть сильнее верхнего — как у настоящей башни */
.is-s1 .layer {
  animation: wobble 1.9s ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.18s);
}

.block {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 52px;
  margin-top: 4px;
  padding: 0 14px;
  font-size: 18px;
  font-weight: 700;
}

.block__name {
  flex: 1;
}

.block__net {
  position: absolute;
  right: 8px;
  top: -9px;
  padding: 0 7px;
  border-radius: 999px;
  background: #12121c;
  border: 1px solid rgb(255 255 255 / 0.25);
  font-size: 10px;
  font-weight: 400;
  color: rgb(255 255 255 / 0.65);
}

/* версия: новая «выталкивает» старую */
.block__ver {
  position: relative;
  min-width: 36px;
  height: 20px;
}

.ver {
  position: absolute;
  inset: 0;
  text-align: right;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  color: rgb(255 255 255 / 0.7);
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.ver.is-on {
  opacity: 1;
}

.ver--new {
  color: #fff;
  transform: translateY(8px);

  &.is-on { transform: none; }
}

/* ── осыпающийся код ─────────────────────────────────────────── */

.chip {
  position: absolute;
  top: 12px;
  padding: 1px 8px;
  border-radius: 6px;
  border: 1px dashed rgb(255 255 255 / 0.45);
  background: rgb(10 10 20 / 0.75);
  font: 11px/1.5 ui-monospace, monospace;
  color: rgb(255 255 255 / 0.65);
  opacity: 0;
  scale: 0.6;
  pointer-events: none;
}

.chip--l { right: calc(100% - 10px); }
.chip--r { left: calc(100% - 10px); top: 24px; }

.chip.is-shown {
  opacity: 1;
  scale: 1;
  transition: opacity 0.4s ease 0.3s, scale 0.4s ease 0.3s;
}

/* висит у сетевых модулей, мерцая «не знаю, нужно ли» */
.layer--remote .chip.is-shown {
  animation: dangle 1.4s ease-in-out 1.4s infinite;
  border-color: #fbbf24;
  color: #fde68a;
}

.chip.is-fall {
  animation: fall 1.1s cubic-bezier(0.5, 0, 0.9, 0.6) 1.3s forwards;
}

.chip--l.is-fall { --rot: -35deg; --sx: -50px; }
.chip--r.is-fall { --rot: 40deg; --sx: 60px; }

.ground {
  width: 300px;
  height: 2px;
  margin-top: 4px;
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.4), transparent);
}

@keyframes breathe {
  50% { transform: rotate(0.4deg); }
}

@keyframes sway {
  0%, 100% { transform: rotate(-2.4deg); }
  50% { transform: rotate(2.4deg); }
}

@keyframes sway-small {
  0%, 100% { transform: rotate(-0.8deg); }
  50% { transform: rotate(0.8deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0); }
  25% { transform: translateX(-6px) rotate(-1.2deg); }
  75% { transform: translateX(6px) rotate(1.2deg); }
}

@keyframes wobble {
  0%, 100% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
}

@keyframes dangle {
  0%, 100% { transform: rotate(-4deg); }
  50% { transform: rotate(4deg); }
}

@keyframes fall {
  to {
    transform: translate(var(--sx), 260px) rotate(var(--rot));
    opacity: 0;
  }
}
</style>
