<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import SvgArrow from '../addon/components/svg/SvgArrow.vue'
import { computed, ref, watch } from 'vue'
import { archRisks } from '../data/arch-risks'
import ArchRiskDetails from './ArchRiskDetails.vue'

/**
 * Один драйвер — внешний $clicks.
 * MFE: shell в CI → его релиз → релизы трёх remotes → local → shared → взаимодействие.
 * Risks: семь претензий на той же схеме (Dev и миграция — по два состояния).
 * Modules: схема в том виде, где её оставил слайд претензий (миграция UI library) → общая сборка →
 *   перенос модулей → деплой → итог. Shell остаётся на всех шагах: точка входа есть и у одного приложения.
 * При возврате/прямом входе состояние вычисляется из шага; таймеров нет.
 * Подписей на схеме нет — тексты шагов (captions) проговариваются по заметкам спикера;
 * здесь они задают только число шагов.
 */
const { mode = 'mfe', step = 0 } = defineProps<{
  mode?: 'mfe' | 'modules' | 'risks'
  step?: number
}>()

const W = 920
/* высота — с местом под бар общего прогона CI (бывшая строка подписи) */
const H = 488
const LINE = 302
const HOST = '#a78bfa'
const SHARED = '#fbbf24'
const EVENT = '#67e8f9'
const parts = [
  { id: 'catalog', name: 'Catalog', color: '#34d399' },
  { id: 'cart', name: 'Cart', color: '#60a5fa' },
  { id: 'profile', name: 'Profile', color: '#f472b6' },
]
const releases = [{ id: 'shell', name: 'Shell', color: HOST }, ...parts]
const captions = computed(() => mode === 'risks' ? archRisks.map(risk => risk.title) : mode === 'mfe' ? [
  'Начинаем с shell — общей оболочки приложения',
  'Собираем и публикуем shell — точку входа в браузере',
  'Релиз Catalog → загрузка и подключение к shell',
  'Релиз Cart → подключаем корзину к работающему приложению',
  'Релиз Profile → у каждой части свой цикл выпуска',
  'Local dependency — библиотека внутри сборки Catalog',
  'Shared dependency — общая библиотека в рантайме',
  'Отдельные релизы, но части взаимодействуют по контракту',
] : [
  'Микрофронтенды: где остановились — миграция общей зависимости',
  'Перенесём интеграцию в общую сборку',
  'Те же части становятся модулями одного приложения',
  'Собираем приложение и деплоим целиком',
  'Границы модулей остаются, интеграция теперь при сборке',
])
const phase = computed(() => Math.max(0, Math.min(captions.value.length - 1, step)))
// modules стартует ровно с последнего состояния слайда претензий — переход между слайдами без скачка
const problem = computed(() => mode === 'risks'
  ? archRisks[phase.value]
  : mode === 'modules' && phase.value === 0 ? archRisks[archRisks.length - 1] : undefined)
const riskKind = computed(() => problem.value?.kind)
const migrating = computed(() => riskKind.value === 'migration' || riskKind.value === 'migration-partial')
const active = useIsSlideActive()
const instant = ref(true)
const forward = ref(true)
watch([() => step, active], ([next, on], [previous, wasOn]) => {
  instant.value = !on || !wasOn || Math.abs(next - previous) !== 1 || (mode === 'risks' && next < previous)
  forward.value = next > previous
}, { flush: 'sync' })

const s = computed(() => {
  const mfe = mode === 'mfe'
  const n = phase.value
  if (problem.value) {
    return {
      intro: false, shell: true, pipes: true, runtime: true,
      deploy: riskKind.value === 'ci' || riskKind.value === 'release',
      local: false, shared: riskKind.value === 'ui' || migrating.value,
      interaction: ['release', 'contracts'].includes(riskKind.value!),
      details: false, build: false, merged: false, app: false, punch: false,
    }
  }
  return {
    intro: mfe && n <= 1,
    shell: !mfe || n >= 1,
    pipes: mfe || n === 0,
    runtime: mfe || n === 0,
    // На шагах зависимостей убираем траектории релизов, чтобы не смешивать типы связей.
    deploy: mfe ? n >= 1 && n <= 4 : false,
    local: mfe ? n >= 5 : n === 0,
    shared: mfe ? n >= 6 : n === 0,
    interaction: mfe ? n >= 7 : n === 0,
    details: mfe ? n >= 5 : n === 0,
    build: !mfe && n >= 1,
    merged: !mfe && n >= 2,
    app: !mfe && n >= 3,
    punch: !mfe && n >= 4,
  }
})
const released = (index: number) => mode !== 'mfe' || phase.value >= index + 1
const pipeVisible = (index: number) => s.value.pipes && (riskKind.value === 'dev-isolated' ? index === 1 : index === 0 || released(index))
const currentRelease = (index: number) => mode === 'mfe' && phase.value === index + 1
const deploys = computed(() => problem.value ? 0 : mode === 'mfe' ? Math.min(phase.value, 4) : s.value.app ? 1 : phase.value === 0 ? 4 : 0)

