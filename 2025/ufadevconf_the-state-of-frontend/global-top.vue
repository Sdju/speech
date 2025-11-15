<script setup>
import { useNav } from "@slidev/client"
import { computed, onMounted, watch, nextTick, ref } from "vue"
import { twMerge } from 'tailwind-merge'
import { showPartsManager, isPartsManagerVertical } from './addon/state/partsManager'
import { showTimelineEditor, isTimelineEditorVertical } from './addon/state/timeline'

const { currentSlideNo, currentSlideRoute } = useNav()
const frontmatter = computed(() => currentSlideRoute.value.meta?.slide?.frontmatter || {})

const isDev = computed(() => import.meta.env.DEV)

const anyPanelOpen = computed(() => showPartsManager.value || showTimelineEditor.value)

// Apply grid layout to page-root
function applyGridLayout() {
  const pageRoot = document.getElementById('page-root')
  if (pageRoot) {
    if (anyPanelOpen.value) {
      pageRoot.style.display = 'grid'
      
      // Определяем ориентацию по открытой панели
      const isVertical = showPartsManager.value 
        ? isPartsManagerVertical.value 
        : isTimelineEditorVertical.value
      
      if (isVertical) {
        pageRoot.style.gridTemplateColumns = ''
        pageRoot.style.gridTemplateRows = '1fr max-content'
      } else {
        pageRoot.style.gridTemplateRows = ''
        pageRoot.style.gridTemplateColumns = '1fr max-content'
      }
    } else {
      pageRoot.style.display = ''
      pageRoot.style.gridTemplateColumns = ''
      pageRoot.style.gridTemplateRows = ''
    }
  }
}

watch([showPartsManager, isPartsManagerVertical, showTimelineEditor, isTimelineEditorVertical], () => {
  applyGridLayout()
})

const pageRendered = ref(false)

onMounted(async () => {
  await nextTick()
  do {
    await new Promise(resolve => setTimeout(resolve, 100))
  } while (!document.getElementById('page-root'))
  applyGridLayout()
  pageRendered.value = true
})
</script>

<template>
  <div :class="frontmatter.slideClass">
    <Teleport to="#page-root" defer :disabled="!pageRendered">
      <SidePartsManager v-if="showPartsManager" resize />
      <SideTimelineEditor v-if="showTimelineEditor" resize />
    </Teleport>
    
    <CoordHelper v-if="isDev">
      <MousePosTooltip />
      <MouseSizeSelect />
      <ObjectEdit />
      <MemoryEditor />
    </CoordHelper>
    <div class="bottom-20px right-20px absolute text-lg opacity-50">{{ currentSlideNo }}</div>
    <div
      :class="twMerge([
        'absolute pos-20 text-[2.5em] transition-all duration-500',
        frontmatter.topTitleClass,
      ])"
    >
      {{ frontmatter.topTitle }}
    </div>
  </div>
</template>
