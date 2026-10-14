<script setup lang="ts">
import { computed } from 'vue'

/**
 * «Модульная структура проекта» — одна схема приложения, на которую слой за слоем
 * ложатся свойства модулей (по слою на клик), а не список и не карточки:
 *   1 — независимая разработка: у каждого модуля свой ритм коммитов
 *   2 — ограниченные связи: между модулями прямые стрелки запрещены, ходим через публичный API (index.ts)
 *   3 — ответственные: у каждого модуля свой человек
 *   4 — документация и тесты: README и зелёные тесты внутри модуля
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, step))

const W = 880
const H = 300
const NW = 190
const NH = 84

const modules = [
  { id: 'map', x: 60, y: 10, color: '#34d399', pace: 1.3 },
  { id: 'profile', x: 345, y: 10, color: '#60a5fa', pace: 2.1 },
  { id: 'cart', x: 630, y: 10, color: '#f472b6', pace: 1.7 },
] as const
const shared = { id: 'shared', x: 345, y: 206, color: '#a1a1aa' }

// подпись слоя: ключевая часть фразы выделена цветом слоя
const steps = [
  { pre: 'Модули могут разрабатываться ', key: 'независимо', post: '', color: '#34d399' },
  { pre: 'Связи между модулями могут быть ', key: 'ограничены', post: '', color: '#a78bfa' },
  { pre: '', key: 'Конкретные люди', post: ' могут отвечать за конкретные модули', color: '#f472b6' },
  { pre: 'Отдельные модули проще ', key: 'документировать и тестировать', post: '', color: '#fbbf24' },
]

// точки выхода из публичного API модуля и входа в shared
const portY = (m: { y: number }) => m.y + NH
const portX = (m: { x: number }) => m.x + NW / 2
const sharedPorts = [shared.x + 40, shared.x + NW / 2, shared.x + NW - 40]
</script>

<template>
  <div class="mt">
    <h1 class="mt__title">
      Модульная структура проекта
    </h1>

    <div class="mt__stage" :style="{ width: `${W}px`, height: `${H}px` }">
      <!-- связи -->
      <svg class="mt__links" :viewBox="`0 0 ${W} ${H}`" aria-hidden="true">
        <!-- запрещённые прямые связи между модулями -->
        <g class="mt__ban" :class="{ 'mt__ban--on': s >= 2 }">
          <template v-for="(m, i) in modules.slice(0, 2)" :key="m.id">
            <line :x1="m.x + NW + 6" :y1="m.y + NH / 2" :x2="modules[i + 1].x - 6" :y2="m.y + NH / 2" />
            <g :transform="`translate(${(m.x + NW + modules[i + 1].x) / 2} ${m.y + NH / 2})`">
              <circle r="11" />
              <path d="M -4.5 -4.5 L 4.5 4.5 M 4.5 -4.5 L -4.5 4.5" />
            </g>
          </template>
        </g>
        <!-- разрешённые: только через публичный API в общий слой -->
        <g class="mt__ok" :class="{ 'mt__ok--on': s >= 2 }">
          <path
            v-for="(m, i) in modules"
            :key="m.id"
            :d="`M ${portX(m)} ${portY(m) + 10} V ${portY(m) + 56} H ${sharedPorts[i]} V ${shared.y - 8}`"
            :style="{ '--c': m.color }"
          />
        </g>
      </svg>

      <!-- модули -->
      <div
        v-for="(m, i) in modules"
        :key="m.id"
        class="mod hud-frame hud-sm hud-solid"
        :style="{ '--hud-c': m.color, left: `${m.x}px`, top: `${m.y}px`, width: `${NW}px`, height: `${NH}px` }"
      >
        <span class="mod__name">{{ m.id }}</span>
        <code class="mod__pkg">@shop/{{ m.id }}</code>

        <!-- 1: свой ритм коммитов -->
        <span class="mod__pulse" :class="{ 'mod__pulse--on': s >= 1 }" :style="{ '--pace': `${m.pace}s`, '--i': i }">
          <i /><i /><i /><i /><i /><i />
        </span>

        <!-- 4: документация и тесты -->
        <span class="mod__docs" :class="{ 'mod__docs--on': s >= 4 }">
          <b style="transition-delay: 0.1s">README</b><b style="transition-delay: 0.35s">tests ✓</b>
        </span>

        <!-- 3: ответственный -->
        <svg class="mod__who" :class="{ 'mod__who--on': s >= 3 }" :style="{ '--c': m.color }" viewBox="-24 -24 48 48" aria-hidden="true">
          <defs>
            <clipPath :id="`mt-clip-${m.id}`"><circle r="19" /></clipPath>
          </defs>
          <circle r="19" class="who__bg" />
          <circle r="19" class="who__tint" />
          <g :clip-path="`url(#mt-clip-${m.id})`">
            <!-- плечи и воротник цвета команды -->
            <path d="M -19 21 C -17 9 -10 6 0 6 C 10 6 17 9 19 21 Z" class="who__suit" />
            <path d="M -9 6.5 C -5 10 5 10 9 6.5 L 9 9 C 5 12.5 -5 12.5 -9 9 Z" class="who__team" />
            <!-- шлем: полоса цвета команды на макушке -->
            <circle cy="-3" r="12.5" class="who__suit" />
            <path d="M -11.5 -8 A 12.5 12.5 0 0 1 11.5 -8 C 6 -11.5 -6 -11.5 -11.5 -8 Z" class="who__team" />
            <ellipse cx="1" cy="-2" rx="8.5" ry="6.6" class="who__visor" />
            <ellipse cx="1" cy="-2" rx="8.5" ry="6.6" class="who__visor-tint" />
            <ellipse :cx="-2 + i * 1.5" cy="-5" rx="2.6" ry="1.3" class="who__glint" transform="rotate(-25)" />
          </g>
          <circle r="19" class="who__ring" />
          <!-- у каждого своя деталь -->
          <template v-if="m.id === 'map'">
            <path d="M 9 -15.5 L 13 -23" class="who__gear" />
            <circle cx="13.5" cy="-23.5" r="2.2" class="who__team" />
          </template>
          <template v-else-if="m.id === 'profile'">
            <rect x="-22" y="-8" width="6" height="11" rx="3" class="who__gear-fill" />
            <path d="M -19 3 C -19 12 -12 13 -6 13" class="who__gear" />
            <circle cx="-5" cy="13" r="1.8" class="who__gear-fill" />
          </template>
          <template v-else>
            <rect x="-5" y="-23" width="10" height="5" rx="2.5" class="who__lamp" />
          </template>
        </svg>

        <!-- 2: публичный API -->
        <span class="mod__port" :class="{ 'mod__port--on': s >= 2 }" :style="{ '--c': m.color }">index.ts</span>
      </div>

      <div
        class="mod mod--shared hud-dashed hud-solid"
        :style="{ '--hud-c': shared.color, left: `${shared.x}px`, top: `${shared.y}px`, width: `${NW}px`, height: '56px' }"
      >
        <span class="mod__name">shared</span>
        <code class="mod__pkg">общие компоненты</code>
      </div>
    </div>

    <!-- подпись к слою: каждое свойство загорается на своём клике -->
    <ol class="mt__rail">
      <HudBlock
        v-for="(t, i) in steps"
        :key="t.key"
        as="li"
        class="cap"
        :class="{ 'cap--old': i < s - 1 }"
        :shown="i < s"
        :color="t.color"
        sm
        solid
      >
        <span class="cap__text">{{ t.pre }}<em>{{ t.key }}</em>{{ t.post }}</span>
      </HudBlock>
    </ol>
  </div>
</template>

<style scoped>
.mt {
  position: absolute;
  inset: 0;
  padding: 36px 50px 44px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.mt__title {
  margin: 0 0 14px;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.mt__stage {
  position: relative;
  align-self: center;
  flex: none;
}

.mt__links {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* ── модуль ───────────────────────────────────────────────────── */
.mod {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  padding: 8px 14px;
  text-align: left;
}

