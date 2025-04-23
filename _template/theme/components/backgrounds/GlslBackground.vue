<template>
    <div ref="container" class="absolute inset-0 z-[-10] w-full h-full">
        <canvas ref="canvas" id="glsl-background"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

type UniformValue = number | number[] | [number, number] | [number, number, number] | [number, number, number, number]

interface ShaderUniform {
    type: 'float' | 'vec2' | 'vec3' | 'vec4' | 'int' | 'bool'
    value: UniformValue
}

interface Props {
    fragmentShader: string
    vertexShader?: string
    uniforms?: Record<string, ShaderUniform>
}

const props = withDefaults(defineProps<Props>(), {
    vertexShader: `
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }
    `,
    uniforms: () => ({})
})

const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null
let program: WebGLProgram | null = null
let animationFrameId: number | null = null
let startTime = Date.now()
let uniformLocations: Record<string, WebGLUniformLocation | null> = {}

const setUniform = (name: string, uniform: ShaderUniform) => {
    if (!gl || !program) return

    const location = uniformLocations[name] ?? gl.getUniformLocation(program, name)
    if (!location) return

    uniformLocations[name] = location

    switch (uniform.type) {
        case 'float':
            gl.uniform1f(location, uniform.value as number)
            break
        case 'vec2':
            gl.uniform2fv(location, uniform.value as [number, number])
            break
        case 'vec3':
            gl.uniform3fv(location, uniform.value as [number, number, number])
            break
        case 'vec4':
            gl.uniform4fv(location, uniform.value as [number, number, number, number])
            break
        case 'int':
            gl.uniform1i(location, uniform.value as number)
            break
        case 'bool':
            gl.uniform1i(location, uniform.value ? 1 : 0)
            break
    }
}

const updateUniforms = () => {
    if (!gl || !program) return

    // Обновляем встроенные униформы
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

    if (timeLocation) {
        gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000.0)
    }
    if (resolutionLocation && canvas.value) {
        gl.uniform2f(resolutionLocation, canvas.value.width, canvas.value.height)
    }

    // Обновляем пользовательские униформы
    Object.entries(props.uniforms).forEach(([name, uniform]) => {
        setUniform(name, uniform)
    })
}

const initShaders = () => {
    if (!gl || !canvas.value) return

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) return

    gl.shaderSource(vertexShader, props.vertexShader)
    gl.compileShader(vertexShader)

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vertexShader))
        return
    }

    gl.shaderSource(fragmentShader, props.fragmentShader)
    gl.compileShader(fragmentShader)

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fragmentShader))
        return
    }

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

    // Сбрасываем кэш локаций униформ при пересоздании программы
    uniformLocations = {}
}

const resizeCanvas = () => {
    if (!canvas.value || !gl || !container.value) return

    canvas.value.width = container.value.clientWidth
    canvas.value.height = container.value.clientHeight
    gl.viewport(0, 0, canvas.value.width, canvas.value.height)
}

const render = () => {
    if (!gl || !program || !canvas.value) return

    updateUniforms()
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

// Следим за изменениями шейдеров и униформ
watch([
    () => props.fragmentShader,
    () => props.vertexShader,
    () => props.uniforms
], () => {
    if (!gl || !program) return
    
    gl.deleteProgram(program)
    initShaders()
})
</script>

