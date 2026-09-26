<script setup lang="ts">
import { computed } from 'vue'

/**
 * «Версия в зависимостях — это политика релиза».
 * Слева реестр пакетов, посередине шлюз — диапазон из package.json корневого Shop,
 * справа версия, которая сейчас в проде. Новая версия сначала публикуется в реестр
 * и остаётся там; CI везёт её копию к шлюзу: подходящие диапазону проезжают и сами
 * обновляют прод, остальные упираются в шлюз, а версия в реестре помечается «ждёт».
 *
 * Дорожки появляются по одной — вместе со своим шагом, чтобы не выдавать всё сразу.
 *
 *   0 — политика на примере одного пакета: Catalog ^1.4.0
 *   1 — Catalog ^1.4.0: 1.4.1 и 1.5.0 проходят сами
 *   2 — Catalog 2.0.0: мажор ждёт ручного обновления
 *   3 — Profile ~3.0.0: 3.0.1 проходит, 3.1.0 ждёт
 *   4 — Cart 2.1.0: закреплена точно — даже патч ждёт человека
 *   5 — не только semver: Search по тегу stable — в прод уходит то, что команда пометила
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(5, step)))

interface Version { v: string, at: number, pass: boolean }
interface Lane {
  id: string
  name: string
  color: string
  range: string
  rule: string
  current: string
  y: number
  /** шаг, с которого дорожка видна */
  from: number
  versions: Version[]
}

const lanes: Lane[] = [
  {
    id: 'catalog', name: 'Catalog', color: '#34d399', range: '^1.4.0', rule: 'минор и патч — сами', current: '1.4.0', y: 64, from: 0,
    versions: [{ v: '1.4.1', at: 1, pass: true }, { v: '1.5.0', at: 1, pass: true }, { v: '2.0.0', at: 2, pass: false }],
  },
  {
    id: 'profile', name: 'Profile', color: '#f472b6', range: '~3.0.0', rule: 'только патч — сам', current: '3.0.0', y: 134, from: 3,
    versions: [{ v: '3.0.1', at: 3, pass: true }, { v: '3.1.0', at: 3, pass: false }],
  },
  {
    id: 'cart', name: 'Cart', color: '#60a5fa', range: '2.1.0', rule: 'всё — руками', current: '2.1.0', y: 204, from: 4,
    versions: [{ v: '2.1.1', at: 4, pass: false }],
  },
  {
    id: 'search', name: 'Search', color: '#fbbf24', range: 'stable', rule: 'когда команда переставит тег', current: '4.2.0', y: 274, from: 5,
    versions: [{ v: '4.3.0 → stable', at: 5, pass: true }],
  },
]

const REG_X = 250
const GATE_X = 470
const SHOP_X = 740
/** шаг между фишками версий в колонке реестра */
const SLOT = 68

/*
 * Хронометраж одной публикации (от старта версии, секунды):
 *   0    — версия появляется в реестре
 *   0.5  — CI подхватывает её: копия едет к шлюзу
 *   1.1  — шлюз: пропускает (зелёная вспышка) или останавливает (жёлтая)
 *   1.8  — прошедшая копия доезжает до прода, версия в проде обновляется
 */
const T_PICK = 0.5
const T_GATE = 1.1
const T_SHOP = 1.8
const T_FLY = T_SHOP - T_PICK

/** x фишки в реестре: версии дорожки стоят рядком вокруг колонки */
const regX = (l: Lane, i: number) => REG_X + (i - (l.versions.length - 1) / 2) * SLOT

/** дорожка появилась на этом же шаге — версии публикуются после её появления */
const laneDelay = (l: Lane, ver: Version) => (l.from === ver.at && l.from > 0 ? 0.8 : 0)

/** старт публикации версии: очередь среди версий того же шага + появление дорожки */
function start(l: Lane, i: number) {
  const ver = l.versions[i]
  const queue = l.versions.slice(0, i).filter(v => v.at === ver.at).length
  return queue * 1.1 + laneDelay(l, ver)
}

/** задержка события версии: на своём шаге — по хронометражу, на следующих — сразу */
const at = (l: Lane, i: number, t: number) => (l.versions[i].at === s.value ? start(l, i) + t : 0)

/**
 * Значения в проде к текущему шагу: версия с прошлых шагов держится, пока не доедет
 * первая версия этого шага; дальше каждая сменяет предыдущую в момент прибытия.
 */
function prodSeq(l: Lane) {
  const seq = [{ v: l.current, in: 0 }]
  l.versions.forEach((ver, i) => {
    if (ver.pass && s.value >= ver.at)
      seq.push({ v: ver.v.replace(' → stable', ''), in: at(l, i, T_SHOP) })
  })
  // с прошлых шагов нужна только последняя версия — остальные давно сменились
  const base = seq.findLastIndex(x => x.in === 0)
  return seq.slice(base).map((x, k, arr) => ({ ...x, out: arr[k + 1]?.in }))
}

/** когда первая версия текущего шага доедет до прода */
const arrival = (l: Lane) => prodSeq(l)[1]?.in ?? 0

