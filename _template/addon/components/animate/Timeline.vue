<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { computed, reactive, onMounted, onUnmounted, useTemplateRef } from 'vue'

interface TimelineStep {
  $duration?: number
  $clicksAlias?: string | string[]
  [key: string]: any
}

type TimelineSteps = TimelineStep[]

const props = defineProps<{
  steps?: TimelineSteps
}>()

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
const steps = computed(() => props.steps ?? slide.$frontmatter.timeline)

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
const click = computed(() => Math.min(nav.clicks.value, totalClicks.value - 1))
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

const params = reactive(Object.fromEntries(reactiveKeys))

onMounted(() => {
  slide.$clicksContext.register(root.value!, slide.$clicksContext.calculateSince(0, totalClicks.value))
})

onUnmounted(() => {
  slide.$clicksContext.unregister(root.value!)
})
</script>

<template>
  <span ref="root" />

  <slot v-bind="params" />
</template>
