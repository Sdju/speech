---
slideClass: cs-teal
topTitle: · свежий ·
topTitleClass: mk-top-flavor
---

<div class="grid grid-cols-12 grid-rows-[1fr_90px_90px] gap-4">
  <div class="col-span-8 row-span-3 box box--rich cs-blue">
    <div class="flex items-center gap-6 p-6 mb-6">
      <div class="text-[100px] text-blue-300"><DeviconSolidjs /></div>
      <div>
        <h2 class="text-4xl font-bold text-blue-300 mb-2">Solid</h2>
        <p class="text-blue-200 text-lg">Сигналы в массы!</p>
      </div>
    </div>
    <div class="px-6">
      <h4 class="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
        <span class="text-2xl">⚡</span>
        Реактивные примитивы
      </h4>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-3">
          <div class="flex items-center gap-3 p-3 box box--rich cs-yellow">
            <span class="text-xl">📊</span>
            <div>
              <div class="text-yellow-200 font-medium">Signal</div>
              <div class="text-white text-sm">Базовая единица состояния</div>
            </div>
          </div>
          <div class="flex items-center gap-3 p-3 box box--rich cs-green">
            <span class="text-xl">💫</span>
            <div>
              <div class="text-green-200 font-medium">Effect</div>
              <div class="text-white text-sm">Побочные эффекты</div>
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex items-center gap-3 p-3 box box--rich cs-cyan">
            <span class="text-xl">🧮</span>
            <div>
              <div class="text-cyan-200 font-medium">Memo</div>
              <div class="text-white text-sm">Производные значения</div>
            </div>
          </div>
          <div class="flex items-center gap-3 p-3 box box--rich cs-purple">
            <span class="text-xl">🏪</span>
            <div>
              <div class="text-purple-200 font-medium">Store</div>
              <div class="text-white text-sm">Вложенная реактивность</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-teal flex items-center gap-3 p-4">
    <div class="text-3xl">📅</div>
    <div>
      <div class="text-lg text-teal-200 font-medium">2021</div>
      <div class="text-sm text-teal-400/70">Ryan Carniato</div>
      <div class="text-xs text-teal-400/50">eBay, Netflix</div>
    </div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-pink flex-center">
    <div class="text-center">
      <div class="text-2xl mb-1">🎯</div>
      <div class="text-sm text-pink-200 font-medium">Fine-grained</div>
      <div class="text-xs text-pink-400/70">Точечные обновления</div>
    </div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-indigo">
    <div class="flex justify-around items-center h-full">
      <div class="text-center">
        <div class="text-lg font-bold text-indigo-300">🚀</div>
        <div class="text-xs text-white">Быстрый</div>
      </div>
      <div class="text-center">
        <div class="text-lg font-bold text-indigo-300">⚛️</div>
        <div class="text-xs text-white">JSX</div>
      </div>
      <div class="text-center">
        <div class="text-lg font-bold text-indigo-300">🧩</div>
        <div class="text-xs text-white">Композиция</div>
      </div>
    </div>
  </div>
</div>

---
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

# Сигналы

<v-clicks depth="2">

- Реактивные примитивы, задача которых описать взаимоотношения в системе
- Автоматический трекинг зависимостей
- Концентрация на взаимосвязях сущностей:
  - Состояние
  - Вычислимое состояние
  - Эффект
- Зачастую `PushPull` реактивность
  - Вычислимые значения ленивые
  - Эффекты вызываются в строго запланированное время
</v-clicks>

---
slideClass: cs-orange
topTitle: · лёгкий ·
topTitleClass: mk-top-flavor
---

