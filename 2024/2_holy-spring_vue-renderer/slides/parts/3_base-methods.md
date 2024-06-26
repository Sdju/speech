---
layout: cover
---

# Простейший DOM-рендерер

<div class="grid grid-cols-[170px_1fr] gap-2" >
<FileTree :files="[{
    type: 'folder',
    name: 'src/assets'
  }, {
    type: 'typescript',
    name: 'src/renderer/index.ts',
  }, {
    type: 'typescript',
    name: 'src/renderer/nodeOps.ts',
  }, {
    type: 'vue',
    name: 'src/App.vue',
    highlighted: true
  }, {
    type: 'typescript',
    name: 'src/main.ts',
  }
]" />

```html
<template>
    <article>
        <h1>
            Простой пример верстки
        </h1>
        <div>
            Текст статьи про верстку
        </div>
    </article>
</template>
```

</div>

<!--
Давайте попробуем для начала вывести вот такой совершенно незамысловатый компонент App.vue

Тут особо ничего нет кроме элементов и пары строк текста
-->

---
layout: cover
---

#  createText

```html {*|3,6}
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        Текст статьи про верстку
    </div>
</article>
```

<v-click>

````md magic-move
```ts
({
  createText: (text: string) => ...,
})
```

```ts
({
  createText: (text: string) => document.createTextNode(text),
})
```
````

</v-click>

<!--
Для начала попробуем вывести сам текст. Для этого мы с вами реализуем метод createText, который принимает на вход лишь 1 параметр text типа string и долджны вернуть обратно HostNode.

В случае работы с DOM мы можем воспользоваться методом createTextNode и на этом все.
-->

---
layout: cover
---

# createElement

```html {*|1,2,4,5,7,8}
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        Текст статьи про верстку
    </div>
</article>
```

````md magic-move
```ts
({
  createElement: (tag: string) => ...,
})
```

```ts
({
  createElement: (tag: string) => document.createElement(tag),
})
```
````

<!--
Теперь займемся самими элементами. Для этого используется метод createElement.

Тут мы получаем на вход строку с названием создаваемого тега и должны вернуть HostElement

Ну и соответственно используем createElement для создания элемента и передаем туда наш тег
-->

---
layout: cover
---

<script setup>
$doubleClick($renderContext, [1, 3, 5])
</script>

# createElement

<div class="grid grid-cols-[300px_1fr] gap-2" >

````md magic-move
```html
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        Текст статьи про верстку
    </div>
</article>
⠀
```

```html {0-100|5-7}
<article>
    <h1>
        Простой пример верстки
    </h1>
    <svg ... >
      ...
    </svg>
</article>
⠀
```

```html {0-100|2-4}
<article>
    <math display="inline">
      ...
    </math>
    <svg ... >
      ...
    </svg>
</article>
⠀
```
````

<div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-4">
  <article>
    <div class="relative h-[70px]">
      <h1 v-click.hide="3" class="absolute top-0">
        Простой пример верстки
      </h1>
      <div v-click="3" class="absolute top-0">

$\sqrt{3x-1}+(1+x)^2$

</div>
    </div>
    <div class="relative">
      <div v-click.hide="1" class="absolute top-0" >
          Текст статьи про верстку
      </div>
      <svg v-click="1" class="absolute top-0" width="60" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02">
        <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"/>
        <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"/>
      </svg>
    </div>
  </article>
</div>
</div>

````md magic-move
```ts
({
  createElement: (tag: string) => document.createElement(tag),
})








⠀
```

```ts
({
  createElement: (
    tag: string,
   ) => document.createElement(tag),
})






⠀
```

```ts
({
  createElement: (
    tag: string,
    namespace?: "svg" | "mathml" | undefined,
   ) => document.createElement(tag),
})





⠀
```

```ts
({
  createElement: (
    tag: string,
    namespace?: "svg" | "mathml" | undefined,
   ) => {
     return namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : namespace === 'mathml'
          ? document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
          : document.createElement(tag)
   }
})
```
````

<!--
Однако, что если мы хотели бы вывести в HTML не просто верстку, а допустим SVG

Который работает уже по стандарту XML и оперирует другими методами для взаимодействия, тут уже простым createElement не отделаться

