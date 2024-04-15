---
layout: cover
---

# Vue Vapor

<div class="grid grid-cols-[310px_1fr] gap-2" >

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

---
layout: cover
---

# Итого

<v-clicks>

- **Vue Vapor** нет **VDOM**
- манипуляции c DOM происходят напрямую через **систему реактивности**
- На момент презентации не вышел официально и **все может поменяться**

</v-clicks>

---
layout: intro
class: pt-[100px] pl-[100px]
bg.offset: 0 0
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

<style> p { @apply text-[1.25rem]; } </style>