<script setup lang="ts">
import type { Vec3 } from '../universe/scene'
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'
import { add, dot, mul, norm } from '../universe/camera'
import { liveCamera } from '../universe/screen'

/**
 * Северное сияние в левом верхнем углу — фрагментный шейдер (WebGL) поверх космоса.
 *
 * Несколько занавесов: у каждого волнистая нижняя кромка (синусы + шум, медленно плывут),
 * от неё свечение поднимается вверх и гаснет. Лучи — шум, вытянутый по вертикали и
 * изогнутый вслед за кромкой. Цвет — по высоте над кромкой, как у настоящего сияния:
 * розоватая бахрома снизу → изумрудный → бирюза → голубой → фиолет и пурпур вверху.
 * Полотно рисуется в половинном разрешении и растягивается — отсюда мягкость;
 * на слайд накладывается в режиме «экран», звёзды просвечивают.
 *
 * Сияние привязано к небу, а не к экрану: это направление в мире, как звёзды. Пока камера
 * летит к кадру слайда, полотно едет вместе с космосом и встаёт в угол, когда камера долетела.
 *
 * Кадры идут только пока слайд активен; разгорание — CSS-переход прозрачности.
 */
const active = useIsSlideActive()
const { $slidev } = useSlideContext()
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

const W = 400 // половина CSS-размера (800×440)
const H = 220

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_res;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

// палитра по высоте над кромкой (0 — кромка, 1 — верх занавеса)
vec3 palette(float h, float hueShift) {
  vec3 pink    = vec3(1.00, 0.36, 0.62);
  vec3 emerald = vec3(0.18, 1.00, 0.55);
  vec3 teal    = vec3(0.10, 0.90, 0.80);
  vec3 sky     = vec3(0.25, 0.62, 1.00);
  vec3 violet  = vec3(0.58, 0.36, 1.00);
  vec3 magenta = vec3(0.90, 0.30, 0.85);
  h = clamp(h + hueShift, 0.0, 1.0);
  vec3 c = mix(pink, emerald, smoothstep(0.0, 0.07, h));
  c = mix(c, teal, smoothstep(0.12, 0.3, h));
  c = mix(c, sky, smoothstep(0.3, 0.5, h));
  c = mix(c, violet, smoothstep(0.48, 0.7, h));
  c = mix(c, magenta, smoothstep(0.72, 0.95, h));
  return c;
}

