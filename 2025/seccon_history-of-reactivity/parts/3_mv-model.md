---
layout: center
---

<div class="text-3xl text-center opacity-80 w-800px">2010-2012: Паттерн MV* как основа</div>

---
layout: center
---

<div class="text-3xl text-center w-800px mb-8">К 2010 году стало ясно:</div>

<div class="grid grid-cols-3 gap-4">
  <div class="box" v-click>
    <div class="text-2xl text-center mb-4">📈 Усложнение</div>
    <div class="text-[17px] c-white mb-2">🔨 Клиенты разрастаются</div>
    <div class="text-[17px] c-white"> ⚙ Сложное взаимодействие с сервером</div>
  </div>
  <div class="box cs-blue" v-click>
    <div class="text-2xl text-center mb-4">🏗️ Архитектура</div>
    <div class="text-[17px] c-white mb-2">🔄 Переиспользование кода</div>
    <div class="text-[17px] c-white">🧪 Тестируемость</div>
  </div>
  <div class="box cs-red" v-click>
    <div class="text-[22px] text-center mb-4">📬 Синхронизация</div>
    <div class="text-[17px] c-white mb-2">📦 Данные изменяются в одном месте</div>
    <div class="text-[17px] c-white">💅 UI нужно обновить в другом</div>
  </div>
</div>

---
layout: center
---

<div class="grid grid-rows-2 gap-4 w-800px">
  <div class="box cs-red">
    <div>🔗 Как связать данные и UI?</div>
    <div>🍝 Как не получить спагетти-код?</div>
  </div>
  <div class="box cs-green" v-click>
    <div>🔒 Разграничить ответственности</div>
    <div>🎯 Задать правила взаимодействия</div>
  </div>
</div>

---
layout: center
---

<div class="bg-white/50 rounded-xl p-4 gap-4">
  <LogosBackbone class="w-800px h-100px" />
</div>

<div class="text-3xl text-center w-800px mt-8">2010</div>

---
slideClass: cs-blue
---

# **Backbone.js**: структура без реактивности

<div class="definition-box">

**Backbone.js** — минималистичная библиотека, предоставляющая структуру для организации JavaScript приложений через модели, коллекции, представления и роутеры

</div>

**Автор:** Jeremy Ashkenas (создатель <strong>CoffeeScript</strong>)

<div class="box cs-red">
  Backbone: НЕ MVC, НЕ MVVM, НЕ MVP, но MV*
</div>

---
timeline:
  - block1:
      class: 'pos-51%_159'
      color: 'blue'
      form: 'rect'
    block2:
      class: 'pos-51%_435'
      color: 'green'
      form: 'rect'
    title: ''
    arrow1:
      coords: '479:404 479:188'
      power: 0.1
      class: 'fx duration-500'
    arrow2:
      coords: '523:188 523:404'
      class: 'fx duration-500'
      power: 0.1
    arrow3:
      coords: '523:130 552:150'
      class: 'fx duration-500'
      power: 5
    arrow4:
      coords: '479:462 454:437'
      class: 'fx duration-500'
      power: 5
  - block2:
      multiple: true
  - block1:
      multiple: true
---

<div class="text-center text-3xl font-bold $obj pos-50%_400">{{ t.title }}</div>

<Node v-bind="t.block1">Model</Node>
<Node v-bind="t.block2">View</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrow1" /> <!-- m to v -->
  <SvgArrow v-bind="t.arrow2" /> <!-- v to m -->
  <SvgArrow v-bind="t.arrow3" /> <!-- m to m -->
  <SvgArrow v-bind="t.arrow4" /> <!-- v to v -->
</SvgLayer>

---

# Скажем спасибо Backbone.js

- Разделение ответственностей
- Первые шаги по автоматизации эффектов

---

## ❌ Проблемы:

<v-clicks>

- Много boilerplate кода
- Ручное управление DOM
- Нет автоматического data binding
- Сложно управлять сложным состоянием

</v-clicks>

---

