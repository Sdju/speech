---
layout: center
slideClass: cs-dt-cascade
---

# Cascade architecture

<div class="dt-badge">@layer</div>

## Scoping без управления каскадом всё равно ломается

---
slideClass: cs-dt-cascade
---

# Scoping ≠ cascade management

<div class="dt-panel">
  <div class="dt-panel__header">
    <span class="dt-panel__tab">Styles</span>
    <span class="dt-panel__tab dt-panel__tab--active">Layers</span>
  </div>
  <div class="dt-panel__body">

<v-clicks>

- Конфликт имён решён — но **порядок** и **специфичность** всё ещё важны
- Глобальный reset может перебить scoped-стиль
- Scoping ≠ cascade management

</v-clicks>

  </div>
</div>

---
slideClass: cs-dt-cascade
---

# `@layer` + `@scope` + tokens

```css
@layer reset, tokens, base, components, utilities;

@layer tokens {
  :root { --color-accent: oklch(65% 0.2 250); }
}

@layer components {
  @scope (.card) {
    :scope { border-radius: 12px; }
  }
}
```

---
slideClass: cs-dt-cascade
---

# Design tokens как контролируемое протекание

<v-clicks>

- CSS custom properties — **темизация через границы**
- `:where()` — нулевая специфичность для reset/base
- `:is()` и nesting — удобство, но **не изоляция**

</v-clicks>

<div class="box p-4 mt-6 text-sm" v-click>

> Хорошая изоляция — когда протекает **только то, что вы разрешили**: tokens, parts, slots, variants.

</div>
