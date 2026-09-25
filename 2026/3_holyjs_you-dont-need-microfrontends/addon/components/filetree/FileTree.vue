<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import type { FileTreeStep, TreeRow } from '../../module/FileTree/parse'
import { focused, resolveSteps } from '../../module/FileTree/parse'

/**
 * Анимированное дерево файлов: шаги — деревья (текстом, см. module/FileTree/parse.ts),
 * между шагами строки не перерисовываются, а морфятся:
 *   удалённые схлопываются → оставшиеся едут на новые места (FLIP) → новые въезжают по очереди.
 * Строка с тем же `@id` перелетает в другую папку вместе с детьми и может переименоваться.
 *
 * Шаги: проп `steps` или `fileTree:` во frontmatter слайда.
 * Клики: сам регистрирует `steps.length - 1` кликов (сам себе драйвер);
 * с пропом `step` — управляется снаружи (например, `:step="t.tree"` из timeline).
 */
const props = withDefaults(defineProps<{
  steps?: FileTreeStep[]
  step?: number
  /** высота области под дерево, px: размер шрифта подбирается под самый длинный шаг */
  height?: number
  /** максимальный размер шрифта, px */
  maxFont?: number
  /** ширина колонки дерева, em — чтобы центрированный блок не ёрзал между шагами */
  width?: number
}>(), { height: 480, maxFont: 20, width: 22 })

const root = useTemplateRef('root')
const slide = useSlideContext()
const active = useIsSlideActive()

const all = computed(() => resolveSteps((props.steps ?? slide.$frontmatter.fileTree ?? []) as FileTreeStep[]))
const index = computed(() => {
  const i = props.step ?? slide.$clicksContext.current
  return Math.min(Math.max(0, i), Math.max(0, all.value.length - 1))
})
const current = computed(() => all.value[index.value] ?? { rows: [], focus: [], caption: undefined })

// ── что изменилось относительно предыдущего показанного шага ───────
const flags = ref(new Map<string, { moved: boolean, fresh: boolean, order: number }>())
const tick = ref(0)
/**
 * Без анимации: слайд не на экране (Slidev держит соседние слайды «докликанными» до конца
 * и сбрасывает клики при входе) или прыжок через несколько шагов — показываем сразу итог.
 */
const instant = ref(true)

watch([current, index], ([step, i], [old, oldI]) => {
  instant.value = !old || !active.value || Math.abs(i - (oldI ?? i)) > 1
  const before = old && !instant.value ? new Map(old.rows.map(r => [r.id, r])) : null
  const out = new Map<string, { moved: boolean, fresh: boolean, order: number }>()
  let order = 0
  for (const r of step.rows) {
    const was = before?.get(r.id)
    const fresh = !!before && !was
    out.set(r.id, {
      moved: !!was && (was.parentId !== r.parentId || was.depth !== r.depth || was.name !== r.name),
      fresh,
      order: fresh ? order++ : 0,
    })
  }
  flags.value = out
  tick.value++
}, { immediate: true })

const lit = computed(() => focused(current.value.rows, current.value.focus))

// ── размер: самый длинный шаг помещается в height ──────────────────
const ROW = 1.45 // высота строки, em
const maxRows = computed(() => Math.max(1, ...all.value.map(s => s.rows.length)))
const font = computed(() => Math.min(props.maxFont, props.height / (maxRows.value * ROW)))

// ── цвета ──────────────────────────────────────────────────────────
const TAGS: Record<string, string> = {
  green: '#34d399',
  blue: '#60a5fa',
  pink: '#f472b6',
  violet: '#a78bfa',
  amber: '#fbbf24',
  red: '#f87171',
  cyan: '#22d3ee',
}
const EXT: Record<string, string> = {
  vue: '#41b883',
  ts: '#4f9ee8',
  js: '#e8d44d',
  json: '#cbcb41',
  md: '#9ca3af',
  css: '#c084fc',
  yaml: '#f87171',
  yml: '#f87171',
}
function color(r: TreeRow) {
  const tag = r.tags.find(t => TAGS[t])
  if (tag)
    return TAGS[tag]
  if (r.dir)
    return '#c4b5fd'
  return EXT[r.name.split('.').pop() ?? ''] ?? '#d1d5db'
}

