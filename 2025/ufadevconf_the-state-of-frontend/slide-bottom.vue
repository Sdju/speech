<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { computed, reactive, onMounted, onUnmounted, useTemplateRef, watch } from 'vue'

interface TimelineStep {
  $duration?: number
  $clicksAlias?: string | string[]
  [key: string]: any
}

const root = useTemplateRef('root')

function deepMerge(target: any, source: any) {
  if (source === null || typeof source !== 'object') return source
  if (target === null || typeof target !== 'object') target = {}

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = deepMerge(target[key], source[key])
    }
  }
  return target
}

let nav = useNav()
let slide = useSlideContext()

if (slide.$frontmatter.timeline) {
  const steps = computed(() => slide.$frontmatter.timeline)

  const keys = computed(() => {
    let baseKeys = new Set(Object.keys(steps.value[0]))
    baseKeys.delete('$clicksAlias')
    baseKeys.add('$stepsCount')
    return Array.from(baseKeys)
  })

  let totalClicks = computed(() => steps.value.length)

  const precalculatedData = computed(() => {
    const totalClicksValue = totalClicks.value
    const states = Array.from({ length: totalClicksValue }, () => deepMerge({}, steps.value[0]))

    let click = 0
    let aliases = {} as Record<string, [number, number]>
    steps.value.forEach((action) => {
      let from = 0
      let to = totalClicksValue
      from = click++

      action ??= {}

      if (action.$clicksAlias) {
        if (Array.isArray(action.$clicksAlias)) {
          action.$clicksAlias.forEach((alias) => {
            aliases[alias] = [from, to]
          })
        } else {
          aliases[action.$clicksAlias] = [from, to]
        }
      }
      
      for (let i = from; i < to; i++) {
        states[i] = deepMerge(states[i], action)
      }
    })
    return { states, aliases }
  })

  const clicksAliases = computed(() => precalculatedData.value.aliases)
  const click = computed(() => {
    const diff = slide.$page.value - nav.currentSlideNo.value
    if (diff === 0) {
      return Math.min(nav.clicks.value, totalClicks.value - 1) 
    }
    if (diff < 0) {
      console.log('diff < 0', nav.currentSlideNo.value, slide.$page.value)
      return totalClicks.value - 1
    }
    return 0
  })
  const data = computed(() => precalculatedData.value.states[click.value])

  const reactiveKeys = [
    keys.value.map((key) => [
      key,
      computed(() => {
        const value = data.value?.[key]

        if (value === undefined) {
          console.warn(`Key ${key} not found in ${data.value} ${click.value}`)
        }

        return value
      })
    ]),
    Object.keys(clicksAliases.value).map((alias) => [
      alias,
      computed(() => clicksAliases.value[alias][click.value])
    ]),
    [['$stepsCount', computed(() => precalculatedData.value.states.length)]]
  ].flat()

  // @ts-expect-error
  slide.$clicksContext.timeline = reactive(Object.fromEntries(reactiveKeys))

  onMounted(() => {
    slide.$clicksContext.register(root.value!, slide.$clicksContext.calculateSince(1, totalClicks.value - 1))
  })

  watch(
    () => [slide.$clicksContext.total, slide.$clicksContext.current], 
    ([newValueTotal, newValueCurrent], [oldValueTotal, oldValueCurrent]) => {
      if (newValueTotal === 0 && newValueCurrent === 0) {
        slide.$clicksContext.register(root.value!, slide.$clicksContext.calculateSince(1, totalClicks.value - 1))
        setTimeout(() => {
          slide.$clicksContext.current = oldValueCurrent
        }, 100)
      }
    }
  )

  onUnmounted(() => {
    slide.$clicksContext.unregister(root.value!)
  })
}
</script>

<template>
  <span ref="root" />
</template>
