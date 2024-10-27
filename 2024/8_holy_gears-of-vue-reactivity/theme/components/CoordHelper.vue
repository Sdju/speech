<script setup lang="tsx">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useMagicKeys, useDraggable } from '@vueuse/core'

const mousePosition = ref({ x: 0, y: 0, xPercent: 0, yPercent: 0 })
const isMouseDown = ref(false)
const startPosition = ref({ x: 0, y: 0 })
const dimensions = ref({ 
  width: 0, 
  height: 0,
  widthPercent: 0,
  heightPercent: 0 
})
const showTooltip = ref(false)
const tooltipPosition = ref({ x: 0, y: 0 })

const selectionBox = ref<HTMLDivElement>()

// Add new refs
const hoveredFigure = ref<HTMLElement | null>(null)
const figureRect = ref<DOMRect | null>(null)

// Add new refs for figures tracking
const figures = ref<HTMLElement[]>([])
let scanInterval: number | null = null

// Function to scan for figures
function scanForFigures() {
  const element = document.querySelector('#slide-content')
  if (element) {
    figures.value = Array.from(element.getElementsByClassName('figure')) as HTMLElement[]
  }
}

// Update hover handler to use tracked figures
function handleFigureHover(e: MouseEvent) {
  const target = e.target as HTMLElement
  const figure = target.closest('.figure')
  
  if (figure && figures.value.includes(figure as HTMLElement)) {
    if (!editingFigure.value) {
      hoveredFigure.value = figure as HTMLElement
      figureRect.value = figure.getBoundingClientRect()
    }
  } else if (!editingFigure.value) {
    hoveredFigure.value = null
    figureRect.value = null
  }
}

function updatePosition(e: MouseEvent) {
  const element = document.querySelector('#slide-content')!
  const rect = element.getBoundingClientRect()
  const scale = rect.width / element.clientWidth
  const x = (e.clientX - rect.left) / scale
  const y = (e.clientY - rect.top) / scale

  if (isMouseDown.value) {
    const width = Math.abs(x - startPosition.value.x / scale)
    const height = Math.abs(y - startPosition.value.y / scale)
    
    dimensions.value = {
      width,
      height,
      widthPercent: Math.round((width / element.clientWidth) * 10000) / 100,
      heightPercent: Math.round((height / element.clientHeight) * 10000) / 100
    }
  }

  mousePosition.value = {
    x,
    y,
    xPercent: Math.round((x / element.clientWidth) * 10000) / 100,
    yPercent: Math.round((y / element.clientHeight) * 10000) / 100
  }
  
  tooltipPosition.value = {
    x: e.clientX,
    y: e.clientY
  }
}

onMounted(() => {
  const element = document.querySelector('#slide-content') as HTMLDivElement
  element?.addEventListener('mousemove', updatePosition)
  element?.addEventListener('mouseenter', () => showTooltip.value = true)
  element?.addEventListener('mouseleave', () => showTooltip.value = false)
  element?.addEventListener('mousedown', (e: MouseEvent) => {
    isMouseDown.value = true

    startPosition.value = {
      x: e.clientX,
      y: e.clientY
    }
  })
  element?.addEventListener('mouseup', () => {
    isMouseDown.value = false
  })

  element?.addEventListener('click', handleFigureClick)
  element?.addEventListener('mousedown', handleDragStart)
  element?.addEventListener('mousemove', handleDrag)
  element?.addEventListener('mouseup', handleDragEnd)
  
  // Add figure hover tracking
  element?.addEventListener('mousemove', handleFigureHover)
  
  // Initial scan
  scanForFigures()
  
  // Set up periodic scanning (every 2 seconds)
  scanInterval = window.setInterval(scanForFigures, 2000)
})

const savedPositions = ref<{ x: number, y: number, xPercent: number, yPercent: number }[]>([])

const { alt_q } = useMagicKeys()
watch(alt_q, (v) => {
  if (v) {
    savedPositions.value.push({
      x: mousePosition.value.x,
      y: mousePosition.value.y,
      xPercent: mousePosition.value.xPercent,
      yPercent: mousePosition.value.yPercent
    })
  }
})

const draggableElement = ref<HTMLElement>()
const { style } = useDraggable(draggableElement, { initialValue: { x: 0, y: 0 } })

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

// Очистка при размонтировании компонента
onUnmounted(() => {
  const selectionBox = document.getElementById('selection-box')
  selectionBox?.remove()
  
  const element = document.querySelector('#slide-content') as HTMLDivElement
  element?.removeEventListener('mousemove', handleFigureHover)
  
  // Clear scan interval
  if (scanInterval) {
    clearInterval(scanInterval)
  }

  element?.removeEventListener('click', handleFigureClick)
  element?.removeEventListener('mousedown', handleDragStart)
  element?.removeEventListener('mousemove', handleDrag)
  element?.removeEventListener('mouseup', handleDragEnd)
})

