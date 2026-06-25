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

# Каскадное обновление

<p class="text-lg opacity-80 mb-4">Stateless vs Stateful</p>

<div class="grid grid-cols-2 gap-5 w-full max-w-980px mx-auto text-left text-[0.72em] leading-snug">
  <div class="box box--rich cs-blue p-4 min-w-0">
    <div class="text-blue-300 font-semibold mb-2 flex items-center gap-2">
      <DeviconReact class="text-xl" /> React · хук
    </div>

```jsx
function useSearch() {
  const [query, setQuery] = useState('')
  return { query, setQuery }
}
```

  </div>

  <div class="box box--rich cs-green p-4 min-w-0">
    <div class="text-green-300 font-semibold mb-2 flex items-center gap-2">
      <DeviconVuejs class="text-xl" /> Vue · composable
    </div>

```ts
export function useSearch() {
  const query = ref('')
  return { query }
}
```

  </div>
</div>
