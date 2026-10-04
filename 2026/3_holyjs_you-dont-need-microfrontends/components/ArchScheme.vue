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
 * MFE и Risks — в виде сайта: сверху окно браузера (шапка = Shell, участки страницы =
 *   микрофронтенды, зависимости и ошибки — всплывашками), снизу — серверные стойки CI.
 *   Окно, участки и стойки получают view-transition-name и на последнем клике Risks сами встают
 *   в раскладку слайда «≠» (MsVsMfe называет свои элементы так же).
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
/** вид сайта — у MFE и Risks; Modules — блок-схема общей сборки */
const site = computed(() => mode !== 'modules')
/** имя для морфа между слайдами (только в виде сайта) */
const vt = (name: string) => site.value ? { viewTransitionName: `x-site-${name}`, viewTransitionClass: 'x-site' } : {}

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
const captions = computed(() => mode === 'risks' ? [
  ...archRisks.map(risk => risk.title),
  // «сайт»: последний клик — схема сама перестраивается в стартовую раскладку следующего слайда
  'Передача: окно и серверы встают как на слайде «≠»',
] : mode === 'mfe' ? [
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
/** последний клик варианта «сайт» у претензий — передача к слайду «≠» */
const handoff = computed(() => mode === 'risks' && phase.value === archRisks.length)
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
  if (handoff.value) {
    return {
      intro: false, shell: true, pipes: true, runtime: false, deploy: false,
      local: false, shared: false, interaction: false,
      details: false, build: false, merged: false, app: false, punch: false,
    }
  }
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
const pipeVisible = (index: number) => handoff.value ? index > 0 : s.value.pipes && (riskKind.value === 'dev-isolated' ? index === 1 : index === 0 || released(index))
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
/**
 * «сайт»: всё синхронно со стрелкой релиза (старт 0.25 с, 0.8 с): соседи отдают место,
 * а новый участок одновременно растёт в него, следуя за отступающей кромкой, —
 * к моменту, когда стрелка дошла, участок уже на своём месте.
 */
const layoutDelay = computed(() => forward.value && mode === 'mfe' && phase.value >= 2 && phase.value <= 4 ? '0.25s' : '0s')
const sitePartDelay = (_i: number) => layoutDelay.value

// В risk-режиме меняем акцент и подписи, сохраняя геометрию предыдущего слайда.
// видна только стрелка текущего релиза — она ведёт прямо в свой участок страницы
const deployVisible = (i: number) => (s.value.deploy && currentRelease(i)) || (riskKind.value === 'release' && i === 2)
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
// вариант «сайт»: шапка во всю ширину; страница перестраивается по мере релизов —
// каталог сначала на всю ширину, корзина забирает правую колонку, профиль — полосу снизу
const SITE = {
  host: { x: 366, y: 8, w: 780, h: 32 },
  shared: { x: 366, y: 266, w: 780, h: 28 },
  sharedV1: { x: 618, y: 266, w: 268, h: 28 },
  sharedV2: { x: 228, y: 266, w: 500, h: 28 },
} satisfies Record<string, Box>
/*
 * Передача к слайду «≠» (MsVsMfe): те же элементы встают туда, где их двойники стоят на следующем слайде.
 * Координаты — раскладка MsVsMfe (замер на слайде), пересчитанная в систему схемы:
 * схема стоит в точке (126, 66) слайда (центрирование + translate варианта «сайт»).
 */
const HANDOFF = {
  win: { left: 386, top: 42, width: 428, height: 388 },
  ci: { left: -86, top: 40, width: 428, height: 390 },
  nav: { x: 599, y: 90, w: 410, h: 28 },
  parts: [
    { x: 542, y: 249, w: 296, h: 278 },
    { x: 750, y: 249, w: 108, h: 278 },
    { x: 599, y: 407, w: 410, h: 26 },
  ],
  pipes: [
    { x: -9, y: 231, w: 126, h: 354 },
    { x: 127, y: 231, w: 126, h: 354 },
    { x: 263, y: 231, w: 126, h: 354 },
  ],
} satisfies Record<string, unknown>
/** участок на странице: в изолированной разработке остаётся только свой (Catalog) */
const partShown = (i: number) => released(i + 1) && !(riskKind.value === 'dev-isolated' && i > 0)
/**
 * Резиновая страница: у скрытого участка — «схлопнутая» геометрия в том месте, откуда он вырастет
 * (каталог — полоса нулевой высоты сверху, корзина — нулевой ширины у правого края,
 * профиль — нулевой высоты под участками).
 */
const siteParts = computed<Box[]>(() => {
  const cart = partShown(1)
  const profile = partShown(2)
  const top = 32
  // страница заполнена до низа окна: без профиля участки до 286, с ним — профиль занимает низ
  const bottom = profile ? 220 : 286
  const h = bottom - top
  const y = top + h / 2
  const catalog = cart ? { x: 228, y, w: 500, h } : { x: 366, y, w: 776, h }
  if (handoff.value)
    return HANDOFF.parts
  return [
    partShown(0) ? catalog : { ...catalog, y: top, h: 0 },
    cart ? { x: 619, y, w: 270, h } : { x: 754, y, w: 0, h },
    // профиль растёт снизу вверх — за поднимающейся нижней кромкой каталога и корзины
    profile ? { x: 366, y: 257, w: 776, h: 58 } : { x: 366, y: 286, w: 776, h: 0 },
  ]
})

/*
 * «Внутрянка» — всплывашки поверх страницы, связанные пунктиром с участками, которые её используют:
 * локальная зависимость — только с Catalog (карусель), общая — со всеми сразу.
 */
interface Popup { key: string, x: number, y: number, title: string, color: string, shown: boolean, muted: boolean, targets: [number, number][] }
/** зависимость видна только на своём шаге — потом всплывашка уходит, чтобы не перегружать страницу */
const localShown = computed(() => site.value && s.value.local && !s.value.shared)
const sharedShown = computed(() => site.value && s.value.shared && (!!problem.value || !s.value.interaction))
/** ui-kit v2: на шаге миграции так должен выглядеть весь сайт, в реальности — только Catalog */
const partV2 = (i: number) => riskKind.value === 'migration' || (riskKind.value === 'migration-partial' && i === 0)
const sitePopups = computed<Popup[]>(() => {
  if (!site.value)
    return []
  const [cat, cart, prof] = siteParts.value
  const nav: [number, number] = [366, 24]
  const all: [number, number][] = [nav, [cat.x - 60, cat.y + 20], [cart.x, cart.y + 20], [prof.x - 200, prof.y]]
  const sharedTitle = problem.value ? (split.value ? 'ui-kit v1' : riskKind.value === 'migration' ? 'ui-kit v2' : 'ui-kit') : 'vue'
  const catLeft = cat.x - cat.w / 2
  return [
    // локальная зависимость — карусель каталога: всплывашка у её левой стрелки
    { key: 'local', x: catLeft + 96, y: cat.y + cat.h / 2 - 22, title: 'carousel', color: '#34d399', shown: localShown.value, muted: false, targets: [[catLeft + 18, cat.y + 6]] },
    { key: 'shared', x: split.value ? 590 : 366, y: 150, title: sharedTitle, color: riskKind.value === 'migration' ? '#c084fc' : '#fbbf24', shown: sharedShown.value, muted: false, targets: split.value ? [nav, [cart.x, cart.y - 20], [prof.x + 200, prof.y]] : all },
    { key: 'shared-v2', x: split.value ? 250 : 366, y: 150, title: 'ui-kit v2', color: '#c084fc', shown: split.value, muted: false, targets: [[cat.x - 90, cat.y + 20]] },
  ]
})
const popupLinks = computed(() => sitePopups.value.flatMap(p => p.targets.map((t, k) => ({
  key: `${p.key}-${k}`,
  d: `M${p.x} ${p.y} L${t[0]} ${t[1]}`,
  color: p.color,
  shown: p.shown,
  muted: p.muted,
}))))
const host = computed<Box>(() => site.value ? (handoff.value ? HANDOFF.nav : SITE.host) : { x: 460, y: 46, w: 300, h: 60 })
const remote = (i: number): Box => site.value
  ? siteParts.value[i]
  : s.value.merged
    ? { x: 290 + i * 170, y: 394, w: 150, h: 64 }
    : { x: 250 + i * 210, y: 157, w: 164, h: 76 }
// ряд пайплайнов с одинаковым шагом: Shell слева, счётчик деплоев зеркально справа —
// ряд симметричен относительно центра, где наверху стоит Shell
const pipe = (i: number): Box => handoff.value && i > 0 ? HANDOFF.pipes[i - 1] : { x: 40 + i * 210, y: 368, w: 128, h: 68 }
const build: Box = { x: 460, y: 375, w: 580, h: 136 }
// при двух версиях: v2 — под Catalog, v1 — под Cart и Profile (и стрелкой от Shell)
const shared = computed<Box>(() => site.value ? SITE.shared : { x: 460, y: 255, w: 540, h: 44 })
const sharedV1 = computed<Box>(() => site.value ? SITE.sharedV1 : { x: 565, y: 255, w: 350, h: 44 })
const sharedV2 = computed<Box>(() => site.value ? SITE.sharedV2 : { x: 250, y: 255, w: 180, h: 44 })
const place = (b: Box) => ({
  width: `${b.w}px`, height: `${b.h}px`,
  transform: `translate(${b.x - b.w / 2}px, ${b.y - b.h / 2}px)`,
})
const runtimeArrows = parts.map((_, i) => {
  const x = 250 + i * 210
  return `M${380 + i * 80} 76 C${380 + i * 80} 99 ${x} 94 ${x} 119`
})
// релиз: из стойки прямо в свой участок страницы — до нижней кромки шапки/участка
const deployArrows = computed(() => [SITE.host, ...siteParts.value].map((b, i) => {
  const px = [40, 250, 460, 670][i]
  const tx = Math.min(b.x + b.w / 2 - 24, Math.max(b.x - b.w / 2 + 24, px))
  // не впритык: стрелка останавливается чуть ниже участка
  const ty = b.y + b.h / 2 + 10
  const my = (334 + ty) / 2
  return `M${px} 334 C${px} ${my} ${tx} ${my} ${tx} ${ty}`
}))
const sharedArrows = [
  // изгиб не выходит за правый край окна браузера
  'M610 46 C770 46 770 255 734 255',
  ...parts.map((_, i) => `M${250 + i * 210} 197 L${250 + i * 210} 230`),
]
const singleDeploy = 'M460 307 L460 80'
// «сайт»: событие перелетает дугой из каталога в корзину поверх страницы
const siteInteraction = 'M400 86 C440 40 540 40 580 86'
const px = (r: Record<string, number>) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, `${v}px`]))
</script>

