<div class="grid grid-cols-12 grid-rows-[80px_1fr_140px] gap-4">
  <div class="col-span-7 row-span-2 box box--rich cs-green flex items-center gap-6 p-6">
    <div class="text-[120px] text-green-300"><DeviconVuejs/></div>
    <div>
      <h2 class="text-5xl font-bold text-green-300 mb-2">Vue 2</h2>
      <p class="text-green-400/80 text-xl">Прогрессивный фреймворк</p>
    </div>
  </div>
  <div class="col-span-5 row-span-1 box box--rich cs-orange flex-center">
    <div class="flex justify-between items-center">
      <span class="text-orange-200">2016</span>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-orange-200">Evan You</span>
    </div>
  </div>
  <div class="col-span-3 row-span-1 box box--rich cs-cyan flex-center">
    <div class="text-center">
      <div class="text-3xl mb-2">📝</div>
      <div class="text-sm font-medium text-cyan-200">Template</div>
      <div class="text-xs text-cyan-400/70">Декларативный синтаксис</div>
    </div>
  </div>
  <div class="col-span-2 row-span-1 box box--rich cs-purple flex-center">
    <div class="text-center">
      <div class="text-2xl mb-1">🔍</div>
      <div class="text-xs text-purple-200">Getter/Setter</div>
    </div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-blue">
    <h4 class="text-sm font-semibold text-blue-300 mb-2">🎯 Основные концепции</h4>
    <div class="grid grid-cols-2 gap-1 text-xs">
      <div class="p-1 box cs-blue text-center">Reactive</div>
      <div class="p-1 box cs-green text-center">Computed</div>
      <div class="p-1 box cs-purple text-center">Watchers</div>
      <div class="p-1 box cs-orange text-center">Components</div>
    </div>
  </div>
  <div class="col-span-8 row-span-1 box box--rich cs-pink">
    <div class="flex justify-around items-center h-full">
      <div class="text-center">
        <div class="text-xl font-bold text-pink-300">📈</div>
        <div class="text-xs text-white">Глубокая реактивность</div>
      </div>
      <div class="text-center">
        <div class="text-xl font-bold text-pink-300">🎓</div>
        <div class="text-xs text-white">PushPull модель</div>
      </div>
      <div class="text-center">
        <div class="text-xl font-bold text-pink-300">🔧</div>
        <div class="text-xs text-white">Перфоманс</div>
      </div>
      <div class="text-center">
        <div class="text-xl font-bold text-pink-300">🧩</div>
        <div class="text-xs text-white">SFC компоненты</div>
      </div>
    </div>
  </div>
</div>

---

````md magic-move
```js
return {
  age: 5,
  name: 'JohnDoe'
}
```
```js
return {
  get age() {  },
  set age(value) {  },
  get name() {  },
  set name(value) {  },
}
```
````

---

# Проблемы подхода **Getter+Setter**

<v-clicks>

- Нельзя реактивно отлавливать добавление и удаление свойств
- Очень дорогое создание реактивного примитива
- Сильно искажается изначальный объект
- Приходилось **патчить** стандартные объекты (изменять работу функций)

</v-clicks>

---

# Сравнение с **Proxy**

<v-clicks>

- `Proxy` более дорогой инструмент
- Мгновенное содание примитивов
- Обработка операций почти любой сложности
- Нет необходимости патчить изначальный объект
- Возможность автоматического анбоксинга реактивных элементов

</v-clicks>

---

```ts {1|2|3|4|*}
const a = ref('Hello')
console.log(a.value)
const b = reactive({ a, c: ' Reactivity' })
console.log(b.a, b.c)
```

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