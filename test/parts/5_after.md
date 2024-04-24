---
layout: cover
class: text-center
---

<script setup>
import { ref, onUnmounted, getCurrentInstance, watch } from 'vue';
import {useNav} from "@slidev/client"; 
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

const instance = getCurrentInstance();
const { currentSlideNo } = useNav();

watch(currentSlideNo, (id) => {
  if (id === instance.setupState.$page) {
    jsConfetti.addConfetti({
      confettiColors: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'],
      confettiRadius: 10,
      confettiNumber: 150,
    })
  }
});
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

<img class="absolute center w-[740px]" src="/img/loev.jpg" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="absolute center w-[740px]" src="/img/loev.jpg" />

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

<img class="absolute center w-[740px]" src="/img/render.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="absolute center w-[740px]" src="/img/render.png" />

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
