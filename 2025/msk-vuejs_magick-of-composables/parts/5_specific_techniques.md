---
layout: default
---

# Специфические приемы

---
layout: two-cols
---

# Await паттерны

## Простой useFetch

```js
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData }
}
```

::right::

## Расширенный useFetch

```js
export function useFetch(url, options = {}) {
  const {
    immediate = true,
    initialData = null,
    transform = (data) => data
  } = options

  const data = ref(initialData)
  const error = ref(null)
  const loading = ref(false)
  const statusCode = ref(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url, options.fetchOptions)
      statusCode.value = response.status
      
      if (!response.ok) {
        throw new Error(`Failed with status ${response.status}`)
      }
      
      const rawData = await response.json()
      data.value = transform(rawData)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  if (immediate) {
    fetchData()
  }

  return { 
    data, 
    error, 
    loading, 
    statusCode,
    fetchData
  }
}
```

---
layout: default
---

# Порождающие композаблы

Композаблы, которые создают и возвращают другие композаблы или компоненты

## Пример: Фабрика для создания API-клиентов

```js
function createApiClient(baseUrl) {
  // Создаем композабл для работы с конкретным API
  return function useApi() {
    const getResource = async (path, options = {}) => {
      const url = `${baseUrl}/${path}`
      const { data, error, loading } = useFetch(url, options)
      return { data, error, loading }
    }
    
    const postResource = async (path, payload, options = {}) => {
      const url = `${baseUrl}/${path}`
      const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        ...options
      }
      return useFetch(url, { fetchOptions })
    }
    
    return {
      getResource,
      postResource
    }
  }
}

// Использование
const useUserApi = createApiClient('https://api.example.com/users')
const useProductApi = createApiClient('https://api.example.com/products')
```

---
layout: two-cols
---

# Динамическое создание компонентов

```js
function useModalFactory() {
  const modals = ref([])
  
  function createModal(component, props = {}) {
    const id = Date.now().toString()
    
    const closeModal = () => {
      const index = modals.value.findIndex(m => m.id === id)
      if (index !== -1) {
        modals.value.splice(index, 1)
      }
    }
    
    modals.value.push({
      id,
      component,
      props: {
        ...props,
        onClose: closeModal
      }
    })
    
    return { id, close: closeModal }
  }
  
  return {
    modals,
    createModal
  }
}
```

::right::

## Компонент для отображения модальных окон

```vue
<!-- ModalManager.vue -->
<script setup>
import { useModalFactory } from './useModalFactory'

const { modals, createModal } = useModalFactory()

// Экспортируем функцию для доступа из других компонентов
defineExpose({ createModal })
</script>

<template>
  <div class="modal-container">
    <template v-for="modal in modals" :key="modal.id">
      <component 
        :is="modal.component" 
        v-bind="modal.props"
      />
    </template>
  </div>
</template>
``` 