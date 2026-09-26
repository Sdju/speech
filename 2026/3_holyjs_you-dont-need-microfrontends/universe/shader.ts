export const MAX_P = 3
export const MAX_S = 6
/** размер грани куб-карты запечённых поверхностей */
export const BAKE_SIZE = 512

export const vertex = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

/** Шум и процедурные поверхности — общие для рендера и запекания */
const surfaceLib = `
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                 mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                 mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}

// LOD: число октав шума задаётся перед расчётом поверхности (мелкие тела — меньше октав)
int g_oct = 5;

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    if (i >= g_oct) break;
    v += a * noise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return v;
}

float hash1(float n) { return fract(sin(n) * 43758.5453); }
float noise1(float x) {
  float i = floor(x);
  float f = fract(x);
  return mix(hash1(i), hash1(i + 1.0), f * f * (3.0 - 2.0 * f));
}

float sphere(vec3 ro, vec3 rd, vec3 c, float r) {
  vec3 oc = ro - c;
  float b = dot(oc, rd);
  float h = b * b - dot(oc, oc) + r * r;
  if (h < 0.0) return -1.0;
  return -b - sqrt(h);
}

void basis(vec3 axis, out vec3 e1, out vec3 e2) {
  e1 = cross(axis, vec3(0.0, 0.0, 1.0));
  e1 = length(e1) < 1e-3 ? vec3(1.0, 0.0, 0.0) : normalize(e1);
  e2 = cross(e1, axis);
}

float ringDensity(float r, float inner, float outer) {
  if (inner <= 0.0 || r < inner || r > outer) return 0.0;
  float x = (r - inner) / (outer - inner);
  float d = 0.45 + 0.55 * noise1(r * 38.0 / inner * 1.32);
  d *= 0.6 + 0.4 * noise1(r * 140.0 / inner * 1.32);
  d *= smoothstep(0.0, 0.08, x) * smoothstep(1.0, 0.82, x);
  d *= 1.0 - 0.92 * smoothstep(0.012, 0.0, abs(x - 0.62));
  d *= 1.0 - 0.5 * smoothstep(0.03, 0.0, abs(x - 0.3));
  return d;
}

vec3 gasSurface(vec3 q, vec3 base, float time) {
  float lat = q.y;
  float w1 = fbm(q * 3.1 + vec3(0.0, 0.0, time * 0.008));
  float w2 = fbm(vec3(q.x * 5.0, lat * 22.0, q.z * 5.0) + w1 * 2.0);
  float y = lat + (w1 - 0.5) * 0.09 + (w2 - 0.5) * 0.035;
  float bandsWide = sin(y * 11.0) * 0.5 + 0.5;
  float bandsThin = sin(y * 47.0 + w2 * 3.0) * 0.5 + 0.5;
  float streaks = fbm(vec3(q.x * 9.0, y * 70.0, q.z * 9.0));
  vec2 sp = vec2(atan(q.z, q.x) - 1.2, (lat + 0.3) * 3.0);
  float storm = smoothstep(0.16, 0.0, length(sp * vec2(1.0, 1.6)));

  vec3 dusk = mix(base * 0.45, vec3(0.16, 0.12, 0.2), 0.45);
  vec3 cream = mix(vec3(0.93, 0.86, 0.84), base, 0.22);
  vec3 rust = mix(vec3(0.72, 0.46, 0.42), base, 0.3);

  vec3 col = mix(dusk, cream, smoothstep(0.15, 0.95, bandsWide));
  col = mix(col, rust, smoothstep(0.55, 1.0, bandsThin) * 0.35);
  col *= 0.82 + 0.3 * streaks;
  col = mix(col, vec3(0.95, 0.78, 0.72), storm * 0.6);
  col *= 1.0 - 0.3 * smoothstep(0.72, 0.98, abs(lat));
  return col;
}

// твёрдая планета: океан цвета base, материки, облака, шапки
vec3 rockySurface(vec3 q, vec3 base, float time, out float spec) {
  float h = fbm(q * 2.2 + 3.7);
  float detail = fbm(q * 9.0);
  float land = smoothstep(0.5, 0.53, h + (detail - 0.5) * 0.08);
  vec3 ocean = mix(base * 0.35, base * 0.75, smoothstep(0.3, 0.5, h));
  vec3 ground = mix(vec3(0.42, 0.38, 0.28), vec3(0.24, 0.34, 0.2), smoothstep(0.52, 0.7, h));
  ground *= 0.8 + 0.4 * detail;
  vec3 col = mix(ocean, ground, land);
  float ice = smoothstep(0.78, 0.9, abs(q.y) + (detail - 0.5) * 0.15);
  col = mix(col, vec3(0.92, 0.95, 1.0), ice);
  float clouds = smoothstep(0.5, 0.75, fbm(q * 3.4 + vec3(time * 0.02, 0.0, 0.0)));
  col = mix(col, vec3(1.0), clouds * 0.85);
  spec = (1.0 - land) * (1.0 - clouds) * (1.0 - ice);
  return col;
}

// кратеры: ячейка 3D-сетки → максимум один кратер (чаша + вал)
float craters(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  float h = 0.0;
  for (int x = -1; x <= 1; x++)
  for (int y = -1; y <= 1; y++)
  for (int z = -1; z <= 1; z++) {
    vec3 g = vec3(float(x), float(y), float(z));
    vec3 id = i + g;
    if (hash(id + 2.2) < 0.4) continue;
    vec3 o = vec3(hash(id), hash(id + 11.3), hash(id + 27.1));
    float rad = 0.2 + 0.3 * hash(id + 5.7);
    float d = length(g + o - f) / rad;
    if (d > 1.6) continue;
    float bowl = d < 1.0 ? (d * d - 1.0) * 0.7 : 0.0;
    float rim = 0.4 * exp(-(d - 1.0) * (d - 1.0) * 22.0);
    h += bowl + rim;
  }
  return h;
}

// высота поверхности луны в локальных координатах q (|q| = 1)
float moonHeight(vec3 q, float seed) {
  return 0.35 * fbm(q * 2.5 + seed) + 0.1 * craters(q * 2.6 + seed) + 0.025 * craters(q * 6.5 + seed * 1.7);
}

// WebGL1: uniform-массив индексируется только счётчиком цикла — ось и угол передаём значениями
vec3 satLocal(vec3 n, vec3 ax, float a) {
  vec3 e1; vec3 e2;
  basis(ax, e1, e2);
  vec3 q = vec3(dot(n, e1), dot(n, ax), dot(n, e2));
  q.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * q.xz;
  return q;
}

// альбедо луны (множитель к оттенку) и нормаль рельефа в локальных координатах
float moonAlbedo(vec3 q, float h0, float seed) {
  float maria = smoothstep(0.45, 0.62, fbm(q * 1.4 + seed + 4.0));
  return (0.55 + 0.6 * h0) * (1.0 - 0.35 * maria);
}

vec3 moonNormal(vec3 q, float h0, float seed) {
  vec3 t1 = normalize(cross(q, abs(q.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 t2 = cross(q, t1);
  float eps = 0.012;
  float h1 = moonHeight(normalize(q + t1 * eps), seed);
  float h2 = moonHeight(normalize(q + t2 * eps), seed);
  return normalize(q - 0.9 * ((h1 - h0) * t1 + (h2 - h0) * t2) / eps);
}
`

