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
  <Point full class="cs-grey" />
</Points>

<h2 class="mb-3 mt-6">Против</h2>

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
  <Point full class="cs-grey" />
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

<div class="box box--rich">
  Обоюдоострый меч для <span class="text-blue">React</span>

  <div class="c-white"> Реактивность в моменте </div>

```jsx
function Hello(name) {
  const greetings = `Hello ${name}!`
  return <Box>{greetings}</Box>
}
```

</div>
