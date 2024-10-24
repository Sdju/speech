<script setup lang="ts">

import { inject, computed, ref, watch, type ComputedRef, useAttrs } from 'vue';

const {
  start,
  end,
  coords,
  power = 0.5,
  endArrow = true,
  startArrow = false
} = defineProps<{
  start?: { x: number | string, y: number | string } | string,
  end?: { x: number | string, y: number | string } | string,
  coords?: string,
  power?: number,
  endArrow?: boolean,
  startArrow?: boolean,
}>()

const curve = ref<SVGPathElement>()

const fullLength = computed(() => curve.value?.getTotalLength())

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

  // Вычисляем перпендикулярный вектор
  const perpX = -dy / distance
  const perpY = dx / distance

  // Вычисляем контрольную точку
  const controlX = midX + perpX * distance * CONTROL_POINT_HEIGHT_RATE
  const controlY = midY + perpY * distance * CONTROL_POINT_HEIGHT_RATE

  const control = {
    x: controlX,
    y: controlY
  }

  console.log(start, control, end)

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

function interpolateCurveAngle({
  start,
  control,
  end
}, t: number): number {
  const t1 = 1 - t

  const tangentX = 2 * t1 * (control.x - start.x) +
    2 * t * (end.x - control.x)
  const tangentY = 2 * t1 * (control.y - start.y) +
    2 * t * (end.y - control.y)

  return Math.atan2(tangentY, tangentX) * (180 / Math.PI)
}

function getAllCurveData(start, end, options) {
  const curve = getCurve(start, end, options)
  const svgPath = getCurveSVGPath(curve)
  const endAngle = interpolateCurveAngle(curve, 1)
  const startAngle = interpolateCurveAngle(curve, 0)

  return { curve, svgPath, endAngle, startAngle }
}

const curveData = computed(() => {
  return getAllCurveData(
    normalizedCoords.value[0],
    normalizedCoords.value[1],
    { heightRate: -power }
  )
})

const attrs = useAttrs()
const isAnimated = computed(() => attrs.class?.includes('animate'))
const animateMotion = ref<SVGAnimateMotionElement>()
watch(() => isAnimated.value, (newVal) => {
  if (newVal) {
    animateMotion.value?.beginElement()
  }
})

</script>

<template>
  <g class="svg-arrow" :style="{ '--full-length': fullLength }">
    <path ref="curve" :d="curveData.svgPath" fill="none" />
    <polygon 
      v-if="endArrow" 
      points="-12,-6 0,0, -12,6"
      :transform="isAnimated ? undefined : `translate(${curveData.curve.end.x},${curveData.curve.end.y}) rotate(${curveData.endAngle})`"
    >
      <animateMotion
        ref="animateMotion"
        dur="200ms"
        repeatCount="1"
        :path="curveData.svgPath"
        rotate="auto"
        fill="freeze"
      />
    </polygon>
    <polygon
      v-if="startArrow" 
      points="12,-6 0,0, 12,6"
      :transform="`translate(${curveData.curve.start.x},${curveData.curve.start.y}) rotate(${curveData.startAngle})`"
    />
  </g>
</template>

<style>
.svg-arrow {
  stroke: var(--color-primary);
  --animation-duration: 0.2s;

  & path {
    stroke-dasharray: var(--full-length);
    stroke-dashoffset: var(--full-length);
  }

  &.animate path {
    animation: svg-arrow-stroke var(--animation-duration) linear forwards;
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
