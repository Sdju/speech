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
clicks: 4
---

<CrewStation :step="$clicks" />

<!--
Старт: один разработчик у станции — весь проект у него в голове, границы очевидны.
Дальше проект растёт.
Клик 1: людей на проекте всё больше — прилетает экипаж, у каждого трос к модулю своей команды.
Клик 2: кода всё больше — каждый без остановки шлёт в свой модуль конверты-коммиты, поток не прекращается.
Клик 3: всё сложнее понять зоны ответственности — тросы к чужим модулям, цвета команд гаснут.
Клик 4: связи становятся комплексными — тросы между людьми, клубок.
-->

---
layout: full
clicks: 1
camera: no-mfe
timeline:
  - station: { detached: [catalog, search, cart, checkout, profile], duration: 4.5 }
  - station: { snap: true, duration: 0.5 }
---

<div class="side-title">

# Пришло время **микрофронтендов**?

<h1 class="no-mfe" :class="{ 'no-mfe--on': $clicks >= 1 }">НЕТ!</h1>

</div>

<!--
Фон: станцию начинают разбирать — модули медленно отходят от хаба, как при переходе на микрофронтенды.
Клик: «НЕТ!» — модули с силой встают обратно в порты, кадр вздрагивает от удара.
-->

<style>
.no-mfe {
  margin-top: 0.4em !important;
  font-size: 3.4em !important;
  color: #f87171;
  transform-origin: left center;
  opacity: 0;
  transform: scale(1.6);
  filter: blur(8px);
  transition: opacity 0.2s ease, transform 0.35s cubic-bezier(0.2, 1.6, 0.4, 1), filter 0.2s ease;
}

/* появляется в момент удара модулей о станцию (стыковка 0.5 с) */
.no-mfe--on {
  opacity: 1;
  transform: none;
  filter: none;
  transition-delay: 0.45s;
}
</style>

---
layout: full
camera: simpler
station: { blueprint: true, delay: 1.6, duration: 2.6 }
---

<div class="side-title">

# А можно ли решить проблему проще?

</div>

<!--
Фон: камера медленно подлетает к станции, скан переводит её в чертёж — не режем, а смотрим, как она устроена.
-->

---
layout: full
camera: modular
station: { blueprint: true, glow: true, delay: 1.4 }
---

<div class="side-title">

# Модульная структура проекта

</div>

<!--
Фон: на чертеже модули по очереди загораются цветами своих команд — корпус один, модули внутри.
Мост к схеме модулей на следующем слайде.
-->

---
layout: full
clicks: 4
station: {}
# тот же кадр, что у схем на слайдах 8–9: схема продолжается, а не появляется заново
camera: { preset: station, distance: 8, pitch: 20, shift: [2.05, 0.55] }
---

<ArchScheme mode="modules" :step="$clicks" />

<!--
Тезисы по кликам (раньше были подписью на слайде):
0 — Схема ровно там, где мы её оставили: микрофронтенды и незаконченная миграция UI library
1 — Перенесём интеграцию в общую сборку
2 — Те же части становятся модулями одного приложения
3 — Собираем приложение и деплоим целиком
4 — Границы модулей остаются, интеграция теперь при сборке

Начинаем с того же состояния, которым закончился слайд претензий: Catalog уже на UI v2, остальные ещё на v1.
Старт — с двумя копиями UI library (v1 и v2, «×2»), как в конце слайда претензий.
Клик 1: приглушённые пайплайны и детали зависимостей убираем, показываем общую сборку.
Это упрощение схемы для переноса интеграции, а не исчезновение зависимостей и контрактов в модульном приложении.
Клик 2: те же цветные модули по очереди перемещаются в сборку.
Клик 3: одно приложение и единый деплой. Shell никуда не делся — он точка входа приложения.
Клик 4: подчёркиваем сохранённые границы и интеграцию при сборке.
-->

