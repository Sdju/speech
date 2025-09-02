# Детальный анализ подходов к реактивности

## 1. Обычная (нереактивная) модель на событиях и JS Event Loop

### Как выглядит
```javascript
// Прямые DOM манипуляции
document.getElementById('button').addEventListener('click', function() {
  document.getElementById('counter').textContent = 
    parseInt(document.getElementById('counter').textContent) + 1;
});

// jQuery подход
$('#button').click(function() {
  $('#counter').text(parseInt($('#counter').text()) + 1);
});
```

### Какие проблемы решал
- Добавление интерактивности к статичным HTML страницам
- Валидация форм на клиенте
- Простые анимации и эффекты
- AJAX запросы без перезагрузки страницы

### Актуальность
- Используется в простых сайтах
- Legacy проекты
- Прототипирование
- Встраиваемые виджеты

### Сильные стороны
- Простота понимания
- Прямой контроль над DOM
- Малый размер кода
- Нет абстракций
- Быстрый старт разработки

### Слабые стороны
- Сложность поддержки при росте проекта
- Дублирование логики
- Сложное тестирование
- Проблемы с состоянием
- "Спагетти-код"
- Ручное управление памятью

---

## 2. Backbone.js

### Как выглядит
```javascript
// Модель
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

// Коллекция
var TodoList = Backbone.Collection.extend({
  model: Todo
});

// Представление
var TodoView = Backbone.View.extend({
  events: {
    'click .toggle': 'toggleCompleted'
  },
  
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  toggleCompleted: function() {
    this.model.set('completed', !this.model.get('completed'));
  }
});
```

### Какие проблемы решал
- Структурирование JavaScript кода
- Разделение данных и представления
- Управление событиями
- RESTful взаимодействие с сервером
- История браузера (routing)

### Актуальность
- Legacy проекты
- Образовательные цели
- Простые административные панели
- Постепенно заменяется современными решениями

### Сильные стороны
- Четкое разделение ответственности (MVC)
- Небольшой размер библиотеки
- Хорошая документация
- Простая интеграция с jQuery
- Гибкость в структуре проекта

### Слабые стороны
- Много boilerplate кода
- Ручное управление DOM
- Отсутствие data binding
- Сложность синхронизации представлений
- Проблемы с производительностью при большом количестве элементов

---

## 3. Knockout.js

### Как выглядит
```javascript
function TodoViewModel() {
  var self = this;
  
  // Observable свойства
  self.todos = ko.observableArray([]);
  self.newTodoText = ko.observable('');
  
  // Computed свойства
  self.completedCount = ko.computed(function() {
    return self.todos().filter(function(todo) {
      return todo.completed();
    }).length;
  });
  
  // Методы
  self.addTodo = function() {
    if (self.newTodoText().trim()) {
      self.todos.push({
        text: ko.observable(self.newTodoText()),
        completed: ko.observable(false)
      });
      self.newTodoText('');
    }
  };
}

// Применение биндинга
ko.applyBindings(new TodoViewModel());
```

```html
<!-- HTML с data-bind атрибутами -->
<input data-bind="value: newTodoText, valueUpdate: 'input'" />
<button data-bind="click: addTodo">Add Todo</button>

<ul data-bind="foreach: todos">
  <li>
    <input type="checkbox" data-bind="checked: completed" />
    <span data-bind="text: text, css: { completed: completed }"></span>
  </li>
</ul>

<p>Completed: <span data-bind="text: completedCount"></span></p>
```

### Какие проблемы решал
- Автоматическая синхронизация UI и данных
- Декларативное описание связей
- Computed свойства (производные данные)
- Отслеживание изменений
- Упрощение обновления интерфейса

### Актуальность
- Legacy .NET проекты (Microsoft корни)
- Простые административные интерфейсы
- Прототипирование с быстрым data binding
- Постепенно уступает место современным решениям

### Сильные стороны
- Простой в освоении data binding
- Автоматическое отслеживание зависимостей
- Производительные computed свойства
- Декларативный синтаксис в HTML
- Хорошая интеграция с существующими проектами

### Слабые стороны
- Загрязнение HTML data-bind атрибутами
- Ограниченная экосистема
- Отсутствие компонентной архитектуры
- Сложности с комплексной логикой
- Проблемы с SEO (клиентский рендеринг)

---

## 4. MVC (AngularJS, dirty-checking)

