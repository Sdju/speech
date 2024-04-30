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
Однако выводить только статику.. немного скучно, иначе зачем нам для этого Vue. Добавим немного жизни нашему компоненту

Давайте хотя бы выведем счетчик по таймеру и будем обновлять его каждую секунду

Теперь чтобы это реализовать нам нужно будет поработать еще с несколькими методами
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
И вот 2 близких по смыслу метода, которые являются "глазами для vue" и позволяют делать относительные вставки, быстро находить что к чему относится.

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

<!--
И так, таймер у нас работает. Но давайте добавим немного текста после него

И вот нам вновь нехватает какого-то метода для работы с текстом.
-->

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

<!--
Что же теперь пошло не так

Мы уже выяснили, что Vue по возможности старается использовать нгаиболее оптимальные методы работы с DOM, когда это возможно, поэтому пока у нас в div только текст, то там у нас setElementText

Если же добавить h2, то напрямую манипулировать текстом элемента не получится. Нужно менять значение неопсредственно у текстовой ноды

Именно поэтому он использует метод setText. И при неоюходимости заменяет текст у ноды на нужный

Метод содержит 2 аргумента: node у которого будет происходить замена и text который необходимо вывести

Мы используем параметр nodeValue и устанавливаем нужный текст
-->

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

<!--
Наше приложение все еще слишком скучное.

Давайте добавим ему чуть больше стиля: классы и сделаем заголовок красным

Добавим кнопку по которой сможем кликать и увеличивать значение

И выведем дата-атрибут

Вроде как мы сделали много разных действий. Но для Vue это все работа с пропами VNode.
-->

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

<!--
И так со всем этим нам поможет разобраться метод patchProp. Он принимает в себя 4 параметра:

- элемент которому необходимо заменить проп
- имя пропа которое необходимо изменить
- и следующее значение с предыдущим

Наивная реализация могла бы выглядеть как-то так:
мы просто берем и устанавливаем аттрибут у элемента

Однако если заглянем в исходники Vue, то увидим нечто подобное. И это тоже большое упрощение:

Во первых нужно отдельно разобрать работу со стилями, так как их обработку можно перложить на работу с аттрибутом style

Далее необходимо обработать классы. У него тоже есть дополнительные поля как class и classList

Ну а со слушателями тем более. Тут их не навесишь особо через простую работу с аттрибутом. Тут уже нужны addEventListener / removeEventListener. Убираем работу с ними в другой модуль

Ну и даже при простой работе с аттрибутами важно учитывать, что нужно не только уметь добавлять аттрибуты, но и вовремя их удалять
-->

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

<!--
В дополнении к предыдущим 4-ем параметрам есть также как и createElement параметр для namespace-ов.

Так как DOM API может разниться для HTML и SVG. Простой пример:

Для HTML-элемента мы можем поменять класс через поле className, а вот с SVG такой трюк уже не прокатит и нужно его установить явно через метод setAttribute
-->

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

<!--
Кроме того есть 4 дополнительных параметра. Все они нужны для правильной обработки случаев с innerHTML и textContent. Так как это может перетереть все дочерние элементы, а нам важно правильно их удалить и обработать перед очисткой
-->
