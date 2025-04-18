<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  imageUrl: string;
  preset: 'blur' | 'vignette';
  params: any;
}>()

const presets = {
  blur: {
    vertexShader: `
    
    `,
  },
  vignette: {
    vertexShader: `
attribute vec4 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
void main() {
  gl_Position = a_position;
  v_texCoord = a_texCoord;
}
    `,
    fragmentShader: `
precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_image;
void main() {
  vec4 color = texture2D(u_image, v_texCoord);
  
  float borderSize = 0.2; // Размер рамки, в долях от размера изображения
  float blurWidth = 0.1; // Ширина градиента размытия
  
  float left = smoothstep(0.0, blurWidth, v_texCoord.x);
  float right = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.x);
  float top = smoothstep(0.0, blurWidth, v_texCoord.y);
  float bottom = smoothstep(1.0, 1.0 - blurWidth, v_texCoord.y);
  
  float vignette = min(min(left, right), min(top, bottom));
  
  gl_FragColor = vec4(color.rgb, color.a * vignette);
    `
  },
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
let gl: WebGLRenderingContext | null = null;
let texture: WebGLTexture | null = null;

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
};

const loadImage = () => {
  if (!imageUrl.value || !canvasRef.value) return;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imageUrl.value;
  img.onload = () => {
    if (!canvasRef.value) return;
    canvasRef.value.width = img.width;
    canvasRef.value.height = img.height;
    
    gl = canvasRef.value.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1, 1,
      1, 1,
      -1, -1,
      1, -1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    const texCoords = [
      0, 0,
      1, 0,
      0, 1,
      1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const imageLocation = gl.getUniformLocation(program, 'u_image');
    gl.uniform1i(imageLocation, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
};
</script>

<template>
  <div>
    <input v-model="imageUrl" placeholder="Enter Image URL" />
    <button @click="loadImage">Load Image</button>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
canvas {
  display: block;
  max-width: 100%;
  border: 1px solid #ccc;
  margin-top: 10px;
}
</style>