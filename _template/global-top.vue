<script setup>
import { useNav } from "@slidev/client"
import { computed, onMounted, watch } from "vue"
import { twMerge } from 'tailwind-merge'
import { showPartsManager, isPartsManagerVertical } from './addon/state/partsManager'

const { currentSlideNo, currentSlideRoute } = useNav()
const frontmatter = computed(() => currentSlideRoute.value.meta?.slide?.frontmatter || {})

const isDev = computed(() => import.meta.env.DEV)

// Apply grid layout to page-root
function applyGridLayout() {
  const pageRoot = document.getElementById('page-root')
  if (pageRoot) {
    if (showPartsManager.value) {
      pageRoot.style.display = 'grid'
      if (isPartsManagerVertical.value) {
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

onMounted(() => {
  applyGridLayout()
})

watch([showPartsManager, isPartsManagerVertical], () => {
  applyGridLayout()
})
</script>

<template>
  <div :class="frontmatter.slideClass">
    <Teleport to="#page-root">
      <SidePartsManager v-if="showPartsManager" :resize="true" />
    </Teleport>
    
    <CoordHelper v-if="isDev">
      <MousePosTooltip />
      <MouseSizeSelect />
      <ObjectEdit />
      <MemoryEditor />
    </CoordHelper>
    <div class="pos-br20 absolute text-lg opacity-50">{{ currentSlideNo }}</div>
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
