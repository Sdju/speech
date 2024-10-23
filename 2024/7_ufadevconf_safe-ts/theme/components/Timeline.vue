<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed, MaybeRef, toValue, reactive } from 'vue'

type TimelineSteps = Record<string, any>[]

interface TimelineParams {
  steps: TimelineSteps
}

function useTimeline({ steps }: TimelineParams) {
  let nav = useNav()

  let preparationData = computed(() => {
    const stepsValue = toValue(steps)
    let clicks = 0
    let keys = new Set(Object.keys(stepsValue[0]))

    let maxClicks = 1 + toValue(stepsValue).reduce((maxClicks, action) => {
      let endClicks = action.$clicks?.[1] ?? action.$clicks?.[0] ?? action.$clicks ?? clicks++

      if (action.change) {
        Object.keys(action).forEach((key) => {
          keys.add(key)
        })
      }

      return Math.max(maxClicks, endClicks)
    }, nav.clicksTotal.value)

    keys.delete('$clicks')

    return { maxClicks, keys: Array.from(keys) }
  })

  const precalculatedData = computed(() => {
    const maxClicks = preparationData.value.maxClicks
    const stepsValue = toValue(steps)
    const states = Array.from({ length: maxClicks }, () => Object.create(stepsValue[0]))

    let clicks = 0
    toValue(steps).forEach((action) => {
      let from = 0
      let to = maxClicks
      if (action.$clicks === undefined) {
        from = clicks++
      } else if (typeof action.$clicks === 'number') {
        from = action.$clicks
      } else if (Array.isArray(action.$clicks)) {
        from = action.$clicks[0] ?? 0
        to = action.$clicks[1] ?? maxClicks
      }
      
      for (let i = from; i < to; i++) {
        Object.assign(states[i], action)
      }
    })
    return states
  })
  console.log(precalculatedData.value)

  const data = computed(() => precalculatedData.value[nav.clicks.value])

  return reactive(Object.fromEntries(
    preparationData.value.keys.map((key) => [
      key,
      computed(() => {
        const value = data.value?.[key]

        if (value === undefined) {
          console.warn(`Key ${key} not found in ${data.value} ${nav.clicks.value}`)
        }

        return value
      })
    ])
  ))
}

const props = defineProps<{
  steps: TimelineSteps
}>()

const params = useTimeline({ steps: props.steps })
</script>

<template>
  <slot v-bind="params" />
</template>
