---
layout: center
topTitle: ReactiveEffect
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

---
topTitle: ReactiveEffect
topTitleClass: top-[140px] left-[50%] translate-x-[-50%]
---

```ts {*|3}
const oranges = ref(5)
const apples = ref(6)
const total = computed(() => oranges.value + apples.value)
```

<div v-drag="[348,242,326,40]">
  <div font-hand c-red text-center v-click="2">Effect</div>
  <div class="w-full" v-mark.underline.red="{ at: '2'}" />
</div>

<div v-drag="[404,305,134,40]">
  <div class="w-full" v-mark.underline.blue="{ at: '3'}" />
  <div font-hand c-blue text-center v-click="3">Dependency</div>
</div>

<div v-drag="[557,305,118,40]">
  <div class="w-full" v-mark.underline.blue="{ at: '3'}" />
  <div font-hand c-blue text-center v-click="3">Dependency</div>
</div>

<!--
- Vue реализует внутри себя класс ReactiveEffect
-->

---
topTitle: ReactiveEffect
topTitleClass: top-[90px] left-[50%] translate-x-[-50%]
---

<style>
.item {
  @apply text-sm bg-[#00000088] p-[12px] rd-[8px] flex flex-row items-center gap-[8px]
}
.item-icon {
  @apply w-[27px] h-[27px] rd-[4px] flex items-center justify-center;
  background-color: #D9D9D920;
}
</style>

<Timeline2 :steps="[{
  depsClasses: 'outline outline-2 outline-[#CCCCCC88]',
  notifyClasses: '-blur-hidden outline-[#00000088]',
  storeClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  reactiveEffect: {
    class: 'pos-50% size-64 p-0 text-xs text-center ',
    color: 'blue',
    form: 'circle',
    title: 'Reactive\nEffect',
  },
  dep1: {
    class: 'pos-85%_18% size-64 p-0 ',
    form: 'circle',
    title: 'Dep',
  },
  dep2: {
    class: 'pos-85%_50% size-64 p-0 ',
    form: 'circle',
    title: 'Dep',
  },
  dep3: {
    class: 'pos-85%_82% size-64 p-0 ',
    form: 'circle',
    title: 'Dep',
  },
  action: {
    class: 'pos-15%_50% size-64 p-0 text-xs text-center -popup-hidden',
    form: 'circle',
    color: 'red',
    title: 'Action',
  },
  reactiveEffectToDep1: {
    coords: '797:222 696:262',
    class: 'fx duration-500 opacity-0',
    power: -0.3,
  },
  reactiveEffectToDep2: {
    coords: '797:298 736:298',
    class: 'fx duration-500 opacity-0',
    power: 0.01,
  },
  reactiveEffectToDep3: {
    coords: '797:380 696:339',
    class: 'fx duration-500 opacity-0',
    power: 0.3,
  },
  actionToReactiveEffect: {
    coords: '596:298 661:298',
    class: 'fx duration-500 opacity-0',
    power: 0.01,
  },
}, {
  reactiveEffectToDep1: {
    class: 'fx duration-500 animate',
  },
  reactiveEffectToDep2: {
    class: 'fx duration-500 animate',
  },
  reactiveEffectToDep3: {
    class: 'fx duration-500 animate',
  },
}, {
  depsClasses: 'outline outline-2 outline-[#00000088]',
  notifyClasses: 'outline outline-2 outline-[#CCCCCC88]',
  reactiveEffectToDep1: {
    class: 'fx duration-500 animate opacity-0',
  },
  reactiveEffectToDep2: {
    class: 'fx duration-500 animate opacity-0',
  },
  reactiveEffectToDep3: {
    class: 'fx duration-500 animate opacity-0',
  },
  action: {
    class: 'pos-15%_50% size-64 p-0 text-xs text-center',
  },
}, {
  reactiveEffectToDep1: {
    coords: '696:262 797:222',
    class: 'fx duration-500 animate',
    power: 0.3,
  },
  reactiveEffectToDep2: {
    coords: '736:298 797:298',
    class: 'fx duration-500 animate',
  },
  reactiveEffectToDep3: {
    coords: '696:339 797:380',
    class: 'fx duration-500 animate',
    power: -0.3,
  },
  action: {
    class: 'pos-15%_50% size-64 p-0 text-xs text-center',
  },
  actionToReactiveEffect: {
    class: 'fx duration-500 ',
  },
}, {
  notifyClasses: 'outline outline-2 outline-[#00000088]',
  storeClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.depsClasses">
    <div class="item-icon">
      <MaterialSymbolsLightShoppingBasket/>
    </div>
    <div>
      Сбор зависимостей
    </div>
  </div>
  <div class="item fx duration-400" :class="t.notifyClasses">
    <div class="item-icon">
      <MaterialSymbolsLightNotificationsActiveRounded/>
    </div>
    <div>
      Уведомление зависимостей об обновлении
    </div>
  </div>
  <div class="item fx duration-400" :class="t.storeClasses">
    <div class="item-icon">
      <SolarMagicStickBold/>
    </div>
    <div>
      Хранение функции-эффекта
    </div>
  </div>
  <div class="text-sm border-3 border-[#CCCCCC88] p-[12px] rd-[8px] flex flex-row items-center gap-[8px] fx example row-span-4 code-back" :class="t.exampleClasses">
    <Node v-bind="t.reactiveEffect" />
    <Node v-bind="t.dep1" />
    <Node v-bind="t.dep2" />
    <Node v-bind="t.dep3" />
    <Node v-bind="t.action" />
  </div>
</div>

<SvgLayer>
  <SvgArrow v-bind="t.reactiveEffectToDep1" />
  <SvgArrow v-bind="t.reactiveEffectToDep2" />
  <SvgArrow v-bind="t.reactiveEffectToDep3" />
  <SvgArrow v-bind="t.actionToReactiveEffect" />
</SvgLayer>

</Timeline2>

---
topTitle: ReactiveEffect
topTitleClass: absolute figure top-[50%] left-[50%] text-[25px]
  translate-x-[-50%] bg-[#00000088] z-[100] rounded-md p-2
slideClass: cs-blue
---

<Timeline2 :steps="[{
    logo: 'left-[50%] top-[50%]',
    watch: 'left-[50%] top-[50%] -popup-hidden',
    watchEffect: 'left-[50%] top-[50%] -popup-hidden',
    render: 'left-[50%] top-[50%] -popup-hidden',
    computed: 'left-[50%] top-[50%] -popup-hidden',
    comment: 'left-[130px] top-[368px] -popup-hidden',
    effect: 'left-[50%] top-[50%] -popup-hidden',
  }, {
    watch: ' pos-814_123 ',
    watchEffect: ' pos-138_124 ',
  }, {
    render: ' pos-799_402 ',
  }, {
    computed: ' pos-197_388 ',
  }, {
    computed: 'pos-197_388 opacity-30',
    comment: ' pos-196_464 ',
  }, {
    watch: ' pos-814_123 opacity-30',
    watchEffect: ' pos-138_124 opacity-30',
  }, {
    render: ' pos-799_402 opacity-30 ',
  }, {
    effect: ' pos-454_464 ',
  }
]" v-slot="t">

