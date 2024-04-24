---
layout: cover
---

# Добавляем динамики

<div class="grid grid-cols-[310px_1fr] gap-2" >

````md magic-move
```vue
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






⠀
```

```vue
<template>
    <article>
        <h1>
            Простой пример верстки
        </h1>
        <div>
            С таймером
        </div>
    </article>
</template>






⠀
```

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
<template>
    <article>
        <h1>
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
        </div>
    </article>
</template>

⠀
```

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

setInterval(() => count.value++, 1000)
</script>
<template>
    <article>
        <h1>
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
        </div>
    </article>
</template>
```
````

<div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-4">
  <div class="relative">
    <pre v-click="3" class="absolute top-0 text-[0.6rem]" >
renderer-temp.ts:8 Uncaught Error: no-op: parentNode
    at noop (renderer-temp.ts:8:9)
    at parentNode (renderer-temp.ts:35:27)
    at mountElement (runtime-core.esm-bundler.js:5488:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at mountChildren (runtime-core.esm-bundler.js:5583:7)
    at mountElement (runtime-core.esm-bundler.js:5490:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:6011:11)
    </pre>
    <div v-click.hide="3" class="absolute top-0 text-lg" >
        <article>
          <h1>
              Простой пример верстки
          </h1>
          <div class="relative">
            <div v-click.hide="1" class="absolute top-0">
              Текст статьи про верстку
            </div>
            <div v-click="1" class="absolute top-0">
                С таймером 
                <span v-click="2">0</span>
            </div>
          </div>
        </article>
    </div>
  </div>
</div>
</div>

<!--
Однгако выводить только статику.. немного скучно, иначе зачем нам для этого Vue. Добавим немного жизни нашему компоненту

Давайте хотябы выведем счетчик по таймеру и будем обновлять его каждую секунду

Теперь чтобы это реальзовать нам нужно будет поработать еще с несколькими методами
-->

---
layout: cover
---

# nextSibling / parentNode

````md magic-move
```ts {*|2|4|*}
({
  parentNode: (node: HostNode) => ...,

  nextSibling: (node: HostNode) => ...,
})
```

```ts
({
  parentNode: (node: Node) => node.parentNode,

  nextSibling: (node: Node) => node.nextSibling,
})
```
````

<!--
И вот 2 близких по смыслу метода, которые являются "глазами для vue" и позволяют делать относительные вставки, быстро находить что к чему относитеся.

Первый метод, как можно догадаться по названию нужен для взятия родителя у текущей ноды

А второй метод для взятия следующего дочернего компонента после нашего

С помощью DOM мы реализуем это невероятно просто воспользовавшись свойствами с такими же именами
-->

---
layout: cover
---
<script setup lang="ts">
import { ref, onUnmounted,getCurrentInstance, watch } from 'vue';
import {useNav} from "@slidev/client"; 

const count = ref(0);

const instance = getCurrentInstance();
const { currentSlideNo } = useNav();
watch(currentSlideNo, (id) => {
  if (id === instance.setupState.$page) {
    count.value = 0
  }
});

const id = setInterval(() => count.value++, 1000);
onUnmounted(() => clearInterval(id));
</script>

<div class="grid grid-cols-[310px_1fr] gap-2" >

````md magic-move
```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

setInterval(() => count.value++, 1000)
</script>
<template>
    <article>
        <h1>
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
        </div>
    </article>
</template>
⠀
```

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

setInterval(() => count.value++, 1000)
</script>
<template>
    <article>
        <h1>
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
            <h2> Следующий пункт </h2>
        </div>
    </article>
</template>
```
````

<div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-4">
  <div class="relative">
    <pre v-click="1" class="absolute top-0 text-[0.6rem]" >
renderer-temp.ts:8 Uncaught Error: no-op: setText
    at noop (renderer-temp.ts:8:9)
    at setText (renderer-temp.ts:35:27)
    at mountElement (runtime-core.esm-bundler.js:5488:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at mountChildren (runtime-core.esm-bundler.js:5583:7)
    at mountElement (runtime-core.esm-bundler.js:5490:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:6011:11)
    </pre>
    <div v-click.hide="1" class="absolute top-0 text-lg" >
        <article>
          <h1>
              Простой пример верстки
          </h1>
          <div class="relative">
            С таймером {{count}}
          </div>
        </article>
    </div>
  </div>
</div>
</div>

---
layout: cover
---

# setText

````md magic-move
```html
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        С таймером 0
    </div>
</article>
⠀
```

```html {5,6}
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div> <- setElementText 
        С таймером 0
    </div>
</article>
⠀
```

```html
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        С таймером 0
        <h2> Следующий пункт </h2>
    </div>
</article>
```

```html {6}
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        С таймером 0 <- setText
        <h2> Следующий пункт </h2>
    </div>
</article>
```

```html
<article>
    <h1>
        Простой пример верстки
    </h1>
    <div>
        С таймером 1
        <h2> Следующий пункт </h2>
    </div>
</article>
```
````

<v-click>

````md magic-move
```js
({
  setText: (
    node: HostNode,
    text: string
  ) => { ... },
})

⠀
```

```js
({
  setText: (
    node: Node,
    text: string
  ) => {
    node.nodeValue = text
  },
})
```
````

</v-click>

---
layout: cover
---

<script setup lang="ts">
import {ref, onUnmounted, getCurrentInstance, watch} from 'vue'; 
import {useNav} from "@slidev/client"; 

const instance = getCurrentInstance();
const { currentSlideNo } = useNav();
watch(currentSlideNo, (id) => {
  if (id === instance.setupState.$page) {
    count.value = 0
  }
});

const count = ref(0);

const id = setInterval(() => count.value++, 1000);
onUnmounted(() => clearInterval(id));
</script>

<div class="grid grid-cols-[310px_1fr] gap-2" >

````md magic-move
```vue
<template>
    <article>
        <h1>
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
        </div>
    </article>
</template>








⠀
```

```vue
<template>
    <article class="example">
        <h1>
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
        </div>
    </article>
</template>
<style>
.example {
  border: 1px solid black;
  padding: 1em;
}
</style>


⠀
```

```vue
<template>
    <article class="example">
        <h1 :style="{color: red}">
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
        </div>
    </article>
</template>
<style>
.example {
  border: 1px solid black;
  padding: 1em;
}
</style>


⠀
```

```vue
<template>
    <article class="example">
        <h1 :style="{color: red}">
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
            <button>
              +
            </button>
        </div>
    </article>
</template>
<style>
.example {
  border: 1px solid black;
  padding: 1em;
}
</style>
```

```vue
<template>
    <article class="example">
        <h1 :style="{color: red}">
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
            <button @click="count++">
              +
            </button>
        </div>
    </article>
</template>
<style>
.example {
  border: 1px solid black;
  padding: 1em;
}
</style>
```

```vue
<template>
    <article class="example">
        <h1 :style="{color: red}">
            Простой пример верстки
        </h1>
        <div :data-count="count">
            С таймером {{ count }}
            <button @click="count++">
              +
            </button>
        </div>
    </article>
</template>
<style>
.example {
  border: 1px solid black;
  padding: 1em;
}
</style>
```
````

<div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-4">
  <div class="relative">
    <pre v-click="1" class="absolute top-0 text-[0.6rem]" >
renderer-temp.ts:8 Uncaught Error: no-op: patchProp
    at noop (renderer-temp.ts:8:9)
    at patchProp (renderer-temp.ts:35:27)
    at mountElement (runtime-core.esm-bundler.js:5488:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at mountChildren (runtime-core.esm-bundler.js:5583:7)
    at mountElement (runtime-core.esm-bundler.js:5490:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:6011:11)
    </pre>
    <div v-click.hide="1" class="absolute top-0 text-lg" >
        <article>
          <h1>
              Простой пример верстки
          </h1>
          <div class="relative">
            С таймером {{count}}
          </div>
        </article>
    </div>
  </div>
</div>
</div>

---
layout: cover
---

# patchProp

````md magic-move
```ts {*|3|4|5-6|*}
({
  patchProp(
    el: HostElement,
    key: string,
    prevValue: any,
    nextValue: any,
  ): void { ... }
})











⠀
```

```ts
({
  patchProp(
    el: Element,
    key: string,
    prevValue: any,
    nextValue: any,
  ): void {
    el.setAttribute(key, nextValue)
  }
})









⠀
```

```ts {*|8-9|10-11|12-13|14-18}
({
  patchProp(
    el: Element,
    key: string,
    prevValue: any,
    nextValue: any,
  ): void {
    if (key === 'style') {
      patchStyles(el, key, prevValue, nextValue)
    } else if (key === 'class') {
      patchClasses(el, key, prevValue, nextValue)
    } else if (key.startsWith('on')) {
      patchEventListeners(el, key, prevValue, nextValue)
    } else if (nextValue === null) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, nextValue)
    }
  }
})
```
````

---
layout: cover
---

# Дополнительные параметры

```ts {7}
({
  patchProp(
    el: Element,
    key: string,
    prevValue: any,
    nextValue: any,
    namespace?: "svg" | "mathml" | undefined
  ): void {  }
})
```

<v-click>

DOM API может немного отличаться в зависимости от namespace

````md magic-move
```ts
// HTML element
el.className = value


⠀
```

```ts
// HTML element
el.className = value

// SVG element
el.setAttribute('class', value)
```
````

</v-click>

---
layout: cover
---

# Дополнительные параметры

```ts {8-11}
({
  patchProp(
    el: Element,
    key: string,
    prevValue: any,
    nextValue: any,
    namespace?: "svg" | "mathml" | undefined,
    prevChildren?: VNode<RendererNode, RendererElement>[],
    parentComponent?: ComponentInternalInstance | null,
    parentSuspense?: SuspenseBoundary | null,
    unmountChildren?: UnmountChildrenFn,
  ): void {  }
})
```

- Нужны для правильной обработке свойств `innerHTML` и `textContent`
