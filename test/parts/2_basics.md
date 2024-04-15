---
layout: cover
---

<img src="/img/lifecycle.png" class="h-[500px] m-a" />

<!--
Но для начала вот знакомая всем картинка. Для тех кто ее видит впервые: это у нас жизненный цикл компонента.
И в целом здесь нет ничего сложного, но давайте немного упростим эту схему оставив самое важное для нас на сегодня
-->

---
layout: center
clicks: 2
---

<div class="flex flex-col justify-center items-center relative">
  <VueGraph label="Компонент" class="mb-14" />
  <ZedeArrow x1="65" y1="33" x2="65" y2="87" color="#DADADA" />
  <VueGraph label="Вызов render" class="mb-14"  />
  <ZedeArrow x1="65" y1="123" x2="65" y2="175" color="#DADADA" />
  <VueGraph label="Vue" class="mb-14" :color="$clicks > 0 ? '#10655B' : undefined" />
  <ZedeArrow x1="65" y1="210" x2="65" y2="262" color="#DADADA" />
  <VueGraph label="DOM" :color="$clicks > 0 ? '#10655B' : undefined" />
  <VueLabel label="VDOM" class="absolute top-[134px]" />
  <VueLabel v-if="$clicks > 0" :label="$clicks === 1 ? 'Магия' : 'renderer'" class="absolute top-[220px]" />
</div>

<v-click at="2">

## Никакой магии нет!

</v-click>

<!--
И так...

У нас есть некоторый экземпляр компонента, и он в какой-то момент при монтировании вызывает функцию рендера. 

Результатом этой функции является некоторый VDOM

Мы отдаем его Vue...
Дальше что-то происходит и мы радостные видим рендер на страничке

Но что же за магия происходит в момент между этапом отдачи VDOM до его отобажения в реальный DOM?

Конечно же никакой магии нет. И эту магию можно называть: рендерером
-->

---
layout: cover
---

# Vue renderer

**Renderer** - Механизм связи между **VDOM** и **host-средой**

<v-click>

**Host-среда** - окружение в рамках которого работает приложение

</v-click>

<!--
По своей сути Renderer это то самое соединительное звено, которое помогает превратить виртуальный дом в полне себе реальный.

Но только лишь домом возможности рендерера не ограничиваются. Это может нечто другое, поэтому оно называется Host-средой. Соответственно, Host-среда - это окружения в рамках которого может работать приложение.
-->

---
layout: cover
dragPos:
  e-dom: 463,101,71,32
  e-string: 580,159,71,32
  e-canvas: 558,383,71,32
  e-pdf: 357,382,71,32
  e-fan: 320,162,71,32
  a-1: 486,129,10,102
  a-2: 565,169,10,102,55
  a-3: 550,298,10,102,137
  a-4: 420,297,10,102,222
  a-5: 404,170,10,102,-58
---

<div class="w-[min-content] line-height-[60px] text-center p-3 aspect-ratio-1/1 p-1 rd-full text-4xl w-[max-content] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Vue</div>

<div v-click="1" v-drag="'e-dom'" class="text-2xl w-[max-content]" >DOM</div>
<div v-click="2" v-drag="'e-string'" class="text-2xl w-[max-content]" >string</div>
<div v-click="3" v-drag="'e-canvas'" class="text-2xl w-[max-content]" >canvas</div>
<div v-click="4" v-drag="'e-pdf'" class="text-2xl w-[max-content]" >PDF</div>
<div v-click="5" v-drag="'e-fan'" class="text-2xl w-[max-content]" >WebGL</div>
<div v-click="1" v-drag="'a-1'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-click="2" v-drag="'a-2'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-click="3" v-drag="'a-3'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-click="4" v-drag="'a-4'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>
<div v-click="5" v-drag="'a-5'">
<ZedeArrow inert x1="435" y1="206" x2="435" y2="114" color="#DADADA" />
</div>