// Новый релиз: CI-блок → стрелка публикации → runtime-блок → связь с shell.
// При обратном ходе нет ожидания «релиза» уже существующей части.
function releaseDelay(index: number, stage: 'arrow' | 'node' | 'link') {
  if (riskKind.value === 'release' && index === 2 && stage === 'arrow')
    return '0.25s'
  if (!forward.value || !currentRelease(index))
    return '0s'
  return { arrow: '0.25s', node: '0.9s', link: '1.2s' }[stage]
}

// В risk-режиме меняем акцент и подписи, сохраняя геометрию предыдущего слайда.
const deployVisible = (i: number) => s.value.deploy && released(i) && (riskKind.value !== 'release' || i === 2)
const runtimeMuted = (i: number) => problem.value
  ? riskKind.value === 'dev-isolated' ? i !== 0 : riskKind.value !== 'dev-all'
  : s.value.details
const sharedMuted = computed(() => problem.value ? false : s.value.interaction)
const sharedColor = (i: number) => riskKind.value === 'migration-partial' && i === 1 ? parts[0].color : SHARED
const sharedTitle = computed(() => problem.value
  ? split.value ? 'UI library v1' : migrating.value ? 'UI library: v1 → v2' : 'UI library'
  : 'Vue · shared')
/*
 * Мелких подписей на схеме нет (как на слайде 10): пояснения — в заметках спикера.
 * Остаётся только то, что не читается из картинки: версии, порты, имя события, код контракта.
 */
// миграция наполовину: в приложении две версии библиотеки — общий блок делится на v1 и v2
const split = computed(() => riskKind.value === 'migration-partial')
const eventText = computed(() => riskKind.value === 'release' ? 'контракт нарушен' : 'add-to-cart')
const eventColor = computed(() => ['release', 'contracts'].includes(riskKind.value!) ? '#fb7185' : EVENT)
const eventDelay = computed(() => riskKind.value === 'release' ? '1.3s' : '0s')
const hostNote = computed(() => migrating.value ? 'UI v1'
  : riskKind.value === 'dev-all' ? 'localhost:3000' : '')
function partNote(i: number) {
  if (migrating.value)
    return riskKind.value === 'migration-partial' && i === 0 ? 'UI v2 ✓' : 'UI v1'
  if (riskKind.value === 'dev-all') return `localhost:${3001 + i}`
  if (riskKind.value === 'dev-isolated') return i === 0 ? 'localhost:3001' : ''
  if (riskKind.value === 'release') return 'v1.0'
  return ''
}
function riskPartClass(i: number) {
  return {
    'risk-muted': riskKind.value === 'ci' || (riskKind.value === 'dev-isolated' && i !== 0),
    'risk-mock': riskKind.value === 'dev-isolated' && i !== 0,
    'risk-focus': (['boundaries', 'contracts'].includes(riskKind.value!) && i < 2) || (riskKind.value === 'dev-isolated' && i === 0),
    'risk-release-target': riskKind.value === 'release' && i === 1,
    'risk-pending': migrating.value && !(riskKind.value === 'migration-partial' && i === 0),
    'risk-ready': riskKind.value === 'migration-partial' && i === 0,
    'risk-with-button': riskKind.value === 'ui',
  }
}
/** подсветка модуля — по геометрии рамки HudBlock (раскрывается вместе с ней), а не по корню */
function partEffects(i: number) {
  const r = riskPartClass(i)
  const focus = currentRelease(i + 1) || (s.value.local && !s.value.shared && i === 0) || (s.value.interaction && i < 2) || r['risk-focus']
  if (r['risk-ready'])
    return { glow: '#34d399', ring: '#34d399' }
  if (r['risk-pending'])
    return { glow: '#fbbf24', ring: '#fbbf2499' }
  return { glow: !!focus, dashed: r['risk-mock'] }
}
function pipeNote(i: number) {
  if (riskKind.value?.startsWith('dev-')) return `localhost:${3000 + i}`
  if (riskKind.value === 'ci' || (riskKind.value === 'release' && i === 2)) return 'CI ✓'
  return ''
}

