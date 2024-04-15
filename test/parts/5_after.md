---
layout: cover
class: text-center
---

<script setup>

</script>

# Поздравления!!!

---
layout: cover
---

Исходники:
- `@vue/runtime-core`

<v-click>

<div mb-5 />

Как используется самим **Vue**:

</v-click>

<v-clicks at="1">

- `@vue/runtime-dom` - Рендер в DOM
- `@vue/server-renderer` - Рендерер в строку для SSR
- `@vue/runtime-test` - Самый простой для понимания!

</v-clicks>

---
layout: cover
---

# Библиотеки 

Используют кастомные рендереры:

<v-clicks>

- **TresJS**
- **nativescript-vue**

</v-clicks>

---
layout: cover
---

<img class="absolute center w-[740px] ml-[80px]" src="/img/loev.jpg" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="relative center w-[740px] ml-[80px]" src="/img/loev.jpg" />

---
layout: cover
---

# Подсмотрим у React

<v-clicks>

- Рендерер для **Figma** плагинов
- Рендерер для **PDF**
- Рендерер для **Canvas**
- Рендерер в игровой движок
- Рендерер для **React**...

</v-clicks>

---
layout: cover
---

# Зачем

<v-clicks>

- Большая независимость от фреймворка
- Рендеринг **Vue** приложений на основе **ReactNative**
- Потому что это весело!

</v-clicks>

---
layout: cover
---

# Vue Renderer to React

<v-clicks>

- Создаем свою прослойку между VDOM Vue и VDOM React
- DOM -> `React.createElement`
- `mount` -> `React.render`

</v-clicks>

---
layout: cover
---

# Проблемы

<v-clicks>

- В хуке `mounted` мы получим в `ref` наш элемент прослойки между React и Vue
- В момент хука `mounted` реальная DOM нода еще не создана
- Использовать ui библиотеки для Vue получится маловероятно

</v-clicks>

---
layout: cover
---

# Как можно было бы решить?

<v-clicks>

- Создать накопительную прослойку
- Пошаманить с `SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`
- Пошаманить с Vue VDOM

</v-clicks>
