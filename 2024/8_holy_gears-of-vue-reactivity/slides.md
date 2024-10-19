---
theme: ./theme
routerMode: hash
htmlAttrs:
  lang: ru
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
growSeed: 4
title: Шестеренки реактивности Vue

contextMenu: false
---

<div class="mb-[50px] flex flex-row">
  <div class="w-[80px] h-[80px] rd-full of-hidden">
    <img class="w-full h-full object-cover" src="/img/photo.png" />
  </div>
  <div class="w-[80px] h-[80px] rd-full ml-[15px]">
    <zede-icon class="w-full h-full" />
  </div>
</div>
<div class="text-4xl mb-[50px]">Денис Чернов</div>
<p><file-icons-telegram /> @zede_code</p>
<p><ion-logo-twitch /> @izede</p>
<p><ion-logo-github /> @Sdju</p>

<QrCodeIntro class="w-[200px] h-[200px] absolute top-[200px] right-[80px]" />

---
layout: center
---

# Шестеренки реактивности Vue

<ion-cog-sharp v-drag="[729,-220,496,450]" class="animate-[spin_70s_linear_infinite] opacity-20" />

<ion-cog-sharp v-drag="[-222,307,496,450]" class="animate-[spin_70s_linear_infinite] opacity-10" />

---

<div class="animate-spin" />

<material-symbols-settings-outline v-drag="[388,145,223,202]" class="animate-[spin_20s_linear_infinite]" />
<logos-vue v-drag="[476,229,46,42]" />

<f7-gear v-click v-drag="[656,115,104,95]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[691,84,40,40]" class="text-[1em] text-shadow-xl"> ref </div>

<heroicons-cog-solid v-click v-drag="[689,285,104,95]" class="animate-[spin_31s_linear_infinite]" />
<div v-click="'+0'" v-drag="[684,256,119,40]" class="text-[1em] text-shadow-xl"> computed </div>

<clarity-settings-solid v-click v-drag="[348,413,62,63]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[344,383,69,40]" class="text-[1em] text-shadow-xl"> watch </div>

<mingcute-settings-7-fill v-click v-drag="[178,278,88,89]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[165,252,138,40]" class="text-[1em] text-shadow-xl"> watchEffect </div>

<zondicons-cog v-click v-drag="[250,74,104,95]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[259,37,104,40]" class="text-[1em] text-shadow-xl"> reactive </div>

<!--
разгоняем за что мы любим Vue

мало кто знает а что за ними скрыто

поэтому мы посмотрим на каждую шестеренку по отдельности. Чтоб получить чуть более глубокое понимание.
-->

---
layout: cover
---

<img class="center w-[740px]" src="/img/interview.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/interview.png" />

---
layout: center
---

<div class="text-[1.5em]">Чем отличается computed от watch?</div>

<!--
Представим ситуацию из собеса

простые вопросы отвечается легко

- можно ли заменить computed на watch
- а можно ли заменить watch на computed
-->

---

<img class="center w-[740px]" src="/img/computed-watch.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/computed-watch.png" />

<!--
Если вы начинаете чустсвовать себя неуверенно, то это доклад для вас.
-->

---
variant: second
---

<script setup>
const heights = [
  59,
  116,
  185,
  246,
  308,
  363,
  422,
  472,
]
</script>

<div class="center w-[340px] overflow-hidden transition-all duration-400" :style="{ maxHeight: `${heights[$clicks]}px` }" >
<img src="/img/iceberg.png" />
</div>
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<div class="center w-[340px] overflow-hidden transition-all duration-400" :style="{ maxHeight: `${heights[$clicks]}px` }" >
<img src="/img/iceberg.png" />
</div>

<div 
  class="center overflow-hidden transition-all duration-400"
  :style="{ maxHeight: `${heights[$clicks]}px` }"
>
  <div class="text-shadow-xl w-[340px] h-[472px] flex flex-col items-stretch justify-around p-r-[60px] text-center relative">
    <div>азы реактивности</div>
    <div v-click>основной функционал</div>
    <div v-click>продвинутая реактивность</div>
    <div v-click>@vue/reactivity</div>
    <div v-click>@vue/runtime-core</div>
    <div v-click>Закрытый API</div>
    <div v-click class="text-size-[0.75em]">Контрибьютить во Vue</div>
    <div v-click class="text-size-[0.75em]">написать свою реактивность для Vapor Vue</div>
    <img class="absolute bottom-[-10px] right-0 h-[60px] w-[64px]" src="/img/jonson.jfif" />
  </div>
</div>

