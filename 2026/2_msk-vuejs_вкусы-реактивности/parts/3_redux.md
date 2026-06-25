---
slideClass: cs-purple
topTitle: · фиолетовый ·
topTitleClass: mk-top-flavor
layout: center
---

<div class="mk-section-hero mk-section-hero--img markers-theme">
  <div class="mk-section-hero__logo" aria-hidden="true">
    <img src="/img/redux.png" alt="" class="mk-section-hero__img" />
  </div>
  <div class="mk-section-hero__content">
    <h1>Redux и «фиолетовый» вкус</h1>
    <p class="mk-section-hero__subtitle">Single store, actions, reducers — максимум явности</p>
  </div>
</div>

---
slideClass: cs-purple
topTitle: · фиолетовый ·
topTitleClass: mk-top-flavor
timeline:
  - block1:
      class: 'pos-492_159'
      color: 'green'
      form: 'rect'
    block2:
      class: 'pos-328_274'
      color: 'blue'
      form: 'rect'
    block3:
      class: 'pos-637_274'
      color: 'red'
      form: 'rect'
    block4:
      class: 'pos-328_274 -blur-hidden'
      color: 'red'
      form: 'rect'
    title: ''
    arrow1To2:
      coords: '324:245 425:158'
      power: 0.5
      class: 'fx duration-500'
    arrow1To3:
      coords: '559:156 637:245'
      class: 'fx duration-500'
      power: 0.5
    arrow3To1:
      coords: '568:272 51%:188'
      class: 'fx duration-500'
      power: 0.5
    arrow3To2:
      coords: '568:272 427:272'
      class: 'fx duration-500'
      power: 0.05
      dashed: true
    text1: Система
    text2: Раздражитель
    text3: Реакция
    text4: ''
  - text2: Action
    arrow3To2:
      coords: '568:272 382:272'
  - text1: Store
    arrow1To2:
      coords: '324:245 440:158'
    arrow1To3:
      coords: '540:156 637:245'
  - text3: View
    arrow3To1:
      coords: '590:272 51%:188'
    arrow3To2:
      coords: '590:272 381:272'
  - text4: Reducers
    block4:
      class: 'pos-328_274'
    block2:
      class: 'pos-328_374'
    arrow3To2:
      coords: '637:302 382:374'
      class: 'fx duration-500'
      power: 0.4
    arrow3To1:
      coords: '330:345 330:301'
      power: 0.1
  - text4: 'Reducers'
    block4:
      multiple: true
  - title: 'Redux'
---

<div class="text-center text-3xl font-bold $obj pos-50%_50%">{{ t.title }}</div>

<Node v-bind="t.block1">{{ t.text1 }}</Node>
<Node v-bind="t.block2">{{ t.text2 }}</Node>
<Node v-bind="t.block3">{{ t.text3 }}</Node>
<Node v-bind="t.block4">{{ t.text4 }}</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrow1To2" />
  <SvgArrow v-bind="t.arrow1To3" />
  <SvgArrow v-bind="t.arrow3To1" />
  <SvgArrow v-bind="t.arrow3To2" />
</SvgLayer>

---
slideClass: cs-purple
topTitle: · фиолетовый ·
topTitleClass: mk-top-flavor
---

# Плюсы

<Points>
  <Point v-click class="cs-green" icon="i-material-symbols-science-rounded">
    Легко тестировать
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-psychology-rounded">
    Понятная ментальная модель
  </Point>
</Points>

---
slideClass: cs-purple
topTitle: · фиолетовый ·
topTitleClass: mk-top-flavor
---

# Минусы

<Points>
  <Point v-click class="cs-red" icon="i-material-symbols-content-copy-rounded">
    Огромное количество бойлерплейта
  </Point>
  <Point v-click class="cs-orange" icon="i-material-symbols-speed-rounded">
    Крайни низкая оптимизация
  </Point>
  <Point v-click class="cs-purple" icon="i-material-symbols-call-split-rounded">
    Сложно распиливается на отдельные части
  </Point>
</Points>
