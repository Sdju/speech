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

interface ShaderTexture {
    source: string | HTMLImageElement
    name?: string
    options?: {
        wrap?: 'clamp' | 'repeat' | 'mirror'
        filter?: 'nearest' | 'linear'
        flipY?: boolean
    }
}

interface Props {
    fragmentShader: string
    vertexShader?: string
    uniforms?: Record<string, ShaderUniform>
    textures?: ShaderTexture[]
}

const props = withDefaults(defineProps<Props>(), {
    vertexShader: `
        attribute vec4 aVertexPosition;
        varying vec2 v_texCoord;
        void main() {
            v_texCoord = (aVertexPosition.xy + 1.0) / 2.0;
            gl_Position = aVertexPosition;
        }
    `,
    uniforms: () => ({}),
    textures: () => []
})

const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null
let program: WebGLProgram | null = null
let animationFrameId: number | null = null
let startTime = Date.now()
let uniformLocations: Record<string, WebGLUniformLocation | null> = {}
let textureObjects: Record<string, WebGLTexture | null> = {}
let textureUnits: Record<string, number> = {}

const loadTexture = async (textureInfo: ShaderTexture, index: number): Promise<WebGLTexture | null> => {
    if (!gl) return null

    const texture = gl.createTexture()
    if (!texture) return null

    const textureName = textureInfo.name || `u_texture${index}`
    const textureUnit = index
    textureUnits[textureName] = textureUnit

    gl.activeTexture(gl.TEXTURE0 + textureUnit)
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // Временное одноцветное изображение пока загружается настоящее
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255])
    )

    const loadImage = async (): Promise<HTMLImageElement> => {
        if (typeof textureInfo.source === 'string') {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.onload = () => resolve(img)
                img.onerror = reject
                img.src = textureInfo.source as string
            })
        }
        return textureInfo.source as HTMLImageElement
    }

    try {
        const image = await loadImage()
        
        gl.activeTexture(gl.TEXTURE0 + textureUnit)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        
        // Настройки текстуры
        const options = textureInfo.options || {}
        
        // Установка режима wrap
        const wrapMode = options.wrap === 'repeat' ? gl.REPEAT : 
                        options.wrap === 'mirror' ? gl.MIRRORED_REPEAT : 
                        gl.CLAMP_TO_EDGE
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapMode)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapMode)

        // Установка фильтрации
        const filterMode = options.filter === 'nearest' ? gl.NEAREST : gl.LINEAR
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterMode)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterMode)

        // Загрузка изображения в текстуру
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, options.flipY ? 1 : 0)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

        return texture
    } catch (error) {
        console.error('Error loading texture:', error)
        return null
    }
}

const initTextures = async () => {
    if (!gl || !program) return

    // Очищаем старые текстуры
    Object.values(textureObjects).forEach(texture => {
        if (texture && gl) gl.deleteTexture(texture)
    })
    textureObjects = {}
    textureUnits = {}

    // Загружаем новые текстуры
    await Promise.all(props.textures.map(async (textureInfo, index) => {
        const texture = await loadTexture(textureInfo, index)
        if (texture) {
            const name = textureInfo.name || `u_texture${index}`
            textureObjects[name] = texture
            
            // Устанавливаем uniform для текстуры
            const location = gl.getUniformLocation(program!, name)
            if (location) {
                gl.uniform1i(location, textureUnits[name])
            }
        }
    }))
}

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

    // Активируем текстуры
    Object.entries(textureObjects).forEach(([name, texture]) => {
        if (texture) {
            const unit = textureUnits[name]
            gl!.activeTexture(gl!.TEXTURE0 + unit)
            gl!.bindTexture(gl!.TEXTURE_2D, texture)
        }
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
    
    // Инициализируем текстуры
    initTextures()
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
    
    // Очищаем текстуры при размонтировании
    if (gl) {
        Object.values(textureObjects).forEach(texture => {
            if (texture) gl!.deleteTexture(texture)
        })
    }
})

// Следим за изменениями шейдеров, униформ и текстур
watch([
    () => props.fragmentShader,
    () => props.vertexShader,
    () => props.uniforms,
    () => props.textures
], () => {
    if (!gl || !program) return
    
    gl.deleteProgram(program)
    initShaders()
})
</script>

