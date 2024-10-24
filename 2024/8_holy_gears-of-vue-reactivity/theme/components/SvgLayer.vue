<script setup lang="ts">
import { ref, provide, onMounted, computed } from 'vue'
const svg = ref<SVGSVGElement>()

const mousePosition = ref({ x: 0, y: 0, xPercent: 0, yPercent: 0 })
const showTooltip = ref(false)
const tooltipPosition = ref({ x: 0, y: 0 })

function updatePosition(e: MouseEvent) {
  const svgElement = svg.value!
  
  // Get the SVG's CTM (Current Transform Matrix)
  const ctm = svgElement.getScreenCTM()

  // Create a point in screen coordinates
  const point = svgElement.createSVGPoint()
  point.x = e.clientX
  point.y = e.clientY

  // Convert screen coordinates to SVG coordinates
  const svgPoint = point.matrixTransform(ctm.inverse())
  
  mousePosition.value = {
    x: svgPoint.x,
    y: svgPoint.y,
    xPercent: Math.round((svgPoint.x / 960) * 100), // Using viewBox width
    yPercent: Math.round((svgPoint.y / 552) * 100)  // Using viewBox height
  }
  
  tooltipPosition.value = {
    x: svgPoint.x + 10,
    y: svgPoint.y + 10
  }
}

const sizes = computed(() => ({
  width: svg.value?.clientWidth || 960,
  height: svg.value?.clientHeight || 552
}))
provide('sizes', sizes)

onMounted(() => {
  const svgElement = svg.value!
  svgElement.addEventListener('mousemove', updatePosition)
  svgElement.addEventListener('mouseenter', () => showTooltip.value = true)
  svgElement.addEventListener('mouseleave', () => showTooltip.value = false)
})
</script>

<template>
    <div class="absolute w-[960px] h-[552px] top-0 left-0">
        <div class="absolute bg-[rgba(0,0,0,0.8)] text-white p-2 rounded-md text-sm pointer-events-none z-[1000]"
            :style="{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`
            }">
            x: {{ mousePosition.x.toFixed(0) }}px ({{ mousePosition.xPercent }}%)<br/>
            y: {{ mousePosition.y.toFixed(0) }}px ({{ mousePosition.yPercent }}%)
        </div>
        <svg
            ref="svg"
            viewBox="0 0 960 552"
            stroke="currentColor"
            fill="currentColor"
            class="absolute top-0 left-0 w-full h-full"
        >
            <slot />
        </svg>
    </div>
</template>
