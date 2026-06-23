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
timeline:
  - title: 'Граф сигналов'
    block1:
      class: 'pos-250_155 -blur-hidden'
      color: 'green'
      solid: true
    block2:
      class: 'pos-710_155 -blur-hidden'
      color: 'green'
      solid: true
    block3:
      class: 'pos-320_295 -blur-hidden'
      color: 'blue'
      solid: true
    block4:
      class: 'pos-640_295 -blur-hidden'
      color: 'blue'
      solid: true
    block5:
      class: 'pos-400_435 -blur-hidden'
      color: 'red'
      solid: true
    block6:
      class: 'pos-560_435 -blur-hidden'
      color: 'red'
      solid: true
    text1: 'count'
    text2: 'name'
    text3: 'doubled'
    text4: 'greeting'
    text5: '$effect'
    text6: 'render'
    arrow1:
      coords: '265:185 310:265'
      power: 0.35
      class: 'fx duration-500 opacity-0'
    arrow2:
      coords: '695:185 655:265'
      power: 0.35
      class: 'fx duration-500 opacity-0'
    arrow3:
      coords: '330:325 395:405'
      power: 0.35
      class: 'fx duration-500 opacity-0'
    arrow4:
      coords: '625:325 565:405'
      power: 0.35
      class: 'fx duration-500 opacity-0'
  - block1:
      class: 'pos-250_155'
    block2:
      class: 'pos-710_155'
  - block3:
      class: 'pos-320_295'
    block4:
      class: 'pos-640_295'
  - block5:
      class: 'pos-400_435'
    block6:
      class: 'pos-560_435'
  - arrow1:
      class: 'fx duration-500 animate'
    arrow2:
      class: 'fx duration-500 animate'
  - arrow3:
      class: 'fx duration-500 animate'
    arrow4:
      class: 'fx duration-500 animate'
---

<div class="text-2xl font-bold text-center $obj pos-50%_58">{{ t.title }}</div>

<div class="flex gap-6 justify-center text-sm $obj pos-50%_95 opacity-70">
  <span class="c-green">● значение</span>
  <span class="c-blue">● вычисляемое</span>
  <span class="c-red">● эффект</span>
</div>

<Node v-bind="t.block1">{{ t.text1 }}</Node>
<Node v-bind="t.block2">{{ t.text2 }}</Node>
<Node v-bind="t.block3">{{ t.text3 }}</Node>
<Node v-bind="t.block4">{{ t.text4 }}</Node>
<Node v-bind="t.block5">{{ t.text5 }}</Node>
<Node v-bind="t.block6">{{ t.text6 }}</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrow1" />
  <SvgArrow v-bind="t.arrow2" />
  <SvgArrow v-bind="t.arrow3" />
  <SvgArrow v-bind="t.arrow4" />
</SvgLayer>

<!--
count, name → signals
doubled, greeting → memos / derived
$effect, render → side effects и привязка к DOM
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
  <Point full class="cs-grey" />
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
  <Point full class="cs-grey" />
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
  <Point full class="cs-grey" />
</Points>

---
slideClass: cs-orange
topTitle: · оранжевый ·
topTitleClass: mk-top-flavor
---

````md magic-move
```js {*|1|3|4|6-8|*}
let count = 0;

$: doubled = count * 2;
$: console.log("count:", count, "doubled:", doubled);

function inc() {
  count += 1;
}
```
```js {*|1|2,4-8|10-12|14-16|*}
let count = 0;
let doubled;

$$self.$$.update = () => {
  if ($$self.$$.dirty & /*count*/ 1) {
    $$invalidate(1, doubled = count * 2);
  }
};

$$self.$$.after_update.push(() => {
  console.log("count:", count, "doubled:", doubled);
});

function inc() {
  $$invalidate(0, count += 1);
}
```
````

---
slideClass: cs-orange
topTitle: · оранжевый ·
topTitleClass: mk-top-flavor
---

<v-clicks>

# К чему пришли в Svelte5

- Смена системы реактивности на сигнальную
- Глубокая реактивность стала доступной
- Теперь реактивность больше дружит с рантаймом
- Компилируемая реактивность осталась для шаблонов

</v-clicks>
