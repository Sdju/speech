---
layout: center
topTitle: Что такое композабл?
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%] w-max
---

---
topTitle: Что такое композабл?
topTitleClass: top-[30px] left-[50%] translate-x-[-50%]
timeline:
  - optionsAPI: ' fx text-left'
    compositionAPI: 'fx text-left -popup-hidden'
  - optionsAPI: 'fx text-left'
    compositionAPI: 'fx text-left'
---

<div class="grid grid-cols-2 gap-4 mt-15">

<div :class="t.optionsAPI">
<h2 class="mb-4 text-center block w-full">Options API</h2>

```js
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
topTitle: Что такое композабл?
---

````md magic-move
```js
export default {
  mixins: [i18nMixin],

  computed: {
    title() {
      return this.$i18n.$t('title')
    }
  }
}
```

```js
const { t } = useI18n()

const title = computed(() => t('title'))
```
````

---
topTitle: Что такое композабл?
---

````md magic-move
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

```js
const lupa = useEmployee( ... )
const pupa = useEmployee( ... )

onMounted(() => {
  lupa.giveSalary()
  pupa.giveSalary()
})
```
````

---
topTitle: Что такое композабл?
---

> Композабл - это паттерн!

- Функция
- Используется для переиспользования и инкапсуляции реактивных состояний в компонентах
- Начинается с `use`
- Обычно синхронная
- Обычно возвращает нереактивный объект с реактивными свойствами

---
topTitle: Что не является композаблом?
---

- Функция не использует никакие реактивные свойства
- Функция не предназначенная для использования в `setup`

---
topTitle: Что не является композаблом?
---

