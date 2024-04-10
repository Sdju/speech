---
layout: cover
---

# Простейший DOM-рендерер

App.vue
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
Теперь займемся самими элементами здесь мы имеем их 3 штуки article/h1/div.Для этого используется метод createElement.

Тут мы получаем на вход строку с названием тега и должны вернуть HostElement

Ну и соответственно используем createElement для создания элемента и прередаем туда наш тег
-->

---
layout: cover
---

# createElement

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
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" />
    </svg>
</article>
⠀
```

```html {0-100|2-5}
<article>
  <math display="inline">
    <mn>2</mn>
    <mi>π</mi>
  </math>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" />
  </svg>
</article>
```
````

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

Который работает уже по стандарту XML и опереирует другими методами для взаимодействия, тут уже простым createElement не отделаться

Или даже вообще захотим вывести математическую формулу используя MathML? Тут тоже самое как с svg нужны особые методы

Но не стоит переживать, Vue дает нам дополнительный параметр namespace, который сообщит нам в каком окружении создается элемент: undefined, если оно не задано, те обычный HTML, либо svg и mathml соответственнл

Vue понимает это автоматически, либо из параметра при создании приложения, либо создавая элементы последовательно понимает что, ага, тут начался svg и внутри него все это namespace svg.

Давайте доработает наш пример, чтобы наши картинки и формулы, все еще работали на страничке
-->

---
layout: cover
---

# createElement

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
Но что если мы хотим вывести не картинку или формулу, а список. И не простой список, а список который работает на основе веб компонентов. у HTML для этого есть специальное свойство is в котором указывается в рамках какого кастомного элоемента нужно сделать вывод.

Ну а Vue заботливо нам отдельно передаст этот атрибут при необходиомти. Нам остается лишь его применить вот таким образом
-->

---
layout: cover
---

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
а скорее какой-то такой. Нужно ещше дополнительно обучить наши элементы и ноды вкладываться в друг друга, для этого нужен метод insert

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

# setElementText

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
Vue видит, что элементы h1 и div содержат в себе только текст. Поэтому вместо создания текстовой ноды с нужным текстом, он пытается сразу изменить текст элемента. Еслиб бы у нас был div, то тут бы уже Vue понял, что отвертеться не выйдет и он должен создать текстовую ноду. Однако мы не можем всегда следить за такими бесполезными вставками, поэтому уступим Vue  реализуем все-таки метод setElementText

Мы получим на вход элемент которому нужно происзвести замену и сам текст

Для DOM достаточно просто установить значение textContent
-->

---
layout: cover
---

# Ура!

> TODO! Вставить демку

<!--
Теперь проверяем и ура! Все выводится!
-->
