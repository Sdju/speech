<template>
    <div ref="container" class="absolute inset-0 z-[-10] w-full h-full">
        <canvas ref="canvas" id="glsl-background"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

interface Props {
    fragmentShader: string
    vertexShader?: string
}

const props = withDefaults(defineProps<Props>(), {
    vertexShader: `
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }
    `
})

const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null
let program: WebGLProgram | null = null
let animationFrameId: number | null = null
let startTime = Date.now()

const initShaders = () => {
    if (!gl || !canvas.value) return

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) return

    gl.shaderSource(vertexShader, props.vertexShader)
    gl.compileShader(vertexShader)

    gl.shaderSource(fragmentShader, props.fragmentShader)
    gl.compileShader(fragmentShader)

    program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(program))
        return
    }

    gl.useProgram(program)

    // Create vertex buffer for a full-screen quad
    const positions = new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        1.0, 1.0,
    ])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionAttributeLocation = gl.getAttribLocation(program, 'aVertexPosition')
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
}

const resizeCanvas = () => {
    if (!canvas.value || !gl) return

    canvas.value.width = container.value!.clientWidth
    canvas.value.height = container.value!.clientHeight
    gl.viewport(0, 0, canvas.value.width, canvas.value.height)
}

const render = () => {
    if (!gl || !program || !canvas.value) return

    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

    gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000.0)
    gl.uniform2f(resolutionLocation, canvas.value.width, canvas.value.height)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    animationFrameId = requestAnimationFrame(render)
}

onMounted(() => {
    if (!canvas.value) return

    gl = canvas.value.getContext('webgl')
    if (!gl) {
        console.error('Unable to initialize WebGL')
        return
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    initShaders()
    render()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCanvas)
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
    }
})

// Пересоздаем шейдеры при изменении их кода
watch(() => [props.fragmentShader, props.vertexShader], () => {
    if (!gl || !program) return
    
    gl.deleteProgram(program)
    initShaders()
})
</script>

