/**
 * Post-processing pipeline manager
 */

import { 
  createShader, 
  createProgram, 
  createFramebuffer, 
  loadTexture, 
  setUniform, 
  createQuadBuffer, 
  setupQuadAttributes,
  checkGLError,
  type ShaderUniform,
  type ShaderTexture,
  type PostProcessingStage,
  type PostProcessingPipeline
} from './webgl'

export class PostProcessingManager {
  private gl: WebGLRenderingContext
  private width: number
  private height: number
  private quadBuffer: WebGLBuffer | null = null
  private programs: WebGLProgram[] = []
  private framebuffers: { fbo: WebGLFramebuffer, texture: WebGLTexture }[] = []
  private textures: Record<string, WebGLTexture> = {}
  private textureUnits: Record<string, number> = {}
  private uniformLocations: Record<string, WebGLUniformLocation | null> = {}
  
  private readonly defaultVertexShader = `
    attribute vec4 aVertexPosition;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = (aVertexPosition.xy + 1.0) / 2.0;
      gl_Position = aVertexPosition;
    }
  `

  constructor(gl: WebGLRenderingContext, width: number, height: number) {
    this.gl = gl
    this.width = width
    this.height = height
    this.quadBuffer = createQuadBuffer(gl)
  }

  /**
   * Initializes the post-processing pipeline
   */
  async initialize(pipeline: PostProcessingPipeline): Promise<boolean> {
    this.cleanup()
    
    // Create framebuffers for each stage (except the last one which renders to screen)
    for (let i = 0; i < pipeline.stages.length - 1; i++) {
      const fbo = createFramebuffer(this.gl, this.width, this.height)
      if (!fbo) {
        console.error(`Failed to create framebuffer for stage ${i}`)
        return false
      }
      this.framebuffers.push(fbo)
    }
    
    // Create programs for each stage
    for (let i = 0; i < pipeline.stages.length; i++) {
      const stage = pipeline.stages[i]
      
      const vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, this.defaultVertexShader)
      const fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, stage.fragmentShader)
      
      if (!vertexShader || !fragmentShader) {
        console.error(`Failed to create shaders for stage ${i}`)
        return false
      }
      
      const program = createProgram(this.gl, vertexShader, fragmentShader)
      if (!program) {
        console.error(`Failed to create program for stage ${i}`)
        return false
      }
      
      this.programs.push(program)
      
      // Setup quad attributes
      if (this.quadBuffer) {
        setupQuadAttributes(this.gl, program, this.quadBuffer)
      }
      
      // Load textures for this stage
      if (stage.textures) {
        await this.loadStageTextures(stage.textures, i)
      }
    }
    
    return true
  }

  /**
   * Loads textures for a specific stage
   */
  private async loadStageTextures(textures: ShaderTexture[], stageIndex: number): Promise<void> {
    for (let i = 0; i < textures.length; i++) {
      const textureInfo = textures[i]
      const textureName = textureInfo.name || `u_texture${stageIndex}_${i}`
      const textureUnit = Object.keys(this.textureUnits).length
      
      const texture = await loadTexture(this.gl, textureInfo, textureUnit)
      if (texture) {
        this.textures[textureName] = texture
        this.textureUnits[textureName] = textureUnit
        
        // Set uniform for texture
        const program = this.programs[stageIndex]
        const location = this.gl.getUniformLocation(program, textureName)
        if (location) {
          this.gl.uniform1i(location, textureUnit)
        }
      }
    }
  }

  /**
   * Renders the post-processing pipeline
   */
  render(pipeline: PostProcessingPipeline, baseUniforms?: Record<string, ShaderUniform>): void {
    for (let i = 0; i < pipeline.stages.length; i++) {
      const stage = pipeline.stages[i]
      const program = this.programs[i]
      
      this.gl.useProgram(program)
      
      // Set render target
      if (i === pipeline.stages.length - 1) {
        // Last stage renders to screen
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
      } else {
        // Intermediate stages render to framebuffer
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffers[i].fbo)
      }
      
      this.gl.viewport(0, 0, this.width, this.height)
      
      // Clear the screen
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
      this.gl.clear(this.gl.COLOR_BUFFER_BIT)
      
      // Set uniforms
      this.setStageUniforms(program, stage.uniforms || {})
      
      // Set base uniforms (time, resolution, etc.)
      this.setBaseUniforms(program)
      
      // Set custom base uniforms if provided
      if (baseUniforms) {
        this.setStageUniforms(program, baseUniforms)
      }
      
      // Bind input textures
      this.bindInputTextures(stage, i)
      
      // Render
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
    }
  }

  /**
   * Sets uniforms for a specific stage
   */
  private setStageUniforms(program: WebGLProgram, uniforms: Record<string, ShaderUniform>): void {
    Object.entries(uniforms).forEach(([name, uniform]) => {
      setUniform(this.gl, program, name, uniform)
    })
  }

  /**
   * Sets base uniforms (time, resolution)
   */
  private setBaseUniforms(program: WebGLProgram): void {
    const timeLocation = this.gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = this.gl.getUniformLocation(program, 'u_resolution')
    
    if (timeLocation) {
      this.gl.uniform1f(timeLocation, performance.now() / 1000.0)
    }
    if (resolutionLocation) {
      this.gl.uniform2f(resolutionLocation, this.width, this.height)
    }
  }

  /**
   * Binds input textures for a stage
   */
  private bindInputTextures(stage: PostProcessingStage, stageIndex: number): void {
    // Bind previous stage's output as input texture
    if (stageIndex > 0) {
      const inputTextureName = 'u_inputTexture'
      const inputLocation = this.gl.getUniformLocation(this.programs[stageIndex], inputTextureName)
      
      if (inputLocation) {
        const previousFramebuffer = this.framebuffers[stageIndex - 1]
        this.gl.activeTexture(this.gl.TEXTURE0)
        this.gl.bindTexture(this.gl.TEXTURE_2D, previousFramebuffer.texture)
        this.gl.uniform1i(inputLocation, 0)
      }
    }
    
    // Bind stage-specific textures
    if (stage.textures) {
      stage.textures.forEach((textureInfo, index) => {
        const textureName = textureInfo.name || `u_texture${stageIndex}_${index}`
        const texture = this.textures[textureName]
        const textureUnit = this.textureUnits[textureName]
        
        if (texture !== undefined) {
          this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit)
          this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
        }
      })
    }
  }

  /**
   * Resizes the pipeline
   */
  resize(width: number, height: number): void {
    this.width = width
    this.height = height
    
    // Recreate framebuffers with new size
    this.framebuffers.forEach(fbo => {
      this.gl.deleteFramebuffer(fbo.fbo)
      this.gl.deleteTexture(fbo.texture)
    })
    this.framebuffers = []
  }

  /**
   * Cleans up resources
   */
  cleanup(): void {
    // Clean up programs
    this.programs.forEach(program => {
      this.gl.deleteProgram(program)
    })
    this.programs = []
    
    // Clean up framebuffers
    this.framebuffers.forEach(fbo => {
      this.gl.deleteFramebuffer(fbo.fbo)
      this.gl.deleteTexture(fbo.texture)
    })
    this.framebuffers = []
    
    // Clean up textures
    Object.values(this.textures).forEach(texture => {
      this.gl.deleteTexture(texture)
    })
    this.textures = {}
    this.textureUnits = {}
    this.uniformLocations = {}
  }

  /**
   * Destroys the manager
   */
  destroy(): void {
    this.cleanup()
    if (this.quadBuffer) {
      this.gl.deleteBuffer(this.quadBuffer)
    }
  }
}
