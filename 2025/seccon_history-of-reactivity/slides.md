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

<XSlideOut slot="title" title="Реактивность и все все все" class="text-center text-4xl" />

<div class="pt-12 text-center">
  <div class="text-xl opacity-75 mb-8">
    От спагетти-кода до сигналов: эволюция подходов к управлению состоянием
  </div>
</div>

<!--
подстелить соломку реактивность как парадигма / отличие от реактивности UI
-->

---
src: ./parts/1_intro.md
---

---
src: ./parts/2_static-model.md
---

---
src: ./parts/3_mv-model.md
---

---
src: ./parts/4_state-management.md
---

---
src: ./parts/5_modern.md
---

---
src: ./parts/6_conclusion.md
---
