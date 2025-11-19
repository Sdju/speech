---
layout: center
---

<script setup>
import shader from '../shaders/vue.glsl?raw'
</script>

<GlslImageEffect
  class="pos-50%_50% $obj absolute size-full"
  :image="'../img/base-cons.png'"
  :stages="[{
    fragmentShader: shader
  }]"
/>

<h1 :class="className" class="text-center text-4xl pos-50% $obj title-bg"> Базовая работа с композаблами </h1>

---
layout: default
timeline:
  - title: 'в компонентах'
  - title: 'в сторе'
  - title: 'в других композаблах'
---

<h2 class="title-bg">✅ Где можно использовать:</h2>
<h1 class="title-bg"> {{ t.title }} </h1>

````md magic-move
```vue
<script setup lang="ts">
const { isAuthenticated } = useAuth()
</script>

<template>
  <div>{{ isAuthenticated }}</div>
</template>
⠀
```

```js
export const useAdminPanel = defineStore('admin-panel', () => {
    const { params } = useRoute()
    const { isAuthenticated } = useAuth()
    
    // ...
})
⠀
```

```js
export function useAdminPanel() {
    const { params } = useRoute()
    const { isAuthenticated } = useAuth()

    // ...
}
⠀
```
````

---
layout: default
---

<h2 class="title-bg">🤔 Сомнительно:</h2>
<h1 class="title-bg">в хуках роутера</h1>

````md magic-move
```js
router.beforeEach(async (to) => {
    const { user } = useUser()
    if (!user.value) {
      return router.push('/login')
    }
    // ...
})
```

```js {*|1|3|4-5}
app.provide('token', SOME_TOKEN)

router.beforeEach(async (to) => {
  // vue 3.3+
  const token = inject('token')
  // ...
})
```

```js {*|2|3}
router.beforeEach(async (to) => {
  const instance = getCurrentInstance() // ⚠️ undefined
  const scope = getCurrentScope() // ⚠️ null

  // ...
})
```

```js
router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useUserStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
```
````

---

<h2 class="title-bg">🤔 Сомнительно:</h2>
<h1 class="title-bg">в листенерах и обычных функциях</h1>

````md magic-move
```js
function onClick() {
  const { user } = useUser()
  // ...
}





⠀
```

```js
function onClick() {
  const { user } = useUser()
  // ⚠️ watcher-ы не будут уничтожены!
}





⠀
```

```js
function onClick() {
  const { user } = useUser()
  // ⚠️ watcher-ы не будут уничтожены!
  // ❌ утечка памяти!
}




⠀
```

```js
import { effectScope } from 'vue'

function onClick() {
  const scope = effectScope()
  scope.run(() => {
    const { user } = useUser()
    // ...
  })
  scope.stop()
}
```
````

---
layout: default
---

<h2 class="title-bg">🤔 Сомнительно:</h2>
<h1 class="title-bg">Использование в условиях</h1>

````md magic-move
```ts
const props = defineProps<{
  hasTooltip?: boolean
}>()

// ...

if (props.hasTooltip) {
  const { ... } = useTooltip({
    target: props.target,
  })
}
```

```ts
const props = defineProps<{
  hasTooltip?: boolean
}>()

// ...

const { ... } = useTooltip({
  target: () => hasTooltip ? props.target : null,
})

⠀
```
````

---
layout: default
---

<h1 class="title-bg">Composable hell</h1>

````md magic-move
```ts
const useTooltip = () => { ... }


⠀
```

```ts
const useTooltip = () => { ... }
const useStoreTooltip = () => { ... }

⠀
```

```ts
const useTooltip = () => { ... }
const useStoreTooltip = () => { ... }
const useMainTooltip = () => { ... }
⠀
```

```ts
const useTooltip = () => { ... }
const useStoreTooltip = () => { ... }
const useMainTooltip = () => { ... }
const useSiteTooltip = () => { ... }
```
````

---
timeline:
  - point1: 'active'
    point2: 'hidden'
    point3: 'hidden'
    point4: 'hidden'
    example: 'pos-0 fx duration-500 cs-red'
    exampleId: 1
  - point1: ''
    point2: 'active'
    example: 'cs-blue'
  - point2: ''
    point3: 'active'
    example: 'cs-green'
    exampleId: 2
  - point3: ''
    point4: 'active'
    exampleId: 3
    example: 'cs-purple'
