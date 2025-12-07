---
timeline:
  - block2: -blur-hidden fx
    block3: -blur-hidden fx
    block4: -blur-hidden fx
  - block2: fx
  - block3: fx
  - block4: fx
---

<div class="text-center mb-8 text-2xl font-bold">Формат анализа каждого подхода</div>

<div class="grid grid-cols-2 grid-rows-2 gap-4">
  <div class="text-2xl font-bold border text-center p-4 bg-green/30 border-green rounded-md">🎯 Контекст</div>
  <div :class="t.block2" class="text-2xl font-bold border text-center p-4 bg-blue/30 border-blue rounded-md">📖 Теория</div>
  <div :class="t.block3" class="text-2xl font-bold border text-center p-4 bg-red/30 border-red rounded-md">💻 Практика</div>
  <div :class="t.block4" class="text-2xl font-bold border text-center p-4 bg-purple/30 border-purple rounded-md">⚖️ Оценка</div>
</div>

---
timeline:
  - block1:
      class: 'pos-484_274'
      color: 'green'
      form: 'rect'
    block2:
      class: 'pos-482_274 -blur-hidden'
      color: 'blue'
      form: 'rect'
    block3:
      class: '-blur-hidden'
      color: 'red'
      form: 'rect'
    arrow1To2:
      coords: '51%:245 51%:188'
      class: 'fx duration-500 opacity-0'
      power: 0.1
    arrow1To3:
      coords: '569:156 637:245'
      class: 'fx duration-500 opacity-0'
      power: 0.5
    arrow3To1:
      coords: '568:272 51%:188'
      class: 'fx duration-500 opacity-0'
      power: 0.5
    arrow3To2:
      coords: '568:272 427:272'
      class: 'fx duration-500 opacity-0'
      power: 0.05
      dashed: true
  - block1:
      class: 'pos-492_159'
    block2:
      class: 'pos-482_274'
    arrow1To2:
      class: 'fx duration-500 animate'
  - block2:
      class: 'pos-328_274'
    block3:
      class: 'pos-637_274'
    arrow1To2:
      coords: '324:245 425:158'
      power: 0.5
    arrow1To3:
      class: 'fx duration-500 animate'
  - arrow3To1:
      class: 'fx duration-500 animate'
  - arrow3To2:
      class: 'fx duration-500 animate'
---

<Node v-bind="t.block1">Система</Node>
<Node v-bind="t.block2">Раздражитель</Node>
<Node v-bind="t.block3">Реакция</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrow1To2" />
  <SvgArrow v-bind="t.arrow1To3" />
  <SvgArrow v-bind="t.arrow3To1" />
  <SvgArrow v-bind="t.arrow3To2" />
</SvgLayer>

---

Just a text of post processing