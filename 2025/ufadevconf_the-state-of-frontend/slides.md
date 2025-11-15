---
theme: ./theme
addons:
  - ./ufadevconf_the-state-of-frontend/addon
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
title: Состояние фронтенда на 2025 год
layout: center
---

<script setup>
import shader from './shaders/vue.glsl?raw'
</script>

<XSlide slot="title" #="{ title, className, style }">
  <h1 :class="className" :style="style"> {{ title }} </h1>
</XSlide>

<XSlideOut slot="title" title="Состояние фронтенда на 2025 год" class="text-center text-4xl" />

---
src: ./parts/2_intro.md
---


---
src: ./parts/3_trends.md
---

---
src: ./parts/4_stack.md
---