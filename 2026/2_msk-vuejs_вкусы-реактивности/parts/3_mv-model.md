---
slideClass: cs-blue
topTitle: · сухой ·
topTitleClass: mk-top-flavor
layout: center
---

# React и «сухой» вкус

Иммутабельность, VDOM, каскадные обновления

---

<div class="grid grid-cols-12 grid-rows-[auto_1fr_70px] gap-4 w-full">
  <div class="col-span-12 box box--rich cs-blue flex items-center gap-6 p-5">
    <DeviconReact class="text-[80px] shrink-0"/>
    <div>
      <h2 class="text-4xl font-bold text-blue-300 mb-1">React</h2>
      <p class="text-blue-400/80 text-lg">Компоненты + декларативный UI</p>
    </div>
  </div>
  <div class="col-span-6 box box--rich cs-purple p-4 min-h-0">
    <h4 class="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2">
      <span class="text-xl">🏗️</span>
      Архитектура и реактивность
    </h4>
    <div class="space-y-2">
      <div class="flex items-center gap-3 p-2 box box--rich text-[18px] cs-blue">
        <span>🧩</span>
        <span class="text-blue-200">Компонентная модель</span>
      </div>
      <div class="flex items-center gap-3 p-2 box box--rich text-[18px] cs-green">
        <span>🌐</span>
        <span class="text-green-200">Virtual DOM</span>
      </div>
      <div class="flex items-center gap-3 p-2 box box--rich text-[18px] cs-purple">
        <span>🔄</span>
        <span class="text-purple-200">One-way Data Flow</span>
      </div>
    </div>
  </div>
  <div class="col-span-6 box box--rich cs-cyan p-4 min-h-0">
    <h4 class="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
      <span class="text-xl">✨</span>
      Сильные стороны
    </h4>
    <div class="grid grid-cols-2 gap-2">
      <div class="text-center p-2 box cs-blue">
        <div class="text-lg mb-1">⚛️</div>
        <div class="text-xs text-blue-200">JSX / композиция</div>
      </div>
      <div class="text-center p-2 box cs-green">
        <div class="text-lg mb-1">🎯</div>
        <div class="text-xs text-green-200">Diff-алгоритм</div>
      </div>
      <div class="text-center p-2 box cs-purple">
        <div class="text-lg mb-1">🔒</div>
        <div class="text-xs text-purple-200">Иммутабельность</div>
      </div>
      <div class="text-center p-2 box cs-orange">
        <div class="text-lg mb-1">📦</div>
        <div class="text-xs text-orange-200">Экосистема</div>
      </div>
    </div>
  </div>
  <div class="col-span-12 box box--rich cs-lightblue py-3">
    <div class="flex justify-around items-center h-full">
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">⚡</div>
        <div class="text-xs text-blue-400/70">Предсказуемый data flow</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">🧩</div>
        <div class="text-xs text-blue-400/70">Компоненты как единица UI</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">🛠️</div>
        <div class="text-xs text-blue-400/70">React Compiler, memo</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-300">🌍</div>
        <div class="text-xs text-blue-400/70">Де-факто стандарт</div>
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
- Есть однонаправленный поток данных

</v-clicks>

## Против

<v-clicks>

- Ручной контроль за обновлениями
- Реактивность не существует за пределами React
- Без оптимизаций — каскадные ререндеры

</v-clicks>

<div class="box box--rich" v-click>React имеет реактивность UI, но не имеет реактивной системы</div>

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
