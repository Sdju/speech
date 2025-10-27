/**
 * GLSL shader presets for image processing and backgrounds
 */

import type { ShaderTexture, ShaderUniform, PostProcessingStage } from './webgl'

export type ShaderPreset = 'vignette' | 'blur' | 'copy'

export interface SimplifiedStage {
  0: ShaderPreset
  1: Record<string, any>
}

export interface NormalizeOptions {
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

export type StagesInput = 
  | PostProcessingStage[] 
  | SimplifiedStage[]

/**
 * Helper function to get shader with proper UV handling for object-fit
 */
function getShaderWithUVHandling(
  shaderBody: (uv: string) => string,
  useObjectFit: boolean = true
): string {
  if (!useObjectFit) {
    return `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform sampler2D u_texture0_0;
      
      void main() {
        ${shaderBody('v_texCoord')}
      }
    `
  }
  
  return `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_texture0_0;
    uniform vec2 u_resolution;
    uniform vec2 u_imageSize;
    uniform int u_objectFit;
    
    // Helper function to calculate UV coordinates based on object-fit behavior
    vec2 getCorrectUV(vec2 uv, vec2 resolution, vec2 imageSize, int objectFit) {
      vec2 imageAspect = imageSize / imageSize.y;
      vec2 screenAspect = resolution / resolution.y;
      
      if (objectFit == 1) { // cover
        float scale = max(screenAspect.x / imageAspect.x, screenAspect.y / imageAspect.y);
        vec2 scaledSize = imageAspect * scale;
        vec2 offset = (scaledSize - screenAspect) / 2.0 / scaledSize;
        vec2 resultUV = uv * scaledSize / screenAspect - offset;
        return resultUV;
      } else if (objectFit == 2) { // fill
        return uv;
      } else { // contain (default) or scale-down
        float scale = min(screenAspect.x / imageAspect.x, screenAspect.y / imageAspect.y);
        vec2 scaledSize = imageAspect * scale;
        vec2 offset = (screenAspect - scaledSize) / 2.0 / screenAspect;
        return (uv - offset) * screenAspect / scaledSize;
      }
    }
    
    void main() {
      ${shaderBody('getCorrectUV(v_texCoord, u_resolution, u_imageSize, u_objectFit)')}
    }
  `
}

/**
 * Get shader source for a preset
 */
export function getPresetShader(
  preset: ShaderPreset, 
  params: Record<string, any> = {},
  useObjectFit: boolean = false
): string {
  switch (preset) {
    case 'vignette':
      const borderSize = params.borderSize ?? 0.2
      const blurWidth = params.blurWidth ?? 0.1
      
      return getShaderWithUVHandling((uv) => `
        vec4 color = texture2D(u_texture0_0, ${uv});
        
        float borderSize = ${borderSize};
        float blurWidth = ${blurWidth};
        
        // Calculate vignette using original screen UV
        float left = smoothstep(0.0, blurWidth, v_texCoord.x);
        float right = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.x);
        float top = smoothstep(0.0, blurWidth, v_texCoord.y);
        float bottom = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.y);
        
        float vignette = min(min(left, right), min(top, bottom));
        
        gl_FragColor = vec4(color.rgb, color.a * vignette);
      `, useObjectFit)
    
    case 'blur':
      const blurAmount = params.blurAmount ?? 1.0
      
      return getShaderWithUVHandling((uv) => `
        vec4 color = texture2D(u_texture0_0, ${uv});
        
        float blurAmount = ${blurAmount};
        
        // Simple blur effect (for simplicity, this is basic)
        gl_FragColor = color;
      `, useObjectFit)
    
    case 'copy':
    default:
      return getShaderWithUVHandling((uv) => `
        gl_FragColor = texture2D(u_texture0_0, ${uv});
      `, useObjectFit)
  }
}

/**
 * Normalize simplified stages to PostProcessingStage[]
 */
export function normalizeStages(
  stages: StagesInput,
  imageUrl?: string,
  options: NormalizeOptions = {}
): PostProcessingStage[] {
  const objectFit = options.objectFit ?? 'contain'
  
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
        
        // Add object-fit uniforms if using object-fit handling
        if (imageUrl) {
          uniforms['u_resolution'] = { type: 'vec2', value: [0, 0] } // Will be set by PostProcessingManager
          uniforms['u_imageSize'] = { type: 'vec2', value: [0, 0] } // Will be set dynamically
          uniforms['u_objectFit'] = { 
            type: 'int', 
            value: objectFit === 'cover' ? 1 : objectFit === 'fill' ? 2 : 0 
          }
        }
        
        const normalizedStage: PostProcessingStage = {
          fragmentShader: getPresetShader(preset as ShaderPreset, params, !!imageUrl),
          uniforms: Object.keys(uniforms).length > 0 ? uniforms : undefined
        }
        
        // Add texture if imageUrl is provided
        if (imageUrl) {
          normalizedStage.textures = [{
            source: imageUrl,
          }]
        }
        
        return normalizedStage
      })
    }
  }
  
  // Otherwise, stages are already in PostProcessingStage[] format
  return stages as PostProcessingStage[]
}

