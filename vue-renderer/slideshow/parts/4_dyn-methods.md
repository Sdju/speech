---
layout: cover
---

# Модифицируем
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
```

```vue
<template>
    <article class="example">
        <h1 :style="{color: red}">
            Простой пример верстки
        </h1>
        <div>
            С таймером {{ count }}
            <button v-if="count > 5" @click="count++">
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

# Упс!

```
// [!code word:createComment]
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
```

---
layout: cover
---

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

<v-click>

- Нужен для оптимизации рендеринга `v-if`
- Для гидратации
- Для `<Transition />`

</v-click>

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

---
layout: cover
---

# remove

````md magic-move
```ts
({
  remove: (child: HostNode) => { ... }
})
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

> TODO! Демка, что все работает

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

# setScopeId

````md magic-move
```vue
<style>
  ...
</style>
```

```vue
<style scoped>
  ...
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

> Только для @vue/compiler-dom

```ts
({
  cloneNode: () => noop('setScopeId'),
  
  insertStaticContent: () => noop('insertStaticContent'),
})
```