<div class="figure w-[223px] h-[202px]" :class="t.logo">
  <material-symbols-settings-outline class="animate-[spin_20s_linear_infinite] w-full h-full" />
</div>

<Gear class="figure w-[92px] h-[127px]" :class="t.watch" name="watch" />
<Gear class="figure w-[138px] h-[127px]" :class="t.watchEffect" name="watchEffect" />

<Gear class="figure w-[104px] h-[95px]" :class="t.render" name="render" />

<Gear class="figure w-[138px] h-[112px]" :class="t.computed" name="computed" />

<div class="figure text-[0.75em] text-center w-[89px] h-[40px]" :class="t.comment"> после 3.5 </div>

<Gear class="figure w-[151px] h-[111px]" :class="t.effect" name="effect" />

</Timeline2>

---
layout: center
topTitle: Effect
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
disabled: true
---

---
topTitle: Effect
topTitleClass: top-[110px] left-[50%] translate-x-[-50%]
---

````md magic-move
```ts
const oranges = ref(5)
const apples = ref(6)

const total = computed(() => oranges.value + apples.value)




⠀
```
```ts {*|1,5-}
import { effect } from 'vue'

const oranges = ref(5)
const apples = ref(6)

const total = ref(0)
effect(() => {
  total.value = oranges.value + apples.value
})
```
````

