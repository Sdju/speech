---
slideClass: cs-blue
topTitle: · синий ·
topTitleClass: mk-top-flavor
layout: center
---

<div class="mk-section-hero mk-section-hero--img markers-theme">
  <div class="mk-section-hero__logo" aria-hidden="true">
    <img src="/img/react.png" alt="" class="mk-section-hero__img" />
  </div>
  <div class="mk-section-hero__content">
    <h1>React и «синий» вкус</h1>
    <p class="mk-section-hero__subtitle">Иммутабельность, VDOM, каскадные обновления</p>
  </div>
</div>

---
slideClass: cs-blue
topTitle: · синий ·
topTitleClass: mk-top-flavor
---

# Реактивен ли React?

<h2 class="mb-3">За</h2>

<Points>
  <Point v-click class="cs-green" icon="i-material-symbols-autorenew-rounded">
    Интерфейс обновляется полу-автоматически
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-notifications-active-rounded">
    Есть механизмы уведомления об обновлении (React Context)
  </Point>
  <Point v-click class="cs-purple" icon="i-material-symbols-call-split-rounded">
    Есть однонаправленный поток данных
  </Point>
</Points>

---
slideClass: cs-blue
topTitle: · синий ·
topTitleClass: mk-top-flavor
---

# Реактивен ли React?

<h2 class="mb-3">Против</h2>

<Points>
  <Point v-click class="cs-red" icon="i-material-symbols-touch-app-rounded">
    Ручной контроль за обновлениями
  </Point>
  <Point v-click class="cs-orange" icon="i-material-symbols-block-rounded">
    Реактивность не существует за пределами React
  </Point>
  <Point v-click class="cs-pink" icon="i-material-symbols-waterfall-chart-rounded">
    Без оптимизаций — каскадные ререндеры
  </Point>
</Points>

<div class="box box--rich mt-6" v-click>React имеет реактивность UI, но не имеет реактивной системы</div>

---
slideClass: cs-blue
topTitle: · синий ·
topTitleClass: mk-top-flavor
---

# Реактивность через пересоздание

<v-clicks>

- Все бонусы от иммутабельности
- Минимальный оверхед
- Позволяет считать себя обычным <span class="c-orange">JavaScript</span>
- Вечная борьба с ререндерами
- Требуется следить за ссылочным равенством

</v-clicks>

---
slideClass: cs-blue
topTitle: · синий ·
topTitleClass: mk-top-flavor
---

# Stateless vs Stateful

<p class="text-lg opacity-80 mb-3">Вне фреймворка — только ссылки</p>

````md magic-move
```js
const state = {
  user: { id: 1, name: 'Ann' },
  ui: { open: false },
}




```

```js
// stateful — мутация
state.ui.open = true

state === prev  // true
// наблюдателям нечего сравнить



```

```js
// stateless — пересоздание
const next = {
  ...state,
  ui: { ...state.ui, open: true },
}
next !== state            // true
next.user === state.user  // true — дешёвый diff

```

```js
// React выбрал пересоздание
// → каскад по дереву вызовов






```
````

<!--
Цель: мост от «пересоздание» к каскаду — показать stateful/stateless как про ссылки, не про React/Vue
Контент:
- magic-move: объект state → мутация (===) → recreate (!== + user тот же) → punchline про каскад
Спикер:
- Stateful: та же ссылка — снаружи не видно, что поменялось
- Stateless: новая ссылка на корень, неизменённые ветки те же — React так диффит дёшево
- Цена: родитель пересоздал props → дети могут уехать каскадом
Время: ~45–60с
Статус: реализация
-->

---
slideClass: cs-blue
topTitle: · синий ·
topTitleClass: mk-top-flavor
timeline:
  - badge: '-blur-hidden'
    page: 'cs-green'
    filters: 'cs-blue'
    list: 'cs-blue'
    sidebar: 'cs-purple'
    note: 'Sidebar не читает q'
  - badge: ''
    note: 'setQ — React отдаёт новый объект'
  - page: 'cs-green animate-pulse'
    filters: 'cs-blue animate-pulse'
    list: 'cs-blue animate-pulse'
    sidebar: 'cs-red animate-pulse'
    note: 'React: мигают все — даже Sidebar'
  - page: 'cs-green'
    filters: 'cs-green animate-pulse'
    list: 'cs-green animate-pulse'
    sidebar: 'cs-purple opacity-50'
    note: 'Vue: стабильные ref — Sidebar спокоен'
  - page: 'cs-green'
    filters: 'cs-blue'
    list: 'cs-blue'
    sidebar: 'cs-purple'
    note: 'React: memo вручную · Vue: из модели'
---

# Каскадное обновление

<p class="text-sm opacity-80 mb-3 min-h-6">
  <span :class="t.badge" class="inline-block px-2 py-0.5 rounded bg-blue/30 c-blue font-mono text-xs mr-2 fx">setQ</span>
  <span>{{ t.note }}</span>
</p>

<div class="grid grid-cols-2 gap-4 w-full max-w-980px mx-auto text-left text-[0.65em] leading-snug mb-4">
  <div class="box box--rich cs-blue p-3 min-w-0">
    <div class="text-blue-300 font-semibold mb-2 flex items-center gap-2 text-sm">
      <DeviconReact class="text-xl" /> useFilters · React
    </div>

```jsx
function useFilters() {
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('asc')
  return { q, sort, setQ, setSort } // новый {}
}
```

  </div>

  <div class="box box--rich cs-green p-3 min-w-0">
    <div class="text-green-300 font-semibold mb-2 flex items-center gap-2 text-sm">
      <DeviconVuejs class="text-xl" /> useFilters · Vue
    </div>

```ts
export function useFilters() {
  const q = ref('')
  const sort = ref('asc')
  return { q, sort } // стабильные ref
}
```

  </div>
</div>

<div class="flex flex-col items-center justify-center gap-2">
  <div :class="t.page" class="box box--rich px-5 py-2 text-base font-bold fx">Page</div>
  <div class="text-xl opacity-40 leading-none">↓</div>
  <div class="flex gap-3 w-full max-w-700px justify-center text-sm">
    <div :class="t.filters" class="box box--rich px-3 py-2 font-semibold fx flex-1 text-center">Filters</div>
    <div :class="t.list" class="box box--rich px-3 py-2 font-semibold fx flex-1 text-center">HeavyList</div>
    <div :class="t.sidebar" class="box box--rich px-3 py-2 font-semibold fx flex-1 text-center">Sidebar</div>
  </div>
</div>

<!--
Цель: показать, где каскад бьёт — хук с несколькими полями + сосед без зависимости
Контент:
- сверху оба API (React новый {} vs Vue ref)
- снизу дерево Page → Filters / HeavyList / Sidebar с пульсом
Спикер:
- Sidebar не читает q, но в React без memo всё равно ререндер
- Vue: подписка на ref — Sidebar не в графе q
Время: ~60–75с
Статус: реализация
-->
