<template>
  <div ref="container" class="absolute inset-0 z-0 w-full h-full">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { 
  type PostProcessingPipeline,
  type ShaderTexture,
  type ShaderUniform
} from '../../../addon/utils/webgl'
import { PostProcessingManager } from '../../../addon/utils/postprocessing'

interface Props {
  imageUrl: string
  postProcessing?: PostProcessingPipeline
  preset?: 'none' | 'vignette' | 'blur'
  params?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  postProcessing: undefined,
  preset: 'none',
  params: () => ({})
})

const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null
let postProcessingManager: PostProcessingManager | null = null
let animationFrameId: number | null = null

// Предустановленные эффекты
const getPresetPipeline = (): PostProcessingPipeline => {
  const texture: ShaderTexture = {
    source: props.imageUrl
  }
  
  const uniforms: Record<string, ShaderUniform> = {}
  
  // Применяем параметры из props.params
  if (props.params) {
    Object.entries(props.params).forEach(([key, value]) => {
      uniforms[key] = {
        type: typeof value === 'number' ? 'float' : 'float',
        value: value as number
      }
    })
  }
  
  switch (props.preset) {
    case 'vignette':
      return {
        stages: [{
          fragmentShader: `
            precision mediump float;
            varying vec2 v_texCoord;
            uniform sampler2D u_texture0_0;
            ${props.params.borderSize !== undefined ? 'uniform float u_borderSize;' : ''}
            ${props.params.blurWidth !== undefined ? 'uniform float u_blurWidth;' : ''}
            
            void main() {
              vec4 color = texture2D(u_texture0_0, v_texCoord);
              
              float borderSize = ${props.params.borderSize ?? 0.2};
              float blurWidth = ${props.params.blurWidth ?? 0.1};
              
              float left = smoothstep(0.0, blurWidth, v_texCoord.x);
              float right = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.x);
              float top = smoothstep(0.0, blurWidth, v_texCoord.y);
              float bottom = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.y);
              
              float vignette = min(min(left, right), min(top, bottom));
              
              gl_FragColor = vec4(color.rgb, color.a * vignette);
            }
          `,
          textures: [texture],
          uniforms
        }]
      }
    
    case 'blur':
      return {
        stages: [{
          fragmentShader: `
            precision mediump float;
            varying vec2 v_texCoord;
            uniform sampler2D u_texture0_0;
            uniform vec2 u_resolution;
            ${props.params.blurAmount !== undefined ? 'uniform float u_blurAmount;' : ''}
            
            void main() {
              vec4 color = texture2D(u_texture0_0, v_texCoord);
              float blurAmount = ${props.params.blurAmount ?? 1.0};
              vec2 offset = blurAmount / u_resolution;
              
              vec4 sum = vec4(0.0);
              sum += texture2D(u_texture0_0, v_texCoord + vec2(-2.0 * offset.x, -2.0 * offset.y)) * 0.0625;
              sum += texture2D(u_texture0_0, v_texCoord + vec2(-1.0 * offset.x, -1.0 * offset.y)) * 0.125;
              sum += texture2D(u_texture0_0, v_texCoord) * 0.25;
              sum += texture2D(u_texture0_0, v_texCoord + vec2(1.0 * offset.x, 1.0 * offset.y)) * 0.125;
              sum += texture2D(u_texture0_0, v_texCoord + vec2(2.0 * offset.x, 2.0 * offset.y)) * 0.0625;
              
              gl_FragColor = sum;
            }
          `,
          textures: [texture],
          uniforms
        }]
      }
    
    default:
      return {
        stages: [{
          fragmentShader: `
            precision mediump float;
            varying vec2 v_texCoord;
            uniform sampler2D u_texture0_0;
            
            void main() {
              gl_FragColor = texture2D(u_texture0_0, v_texCoord);
            }
          `,
          textures: [texture]
        }]
      }
  }
}

const getPipeline = (): PostProcessingPipeline | null => {
  if (props.postProcessing) {
    return props.postProcessing
  }
  
  if (props.preset && props.preset !== 'none') {
    return getPresetPipeline()
  }
  
  return null
}

const initPostProcessing = async (): Promise<void> => {
  if (!gl || !canvas.value) return
  
  const pipeline = getPipeline()
  if (!pipeline) return
  
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
  if (!pipeline || !postProcessingManager) return
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  
  postProcessingManager.render(pipeline)
  
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

watch(() => props.imageUrl, async () => {
  if (!gl) return
  
  if (postProcessingManager) {
    postProcessingManager.destroy()
    postProcessingManager = null
  }
  
  await initPostProcessing()
})

watch(() => props.preset, async () => {
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
  width: 100%;
  height: 100%;
}
</style>