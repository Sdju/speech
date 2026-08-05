#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_baseColor;
uniform float u_slideNumber;

// Hash → value noise → FBM for soft generative fields
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.04;
  float slide = u_slideNumber * 0.37;

  // Domain warp — soft flowing ribbons
  vec2 q = p * 1.35 + vec2(slide * 0.15, -slide * 0.08);
  q += 0.35 * vec2(
    fbm(q + vec2(0.0, t)),
    fbm(q + vec2(5.2, -t * 0.7))
  );

  vec2 r = q * 1.1;
  r += 0.45 * vec2(
    fbm(r + vec2(1.7 + t * 0.3, 9.2)),
    fbm(r + vec2(8.3, 2.8 - t * 0.25))
  );

  float field = fbm(r * 1.2 + vec2(t * 0.2, slide));
  float ribbons = smoothstep(0.35, 0.75, field);
  float glow = pow(field, 1.8);

  // Soft vignette keeps edges quiet for slide content
  float vignette = 1.0 - smoothstep(0.35, 1.35, length(p));

  // Accent from theme color, kept muted so text stays readable
  vec3 base = u_baseColor.rgb;
  float lum = dot(base, vec3(0.299, 0.587, 0.114));
  vec3 deep = mix(vec3(0.02, 0.025, 0.04), base * 0.12, 0.55);
  vec3 mid = mix(deep, base * (0.35 + lum * 0.25), 0.65);
  vec3 highlight = mix(mid, base * 0.85 + vec3(0.08), 0.4);

  vec3 col = deep;
  col = mix(col, mid, ribbons * 0.85);
  col += highlight * glow * 0.35;
  col *= 0.55 + 0.45 * vignette;

  // Barely-there grain so flat regions don’t look dead
  float grain = (hash(uv * u_resolution.xy + fract(u_time)) - 0.5) * 0.025;
  col += grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