### Как выглядит
```javascript
// AngularJS Controller
app.controller('TodoController', function($scope) {
  $scope.todos = [];
  $scope.newTodo = '';
  
  $scope.addTodo = function() {
    if ($scope.newTodo.trim()) {
      $scope.todos.push({
        text: $scope.newTodo,
        completed: false
      });
      $scope.newTodo = '';
    }
  };
  
  $scope.completedCount = function() {
    return $scope.todos.filter(function(todo) {
      return todo.completed;
    }).length;
  };
});
```

```html
<!-- HTML с директивами -->
<div ng-controller="TodoController">
  <input ng-model="newTodo" ng-keyup="$event.keyCode == 13 && addTodo()" />
  <button ng-click="addTodo()">Add Todo</button>
  
  <ul>
    <li ng-repeat="todo in todos">
      <input type="checkbox" ng-model="todo.completed" />
      <span ng-class="{ completed: todo.completed }">{{ todo.text }}</span>
    </li>
  </ul>
  
  <p>Completed: {{ completedCount() }}</p>
</div>
```

### Какие проблемы решал
- Полноценный фреймворк для SPA
- Dependency Injection
- Routing
- Тестируемость
- Структурирование больших приложений
- Автоматическое обновление UI

### Актуальность
- Legacy проекты (много существующих приложений)
- Постепенная миграция на Angular 2+
- Поддержка до конца 2021 года
- Образовательные цели для понимания концепций

### Сильные стороны
- Полный фреймворк "из коробки"
- Двусторонний data binding
- Мощная система директив
- Dependency Injection
- Богатая экосистема
- Хорошая документация и сообщество

### Слабые стороны
- Производительность dirty checking
- Сложная отладка
- Steep learning curve
- $digest loop проблемы
- Проблемы с производительностью на больших списках
- Отсутствие component-based архитектуры (до поздних версий)

---

## 5. RxJS - reactive pipelines

### Как выглядит
```javascript
import { fromEvent, map, filter, debounceTime, distinctUntilChanged } from 'rxjs';

// Поиск с debounce
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('results');

const searchStream = fromEvent(searchInput, 'input')
  .pipe(
    map(event => event.target.value),
    filter(text => text.length > 2),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => 
      fetch(`/api/search?q=${query}`).then(r => r.json())
    )
  );

searchStream.subscribe(results => {
  searchResults.innerHTML = results.map(item => 
    `<li>${item.title}</li>`
  ).join('');
});

// Комбинирование потоков
const clicks = fromEvent(button, 'click');
const timer = interval(1000);

const clicksWithTimer = clicks.pipe(
  switchMap(() => timer.pipe(take(5)))
);
```

### Какие проблемы решал
- Асинхронное программирование
- Композиция сложных потоков данных
- Отмена запросов и операций
- Обработка событий во времени
- Functional Reactive Programming
- Управление состоянием через потоки

### Актуальность
- Активно используется в Angular
- Популярен в сложных enterprise приложениях
- Redux-Observable, RxJS в React
- Микросервисная архитектура
- Real-time приложения

### Сильные стороны
- Мощная композиция операторов
- Декларативный стиль
- Отличная работа с асинхронностью
- Унифицированный API для разных источников данных
- Функциональный подход
- Богатая библиотека операторов

### Слабые стороны
- Высокая сложность обучения
- Memory leaks при неправильном использовании
- Debugging сложности
- Overhead для простых случаев
- Различные версии API (breaking changes)

---

## 6. Zone-based dirty checking (Angular 2+)

### Как выглядит
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'todo-app',
  template: `
    <input [(ngModel)]="newTodo" (keyup.enter)="addTodo()" />
    <button (click)="addTodo()">Add Todo</button>
    
    <ul>
      <li *ngFor="let todo of todos; trackBy: trackByFn">
        <input type="checkbox" [(ngModel)]="todo.completed" />
        <span [class.completed]="todo.completed">{{ todo.text }}</span>
        <button (click)="removeTodo(todo)">Remove</button>
      </li>
    </ul>
    
    <p>Completed: {{ completedCount }}</p>
  `
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodo = '';
  
  get completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }
  
  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({
        id: Date.now(),
        text: this.newTodo,
        completed: false
      });
      this.newTodo = '';
    }
  }
  
  removeTodo(todoToRemove: Todo) {
    this.todos = this.todos.filter(todo => todo !== todoToRemove);
  }
  
  trackByFn(index: number, item: Todo) {
    return item.id;
  }
}
```

### Какие проблемы решал
- Автоматическое отслеживание изменений
- Производительность по сравнению с AngularJS
- TypeScript из коробки
- Компонентная архитектура
- Универсальные приложения (SSR)
- Мобильная разработка

### Актуальность
- Основной подход Angular до версии 17
- Enterprise приложения
- Постепенный переход на Signals
- Много существующих проектов

### Сильные стороны
- Автоматическое отслеживание изменений
- Не требует специальных обёрток для данных
- Хорошая производительность для большинства случаев
- Интеграция с RxJS
- Полная экосистема Angular

### Слабые стороны
- Zone.js может вызывать проблемы
- Сложно понять, когда происходит change detection
- Потенциальные проблемы с производительностью
- Debugging сложности
- Проблемы с некоторыми асинхронными операциями

---

## 7. Push-based reactivity (React)

### Как выглядит
```jsx
import React, { useState, useMemo } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const completedCount = useMemo(() => 
    todos.filter(todo => todo.completed).length,
    [todos]
  );
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add Todo</button>
      
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
          />
        ))}
      </ul>
      
      <p>Completed: {completedCount}</p>
    </div>
  );
}