interface Box { x: number, y: number, w: number, h: number }
const host: Box = { x: 460, y: 46, w: 300, h: 60 }
const remote = (i: number): Box => s.value.merged
  ? { x: 290 + i * 170, y: 394, w: 150, h: 64 }
  : { x: 250 + i * 210, y: 157, w: 164, h: 76 }
// ряд пайплайнов с одинаковым шагом: Shell слева, счётчик деплоев зеркально справа —
// ряд симметричен относительно центра, где наверху стоит Shell
const pipe = (i: number): Box => ({ x: 40 + i * 210, y: 368, w: 128, h: 68 })
const build: Box = { x: 460, y: 375, w: 580, h: 136 }
const shared: Box = { x: 460, y: 255, w: 540, h: 44 }
// при двух версиях: v2 — под Catalog, v1 — под Cart и Profile (и стрелкой от Shell)
const sharedV1: Box = { x: 565, y: 255, w: 350, h: 44 }
const sharedV2: Box = { x: 250, y: 255, w: 180, h: 44 }
const place = (b: Box) => ({
  width: `${b.w}px`, height: `${b.h}px`,
  transform: `translate(${b.x - b.w / 2}px, ${b.y - b.h / 2}px)`,
})
const runtimeArrows = parts.map((_, i) => {
  const x = 250 + i * 210
  return `M${380 + i * 80} 76 C${380 + i * 80} 99 ${x} 94 ${x} 119`
})
const deployArrows = [
  'M40 334 C40 140 160 46 306 46',
  ...parts.map((_, i) => `M${250 + i * 210} 334 L${250 + i * 210} 198`),
]
const sharedArrows = [
  // изгиб не выходит за правый край окна браузера
  'M610 46 C770 46 770 255 734 255',
  ...parts.map((_, i) => `M${250 + i * 210} 197 L${250 + i * 210} 230`),
]
const singleDeploy = 'M460 307 L460 80'
const interaction = 'M250 197 C250 225 460 225 460 197'
</script>

