---
layout: center
topTitle: Sources
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

---
topTitle: Sources
---

# Reactive

<v-clicks depth="2">

- Основан на работе с `Proxy`
- Вложенные объекты оборачиваются в `Reactive`
- может быть `shallow` / `readonly` или все сразу
- если в объекте есть `ref` - он развернется без `.value`

</v-clicks>


---
topTitle: Sources
---

<div v-drag="[75,243,100,40]" class="text-shadow-lg"> Reactive </div>

<div v-drag="[304,38,302,40]" class="text-shadow-lg"> ReactiveFlags.IS_REACTIVE </div>

<div v-drag="[305,145,210,40]" class="text-shadow-lg"> ReactiveFlags.SKIP </div>

<div v-drag="[307,240,215,40]" class="text-shadow-lg"> ReactiveFlags.RAW </div>

<div v-drag="[305,354,314,40]" class="text-shadow-lg"> ReactiveFlags.IS_READONLY </div>

<div v-drag="[306,467,305,40]" class="text-shadow-lg"> ReactiveFlags.IS_SHALLOW </div>

---
topTitle: Sources
---

````md magic-move {at: 1}
```ts
const obj = thirdPartyObject()


⠀
```

```ts
import { ReactiveFlags } from 'vue'

const obj = thirdPartyObject()
obj[ReactiveFlags.SKIP] = true
```

```ts {*|*}
import { markRaw } from 'vue'

const obj = thirdPartyObject()
markRaw(obj)
```

```ts
import { isReactive } from 'vue'

const obj = isReactive(data)
⠀
```

```ts
import { readonly } from 'vue'

const obj = readonly(data)
⠀
```

```ts
import { readonly, isReadonly } from 'vue'

const obj = readonly(data)
const readonly = isReadonly(data)
```

```ts
import { shallowReactive, shallowReadonly } from 'vue'

const obj = shallowReactive(data)
const readonly = shallowReadonly(data)
```

```ts
import { shallowReactive, shallowReadonly } from 'vue'

const obj = shallowReactive(data)
const readonly = shallowReadonly(data)
```

```ts
import { ReactiveFlags } from 'vue'

const obj = reactive(data)
console.log(obj[ReactiveFlags.RAW] === data)
```

```ts
import { toRaw } from 'vue'

const obj = reactive(data)
console.log(toRaw(obj) === data)
```
````

---
topTitle: Источники
---

# ref

<v-clicks>

- работает на основе getter / setter
- объекты оборачиваются в `Reactive`
- если в `ref` положить `ref` то вернется старый `ref`

</v-clicks>

---
topTitle: Sources
---

# shallowRef

<v-clicks>

- не оборачивает объекты в `Reactive`
- ничем не отличается от `ref` для примитивов

</v-clicks>

---
layout: center
---

# Push / Pull реактивность

<img class="center w-[740px]" src="/img/push-pull.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/push-pull.png" />

<div v-drag="[341,79,61,40]">Push</div>

<div v-drag="[580,86,48,40]">Pull</div>

---

<img class="center w-[740px]" src="/img/push-pull-scheme.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/push-pull-scheme.png" />

---
topTitle: Scheduler
---

<img class="center w-[540px]" src="/img/scheduler.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[540px]" src="/img/scheduler.png" />

<h1 v-drag="[391,21,169,40]">Scheduler</h1>

---
topTitle: Scheduler
---

<img class="center w-[540px]" src="/img/cycle.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[540px]" src="/img/cycle.png" />

---

# Scheduler

<v-clicks depth="2">

- механизм синхронизирующий обновления
- единственный способ с ним взаимодействовать `nextTick`
- синхронизация старается быть вычисленной в конце списка микротасков

</v-clicks>
