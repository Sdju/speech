---
layout: center
slideClass: cs-dt-shadow
---

# Shadow DOM

<div class="dt-badge">#shadow-root</div>

## Настоящая граница, но с ценой

---
slideClass: cs-dt-shadow
---

# Shadow DOM: DOM внутри DOM

<div class="dt-scope dt-scope--solid">
  <span class="dt-scope__label">#shadow-root (open)</span>

<v-clicks>

- Прикрепляет DOM-дерево к элементу
- Внутренности **скрыты** от CSS и JS страницы
- Стили страницы **не проходят** внутрь напрямую
- Стили внутри shadow tree **не выходят** наружу

</v-clicks>
</div>

```js
const root = element.attachShadow({ mode: 'open' });
root.innerHTML = `...`;
```

---
slideClass: cs-dt-shadow
---

# Что не протекает через boundary

<div class="dt-tree text-base">
  <div class="dt-tree__line"><span class="dt-tag">&lt;app-card&gt;</span></div>
  <div class="dt-tree__line pl-4"><span class="dt-comment">#shadow-root</span></div>
  <div class="dt-tree__line pl-8"><span class="dt-tag">&lt;button&gt;</span> <span class="dt-comment">/* isolated */</span></div>
</div>

<v-clicks class="mt-4">

- Обычные CSS-селекторы снаружи **не работают** внутри
- `document.querySelector` **не видит** shadow DOM
- Исключения: `inherit`, CSS custom properties
- Escape hatches: `::part`, `::slotted`

</v-clicks>

---
slideClass: cs-dt-shadow
---

# `:host`, `::slotted`, `::part`

<v-clicks depth="2">

- **`:host`** — стилизует сам custom element
- **`::slotted()`** — slotted-контент, но ограниченно
- **`::part()`** — контролируемый публичный styling API
- **`part="button"`** → `app-card::part(button)` снаружи

</v-clicks>

```css
app-card::part(button) {
  background: var(--accent);
}
```

---
slideClass: cs-dt-shadow
---

# Theming через custom properties

<v-clicks>

- CSS custom properties **проникают** через shadow boundary
- `var(--card-radius, 12px)` — дефолт + переопределение снаружи
- `adoptedStyleSheets` — переиспользование CSSStyleSheet
- Главный механизм темизации для Web Components

</v-clicks>

```css
:host {
  border-radius: var(--card-radius, 12px);
}
button {
  color: var(--card-accent, royalblue);
}
```

---
slideClass: cs-dt-shadow
---

# Shadow DOM: плюсы / минусы

<div class="dt-split">
  <div class="dt-split__pane">
    <div class="dt-split__label">✓ computed</div>
    <v-clicks>
    <ul class="text-sm">
      <li>Самая сильная браузерная изоляция</li>
      <li>Web Components — стандарт</li>
      <li>Cross-framework дизайн-системы</li>
      <li>API: <code>::part</code>, slots, tokens</li>
    </ul>
    </v-clicks>
  </div>
  <div class="dt-split__pane">
    <div class="dt-split__label">✗ overridden</div>
    <v-clicks>
    <ul class="text-sm">
      <li>Сложнее глобальная темизация</li>
      <li>portals / global CSS ломаются</li>
      <li>Shadow DOM-специфика</li>
      <li>SSR / hydration сложнее</li>
    </ul>
    </v-clicks>
  </div>
</div>

<div class="box p-4 mt-6 text-sm" v-click>

> Shadow DOM — не «ещё один scoped CSS». Это **архитектурная граница**.

</div>

---
slideClass: cs-dt-shadow
---

# Demo: Shadow DOM

```js
class AppCard extends HTMLElement {
  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host { border-radius: var(--card-radius, 12px); }
        button { color: var(--card-accent, royalblue); }
      </style>
      <article>
        <slot></slot>
        <button part="action">Action</button>
      </article>
    `;
  }
}
```