<template>
  <div class="arch" :class="{ 'arch--instant': instant, 'arch--risks': !!problem, 'arch--build': !s.pipes }" :style="{ width: `${W}px`, height: `${H}px` }">
    <!--
      Две зоны схемы — узнаваемыми образами, а не подписью: сверху контур окна браузера
      (то, что получает пользователь), снизу «цех» сборки — тёмная полоса со штриховкой и шестерёнкой.
      Обе на грани видимости: считываются сразу, но не спорят с блоками.
    -->
    <div class="arch__browser" :style="{ height: `${LINE - 8 + 34}px` }" aria-hidden="true">
      <div class="arch__browser-bar"><i /><i /><i /><span /></div>
    </div>
    <div class="arch__ci" :style="{ top: `${LINE + 6}px` }" aria-hidden="true" />
    <div class="arch__zone hud-label" :style="{ top: `${LINE + 12}px` }">
      <svg v-if="riskKind?.startsWith('dev-')" viewBox="0 0 16 16" width="16" height="16"><path d="M2 3h12v10H2z M4 6l2.5 2L4 10 M8 10h4" fill="none" stroke="currentColor" stroke-width="1.4" /></svg>
      <svg v-else viewBox="0 0 16 16" width="16" height="16"><path d="M8 5.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z M8 1v2.2 M8 12.8V15 M1 8h2.2 M12.8 8H15 M3 3l1.6 1.6 M11.4 11.4 13 13 M13 3l-1.6 1.6 M4.6 11.4 3 13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /></svg>
      {{ riskKind?.startsWith('dev-') ? 'локально' : 'CI' }}
    </div>
    <div class="arch__line" :class="{ 'is-hot': s.punch }" :style="{ top: `${LINE}px` }" />

    <svg class="arch__svg" :viewBox="`0 0 ${W} ${H}`" :width="W" :height="H">
      <SvgArrow v-for="(d, i) in runtimeArrows" :key="`runtime-${i}`" :d="d"
        :reveal="s.runtime && released(i + 1) ? 1 : 0"
        class="arch__arrow" :class="{ 'is-on': s.runtime && released(i + 1), 'is-muted': runtimeMuted(i) }"
        :style="{ color: parts[i].color, '--animation-delay': releaseDelay(i + 1, 'link') }" />
      <SvgArrow v-for="(d, i) in deployArrows" :key="`deploy-${i}`" :d="d"
        :reveal="deployVisible(i) ? 1 : 0"
        class="arch__arrow arch__arrow--deploy" :class="{ 'is-on': deployVisible(i) }"
        :style="{ color: releases[i].color, '--animation-delay': s.deploy ? releaseDelay(i, 'arrow') : '0s' }" />
      <SvgArrow key="single-deploy" :d="singleDeploy" :reveal="s.app ? 1 : 0" class="arch__arrow arch__arrow--single"
        :class="{ 'is-on': s.app }" :style="{ color: HOST, '--animation-delay': s.app ? '0.4s' : '0s' }" />
      <SvgArrow v-for="(d, i) in sharedArrows" :key="`shared-${i}`" :d="d" dashed
        :reveal="s.shared ? 1 : 0"
        class="arch__arrow" :class="{ 'is-on': s.shared, 'is-muted': sharedMuted }"
        :style="{ color: sharedColor(i), '--animation-delay': s.shared ? `${0.3 + i * 0.12}s` : '0s' }" />
      <SvgArrow key="interaction" :d="interaction" :reveal="s.interaction ? 1 : 0" class="arch__arrow arch__arrow--event"
        :class="{ 'is-on': s.interaction }" :style="{ color: eventColor, '--animation-delay': eventDelay }" />
    </svg>
    <ArchRiskDetails v-if="problem" :kind="problem.kind" />

    <div class="arch__box arch__build" :class="{ 'is-hidden': !s.build, 'is-focus': s.punch }"
      :style="{ ...place(build), transitionDelay: s.build ? '0.3s' : '0s' }">
      <span class="hud-label arch__build-label">одна сборка</span>
    </div>

    <!-- блоки runtime раскрываются механически (HudBlock); позиция и размер — на корне, как раньше -->
    <HudBlock class="arch__box arch__host" :shown="s.shell" :color="HOST" :delay="s.shell ? releaseDelay(0, 'node') : 0"
      :glow="migrating ? '#fbbf24' : s.intro" :ring="migrating ? '#fbbf2499' : undefined" :dashed="riskKind === 'dev-isolated'"
      :class="{ 'risk-muted': riskKind === 'ci' || riskKind === 'dev-isolated', 'risk-pending': migrating }"
      :style="{ ...place(host), transitionDelay: s.shell ? releaseDelay(0, 'node') : '0s' }">
      <Transition name="arch-swap" mode="out-in">
        <div :key="s.app ? 'app' : 'shell'" class="arch__text">
          <b>Shell</b>
          <small v-if="hostNote">{{ hostNote }}</small>
        </div>
      </Transition>
    </HudBlock>

    <HudBlock v-for="(p, i) in parts" :key="p.id" class="arch__box arch__part"
      :shown="released(i + 1)" :color="p.color"
      :delay="mode === 'modules' ? i * 0.22 : releaseDelay(i + 1, 'node')"
      v-bind="partEffects(i)"
      :class="{ ...riskPartClass(i), 'has-local': i === 0 && s.local }"
      :style="{ ...place(remote(i)), transitionDelay: mode === 'modules' ? `${i * 0.22}s` : releaseDelay(i + 1, 'node') }">
      <div class="arch__text">
        <b :style="{ color: p.color }">{{ p.name }}</b>
        <small v-if="partNote(i)" :class="{ 'risk-version-hidden': riskKind === 'release' && i === 1 }">{{ partNote(i) }}</small>
      </div>
      <div v-if="i === 1" class="risk-version" :class="{ 'is-hidden': riskKind !== 'release' }">
        <span class="risk-version__old">v1.0</span><span class="risk-version__new">v2.0</span>
      </div>
      <span class="risk-error-ring" />
      <span class="risk-ui-button" :class="{ 'is-hidden': riskKind !== 'ui' }">{{ ['Купить', 'Оформить', 'Войти'][i] }}</span>
      <span v-if="i === 0" class="arch__local" :class="{ 'is-visible': s.local, 'is-muted': s.local && s.shared }">search-utils</span>
    </HudBlock>

    <!-- v2 «отделяется» от общего блока: пока версия одна, он лежит под ним и невидим -->
    <div class="arch__box arch__shared arch__shared--v2" :class="{ 'is-hidden': !split, 'is-focus': split }"
      :style="{ ...place(split ? sharedV2 : shared), '--hud-c': parts[0].color }">
      <div class="arch__text"><b>UI library v2</b></div>
    </div>
    <div class="arch__box arch__shared" :class="{ 'is-hidden': !s.shared, 'is-focus': s.shared && (!s.interaction || !!problem), 'is-muted': sharedMuted }"
      :style="{ ...place(split ? sharedV1 : shared), '--hud-c': SHARED }">
      <div class="arch__text">
        <b>{{ sharedTitle }}</b>
      </div>
      <!-- в бандл приложения теперь попадают две копии библиотеки -->
      <span class="arch__twice" :class="{ 'is-visible': split }">×2</span>
    </div>
    <div class="arch__event" :class="{ 'is-hidden': !s.interaction }" :style="{ color: eventColor, transitionDelay: eventDelay }">{{ eventText }}</div>

    <div v-for="(p, i) in releases" :key="`pipe-${p.id}`" class="arch__box arch__pipe"
      :class="{ 'risk-pipe-focus': riskKind === 'ci' || riskKind?.startsWith('dev-') || (riskKind === 'release' && i === 2), 'risk-muted': !!problem && !['ci', 'dev-all', 'dev-isolated'].includes(riskKind!) && !(riskKind === 'release' && i === 2), 'is-hidden': !pipeVisible(i), 'is-focus': currentRelease(i) || (i === 0 && phase === 0 && mode === 'mfe'), 'is-muted': s.details }"
      :style="{ ...place(pipe(i)), '--hud-c': p.color }">
      <div class="arch__text"><b>{{ p.name }}</b><small v-if="pipeNote(i)">{{ pipeNote(i) }}</small></div>
    </div>

    <div class="arch__counter" :class="{ 'is-hidden': !deploys }" :style="{ transitionDelay: deploys ? '1.4s' : '0s' }">
      <Transition name="arch-swap" mode="out-in"><b :key="deploys">{{ deploys }}</b></Transition>
      <span class="hud-label">{{ deploys === 1 ? 'деплой' : 'деплоя' }}</span>
    </div>
  </div>
