---
slideClass: cs-grey
topTitle: · выбор ·
topTitleClass: mk-top-flavor
layout: center
---

# Что и как выбрать

Гранулярность обновлений

---
slideClass: cs-grey
topTitle: · выбор ·
topTitleClass: mk-top-flavor
timeline:
  - point1: active
    point2: hidden
    point3: hidden
    point4: hidden
    example: cs-green
    exampleId: 1
  - point1: ''
    point2: active
    example: cs-blue
    exampleId: 2
  - point2: ''
    point3: active
    example: cs-purple
    exampleId: 3
  - point3: ''
    point4: active
    example: cs-green
    exampleId: 4
---

# Fine Grained Reactivity

<Points>
  <Point :attrs="t.point1" class="cs-green" icon="i-material-symbols-category-rounded">Элементы четко разделены между собой по ролям</Point>
  <Point :attrs="t.point2" class="cs-blue" icon="i-material-symbols-hub-rounded">Критически важен граф зависимостей</Point>
  <Point :attrs="t.point3" class="cs-purple" icon="i-material-symbols-target-rounded">Обновление применяется максимально точечно</Point>
  <Point :attrs="t.point4" class="cs-orange" icon="i-material-symbols-widgets-rounded">Использующие фреймворки</Point>
  <Point full :class="t.example">
    <div v-if="t.exampleId === 1" class="w-full h-full flex flex-col justify-center gap-3 p-4"><div class="box box--rich cs-green px-4 py-3 text-center text-base font-semibold">состояние</div><div class="box box--rich cs-blue px-4 py-3 text-center text-base font-semibold">вычислимые состояния</div><div class="box box--rich cs-red px-4 py-3 text-center text-base font-semibold">эффекты</div></div>
    <Example v-if="t.exampleId === 2">

````md magic-move {lines: false}
```ts
const count = ref(1)
const name = ref('John')
const doubled = computed(() => {
  return count.value > 10 
    ? name.value 
    : 'Hello'
})
```
````

</Example>
    <div v-if="t.exampleId === 3" class="w-full h-full grid grid-cols-2 gap-x-6 gap-y-1.5 place-items-center content-center p-3 text-base select-none"><div class="px-3 py-1.5 rd-2 border border-green/50 bg-green/20 text-green-200 font-semibold shadow-[0_0_14px_#22c55e55]">count</div><div class="px-3 py-1.5 rd-2 border border-white/15 bg-black/20 opacity-35">name</div><span class="text-white/40 text-lg leading-none">↓</span><span class="text-white/40 text-lg leading-none opacity-30">↓</span><div class="px-3 py-1.5 rd-2 border border-blue/50 bg-blue/20 text-blue-200 font-semibold shadow-[0_0_14px_#3b82f655]">doubled</div><div class="px-3 py-1.5 rd-2 border border-white/15 bg-black/20 opacity-35">greeting</div><span class="text-white/40 text-lg leading-none">↓</span><span class="invisible text-lg leading-none" aria-hidden="true">↓</span><div class="px-3 py-1.5 rd-2 border border-red/50 bg-red/20 text-red-200 font-semibold shadow-[0_0_14px_#ef444455]">$effect</div><span class="invisible" aria-hidden="true"></span><div class="col-span-2 mt-1 text-xs opacity-70 text-center">эффект знает: только count → doubled</div></div>
    <div v-if="t.exampleId === 4" class="w-full h-full flex-center-row gap-8 text-6xl p-4"><DeviconSolidjs class="text-5xl" /><DeviconQwik class="text-5xl" /><DeviconSvelte class="text-5xl" /><DeviconVuejs class="text-5xl" /></div>
  </Point>
</Points>

---
slideClass: cs-grey
topTitle: · выбор ·
topTitleClass: mk-top-flavor
timeline:
  - point1: active
    point2: hidden
    point3: hidden
    point4: hidden
    point5: hidden
    example: cs-red
    exampleId: 1
  - point1: ''
    point2: active
    example: cs-orange
    exampleId: 2
  - point2: ''
    point3: active
    example: cs-blue
    exampleId: 3
  - point3: ''
    point4: active
    example: cs-purple
    exampleId: 4
  - point4: ''
    point5: active
    example: cs-green
    exampleId: 5
---

# Coarse Grained Reactivity

<script setup lang="ts">
import DomImg from '../img/dom.png'
import RerenderImg from '../img/rerender.png'
</script>