/**
 * Аналитический рейтрейсинг: сферы планет/спутников (непрозрачные),
 * плоскости колец+орбит (полупрозрачные, сортируются по глубине),
 * звёзды и солнце — по направлению луча, поэтому вращаются вместе с камерой.
 * Выход premultiplied alpha: пустой космос прозрачен, под ним — туманность фона.
 *
 * baked = true — поверхности читаются из запечённых куб-карт (см. baker.ts),
 * иначе считаются процедурно каждый кадр.
 */
export function renderFragment(baked: boolean) {
  return `${baked ? '#extension GL_EXT_shader_texture_lod : enable\n' : ''}#define BAKED ${baked ? 1 : 0}
precision highp float;
#define MAX_P ${MAX_P}
#define MAX_S ${MAX_S}

uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_eye;
uniform vec3 u_right;
uniform vec3 u_up;
uniform vec3 u_fwd;
uniform float u_focal;
uniform vec2 u_shift;
uniform vec3 u_sun;

uniform vec4 u_pPos[MAX_P];    // xyz, radius (0 — слота нет)
uniform vec3 u_pColor[MAX_P];
uniform vec3 u_pAxis[MAX_P];
uniform vec4 u_pRing[MAX_P];   // inner, outer, orbit, style (0 газ, 1 твёрдая)
uniform vec4 u_pOrbits[MAX_P]; // радиусы орбит спутников планеты (до 4, 0 — нет)
uniform vec4 u_pOrbitA[MAX_P]; // где сейчас спутник на каждой орбите, рад (-1 — орбита без спутника)
uniform float u_pSpin[MAX_P];  // угол поворота, рад

uniform vec4 u_sPos[MAX_S];    // xyz, radius (0 — слота нет)
uniform vec3 u_sColor[MAX_S];
uniform vec3 u_sAxis[MAX_S];   // ось вращения спутника (= ось орбиты)
uniform float u_sRot[MAX_S];   // угол поворота поверхности, рад
uniform float u_fullDetail;    // 1 — процедурный режим без LOD октав (эталон для сравнения)

${surfaceLib}
// тень от любой планеты по направлению на солнце
float planetShadow(vec3 p) {
  float s = 1.0;
  for (int i = 0; i < MAX_P; i++) {
    if (u_pPos[i].w <= 0.0) continue;
    if (sphere(p, u_sun, u_pPos[i].xyz, u_pPos[i].w) > 0.0) s = 0.0;
  }
  return s;
}

// обратное к satLocal: локальный вектор поверхности → мировой
vec3 satWorld(vec3 v, vec3 ax, float a) {
  vec3 e1; vec3 e2;
  basis(ax, e1, e2);
  v.xz = mat2(cos(a), sin(a), -sin(a), cos(a)) * v.xz;
  return v.x * e1 + v.y * ax + v.z * e2;
}


#if BAKED
// запечённые поверхности: A/B — два момента времени, u_pMix — доля B
uniform samplerCube u_pA0;
uniform samplerCube u_pA1;
uniform samplerCube u_pA2;
uniform samplerCube u_pB0;
uniform samplerCube u_pB1;
uniform samplerCube u_pB2;
uniform float u_pMix[MAX_P];
uniform samplerCube u_s0;
uniform samplerCube u_s1;
uniform samplerCube u_s2;
uniform samplerCube u_s3;
uniform samplerCube u_s4;
uniform samplerCube u_s5;
uniform float u_texelAngle;    // угловой размер текселя куб-карты, рад

// явный mip-уровень: след пикселя на поверхности (с учётом наклона) в текселях.
// Неявные производные внутри ветвящегося цикла не определены — поэтому LodEXT.
float texLod(float pxAngle, float facing) {
  return max(0.0, log2(pxAngle / max(facing, 0.15) / u_texelAngle));
}

vec4 planetTex(int i, vec3 q, float lod) {
  if (i == 0) return mix(textureCubeLodEXT(u_pA0, q, lod), textureCubeLodEXT(u_pB0, q, lod), u_pMix[0]);
  if (i == 1) return mix(textureCubeLodEXT(u_pA1, q, lod), textureCubeLodEXT(u_pB1, q, lod), u_pMix[1]);
  return mix(textureCubeLodEXT(u_pA2, q, lod), textureCubeLodEXT(u_pB2, q, lod), u_pMix[2]);
}

vec4 satTex(int i, vec3 q, float lod) {
  if (i == 0) return textureCubeLodEXT(u_s0, q, lod);
  if (i == 1) return textureCubeLodEXT(u_s1, q, lod);
  if (i == 2) return textureCubeLodEXT(u_s2, q, lod);
  if (i == 3) return textureCubeLodEXT(u_s3, q, lod);
  if (i == 4) return textureCubeLodEXT(u_s4, q, lod);
  return textureCubeLodEXT(u_s5, q, lod);
}
#endif

vec3 stars(vec3 rd, float pxAngle) {
  vec3 c = vec3(0.0);
  for (int k = 0; k < 3; k++) {
    float sc = k == 0 ? 90.0 : (k == 1 ? 200.0 : 420.0);
    vec3 p = rd * sc;
    vec3 id = floor(p);
    float h = hash(id + float(k) * 13.1);
    if (h < 0.95) continue;
    vec3 sp = id + vec3(hash(id + 3.1), hash(id + 7.7), hash(id + 1.9));
    float d = length(p - sp) / sc;               // угловое расстояние, рад
    float size = pxAngle * (0.7 + 1.6 * hash(id + 5.3)) * (k == 0 ? 1.4 : 1.0);
    float tw = 0.65 + 0.35 * sin(u_time * (1.5 + 3.0 * h) + h * 50.0);
    float b = smoothstep(size, 0.0, d) * (h - 0.95) * 20.0 * tw;
    vec3 tint = mix(vec3(0.75, 0.82, 1.0), vec3(1.0, 0.88, 0.75), hash(id + 9.9));
    c += tint * b;
  }
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y * 2.0 - u_shift;
  vec3 ro = u_eye;
  vec3 rd = normalize(uv.x * u_right + uv.y * u_up + u_focal * u_fwd);
  float pxK = 2.0 / u_res.y / u_focal; // размер пикселя на единицу дистанции

  // --- непрозрачное: ближайшая сфера
  float tOp = 1e9;
  vec4 op = vec4(0.0);
  for (int i = 0; i < MAX_P; i++) {
    float R = u_pPos[i].w;
    if (R <= 0.0) continue;
    vec3 c = u_pPos[i].xyz;
    float t = sphere(ro, rd, c, R);
    if (t <= 0.0 || t >= tOp) continue;
    tOp = t;
    vec3 p = ro + rd * t;
    vec3 n = normalize(p - c);
    vec3 ax = normalize(u_pAxis[i]);
    vec3 e1; vec3 e2;
    basis(ax, e1, e2);
    vec3 q = vec3(dot(n, e1), dot(n, ax), dot(n, e2));
    float a = u_pSpin[i];
    q.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * q.xz;

#if BAKED
    vec4 tex = planetTex(i, q, texLod(pxK * t / R, dot(n, -rd)));
    vec3 surf = tex.rgb;
    float spec = tex.a;
#else
    float pxR = R / (pxK * t);            // радиус на экране, px
    g_oct = u_fullDetail > 0.5 ? 5 : (pxR < 40.0 ? 3 : (pxR < 150.0 ? 4 : 5));
    float spec = 0.0;
    vec3 surf = u_pRing[i].w > 0.5 ? rockySurface(q, u_pColor[i], u_time, spec) : gasSurface(q, u_pColor[i], u_time);
#endif

    float ndl = dot(n, u_sun);
    float day = smoothstep(-0.08, 0.35, ndl);
    // тень собственных колец
    float rs = 1.0;
    float dn = dot(u_sun, ax);
    if (abs(dn) > 1e-4) {
      float tr = -dot(p - c, ax) / dn;
      if (tr > 0.0) rs = 1.0 - 0.75 * ringDensity(length(p - c + u_sun * tr), u_pRing[i].x, u_pRing[i].y);
    }
    float limb = pow(max(dot(n, -rd), 0.0), 0.35);
    vec3 col = surf * (0.03 + 1.05 * day * rs) * limb;
    vec3 hv = normalize(u_sun - rd);
    col += spec * pow(max(dot(n, hv), 0.0), 60.0) * 0.6 * day;
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    vec3 atmo = mix(u_pColor[i], vec3(0.6, 0.8, 1.0), 0.5);
    col += atmo * fres * smoothstep(-0.25, 0.4, ndl) * 1.1;

    float dmin = length(cross(rd, c - ro));
    float edge = smoothstep(0.0, pxK * t * 1.5, R - dmin);
    op = vec4(col * edge, edge);
  }
  for (int i = 0; i < MAX_S; i++) {
    float r = u_sPos[i].w;
    if (r <= 0.0) continue;
    vec3 c = u_sPos[i].xyz;
    float t = sphere(ro, rd, c, r);
    if (t <= 0.0 || t >= tOp) continue;
    tOp = t;
    vec3 p = ro + rd * t;
    vec3 n = normalize(p - c);
    float sh = planetShadow(p + n * r * 0.01);
    // луна: поверхность вращается вместе со спутником, рельеф — бамп по высоте
    float seed = float(i) * 7.3;
    vec3 sAx = normalize(u_sAxis[i]);
    float sRot = u_sRot[i];
    vec3 q = satLocal(n, sAx, sRot);
#if BAKED
    vec4 tex = satTex(i, q, texLod(pxK * t / r, dot(n, -rd)));
    vec3 nb = satWorld(normalize(tex.rgb * 2.0 - 1.0), sAx, sRot);
    float albedo = tex.a;
#else
    float pxR = r / (pxK * t);            // радиус на экране, px
    g_oct = u_fullDetail > 0.5 ? 5 : (pxR < 12.0 ? 2 : (pxR < 60.0 ? 4 : 5));
    float h0 = moonHeight(q, seed);
    vec3 nb = pxR > 12.0 || u_fullDetail > 0.5 ? satWorld(moonNormal(q, h0, seed), sAx, sRot) : n;
    float albedo = moonAlbedo(q, h0, seed);
#endif
    vec3 tint = mix(vec3(0.55, 0.55, 0.58), u_sColor[i], 0.7);
    vec3 base = tint * albedo;
    float geo = smoothstep(-0.05, 0.3, dot(n, u_sun));   // мягкий терминатор по сфере
    float diff = max(dot(nb, u_sun), 0.0);                // светотень рельефа
    float light = geo * (0.25 + 0.95 * diff) * sh;
    vec3 col = base * (0.02 + 1.15 * light);
    col += pow(1.0 - max(dot(n, -rd), 0.0), 3.0) * u_sColor[i] * 0.3 * (0.25 + 0.75 * geo * sh);
    float dmin = length(cross(rd, c - ro));
    float edge = smoothstep(0.0, pxK * t * 1.5, r - dmin);
    op = vec4(col * edge, edge);
  }

  // --- фон: звёзды и солнце (под непрозрачным телом не считаем)
  vec3 bg = vec3(0.0);
  if (op.a < 0.999) {
    bg = stars(rd, pxK);
    float sd = max(dot(rd, u_sun), 0.0);
    vec3 sunCol = vec3(1.0, 0.93, 0.82);
    bg += sunCol * (smoothstep(0.99985, 0.99995, sd) * 3.0 + pow(sd, 300.0) * 0.6 + pow(sd, 12.0) * 0.06);
  }

  // --- полупрозрачное: плоскость колец+орбиты каждой планеты
  vec4 l0 = vec4(0.0); vec4 l1 = vec4(0.0); vec4 l2 = vec4(0.0);
  float t0 = -1.0; float t1 = -1.0; float t2 = -1.0;
  for (int i = 0; i < MAX_P; i++) {
    float R = u_pPos[i].w;
    if (R <= 0.0) continue;
    vec3 c = u_pPos[i].xyz;
    vec3 ax = normalize(u_pAxis[i]);
    float dn = dot(rd, ax);
    if (abs(dn) < 1e-5) continue;
    float t = -dot(ro - c, ax) / dn;
    if (t <= 0.0 || t >= tOp) continue;
    vec3 q = ro + rd * t - c;
    float r = length(q);
    vec4 layer = vec4(0.0);

    float dens = ringDensity(r, u_pRing[i].x, u_pRing[i].y);
    if (dens > 0.0) {
      float lit = 0.25 + 0.75 * abs(dot(ax, u_sun));
      lit *= 0.15 + 0.85 * planetShadow(ro + rd * t);
      vec3 rc = mix(u_pColor[i], vec3(0.95, 0.88, 0.82), 0.72) * lit * (0.75 + 0.35 * noise1(r * 260.0));
      float a = dens * 0.72;
      layer = vec4(rc * a, a);
    }

    // орбиты спутников: у каждого своя. Сама орбита — едва заметный пунктир,
    // за спутником тянется светящийся шлейф: видно траекторию, но кадр не расчерчен
    vec4 orbits = u_pOrbits[i];
    if (orbits.x > 0.0) {
      vec3 e1; vec3 e2;
      basis(ax, e1, e2);
      float w = pxK * t;
      float phi = atan(dot(q, e2), dot(q, e1));
      vec4 orbitA = u_pOrbitA[i];
      float line = 0.0;
      for (int k = 0; k < 4; k++) {
        float orbit = k == 0 ? orbits.x : (k == 1 ? orbits.y : (k == 2 ? orbits.z : orbits.w));
        float a = k == 0 ? orbitA.x : (k == 1 ? orbitA.y : (k == 2 ? orbitA.z : orbitA.w));
        if (orbit <= 0.0) continue;
        float on = smoothstep(w * 1.6, 0.0, abs(r - orbit));
        float dash = step(0.35, fract(phi * orbit * 21.0 / 6.2831)) * 0.07;
        // угол позади спутника по ходу движения: 0 у спутника, растёт назад
        float behind = a < 0.0 ? 7.0 : mod(a - phi, 6.2831853);
        float trail = exp(-behind * 1.6) * 0.5 * smoothstep(0.0, 0.04, behind);
        line = max(line, on * max(dash, trail));
      }
      line *= 0.2 + 0.8 * planetShadow(ro + rd * t);
      layer = vec4(vec3(0.85, 0.85, 1.0) * line, line) + layer * (1.0 - line);
    }

    if (layer.a <= 0.0) continue;
    if (i == 0) { l0 = layer; t0 = t; }
    else if (i == 1) { l1 = layer; t1 = t; }
    else { l2 = layer; t2 = t; }
  }

  // --- свечение атмосфер и маяки спутников (аддитивно, с проверкой перекрытия)
  vec3 glow = vec3(0.0);
  for (int i = 0; i < MAX_P; i++) {
    float R = u_pPos[i].w;
    if (R <= 0.0) continue;
    vec3 c = u_pPos[i].xyz;
    float along = dot(c - ro, rd);
    if (along <= 0.0 || tOp < along - R) continue;
    float dmin = length(cross(rd, c - ro));
    if (dmin < R) continue;
    vec3 closest = ro + rd * along - c;
    float halo = exp(-(dmin - R) / R * 14.0) * smoothstep(-0.4, 0.6, dot(normalize(closest), u_sun));
    glow += mix(u_pColor[i], vec3(0.6, 0.8, 1.0), 0.5) * halo * 0.55;
  }
  for (int i = 0; i < MAX_S; i++) {
    float r = u_sPos[i].w;
    if (r <= 0.0) continue;
    vec3 c = u_sPos[i].xyz;
    float along = dot(c - ro, rd);
    if (along <= 0.0 || tOp < along - r) continue;
    float dist = length(cross(rd, c - ro));
    // маяк нужен издалека; вблизи, когда спутник крупный, гасим
    float far = smoothstep(0.09, 0.03, r / along * u_focal);
    glow += u_sColor[i] * exp(-dist / (r * 1.6)) * 0.55 * (0.3 + 0.7 * planetShadow(c)) * far;
  }

  // --- композиция: фон → непрозрачное → слои от дальнего к ближнему
  float bgA = clamp(dot(bg, vec3(0.333)), 0.0, 1.0);
  vec3 col = op.rgb + bg * (1.0 - op.a);
  float alpha = op.a + bgA * (1.0 - op.a);

  for (int k = 0; k < 3; k++) {
    float far = -1.0;
    int idx = -1;
    if (t0 > far) { far = t0; idx = 0; }
    if (t1 > far) { far = t1; idx = 1; }
    if (t2 > far) { far = t2; idx = 2; }
    if (idx < 0) break;
    vec4 l = idx == 0 ? l0 : (idx == 1 ? l1 : l2);
    col = l.rgb + col * (1.0 - l.a);
    alpha = l.a + alpha * (1.0 - l.a);
    if (idx == 0) t0 = -1.0;
    else if (idx == 1) t1 = -1.0;
    else t2 = -1.0;
  }

  col += glow;
  alpha = clamp(alpha + dot(glow, vec3(0.333)), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`
}

