<script setup>
import { useNav } from "@slidev/client"
import { computed } from "vue"
// import BlurredPolyBackground from "./theme/components/backgrounds/BlurredPolyBackground.vue"
import GlslBackground from "./theme/components/backgrounds/GlslBackground.vue"
import shader from "./background-shader.glsl?raw"

const { currentSlideRoute } = useNav()
const frontmatter = computed(() => currentSlideRoute.value.meta?.slide?.frontmatter || {})
</script>

<template>
  <div :class="frontmatter.slideClass">
    <GlslBackground :fragmentShader="shader" />
  </div>
</template>
