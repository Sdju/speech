---
layout: center
topTitle: Реактивность компонентов
topTitleClass: transition-none top-[220px] left-[50%] text-[3em] translate-x-[-50%] w-full text-center
---

---
topTitle: Реактивность компонентов
---

# Setup-функция

<v-clicks>

- Обернут в `effectScope`

</v-clicks>

---
topTitle: Реактивность компонентов
---

# Render-функция

<v-clicks>

- Обернут в `ReactiveEffect`

</v-clicks>

---
topTitle: Реактивность компонентов
---

# Props

<v-clicks>

- Использует Proxy
- readonly (C версии Vue 3)

</v-clicks>

---
topTitle: Реактивность компонентов
---

# Slots

<v-clicks>

- Использует Proxy
- readonly

</v-clicks>

---
topTitle: Реактивность компонентов
---

# Template refs

<v-clicks>

- Использует Proxy

</v-clicks>

---
topTitle: Реактивность компонентов
---

# Provide / Inject

<v-clicks>

- Использует прототипное наследование
- Не обладает "прямой" реактивностью

</v-clicks>

---
dragPos:
  object-1: 449,131,73,40
  object-2: 396,216,69,40
  object-3: 505,216,69,40
  object-4: 504,308,69,40
  a: 489,169,50,47
  b: 438,167,46,52,90
  c: 438,167,46,52,90
---

<div v-drag="'object-1'" class="border-2 border-white rounded-full p-2 text-center text-[0.5em]">Object 1</div>
<div v-drag="'object-2'" class="border-2 border-white rounded-full p-2 text-center text-[0.5em]">Object 2</div>
<div v-drag="'object-3'" class="border-2 border-white rounded-full p-2 text-center text-[0.5em]">Object 3</div>
<div v-drag="'object-4'" class="border-2 border-white rounded-full p-2 text-center text-[0.5em]">Object 4</div>

<Arrow v-drag="'a'" x1="0" y1="0" x2="100%" y2="100%" />
<Arrow v-drag="'b'" x1="0" y1="0" x2="100%" y2="100%" />
<Arrow v-drag="'c'" x1="0" y1="0" x2="100%" y2="100%" />

---
dragPos:
  a: 426,124,102,40
  b: 354,209,102,40
---

<div v-drag="'a'" class="border-2 border-white rounded-md p-2 text-center text-[0.5em]">Component A</div>
<div v-drag="'b'" class="border-2 border-white rounded-md p-2 text-center text-[0.5em]">Component B</div>

---
topTitle: Реактивность компонентов
---

# Attrs

<v-clicks>

- Использует Proxy

</v-clicks>

---

<div class="text-[1.5em]">Чем отличается computed от watch?</div>

---

<img class="center w-[540px]" src="/img/incredible.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[540px]" src="/img/incredible.png" />

---
layout: intro
name: 'Задавайте вопросы'
twitch: '@izede'
discord: '@izede'
telegram: '@zede1697'
variant: first
---
