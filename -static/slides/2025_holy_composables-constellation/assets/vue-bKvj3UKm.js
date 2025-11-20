import{d as y,aR as j,r as p,aI as C,L as w,f as z,o as S,j as I,n as P,U as b,A as E,M as O,aS as k,H as G,b as T,w as B,g as H}from"./modules/vue-C5JO9rSz.js";import{u as F}from"./slidev/context-CLQlI6Wc.js";import{_ as R}from"./index-Dnpc0y2r.js";import{n as U,P as N}from"./presets-C__N5bET.js";const V=y({__name:"ObjectContainer",props:{width:{},height:{},objectWidth:{},objectHeight:{},mode:{}},emits:["resize"],setup(s,{emit:m}){j(t=>({v74a94da3:t.objectWidth+"px",v6b4cf3aa:t.objectHeight+"px",v00dcc0a1:b(l)/b(o)||0,v4382bdba:t.objectWidth/t.objectHeight||0})),F();const g=m,a=p(null),{width:l,height:o}=C(a);return w(()=>[l.value,o.value],([t,e])=>{g("resize",[t,e])}),(t,e)=>(S(),z("div",{class:"object-container",ref_key:"containerRef",ref:a},[I(t.$slots,"default",{class:P(["object",s.mode??"contain"])})],512))}}),q=["src"],W=y({__name:"GlslImageEffect",props:{image:{},stages:{},objectFit:{default:"contain"}},setup(s){const m=F(),g=E(()=>m.$renderContext.value==="overview"),a=s,l=E(()=>({stages:U(a.stages,a.image)})),o=p([0,0]),t=async f=>new Promise((D,h)=>{const i=new Image;i.onload=()=>{o.value=[i.width,i.height],D()},i.onerror=A=>h(A),i.src=f}),e=p(null);let r=null,n=null,c=null;const{width:u,height:v}=C(e),x=async()=>{!r||!e.value||(await t(a.image),n=new N(r,e.value.width,e.value.height),await n.initialize(l.value))},_=async()=>{!e.value||!r||(e.value.width=u.value,e.value.height=v.value,r.viewport(0,0,u.value,v.value),n&&(n.destroy(),n=null),await x())},d=()=>{if(!r||!e.value)return;if(e.value.width===0||e.value.height===0){c=requestAnimationFrame(d);return}if(!n)return;r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT);const f=a.image&&o.value[0]>0?{imageSize:o.value}:{};n.render(l.value,void 0,f),c=requestAnimationFrame(d)};return O(async()=>{if(await t(a.image),await k(()=>u.value>0&&v.value>0).toBeTruthy(),r=e.value.getContext("webgl",{alpha:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!1,antialias:!0}),!r){console.error("Unable to initialize WebGL");return}if(r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),_(),e.value.width===0||e.value.height===0){console.error("Canvas has zero size after resize");return}await x(),d()}),G(()=>{c!==null&&cancelAnimationFrame(c),n?.destroy()}),w(()=>[a.stages,a.image],async()=>{r&&(n&&(n.destroy(),n=null),await x())}),w(()=>[u,v],async()=>{n&&await _()}),(f,D)=>{const h=V;return g.value?(S(),z("img",{key:1,src:s.image,style:{"{objectFit":"objectFit}"}},null,8,q)):(S(),T(h,{key:0,objectWidth:o.value[0],objectHeight:o.value[1],mode:s.objectFit},{default:B(({class:i})=>[H("canvas",{ref_key:"canvas",ref:e,class:P(i)},null,2)]),_:1},8,["objectWidth","objectHeight","mode"]))}}}),K=R(W,[["__scopeId","data-v-c73921e1"]]),Q=`precision highp float;\r
\r
varying vec2 v_texCoord;\r
uniform sampler2D u_texture0_0;\r
uniform float u_time;\r
\r
// =================================================================\r
// НАСТРОЙКИ\r
// =================================================================\r
const float SPEED = 0.08; // Множитель скорости анимации\r
const float DISTORTION_STRENGTH = 0.35; // Сила искажения текстуры\r
const float EDGE_SOFTNESS = 4.2; // Множитель мягкости краёв\r
\r
// =================================================================\r
// УЛУЧШЕННАЯ ГЕНЕРАЦИЯ ШУМА\r
// =================================================================\r
\r
// Simplex-подобный шум с лучшими характеристиками\r
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }\r
\r
float snoise(vec2 v) {\r
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\r
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\r
                        -0.577350269189626, // -1.0 + 2.0 * C.x\r
                        0.024390243902439); // 1.0 / 41.0\r
    vec2 i  = floor(v + dot(v, C.yy) );\r
    vec2 x0 = v -   i + dot(i, C.xx);\r
    vec2 i1;\r
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\r
    vec4 x12 = x0.xyxy + C.xxzz;\r
    x12.xy -= i1;\r
    i = mod289(i);\r
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\r
        + i.x + vec3(0.0, i1.x, 1.0 ));\r
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\r
    m = m*m ;\r
    m = m*m ;\r
    vec3 x = 2.0 * fract(p * C.www) - 1.0;\r
    vec3 h = abs(x) - 0.5;\r
    vec3 ox = floor(x + 0.5);\r
    vec3 a0 = x - ox;\r
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\r
    vec3 g;\r
    g.x  = a0.x  * x0.x  + h.x  * x0.y;\r
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
    return 130.0 * dot(m, g);\r
}\r
\r
// =================================================================\r
// ТУРБУЛЕНТНЫЙ FBM с вращением\r
// =================================================================\r
mat2 rotate2d(float angle) {\r
    float s = sin(angle);\r
    float c = cos(angle);\r
    return mat2(c, -s, s, c);\r
}\r
\r
float turbulentFbm(vec2 p, float timeOffset) {\r
    float value = 0.0;\r
    float amplitude = 0.5;\r
    float frequency = 1.0;\r
    \r
    // 6 октав для богатой текстуры\r
    for(int i = 0; i < 6; i++) {\r
        // Вращаем каждый слой для более органичного движения\r
        p = rotate2d(float(i) * 0.3 + timeOffset * 0.1) * p;\r
        \r
        // Добавляем турбулентность через abs()\r
        float n = abs(snoise(p * frequency));\r
        value += amplitude * n;\r
        \r
        amplitude *= 0.5;\r
        frequency *= 2.1;\r
    }\r
    \r
    return value;\r
}\r
\r
// =================================================================\r
// ВОЛНОВЫЕ ИСКАЖЕНИЯ\r
// =================================================================\r
vec2 flowDistortion(vec2 uv, float time) {\r
    // Несколько слоёв волн, движущихся в разных направлениях\r
    float wave1 = snoise(uv * 3.0 + vec2(time * 0.2, time * 0.15) * SPEED);\r
    float wave2 = snoise(uv * 5.0 - vec2(time * 0.15, time * 0.25) * SPEED);\r
    float wave3 = snoise(uv * 2.0 + vec2(time * 0.1, -time * 0.1) * SPEED);\r
    \r
    vec2 distortion = vec2(wave1 + wave2 * 0.5, wave3 + wave1 * 0.5);\r
    return distortion * 0.03; // Интенсивность искажения\r
}\r
\r
// =================================================================\r
// ОПРЕДЕЛЕНИЕ МЯГКОСТИ КРАЁВ\r
// =================================================================\r
float getEdgeSoftness(sampler2D tex, vec2 uv) {\r
    // Размер пикселя для семплирования соседей\r
    vec2 texelSize = vec2(1.0 / 1920.0, 1.0 / 1080.0); // Приблизительный размер\r
    \r
    // Текущая прозрачность\r
    float centerAlpha = texture2D(tex, uv).a;\r
    \r
    // Проверяем 8 соседних пикселей\r
    float avgAlpha = 0.0;\r
    avgAlpha += texture2D(tex, uv + vec2(-1, -1) * texelSize).a;\r
    avgAlpha += texture2D(tex, uv + vec2( 0, -1) * texelSize).a;\r
    avgAlpha += texture2D(tex, uv + vec2( 1, -1) * texelSize).a;\r
    avgAlpha += texture2D(tex, uv + vec2(-1,  0) * texelSize).a;\r
    avgAlpha += texture2D(tex, uv + vec2( 1,  0) * texelSize).a;\r
    avgAlpha += texture2D(tex, uv + vec2(-1,  1) * texelSize).a;\r
    avgAlpha += texture2D(tex, uv + vec2( 0,  1) * texelSize).a;\r
    avgAlpha += texture2D(tex, uv + vec2( 1,  1) * texelSize).a;\r
    avgAlpha /= 8.0;\r
    \r
    // Если соседи прозрачнее, уменьшаем силу эффекта\r
    float edgeFactor = smoothstep(0.0, 0.5, avgAlpha);\r
    \r
    // Дополнительное смягчение на основе разницы\r
    float alphaDiff = abs(centerAlpha - avgAlpha);\r
    edgeFactor *= 1.0 - smoothstep(0.0, 0.3, alphaDiff);\r
    \r
    return edgeFactor;\r
}\r
\r
// =================================================================\r
// ПРОБЛЕСКИ И МЕРЦАНИЕ\r
// =================================================================\r
float flicker(vec2 p, float time) {\r
    // Медленные большие вспышки\r
    float largePulse = snoise(p * 1.5 + time * 0.3 * SPEED) * 0.5 + 0.5;\r
    largePulse = pow(largePulse, 3.0);\r
    \r
    // Быстрое мелкое мерцание\r
    float smallFlicker = snoise(p * 15.0 + time * 2.0 * SPEED) * 0.5 + 0.5;\r
    smallFlicker = pow(smallFlicker, 5.0) * 0.3;\r
    \r
    // Волны яркости\r
    float waves = sin(time * 0.5 * SPEED + snoise(p * 2.0) * 6.28) * 0.5 + 0.5;\r
    waves = pow(waves, 2.0) * 0.4;\r
    \r
    return largePulse * 0.6 + smallFlicker + waves;\r
}\r
\r
// =================================================================\r
// ОСНОВНАЯ ФУНКЦИЯ\r
// =================================================================\r
void main() {\r
    vec2 uv = v_texCoord;\r
    \r
    // Применяем волновые искажения к координатам\r
    vec2 distortedUV = uv + flowDistortion(uv, u_time);\r
    \r
    // Читаем базовую текстуру с небольшим искажением для органичности\r
    vec2 textureDistortion = flowDistortion(uv, u_time * SPEED * 100.0) * DISTORTION_STRENGTH;\r
    vec4 baseColor = texture2D(u_texture0_0, uv + textureDistortion);\r
    \r
    // Определяем мягкость краёв на основе соседних пикселей\r
    float edgeSoftness = getEdgeSoftness(u_texture0_0, uv);\r
    edgeSoftness = pow(edgeSoftness, EDGE_SOFTNESS * abs(sin(u_time * SPEED)));\r
    \r
    // Генерируем несколько слоёв тумана с разными скоростями\r
    // Слой 1: медленный основной туман\r
    float fog1 = turbulentFbm(\r
        distortedUV * 4.0 + vec2(u_time * 0.03, u_time * 0.02) * SPEED * 0.05, \r
        u_time * 0.5 * SPEED\r
    );\r
    \r
    // Слой 2: средний, движется в другую сторону\r
    float fog2 = turbulentFbm(\r
        distortedUV * 6.0 - vec2(u_time * 0.05, -u_time * 0.04) * SPEED * 0.05, \r
        u_time * 0.75 * SPEED\r
    );\r
    \r
    // Слой 3: быстрый мелкий\r
    float fog3 = turbulentFbm(\r
        distortedUV * 10.0 + vec2(u_time * 0.08, u_time * 0.06) * SPEED * 0.05, \r
        u_time * 0.1 * SPEED\r
    );\r
    \r
    // Комбинируем слои\r
    float fogDensity = fog1 * 0.5 + fog2 * 0.3 + fog3 * 0.2;\r
    fogDensity = smoothstep(0.2, 0.8, fogDensity);\r
    \r
    // Добавляем проблески и мерцание\r
    float glowIntensity = flicker(distortedUV, u_time);\r
    fogDensity *= (0.6 + glowIntensity * 0.8);\r
    \r
    // Применяем мягкость краёв к плотности тумана\r
    fogDensity *= edgeSoftness;\r
    \r
    // Космический зелёный туман с вариациями оттенка\r
    float hueVariation = snoise(distortedUV * 8.0 + u_time * 0.1 * SPEED) * 0.3;\r
    vec3 baseGreen = vec3(0.1, 0.8, 0.3);\r
    vec3 accentGreen = vec3(0.2, 1.0, 0.5);\r
    vec3 fogColor = mix(baseGreen, accentGreen, hueVariation + 0.5);\r
    \r
    // Добавляем яркие вспышки в центрах плотности\r
    float brightSpots = pow(fogDensity, 4.0) * 2.0;\r
    fogColor += vec3(0.5, 1.0, 0.6) * brightSpots;\r
    \r
    // Финальное смешивание с аддитивным режимом\r
    vec3 finalColor = baseColor.rgb + fogColor * fogDensity * 0.4;\r
    \r
    // Легкое свечение по краям для глубины\r
    float edgeGlow = smoothstep(0.0, 0.3, fogDensity) * 0.3;\r
    finalColor += vec3(0.05, 0.2, 0.1) * edgeGlow;\r
    \r
    gl_FragColor = vec4(finalColor, baseColor.a);\r
}\r
`;export{K as _,Q as s};
