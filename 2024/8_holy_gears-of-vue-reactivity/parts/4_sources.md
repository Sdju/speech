---
layout: center
topTitle: Dependencies
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

<!--
встроить переход в сценарий
-->

---
topTitle: Dependencies
clicks: 10
---

<Timeline :steps="[{
  proxyClasses: 'outline outline-2 outline-[#CCCCCC88]',
  nestedClasses: '-blur-hidden outline-[#00000088]',
  shallowClasses: '-blur-hidden outline-[#00000088]',
  autoClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 fx duration-500',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
  example4: 'absolute pos-0 fx duration-500 -blur-hidden',
}, {
  proxyClasses: 'outline-[#00000088]',
  nestedClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500',
}, {
  $clicksAlias: 'example3Start',
  nestedClasses: 'outline-[#00000088]',
  shallowClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500',
}, {
}, {
}, {
}, {
}, {
}, {
  shallowClasses: 'outline-[#00000088]',
  autoClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
  example4: 'absolute pos-0 fx duration-500',
}]" v-slot="t">

<h1 class="text-center">Reactive</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.proxyClasses">
    <div class="item-icon">
      <EosIconsProxy/>
    </div>
    <div>
      Основан на работе с <strong>Proxy</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.nestedClasses">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Вложенные объекты оборачиваются в <strong>Reactive</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.shallowClasses">
    <div class="item-icon">
      <StreamlineAiGenerateVariationSparkSolid/>
    </div>
    <div>
      <strong>shallow</strong> / <strong>readonly</strong> / <strong>shallowReadonly</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.autoClasses">
    <div class="item-icon">
      <MaterialSymbolsChipExtraction/>
    </div>
    <div>
      Автоматически развернет <strong>.value</strong> 
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">
    
<div :class="t.example1">

```ts
new Proxy(target, {
  get(tg, key, receiver) { 
    // ...
  },
  set(tg, key, value, receiver) { 
    // ...
  }
  // ...
})
```

</div>
<div :class="t.example2">

```ts
const obj = reactive({
  a: 1,
  b: 2,
})
console.log(obj === reactive(obj))
// true
```

</div>
<div :class="t.example3">

````md magic-move {at: 3, lines: false}
```ts
const obj = reactive({
  a: 1,
  b: 2,
})
const sum = computed(
  () => obj.a + obj.b
)

console.log(sum.value) // 3

obj.a = 10
console.log(sum.value) // 12
```
```ts
const obj = shallowReactive({
  a: 1,
  b: 2,
})
const sum = computed(
  () => obj.a + obj.b
)

console.log(sum.value) // 3

obj.a = 10
console.log(sum.value) // 12
```
```ts
const obj = shallowReactive({
  a: [1],
  b: [2],
})
const sum = computed(
  () => obj.a[0] + obj.b[0]
)

console.log(sum.value) // 3

obj.a[0] = 10
console.log(sum.value) // 3
```
```ts
const obj = readonly({
  a: 1,
  b: 2,
})
const sum = computed(
  () => obj.a + obj.b
)

console.log(sum.value) // 3

obj.a = 10 // ERROR!
console.log(sum.value)
```
```ts
const obj = shallowReadonly({
  a: 1,
  b: 2,
})
const sum = computed(
  () => obj.a + obj.b
)

console.log(sum.value) // 3

obj.a = 10 // ERROR!
console.log(sum.value)
```
```ts
const obj = shallowReadonly({
  a: [1],
  b: [2],
})
const sum = computed(
  () => obj.a[0] + obj.b[0]
)

console.log(sum.value) // 3

obj.a[0] = 10
console.log(sum.value) // 3
```
````

</div>
<div :class="t.example4">

````md magic-move {at: 9, lines: false}
```ts
const a = ref(2)
const b = ref(3)
const c = computed(
  () => a.value + b.value
)

const obj = reactive({ a, b, c })
console.log(obj.a, obj.b, obj.c)
// 2 3 5
```
```ts
const a = ref(2)
const b = ref(3)
const c = computed(
  () => a.value + b.value
)

const obj = shallowReactive({ a, b, c })
console.log(
  obj.a.value, // 2
  obj.b.value, // 3
  obj.c.value // 5
)
```
````

</div>

  </div>
</div>

</Timeline>

<!--
- буллеты соединить с примерами из кода (сделать примеры кода сопроводительными) / илюстрациями

 ИЛЛЮСТРАЦИИ! (мем если не придумался пример)

