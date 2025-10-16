<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  data: any
  depth?: number
  name?: string
}>()

const depth = props.depth ?? 0
const isExpanded = ref(depth < 2) // Auto-expand first 2 levels

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

function isObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function isArray(value: any): boolean {
  return Array.isArray(value)
}

function isPrimitive(value: any): boolean {
  return !isObject(value) && !isArray(value)
}

function getValueType(value: any): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'string') return 'string'
  if (isArray(value)) return 'array'
  if (isObject(value)) return 'object'
  return 'unknown'
}

function formatPrimitive(value: any): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') return String(value)
  if (typeof value === 'string') return value
  return String(value)
}

function getKeys(obj: any): string[] {
  return Object.keys(obj)
}

function getSize(value: any): number {
  if (isArray(value)) return value.length
  if (isObject(value)) return Object.keys(value).length
  return 0
}
</script>

<template>
  <div class="object-viewer" :style="{ paddingLeft: depth > 0 ? '12px' : '0' }">
    <div v-if="isPrimitive(data)" class="primitive-value" :class="`type-${getValueType(data)}`">
      {{ formatPrimitive(data) }}
    </div>

    <div v-else class="complex-container">
      <div class="complex-header" @click="toggleExpand">
        <button class="expand-btn">
          <div v-if="isExpanded" class="i-carbon:chevron-down text-xs" />
          <div v-else class="i-carbon:chevron-right text-xs" />
        </button>
        
        <span v-if="name" class="object-name">{{ name }}</span>
        
        <span class="object-type">
          {{ isArray(data) ? 'Array' : 'Object' }}
        </span>
        
        <span class="object-size">
          ({{ getSize(data) }})
        </span>
        
        <div v-if="!isExpanded" class="object-preview">
          {{ isArray(data) ? '[...]' : '{...}' }}
        </div>
      </div>

      <div v-if="isExpanded" class="complex-content">
        <div v-if="isArray(data)" class="array-items">
          <div v-for="(item, index) in data" :key="index" class="array-item">
            <span class="array-index">[{{ index }}]</span>
            <ObjectViewer :data="item" :depth="depth + 1" />
          </div>
        </div>

        <div v-else class="object-properties">
          <div v-for="key in getKeys(data)" :key="key" class="object-property">
            <div class="property-line">
              <span class="property-key">{{ key }}:</span>
              <ObjectViewer :data="data[key]" :depth="depth + 1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.object-viewer {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 11px;
  line-height: 1.5;
}

.primitive-value {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 500;
}

.type-string {
  color: #ce9178;
  background: rgba(206, 145, 120, 0.1);
}

.type-number {
  color: #b5cea8;
  background: rgba(181, 206, 168, 0.1);
}

.type-boolean {
  color: #569cd6;
  background: rgba(86, 156, 214, 0.1);
}

.type-null,
.type-undefined {
  color: #808080;
  background: rgba(128, 128, 128, 0.1);
  font-style: italic;
}

.complex-container {
  display: flex;
  flex-direction: column;
}

.complex-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.15s;
}

.complex-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  flex-shrink: 0;
}

.object-name {
  color: #9cdcfe;
  font-weight: 600;
}

.object-type {
  color: #4ec9b0;
  font-size: 10px;
}

.object-size {
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
}

.object-preview {
  color: rgba(255, 255, 255, 0.3);
  font-size: 10px;
  margin-left: 4px;
}

.complex-content {
  margin-top: 2px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  margin-left: 8px;
}

.array-items,
.object-properties {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 4px;
}

.array-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.array-index {
  color: #d16969;
  font-size: 10px;
  min-width: 24px;
  flex-shrink: 0;
  padding-top: 2px;
}

.object-property {
  display: flex;
  flex-direction: column;
}

.property-line {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.property-key {
  color: #9cdcfe;
  font-weight: 500;
  flex-shrink: 0;
  padding-top: 2px;
}
</style>