</template>

<style scoped>
.arch {
  --ease: cubic-bezier(0.65, 0, 0.35, 1);
  position: relative;
  margin: 0 auto;
  /* рамка схемы — от левого края пайплайна Shell (−24) до правого края Profile (752);
     сдвигаем, чтобы её центр совпал с центром слайда */
  translate: 96px 0;
  transition: translate 0.75s var(--ease);
  text-align: left;
  font-family: sans, sans-serif;
}

/* без ряда пайплайнов (общая сборка) схема и так симметрична вокруг Shell — сдвиг не нужен,
   а линия зоны идёт на всю ширину */
.arch--build {
  translate: 0 0;
}

.arch--build .arch__line {
  left: 0;
  width: 920px;
}

.arch--build .arch__zone {
  left: 10px;
}

.arch--build .arch__browser,
.arch--build .arch__ci {
  left: 0;
  width: 920px;
}

/* окно браузера: тонкий контур и полоска вкладки с «светофором» и адресной строкой */
/* с запасом 16px вокруг крайних блоков (пайплайн Shell слева, Profile справа) */
.arch__browser {
  position: absolute;
  left: -40px;
  top: -34px;
  width: 812px;
  border: 1.5px solid rgb(255 255 255 / 0.26);
  border-radius: 10px;
  background: rgb(255 255 255 / 0.035);
  box-shadow: 0 0 0 1px rgb(0 0 0 / 0.25), 0 12px 40px rgb(0 0 0 / 0.25);
  pointer-events: none;
  transition: left 0.75s var(--ease), width 0.75s var(--ease);
}

