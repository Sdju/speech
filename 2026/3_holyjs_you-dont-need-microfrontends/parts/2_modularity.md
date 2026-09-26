---
layout: center
---

<div class="section-kicker">обещание 1</div>

<XSlide name="promise-1" class="section-title-wrap">
  <h1 class="section-title">Чёткие границы ответственности</h1>
</XSlide>

---
layout: full
camera: crew
---

<CrewStation :step="0" />

<!--
Один разработчик у станции: весь проект у него в голове, границы очевидны.
(Раньше здесь было фото pr.png.)
-->

---
layout: full
camera: crew
clicks: 4
---

<CrewStation :step="$clicks" />

<!--
Тот же кадр, что на предыдущем слайде, — дальше проект растёт.
Клик 1: людей на проекте всё больше — прилетает экипаж, у каждого трос к модулю своей команды.
Клик 2: кода всё больше — вокруг станции копятся контейнеры.
Клик 3: всё сложнее понять зоны ответственности — тросы к чужим модулям, цвета команд гаснут.
Клик 4: связи становятся комплексными — тросы между людьми, клубок.
-->

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
Тезисы по кликам (раньше были подписью на слайде):
0 — Микрофронтенды: отдельные релизы, зависимости и связи
1 — Перенесём интеграцию в общую сборку
2 — Те же части становятся модулями одного приложения
3 — Собираем приложение и деплоим целиком
4 — Границы модулей остаются, интеграция теперь при сборке

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
slideClass: cs-red
---

# Минусы?

<v-clicks>

- Уметь выделять модули - **сложно**!
- Требуется навык соблюдения границ
- Деплой все еще не независим

</v-clicks>

---
slideClass: cs-green
---

# С другой стороны

<v-clicks>

- Мы все еще в рамках одного проекта
- Никакой настройки со стороны инструментов не требуется
- Относительно легко гарантировать работоспособность

</v-clicks>

---
layout: full
clicks: 3
---

<ModularityOptions :step="$clicks" />

<!--
Цель: показать готовые средства модульности в рамках одного приложения.
Старт: вопрос «А есть ли что-то готовое?».
Клик 1: Nuxt Modules — подключаем расширения и интеграции к приложению.
Модули Nuxt настраивают приложение при запуске dev-сервера или сборке;
это не независимо деплоящиеся микрофронтенды.
Клик 2: Nuxt Layers — переиспользуем группы компонентов, страниц и конфигурации.
Клик 3: FEOD, FDA, FSD — группа подходов к организации кода.
Внутри разные правила; мини-схема иллюстрирует идею границ и общего кода,
а не точную структуру каждой методологии. Названия сохранены для устного пояснения.
Статус: реализация
Источники:
https://nuxt.com/docs/4.x/guide/modules
https://nuxt.com/docs/4.x/getting-started/layers
https://github.com/feod-architecture
https://github.com/Klickbee/feature-driven-architecture
https://feature-sliced.design/docs/get-started/overview
-->

---
layout: full
camera: promises
timeline:
  - station: { hidden: [profile, checkout] }
    camera: promise-catalog
  - station: { hidden: [profile, checkout, catalog] }
    camera: promises
---

<PromiseStation :stage="1" :step="$clicks" />

<!--
Что нам решат микрофронтенды?
Клик: границы ответственности закрыли модулями — модуль Catalog отстыковывается и улетает.
-->
