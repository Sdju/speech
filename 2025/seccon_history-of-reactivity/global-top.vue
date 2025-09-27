<script setup>
import { useNav } from "@slidev/client"
import { computed } from "vue"
import { twMerge } from 'tailwind-merge'

const { currentSlideNo, currentSlideRoute } = useNav()
const frontmatter = computed(() => currentSlideRoute.value.meta?.slide?.frontmatter || {})
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full pointer-events-none" :class="frontmatter.slideClass">
    <CoordHelper>
      <MousePosTooltip />
      <MouseSizeSelect />
      <ObjectEdit />
      <MemoryEditor />
    </CoordHelper>
    <div class="right-5 bottom-5 absolute text-lg opacity-50">{{ currentSlideNo }}</div>
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
