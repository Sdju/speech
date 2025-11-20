---
theme: ./theme
addons:
  - ./holy_composables-constellation/addon
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
title: Созвездия композаблов
layout: center
---

<script setup>
import shader from './shaders/vue.glsl?raw'
import VueConsImg from './img/vue-cons.png'
</script>

<GlslImageEffect
  class="pos-50%_35% $obj absolute size-full"
  :image="VueConsImg"
  :stages="[{
    fragmentShader: shader
  }]"
/>

<h1 :class="className" class="text-center text-4xl pos-50%_65% $obj title-bg"> Созвездия композаблов </h1>

---
src: ./parts/2_intro.md
---

---
src: ./parts/3_what-are-composables.md
---

---
src: ./parts/4_basics.md
---

---
src: ./parts/5_specific.md
---

---
src: ./parts/6_complex.md
---

---
src: ./parts/7_conclusions.md
---