<div class="grid grid-cols-12 gap-4 h-full relative top-[-12px]">
  <div class="col-span-12 box box--rich cs-blue flex-center">
    <div class="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      <LogosKnockout/>
    </div>
  </div>
  
  <!-- Определение библиотеки -->
  <div class="col-span-8 box box--rich cs-orange flex-center">
    <div class="flex items-start gap-4">
      <div class="text-3xl">🔗</div>
      <div>
        <h3 class="text-xl font-semibold mb-3 text-orange-300">Что такое Knockout.js?</h3>
        <p class="text-gray-300 leading-relaxed">
          Первый настоящий <span class="text-blue-300">data-binding</span><br/>
          Был оберткой над <span class="text-orange-300">jQuery</span><br/>
          Автоматическое отслеживание зависимостей
        </p>
      </div>
    </div>
  </div>
  
  <!-- Информация об авторе -->
  <div class="col-span-4 box box--rich cs-red flex-center">
    <div class="text-center">
      <div class="text-4xl mb-3">👨‍💻</div>
      <span class="text-lg font-semibold c-[var(--v-color)] mb-2">Автор</span>
      <p class="text-orange-200 font-medium">Steve Sanderson</p>
      <p class="text-sm text-orange-300/70 mt-1">(Microsoft)</p>
    </div>
  </div>
  
  <!-- Год выпуска -->
  <div class="col-span-3 box box--rich cs-green flex-center">
    <div class="text-2xl mb-2">📅</div>
    <div class="text-3xl font-bold text-green-300">2010</div>
    <div class="text-sm text-green-400/70">Год выпуска</div>
  </div>
  
  <!-- Ключевые особенности -->
  <div class="col-span-9 box box--rich cs-purple">
    <h4 class="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
      <span class="text-2xl">⚡</span>
      Ключевые особенности
    </h4>
    <div class="grid grid-cols-3 gap-4">
      <div class="text-center p-3 box box--rich cs-purple">
        <div class="text-xl mb-1">🔄</div>
        <div class="text-sm font-medium text-purple-200">MVVM</div>
      </div>
      <div class="text-center p-3 box box--rich cs-blue">
        <div class="text-xl mb-1">🔗</div>
        <div class="text-sm font-medium text-blue-200">Data Binding</div>
      </div>
      <div class="text-center p-3 box box--rich cs-green">
        <div class="text-xl mb-1">👁️</div>
        <div class="text-sm font-medium text-green-200">Observables</div>
      </div>
    </div>
  </div>
</div>

---

# Проблемы


## ❌ Загрязнение HTML
Тяжеловсеный избыточный синтаксис внутри шаблонов

## 🏗️ Нет компонентной модели
Невозможно было организовать большие приложения  

<div class="box cs-red c-white text-center" v-click>
  <span class="text-2xl c-red">❗</span>
  Компонентная модель появилась в 2014 <br/>
  (после популяризации <span class="text-blue-300">React</span>)
</div>

---

<div class="grid grid-cols-12 grid-rows-[70px_70px_1fr_70px] gap-4">
  <div class="col-span-8 row-span-2 box box--rich cs-red flex items-center gap-6 p-6">
    <DeviconAngularjs class="font-size-[100px]"/>
    <div>
      <h2 class="text-4xl font-bold text-red-300 mb-2">AngularJS</h2>
      <p class="text-red-400/80 text-lg">Google's MVVM Framework</p>
    </div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-orange flex-center">
    <div class="text-lg text-orange-400/70">2010</div>
    <div class="text-sm text-orange-400/50">Популярность в 2012</div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-blue flex-center">
    <div class="text-sm font-medium text-blue-200">Miško Hevery</div>
    <div class="text-xs text-blue-400/70">Google</div>
  </div>
  <div class="col-span-6 row-span-1 box box--rich cs-purple">
    <h4 class="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2">
      <span class="text-xl">🏗️</span>
      Архитектура и реактивность
    </h4>
    <div class="space-y-3">
      <div class="flex items-center gap-3 p-2 box box--rich text-[20px] cs-purple">
        <span>📊</span>
        <span class="text-purple-200">MVVM Pattern</span>
      </div>
      <div class="flex items-center gap-3 p-2 box box--rich text-[20px] cs-blue">
        <span class="text-[16px]">💉</span>
        <span class="text-blue-200">Digest cycle</span>
      </div>
      <div class="flex items-center gap-3 p-2 box box--rich text-[20px] cs-green">
        <span class="text-[16px]">🔄</span>
        <span class="text-green-200">Two-way Binding</span>
      </div>
    </div>
  </div>
  <div class="col-span-6 row-span-1 box box--rich cs-green">
    <h4 class="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
      <span class="text-xl">✨</span>
      Инновации
    </h4>
    <div class="grid grid-cols-2 gap-2">
      <div class="text-center p-2 box cs-green">
        <div class="text-lg mb-1">📜</div>
        <div class="text-xs text-green-200">Директивы</div>
      </div>
      <div class="text-center p-2 box cs-blue">
        <div class="text-lg mb-1">🔍</div>
        <div class="text-xs text-blue-200">Фильтры</div>
      </div>
      <div class="text-center p-2 box cs-orange">
        <div class="text-lg mb-1">💉</div>
        <div class="text-xs text-orange-200">Dependency Injection</div>
      </div>
      <div class="text-center p-2 box cs-purple">
        <div class="text-lg mb-1">🎭</div>
        <div class="text-xs text-purple-200">Скоупы</div>
      </div>
    </div>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-lightblue">
    <div class="flex justify-around items-center h-full">
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">🏆</div>
        <div class="text-xs text-blue-400/70">Первый массовый фреймворк</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">⚛</div>
        <div class="text-xs text-blue-400/70">Простейшая реактивность</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">🌍</div>
        <div class="text-xs text-blue-400/70">Сдвиг парадигмы</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">🚀</div>
        <div class="text-xs text-blue-400/70">Полноценный фреймворк</div>
      </div>
    </div>
  </div>
