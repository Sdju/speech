---
layout: cover
---

# Vue Vapor

<v-clicks depth="2">

```mermaid
---
config:
  theme: base
  themeVariables:
    primaryColor: '#e2e3ff'
    primaryTextColor: '#003180'
    primaryBorderColor: '#003180'
    lineColor: '#003180'
    edgeLabelBackground: 'white'
---

flowchart LR
  classDef default rx:10px,ry:10px
  A[Компонент] --> B[Вызов render]
  B -- VDOM --> C[Vue]
  C ---> D[DOM]
```

```mermaid
---
config:
  theme: base
  themeVariables:
    primaryColor: '#e2e3ff'
    primaryTextColor: '#003180'
    primaryBorderColor: '#003180'
    lineColor: '#003180'
    edgeLabelBackground: 'white'
---

flowchart LR
  classDef default rx:10px,ry:10px
  A[Компонент] -. компиляция .-> B[рендер]
  B -- система реактивности --> C[DOM]
```

</v-clicks>

<v-clicks>

- Vue Vapor Mode нет VDOM
- манипуляции c DOM происходят напрямую через систему реактивности
- На момент презентации не вышел официально и все может поменяться

</v-clicks>

---
layout: cover
---

# Vue Vapor

> На момент презентации не вышел официально и все может поменяться
<br />

На данный момент в способа использования Custom Renderer с Vue Vapor - **нет**!


---
layout: intro
---
# Спасибо за внимание

> TODO! Контакты и ссылки репозитории
