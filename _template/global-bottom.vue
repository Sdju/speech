<script setup lang="ts">
import { useNav } from "@slidev/client"
import { computed, ref, watch, nextTick } from "vue"
// import BlurredPolyBackground from "./theme/components/backgrounds/BlurredPolyBackground.vue"
import GlslBackground from "./theme/components/backgrounds/GlslBackground.vue"
import shader from "./background-shader.glsl?raw"

const { currentSlideRoute, currentSlideNo } = useNav()
const frontmatter = computed(() => currentSlideRoute.value.meta?.slide?.frontmatter || {})
const uniforms = ref({})

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

watch(currentSlideNo, async () => {
  while(!document.getElementById('slideshow')) {
    await wait(10)
  }
  const color = getComputedStyle(document.getElementById('slideshow')!).getPropertyValue('--v-color')
  console.log(color)
  uniforms.value = {
    u_baseColor: {
      type: 'vec4',
      value: color
        .replace('rgb(', '')
        .replace(')', '')
        .split(',')
        .map(value => Number(value) / 255)
        .concat(1)
    }
  }
}, { immediate: true })
</script>

<template>
  <div :class="frontmatter.slideClass">
    <GlslBackground 
      :fragmentShader="shader"
      :uniforms="uniforms"
    />
  </div>
</template>
