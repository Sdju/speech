---
slideClass: cs-grey
topTitle: · выбор ·
topTitleClass: mk-top-flavor
layout: center
---

# Что и как выбрать

Гранулярность обновлений

---
slideClass: cs-grey
topTitle: · выбор ·
topTitleClass: mk-top-flavor
---

# Fine Grained Reactivity

<Points>
  <Point v-click class="cs-green" icon="i-material-symbols-category-rounded">
    Элементы четко разделены между собой по ролям
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-hub-rounded">
    Критически важен граф зависимостей
  </Point>
  <Point v-click class="cs-purple" icon="i-material-symbols-target-rounded">
    Обновление применяется максимально точечно
  </Point>
  <Point full class="cs-green flex-center-row gap-8 text-6xl p-4">
    <DeviconSolidjs v-click />
    <DeviconQwik v-click />
    <DeviconSvelte v-click />
    <DeviconVuejs v-click />
  </Point>
</Points>

---
slideClass: cs-grey
topTitle: · выбор ·
topTitleClass: mk-top-flavor
---

# Coarse Grained Reactvity

<Points>
  <Point v-click class="cs-red" icon="i-material-symbols-help-rounded">
    Элементы могут не иметь ролей
  </Point>
  <Point v-click class="cs-orange" icon="i-material-symbols-waterfall-chart-rounded">
    Обновление происходит каскадно
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-layers-rounded">
    VDOM — лишь способ оптимизации каскада
  </Point>
  <Point v-click class="cs-purple" icon="i-material-symbols-replay-rounded">
    Перевычисляется все подряд (обычно через `Memo`)
  </Point>
  <Point full class="cs-green flex-center-row gap-8 text-6xl p-4">
    <DeviconReact v-click />
    <DeviconAngular v-click />
  </Point>
</Points>

---
slideClass: cs-grey
topTitle: · выбор ·
topTitleClass: mk-top-flavor
---

# Semi-Grained Reactivity

<Points>
  <Point v-click class="cs-green" icon="i-material-symbols-blur-on-rounded">
    Обладают признаками обеих концептов в зависимости от ситуации
  </Point>
  <Point v-click class="cs-blue" icon="i-material-symbols-account-tree-rounded">
    Могут иметь реактивный граф, но полный рендер
  </Point>
  <Point full class="cs-green flex-center-row gap-8 text-6xl p-4" v-click>
    <DeviconVuejs />
  </Point>
</Points>
