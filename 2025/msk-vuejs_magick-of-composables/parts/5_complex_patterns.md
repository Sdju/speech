---
layout: center
---

# Продвинутое использование
## Object vs Reactive

---

````md magic-move
```ts
const user = useUserStore()
console.log(user.name)
```

```ts
const { name, age, isAdmin } = useUserStore()
console.log(name)
// ОШИБКА, данные не являются реактивными
```

```ts
const { name, age, isAdmin } = storeToRefs(useUserStore())
console.log(name.value)
```

````

---

# Reactive как результата композабла

```vue {*| 15-21|7-12}
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

# `Isomorphic Destructurable`

---

```ts {*|13,14|7-10}
// vueuse: makeDestructurable

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

---
layout: center
---

# Композаблы высшего порядка

---
timeline:
  - point1: 'outline outline-2 outline-[#CCCCCC88]'
    point2: '-blur-hidden outline-[#00000088]'
    point3: '-blur-hidden outline-[#00000088]'
    point4: '-blur-hidden outline-[#00000088]'
    example1: 'pos-0 fx duration-500'
  - point1: 'outline-[#00000088]'
    point2: 'outline outline-2 outline-[#CCCCCC88]'
  - point2: 'outline-[#00000088]'
    point3: 'outline outline-2 outline-[#CCCCCC88]'
---

<h1 class="text-center">Композаблы высшего порядка:</h1>

<div class="items-grid">
  <div class="item fx duration-400" :class="t.point1">
    <div class="item-icon">
      <MaterialSymbolsCycle/>
    </div>
    <div>
      Композабл как аргумент
    </div>
  </div>
  <div class="item fx duration-400" :class="t.point2">
    <div class="item-icon">
      <LineiconsBricks/>
    </div>
    <div>
      Возвращают новый композабл
    </div>
  </div>
  <div class="item fx duration-400" :class="t.point3">
    <div class="item-icon">
      <FlowbiteVueSolid/>
    </div>
    <div>
      `use*` => `create*`/`define*`
    </div>
  </div>
  <div class="item-example fx example row-span-4 no-bg" :class="t.example">

<div :class="t.example1">

````md magic-move {lines: false}
```ts
defineStore('user', () => { ... })
```
```ts
const userStore = defineStore('user', )
```
```ts {*|*}
defineStore()
createSharedComposable()
```
````

</div>

  </div>
</div>

---

```js
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
const onMountedSafe = createSafeComposable(onMounted)
```

---

```ts
// vee-validate
const { defineField } = useForm();
const [email, emailAttrs] = defineField('email');
```

---
layout: center
---

# Shared Composable

---

````md magic-move
```ts
const { x, y } = useMouse()
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
```
````

---
layout: default
---

# Shared Composable

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

---

```ts
const useSharedMouse = createSharedComposable(useMouse)

// ...
const { x, y } = useSharedMouse()
```

---

```ts
const useUserStore = createSharedComposable(() => {
  // ...
})

// использование
const { name, age, isAdmin } = useUserStore()
```

---

# `Shared Composable`

<v-clicks>

- Позволяет `оптимизировать доступ` к данным
- Может вести себя как `стейт менеджер`
- Очищает себя `самостоятельно` если никто не использует
- Не дружит с `SSR`
- Легко получить `циклические зависимости`
- Легко сделать `хрупкую конструкцию`

</v-clicks>

---
layout: center
---

# Порождающие `"композаблы"`

---

# Порождающие `"композаблы"`  

````md magic-move
```js
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

const customCount = useDebouncedRef(0)
```
```ts
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
````

---

# Порождающие `"композаблы"`  

<v-clicks>

- Не совсем композаблы
- Выручают в ситуациях, когда обычных примитивов недостаточно

</v-clicks>