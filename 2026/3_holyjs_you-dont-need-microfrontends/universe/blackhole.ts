import * as THREE from 'three'

/**
 * Чёрная дыра и вспышка «сверхновой» для планеты из стульев (universe/chairs.ts).
 * Обе — плоскости, обращённые к камере, с шейдером на весь кадр поверх прозрачного канваса.
 *
 *   BlackHole — тень горизонта, аккреционный диск (почти с ребра, левая сторона ярче — эффект Доплера),
 *               линзированный «нимб» диска над тенью и под ней, фотонное кольцо и линзированные звёзды
 *               в тёмной области вокруг. Единицы шейдера — радиусы тени (1 = край горизонта).
 *   Blast     — ядро, раскалённое при схлопывании, затем ударные кольца, лучи и огненный шар.
 */

/** радиус тени чёрной дыры в мировых единицах сцены (планета из стульев — радиус 1.6) */
export const BH_RS = 0.55
/** наклон диска: косинус угла между плоскостью диска и лучом зрения (чем меньше, тем «с ребра») */
export const BH_COS_I = 0.17
/** поворот диска в кадре, рад: в такт наклону планеты */
export const BH_ROLL = -0.2

const VERT = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const NOISE = /* glsl */`
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * noise(p);
    p = p * 2.03 + vec2(7.1, 3.7);
    a *= 0.5;
  }
  return s;
}
`

const BH_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uGrow;
uniform float uFade;
uniform float uRoll;
uniform float uCosI;
uniform float uScale;
uniform vec2 uSize;
${NOISE}

const float RIN = 1.55;
const float ROUT = 5.0;

vec3 stars(vec2 q) {
  vec2 g = q * 3.4;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  float on = step(0.80, hash(id));
  vec2 off = (vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5) * 0.6;
  float d = length(f - off);
  float b = on * exp(-d * d * 260.0) * (0.5 + hash(id + 1.3) * 1.3);
  vec3 c = mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.82, 0.65), hash(id + 5.5));
  return c * b;
}

float omega(float rho) {
  return 3.2 * pow(rho, -1.5);
}

/* излучение диска на радиусе rho и азимуте th: яркость и цвет — горячее внутри, красное снаружи */
vec4 diskEmit(float rho, float th, float x) {
  float inner = smoothstep(RIN, RIN + 0.18, rho);
  float outer = 1.0 - smoothstep(ROUT - 1.6, ROUT, rho);
  float prof = pow(RIN / rho, 2.1) * inner * outer;
  float a = th - uTime * omega(rho);
  vec2 s = vec2(cos(a), sin(a)) * rho;
  float n = fbm(s * 1.6) * 0.8 + fbm(s * 4.6 + 3.0) * 0.45;
  float lum = prof * (0.35 + 1.55 * n);
  float tt = clamp((rho - RIN) / (ROUT - RIN), 0.0, 1.0);
  vec3 col = mix(vec3(1.0, 0.95, 0.82), vec3(1.0, 0.58, 0.2), smoothstep(0.0, 0.3, tt));
  col = mix(col, vec3(0.62, 0.11, 0.05), smoothstep(0.25, 0.95, tt));
  /* приближающаяся (левая) сторона ярче и голубее, удаляющаяся — тусклее и краснее */
  float beam = 1.0 - 0.62 * x / max(rho, 0.001);
  col = mix(col, col * vec3(0.8, 0.95, 1.25), clamp(-x / rho, 0.0, 1.0) * 0.5);
  return vec4(col * lum * beam * beam, lum);
}

