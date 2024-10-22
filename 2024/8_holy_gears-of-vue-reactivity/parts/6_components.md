---
layout: center
topTitle: Components
topTitleClass: transition-none top-[220px] left-[50%] text-[3em] translate-x-[-50%] w-full text-center
---

---
topTitle: Components
---

<div class="grid grid-rows-3 gap-4">
  <NodeGraph class="py-4 bg-[#4ade804d]">Component</NodeGraph>
  <div class="grid grid-cols-5 gap-4">
    <NodeGraph v-click class="col-span-4 bg-[#3c5cff4d]">Proxy</NodeGraph>
    <NodeGraph v-click class="col-span-1 bg-[#ff4d4d4d]">JS Prototypes</NodeGraph>
  </div>
  <div class="grid grid-cols-5 gap-4">
    <NodeGraph v-click class="bg-[#3c5cff4d]">Props</NodeGraph>
    <NodeGraph v-click="'+0'" class="bg-[#3c5cff4d]">Slots</NodeGraph>
    <NodeGraph v-click="'+0'" class="bg-[#3c5cff4d]">Attrs</NodeGraph>
    <NodeGraph v-click="'+0'" class="bg-[#3c5cff4d]">Refs</NodeGraph>
    <NodeGraph v-click class="bg-[#ff4d4d4d]">Provide/Inject</NodeGraph>
  </div>
</div>


---
topTitle: Components
---

# Setup-функция

<v-clicks>

- Обернут в `effectScope`

</v-clicks>

---
topTitle: Components
---

# Render-функция

<v-clicks>

- Обернут в `ReactiveEffect`

</v-clicks>

---
topTitle: Components
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
