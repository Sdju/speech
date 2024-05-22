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
name: '50 оттенков реактивности Vue'
twitch: '@izede'
discord: '@izede'
telegram: '@zede1697'
variant: first
---

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
layout: cover
dragPos:
  e-dom: 475,98,40,32
  e-string: 552,160,120,32
  e-canvas: 555,375,71,32
  e-pdf: 326,376,133,32
  e-fan: 321,164,92,32
  a-1: 486,129,10,102
  a-2: 565,169,10,102,55
  a-3: 547,291,10,102,137
  a-4: 424,289,10,102,223
  a-5: 404,170,10,102,-58
  vue: 461,250,60,60
---

<svg v-drag="'vue'" class="absolute top-0" width="60" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02">
  <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"/>
  <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"/>
</svg>

<div v-click="1" v-drag="'e-dom'" class="text-2xl w-[max-content]" >ref</div>
<div v-click="2" v-drag="'e-string'" class="text-2xl w-[max-content] flex" >computed</div>
<div v-click="3" v-drag="'e-canvas'" class="text-2xl w-[max-content]" >watch</div>
<div v-click="4" v-drag="'e-pdf'" class="text-2xl w-[max-content]" >watchEffect</div>
<div v-click="5" v-drag="'e-fan'" class="text-2xl w-[max-content]" >reactive</div>
<div v-click="1" v-drag="'a-1'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-click="2" v-drag="'a-2'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-click="3" v-drag="'a-3'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-click="4" v-drag="'a-4'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-click="5" v-drag="'a-5'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>

---

:GlowImage{src="/img/dno.png"}

---

# Реактивность

Способность системы автоматически реагировать на раздражители

````md magic-move
```ts
let a = 5
let b = 10



⠀
```

```ts
let a = 5
let b = 10
let c = a + b
console.log(c)

⠀
```

```ts
let a = 5
let b = 10
let c = a + b
console.log(c) // 15

⠀
```

```ts
let a = 5
let b = 10
let c = a + b
console.log(c) // 15
b = 7
console.log(c)
```

```ts
let a = 5
let b = 10
let c = a + b
console.log(c) // 15
b = 7
console.log(c) // 15
```

```ts
let a = ref(5)
let b = ref(10)
let c = computed(() => a.value + b.value)
console.log(c.value)
b.value = 7
console.log(c.value)
```

```ts {*|5|6|*}
let a = ref(5)
let b = ref(10)
let c = computed(() => a.value + b.value)
console.log(c.value) // 15
b.value = 7 
console.log(c.value) // 12
```
````

---

# @vue/reactivity

<v-clicks>

- Доступен отдельным пакетом
- Включает в себя основную часть реактивности Vue
- Не вся палитра реактивности

</v-clicks>

---
layout: cover
dragPos:
  e-dom: 475,98,40,32
  e-string: 552,160,120,32
  e-canvas: 555,375,71,32
  e-pdf: 326,376,133,32
  e-fan: 323,159,92,32
  a-1: 486,129,10,102
  a-2: 565,169,10,102,55
  a-3: 547,291,10,102,137
  a-4: 424,289,10,102,223
  a-5: 404,170,10,102,-58
  vue: 461,250,60,60
---

<svg v-drag="'vue'" class="absolute top-0" width="60" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02">
  <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"/>
  <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"/>
</svg>

<div v-drag="'e-dom'" class="text-2xl w-[max-content]" >ref</div>
<div v-drag="'e-string'" v-mark.green.strike-through="{at: 3, strokeWidth: 3}" class="text-2xl w-[max-content] flex" >computed</div>
<div v-drag="'e-canvas'" v-mark.green.strike-through="{at: 1, strokeWidth: 3}" class="text-2xl w-[max-content]" >watch</div>
<div v-drag="'e-pdf'" v-mark.green.strike-through="{at: 2, strokeWidth: 3}" class="text-2xl w-[max-content]" >watchEffect</div>
<div v-drag="'e-fan'" class="text-2xl w-[max-content]" >reactive</div>
<div v-drag="'a-1'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-drag="'a-2'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-drag="'a-3'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-drag="'a-4'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-drag="'a-5'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>

---

# ReactiveEffect

Основополагающий примитив реактивности во Vue3

<v-clicks>

- Хранит в себе зависимости
- Указывает на необходимость обновления (**dirty**)
- Его можно запускать с соответствующей функцией
- Не требуется для ручного использования

</v-clicks>

---

# ReactiveEffect

Лежит в основе:

<v-clicks>

- `computed`
- `watch` / `watchEffect`
- `render` у компонента
- `effectScope`

</v-clicks>

---

# effectScope

````md magic-move
```ts
const counter = ref(0)











⠀⠀
```
```ts
const counter = ref(0)

const doubled = computed(() => counter.value * 2)

watch(doubled, () => console.log(doubled.value))

watchEffect(() => console.log('Count: ', doubled.value))





⠀⠀
```

