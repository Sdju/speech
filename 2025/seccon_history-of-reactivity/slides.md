---
theme: ./theme
addons:
  - ./seccon_history-of-reactivity/addon
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
title: История реактивности Frontend
layout: center
---

<XSlide slot="title" #="{ title, className, style }">
  <h1 :class="className" :style="style"> {{ title }} </h1>
</XSlide>

<XSlideOut slot="title" title="История реактивности Frontend" class="text-center text-4xl" />

<div class="pt-12 text-center">
  <div class="text-xl opacity-75 mb-8">
    От спагетти-кода до signals: эволюция подходов к управлению состоянием
  </div>
</div>

---
src: ./parts/1_intro.md
---

---
src: ./parts/2_early_reactivity.md
---

---
src: ./parts/3_popular_frameworks.md
---

---
src: ./parts/4_modern_approaches.md
---

---
src: ./parts/5_conclusion.md
---
