---
slideClass: cs-green
layout: center
---

<div class="mk-panel markers-theme mk-panel--speaker max-w-980px w-full mx-auto">
  <div class="mk-panel__header">
    <div class="mk-panel__header-dots">
      <span style="--mk-color: #2ecc71"></span>
      <span style="--mk-color: #3498db"></span>
      <span style="--mk-color: #9b59b6"></span>
      <span style="--mk-color: #f39c12"></span>
    </div>
    набор фломастеров · speaker
  </div>
  <div class="mk-panel__body mk-panel__body--speaker">
    <div class="mk-panel__photo">
      <img src="/img/photo.png" alt="" />
    </div>
    <div class="mk-panel__main">
      <div class="mk-panel__name">Денис Чернов</div>
      <div class="mk-panel__links">
        <FileIconsTelegram /> @zede_code
        <FileIconsTelegram /> @vueist
        <IonLogoTwitch /> @izede
        <IonLogoGithub /> @Sdju
      </div>
    </div>
    <div class="mk-panel__qr-wrap">
      <QrCodeIntro class="mk-panel__qr" />
    </div>
  </div>
</div>

---

# О чем пойдет речь?

<Points>
  <Point v-click class="cs-green" icon="i-noto-crayon">
    Обсудим вкусы реактивности
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-menu-book-rounded">
    Где они используются
  </Point>
  <Point v-click class="cs-purple" icon="i-material-symbols-balance-rounded">
    Разберем некоторые термины
  </Point>
  <Point v-click class="cs-orange" icon="i-material-symbols-target-rounded">
    Что и как выбрать
  </Point>
  <Point full class="cs-grey" />
</Points>

---
layout: center
---

![/img/artem.png](/img/artem.png)

---
layout: center
---

# Что такое реактивность?

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
    title: ''
    text1: 'Система'
    text2: ''
    text3: ''
  - block1:
      class: 'pos-492_159'
    block2:
      class: 'pos-482_274'
    text2: 'Раздражитель'
    arrow1To2:
      class: 'fx duration-500 animate'
  - block2:
      class: 'pos-328_274'
    block3:
      class: 'pos-637_274'
    text3: 'Реакция'
    arrow1To2:
      coords: '324:245 425:158'
      power: 0.5
    arrow1To3:
      class: 'fx duration-500 animate'
  - arrow3To1:
      class: 'fx duration-500 animate'
  - arrow3To2:
      class: 'fx duration-500 animate'
  - text1: 'Рука'
    arrow1To2:
      coords: '324:245 442:158'
    arrow1To3:
      coords: '539:156 637:245'
  - text2: 'Горячая поверхность'
    arrow3To2:
      coords: '568:272 464:272'
  - text3: 'Отдернуть руку'
    arrow3To1:
      coords: '530:272 51%:188'
      power: 0.4
    arrow3To2:
      coords: '530:272 464:272'
      class: 'fx duration-500 opacity-0'
      power: 0.01
  - text2: 'Милый котенок'
  - text3: 'Погладить котенка'
    arrow3To1:
      coords: '513:272 51%:188'
      power: 0.3
  - title: 'Сознательная реакция'
  - title: ''
    text2: 'Горячая поверхность'
    text3: 'Отдернуть руку'
    arrow3To1:
      coords: '530:272 51%:188'
      power: 0.4
  - title: 'Рефлекс'
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

# Реактивность

<span v-click>

**Реактивность** — способность системы автоматически поддерживать свой инвариант

</span>
<span v-click>

**Инвариант** — нерушимое правило в системе

</span>

---
layout: center
timeline:
  - intro: -blur-hidden fx
    layer1: -blur-hidden fx
    arrow: -blur-hidden fx
    layer2: -blur-hidden fx
    bridge: -blur-hidden fx
    examples: h-0 overflow-hidden
    example: -blur-hidden fx
    example2: -blur-hidden fx
  - intro: fx
  - layer1: fx
  - arrow: fx
  - layer2: fx
  - bridge: fx
    examples: mt-4
  - example: fx
  - example: -blur-hidden fx
    example2: fx
