<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { computed, reactive, onMounted, onUnmounted, useTemplateRef, onUpdated, onBeforeUpdate, getCurrentInstance, watch } from 'vue'

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

      if (action?.$clicksAlias) {
        if (Array.isArray(action.$clicksAlias)) {
          action.$clicksAlias.forEach((alias) => {
            aliases[alias] = [from, to]
          })
        } else {
          aliases[action.$clicksAlias] = [from, to]
        }
      }
      
      for (let i = from; i < to; i++) {
        states[i] = deepMerge(states[i], action ?? {})
      }
    })
    return { states, aliases }
  })

  const clicksAliases = computed(() => precalculatedData.value.aliases)
  const click = computed(() => {
    const diff = nav.currentSlideNo.value - slide.$page.value
    if (diff > 0) {
      return totalClicks.value - 1
    }
    if (diff < 0) {
      return 0
    }
    return Math.min(nav.clicks.value, totalClicks.value - 1)
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

  const instance = getCurrentInstance()?.parent?.parent?.props
  watch(() => instance?.clicksContext, () => {
    console.log('instance', instance)
    // @ts-expect-error
    instance.clicksContext.timeline = reactive(Object.fromEntries(reactiveKeys))
  }, { immediate: true, flush: 'sync' })

  onMounted(() => {
    slide.$clicksContext.register(root.value!, slide.$clicksContext.calculateSince(0, totalClicks.value))
  })

  onUnmounted(() => {
    slide.$clicksContext.unregister(root.value!)
  })
}
</script>

<template>
  <span ref="root" />
</template>
