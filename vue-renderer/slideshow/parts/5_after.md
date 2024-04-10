---
layout: cover
---

# Поздравления

- Теперь вы можете запускать Vue на чем хватит фантазии

<v-click>

Используют кастомные рендереры:

</v-click>

<v-clicks>

- TresJS
- nativescript-vue

</v-clicks>

---
layout: intro
---

# А что есть для React?

![loev](/img/loev.jpg){class="max-h-[380px]"}

---
layout: cover
---

# Подсмотрим у React

<v-clicks>

- Рендерер для Figma плагинов
- Рендерер для PDF
- Рендерер для Canvas
- Рендерер в игровой движок
- Рендерер для React...

</v-clicks>

---
layout: cover
---

# Зачем

<v-clicks>

- Большая независимость от фреймворка
- Рендеринг Vue приложений на основе ReactNative
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
