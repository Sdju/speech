<script setup>
import { useNav } from "@slidev/client"
import { computed } from "vue"
import BlurredPolyBackground from "./theme/components/backgrounds/BlurredPolyBackground.vue"

const { currentSlideRoute } = useNav()
const frontmatter = computed(() => currentSlideRoute.value.meta?.slide?.frontmatter || {})
</script>

<template>
  <div :variant="frontmatter.variant ?? 'first'">
    <BlurredPolyBackground />
  </div>
</template>
