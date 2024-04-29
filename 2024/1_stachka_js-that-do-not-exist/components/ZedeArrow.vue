<!--

Simple Arrow

<arrow x1="10" y1="20" x2="100" y2="200" color="green" width="3" />

<arrow v-bind="{ x1:10, y1:10, x2:200, y2:200 }"/>

-->

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps<{
  x1: number | string
  y1: number | string
  x2: number | string
  y2: number | string
  width?: number | string
  stroke?: '' | 'dashed'
  color?: string
}>()

const diffX = computed(() => Math.abs(+props.x1 - +props.x2))
const diffY = computed(() => Math.abs(+props.y1 - +props.y2))
const minX = computed(() => Math.min(+props.x1, +props.x2))
const minY = computed(() => Math.min(+props.y1, +props.y2))

const svgStyle = computed(() => {
  return {
    width: diffX.value + 10,
    height: diffY.value + 10,
    left: `${+minX.value - 5}px`,
    top: `${+minY.value - 5}px`,
  }
})

const id = String(`svg-${Math.random()}`)
</script>

<template>
  <svg
    class="absolute pointer-events-none"
    :style="svgStyle"
    :viewBox="`0 0 ${diffX + 10} ${diffY + 10}`"
  >
    <defs>
      <marker
        :id="id"
        markerUnits="strokeWidth"
        :markerWidth="10"
        :markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" :fill="color || 'currentColor'" />
      </marker>
    </defs>
    <path
      :d="`M${5 + +x1 - minX} ${5 + +y1 - minY}, L${5 + +x2 - minX} ${5 + +y2 - minY}`"
      :stroke="color || 'currentColor'"
      :stroke-dasharray="stroke === 'dashed' ? '5,5' : 'none'"
      fill="none"
      stroke-width="1.5"
      :marker-end="`url(#${id})`"
    />
  </svg>
</template>