function rowClass(r: TreeRow) {
  const f = flags.value.get(r.id)
  return {
    'is-dir': r.dir,
    'is-ellipsis': r.ellipsis,
    'is-tagged': r.tags.some(t => TAGS[t]),
    'is-dim': lit.value != null && !lit.value.has(r.id),
    'is-lit': lit.value?.has(r.id),
    // чётность шага перезапускает CSS-анимацию вспышки на каждом шаге
    [`is-moved-${tick.value % 2}`]: f?.moved,
    [`is-fresh-${tick.value % 2}`]: f?.fresh,
  }
}

// ── клики ──────────────────────────────────────────────────────────
onMounted(() => {
  const n = all.value.length - 1
  if (props.step == null && slide.$frontmatter.clicks == null && n > 0 && root.value)
    slide.$clicksContext.register(root.value, slide.$clicksContext.calculateSince(1, n))
})
onUnmounted(() => {
  if (root.value)
    slide.$clicksContext.unregister(root.value)
})
</script>

<template>
  <div
    ref="root"
    class="ft"
    :class="{ 'ft--instant': instant }"
    :style="{ '--ft-font': `${font}px`, '--ft-row': `${ROW}em`, '--ft-width': `${width}em`, 'minHeight': `${maxRows * ROW * font + 40}px` }"
  >
    <div class="ft__caption">
      <!-- Keep CSS hooks asynchronous: out-in with css=false can re-enter Vue's
           patch during removal. ft--instant disables the visual animation. -->
      <Transition name="ft-cap" mode="out-in">
        <div v-if="current.caption" :key="current.caption" class="hud-label">
          {{ current.caption }}
        </div>
      </Transition>
    </div>

    <TransitionGroup tag="div" name="ft" class="ft__list">
      <div
        v-for="r in current.rows"
        :key="r.id"
        class="ft-row"
        :class="rowClass(r)"
        :style="{ '--depth': r.depth, '--c': color(r), '--d': `${(flags.get(r.id)?.order ?? 0) * 55}ms` }"
      >
        <span
          v-for="l in Math.max(0, r.depth - 1)"
          :key="l"
          class="ft-rail"
          :class="{ 'is-on': r.rails[l] }"
          :style="{ '--l': l }"
        />
        <span v-if="r.depth" class="ft-elbow" :class="{ 'is-last': r.last }" />

        <svg v-if="!r.ellipsis" class="ft-icon" viewBox="0 0 16 16" aria-hidden="true">
          <path v-if="r.dir" d="M1.5 3.5h4.2l1.4 1.5h7.4v7.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z" />
          <template v-else>
            <path d="M3.5 1.5h6l3 3v10h-9z" />
            <path class="ft-icon__fold" d="M9.5 1.5v3h3" />
          </template>
        </svg>

        <Transition name="ft-name" mode="out-in">
          <span :key="r.name" class="ft-name">{{ r.name }}</span>
        </Transition>
        <span v-if="r.note" class="ft-note">{{ r.note }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.ft {
  --ft-indent: 1.55em;
  --ft-c0: 0.5em; /* центр иконки от начала строки — сюда приходят линии дерева */
  --ft-line: rgba(196, 181, 253, 0.28);
  --ft-ease: cubic-bezier(0.65, 0, 0.35, 1);
  font-family: var(--slidev-code-font-family, 'Fira Code', monospace);
  font-size: var(--ft-font);
  /* паддинг подложки — внутри заданной высоты и сверх ширины колонки */
  box-sizing: border-box;
  width: calc(var(--ft-width) + 2.6em);
  display: flex;
  flex-direction: column;
  text-align: left;
  /* стеклянная подложка: дерево читается и поверх яркой планеты */
  padding: 0.9em 1.3em 1.1em;
  border-radius: 0.9em;
  border: 1px solid rgb(255 255 255 / 0.09);
  background: linear-gradient(160deg, rgb(20 18 36 / 0.68), rgb(6 6 14 / 0.76));
  box-shadow:
    0 1.2em 3em rgb(0 0 0 / 0.35),
    inset 0 1px 0 rgb(255 255 255 / 0.06);
  backdrop-filter: blur(14px) saturate(1.2);
}

.ft__caption {
  height: 2em;
  margin-bottom: 0.3em;
  font-size: 0.8em;
  white-space: nowrap;
}

.ft--instant,
.ft--instant * {
  transition: none !important;
  animation: none !important;
}

.ft__list {
  position: relative;
}

/* ── строка ─────────────────────────────────────────────────────── */
.ft-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.45em;
  height: var(--ft-row);
  width: max-content;
  margin-left: calc(var(--depth) * var(--ft-indent));
  padding-right: 0.5em;
  border-radius: 0.3em;
  white-space: nowrap;
  transition:
    opacity 0.5s ease,
    filter 0.5s ease;
}

