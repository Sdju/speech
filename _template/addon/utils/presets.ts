/**
 * GLSL shader presets for image processing and backgrounds
 */

import type { ShaderTexture, ShaderUniform, PostProcessingStage } from './webgl'

export type ShaderPreset = 'vignette' | 'blur' | 'copy'

export interface SimplifiedStage {
  0: ShaderPreset
  1: Record<string, any>
}

export type StagesInput = 
  | PostProcessingStage[] 
  | SimplifiedStage[]

/**
 * Get shader source for a preset
 */
export function getPresetShader(
  preset: ShaderPreset, 
  params: Record<string, any> = {}
): string {
  switch (preset) {
    case 'vignette':
      const borderSize = params.borderSize ?? 0.2
      const blurWidth = params.blurWidth ?? 0.1
      
      return `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture0_0;
        
        void main() {
          vec4 color = texture2D(u_texture0_0, v_texCoord);
          
          float borderSize = ${borderSize};
          float blurWidth = ${blurWidth};
          
          float left = smoothstep(0.0, blurWidth, v_texCoord.x);
          float right = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.x);
          float top = smoothstep(0.0, blurWidth, v_texCoord.y);
          float bottom = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.y);
          
          float vignette = min(min(left, right), min(top, bottom));
          
          gl_FragColor = vec4(color.rgb, color.a * vignette);
        }
      `
    
    case 'blur':
      const blurAmount = params.blurAmount ?? 1.0
      
      return `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture0_0;
        uniform vec2 u_resolution;
        
        void main() {
          float blurAmount = ${blurAmount};
          vec2 offset = blurAmount / u_resolution;
          
          vec4 sum = vec4(0.0);
          sum += texture2D(u_texture0_0, v_texCoord + vec2(-2.0 * offset.x, -2.0 * offset.y)) * 0.0625;
          sum += texture2D(u_texture0_0, v_texCoord + vec2(-1.0 * offset.x, -1.0 * offset.y)) * 0.125;
          sum += texture2D(u_texture0_0, v_texCoord) * 0.25;
          sum += texture2D(u_texture0_0, v_texCoord + vec2(1.0 * offset.x, 1.0 * offset.y)) * 0.125;
          sum += texture2D(u_texture0_0, v_texCoord + vec2(2.0 * offset.x, 2.0 * offset.y)) * 0.0625;
          
          gl_FragColor = sum;
        }
      `
    
    case 'copy':
    default:
      return `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture0_0;
        
        void main() {
          gl_FragColor = texture2D(u_texture0_0, v_texCoord);
        }
      `
  }
}

/**
 * Normalize simplified stages to PostProcessingStage[]
 */
export function normalizeStages(
  stages: StagesInput,
  imageUrl?: string
): PostProcessingStage[] {
  // Check if first stage is simplified format
  if (Array.isArray(stages) && stages.length > 0) {
    const firstStage = stages[0]
    
    // Check if it's SimplifiedStage format [preset, params]
    if (
      Array.isArray(firstStage) && 
      firstStage.length === 2 && 
      typeof firstStage[0] === 'string'
    ) {
      return (stages as SimplifiedStage[]).map(item => {
        const [preset, params] = item as [ShaderPreset, Record<string, any>]
        const uniforms: Record<string, ShaderUniform> = {}
        
        // Convert params to uniforms
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            uniforms[key] = {
              type: typeof value === 'number' ? 'float' : 'float',
              value: value as number
            }
          })
        }
        
        const normalizedStage: PostProcessingStage = {
          fragmentShader: getPresetShader(preset as ShaderPreset, params),
          uniforms: Object.keys(uniforms).length > 0 ? uniforms : undefined
        }
        
        // Add texture if imageUrl is provided
        if (imageUrl) {
          normalizedStage.textures = [{
            source: imageUrl,
            options: {
              flipY: true // Flip Y to correct vertical orientation
            }
          }]
        }
        
        return normalizedStage
      })
    }
  }
  
  // Otherwise, stages are already in PostProcessingStage[] format
  // If imageUrl is provided but stages don't have textures with source, add it
  if (imageUrl) {
    return (stages as PostProcessingStage[]).map(stage => {
      // Only add texture if stage doesn't have textures with source
      const hasSource = stage.textures && stage.textures.some(t => typeof t.source !== 'undefined')
      if (!hasSource) {
        return {
          ...stage,
          textures: [
            ...(stage.textures || []),
            {
              source: imageUrl,
              options: {
                flipY: true
              }
            }
          ]
        }
      }
      // If textures exist but don't have source, add source to first texture
      if (stage.textures && stage.textures.length > 0 && !stage.textures[0].source) {
        return {
          ...stage,
          textures: [{
            ...stage.textures[0],
            source: imageUrl
          }]
        }
      }
      return stage
    })
  }
  
  return stages as PostProcessingStage[]
}

