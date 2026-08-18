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
  <Point v-click class="cs-purple" icon="i-material-symbols-hearing-rounded"><strong>Oberserver</strong> это <strong>EventListener</strong> маминой подруги</Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-stream-rounded">Концентрируемся асинхронном на <strong>потоке данных</strong>(<strong>Stream</strong>)</Point>
  <Point v-click class="cs-green" icon="i-material-symbols-bolt-rounded">Мы не реагируем на изменении модели, а реагируем на события</Point>
</Points>

---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
---

# Rxjs

```js {*|1|2-5|6|*}
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
timeline:
  - point1: active
    point2: hidden
    point3: hidden
    point4: hidden
    point5: hidden
    example: cs-red
    app:
      class: 'pos-684_248'
      color: 'red'
      solid: true
    parent:
      class: 'pos-620_332 opacity-25'
      color: 'red'
    sibling:
      class: 'pos-749_332 opacity-25'
      color: 'red'
    child1:
      class: 'pos-570_412 opacity-25'
      color: 'red'
    child2:
      class: 'pos-670_412 opacity-25'
      color: 'red'
    arrowAppParent:
      coords: '684:271 620:309'
      power: 0.001
      class: 'fx duration-500 opacity-0'
    arrowAppSibling:
      coords: '684:271 749:309'
      power: 0.001
      class: 'fx duration-500 opacity-0'
    arrowParentChild1:
      coords: '620:355 570:389'
      power: 0.001
      class: 'fx duration-500 opacity-0'
    arrowParentChild2:
      coords: '620:355 670:389'
      power: 0.001
      class: 'fx duration-500 opacity-0'
  - parent:
      class: 'pos-620_332'
    sibling:
      class: 'pos-749_332'
    arrowAppParent:
      class: 'fx duration-500 animate'
    arrowAppSibling:
      class: 'fx duration-500 animate'
  - child1:
      class: 'pos-570_412'
    child2:
      class: 'pos-670_412'
    arrowParentChild1:
      class: 'fx duration-500 animate'
    arrowParentChild2:
      class: 'fx duration-500 animate'
  - point1: ''
    point2: active
    example: cs-orange
    sibling:
      class: 'pos-749_332 outline outline-2 outline-dashed outline-white/50'
  - point2: ''
    point3: active
    example: cs-purple
    sibling:
      class: 'pos-749_332'
  - point3: ''
    point4: active
    example: cs-pink
  - point4: ''
    point5: active
    example: cs-orange
---

# Push reactivity

<Points>
  <Point :attrs="t.point1" class="cs-red" icon="i-noto-rightwards-pushing-hand">Push — значения проталкиваются</Point>
  <Point :attrs="t.point2" class="cs-orange" icon="i-material-symbols-mail-rounded">Не важно, хочет подписчик обновляться или нет</Point>
  <Point :attrs="t.point3" class="cs-purple" icon="i-material-symbols-hub-rounded">Если есть зависимые значения, они все будут уведомлены</Point>
  <Point :attrs="t.point4" class="cs-pink" icon="i-material-symbols-warning-rounded">Без оптимизаций произойдет полное перевычисление</Point>
  <Point :attrs="t.point5" class="cs-orange" icon="i-material-symbols-mail-rounded">Подобен почте, придет вне зависимости от вашего желания забирать ее</Point>
  <Point full :class="t.example"></Point>
</Points>

<Node v-bind="t.app">App</Node>
<Node v-bind="t.parent">Parent</Node>
<Node v-bind="t.sibling">Sibling</Node>
<Node v-bind="t.child1">Child</Node>
<Node v-bind="t.child2">Child</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrowAppParent" />
  <SvgArrow v-bind="t.arrowAppSibling" />
  <SvgArrow v-bind="t.arrowParentChild1" />
  <SvgArrow v-bind="t.arrowParentChild2" />
</SvgLayer>

---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
timeline:
  - point1: active
    point2: hidden
    point3: hidden
    point4: hidden
    point5: hidden
    example: cs-blue
    client:
      class: 'pos-684_246'
      color: 'blue'
      solid: true
    server:
      class: 'pos-684_320 opacity-25'
      color: 'blue'
    database:
      class: 'pos-684_394 opacity-25'
      color: 'blue'
    arrowClientServer:
      coords: '684:269 684:297'
      power: 0.001
      class: 'fx duration-500 opacity-0'
    arrowServerDb:
      coords: '684:343 684:371'
      power: 0.001
      class: 'fx duration-500 opacity-0'
  - server:
      class: 'pos-684_320'
    arrowClientServer:
      class: 'fx duration-500 animate'
  - database:
      class: 'pos-684_394'
    arrowServerDb:
      class: 'fx duration-500 animate'
  - point1: ''
    point2: active
    example: cs-green
    client:
      class: 'pos-684_246 opacity-40 outline outline-2 outline-dashed outline-white/50'
    server:
      class: 'pos-684_320 opacity-40'
    database:
      class: 'pos-684_394 outline outline-2 outline-white/50'
  - point2: ''
    point3: active
    example: cs-purple
    client:
      class: 'pos-684_246'
      solid: true
    server:
      class: 'pos-684_320'
    database:
      class: 'pos-684_394'
  - point3: ''
    point4: active
    example: cs-cyan
  - point4: ''
    point5: active
    example: cs-blue
---

# Pull reactivity

<Points>
  <Point :attrs="t.point1" class="cs-blue" icon="i-material-symbols-download-rounded">Pull — значения вытягиваются из источника</Point>
  <Point :attrs="t.point2" class="cs-green" icon="i-material-symbols-shopping-bag-rounded">Мы сами запрашиваем данные — без запроса значение не дойдет</Point>
  <Point :attrs="t.point3" class="cs-purple" icon="i-material-symbols-hub-rounded">Зависимые значения пересчитываются только при чтении</Point>
  <Point :attrs="t.point4" class="cs-cyan" icon="i-material-symbols-refresh-rounded">Без оптимизаций мы опрашиваем все источники всегда</Point>
  <Point :attrs="t.point5" class="cs-blue" icon="i-material-symbols-storefront-rounded">Подобен магазину, вы сами идете и выбираете, что вам нужно</Point>
  <Point full :class="t.example"></Point>
</Points>

<Node v-bind="t.client">Client</Node>
<Node v-bind="t.server">Server</Node>
<Node v-bind="t.database">Database</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrowClientServer" />
  <SvgArrow v-bind="t.arrowServerDb" />
</SvgLayer>

---
slideClass: cs-red
topTitle: · красный ·
topTitleClass: mk-top-flavor
timeline:
  - point1: active
    point2: hidden
    point3: hidden
    point4: hidden
    point5: hidden
    example: cs-purple
    client:
      class: 'pos-580_320'
      color: 'blue'
      solid: true
    server:
      class: 'pos-790_320 opacity-25'
      color: 'red'
      solid: true
    arrowNotify:
      coords: '741:304 626:304'
      power: 0.001
      class: 'fx duration-500 opacity-0'
    arrowPull:
      coords: '626:336 741:336'
      power: 0.001
      class: 'fx duration-500 opacity-0'
  - server:
      class: 'pos-790_320'
      solid: true
  - arrowNotify:
      class: 'fx duration-500 animate'
  - arrowPull:
      class: 'fx duration-500 animate'
  - point1: ''
    point2: active
    example: cs-blue
  - point2: ''
    point3: active
    example: cs-green
  - point3: ''
    point4: active
    example: cs-orange
  - point4: ''
    point5: active
    example: cs-purple
---

# PushPull reactivity

<Points>
  <Point :attrs="t.point1" class="cs-purple" icon="i-material-symbols-sync-alt-rounded">PushPull — уведомление проталкивается, значение вытягивается</Point>
  <Point :attrs="t.point2" class="cs-blue" icon="i-material-symbols-notifications-rounded">Источник уведомляет о существовании обновления</Point>
  <Point :attrs="t.point3" class="cs-green" icon="i-material-symbols-download-rounded">Источник отдает значение только по запросу</Point>
  <Point :attrs="t.point4" class="cs-orange" icon="i-material-symbols-speed-rounded">Часто меньше лишней работы, чем у чистого Push или Pull</Point>
  <Point :attrs="t.point5" class="cs-purple" icon="i-material-symbols-package-2-rounded">Подобен ПВЗ маркетплейса, он вас уведомит о поступлении товара, но вам нужно за ним сходить</Point>
  <Point full :class="t.example"></Point>
</Points>

<Node v-bind="t.client">Client</Node>
<Node v-bind="t.server">Server</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrowNotify" />
  <SvgArrow v-bind="t.arrowPull" />
</SvgLayer>