<!--
- вначале вам хватает простых ref computed и reactive
- затем познаете watch и watchEffect
- сложные случаи вынуждают познакомиться с effectScope, customRef
-->

---

# Реактивность

<img v-drag="[404,8,362,217]" class="center w-[340px]" src="/img/magic.gif" />

> Способность системы автоматически реагировать на раздражители

---

````md magic-move
```ts
let oranges = 5
let apples = 10
```
```ts
let oranges = 5
let apples = 10
let total = oranges + apples
console.log(c)
```

```ts
let oranges = 5
let apples = 10
let total = oranges + apples
console.log(total) // 15
```

```ts
let oranges = 5
let apples = 10
let total = oranges + apples
console.log(total) // 15
apples = 7
console.log(total) // 12
```

```ts
let oranges = 5
let apples = 10
let total = oranges + apples
console.log(total) // 15
apples = 7
console.log(total) // 12
```

```ts
let oranges = ref(5)
let apples = ref(10)
let total = computed(() => oranges.value + apples.value)
console.log(total.value)
apples.value = 7
console.log(total.value)
```

```ts {*|5|6|*}
let oranges = ref(5)
let apples = ref(10)
let total = computed(() => oranges.value + apples.value)
console.log(total.value) // 15
apples.value = 7 
console.log(total.value) // 12
```
````

<!--
расширить пример
-->

---

<h1 v-drag="[320,28,365,46]"> Реактивности </h1>

<VueGraph v-click v-drag="[463,257,84,NaN]" label="Data" />
<Arrow v-click v-drag="[525,212,69,20,-58]" x1="0" y1="50%" x2="100%" y2="50%" />
<VueGraph v-click="'+0'" v-drag="[535,156,118,NaN]" label="Subscribers" />
<Arrow v-click v-drag="[470,317,69,20,270]" x1="0" y1="50%" x2="100%" y2="50%" />
<VueGraph v-click="'+0'" v-drag="[456,366,100,NaN]" label="Action" />
<Arrow v-click v-drag="[471,160,59,20,180]" x1="0" y1="50%" x2="100%" y2="50%" />
<VueGraph v-click="'+0'" v-drag="[319,152,141,NaN]" label="Scheduler" />
<Arrow v-click v-drag="[365,215,106,20,41]" x1="0" y1="50%" x2="100%" y2="50%" />

---

<logos-vue v-drag="[441,49,119,108]" />

<div v-click v-drag="[231,210,191,54]" class="text-[1em] bg-green-5 rounded-md p-2" > @vue/reactivity </div>
<v-drag-arrow v-click="'+0'" pos="462,127,-72,71" />

<div v-click v-drag="[588,208,233,53]" class="text-[1em] bg-green-5 rounded-md p-2" > @vue/runtime-core </div>
<v-drag-arrow v-click="'+0'" pos="535,126,83,72" />

<div v-drag="[226,274,195,154]" class="absolute"><v-clicks>

- ref
- reactive
- <span class="text-red">computed</span>
- <span class="text-red">watchers</span>

</v-clicks></div>

<div v-drag="[587,273,195,154]" class="absolute"><v-clicks>

- computed
- watchers
- nextTick
- реактивность компонентов

</v-clicks></div>

<!--
визулизацию

что в нем лежит
-->

---

# Карта реактивности

<img class="center w-[840px]" src="/img/map.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[840px]" src="/img/map.png" />

<div v-drag="[98,157,757,182,-26]" class="text-red text-[6em] text-shadow-lg"> ЗАМЕНИТЬ </div>

<!--
порешить этого слайда (переместить)

- обдумать идею глобальной карты и реактивности и доклада, максимально подробную при разгоне шестерни зумить часть карты (часть за которую отвечает эта шестерня)
-->

---
layout: center
topTitle: ReactiveEffect
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

---
topTitle: ReactiveEffect
---

```ts {*|3}
const oranges = ref(5)
const apples = ref(6)
const total = computed(() => oranges.value + apples.value)
```

<div v-click v-drag="[218,274,433,40]" class="border-2 border-white rounded-md p-2" />

<div v-click v-drag="[364,267,134,40]" class="border-b-2 border-blue rounded-md p-2" />

<div v-click v-drag="[519,208,118,100]" class="border-b-2 border-blue rounded-md p-2" />

<div v-click v-drag="[311,281,326,40]" class="border-t-2 border-red rounded-md p-2" />

<!--
- Vue реализует внутри себя класс ReactiveEffect
-->

---
topTitle: ReactiveEffect
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
      собрать зависимости
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MaterialSymbolsLightNotificationsActiveRounded/>
    </div>
    <div>
      уведомлять зависимости об обновлении
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <SolarMagicStickBold/>
    </div>
    <div>
      хранение функции-эффекта
    </div>
  </div>
