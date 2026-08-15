import type { Ref } from 'vue'
import { computed, reactive, watch } from 'vue'
import { mergeTimelineSteps } from './merge'
import type { TimelineStep } from './types'

/** Uno/Tailwind-like tokens for `:class="t.*"`, not human labels in `{{ t.* }}`. */
function isUtilityToken(token: string): boolean {
  if (token === 'fx')
    return true
  // Utilities: dashes, brackets, slash, %, CSS vars
  if (/[-[\]/%:]/.test(token) || /^\[--/.test(token))
    return true
  if (/^(opacity|duration|animate|overflow|inset|pointer-events|hidden|absolute|relative|flex|grid)([\w.-]|$)/.test(token))
    return true
  return false
}

function isClassString(value: string): boolean {
  const tokens = value.trim().split(/\s+/).filter(Boolean)
  if (!tokens.length)
    return false
  return tokens.every(isUtilityToken)
}

/** Attach stable edit key so CoordHelper can write back via data-editname. */
function withEditName(key: string, value: unknown) {
  if (value !== null && typeof value === 'object' && !Array.isArray(value))
    return { ...(value as Record<string, unknown>), 'data-editname': key }
  // Scalar class strings (`:class="t.foo"`) — marker class, not written back to md.
  // Skip content strings used in `{{ t.foo }}` (titles, node labels, …).
  if (typeof value === 'string' && isClassString(value))
    return `${value} editname-${key}`.trim()
  return value
}

/**
 * Reactive view-model for markdown `t.*` bindings.
 * Values are ComputedRefs stored on a reactive object (auto-unwrapped in templates).
 */
export function createTimelineViewModel(
  steps: Ref<TimelineStep[]>,
  clickIndex: Ref<number>,
) {
  const precalculated = computed(() => mergeTimelineSteps(steps.value || []))
  const view = reactive<Record<string, unknown>>({})

  watch(
    () => {
      const step0 = steps.value?.[0] ?? {}
      const aliases = Object.keys(precalculated.value.aliases)
      return `${Object.keys(step0).join('\0')}::${aliases.join('\0')}`
    },
    () => {
      for (const key of Object.keys(view))
        delete view[key]

      const step0 = steps.value?.[0] ?? {}
      const keys = new Set(Object.keys(step0))
      keys.delete('$clicksAlias')

      for (const key of keys) {
        view[key] = computed(() => withEditName(key, precalculated.value.states[clickIndex.value]?.[key]))
      }

      for (const alias of Object.keys(precalculated.value.aliases)) {
        view[alias] = computed(() => {
          const range = precalculated.value.aliases[alias]
          // Legacy shape: alias → [from, to] stored per click index lookup was wrong in old code
          // (range[clickIndex]). Keep same behavior: treat as tuple and index by click.
          return (range as unknown as Record<number, unknown>)?.[clickIndex.value]
        })
      }

      view.$stepsCount = computed(() => precalculated.value.total)
    },
    { immediate: true },
  )

  return view
}
