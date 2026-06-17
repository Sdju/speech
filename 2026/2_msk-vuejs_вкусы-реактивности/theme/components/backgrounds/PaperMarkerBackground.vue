<script setup lang="ts">
/**
 * Фон «блокнот + заливки фломастером».
 * Тёплая бумага, мягкие цветовые пятна по --bg-* текущего слайда.
 */
import BlurredPolyBackground from './BlurredPolyBackground.vue'
</script>

<template>
  <div class="paper-marker-bg" aria-hidden="true">
    <div class="paper-marker-bg__base" />
    <div class="paper-marker-bg__edge" />
    <BlurredPolyBackground />
  </div>
</template>

<style scoped>
.paper-marker-bg {
  @apply absolute inset-0 z-[-10] pointer-events-none overflow-hidden;
}

.paper-marker-bg__base {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 47px,
      rgba(255, 255, 255, 0.028) 47px,
      rgba(255, 255, 255, 0.028) 48px
    ),
    radial-gradient(ellipse 100% 70% at 8% 12%, color-mix(in srgb, var(--bg-second, #f39c12) 14%, transparent) 0%, transparent 58%),
    radial-gradient(ellipse 85% 60% at 92% 88%, color-mix(in srgb, var(--bg-first, #888) 18%, transparent) 0%, transparent 52%),
    radial-gradient(ellipse 60% 45% at 72% 18%, color-mix(in srgb, var(--bg-third, #888) 10%, transparent) 0%, transparent 50%),
    linear-gradient(168deg, #221e19 0%, #141210 38%, #1a1714 100%);
}

.paper-marker-bg__edge {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 80px 24px rgba(0, 0, 0, 0.28);
}
</style>
