---
layout: cover
class: text-center
---

# Vue Vapor

<div class="grid grid-cols-[1fr_200px_200px_1fr] gap-2" >

<div />

<v-clicks depth="2">

```mermaid
---
config:
  theme: base
  themeVariables:
    primaryColor: 'rgb(58, 186, 127)'
    primaryTextColor: 'white'
    primaryBorderColor: 'rgb(58, 186, 127)'
    lineColor: '#4E9F4EFF'
    edgeLabelBackground: 'black'
---

flowchart TB
  classDef default rx:4px,ry:4px
  A[Компонент] --> B[Вызов render]
  B -- VDOM --> C[Vue]
  C -- Renderer --> D[DOM]
```

```mermaid
---
config:
  theme: base
  themeVariables:
    primaryColor: 'rgb(58, 186, 127)'
    primaryTextColor: 'white'
    primaryBorderColor: 'rgb(58, 186, 127)'
    lineColor: '#4E9F4EFF'
    edgeLabelBackground: 'black'
---

flowchart TB
  classDef default rx:4px,ry:4px
  A[Компонент] -. компиляция .-> B[рендер]
  B -- система реактивности --> C[DOM]
```

</v-clicks>

</div>

<!--
Ну и заглянем немножеско в будущее Vue. А ближайшее будущее у Vue это Vue Vapor.
Давайте немного познакомимся с ним, чтобы понимать его совместимость с рендерарами.

Если раньше схема была примерно такая: где мы вначале создаем инстанс компонента, потом у него вызывается рендер, который возвращает VDOM и далее Vue используя рендерер превращает его в DOM. То с Vue Vapor ситуация обстоит несколько иначе

Теперь наш компонент компилируется, чтобы создать правильную рендер функцию, которая при вызове возвращает не VDOM, а настраивает систему реактивности так, чтобы она сама меняла значения в DOM при необходимости. Таким образом:
-->

---
layout: cover
---

# Итого

<v-clicks>

- **Vue Vapor** нет **VDOM**
- манипуляции c DOM происходят напрямую через **систему реактивности**
- На момент презентации не вышел официально и **все может поменяться**

</v-clicks>

<!--
- Vue Vapor не использует VDOM, а следовательно ему не нужно превращать виртуальные ноды в реальные
- Манипуляции с DOM происходят напрямую, без использования рендереров
- Ну и на момент выступления Vue Vapor все еще не вышел и возможно нам все же дадут какое-то API для работы
-->

---
layout: intro
class: pt-[100px] pl-[100px]
bg.green: 308 359 280 277
bg.black: 285 320 235 232
bg.accent: 287 344 182 192
bg.green.trans: rotate(-20.8609 308.673 359.341)
bg.black.trans: rotate(-20.8609 285.307 320.668)
bg.accent.trans: rotate(-20.8609 287.186 344.356)
---

<div class="mb-[50px] flex flex-row">
  <div class="w-[80px] h-[80px] bg-amber rd-full of-hidden">
    <img class="w-full h-full object-cover" src="/img/photo.png" />
  </div>
  <div class="w-[80px] h-[80px] rd-full ml-[15px]">
    <zede-icon class="w-full h-full" />
  </div>
</div>
<div class="text-4xl mb-[50px]">Спасибо за внимание!</div>
<p><file-icons-telegram /> @zede_code</p>
<p><ion-logo-twitch /> @izede</p>
<p><ion-logo-github /> @Sdju</p>

<QrCodeIntro class="w-[200px] h-[200px] absolute top-[200px] right-[80px]" />
<QrCodeIntro class="w-[200px] h-[200px] absolute top-[200px] right-[80px]" />

<style> p { @apply text-[1.25rem]; } </style>

<!--
Спасибо за внимание. Задавайте вопросы
-->
