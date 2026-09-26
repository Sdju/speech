<script setup lang="ts">
import { computed } from 'vue'

/**
 * «Как достичь»: релиз продукта из раздельно опубликованных пакетов.
 * Слева направо: репозитории команд → реестр пакетов → package.json Shop → прод.
 * Публикация у каждой команды своя и независимая, релиз продукта — одна сборка Shop.
 *
 *   0 — команды в своих репозиториях, Shop отдельно
 *   1 — между ними появляется реестр пакетов
 *   2 — каждая команда публикует свой пакет в реестр
 *   3 — версии: в реестре копится история, Shop задаёт диапазоны в package.json
 *   4 — Shop берёт пакеты из реестра, собирает и выкатывает релиз
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(4, step)))

const teams = [
  { id: 'catalog', color: '#34d399', y: 58, old: '1.4.0', v: '1.5.0', range: '^1.5.0' },
  { id: 'profile', color: '#f472b6', y: 160, old: '3.0.0', v: '3.0.1', range: '~3.0.1' },
  { id: 'cart', color: '#60a5fa', y: 262, old: '2.0.3', v: '2.1.0', range: '2.1.0' },
]

// колонки сцены
const TEAM_W = 196
const REG_X = 320
const REG_W = 250
const SHOP_X = 680
const SHOP_W = 200
/** строки зависимостей в package.json */
const jsonY = (i: number) => 64 + i * 30
const PROD_Y = 204

/** задержка на своём шаге — по хореографии, на следующих — сразу */
const d = (at: number, t: number) => `${s.value === at ? t : 0}s`

const captions = [
  'Каждая команда живёт в своём репозитории со своим CI',
  'Между командами и продуктом появляется реестр пакетов',
  'Команды публикуют пакеты в реестр — когда хотят, в своём темпе',
  'Версии копятся в реестре, а Shop диапазонами решает, какие брать',
  'Shop собирает релиз из опубликованных пакетов — и выкатывает его целиком',
]
const state = (i: number) => (i === s.value ? 'mf-on' : i < s.value ? 'mf-out' : 'mf-off')
</script>