---
layout: center
topTitle: effectScope
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

<!--
- добавить слайд "а что есть скоуп"
-->

---
topTitle: effectScope
topTitleClass: top-[70px] left-[50%] translate-x-[-50%]
---

````md magic-move
```ts
const counter = ref(0)











⠀
```
```ts
const counter = ref(0)

const doubled = computed(() => counter.value * 2)

watch(doubled, () => console.log(doubled.value))

watchEffect(() => console.log('Count: ', doubled.value))





⠀
```
```ts
const counter = ref(0)



const doubled = computed(() => counter.value * 2)

watch(doubled, () => console.log(doubled.value))

watchEffect(() => console.log('Count: ', doubled.value))



⠀
```

```ts
const counter = ref(0)

const scope = effectScope()

const doubled = computed(() => counter.value * 2)

watch(doubled, () => console.log(doubled.value))

watchEffect(() => console.log('Count: ', doubled.value)⠀



⠀
```

```ts
const counter = ref(0)

const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

⠀
```

```ts
const counter = ref(0)

const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

scope.stop()
```
````

<!--
- добавить слайд "а что есть скоуп"
- проблема с собесом
-->

---
slideClass: cs-blue
topTitle: effectScope
topTitleClass: top-[248px] left-[240px] text-[25px] translate-x-[-50%] z-index-[100]
---

<Timeline2 :steps="[{
  effectScope: '-popup-hidden',
  reactiveEffect: '-popup-hidden',
  texts: [
    'ReactiveEffect',
    'ReactiveEffect',
    'ReactiveEffect',
    'ReactiveEffect',
    'ReactiveEffect',
    'ReactiveEffect',
  ]
}, {
  effectScope: '',
}, {
  reactiveEffect: '',
}, {
  texts: [
    'watch',
    'watchEffect',
    'watch',
    'watchEffect',
    'computed',
    'render',
  ]
}, {
  reactiveEffect: '-popup-hidden',
}]" v-slot="t">

<clarity-settings-solid class="figure sp-201_282_62_63 animate-[spin_17s_linear_infinite]" />

<div class="absolute sp-362_61_555_132 text-[1em] bg-[#00000088] p-[12px] rd-[8px]" :class="t.effectScope">
   <b>EffectScope</b> - это способ собрать реактивные эффекты для управления их жизненным циклом
</div>

<Node class="figure sp-638_367_553_180 flex" :class="t.effectScope" color="blue">
  <div class="grid grid-cols-[1fr_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-[10px] flex-1">
    <div class="col-span-3 text-center">EffectScope</div>
    <Node 
      color="green" 
      class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center"
      :class="t.reactiveEffect"
      inject
      :title="t.texts[0]"
    />
    <Node 
      color="green" 
      class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" 
      :class="t.reactiveEffect" 
      inject
      :title="t.texts[1]"
    />
    <Node 
      color="green" 
      class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" 
      :class="t.reactiveEffect" 
      inject
      :title="t.texts[2]"
    />
    <Node 
      color="green" 
      class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" 
      :class="t.reactiveEffect" 
      inject
      :title="t.texts[3]"
    />
    <Node 
      color="green" 
      class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" 
      :class="t.reactiveEffect" 
      inject
      :title="t.texts[4]"
    />
    <Node 
      color="green" 
      class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" 
      :class="t.reactiveEffect" 
      inject
      :title="t.texts[5]"
    />
  </div>
</Node>

</Timeline2>

---
slideClass: cs-blue
topTitle: effectScope
topTitleClass: top-[248px] left-[240px] text-[25px] translate-x-[-50%] z-index-[100]
---