Или даже вообще захотим вывести математическую формулу используя MathML? Тут тоже самое как с svg нужны особые методы

Но не стоит переживать, Vue дает нам дополнительный параметр namespace, который сообщит нам в каком окружении создается элемент: undefined, если оно не задано, те обычный HTML, либо svg и mathml соответственно

Давайте доработает наш пример, чтобы наши картинки и формулы, все еще работали на страничке
-->

---
layout: cover
dragPos:
  circle-1: 471,103,60,60
  circle-2: 605,311,60,60
  circle-3: 479,313,60,60
  circle-4: 355,315,60,60
  circle-5: 536,206,60,60
  circle-6: 410,206,60,60
  a-1: 407,265,10,60,208
  a-2: 597,250,10,67,146
  a-3: 532,259,10,60,209
  a-4: 406,266,10,60,207
  a-5: 529,154,10,60,147
  a-6: 464,155,10,60,208
---

<div v-drag="'circle-1'" class="bg-[#333] b-[#AAA] b-3 text-white text-2xl rd-full text-center line-height-[50px]">div</div>
<div v-drag="'circle-2'" class="bg-[#42b883] b-white b-3 text-white text-2xl rd-full text-center line-height-[50px]">g</div>
<div v-drag="'circle-3'" class="bg-[#42b883] b-white b-3 text-white text-2xl rd-full text-center line-height-[50px]">rec</div>
<div v-drag="'circle-4'" class="bg-[#333] b-[#AAA] b-3 text-white text-2xl rd-full text-center line-height-[50px]">a</div>
<div v-drag="'circle-5'" class="bg-[#42b883] b-white b-3 text-white text-2xl rd-full text-center line-height-[50px]">svg</div>
<div v-drag="'circle-6'" class="bg-[#333] b-[#AAA] b-3 text-white text-2xl rd-full text-center line-height-[50px]">div</div>

<div v-drag="'a-1'">
<ZedeArrow inert x1="100" y1="206" x2="100" y2="154" color="#DADADA" />
</div>
<div v-drag="'a-2'">
<ZedeArrow inert x1="100" y1="206" x2="100" y2="154" color="#DADADA" />
</div>
<div v-drag="'a-3'">
<ZedeArrow inert x1="100" y1="206" x2="100" y2="154" color="#DADADA" />
</div>
<div v-drag="'a-4'">
<ZedeArrow inert x1="100" y1="206" x2="100" y2="154" color="#DADADA" />
</div>
<div v-drag="'a-5'">
<ZedeArrow inert x1="100" y1="206" x2="100" y2="154" color="#DADADA" />
</div>
<div v-drag="'a-6'">
<ZedeArrow inert x1="100" y1="206" x2="100" y2="154" color="#DADADA" />
</div>

<!--
Vue понимает это автоматически, либо из параметра при создании приложения, либо создавая элементы последовательно понимает что, ага, тут начался svg и внутри него все это namespace svg. Те все дочерние элементы от svg сразу будут иметь namespace svg
-->

---
layout: cover
---

<script setup>
$doubleClick($renderContext, 3)
</script>

# createElement

<div class="grid grid-cols-[310px_1fr] gap-2" >

````md magic-move
```html
<ul>
  <li> item-1 </li>
  <li> item-2 </li>
  <li> item-3 </li>
</ul>
```

```html
<ul is="ul-web-component">
  <li is="li-web-component"> item-1 </li>
  <li is="li-web-component"> item-2 </li>
  <li is="li-web-component"> item-3 </li>
</ul>
```
````

<div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-4">
  <div class="relative">
    <div v-click.hide="1" class="absolute top-0 text-lg" >
        <ul>
          <li style="line-height: normal"> item-1 </li>
          <li style="line-height: normal"> item-2 </li>
          <li style="line-height: normal"> item-3 </li>
        </ul>
    </div>
    <div v-click="1" class="absolute top-0 text-lg" >
        <div class="bg-[#222]">
          <div style="line-height: normal" class="bg-[#42b883] mb-1 rd-2 border-l-4 px-2"> item-1 </div>
          <div style="line-height: normal" class="bg-[#42b883] mb-1 rd-2 border-l-4 px-2"> item-2 </div>
          <div style="line-height: normal" class="bg-[#42b883] mb-1 rd-2 border-l-4 px-2"> item-3 </div>
        </div>
    </div>
  </div>
