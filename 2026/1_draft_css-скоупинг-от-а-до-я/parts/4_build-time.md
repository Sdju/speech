---
layout: center
slideClass: cs-dt-build
---

# Build-time scoping

<div class="dt-badge">data-v-xxxxx</div>

## Как это делают фреймворки и сборщики

---
slideClass: cs-dt-build
---

# CSS Modules

<div class="dt-tree text-sm mb-4">
  <div><span class="dt-tag">&lt;button</span> <span class="dt-attr">class</span>=<span class="dt-value">"Button_root__a8f3x"</span><span class="dt-tag">&gt;</span></div>
</div>

<v-clicks>

- Имена классов и анимаций **локальны по умолчанию**
- Импорт как JS-объект: `styles.root`
- Почти обычный CSS, без runtime-инъекции

</v-clicks>

```tsx
import styles from './Button.module.css';
export function Button() {
  return <button className={styles.root}>Save</button>;
}
```

---
slideClass: cs-dt-build
---

# Vue `<style scoped>`

```vue
<style scoped>
.card { padding: 16px; }
.card :deep(.child-title) { font-weight: 600; }
</style>
```

<div class="dt-tree text-sm mt-4" v-click>
  <div><span class="dt-comment">/* compiled */</span></div>
  <div><span class="dt-value">.card</span><span class="dt-bracket">[</span><span class="dt-attr">data-v-7ba5bd90</span><span class="dt-bracket">]</span></div>
</div>

<div class="dt-comment text-sm mt-4" v-click>// :deep() — контролируемое нарушение границы</div>

---
slideClass: cs-dt-build
---

# Svelte / Astro / Angular

<div class="dt-panel">
  <div class="dt-panel__header">
    <span class="dt-panel__tab dt-panel__tab--active">Sources</span>
    <span class="dt-panel__tab">Network</span>
  </div>
  <div class="dt-panel__body text-sm">

<v-clicks depth="2">

- **Svelte** — `svelte-123xyz` hash-класс по умолчанию
- **Astro** — `data-astro-cid-*`, не протекает в child components
- **Angular** — `Emulated` / `ShadowDom` / `None`

</v-clicks>

  </div>
</div>

---
slideClass: cs-dt-build
---

# Общий паттерн

<div class="box p-6 mt-4" v-click>

> Большинство framework scoped styles — это **не Shadow DOM**, а переписывание селекторов через атрибуты или hash-классы.

</div>

<v-clicks>

- Изоляция **имён** и **селекторов**, не DOM
- Внешний CSS всё ещё может попасть внутрь
- Deep/global escape hatches — осознанный дизайн

</v-clicks>

---
slideClass: cs-dt-build
---

# Demo: CSS Modules

<div class="dt-scope dt-scope--dashed">
  <span class="dt-scope__label">.module.css</span>

```tsx
import styles from './Card.module.css';

export function Card() {
  return (
    <article className={styles.root}>
      <h2 className={styles.title}>Card</h2>
    </article>
  );
}
```

</div>
