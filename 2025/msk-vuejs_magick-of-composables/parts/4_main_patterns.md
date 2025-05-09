---
layout: default
---

# Основные паттерны

---

# Код системный и прикладной

| Системный код | Прикладной код |
|---------------|----------------|
| Библиотеки и фреймворки | Бизнес-логика проекта |
| Переиспользуем между проектами | Специфичен для проекта |
| Высокая абстракция | Конкретные задачи |
| Строгие контракты | Гибкая структура |
| Инкапсуляция деталей | Прозрачность работы |

---
layout: two-cols
---

# Приемы для прикладного кода

## Provide/Inject

- Удобно для глобальных состояний
- Избегаем передачи пропсов через цепочку компонентов
- Сохраняет реактивность

```js
// composables/useTheme.js
export function useThemeProvider() {
  const theme = ref('light')
  const toggleTheme = () => {
    theme.value = theme.value === 'light' 
      ? 'dark' 
      : 'light'
  }
  
  provide('theme', {
    theme: readonly(theme),
    toggleTheme
  })
}

export function useTheme() {
  const theme = inject('theme')
  if (!theme) {
    throw new Error('useTheme must be used with useThemeProvider')
  }
  return theme
}
```

::right::

## Использование в компоненте

```vue
<!-- App.vue -->
<script setup>
import { useThemeProvider } from './composables/useTheme'

useThemeProvider()
</script>

<!-- ChildComponent.vue -->
<script setup>
import { useTheme } from './composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div :class="theme">
    <button @click="toggleTheme">
      Сменить тему
    </button>
    Текущая тема: {{ theme }}
  </div>
</template>
```

---
layout: default
---

# Приемы для библиотек

## Выбор между ref и reactive

| ref | reactive |
|-----|----------|
| Для примитивных значений | Для объектов |
| Явный .value | Неявное обращение |
| Легко передавать между функциями | Теряет реактивность при деструктуризации |
| Более прозрачный | Короче синтаксис |

```js
// Используем ref для простых значений и списков
function useCounter() {
  const count = ref(0)
  const list = ref([])
  return { count, list }
}

// reactive для связанных свойств
function useForm() {
  const form = reactive({
    name: '',
    email: '',
    isValid: computed(() => !!form.name && !!form.email)
  })
  return { form }
}
```

---

# Случаи для shallowRef

- Когда нужна реактивность только на верхнем уровне
- Для больших объектов данных, где не нужно отслеживать вложенные свойства
- Оптимизация производительности

```js
function useExternalData() {
  // Большой объект с данными, которые меняются целиком
  const data = shallowRef({})
  
  async function fetchData() {
    const response = await fetch('/api/data')
    const json = await response.json()
    // Заменяем весь объект - только это вызовет реактивное обновление
    data.value = json
  }
  
  return { data, fetchData }
}
```

---
layout: two-cols
---

# computed vs readonly vs ref

## computed

- Используется для производных данных
- Кэширует результат
- Обновляется только при изменении зависимостей

```js
function useFilter(items) {
  const filter = ref('')
  
  const filteredItems = computed(() => 
    items.value.filter(item => 
      item.name.includes(filter.value)
    )
  )
  
  return {
    filter,
    filteredItems
  }
}
```

::right::

## readonly

- Защищает от изменений извне
- Экспортирует данные для чтения
- Позволяет внутреннему коду изменять значение

```js
function useStore() {
  const state = reactive({
    user: null,
    isLoggedIn: false
  })
  
  function login(userData) {
    state.user = userData
    state.isLoggedIn = true
  }
  
  return {
    // Внешний код может только читать
    state: readonly(state),
    // Но может вызывать методы для изменения
    login
  }
}
``` 