<Timeline2 :steps="[{
  vue: 'figure fx sp-201_282_62_63 -popup-hidden',
  vueText: 'sp-631_115_69_40 -blur-hidden',
  pinia: 'figure fx sp-201_282_62_63 -popup-hidden',
  piniaText: 'sp-631_275_269_40 -blur-hidden',
  vueuse: 'figure fx sp-201_282_62_63 -popup-hidden',
  vueuseText1: 'sp-631_415_69_40 -blur-hidden',
  vueuseText2: 'sp-631_465_69_40 -blur-hidden',
}, {
  vue: 'figure fx sp-560_130_100_100 ',
}, {
  vueText: ' sp-631_115_69_40 ',
}, {
  pinia: 'figure fx sp-560_290_100_100 ',
}, {
  piniaText: ' sp-631_275_269_40 ',
}, {
  vueuse: 'figure fx sp-560_455_100_100 ',
}, {
  vueuseText1: ' sp-631_415_69_40 ',
}, {
  vueuseText2: ' sp-631_465_69_40 ',
}]" v-slot="t">

<Gear name="effectScope" :pos="[201,282,62,63]" headless />

<Gear name="Vue" :class="t.vue" />
<div :class="t.vueText" class="absolute fx transition-[all] duration-[0.5s] ease-out text-[1em] text-shadow-xl"> setup </div>

<Gear name="Pinia" :class="t.pinia" />
<div :class="t.piniaText" class="absolute fx transition-[all] duration-[0.5s] ease-out text-[1em] text-shadow-xl"> setup-like stores </div>

<Gear name="VueUse" :class="t.vueuse" />
<div :class="t.vueuseText1" class="absolute fx transition-[all] duration-[0.5s] ease-out text-[1em] text-shadow-xl font-mono"> createSharedComposable </div>
<div :class="t.vueuseText2" class="absolute fx transition-[all] duration-[0.5s] ease-out text-[1em] text-shadow-xl font-mono"> createGlobalState </div>

</Timeline2>

---
topTitle: effectScope
topTitleClass: top-[100px] left-[50%] translate-x-[-50%]
---

<Timeline2 :steps="[{
  effectsClasses: 'outline outline-2 outline-[#CCCCCC88]',
  asyncClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 fx duration-500',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
}, {
  asyncClasses: 'outline outline-2 outline-[#CCCCCC88]',
  effectsClasses: 'outline-[#00000088]',
  example1: 'absolute pos-0 fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500',
}]" v-slot="t">

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.effectsClasses">
    <div class="item-icon">
      <UiwComponent/>
    </div>
    <div>
      Создание эффектов за пределами компонентов
    </div>
  </div>
  <div class="item fx duration-400" :class="t.asyncClasses">
    <div class="item-icon">
      <MdiRunFast/>
    </div>
    <div>
      Создание эффектов асинхронно от setup
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">

<div :class="t.example1">

````md magic-move
```ts
function myStore(setup) {
  const scope = effectScope()
  let state

  scope.run(() => state = setup())

  return { 
    state, 
    dispose: () => scope.stop() 
  }
}
```
````

</div>
<div :class="t.example2">

````md magic-move
```ts
function createToast(params) {
  const scope = effectScope()

  scope.run(() => {
    const toasts = useToast()
    toasts.add(params)
    toasts.on('close', () => {
      scope.stop()
    })
  })
}
```
````

</div>

  </div>
</div>

</Timeline2>

<!--
- подумать о корнер кейсе из-за async setup
- очень нюансовая история ()
- продать effectScope
-->

---
topTitle: effectScope
topTitleClass: top-[140px] left-[50%] translate-x-[-50%]
---

````md magic-move
```ts
function myComposable() {
  // получить текущий scope
  const scope = getCurrentScope()
  if (!scope) {
    throw new Error('the composable must be called inside a Vue context')
  }
}
```

```ts
function myComposable() {
  // установить обработчик на уничтожение scope
  onScopeDispose(() => {
    console.log('disposed')
  })
}
```
````