.arch__browser-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0 10px;
  border-radius: 9px 9px 0 0;
  border-bottom: 1px solid rgb(255 255 255 / 0.18);
  background: rgb(255 255 255 / 0.07);

  /* «светофор» окна — приглушённые, но узнаваемые цвета */
  & i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #f87171;
    opacity: 0.75;
  }

  & i:nth-child(2) { background: #fbbf24; }
  & i:nth-child(3) { background: #34d399; }

  & span {
    width: 34%;
    height: 12px;
    margin-left: 16px;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.16);
  }
}

/* сборка: чуть темнее фона и в мелкую диагональную штриховку */
.arch__ci {
  position: absolute;
  left: -40px;
  width: 812px;
  bottom: -6px;
  border-radius: 10px;
  border: 1px solid rgb(255 255 255 / 0.08);
  background:
    repeating-linear-gradient(135deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 9px),
    rgb(0 0 0 / 0.42);
  pointer-events: none;
  transition: left 0.75s var(--ease), width 0.75s var(--ease);
}

.arch--instant,
.arch--instant :deep(*),
.arch--instant :deep(*::before),
.arch--instant :deep(*::after) {
  transition: none !important;
  animation: none !important;
}


.arch__zone {
  position: absolute;
  left: -30px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.arch__line {
  position: absolute;
  /* по ширине схемы, а не контейнера — линия симметрична вместе со схемой */
  left: -40px;
  width: 812px;
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
  --animation-duration: 0.8s;
  --animation-delay: 0s;
  --arrow-ease: var(--ease);
  --arrow-width: 1.6px;
  stroke: currentColor;
  stroke-width: var(--arrow-width);
  fill: currentColor;
  opacity: 0;
  transition: opacity 0.18s ease;
}
.arch__arrow.is-on {
  opacity: 0.9;
  transition-delay: var(--animation-delay);
}
.arch__arrow.is-on.is-muted { opacity: 0.18; }
.arch__arrow :deep(.arrow-head) { stroke: none; }
.arch__arrow--event { --arrow-width: 2.5px; }
.arch__arrow--deploy { --arrow-width: 1.3px; }
.arch__arrow--single.is-on {
  --arrow-width: 2.4px;
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
    transform 0.75s var(--ease),
    width 0.75s var(--ease),
    height 0.75s var(--ease),
    opacity 0.3s ease,
    filter 0.3s ease,
    box-shadow 0.4s ease;
}
.arch__box.is-hidden {
  opacity: 0;
  filter: blur(6px);
}
.arch__box.is-focus:not(.hb) {
  box-shadow: 0 0 24px color-mix(in srgb, var(--hud-c, #a78bfa) 30%, transparent);
}
.arch__box.is-muted:not(.is-hidden) { opacity: 0.35; }
.arch__event.is-hidden { opacity: 0; pointer-events: none; }
.arch__local {
  position: absolute;
  left: 50%;
  bottom: 6px;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 3px 6px;
  border: 1px solid #34d39988;
  border-radius: 4px;
  background: #052e24;
  color: #6ee7b7;
  font: 0.61rem var(--slidev-code-font-family, monospace);
  opacity: 0;
  transition: opacity 0.35s;
}
.arch__local.is-visible { opacity: 1; }
.arch__local.is-muted { opacity: 0.45; }
.arch__part .arch__text { transition: transform 0.3s; }
.arch__part.has-local .arch__text { transform: translateY(-10px); }
.arch__shared {
  border: 1px dashed #fbbf2488;
  border-radius: 6px;
  background: #211a16;
  color: #fde68a;
}
.arch__shared .arch__text b { font-size: 0.95rem; }
/* вторая версия библиотеки: цвет Catalog — он первым перешёл на v2 */
.arch__shared--v2 {
  border-color: color-mix(in srgb, var(--hud-c) 70%, transparent);
  background: color-mix(in srgb, var(--hud-c) 10%, #10201b);
  color: #a7f3d0;
}
/* «×2» в зазоре между v2 и v1 — две копии одной библиотеки */
.arch__twice {
  position: absolute;
  left: -43px;
  top: 50%;
  translate: 0 -50%;
  padding: 2px 8px;
  border-radius: 999px;
  background: #fbbf24;
  color: #1c1406;
  font-weight: 800;
  font-size: 0.8rem;
  opacity: 0;
  scale: 0.4;
  transition: opacity 0.3s ease 0.6s, scale 0.45s cubic-bezier(0.3, 1.6, 0.5, 1) 0.6s;
}
.arch__twice.is-visible { opacity: 1; scale: 1; }
.arch__event {
  position: absolute;
  top: 211px;
  left: 278px;
  color: #67e8f9;
  background: #101c2c;
  border-radius: 3px;
  padding: 1px 7px;
  font: 0.64rem var(--slidev-code-font-family, monospace);
  transition: opacity 0.3s 0.45s;
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
}
.arch__build.is-focus {
  box-shadow: 0 0 24px #a78bfa35, inset 0 0 18px #a78bfa18;
  border-color: #c4b5fd;
}
.arch__build-label {
  font-size: 0.65rem;
}

.arch__counter {
  position: absolute;
  /* под рядом пайплайнов, по его центру: деплои уходят из CI */
  left: 355px;
  transition: opacity 0.3s ease, left 0.75s var(--ease);
  top: 446px;
  translate: -50% 0;
  display: flex;
  align-items: baseline;
  gap: 10px;
  white-space: nowrap;
}
.arch--build .arch__counter {
  /* под общей сборкой — по центру схемы */
  left: 460px;
}

.arch__counter.is-hidden {
  opacity: 0;
}
.arch__counter b {
  font-size: 2.4rem;
  line-height: 1;
  color: var(--v-color);
  text-shadow: 0 0 18px var(--v-color);
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

.risk-topic { margin-right: 12px; color: #c4b5fd; font: 0.8rem monospace; }
.arch__box.risk-muted:not(.is-hidden) { opacity: 0.4; }
.arch__box.risk-mock:not(.hb) { border: 1px dashed var(--hud-c); background: #171327; }
.arch__box.risk-focus:not(.hb) { box-shadow: 0 0 24px color-mix(in srgb, var(--hud-c) 35%, transparent); }
.arch__box.risk-pending:not(.hb) { outline: 1px solid #fbbf2499; box-shadow: 0 0 18px #fbbf2420; }
.arch__box.risk-ready:not(.hb) { outline: 1px solid #34d399; box-shadow: 0 0 18px #34d39940; }
.risk-pending small { color: #fde68a; opacity: 0.9; }
.risk-ready small { color: #6ee7b7; opacity: 1; }
.arch__box.risk-pipe-focus { background: #18172a; box-shadow: 0 0 16px color-mix(in srgb, var(--hud-c) 20%, transparent); }
.risk-version {
  position: absolute; left: 0; right: 0; top: 43px;
  display: grid; text-align: center; font: 0.68rem monospace;
}
.risk-version.is-hidden, .risk-ui-button.is-hidden { opacity: 0; }
.risk-version-hidden { visibility: hidden; }
.risk-version > span { grid-area: 1 / 1; }
.risk-version__new { opacity: 0; }
.risk-release-target .risk-version__old { opacity: 0; animation: risk-version-out 0.2s ease 1.05s both; }
.risk-release-target .risk-version__new { opacity: 1; animation: risk-show 0.2s ease 1.05s both; }
.risk-error-ring { position: absolute; inset: -2px; border: 2px solid #fb7185; opacity: 0; pointer-events: none; }
.risk-release-target .risk-error-ring { opacity: 1; animation: risk-show 0.25s ease 1.3s both; }
.risk-ui-button {
  position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%);
  padding: 3px 10px; border: 1px solid #c4b5fd; border-radius: 4px;
  color: #ede9fe; background: #5b3e9a; font-size: 10px;
  transition: opacity 0.3s;
}
.risk-with-button .arch__text { transform: translateY(-10px); }
@keyframes risk-show { from { opacity: 0; } to { opacity: 1; } }
@keyframes risk-version-out { from { opacity: 1; } to { opacity: 0; } }
</style>
