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

layout: clear
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

<zondicons-cog v-click v-drag="[258,70,104,95]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[260,38,104,95]" class="text-[1em] text-shadow-xl"> reactive </div>

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

но что если начинают задавать сложные?
-->

---

<img class="center w-[740px]" src="/img/computed-watch.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/computed-watch.png" />

<!--
Если вы начинаете чустсвовать себя неуверенно, то это доклад для вас.
-->

---
dragPos:
  basic: 388,46,168,36
  main: 346,103,233,36
  advamced: 72,308,227,36
  "@vue/reactivity": 381,232,172,36
  vue-runtime-core: 359,291,208,36
  advanced: 400,168,130,36
  internal: 395,348,136,36
  vapor: 334,459,260,51
  jonson: 597,459,63,58
---

<img class="center w-[340px]" src="/img/iceberg.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[340px]" src="/img/iceberg.png" />

<img v-drag="'jonson'" class="center w-[340px]" src="/img/jonson.jfif" />

<div v-drag="'basic'" >ref computed</div>
<div v-drag="'main'" >provide/inject watch</div>
<div v-drag="'advanced'" >effectScope</div>
<div v-drag="'@vue/reactivity'" >@vue/reactivity</div>
<div v-drag="'vue-runtime-core'" >vue-runtime-core</div>
<div v-drag="'internal'" >internal api</div>
<div v-drag="'vapor'" class="text-[0.7em]" >написать свою реактивность для Vapor Vue</div>

<!--
Подумать за разгоны. Постепенное погружение. Попытаться санимировать

- как вариант убрать шутку и расположить снизу вверх шестерни в порядке их разгона в докладе
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

<logos-vue v-drag="[441,49,119,108]" />

<div v-drag="[214,201,166,54]" class="text-[1em] bg-green-5 rounded-md p-2" > vue-reactivity </div>

<div v-drag="[628,205,211,51]" class="text-[1em] bg-green-5 rounded-md p-2" > vue-runtime-core </div>

<!--
визулизацию

что в нем лежит
-->

---

# Карта реактивности

<img class="center w-[840px]" src="/img/map.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[840px]" src="/img/map.png" />

<div v-drag="[156,152,757,182,-26]" class="text-red text-[6em] text-shadow-lg"> ЗАМЕНИТЬ </div>

<!--
порешить этого слайда (переместить)

- обдумать идею глобальной карты и реактивности и доклада, максимально подробную при разгоне шестерни зумить часть карты (часть за которую отвечает эта шестерня)
-->

---

# @vue/reactivity

<v-clicks>

- базовая реализация реактивности
- может подключаться отдельно
- есть отличия от API из основного пакета Vue

</v-clicks>

<!--
- сказать чего тут нет (watch / scheduler)
-->

---
layout: center
---

# ReactiveEffect

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

# ReactiveEffect

<v-clicks>

- собрать зависимости
- уведомлять зависимости об обновлении
- хранение функции-эффекта

</v-clicks>

---
dragPos:
  cross-1: 122,373,118,5,-11
  cross-2: 118,372,121,5,12
  cross-text: 248,353,131,40
---

# Где используется?

<v-clicks>

- `watch` / `watchEffect`
- `effectScope`
- `render` у компонента
- `computed`

</v-clicks>

<div v-click v-drag="'cross-1'" class="bg-red" />
<div v-click="'+0'" v-drag="'cross-2'" class="bg-red" />
<div v-click v-drag="'cross-text'"> (после 3.5) </div>

---

# Когда использовать?

<v-clicks>

- Не нужен для ручного использования
- Для понимания при дебаге
- Для понимания функционирования
- Вы пишите свою реактивность

</v-clicks>

<!--
- свои реактивные примитивы

- заголовки для тем (общее для всех слайдов)
-->

---
layout: center
---

# Effect

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

# Effect

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

# Где используется?

<v-clicks>

- Тесты системы реактивности
- ... все!

</v-clicks>

---

# Когда использовать?

<v-clicks>

- Тесты системы реактивности
- Когда вы используете реактивность без Vue, а watch реализовывать не хотите

</v-clicks>

<!--
- разгонять про замену (продать effect вместо watch)
-->

---
layout: center
---

# effectScope

<!--
- добавить слайд "а что есть скоуп"
-->

---

# effectScope

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

# Где используется?

<v-clicks depth="2">

- `setup` у компонента
- Системы реактивности вне Vue (`Pinia`)
- Особые вариации во VueUse
  - `createSharedComposable`
  - `createGlobalState`

</v-clicks>

<!--
- добавить логотипы
-->

---

# Полезное API

<v-clicks>

- `getCurrentScope` - получить текущий scope
- `onScopeDispose` - установить обработчик на уничтожение scope

</v-clicks>

<!--
- добавить примеры кодом API
- добавить визуализацию схемы для скоупов
- сопутствующее API
-->

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
---

# Tracking

<!--
- сделать отсылку на определение реактивности
-->

---

# activeSub

<v-clicks>

- Переменная которая указывает текущий эффект
- В один момент времени может быть только 1 активный эффект
- Работает как стек для вложенных эффектов

</v-clicks>

<!--
- ПРИДУМАТЬ ИЛЛЮСТРАЦИЮ (думать о шестеренках)
- подумать о спиче
- исходить от проблематики. как это помогает вью
-->

---

# Track / Trigger

<v-clicks>

- `track` - Добавляет текущее значение в список зависимостей у activeSub
- `trigger` - Уведомляет все зависящие от него значения о необходимости обновления

</v-clicks>

<!--
- переписать описания
- перепродумать спич
- ДОБАВИТЬ ИЛЮСТРАЦИЮ
- подумать о репрезентации на что-то знакомое
-->

---
layout: center
---

# Deps / Link

<!--
- как было раньше
- как стало
-->

---

<img class="center w-[640px]" src="/img/deps-link.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[640px]" src="/img/deps-link.png" />

<div v-drag="[614,91,769,180,26]" class="text-red text-[6em] text-shadow-lg"> ЗАМЕНИТЬ </div>

<!--
- разобраться в вопросе
 - как работало раньше
 - как работает сейчас (Link)
 - почему это круче
- переверстать диаграмку
-->

---

# Dep

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

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

# Tracking API

<v-clicks>

- `pauseTracking` - временно приостанавливает сбор зависимостей
- `enableTracking` - возобновляет сбор зависимостей
- `resetTracking` - востанавливает прежнее состояние

</v-clicks>

<!--
- попробовать подвести через код
- обяъснить а на кой их добавили
-->

---

# Tracking API

<v-clicks>

- Все это работает по принципу стека
- `pauseTracking` + `resetTracking` = 💖
- `enableTracking` = 80%, что вы делаете что-то не так
- `pauseTracking` + `enableTracking` = утечка памяти
- Доступно только через `@vue/reactivity`
</v-clicks>

<!--
- убрать ошибочное использование
-->

---
layout: center
---

# Источники / Зависимости

---
layout: center
---

# shallowRef

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
---

# Reactive

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
layout: center
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
  scheduler: 391,24,167,40
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