const TodoItem = React.memo(({ todo, onToggle }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={onToggle}
    />
    <span className={todo.completed ? 'completed' : ''}>
      {todo.text}
    </span>
  </li>
));
```

### Какие проблемы решал
- Предсказуемые обновления UI
- Компонентная архитектура
- Виртуальный DOM для производительности
- Однонаправленный поток данных
- Простота тестирования
- Переиспользование компонентов

### Актуальность
- Доминирующая библиотека в 2024
- Огромная экосистема
- React Native для мобильной разработки
- Next.js, Remix для fullstack
- Активная разработка и развитие

### Сильные стороны
- Простая ментальная модель
- Отличная производительность
- Огромная экосистема
- Хорошее тестирование
- JSX синтаксис
- Hooks для переиспользования логики
- Concurrent режим

### Слабые стороны
- Только библиотека (нужны дополнительные инструменты)
- Boilerplate для простых случаев
- Сложность состояния в больших приложениях
- useEffect complexity
- Bundle size может быть большим

---

## 8. Flux (Redux)

### Как выглядит
```javascript
// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text, id: Date.now() }
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

// Reducer
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      }];
      
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      
    default:
      return state;
  }
};

// Селекторы
const selectCompletedCount = (state) =>
  state.todos.filter(todo => todo.completed).length;

