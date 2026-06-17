---
slideClass: cs-green
---

<div class="mk-panel markers-theme max-w-860px mx-auto">
  <div class="mk-panel__header">
    <div class="mk-panel__header-dots">
      <span style="--mk-color: #2ecc71"></span>
      <span style="--mk-color: #3498db"></span>
      <span style="--mk-color: #9b59b6"></span>
      <span style="--mk-color: #f39c12"></span>
    </div>
    набор фломастеров · speaker
  </div>
  <div class="mk-panel__body">
    <div class="flex flex-row gap-6 items-center">
      <div class="size-72 rd-1 of-hidden b-1 b-[var(--mk-tray-edge)]">
        <img class="size-full object-cover" src="/img/photo.png" />
      </div>
      <div>
        <div class="text-3xl mb-3">Денис Чернов</div>
        <div class="grid grid-cols-[28px_1fr] gap-2 items-center text-sm opacity-80">
          <FileIconsTelegram /> @zede_code
          <FileIconsTelegram /> @vueist
          <IonLogoTwitch /> @izede
          <IonLogoGithub /> @Sdju
        </div>
        <p class="mk-note">
          Реактивность — не один цвет. Выбираем под задачу, как фломастер под рисунок.
        </p>
      </div>
    </div>
  </div>
</div>

<QrCodeIntro class="sp-r80_200_200_200 absolute" />

---

# О чем пойдет речь?

<v-clicks>

- 🖍️ Что такое «вкус» реактивности и почему их несколько
- 📚 Современные подходы: React, Redux, Solid, Svelte, Signals
- ⚖️ Push / Pull / PushPull и гранулярность
- 🎯 Когда какой вкус уместен

</v-clicks>

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

<!-- Начнем с самого понятия реактивности. В природе это способность систем автоматически реагировать на внешние раздражители. -->

---

# Определение реактивности во фронтенде

**Реактивность** — способность системы автоматически обновлять пользовательский интерфейс при изменении состояния приложения

<v-click>

**Ключевые характеристики:**

</v-click>
<v-clicks>

- Автоматичность
- Согласованность данных и UI
- Отслеживание зависимостей

</v-clicks>

---

# Зачем нужна реактивность?

<v-clicks>

- 🤷‍♂️ Пользователю реактивность не нужна
- 💖 Упростить себе жизнь
- 📦 Сократить количество кода
- 🚀 Производительность
- 🛠️ Поддерживаемость

</v-clicks>

---
layout: center
---

# Два слоя реактивности

<p class="text-lg opacity-80 mb-6" v-click>Во фреймворках реактивность часто делится на <strong>две независимые части</strong></p>

<div class="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
  <div class="box box--rich cs-green p-5" v-click>
    <div class="text-2xl font-bold text-green-300 mb-2">Система реактивности</div>
    <p class="text-sm opacity-85 leading-snug">Как циркулирует реактивная логика: зависимости, эффекты, инвалидация</p>
  </div>
  <div class="text-3xl opacity-40 px-2" v-click>↔</div>
  <div class="box box--rich cs-blue p-5" v-click>
    <div class="text-2xl font-bold text-blue-300 mb-2">Реактивный рендеринг</div>
    <p class="text-sm opacity-85 leading-snug">Связь между моделью и её актуальным отображением в UI</p>
  </div>
</div>

<div class="box box--rich cs-purple mt-6 p-4 text-center" v-click>
  Между ними — прослойка, но <strong>свойства могут быть совершенно разными</strong>
</div>

<div class="box box--rich cs-cyan mt-4 flex items-center gap-5 p-5" v-click>
  <DeviconVuejs class="text-5xl shrink-0"/>
  <div class="text-left text-sm leading-snug">
    <span class="text-cyan-200 font-semibold">Vue</span> — proxy/сигнальная модель реактивности,
    но <span class="text-blue-300">VDOM</span> для рендеринга, как у <span class="text-blue-300">React</span>
  </div>
  <DeviconReact class="text-5xl shrink-0 opacity-70"/>
</div>