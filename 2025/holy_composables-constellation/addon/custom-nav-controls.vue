<script setup lang="ts">
import { showPartsManager } from './state/partsManager'
import { showTimelineEditor } from './state/timeline'

function togglePartsManager() {
  showPartsManager.value = !showPartsManager.value
}

function toggleTimelineEditor() {
  showTimelineEditor.value = !showTimelineEditor.value
}
</script>

<template>
  <div class="w-1px opacity-10 bg-current m-1 lg:m-2" />

  <button
    class="slidev-icon-btn"
    :class="{ 'text-primary': showPartsManager }"
    title="Parts Manager"
    @click="togglePartsManager"
  >
    <div class="i-carbon:document-multiple-01" />
  </button>
  
  <button
    class="slidev-icon-btn"
    :class="{ 'text-primary': showTimelineEditor }"
    title="Timeline Editor"
    @click="toggleTimelineEditor"
  >
    <div class="i-tdesign:animation" />
  </button>
</template>

<style scoped>
.text-primary {
  @apply text-blue-500;
}
</style>

