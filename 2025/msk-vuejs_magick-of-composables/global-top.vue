<script setup>
import { useNav } from "@slidev/client"
import { computed } from "vue"
import { twMerge } from 'tailwind-merge'

const { currentSlideNo, currentSlideRoute } = useNav()
const frontmatter = computed(() => currentSlideRoute.value.meta?.slide?.frontmatter || {})
</script>

<template>
  <div :class="frontmatter.slideClass">
    <CoordHelper>
      <MousePosTooltip />
      <MouseSizeSelect />
      <ObjectEdit />
      <MemoryEditor />
    </CoordHelper>
    <div class="absolute right-[20px] bottom-[20px] text-lg opacity-50">{{ currentSlideNo }}</div>
    <div
      :class="twMerge([
        'absolute pos-20 text-[2.5em] transition-all duration-500',
        frontmatter.topTitleClass,
      ])"
    >
      {{ frontmatter.topTitle }}
    </div>
  </div>
</template>