---

<script setup lang="ts">
import BreadImg from '../img/bread.png'
import DryImg from '../img/dry.png'
</script>

<h1 class="text-center title-bg">Композаблы здорового человека:</h1>

<Points>
  <Point icon="i-material-symbols-cycle" :attrs="t.point1" class="cs-red">
    Не создают абстракцию ради абстракции
  </Point>
  <Point icon="i-mingcute-baby-fill" :attrs="t.point2" class="cs-blue">
    Минимально полагаются на хуки жизненного цикла
  </Point>
  <Point icon="i-material-symbols-clear-day-rounded" :attrs="t.point3" class="cs-green">
    Не делают неявных действий
  </Point>
  <Point icon="i-carbon-foundation-model" :attrs="t.point4" class="cs-purple">
    Практики хорошего кода как SOLID работают и в композаблах
  </Point>
  <Point full :class="t.example">
    <Example v-if="t.exampleId === 1">

````md magic-move {lines: false}
```ts
const useTooltip = () => { ... }
const useStoreTooltip = () => { ... }
const useMainTooltip = () => { ... }
const useSiteTooltip = () => { ... }



⠀
```
```ts
function useCounter() {
  const count = ref(0)
  
  onMounted(() => {
    count.value++
  })
  // ...
}
```
````

</Example>
<ImgExample v-if="t.exampleId === 2" :src="BreadImg" />
<ImgExample v-if="t.exampleId === 3" :src="DryImg" />

  </Point>
</Points>

---
layout: default
---

<h1 class="title-bg">Прием аргументов</h1>

````md magic-move
```ts {*|1|3|7}
const useFetch = (url: string) => {
  // ...
  fetch(url)
  // ...
}

useFetch('https://api.example.com/data') // ✅ 











⠀
```

```ts {*|8-9}
const useFetch = (url: string) => {
  // ...
  fetch(url)
  // ...
}

useFetch('https://api.example.com/data') // ✅ 
const url = ref('https://api.example.com/data')
useFetch(url.value) // ❌ 









⠀
```

```ts {1|3-6|11-12|10}
const useFetch = (url: Ref<string>) => {
    // ...
  watch(() => unref(url), (newUrl) => {
    fetch(newUrl)
    // ...
  })
  // ...
}

useFetch('https://api.example.com/data') // ❌  
const url = ref('https://api.example.com/data')
useFetch(url) // ✅






⠀⠀⠀
```

```ts {*|1|2|2|9-11}
const useFetch = (url: MaybeRef<string>) => {
  watch(() => unref(url), (newUrl) => {
    fetch(newUrl)
    // ...
  })
  // ...
}

useFetch('https://api.example.com/data') // ✅
const url = ref('https://api.example.com/data')
useFetch(url) // ✅







⠀
```

```ts {-13|12-13|14}
const useFetch = (url: MaybeRef<string>) => {
  watch(() => unref(url), (newUrl) => {
    fetch(newUrl)
    // ...
  })
  // ...
}

useFetch('https://api.example.com/data') // ✅
const url = ref('https://api.example.com/data')
useFetch(url) // ✅
const userUrl = computed(() => url.value + '/user')
useFetch(userUrl) // ✅
useFetch(computed(() => url.value + '/user')) // 🤔




⠀
```

```ts {*|1|2|14|*}
const useFetch = (url: MaybeRefOrGetter<string>) => {
  watch(() => toValue(url), (newUrl) => {
    fetch(newUrl)
    // ...
  })
  // ...
}

useFetch('https://api.example.com/data') // ✅
const url = ref('https://api.example.com/data')
useFetch(url) // ✅
const userUrl = computed(() => url.value + '/user')
useFetch(userUrl) // ✅
useFetch(() => url.value + '/user') // ✅




⠀
```

```ts {*|1-4,6|7-10|13-14|15}
interface UseFetchOptions {
  url: MaybeRefOrGetter<string>,
  method: MaybeRefOrGetter<'GET' | 'POST' | 'PUT' | 'DELETE'>
}

const useFetch = (options: UseFetchOptions) => {
  const { 
    url, 
    method = 'GET',
  } = options

  watch(
    () => [toValue(url), toValue(method)], 
    ([newUrl, newMethod]) => {
    fetch(newUrl, { method: newMethod })
    // ...
  })
  // ...
}
```
````

