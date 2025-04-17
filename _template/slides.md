---
theme: ./theme
addons:
  - ./_template/addon
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
title: Тесты
layout: center
---

<XSlide slot="title" #="{ title, className, style }">
  <h1 :class="className" :style> {{ title }} </h1>
</XSlide>
<XSlideOut slot="title" title="Добро пожаловать в Slidev!" class="text-center" />

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Нажмите пробел для перехода к следующему слайду <carbon:arrow-right class="inline"/>
  </span>
</div>

<!--
Заметки презентатора здесь
-->

---
layout: center
class: text-center
---

<XSlideOut slot="title" title="Что такое Slidev?" class="text-center" />

Slidev - это инструмент для создания слайдов, созданный для разработчиков

---
timeline:
  - mdFirst: -popup-hidden
    themes: -popup-hidden
    developer: -popup-hidden
    portable: -popup-hidden
  - mdFirst:
  - themes:
  - developer:
  - portable:
---

<XSlideOut slot="title" title="Возможности" class="" />

<ul>
<li :class="[t.mdFirst, 'fx']" > <b>Markdown-based</b> - используйте привычный markdown </li>
<li :class="[t.themes, 'fx']" > <b>Темы</b> - легко настраиваемый внешний вид </li>
<li :class="[t.developer, 'fx']" > <b>Разработчикам</b> - подсветка кода, live coding </li>
<li :class="[t.portable, 'fx']" > <b>Портативность</b> - экспорт в PDF, PNG или SPA </li>
</ul>
