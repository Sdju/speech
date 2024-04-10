---
layout: cover
---

# Добавляем динамики

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
</script>
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

# Заработало!

> TODO! Вставить демку

---
layout: cover
---

# Добавим пунктик

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

---
layout: cover
---

# Вновь ошибка

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

# Добавляем стиля

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

---
layout: cover
---

# Запуск

> TODO! Сделать скрин с финальной демкой