// Add editing mode refs
const editingFigure = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const savedChanges = ref<Map<HTMLElement, { x: number, y: number, width: number, height: number }>>(new Map())

// Add click handler for figures
function handleFigureClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  const figure = target.closest('.figure')
  
  if (figure && figures.value.includes(figure as HTMLElement)) {
    if (editingFigure.value === figure) {
      // Exit edit mode on second click of the same element
      editingFigure.value = null
    } else {
      // Enter edit mode
      editingFigure.value = figure as HTMLElement
      figureRect.value = figure.getBoundingClientRect()
    }
  }
}

function handleDragStart(e: MouseEvent) {
  if (!editingFigure.value) return
  
  const slideElement = document.querySelector('#slide-content')!
  const slideRect = slideElement.getBoundingClientRect()
  const scale = slideRect.width / slideElement.clientWidth
  
  isDragging.value = true
  const rect = editingFigure.value.getBoundingClientRect()
  dragOffset.value = {
    x: (e.clientX - rect.left) / scale - editingFigure.value.clientWidth / 2,
    y: (e.clientY - rect.top) / scale - editingFigure.value.clientHeight / 2,
  }
  console.log(editingFigure.value)
  editingFigure.value.style.transition = 'none'
}

function handleDrag(e: MouseEvent) {
  if (!isDragging.value || !editingFigure.value) return
  
  const element = document.querySelector('#slide-content')!
  const rect = element.getBoundingClientRect()
  const scale = rect.width / element.clientWidth

  editingFigure.value.style.left = `${(e.clientX - dragOffset.value.x - rect.left) / scale}px`
  editingFigure.value.style.top = `${(e.clientY - dragOffset.value.y - rect.top) / scale}px`
  figureRect.value = editingFigure.value.getBoundingClientRect()
}

function handleDragEnd() {
  if (!editingFigure.value) return
  editingFigure.value.style.removeProperty('transition')
  savedChanges.value.set(editingFigure.value, {
    x: parseFloat(editingFigure.value.style.left),
    y: parseFloat(editingFigure.value.style.top),
    width: editingFigure.value.clientWidth,
    height: editingFigure.value.clientHeight
  })
  isDragging.value = false
}
</script>

<template>
  <Teleport to="body">
    <div class="absolute bg-[rgba(0,0,0,0.8)] text-white p-2 rounded-md text-sm pointer-events-none z-[1000] font-mono"
      :style="{
          left: `${tooltipPosition.x + 10}px`,
          top: `${tooltipPosition.y + 10}px`
      }">
      <template v-if="!isMouseDown">
        px {{ mousePosition.x.toFixed(0) }} {{ mousePosition.y.toFixed(0) }}<br/>
        % {{ mousePosition.xPercent }} {{ mousePosition.yPercent }}
      </template>
      <template v-else>
        width: {{ dimensions.width.toFixed(0) }}px ({{ dimensions.widthPercent }}%)<br/>
        height: {{ dimensions.height.toFixed(0) }}px ({{ dimensions.heightPercent }}%)
      </template>
    </div>

    <div 
      v-if="isMouseDown && !editingFigure" 
      ref="selectionBox" 
      class="fixed b-[1px] border-dashed border-white/50 pointer-events-none" 
      :style="{
        left: `${Math.min(startPosition.x, tooltipPosition.x)}px`,
        top: `${Math.min(startPosition.y, tooltipPosition.y)}px`,
        width: `${Math.abs(tooltipPosition.x - startPosition.x)}px`,
        height: `${Math.abs(tooltipPosition.y - startPosition.y)}px`
      }"
    />

    <div 
      ref="draggableElement" 
      class="fixed bg-black/40 p-2 rounded-xl h-auto w-auto z-100 max-w-[400px] flex flex-col gap-2 font-mono text-xs select-none" 
      :style="style"
    >
      <div 
        v-for="position in savedPositions" 
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
          @click="savedPositions = savedPositions.filter(p => p !== position)"
        >
          <MdiTrashCanOutline />
        </div>
      </div>
      <div 
        v-for="change in savedChanges.values()" 
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
        @click="savedPositions = []"
      >
        <MdiTrashCanOutline />
      </div>
    </div>
    
    <div 
      v-if="(hoveredFigure || editingFigure) && figureRect"
      class="fixed pointer-events-none border-2 z-[999]"
      :class="{
        'border-blue-500/50': !editingFigure,
        'border-green-500': editingFigure
      }"
      :style="{
        left: `${figureRect.left}px`,
        top: `${figureRect.top}px`,
        width: `${figureRect.width}px`,
        height: `${figureRect.height}px`
      }"
    />
  </Teleport>
</template>
<style>
.record {
  @apply active:bg-blue-500 hover:bg-blue-500/30 px-2 py-1 cursor-pointer duration-100;

  &:not(:last-child) {
    @apply border-r border-white/10;
  }
}
</style>
