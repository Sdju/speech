precision mediump float;

uniform sampler2D u_texture0_0;
#define threshold 0.00001
#define smoothness 0.01

varying vec2 v_texCoord;

void main() {
    vec4 color = texture2D(u_texture0_0, v_texCoord);

    // Luminance (brightness) — учитывает даже зелёный канал.
    float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // Smooth alpha: 
    // luminance <= threshold       → alpha = 0
    // luminance >= threshold+smoothness → alpha = 1
    float alpha = smoothstep(threshold, threshold + smoothness, luminance);

    gl_FragColor = vec4(color.rgb, alpha);
}