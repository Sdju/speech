---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
layout: center
---

<div class="mk-section-hero mk-section-hero--img markers-theme">
  <div class="mk-section-hero__logo" aria-hidden="true">
    <img src="/img/rxjs.png" alt="" class="mk-section-hero__img" />
  </div>
  <div class="mk-section-hero__content">
    <h1>RxJS и «красный» вкус</h1>
    <p class="mk-section-hero__subtitle">Observable, операторы, стратегии Push / Pull / PushPull</p>
  </div>
</div>

---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
timeline:
  - block1:
      class: 'pos-280_50% [--un-scale-x:0] [--un-scale-y:0] opacity-0'
      color: 'red'
      form: 'circle'
      solid: true
    block2:
      class: 'pos-50%_50% opacity-0'
      solid: true
      color: blue
    text: '1'
  - block1:
      class: 'pos-320_50%'
  - block1:
      class: 'pos-692_50%'
  - block1:
      class: 'pos-760_50% [--un-scale-x:0] [--un-scale-y:0] opacity-0'
  - block1:
      class: 'pos-280_50% [--un-scale-x:0] [--un-scale-y:0] opacity-0'
    block2:
      class: 'pos-50%_50%'
  - block1:
      class: 'pos-320_50%'
  - block1:
      class: 'pos-420_50%'
  - block1:
      class: 'pos-50%_50%  [--un-scale-x:0] [--un-scale-y:0] opacity-0'
  - block1:
      class: 'pos-540_50%'
    text: '2'
  - block1:
      class: 'pos-692_50%'
  - block1:
      class: 'pos-760_50% [--un-scale-x:0] [--un-scale-y:0] opacity-0'
---

<SvgLayer>
  <SvgArrow coords="283:50% 733:50%" :power="0.001" />
</SvgLayer>

<Node class="pos-200_50%" form="circle">Observable</Node>
<Node v-bind="t.block1">{{t.text}}</Node>
<Node v-bind="t.block2">*2</Node>
<Node class="pos-800_50%" form="circle">Observer</Node>

---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
---

<div class="mb-8 text-4xl"> <DeviconRxjs/> Rxjs </div>

<Points>
  <Point v-click class="cs-purple" icon="i-material-symbols-hearing-rounded">
    <strong>Oberserver</strong> это <strong>EventListener</strong> маминой подруги
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-stream-rounded">
    Концентрируемся асинхронном на <strong>потоке данных</strong>(<strong>Stream</strong>)
  </Point>
  <Point v-click class="cs-green" icon="i-material-symbols-bolt-rounded">
    Мы не реагируем на изменении модели, а реагируем на события
  </Point>
</Points>

---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
---

# Rxjs

```js
const numbers$ = of(1, 2, 3, 4, 5);
numbers$.pipe(
  map(x => x * 2),
  filter(x => x > 5),
)
numbers$.subscribe(x => console.log(x));
```

---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
---

# Push reactivity

<Points>
  <Point v-click class="cs-red" icon="i-noto-rightwards-pushing-hand">
    Push — значения проталкиваются
  </Point>
  <Point v-click class="cs-orange" icon="i-material-symbols-mail-rounded">
    Не важно, хочет подписчик обновляться или нет
  </Point>
  <Point v-click class="cs-purple" icon="i-material-symbols-hub-rounded">
    Если есть зависимые значения, они все будут уведомлены
  </Point>
  <Point v-click class="cs-pink" icon="i-material-symbols-warning-rounded">
    Без оптимизаций произойдет полное перевычисление
  </Point>
  <Point full class="cs-orange" v-click>
    Подобен почте, придет вне зависимости от вашего желания забирать ее
  </Point>
</Points>

---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
---

# Pull reactivity

<Points>
  <Point v-click class="cs-blue" icon="i-material-symbols-download-rounded">
    Pull — значения вытягиваются из источника
  </Point>
  <Point v-click class="cs-green" icon="i-material-symbols-shopping-bag-rounded">
    Мы сами запрашиваем данные — без запроса значение не дойдет
  </Point>
  <Point v-click class="cs-cyan" icon="i-material-symbols-refresh-rounded">
    Без оптимизаций мы опрашиваем все источники всегда
  </Point>
  <Point full class="cs-blue" v-click>
    Подобен магазину, вы сами идете и выбираете, что вам нужно
  </Point>
</Points>

---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
---

# PushPull reactivity

<Points>
  <Point v-click class="cs-purple" icon="i-material-symbols-sync-alt-rounded">
    PushPull — уведомление проталкивается, значение вытягивается
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-notifications-rounded">
    Источник уведомляет о существовании обновления
  </Point>
  <Point v-click class="cs-green" icon="i-material-symbols-download-rounded">
    Источник отдает значение только по запросу
  </Point>
  <Point v-click class="cs-orange" icon="i-material-symbols-speed-rounded">
    Наиболее оптимальная стратегия по перфомансу
  </Point>
  <Point full class="cs-purple" v-click>
    Подобен ПВЗ маркетплейса, он вас уведомит о поступлении товара, но вам нужно за ним сходить
  </Point>
</Points>
