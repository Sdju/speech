<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import { slidesParts } from 'virtual:slides-parts-info'
import { slidesPartsApi } from 'virtual:slides-parts-api'
import type { SlidePart } from 'virtual:slides-parts-info'
import { showPartsManager, isPartsManagerVertical as vertical, partsManagerWidth, partsManagerHeight } from '../state/partsManager'

const props = defineProps<{
  resize?: boolean
}>()

const loading = ref(false)

async function createPart() {
  const name = prompt('Введите имя новой части:')
  if (!name) return

  const positionStr = prompt('Введите позицию (оставьте пустым для добавления в конец):')
  const position = positionStr ? parseInt(positionStr) : undefined

  loading.value = true
  try {
    const result = await slidesPartsApi.createPart(name, position)
    if (!result.success) {
      alert(`Ошибка: ${result.error}`)
    }
  } catch (error) {
    alert(`Ошибка при создании: ${error}`)
  } finally {
    loading.value = false
  }
}

async function renamePart(part: SlidePart) {
  const newName = prompt(`Новое имя для "${part.name}":`, part.name)
  if (!newName || newName === part.name) return

  loading.value = true
  try {
    const result = await slidesPartsApi.renamePart(part.src, newName)
    if (!result.success) {
      alert(`Ошибка: ${result.error}`)
    }
  } catch (error) {
    alert(`Ошибка при переименовании: ${error}`)
  } finally {
    loading.value = false
  }
}

async function deletePart(part: SlidePart) {
  const confirmed = confirm(
    `Вы уверены, что хотите удалить часть "${part.name}"?\n\nФайл: ${part.src}\n\nЭто действие необратимо!`
  )
  if (!confirmed) return

  loading.value = true
  try {
    const result = await slidesPartsApi.deletePart(part.src)
    if (!result.success) {
      alert(`Ошибка: ${result.error}`)
    }
  } catch (error) {
    alert(`Ошибка при удалении: ${error}`)
  } finally {
    loading.value = false
  }
}

async function movePart(part: SlidePart, direction: 'up' | 'down') {
  loading.value = true
  try {
    const result = await slidesPartsApi.movePart(part.src, direction)
    if (!result.success) {
      alert(`Ошибка: ${result.error}`)
    }
  } catch (error) {
    alert(`Ошибка при перемещении: ${error}`)
  } finally {
    loading.value = false
  }
}

async function toggleHide(part: SlidePart) {
  loading.value = true
  try {
    const result = await slidesPartsApi.toggleHide(part.src)
    if (!result.success) {
      alert(`Ошибка: ${result.error}`)
    }
  } catch (error) {
    alert(`Ошибка при переключении видимости: ${error}`)
  } finally {
    loading.value = false
  }
}

function close() {
  showPartsManager.value = false
}

const handlerDown = ref(false)
function onHandlerDown() {
  handlerDown.value = true
}
function updateSize(v?: number) {
  if (vertical.value)
    partsManagerHeight.value = Math.min(Math.max(200, v ?? partsManagerHeight.value), window.innerHeight - 200)
  else
    partsManagerWidth.value = Math.min(Math.max(300, v ?? partsManagerWidth.value), window.innerWidth - 200)
}

if (props.resize) {
  useEventListener('pointermove', (e) => {
    if (handlerDown.value) {
      updateSize(vertical.value
        ? window.innerHeight - e.pageY
        : window.innerWidth - e.pageX)
    }
  }, { passive: true })
  useEventListener('pointerup', () => {
    handlerDown.value = false
  })
  useEventListener('resize', () => {
    updateSize()
  })
}
</script>

