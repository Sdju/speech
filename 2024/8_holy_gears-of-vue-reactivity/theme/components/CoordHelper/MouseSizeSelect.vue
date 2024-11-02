<script setup lang="ts">
import { watch } from 'vue'
import { useDi } from '../VueServices/useDiContainer'
import { MOUSE_SERVICE_KEY } from './MouseService'
import { MEMORY_SERVICE_KEY } from './MemoryService'
import { SLIDE_SERVICE_KEY } from './SlideService'
const di = useDi()
const mouse = di.inject(MOUSE_SERVICE_KEY)
const memory = di.inject(MEMORY_SERVICE_KEY)
const slide = di.inject(SLIDE_SERVICE_KEY)

watch(() => mouse.isDown, (isDown) => {
  if (isDown) {
    memory.data.selectSize = {
      startX: mouse.globalX,
      startY: mouse.globalY
    }
  } else {
    memory.data.selectSize = null
  }
})

watch(() => [mouse.globalX, mouse.globalY], ([x, y]) => {
  if (memory.data.selectSize) {
    memory.data.selectSize.width = Math.abs(x - memory.data.selectSize.startX) / slide.scale
    memory.data.selectSize.height = Math.abs(y - memory.data.selectSize.startY) / slide.scale
    memory.data.selectSize.widthPercent = Math.round(memory.data.selectSize.width / (slide.width ?? 0) * 100_00) / 100
    memory.data.selectSize.heightPercent = Math.round(memory.data.selectSize.height / (slide.height ?? 0) * 100_00) / 100
  }
})
</script>

<template>
    <div 
      v-if="memory.data.selectSize" 
      ref="selectionBox" 
      class="fixed b-[1px] border-dashed border-white/50 pointer-events-none" 
      :style="{
        left: `${Math.min(memory.data.selectSize.startX, mouse.globalX)}px`,
        top: `${Math.min(memory.data.selectSize.startY, mouse.globalY)}px`,
        width: `${Math.abs(mouse.globalX - memory.data.selectSize.startX)}px`,
        height: `${Math.abs(mouse.globalY - memory.data.selectSize.startY)}px`
      }"
    />
</template>