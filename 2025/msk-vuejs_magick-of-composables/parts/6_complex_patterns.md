---
layout: default
---

# Комплексные паттерны

---
layout: two-cols
---

# Композаблы высшего порядка

Функции, которые принимают композаблы и возвращают улучшенные версии

```js
// Добавляет дебаунс к любому композаблу
function withDebounce(composable, delay = 300) {
  return (...args) => {
    const result = composable(...args)
    
    // Если результат имеет функции
    if (typeof result === 'object') {
      // Создаем прокси для автоматического дебаунса методов
      return new Proxy(result, {
        get(target, prop) {
          if (typeof target[prop] === 'function' && 
              prop !== 'onMounted' && 
              prop !== 'onUnmounted') {
            // Применяем дебаунс к функциям
            return debounce(target[prop], delay)
          }
          return target[prop]
        }
      })
    }
    
    return result
  }
}

// Использование
const useSearchWithDebounce = withDebounce(useSearch, 500)
```

::right::

## Улучшение состояния

```js
// Добавляет логирование операций
function withLogging(composable, options = {}) {
  const { prefix = 'LOG' } = options
  
  return (...args) => {
    console.log(`${prefix}: Initializing with`, args)
    
    const start = performance.now()
    const result = composable(...args)
    const end = performance.now()
    
    console.log(`${prefix}: Initialized in ${end - start}ms`)
    
    // Оборачиваем методы для логирования
    if (typeof result === 'object') {
      Object.keys(result).forEach(key => {
        if (typeof result[key] === 'function') {
          const original = result[key]
          result[key] = (...methodArgs) => {
            console.log(`${prefix}: Calling ${key} with`, methodArgs)
            const methodResult = original(...methodArgs)
            console.log(`${prefix}: ${key} returned`, methodResult)
            return methodResult
          }
        }
      })
    }
    
    return result
  }
}
```

---
layout: two-cols
---

# Shared Composable Pattern

Создание синглтон-состояния, доступного из разных компонентов

```js
// stores/useAuthStore.js
import { ref, readonly } from 'vue'

// Создаем состояние вне функции композабла
const user = ref(null)
const isAuthenticated = computed(() => !!user.value)

// Переиспользуемое API
async function login(credentials) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) throw new Error('Login failed')
    
    user.value = await response.json()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

function logout() {
  user.value = null
}

// Экспортируем композабл
export function useAuthStore() {
  return {
    user: readonly(user),
    isAuthenticated,
    login,
    logout
  }
}
```

::right::

## Использование в компонентах

```vue
<!-- LoginForm.vue -->
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

const { login } = useAuthStore()
const username = ref('')
const password = ref('')
const error = ref('')

async function handleSubmit() {
  const success = await login({
    username: username.value,
    password: password.value
  })
  
  if (!success) {
    error.value = 'Failed to login'
  }
}
</script>

<!-- UserInfo.vue -->
<script setup>
import { useAuthStore } from '@/stores/useAuthStore'

const { user, logout } = useAuthStore()
</script>

<template>
  <div v-if="user">
    Привет, {{ user.name }}!
    <button @click="logout">Выйти</button>
  </div>
</template>
```

---
layout: default
---

# Services Pattern

Оформление бизнес-логики и взаимодействия с API в виде сервисов

```js
// services/api.service.js
import { reactive } from 'vue'

// Базовый сервис для работы с API
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.state = reactive({
      loading: false,
      error: null
    })
  }
  
  async request(endpoint, options = {}) {
    this.state.loading = true
    this.state.error = null
    
    try {
      const url = `${this.baseUrl}/${endpoint}`
      const response = await fetch(url, options)
      
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      this.state.error = error.message
      throw error
    } finally {
      this.state.loading = false
    }
  }
  
  get(endpoint) {
    return this.request(endpoint)
  }
  
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }
}

// Конкретный сервис для работы с пользователями
class UserService extends ApiService {
  constructor() {
    super('https://api.example.com/users')
  }
  
  async getUser(id) {
    return this.get(`${id}`)
  }
  
  async updateProfile(id, profileData) {
    return this.post(`${id}/profile`, profileData)
  }
}

// Композабл для доступа к сервису
export function useUserService() {
  const service = new UserService()
  
  return {
    service,
    state: service.state,
    getUser: service.getUser.bind(service),
    updateProfile: service.updateProfile.bind(service)
  }
} 