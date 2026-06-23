---
slideClass: cs-purple
topTitle: · острый ·
topTitleClass: mk-top-flavor
---

<div class="grid grid-cols-12 grid-rows-[110px_1fr_1fr_70px] gap-4">
  <div class="col-span-3 row-span-1 box box--rich cs-blue flex-center">
    <div class="text-center">
      <div class="text-lg text-blue-400/70 text-xl">2015</div>
      <div class="text-sm text-blue-200 font-medium text-lg">Dan Abramov</div>
    </div>
  </div>
  <div class="col-span-9 row-span-1 box box--rich cs-purple flex items-center gap-3 p-4">
    <div class="text-[60px] text-purple-300"><DeviconRedux/></div>
    <div>
      <h2 class="text-3xl font-bold text-purple-300">Redux</h2>
      <p class="text-purple-400/80 text-sm">Предсказуемый State Container</p>
    </div>
  </div>
  <div class="col-span-6 row-span-2 box box--rich cs-indigo">
    <h4 class="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
      <span class="text-xl">⚙️</span>
      Три принципа Redux
    </h4>
    <div class="space-y-4">
      <div class="flex items-center gap-4 box box--rich cs-orange">
        <span class="text-xl"><TwemojiCrown/></span>
        <div>
          <div class="text-orange-200">Single Source of Truth</div>
          <div class="text-white text-sm">Все состояние в одном store</div>
        </div>
      </div>
      <div class="flex items-center gap-4 box box--rich cs-green">
        <span class="text-xl">🔒</span>
        <div>
          <div class="text-green-200">State is Read-only</div>
          <div class="text-white text-sm">Изменения только через actions</div>
        </div>
      </div>
      <div class="flex items-center gap-4 box box--rich cs-blue">
        <span class="text-xl">💧</span>
        <div>
          <div class="text-purple-200">Pure Functions</div>
          <div class="text-white text-sm">Reducers без побочных эффектов</div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-orange flex-center">
    <div class="text-center">
      <div class="text-2xl mb-1">📋</div>
      <div class="text-sm text-orange-200">Actions</div>
      <div class="text-xs text-orange-400/70">Описания изменений</div>
    </div>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-cyan flex-center">
    <div class="text-center">
      <div class="text-2xl mb-1">🔄</div>
      <div class="text-sm text-cyan-200">Reducers</div>
      <div class="text-xs text-cyan-400/70">Чистые функции</div>
    </div>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-blue flex-center">
    <div class="text-center">
      <div class="text-3xl mb-1">🏪</div>
      <div class="text-sm text-blue-200">Single Store</div>
      <div class="text-xs text-blue-400/70">Единое состояние</div>
    </div>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-green flex-center">
    <div class="text-center">
      <div class="text-2xl mb-1"><LogosFlux/></div>
      <div class="text-sm text-green-200">Flux</div>
      <div class="text-xs text-white">Однонаправленный поток данных</div>
    </div>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-slate">
    <div class="flex justify-around items-center h-full">
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">🕰️</div>
        <div class="text-xs text-white">Time Travel Debugging</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">🔍</div>
        <div class="text-xs text-white">Предсказуемость</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">🧪</div>
        <div class="text-xs text-white">Легкое тестирование</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">🔧</div>
        <div class="text-xs text-white">DevTools</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">🌐</div>
        <div class="text-xs text-white">Ecosystem</div>
      </div>
    </div>
  </div>
</div>

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
  - block1:
      multiple: true
  - text4: Dispatcher
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
  - title: 'Flux'
  - block1:
      multiple: false
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

# Плюсы

<Points>
  <Point v-click class="cs-green" icon="i-material-symbols-science-rounded">
    Легко тестировать
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-psychology-rounded">
    Понятная ментальная модель
  </Point>
  <Point full class="cs-grey" />
</Points>

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
  <Point full class="cs-grey" />
</Points>

---

<div class="grid grid-cols-12 grid-rows-[200px_1fr_80px] gap-4">
  <div class="col-span-7 row-span-1 box box--rich cs-purple flex items-center gap-6 p-6">
    <div class="text-[120px] text-purple-300"><DeviconRxjs/></div>
    <div>
      <h2 class="text-5xl font-bold text-purple-300 mb-2">RxJS</h2>
      <p class="text-purple-400/80 text-xl">Reactive Extensions для JavaScript</p>
    </div>
  </div>
  <div class="col-span-2 row-span-1 box box--rich cs-orange flex-center">
    <span class="text-orange-200">2012</span>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-orange flex-center">
    <span class="text-orange-200">Microsoft</span>
    <span class="text-orange-400/70 text-sm">Erik Meijer</span>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-cyan flex-center">
    <div class="text-center">
      <div class="text-3xl mb-2">🌊</div>
      <div class="text-sm font-medium text-cyan-200">Streams</div>
      <div class="text-xs text-cyan-400/70">Контроллируемый поток исполнения</div>
    </div>
  </div>
  <div class="col-span-2 row-span-1 box box--rich cs-green flex-center">
    <div class="text-center">
      <div class="text-2xl mb-1"><NotoRightwardsPushingHand/></div>
      <div class="text-xs text-green-200">Push реактивность</div>
    </div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-blue">
    <h4 class="text-sm font-semibold text-blue-300 mb-2">🎯 Основные концепции</h4>
    <div class="grid grid-cols-2 gap-1 text-xs">
      <div class="p-1 box cs-blue text-center">Observable</div>
      <div class="p-1 box cs-green text-center">Observer</div>
      <div class="p-1 box cs-purple text-center">Subscription</div>
      <div class="p-1 box cs-orange text-center">Subject</div>
    </div>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-orange flex-center">
    <span class="text-orange-200 text-sm">Изначально</span>
    <span class="text-orange-400/70 text-3xl">из C#</span>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-pink">
    <div class="flex justify-around items-center h-full">
      <div class="text-center">
        <div class="text-xl font-bold text-pink-300">🎪</div>
        <div class="text-xs text-pink-400/70">Функциональная реактивность</div>
      </div>
      <div class="text-center">
        <div class="text-xl font-bold text-pink-300">⏰</div>
        <div class="text-xs text-pink-400/70">Асинхронность из коробки</div>
      </div>
      <div class="text-center">
        <div class="text-xl font-bold text-pink-300">🔧</div>
        <div class="text-xs text-pink-400/70">Богатый набор операторов</div>
      </div>
      <div class="text-center">
        <div class="text-xl font-bold text-pink-300">🧩</div>
        <div class="text-xs text-pink-400/70">Композируемость</div>
      </div>
    </div>
  </div>
</div>

---
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
  <Point full class="cs-grey" />
</Points>

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

---

````md magic-move
```js
const numbers$ = of(1, 2, 3, 4, 5);
numbers$.pipe(
  map(x => x * 2),
  filter(x => x > 5),
)
numbers$.subscribe(x => console.log(x));
```
```js
const numbers = [1, 2, 3, 4, 5];
numbers.values()
  .map(x => x * 2)
  .filter(x => x > 5)
[...numbers].forEach(x => console.log(x));
```
````
