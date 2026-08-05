<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { ref } from 'vue'
import { useNav } from '@slidev/client'
import { useDi } from '../../module/VueServices/useDiContainer'
import { MEMORY_SERVICE_KEY } from '../../module/CoordHelper/MemoryService'
import type { ObjectElement } from '../../module/CoordHelper/ObjectService'

const memoryService = useDi().inject(MEMORY_SERVICE_KEY)
const { clicks, currentSlideRoute } = useNav()

const applyStatus = ref('')

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

const draggableElement = ref()
const { style } = useDraggable(draggableElement, { initialValue: { x: 0, y: 0 } })

function clearSavedPositions() {
  memoryService.data.savedPositions = []
  memoryService.data.savedChanges = new Map()
}
function deleteSavedPosition(position: { x: number, y: number }) {
  memoryService.data.savedPositions = memoryService.data.savedPositions.filter(p => p !== position)
}

function editNameOf(obj: ObjectElement) {
  const fromData = obj.element.dataset.editname
  if (fromData)
    return fromData
  const marker = [...obj.element.classList].find(c => c.startsWith('editname-'))
  return marker ? marker.slice('editname-'.length) : ''
}

async function applyChange(obj: ObjectElement, change: { x: number, y: number, width: number, height: number }, mode: 'pos' | 'sp' = 'pos') {
  const editName = editNameOf(obj)
  if (!editName) {
    applyStatus.value = 'нет editName (v-bind="t.*", :class="t.*", или data-editname)'
    return
  }

  const slide = currentSlideRoute.value.meta?.slide as { filepath?: string } | undefined
  const filePath = slide?.filepath
  if (!filePath) {
    applyStatus.value = 'нет filepath у слайда'
    return
  }

  const pos = `${Math.round(change.x)}_${Math.round(change.y)}`
  const size = `${Math.round(change.width)}_${Math.round(change.height)}`

  applyStatus.value = `пишем ${editName}…`
  try {
    const res = await fetch('/__slides_parts_api/patch-edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filePath,
        editName,
        clicks: clicks.value,
        pos,
        size: mode === 'sp' ? size : undefined,
        mode,
      }),
    })
    const data = await res.json()
    if (!data.success) {
      applyStatus.value = data.error || 'ошибка'
      return
    }
    applyStatus.value = `ok ${data.strategy}: ${data.detail || editName}`
  }
  catch (e) {
    applyStatus.value = String(e)
  }
}
</script>
<template>
  <div 
    ref="draggableElement" 
    class="fixed bg-black/40 p-2 rounded-xl h-auto w-auto z-100 max-w-[420px] flex flex-col gap-2 font-mono text-xs select-none" 
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
      v-for="[obj, change] in memoryService.data.savedChanges"
      :key="editNameOf(obj) + ':' + change.x + ':' + change.y"
      class="flex flex-wrap bg-blue-500/20 rounded-full overflow-hidden items-center"
    >
      <div
        v-if="editNameOf(obj)"
        class="record opacity-80"
        :title="editNameOf(obj)"
      >{{ editNameOf(obj) }}</div>
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
      <div
        class="record bg-green-500/30 hover:bg-green-500/50"
        title="Записать pos в markdown (timeline key или data-editname)"
        @click="applyChange(obj, change, 'pos')"
      > apply </div>
      <div
        class="record bg-green-500/20 hover:bg-green-500/40"
        title="Записать sp в markdown"
        @click="applyChange(obj, change, 'sp')"
      > apply-sp </div>
    </div>
    <div v-if="applyStatus" class="text-[10px] opacity-80 px-1 max-w-full break-all">
      {{ applyStatus }}
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