<!--
И как мы понимаем это может быть как DOM-ом, так и, например, строкой для SSR, каким-то рендером в canvas, рендером pdf-документа и вообще чем угодно на что только хватит нашей фантазии
-->

---
layout: cover
---

# Vue custom renderer

**Custom Renderer** - пользовательский адаптер между **Vue** и **Host-средой**.

<v-click>

````md magic-move
```vue {*|7|4}
<script setup lang="ts">
import { ref } from 'vue'
  
const myRef = ref<unknown>()
</script>
<template>
  <div ref="myRef" />
</template>
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
  
const myRef = ref<HTMLDivElement>()
</script>
<template>
  <div ref="myRef" />
</template>
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
  
const myRef = ref<CanvasElement>()
</script>
<template>
  <div ref="myRef" />
</template>
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
  
const myRef = ref<HostElement>()
</script>
<template>
  <div ref="myRef" />
</template>
```
````

</v-click>

<!--
Но чтобы научить наше Vue приложение общаться не только с DOM, то нужно его научить работать с этим окружением. Именно этим и занимается custom renderer

И важный момент связан с тем, что то что мы получаем в template ref это и есть тот самый элемент внешнего мира, те Host-среды.

Именно поэтому, когда мы используем Vue приложение в DOM, то ref получают значения типа Element

Но если бы мы рендерились например в canvas то сюда мог бы прийти CanvasElement и тому подобное

Поэтому можно сказать, что ref получает значение типа HostElement
-->

---
layout: cover
---

# Небольшой пример

````md magic-move
```html {*|1,2,5}
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        <!-- тут могут быть комментарии -->
        Текст статьи про верстку
    </div>
</article>
```

```html {1,2,5|3,7|6}
<article> <- Element
    <h1> <- Element
        Простой пример верстки
    </h1>
    <div> <- Element
        <!-- тут могут быть комментарии -->
        Текст статьи про верстку
    </div>
</article>
```

```html {3,7,6|*}
<article> <- Element
    <h1> <- Element
        Простой пример верстки <- Node
    </h1>
    <div> <- Element
        <!-- тут могут быть комментарии --> <- Node
        Текст статьи про верстку <- Node
    </div>
</article>
```

```html {3,7|6}
<article> <- Element
    <h1> <- Element
        Простой пример верстки <- TextNode
    </h1>
    <div> <- Element
        <!-- тут могут быть комментарии --> <- CommentNode
        Текст статьи про верстку <- TextNode
    </div>
</article>
```

```html {3,7,6|1,2,4,5,8,9}
<article> <- HostElement
    <h1> <- HostElement
        Простой пример верстки <- HostNode
    </h1>
    <div> <- HostElement
        <!-- тут могут быть комментарии --> <- HostNode
        Текст статьи про верстку <- HostNode
    </div>
</article>
```
````

<v-clicks depth="2">

- `HostElement` - это **Element** окружения
- `HostNode` - это **Node** окружения
  - может быть текстовой нодой
  - может быть комментарием
  - `HostElement` это также `HostNode`

</v-clicks>

<!--
Давайте еще разберем небольшой примерчик

Мы уже с вами поняли, что template ref принимает элементы, а именно HostElement-ы

Но что же тогда это? А это?

Если мы вспомним DOM, то там еще кроме понятия Element, есть еще понятия Node

Если мы же помним DOM очень хорошо, то вспомним что это не просто Node, а TextNode и CommentNode

Таким образом Node для рендерера это HostNode. И еще важный момент, что каждый HostElement это еще и HostNode, прямо как в HTML Element это Node с типом Element

Таким образом, для рендерера важно 2 типа: HostNode и HostElement

Причем стоит учитывать, что HostNode может быть еще как текстовой, так и комментарием
-->

---
layout: cover
---

# Renderer Example

````md magic-move
```ts
import { createRenderer } from '@vue/runtime-core'


⠀

⠀
```

```ts
import { createRenderer } from '@vue/runtime-core'


const renderer = createRenderer<HostNode, HostElement>( ... )

⠀
```