.ft-icon {
  flex: none;
  width: 1em;
  height: 1em;
  fill: color-mix(in srgb, var(--c) 22%, transparent);
  stroke: var(--c);
  stroke-width: 1.2;
  stroke-linejoin: round;
  transition: stroke 0.5s, fill 0.5s;
}
.ft-icon__fold {
  fill: none;
}

.ft-name {
  color: color-mix(in srgb, var(--c) 45%, #e5e7eb);
  transition: color 0.5s;
}
.is-dir .ft-name {
  font-weight: 600;
}
.is-tagged .ft-name {
  color: var(--c);
}
.is-ellipsis .ft-name {
  color: #6b7280;
}

.ft-note {
  margin-left: 0.8em;
  font-size: 0.8em;
  color: #9ca3af;
  font-style: italic;
}
.ft-note::before {
  content: '// ';
  opacity: 0.6;
}

/* ── линии дерева ───────────────────────────────────────────────── */
.ft-rail,
.ft-elbow {
  position: absolute;
  pointer-events: none;
  transition: opacity 0.45s ease;
}

.ft-rail {
  top: 0;
  bottom: 0;
  left: calc((var(--l) - 1 - var(--depth)) * var(--ft-indent) + var(--ft-c0));
  border-left: 1px solid var(--ft-line);
  opacity: 0;
}
.ft-rail.is-on {
  opacity: 1;
}

.ft-elbow {
  top: 0;
  bottom: 0;
  left: calc(var(--ft-c0) - var(--ft-indent));
  width: calc(var(--ft-indent) - var(--ft-c0) - 0.25em);
}
/* ├ : вертикаль насквозь, └ : до середины */
.ft-elbow::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-left: 1px solid var(--ft-line);
  transition: bottom 0.45s var(--ft-ease);
}
.ft-elbow.is-last::before {
  bottom: 50%;
}
.ft-elbow::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  border-top: 1px solid var(--ft-line);
}

/* ── фокус ──────────────────────────────────────────────────────── */
.is-dim {
  opacity: 0.3;
  filter: saturate(0.2);
}
.is-lit .ft-name {
  color: color-mix(in srgb, var(--c) 80%, white);
}

/* ── вспышка: перелетел / переименован / появился ───────────────── */
.is-moved-0,
.is-moved-1 {
  animation: ft-flash-a 1.6s ease-out 0.1s both;
}
.is-moved-1 {
  animation-name: ft-flash-b;
}
.is-fresh-0,
.is-fresh-1 {
  animation: ft-flash-a 1.4s ease-out calc(0.35s + var(--d)) both;
}
.is-fresh-1 {
  animation-name: ft-flash-b;
}
@keyframes ft-flash-a {
  0%, 35% { background: color-mix(in srgb, var(--c) 26%, transparent); box-shadow: 0 0 0.8em color-mix(in srgb, var(--c) 35%, transparent); }
  100% { background: transparent; box-shadow: none; }
}
@keyframes ft-flash-b {
  0%, 35% { background: color-mix(in srgb, var(--c) 26%, transparent); box-shadow: 0 0 0.8em color-mix(in srgb, var(--c) 35%, transparent); }
  100% { background: transparent; box-shadow: none; }
}

/* ── хореография шага: уход → перелёт → появление ───────────────── */
.ft-move {
  transition: transform 0.8s var(--ft-ease) 0.12s;
  z-index: 1;
}
.ft-enter-active {
  transition:
    opacity 0.45s ease calc(0.4s + var(--d)),
    transform 0.6s var(--ft-ease) calc(0.4s + var(--d));
}
.ft-enter-from {
  opacity: 0;
  transform: translateX(-1.2em);
}
.ft-leave-active {
  position: absolute;
  transition:
    opacity 0.3s ease,
    transform 0.35s ease;
}
.ft-leave-to {
  opacity: 0;
  transform: translateX(1em) scaleY(0.6);
}

/* переименование: старое имя уходит вверх, новое приходит снизу */
.ft-name-enter-active,
.ft-name-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.ft-name-enter-from {
  opacity: 0;
  transform: translateY(0.5em);
}
.ft-name-leave-to {
  opacity: 0;
  transform: translateY(-0.5em);
}

.ft-cap-enter-active,
.ft-cap-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.ft-cap-enter-from,
.ft-cap-leave-to {
  opacity: 0;
  transform: translateY(0.3em);
}
</style>
