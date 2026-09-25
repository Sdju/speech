<script setup lang="ts">
import { useNav } from "@slidev/client"
import { computed, ref, watch } from "vue"
import { TransitionPresets, useTransition } from '@vueuse/core'
import GlslBackground from "./theme/components/backgrounds/GlslBackground.vue"
import UniverseLayer from "./components/UniverseLayer.vue"
import shader from "./background-shader.glsl?raw"
import { 
  type PostProcessingPipeline,
  shadingShader,
  noopShader
} from "./addon/utils/shaders"
import { PostProcessingStage } from "./addon/utils/webgl"

const { currentSlideRoute, currentSlideNo } = useNav()
const frontmatter = computed(() => {
  const meta = (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {}
  return meta as { slideClass?: string, shading?: boolean }
})

const color = ref([0, 0, 0, 1])
const shaderColor = useTransition(color, {
  duration: 2000,
  transition: TransitionPresets.easeOutSine,
})
const shaderSlideNumber = useTransition(currentSlideNo, {
  duration: 2000,
  transition: TransitionPresets.easeOutSine,
})
const shaderShading = useTransition(computed(() => frontmatter.value.shading ? 0.4 : 0.25), {
  duration: 2000,
  transition: TransitionPresets.easeOutSine,
})

const postProcessingPipeline = computed((): PostProcessingStage[] => [
  {
    fragmentShader: shader,
    uniforms: {
      u_baseColor: {
        type: 'vec4' as const,
        value: shaderColor.value
      },
      u_slideNumber: {
        type: 'float' as const,
        value: shaderSlideNumber.value
      }
    }
  },
  {
    fragmentShader: shadingShader,
    uniforms: {
      u_shading: {
        type: 'float' as const,
        value: shaderShading.value
      }
    }
  }
])

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

watch(currentSlideNo, async () => {
  // у layout: full нет .slidev-layout — берём корень слайда
  const selector = `[data-slidev-no="${currentSlideNo.value}"] :is(.slidev-layout, .full)`
  while(!document.querySelector(selector)) {
    await wait(100)
  }
  const element = document.querySelector(selector)!
  const baseColor = getComputedStyle(element).getPropertyValue('--v-color')
  color.value = baseColor
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map(value => Number(value) / 255)
    .concat(1)
}, { immediate: true })
</script>

<template>
  <div :class="frontmatter.slideClass">
    <!-- туманность мягкая: половина разрешения и 30 fps незаметны глазу -->
    <GlslBackground :stages="postProcessingPipeline" :resolution-scale="0.5" :fps="30" />
    <UniverseLayer />
  </div>
</template>
