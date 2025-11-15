<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface Props {
  value: any
  path: string // Путь к значению в структуре (например: "timeline.0.point1")
  stepIndex: number
  propertyName: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [path: string, oldValue: any, newValue: any, stepIndex: number, propertyName: string]
}>()

const isEditing = ref(false)
const editValue = ref('')
const inputRef = ref<HTMLInputElement>()

// Определяем тип значения для правильного редактирования
const valueType = computed(() => {
  if (props.value === null) return 'null'
  if (props.value === undefined) return 'undefined'
  if (typeof props.value === 'boolean') return 'boolean'
  if (typeof props.value === 'number') return 'number'
  if (typeof props.value === 'string') return 'string'
  if (Array.isArray(props.value)) return 'array'
  if (typeof props.value === 'object') return 'object'
  return 'unknown'
})

// Форматируем значение для отображения
const displayValue = computed(() => {
  if (props.value === null) return 'null'
  if (props.value === undefined) return 'undefined'
  if (typeof props.value === 'boolean') return props.value ? 'true' : 'false'
  if (typeof props.value === 'number') return String(props.value)
  if (typeof props.value === 'string') return `"${props.value}"`
  if (Array.isArray(props.value)) return `[${props.value.length} items]`
  if (typeof props.value === 'object') return `{${Object.keys(props.value).length} keys}`
  return String(props.value)
})

// Проверяем, можно ли редактировать это значение
const isEditable = computed(() => {
  return ['string', 'number', 'boolean'].includes(valueType.value)
})

function startEdit() {
  if (!isEditable.value) return
  
  isEditing.value = true
  
  // Устанавливаем начальное значение для редактирования
  if (valueType.value === 'string') {
    editValue.value = props.value || ''
  } else {
    editValue.value = String(props.value)
  }
  
  // Фокусируемся на поле ввода после следующего тика
  setTimeout(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  }, 0)
}

function cancelEdit() {
  isEditing.value = false
  editValue.value = ''
}

function saveEdit() {
  if (!isEditable.value) return
  
  let newValue: any
  
  try {
    // Парсим новое значение в зависимости от типа
    switch (valueType.value) {
      case 'string':
        // Убираем кавычки если они есть
        newValue = editValue.value.replace(/^"(.*)"$/, '$1')
        break
      case 'number':
        newValue = parseFloat(editValue.value)
        if (isNaN(newValue)) {
          console.warn('Invalid number:', editValue.value)
          return
        }
        break
      case 'boolean':
        if (editValue.value.toLowerCase() === 'true') {
          newValue = true
        } else if (editValue.value.toLowerCase() === 'false') {
          newValue = false
        } else {
          console.warn('Invalid boolean:', editValue.value)
          return
        }
        break
      default:
        return
    }
    
    // Проверяем, изменилось ли значение
    if (newValue !== props.value) {
      emit('update', props.path, props.value, newValue, props.stepIndex, props.propertyName)
    }
    
    isEditing.value = false
    editValue.value = ''
  } catch (error) {
    console.error('Error parsing value:', error)
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    saveEdit()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    cancelEdit()
  }
}

// Обработка клика вне поля ввода
function handleClickOutside(event: Event) {
  if (isEditing.value && !(event.target as Element)?.closest('.editable-value')) {
    saveEdit()
  }
}

watch(isEditing, async (editing) => {
  await new Promise(resolve => setTimeout(resolve, 0))
  if (editing) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<template>
  <div class="editable-value" :class="{ 'is-editable': isEditable }">
    <!-- Режим отображения -->
    <div 
      v-if="!isEditing" 
      class="display-mode"
      :class="`type-${valueType}`"
      @click="startEdit"
    >
      {{ displayValue }}
      <span v-if="isEditable" class="edit-hint">✏️</span>
    </div>
    
    <!-- Режим редактирования -->
    <div v-else class="edit-mode">
      <input
        ref="inputRef"
        v-model="editValue"
        class="edit-input"
        :class="`type-${valueType}`"
        @keydown="handleKeydown"
        @blur="saveEdit"
      />
      <div class="edit-actions">
        <button @click="saveEdit" class="action-btn save" title="Сохранить (Enter)">✓</button>
        <button @click="cancelEdit" class="action-btn cancel" title="Отменить (Esc)">✗</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editable-value {
  display: inline-block;
  position: relative;
}

.display-mode {
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.display-mode:hover {
  background: rgba(255, 255, 255, 0.1);
}

.is-editable .display-mode:hover {
  background: rgba(96, 165, 250, 0.2);
}

.edit-hint {
  font-size: 10px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.is-editable .display-mode:hover .edit-hint {
  opacity: 1;
}

.edit-mode {
  display: flex;
  align-items: center;
  gap: 4px;
}

.edit-input {
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid rgba(96, 165, 250, 0.6);
  background: rgba(0, 0, 0, 0.3);
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  min-width: 60px;
  outline: none;
}

.edit-input:focus {
  border-color: rgba(96, 165, 250, 1);
  background: rgba(0, 0, 0, 0.5);
}

.edit-actions {
  display: flex;
  gap: 2px;
}

.action-btn {
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn.save {
  background: rgba(34, 197, 94, 0.8);
  color: white;
}

.action-btn.save:hover {
  background: rgba(34, 197, 94, 1);
}

.action-btn.cancel {
  background: rgba(239, 68, 68, 0.8);
  color: white;
}

.action-btn.cancel:hover {
  background: rgba(239, 68, 68, 1);
}

/* Типы значений */
.type-string {
  color: #ce9178;
  background: rgba(206, 145, 120, 0.1);
}

.type-number {
  color: #b5cea8;
  background: rgba(181, 206, 168, 0.1);
}

.type-boolean {
  color: #569cd6;
  background: rgba(86, 156, 214, 0.1);
}

.type-null,
.type-undefined {
  color: #808080;
  background: rgba(128, 128, 128, 0.1);
  font-style: italic;
}

.type-object,
.type-array {
  color: #4ec9b0;
  background: rgba(78, 201, 176, 0.1);
}
</style>


