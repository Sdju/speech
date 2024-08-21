<script setup lang="ts">
import {onMounted, ref} from 'vue';

const canvas = ref<HTMLCanvasElement>()
const points = Array(150).fill(0).map(() => ({

}))
let ctx: CanvasRenderingContext2D;

onMounted(() => {
  const canvasEl = canvas.value
  ctx = canvasEl.getContext('2d')

  canvasEl.width = canvasEl.clientWidth
  canvasEl.height = canvasEl.clientHeight
})

// Util
function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

</script>

<template>
  <div class="relative">
    <canvas id="demo-canvas" class="absolute w-full h-full top-0 left-0" />
  </div>
</template>
