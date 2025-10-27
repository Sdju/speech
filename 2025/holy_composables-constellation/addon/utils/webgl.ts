/**
 * WebGL utility functions for shader management
 */

export interface ShaderUniform {
  type: 'float' | 'vec2' | 'vec3' | 'vec4' | 'int' | 'bool'
  value: number | number[] | [number, number] | [number, number, number] | [number, number, number, number]
}

export interface ShaderTexture {
  source: string | HTMLImageElement
  name?: string
  options?: {
    wrap?: 'clamp' | 'repeat' | 'mirror'
    filter?: 'nearest' | 'linear'
    flipY?: boolean
  }
}

export interface PostProcessingStage {
  fragmentShader: string
  uniforms?: Record<string, ShaderUniform>
  textures?: ShaderTexture[]
}

export interface PostProcessingPipeline {
  stages: PostProcessingStage[]
}

/**
 * Creates and compiles a WebGL shader
 */
export function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`Shader compilation failed:`, gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  
  return shader
}

/**
 * Creates and links a WebGL program
 */
export function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram()
  if (!program) return null
  
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking failed:', gl.getProgramInfoLog(program))
    return null
  }
  
  return program
}

/**
 * Creates a framebuffer object with attached texture
 */
export function createFramebuffer(gl: WebGLRenderingContext, width: number, height: number): { fbo: WebGLFramebuffer, texture: WebGLTexture } | null {
  const fbo = gl.createFramebuffer()
  const texture = gl.createTexture()
  
  if (!fbo || !texture) return null
  
  // Setup texture
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  
  // Attach texture to framebuffer
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  
  // Check framebuffer status
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    console.error('Framebuffer not complete')
    gl.deleteFramebuffer(fbo)
    gl.deleteTexture(texture)
    return null
  }
  
  return { fbo, texture }
}

/**
 * Loads an image into a WebGL texture
 */
export async function loadTexture(gl: WebGLRenderingContext, textureInfo: ShaderTexture, textureUnit: number): Promise<WebGLTexture | null> {
  const texture = gl.createTexture()
  if (!texture) return null
  
  gl.activeTexture(gl.TEXTURE0 + textureUnit)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  
  // Placeholder texture while loading
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))
  
  try {
    const image = await loadImage(textureInfo.source)
    
    // Texture settings
    const options = textureInfo.options || {}
    
    // Wrap mode
    const wrapMode = options.wrap === 'repeat' ? gl.REPEAT : 
                    options.wrap === 'mirror' ? gl.MIRRORED_REPEAT : 
                    gl.CLAMP_TO_EDGE
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapMode)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapMode)
    
    // Filter mode
    const filterMode = options.filter === 'nearest' ? gl.NEAREST : gl.LINEAR
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterMode)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterMode)
    
    // Load image
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, options.flipY ? 1 : 0)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    
    return texture
  } catch (error) {
    console.error('Error loading texture:', error)
    gl.deleteTexture(texture)
    return null
  }
}

/**
 * Loads an image from source
 */
function loadImage(source: string | HTMLImageElement): Promise<HTMLImageElement> {
  if (typeof source === 'string') {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = source
    })
  }
  return Promise.resolve(source)
}

/**
 * Sets a uniform value
 */
export function setUniform(gl: WebGLRenderingContext, program: WebGLProgram, name: string, uniform: ShaderUniform): void {
  const location = gl.getUniformLocation(program, name)
  if (!location) return
  
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

/**
 * Creates a full-screen quad buffer
 */
export function createQuadBuffer(gl: WebGLRenderingContext): WebGLBuffer | null {
  const buffer = gl.createBuffer()
  if (!buffer) return null
  
  const positions = new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
     1.0,  1.0,
  ])
  
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
  
  return buffer
}

/**
 * Sets up vertex attributes for a full-screen quad
 */
export function setupQuadAttributes(gl: WebGLRenderingContext, program: WebGLProgram, buffer: WebGLBuffer): void {
  const positionLocation = gl.getAttribLocation(program, 'aVertexPosition')
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
}

/**
 * Checks for WebGL errors and logs them
 */
export function checkGLError(gl: WebGLRenderingContext, operation: string): boolean {
  const error = gl.getError()
  if (error !== gl.NO_ERROR) {
    console.error(`WebGL error in ${operation}:`, error)
    return false
  }
  return true
}
