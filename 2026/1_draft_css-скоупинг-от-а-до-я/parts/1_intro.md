---
slideClass: cs-dt-default
---

<div class="dt-panel max-w-860px mx-auto">
  <div class="dt-panel__header">
    <span class="dt-panel__tab dt-panel__tab--active">Elements</span>
    <span class="dt-panel__tab">Console</span>
    <span class="dt-panel__tab">Sources</span>
  </div>
  <div class="dt-panel__body">
    <div class="flex flex-row gap-6 items-center">
      <div class="size-72 rd-1 of-hidden b-1 b-[var(--dt-border)]">
        <img class="size-full object-cover" src="/img/photo.png" />
      </div>
      <div>
        <div class="dt-tree mb-3">
          <div><span class="dt-tag">speaker</span> <span class="dt-bracket">{</span></div>
          <div class="pl-4"><span class="dt-attr">name</span>: <span class="dt-value">"Денис Чернов"</span>;</div>
          <div class="pl-4"><span class="dt-attr">telegram</span>: <span class="dt-value">"@zede_code"</span>;</div>
          <div class="pl-4"><span class="dt-attr">github</span>: <span class="dt-value">"@Sdju"</span>;</div>
          <div><span class="dt-bracket">}</span></div>
        </div>
        <div class="grid grid-cols-[28px_1fr] gap-2 items-center text-sm opacity-80">
          <FileIconsTelegram /> @zede_code
          <FileIconsTelegram /> @vueist
          <IonLogoTwitch /> @izede
          <IonLogoGithub /> @Sdju
        </div>
      </div>
      <ZedeIcon class="size-72 opacity-80" />
    </div>
  </div>
</div>

<QrCodeIntro class="sp-r80_200_200_200 absolute" />

---
slideClass: cs-dt-leak
---

# Один `.title` сломал три страницы

<div class="dt-scope dt-scope--leak mt-4">
  <span class="dt-scope__label">global scope</span>

<v-clicks>

- CSS по умолчанию **глобальный**
- Компонентный UI хочет **локальности**
- Проблема не в `.title`, а в том, что компоненты живут поверх **глобального каскада**

</v-clicks>
</div>

```css
.card .title { font-size: 20px; }
.modal .title { font-size: 16px; }
/* а глобальный .title { font-weight: 900; } ломает оба */
```

---
slideClass: cs-dt-leak
---

# Что мы на самом деле хотим изолировать?

<div class="dt-panel mt-2">
  <div class="dt-panel__header">
    <span class="dt-panel__tab dt-panel__tab--active">Computed</span>
    <span class="dt-panel__tab">Styles</span>
  </div>
  <div class="dt-panel__body">

<v-clicks depth="2">

- Не конфликтуют **имена классов**
- Селекторы **не выходят** наружу
- Внешние стили **не заходят** внутрь
- Внутренние элементы можно **безопасно кастомизировать**
- Порядок подключения CSS **не ломает** UI
- Тема и дизайн-токены **проходят** куда надо

</v-clicks>

  </div>
</div>

---
slideClass: cs-dt-scope
---

# Главный тезис

<div class="box p-6 mt-6" v-click>

В 2026 году у нас наконец есть зрелый нативный `@scope` (Baseline 2025, ~87% global usage), но он **не заменяет** Shadow DOM, CSS Modules или framework scoped styles.

</div>

<div class="text-lg opacity-75 mt-6" v-click>

Каждый инструмент изолирует **разные вещи**: селекторы, имена классов, DOM-поддерево, порядок каскада или публичный API компонента.

</div>

---
slideClass: cs-dt-default
---

# Scoping ladder

<div class="dt-ladder">

<v-clicks>

<div class="dt-ladder__step"><span class="dt-ladder__level">1</span> <span class="dt-comment">/* conventions */</span> BEM, ITCSS, SMACSS, prefix</div>
<div class="dt-ladder__step"><span class="dt-ladder__level">2</span> <span class="dt-pseudo">@layer</span>, <span class="dt-pseudo">:where()</span>, reset/base/theme/utilities</div>
<div class="dt-ladder__step dt-ladder__step--active"><span class="dt-ladder__level">3</span> <span class="dt-pseudo">@scope</span> — нативный selector scoping</div>
<div class="dt-ladder__step"><span class="dt-ladder__level">4</span> CSS Modules, Vue/Svelte/Astro scoped, Angular Emulated</div>
<div class="dt-ladder__step"><span class="dt-ladder__level">5</span> Shadow DOM — <span class="dt-pseudo">:host</span>, <span class="dt-pseudo">::part</span>, <span class="dt-pseudo">::slotted</span></div>

</v-clicks>

</div>

<div class="dt-comment text-sm mt-6" v-click>// чем выше уровень — тем сильнее изоляция, но сложнее интеграция</div>

---
slideClass: cs-dt-leak
---

# Demo: global conflict

<div class="dt-split">
  <div class="dt-split__pane">
    <div class="dt-split__label">Elements</div>
    <div class="dt-tree">
      <div class="dt-tree__line dt-tree__line--selected"><span class="dt-tag">&lt;section</span> <span class="dt-attr">class</span>=<span class="dt-value">"product-card"</span><span class="dt-tag">&gt;</span></div>
      <div class="dt-tree__line pl-4"><span class="dt-tag">&lt;h2</span> <span class="dt-attr">class</span>=<span class="dt-leak">"title"</span><span class="dt-tag">&gt;</span></div>
      <div class="dt-tree__line pl-4"><span class="dt-tag">&lt;section</span> <span class="dt-attr">class</span>=<span class="dt-value">"profile-card"</span><span class="dt-tag">&gt;</span></div>
      <div class="dt-tree__line pl-8"><span class="dt-tag">&lt;h2</span> <span class="dt-attr">class</span>=<span class="dt-leak">"title"</span><span class="dt-tag">&gt;</span></div>
    </div>
  </div>
  <div class="dt-split__pane">
    <div class="dt-split__label">Styles</div>

```css
.title {
  font-size: 24px;
  color: crimson; /* leak */
}
```

  </div>
</div>

---
slideClass: cs-dt-default
---

# Конвенции: BEM и prefixing

<div class="dt-scope dt-scope--dashed">
  <span class="dt-scope__label">naming only</span>

<v-clicks>

- BEM, ITCSS, SMACSS — **дисциплина именования**, не изоляция
- Снижают вероятность конфликта, но не гарантируют
- Prefix-подходы (`ds-`, `app-`) — то же самое
- Хороший фундамент, но не ответ на компонентную архитектуру

</v-clicks>
</div>
