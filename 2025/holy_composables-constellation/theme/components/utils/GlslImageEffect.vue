<template>
  <ObjectContainer
    :objectWidth="imageSize[0]"
    :objectHeight="imageSize[1]"
    :mode="objectFit"
    v-slot="{ class: canvasClass }"
  >
    <canvas ref="canvas" :class="canvasClass" />
  </ObjectContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue'
import { useElementSize } from '@vueuse/core'
import { PostProcessingManager } from '../../../addon/utils/postprocessing'
import { normalizeStages, type StagesInput } from '../../../addon/utils/presets'

interface Props {
  image: string
  stages: StagesInput
  objectFit?: 'contain' | 'cover' | 'fill' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
  objectFit: 'contain'
})

const pipeline = computed(() => {
  return { stages: normalizeStages(props.stages, props.image) }
})

const imageSize = ref<[number, number]>([0, 0])

const loadImageSize = async (image: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      imageSize.value = [img.width, img.height]
      resolve()
    }
    img.onerror = (error) => reject(error)
    img.src = image
  })
}

const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null
let postProcessingManager: PostProcessingManager | null = null
let animationFrameId: number | null = null

const { width: canvasWidth, height: canvasHeight } = useElementSize(canvas)

const initPostProcessing = async (): Promise<void> => {
  if (!gl || !canvas.value) return

  await loadImageSize(props.image)

  postProcessingManager = new PostProcessingManager(gl, canvas.value.width, canvas.value.height)
  await postProcessingManager.initialize(pipeline.value)
}

const resizeCanvas = async (): Promise<void> => {
  if (!canvas.value || !gl) return
  
  canvas.value.width = canvasWidth.value
  canvas.value.height = canvasHeight.value
  gl.viewport(0, 0, canvasWidth.value, canvasHeight.value)
  
  if (postProcessingManager) {
    postProcessingManager.destroy()
    postProcessingManager = null
  }
  
  await initPostProcessing()
}

const render = (): void => {
  if (!gl || !canvas.value) return
  
  if (canvas.value.width === 0 || canvas.value.height === 0) {
    animationFrameId = requestAnimationFrame(render)
    return
  }
  
  if (!postProcessingManager) return
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  
  const extraData = props.image && imageSize.value[0] > 0 
    ? { imageSize: imageSize.value }
    : {}
  
  postProcessingManager.render(pipeline.value, undefined, extraData)
  
  animationFrameId = requestAnimationFrame(render)
}

onMounted(async () => {
  if (!canvas.value) return
  
  gl = canvas.value.getContext('webgl')
  if (!gl) {
    console.error('Unable to initialize WebGL')
    return
  }
  
  await loadImageSize(props.image)
  await new Promise((resolve) => setTimeout(resolve, 0))
  resizeCanvas()
  
  if (canvas.value.width === 0 || canvas.value.height === 0) {
    console.error('Canvas has zero size after resize')
    return
  }
  
  await initPostProcessing()
  render()
})

onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  
  postProcessingManager?.destroy()
})

watch(() => [props.stages, props.image], async () => {
  if (!gl) return
  
  if (postProcessingManager) {
    postProcessingManager.destroy()
    postProcessingManager = null
  }
  
  await initPostProcessing()
})
</script>

<style scoped>
canvas {
  display: block;
}
</style>
