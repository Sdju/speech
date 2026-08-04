<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import DevToolsBackground from './theme/components/backgrounds/DevToolsBackground.vue'

const { currentSlideRoute } = useNav()
const frontmatter = computed(() => {
  const meta = (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {}
  return meta as { slideClass?: string }
})
</script>

<template>
  <div :class="frontmatter.slideClass">
    <DevToolsBackground />
  </div>
</template>
