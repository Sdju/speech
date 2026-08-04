---
layout: center
slideClass: cs-dt-utility
---

# CSS-in-JS, zero-runtime и utility-first

<div class="dt-badge">runtime injection</div>

---
slideClass: cs-dt-utility
---

# Runtime CSS-in-JS

<div class="dt-split">
  <div class="dt-split__pane">
    <div class="dt-split__label">styled-components</div>
    <v-clicks>
    <ul class="text-sm">
      <li>Уникальные class names в runtime</li>
      <li>Динамика от props</li>
      <li>Удобная темизация</li>
    </ul>
    </v-clicks>
  </div>
  <div class="dt-split__pane">
    <div class="dt-split__label">warnings</div>
    <v-clicks>
    <ul class="text-sm">
      <li>Runtime-стоимость</li>
      <li>Порядок инъекции стилей</li>
      <li>SSR, RSC, performance</li>
    </ul>
    </v-clicks>
  </div>
</div>

---
slideClass: cs-dt-utility
---

# vanilla-extract

<v-clicks>

- **Zero-runtime** Stylesheets-in-TypeScript
- Классы, переменные, темы → статические CSS на build time
- Ближе к **CSS Modules + TypeScript + tokens**

</v-clicks>

```ts
export const card = style({
  padding: '1rem',
  borderRadius: '12px',
});
```

---
slideClass: cs-dt-utility
---

# Tailwind: avoidance strategy

```html
<article class="rounded-xl p-4 shadow-md">
  <h2 class="text-xl font-semibold">Card</h2>
</article>
```

<v-clicks>

- **Не изолирует** в классическом смысле
- Снижает конфликты через отказ от semantic class names
- `tailwind-merge` + component boundaries — дисциплина

</v-clicks>

---
slideClass: cs-dt-default
---

# Что намеренно не углубляем

<div class="dt-comment">

<v-clicks>

- История `<style scoped>` attribute
- CSSWG-детали спецификаций
- Полный разбор всех CSS-in-JS библиотек
- Performance benchmarks

</v-clicks>

</div>

<div class="text-lg mt-6" v-click>

Фокус: **какой уровень изоляции нужен и какую цену вы готовы заплатить?**

</div>
