<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue'
import { createTimelineViewModel } from '../../module/Timeline/createTimelineViewModel'
import { clicksForTimeline } from '../../module/Timeline/merge'
import type { TimelineStep } from '../../module/Timeline/types'

const props = defineProps<{
  steps?: TimelineStep[]
}>()

const root = useTemplateRef('root')
const nav = useNav()
const slide = useSlideContext()

const steps = computed(() => (props.steps ?? slide.$frontmatter.timeline ?? []) as TimelineStep[])
const clickIndex = computed(() => Math.min(nav.clicks.value, Math.max(0, steps.value.length - 1)))
const params = createTimelineViewModel(steps, clickIndex)

onMounted(() => {
  // Prefer frontmatter `clicks` (preparser). Gap only if author passed props.steps without FM clicks.
  if (props.steps && slide.$frontmatter.clicks == null) {
    const n = clicksForTimeline(props.steps)
    if (n != null && root.value) {
      slide.$clicksContext.register(
        root.value,
        slide.$clicksContext.calculateSince(1, n),
      )
    }
  }
})

onUnmounted(() => {
  if (root.value)
    slide.$clicksContext.unregister(root.value)
})
</script>

<template>
  <span ref="root" />
  <slot v-bind="params" />
</template>