.mod--shared {
  align-items: center;
  text-align: center;
}

.mod__name {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.1;
}

.mod__pkg {
  font-size: 12px;
  opacity: 0.65;
  background: none;
  padding: 0;
}

/* 1: ритм коммитов — у каждого модуля свой */
.mod__pulse {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 3px;
  opacity: 0;
  transition: opacity 0.5s ease;

  & i {
    width: 5px;
    height: 12px;
    border-radius: 2px;
    background: var(--hud-c);
    transform-origin: bottom;
    animation: mt-commit var(--pace) ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.17s + var(--n, 0) * 0.23s);
  }

  & i:nth-child(2) { --n: 1; }
  & i:nth-child(3) { --n: 2; }
  & i:nth-child(4) { --n: 3; }
  & i:nth-child(5) { --n: 4; }
  & i:nth-child(6) { --n: 5; }
}

.mod__pulse--on {
  opacity: 1;
}

@keyframes mt-commit {
  0%, 100% { transform: scaleY(0.25); opacity: 0.35; }
  45% { transform: scaleY(1); opacity: 1; }
}

/* 2: публичный API — «порт» на нижней грани */
.mod__port {
  position: absolute;
  left: 50%;
  bottom: -11px;
  transform: translateX(-50%) scale(0.6);
  padding: 1px 9px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--c) 70%, transparent);
  background: rgb(10 10 20 / 0.95);
  font: 600 11px 'Fira Code', monospace;
  color: var(--c);
  opacity: 0;
  transition: opacity 0.5s ease 0.2s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}