поправить пример 2
-->

---
topTitle: Dependencies
disabled: true
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
topTitle: Dependencies
clicks: 5
---

<Timeline :steps="[{
  getterClasses: 'outline outline-2 outline-[#CCCCCC88]',
  objectClasses: '-blur-hidden outline-[#00000088]',
  refClasses: '-blur-hidden outline-[#00000088]',
  speedClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 fx duration-500',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
  example4: 'absolute pos-0 fx duration-500 -blur-hidden',
}, {
  getterClasses: 'outline-[#00000088]',
  objectClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500',
}, {
  objectClasses: 'outline-[#00000088]',
  refClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500',
}, {
}, {
}, {
  refClasses: 'outline-[#00000088]',
  speedClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
  example4: 'absolute pos-0 fx duration-500',
}]" v-slot="t">

<h1 class="text-center">ref</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.getterClasses">
    <div class="item-icon">
      <EosIconsProxy/>
    </div>
    <div>
      Работает на основе <strong>getter / setter</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.objectClasses">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Объекты оборачиваются в <strong>Reactive</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.refClasses">
    <div class="item-icon">
      <HugeiconsRecycle03/>
    </div>
    <div>
      Если в <strong>ref</strong> положить <strong>ref</strong> то вернется старый <strong>ref</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.speedClasses">
    <div class="item-icon">
      <MdiBikeFast/>
    </div>
    <div>
      Работает быстрее чем <strong>Reactive</strong>
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">
    
<div :class="t.example1">

```ts {lines: false}
class RefImpl {
  // ...
  get value() {
    this.dep.track()
    return this._value
  },
  set value(v) {
    this._value = v
    if (hasChanged(this._value, v)) {
      this.dep.trigger()
    }
  }
}
```

</div>
<div :class="t.example2">

  ```ts
  const a = ref({ a: 1 })
  console.log(
    a.value === reactive(a.value) // true
  )
  
  ```

</div>

<div :class="t.example3">

````md magic-move {at: 3, lines: false}
```ts
const a = ref(2)
console.log(
  a === ref(a) // true
)
```
```ts
const a = ref(2)
console.log(
  a === shallowRef(a)
)
```
```ts
const a = ref(2)
console.log(
  a === shallowRef(a) // true
)
```
````

</div>

<div :class="t.example4">

  ```ts
  // ВСТАВИТЬ ЗАМЕРЫ
  ```

</div>

  </div>
</div>

</Timeline>

---
topTitle: Dependencies
clicks: 5
---

<Timeline :steps="[{
  getterClasses: 'outline outline-2 outline-[#CCCCCC88]',
  objectClasses: '-blur-hidden outline-[#00000088]',
  refClasses: '-blur-hidden outline-[#00000088]',
  speedClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 fx duration-500',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
}, {
}, {
}, {
}, {
  getterClasses: 'outline-[#00000088]',
  objectClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500',
}]" v-slot="t">

<h1 class="text-center">shallowRef</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.getterClasses">
    <div class="item-icon">
      <AkarIconsCross/>
    </div>
    <div>
      Не оборачивает объекты в <strong>Reactive</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.objectClasses">
    <div class="item-icon">
      <Fa6RegularClone/>
    </div>
    <div>
      Ничем не отличается от <strong>ref</strong> для примитивов
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">
    
<div :class="t.example1">

````md magic-move {lines: false}
```ts
const a = ref({ a: 1 })
const b = reactive(a.value)
console.log(a.value === b) // true
```
```ts
const a = shallowRef({ a: 1 })
const b = reactive(a.value)
console.log(a.value === b) // false
```
```ts
const a = shallowRef({ a: 1 })
const b = computed(() => a.value.a + 5)
console.log(b.value) // 6
a.value.a = 10
console.log(b.value) // 6
```
```ts
const a = shallowRef({ a: 1 })
const b = computed(() => a.value.a + 5)
console.log(b.value) // 6
a.value = { a: 10 }
console.log(b.value) // 15
```
````

</div>

<div :class="t.example2">

```ts {lines: false}
export const toReactive = (value) =>
  isObject(value)
    ? reactive(value)
    : value

class RefImpl {
  constructor(value, isShallow) {
    this.value = isShallow 
      ? value
      : toReactive(value)
  }
}
```

</div>

  </div>
</div>
</Timeline>
