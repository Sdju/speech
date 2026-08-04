import type { Ref } from 'vue'
import { computed, reactive, watch } from 'vue'
import { mergeTimelineSteps } from './merge'
import type { TimelineStep } from './types'

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
        view[key] = computed(() => precalculated.value.states[clickIndex.value]?.[key])
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