```ts
const counter = ref(0)

const scope = effectScope()

const doubled = computed(() => counter.value * 2)

watch(doubled, () => console.log(doubled.value))

watchEffect(() => console.log('Count: ', doubled.value)



⠀⠀
```

```ts
const counter = ref(0)

const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

⠀⠀
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

# activeEffect

<v-clicks>

- В один момент времени может быть только 1 активный эффект
- Работают как стек для вложенных эффектов

</v-clicks>

---
dragPos:
  trigger: 413,79,74,32
  track: 533,79,56,32
  ref: 225,302,31,32
---

:GlowImage{src="/img/brothers.png"}

<div v-drag="'ref'" class="t text-2xl w-[max-content]" >ref</div>
<div v-drag="'track'" class="t text-2xl w-[max-content]" >track</div>
<div v-drag="'trigger'" class="t text-2xl w-[max-content]" >trigger</div>

<style>
.t {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
</style>

---

# Track / Trigger

<v-clicks>

- `track` - Добавляет текущее значение в список зависимостей у ActiveEffect
- `trigger` - Уведомляет все зависящие от него значения о необходимости обновления

</v-clicks>

---

````md magic-move
```ts
function ref(value) {

}












⠀⠀
```

```ts
function ref(value) {
  const refObject = {}
  return refObject
}











⠀⠀
```

```ts
function ref(value) {
  const refObject = {
    _value = value
  
    get value() {
      track(refObject)
      return this._value
    },
  }
  return refObject
}




⠀⠀
```

```ts
function ref(value) {
  const refObject = {
    _value = value
  
    get value() {
      track(refObject)
      return this._value
    },
    
    set value(newValue) {
      this._value = newValue
      trigger(refObject)
    }
  }
  return refObject
}
```
````

---

# shallowRef

<v-clicks>

- неглубокая реактивность
- не оборачивает объекты
- ничем не отличается от `ref` для примитивов
- отвечает флаг `__v_isShallow`

</v-clicks>

---

# Reactive

<v-clicks depth="2">

- Основан на работе с `Proxy`
- может быть `readonly`
- может быть `shallow`
- может быть `shallow` + `readonly`

</v-clicks>

---

# ReactiveFlags

```ts {*|2|2|3|3|4|4|5|5|6|6}
export enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw',
}
```

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

# Reactive

<v-clicks depth="2">

- Может быть в различных формах и вариациях
- Он автоматически развернет ваши `ref`
- Использует тип `UnwrapNestedRefs<T>`
- Если во время создания `reactive` передать существующий `reactive`
  - Новый `reactive` создан не будет
  - Мы получим в результате переданный `reactive`
  - Данное правило не работает для `readonly`/`shallowReadonly`
- `shallowReadonly` похож по поведению на `slots`/`props`/`attrs`, но не является его реализацией

</v-clicks>

---

<div  v-click.hide>
  <GlowImage src="/img/ref-usual.png" />
</div>

<div  v-click>
  <GlowImage src="/img/console.png" />
</div>

<div  v-click>
  <GlowImage src="/img/ref-fixed.png" />
</div>


---

# ref

<v-clicks depth="2">

- Если в `ref` передать существующий `ref`, то новый `ref` создан не будет
- Для примитивов никакой разницы с `shallowRef` не будет
- Оборачивает объекты в `reactive`
- Eсли в `ref` положить объект содержащий `ref`, то он будет развернут из-за `reactive`

</v-clicks>

---

# computed

````md magic-move
```ts
class ComputedRefImpl<T> {
  
}
```
```ts
class ComputedRefImpl<T> {
  public readonly effect: ReactiveEffect<T>
  
  get value() {}
  
  set value(v) {}
}
```
```ts
class ComputedRefImpl<T> {
  public readonly effect: ReactiveEffect<T>
  
  get value() {}
  
  set value(v) {}
}
```
```ts
class ComputedRefImpl<T> {
  public readonly effect: ReactiveEffect<T>
  
  get value() {}
  
  set value(v) {}
  
  private _value!: T
}
```
```ts
class ComputedRefImpl<T> {
  public readonly effect: ReactiveEffect<T>
  
  get value() {}
  
  set value(v) {}
  
  private _value!: T
  
  private dep!: Dep
}
```
```ts
class ComputedRefImpl<T> {
  public readonly effect: ReactiveEffect<T>
  
  get value() {}
  
  set value(v) {}
  
  private _value!: T
  
  private dep!: Dep
  public readonly __v_isRef = true
  public readonly [ReactiveFlags.IS_READONLY]: boolean = false
}
```
````

---

# computed 3.4+

> Сделать демку на основе computed из 3.4+ по оптимизации объекта

---

# Push / Pull реактивность

> Сделать демку показывающую разницу между Push и Pull реактивностью.
> Сделать вывод о работе с оптимизацией при работе с computed

---

# Scheduler

> Слайд с простым объяснением работы планировщика и базового батчинга

---

# watch

> 3 режима работы watch

---
layout: intro
name: 'Задавайте вопросы'
twitch: '@izede'
discord: '@izede'
telegram: '@zede1697'
variant: first
---
