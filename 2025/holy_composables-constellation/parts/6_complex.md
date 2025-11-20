---
layout: center
---

<script setup>
import shader from '../shaders/vue.glsl?raw'
import RConsImg from '../img/r-cons.png'
</script>

<GlslImageEffect
  class="pos-50%_50% $obj absolute size-full"
  :image="RConsImg"
  :stages="[{
    fragmentShader: shader
  }]"
/>

<h1 :class="className" class="text-center text-4xl pos-50%_55% $obj title-bg"> Object vs Reactive </h1>

---

````md magic-move
```ts
const user = useUserStore()
console.log(user.name)
⠀
```

```ts
const { name, age, isAdmin } = useUserStore()
console.log(name)
// ❌ данные не являются реактивными
```

```ts
const { name, age, isAdmin } = storeToRefs(useUserStore())
console.log(name.value)
⠀
```

````

---

<h1 class="title-bg"><strong>Reactive</strong> как результата композабла</h1>

```vue {*|15-21|7-12}
<script setup lang="ts">
const useStore = () => {
  const name = ref('John')
  const age = ref(20)
  const secondName = ref('Doe')
  const fullName = computed(() => `${name.value} ${secondName.value}`)
  return reactive({
    name,
    age,
    secondName,
    fullName
  })
}

const user = useStore()
console.log(user.fullName)
</script>

<template>
  <span> {{ user.fullName }} </span>
</template>
```

---
layout: center
---

<script setup>
import shader from '../shaders/vue.glsl?raw'
import IsoConsImg from '../img/iso-cons.png'
</script>

<GlslImageEffect
  class="pos-50%_50% $obj absolute size-full"
  :image="IsoConsImg"
  :stages="[{
    fragmentShader: shader
  }]"
/>

<h1 class="text-center text-4xl pos-50%_55% $obj title-bg">Isomorphic Destructurable</h1>

---

```ts {*|13-14|7-10|13-14}
import { makeDestructurable } from '@vueuse/core'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return makeDestructurable(
    { count, increment } as const,
    [ count, increment ] as const,
  )
}

const [ a, incA ] = useCounter()
const { count, increment } = useCounter()
```

<LogosVueuse class="$obj pos-779_125 size-150" />

---
layout: center
---

<script setup>
import shader from '../shaders/vue.glsl?raw'
import LevConsImg from '../img/lev-cons.png'
</script>

<GlslImageEffect
  class="pos-50%_50% $obj absolute size-full"
  :image="LevConsImg"
  :stages="[{
    fragmentShader: shader
  }]"
/>


<h1 class="text-center text-4xl pos-50%_55% $obj title-bg">Композаблы высшего порядка</h1>

---
timeline:
  - point1: 'active'
    point2: 'hidden'
    point3: 'hidden'
    example: 'pos-0 fx duration-500 cs-red'
    exampleId: 1
  - point1: ''
    point2: 'active'
    example: 'cs-blue'
  - point2: ''
    point3: 'active'
    example: 'cs-green'
---

<h1 class="text-center title-bg">Композаблы высшего порядка:</h1>

<Points>
  <Point icon="i-fe-import" :attrs="t.point1" class="cs-red">
    Композабл как аргумент
  </Point>
  <Point icon="i-fe-export" :attrs="t.point2" class="cs-blue">
    Возвращают новый композабл
  </Point>
  <Point icon="i-qlementine-icons-match-regexp-16" :attrs="t.point3" class="cs-green">
    <strong>use*</strong> → <strong>create*</strong>/<strong>define*</strong>
  </Point>
  <Point full :class="t.example">
    <Example>

````md magic-move {lines: false}
```ts
defineStore('user', () => { ... })

```
```ts
const useUserStore = defineStore('user', )
```
```ts {*|*}
defineStore()
createSharedComposable()
```
````

</Example>
</Point>
</Points>

---

```js {*|2-10|3-9|6-8|13}
// Композабл, возвращающий композабл
export function createSafeComposable(composable, fallback) {
  return () => {
    try {
      return composable()
    } catch (error) {
      return fallback
    }
  }
}

// Использование
const useMountedSafe = createSafeComposable(onMounted)
```

---

<DeviconVeevalidate class="size-150 $obj pos-779_125" />

```ts
// vee-validate
const { defineField } = useForm();
const [email, emailAttrs] = defineField('email');
```

---
layout: center
---

<script setup>
import shader from '../shaders/vue.glsl?raw'
import DevConsImg from '../img/dev-cons.png'
</script>

<GlslImageEffect
  class="pos-50%_50% $obj absolute size-full"
  :image="DevConsImg"
  :stages="[{
    fragmentShader: shader
  }]"
/>

<h1 class="text-center text-4xl pos-50%_50% $obj title-bg">Shared Composable</h1>

---

````md magic-move
```ts
const { x, y } = useMouse()



⠀
```
```ts
const useMouseStore = defineStore('mouse', () => { 
  return useMouse()
}

const mouseStore = useMouseStore()
```
```ts
const useSharedMouse = createSharedComposable(useMouse)

const { x, y } = useSharedMouse()

⠀
```
````

---
layout: default
---

<h1 class="title-bg">Shared Composable</h1>

```ts {*|2,7-9,16|3,9,19}
function createSharedComposable<F extends AnyF>(composable: F): ReturnType<F> {
  let subscribers = 0
  let state: ReturnType<Fn> | undefined
  let scope: EffectScope | undefined

  const dispose = () => {
    subscribers -= 1
    if (scope && subscribers <= 0) {
      scope.stop()
      state = undefined
      scope = undefined
    }
  }

  return <Fn>((...args) => {
    subscribers += 1
    if (!scope) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    tryOnScopeDispose(dispose)
    return state
  })
}
```

<LogosVueuse class="size-150 $obj pos-834_414" />

---

```ts
const useUserStore = createSharedComposable(() => {
  // ...
})

// использование
const { name, age, isAdmin } = useUserStore()
```

---

# Shared Composable



<div class="grid grid-cols-2 gap-2">
<v-clicks>
<div class="cs-green box box--rich text-center">
  Оптимизация доступа
</div>
<div class="cs-red box box--rich text-center">
  Не дружит с <strong>SSR</strong>
</div>
<div class="cs-blue box box--rich text-center">
  Стейт менеджер?
</div>
<div class="cs-red box box--rich text-center">
  Циклические зависимости
</div>
<div class="cs-green box box--rich text-center">
  Очищает себя самостоятельно
</div>
<div class="cs-red box box--rich text-center">
  Хрупкость конструкции
</div>
</v-clicks>
</div>

---
layout: center
---

<script setup>
import shader from '../shaders/vue.glsl?raw'
import BikConsImg from '../img/bik-cons.png'
</script>

<GlslImageEffect
  class="pos-50%_50% $obj absolute size-full"
  :image="BikConsImg"
  :stages="[{
    fragmentShader: shader
  }]"
/>

<h1 class="text-center text-4xl pos-50%_55% $obj title-bg">Порождающие <strong>«композаблы»</strong></h1>

---

<h1 class="title-bg">Порождающие <strong>«композаблы»</strong></h1>  

````md magic-move
```js {*|2|4-7|8-11|16}
export function useRef<T>(value: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        value = newValue
        trigger()
      }
    }
  })
}

const customCount = useRef(0)
```
```ts {*|1|2|10-14|20}
export function useDebouncedRef<T>(value: T, delay: number = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

const customCount = useDebouncedRef(0)
```
```ts {*|20}
export function createDebouncedRef<T>(value: T, delay: number = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

const customCount = createDebouncedRef(0)
```
````