</div>

---
topTitle: ReactiveEffect
topTitleClass: top-[251px] left-[525px] text-[25px] translate-x-[-50%] z-index-[100]
---

<material-symbols-settings-outline v-drag="[412,167,223,202]" class="animate-[spin_20s_linear_infinite]" />
<div v-click="'+0'" v-drag="[438,242,173,50]" class="text-[1em] text-shadow-xl bg-[#00000088] rounded-md p-2"> ReactiveEffect </div>

<f7-gear v-click v-drag="[727,117,104,95]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[723,81,106,40]" class="text-[1em] text-shadow-xl"> watchers </div>

<heroicons-cog-solid v-click v-drag="[716,351,104,95]" class="animate-[spin_31s_linear_infinite]" />
<div v-click="'+0'" v-drag="[728,321,119,40]" class="text-[1em] text-shadow-xl"> render </div>

<clarity-settings-solid v-click v-drag="[346,416,62,63]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[314,382,69,40]" class="text-[1em] text-shadow-xl"> effectScope </div>

<mingcute-settings-7-fill v-click v-drag="[191,219,88,89]" class="animate-[spin_17s_linear_infinite]" :style="{ opacity: $clicks === 5 ? '30%' : '100%' }" />
<div v-click="'+0'" v-drag="[175,185,138,40]" class="text-[1em] text-shadow-xl" :style="{ opacity: $clicks === 5 ? '30%' : '100%' }" > computed </div>

<div v-click v-drag="[196,299,89,40]" class="text-[0.75em]"> после 3.5 </div>

---
topTitle: ReactiveEffect
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
---

---
topTitle: Effect
---

````md magic-move
```ts
const oranges = 5
const apples = 6
const total = oranges + apples
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

<!--
- использовать пример с computed
-->

---
topTitle: Effect
---

<v-clicks>

- обертка над ReactiveEffect
- перевызывает функцию-эффект при изменении зависимостей
- вызывается сразу же при изменении зависимостей

</v-clicks>

<!--
- перепродумать разгон за "сразу же"
- объяснить что другие не сразу
-->

---
topTitle: Effect
---

# Где используется?

<v-clicks>

- Тесты системы реактивности
- ... все!

</v-clicks>

---
topTitle: Effect
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

---
layout: center
topTitle: Tracking
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

<!--
- сделать отсылку на определение реактивности
-->

---
topTitle: Tracking
---

<mingcute-settings-7-fill v-click v-drag="[437,138,88,89]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[413,166,131,40]" class="text-[1em] text-shadow-xl bg-[#00000088] px-3 rd-[8px]"> activeSub </div>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <MdiCursorPointer/>
    </div>
    <div>
      Переменная которая указывает текущий эффект
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <BiTrophyFill/>
    </div>
    <div>
      Только 1 активный эффект
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MaterialSymbolsStacks/>
    </div>
    <div>
      Работает как стек для вложенных эффектов
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MdiHandBackRightOff/>
    </div>
    <div>
      Нет ручного доступа
    </div>
  </div>
</div>

<!--
- ПРИДУМАТЬ ИЛЛЮСТРАЦИЮ (думать о шестеренках)
- подумать о спиче
- исходить от проблематики. как это помогает вью
-->

---
topTitle: Tracking
---

<mingcute-settings-7-fill v-click v-drag="[114,240,88,89]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[94,264,131,40]" class="text-[1em] text-shadow-xl bg-[#00000088] px-3 rd-[8px]"> activeSub </div>

<heroicons-cog-solid v-click v-drag="[363,349,104,95]" class="animate-[spin_31s_linear_infinite]" />
<div v-click="'+0'" v-drag="[387,324,119,40]" class="text-[1em] text-shadow-xl"> track </div>

<div v-click="'+0'" v-drag="[472,350,459,101]" class="item">
  <div class="item-icon">
    <MaterialSymbolsAdd2/>
  </div>
  <div>
    Добавляет текущее значение в список зависимостей у activeSub
  </div>
</div>

<zondicons-cog v-click v-drag="[365,169,90,83]" class="animate-[spin_31s_linear_infinite]" />
<div v-click="'+0'" v-drag="[372,129,119,40]" class="text-[1em] text-shadow-xl"> trigger </div>

<div v-click="'+0'" v-drag="[474,163,451,89]" class="item">
  <div class="item-icon">
    <MaterialSymbolsLightNotificationsActiveRounded/>
  </div>
  <div>
    Уведомляет все зависящие от него значения о необходимости обновления
  </div>
</div>

<!--
- переписать описания
- перепродумать спич
- ДОБАВИТЬ ИЛЮСТРАЦИЮ
- подумать о репрезентации на что-то знакомое
-->

---
topTitle: Tracking
---

<img class="center w-[640px]" src="/img/deps-link.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[640px]" src="/img/deps-link.png" />

<div v-drag="[136,174,769,180,26]" class="text-red text-[6em] text-shadow-lg"> ЗАМЕНИТЬ </div>

<!--
- разобраться в вопросе
 - как работало раньше
 - как работает сейчас (Link)
 - почему это круче
- переверстать диаграмку
-->

---
topTitle: Tracking
---

# Dep

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
topTitle: Tracking
---

# Link

```ts {*|2|3,4|5,6|7}
export class Link {
  version: number // версия зависимости
  nextDep?: Link // следующая зависимость
  prevDep?: Link // предыдущая зависимость
  nextSub?: Link // следующий подписчик
  prevSub?: Link // предыдущий подписчик
  prevActiveLink?: Link // предыдущая активная ссылка
}
```

<!--
- следующий слайд
 - продать метрики почему это сделало круто
-->

---
topTitle: Tracking
---

````md magic-move
```ts
watchEffect(() => {
  const user = fetchUsers()
})
```

```ts {*|2}
watchEffect(() => {
  console.log('Loading State: ', loadingState.value)
  const user = fetchUsers()
})
```

```ts {*|1,4-6|*}
import { pauseTracking, resetTracking } from '@vue/reactivity'

