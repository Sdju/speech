---
layout: cover
---

<script setup lang="ts">
import { ref, onUnmounted, getCurrentInstance, watch } from 'vue';
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


⠀
```

```vue
<template>
    <article class="example">
        <h1 :style="{color: red}">
            Простой пример верстки
        </h1>
        <div :data-count="count">
            С таймером {{ count }}
            <button 
              @click="count++"
             >
              +
            </button>
        </div>
    </article>
</template>
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
            <button 
              v-if="count > 5"
              @click="count++"
            >
              +
            </button>
        </div>
    </article>
</template>
```
````

<div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-4">
  <div class="relative">
    <pre v-click="2" class="absolute top-0 text-[0.6rem]" >
renderer-temp.ts:8 Uncaught (in promise) Error: no-op: createComment
    at noop (renderer-temp.ts:8:9)
    at createComment (renderer-temp.ts:52:26)
    at processCommentNode (runtime-core.esm-bundler.js:5397:17)
    at patch (runtime-core.esm-bundler.js:5299:9)
    at mountChildren (runtime-core.esm-bundler.js:5583:7)
    at mountElement (runtime-core.esm-bundler.js:5490:7)
    at processElement (runtime-core.esm-bundler.js:5455:7)
    at patch (runtime-core.esm-bundler.js:5323:11)
    at mountChildren (runtime-core.esm-bundler.js:5583:7)
    at mountElement (runtime-core.esm-bundler.js:5490:7)
    </pre>
    <div v-click.hide="2" class="absolute top-0 text-lg" >
        <article class="b-1 p-4">
          <h1 class="c-red">
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

<script setup>
$doubleClick($renderContext, 1)
</script>

# Оптимизация вставки

````md magic-move
```html
<template>
    <article class="example">
        <h1 style="color: red">
            Простой пример верстки
        </h1>
        <div>
            С таймером 0
        </div>
    </article>
</template>


⠀
```

```html {*|8}
<template>
    <article class="example">
        <h1 style="color: red">
            Простой пример верстки
        </h1>
        <div>
            С таймером 0
            <!-- v-if -->
        </div>
    </article>
</template>

⠀
```

```html
<template>
    <article class="example">
        <h1 style="color: red">
            Простой пример верстки
        </h1>
        <div>
            С таймером 5
            <button>
              +
            </button>
        </div>
    </article>
</template>
```
````

---
layout: cover
---

# createComment

````md magic-move
```ts
({
  createComment: (text: string) => ...,
})
```

```ts
({
  createComment: (text: string) => document.createComment(text),
})
```
````

<v-clicks>

- Нужен для оптимизации рендеринга `v-if`
- Для гидратации
- Для `<Transition />`

</v-clicks>

---
layout: cover
---

# remove

````md magic-move
```ts
({
  remove: (child: HostNode) => { ... }
})

⠀
```

```ts
({
  remove: (child: Node) => {
    child.parentNode.removeChild(child)
  }
})
```

```ts
({
  remove: (child: Node) => {
    child.parentNode?.removeChild(child)
  }
})
```
````


---
layout: cover
---

# Все заработало!

<script setup lang="ts">
import {ref, onUnmounted, getCurrentInstance, watch} from 'vue'; 
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

<div class="grid grid-cols-[330px_1fr] gap-2" >

```html
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

setInterval(() => count.value++, 1000);
</script>
<template>
    <article class="example">
        <h1 style="color: red">
            Простой пример верстки
        </h1>
        <div>
            С таймером {{count}}
            <button
                v-if="count > 5"
                @click="count++"
            >
              +
            </button>
        </div>
    </article>
</template>
```

<div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-4">
  <div class="relative">
    <div class="absolute top-0 text-lg" >
        <article class="b-1 p-4">
          <h1 class="c-red">
              Простой пример верстки
          </h1>
          <div class="relative">
            С таймером {{count}}
          </div>
          <button
              v-if="count > 5"
              class="bg-[#333] w-[100px] rd-2 mt-2"
              @click="count++"
          >
            +
          </button>
        </article>
    </div>
  </div>
</div>
</div>

---
layout: cover
---

```ts
const nodeOps = {
  // ...
  querySelector: () => noop('querySelector'),
  setScopeId: () => noop('setScopeId'),
  cloneNode: () => noop('setScopeId'),
  insertStaticContent: () => noop('insertStaticContent'),
}
```

---
layout: cover
---

# querySelector

````md magic-move
```ts
({
  querySelector: (selector: string) => ...,
})
```

```ts
({
  querySelector: (selector: string) => document.querySelector(selector),
})
```
````

<div mt-5 />
<v-click>

- Нужен для работы `<Teleport />`

```html
// [!code word:to]
<Teleport to="body">
    Hello!
</Teleport>
```

</v-click>


---
layout: cover
---

<script setup>
$doubleClick($renderContext, 2)
</script>

# setScopeId

````md magic-move
```vue
<style>
.exmaple { ... }
</style>
```

```vue
<style scoped>
.exmaple { ... }
</style>
```

```vue {*|2}
<style>
.exmaple[data-v-7ba5bd90] { ... }
</style>
```
````

<v-click>

````md magic-move
```ts
({
  setScopeId(
    el: HostElement,
    id: string
  ) { ... }
})

⠀
```

```ts
({
  setScopeId(
    el: HostElement,
    id: string
  ) {
    el.setAttribute(id, '')
  }
})
```
````

</v-click>

---
layout: cover
---

# cloneNode / insertStaticContent

```ts
({
  cloneNode: () => noop('setScopeId'),
  
  insertStaticContent: () => noop('insertStaticContent'),
})
```

<div mb-5 />

- Только для `@vue/compiler-dom`
