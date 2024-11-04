---
layout: center
topTitle: Components
topTitleClass: transition-none top-[220px] left-[50%] text-[3em] translate-x-[-50%] w-full text-center
---


---
topTitle: Components
disabled: true
---

# Setup-функция

<v-clicks>

- Обернут в `effectScope`

</v-clicks>

---
topTitle: Components
disabled: true
---

# Render-функция

<v-clicks>

- Обернут в `ReactiveEffect`

</v-clicks>

---
topTitle: Components
---

<div class="grid grid-rows-3 gap-4">
  <Node class="py-4" inject color="green">Component</Node>
  <div class="grid grid-cols-5 gap-4">
    <Node class="col-span-4" inject color="blue">Proxy</Node>
    <Node class="col-span-1 text-[0.7em]" inject color="red">JS Prototypes</Node>
  </div>
  <div class="grid grid-cols-5 gap-4">
    <Node inject color="blue">Props</Node>
    <Node inject color="blue">Slots</Node>
    <Node inject color="blue">Attrs</Node>
    <Node inject color="blue">Refs</Node>
    <Node inject color="red" class="text-[0.7em]">Provide/Inject</Node>
  </div>
</div>

<!--
- подумать про вырезание provide/inject
-->

---
clicks: 1
variant: blue
---

<Timeline :steps="[{
  parent: 'top-[200px] left-[50%]',
  child1: 'left-[414px] top-[289px]',
  child2: 'left-[570px] top-[289px]',
  child3: 'left-[344px] top-[379px]',
  child4: 'left-[484px] top-[379px]',
  arrowParentChild1: {
    coords: '487:228 413:261',
    class: 'fx duration-500 animate'
  },
  arrowParentChild2: {
    coords: '490:228 570:261',
    class: 'fx duration-500 animate'
  },
  arrowChild1Child3: {
    coords: '413:317 344:350',
    class: 'fx duration-500 animate'
  },
  arrowChild1Child4: {
    coords: '416:317 484:350',
    class: 'fx duration-500 animate'
  },
}]" v-slot="t">

<Node :class="t.parent">Parent</Node>
<Node :class="t.child1">Child 1</Node>
<Node :class="t.child2">Child 2</Node>
<Node :class="t.child3">Child 3</Node>
<Node :class="t.child4">Child 4</Node>

<SvgLayer>
  <SvgArrow :class="t.arrowParentChild1.class" :coords="t.arrowParentChild1.coords" :power="-0.2" />
  <SvgArrow :class="t.arrowParentChild2.class" :coords="t.arrowParentChild2.coords" :power="0.2" />
  <SvgArrow :class="t.arrowChild1Child3.class" :coords="t.arrowChild1Child3.coords" :power="-0.2" />
  <SvgArrow :class="t.arrowChild1Child4.class" :coords="t.arrowChild1Child4.coords" :power="0.2" />
</SvgLayer>

</Timeline>

---
clicks: 5
---

<Timeline :steps="[{
  protoClasses: 'outline outline-2 outline-[#CCCCCC88]',
  reactiveClasses: '-blur-hidden outline-[#00000088]',
  effectClasses: '-blur-hidden outline-[#00000088]',
  primitiveClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  protoClasses: 'outline-[#00000088]',
  reactiveClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  reactiveClasses: 'outline-[#00000088]',
  effectClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  effectClasses: 'outline-[#00000088]',
  primitiveClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<h1 class="text-center">Provide / Inject</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.protoClasses">
    <div class="item-icon">
      <UilBox />
    </div>
    <div>
      Работает на основе прототипного наследования
    </div>
  </div>
  <div class="item fx duration-400" :class="t.reactiveClasses">
    <div class="item-icon">
      <UilBox />
    </div>
    <div>
      Не обладает "прямой" реактивностью
    </div>
  </div>
  <div class="item fx duration-400" :class="t.effectClasses">
    <div class="item-icon">
      <UisSchedule />
    </div>
    <div>
      Почти бесплатный
    </div>
  </div>
  <div class="item fx duration-400" :class="t.primitiveClasses">
    <div class="item-icon">
      <UilBox />
    </div>
    <div>
      Используйте реактивные примитивы
    </div>
  </div>
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>

---

<VueMap />

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
variant: green
---
