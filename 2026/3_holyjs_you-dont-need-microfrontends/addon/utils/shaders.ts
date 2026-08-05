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

// Grain filter shader
export const grainFilterShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_inputTexture;
uniform vec2 u_resolution;
uniform float u_time;           // Для анимации (если нужно)
uniform float u_colorNum;       // Кол-во цветов для квантизации (256+ = выкл)
uniform float u_blockSize;      // Размер блока пикселизации (e.g., 16.0)
uniform float u_grainIntensity; // Опционально: сила доп. шума (0.0-1.0)

// Hash и valueNoise из твоего оригинала
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float valueNoise(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Квантизация
vec3 quantize(vec3 col, float num) {
    if (num >= 256.0) return col;
    return floor(col * (num - 1.0) + 0.5) / (num - 1.0);
}

// Вычисление яркости
float luminance(vec3 col) {
    return dot(col, vec3(0.299, 0.587, 0.114));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 finalColor = vec3(0.0);  // Чёрный фон по умолчанию

    // Вычисляем координаты блока
    vec2 blockUv = floor(uv * u_resolution / u_blockSize) * u_blockSize / u_resolution;
    vec2 localUv = fract(uv * u_resolution / u_blockSize);  // Локальные UV в блоке (0-1)

    // Средний цвет блока (простая выборка центра для скорости; для точности - усредни)
    vec3 avgColor = texture2D(u_inputTexture, blockUv + vec2(0.5 / u_resolution) * u_blockSize).rgb;

    // Квантизация
    avgColor = quantize(avgColor, u_colorNum);

    // Яркость
    float lum = luminance(avgColor);

    // Определяем, рисовать ли пиксель в зависимости от формы
    bool draw = false;
    if (lum > 0.7) {
        // Квадрат: весь блок
        draw = true;
    } else if (lum > 0.3) {
        // Круг: проверка расстояния от центра
        vec2 center = vec2(0.5);
        float radius = 0.5;
        if (distance(localUv, center) <= radius) {
            draw = true;
        }
    } else {
        // Треугольник: простой (нижний левый, e.g., localUv.x + localUv.y <= 1.0 для правого)
        if (localUv.x <= 1.0 - localUv.y) {  // Перевёрнутый треугольник для разнообразия
            draw = true;
        }
    }

    if (draw) {
        finalColor = avgColor;
    }

    // Опционально: добавить лёгкий grain на формы
    if (u_grainIntensity > 0.0 && draw) {
        vec2 noiseUv = uv * u_resolution * 0.01 + u_time * 0.1;
        float noise = (valueNoise(noiseUv) - 0.5) * 2.0 * u_grainIntensity;
        finalColor += noise;
        finalColor = clamp(finalColor, 0.0, 1.0);
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
`

export const fancyDitheringShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_inputTexture;
uniform vec2 u_resolution;
uniform float u_pixelScale;     // Базовый размер "зерна" (например 50.0)
uniform float u_shapeIntensity; // Насколько сильно меняется форма от круга к квадрату (0..1)

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Функция плавного перехода от круга к квадрату
float shapeMask(vec2 uv, float radius, float shape) {
    // shape = 0.0 → круг, shape = 1.0 → квадрат
    vec2 d = abs(uv);
    float squareDist = max(d.x, d.y);
    float circleDist = length(uv);
    // смешиваем между формами
    float m = mix(circleDist, squareDist, shape);
    return smoothstep(radius, radius - 0.05, m);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = texture2D(u_inputTexture, uv).rgb;
    float brightness = dot(color, vec3(0.299, 0.587, 0.114)); // яркость пикселя

    // определяем размер ячейки — адаптивный
    float cellSize = mix(3.0, 12.0, brightness) * u_pixelScale / u_resolution.x;
    vec2 cellUV = uv / cellSize;

    // находим центр ячейки
    vec2 cellId = floor(cellUV);
    vec2 localUV = fract(cellUV) - 0.5;

    // легкий шум для разнообразия размера
    float rnd = hash(cellId);
    float radius = mix(0.25, 0.5, brightness + rnd * 0.2);

    // чем ярче — тем квадратнее
    float shape = mix(0.0, 1.0, brightness * u_shapeIntensity);

    // рисуем форму (круг или квадрат)
    float mask = shapeMask(localUV, radius, shape);

    // дизеринг — случайное смещение по ячейкам для "зернистости"
    float dither = (hash(cellId + 1.23) - 0.5) * 0.1;
    vec3 finalColor = color * mask + dither;

    gl_FragColor = vec4(finalColor, 1.0);
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
// Lowering light colors to low intense
export const shadingShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_inputTexture;
uniform vec2 u_resolution;
uniform float u_shading;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = texture2D(u_inputTexture, uv).rgb;
    float shading = 1. - u_shading;
    gl_FragColor = vec4(color * shading, 1.0);
}
`

// return original image
export const noopShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_inputTexture;
uniform vec2 u_resolution;

void main() {
    gl_FragColor = texture2D(u_inputTexture, gl_FragCoord.xy / u_resolution.xy);
}
`

// Re-export the type for convenience
export type { PostProcessingPipeline }