void main() {
  vec2 p = (vUv - 0.5) * uSize / (uScale * max(uGrow, 1e-3));
  float R = length(p);
  if (R > 6.0) discard;

  float cr = cos(uRoll), sr = sin(uRoll);
  vec2 q = vec2(cr * p.x + sr * p.y, -sr * p.x + cr * p.y);

  vec3 col = vec3(0.0);
  float a = 0.0;

  /* тёмная область вокруг: пространство, линзированные звёзды (E² = 1.1) */
  float bgA = smoothstep(6.0, 2.2, R) * 0.88;
  float beta = R - 1.1 / R;
  vec3 st = stars(p / max(R, 1e-3) * beta) * smoothstep(1.0, 1.35, R);
  col += (vec3(0.012, 0.007, 0.022) + st) * bgA;
  a = bgA;

  /* нимб: линзированное изображение задней половины диска, огибающее тень сверху (и слабее снизу) */
  float halo = smoothstep(0.98, 1.04, R) * (1.0 - smoothstep(1.7, 2.15, R));
  if (halo > 0.0) {
    float k = clamp((R - 1.0) / 1.0, 0.0, 1.0);
    float rho2 = RIN + (ROUT - RIN) * pow(k, 1.5);
    float th2 = atan(q.y, q.x);
    vec4 e = diskEmit(rho2, th2, q.x * rho2 / max(R, 1e-3));
    float side = 0.4 + 0.6 * smoothstep(-1.0, 1.0, q.y / R);
    col += e.rgb * halo * side * 2.3;
    a = max(a, clamp(e.a * halo * side * 2.0, 0.0, 1.0));
  }

  /* дальняя часть диска (выше линии горизонта): видна по бокам, у тени её закрывает горизонт */
  float yp = q.y / uCosI;
  float rho = length(vec2(q.x, yp));
  float th = atan(yp, q.x);
  bool inDisk = rho > RIN && rho < ROUT;
  vec4 d = inDisk ? diskEmit(rho, th, q.x) : vec4(0.0);
  if (q.y >= 0.0) {
    col += d.rgb * 2.4;
    a = max(a, clamp(d.a * 2.6, 0.0, 1.0));
  }

  /* горизонт: непрозрачный чёрный диск */
  float sh = smoothstep(1.0, 0.985, R);
  col *= 1.0 - sh;
  a = mix(a, 1.0, sh);

  /* ближняя часть диска проходит перед тенью */
  if (q.y < 0.0) {
    col += d.rgb * 2.4;
    a = max(a, clamp(d.a * 2.6, 0.0, 1.0));
  }

  /* фотонное кольцо */
  float ring = exp(-pow((R - 1.012) / 0.018, 2.0)) * 1.7 + exp(-pow((R - 1.0) / 0.09, 2.0)) * 0.45;
  vec3 ringCol = vec3(1.0, 0.86, 0.66) * ring;
  col += ringCol;
  a = max(a, clamp(ring, 0.0, 1.0));

  col = 1.0 - exp(-col * 1.25);
  a = clamp(a, 0.0, 1.0);
  col = min(col, vec3(a) + 0.0);
  if (a < 0.004) discard;
  gl_FragColor = vec4(col, a) * uFade;
}
`

const BLAST_FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform float uTau;
uniform float uCol;
uniform vec2 uSize;
${NOISE}

void main() {
  vec2 p = (vUv - 0.5) * uSize;
  float R = length(p);
  float ang = atan(p.y, p.x);
  vec3 col = vec3(0.0);

  /* ядро: наливается жаром, пока стулья схлопываются */
  float core = exp(-R * R * (2.4 - 1.2 * uCol)) * uCol;
  col += vec3(1.0, 0.72, 0.38) * core * 1.1 + vec3(1.0, 0.95, 0.85) * pow(core, 3.0) * 1.6;

  if (uTau > 0.0) {
    float t = uTau;
    /* огненный шар */
    float r1 = 0.3 + t * 6.2;
    float ball = smoothstep(r1, r1 * 0.25, R) * exp(-t * 1.6) * (0.55 + 0.7 * fbm(vec2(R * 2.0 - t * 2.0, ang * 1.5)));
    col += vec3(1.0, 0.55, 0.2) * ball * 1.2;
    /* ударная волна */
    float w = 0.1 + 0.07 * t;
    float shock = exp(-pow((R - r1) / w, 2.0)) * exp(-t * 0.85);
    col += vec3(1.0, 0.86, 0.62) * shock * 2.0;
    float r2 = 0.15 + t * 3.8;
    float shock2 = exp(-pow((R - r2) / (0.05 + 0.03 * t), 2.0)) * exp(-t * 1.3);
    col += vec3(0.6, 0.75, 1.0) * shock2 * 1.4;
    /* лучи */
    float rays = pow(noise(vec2(ang * 6.0, floor(t * 6.0))), 3.0) * exp(-R * 0.45) * exp(-t * 2.6);
    col += vec3(1.0, 0.8, 0.55) * rays * 2.4;
  }

  float a = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
  if (a < 0.003) discard;
  gl_FragColor = vec4(col, a);
}
`

export function createBlackHole(size: number) {
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: BH_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uGrow: { value: 0.001 },
      uFade: { value: 0 },
      uRoll: { value: BH_ROLL },
      uCosI: { value: BH_COS_I },
      uScale: { value: BH_RS },
      uSize: { value: new THREE.Vector2(size, size) },
    },
    transparent: true,
    depthWrite: false,
    // прозрачность уже перемножена в шейдере: складываем как «премультиплицированное»
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
  })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat)
  mesh.visible = false
  mesh.frustumCulled = false
  mesh.renderOrder = 10
  return mesh
}

export function createBlast(size: number) {
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: BLAST_FRAG,
    uniforms: {
      uTau: { value: -1 },
      uCol: { value: 0 },
      uSize: { value: new THREE.Vector2(size, size) },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneFactor,
  })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat)
  mesh.visible = false
  mesh.frustumCulled = false
  mesh.renderOrder = 20
  return mesh
}