<template>
  <div class="pr">
    <h1 class="pr__title">
      Релиз из раздельных пакетов
    </h1>

    <div class="pr__stage">
      <!-- провода: публикация (команда → реестр) и потребление (реестр → Shop) -->
      <svg class="wires" aria-hidden="true">
        <g v-for="(t, i) in teams" :key="t.id">
          <path
            class="wire wire--pub"
            :class="{ 'is-on': s >= 2 }"
            :d="`M ${TEAM_W} ${t.y} H ${REG_X}`"
            :style="{ '--c': t.color, 'transitionDelay': d(2, i * 0.35) }"
          />
          <path
            class="wire wire--use"
            :class="{ 'is-on': s >= 4 }"
            :d="`M ${REG_X + REG_W} ${t.y} C ${REG_X + REG_W + 60} ${t.y} ${SHOP_X - 60} ${jsonY(i)} ${SHOP_X} ${jsonY(i)}`"
            :style="{ '--c': t.color, 'transitionDelay': d(4, i * 0.15) }"
          />
        </g>
        <path
          class="wire wire--use"
          :class="{ 'is-on': s >= 4 }"
          :d="`M ${SHOP_X + SHOP_W / 2} 162 V ${PROD_Y}`"
          :style="{ '--c': '#a78bfa', 'transitionDelay': d(4, 0.8) }"
        />
      </svg>

      <!-- подписи двух разных действий -->
      <span class="flow flow--pub" :class="{ 'is-on': s >= 2 }" :style="{ left: `${(TEAM_W + REG_X) / 2}px` }">
        публикация<br>независимо
      </span>
      <span class="flow flow--use" :class="{ 'is-on': s >= 4 }" :style="{ left: `${(REG_X + REG_W + SHOP_X) / 2}px` }">
        релиз<br>одной сборкой
      </span>

      <!-- репозитории команд -->
      <div
        v-for="(t, i) in teams"
        :key="t.id"
        class="team hud-frame hud-solid"
        :class="{ 'is-published': s >= 2 }"
        :style="{ '--c': t.color, '--hud-c': t.color, 'top': `${t.y}px`, 'width': `${TEAM_W}px`, '--pub': d(2, i * 0.35) }"
      >
        <b>{{ t.id }}</b>
        <small>свой репозиторий</small>
        <!-- мини-пайплайн: загорается, когда команда публикует -->
        <span class="ci"><i /><i /><i /></span>
      </div>

      <!-- пакеты в полёте из репозитория в реестр -->
      <template v-for="(t, i) in teams" :key="t.id">
        <span
          v-if="s === 2"
          class="parcel"
          :style="{ '--c': t.color, 'top': `${t.y}px`, 'left': `${TEAM_W - 20}px`, '--to': `${REG_X + 40 - TEAM_W}px`, 'animationDelay': `${0.2 + i * 0.35}s` }"
        >@shop/{{ t.id }}</span>
      </template>

      <!-- реестр -->
      <div
        class="registry glass"
        :class="{ 'is-on': s >= 1 }"
        :style="{ left: `${REG_X}px`, width: `${REG_W}px` }"
      >
        <span class="box-head">реестр пакетов</span>
        <div
          v-for="(t, i) in teams"
          :key="t.id"
          class="reg-row hud-dashed"
          :class="{ 'is-on': s >= 2, 'has-history': s >= 3 }"
          :style="{ '--c': t.color, '--hud-c': 'rgb(255 255 255 / 0.5)', 'top': `${t.y}px`, '--pub': d(2, 0.9 + i * 0.35) }"
        >
          <!-- пустое место под пакет — пунктир; опубликованный пакет — полноценный блок -->
          <span class="reg-row__fill hud-frame hud-sm" :style="{ '--hud-c': t.color }" />
          <code>@shop/{{ t.id }}</code>
          <span class="reg-row__v">
            <i class="old">{{ t.old }}</i>
            <b>{{ t.v }}</b>
          </span>
        </div>
      </div>

      <!-- package.json Shop -->
      <div class="json glass" :style="{ left: `${SHOP_X}px`, width: `${SHOP_W}px` }">
        <span class="box-head">shop / package.json</span>
        <code
          v-for="(t, i) in teams"
          :key="t.id"
          class="json__dep"
          :class="{ 'is-on': s >= 3 }"
          :style="{ '--c': t.color, 'top': `${jsonY(i)}px`, 'transitionDelay': d(3, 0.3 + i * 0.15) }"
        >"{{ t.id }}": "<b>{{ t.range }}</b>"</code>
      </div>

      <!-- прод -->
      <div
        class="prod glass"
        :class="{ 'is-on': s >= 4 }"
        :style="{ left: `${SHOP_X}px`, width: `${SHOP_W}px`, top: `${PROD_Y}px`, transitionDelay: d(4, 1.1) }"
      >
        <span class="box-head">Shop в проде</span>
        <span class="prod__parts">
          <i v-for="t in teams" :key="t.id" class="hud-frame hud-sm" :style="{ '--c': t.color, '--hud-c': t.color }">{{ t.id }} {{ t.v }}</i>
        </span>
      </div>
    </div>

    <div class="pr__captions">
      <div v-for="(text, i) in captions" :key="i" :class="state(i)">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.pr {
  position: absolute;
  inset: 0;
  padding: 40px 50px 32px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.pr__title {
  margin: 0 0 22px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.pr__stage {
  position: relative;
  flex: none;
  width: 880px;
  height: 320px;
}

.pr__captions {
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

.box-head {
  position: absolute;
  left: 14px;
  top: 10px;
  font-size: 13px;
  color: rgb(255 255 255 / 0.55);
}

/* ── провода ────────────────────────────────────────────────────── */
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
  stroke: color-mix(in oklab, var(--c) 70%, transparent);
  stroke-width: 1.8;
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  transition: stroke-dashoffset 0.7s ease;

  &.is-on {
    stroke-dashoffset: 0;
  }
}

.flow {
  position: absolute;
  top: -22px;
  translate: -50% 0;
  font-size: 13px;
  line-height: 1.2;
  text-align: center;
  color: rgb(255 255 255 / 0.7);
  opacity: 0;
  transition: opacity 0.5s ease 0.3s;

  &.is-on {
    opacity: 1;
  }
}

/* ── команды ────────────────────────────────────────────────────── */
.team {
  position: absolute;
  left: 0;
  height: 76px;
  translate: 0 -50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  padding: 0 16px;

  & b {
    font-size: 19px;
    color: color-mix(in oklab, var(--c) 75%, white);
  }

  & small {
    font-size: 12px;
    color: rgb(255 255 255 / 0.6);
  }
}

.ci {
  position: absolute;
  right: 14px;
  top: 50%;
  translate: 0 -50%;
  display: flex;
  gap: 5px;

  & i {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgb(255 255 255 / 0.2);
  }
}

/* CI отрабатывает по шагам перед публикацией и остаётся зелёным */
.is-published .ci i {
  background: var(--c);
  box-shadow: 0 0 8px var(--c);
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.is-published .ci i:nth-child(1) { transition-delay: calc(var(--pub) + 0s); }
.is-published .ci i:nth-child(2) { transition-delay: calc(var(--pub) + 0.07s); }
.is-published .ci i:nth-child(3) { transition-delay: calc(var(--pub) + 0.14s); }

.parcel {
  position: absolute;
  z-index: 2;
  translate: 0 -50%;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1.5px solid var(--c);
  background: color-mix(in oklab, var(--c) 40%, #0b0b12);
  box-shadow: 0 0 14px color-mix(in oklab, var(--c) 60%, transparent);
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  white-space: nowrap;
  animation: parcel 0.8s cubic-bezier(0.45, 0, 0.55, 1) both;
}

/* ── реестр ─────────────────────────────────────────────────────── */
.registry {
  position: absolute;
  top: 0;
  height: 320px;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);

  &.is-on {
    opacity: 1;
    transform: none;
  }
}

.reg-row {
  position: absolute;
  left: 14px;
  right: 14px;
  translate: 0 -50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 10px;
  transition: border-color 0.4s ease var(--pub);

  & > :not(.reg-row__fill) {
    position: relative;
  }

  & code {
    font-family: 'Fira Code', monospace;
    font-size: 13px;
    color: rgb(255 255 255 / 0.3);
    transition: color 0.4s ease var(--pub);
  }

  &.is-on {
    border-color: transparent;

    & code {
      color: #fff;
    }
  }
}

.reg-row__fill {
  position: absolute;
  inset: -1px;
  padding: 0;
  opacity: 0;
  transition: opacity 0.4s ease var(--pub);
}

.reg-row.is-on .reg-row__fill {
  opacity: 1;
}

.reg-row__v {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-variant-numeric: tabular-nums;

  & b {
    color: var(--c);
    opacity: 0;
    transition: opacity 0.4s ease var(--pub);
  }

  /* история версий появляется на шаге версионирования */
  & .old {
    font-style: normal;
    color: rgb(255 255 255 / 0.4);
    text-decoration: line-through;
    text-decoration-color: transparent;
    max-width: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-width 0.5s ease, opacity 0.5s ease;
  }
}

.reg-row.is-on .reg-row__v b {
  opacity: 1;
}

.reg-row.has-history .old {
  max-width: 50px;
  opacity: 1;
}

/* ── package.json ───────────────────────────────────────────────── */
.json {
  position: absolute;
  top: 0;
  height: 162px;
}

.json__dep {
  position: absolute;
  left: 14px;
  translate: 0 -50%;
  font-family: 'Fira Code', monospace;
  font-size: 12.5px;
  color: rgb(255 255 255 / 0.75);
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  & b {
    font-weight: 600;
    color: var(--c);
  }

  &.is-on {
    opacity: 1;
    transform: none;
  }
}

/* ── прод ───────────────────────────────────────────────────────── */
.prod {
  position: absolute;
  height: 116px;
  border-color: rgb(167 139 250 / 0.5);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);

  &.is-on {
    opacity: 1;
    transform: none;
  }
}

.prod__parts {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  display: grid;
  gap: 3px;

  & i {
    font-style: normal;
    font-size: 11.5px;
    font-weight: 600;
    padding: 2px 8px;
    color: color-mix(in oklab, var(--c) 70%, white);
  }
}

@keyframes parcel {
  0% { opacity: 0; transform: translateX(0) scale(0.8); }
  15% { opacity: 1; transform: translateX(0) scale(1); }
  85% { opacity: 1; }
  100% { opacity: 0; transform: translateX(var(--to)); }
}
</style>
