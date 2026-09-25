---
layout: center
---

# Четкие границы ответственности

---
layout: center
---

<img src="../img/pr.png" />

---

<v-clicks>

- Людей на проекте все больше и больше
- Количество кода растет все быстрее
- Становится сложнее понять зоны ответственности
- Связи в проекте становятся комплексными

</v-clicks>

---
layout: center
---

# Пришло время **микрофронтендов**?

<v-click>

# НЕТ!

</v-click>

---
layout: center
---

# А можно ли решить проблему проще?

---
layout: center
---

# Модульная структура проекта

---
layout: full
clicks: 4
---

<ArchScheme mode="modules" :step="$clicks" />

<!--
Начинаем с итоговой схемы микрофронтендов со слайда 8, включая local/shared и взаимодействие.
Клик 1: приглушённые пайплайны и детали зависимостей убираем, показываем общую сборку.
Это упрощение схемы для переноса интеграции, а не исчезновение зависимостей и контрактов в модульном приложении.
Клик 2: те же цветные модули по очереди перемещаются в сборку.
Клик 3: показываем одно приложение и единый деплой.
Клик 4: подчёркиваем сохранённые границы и интеграцию при сборке.
-->

---
layout: center
fileTree:
  - caption: 'Классическая структура: по типам файлов'
    tree: |
      src/ @src
        components/ @components
          Map/ @map-ui
          ProfileCard/ @profile-card
          ...
        pages/ @pages
        utils/
        App.vue
        main.js
  - caption: 'Проект растёт — каждая папка пухнет'
    tree: |
      src/ @src
        components/ @components
          Map/ @map-ui
            MapComponent/
            MapCard/
            ...
          Profile/ @profile-ui
            UserProfile/
            ProfileCard/ @profile-card
          ...
        pages/ @pages
          MapPage/ @map-pages
          ProfilePage/ @profile-pages
          ...
        stores/ @stores
          MapStore/ @map-store
          ProfileStore/ @profile-store
          ...
        utils/
        App.vue
        main.js
  - caption: 'Всё про карту размазано по трём папкам'
    focus: '#green'
    tree: |
      src/ @src
        components/ @components
          Map/ @map-ui #green
            MapComponent/
            MapCard/
            ...
          Profile/ @profile-ui #blue
            UserProfile/
            ProfileCard/ @profile-card
          ...
        pages/ @pages
          MapPage/ @map-pages #green
          ProfilePage/ @profile-pages #blue
          ...
        stores/ @stores
          MapStore/ @map-store #green
          ProfileStore/ @profile-store #blue
          ...
        utils/
        App.vue
        main.js
  - caption: 'И всё про профиль — тоже'
    focus: '#blue'
  - caption: 'Соберём фичу в одном месте'
    focus: '@modules'
    tree: |
      src/ @src
        components/ @components
          Map/ @map-ui #green
            MapComponent/
            MapCard/
            ...
          Profile/ @profile-ui #blue
            UserProfile/
            ProfileCard/ @profile-card
          ...
        pages/ @pages
          MapPage/ @map-pages #green
          ProfilePage/ @profile-pages #blue
          ...
        stores/ @stores
          MapStore/ @map-store #green
          ProfileStore/ @profile-store #blue
          ...
        modules/ @modules
        utils/
        App.vue
        main.js
  - caption: 'Модуль Map: свои компоненты, страницы, стор'
    focus: '#green'
    tree: |
      src/ @src
        components/ @components
          Profile/ @profile-ui #blue
            UserProfile/
            ProfileCard/ @profile-card
          ...
        pages/ @pages
          ProfilePage/ @profile-pages #blue
          ...
        stores/ @stores
          ProfileStore/ @profile-store #blue
          ...
        modules/ @modules
          Map/ @map #green
            components/ @map-ui
              MapComponent/
              MapCard/
              ...
            pages/ @map-pages
            stores/ @map-store
        utils/
        App.vue
        main.js
  - caption: 'Модуль Profile — так же. Общее уходит в shared'
    tree: |
      src/ @src
        app/
        pages/ @pages
        modules/ @modules
          Map/ @map #green
            components/ @map-ui
            pages/ @map-pages
            stores/ @map-store
          Profile/ @profile #blue
            components/ @profile-ui
            pages/ @profile-pages
            stores/ @profile-store
          ...
        shared/ @components
          ...
        utils/
        App.vue
        main.js
  - caption: 'Модуль — это граница: публичный API, тесты, документация'
    focus: '@map'
    tree: |
      src/ @src
        app/
        pages/ @pages
        modules/ @modules
          Map/ @map #green
            components/ @map-ui
            pages/ @map-pages
            stores/ @map-store
            tests/
            index.ts // публичный API модуля
            README.md
          Profile/ @profile #blue
          ...
        shared/ @components
          ...
        utils/
        App.vue
        main.js
---

<FileTree />

---

# Модульная структура проекта

<v-clicks>

- Модули могут разрабатываться независимо
- Связи между модулями могут быть ограничены
- Конкретные люди могут отвечать за конкретные модули
- Отдельные модули проще документировать и тестировать

</v-clicks>

---

# Минусы?

<v-clicks>

- Уметь выделять модули - **сложно**!
- Требуется навык соблюдения границ
- Деплой все еще не независим

</v-clicks>

---

# С другой стороны

<v-clicks>

- Мы все еще в рамках одного проекта
- Никакой настройки со стороны инструментов не требуется
- Относительно легко гарантировать работоспособность

</v-clicks>

---

# А есть ли что-то готовое?

<v-clicks>

- Nuxt Modules
- Nuxt Layers
- FEOD
- FDA
- FSD

</v-clicks>

---

Что нам решат микрофронтенды?

- <span v-mark.strike-through.green={at:1}>Четкие границы ответственности</span> <v-click>✅ Модули</v-click>
- Свои пайплайны в репозитории
- Независимый деплой
- <span class="blur"> Динамическая подгрузка </span>
