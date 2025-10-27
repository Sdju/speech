precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_texture0_0;
uniform float u_time;

void main() {
    vec4 color = texture2D(u_texture0_0, v_texCoord);
    
    // Базовая виньетка
    float borderSize = 0.2;
    float blurWidth = 0.1;
    float left = smoothstep(0.0, blurWidth, v_texCoord.x);
    float right = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.x);
    float top = smoothstep(0.0, blurWidth, v_texCoord.y);
    float bottom = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.y);
    float vignette = min(min(left, right), min(top, bottom));
    
    // Координаты ключевых точек для поблескивания (примерные значения, подстройте под изображение)
    vec2 point1 = vec2(0.5, 0.3); // Центр верхнего треугольника
    vec2 point2 = vec2(0.3, 0.6); // Левый верхний угол
    vec2 point3 = vec2(0.7, 0.6); // Правый верхний угол
    vec2 point4 = vec2(0.5, 0.9); // Верхняя точка
    
    // Поблескивание в точках
    float dist1 = distance(v_texCoord, point1);
    float dist2 = distance(v_texCoord, point2);
    float dist3 = distance(v_texCoord, point3);
    float dist4 = distance(v_texCoord, point4);
    float glow = 0.0;
    glow += 0.3 * sin(u_time + dist1 * 10.0) / (dist1 * 10.0 + 0.1);
    glow += 0.3 * sin(u_time + dist2 * 10.0) / (dist2 * 10.0 + 0.1);
    glow += 0.3 * sin(u_time + dist3 * 10.0) / (dist3 * 10.0 + 0.1);
    glow += 0.3 * sin(u_time + dist4 * 10.0) / (dist4 * 10.0 + 0.1);
    glow = clamp(glow, 0.0, 0.5);
    
    // Анимация дымка по краям
    float edge = 1.0 - vignette;
    float smoke = edge * (0.2 + 0.1 * sin(u_time + v_texCoord.x * 10.0) + 0.1 * sin(u_time + v_texCoord.y * 10.0));
    vec3 smokeColor = vec3(0.1, 0.3, 0.1) * smoke;
    
    // Финальный цвет
    vec3 finalColor = color.rgb + vec3(glow, glow, glow) + smokeColor;
    gl_FragColor = vec4(finalColor, color.a * vignette);
}
