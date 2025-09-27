---
timeline:

---

# До реактивная эпоха
<h2 class="text-xl opacity-80">2000-2010: Статичная или событийная модель</h2>

---
layout: center
---

<div class="text-center text-3xl font-bold">Почему событийная модель не является реактивной?</div>

---
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
  - text1: Рука
    arrow1To2:
      coords: '324:245 442:158'
    arrow1To3:
      coords: '539:156 637:245'
  - text2: Горячая поверхность
    arrow3To2:
      coords: '568:272 464:272'
  - text3: Отдернуть руку
    arrow3To1:
      coords: '530:272 51%:188'
      power: 0.4
    arrow3To2:
      coords: '530:272 464:272'
      class: 'fx duration-500 opacity-0'
      power: 0.01
  - text2: Милый котенок
  - text3: Погладить котенка
    arrow3To1:
      coords: '513:272 51%:188'
      power: 0.3
  - title: 'Сознательная реакция'
  - title: ''
    text2: Горячая поверхность
    text3: Отдернуть руку
    arrow3To1:
      coords: '530:272 51%:188'
      power: 0.4
  - title: Рефлекс

---

<div class="text-center text-3xl font-bold $obj pos-50%_400">{{ t.title }}</div>

<Node v-bind="t.block1">{{ t.text1 }}</Node>
<Node v-bind="t.block2">{{ t.text2 }}</Node>
<Node v-bind="t.block3">{{ t.text3 }}</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrow1To2" />
  <SvgArrow v-bind="t.arrow1To3" />
  <SvgArrow v-bind="t.arrow3To1" />
  <SvgArrow v-bind="t.arrow3To2" />
</SvgLayer>

---

# Рефлексы подобны реактивности

<v-clicks>

- Действия происходят автоматически
- Важнее связи чем сами реакции

</v-clicks>

---

# Событийная модель

<v-clicks>

- Связи между сущностями нужно задавать вручную
- Все действия должны быть заданы вручную
- Нет автоматического обновления, зависимостей между сущностями

</v-clicks>

---
layout: center
---

<div class="text-center text-3xl w-800px"><strong>Событийная модель</strong> часто является базой вокруг которой строится <strong>реактивность</strong></div>
