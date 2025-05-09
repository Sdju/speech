---
layout: default
---

# Базовые приемы и правила использования

---
layout: two-cols
---

# Ограничение контекста использования

- Композаблы должны использоваться в setup-контексте
  - Компоненты (setup функция или &lt;script setup&gt;)
  - Другие композаблы
  - Жизненный цикл приложения

- **Правильно:**
```js
// В компоненте
<script setup>
import { useCounter } from './composables'
const { count, increment } = useCounter()
</script>
```

::right::

- **Неправильно:**
```js
// Вне контекста setup
import { useCounter } from './composables'

// ❌ Не работает!
const { count, increment } = useCounter()

export default {
  data() {
    // ❌ Также не работает!
    const { count, increment } = useCounter()
    return { count }
  }
}
```

---
layout: default
---

# Взятие аргументов

- Композаблы могут принимать аргументы для настройки поведения
- Типы аргументов:
  - Простые значения (числа, строки)
  - Объекты опций
  - Реактивные ссылки
  - Другие композаблы

```js
// Простой аргумент
function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  // ...
}

// Объект опций
function useFetch(url, options = {}) {
  const { immediate = true, headers = {} } = options
  // ...
}

// Реактивные ссылки
function useFilteredList(items, filterFn) {
  return computed(() => items.value.filter(filterFn))
}
```

---
layout: two-cols
---

# Возвращаемые значения

- Композаблы обычно возвращают объект с:
  - Реактивным состоянием (ref, reactive)
  - Методами для изменения состояния
  - Вычисляемыми свойствами
  - Дополнительными вложенными объектами

```js
function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  const isPositive = computed(() => count.value > 0)
  
  return {
    count,
    increment,
    decrement,
    isPositive
  }
}
```

::right::

## Рекомендации по возвращаемым значениям:

- Используйте деструктуризацию при импорте
- Сохраняйте связную логику вместе
- Используйте явные имена для предотвращения конфликтов

```js
// Группировка связанных данных
function usePagination() {
  // ...
  return {
    // Состояние
    page,
    pageSize,
    totalPages,
    
    // Методы управления
    next,
    previous,
    goToPage,
    
    // Вычисляемые значения
    isFirstPage,
    isLastPage
  }
}
``` 