---

# Два слоя реактивности

<div class="w-full max-w-980px mx-auto">
  <p :class="t.intro" class="text-lg opacity-80 mb-6">Во фреймворках реактивность часто делится на <strong>две независимые части</strong></p>

  <div class="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch w-full text-center">
    <div :class="t.layer1" class="box box--rich cs-green p-5 h-full">
      <div class="text-2xl font-bold text-green-300 mb-2">Система реактивности</div>
      <p class="text-sm opacity-85 leading-snug">Как циркулирует реактивная логика: зависимости, эффекты, инвалидация</p>
    </div>
    <div :class="t.arrow" class="text-3xl opacity-40 px-2 self-center">↔</div>
    <div :class="t.layer2" class="box box--rich cs-blue p-5 h-full">
      <div class="text-2xl font-bold text-blue-300 mb-2">Реактивный рендеринг</div>
      <p class="text-sm opacity-85 leading-snug">Связь между моделью и её актуальным отображением в UI</p>
    </div>
  </div>

  <div :class="t.bridge" class="box box--rich cs-purple mt-6 p-4 text-center w-full text-center">
    Между ними — прослойка, но <strong>свойства могут быть совершенно разными</strong>
  </div>

  <div :class="t.examples" class="relative w-full">
    <div aria-hidden="true" class="box box--rich cs-cyan flex items-center gap-5 p-5 w-full invisible pointer-events-none">
      <DeviconVuejs class="text-5xl shrink-0"/>
      <div class="text-left text-sm leading-snug flex-1">
        <span class="font-semibold">Vue</span> — proxy/сигнальная модель реактивности,
        но <span>VDOM</span> для рендеринга, как у <span>React</span>
      </div>
      <DeviconReact class="text-5xl shrink-0"/>
    </div>

  <div :class="t.example" class="box box--rich cs-cyan flex items-center gap-5 p-5 w-full absolute inset-0">
    <DeviconVuejs class="text-5xl shrink-0"/>
    <div class="text-left text-sm leading-snug flex-1">
      <span class="text-cyan-200 font-semibold">Vue</span> — proxy/сигнальная модель реактивности,
      но <span class="text-blue-300">VDOM</span> для рендеринга, как у <span class="text-blue-300">React</span>
    </div>
    <DeviconReact class="text-5xl shrink-0 opacity-70"/>
  </div>

  <div :class="t.example2" class="box box--rich cs-red flex items-center gap-5 p-5 w-full absolute inset-0">
    <DeviconRxjs class="text-5xl shrink-0"/>
    <div class="text-left text-sm leading-snug flex-1">
      <span class="text-cyan-200 font-semibold">RxJS</span> — есть система реактивности,
      но нет <span class="text-blue-300">UI реактивности</span>
    </div>
  </div>
  </div>
</div>

---
timeline:
  - item1: -blur-hidden fx
    item2: -blur-hidden fx
    item3: -blur-hidden fx
    item4: -blur-hidden fx
  - item1: fx
  - item2: fx
  - item3: fx
  - item4: fx
---

# Зачем нужна реактивность?

<div class="flex flex-col gap-4 mt-8 max-w-980px w-full mx-auto">
  <div :class="t.item1" class="box box--rich cs-grey flex items-center gap-4 p-5 text-lg">
    🤷‍♂️ Пользователю реактивность не нужна
  </div>
  <div :class="t.item2" class="box box--rich cs-pink flex items-center gap-4 p-5 text-lg">
    💖 Упростить себе жизнь
  </div>
  <div :class="t.item3" class="box box--rich cs-green flex items-center gap-4 p-5 text-lg">
    📦 Сократить количество кода
  </div>
  <div :class="t.item4" class="box box--rich cs-blue flex items-center gap-4 p-5 text-lg">
    🚀 Производительность
  </div>
</div>