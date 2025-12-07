---
theme: ./theme
addons:
  - ./1_ith_frontend-2026/addon
routerMode: hash
htmlAttrs:
  lang: ru
highlighter: shiki
lineNumbers: true
css: unocss
colorSchema: dark
transition: fade-out
contextMenu: false
mdc: true
growSeed: 4
title: "Frontend 2026: недалёкое будущее"
layout: center
---

<XSlide slot="title" #="{ title, className, style }">
  <h1 :class="className" :style="style"> {{ title }} </h1>
</XSlide>

<XSlideOut slot="title" title="Frontend 2026" class="text-center text-4xl" />

<div class="pt-12 text-center">
  <div class="text-xl opacity-75 mb-8">
    Тезисы-предсказания, с которыми можно соглашаться или спорить
  </div>
</div>

---
src: ./parts/1_frontend-2026.md
---