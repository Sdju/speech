<template>
    <div ref="container" class="absolute inset-0 z-[-10] w-full h-full">
        <canvas ref="canvas" id="glsl-background" class="w-full h-full"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import {
  type PostProcessingPipeline,
} from '../../../addon/utils/webgl'
import { PostProcessingManager } from '../../../addon/utils/postprocessing'
import { normalizeStages, type StagesInput } from '../../../addon/utils/presets'

interface Props {
    stages: StagesInput
    /** доля от размера контейнера; мягкому фону хватает 0.5 */
    resolutionScale?: number
    /** ограничение частоты кадров */
    fps?: number
}

const props = withDefaults(defineProps<Props>(), {
    resolutionScale: 1,
    fps: 60,
})

const getPipeline = (): PostProcessingPipeline => {
  const normalizedStages = normalizeStages(props.stages)
  return { stages: normalizedStages }
}

const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null
let postProcessingManager: PostProcessingManager | null = null
let animationFrameId: number | null = null
let lastFrame = 0

const initPostProcessing = async (): Promise<void> => {
    if (!gl || !canvas.value) return

    const pipeline = getPipeline()
    postProcessingManager = new PostProcessingManager(gl, canvas.value.width, canvas.value.height)
    await postProcessingManager.initialize(pipeline)
}

const resizeCanvas = async (): Promise<void> => {
    if (!canvas.value || !gl || !container.value) return

    const width = Math.round(container.value.clientWidth * props.resolutionScale)
    const height = Math.round(container.value.clientHeight * props.resolutionScale)

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

const render = (now: number): void => {
    animationFrameId = requestAnimationFrame(render)
    if (!gl || !canvas.value) return
    if (canvas.value.width === 0 || canvas.value.height === 0) return
    if (now - lastFrame < 1000 / props.fps - 1) return
    lastFrame = now

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // uniform-ы (цвет, номер слайда) читаются из props каждый кадр
    if (postProcessingManager) {
        postProcessingManager.render(getPipeline(), undefined, {})
    }
}

onMounted(async () => {
    if (!canvas.value) return

    gl = canvas.value.getContext('webgl', { antialias: false })
    if (!gl) {
        console.error('Unable to initialize WebGL')
        return
    }

    await resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animationFrameId = requestAnimationFrame(render)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCanvas)
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
    }

    if (postProcessingManager) {
        postProcessingManager.destroy()
    }
    // освободить контекст сразу — иначе при перемонтировании копятся живые контексты
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
})

// Пересобираем пайплайн только при смене шейдеров. Раньше watch реагировал на любое
// изменение stages — анимация цвета после смены слайда перекомпилировала программы каждый кадр.
watch(() => normalizeStages(props.stages).map(s => s.fragmentShader).join('\0'), async () => {
    if (!gl) return

    if (postProcessingManager) {
        postProcessingManager.destroy()
        postProcessingManager = null
    }

    await initPostProcessing()
})
</script>
