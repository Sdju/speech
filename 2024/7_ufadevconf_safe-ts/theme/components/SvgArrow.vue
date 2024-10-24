<script setup lang="ts">

const { 
    start, 
    end, 
    power = 0.5,
    endArrow = true,
    startArrow = false
} = defineProps<{
    start: { x: number, y: number }
    end: { x: number, y: number },
    power?: number,
    endArrow?: boolean,
    startArrow?: boolean,
}>()

function getCurve (start, end, options) {
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

function getCurveSVGPath (bezier) {
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
}, t) {
  /**
   * Получить угол точки на кривой для заданного t,
   * где t - число от 0 до 1.
   *
   * 0 - начальная точка, 1 - конечная точка.
   */
  const t1 = 1 - t
  const t2 = t * t
  
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

const { curve, svgPath, endAngle, startAngle } = getAllCurveData(start, end, { heightRate: -power })
</script>

<template>
    <path :d="svgPath" fill="none" />
    <polygon
        v-if="endArrow"
        points="-12,-6 0,0, -12,6"
        :transform="`translate(${curve.end.x},${curve.end.y}) rotate(${endAngle})`"
    />
    <polygon
        v-if="startArrow"
        points="12,-6 0,0, 12,6"
        :transform="`translate(${curve.start.x},${curve.start.y}) rotate(${startAngle})`"
    />
</template>
