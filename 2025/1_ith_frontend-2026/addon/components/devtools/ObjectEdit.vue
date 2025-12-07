<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { 
  CorrectSignal, 
  createChainedSignal, 
  getObjectElement, 
  OBJECT_SERVICE_KEY 
} from '../../module/CoordHelper/ObjectService'
import { useDi } from '../../module/VueServices/useDiContainer'
import { MOUSE_SERVICE_KEY } from '../../module/CoordHelper/MouseService';
import { SLIDE_SERVICE_KEY } from '../../module/CoordHelper/SlideService';
import { MEMORY_SERVICE_KEY } from '../../module/CoordHelper/MemoryService';

const di = useDi()
const objectService = di.inject(OBJECT_SERVICE_KEY)
const mouseService = di.inject(MOUSE_SERVICE_KEY)
const slideService = di.inject(SLIDE_SERVICE_KEY)
const memoryService = di.inject(MEMORY_SERVICE_KEY)

memoryService.data.savedChanges = new Map()

const arrowKeys = new Set(['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'])

const figureRect = computed(() => {
  return dragRect.value ?? objectService.active?.getBoundingClientRect()
})

const hoveredRectStyle = computed(() => {
  const rect = objectService.hovered?.getBoundingClientRect()
  if (!rect) return null
  
  return {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`
  }
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

    document.body.addEventListener('keydown', (e) => {
      console.log(e.key)
      if (e.key === 'Escape') {
        objectService.active = null
        return
      }

      if (!arrowKeys.has(e.key)) {
        return
      }

      dragRect.value = obj.element.getBoundingClientRect()
      const rect = mouseService.globalToLocal({x: dragRect.value.left, y: dragRect.value.top})
      rect.width = dragRect.value!.width / slideService.scale
      rect.height = dragRect.value!.height / slideService.scale

      let power = e.shiftKey ? 10 : e.altKey ? 1 : 5

      if (e.key === 'ArrowDown') {
        rect.y += power
      } else if (e.key === 'ArrowUp') {
        rect.y -= power
      } else if (e.key === 'ArrowRight') {
        rect.x += power
      } else if (e.key === 'ArrowLeft') {
        rect.x -= power
      }
      const left = rect.x + rect.width / 2
      const top = rect.y + rect.height / 2
      obj.element.style.transition = 'none'
      obj.element.style.left = `${left}px`
      obj.element.style.top = `${top}px`
      console.log({ left: obj.element.style.left, top: obj.element.style.top })
      dragRect.value = obj.element.getBoundingClientRect()
      memoryService.data.savedChanges.set(obj, {
        x: left,
        y: top,
        width: rect.width / slideService.scale,
        height: rect.height / slideService.scale
      })
      e.stopImmediatePropagation()
    }, { signal: activeSignal, capture: true })

    document.body.addEventListener('keyup', (e: KeyboardEvent) => {
      if (arrowKeys.has(e.key)) {
        obj.element.style.removeProperty('transition')
      }
    }, { signal: activeSignal, capture: true })

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
        const rect = {
          x: pos.x - dragOffset!.x, 
          y: pos.y - dragOffset!.y,
          width: dragRect.value!.width / slideService.scale,
          height: dragRect.value!.height / slideService.scale
        }
        obj.element.style.left = `${rect.x}px`
        obj.element.style.top = `${rect.y}px`
        memoryService.data.savedChanges.set(obj, rect)
      }, { signal: dragSignal })

      window.addEventListener('mouseup', (e) => {
        dragSignal?.abort()
        dragSignal = null
        dragRect.value = undefined
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
    v-if="hoveredRectStyle && objectService.active !== objectService.hovered"
    class="fixed pointer-events-none border-2 z-[999] border-blue-500"
    :style="hoveredRectStyle"
  />
  <div 
    v-if="objectService.active"
    class="fixed pointer-events-none border-2 z-[999] border-green-500"
    :style="rectStyle"
  />
</template>