</div>

---
timeline:
  - userEvent:
      class: 'pos-117_266'
      color: 'orange'
      form: 'circle'
    scopeApply:
      class: 'pos-292_189'
      color: 'blue'
    digestCycle:
      class: 'pos-466_328'
      color: 'purple'
    checkWatchers:
      class: 'pos-640_191'
      color: 'green'
    updateDOM:
      class: 'pos-750_325'
      color: 'red'
    stop:
      class: 'pos-926_260'
      color: 'gray'
      form: 'circle'
    title: 'Digest Cycle в AngularJS'
    arrow1:
      coords: '117:236 205:189'
      power: 0.3
      class: 'fx duration-700'
    arrow2:
      coords: '292:219 385:327'
      power: -0.3
      class: 'fx duration-700'
    arrow3:
      coords: '466:298 522:189'
      power: 0.3
      class: 'fx duration-700'
    arrow4:
      coords: '642:217 741:293'
      power: 0.3
      class: 'fx duration-700'
    arrow5:
      coords: '752:294 880:257'
      power: 0.2
      class: 'fx duration-700'
    arrow6:
      coords: '665:327 545:327'
      power: 0.1
      class: 'fx duration-700'
  - scopeApply:
      highlight: true
  - digestCycle:
      highlight: true
  - checkWatchers:
      highlight: true
  - updateDOM:
      highlight: true
  - digestCycle:
      highlight: true
      pulse: true
  - stop:
      highlight: true
---

<div class="text-center text-2xl font-bold text-purple-300 $obj pos-50%_83">{{ t.title }}</div>

<Node v-bind="t.userEvent">User Event</Node>
<Node v-bind="t.scopeApply">scope.$apply</Node>
<Node v-bind="t.digestCycle">digest cycle</Node>
<Node v-bind="t.checkWatchers">Check all watchers</Node>
<Node v-bind="t.updateDOM">Update DOM</Node>
<Node v-bind="t.stop">Stop</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrow1" label="trigger" />
  <SvgArrow v-bind="t.arrow2" label="start" />
  <SvgArrow v-bind="t.arrow3" label="check" />
  <SvgArrow v-bind="t.arrow4" label="changes?" />
  <SvgArrow v-bind="t.arrow5" label="no changes" />
  <SvgArrow v-bind="t.arrow6" label="has changes" />
</SvgLayer>

---

# Проблемы

<v-clicks>

## ❌ Низкая масштабируемость
Digest cycle сложно масштабируется

## 🕸 Все еще нет компонентной модели
Вместо этого жонглирование сервисами и контроллерами  

## 🐌 Крайне слабая производительность
Digest cycle очень быстро убивает производительность

</v-clicks>

<div class="box cs-red c-white text-center" v-click>
  <span class="text-2xl c-red">❗</span>
  Компонентная модель появилась в 2014 <br/>
  (после популяризации <span class="text-blue-300">React</span>)
</div>

---