// Компонент
function TodoApp() {
  const todos = useSelector(state => state.todos);
  const completedCount = useSelector(selectCompletedCount);
  const dispatch = useDispatch();
  
  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };
  
  return (
    <div>
      <TodoInput onAdd={handleAddTodo} />
      <TodoList 
        todos={todos} 
        onToggle={(id) => dispatch(toggleTodo(id))} 
      />
      <p>Completed: {completedCount}</p>
    </div>
  );
}
```

### Какие проблемы решал
- Предсказуемое управление состоянием
- Time-travel debugging
- Центральное хранилище данных
- Отделение бизнес-логики от UI
- Тестируемость
- Middleware для асинхронности

### Актуальность
- Все еще популярен в enterprise
- Redux Toolkit упрощает использование
- Конкуренция с Context API и другими решениями
- Хорошо подходит для сложных приложений

### Сильные стороны
- Предсказуемость
- Отличные DevTools
- Middleware экосистема
- Тестируемость
- Time-travel debugging
- Централизованное состояние

### Слабые стороны
- Много boilerplate кода
- Сложность для простых случаев
- Steep learning curve
- Иммутабельность требует осторожности
- Асинхронность требует middleware

---

## 9. Semi-grained reactivity (Vue 2)

### Как выглядит
```vue
<template>
  <div>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Add a todo"
    />
    <button @click="addTodo">Add Todo</button>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          v-model="todo.completed"
        />
        <span :class="{ completed: todo.completed }">
          {{ todo.text }}
        </span>
        <button @click="removeTodo(todo)">Remove</button>
      </li>
    </ul>
    
    <p>Completed: {{ completedCount }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  
  computed: {
    completedCount() {
      return this.todos.filter(todo => todo.completed).length;
    }
  },
  
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          id: Date.now(),
          text: this.newTodo,
          completed: false
        });
        this.newTodo = '';
      }
    },
    
    removeTodo(todoToRemove) {
      const index = this.todos.indexOf(todoToRemove);
      if (index > -1) {
        this.todos.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
```

### Какие проблемы решал
- Простота изучения
- Автоматическая реактивность
- Компонентная архитектура
- Прогрессивное внедрение
- Хорошая производительность
- Единый файл компонента

### Актуальность
- Legacy Vue 2 проекты
- Постепенная миграция на Vue 3
- Все еще поддерживается
- Подходит для небольших проектов

### Сильные стороны
- Простота изучения
- Автоматическое отслеживание зависимостей
- Отличная производительность
- Гибкость (можно использовать частично)
- Хорошая документация
- Single File Components

### Слабые стороны
- Ограничения Object.defineProperty
- Проблемы с массивами
- Нет поддержки TypeScript из коробки
- Магичность может быть проблемой для больших команд
- Ограничения в реактивности (Vue.set)

---

## 10. Compile Time Reactivity (Svelte 1-4)

### Как выглядит
```svelte
<script>
  let todos = [];
  let newTodo = '';
  
  // Reactive statement
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
  
  function toggleTodo(todo) {
    todo.completed = !todo.completed;
    todos = todos; // Trigger reactivity
  }
  
  function removeTodo(todoToRemove) {
    todos = todos.filter(todo => todo !== todoToRemove);
  }
</script>

<main>
  <input
    bind:value={newTodo}
    on:keydown={(e) => e.key === 'Enter' && addTodo()}
    placeholder="Add a todo"
  />
  <button on:click={addTodo}>Add Todo</button>
  
  <ul>
    {#each todos as todo (todo.id)}
      <li>
        <input
          type="checkbox"
          bind:checked={todo.completed}
          on:change={() => toggleTodo(todo)}
        />
        <span class:completed={todo.completed}>
          {todo.text}
        </span>
        <button on:click={() => removeTodo(todo)}>Remove</button>
      </li>
    {/each}
  </ul>
  
  <p>Completed: {completedCount}</p>
</main>

<style>
  .completed {
    text-decoration: line-through;
    opacity: 0.6;
  }
</style>
```

### Какие проблемы решал
- Размер бандла (компиляция в vanilla JS)
- Производительность (нет виртуального DOM)
- Простота синтаксиса
- Не нужна среда выполнения
- Автоматическая оптимизация

### Актуальность
- Активное развитие
- Отличный выбор для небольших проектов
- SvelteKit для fullstack разработки
- Растущая популярность

### Сильные стороны
- Минимальный размер бандла
- Отличная производительность
- Простой синтаксис
- Нет runtime overhead
- Автоматические оптимизации компилятора
- CSS scoping из коробки

### Слабые стороны
- Меньшая экосистема
- Compile-time ограничения
- Сложность debugging компилированного кода
- Менее предсказуемое поведение
- Ограничения в динамических сценариях

---

## 11. Signal Based Reactivity (Vue 3, Solid, Svelte 5, Angular signals)

### Vue 3 Composition API
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

function toggleTodo(todo) {
  todo.completed = !todo.completed;
}
</script>

<template>
  <div>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <button @click="addTodo">Add Todo</button>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ completed: todo.completed }">
          {{ todo.text }}
        </span>
      </li>
    </ul>
    
    <p>Completed: {{ completedCount }}</p>
  </div>
</template>
```

### Solid.js
```jsx
import { createSignal, createMemo, For } from 'solid-js';

function TodoApp() {
  const [todos, setTodos] = createSignal([]);
  const [newTodo, setNewTodo] = createSignal('');
  
  const completedCount = createMemo(() =>
    todos().filter(todo => todo.completed).length
  );
  
  const addTodo = () => {
    if (newTodo().trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo(),
        completed: false
      }]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  return (
    <div>
      <input
        value={newTodo()}
        onInput={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add Todo</button>
      
      <ul>
        <For each={todos()}>
          {(todo) => (
            <li>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span class={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
            </li>
          )}
        </For>
      </ul>
      
      <p>Completed: {completedCount()}</p>
    </div>
  );
}
```

### Angular Signals
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
        <span [class.completed]="todo.completed()">
          {{ todo.text() }}
        </span>
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
  
  toggleTodo(todo: TodoItem) {
    todo.completed.update(completed => !completed);
  }
  
  updateNewTodo(event: Event) {
    this.newTodo.set((event.target as HTMLInputElement).value);
  }
  
  trackByFn(index: number, item: TodoItem) {
    return item.id;
  }
}
```

### Какие проблемы решал
- Точная реактивность (fine-grained)
- Оптимальная производительность
- Простота понимания
- Меньше re-renders
- Лучшая композиция логики
- Унификация подходов

### Актуальность
- Современный стандарт (2024)
- Активное развитие во всех фреймворках
- Будущее реактивности
- Постепенное внедрение в существующие проекты

### Сильные стороны
- Оптимальная производительность
- Простая ментальная модель
- Точечные обновления
- Хорошая композиция
- TypeScript friendly
- Меньше boilerplate по сравнению с предыдущими подходами

### Слабые стороны
- Новизна (меньше материалов)
- Различия в реализации между фреймворками
- Миграционные сложности
- Требует изучения новых концепций
- Не все библиотеки поддерживают signals