// один занавес: base — высота кромки слева, slope — подъём вправо, height — высота свечения
vec3 curtain(vec2 p, float t, float seed, float base, float slope, float height, float hueShift, float gain) {
  float x = p.x;
  // кромка: крупная волна + медленно плывущий шум
  float edge = base + slope * x
    + 0.045 * sin(x * 4.2 + t * 0.35 + seed)
    + 0.03 * sin(x * 9.0 - t * 0.5 + seed * 2.0)
    + 0.09 * (fbm(vec2(x * 1.6 + seed, t * 0.06)) - 0.5);
  float d = p.y - edge;
  if (d < -0.05) return vec3(0.0);

  // лучи: шум, вытянутый по вертикали; колонки изгибаются вместе с кромкой
  float warp = fbm(vec2(x * 2.0 - t * 0.04, d * 1.5 + seed)) * 1.4;
  float rays = fbm(vec2((x + warp * 0.12) * 26.0 + seed * 7.0, d * 1.2 - t * 0.18));
  rays = pow(smoothstep(0.25, 0.85, rays), 1.4);
  // медленное «дыхание» яркости вдоль занавеса
  float pulse = 0.55 + 0.45 * fbm(vec2(x * 1.2 + t * 0.08, seed * 3.1));

  float h = d / height;
  // мягкая, но заметная нижняя кромка и плавное угасание вверх
  float lower = smoothstep(-0.035, 0.015, d);
  float upper = exp(-max(h, 0.0) * 2.6) * (1.0 - smoothstep(0.75, 1.35, h));
  float glow = lower * upper;
  float intensity = glow * (0.35 + 0.95 * rays) * pulse * gain;
  // тонкая яркая полоса у самой кромки
  intensity += lower * exp(-abs(d) * 45.0) * 0.35 * pulse * gain;

  return palette(h, hueShift) * intensity;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / u_res.y;
  // y вверх, x в долях высоты
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = u_time;

  vec3 col = vec3(0.0);
  col += curtain(p, t, 1.3, 0.20, 0.22, 0.55, 0.00, 1.00);
  col += curtain(p, t, 4.7, 0.42, 0.18, 0.45, 0.06, 0.70);
  col += curtain(p, t, 8.1, 0.05, 0.30, 0.50, -0.02, 0.55);
  col += curtain(p, t, 2.9, 0.62, 0.10, 0.38, 0.15, 0.45);

  // слой собирается в углу: гаснет к правому и нижнему краю полотна
  vec2 q = vec2(uv.x, 1.0 - uv.y);
  float corner = 1.0 - smoothstep(0.35, 1.0, length(q * vec2(1.15, 1.2)));
  col *= corner;

  // мягкий тон: без пересветов, насыщенные цвета остаются
  col = 1.0 - exp(-col * 1.6);
  gl_FragColor = vec4(col, max(col.r, max(col.g, col.b)));
}`

let gl: WebGLRenderingContext | null = null
let raf = 0
let start = 0
let uTime: WebGLUniformLocation | null = null

function compile(type: number, src: string) {
  const s = gl!.createShader(type)!
  gl!.shaderSource(s, src)
  gl!.compileShader(s)
  if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS))
    console.error('[Aurora]', gl!.getShaderInfoLog(s))
  return s
}

function init() {
  const el = canvas.value
  if (!el)
    return
  gl = el.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
  if (!gl)
    return
  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  gl.useProgram(prog)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  gl.uniform2f(gl.getUniformLocation(prog, 'u_res'), W, H)
  uTime = gl.getUniformLocation(prog, 'u_time')
  gl.viewport(0, 0, W, H)
  gl.clearColor(0, 0, 0, 0)
  start = performance.now()
  draw(start)
}

function draw(now: number) {
  if (!gl)
    return
  // с «прошедшими» 40 с — занавесы сразу в движении, а не из стартовой позы
  gl.uniform1f(uTime, 40 + (now - start) / 1000)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

/**
 * Сдвиг полотна вслед за небом. Точка неба — направление, которое в конечном кадре камеры
 * (куда она летит) приходится на центр полотна; в текущем кадре проецируем его на экран.
 */
function follow() {
  const el = canvas.value
  const cam = liveCamera.frame
  const goal = liveCamera.goal
  if (!el || !cam || !goal)
    return
  const sw = $slidev.configs.canvasWidth ?? 980
  const sh = sw / ($slidev.configs.aspectRatio ?? 16 / 9)
  const a = liveCamera.aspect
  // центр полотна в экранных координатах проекции: X ∈ [-aspect, aspect], Y ∈ [-1, 1]
  const X = (W / sw - 0.5) * 2 * a
  const Y = (0.5 - H / sh) * 2
  const dir: Vec3 = norm(add(add(goal.fwd, mul(goal.right, (X - goal.shift[0]) / goal.fov)), mul(goal.up, (Y - goal.shift[1]) / goal.fov)))
  const z = dot(dir, cam.fwd)
  if (z <= 0.05) {
    el.style.visibility = 'hidden'
    return
  }
  const x = dot(dir, cam.right) / z * cam.fov + cam.shift[0]
  const y = dot(dir, cam.up) / z * cam.fov + cam.shift[1]
  const dx = (x - X) / a / 2 * sw
  const dy = -(y - Y) / 2 * sh
  el.style.visibility = ''
  el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
}

function loop(now: number) {
  follow()
  draw(now)
  raf = requestAnimationFrame(loop)
}

onMounted(init)
watch(active, (on) => {
  cancelAnimationFrame(raf)
  if (on)
    raf = requestAnimationFrame(loop)
}, { immediate: true })
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  gl?.getExtension('WEBGL_lose_context')?.loseContext()
  gl = null
})
</script>

<template>
  <canvas
    ref="canvas"
    class="aurora"
    :class="{ 'aurora--on': active }"
    :width="W"
    :height="H"
    aria-hidden="true"
  />
</template>

<style scoped>
.aurora {
  position: absolute;
  left: 0;
  top: 0;
  width: 800px;
  height: 440px;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity 4s ease 0.6s;
}

.aurora--on {
  opacity: 1;
}
</style>
