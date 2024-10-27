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

<div v-drag="[312,243,326,40]">
  <div font-hand c-red text-center v-click="2">Effect</div>
  <div class="w-full" v-mark.underline.red="{ at: '2'}" />
</div>

<div v-drag="[362,304,134,40]">
  <div class="w-full" v-mark.underline.blue="{ at: '3'}" />
  <div font-hand c-blue text-center v-click="3">Source</div>
</div>

<div v-drag="[523,307,118,100]">
  <div class="w-full" v-mark.underline.blue="{ at: '3'}" />
  <div font-hand c-blue text-center v-click="3">Source</div>
</div>

<!--
- Vue реализует внутри себя класс ReactiveEffect
-->

---
topTitle: ReactiveEffect
topTitleClass: top-[140px] left-[50%] translate-x-[-50%]
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

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <MaterialSymbolsLightShoppingBasket/>
    </div>
    <div>
      Собирает зависимости
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MaterialSymbolsLightNotificationsActiveRounded/>
    </div>
    <div>
      Уведомлять зависимости об обновлении
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <SolarMagicStickBold/>
    </div>
    <div>
      Xранение функции-эффекта
    </div>
  </div>
</div>

---
topTitle: ReactiveEffect
topTitleClass: absolute figure top-[50%] left-[50%] text-[25px]
  translate-x-[-50%] bg-[#00000088] z-[100] rounded-md p-2
variant: blue
clicks: 7
---

<Timeline :steps="[{
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

</Timeline>

---
topTitle: ReactiveEffect
disabled: true
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

<h1 class="text-center">Когда использовать?</h1>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <MdiHandBackRightOff/>
    </div>
    <div>
      Не нужен для ручного использования
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <IcRoundBugReport/>
    </div>
    <div>
      Для понимания при дебаге
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <Fa6SolidGears />
    </div>
    <div>
      Для понимания функционирования
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <BxBxsFlask/>
    </div>
    <div>
      Вы пишите свои реактивные примитивы
    </div>
  </div>
</div>

<!--
- свои реактивные примитивы

- заголовки для тем (общее для всех слайдов)
-->

---
layout: center
topTitle: Effect
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
disabled: true
---

---
topTitle: Effect
topTitleClass: top-[120px] left-[50%] translate-x-[-50%]
---

````md magic-move
```ts
const oranges = ref(5)
const apples = ref(6)

const total = computed(() => oranges.value + apples.value)
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
topTitle: Effect
topTitleClass: top-[140px] left-[50%] translate-x-[-50%]
disabled: true
---

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <MdiHumanMaleChild/>
    </div>
    <div>
      Младший брат <span font-mono>watchEffect</span>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MdiHandBackRightOff/>
    </div>
    <div>
      обертка над <span font-mono>ReactiveEffect</span>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <HugeiconsRecycle03/>
    </div>
    <div>
      Изменение зависимостей приводит к вызову эффекта
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <IcOutlineTimer/>
    </div>
    <div>
      Вызов эффекта в момент изменения зависимостей
    </div>
  </div>
</div>

<!--
- перепродумать разгон за "сразу же"
- объяснить что другие не сразу
-->

---
topTitle: Effect
disabled: true
---

# Где используется?

<v-clicks>

- Тесты системы реактивности
- ... все!

</v-clicks>

---
topTitle: Effect
disabled: true
---

# Когда использовать?

<v-clicks>

- Тесты системы реактивности
- Альтернатива watchEffect

</v-clicks>

<!--
- разгонять про замену (продать effect вместо watch)
-->

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
topTitleClass: top-[90px] left-[50%] translate-x-[-50%]
---

````md magic-move
```ts
const counter = ref(0)
```
```ts
const counter = ref(0)

const doubled = computed(() => counter.value * 2)

watch(doubled, () => console.log(doubled.value))

watchEffect(() => console.log('Count: ', doubled.value))
```

```ts
const counter = ref(0)

const scope = effectScope()

const doubled = computed(() => counter.value * 2)

watch(doubled, () => console.log(doubled.value))

watchEffect(() => console.log('Count: ', doubled.value)⠀
```

```ts
const counter = ref(0)

const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})
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
-->

---
variant: blue
topTitle: effectScope
topTitleClass: top-[248px] left-[240px] text-[25px] translate-x-[-50%] z-index-[100]
clicks: 4
---

<Timeline :steps="[{
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
    <Node color="green" class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" :class="t.reactiveEffect" inject>
      {{ t.texts[0] }}
    </Node>
    <Node color="green" class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" :class="t.reactiveEffect" inject>
      {{ t.texts[1] }}
    </Node>
    <Node color="green" class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" :class="t.reactiveEffect" inject>
      {{ t.texts[2] }}
    </Node>
    <Node color="green" class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" :class="t.reactiveEffect" inject>
      {{ t.texts[3] }}
    </Node>
    <Node color="green" class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" :class="t.reactiveEffect" inject>
      {{ t.texts[4] }}
    </Node>
    <Node color="green" class="font-size-[0.9em] transition-[all] duration-[0.5s] ease-out text-center" :class="t.reactiveEffect" inject>
      {{ t.texts[5] }}
    </Node>
  </div>
</Node>

</Timeline>

---
variant: blue
topTitle: effectScope
topTitleClass: top-[248px] left-[240px] text-[25px] translate-x-[-50%] z-index-[100]
clicks: 7
---

<Timeline :steps="[{
  vue: 'figure fx sp-201_282_62_63 -popup-hidden',
  vueText: 'sp-631_115_69_40 -blur-hidden',
  pinia: 'figure fx sp-201_282_62_63 -popup-hidden',
  piniaText: 'sp-631_255_269_40 -blur-hidden',
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
  piniaText: ' sp-631_255_269_40 ',
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

</Timeline>

<!--
- добавить логотипы
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

<!--
- добавить примеры кодом API
- добавить визуализацию схемы для скоупов
- сопутствующее API
-->

---
topTitle: effectScope
---

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <UiwComponent/>
    </div>
    <div>
      Создание эффектов за пределами компонентов
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MdiRunFast/>
    </div>
    <div>
      Создание эффектов асинхронно от setup
    </div>
  </div>
</div>

<!--
- подумать о корнер кейсе из-за async setup
- очень нюансовая история ()
-->
