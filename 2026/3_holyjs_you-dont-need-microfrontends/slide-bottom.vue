<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { computed, onUnmounted, watchEffect } from 'vue'
import { createTimelineViewModel } from './addon/module/Timeline/createTimelineViewModel'
import { publishTimeline, unpublishTimeline } from './addon/module/Timeline/store'
import type { TimelineStep } from './addon/module/Timeline/types'

const nav = useNav()
const slide = useSlideContext()

const steps = computed(() => (slide.$frontmatter.timeline ?? []) as TimelineStep[])
const hasTimeline = computed(() => steps.value.length > 0)
const page = computed(() => slide.$page.value)

const clickIndex = computed(() => {
  if (!hasTimeline.value)
    return 0

  const last = Math.max(0, steps.value.length - 1)
  const diff = page.value - nav.currentSlideNo.value
  if (diff === 0)
    return Math.min(nav.clicks.value, last)
  if (diff < 0)
    return last
  return 0
})

const view = createTimelineViewModel(steps, clickIndex)

watchEffect(() => {
  if (hasTimeline.value)
    publishTimeline(page.value, view)
  else
    unpublishTimeline(page.value, view)
})

onUnmounted(() => {
  unpublishTimeline(page.value, view)
})
</script>

<template>
  <span class="hidden" aria-hidden="true" />
</template>
