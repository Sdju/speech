<script setup lang="ts">
import { computed, watch } from 'vue'
import { useDi } from '../../module/VueServices/useDiContainer'
import { MOUSE_SERVICE_KEY } from '../../module/CoordHelper/MouseService'
import { MEMORY_SERVICE_KEY } from '../../module/CoordHelper/MemoryService'
import { useMagicKeys } from '@vueuse/core'
const di = useDi()
const mouse = di.inject(MOUSE_SERVICE_KEY)
const memory = di.inject(MEMORY_SERVICE_KEY)

memory.data.savedPositions ??= []

const boxSize = computed(() => {
  if (!memory.data.selectSize) return null
  return {
    width: Math.round(memory.data.selectSize.width) || 0,
    height: Math.round(memory.data.selectSize.height) || 0,
    widthPercent: Math.round(memory.data.selectSize.widthPercent * 100) / 100 || 0,
    heightPercent: Math.round(memory.data.selectSize.heightPercent * 100) / 100 || 0,
  }
})

const isSizeMode = computed(() => {
  if (!boxSize.value) return false
  return boxSize.value.width !== 0 || boxSize.value.height !== 0
})

const { alt_q } = useMagicKeys()
watch(alt_q, (v) => {
  if (!v) return
  memory.data.savedPositions.push({
    x: mouse.globalX,
    y: mouse.globalY,
    xPercent: mouse.localXPercent,
    yPercent: mouse.localYPercent
  })
})
</script>

<template>
    <div
      v-if="mouse.inSlide"
      class="absolute bg-[rgba(0,0,0,0.8)] text-white p-2 rounded-md text-sm pointer-events-none z-[1000] font-mono"
      :style="{
          left: `${mouse.globalX + 10}px`,
          top: `${mouse.globalY + 10}px`
      }"
    >
      <template v-if="isSizeMode">
        width: {{ boxSize!.width }}px ({{ boxSize!.widthPercent }}%)
        <br/>
        height: {{ boxSize!.height }}px ({{ boxSize!.heightPercent }}%)
      </template>
      <template v-else>
        px {{ Math.round(mouse.localX) }} {{ Math.round(mouse.localY) }}
        <br/>
        % {{ mouse.localXPercent }} {{ mouse.localYPercent }}
      </template>
    </div>
</template>