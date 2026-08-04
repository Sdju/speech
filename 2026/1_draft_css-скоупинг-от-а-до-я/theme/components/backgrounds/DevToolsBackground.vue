<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentSlideRoute } = useNav()
const frontmatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const accent = computed(() => frontmatter.value.slideClass || 'cs-dt-default')
</script>

<template>
  <div class="devtools-bg" :class="accent" aria-hidden="true">
    <div class="devtools-bg__chrome">
      <div class="devtools-bg__tabs">
        <span class="devtools-bg__tab devtools-bg__tab--inactive">Elements</span>
        <span class="devtools-bg__tab devtools-bg__tab--inactive">Console</span>
        <span class="devtools-bg__tab devtools-bg__tab--active">Styles</span>
        <span class="devtools-bg__tab devtools-bg__tab--inactive">Computed</span>
      </div>
    </div>
    <div class="devtools-bg__sidebar" />
    <div class="devtools-bg__grid" />
    <div class="devtools-bg__accent" />
  </div>
</template>

<style scoped>
.devtools-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: #1e1e1e;
  overflow: hidden;
  pointer-events: none;
}

.devtools-bg__chrome {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: #2d2d30;
  border-bottom: 1px solid #3c3c3c;
  opacity: 0.55;
}

.devtools-bg__tabs {
  display: flex;
  height: 100%;
  padding-left: 48px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: 11px;
  color: #969696;
}

.devtools-bg__tab {
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-right: 1px solid #3c3c3c;
}

.devtools-bg__tab--active {
  background: #1e1e1e;
  color: #ccc;
  border-bottom: 1px solid #1e1e1e;
  margin-bottom: -1px;
}

.devtools-bg__sidebar {
  position: absolute;
  top: 28px;
  left: 0;
  bottom: 0;
  width: 44px;
  background: #252526;
  border-right: 1px solid #3c3c3c;
  opacity: 0.7;
}

.devtools-bg__grid {
  position: absolute;
  inset: 28px 0 0 44px;
  background-image:
    linear-gradient(color-mix(in srgb, var(--v-color, #9cdcfe) 6%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--v-color, #9cdcfe) 4%, transparent) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%);
  opacity: 0.45;
}

.devtools-bg__accent {
  position: absolute;
  top: 28px;
  left: 44px;
  width: 3px;
  height: 120px;
  background: var(--v-color, #9cdcfe);
  opacity: 0.35;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 24px color-mix(in srgb, var(--v-color, #9cdcfe) 40%, transparent);
  transition: background 1.5s ease, box-shadow 1.5s ease;
}
</style>
