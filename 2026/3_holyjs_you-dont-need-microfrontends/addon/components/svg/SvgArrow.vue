<script setup lang="ts">

import { inject, computed, ref, useId, watch, onBeforeUnmount, type ComputedRef } from 'vue';

const { 
    start, 
    end,
    coords,
    d,
    reveal,
    power = 0.5,
    endArrow = true,
    startArrow = false,
    dashed = false,
} = defineProps<{
    start?: { x: number | string, y: number | string } | string,
    end?: { x: number | string, y: number | string } | string,
    coords?: string,
    /** Готовая траектория для схем со своей геометрией. */
    d?: string,
    /** Управляемая прорисовка 0..1; без неё сохраняется API класса animate. */
    reveal?: number,
    power?: number,
    endArrow?: boolean,
    startArrow?: boolean,
    dashed?: boolean,
}>()

const curve = ref<SVGPathElement>()
const head = ref<SVGPolygonElement>()
const tail = ref<SVGPolygonElement>()
const HEAD_LENGTH = 12

const sizes = inject<ComputedRef<{ width: number, height: number }>>('sizes', computed(() => ({ width: 960, height: 552 })))
const progress = computed(() => reveal == null ? undefined : Math.max(0, Math.min(1, reveal)))
const maskId = `arrow-reveal-${useId()}`
const maskBounds = ref({ x: 0, y: 0, width: 0, height: 0 })

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
  const CONTROL_POINT_HEIGHT_RATE = options?.heightRate ?? 0.5
  const dx = end.x - start.x
  const dy = end.y - start.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2

  const perpX = -dy / (distance || 1)
  const perpY = dx / (distance || 1)

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
  if (d)
    return { svgPath: d }
  return getAllCurveData(
    normalizedCoords.value[0],
    normalizedCoords.value[1],
    { heightRate: -power }
  )
})


const fullLength = ref(0)
let measuredCurve: SVGPathElement | undefined
watch(curveData, (value) => {
  const mockCurve = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  mockCurve.setAttribute('d', value.svgPath)
  measuredCurve = mockCurve
  fullLength.value = mockCurve.getTotalLength()
  // Любая точка пути лежит не дальше его полной длины от начала.
  // userSpaceOnUse нужен и для строго вертикальных/горизонтальных стрелок.
  const start = mockCurve.getPointAtLength(0)
  const extent = fullLength.value + 20
  maskBounds.value = { x: start.x - extent, y: start.y - extent, width: extent * 2, height: extent * 2 }
}, { flush: 'post', immediate: true })

// Наконечник имеет длину: направляем его вдоль хорды под треугольником,
// а не вдоль касательной только в точке острия. Кончик остаётся на motion path.
function orientHead(element: SVGPolygonElement, atStart = false) {
  if (!measuredCurve) return
  const length = fullLength.value
  const distance = getComputedStyle(element).offsetDistance
  const position = Math.max(0, Math.min(length,
    parseFloat(distance) * (distance.endsWith('%') ? length / 100 : 1) || 0,
  ))
  let from = Math.max(0, position - HEAD_LENGTH)
  let to = position
  if (atStart || position < 0.001) {
    from = position
    to = Math.min(length, position + HEAD_LENGTH)
  }
  const a = measuredCurve.getPointAtLength(from)
  const b = measuredCurve.getPointAtLength(to)
  element.style.offsetRotate = `${Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI}deg`
}

let orientationFrame: number | undefined
function syncOrientation() {
  if (orientationFrame != null) cancelAnimationFrame(orientationFrame)
  orientationFrame = undefined
  if (head.value) orientHead(head.value)
  if (tail.value) orientHead(tail.value, true)
  // Читаем фактическую CSS-позицию: сохраняются easing, delay и обратный ход.
  // Статические стрелки не держат собственный цикл requestAnimationFrame.
  const moving = [head.value, tail.value].some(element => element?.getAnimations()
    .some(animation => animation.playState === 'running' || animation.pending))
  if (moving) orientationFrame = requestAnimationFrame(syncOrientation)
}
watch([head, tail, curveData, progress], syncOrientation, { flush: 'post' })
onBeforeUnmount(() => {
  if (orientationFrame != null) cancelAnimationFrame(orientationFrame)
})
</script>

<template>
  <g class="svg-arrow" :class="{ dashed, 'controlled-reveal': progress != null }" :style="{ '--full-length': fullLength }">
    <defs v-if="progress != null">
      <mask :id="maskId" maskUnits="userSpaceOnUse" v-bind="maskBounds" style="mask-type: alpha">
        <path class="arrow-reveal" :d="curveData.svgPath" pathLength="1" fill="none" stroke="white"
          :style="{ strokeDashoffset: 1 - progress }" />
      </mask>
    </defs>
    <path ref="curve" :d="curveData.svgPath" fill="none" :mask="progress != null ? `url(#${maskId})` : undefined" />
    <polygon
        v-if="endArrow"
        ref="head"
        points="-12,-6 0,0, -12,6"
        class="arrow-head"
        @transitionrun="syncOrientation" @transitionend="syncOrientation" @transitioncancel="syncOrientation"
        @animationstart="syncOrientation" @animationend="syncOrientation" @animationcancel="syncOrientation"
        :style="{
            offsetPath: `path('${curveData.svgPath}')`,
            offsetDistance: `${(progress ?? 1) * 100}%`,
            offsetAnchor: '0px 0px',
        }"
    />
    <polygon
        v-if="startArrow"
        ref="tail"
        points="12,-6 0,0, 12,6"
        class="arrow-tail"
        @transitionrun="syncOrientation" @transitionend="syncOrientation" @transitioncancel="syncOrientation"
        @animationstart="syncOrientation" @animationend="syncOrientation" @animationcancel="syncOrientation"
        :style="{
            offsetPath: `path('${curveData.svgPath}')`,
            offsetDistance: '0%',
            offsetAnchor: '0px 0px',
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


  & > path {
    transition: all var(--animation-duration) ease-out;
    stroke-dasharray: var(--full-length);
    stroke-dashoffset: var(--full-length);

    &:not(.animate) {
      stroke-dashoffset: 0;
    }
  }

  &.dashed > path {
    stroke-dasharray: var(--dash-length) var(--dash-gap);
  }

  &.animate > path {
    animation: svg-arrow-stroke var(--animation-duration) linear forwards;
  }

  &.animate .arrow-head {
    animation: moveAlongPath var(--animation-duration) linear normal;
  }

  /* Один прогресс и одинаковый timing для маски линии и движущегося наконечника.
     Маска постепенно открывает и сплошной, и пунктирный штрих. */
  &.controlled-reveal > path {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    transition: none;
  }

  &.controlled-reveal.dashed > path {
    stroke-dasharray: var(--dash-length) var(--dash-gap);
  }

  &.controlled-reveal .arrow-reveal {
    stroke-width: calc(var(--arrow-width, 2px) + 2px);
    stroke-dasharray: 1;
    transition: stroke-dashoffset var(--animation-duration) var(--arrow-ease, ease-out) var(--animation-delay, 0s);
  }

  &.controlled-reveal .arrow-head {
    transition: offset-distance var(--animation-duration) var(--arrow-ease, ease-out) var(--animation-delay, 0s);
  }
}

.arrow-head,
.arrow-tail {
  transition: offset-distance var(--animation-duration) ease-out;
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