<div class="grid grid-cols-12 grid-rows-[auto_auto_auto] gap-4">
  <div class="col-span-5 row-span-1 box box--rich cs-orange flex items-center gap-3 p-4">
    <div class="text-[60px] text-orange-300"><DeviconSvelte/></div>
    <div>
      <h2 class="text-3xl font-bold text-orange-300">Svelte</h2>
      <p class="text-orange-400/80 text-sm">Исчезающий фреймворк</p>
    </div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-blue flex-center">
    <div class="text-center">
      <div class="text-lg text-blue-400/70">2016</div>
      <div class="text-sm text-blue-200 font-medium">Rich Harris</div>
      <div class="text-xs text-blue-400/50">The Guardian / NY Times</div>
    </div>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-green flex-center">
    <div class="text-center">
      <div class="text-3xl mb-1">⚙️</div>
      <div class="text-sm text-green-200">Compile Time</div>
      <div class="text-xs text-green-400/70">Нет рантайма</div>
    </div>
  </div>
  <div class="col-span-6 row-span-2 box box--rich cs-indigo">
    <h4 class="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
      <span class="text-xl">⚡</span>
      Преимущества компиляции
    </h4>
    <div class="space-y-4">
      <div class="flex items-center gap-4 box box--rich cs-blue">
        <span class="text-2xl">📦</span>
        <div>
          <div class="text-blue-200 font-medium">Маленький бандл</div>
          <div class="text-white text-sm">Нет фреймворка в продакшене</div>
        </div>
      </div>
      <div class="flex items-center gap-4 box box--rich cs-green">
        <span class="text-2xl">⚡</span>
        <div>
          <div class="text-green-200 font-medium">Высокая производительность</div>
          <div class="text-white text-sm">Оптимизации на этапе сборки</div>
        </div>
      </div>
      <div class="flex items-center gap-4 box box--rich cs-purple">
        <span class="text-2xl">🧹</span>
        <div>
          <div class="text-purple-200 font-medium">Чистый код</div>
          <div class="text-white text-sm">Минимум абстракций</div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-red flex-center">
    <div class="text-center">
      <div class="text-2xl mb-1">🎭</div>
      <div class="text-sm text-red-200">Реактивность</div>
      <div class="text-xs text-red-400/70">$: синтаксис</div>
    </div>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-cyan flex-center">
    <div class="text-center">
      <div class="text-2xl mb-1">📝</div>
      <div class="text-sm text-cyan-200">Простота</div>
      <div class="text-xs text-cyan-400/70">Меньше кода</div>
    </div>
  </div>
  <div class="col-span-6 row-span-1 box box--rich cs-slate">
    <div class="flex justify-around items-center h-full flex-wrap">
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">🏗️</div>
        <div class="text-xs text-white">Compile-time Magic</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">🚀</div>
        <div class="text-xs text-white">Быстрый старт</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">💡</div>
        <div class="text-xs text-white">Интуитивность</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">🎯</div>
        <div class="text-xs text-white">Точные обновления</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-slate-300">🌟</div>
        <div class="text-xs text-white">SvelteKit</div>
      </div>
    </div>
  </div>
</div>

---

# Компилируемая реактивность

<v-clicks>

- Трекинг зависимостей на этапе компиляции
- Минимальный оверхед по памяти
- Не очень дружит с глубокой реактивностью
- Плохо строит модели в рантайме (из-за чего есть реалтайм реактивность на основе `svelte/store`)

</v-clicks>

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

<v-clicks>

# К чему пришли в Svelte5

- Отказ от реактивности на основе компиляции
- Теперь реактивность больше дружит с рантаймом
- Используется Proxy для объектов
- Глубокая реактивность стала доступной
- Переход на компиляцию в реактивность на основе сигналов

</v-clicks>

---

````md magic-move
```js {*|1|2|3-5|7-9|*}
let count = $state(0);
let doubled = $derived(count * 2);
$effect(() => {
  console.log(count)
});

function inc() {
  count += 1;
}
```
```js {*|1|2|4-6|8-9|*}
let count = $.state(0);
let doubled = $.derived(() => $.get(count) * 2);

$.user_effect(() => {
  console.log($.get(count));
});

function inc() {
  $.set(count, $.get(count) + 1);
}
```
````

---

# Fine Grained Reactivity

<v-clicks>

- Элементы четко разделены между собой по ролям
- Критически важен граф зависимостей
- Обновление применяется максимально точечно

</v-clicks>

<div class="box box-rich flex-center-row p-4 gap-8 mt-8 text-6xl cs-green" v-click="4">
  <DeviconSolidjs v-click />
  <DeviconQwik v-click />
  <DeviconSvelte v-click />
  <DeviconVuejs v-click />
</div>

---

# Coarse Grained Reactvity

<v-clicks>

- Элементы могут не иметь ролей
- Обновление происходит каскадно
- VDOM это лишь способ оптимизации данного каскада
- Перевычисляется все подряд (обычно можно ограничивать через `Memo`)

</v-clicks>

<div class="box box-rich flex-center-row p-4 gap-8 mt-8 text-6xl cs-green" v-click="5">
  <DeviconReact v-click />
  <DeviconAngular v-click />
</div>

---

# Semi-Grained Reactivity

- Обладают признаками обеих концептов в зависимости от ситуации
- Могут иметь реактивный граф, но полный рендер

<div class="box box-rich flex-center-row p-4 gap-8 mt-8 text-6xl cs-green" v-click>
  <DeviconVuejs />
</div>