/**
 * Запекание поверхности в грань куб-карты. Направление грани — по конвенции GL,
 * поэтому textureCube(q) читает ровно то, что процедурный путь посчитал бы для q.
 * mode 0 — газ (rgb цвет), 1 — твёрдая (rgb цвет, a блик), 2 — луна (rgb нормаль, a альбедо).
 */
export const bakeFragment = `
precision highp float;
uniform int u_face;
uniform float u_size;
uniform int u_mode;
uniform vec3 u_color;
uniform float u_seed;
uniform float u_time;
${surfaceLib}

vec3 faceDir(int face, vec2 st) {
  float s = st.x;
  float t = st.y;
  if (face == 0) return vec3(1.0, -t, -s);
  if (face == 1) return vec3(-1.0, -t, s);
  if (face == 2) return vec3(s, 1.0, t);
  if (face == 3) return vec3(s, -1.0, -t);
  if (face == 4) return vec3(s, -t, 1.0);
  return vec3(-s, -t, -1.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_size * 2.0 - 1.0;
  vec3 q = normalize(faceDir(u_face, st));
  g_oct = 5;
  if (u_mode == 0) {
    gl_FragColor = vec4(gasSurface(q, u_color, u_time), 0.0);
  } else if (u_mode == 1) {
    float spec = 0.0;
    vec3 c = rockySurface(q, u_color, u_time, spec);
    gl_FragColor = vec4(c, spec);
  } else {
    float h0 = moonHeight(q, u_seed);
    vec3 nb = moonNormal(q, h0, u_seed);
    gl_FragColor = vec4(nb * 0.5 + 0.5, clamp(moonAlbedo(q, h0, u_seed), 0.0, 1.0));
  }
}
`
