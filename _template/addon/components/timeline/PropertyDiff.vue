<script setup lang="ts">
import { computed } from 'vue'
import ObjectViewer from './ObjectViewer.vue'

const props = defineProps<{
  name: string
  value: any
  prevValue?: any
  showDiff?: boolean
}>()

const hasChanged = computed(() => {
  if (props.prevValue === undefined) return true
  return JSON.stringify(props.value) !== JSON.stringify(props.prevValue)
})

const changeType = computed(() => {
  if (props.prevValue === undefined) return 'new'
  if (props.value === undefined) return 'removed'
  return 'modified'
})

function isSimpleValue(value: any): boolean {
  return typeof value !== 'object' || value === null
}
</script>

<template>
  <div 
    class="property-diff"
    :class="{
      'is-changed': hasChanged && showDiff,
      [`change-${changeType}`]: showDiff
    }"
  >
    <div class="property-header">
      <span class="property-name">{{ name }}</span>
      <span v-if="hasChanged && showDiff" class="change-indicator">
        {{ changeType === 'new' ? '✨' : changeType === 'removed' ? '❌' : '📝' }}
      </span>
    </div>
    
    <div class="property-content">
      <ObjectViewer :data="value" :depth="0" />
    </div>

    <!-- Показываем предыдущее значение если есть изменение -->
    <!-- <div v-if="showDiff && hasChanged && changeType === 'modified'" class="previous-value">
      <div class="previous-label">Было:</div>
      <ObjectViewer :data="prevValue" :depth="0" />
    </div> -->
  </div>
</template>

<style scoped>
.property-diff {
  padding: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;
}

.property-diff.is-changed {
  background: rgba(74, 222, 128, 0.05);
  border-color: rgba(74, 222, 128, 0.2);
}

.property-diff.change-new {
  background: rgba(96, 165, 250, 0.05);
  border-color: rgba(96, 165, 250, 0.2);
}

.property-diff.change-removed {
  background: rgba(248, 113, 113, 0.05);
  border-color: rgba(248, 113, 113, 0.2);
}

.property-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.property-name {
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  font-size: 12px;
  color: #60a5fa;
}

.change-indicator {
  font-size: 10px;
}

.property-content {
  padding-left: 4px;
}

.previous-value {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}

.previous-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4px;
  font-style: italic;
}
</style>

