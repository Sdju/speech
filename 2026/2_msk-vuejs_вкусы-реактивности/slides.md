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

<div class="mk-title markers-theme">
  <div class="mk-title__palette">
    <div class="mk-tray">
      <div class="mk-cap" style="--mk-color: #3498db">
        <span class="mk-cap__label">VDOM</span>
      </div>
      <div class="mk-cap" style="--mk-color: #9b59b6">
        <span class="mk-cap__label">streams</span>
      </div>
      <div class="mk-cap" style="--mk-color: #2ecc71">
        <span class="mk-cap__label">proxy</span>
      </div>
      <div class="mk-cap" style="--mk-color: #ff6b9d">
        <span class="mk-cap__label">compile</span>
      </div>
      <div class="mk-cap" style="--mk-color: #00d4aa">
        <span class="mk-cap__label">signals</span>
      </div>
    </div>

<p class="mk-epigraph">
  «Все фломастеры на вкус разные» —<br/>
  и <em>реактивность</em> не исключение
</p>

<div class="mk-swatches">
  <div class="mk-swatch" style="--mk-color: #3498db">
    <span class="mk-swatch__dot"></span>
    <span><span class="mk-swatch__taste">сухой</span> · React, иммутабельность</span>
  </div>
  <div class="mk-swatch" style="--mk-color: #9b59b6">
    <span class="mk-swatch__dot"></span>
    <span><span class="mk-swatch__taste">острый</span> · RxJS, Redux</span>
  </div>
  <div class="mk-swatch" style="--mk-color: #2ecc71">
    <span class="mk-swatch__dot"></span>
    <span><span class="mk-swatch__taste">сбалансированный</span> · Vue</span>
  </div>
  <div class="mk-swatch" style="--mk-color: #ff6b9d">
    <span class="mk-swatch__dot"></span>
    <span><span class="mk-swatch__taste">лёгкий</span> · Svelte</span>
  </div>
  <div class="mk-swatch" style="--mk-color: #00d4aa">
    <span class="mk-swatch__dot"></span>
    <span><span class="mk-swatch__taste">свежий</span> · Signals, Solid</span>
  </div>
</div>
</div>

  <div class="mk-title__content">
    <span class="mk-badge">MoscowJS · 2026</span>
    <XSlide slot="title" #="{ title, className, style }">
      <h1 :class="className" :style="style">{{ title }}</h1>
    </XSlide>
    <p class="text-base opacity-80 leading-snug">
      Нет «правильного» цвета — есть подходящий<br/>
      под задачу, команду и аппетит к сложности
    </p>
    <div class="text-sm opacity-55 font-hand italic">
      speaker · Денис Чернов · @zede_code
    </div>
  </div>
</div>

<!--
метафора: не дегустация вина, а набор фломастеров — у каждого подхода свой цвет и послевкусие
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
