---
layout: center
slideClass: cs-dt-scope
---

# Как выбрать подход в 2026

---
slideClass: cs-dt-scope
---

# Decision matrix

<div class="dt-panel text-sm">
  <div class="dt-panel__header">
    <span class="dt-panel__tab dt-panel__tab--active">Coverage</span>
    <span class="dt-panel__tab">Issues</span>
  </div>
  <div class="dt-panel__body overflow-x-auto">

| Сценарий | Выбор | Почему |
|----------|-------|--------|
| SPA | CSS Modules + `@layer` | Просто, стабильно |
| Vue/Svelte/Astro | scoped styles | DX |
| React | CSS Modules / vanilla-extract | Build-time |
| Cross-framework DS | Shadow DOM | Независимость |
| Виджет на чужом сайте | Shadow DOM | Защита |
| CMS / landing | `@scope` + `@layer` | Нативно |

  </div>
</div>

---
slideClass: cs-dt-scope
---

# 5 правил CSS scoping в 2026

<div class="dt-ladder text-sm">

<v-clicks>

<div class="dt-ladder__step"><span class="dt-ladder__level">1</span> Hash-классы, <span class="dt-pseudo">@scope</span>, Shadow DOM — разные задачи</div>
<div class="dt-ladder__step"><span class="dt-ladder__level">2</span> <span class="dt-pseudo">@scope</span> — selectors, не encapsulation</div>
<div class="dt-ladder__step"><span class="dt-ladder__level">3</span> Shadow DOM — проектируйте <span class="dt-pseudo">::part</span> заранее</div>
<div class="dt-ladder__step"><span class="dt-ladder__level">4</span> CSS Modules / scoped — практичный default</div>
<div class="dt-ladder__step dt-ladder__step--active"><span class="dt-ladder__level">5</span> Scoping + <span class="dt-pseudo">@layer</span> + tokens</div>

</v-clicks>

</div>

---
slideClass: cs-dt-scope
---

# Takeaways

<div class="dt-scope dt-scope--solid max-w-800px mx-auto mt-6">
  <span class="dt-scope__label">styling contract</span>

<div class="text-xl leading-relaxed" v-click>

Идеальная изоляция — не «никто никого не видит».

Это **контракт**: что скрыто, что можно переопределить и через какой API.

</div>
</div>

---
slideClass: cs-dt-scope
---

# Вопросы?

<div class="dt-panel max-w-400px mx-auto mt-8">
  <div class="dt-panel__header">
    <span class="dt-panel__tab dt-panel__tab--active">Console</span>
  </div>
  <div class="dt-panel__body dt-tree text-sm text-center">
    <div><span class="dt-comment">// @zede_code · @vueist</span></div>
  </div>
</div>

<QrCodeIntro class="sp-r80_200_200_200 absolute" />
