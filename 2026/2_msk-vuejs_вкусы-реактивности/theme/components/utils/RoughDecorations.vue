<script setup lang="ts">
import { useNav } from '@slidev/client'
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { refreshRoughDecorations } from '../../composables/roughDecorations'

const { currentSlideNo, clicks } = useNav()

let refreshTimer: ReturnType<typeof setTimeout> | undefined
let observer: MutationObserver | undefined

function scheduleRefresh() {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => {
    nextTick(() => refreshRoughDecorations())
  }, 60)
}

onMounted(() => {
  document.documentElement.classList.add('rough-enabled')
  scheduleRefresh()

  observer = new MutationObserver(() => scheduleRefresh())
  const pageRoot = document.getElementById('page-root')
  if (pageRoot) {
    observer.observe(pageRoot, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    })
  }

  window.addEventListener('resize', scheduleRefresh)
})

onUnmounted(() => {
  clearTimeout(refreshTimer)
  observer?.disconnect()
  window.removeEventListener('resize', scheduleRefresh)
  document.documentElement.classList.remove('rough-enabled')
})

watch([currentSlideNo, clicks], () => scheduleRefresh(), { immediate: true })
</script>

<template>
  <span class="sr-only" aria-hidden="true" />
</template>
