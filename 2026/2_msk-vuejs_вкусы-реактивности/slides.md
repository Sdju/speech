---
theme: ./theme
addons:
  - ./2_msk-vuejs_вкусы-реактивности/addon
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
growOpacity: 0.55
growBlur: 110
title: Вкусы реактивности
layout: center
---

<div class="mk-title-minimal markers-theme">
  <div class="mskjs-brand">
    <img src="/img/moscowjs-logo.png" alt="" class="mskjs-brand__logo" width="42" height="42" />
    <div class="mskjs-brand__text">
      <span class="mskjs-brand__name">MoscowJS</span>
      <span class="mskjs-brand__edition">71</span>
    </div>
  </div>
  <p class="mskjs-brand__meta">25 июня 2026 · Школа 21</p>

  <XSlide slot="title" #="{ title, className, style }">
    <h1 :class="className" :style="style">{{ title }}</h1>
  </XSlide>

  <p class="mk-epigraph mk-title-minimal__quote">
    Все фломастеры на вкус разные — и <em>реактивность</em> не исключение
  </p>

  <div class="mk-title-minimal__strokes" aria-hidden="true">
    <span class="mk-title-minimal__stroke" style="--mk-color: #3498db"></span>
    <span class="mk-title-minimal__stroke" style="--mk-color: #9b59b6"></span>
    <span class="mk-title-minimal__stroke" style="--mk-color: #2ecc71"></span>
    <span class="mk-title-minimal__stroke" style="--mk-color: #ff6b9d"></span>
    <span class="mk-title-minimal__stroke" style="--mk-color: #00d4aa"></span>
  </div>

  <p class="mk-title-minimal__speaker">Денис Чернов · @zede_code</p>
</div>

<!--
метафора: набор фломастеров — у каждого подхода свой цвет, без интерактива на титуле
-->

---
src: ./parts/1_intro.md
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
src: ./parts/6_results.md
---