---
layout: center
fileTree:
  - caption: 'Классическая структура: по типам файлов'
    tree: |
      src/ @src
        components/ @components
          map/ @map-ui
          profile-card/ @profile-card
          ...
        pages/ @pages
        utils/
        app.vue
        main.js
  - caption: 'Проект растёт — каждая папка пухнет'
    tree: |
      src/ @src
        components/ @components
          map/ @map-ui
            map-component/
            map-card/
            ...
          profile/ @profile-ui
            user-profile/
            profile-card/ @profile-card
          ...
        pages/ @pages
          map-page/ @map-pages
          profile-page/ @profile-pages
          ...
        stores/ @stores
          map-store/ @map-store
          profile-store/ @profile-store
          ...
        utils/
        app.vue
        main.js
  - caption: 'Всё про карту размазано по трём папкам'
    focus: '#green'
    tree: |
      src/ @src
        components/ @components
          map/ @map-ui #green
            map-component/
            map-card/
            ...
          profile/ @profile-ui #blue
            user-profile/
            profile-card/ @profile-card
          ...
        pages/ @pages
          map-page/ @map-pages #green
          profile-page/ @profile-pages #blue
          ...
        stores/ @stores
          map-store/ @map-store #green
          profile-store/ @profile-store #blue
          ...
        utils/
        app.vue
        main.js
  - caption: 'И всё про профиль — тоже'
    focus: '#blue'
  - caption: 'Соберём фичу в одном месте'
    focus: '@modules'
    tree: |
      src/ @src
        components/ @components
          map/ @map-ui #green
            map-component/
            map-card/
            ...
          profile/ @profile-ui #blue
            user-profile/
            profile-card/ @profile-card
          ...
        pages/ @pages
          map-page/ @map-pages #green
          profile-page/ @profile-pages #blue
          ...
        stores/ @stores
          map-store/ @map-store #green
          profile-store/ @profile-store #blue
          ...
        modules/ @modules
        utils/
        app.vue
        main.js
  - caption: 'Модуль Map: свои компоненты, страницы, стор'
    focus: '#green'
    tree: |
      src/ @src
        components/ @components
          profile/ @profile-ui #blue
            user-profile/
            profile-card/ @profile-card
          ...
        pages/ @pages
          profile-page/ @profile-pages #blue
          ...
        stores/ @stores
          profile-store/ @profile-store #blue
          ...
        modules/ @modules
          map/ @map #green
            components/ @map-ui
              map-component/
              map-card/
              ...
            pages/ @map-pages
            stores/ @map-store
        utils/
        app.vue
        main.js
  - caption: 'Модуль Profile — так же. Общее уходит в shared'
    tree: |
      src/ @src
        app/
        pages/ @pages
        modules/ @modules
          map/ @map #green
            components/ @map-ui
            pages/ @map-pages
            stores/ @map-store
          profile/ @profile #blue
            components/ @profile-ui
            pages/ @profile-pages
            stores/ @profile-store
          ...
        shared/ @components
          ...
        utils/
        app.vue
        main.js
  - caption: 'Модуль — это граница: публичный API, тесты, документация'
    focus: '@map'
    tree: |
      src/ @src
        app/
        pages/ @pages
        modules/ @modules
          map/ @map #green
            components/ @map-ui
            pages/ @map-pages
            stores/ @map-store
            tests/
            index.ts // публичный API модуля
            README.md
          profile/ @profile #blue
          ...
        shared/ @components
          ...
        utils/
        app.vue
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
---

<div class="side-title">

# Модули **≠** микрофронтенды

<p class="side-title__sub">Мы закрыли одну потребность —<br>не прибегая к ним</p>

</div>

<!--
Дисклеймер. Модульная структура — не замена микрофронтендам и не «микрофронтенды попроще».
Мы взяли конкретную потребность — чёткие границы ответственности — и закрыли её без микрофронтендов.
Фон: станция в том же кадре, что и следующий слайд обещаний — переход без перелёта камеры.
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
