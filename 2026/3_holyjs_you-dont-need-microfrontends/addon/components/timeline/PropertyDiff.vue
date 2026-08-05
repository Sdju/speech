<script setup lang="ts">
import { computed } from 'vue'
import ObjectViewer from './ObjectViewer.vue'
import EditableValue from './EditableValue.vue'

const props = defineProps<{
  name: string
  value: any
  prevValue?: any
  showDiff?: boolean
  stepIndex: number
  path: string
  slideMeta: { filepath: string; start: number }
}>()

const emit = defineEmits<{
  update: [path: string, oldValue: any, newValue: any, stepIndex: number, propertyName: string]
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

function keyPathFrom(path: string) {
  return path.replace(/^timeline\.\d+\./, '')
}

async function persistProperty(path: string, oldValue: any, newValue: any, stepIndex: number, propertyName: string) {
  const keyPath = keyPathFrom(path) || propertyName
  try {
    const res = await fetch('/__slides_parts_api/timeline-patch-prop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filePath: props.slideMeta.filepath,
        slideStart: props.slideMeta.start,
        stepIndex,
        keyPath,
        newValue,
      }),
    })
    const data = await res.json()
    if (!data.success) {
      console.error('timeline-patch-prop failed:', data.error)
      return
    }
    emit('update', path, oldValue, newValue, stepIndex, propertyName)
  }
  catch (e) {
    console.error('timeline-patch-prop error:', e)
  }
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
      <EditableValue
        v-if="isSimpleValue(value)"
        :value="value"
        :path="path"
        :step-index="stepIndex"
        :property-name="name"
        @update="persistProperty"
      />
      
      <ObjectViewer
        v-else
        :data="value"
        :depth="0"
        flat
        editable
        :path-prefix="name"
        :step-index="stepIndex"
        :base-path="path"
        @update="persistProperty"
      />
    </div>
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
</style>
