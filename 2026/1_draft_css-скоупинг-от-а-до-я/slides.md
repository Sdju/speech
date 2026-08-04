---
theme: ./theme
addons:
  - '@/addon'
routerMode: hash
htmlAttrs:
  lang: ru
lineNumbers: true
colorSchema: dark
transition: fade-out
contextMenu: false
comark: true
growSeed: 4
title: CSS скоупинг от А до Я
layout: center
slideClass: cs-dt-scope
---

<div class="dt-title-grid">
  <div class="dt-title-grid__code">
    <div class="dt-comment">/* Styles — computed */</div>
    <div class="mt-2"><span class="dt-tag">html</span> <span class="dt-bracket">{</span></div>
    <div class="dt-tree__indent pl-4"><span class="dt-attr">--scope-level</span>: <span class="dt-value">native → shadow</span>;</div>
    <div class="dt-tree__indent pl-4"><span class="dt-attr">isolation</span>: <span class="dt-pseudo">@scope</span> <span class="dt-value">+</span> <span class="dt-pseudo">::part</span>;</div>
    <div><span class="dt-bracket">}</span></div>
    <div class="mt-3"><span class="dt-pseudo">@scope</span> <span class="dt-bracket">(</span><span class="dt-value">.deck</span><span class="dt-bracket">)</span> <span class="dt-bracket">{</span></div>
    <div class="pl-4"><span class="dt-tag">h1</span> <span class="dt-bracket">{</span> <span class="dt-attr">color</span>: <span class="dt-value">#9cdcfe</span>; <span class="dt-bracket">}</span></div>
    <div><span class="dt-bracket">}</span></div>
  </div>
  <div class="dt-title-grid__meta">
  <span class="dt-badge">Baseline 2025</span>
  <XSlide slot="title" #="{ title, className, style }">
    <h1 :class="className" :style="style">{{ title }}</h1>
  </XSlide>
  <p class="text-base opacity-80 leading-snug">
    @scope, Shadow DOM, CSS Modules, scoped styles<br/>
    и почему «локальные стили» не всегда локальные
  </p>
  <div class="dt-tree text-sm opacity-70">
    <span class="dt-tag">speaker</span>
    <span class="dt-bracket">::</span>
    <span class="dt-value">Денис Чернов</span>
    <span class="dt-bracket"> / </span>
    <span class="dt-attr">@zede_code</span>
  </div>
  </div>
</div>

<!--
главный тезис: в 2026 есть зрелый @scope, но он не заменяет Shadow DOM / CSS Modules / framework scoped
-->

---
src: ./parts/1_intro.md
---

---
src: ./parts/2_scope.md
---

---
src: ./parts/3_shadow-dom.md
---

---
src: ./parts/4_build-time.md
---

---
src: ./parts/5_modern.md
---

---
src: ./parts/6_cascade.md
---

---
src: ./parts/7_conclusion.md
---
