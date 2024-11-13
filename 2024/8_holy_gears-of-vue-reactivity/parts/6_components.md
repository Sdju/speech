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

<Timeline2 :steps="[{
  component: 'fx duration-500 -popup-hidden',
  proxy: 'fx duration-500 -popup-hidden',
  jsPrototypes: 'fx duration-500 -popup-hidden',
  props: 'fx duration-500 -popup-hidden',
  slots: 'fx duration-500 -popup-hidden',
  attrs: 'fx duration-500 -popup-hidden',
  refs: 'fx duration-500 -popup-hidden',
  provideInject: 'fx duration-500 -popup-hidden',
}, {
  component: 'fx duration-500',
}, {
  proxy: 'fx duration-500',
}, {
  jsPrototypes: 'fx duration-500',
}, {
  provideInject: 'fx duration-500',
}, {
  props: 'fx duration-500',
  slots: 'fx duration-500',
  attrs: 'fx duration-500',
  refs: 'fx duration-500',
}]" v-slot="t">

<div class="grid grid-rows-3 gap-4">
  <Node class="py-4" :class="t.component" inject color="green">Component</Node>
  <div class="grid grid-cols-5 gap-4">
    <Node class="col-span-4" :class="t.proxy" inject color="blue">Proxy</Node>
    <Node class="col-span-1 text-[0.7em]" :class="t.jsPrototypes" inject color="red">JS Prototypes</Node>
  </div>
  <div class="grid grid-cols-5 gap-4">
    <Node :class="t.props" inject color="blue">Props</Node>
    <Node :class="t.slots" inject color="blue">Slots</Node>
    <Node :class="t.attrs" inject color="blue">Attrs</Node>
    <Node :class="t.refs" inject color="blue">Refs</Node>
    <Node :class="t.provideInject" inject color="red" class="text-[0.7em]">Provide/Inject</Node>
  </div>
</div>

</Timeline2>

<!--
- подумать про вырезание provide/inject
-->

---
clicks: 1
slideClass: cs-blue
disabled: true
---

<Timeline2 :steps="[{
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

</Timeline2>

---
clicks: 5
---

<Timeline2 :steps="[{
  protoClasses: 'outline outline-2 outline-[#CCCCCC88]',
  reactiveClasses: '-blur-hidden outline-[#00000088]',
  effectClasses: '-blur-hidden outline-[#00000088]',
  primitiveClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 fx duration-500',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
  example4: 'absolute pos-0 fx duration-500 -blur-hidden',
}, {
}, {
  protoClasses: 'outline-[#00000088]',
  reactiveClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500',
}, {
  reactiveClasses: 'outline-[#00000088]',
  effectClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500',
}, {
  effectClasses: 'outline-[#00000088]',
  primitiveClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
  example4: 'absolute pos-0 fx duration-500',
}]" v-slot="t">

<h1 class="text-center">Provide / Inject</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.protoClasses">
    <div class="item-icon">
      <TablerBinaryTree/>
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
      <FluentStarHalf16Filled/>
    </div>
    <div>
      Используйте реактивные примитивы
    </div>
  </div>
  <div class="item fx duration-400" :class="t.primitiveClasses">
    <div class="item-icon">
      <IcRoundMoneyOffCsred/>
    </div>
    <div>
      Почти бесплатный
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">
    
<div :class="t.example1" >

````md magic-move {lines: false}
```ts
function provide(key, value) {
  const self = getCurrentInstance()

  if (!hasProvides(self)) {
    self.provides = Object.create(
      self.parent?.provides
    )
  }
  
  self.provides[key] = value
}
```
```ts
function inject(key) {
  const self = getCurrentInstance()
  return self.parent?.provides[key]
}
```
````

</div>

<div :class="t.example2">

```ts
const value = inject('key')

// <=>

const value = object['key']
```

</div>

<div :class="t.example3">

```ts
const data = provide('key', ref(10))

// child.vue

const parentData = inject('key')
const computedData = computed(
  () => parentData.value + 1
)
```

</div>

<div :class="t.example4">

```ts
const value = inject('key')
provide('key', value2)

// <=>

const value = object['key']
object['key'] = value2
```

</div>

  </div>
</div>

</Timeline2>

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
---