</div>
</div>

````md magic-move
```ts
({
  createElement: (
    tag: string,
    namespace?: "svg" | "mathml" | undefined,
   ) => {
     return namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : namespace === 'mathml'
          ? document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
          : document.createElement(tag)
   }
})
⠀
```

```ts
({
  createElement: (
    tag: string,
    namespace?: "svg" | "mathml" | undefined,
    isCustomizedBuiltIn?: string,
   ) => {
     return namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : namespace === 'mathml'
          ? document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
          : document.createElement(tag)
   }
})
```

```ts {*|11}
({
  createElement: (
    tag: string,
    namespace?: "svg" | "mathml" | undefined,
    isCustomizedBuiltIn?: string,
   ) => {
     return namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : namespace === 'mathml'
          ? document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
          : document.createElement(tag, isCustomizedBuiltIn && { is: isCustomizedBuiltIn })
   }
})
```
````

<!--
Но что если мы хотим вывести не картинку или формулу, а список. И не простой список, а список который работает на основе веб компонентов. у HTML для этого есть специальное свойство is в котором указывается в рамках какого кастомного элемента нужно сделать вывод.

Ну а Vue заботливо нам отдельно передаст этот атрибут при необходимости. Нам остается лишь его применить вот таким образом
-->

---
layout: cover
---

<script setup>
$doubleClick($renderContext, 3)
</script>


# createElement

````md magic-move
```ts
({
  createElement: (
    tag: string,
    namespace?: "svg" | "mathml" | undefined,
    isCustomizedBuiltIn?: string,
   ) => {
     return namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : namespace === 'mathml'
          ? document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
          : document.createElement(tag, isCustomizedBuiltIn && { is: isCustomizedBuiltIn })
   }
})


⠀
```

```ts
({
  createElement: (
    tag: string,
    namespace?: "svg" | "mathml" | undefined,
    isCustomizedBuiltIn?: string,
    node?: (VNodeProps & Record<string, any>) | null
   ) => {
     return namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : namespace === 'mathml'
          ? document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
          : document.createElement(tag, isCustomizedBuiltIn && { is: isCustomizedBuiltIn })
   }
})

⠀
```

```ts
({
  createElement: (
    tag: string,
    namespace?: "svg" | "mathml" | undefined,
    isCustomizedBuiltIn?: string,
    node?: (VNodeProps & Record<string, any>) | null
   ) => {
     const el = namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : namespace === 'mathml'
          ? document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
          : document.createElement(tag, isCustomizedBuiltIn && { is: isCustomizedBuiltIn })
     return el
   }
})
⠀
```

```ts {*|6,10-12}
({
  createElement: (
    tag: string,
    namespace?: "svg" | "mathml" | undefined,
    isCustomizedBuiltIn?: string,
    node?: (VNodeProps & Record<string, any>) | null
   ) => {
     const el = ...
     
     if (tag === 'select' && props && props.multiple != null) {
       ;(el as HTMLSelectElement).setAttribute('multiple', props.multiple)
     }
     
     return el
   }
})
```
````

<!--
Если вам порой приходится писать костыли, то не переживайте, с этим сталкиваются даже авторы фреймворков. И последний аргумент, это чистейший костыль изх исходников, нужный для обработки одного единственного случая. Мы получаем пропсы виртуальной ноды для того, чтобы проработать отдельныйе кейсы

В исходниках Vue такой всего один, для вывода селекта с множественным выбором... все...
-->

---
layout: cover
---

<script setup>
$doubleClick($renderContext, 9)
</script>

# insert

````md magic-move
```html
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        Текст статьи про верстку
    </div>
</article>
⠀
```

```html
Простой пример верстки

<h1></h1>

Текст статьи про верстку

<div></div>

<article></article>
```

```html {*|*|*|*|*|*}
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        Текст статьи про верстку
    </div>
</article>
⠀
```

```html
<article>
    <h1>
        Простой пример верстки
    </h1>
    с вставкой
    <div>
        Текст статьи про верстку
    </div>
</article>
```
````

