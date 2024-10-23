<script setup>
import { useNav } from "@slidev/client"
import { computed } from "vue"
import { twMerge } from 'tailwind-merge'

const { currentSlideNo, currentSlideRoute } = useNav()
const frontmatter = computed(() => currentSlideRoute.value.meta?.slide?.frontmatter || {})
</script>

<template>
  <div :variant="frontmatter.variant ?? 'main'">
    <div class="absolute right-[20px] bottom-[20px] text-lg opacity-50">{{ currentSlideNo }}</div>
    <div 
      :class="twMerge([
        'absolute left-[20px] top-[20px] text-[2.5em] transition-all duration-500',
        frontmatter.topTitleClass
      ])"
      :style="{ opacity: frontmatter.topTitle ? '70' : '0' }"
    >
      {{ frontmatter.topTitle }}
    </div>
  </div>
</template>
