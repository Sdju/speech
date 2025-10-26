<template>
    <div ref="container" class="absolute inset-0 z-[-10] w-full h-full">
        <canvas ref="canvas" id="glsl-background"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { 
  type PostProcessingPipeline
} from '../../../addon/utils/webgl'
import { PostProcessingManager } from '../../../addon/utils/postprocessing'

interface Props {
    postProcessing: PostProcessingPipeline
}

const props = defineProps<Props>()

const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null
let postProcessingManager: PostProcessingManager | null = null
let animationFrameId: number | null = null

const initPostProcessing = async (): Promise<void> => {
    if (!gl || !canvas.value || !props.postProcessing) return

    postProcessingManager = new PostProcessingManager(gl, canvas.value.width, canvas.value.height)
    await postProcessingManager.initialize(props.postProcessing)
}

const resizeCanvas = (): void => {
    if (!canvas.value || !gl || !container.value) return

    const width = container.value.clientWidth
    const height = container.value.clientHeight
    
    if (width === 0 || height === 0) return

    canvas.value.width = width
    canvas.value.height = height
    gl.viewport(0, 0, width, height)
    
    if (postProcessingManager) {
        postProcessingManager.resize(width, height)
    }
}

const render = (): void => {
    if (!gl || !canvas.value) return

    if (canvas.value.width === 0 || canvas.value.height === 0) {
        animationFrameId = requestAnimationFrame(render)
        return
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    if (postProcessingManager) {
        postProcessingManager.render(props.postProcessing)
    }
    
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

watch(() => props.postProcessing, async () => {
    if (!gl) return
    
    if (postProcessingManager) {
        postProcessingManager.destroy()
        postProcessingManager = null
    }
    
    await initPostProcessing()
})
</script>

