---
layout: center
slideClass: cs-dt-scope
---

# `@scope`

<div class="dt-badge">@scope</div>

## Наконец-то scoped CSS без сборщика

---
slideClass: cs-dt-scope
---

# Что такое `@scope`

<div class="dt-scope dt-scope--dashed">
  <span class="dt-scope__label">@scope (.card)</span>

<v-clicks>

- At-rule для таргетинга элементов внутри **конкретных DOM-поддеревьев**
- Без чрезмерно специфичных селекторов и жёсткой привязки к структуре
- **Baseline 2025** — Chrome 118+, Firefox 128+, Safari 17.4+
- ~87% global browser usage (Can I Use, 2026)

</v-clicks>
</div>

```css
@scope (.card) {
  h2 { font-size: 1.25rem; }
  img { border-radius: 12px; }
}
```

---
slideClass: cs-dt-scope
---

# Scope root и lower boundary

<v-clicks>

- `.card` — **scope root**, корень области
- Селекторы внутри работают только в этом поддереве
- `:scope` — псевдокласс для обращения к корню области
- `to (...)` — **нижняя граница** (donut scope)

</v-clicks>

```css
@scope (.card) to (.nested-widget) {
  h2 { color: rebeccapurple; }
}
```

---
slideClass: cs-dt-scope
---

# Scoping proximity

<div class="dt-panel">
  <div class="dt-panel__header">
    <span class="dt-panel__tab">Styles</span>
    <span class="dt-panel__tab dt-panel__tab--active">Computed</span>
  </div>
  <div class="dt-panel__body">

<v-clicks>

- При равной специфичности побеждает правило, scope-root которого **ближе к элементу**
- Вложенный `.card` внутри `.card` — внутренний scope выигрывает
- Это критерий каскада, не магия сборщика

</v-clicks>

  </div>
</div>

---
slideClass: cs-dt-scope
---

# Где `@scope` хорош

<v-clicks depth="2">

- ✅ Нативный CSS, без JS и сборщика
- ✅ Снижает потребность в BEM-именах
- ✅ Контентные блоки, CMS, дизайн-системные секции
- ✅ Layout-области, landing-страницы
- ✅ Работает с `@layer`, nesting, custom properties

</v-clicks>

---
slideClass: cs-dt-scope
---

# Где `@scope` обманчив

<v-clicks depth="2">

- ❌ Это **не настоящая инкапсуляция**
- ❌ Внешние глобальные стили всё ещё могут попасть внутрь
- ❌ Наследуемые свойства всё ещё наследуются
- ❌ Нет автоматической связи с компонентом фреймворка
- ❌ Legacy-браузеры — fallback или отказ

</v-clicks>

<div class="box p-4 mt-6 text-sm" v-click>

> `@scope` ограничивает действие селекторов, но **не строит стену** вокруг компонента.

</div>

---
slideClass: cs-dt-scope
---

# Demo: `@scope`

<div class="dt-scope dt-scope--dashed">
  <span class="dt-scope__label">donut scope</span>

```css
@scope (.card) {
  :scope {
    padding: 1rem;
    border-radius: 12px;
  }

  h2 {
    font-size: 1.25rem;
  }
}
```

</div>
