import{$ as e,C as t,Ct as n,E as r,L as i,O as a,Q as o,St as s,V as c,nt as l,v as u,w as d,x as f,y as p,z as m}from"./modules/shiki-CS0aakMY.js";import{V as h}from"./useNav-CzgudRnO.js";import{t as g}from"./_plugin-vue_export-helper-BDNMzG2s.js";import{n as _,t as v}from"./slidev/context-DYer3UPX.js";import{t as y}from"./full-DTKfjkqz.js";import"./slidev/client-pnoJI9dk.js";import{t as b}from"./screen-CqdR6j3R.js";import{a as x,i as S,n as C,o as w}from"./camera-CZa1I4dA.js";var T=400,E=220,D=`
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`,O=`
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
}`,k=r({__name:`Aurora`,setup(t,{expose:n}){n();let r=h(),{$slidev:a}=_(),s=o(`canvas`),c=null,l=0,u=0,d=null;function f(e,t){let n=c.createShader(e);return c.shaderSource(n,t),c.compileShader(n),c.getShaderParameter(n,c.COMPILE_STATUS)||console.error(`[Aurora]`,c.getShaderInfoLog(n)),n}function p(){let e=s.value;if(!e||(c=e.getContext(`webgl`,{premultipliedAlpha:!0,alpha:!0,antialias:!1}),!c))return;let t=c.createProgram();c.attachShader(t,f(c.VERTEX_SHADER,D)),c.attachShader(t,f(c.FRAGMENT_SHADER,O)),c.linkProgram(t),c.useProgram(t),c.bindBuffer(c.ARRAY_BUFFER,c.createBuffer()),c.bufferData(c.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),c.STATIC_DRAW);let n=c.getAttribLocation(t,`a_pos`);c.enableVertexAttribArray(n),c.vertexAttribPointer(n,2,c.FLOAT,!1,0,0),c.uniform2f(c.getUniformLocation(t,`u_res`),T,E),d=c.getUniformLocation(t,`u_time`),c.viewport(0,0,T,E),c.clearColor(0,0,0,0),u=performance.now(),g(u)}function g(e){c&&(c.uniform1f(d,40+(e-u)/1e3),c.clear(c.COLOR_BUFFER_BIT),c.drawArrays(c.TRIANGLE_STRIP,0,4))}function v(){let e=s.value,t=b.frame,n=b.goal;if(!e||!t||!n)return;let r=a.configs.canvasWidth??980,i=r/(a.configs.aspectRatio??16/9),o=b.aspect,c=(T/r-.5)*2*o,l=(.5-E/i)*2,u=w(C(C(n.fwd,x(n.right,(c-n.shift[0])/n.fov)),x(n.up,(l-n.shift[1])/n.fov))),d=S(u,t.fwd);if(d<=.05){e.style.visibility=`hidden`;return}let f=S(u,t.right)/d*t.fov+t.shift[0],p=S(u,t.up)/d*t.fov+t.shift[1],m=(f-c)/o/2*r,h=-(p-l)/2*i;e.style.visibility=``,e.style.transform=`translate(${m.toFixed(1)}px, ${h.toFixed(1)}px)`}function y(e){v(),g(e),l=requestAnimationFrame(y)}m(p),e(r,e=>{cancelAnimationFrame(l),e&&(l=requestAnimationFrame(y))},{immediate:!0}),i(()=>{cancelAnimationFrame(l),c?.getExtension(`WEBGL_lose_context`)?.loseContext(),c=null});let k={active:r,$slidev:a,canvas:s,W:T,H:E,VERT:D,FRAG:O,get gl(){return c},set gl(e){c=e},get raf(){return l},set raf(e){l=e},get start(){return u},set start(e){u=e},get uTime(){return d},set uTime(e){d=e},compile:f,init:p,draw:g,follow:v,loop:y};return Object.defineProperty(k,"__isScriptSetup",{enumerable:!1,value:!0}),k}});function A(e,t,n,r,i,a){return c(),f(`canvas`,{ref:`canvas`,class:s([`aurora`,{"aurora--on":r.active}]),width:r.W,height:r.H,"aria-hidden":`true`},null,2)}var j=g(k,[[`render`,A],[`__scopeId`,`data-v-8140122a`],[`__file`,`/run/media/zede/general/pr/my/speech/2026/3_holyjs_you-dont-need-microfrontends/components/Aurora.vue`]]),M={__name:`5_mfe.md__slidev_59`,setup(e,{expose:t}){t();let{$slidev:n,$nav:r,$clicksContext:i,$clicks:a,$page:o,$renderContext:s,$frontmatter:c}=_();i.setup();let l={$slidev:n,$nav:r,$clicksContext:i,$clicks:a,$page:o,$renderContext:s,$frontmatter:c,InjectedLayout:y,get _useSlideContext(){return _},get _frontmatterToProps(){return v}};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}};function N(e,r,i,o,s,f){let m=j;return c(),p(o.InjectedLayout,n(a(o._frontmatterToProps(o.$frontmatter,58))),{default:l(()=>[d(m),r[0]||=u(`div`,{class:`finale glass`},[u(`h1`,null,[t(`Микрофронтенды — тяжёлый выбор,`),u(`br`),t(`а не инструмент для хайпа`)])],-1)]),_:1},16)}var P=g(M,[[`render`,N],[`__scopeId`,`data-v-10a3438b`],[`__file`,`/run/media/zede/general/pr/my/speech/2026/3_holyjs_you-dont-need-microfrontends/parts/5_mfe.md__slidev_59.md`]]);export{P as default};