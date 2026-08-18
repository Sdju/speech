---
slideClass: cs-green
topTitle: · зелёный ·
topTitleClass: mk-top-flavor
layout: center
---

<div class="mk-section-hero mk-section-hero--img markers-theme">
  <div class="mk-section-hero__logo" aria-hidden="true">
    <img src="/img/solidjs.png" alt="" class="mk-section-hero__img" />
  </div>
  <div class="mk-section-hero__content">
    <h1>Solid и «зелёный» вкус</h1>
    <p class="mk-section-hero__subtitle">Сигналы, граф зависимостей, fine-grained</p>
  </div>
</div>

---
slideClass: cs-green
topTitle: · зелёный ·
topTitleClass: mk-top-flavor
---

# Пример: профиль

```jsx {*|1-3|5|6-8|10-13|*}
const [first, setFirst] = createSignal('John')
const [last, setLast] = createSignal('Doe')
const [loggedIn, setLoggedIn] = createSignal(true)

const fullName = createMemo(() => `${first()} ${last()}`)
const label = createMemo(() =>
  loggedIn() ? `Hi, ${fullName()}` : 'Guest'
)

createEffect(() => { document.title = label() })
return (
  <h1>{label()}</h1>
)
```

---
slideClass: cs-green
topTitle: · зелёный ·
topTitleClass: mk-top-flavor
timeline:
  - title: 'Граф сигналов'
    first:
      class: 'pos-180_150 -blur-hidden'
      color: 'green'
      solid: true
    last:
      class: 'pos-380_150 -blur-hidden'
      color: 'green'
      solid: true
    loggedIn:
      class: 'pos-720_150 -blur-hidden'
      color: 'green'
      solid: true
    fullName:
      class: 'pos-280_290 -blur-hidden'
      color: 'blue'
      solid: true
    label:
      class: 'pos-500_360 -blur-hidden'
      color: 'blue'
      solid: true
    effect:
      class: 'pos-380_470 -blur-hidden'
      color: 'red'
      solid: true
    render:
      class: 'pos-640_470 -blur-hidden'
      color: 'red'
      solid: true
    textFirst: 'first'
    textLast: 'last'
    textLoggedIn: 'loggedIn'
    textFullName: 'fullName'
    textLabel: 'label'
    textEffect: '$effect'
    textRender: 'render'
    arrowFirstFull:
      coords: '180:173 237:267'
      power: 0.25
      class: 'fx duration-500 opacity-0'
    arrowLastFull:
      coords: '380:173 323:267'
      power: -0.25
      class: 'fx duration-500 opacity-0'
    arrowFullLabel:
      coords: '343:290 459:360'
      power: -0.2
      class: 'fx duration-500 opacity-0'
    arrowLoginLabel:
      coords: '720:173 542:357'
      power: 0.35
      class: 'fx duration-500 opacity-0'
    arrowLabelEffect:
      coords: '469:383 380:447'
      power: -0.2
      class: 'fx duration-500 opacity-0'
    arrowLabelRender:
      coords: '531:383 640:447'
      power: 0.2
      class: 'fx duration-500 opacity-0'
  - first:
      class: 'pos-180_150'
    last:
      class: 'pos-380_150'
    loggedIn:
      class: 'pos-720_150'
  - fullName:
      class: 'pos-280_290'
    arrowFirstFull:
      class: 'fx duration-500 animate'
    arrowLastFull:
      class: 'fx duration-500 animate'
  - label:
      class: 'pos-500_360'
    arrowFullLabel:
      class: 'fx duration-500 animate'
    arrowLoginLabel:
      class: 'fx duration-500 animate'
  - effect:
      class: 'pos-380_470'
    render:
      class: 'pos-640_470'
    arrowLabelEffect:
      class: 'fx duration-500 animate'
    arrowLabelRender:
      class: 'fx duration-500 animate'
---

<div class="text-2xl font-bold text-center $obj pos-50%_55">{{ t.title }}</div>

<div class="flex gap-6 justify-center text-sm $obj pos-50%_520 opacity-70">
  <span class="c-green">● сигнал</span>
  <span class="c-blue">● memo</span>
  <span class="c-red">● эффект</span>
</div>

