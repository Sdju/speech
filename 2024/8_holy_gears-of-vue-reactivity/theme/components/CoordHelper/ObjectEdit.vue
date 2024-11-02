<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { 
  CorrectSignal, 
  createChainedSignal, 
  getObjectElement, 
  OBJECT_SERVICE_KEY 
} from './ObjectService'
import { useDi } from '../VueServices/useDiContainer'
import { MOUSE_SERVICE_KEY } from './MouseService';
import { SLIDE_SERVICE_KEY } from './SlideService';
import { MEMORY_SERVICE_KEY } from './MemoryService';

const di = useDi()
const objectService = di.inject(OBJECT_SERVICE_KEY)
const mouseService = di.inject(MOUSE_SERVICE_KEY)
const slideService = di.inject(SLIDE_SERVICE_KEY)
const memoryService = di.inject(MEMORY_SERVICE_KEY)

memoryService.data.savedChanges = new Map()

const figureRect = computed(() => {
  return dragRect.value ?? (objectService.hovered ?? objectService.active)?.getBoundingClientRect()
})
const rectStyle = computed(() => {
  if (!figureRect.value) return {}
  return {
    left: `${figureRect.value.left}px`,
    top: `${figureRect.value.top}px`,
    width: `${figureRect.value.width}px`,
    height: `${figureRect.value.height}px`
  }
})

let dragSignal: CorrectSignal | null = null
let activeSignal: CorrectSignal | null = null
let dragOffset: {x: number, y: number} | null = null
const dragRect = ref<DOMRect>()
watch(() => getObjectElement(objectService.active), (obj, oldObj) => {
  if (oldObj) {
    activeSignal?.abort()
    activeSignal = null
  }

  if (obj) {
    activeSignal = createChainedSignal(obj.signal)

    if (!obj._registered) {
      obj._registered = true
      obj.signal.addEventListener('abort', () => {
        memoryService.data.savedChanges.delete(obj)
      })
    }

    obj.addListener('mousedown', (e: MouseEvent) => {
      e.stopImmediatePropagation()

      dragSignal = createChainedSignal(activeSignal!)
      const rect = obj.element.getBoundingClientRect()
      const diffX = (e.clientX - rect.left - rect.width / 2) / slideService.scale
      const diffY = (e.clientY - rect.top - rect.height / 2) / slideService.scale
      
      dragOffset = {x: diffX, y: diffY}

      obj.element.style.transition = 'none'
      dragSignal.addEventListener('abort', () => {
        obj.element.style.removeProperty('transition')
      })

      window.addEventListener('mousemove', (e) => {
        obj.locked = true
        const pos = mouseService.globalToLocal({x: e.clientX, y: e.clientY})
        dragRect.value = obj.element.getBoundingClientRect()
        const coords = {x: pos.x - dragOffset!.x, y: pos.y - dragOffset!.y}
        obj.element.style.left = `${coords.x}px`
        obj.element.style.top = `${coords.y}px`
        memoryService.data.savedChanges.set(obj, coords)
      }, { signal: dragSignal })

      window.addEventListener('mouseup', (e) => {
        dragSignal?.abort()
        dragSignal = null
        setTimeout(() => {
          obj.locked = false
        }, 100)
      }, { signal: dragSignal })
    }, activeSignal)
  }
})
</script>

<template>
  <div 
    v-if="objectService.hovered"
    class="fixed pointer-events-none border-2 z-[999] border-blue-500/50"
    :style="rectStyle"
  />
  <div 
    v-if="objectService.active"
    class="fixed pointer-events-none border-2 z-[999] border-green-500"
    :style="rectStyle"
  />
</template>
