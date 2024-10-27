---
layout: center
topTitle: Sources
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

---
topTitle: Sources
---

<h1 class="text-center">Reactive</h1>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <EosIconsProxy/>
    </div>
    <div>
      Основан на работе с <strong>Proxy</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Вложенные объекты оборачиваются в <strong>Reactive</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <StreamlineAiGenerateVariationSparkSolid/>
    </div>
    <div>
      <strong>shallow</strong> / <strong>readonly</strong> / <strong>shallowReadonly</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MaterialSymbolsChipExtraction/>
    </div>
    <div>
      Автоматически развернет <strong>.value</strong> 
    </div>
  </div>
</div>

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
topTitle: Sources
---

<h1 class="text-center">ref</h1>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <EosIconsProxy/>
    </div>
    <div>
      Работает на основе <strong>getter / setter</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Объекты оборачиваются в <strong>Reactive</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <HugeiconsRecycle03/>
    </div>
    <div>
      Если в <strong>ref</strong> положить <strong>ref</strong> то вернется старый <strong>ref</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MdiBikeFast/>
    </div>
    <div>
      Работает быстрее чем <strong>Reactive</strong>
    </div>
  </div>
</div>

---
topTitle: Sources
---

<h1 class="text-center">shallowRef</h1>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <AkarIconsCross/>
    </div>
    <div>
      Не оборачивает объекты в <strong>Reactive</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <Fa6RegularClone/>
    </div>
    <div>
      Ничем не отличается от <strong>ref</strong> для примитивов
    </div>
  </div>
</div>

---
layout: center
---

# Push / Pull реактивность

<img class="center w-[740px] slide" src="/img/push-pull.png" />

<div v-drag="[325,89,61,40]">Push</div>

<div v-drag="[570,145,48,40]">Pull</div>

---

<img class="center w-[740px]" src="/img/push-pull-scheme.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/push-pull-scheme.png" />

---
topTitle: Scheduler
---

<img class="center w-[540px]" src="/img/cycle.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[540px]" src="/img/cycle.png" />

---

<h1 class="text-center">Scheduler</h1>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <LucideRefreshCw/>
    </div>
    <div>
      Механизм синхронизирующий обновления
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <IcRoundAccessTime/>
    </div>
    <div>
      Доступное API: <strong>nextTick</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <FluentPeopleQueue32Filled/>
    </div>
    <div>
      Синхронизация в конце очереди микротасков
    </div>
  </div>
</div>