.mod__port--on {
  opacity: 1;
  transform: translateX(-50%);
}

/* 3: ответственный — «портрет» астронавта в цвете модуля (те же краски, что у экипажа на соседнем слайде) */
.mod__who {
  position: absolute;
  left: -20px;
  top: -24px;
  width: 48px;
  height: 48px;
  overflow: visible;
  filter: drop-shadow(0 2px 6px rgb(0 0 0 / 0.6));
  opacity: 0;
  transform: scale(0.3);
  transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mod__who--on {
  opacity: 1;
  transform: none;
}

.who__bg { fill: #14122a; }
.who__suit { fill: #f1f1f4; }
.who__team { fill: var(--c); }
.who__tint { fill: color-mix(in srgb, var(--c) 38%, transparent); }
.who__visor { fill: #1f1b3a; stroke: var(--c); stroke-width: 1.4; }
.who__visor-tint { fill: color-mix(in srgb, var(--c) 28%, transparent); }
.who__gear { fill: none; stroke: #c9cad6; stroke-width: 1.6; stroke-linecap: round; }
.who__gear-fill { fill: #c9cad6; }
.who__lamp { fill: #fde68a; }
.who__glint { fill: rgb(255 255 255 / 0.55); }
.who__ring { fill: none; stroke: var(--c); stroke-width: 3; }

/* 4: README и тесты */
.mod__docs {
  display: flex;
  gap: 6px;
  margin-top: 4px;

  & b {
    padding: 0 6px;
    border-radius: 4px;
    background: rgb(255 255 255 / 0.1);
    font: 600 10px 'Fira Code', monospace;
    color: rgb(255 255 255 / 0.85);
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.4s ease, transform 0.5s ease;
  }

  & b:last-child {
    color: #6ee7b7;
    background: rgb(52 211 153 / 0.18);
  }
}

.mod__docs--on b {
  opacity: 1;
  transform: none;
}

/* ── связи ────────────────────────────────────────────────────── */
.mt__ban {
  opacity: 0;
  transition: opacity 0.5s ease;

  & line {
    stroke: #f87171;
    stroke-width: 1.5;
    stroke-dasharray: 5 5;
  }

  & circle {
    fill: rgb(10 10 20 / 0.95);
    stroke: #f87171;
    stroke-width: 1.5;
  }

  & path {
    fill: none;
    stroke: #f87171;
    stroke-width: 2;
    stroke-linecap: round;
  }
}

.mt__ban--on {
  opacity: 1;
}

.mt__ok path {
  fill: none;
  stroke: var(--c);
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: stroke-dashoffset 0.9s ease 0.3s;
}

.mt__ok--on path {
  stroke-dashoffset: 0;
}

/* ── подпись слоёв ────────────────────────────────────────────── */
.mt__rail {
  list-style: none;
  margin: auto 0 0;
  padding: 0 56px 0 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.cap {
  padding: 14px 16px;
  transition: opacity 0.5s ease;
}

/* пройденные подписи приглушены, текущая — в полную яркость */
.cap--old {
  opacity: 0.7;
}

.cap__text {
  font-size: 17px;
  font-weight: 500;
  line-height: 1.25;
  color: rgb(255 255 255 / 0.92);

  & em {
    font-style: normal;
    font-weight: 700;
    color: var(--hud-c);
  }
}
</style>
