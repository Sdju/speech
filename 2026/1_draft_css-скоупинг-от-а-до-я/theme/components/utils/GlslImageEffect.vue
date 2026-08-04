<template>
  <ObjectContainer
    v-if="!isOverview"
    :objectWidth="imageSize[0]"
    :objectHeight="imageSize[1]"
    :mode="objectFit"
    v-slot="{ class: canvasClass }"
  >
    <canvas ref="canvas" :class="canvasClass" />
  </ObjectContainer>
  <img v-else :src="image" style="{objectFit: objectFit}" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue'
import { useSlideContext } from '@slidev/client'
import { useElementSize, until } from '@vueuse/core'
import { PostProcessingManager } from '../../../addon/utils/postprocessing'
import { normalizeStages, type StagesInput } from '../../../addon/utils/presets'

const slideContext = useSlideContext()
const isOverview = computed(() => slideContext.$renderContext.value === 'overview')

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
  
  // Очистка с прозрачным фоном (альфа = 0.0)
  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  
  const extraData = props.image && imageSize.value[0] > 0 
    ? { imageSize: imageSize.value }
    : {}
  
  postProcessingManager.render(pipeline.value, undefined, extraData)
  
  animationFrameId = requestAnimationFrame(render)
}

onMounted(async () => {
  await loadImageSize(props.image)
  await until(() => canvasWidth.value > 0 && canvasHeight.value > 0).toBeTruthy()
  
  // Создаём WebGL контекст с поддержкой прозрачности
  gl = canvas.value!.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    antialias: true
  })
  if (!gl) {
    console.error('Unable to initialize WebGL')
    return
  }
  
  // Включаем блендинг для корректной работы с прозрачностью
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  
  resizeCanvas()
  
  if (canvas.value!.width === 0 || canvas.value!.height === 0) {
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
watch(() => [canvasWidth, canvasHeight], async () => {
  if (!postProcessingManager) {
    return
  }
  await resizeCanvas()
})
</script>

<style scoped>
canvas {
  display: block;
}
</style>