<Points>
  <Point :attrs="t.point1" class="cs-red" icon="i-material-symbols-help-rounded">Элементы могут не иметь ролей</Point>
  <Point :attrs="t.point2" class="cs-orange" icon="i-material-symbols-waterfall-chart-rounded">Обновление происходит каскадно</Point>
  <Point :attrs="t.point3" class="cs-blue" icon="i-material-symbols-layers-rounded">VDOM — лишь способ оптимизации каскада</Point>
  <Point :attrs="t.point4" class="cs-purple" icon="i-material-symbols-replay-rounded">Перевычисляется все подряд</Point>
  <Point :attrs="t.point5" class="cs-green" icon="i-material-symbols-widgets-rounded">Использующие фреймворки</Point>
  <Point full :class="t.example">
    <div v-if="t.exampleId === 1" class="w-full h-full flex flex-col items-center justify-center gap-3 p-4 text-center text-base"><div class="box box--rich cs-grey px-4 py-3 opacity-80">Component</div><div class="box box--rich cs-grey px-4 py-3 opacity-80">Component</div><div class="text-xs opacity-60">роли не разделены — всё «просто UI»</div></div>
    <div v-if="t.exampleId === 2" class="w-full h-full flex flex-col items-center justify-center gap-1 p-4 text-base select-none"><div class="grid grid-cols-2 gap-x-4 gap-y-1 place-items-center"><div class="col-span-2 px-3 py-1.5 rd-2 border border-orange/40 bg-orange/20 font-semibold">App</div><span class="opacity-50 leading-none">↓</span><span class="opacity-50 leading-none">↓</span><div class="px-3 py-1.5 rd-2 border border-orange/40 bg-orange/20 font-semibold">A</div><div class="px-3 py-1.5 rd-2 border border-orange/40 bg-orange/20 font-semibold">B</div></div><div class="grid grid-cols-3 gap-x-3 gap-y-1 place-items-center mt-1"><span class="opacity-50 leading-none">↓</span><span class="opacity-50 leading-none">↓</span><span class="opacity-50 leading-none">↓</span><div class="px-2.5 py-1 rd-2 border border-orange/30 bg-orange/15 text-sm">…</div><div class="px-2.5 py-1 rd-2 border border-orange/30 bg-orange/15 text-sm">…</div><div class="px-2.5 py-1 rd-2 border border-orange/30 bg-orange/15 text-sm">…</div></div></div>
    <ImgExample v-if="t.exampleId === 3" :src="DomImg" contain />
    <ImgExample v-if="t.exampleId === 4" :src="RerenderImg" contain />
    <div v-if="t.exampleId === 5" class="w-full h-full flex-center-row gap-8 text-6xl p-4"><DeviconReact class="text-5xl" /><DeviconAngularjs class="text-5xl" /></div>
  </Point>
</Points>

---
slideClass: cs-grey
topTitle: · выбор ·
topTitleClass: mk-top-flavor
timeline:
  - point1: active
    point2: hidden
    point3: hidden
    example: cs-green
    exampleId: 1
  - point1: ''
    point2: active
    example: cs-blue
    exampleId: 2
  - point2: ''
    point3: active
    example: cs-green
    exampleId: 3
---

# Semi-Grained Reactivity

<Points>
  <Point :attrs="t.point1" class="cs-green" icon="i-material-symbols-blur-on-rounded">Обладают признаками обеих концептов в зависимости от ситуации</Point>
  <Point :attrs="t.point2" class="cs-blue" icon="i-material-symbols-account-tree-rounded">Могут иметь реактивный граф, но полный рендер</Point>
  <Point :attrs="t.point3" class="cs-orange" icon="i-material-symbols-widgets-rounded">Использующие фреймворки</Point>
  <Point full :class="t.example">
    <div v-if="t.exampleId === 1" class="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-base select-none"><div class="px-3 py-1.5 rd-2 border border-green/40 bg-green/20 font-semibold">fine: track deps</div><div class="opacity-50">+</div><div class="px-3 py-1.5 rd-2 border border-orange/40 bg-orange/20 font-semibold">coarse: cascade render</div></div>
    <div v-if="t.exampleId === 2" class="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-base select-none"><div class="px-3 py-1.5 rd-2 border border-blue/40 bg-blue/20 font-semibold">reactive graph</div><div class="opacity-50">↓</div><div class="px-3 py-1.5 rd-2 border border-orange/40 bg-orange/20 font-semibold">full component render</div></div>
    <div v-if="t.exampleId === 3" class="w-full h-full flex-center-row gap-8 text-6xl p-4"><DeviconVuejs class="text-5xl" /></div>
  </Point>
</Points>
