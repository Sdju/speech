---
layout: center
topTitle: Что такое композабл?
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%] w-max
---

---
shading: true
timeline:
  - optionsAPI: ' fx text-left'
    compositionAPI: 'fx text-left -popup-hidden'
  - {}
  - optionsAPI: 'fx text-left'
    compositionAPI: 'fx text-left'
---

<h1 class="text-center $obj pos-509_60">Как было раньше?</h1>

<div class="grid grid-cols-2 gap-4 mt-15">

<div :class="t.optionsAPI">
<h2 class="mb-4 text-center block w-full">Options API</h2>

```js  {*|2,5,9,15|*}
export default {
  data() {
    return { lupa: 0, pupa: 0 }
  },
  computed: {
    salaryLupa() { ... },
    salaryPupa() { ... },
  },
  methods: {
    giveSalary() {
      this.lupa += this.salaryPupa
      this.pupa += this.salaryLupa
    }
  },
  mounted() {
    this.giveSalary()
  }
}
```

</div>

<div :class="t.compositionAPI">
<h2 class="mb-4 text-center block w-full">Composition API</h2>

```js
const lupa = ref(0)
const pupa = ref(0)
const salaryLupa = computed( ... )
const salaryPupa = computed( ... )

function giveSalary() {
  lupa.value += salaryPupa.value
  pupa.value += salaryLupa.value
}

onMounted(() => {
  giveSalary()
})
```

</div>
</div>


---
layout: default
---

# От миксинов к композаблам

````md magic-move
```js {*|2,5,9,15|*}
export default {
  data() {
    return { lupa: 0, pupa: 0 }
  },
  computed: {
    salaryLupa() { ... },
    salaryPupa() { ... },
  },
  methods: {
    giveSalary() {
      this.lupa += this.salaryPupa
      this.pupa += this.salaryLupa
    }
  },
  mounted() {
    this.giveSalary()
  }
}





⠀
```

```js {*|2,5,9,15|20-24}
export const accountingMixin = {
  data() {
    return { lupa: 0, pupa: 0 }
  },
  computed: {
    salaryLupa() { ... },
    salaryPupa() { ... },
  },
  methods: {
    giveSalary() {
      this.lupa += this.salaryPupa
      this.pupa += this.salaryLupa
    }
  },
  mounted() {
    this.giveSalary()
  }
}

export default {
  name: 'HornsAndHooves',
  mixins: [accountingMixin],
  // ...
}
```

```js {*|1,20|3,6,9-10,14}
export const employeeMixin = (name) => {
  data() {
    return { [name]: 0 }
  },
  computed: {
    [`salary${name}`]() { ... },
  },
  methods: {
    [`giveSalary${name}`]() {
      this[name] += this[`salary${name}`]
    }
  },
  mounted() {
    this[`giveSalary${name}`]()
  }
}

export default {
  name: 'HornsAndHooves',
  mixins: [employeeMixin('lupa'), employeeMixin('pupa')],
  // ...
}

⠀
```

```js {*|1-8|10-12}
export const useEmployee = () => {
  const employee = ref(0)
  const salary = computed(() => { /* ... */ })
  onMounted(() => {
    giveSalary()
  }
  return { employee, salary }
}

// HornsAndHooves
const lupa = useEmployee()
const pupa = useEmployee()











⠀
```
````

---
layout: default
---

# Что такое композабл?

> `Композабл` - это `Vue-паттерн` для инкапсуляции и гибкого переиспользования логики, в виде `функции` оперирующей `реактивными данными`.

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
  - point3: ''
    point4: 'active'
    example: 'cs-purple'
---

<h1 class="text-center">Композабл:</h1>

<Points>
  <Point icon="i-lineicons-bricks" :attrs="t.point1" class="cs-red">
    Функция, для инкапсуляции и переиспользования логики
  </Point>
  <Point icon="i-lineicons-bricks" :attrs="t.point2" class="cs-blue">
    Использует <strong>Composition API</strong>
  </Point>
  <Point icon="i-lineicons-bricks" :attrs="t.point3" class="cs-green">
    Следует соглашению именования <strong>use*</strong>
  </Point>
  <Point icon="i-lineicons-bricks" :attrs="t.point4" class="cs-purple">
    Работает с <strong>реактивными данными</strong> или хуками
  </Point>
  <Point full :class="t.example">
    <Example>

````md magic-move {lines: false}
```ts
function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}
```
```ts
function useCounter() {}
function useI18n() {}
function useFetch() {}
```
```ts
const [
  advanced, 
  setAdvanced
] = useLearnComposable({
  basics: 'learn'
})
setAdvanced(true)
```
```ts
function useHello() {
  onMounted(() => {
    alert('Hello Vue!')
  })
  onUnmounted(() => {
    alert('Goodbye Vue!')
  })
}
```
````

</Example>
</Point>
</Points>

---
layout: default
---

# Что НЕ является композаблом?

````md magic-move
```ts
// ❌ Обычная утилита
export function formatDate(date) {
  return new Date(date).toLocaleDateString()
}
```
```ts
// ❌ Обычная утилита
export function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

// ❌ Тоже утилита, хоть и с реактивными данными
export function getValue(value: Ref<number>) {
  return value.value
}
```
````

---

<img src="../img/duck.png" class="$obj pos-center" />

---
shading: true
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
  - point3: ''
    point4: 'active'
    example: 'cs-purple'
---

<Points>
  <Point icon="i-material-symbols-cycle" :attrs="t.point1" class="cs-red">
    Следует соглашению именования <strong>use*</strong>
  </Point>
  <Point icon="i-mingcute-baby-fill" :attrs="t.point2" class="cs-blue">
    Расширяет возможности компонента/композабла
  </Point>
  <Point icon="i-ri-graduation-cap-fill" :attrs="t.point3" class="cs-green">
    Следует правилам использования композаблов
  </Point>
  <Point icon="i-game-icons-trophy-cup" :attrs="t.point4" class="cs-purple">
    Это и есть композабл
  </Point>
  <Point full :class="t.example">
    <Example>

````md magic-move {lines: false}
```ts
export function useCurrencyFormat() {
}
⠀
```
```ts
export function useCurrencyFormat() {
  const f = new Intl.NumberFormat(/**/)

  const format = (value) => {
    return f.format(value);
  };

  return {
    format,
  };
}
```
```ts
const [
  advanced, 
  setAdvanced
] = useLearnComposable({
  basics: 'learn'
})
setAdvanced(true)
```
```ts
const { 
  advanced
} = useLearnComposable({
  basics: 'learn'
})
advanced.value = true
⠀
```
````

</Example>
</Point>
</Points>