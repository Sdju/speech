<script setup lang="ts">

import { inject, computed, ref, watch, type ComputedRef, useAttrs } from 'vue';

const { 
    start, 
    end,
    coords,
    power = 0.5,
    endArrow = true,
    startArrow = false,
    dashed = false,
} = defineProps<{
    start?: { x: number | string, y: number | string } | string,
    end?: { x: number | string, y: number | string } | string,
    coords?: string,
    power?: number,
    endArrow?: boolean,
    startArrow?: boolean,
    dashed?: boolean,
}>()

const curve = ref<SVGPathElement>()

const sizes = inject<ComputedRef<{ width: number, height: number }>>('sizes')!

const toNormalizePosition = (position: { x: number | string, y: number | string } | string): { x: number, y: number } => {
  let x
  let y
  if (typeof position === 'string') {
    [x, y] = position.split(':')
  } else {
    x = position.x
    y = position.y
  }
  if (typeof x === 'string') {
    if (x.endsWith('%')) {
      x = sizes.value.width / 100 * parseFloat(x)
    } else {
      x = parseFloat(x)
    }
  }
  if (typeof y === 'string') {
    if (y.endsWith('%')) {
      y = sizes.value.height / 100 * parseFloat(y)
    } else {
      y = parseFloat(y)
    }
  }
  return { x, y }
}

const normalizedCoords = computed(() => {
  let normalizedStart = start
  let normalizedEnd = end
  if (coords) {
    [normalizedStart, normalizedEnd] = coords.split(' ')
  } 
  if (!normalizedStart || !normalizedEnd) {
    throw new Error('Coords are required')
  }
  return [toNormalizePosition(normalizedStart), toNormalizePosition(normalizedEnd)]
})

function getCurve(start, end, options) {
  const CONTROL_POINT_HEIGHT_RATE = options?.heightRate || 0.5
  const dx = end.x - start.x
  const dy = end.y - start.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2

  const perpX = -dy / distance
  const perpY = dx / distance

  const controlHeight = distance * CONTROL_POINT_HEIGHT_RATE
  
  const controlX = midX + perpX * controlHeight
  const controlY = midY + perpY * controlHeight

  const control = {
    x: controlX,
    y: controlY
  }

  return { start, control, end }
}

function getCurveSVGPath(bezier) {
  const { start, control, end } = bezier

  return [
    `M${start.x},${start.y}`,
    `S${control.x},${control.y}`,
    `${end.x},${end.y}`
  ].join(' ')
}

function getAllCurveData(start, end, options) {
  const curve = getCurve(start, end, options)
  const svgPath = getCurveSVGPath(curve)

  return { curve, svgPath }
}

const curveData = computed(() => {
  return getAllCurveData(
    normalizedCoords.value[0],
    normalizedCoords.value[1],
    { heightRate: -power }
  )
})


const fullLength = ref(0)
watch(curveData, (value) => {
  const mockCurve = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  mockCurve.setAttribute('d', value.svgPath)
  fullLength.value = mockCurve.getTotalLength()
  if (fullLength.value < 1) {
    console.log('fullLength', { curveData: value, fullLength: fullLength.value })
  }
}, { flush: 'post', immediate: true })
</script>

<template>
  <g class="svg-arrow" :class="{ dashed }" :style="{ '--full-length': fullLength }">
    <path ref="curve" :d="curveData.svgPath" fill="none" />
    <polygon
        v-if="endArrow"
        points="-12,-6 0,0, -12,6"
        class="arrow-head"
        :style="{
            offsetPath: `path('${curveData.svgPath}')`,
            offsetDistance: '100%',
            offsetRotate: 'auto',
        }"
    />
    <polygon
        v-if="startArrow"
        points="12,-6 0,0, 12,6"
        class="arrow-tail"
        :style="{
            offsetPath: `path('${curveData.svgPath}')`,
            offsetDistance: '0%',
            offsetRotate: 'auto',
        }"
    />
  </g>
</template>

<style>
.svg-arrow {
  stroke: var(--color-primary);
  --animation-duration: 0.2s;
  --dash-length: 10;
  --dash-gap: 5;


  & path {
    transition: all var(--animation-duration) ease-out;
    stroke-dasharray: var(--full-length);
    stroke-dashoffset: var(--full-length);

    &:not(.animate) {
      stroke-dashoffset: 0;
    }
  }

  &.dashed path {
    stroke-dasharray: var(--dash-length) var(--dash-gap);
  }

  &.animate path {
    animation: svg-arrow-stroke var(--animation-duration) linear forwards;
  }

  &.animate .arrow-head {
    animation: moveAlongPath var(--animation-duration) linear normal;
  }
}

.arrow-head,
.arrow-tail {
  transition: all var(--animation-duration) ease-out;
}

@keyframes moveAlongPath {
    from {
        offset-distance: 0%;
    }
    to {
        offset-distance: 100%;
    }
}

@keyframes svg-arrow-stroke {
  from {
    stroke-dashoffset: var(--full-length);
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
