---
layout: cover
---

# Hydration Renderer

```ts
export function createHydrationRenderer(
  options: RendererOptions<Node, Element>,
)
```

```ts
function baseCreateRenderer(
  options: RendererOptions<Node, Element>,
  createHydrationFns: typeof createHydrationFunctions,
): HydrationRenderer
```

---
layout: cover
---

# @vue/runtime-dom

<v-clicks depth="2">

- Нужен для рендеринга в DOM
- Доступен из основного пакета `vue`
- Имеется 2 варианта использования:
  - Для клиентских приложений `createApp`
  - Для серверного рендеринга `createSSRApp`

</v-clicks>

<v-click>

````md magic-move
```ts
import { ... } from '@vue/runtime-dom' // или 'vue'
⠀
⠀
⠀
⠀
⠀
⠀
⠀
```

```ts
import { createSSRApp, createApp } from '@vue/runtime-dom' // или 'vue'
⠀
⠀
⠀
⠀
⠀
⠀
⠀
```

```ts
import { createSSRApp, createApp } from '@vue/runtime-dom' // или 'vue'
import App from 'App.vue'

const app = createApp(App)
// или  
const app = createSSRApp(App)
⠀
⠀
```

```ts
import { createSSRApp, createApp } from '@vue/runtime-dom' // или 'vue'
import App from 'App.vue'

const app = createApp(App)
// или  
const app = createSSRApp(App)

app.mount('#app')
```
````

</v-click>

---
layout: cover
---

# @vue/server-renderer

<v-clicks depth="2">

- Нужен для рендеринга на стороне сервера
- Доступен из основного пакета `vue` через `vue/server-renderer`
- Имеется 2 варианта использования:
  - Рендеринг в строку `renderToString`
  - Рендеринг в поток `renderToNodeStream` / `renderToWebStream` / `renderToSimpleStream`
- Не реализовывает возможности рендерера для интерактивности

</v-clicks>

<v-click>

````md magic-move
```ts
import { createSSRApp, createApp } from '@vue/runtime-dom' // или 'vue'
import App from 'App.vue'

const app = createApp(App)
// или  
const app = createSSRApp(App)

app.mount('#app')
```

```ts
import { createSSRApp } from '@vue/runtime-dom'
import App from 'App.vue'

const app = createSSRApp(App)

app.mount('#app')
⠀
⠀
```

```ts
import { createSSRApp } from '@vue/runtime-dom'

import App from 'App.vue'

const app = createSSRApp(App)

app.mount('#app')
⠀
```

```ts
import { createSSRApp } from '@vue/runtime-dom'
import { renderToString } from 'vue/server-renderer'
import App from 'App.vue'

const app = createSSRApp(App)

renderToString(app)
⠀
```

```ts
import { createSSRApp } from '@vue/runtime-dom'
import { renderToString } from 'vue/server-renderer'
import App from 'App.vue'

const app = createSSRApp(App)

renderToString(app).then((html) => { sendToUser(html) })
⠀
```
````

</v-click>

---
layout: cover
---

# @vue/runtime-test

<v-clicks>

- Нужно лишь для внутреннего использования в репозитории `@vue/core`
- Наиболее простой из всех рендереров
- Для разработчиков `@vue/test-utils`

</v-clicks>