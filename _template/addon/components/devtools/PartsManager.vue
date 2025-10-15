<template>
  <div 
    ref="draggableElement" 
    class="fixed bg-black/40 rounded-xl z-100 max-w-[500px] flex flex-col font-mono text-xs select-none"
    :style="style"
  >
    <div class="flex items-center justify-between p-2 border-b border-white/10 cursor-move">
      <div class="text-white/70 font-semibold">Parts</div>
      <div class="flex gap-1">
        <button class="icon-btn" @click="createPart" title="Создать часть">
          <MdiPlus />
        </button>
        <button class="icon-btn" @click="isVisible = !isVisible" :title="isVisible ? 'Скрыть' : 'Показать'">
          <MdiChevronUp v-if="isVisible" />
          <MdiChevronDown v-else />
        </button>
      </div>
    </div>

    <div v-if="isVisible" class="flex flex-col gap-1 p-2 max-h-[400px] overflow-y-auto">
      <div v-if="slidesParts.length === 0" class="text-white/50 text-center py-2">
        Нет частей
      </div>
      
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
            <MdiArrowUp />
          </button>
          <button 
            class="action" 
            @click="movePart(part, 'down')" 
            :disabled="part.position === slidesParts.length"
            title="⬇"
          >
            <MdiArrowDown />
          </button>
          <button 
            class="action" 
            @click="toggleHide(part)" 
            :title="part.hidden ? 'Показать' : 'Скрыть'"
          >
            <MdiEye v-if="part.hidden" />
            <MdiEyeOff v-else />
          </button>
          <button class="action" @click="renamePart(part)" title="Переименовать">
            <MdiPencil />
          </button>
          <button class="action action-danger" @click="deletePart(part)" title="Удалить">
            <MdiTrashCanOutline />
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
      <div class="text-2xl animate-spin">⏳</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import { slidesParts } from 'virtual:slides-parts-info'
import { slidesPartsApi } from 'virtual:slides-parts-api'
import type { SlidePart } from 'virtual:slides-parts-info'

const loading = ref(false)
const isVisible = ref(true)

const draggableElement = ref()
const { style } = useDraggable(draggableElement, { initialValue: { x: 0, y: 0 } })

async function createPart() {
  const name = prompt('Введите имя новой части:')
  if (!name) return

  const positionStr = prompt('Введите позицию (оставьте пустым для добавления в конец):')
  const position = positionStr ? parseInt(positionStr) : undefined

  loading.value = true
  try {
    const result = await slidesPartsApi.createPart(name, position)
    if (result.success) {
      console.log(`Часть "${name}" успешно создана!`)
    } else {
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
    if (result.success) {
      console.log(`Часть "${part.name}" переименована в "${newName}"`)
    } else {
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
    if (result.success) {
      console.log(`Часть "${part.name}" успешно удалена`)
    } else {
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
    if (result.success) {
      console.log(`Часть "${part.name}" перемещена ${direction === 'up' ? 'вверх' : 'вниз'}`)
    } else {
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
    if (result.success) {
      console.log(`Часть "${part.name}" ${part.hidden ? 'показана' : 'скрыта'}`)
    } else {
      alert(`Ошибка: ${result.error}`)
    }
  } catch (error) {
    alert(`Ошибка при переключении видимости: ${error}`)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.icon-btn {
  @apply flex items-center justify-center w-6 h-6 rounded hover:bg-white/10 active:bg-white/20 cursor-pointer duration-100 text-white/70;
}

.part-row {
  @apply flex items-center justify-between gap-2 bg-blue-500/20 rounded-full overflow-hidden hover:bg-blue-500/30 duration-100;
}

.part-row.part-hidden {
  @apply opacity-50;
}

.part-info {
  @apply flex items-center gap-2 px-2 py-1 flex-1 min-w-0;
}

.part-num {
  @apply flex items-center justify-center w-5 h-5 bg-blue-500/40 rounded-full text-white font-bold shrink-0;
}

.part-name {
  @apply text-white truncate flex items-center gap-1;
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

