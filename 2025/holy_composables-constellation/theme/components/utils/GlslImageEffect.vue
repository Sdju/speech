<template>
  <div ref="container" class="absolute inset-0 z-0 w-full h-full">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { 
  type PostProcessingPipeline,
  type PostProcessingStage
} from '../../../addon/utils/webgl'
import { PostProcessingManager } from '../../../addon/utils/postprocessing'
import { normalizeStages, type StagesInput } from '../../../addon/utils/presets'

interface Props {
  imageUrl?: string
  stages: StagesInput
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

const props = withDefaults(defineProps<Props>(), {
  objectFit: 'contain'
})

const getPipeline = (): PostProcessingPipeline => {
  const normalizedStages = normalizeStages(props.stages, props.imageUrl, { objectFit: props.objectFit })
  return { stages: normalizedStages }
}

const imageSize = ref<[number, number]>([0, 0])

const loadImageSize = async (url: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      imageSize.value = [img.width, img.height]
      resolve()
    }
    img.onerror = () => resolve()
    img.src = url
  })
}

const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null
let postProcessingManager: PostProcessingManager | null = null
let animationFrameId: number | null = null

const initPostProcessing = async (): Promise<void> => {
  if (!gl || !canvas.value) return
  
  // Load image size first if imageUrl is provided
  if (props.imageUrl) {
    await loadImageSize(props.imageUrl)
  }
  
  const pipeline = getPipeline()
  postProcessingManager = new PostProcessingManager(gl, canvas.value.width, canvas.value.height)
  await postProcessingManager.initialize(pipeline)
}

const resizeCanvas = async (): Promise<void> => {
  if (!canvas.value || !gl || !container.value) return
  
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  
  if (width === 0 || height === 0) return
  
  canvas.value.width = width
  canvas.value.height = height
  gl.viewport(0, 0, width, height)
  
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
  
  const pipeline = getPipeline()
  if (!postProcessingManager) return
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  
  const extraData = props.imageUrl && imageSize.value[0] > 0 
    ? { imageSize: imageSize.value }
    : {}
  
  postProcessingManager.render(pipeline, undefined, extraData)
  
  animationFrameId = requestAnimationFrame(render)
}

onMounted(async () => {
  if (!canvas.value) return
  
  gl = canvas.value.getContext('webgl')
  if (!gl) {
    console.error('Unable to initialize WebGL')
    return
  }
  
  resizeCanvas()
  
  if (canvas.value.width === 0 || canvas.value.height === 0) {
    console.error('Canvas has zero size after resize')
    return
  }
  
  window.addEventListener('resize', resizeCanvas)
  
  await initPostProcessing()
  render()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  
  if (postProcessingManager) {
    postProcessingManager.destroy()
  }
})

watch(() => props.stages, async () => {
  if (!gl) return
  
  if (postProcessingManager) {
    postProcessingManager.destroy()
    postProcessingManager = null
  }
  
  await initPostProcessing()
})

watch(() => props.imageUrl, async () => {
  if (!gl || !props.imageUrl) return
  
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
  width: 100%;
  height: 100%;
}
</style>