<div class="grid grid-cols-12 grid-rows-[70px_70px_1fr_70px] gap-4">
  <div class="col-span-8 row-span-2 box box--rich cs-blue flex items-center gap-6 p-6">
    <DeviconReact class="font-size-[100px]"/>
    <div>
      <h2 class="text-4xl font-bold text-blue-300 mb-2">React</h2>
      <p class="text-blue-400/80 text-lg">Facebook's Component Library</p>
    </div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-orange flex-center">
    <div class="text-lg text-orange-400/70">2013</div>
    <div class="text-sm text-orange-400/50">Революция UI</div>
  </div>
  <div class="col-span-4 row-span-1 box box--rich cs-green flex-center">
    <div class="text-sm font-medium text-green-200">Jordan Walke</div>
    <div class="text-xs text-green-400/70">Facebook</div>
  </div>
  <div class="col-span-6 row-span-1 box box--rich cs-purple">
    <h4 class="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2">
      <span class="text-xl">🏗️</span>
      Архитектура и реактивность
    </h4>
    <div class="space-y-3">
      <div class="flex items-center gap-3 p-2 box box--rich text-[20px] cs-blue">
        <span>🧩</span>
        <span class="text-blue-200">Компонентная модель</span>
      </div>
      <div class="flex items-center gap-3 p-2 box box--rich text-[20px] cs-green">
        <span class="text-[16px]">🌐</span>
        <span class="text-green-200">Virtual DOM</span>
      </div>
      <div class="flex items-center gap-3 p-2 box box--rich text-[20px] cs-purple">
        <span class="text-[16px]">🔄</span>
        <span class="text-purple-200">One-way Data Flow</span>
      </div>
    </div>
  </div>
  <div class="col-span-6 row-span-1 box box--rich cs-cyan">
    <h4 class="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
      <span class="text-xl">✨</span>
      Инновации
    </h4>
    <div class="grid grid-cols-2 gap-2">
      <div class="text-center p-2 box cs-blue">
        <div class="text-lg mb-1">⚛️</div>
        <div class="text-xs text-blue-200">JSX</div>
      </div>
      <div class="text-center p-2 box cs-green">
        <div class="text-lg mb-1">🎯</div>
        <div class="text-xs text-green-200">Diff алгоритм</div>
      </div>
      <div class="text-center p-2 box cs-purple">
        <div class="text-lg mb-1">🏃‍♂️</div>
        <div class="text-xs text-purple-200">Производительность</div>
      </div>
      <div class="text-center p-2 box cs-orange">
        <div class="text-lg mb-1">📦</div>
        <div class="text-xs text-orange-200">Переиспользуемость</div>
      </div>
    </div>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-lightblue">
    <div class="flex justify-around items-center h-full">
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">🎭</div>
        <div class="text-xs text-blue-400/70">Парадигмальный сдвиг</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">⚡</div>
        <div class="text-xs text-blue-400/70">Быстрые обновления</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">🧩</div>
        <div class="text-xs text-blue-400/70">Компоненты везде</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">🔒</div>
        <div class="text-xs text-blue-400/70">Иммутабельность</div>
      </div>
    </div>
  </div>
</div>

---

# Реактивен ли React?

## За

<v-clicks>

- Интерфейс обновляется полу-автоматически
- Есть механизмы уведомления об обновлении (React Context)
- Он же незывается <span>React</span>!
- Есть однонаправленный поток данных

</v-clicks>

## Против

<v-clicks>

- Ручной контроль за обновлениями
- Реактивность не существует за пределами React
- Нет почти никакой оптимизации

</v-clicks>

<div class="box box--rich" v-click>React иммет реактивность UI, но не имеет реактивной системы</div>

---

# Реактивность через пересоздание

<v-clicks>

- Все бонусы от иммутабельности
- Минимальный оверхед
- Позволяет считать себя обычным <span class="c-orange">JavaScript</span>
- Вечная борьба с ререндерами
- Требуется следить за ссылочным равенством

</v-clicks>

---

# Каскадное обновление

<div class="box box--rich">
  Обоюдоострый меч для <span class="text-blue">React</span>

  <div class="c-white"> Реактивность в моменте </div>

```jsx
function Hello(name) {
  const greetings = `Hello ${name}!`
  return <Box>{greetings}</Box>
}
```

</div>