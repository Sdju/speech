---
theme: ./theme
addons:
  - ./msk-vuejs_magick-of-composables/addon
routerMode: hash
htmlAttrs:
  lang: ru
highlighter: shiki
lineNumbers: true
css: unocss
colorSchema: dark
transition: view-transition
contextMenu: false
mdc: true
growSeed: 4
title: Магия композаблов
layout: center
class: text-center
---

<XSlide slot="title" #="{ title, className, style }">
  <h1 :class="className" :style="style"> {{ title }} </h1>
</XSlide>

<XSlideOut slot="title" title="Магия композаблов" class="text-center" />

<!--
Порождаем конкретные проблемы - как его решаем примером кода (никаких проблем на словах)

- презентация (без визуала жесткого) - но со всеми примерами

- Старт - 30
  - О себе
  - Слайд доклада
  - отсылка на доклад Holy.js

- Что есть композабл - 1h
  - Vue Options API -> Vue composition API
  - mixins -> composables
  - Разъяснение термина композабл
  - Что не является композаблом
  - Композабл - паттерн!

- Базовые приемы и правила использования -2h
  - ограничение контекста использования
    - можно использовать в компонентах
    - можно использовать в сторе
    - можно использовать в хуках роутера
    - использование композаблов в композаблах
  - Использование композаблов в компонентах
    - использование композаблов внутри условий (это не реактивно)
    - не использовать композаблы внутри обработчиков событий и функций в целом
  - Использование композаблов в композаблах
    - гибкость
    - цена абстракций
  - взятие аргументов
    - статика против динамики
      - когда принять просто значение, а когда реактивное
    - getValue + MaybeRef
  - возвращаемые значения
    - возвращать объект
      - базовый подход
    - возвращать массив (не желательно)
      - деструктузирация объектов и массивов в js

- код системный/прикладной
- приемы специфичные для прикладного кода
  - provide/inject
    - обертки в композаблы (базовые правила)
    - не используйте вместо СТМ
  - ресурсы (асинхронные реактивные данные)
    - useFetch
    - useAsyncData
    - vue-query / pinia collada
  - директива против композабла
    - vFocus -> useFocus
    - плюсы и минусы таких переходов
  - onUnmounted vs onScopeDispose
    - нужно понимать что используемые с onUnmounted могут быть использованы только в компонентах
  - computed vs readonly vs ref + TS readonly - как передать неизменяемое значение
    - утилита которая на этапе сборки выбирает между readonly и TS readonly

- Приемы для системного кода
  - выбор между object/reactive
    - деструктуризация против дот-нотации ({data} vs obj.data)
    - проблема с .value
  - await паттерны
    - как реализовать
    - Suspense и почему не рекомендуется
  - порождающие композаблы
    - customRef
    - своя реактивная обертка
    - композаблы - не композаблы
    - пару хорших примеров
  - возвращать возвращать массив+объект
    - статья antfu (не задерживаемся)

- комплексные паттерны - 1h
  - композаблы высшего порядка (когда композабл возвращает композабл или принимает на вход)
  - shared composable
    - как работает
      - effectScope (очень кратко)
    - когда применять
    - shared composable как замена стейт менеджеру
    - потенциальные опасности
  - DI + composable = services

- Что мы не успели обсудить и выводы
  - тестирование композаблов
  - DI в композаблах

  - Что поизучать 
    - antfu vueuse
    - vue-final-modal
    - vee-validate

  - Заключение
-->

---
src: ./parts/1_intro.md
---

---
src: ./parts/2_what_is_composable.md
---

---
src: ./parts/3_basic_techniques.md
---

---
src: ./parts/4_specific_techniques.md
---

---
src: ./parts/5_complex_patterns.md
---

---
src: ./parts/6_conclusion.md
---

---
# src: ./parts/7_conclusion.md
---