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
title: Что такое композаблы?
layout: center
---

<script setup>
import shader from './shaders/vue.glsl?raw'
</script>

<GlslImageEffect
  :image="'./img/vue-cons.png'"
  :stages="[{
    fragmentShader: shader,
    textures: [{
      options: {
        objectFit: 'cover'
      }
    }]
  }]"
/>

<XSlide slot="title" #="{ title, className, style }">
  <h1 :class="className" :style="style"> {{ title }} </h1>
</XSlide>

<XSlideOut slot="title" title="Созвездия композаблов" class="text-center text-4xl" />

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