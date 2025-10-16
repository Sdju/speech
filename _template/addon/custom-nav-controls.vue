<script setup lang="ts">
import { ref } from 'vue'
import { showPartsManager } from './state/partsManager'

function togglePartsManager() {
  showPartsManager.value = !showPartsManager.value
}
</script>

<template>
  <button
    class="icon-btn"
    :class="{ 'text-primary': showPartsManager }"
    title="Parts Manager"
    @click="togglePartsManager"
  >
    <div class="i-carbon:document-multiple-01" />
  </button>
</template>

<style scoped>
.icon-btn {
  @apply flex items-center justify-center w-8 h-8 rounded cursor-pointer hover:bg-gray/10 active:bg-gray/20;
}

.text-primary {
  @apply text-blue-500;
}
</style>