<Node v-bind="t.first">{{ t.textFirst }}</Node>
<Node v-bind="t.last">{{ t.textLast }}</Node>
<Node v-bind="t.loggedIn">{{ t.textLoggedIn }}</Node>
<Node v-bind="t.fullName">{{ t.textFullName }}</Node>
<Node v-bind="t.label">{{ t.textLabel }}</Node>
<Node v-bind="t.effect">{{ t.textEffect }}</Node>
<Node v-bind="t.render">{{ t.textRender }}</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrowFirstFull" />
  <SvgArrow v-bind="t.arrowLastFull" />
  <SvgArrow v-bind="t.arrowFullLabel" />
  <SvgArrow v-bind="t.arrowLoginLabel" />
  <SvgArrow v-bind="t.arrowLabelEffect" />
  <SvgArrow v-bind="t.arrowLabelRender" />
</SvgLayer>

<!--
first + last → fullName (fan-in)
fullName + loggedIn → label (ветка)
label → $effect (title) и render (JSX)
-->

---
slideClass: cs-green
topTitle: · зелёный ·
topTitleClass: mk-top-flavor
---

# Сигналы

Реактивные примитивы — описывают **взаимоотношения** в системе

<v-click>

Автоматический трекинг зависимостей

</v-click>

---
slideClass: cs-green
topTitle: · зелёный ·
topTitleClass: mk-top-flavor
---

# Три роли в графе

<Points>
  <Point v-click class="cs-green" icon="i-material-symbols-database-rounded">
    <strong>Состояние</strong> — источник значений
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-functions-rounded">
    <strong>Вычислимое</strong> — производные от состояния
  </Point>
  <Point v-click class="cs-red" icon="i-material-symbols-bolt-rounded">
    <strong>Эффект</strong> — побочные действия и DOM
  </Point>
</Points>

---
slideClass: cs-green
topTitle: · зелёный ·
topTitleClass: mk-top-flavor
---

# PushPull у сигналов

<Points>
  <Point v-click class="cs-blue" icon="i-material-symbols-download-rounded">
    Вычислимые значения <strong>ленивые</strong> — тянут зависимости при чтении
  </Point>
  <Point v-click class="cs-red" icon="i-material-symbols-notifications-active-rounded">
    Эффекты <strong>проталкиваются</strong> в строго запланированное время
  </Point>
</Points>

---
slideClass: cs-orange
topTitle: · оранжевый ·
topTitleClass: mk-top-flavor
layout: center
---

<div class="mk-section-hero mk-section-hero--img markers-theme">
  <div class="mk-section-hero__logo" aria-hidden="true">
    <img src="/img/svelte.png" alt="" class="mk-section-hero__img" />
  </div>
  <div class="mk-section-hero__content">
    <h1>Svelte и «оранжевый» вкус</h1>
    <p class="mk-section-hero__subtitle">Компиляция вместо рантайма</p>
  </div>
</div>

---
slideClass: cs-orange
topTitle: · оранжевый ·
topTitleClass: mk-top-flavor
---

# Компилируемая реактивность

<Points>
  <Point v-click class="cs-orange" icon="i-carbon-code">
    Трекинг зависимостей на этапе компиляции
  </Point>
  <Point v-click class="cs-green" icon="i-material-symbols-memory-rounded">
    Минимальный оверхед по памяти
  </Point>
  <Point v-click class="cs-red" icon="i-material-symbols-nest-eco-leaf-rounded">
    Не очень дружит с глубокой реактивностью
  </Point>
  <Point v-click class="cs-purple" icon="i-material-symbols-account-tree-rounded">
    Плохо строит модели в рантайме
  </Point>
</Points>

---
slideClass: cs-orange
topTitle: · оранжевый ·
topTitleClass: mk-top-flavor
---

````md magic-move
```js {*|1|3|4|3-4|6-8|*}
let count = 0;

$: doubled = count * 2;
$: console.log("count:", count, "doubled:", doubled);

function inc() {
  count += 1;
}
```
```js {*|7|*}
let count = 0;

$: doubled = count * 2;
$: console.log("count:", count, "doubled:", doubled);

function inc() {
  $$invalidate(0, count += 1)
}
```
````

---
slideClass: cs-orange
topTitle: · оранжевый ·
topTitleClass: mk-top-flavor
---

# К чему пришли в Svelte5

<v-clicks>

- Смена системы реактивности на сигнальную
- Глубокая реактивность стала доступной
- Теперь реактивность больше дружит с рантаймом
- Компилируемая реактивность осталась для шаблонов

</v-clicks>