```ts
import { createRenderer } from '@vue/runtime-core'
import { nodeOps } from './nodeOps'

const renderer = createRenderer<HostNode, HostElement>(nodeOps)

⠀
```

```ts
import { createRenderer } from '@vue/runtime-core'
import { nodeOps } from './nodeOps'

const renderer = createRenderer<Node, Element>(nodeOps)

⠀
```

```ts
import { createRenderer } from '@vue/runtime-core'
import { nodeOps } from './nodeOps'

const renderer = createRenderer<Node, Element>(nodeOps)

export const createApp = renderer.createApp
```
````

<!--
Теперь давайте посмотрим что нам нужно, чтобы реализовать свой собственный простейший рендерер

Здесь мы видим, что мы импортируем createRenderer из пакета @vue/runtime-core

Далее мы создаем инстанс рендерера вызвав эту функцию и передав в нее 2 типа это HostNode и HostElement

Ну и самая важная часть: это передать список методов, которые может вызывать рендерер для общения с Host-средой

Так как их много, то обычно все его выносят в файл nodeOps

Мы с вами попробуем написать простейший рендерер на основе DOM, так как это среда под которую рендерер лучше всего заточен. Поэтому в качестве типов подставляем Node и Element

Теперь нам остается лишь отдать из рендерера функцию создания приложения createApp. И на этом все
-->

---
layout: cover
---

# Подключаем рендерер

### main.ts
````md magic-move
```ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

```ts
import { createApp } from './renderer'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

```ts
import { createApp } from './renderer'
import App from './App.vue'

const app = createApp(App)
app.mount(document.querySelector('#app'))
```
````

<!--
Теперь мы хотим использовать наш супер-пупер рендерер, вместо дефолтного вьюшного

Поэтому меняем импорт с vue на на наш файл renderer

И еще один важный момент: возможность монтирования не берется с воздуха и мы ее не реализовали, поэтому пока передадим корневой элемент самостоятельно

Вот и все
-->

---
layout: cover
---

# Подготовка

### nodeOps.ts
````md magic-move
```ts
function noop(fn: string): any {
  throw Error(`no-op: ${fn}`)
}
















⠀
```

```ts
function noop(fn: string): any {
  throw Error(`no-op: ${fn}`)
}

const nodeOps = {
  patchProp: () => noop('patchProp'),
  insert: () => noop('insert'),
  remove: () => noop('remove'),
  createElement: () => noop('createElement'),
  createText: () => noop('createText'),
  createComment: () => noop('createComment'),
  setText: () => noop('setText'),
  setElementText: () => noop('setElementText'),
  parentNode: () => noop('parentNode'),
  nextSibling: () => noop('nextSibling'),
  querySelector: () => noop('querySelector'),
  setScopeId: () => noop('setScopeId'),
  cloneNode: () => noop('setScopeId'),
  insertStaticContent: () => noop('insertStaticContent'),
}
```

````

<!--
Теперь осталось лишь самое важное:
описать все возможные методы для нашего с вами рендерера. 

Но для начала полезно завести вот такой метод noop. Он будет нам подсвечивать, когда какой-то из методов рендерера еще не реализован. Таким образом мы можем с этим справиться постепенно.

А вот и весь список всех возможных методов рендерера во Vue. По началу этот список может напгугать своим количеством. Но мы с вами последовательно изучим эти методы

Поэтому не особо откладыва начинаем их изучение
-->

---
layout: cover
---

# Запуск

```
// [!code word:createComment]
renderer-temp.ts:8 Uncaught (in promise) Error: no-op: createElement
  ...
```

<!--
Правда если мы сейчас запустим проект, то будет пустая страничка и примерно вот такая ошибка.

Это знгачи, что все хорошо и наш рендерер подцепился и уже пытается брать методы рендерера. Но так как они еще не реализованы, то выкидывается лишь наша заглушка.
-->
