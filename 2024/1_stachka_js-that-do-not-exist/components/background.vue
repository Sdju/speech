<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const points = ref(new Array(16).fill(0).map(() => [Math.random(), Math.random()]))

const poly = computed(() => points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', '))

function jumpVal(val: number) {
  return Math.random() > 0.5 ? val + (Math.random() - 0.5) / 2 : Math.random()
}

let timeout
function jumpPoints() {
  for (let i = 0; i < points.value.length; i++) {
    points.value[i] = [jumpVal(points.value[i][0]), jumpVal(points.value[i][1])]
  }
  timeout = setTimeout(jumpPoints, 2000 + Math.random() * 1000)
}

onMounted(() => {
  jumpPoints()
  onUnmounted(() => clearTimeout(timeout))
})
</script>

<template>
  <div class="bg absolute inset-0 -z-10 transform-gpu blur-3xl overflow-hidden" aria-hidden="true">
    <div
      class="aspect-[1.7] h-full w-full bg-gradient-to-r from-[#ffd500] to-white/10 lg:opacity-30 xs:opacity-50"
      :style="{ 'clip-path': `polygon(${poly})` }"
    />
  </div>
</template>

<style scoped>
.bg > div {
  clip-path: circle(75%);
  transition: all 3s;
}

.light .bg > div {
  --color-source: #ffd500;
  opacity: 1 !important;
}
</style>