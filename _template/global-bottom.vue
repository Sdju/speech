<script setup lang="ts">
import { useNav } from "@slidev/client"
import { computed, ref, watch } from "vue"
import { TransitionPresets, useTransition } from '@vueuse/core'
import GlslBackground from "./theme/components/backgrounds/GlslBackground.vue"
import shader from "./background-shader.glsl?raw"
import { 
  grainFilterShader, 
  turbulenceFilterShader, 
  vignetteFilterShader,
  type PostProcessingPipeline
} from "./addon/utils/shaders"

const { currentSlideRoute, currentSlideNo } = useNav()
const frontmatter = computed(() => {
  const meta = (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {}
  return meta as { slideClass?: string }
})

const color = ref([0, 0, 0, 1])
const shaderColor = useTransition(color, {
  duration: 2000,
  transition: TransitionPresets.linear,
})

const postProcessingPipeline = computed((): PostProcessingPipeline => ({
  stages: [
    {
      fragmentShader: shader,
      uniforms: {
        u_baseColor: {
          type: 'vec4' as const,
          value: shaderColor.value
        }
      }
    },
    {
      fragmentShader: grainFilterShader,
      uniforms: {
        u_grainIntensity: {
          type: 'float' as const,
          value: 0.05
        }
      }
    },
    {
      fragmentShader: turbulenceFilterShader,
      uniforms: {
        u_turbulenceIntensity: {
          type: 'float' as const,
          value: 0.3
        }
      }
    },
    {
      fragmentShader: vignetteFilterShader,
      uniforms: {
        u_vignetteIntensity: {
          type: 'float' as const,
          value: 1
        }
      }
    }
  ]
}))

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

watch(currentSlideNo, async () => {
  const selector = `[data-slidev-no="${currentSlideNo.value}"] .slidev-layout`
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
    <GlslBackground :postProcessing="postProcessingPipeline" />
  </div>
</template>
