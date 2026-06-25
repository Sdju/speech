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

<div class="mk-title-cover markers-theme">
  <img
    src="/img/moscowjs-logo.png"
    alt=""
    class="mk-title-cover__corner-logo"
    width="200"
    height="200"
  />
  <div class="mk-title-minimal">
    <img src="/img/title.png" alt="" class="mk-title-minimal__logo" />
    <div class="mk-title-minimal__strokes" aria-hidden="true">
      <span class="mk-title-minimal__stroke" style="--mk-color: #3498db"></span>
      <span class="mk-title-minimal__stroke" style="--mk-color: #9b59b6"></span>
      <span class="mk-title-minimal__stroke" style="--mk-color: #2ecc71"></span>
      <span class="mk-title-minimal__stroke" style="--mk-color: #ff6b9d"></span>
      <span class="mk-title-minimal__stroke" style="--mk-color: #00d4aa"></span>
    </div>
    <p class="mk-title-minimal__speaker">Денис Чернов · @zede_code</p>
  </div>
</div>

<!--
метафора: набор фломастеров — у каждого подхода свой вкус, без интерактива на титуле
-->

---
src: ./parts/1_intro.md
---

---
src: ./parts/3_redux.md
---

---
src: ./parts/2_react.md
---

---
src: ./parts/4_rxjs-push-pull.md
---

---
src: ./parts/5_signals-svelte.md
---

---
src: ./parts/6_granularity.md
---

---
src: ./parts/7_results.md
---