/** прод обновился автоматически на текущем шаге — подписываем, кто это сделал */
const autoNow = (l: Lane) => l.versions.some(v => v.pass && v.at === s.value)

const captions = [
  'Диапазон в package.json Shop решает, что уедет в прод без нас',
  'Catalog ^1.4.0: минорные и патч-версии CI поднимает и выкатывает сам',
  'Мажор 2.0.0 в диапазон не попал — ждёт ручного обновления',
  'Profile ~3.0.0: патч проходит сам, минор держим до ручного решения',
  'Cart закреплён точно: даже патч ждёт человека',
  'Не обязательно semver: в прод уходит то, что команда пометила как stable',
]
</script>

<template>
  <div class="vg">
    <h1 class="vg__title">
      Версия в зависимостях — это политика релиза
    </h1>

    <div class="vg__stage">
      <!-- колонки -->
      <span class="head" :style="{ left: `${REG_X}px` }">реестр</span>
      <span class="head" :style="{ left: `${GATE_X}px` }">диапазон в Shop</span>
      <span class="head" :style="{ left: `${SHOP_X}px` }">в проде</span>

      <div
        v-for="l in lanes"
        :key="l.id"
        class="lane"
        :class="{ 'is-on': s >= l.from }"
        :style="{ '--c': l.color, top: `${l.y}px` }"
      >
        <span class="lane__name">{{ l.name }}</span>
        <span class="lane__line" />

        <!-- шлюз: вспыхивает, когда до него доезжает версия текущего шага -->
        <span class="gate hud-frame hud-sm hud-solid" :style="{ left: `${GATE_X}px` }">
          <code>{{ l.range }}</code>
          <small>{{ l.rule }}</small>
          <template v-for="(ver, i) in l.versions" :key="ver.v">
            <span
              v-if="ver.at === s"
              class="gate__flash"
              :class="ver.pass ? 'is-pass' : 'is-stop'"
              :style="{ animationDelay: `${at(l, i, T_GATE)}s` }"
            />
          </template>
        </span>

        <!-- версия в проде -->
        <span class="prod hud-frame hud-sm hud-solid" :style="{ left: `${SHOP_X}px` }">
          <b
            v-for="p in prodSeq(l)"
            :key="p.v"
            class="prod__v"
            :class="{ 'is-leaving': p.out != null }"
            :style="{ '--in': `${p.in}s`, '--out': `${p.out ?? 0}s` }"
          >{{ p.v }}</b>
          <small
            v-if="autoNow(l)"
            :key="`auto${s}`"
            class="prod__auto"
            :style="{ animationDelay: `${arrival(l)}s` }"
          >обновил CI</small>
        </span>

        <!-- реестр: опубликованные версии остаются здесь насовсем -->
        <template v-for="(ver, i) in l.versions" :key="ver.v">
          <span
            v-if="s >= ver.at"
            class="ver"
            :class="ver.pass ? 'ver--pass' : 'ver--held'"
            :style="{
              'left': `${regX(l, i)}px`,
              '--pub': `${at(l, i, 0)}s`,
              '--res': `${at(l, i, ver.pass ? T_SHOP : T_GATE + 0.3)}s`,
            }"
          >
            {{ ver.v }}
            <i>{{ ver.pass ? 'в проде' : 'ждёт' }}</i>
          </span>

          <!-- копия, которую CI везёт через шлюз: только в момент публикации -->
          <span
            v-if="ver.at === s"
            class="fly"
            :class="ver.pass ? 'fly--pass' : 'fly--stop'"
            :style="{
              'left': `${regX(l, i)}px`,
              '--to-gate': `${GATE_X - regX(l, i)}px`,
              '--to-stop': `${GATE_X - 92 - regX(l, i)}px`,
              '--to-shop': `${SHOP_X - regX(l, i)}px`,
              'animationDuration': `${T_FLY}s`,
              'animationDelay': `${at(l, i, T_PICK)}s`,
            }"
          >{{ ver.v.replace(' → stable', '') }}</span>
        </template>
      </div>
    </div>

    <div class="vg__captions">
      <div
        v-for="(text, i) in captions"
        :key="i"
        class="vg__caption"
        :class="i === s ? 'mf-on' : i < s ? 'mf-out' : 'mf-off'"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.vg {
  position: absolute;
  inset: 0;
  padding: 44px 50px 40px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.vg__title {
  margin: 0 0 10px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.vg__stage {
  position: relative;
  flex: none;
  width: 880px;
  height: 310px;
}

.head {
  position: absolute;
  top: 18px;
  translate: -50% 0;
  font-size: 14px;
  color: rgb(255 255 255 / 0.5);
  white-space: nowrap;
}

.lane {
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

  &.is-on {
    opacity: 1;
    transform: none;
  }
}

.lane__name {
  position: absolute;
  left: 20px;
  top: 0;
  translate: 0 -50%;
  font-size: 19px;
  font-weight: 700;
}

.lane__line {
  position: absolute;
  left: 180px;
  right: 60px;
  top: 0;
  height: 2px;
  translate: 0 -1px;
  background: color-mix(in oklab, var(--c) 40%, transparent);
}

.gate {
  position: absolute;
  top: 0;
  translate: -50% -50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 12px;
  --hud-c: var(--c);
  white-space: nowrap;

  & code {
    font-family: 'Fira Code', monospace;
    font-size: 17px;
    font-weight: 600;
    color: #fff;
  }

  & small {
    font-size: 11px;
    color: rgb(255 255 255 / 0.6);
  }
}

.prod {
  position: absolute;
  display: grid;
  justify-items: center;
  top: 0;
  translate: -50% -50%;
  min-width: 86px;
  padding: 6px 14px;
  --hud-c: #a78bfa;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.prod__v {
  grid-area: 1 / 1;
  font-size: 16px;
  /* пока версия едет, новое значение скрыто — появляется в момент прибытия */
  animation: bump 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--in) backwards;

  /* а старое держится до этого момента и уступает место */
  &.is-leaving {
    animation:
      bump 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--in) backwards,
      leave 0.25s ease var(--out) forwards;
  }
}

