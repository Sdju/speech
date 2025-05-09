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
src: ./parts/1_intro.md
---

---
src: ./parts/2_what_is_composable.md
---

---
src: ./parts/3_basic_techniques.md
---

---
src: ./parts/4_main_patterns.md
---

---
src: ./parts/5_specific_techniques.md
---

---
src: ./parts/6_complex_patterns.md
---

---
src: ./parts/7_conclusion.md
---

<XSlide slot="title" #="{ title, className, style }">
  <h1 :class="className" :style="style"> {{ title }} </h1>
</XSlide>

<XSlideOut slot="title" title="Магия композаблов" class="text-center" />

---
layout: center
class: text-center cs-green 
---

<XSlideOut slot="title" title="Smooth transitions!" class="text-7xl! mb-20! text-shadow-lg" />

- Что есть композабл
  - введение
  - Vue Composition API
  - отсылка на доклад Holy.js
  - разъяснение термина композабл
- Базовые приемы и правила использования
  - ограничение контекста использования
  - взятие аргументов
  - возвращаемые значения
- Основные паттерны
  - код системный/прикладной
  - приемы специфичные для прикладного кода
    - provide/inject
  - приемы специфичные для библиотек
    - выбор между ref/reactive
    - случаи для shallowRef
    - computed vs readonly vs ref
- специфические приемы
  - await паттерны
  - порождающие композаблы
- комплексные паттерны
  - композаблы высшего порядка
  - shared composable
  - services
- Заключение

---
layout: center
timeline:
  - first: -popup-hidden
    second: -popup-hidden
    third: -popup-hidden
  - first:
  - second:
  - third:
---

<XSlide slot="features" #="{ className }">
  <div :class="className">
    <h1 class="mb-8">Возможности Аддона</h1>
    <ul class="text-xl space-y-4">
      <li :class="[t.first, 'fx']">🎭 <b>Кросс-слайдовые переходы</b> - плавная анимация между слайдами</li>
      <li :class="[t.second, 'fx']">🎨 <b>Слоты и компоненты</b> - XSlide и XSlideOut для управления контентом</li>
      <li :class="[t.third, 'fx']">✨ <b>View Transitions</b> - современные веб-анимации</li>
    </ul>
  </div>
</XSlide>

<XSlideOut slot="features" title="Возможности" class="text-center" />
