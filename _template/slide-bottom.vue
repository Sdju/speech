<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { computed, onUnmounted, watchEffect } from 'vue'
import { createTimelineViewModel } from './addon/module/Timeline/createTimelineViewModel'
import { publishTimeline, timelineKey, unpublishTimeline } from './addon/module/Timeline/store'
import type { TimelineStep } from './addon/module/Timeline/types'

const nav = useNav()
const slide = useSlideContext()

const steps = computed(() => (slide.$frontmatter.timeline ?? []) as TimelineStep[])
const hasTimeline = computed(() => steps.value.length > 0)
const page = computed(() => slide.$page.value)
const key = computed(() => timelineKey(page.value, slide.$renderContext.value))

const clickIndex = computed(() => {
  if (!hasTimeline.value)
    return 0

  const last = Math.max(0, steps.value.length - 1)
  const diff = page.value - nav.currentSlideNo.value
  if (diff === 0)
    // клики этого экземпляра: у превью следующего шага они на один больше, чем у основного экрана
    return Math.min(slide.$clicksContext.current, last)
  if (diff < 0)
    return last
  return 0
})

const view = createTimelineViewModel(steps, clickIndex)

watchEffect(() => {
  if (hasTimeline.value)
    publishTimeline(key.value, view)
  else
    unpublishTimeline(key.value, view)
})

onUnmounted(() => {
  unpublishTimeline(key.value, view)
})
</script>

<template>
  <span class="hidden" aria-hidden="true" />
</template>
