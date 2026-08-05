<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { 
  CorrectSignal, 
  createChainedSignal, 
  getObjectElement, 
  OBJECT_SERVICE_KEY 
} from '../../module/CoordHelper/ObjectService'
import { useDi } from '../../module/VueServices/useDiContainer'
import { MOUSE_SERVICE_KEY } from '../../module/CoordHelper/MouseService'
import { SLIDE_SERVICE_KEY } from '../../module/CoordHelper/SlideService'
import { MEMORY_SERVICE_KEY } from '../../module/CoordHelper/MemoryService'

const di = useDi()
const objectService = di.inject(OBJECT_SERVICE_KEY)
const mouseService = di.inject(MOUSE_SERVICE_KEY)
const slideService = di.inject(SLIDE_SERVICE_KEY)
const memoryService = di.inject(MEMORY_SERVICE_KEY)

memoryService.data.savedChanges = new Map()

const arrowKeys = new Set(['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'])

const figureRect = computed(() => {
  // Re-read viewport box when slide scale/offset changes (side panels, resize).
  void slideService.revision
  return dragRect.value ?? objectService.active?.getBoundingClientRect() ?? null
})

const hoveredRectStyle = computed(() => {
  void slideService.revision
  const rect = objectService.hovered?.getBoundingClientRect()
  if (!rect)
    return null

  return {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  }
})

const rectStyle = computed(() => {
  if (!figureRect.value)
    return {}
  return {
    left: `${figureRect.value.left}px`,
    top: `${figureRect.value.top}px`,
    width: `${figureRect.value.width}px`,
    height: `${figureRect.value.height}px`,
  }
})

function localSizeFromBounds(bounds: DOMRect) {
  return {
    width: bounds.width / slideService.scale,
    height: bounds.height / slideService.scale,
  }
}

function localCenterFromElement(el: HTMLElement, bounds: DOMRect) {
  return mouseService.globalToElementLocal(el, {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2,
  })
}

let dragSignal: CorrectSignal | null = null
let activeSignal: CorrectSignal | null = null
let dragOffset: { x: number, y: number } | null = null
const dragRect = ref<DOMRect>()

watch(() => getObjectElement(objectService.active), (obj, oldObj) => {
  if (oldObj) {
    activeSignal?.abort()
    activeSignal = null
  }

  if (obj) {
    activeSignal = createChainedSignal(obj.signal)

    if (!(obj as any)._registered) {
      ;(obj as any)._registered = true
      obj.signal.addEventListener('abort', () => {
        memoryService.data.savedChanges.delete(obj)
      })
    }

    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        objectService.active = null
        return
      }

      if (!arrowKeys.has(e.key))
        return

      const bounds = obj.element.getBoundingClientRect()
      const center = localCenterFromElement(obj.element, bounds)
      const size = localSizeFromBounds(bounds)
      const power = e.shiftKey ? 10 : e.altKey ? 1 : 5

      if (e.key === 'ArrowDown')
        center.y += power
      else if (e.key === 'ArrowUp')
        center.y -= power
      else if (e.key === 'ArrowRight')
        center.x += power
      else if (e.key === 'ArrowLeft')
        center.x -= power

      obj.element.style.transition = 'none'
      obj.element.style.left = `${center.x}px`
      obj.element.style.top = `${center.y}px`
      dragRect.value = obj.element.getBoundingClientRect()
      memoryService.data.savedChanges.set(obj, {
        x: center.x,
        y: center.y,
        width: size.width,
        height: size.height,
      })
      e.stopImmediatePropagation()
    }, { signal: activeSignal, capture: true })

    document.body.addEventListener('keyup', (e: KeyboardEvent) => {
      if (arrowKeys.has(e.key))
        obj.element.style.removeProperty('transition')
    }, { signal: activeSignal, capture: true })

    obj.addListener('mousedown', (e: MouseEvent) => {
      e.stopImmediatePropagation()
      slideService.updateSlide()

      dragSignal = createChainedSignal(activeSignal!)
      const bounds = obj.element.getBoundingClientRect()
      const diffX = (e.clientX - bounds.left - bounds.width / 2) / slideService.scale
      const diffY = (e.clientY - bounds.top - bounds.height / 2) / slideService.scale

      dragOffset = { x: diffX, y: diffY }

      obj.element.style.transition = 'none'
      dragSignal.addEventListener('abort', () => {
        obj.element.style.removeProperty('transition')
      })

      window.addEventListener('mousemove', (e) => {
        obj.locked = true
        const pos = mouseService.globalToElementLocal(obj.element, { x: e.clientX, y: e.clientY })
        const size = localSizeFromBounds(obj.element.getBoundingClientRect())
        const next = {
          x: pos.x - dragOffset!.x,
          y: pos.y - dragOffset!.y,
          width: size.width,
          height: size.height,
        }
        obj.element.style.left = `${next.x}px`
        obj.element.style.top = `${next.y}px`
        // Capture AFTER style write so the overlay does not lag one frame.
        dragRect.value = obj.element.getBoundingClientRect()
        memoryService.data.savedChanges.set(obj, next)
      }, { signal: dragSignal })

      window.addEventListener('mouseup', () => {
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