<template>
  <div class="arch" :class="{ 'arch--handoff': handoff, 'arch--instant': instant, 'arch--risks': !!problem, 'arch--build': !s.pipes, 'arch--site': site, 'arch--ui': riskKind === 'ui', 'arch--local': !!riskKind?.startsWith('dev-'), 'arch--coupon': riskKind === 'boundaries' }" :style="{ width: `${W}px`, height: `${H}px` }">
    <!--
      Две зоны схемы — узнаваемыми образами, а не подписью: сверху контур окна браузера
      (то, что получает пользователь), снизу «цех» сборки — тёмная полоса со штриховкой и шестерёнкой.
      Обе на грани видимости: считываются сразу, но не спорят с блоками.
    -->
    <div class="arch__browser" :style="{ height: `${LINE - 8 + 34}px`, ...(handoff ? px(HANDOFF.win) : {}), ...vt('win') }" aria-hidden="true">
      <div class="arch__browser-bar"><i /><i /><i /><span><template v-if="site">{{ riskKind?.startsWith('dev-') ? 'localhost:3000' : 'shop.ru' }}</template></span></div>
      <!-- «сайт»: страница грузится, пока Shell ещё не выпущен; с его релизом — гаснет -->
      <div v-if="site" class="site-loading" :class="{ 'is-on': mode === 'mfe' && phase === 0 }"><i /></div>
    </div>
    <div class="arch__ci" :style="{ top: `${LINE + 6}px`, ...(handoff ? { ...px(HANDOFF.ci), bottom: 'auto' } : {}) }" aria-hidden="true" />
    <!-- передача: заголовки и «≠» следующего слайда проявляются на своих местах -->
    <template v-if="site">
      <span class="site-handoff site-handoff--title" :class="{ 'is-on': handoff }" style="left: -86px; top: -5px">Микросервисы</span>
      <span class="site-handoff site-handoff--title" :class="{ 'is-on': handoff }" style="left: 386px; top: -4px">Микрофронтенды</span>
      <span class="site-handoff site-handoff--neq" :class="{ 'is-on': handoff }" style="left: 353px; top: 180px">≠</span>
    </template>
    <div class="arch__zone hud-label" :class="{ 'is-gone': handoff }" :style="{ top: `${LINE + 12}px` }">
      <svg v-if="riskKind?.startsWith('dev-')" viewBox="0 0 16 16" width="16" height="16"><path d="M2 3h12v10H2z M4 6l2.5 2L4 10 M8 10h4" fill="none" stroke="currentColor" stroke-width="1.4" /></svg>
      <svg v-else viewBox="0 0 16 16" width="16" height="16"><path d="M8 5.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z M8 1v2.2 M8 12.8V15 M1 8h2.2 M12.8 8H15 M3 3l1.6 1.6 M11.4 11.4 13 13 M13 3l-1.6 1.6 M4.6 11.4 3 13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /></svg>
      {{ riskKind?.startsWith('dev-') ? 'локально' : 'CI' }}
    </div>
    <div class="arch__line" :class="{ 'is-hot': s.punch, 'is-gone': handoff }" :style="{ top: `${LINE}px` }" />

    <svg class="arch__svg" :viewBox="`0 0 ${W} ${H}`" :width="W" :height="H">
      <SvgArrow v-for="(d, i) in site ? [] : runtimeArrows" :key="`runtime-${i}`" :d="d"
        :reveal="s.runtime && released(i + 1) ? 1 : 0"
        class="arch__arrow" :class="{ 'is-on': s.runtime && released(i + 1), 'is-muted': runtimeMuted(i) }"
        :style="{ color: parts[i].color, '--animation-delay': releaseDelay(i + 1, 'link') }" />
      <SvgArrow key="single-deploy" :d="singleDeploy" :reveal="s.app ? 1 : 0" class="arch__arrow arch__arrow--single"
        :class="{ 'is-on': s.app }" :style="{ color: HOST, '--animation-delay': s.app ? '0.4s' : '0s' }" />
      <SvgArrow v-for="(d, i) in site ? [] : sharedArrows" :key="`shared-${i}`" :d="d" dashed
        :reveal="s.shared ? 1 : 0"
        class="arch__arrow" :class="{ 'is-on': s.shared, 'is-muted': sharedMuted }"
        :style="{ color: sharedColor(i), '--animation-delay': s.shared ? `${0.3 + i * 0.12}s` : '0s' }" />
    </svg>
    <ArchRiskDetails v-if="problem && site" :kind="problem.kind" />

    <div class="arch__box arch__build" :class="{ 'is-hidden': !s.build, 'is-focus': s.punch }"
      :style="{ ...place(build), transitionDelay: s.build ? '0.3s' : '0s' }">
      <span class="hud-label arch__build-label">одна сборка</span>
    </div>

    <!-- сайт: шапка страницы = Shell -->
    <div v-if="site" class="arch__box site-nav"
      :class="{ 'site-v2': riskKind === 'migration', 'is-hidden': !s.shell, 'is-glow': s.intro, 'risk-muted': riskKind === 'ci' || riskKind === 'dev-isolated', 'risk-pending': migrating, 'risk-mock': riskKind === 'dev-isolated' }"
      :style="{ ...place(host), '--c': HOST, transitionDelay: s.shell ? releaseDelay(0, 'node') : '0s', ...vt('nav') }">
      <b>Shop</b><span class="skel" /><span class="skel" /><span class="site-search" />
      <span class="site-tag">Shell<template v-if="hostNote"> · {{ hostNote }}</template></span>
    </div>
    <!-- схема модулей: блоки раскрываются механически (HudBlock); позиция и размер — на корне -->
    <HudBlock v-else class="arch__box arch__host" :shown="s.shell" :color="HOST" :delay="s.shell ? releaseDelay(0, 'node') : 0"
      :glow="migrating ? '#fbbf24' : false" :ring="migrating ? '#fbbf2499' : undefined"
      :class="{ 'risk-pending': migrating }"
      :style="{ ...place(host), transitionDelay: s.shell ? releaseDelay(0, 'node') : '0s' }">
      <Transition name="arch-swap" mode="out-in">
        <div :key="s.app ? 'app' : 'shell'" class="arch__text">
          <b>Shell</b>
          <small v-if="hostNote">{{ hostNote }}</small>
        </div>
      </Transition>
    </HudBlock>

    <template v-if="site">
      <div v-for="(p, i) in parts" :key="p.id" class="arch__box site-part"
        :class="[`site-part--${p.id}`, riskPartClass(i), { 'site-v2': partV2(i), 'is-hidden': !partShown(i), 'is-glow': !!partEffects(i).glow }]"
        :style="{ ...place(remote(i)), '--c': p.color, transitionDelay: sitePartDelay(i), ...vt(p.id) }">
        <span class="site-tag">{{ p.name }}<span v-if="partNote(i)" :class="{ 'risk-version-hidden': riskKind === 'release' && i === 1 }"> · {{ partNote(i) }}</span></span>
        <!-- каталог: карусель (локальная зависимость) и карточки постоянного размера —
             при сужении участка лишние уходят за край, а не перестраиваются скачком -->
        <div v-if="i === 0" class="site-catalog">
          <span class="skel skel--title" />
          <div class="site-carousel" :class="{ 'is-dep': localShown }">
            <b class="site-carousel__nav">‹</b>
            <div class="site-cards">
              <div v-for="c in 4" :key="c" class="site-card">
                <i /><span class="skel" /><span class="site-btn" />
                <em v-if="c === 1" class="site-sale">−20%</em>
              </div>
            </div>
            <b class="site-carousel__nav">›</b>
          </div>
          <span class="site-dots"><i /><i class="is-on" /><i /></span>
        </div>
        <div v-else-if="i === 1" class="site-cart">
          <span class="site-item" /><span class="site-item" />
          <span class="site-coupon"><em>%</em><span class="skel" /></span>
          <span class="site-btn site-btn--wide" />
        </div>
        <template v-else>
          <span class="site-avatar" /><span class="skel skel--long" />
        </template>
        <div v-if="i === 1" class="risk-version" :class="{ 'is-hidden': riskKind !== 'release' }">
          <span class="risk-version__old">v1.0</span><span class="risk-version__new">v2.0</span>
        </div>
        <span class="risk-error-ring" />
      </div>
    </template>
    <HudBlock v-for="(p, i) in site ? [] : parts" :key="p.id" class="arch__box arch__part"
      :shown="released(i + 1)" :color="p.color"
      :delay="mode === 'modules' ? i * 0.22 : releaseDelay(i + 1, 'node')"
      v-bind="partEffects(i)"
      :class="riskPartClass(i)"
      :style="{ ...place(remote(i)), transitionDelay: mode === 'modules' ? `${i * 0.22}s` : releaseDelay(i + 1, 'node') }">
      <div class="arch__text">
        <b :style="{ color: p.color }">{{ p.name }}</b>
        <small v-if="partNote(i)">{{ partNote(i) }}</small>
      </div>
    </HudBlock>

    <!-- v2 «отделяется» от общего блока: пока версия одна, он лежит под ним и невидим -->
    <div v-if="!site" class="arch__box arch__shared arch__shared--v2" :class="{ 'is-hidden': !split, 'is-focus': split }"
      :style="{ ...place(split ? sharedV2 : shared), '--hud-c': parts[0].color }">
      <div class="arch__text"><b>UI library v2</b></div>
    </div>
    <div v-if="!site" class="arch__box arch__shared" :class="{ 'is-hidden': !s.shared, 'is-focus': s.shared && (!s.interaction || !!problem), 'is-muted': sharedMuted }"
      :style="{ ...place(split ? sharedV1 : shared), '--hud-c': SHARED }">
      <div class="arch__text">
        <b>{{ sharedTitle }}</b>
      </div>
      <!-- в бандл приложения теперь попадают две копии библиотеки -->
      <span class="arch__twice" :class="{ 'is-visible': split }">×2</span>
    </div>
    <!-- в варианте «сайт» стрелка события поверх страницы: под ней непрозрачные участки -->
    <svg v-if="site" class="arch__svg arch__svg--top" :viewBox="`0 0 ${W} ${H}`" :width="W" :height="H">
      <SvgArrow v-for="(d, i) in deployArrows" :key="`deploy-${i}`" :d="d"
        :reveal="deployVisible(i) ? 1 : 0"
        class="arch__arrow arch__arrow--deploy" :class="{ 'is-on': deployVisible(i) }"
        :style="{ color: releases[i].color, '--animation-delay': s.deploy || riskKind === 'release' ? releaseDelay(i, 'arrow') : '0s' }" />
      <path v-for="l in popupLinks" :key="l.key" class="site-link" :class="{ 'is-on': l.shown, 'is-muted': l.muted }" :d="l.d" :style="{ stroke: l.color }" />
      <SvgArrow key="interaction" :d="siteInteraction" :reveal="s.interaction ? 1 : 0" class="arch__arrow arch__arrow--event"
        :class="{ 'is-on': s.interaction }" :style="{ color: eventColor, '--animation-delay': eventDelay }" />
    </svg>
    <!-- всплывашки зависимостей: пакет с именем, поверх страницы -->
    <div v-for="pop in sitePopups" :key="pop.key" class="site-pop" :class="{ 'is-on': pop.shown, 'is-muted': pop.muted }"
      :style="{ transform: `translate(${pop.x}px, ${pop.y}px) translate(-50%, -50%)`, '--c': pop.color }">
      <svg viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5 14 4.5v7L8 14.5 2 11.5v-7z M2 4.5 8 7.5l6-3 M8 7.5v7" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" /></svg>
      <code>{{ pop.title }}</code>
    </div>
    <!-- несовпадение контракта — как упавший тест (vitest/jest) на том же месте, где была ошибка -->
    <div v-if="site" class="site-error site-diff" :class="{ 'is-on': riskKind === 'contracts' }">
      <span class="site-diff__head"><b>✕</b> AssertionError: payload doesn't match contract</span>
      <span class="site-diff__legend"><i>- Expected</i> <em>+ Received</em></span>
      <code>  {</code>
      <code class="is-exp">-   "productId": "42",</code>
      <code class="is-rec">+   "id": "42",</code>
      <code>  }</code>
    </div>
    <!-- сломанный контракт — ошибкой прямо на странице, как её увидит пользователь -->
    <div v-if="site" class="site-error" :class="{ 'is-on': riskKind === 'release' }">
      <b>⚠</b>
      <span><strong>TypeError</strong> Cannot read properties of undefined (reading 'productId')</span>
    </div>
    <div v-if="site" class="arch__event" :class="{ 'is-hidden': !s.interaction || riskKind === 'release' }" :style="{ color: eventColor, transitionDelay: eventDelay }">{{ eventText }}</div>

    <div v-for="(p, i) in releases" :key="`pipe-${p.id}`" class="arch__box arch__pipe"
      :class="{ 'hud-frame hud-sm hud-solid': site, 'risk-pipe-focus': riskKind === 'ci' || riskKind?.startsWith('dev-') || (riskKind === 'release' && i === 2) || (site && riskKind === 'boundaries' && (i === 1 || i === 2)), 'risk-muted': !!problem && !['ci', 'dev-all', 'dev-isolated'].includes(riskKind!) && !(riskKind === 'release' && i === 2) && !(site && riskKind === 'boundaries' && (i === 1 || i === 2)), 'is-hidden': !pipeVisible(i), 'is-focus': currentRelease(i) || (i === 0 && phase === 0 && mode === 'mfe'), 'is-muted': s.details }"
      :style="{ ...place(pipe(i)), '--hud-c': p.color, ...(i ? vt(`srv-${p.id}`) : {}) }">
      <span v-if="site" class="srv-leds"><i /><i /><i /></span>
      <div class="arch__text"><b>{{ p.name }}</b><small v-if="pipeNote(i)">{{ pipeNote(i) }}</small></div>
    </div>

    <div v-if="!site" class="arch__counter" :class="{ 'is-hidden': !deploys }" :style="{ transitionDelay: deploys ? '1.4s' : '0s' }">
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
.arch__part .arch__text { transition: transform 0.3s; }
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
  top: 64px;
  left: 455px;
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
.risk-version.is-hidden { opacity: 0; }
.risk-version-hidden { visibility: hidden; }
.risk-version > span { grid-area: 1 / 1; }
.risk-version__new { opacity: 0; }
.risk-release-target .risk-version__old { opacity: 0; animation: risk-version-out 0.2s ease 1.05s both; }
.risk-release-target .risk-version__new { opacity: 1; animation: risk-show 0.2s ease 1.05s both; }
.risk-error-ring { position: absolute; inset: -2px; border: 2px solid #fb7185; opacity: 0; pointer-events: none; }
.risk-release-target .risk-error-ring { opacity: 1; animation: risk-show 0.25s ease 1.3s both; }
@keyframes risk-show { from { opacity: 0; } to { opacity: 1; } }
@keyframes risk-version-out { from { opacity: 1; } to { opacity: 0; } }
/* ── вариант «сайт» (эксперимент): окно и участки как на слайде 10, стойки вместо пайплайнов ── */

.arch--site .arch__browser {
  border: 0;
  background: #f4f4f7;
  box-shadow: 0 16px 50px rgb(0 0 0 / 0.45);
}

.arch--site .arch__browser-bar {
  height: 24px;
  background: #1e1e26;
  border-bottom: 0;

  & span { background: #2c2c36; }
}

.arch__svg--top { z-index: 4; }

.site-nav {
  justify-content: flex-start;
  gap: 14px;
  padding: 0 14px;
  border: 1.5px dashed var(--c);
  border-radius: 6px;
  background: #fff;
  color: #555;

  & b { color: #7c3aed; font-size: 0.95rem; }
}

.site-search {
  margin-left: auto;
  margin-right: 70px;
  width: 110px;
  height: 14px;
  border-radius: 999px;
  background: #ececf1;
}

.site-part {
  align-items: stretch;
  justify-content: flex-start;
  gap: 8px;
  padding: 20px 10px 10px;
  /* растёт из нулевого размера — содержимое не вываливается наружу */
  overflow: hidden;
  border: 1.5px dashed var(--c);
  border-radius: 6px;
  background: #fff;
  color: #1c1c24;
}

.site-part--profile {
  align-items: center;
  padding: 0 14px;
}

.site-tag {
  position: absolute;
  top: -1px;
  right: -1px;
  z-index: 2;
  padding: 2px 9px;
  border-radius: 0 5px 0 6px;
  background: var(--c);
  color: #0b0b12;
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
}

.site-nav .site-tag { font-size: 0.82rem; }

.skel {
  display: inline-block;
  width: 56px;
  height: 8px;
  border-radius: 4px;
  background: rgb(0 0 0 / 0.12);
}

.skel--long { width: 160px; }

.site-catalog {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skel--title { width: 120px; height: 9px; flex: none; }

/* каталог — карусель карточек: стрелки по бокам, точки снизу. Сама карусель — локальная зависимость */
.site-carousel {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  transition: box-shadow 0.4s;
}

.site-carousel__nav {
  flex: none;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #ecfdf5;
  color: #047857;
  font-size: 1rem;
  line-height: 1;
  transition: background 0.4s, color 0.4s;
}

.site-carousel.is-dep {
  box-shadow: 0 0 0 2px #34d399, 0 0 18px #34d39988;

  & .site-carousel__nav { background: #34d399; color: #fff; }
}

.site-dots {
  flex: none;
  display: flex;
  justify-content: center;
  gap: 5px;

  & i { width: 6px; height: 6px; border-radius: 50%; background: #d1d5db; }
  & i.is-on { background: #10b981; }
}

/* четыре карточки тянутся вместе с участком — ни одна не обрезается краем */
.site-cards {
  flex: 1;
  align-self: stretch;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.site-card {
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  border-radius: 5px;
  background: #fafafc;
  border: 1px solid #ececf1;

  & i {
    flex: 1;
    border-radius: 4px;
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  }

  & .skel { width: 70%; height: 6px; }
}

.site-btn {
  height: 12px;
  border-radius: 4px;
  background: #10b981;
  transition: box-shadow 0.4s, background 0.4s;
}

.site-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & .site-btn { margin-top: auto; background: #3b82f6; }
}

.site-item {
  height: 26px;
  border-radius: 4px;
  background: #eff6ff;
}

.site-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fbcfe8;
}

/* претензия «единый стиль»: подсвечены кнопки всех участков */
.arch--ui .site-btn { box-shadow: 0 0 0 2px #fbbf24, 0 0 10px #fbbf24aa; }
.arch--ui .site-nav .skel { background: #fbbf2466; }

.site-part.is-hidden,
.site-nav.is-hidden { scale: 0.97; }

.site-part.is-glow,
.site-nav.is-glow {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 30%, transparent), 0 0 26px color-mix(in srgb, var(--c) 55%, transparent);
}

.arch--site .risk-mock {
  filter: grayscale(1);
  background: repeating-linear-gradient(135deg, #f1f1f4 0 6px, #e6e6ec 6px 12px);
}
.arch--site .risk-pending { outline: 2px solid #fbbf24; outline-offset: 2px; }
.arch--site .risk-ready { outline: 2px solid #34d399; outline-offset: 2px; }
.arch--site .risk-version { top: auto; bottom: 46px; color: #1c1c24; font-weight: 700; }

/* общая зависимость — светлая полоса внизу страницы, как слой под всеми участками */
.arch--site .arch__shared.is-focus { box-shadow: 0 0 18px #f59e0b55; }
.arch--site .arch__shared--v2.is-focus { box-shadow: 0 0 18px #10b98155; }
.arch--site .arch__twice { left: auto; right: 8px; }


/* серверные стойки вместо пайплайнов: индикаторы и полосы юнитов, как на слайде 10 */
.arch--site .arch__pipe {
  flex-direction: column;
  gap: 4px;
  border: 0;
  border-radius: 0;

  &::after {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 6px;
    height: 16px;
    background: repeating-linear-gradient(180deg, rgb(255 255 255 / 0.08) 0 2px, transparent 2px 6px);
    pointer-events: none;
  }

  & .arch__text { margin-bottom: 10px; }
}

.srv-leds {
  display: flex;
  gap: 3px;

  & i {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--hud-c);
    opacity: 0.85;
  }
}
/* первая загрузка: крутилка посреди пустой страницы, гаснет к приходу шапки */
.site-loading {
  position: absolute;
  inset: 24px 0 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transition: opacity 0.35s ease;

  &.is-on { opacity: 1; }

  & i {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 3px solid rgb(124 58 237 / 0.18);
    border-top-color: #7c3aed;
    animation: site-spin 0.8s linear infinite;
  }
}


@keyframes site-spin {
  to { rotate: 360deg; }
}

.arch--site .arch__browser-bar span {
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: #9ca3af;
  font: 0.62rem var(--slidev-code-font-family, monospace);
}

/* промокод в корзине и скидка на карточке каталога — чья это логика? */
.site-coupon {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  border: 1.5px dashed #d6b36a;
  border-radius: 5px;
  background: #fffaf0;

  & em { color: #b58b2c; font-style: normal; font-weight: 800; font-size: 0.75rem; }
  & .skel { width: 60%; height: 7px; background: #e9d9b0; }
}

.site-sale {
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 1px 6px;
  border-radius: 4px;
  background: #ef4444;
  color: #fff;
  font-style: normal;
  font-weight: 800;
  font-size: 0.62rem;
}

/* промокод и скидку показываем только пока обсуждаем, чьи они */
.site-coupon,
.site-sale {
  opacity: 0;
  scale: 0.6;
  transition: opacity 0.35s, scale 0.45s cubic-bezier(0.3, 1.6, 0.5, 1), height 0.4s, margin 0.4s, box-shadow 0.4s;
}

.site-coupon {
  height: 0;
  margin: -4px 0;
  overflow: hidden;
}

.arch--coupon .site-coupon,
.arch--coupon .site-sale {
  opacity: 1;
  scale: 1;
  box-shadow: 0 0 0 3px #fbbf2455, 0 0 14px #f59e0b88;
}

.arch--coupon .site-coupon { height: 26px; margin: 0; }

/* «внутрянка» — не часть страницы: тёмные всплывашки поверх неё */
.arch--site .arch__shared {
  border: 1.5px dashed #fbbf24;
  background: #1c1610;
  color: #fde68a;
  box-shadow: 0 8px 22px rgb(0 0 0 / 0.5);
}

.arch--site .arch__shared--v2 {
  border-color: #34d399;
  background: #0d1f1a;
  color: #a7f3d0;
}

/* разработка локально: полоса сборки становится «ноутбуком разработчика» — фиолетовая, крупная подпись */
.arch--local .arch__ci {
  background:
    repeating-linear-gradient(135deg, rgb(167 139 250 / 0.1) 0 1px, transparent 1px 9px),
    rgb(46 16 101 / 0.55);
  border-color: rgb(167 139 250 / 0.4);
}

.arch--local .arch__zone {
  color: #c4b5fd;
  font-size: 1rem;
}
/* приглушённая «внутрянка» остаётся читаемой: на светлой странице полупрозрачный тёмный блок сереет */
.arch--site .arch__shared.is-muted:not(.is-hidden) { opacity: 0.75; filter: saturate(0.6); }

/* вся конструкция ниже — окно не липнет к верхнему краю слайда */
.arch--site { translate: 96px 34px; }

.site-link {
  fill: none;
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.site-link.is-on { opacity: 0.9; transition-delay: 0.25s; }
.site-link.is-on.is-muted { opacity: 0.35; }

.site-pop {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 11px;
  border: 1px solid var(--c);
  border-radius: 8px;
  background: #15131f;
  color: var(--c);
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.5), 0 0 16px color-mix(in srgb, var(--c) 30%, transparent);
  white-space: nowrap;
  opacity: 0;
  scale: 0.7;
  transition: transform 0.75s var(--ease), opacity 0.3s ease, scale 0.45s cubic-bezier(0.3, 1.5, 0.5, 1), filter 0.3s;

  & code { color: #f4f4f7; font-size: 0.82rem; }
}
.site-pop.is-on { opacity: 1; scale: 1; }
.site-pop.is-on.is-muted { opacity: 0.7; filter: saturate(0.6); }



/* схлопнутый участок — действительно нулевой: без отступов, иначе от него остаётся полоска */
.site-part {
  transition:
    transform 0.75s var(--ease),
    width 0.75s var(--ease),
    height 0.75s var(--ease),
    padding 0.75s var(--ease),
    opacity 0.35s ease,
    filter 0.3s ease,
    box-shadow 0.4s ease;
}
.site-part.is-hidden { padding: 0; border-width: 0; }

/* спиннер загрузки крутится и при «мгновенном» входе на слайд (там глушатся все анимации) */
.arch--instant .site-loading i { animation: site-spin 0.8s linear infinite !important; }

/* ui-kit v2: другой дизайн-язык — кнопки-«пилюли» с градиентом, скругления крупнее */
.site-v2 .site-btn {
  border-radius: 999px;
  background: linear-gradient(90deg, #8b5cf6, #d946ef);
}
.site-v2 .site-card { border-radius: 12px; background: #faf5ff; border-color: #e9d5ff; }
.site-v2 .site-card i { border-radius: 10px; background: linear-gradient(135deg, #ede9fe, #c4b5fd); }
.site-v2 .site-carousel__nav { background: #ede9fe; color: #7c3aed; }
.site-v2 .site-item { border-radius: 10px; background: #f5f3ff; }
.site-v2 .site-avatar { background: linear-gradient(135deg, #c4b5fd, #f0abfc); }
.site-nav.site-v2 .site-search { background: #ede9fe; }
.site-btn, .site-card, .site-card i, .site-item { transition: background 0.5s, border-radius 0.5s, border-color 0.5s, box-shadow 0.4s; }

/* ошибка контракта — всплывашка-ошибка на странице */
.site-error {
  position: absolute;
  left: 470px;
  top: 150px;
  z-index: 6;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 290px;
  padding: 8px 12px;
  border: 1px solid #f87171;
  border-radius: 8px;
  background: #2a0f14;
  color: #fecaca;
  font: 0.7rem/1.35 var(--slidev-code-font-family, monospace);
  box-shadow: 0 10px 28px rgb(0 0 0 / 0.5), 0 0 22px rgb(239 68 68 / 0.35);
  opacity: 0;
  scale: 0.8;
  transition: opacity 0.3s ease, scale 0.45s cubic-bezier(0.3, 1.5, 0.5, 1);

  & b { color: #f87171; font-size: 1rem; line-height: 1; }
  & strong { color: #f87171; }
}
.site-error.is-on { opacity: 1; scale: 1; transition-delay: 1.3s; }

/* diff в стиле vitest: заголовок ошибки, легенда, строки ожидаемого/полученного */
.site-diff {
  flex-direction: column;
  gap: 1px;
  width: 320px;
  top: 118px;

  & code { color: #d4d4d8; font-size: 0.72rem; white-space: pre; }
  & code.is-exp { color: #4ade80; }
  & code.is-rec { color: #f87171; }
}
.site-diff.is-on { transition-delay: 0.3s; }
.site-diff__head { color: #fca5a5; font-weight: 700; margin-bottom: 3px; }
.site-diff__legend {
  margin-bottom: 3px;

  & i { color: #4ade80; font-style: normal; }
  & em { color: #f87171; font-style: normal; }
}

/* ── передача к слайду «≠»: окно, участки и стойки встают на места MsVsMfe ── */
.arch__browser,
.arch__ci {
  transition-property: left, top, width, height, background, border-color, border-radius;
  transition-duration: 1.1s;
  transition-timing-function: var(--ease);
}

.arch--handoff .arch__box { transition-duration: 1.1s; }

.arch--handoff .arch__ci {
  border-color: rgb(255 255 255 / 0.12);
  background: rgb(8 8 14 / 0.72);
}

.arch__line.is-gone,
.arch__zone.is-gone { opacity: 0; transition: opacity 0.4s; }

/* стойки становятся серверами: индикаторы и имя строкой сверху, полосы юнитов внизу — как у подов на слайде «≠» */
.arch--handoff .arch__pipe {
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;
  padding: 8px;

  & .arch__text { margin: 0; align-items: flex-start; }
  & .arch__text b { color: #fff; font-size: 13px; line-height: 13px; }
  & .srv-leds { margin-top: 4px; }

  &::after {
    left: 8px;
    right: 8px;
    bottom: 8px;
    height: 40%;
    max-height: 120px;
    background: repeating-linear-gradient(180deg, rgb(255 255 255 / 0.06) 0 2px, transparent 2px 12px);
  }
}

/* окно — как на слайде «≠»: серый «светофор», пустая адресная строка */
.arch--handoff .arch__browser-bar i { background: #3f3f4a; opacity: 1; }
.arch--handoff .arch__browser-bar span { color: transparent; }
.arch__browser-bar i, .arch__browser-bar span { transition: background 0.8s, color 0.4s, opacity 0.8s; }

/* страница сжимается до вида слайда «≠»: мелкие ярлыки, каталог — просто карточки */
.arch--handoff .site-tag { font-size: 9px; padding: 0 5px; }
.site-tag { transition: font-size 1.1s var(--ease), padding 1.1s var(--ease); }
.arch--handoff .site-part { padding: 6px; }
.arch--handoff .site-part--profile { padding: 0 8px; }
.arch--handoff .skel--title,
.arch--handoff .site-dots { opacity: 0; height: 0; margin: -4px 0; }
.arch--handoff .site-carousel__nav { opacity: 0; width: 0; margin: 0 -3px; }
.arch--handoff .site-card:nth-child(4) { display: none; }
.arch--handoff .site-cards { grid-template-columns: repeat(3, 1fr); }
.skel--title, .site-dots, .site-carousel__nav {
  transition: opacity 0.5s, height 1.1s var(--ease), width 1.1s var(--ease), margin 1.1s var(--ease), background 0.4s, color 0.4s;
}
.arch--handoff .site-nav { padding: 0 8px; gap: 12px; }
.arch--handoff .site-search { width: 70px; height: 12px; margin-right: 40px; }

.site-handoff {
  position: absolute;
  color: #fff;
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}
.site-handoff.is-on { opacity: 1; transition-delay: 0.6s; }
.site-handoff--title { font-size: 22px; font-weight: 700; line-height: 33px; white-space: nowrap; }
.site-handoff--neq { font-size: 40px; font-weight: 300; line-height: 60px; color: rgb(255 255 255 / 0.45); }
</style>
