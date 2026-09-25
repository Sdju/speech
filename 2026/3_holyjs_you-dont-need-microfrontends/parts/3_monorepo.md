---
layout: center
---

<div class="section-kicker">обещание 2</div>

<XSlide name="promise-2" class="section-title-wrap">
  <h1 class="section-title">Свои пайплайны в репозитории</h1>
</XSlide>

---

# Новые потребности

<v-clicks>

- Команды хотят иметь свои инструменты
- Хотят иметь возможность настраивать свой пайплайн
- Хочется еще большей независимости
- Возможно даже свой стек

</v-clicks>

---

# Монорепозиторий

Давайте разобьем один пакет на несколько пакетов

> Пакет - модуль на уровне пакетного менеджера

---
layout: center
fileTree:
  - caption: 'Один пакет, внутри — модули'
    tree: |
      src/ @root
        app/ @app
        pages/
        modules/ @modules
          Profile/ @profile #blue
          Map/ @map #green
          ... @more
        shared/
        utils/
        App.vue
        main.js
  - caption: 'Каждый модуль — отдельный пакет'
    tree: |
      packages/ @root
        app/ @app
        profile/ @profile #blue
        map/ @map #green
        ... @more
  - caption: 'У каждого пакета свой package.json'
    tree: |
      packages/ @root
        app/ @app
          package.json
        profile/ @profile #blue
          package.json
        map/ @map #green
          package.json
        ... @more
  - caption: 'Общий код — тоже пакеты'
    focus: ['ui', 'types']
    tree: |
      packages/ @root
        app/ @app
        profile/ @profile #blue
        map/ @map #green
        ui/ #violet
        types/ #amber
        ... @more
---

<FileTree />

---

# Монорепозиторий

<v-clicks>

- Мы все еще остаемся в рамках одного проекта
- Части разделены по отдельным пакетам
- Мы можем реагировать в CI на изменение отдельной части

</v-clicks>

---
slideClass: cs-red
---

# Минусы

<v-clicks>

- Сборка и туллинг становятся сложнее
- Границы между модулями очень жесткие
- Мы жестко связаны всегда актуальными версиями пакетов
- Мы не можем произвести деплой если есть невалидный модуль

</v-clicks>

---
slideClass: cs-green
---

# Плюсы

<v-clicks>

- Жесткие границы способствуют автономности пакетов
- Нам все еще легко гарантировать работоспособность всего проекта

</v-clicks>

---

# Существующие инструменты

<v-clicks>

- <VscodeIconsFileTypeNpm/>NPM / <DeviconYarn/> YARN / <VscodeIconsFileTypePnpm/> PNPM workspaces
- <MaterialIconThemeTurborepo/> Turborepo
- <MaterialIconThemeNx/> Nx

</v-clicks>

---
layout: full
clicks: 3
camera: ambient
---

<FeaturesNotStages :step="$clicks" />

<!--
Один из ключевых слайдов: микрофронтенды — не следствие развития.
Старт: лестница строится сама, ступень за ступенью — модули → монорепо → реестр → микрофронтенды → «серьёзный» проект (≈4 с). Так выглядит наш путь по докладу.
Клик 1: лестница ломается. Это не этапы: каждое решение отвечает на своё требование — границы, свои пайплайны, независимая публикация, сборка в рантайме.
Мы просто добавляли себе требований по ходу доклада и реагировали на них.
Клик 2: их берут по отдельности: монолит с модулями, модули по репозиториям через реестр без монорепо.
Клик 3: и в любых сочетаниях: микрофронтенды внутри монорепо, микрофронтенды отдельными приложениями без общих модулей.
-->

---
layout: center
---

# Технические решения могут решать задачи из разных плоскостей!

---

Наш случай это не развитие, а эволюция в рамках сценария!

---

Решения могут сочетаться в любьых комбинациях

---

# Пакет не обязан быть доменным модулем!

<v-clicks>

- UI-библиотека
- Пакет с типами контрактов
- Небольшой пакет на другом стеке

</v-clicks>

---

Все приложения с микрофронтендами могут жить в одном монорепозитории

---
layout: center
---

# Ставьте всегда себе вопрос:

## А какую проблему я пытаюсь решить?

<v-clicks>

## Чем я готов пожертвовать ради этого?

</v-clicks>

<!--

Готовы ли мы усложнять сборку, пайплайн, переобучать команду ради удобной документации?

-->

---

<ChairPlanet />

---

---
layout: full
camera: promises
timeline:
  - station: { hidden: [profile, checkout, catalog] }
    camera: promise-search
  - station: { hidden: [profile, checkout, catalog, search] }
    camera: promises
---

<PromiseStation :stage="2" :step="$clicks" />

<!--
Клик: свои пайплайны закрыл монорепозиторий — улетает второй модуль.
-->
