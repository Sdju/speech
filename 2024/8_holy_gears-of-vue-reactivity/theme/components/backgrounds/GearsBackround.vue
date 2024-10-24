<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const gearChains = ref([]);

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;

onMounted(() => {
  const canvasEl = canvas.value;
  if (!canvasEl) return;
  
  ctx = canvasEl.getContext('2d');
  if (!ctx) return;

  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  initGearChains();
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
  initGearChains();
}

function initGearChains() {
  const numChains = 5;
  gearChains.value = [];

  for (let i = 0; i < numChains; i++) {
    const chainLength = 3 + Math.floor(Math.random() * 3);
    const chain = [];
    let x = Math.random() * canvas.value!.width;
    let y = Math.random() * canvas.value!.height;
    let prevRadius = 0;

    for (let j = 0; j < chainLength; j++) {
      const radius = 20 + Math.random() * 60;
      const teeth = 8 + Math.floor(Math.random() * 8);
      const speed = (Math.random() - 0.5) * 0.02;
      const opacity = 0.3 + Math.random() * 0.5;

      if (j > 0) {
        const angle = Math.random() * Math.PI * 2;
        x += Math.cos(angle) * (prevRadius + radius);
        y += Math.sin(angle) * (prevRadius + radius);
      }

      chain.push({
        x, y, radius, teeth, 
        rotation: Math.random() * Math.PI * 2,
        speed: j % 2 === 0 ? speed : -speed,
        opacity
      });

      prevRadius = radius;
    }

    gearChains.value.push(chain);
  }
}

function drawGear(gear) {
  if (!ctx) return;

  ctx.save();
  ctx.translate(gear.x, gear.y);
  ctx.rotate(gear.rotation);
  ctx.beginPath();
  
  const toothAngle = (Math.PI * 2) / (gear.teeth * 2);
  for (let i = 0; i < gear.teeth * 2; i++) {
    const angle = i * toothAngle;
    const r = i % 2 === 0 ? gear.radius - 10 : gear.radius;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  
  ctx.closePath();
  ctx.strokeStyle = `rgba(0, 255, 0, ${gear.opacity})`;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function animate() {
  if (!ctx || !canvas.value) return;
  
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  
  gearChains.value.forEach(chain => {
    chain.forEach((gear, index) => {
      gear.rotation += gear.speed;
      drawGear(gear);

      if (index < chain.length - 1) {
        const nextGear = chain[index + 1];
        ctx!.beginPath();
        ctx!.moveTo(gear.x, gear.y);
        ctx!.lineTo(nextGear.x, nextGear.y);
        ctx!.strokeStyle = `rgba(0, 255, 0, ${(gear.opacity + nextGear.opacity) / 4})`;
        ctx!.stroke();
      }
    });
  });
  
  animationId = requestAnimationFrame(animate);
}
</script>

<template>
  <canvas ref="canvas" class="absolute w-full h-full top-0 left-0" />
</template>

<style scoped>
canvas {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
