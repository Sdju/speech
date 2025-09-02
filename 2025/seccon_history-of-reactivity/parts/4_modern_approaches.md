# Современная эра (2019-2024)

## Svelte: compile-time реактивность (2019)

```svelte
<script>
  let todos = [];
  let newTodo = '';
  
  // Reactive statement - компилируется в оптимизированный код
  $: completedCount = todos.filter(todo => todo.completed).length;
  
  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }];
      newTodo = '';
    }
  }
</script>

<input bind:value={newTodo} on:keydown={(e) => e.key === 'Enter' && addTodo()} />
<button on:click={addTodo}>Add Todo</button>

{#each todos as todo (todo.id)}
  <li>
    <input type="checkbox" bind:checked={todo.completed} />
    <span class:completed={todo.completed}>{todo.text}</span>
  </li>
{/each}

<p>Completed: {completedCount}</p>
```

**Радикальная идея:** компиляция вместо runtime, нет виртуального DOM, минимальный bundle

**Преимущества:** производительность, размер бандла, простота синтаксиса

<!-- Последние 5 лет принесли революционные изменения. Появились подходы, которые переосмысливают саму концепцию реактивности. От compile-time оптимизаций Svelte до signals, которые становятся стандартом. -->

---

# Vue 3: Composition API (2020)

```vue
<script setup>
import { ref, computed } from 'vue';

const todos = ref([]);
const newTodo = ref('');

const completedCount = computed(() => 
  todos.value.filter(todo => todo.completed).length
);

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      completed: false
    });
    newTodo.value = '';
  }
}
</script>

<template>
  <input v-model="newTodo" @keyup.enter="addTodo" />
  <button @click="addTodo">Add Todo</button>
  
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed" />
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
    </li>
  </ul>
  
  <p>Completed: {{ completedCount }}</p>
</template>
```

**Инновации:** Composition API, реактивность на Proxy, script setup синтаксис

<!-- Vue 3 принес Composition API - новый способ организации логики компонентов. Вместо Options API теперь можно группировать связанную логику вместе. Но главное - под капотом появилась новая реактивная система на Proxy. -->

---

# Solid.js: fine-grained реактивность (2021)

```jsx
import { createSignal, createMemo, For } from 'solid-js';

function TodoApp() {
  const [todos, setTodos] = createSignal([]);
  const [newTodo, setNewTodo] = createSignal('');
  
  const completedCount = createMemo(() =>
    todos().filter(todo => todo.completed()).length
  );
  
  const addTodo = () => {
    if (newTodo().trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo(),
        completed: createSignal(false)[0]
      }]);
      setNewTodo('');
    }
  };
  
  return (
    <div>
      <input
        value={newTodo()}
        onInput={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      
      <For each={todos()}>
        {(todo) => (
          <li>
            <input type="checkbox" checked={todo.completed()} />
            <span>{todo.text}</span>
          </li>
        )}
      </For>
      
      <p>Completed: {completedCount()}</p>
    </div>
  );
}
```

**Особенности:** signals для реактивности, нет виртуального DOM, точечные обновления

<!-- Solid.js от Ryan Carniato предложил радикально новый подход. Никакого виртуального DOM, никаких перерендеров компонентов. Только точечные обновления DOM на основе signals. Производительность как у vanilla JS, но с удобством фреймворка. -->

---

# Angular Signals (2024)

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'todo-app',
  template: `
    <input [value]="newTodo()" (input)="updateNewTodo($event)" />
    <button (click)="addTodo()">Add Todo</button>
    
    <ul>
      <li *ngFor="let todo of todos(); trackBy: trackByFn">
        <input
          type="checkbox"
          [checked]="todo.completed()"
          (change)="toggleTodo(todo)"
        />
        <span [class.completed]="todo.completed()">{{ todo.text() }}</span>
      </li>
    </ul>
    
    <p>Completed: {{ completedCount() }}</p>
  `
})
export class TodoComponent {
  todos = signal<TodoItem[]>([]);
  newTodo = signal('');
  
  completedCount = computed(() =>
    this.todos().filter(todo => todo.completed()).length
  );
  
  addTodo() {
    if (this.newTodo().trim()) {
      this.todos.update(todos => [...todos, {
        id: Date.now(),
        text: signal(this.newTodo()),
        completed: signal(false)
      }]);
      this.newTodo.set('');
    }
  }
}
```

**Преимущества:** оптимальная производительность, совместимость с Zone.js, TypeScript integration

<!-- Angular не остался в стороне от signal-революции. В 2024 году signals стали стабильной частью Angular. Это позволило избавиться от некоторых проблем Zone.js и получить более предсказуемую производительность. -->

---

# Svelte 5: Runes эра (2024)

```javascript
let todos = $state([]);
let newTodo = $state('');

// Derived state - автоматически обновляется при изменении todos
let completedCount = $derived(
  todos.filter(todo => todo.completed).length
);

function addTodo() {
  if (newTodo.trim()) {
    todos.push({
      id: Date.now(),
      text: newTodo,
      completed: false
    });
    newTodo = '';
  }
}

// Effect - выполняется при изменении зависимостей
$effect(() => {
  console.log(`Completed todos: ${completedCount}`);
});
```

```svelte
<input bind:value={newTodo} onkeydown={(e) => e.key === 'Enter' && addTodo()} />
<button onclick={addTodo}>Add Todo</button>

{#each todos as todo (todo.id)}
  <li>
    <input type="checkbox" bind:checked={todo.completed} />
    <span class:completed={todo.completed}>{todo.text}</span>
  </li>
{/each}

<p>Completed: {completedCount}</p>
```

**Runes система:** $state, $derived, $effect для более явного управления реактивностью

<!-- Svelte тоже эволюционировал. Svelte 5 представил "runes" - новый синтаксис для реактивности, который делает компилятор еще умнее и дает разработчику больше контроля. -->

---

# Конвергенция к Signals

**Signals в разных фреймворках:**

| Фреймворк | Синтаксис | Статус |
|-----------|-----------|---------|
| Vue 3 | `ref()` / `computed()` | Стабильно |
| Solid | `createSignal()` | Стабильно |
| Angular | `signal()` | Стабильно (2024) |
| Svelte 5 | `$state` / `$derived` | Preview |

**Общие принципы:**
- Fine-grained реактивность
- Автоматическое отслеживание зависимостей  
- Оптимальная производительность
- Композиция и переиспользование логики

<!-- И вот мы подходим к ключевому тренду 2024 года - все фреймворки движутся к signals. Это не случайность. Signals решают фундаментальные проблемы реактивности: они обеспечивают точность обновлений, предсказуемость поведения и отличную производительность. -->

---

# Производительность: сравнение подходов

**JS Framework Benchmark (2024):**

| Подход | Bundle Size | Memory Usage | Performance Score |
|--------|-------------|--------------|-------------------|
| Vanilla JS | 0KB | Низкое | 1.00x |
| Solid | ~7KB | Низкое | 1.05x |
| Svelte | ~10KB | Низкое | 1.10x |
| Vue 3 | ~40KB | Среднее | 1.15x |
| React | ~45KB | Высокое | 1.30x |
| Angular | ~130KB | Высокое | 1.40x |

**Тренды:**
- Signals обеспечивают near-native производительность
- Compile-time оптимизации снижают runtime overhead
- Fine-grained обновления минимизируют work load

<!-- Давайте посмотрим на цифры. Современные подходы показывают впечатляющие результаты в бенчмарках. Signals позволяют достичь производительности, близкой к vanilla JavaScript, сохраняя при этом удобство фреймворка. -->