---

<h1 class="title-bg">Возвращаемые значения</h1>

````md magic-move
```ts {*|11|5-8}
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return {
    count,
    increment
  }
}

const { count, increment } = useCounter()








⠀
```

```ts {*|11-13|5-8}
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return { 
    count,
    increment
  }
}

const { count: clicks, increment: incrementClicks } = useCounter()
const { count: composables, increment: incrementComposables } = useCounter()
const { count: counters, increment: incrementCounters } = useCounter()






⠀
```

```ts {*|11-13|5-8}
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return [
    count, 
    increment
  ]
}

const [clicks, incrementClicks] = useCounter()
const [composables, incrementComposables] = useCounter()
const [counters, incrementCounters] = useCounter()






⠀
```

```ts {5-8|11-13|}
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return {
    count,
    increment
  }
}

const clicks = useCounter()
const composables = useCounter()
const counters = useCounter()

console.log(clicks.count.value)
console.log(composables.increment())
console.log(counters)


⠀
```

```vue {9,10|14|15,17-18}
<script setup lang="ts">
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return { count, increment }
}

const clicks = useCounter()
const composables = useCounter()
</script>

<template>
  <button @click="clicks.increment"> ✅  
    {{ clicks.count }} ❌ 
  </button>
  <button @click="clicks.count--"> ❌
    {{ clicks.count }} ❌ 
  </button>
</template>
```

```vue {*|14-15,17-18}
<script setup lang="ts">
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return { count, increment }
}

const clicks = useCounter()
const composables = useCounter()
</script>

<template>
  <button @click="clicks.increment"> ✅
    {{ clicks.count.value }} ✅
  </button>
  <button @click="clicks.count.value--"> ✅
    {{ clicks.count.value }} ✅
  </button>
</template>
```

```vue {*|14-18|9-10|*}
<script setup lang="ts">
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return { count, increment }
}

const clicks = reactive(useCounter())
const composables = reactive(useCounter())
</script>

<template>
  <button @click="clicks.increment"> ✅
    {{ clicks.count }} ✅
  </button>
  <button @click="clicks.count--"> ✅
    {{ clicks.count }} ✅
  </button>
</template>
```
````

---
timeline:
  - point1: 'active'
    point2: 'hidden'
    point3: 'hidden'
    point4: 'hidden'
    example: 'pos-0 fx duration-500 cs-red'
  - point1: ''
    point2: 'active'
    example: 'cs-blue'
  - point2: ''
    point3: 'active'
    example: 'cs-green'
  - {}
  - {}
  - point3: ''
    point4: 'active'
    example: 'cs-purple'
---

<h1 class="text-center title-bg">Как писать композаблы:</h1>

<Points>
  <Point icon="i-lineicons-bricks" :attrs="t.point1" class="cs-red">
    Принимайте решения осознанно
  </Point>
  <Point icon="i-material-symbols-service-toolbox-outline" :attrs="t.point2" class="cs-blue">
    Используйте встроенные хелперы
  </Point>
  <Point icon="i-oui-app-saved-objects" :attrs="t.point3" class="cs-green">
    Используйте объекты как входные параметры
  </Point>
  <Point icon="i-material-symbols-data-object" :attrs="t.point4" class="cs-purple">
    Старайтесь возвращать обычные объекты
  </Point>
  <Point full :class="t.example">
    <Example>

````md magic-move {lines: false}
```ts
const [count, increment] = useCounter()
const [data, loading] = useFetch()
```
```ts
computed(() => toValue(url))
computed(() => unref(method))
const mutableUrl = toRef(urlValue)
const param = isReadonly(urlValue)
// ...
```
```ts {1|2|3}
useSmokersFetch(url, method, headers) // ❌
useHealthFetch({ url, method, headers }) // 🤔
useNiceFetch(url, { method, headers }) // ✅
// ...
```
```ts
function useFetch() {
  // ...

  return {
    data,
    isLoading,
    // ...
  }
}
```
````

</Example>
  </Point>
</Points>