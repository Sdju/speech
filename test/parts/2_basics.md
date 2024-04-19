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
  e-dom: 461,97,71,32
  e-string: 579,158,71,32
  e-canvas: 559,375,71,32
  e-pdf: 364,381,71,32
  e-fan: 320,162,71,32
  a-1: 486,129,10,102
  a-2: 565,169,10,102,55
  a-3: 547,291,10,102,137
  a-4: 424,289,10,102,223
  a-5: 404,170,10,102,-58
  vue: 461,250,60,60
---

<svg v-drag="'vue'" class="absolute top-0" width="60" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.32 170.02">
  <path fill="#42b883" d="M120.83 0L98.16 39.26 75.49 0H0l98.16 170.02L196.32 0h-75.49z"/>
  <path fill="#35495e" d="M120.83 0L98.16 39.26 75.49 0H39.26l58.9 102.01L157.06 0h-36.23z"/>
</svg>

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

```html {1,2,5}
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

```html {1,2,5|3,7|6}
<article> <- Element / HostElement
    <h1> <- Element / HostElement
        Простой пример верстки
    </h1>
    <div> <- Element / HostElement
        <!-- тут могут быть комментарии -->
        Текст статьи про верстку
    </div>
</article>
```

```html {3,7,6}
<article> <- Element / HostElement
    <h1> <- Element / HostElement
        Простой пример верстки <- Node
    </h1>
    <div> <- Element / HostElement
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

```html {3,7,6}
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

<ul>
  <li v-click="3">

`HostElement` - это **Element** окружения

</li>
<li v-click="9">

`HostNode` - это **Node** окружения

<ul>
<li v-click="10">Может быть текстовой нодой</li>
<li v-click="11">Может быть комментарием</li>
<li v-click="12"><strong>HostElement</strong> это расширение <strong>HostNode</strong></li>
</ul></li></ul>

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

<div class="grid grid-cols-[170px_1fr] gap-2" >
<FileTree :files="[{
    type: 'folder',
    name: 'src/assets'
  }, {
    type: 'typescript',
    name: 'src/renderer/index.ts',
    highlighted: true
  }, {
    type: 'vue',
    name: 'src/App.vue',
  }, {
    type: 'typescript',
    name: 'src/main.ts',
  }
]" />

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

</div>

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

<div class="grid grid-cols-[170px_1fr] gap-2" >
<FileTree :files="[{
    type: 'folder',
    name: 'src/assets'
  }, {
    type: 'typescript',
    name: 'src/renderer/index.ts',
  }, {
    type: 'vue',
    name: 'src/App.vue',
  }, {
    type: 'typescript',
    name: 'src/main.ts',
    highlighted: true
  }
]" />

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

</div>

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

<div class="grid grid-cols-[170px_1fr] gap-2 h-[100%]" >
<FileTree :files="[{
    type: 'folder',
    name: 'src/assets'
  }, {
    type: 'typescript',
    name: 'src/renderer/index.ts',
  }, {
    type: 'typescript',
    name: 'src/renderer/nodeOps.ts',
    highlighted: true
  }, {
    type: 'vue',
    name: 'src/App.vue',
  }, {
    type: 'typescript',
    name: 'src/main.ts'
  }
]" />

<div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-2 relative">
<div v-click.hide="2" class="absolute top-0">

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

</div>
<div v-click="2" class="absolute top-0">

```
// [!code word:createComment]
renderer-temp.ts:8 Uncaught (in promise) Error: no-op: createElement
  ...
```

</div>
</div>
</div>

<!--
Теперь осталось лишь самое важное:
описать все возможные методы для нашего с вами рендерера. 

Но для начала полезно завести вот такой метод noop. Он будет нам подсвечивать, когда какой-то из методов рендерера еще не реализован. Таким образом мы можем с этим справиться постепенно.

А вот и весь список всех возможных методов рендерера во Vue. По началу этот список может напгугать своим количеством. Но мы с вами последовательно изучим эти методы

Поэтому не особо откладыва начинаем их изучение

Правда если мы сейчас запустим проект, то будет пустая страничка и примерно вот такая ошибка.

Это знгачи, что все хорошо и наш рендерер подцепился и уже пытается брать методы рендерера. Но так как они еще не реализованы, то выкидывается лишь наша заглушка.
-->
