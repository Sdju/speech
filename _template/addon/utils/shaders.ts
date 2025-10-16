import type { PostProcessingPipeline } from './webgl'

// Simple single-stage pipeline (equivalent to single shader)
export const createSingleStagePipeline = (fragmentShader: string, uniforms: Record<string, any> = {}) => ({
  stages: [
    {
      fragmentShader,
      uniforms
    }
  ]
})

// Base shader - generates the initial image
export const baseShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_baseColor;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Simple animated pattern
    float pattern = sin(uv.x * 10.0 + u_time) * cos(uv.y * 8.0 + u_time * 0.5);
    vec3 color = u_baseColor.rgb * (0.3 + 0.7 * pattern);
    
    gl_FragColor = vec4(color, 1.0);
}
`

// Grain filter shader
export const grainFilterShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_inputTexture;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_grainIntensity;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Sample input texture
    vec3 color = texture2D(u_inputTexture, uv).rgb;
    
    // Add grain
    float noise = random(uv + u_time * 0.1) * 2.0 - 1.0;
    color += noise * u_grainIntensity;
    
    gl_FragColor = vec4(color, 1.0);
}
`

// Turbulence filter shader
export const turbulenceFilterShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_inputTexture;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_turbulenceIntensity;

vec2 turbulence(vec2 uv, float intensity) {
    float time = u_time * 0.5;
    vec2 offset = vec2(
        sin(uv.y * 10.0 + time) * 0.01,
        cos(uv.x * 8.0 + time) * 0.01
    );
    return uv + offset * intensity;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Apply turbulence distortion
    vec2 distortedUV = turbulence(uv, u_turbulenceIntensity);
    
    // Sample input texture with distortion
    vec3 color = texture2D(u_inputTexture, distortedUV).rgb;
    
    gl_FragColor = vec4(color, 1.0);
}
`

// Vignette filter shader
export const vignetteFilterShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_inputTexture;
uniform vec2 u_resolution;
uniform float u_vignetteIntensity;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Sample input texture
    vec3 color = texture2D(u_inputTexture, uv).rgb;
    
    // Apply vignette
    float dist = distance(uv, vec2(0.5));
    float vignette = 1.0 - smoothstep(0.3, 0.8, dist);
    vignette = mix(1.0, vignette, u_vignetteIntensity);
    
    gl_FragColor = vec4(color * vignette, 1.0);
}
`

// Re-export the type for convenience
export type { PostProcessingPipeline }
