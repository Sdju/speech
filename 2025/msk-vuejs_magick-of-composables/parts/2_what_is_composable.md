---
layout: default
---

# Что есть композабл

---
layout: two-cols
---

# Введение в композаблы

- Переиспользуемая логика во Vue
- Появились с выходом Composition API
- Решают проблемы Options API:
  - Смешивание логических аспектов
  - Сложность переиспользования кода
  - Трудности при масштабировании

::right::

```js
// Options API (до Vue 3)
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}

// Composition API (Vue 3+)
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  function increment() {
    count.value++
  }
  return { count, increment }
}
```

---

# Vue Composition API

- Представлен с Vue 3
- Альтернатива Options API
- Главные концепции:
  - reactive, ref для реактивного состояния
  - computed для вычисляемых свойств
  - watch, watchEffect для побочных эффектов
  - lifecycle hooks (onMounted, onUnmounted и т.д.)

---

## Отсылка на доклад Holy.js

<div class="flex justify-center">
  <div class="text-center p-4 border rounded">
    <h3>"Шестеренки реактивности Vue"</h3>
    <p>Подробное объяснение внутренней работы реактивной системы Vue</p>
    <p class="text-xs">Holy.js 2024 - для глубокого понимания основ</p>
  </div>
</div>

---

# Разъяснение термина "композабл"

- **Composable** - функция, использующая Composition API
- Позволяет извлекать и переиспользовать логику с сохранением реактивности
- Основан на функциональном подходе
- Отличия от:
  - Mixins (более изолированы и прозрачны)
  - Utility функций (сохраняют реактивный контекст)
  - Custom Hooks в React (похожи, но работают с Vue экосистемой) 