<v-click at="3">

````md magic-move {at:4}
```ts {*|3|4|*}
({
  insert: (
    child: HostNode,
    parent: HostElement,
  ) => { ... }
})


⠀
```

```ts {*|*}
({
  insert: (
    child: Node,
    parent: Element,
  ) => {
    parent.insertBefore(child)
  }
})
⠀
```

```ts {*|5}
({
  insert: (
    child: Node,
    parent: Element,
    anchor?: HostNode | null,
  ) => {
    parent.insertBefore(child)
  }
})
```

```ts
({
  insert: (
    child: Node,
    parent: Element,
    anchor?: Node | null
  ) => {
    parent.insertBefore(child, anchor)
  }
})
```
````

</v-click>

<!--
Теперь с нашими уже реализованными методами мы можем создать не такой HTML
а скорее какой-то такой. Нужно еще дополнительно обучить наши элементы и ноды вкладываться в друг друга, для этого нужен метод insert

Он принимает на вход HostNode и HostElement и мы должны вложить один в другой

В случае с DOM просто используем insertBefore и дочерний компонент окажется в родительском

Но что если нам нужно вставить куда-то посередине?

Для этого Vue использует относительную вставку. Он даст нам еще одним параметром, перед каким именно ребенком нужно вставить новый. Нам остается лишь немного иначе написать вызов и все будет прекрасно работать
-->

---
layout: cover
---

# Упс!

```
renderer-temp.ts:8 Uncaught Error: no-op: setElementText
    at noop (renderer-temp.ts:8:9)
    at setElementText (renderer-temp.ts:35:27)
    at mountElement (runtime-core.esm-bundler.js:5488:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at mountChildren (runtime-core.esm-bundler.js:5583:7)
    at mountElement (runtime-core.esm-bundler.js:5490:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:6011:11)
```

<!--
Однако если мы запустим наш код сейчас... То увидим, что нам нужно реализовать еще метод setElementText. Но почему же так?
-->

---
layout: cover
---

<script setup>
$doubleClick($renderContext, 4)
</script>

# setElementText

<div class="grid grid-cols-[310px_1fr] gap-2" >

````md magic-move
```html {*|2,4,5,7|3,6|0-100}
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        Текст статьи про верстку
    </div>
</article>

⠀
```

```html {*|4,8}
<article>
    <h1>
        Простой пример верстки
        <div />
    </h1>
    <div>
        Текст статьи про верстку
        <div />
    </div>
</article>
```

```html
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        Текст статьи про верстку
    </div>
</article>

⠀
```
````

<div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-4">
  <div class="relative">
    <pre v-click.hide="4" class="absolute top-0 text-[0.6rem]" >
renderer-temp.ts:8 Uncaught Error: no-op: setElementText
    at noop (renderer-temp.ts:8:9)
    at setElementText (renderer-temp.ts:35:27)
    at mountElement (runtime-core.esm-bundler.js:5488:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at mountChildren (runtime-core.esm-bundler.js:5583:7)
    at mountElement (runtime-core.esm-bundler.js:5490:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:6011:11)
    </pre>
    <div v-click="4" class="absolute top-0 text-lg" >
        <article>
          <h1>
              Простой пример верстки
          </h1>
          <div>
              Текст статьи про верстку
          </div>
        </article>
    </div>
  </div>
</div>
</div>

<v-click>

````md magic-move
```ts
({
  setElementText: (
    element: HostElement,
    text: string
  ) => { ... }
})

⠀
```

```ts
({
  setElementText: (
    element: Element,
    text: string
  ) => { 
    el.textContent = text
  }
})
```
````

</v-click>

<!--
Vue видит, что элементы h1 и div содержат в себе только текст. Поэтому вместо создания текстовой ноды с нужным текстом, он пытается сразу изменить текст элемента. Если бы у нас был div, то тут бы уже Vue понял, что отвертеться не выйдет и он должен создать текстовую ноду. Однако мы не можем всегда следить за такими бесполезными вставками, поэтому уступим Vue и реализуем все-таки метод setElementText

Мы получим на вход элемент которому нужно произвести замену и сам текст

Для DOM достаточно просто установить значение textContent
-->
