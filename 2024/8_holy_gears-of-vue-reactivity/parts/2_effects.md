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
topTitleClass: absolute top-[251px] left-[525px] text-[25px] translate-x-[-50%]
  bg-[#00000088] z-[100] rounded-md p-2
variant: blue
---

<material-symbols-settings-outline v-drag="[412,167,223,202]" class="animate-[spin_20s_linear_infinite]" />

<Gear v-click v-drag="[772,34,92,127]" :style="{ opacity: $clicks >= 6 ? '30%' : '100%' }" name="watch" />
<Gear v-click="'+0'" v-drag="[128,84,138,127]" :style="{ opacity: $clicks >= 6 ? '30%' : '100%' }" name="watchEffect" />

<Gear v-click v-drag="[752,317,104,95]" name="render" />

<Gear v-click v-drag="[131,299,138,112]" :style="{ opacity: $clicks >= 5 ? '30%' : '100%' }" name="computed" />

<div v-click v-drag="[157,406,89,40]" class="text-[0.75em]"> после 3.5 </div>

<Gear v-click="7" v-drag="[454,403,151,111]" name="effect" />

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
variant: second
topTitle: effectScope
topTitleClass: top-[248px] left-[240px] text-[25px] translate-x-[-50%] z-index-[100]
---

<clarity-settings-solid v-drag="[201,282,62,63]" class="animate-[spin_17s_linear_infinite]" />

<div v-drag="[362,61,555,132]" class="text-[1em] bg-[#00000088] p-[12px] rd-[8px]">
   EffectScope (скоуп) - это способ собрать эффекты для управления их жизненным циклом
</div>

---
variant: second
topTitle: effectScope
topTitleClass: top-[248px] left-[240px] text-[25px] translate-x-[-50%] z-index-[100]
---

<clarity-settings-solid v-drag="[201,282,62,63]" class="animate-[spin_17s_linear_infinite]" />

<LogosVue v-click v-drag="[512,112,62,63]" />
<div v-click="'+0'" v-drag="[520,78,57,40]" class="text-[1em] text-shadow-xl"> Vue </div>

<div v-click="'+0'" v-drag="[631,115,69,40]" class="text-[1em] text-shadow-xl"> setup </div>

<LogosPinia v-click v-drag="[519,271,62,63]" />
<div v-click="'+0'" v-drag="[516,236,69,40]" class="text-[1em] text-shadow-xl"> Pinia </div>

<div v-click v-drag="[632,281,292,40]" class="text-[1em] text-shadow-xl"> setup-like stores </div>

<LogosVueuse v-click v-drag="[527,438,56,57]" />
<div v-click="'+0'" v-drag="[517,400,69,40]" class="text-[1em] text-shadow-xl"> VueUse </div>

<div v-click v-drag="[632,421,292,40]" class="text-[1em] text-shadow-xl font-mono"> createSharedComposable </div>

<div v-click v-drag="[633,469,292,40]" class="text-[1em] text-shadow-xl font-mono"> createGlobalState </div>

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

# Когда использовать?

<v-clicks>

- Когда нужно собирать эффекты за пределами компонентов
- Когда нужно создавать эффекты асинхронно от setup

</v-clicks>

<!--
- подумать о корнер кейсе из-за async setup
- очень нюансовая история ()
-->
