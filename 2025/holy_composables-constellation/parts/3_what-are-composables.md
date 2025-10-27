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
  - point1: 'outline outline-2 outline-[#CCCCCC88]'
    point2: '-blur-hidden outline-[#00000088]'
    point3: '-blur-hidden outline-[#00000088]'
    point4: '-blur-hidden outline-[#00000088]'
    example: 'pos-0 fx duration-500'
  - point1: 'outline-[#00000088]'
    point2: 'outline outline-2 outline-[#CCCCCC88]'
  - point2: 'outline-[#00000088]'
    point3: 'outline outline-2 outline-[#CCCCCC88]'
  - point3: 'outline-[#00000088]'
    point4: 'outline outline-2 outline-[#CCCCCC88]'
---

<h1 class="text-center">Композабл:</h1>

<div class="items-grid">
  <div class="item fx duration-400" :class="t.point1">
    <div class="item-icon">
      <MaterialSymbolsCycle/>
    </div>
    <div>
      Функция, для инкапсуляции и переиспользования логики
    </div>
  </div>
  <div class="item fx duration-400" :class="t.point2">
    <div class="item-icon">
      <LineiconsBricks/>
    </div>
    <div>
      Использует <strong>Composition API</strong>
    </div>
  </div>
    <div class="item fx duration-400" :class="t.point3">
    <div class="item-icon">
      <MingcuteAsteriskFill/>
    </div>
    <div>
      Следует соглашению именования <strong>use*</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.point4">
    <div class="item-icon">
      <FlowbiteVueSolid/>
    </div>
    <div>
      Работает с <strong>реактивными данными</strong> или хуками
    </div>
  </div>
  <div class="item-example fx example row-span-4 no-bg" :class="t.example">

<div :class="t.example">

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

</div>

  </div>
</div>

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
    example: 'pos-0 fx duration-500'
  - point1: ''
    point2: 'active'
  - point2: ''
    point3: 'active'
  - point3: ''
    point4: 'active'
---

<Points>
  <Point icon="i-material-symbols-cycle" :attrs="t.point1" class="cs-red">
    Следует соглашению именования <strong>use*</strong>
  </Point>
  <Point icon="i-mingcute-baby-fill" :attrs="t.point2">
    Расширяет возможности компонента/композабла
  </Point>
  <Point icon="i-ri-graduation-cap-fill" :attrs="t.point3">
    Следует правилам использования композаблов
  </Point>
  <Point icon="i-game-icons-trophy-cup" :attrs="t.point4">
    Это и есть композабл
  </Point>
  <Point full :attrs="t.example">
    <Example>

````md magic-move {lines: false}
```ts
export function useCurrencyFormatter() {
}
⠀
```
```ts
export function useCurrencyFormatter() {
  const f = new Intl.NumberFormat(
    'en-US', 
    {
      style: 'currency',
      currency: 'USD',
    }
  )

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