<template>
  <div
    v-if="resize" class="fixed bg-gray-400 select-none opacity-0 hover:opacity-10 z-dragging"
    :class="vertical ? 'left-0 right-0 w-full h-10px' : 'top-0 bottom-0 w-10px h-full'" :style="{
      opacity: handlerDown ? '0.3' : undefined,
      bottom: vertical ? `${partsManagerHeight - 5}px` : undefined,
      right: !vertical ? `${partsManagerWidth - 5}px` : undefined,
      cursor: vertical ? 'row-resize' : 'col-resize',
    }" @pointerdown="onHandlerDown"
  />
  <div
    class="shadow bg-main p-2 pt-4 grid grid-rows-[max-content_1fr] h-full overflow-hidden"
    :class="resize ? 'border-l border-gray-400 border-opacity-20' : ''"
    :style="resize ? {
      height: vertical ? `${partsManagerHeight}px` : undefined,
      width: !vertical ? `${partsManagerWidth}px` : undefined,
    } : {}"
  >
    <div class="flex pb-2 text-xl -mt-1 items-center">
      <span class="text-2xl pt-1">
        Parts
      </span>
      <div class="flex-auto" />
      <template v-if="resize">
        <button v-if="vertical" title="Dock to right" class="slidev-icon-btn" @click="vertical = false">
          <div class="i-carbon:open-panel-right" />
        </button>
        <button v-else title="Dock to bottom" class="slidev-icon-btn" @click="vertical = true">
          <div class="i-carbon:open-panel-bottom" />
        </button>
      </template>
      <button title="Create part" class="slidev-icon-btn" @click="createPart">
        <div class="i-carbon:add" />
      </button>
      <button title="Close" class="slidev-icon-btn" @click="close">
        <div class="i-carbon:close" />
      </button>
    </div>
    
    <div class="relative overflow-y-auto rounded bg-[#1a1a1a] p-2">
      <div v-if="slidesParts.length === 0" class="text-white/50 text-center py-8 text-sm">
        Нет частей слайдов.<br>Нажмите + чтобы создать.
      </div>
      
      <div v-else class="flex flex-col gap-1">
        <div 
          v-for="part in slidesParts" 
          :key="part.position" 
          class="part-row"
          :class="{ 'part-hidden': part.hidden }"
        >
          <div class="part-info">
            <span class="part-num">{{ part.position }}</span>
            <span class="part-name">
              {{ part.name }}
              <span v-if="part.hidden" class="hide-mark">⦻</span>
            </span>
          </div>
          
          <div class="part-actions">
            <button 
              class="action" 
              @click="movePart(part, 'up')" 
              :disabled="part.position === 1"
              title="⬆"
            >
              <div class="i-carbon:arrow-up" />
            </button>
            <button 
              class="action" 
              @click="movePart(part, 'down')" 
              :disabled="part.position === slidesParts.length"
              title="⬇"
            >
              <div class="i-carbon:arrow-down" />
            </button>
            <button 
              class="action" 
              @click="toggleHide(part)" 
              :title="part.hidden ? 'Показать' : 'Скрыть'"
            >
              <div v-if="part.hidden" class="i-carbon:view" />
              <div v-else class="i-carbon:view-off" />
            </button>
            <button class="action" @click="renamePart(part)" title="Переименовать">
              <div class="i-carbon:edit" />
            </button>
            <button class="action action-danger" @click="deletePart(part)" title="Удалить">
              <div class="i-carbon:trash-can" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="absolute inset-0 bg-black/60 rounded flex items-center justify-center">
        <div class="text-2xl animate-spin">⏳</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.part-row {
  @apply flex items-center justify-between gap-2 bg-blue-500/20 rounded-full overflow-hidden hover:bg-blue-500/30 duration-100 text-sm;
}

.part-row.part-hidden {
  @apply opacity-50;
}

.part-info {
  @apply flex items-center gap-2 px-2 py-1 flex-1 min-w-0;
}

.part-num {
  @apply flex items-center justify-center w-5 h-5 bg-blue-500/40 rounded-full text-white font-bold shrink-0 text-xs;
}

.part-name {
  @apply text-white truncate flex items-center gap-1 font-mono;
}

.hide-mark {
  @apply text-orange-400;
}

.part-actions {
  @apply flex items-center;
}

.action {
  @apply flex items-center justify-center px-2 py-1 cursor-pointer duration-100 border-l border-white/10 hover:bg-blue-500/30 active:bg-blue-500 text-white/80;
  
  &:disabled {
    @apply opacity-30 cursor-not-allowed hover:bg-transparent;
  }
}

.action-danger {
  @apply hover:bg-red-500/30 active:bg-red-500;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>

