import{d as y,aR as j,r as p,aI as C,L as w,f as z,o as S,j as I,n as P,U as E,A as b,M as O,aS as k,H as G,b as T,w as B,g as H}from"./modules/vue-C5JO9rSz.js";import{u as F}from"./slidev/context-M-9Dh2gW.js";import{_ as R}from"./index-Dvyb8452.js";import{n as U,P as N}from"./presets-C__N5bET.js";const V=y({__name:"ObjectContainer",props:{width:{},height:{},objectWidth:{},objectHeight:{},mode:{}},emits:["resize"],setup(l,{emit:m}){j(a=>({de76a444:a.objectWidth+"px",v5ac4ca62:a.objectHeight+"px",v682d67c6:E(r)/E(i)||0,v80868e70:a.objectWidth/a.objectHeight||0})),F();const g=m,o=p(null),{width:r,height:i}=C(o);return w(()=>[r.value,i.value],([a,e])=>{g("resize",[a,e])}),(a,e)=>(S(),z("div",{class:"object-container",ref_key:"containerRef",ref:o},[I(a.$slots,"default",{class:P(["object",l.mode??"contain"])})],512))}}),q=["src"],W=y({__name:"GlslImageEffect",props:{image:{},stages:{},objectFit:{default:"contain"}},setup(l){const m=F(),g=b(()=>m.$renderContext.value==="overview"),o=l,r=b(()=>({stages:U(o.stages,o.image)})),i=p([0,0]),a=async f=>new Promise((D,h)=>{const s=new Image;s.onload=()=>{i.value=[s.width,s.height],D()},s.onerror=A=>h(A),s.src=f}),e=p(null);let n=null,t=null,c=null;const{width:u,height:v}=C(e),x=async()=>{!n||!e.value||(await a(o.image),t=new N(n,e.value.width,e.value.height),await t.initialize(r.value))},_=async()=>{!e.value||!n||(e.value.width=u.value,e.value.height=v.value,n.viewport(0,0,u.value,v.value),t&&(t.destroy(),t=null),await x())},d=()=>{if(!n||!e.value)return;if(e.value.width===0||e.value.height===0){c=requestAnimationFrame(d);return}if(!t)return;n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT);const f=o.image&&i.value[0]>0?{imageSize:i.value}:{};t.render(r.value,void 0,f),c=requestAnimationFrame(d)};return O(async()=>{if(await a(o.image),await k(()=>u.value>0&&v.value>0).toBeTruthy(),n=e.value.getContext("webgl",{alpha:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!1,antialias:!0}),!n){console.error("Unable to initialize WebGL");return}if(n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),_(),e.value.width===0||e.value.height===0){console.error("Canvas has zero size after resize");return}await x(),d()}),G(()=>{c!==null&&cancelAnimationFrame(c),t?.destroy()}),w(()=>[o.stages,o.image],async()=>{n&&(t&&(t.destroy(),t=null),await x())}),w(()=>[u,v],async()=>{t&&await _()}),(f,D)=>{const h=V;return g.value?(S(),z("img",{key:1,src:l.image,style:{"{objectFit":"objectFit}"}},null,8,q)):(S(),T(h,{key:0,objectWidth:i.value[0],objectHeight:i.value[1],mode:l.objectFit},{default:B(({class:s})=>[H("canvas",{ref_key:"canvas",ref:e,class:P(s)},null,2)]),_:1},8,["objectWidth","objectHeight","mode"]))}}}),K=R(W,[["__scopeId","data-v-b96d7cff"]]),Q=`precision highp float;

varying vec2 v_texCoord;
uniform sampler2D u_texture0_0;
uniform float u_time;

// =================================================================
// НАСТРОЙКИ
// =================================================================
const float SPEED = 0.08; // Множитель скорости анимации
const float DISTORTION_STRENGTH = 0.35; // Сила искажения текстуры
const float EDGE_SOFTNESS = 4.2; // Множитель мягкости краёв

// =================================================================
// УЛУЧШЕННАЯ ГЕНЕРАЦИЯ ШУМА
// =================================================================

// Simplex-подобный шум с лучшими характеристиками
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626, // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// =================================================================
// ТУРБУЛЕНТНЫЙ FBM с вращением
// =================================================================
mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

float turbulentFbm(vec2 p, float timeOffset) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    // 6 октав для богатой текстуры
    for(int i = 0; i < 6; i++) {
        // Вращаем каждый слой для более органичного движения
        p = rotate2d(float(i) * 0.3 + timeOffset * 0.1) * p;
        
        // Добавляем турбулентность через abs()
        float n = abs(snoise(p * frequency));
        value += amplitude * n;
        
        amplitude *= 0.5;
        frequency *= 2.1;
    }
    
    return value;
}

// =================================================================
// ВОЛНОВЫЕ ИСКАЖЕНИЯ
// =================================================================
vec2 flowDistortion(vec2 uv, float time) {
    // Несколько слоёв волн, движущихся в разных направлениях
    float wave1 = snoise(uv * 3.0 + vec2(time * 0.2, time * 0.15) * SPEED);
    float wave2 = snoise(uv * 5.0 - vec2(time * 0.15, time * 0.25) * SPEED);
    float wave3 = snoise(uv * 2.0 + vec2(time * 0.1, -time * 0.1) * SPEED);
    
    vec2 distortion = vec2(wave1 + wave2 * 0.5, wave3 + wave1 * 0.5);
    return distortion * 0.03; // Интенсивность искажения
}

// =================================================================
// ОПРЕДЕЛЕНИЕ МЯГКОСТИ КРАЁВ
// =================================================================
float getEdgeSoftness(sampler2D tex, vec2 uv) {
    // Размер пикселя для семплирования соседей
    vec2 texelSize = vec2(1.0 / 1920.0, 1.0 / 1080.0); // Приблизительный размер
    
    // Текущая прозрачность
    float centerAlpha = texture2D(tex, uv).a;
    
    // Проверяем 8 соседних пикселей
    float avgAlpha = 0.0;
    avgAlpha += texture2D(tex, uv + vec2(-1, -1) * texelSize).a;
    avgAlpha += texture2D(tex, uv + vec2( 0, -1) * texelSize).a;
    avgAlpha += texture2D(tex, uv + vec2( 1, -1) * texelSize).a;
    avgAlpha += texture2D(tex, uv + vec2(-1,  0) * texelSize).a;
    avgAlpha += texture2D(tex, uv + vec2( 1,  0) * texelSize).a;
    avgAlpha += texture2D(tex, uv + vec2(-1,  1) * texelSize).a;
    avgAlpha += texture2D(tex, uv + vec2( 0,  1) * texelSize).a;
    avgAlpha += texture2D(tex, uv + vec2( 1,  1) * texelSize).a;
    avgAlpha /= 8.0;
    
    // Если соседи прозрачнее, уменьшаем силу эффекта
    float edgeFactor = smoothstep(0.0, 0.5, avgAlpha);
    
    // Дополнительное смягчение на основе разницы
    float alphaDiff = abs(centerAlpha - avgAlpha);
    edgeFactor *= 1.0 - smoothstep(0.0, 0.3, alphaDiff);
    
    return edgeFactor;
}

// =================================================================
// ПРОБЛЕСКИ И МЕРЦАНИЕ
// =================================================================
float flicker(vec2 p, float time) {
    // Медленные большие вспышки
    float largePulse = snoise(p * 1.5 + time * 0.3 * SPEED) * 0.5 + 0.5;
    largePulse = pow(largePulse, 3.0);
    
    // Быстрое мелкое мерцание
    float smallFlicker = snoise(p * 15.0 + time * 2.0 * SPEED) * 0.5 + 0.5;
    smallFlicker = pow(smallFlicker, 5.0) * 0.3;
    
    // Волны яркости
    float waves = sin(time * 0.5 * SPEED + snoise(p * 2.0) * 6.28) * 0.5 + 0.5;
    waves = pow(waves, 2.0) * 0.4;
    
    return largePulse * 0.6 + smallFlicker + waves;
}

// =================================================================
// ОСНОВНАЯ ФУНКЦИЯ
// =================================================================
void main() {
    vec2 uv = v_texCoord;
    
    // Применяем волновые искажения к координатам
    vec2 distortedUV = uv + flowDistortion(uv, u_time);
    
    // Читаем базовую текстуру с небольшим искажением для органичности
    vec2 textureDistortion = flowDistortion(uv, u_time * SPEED * 100.0) * DISTORTION_STRENGTH;
    vec4 baseColor = texture2D(u_texture0_0, uv + textureDistortion);
    
    // Определяем мягкость краёв на основе соседних пикселей
    float edgeSoftness = getEdgeSoftness(u_texture0_0, uv);
    edgeSoftness = pow(edgeSoftness, EDGE_SOFTNESS * abs(sin(u_time * SPEED)));
    
    // Генерируем несколько слоёв тумана с разными скоростями
    // Слой 1: медленный основной туман
    float fog1 = turbulentFbm(
        distortedUV * 4.0 + vec2(u_time * 0.03, u_time * 0.02) * SPEED * 0.05, 
        u_time * 0.5 * SPEED
    );
    
    // Слой 2: средний, движется в другую сторону
    float fog2 = turbulentFbm(
        distortedUV * 6.0 - vec2(u_time * 0.05, -u_time * 0.04) * SPEED * 0.05, 
        u_time * 0.75 * SPEED
    );
    
    // Слой 3: быстрый мелкий
    float fog3 = turbulentFbm(
        distortedUV * 10.0 + vec2(u_time * 0.08, u_time * 0.06) * SPEED * 0.05, 
        u_time * 0.1 * SPEED
    );
    
    // Комбинируем слои
    float fogDensity = fog1 * 0.5 + fog2 * 0.3 + fog3 * 0.2;
    fogDensity = smoothstep(0.2, 0.8, fogDensity);
    
    // Добавляем проблески и мерцание
    float glowIntensity = flicker(distortedUV, u_time);
    fogDensity *= (0.6 + glowIntensity * 0.8);
    
    // Применяем мягкость краёв к плотности тумана
    fogDensity *= edgeSoftness;
    
    // Космический зелёный туман с вариациями оттенка
    float hueVariation = snoise(distortedUV * 8.0 + u_time * 0.1 * SPEED) * 0.3;
    vec3 baseGreen = vec3(0.1, 0.8, 0.3);
    vec3 accentGreen = vec3(0.2, 1.0, 0.5);
    vec3 fogColor = mix(baseGreen, accentGreen, hueVariation + 0.5);
    
    // Добавляем яркие вспышки в центрах плотности
    float brightSpots = pow(fogDensity, 4.0) * 2.0;
    fogColor += vec3(0.5, 1.0, 0.6) * brightSpots;
    
    // Финальное смешивание с аддитивным режимом
    vec3 finalColor = baseColor.rgb + fogColor * fogDensity * 0.4;
    
    // Легкое свечение по краям для глубины
    float edgeGlow = smoothstep(0.0, 0.3, fogDensity) * 0.3;
    finalColor += vec3(0.05, 0.2, 0.1) * edgeGlow;
    
    gl_FragColor = vec4(finalColor, baseColor.a);
}
`;export{K as _,Q as s};