.prod__auto {
  position: absolute;
  left: 50%;
  top: calc(100% + 5px);
  translate: -50% 0;
  font-size: 12px;
  color: #6ee7b7;
  white-space: nowrap;
  animation: rise 0.5s ease backwards;
}

/* фишка версии в реестре */
.ver {
  position: absolute;
  top: 0;
  translate: -50% -50%;
  padding: 3px 11px;
  border-radius: 999px;
  border: 1.5px solid var(--c);
  background: color-mix(in oklab, var(--c) 26%, #0b0b12);
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  animation: publish 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--pub) backwards;
  transition:
    border-color 0.4s ease var(--res),
    background 0.4s ease var(--res),
    color 0.4s ease var(--res);

  & i {
    position: absolute;
    left: 50%;
    top: calc(100% + 3px);
    translate: -50% 0;
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    animation: rise 0.4s ease var(--res) backwards;
  }
}

/* уехала в прод: остаётся в реестре как история */
.ver--pass {
  color: rgb(255 255 255 / 0.75);

  & i {
    color: #6ee7b7;
  }
}

/* упёрлась в шлюз — ждёт ручного обновления */
.ver--held {
  border-color: #fbbf24;
  background: rgb(251 191 36 / 0.14);

  & i {
    color: #fcd34d;
  }
}

/* копия версии, которую CI везёт к шлюзу */
.fly {
  position: absolute;
  top: 0;
  z-index: 2;
  translate: -50% -50%;
  padding: 3px 11px;
  border-radius: 999px;
  border: 1.5px solid var(--c);
  background: color-mix(in oklab, var(--c) 45%, #0b0b12);
  box-shadow: 0 0 18px color-mix(in oklab, var(--c) 60%, transparent);
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  opacity: 0;
  animation-timing-function: linear;
  animation-fill-mode: both;
}

.fly--pass {
  animation-name: fly-pass;
}

.fly--stop {
  animation-name: fly-stop;
}

.gate__flash {
  position: absolute;
  inset: -2px;
  opacity: 0;
  pointer-events: none;
  animation: flash 0.9s ease both;

  &.is-pass {
    --f: #34d399;
  }

  &.is-stop {
    --f: #fbbf24;
  }
}

.vg__captions {
  display: grid;
  font-size: 20px;
  line-height: 1.3;
  min-height: 2.6em;
  margin-top: auto;

  & > * {
    grid-area: 1 / 1;
  }
}

.vg__caption {
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
}

@keyframes bump {
  0% { opacity: 0; transform: scale(1.35); color: #6ee7b7; }
  30% { opacity: 1; }
  100% { opacity: 1; transform: none; }
}

@keyframes leave {
  to { opacity: 0; transform: scale(0.7); }
}

@keyframes publish {
  from { opacity: 0; transform: translateX(-40px); filter: blur(4px); }
  to { opacity: 1; transform: none; filter: none; }
}

@keyframes rise {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: none; }
}

/* 0.5→1.1 с до шлюза, сквозь него 1.1→1.8 с до прода (доли от 1.3 с) */
@keyframes fly-pass {
  0% { opacity: 0; transform: none; animation-timing-function: cubic-bezier(0.45, 0, 0.6, 1); }
  8% { opacity: 1; }
  46% { transform: translateX(var(--to-gate)); animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateX(var(--to-shop)); }
}

@keyframes fly-stop {
  0% { opacity: 0; transform: none; animation-timing-function: cubic-bezier(0.45, 0, 0.6, 1); }
  8% { opacity: 1; }
  46% { transform: translateX(var(--to-stop)); }
  52% { transform: translateX(calc(var(--to-stop) - 10px)); }
  58% { transform: translateX(var(--to-stop)); }
  75% { opacity: 1; }
  100% { opacity: 0; transform: translateX(var(--to-stop)); }
}

@keyframes flash {
  0% { opacity: 0; box-shadow: 0 0 0 0 var(--f); border: 2px solid var(--f); }
  25% { opacity: 1; box-shadow: 0 0 22px 2px var(--f); }
  100% { opacity: 0; box-shadow: 0 0 0 0 var(--f); border: 2px solid var(--f); }
}
</style>
