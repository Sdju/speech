---
theme: ./theme
addons:
  - ./_template/addon
routerMode: hash
htmlAttrs:
  lang: ru
highlighter: shiki
lineNumbers: true
css: unocss
colorSchema: dark
transition: view-transition
contextMenu: false
mdc: true
growSeed: 4
title: Расширенный Slidev
layout: center
---

<XSlide slot="title" #="{ title, className, style }">
  <h1 :class="className" :style="style"> {{ title }} </h1>
</XSlide>

<XSlideOut slot="title" title="Welcome to Slidev+!" class="text-center" />

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Нажмите пробел для начала демонстрации <carbon:rocket class="inline"/>
  </span>
</div>

---
layout: center
class: text-center cs-blue
---

<XSlideOut slot="title" title="Плавные переходы!" class="text-4xl mb-4" />

<div :class="className">
  <div class="text-2xl c-[--v-color]">View Transitions API</div>
</div>

---
layout: center
timeline:
  - first: -popup-hidden
    second: -popup-hidden
    third: -popup-hidden
  - first:
  - second:
  - third:
---

<XSlide slot="features" #="{ className }">
  <div :class="className">
    <h1 class="mb-8">Возможности Аддона</h1>
    <ul class="text-xl space-y-4">
      <li :class="[t.first, 'fx']">🎭 <b>Кросс-слайдовые переходы</b> - плавная анимация между слайдами</li>
      <li :class="[t.second, 'fx']">🎨 <b>Слоты и компоненты</b> - XSlide и XSlideOut для управления контентом</li>
      <li :class="[t.third, 'fx']">✨ <b>View Transitions</b> - современные веб-анимации</li>
    </ul>
  </div>
</XSlide>

<XSlideOut slot="features" title="Возможности" class="text-center" />

---
layout: two-cols
---

<XSlide slot="code" #="{ className }">
  <div :class="className" class="pr-4">
    <h1 class="mb-4">Пример использования</h1>
    
```vue
<XSlide slot="demo" #="{ className }">
  <div :class="className">
    <h1>Ваш контент</h1>
  </div>
</XSlide>

<XSlideOut 
  slot="demo" 
  title="Заголовок" 
  class="text-center" 
/>
```

  </div>
</XSlide>

::right::

<XSlide slot="result" #="{ className }">
  <div :class="className" class="pl-4">
    <h2 class="mb-4">Результат</h2>
    <div class="border p-4 rounded">
      <h3 class="text-2xl mb-2">Плавный переход</h3>
      <p class="text-gray-400">Контент анимируется между слайдами</p>
    </div>
  </div>
</XSlide>

<XSlideOut slot="code" title="Код" />
<XSlideOut slot="result" title="Результат" />

---
layout: center
class: text-center
---

<XSlide slot="end" #="{ className }">
  <div :class="className">
    <h1 class="mb-8">Попробуйте сами!</h1>
    <div class="text-xl opacity-75">
      Расширьте возможности ваших презентаций с помощью нашего аддона
    </div>
    <div class="mt-8 flex justify-center gap-4">
      <a href="https://sli.dev" target="_blank" class="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
        Документация
      </a>
      <a href="https://github.com/slidevjs/themes" target="_blank" class="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600">
        GitHub
      </a>
    </div>
  </div>
</XSlide>

<XSlideOut slot="end" title="Начните сейчас!" />
