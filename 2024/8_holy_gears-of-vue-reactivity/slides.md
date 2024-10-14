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
title: The Progressive Path

layout: intro
author: Денис Чернов
name: 'шестеренки реактивности Vue'
twitch: '@izede'
discord: '@izede'
telegram: '@zede1697'
variant: first
---

<div v-drag="[126,158,689,128,20]" class="text-red text-[6em] text-shadow-lg"> ЗАМЕНИТЬ </div>

---

# Слайд о себе

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---

# Слайд о команде SmLab

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---

<script setup>
import Gear1 from './img/gear-1.svg?raw'
</script>

<div v-drag="[343,126,300,300]" class="animate-[spin_20s_linear_infinite]" v-html="Gear1" />

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

<div v-drag="[116,54,793,65]" class="text-green text-[1.5em] text-shadow-lg"> **схема реактивности Vue шестернями** </div>

---
layout: center
---

<div class="text-[1.5em]">Чем отличается computed от watch?</div>

---

<img class="center w-[740px]" src="/img/computed-watch.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/computed-watch.png" />

---
dragPos:
  basic: 388,46,168,36
  main: 346,103,233,36
  advamced: 72,308,227,36
  "@vue/reactivity": 381,232,172,36
  vue-runtime-core: 359,291,208,36
  advanced: 400,168,130,36
  internal: 395,348,136,36
  vapor: 334,459,260,36
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

---

# Реактивность

> Способность системы автоматически реагировать на раздражители

---

````md magic-move
```ts
const oranges = 5
const apples = 6
const total = oranges + apples
```
```ts
const oranges = ref(5)
const apples = ref(6)
const total = computed(() => oranges.value + apples.value)
```
````

---

# Слайд о пакетах Vue связанных с реактивностью

- vue-reactivity
- vue-runtime-core

<div v-drag="[144,394,689,128]" class="text-blue text-[4em] text-shadow-lg"> РЕАЛИЗОВАТЬ </div>

---
dragPos:
  replace: 141,172,757,182,12
---

# Карта реактивности

<img class="center w-[840px]" src="/img/map.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[840px]" src="/img/map.png" />

<div v-drag="'replace'" class="text-red text-[6em] text-shadow-lg"> ЗАМЕНИТЬ </div>

---

# @vue/reactivity

<v-clicks>

- базовая реализация реактивности
- может подключаться отдельно
- есть отличия от API из основного пакета Vue

</v-clicks>

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

<div v-click v-drag="[100,100,100,100]" class="border-2 border-white rounded-md p-2" />
<div v-click v-drag="[100,100,100,100]" class="border-b-2 border-blue rounded-md p-2" />
<div v-click v-drag="[100,100,100,100]" class="border-b-2 border-blue rounded-md p-2" />
<div v-click v-drag="[100,100,100,100]" class="border-t-2 border-red rounded-md p-2" />

---

# ReactiveEffect

<v-clicks>

- собрать зависимости
- уведомлять зависимости об обновлении
- хранение функции-эффекта

</v-clicks>

---
dragPos:
  cross-1: -66,0,0,0
  cross-2: -66,0,0,0
  cross-text: -66,0,0,0
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

---

# Effect

<v-clicks>

- обертка над ReactiveEffect
- перевызывает функцию-эффект при изменении зависимостей
- вызывается сразу же при изменении зависимостей

</v-clicks>

---

# Где используется?

- Тесты системы реактивности
- ... все!

---

# Когда использовать?

- Тесты системы реактивности
- Когда вы используете реактивность без Vue, а watch реализовывать не хотите

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

---

# Где используется?

- `setup` у компонента
- Системы реактивности вне Vue (`Pinia`)
- Особые вариации во VueUse
  - `createSharedComposable`
  - `createGlobalState`

---

# Полезное API

- `getCurrentScope` - получить текущий scope
- `onScopeDispose` - установить обработчик на уничтожение scope

---

# Когда использовать?

- Когда нужно собирать эффекты за пределами компонентов
- Когда нужно создавать эффекты асинхронно от setup

---
layout: center
---

# Tracking

---

# activeSub

<v-clicks>

- Переменная которая указывает текущий эффект
- В один момент времени может быть только 1 активный эффект
- Работает как стек для вложенных эффектов

</v-clicks>

---
layout: center
---

# Track / Trigger

<v-clicks>

- `track` - Добавляет текущее значение в список зависимостей у activeSub
- `trigger` - Уведомляет все зависящие от него значения о необходимости обновления

</v-clicks>

---
layout: center
---

# Deps / Link

---
dragPos:
  replace: -66,0,0,0
---

<img class="center w-[640px]" src="/img/deps-link.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[640px]" src="/img/deps-link.png" />

<div v-drag="'replace'" class="text-red text-[6em] text-shadow-lg"> ЗАМЕНИТЬ </div>

---

# Dep

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

---

# Tracking API

<v-clicks>

- `pauseTracking` - временно приостанавливает сбор зависимостей
- `enableTracking` - возобновляет сбор зависимостей
- `resetTracking` - востанавливает прежнее состояние

</v-clicks>

---

# Tracking API

<v-clicks>

- Все это работает по принципу стека
- `pauseTracking` + `resetTracking` = 💖
- `enableTracking` = 80%, что вы делаете что-то не так
- `pauseTracking` + `enableTracking` = утечка памяти
- Доступно только через `@vue/reactivity`
</v-clicks>

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

---
layout: center
---

# ref

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

---
layout: center
---

# watchEffect

---
layout: center
---

# watch

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

---
layout: center
---

# Render-функция

---
layout: center
---

# Props

---
layout: center
---

# Slots

---
layout: center
---

# Template refs

---
layout: center
---

# Provide / Inject

---
dragPos:
  object-1: 449,131,73,40
  object-2: 396,216,69,40
  object-3: 505,216,69,40
  object-4: 509,310,69,40
  a: 489,169,50,47
  b: 438,167,46,52,90
  c: -66,0,0,0
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
layout: center
---

# Attrs

---
layout: center
---

<div class="text-[1.5em]">Чем отличается computed от watch?</div>

---
layout: intro
name: 'Задавайте вопросы'
twitch: '@izede'
discord: '@izede'
telegram: '@zede1697'
variant: first
---
