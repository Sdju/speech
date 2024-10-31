<script setup lang="ts">
import { useDi } from '../VueServices/useDiContainer'
import { MOUSE_SERVICE_KEY } from './MouseService'
import { MEMORY_SERVICE_KEY } from './MemoryService'

const di = useDi()
const mouse = di.inject(MOUSE_SERVICE_KEY)
const memory = di.inject(MEMORY_SERVICE_KEY)
</script>

<template>
    <div 
      v-if="memory.selectSize" 
      ref="selectionBox" 
      class="fixed b-[1px] border-dashed border-white/50 pointer-events-none" 
      :style="{
        left: `${Math.min(memory.selectSize.startX, mouse.globalX)}px`,
        top: `${Math.min(memory.selectSize.startY, mouse.globalY)}px`,
        width: `${Math.abs(mouse.globalX - memory.selectSize.startX)}px`,
        height: `${Math.abs(mouse.globalY - memory.selectSize.startY)}px`
      }"
    />
</template>