<script setup lang="ts">
import { useDi } from '../VueServices/useDiContainer'
import { MOUSE_SERVICE_KEY } from './MouseService'
import { MEMORY_SERVICE_KEY } from './MemoryService'

const di = useDi()
const mouse = di.inject(MOUSE_SERVICE_KEY)
const memory = di.inject(MEMORY_SERVICE_KEY)
</script>

<template>
    <div class="absolute bg-[rgba(0,0,0,0.8)] text-white p-2 rounded-md text-sm pointer-events-none z-[1000] font-mono"
      :style="{
          left: `${mouse.globalX + 10}px`,
          top: `${mouse.globalY + 10}px`
      }">
      
      <template v-if="memory.data.selectSize">
        width: {{ memory.data.selectSize.width }}px ({{ memory.data.selectSize.widthPercent }}%)
        <br/>
        height: {{ memory.data.selectSize.height }}px ({{ memory.data.selectSize.heightPercent }}%)
      </template>
      <template v-else>
        px {{ Math.round(mouse.localX) }} {{ Math.round(mouse.localY) }}
        <br/>
        % {{ mouse.localXPercent }} {{ mouse.localYPercent }}
      </template>
    </div>
</template>