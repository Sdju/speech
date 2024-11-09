<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { ref } from 'vue'
import { useDi } from '../VueServices/useDiContainer'
import { MEMORY_SERVICE_KEY } from './MemoryService'

const memoryService = useDi().inject(MEMORY_SERVICE_KEY)

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

const draggableElement = ref()
const { style } = useDraggable(draggableElement, { initialValue: { x: 0, y: 0 } })

function clearSavedPositions() {
  memoryService.data.savedPositions = []
}
function deleteSavedPosition(position: { x: number, y: number }) {
  memoryService.data.savedPositions = memoryService.data.savedPositions.filter(p => p !== position)
}
</script>
<template>
  <div 
    ref="draggableElement" 
    class="fixed bg-black/40 p-2 rounded-xl h-auto w-auto z-100 max-w-[400px] flex flex-col gap-2 font-mono text-xs select-none" 
    :style="style"
  >
    <div 
      v-for="position in memoryService.data.savedPositions" 
      :key="position.x + ':' + position.y"
      class="flex flex-wrap bg-blue-500/20 rounded-full overflow-hidden"
    >
      <div 
        class="record" 
        @click="copyToClipboard(`${position.x.toFixed(0)}`)"
      > x:{{ position.x.toFixed(0) }}</div>
      <div
        class="record" 
        @click="copyToClipboard(`${position.y.toFixed(0)}`)"
      > y:{{ position.y.toFixed(0) }}</div>
      <div 
        class="record" 
        @click="copyToClipboard(`${position.xPercent}%`)"
      > x%:{{ position.xPercent }}</div>
      <div 
        class="record" 
        @click="copyToClipboard(`${position.yPercent}%`)"
      > y%:{{ position.yPercent }}</div>

      <div
        class="record" 
        @click="deleteSavedPosition(position)"
      >
        <MdiTrashCanOutline />
      </div>
    </div>
    <div 
      v-for="change in memoryService.data.savedChanges.values()" 
      :key="change.x + ':' + change.y"
      class="flex flex-wrap bg-blue-500/20 rounded-full overflow-hidden"
    >
      <div
        class="record"
        @click="copyToClipboard(`${change.x.toFixed(0)}`)"
      >x:{{ change.x.toFixed(0) }}</div>
      <div 
        class="record"
        @click="copyToClipboard(`${change.y.toFixed(0)}`)"
      >y:{{ change.y.toFixed(0) }}</div>
      <div 
        class="record"
        @click="copyToClipboard(`size-${change.width.toFixed(0)}_${change.height.toFixed(0)}`)"
      > size </div>
      <div 
        class="record"
        @click="copyToClipboard(`pos-${change.x.toFixed(0)}_${change.y.toFixed(0)}`)"
      > pos </div>
      <div 
        class="record"
        @click="copyToClipboard(`sp-${change.x.toFixed(0)}_${change.y.toFixed(0)}_${change.width.toFixed(0)}_${change.height.toFixed(0)}`)"
      > sp </div>
    </div>
    <div
      class="bg-blue-500/30 active:bg-blue-500 px-2 py-1 rounded-full cursor-pointer duration-100 self-center" 
      @click="clearSavedPositions()"
    >
      <MdiTrashCanOutline />
    </div>
  </div>
</template>

<style>
.record {
  @apply active:bg-blue-500 hover:bg-blue-500/30 px-2 py-1 cursor-pointer duration-200;

  &:not(:last-child) {
    @apply border-r border-white/10;
  }
}
</style>