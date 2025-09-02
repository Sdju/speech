<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const points = ref(Array(150).fill(0).map(() => ({
  x: Math.random(),
  y: Math.random(),
  vx: (Math.random() - 0.5) * 0.002,
  vy: (Math.random() - 0.5) * 0.002,
})));

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;

onMounted(() => {
  const canvasEl = canvas.value;
  if (!canvasEl) return;
  
  ctx = canvasEl.getContext('2d');
  if (!ctx) return;

  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  window.addEventListener('resize', handleResize);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }
});

function handleResize() {
  if (!canvas.value || !ctx) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function animate() {
  if (!ctx || !canvas.value) return;
  
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  
  // Update and draw points
  points.value.forEach(point => {
    point.x += point.vx;
    point.y += point.vy;
    
    // Bounce off edges
    if (point.x < 0 || point.x > 1) point.vx *= -1;
    if (point.y < 0 || point.y > 1) point.vy *= -1;
    
    const x = point.x * canvas.value!.width;
    const y = point.y * canvas.value!.height;
    
    ctx!.beginPath();
    ctx!.arc(x, y, 2, 0, Math.PI * 2);
    ctx!.fillStyle = 'rgba(0, 255, 0, 0.8)';
    ctx!.fill();
  });
  
  // Draw lines between close points
  for (let i = 0; i < points.value.length; i++) {
    for (let j = i + 1; j < points.value.length; j++) {
      const dx = (points.value[i].x - points.value[j].x) * canvas.value.width;
      const dy = (points.value[i].y - points.value[j].y) * canvas.value.height;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(points.value[i].x * canvas.value.width, points.value[i].y * canvas.value.height);
        ctx.lineTo(points.value[j].x * canvas.value.width, points.value[j].y * canvas.value.height);
        ctx.strokeStyle = `rgba(0, 255, 0, ${1 - distance / 100})`;
        ctx.stroke();
      }
    }
  }
  
  animationId = requestAnimationFrame(animate);
}
</script>

<template>
  <canvas ref="canvas" class="absolute w-full h-full top-0 left-0" />
</template>

<style scoped>
canvas {
  background-color: #000;
}
</style>