watchEffect(() => {
  pauseTracking()
  console.log('Loading State: ', loadingState.value)
  resetTracking()

  const user = fetchUsers()
})
```

```ts
import { pauseTracking, resetTracking } from '@vue/reactivity'

watchEffect(() => {
  pauseTracking() // временно приостанавливает сбор зависимостей
  console.log('Loading State: ', loadingState.value)
  resetTracking() // востанавливает прежнее состояние

  const user = fetchUsers()
})
```
````

<!--
- попробовать подвести через код
- обяъснить а на кой их добавили
-->

---
layout: center
topTitle: Источники
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

---
layout: center
topTitle: Источники
---

# shallowRef

---
topTitle: Источники
---

# shallowRef

<v-clicks>

- неглубокая реактивность
- не оборачивает объекты
- ничем не отличается от `ref` для примитивов
- отвечает флаг `__v_isShallow`

</v-clicks>

---
layout: center
topTitle: Источники
---

# Reactive

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
topTitle: Источники
---

# ref

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
dragPos:
  pull: 589,223,52,40
  push: 337,211,58,40
---

# Push / Pull реактивность

<img class="center w-[740px]" src="/img/push-pull.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/push-pull.png" />

<div v-drag="'push'">Push</div>
<div v-drag="'pull'">Pull</div>

---

# Пояснялово за Push / Pull

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
dragPos:
  scheduler: 0,-39,0,0
---

<img class="center w-[540px]" src="/img/scheduler.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[540px]" src="/img/scheduler.png" />

<h1 v-drag="'scheduler'">Scheduler</h1>

---

# Scheduler

<v-clicks depth="2">

- механизм синхронизирующий обновления
- единственный способ с ним взаимодействовать `nextTick`
- синхронизация старается быть вычисленной в конце списка микротасков

</v-clicks>

---
layout: center
---

# computed

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
---

# watchEffect

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
---

# watch

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---

# watchPre

<v-clicks>

- Режим работы по-умолчанию
- Использует возможности батчинга
- Вызывается до обновления DOM 

</v-clicks>

---

# watchPost

<v-clicks>

- Требует отдельной опции или использования `flush: post`
- Использует возможности батчинга
- Вызывается **после** обновления DOM
- Лучшая альтернатива чем `watch` + `nextTick` 

</v-clicks>

---

# watchSync

<v-clicks depth="2">

- Игнорирует возможности батчинга
- Вызывается сразу же после триггера
- Удобно для деббага значений

</v-clicks>

---
layout: center
---

# Реактивность компонентов

---
layout: center
---

# Setup-функция

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
---

# Render-функция

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
---

# Props

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
---

# Slots

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
---

# Template refs

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
---

# Provide / Inject

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

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
dragPos:
  a: 426,124,102,40
  b: 354,209,102,40
---

<div v-drag="'a'" class="border-2 border-white rounded-md p-2 text-center text-[0.5em]">Component A</div>
<div v-drag="'b'" class="border-2 border-white rounded-md p-2 text-center text-[0.5em]">Component B</div>

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
---

# Attrs

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
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
