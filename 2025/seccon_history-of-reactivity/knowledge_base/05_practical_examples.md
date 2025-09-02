# Практические примеры кода для демонстрации

## Общий пример: Todo приложение

Для всех подходов будем реализовывать одинаковую функциональность:
- Добавление задач
- Отметка как выполненной
- Подсчет выполненных задач
- Удаление задач

## 1. Vanilla JavaScript + jQuery

### HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App - Vanilla JS</title>
  <script src="https://jquery.com/jquery.min.js"></script>
</head>
<body>
  <div id="app">
    <input id="newTodo" placeholder="Add a todo" />
    <button id="addBtn">Add</button>
    <ul id="todoList"></ul>
    <p>Completed: <span id="completedCount">0</span></p>
  </div>
</body>
</html>
```

### JavaScript
```javascript
// Состояние приложения
let todos = [];
let nextId = 1;

// Обновление UI
function updateTodoList() {
  const $list = $('#todoList');
  $list.empty();
  
  todos.forEach(todo => {
    const $item = $(`
      <li data-id="${todo.id}">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} />
        <span style="${todo.completed ? 'text-decoration: line-through' : ''}">${todo.text}</span>
        <button class="remove-btn">Remove</button>
      </li>
    `);
    $list.append($item);
  });
}

function updateCompletedCount() {
  const completed = todos.filter(todo => todo.completed).length;
  $('#completedCount').text(completed);
}

// События
$('#addBtn').click(function() {
  const text = $('#newTodo').val().trim();
  if (text) {
    todos.push({
      id: nextId++,
      text: text,
      completed: false
    });
    $('#newTodo').val('');
    updateTodoList();
    updateCompletedCount();
  }
});

$('#newTodo').keyup(function(e) {
  if (e.keyCode === 13) {
    $('#addBtn').click();
  }
});

$(document).on('change', 'input[type="checkbox"]', function() {
  const id = parseInt($(this).closest('li').data('id'));
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = $(this).is(':checked');
    updateTodoList();
    updateCompletedCount();
  }
});

$(document).on('click', '.remove-btn', function() {
  const id = parseInt($(this).closest('li').data('id'));
  todos = todos.filter(t => t.id !== id);
  updateTodoList();
  updateCompletedCount();
});
```

**Проблемы:**
- Ручное управление DOM
- Дублирование кода обновления
- Сложность синхронизации состояния

## 2. Backbone.js

```javascript
// Модель
const Todo = Backbone.Model.extend({
  defaults: {
    text: '',
    completed: false
  },
  
  toggle: function() {
    this.set('completed', !this.get('completed'));
  }
});

// Коллекция
const TodoList = Backbone.Collection.extend({
  model: Todo,
  
  completed: function() {
    return this.filter(todo => todo.get('completed'));
  },
  
  remaining: function() {
    return this.without.apply(this, this.completed());
  }
});

// Представление для одной задачи
const TodoView = Backbone.View.extend({
  tagName: 'li',
  
  template: _.template(`
    <input type="checkbox" <%= completed ? 'checked' : '' %> />
    <span class="<%= completed ? 'completed' : '' %>"><%= text %></span>
    <button class="remove">Remove</button>
  `),
  
  events: {
    'click input[type="checkbox"]': 'toggleCompleted',
    'click .remove': 'remove'
  },
  
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  toggleCompleted: function() {
    this.model.toggle();
  },
  
  remove: function() {
    this.model.destroy();
    this.$el.remove();
  }
});

// Главное представление
const AppView = Backbone.View.extend({
  el: '#app',
  
  template: _.template(`
    <input id="newTodo" placeholder="Add a todo" />
    <button id="addBtn">Add</button>
    <ul id="todoList"></ul>
    <p>Completed: <span id="completedCount">0</span></p>
  `),
  
  events: {
    'click #addBtn': 'addTodo',
    'keyup #newTodo': 'addOnEnter'
  },
  
  initialize: function() {
    this.collection = new TodoList();
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'all', this.updateStats);
    this.render();
  },
  
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  
  addTodo: function() {
    const text = this.$('#newTodo').val().trim();
    if (text) {
      this.collection.create({ text: text });
      this.$('#newTodo').val('');
    }
  },
  
  addOnEnter: function(e) {
    if (e.keyCode === 13) {
      this.addTodo();
    }
  },
  
  addOne: function(todo) {
    const view = new TodoView({ model: todo });
    this.$('#todoList').append(view.render().el);
  },
  
  updateStats: function() {
    const completed = this.collection.completed().length;
    this.$('#completedCount').text(completed);
  }
});

// Запуск приложения
new AppView();
```

**Улучшения:**
- Структурированный код
- Автоматическое обновление при изменении модели
- Разделение ответственности

## 3. Knockout.js

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App - Knockout</title>
  <script src="knockout.js"></script>
</head>
<body>
  <div id="app">
    <input data-bind="value: newTodoText, valueUpdate: 'input'" placeholder="Add a todo" />
    <button data-bind="click: addTodo">Add</button>
    
    <ul data-bind="foreach: todos">
      <li>
        <input type="checkbox" data-bind="checked: completed" />
        <span data-bind="text: text, css: { completed: completed }"></span>
        <button data-bind="click: $parent.removeTodo">Remove</button>
      </li>
    </ul>
    
    <p>Completed: <span data-bind="text: completedCount"></span></p>
  </div>

  <script>
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
        var text = self.newTodoText().trim();
        if (text) {
          self.todos.push({
            text: ko.observable(text),
            completed: ko.observable(false)
          });
          self.newTodoText('');
        }
      };
      
      self.removeTodo = function(todo) {
        self.todos.remove(todo);
      };
    }
    
    // Применение биндинга
    ko.applyBindings(new TodoViewModel());
  </script>
</body>
</html>
```

**Инновации:**
- Автоматический data binding
- Декларативный синтаксис
- Computed свойства

## 4. AngularJS

```html
<!DOCTYPE html>
<html ng-app="todoApp">
<head>
  <title>Todo App - AngularJS</title>
  <script src="angular.js"></script>
</head>
<body ng-controller="TodoController">
  <div>
    <input ng-model="newTodo" ng-keyup="$event.keyCode == 13 && addTodo()" placeholder="Add a todo" />
    <button ng-click="addTodo()">Add</button>
    
    <ul>
      <li ng-repeat="todo in todos track by todo.id">
        <input type="checkbox" ng-model="todo.completed" />
        <span ng-class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button ng-click="removeTodo($index)">Remove</button>
      </li>
    </ul>
    
    <p>Completed: {{ getCompletedCount() }}</p>
  </div>

  <script>
    angular.module('todoApp', [])
      .controller('TodoController', function($scope) {
        $scope.todos = [];
        $scope.newTodo = '';
        var nextId = 1;
        
        $scope.addTodo = function() {
          if ($scope.newTodo.trim()) {
            $scope.todos.push({
              id: nextId++,
              text: $scope.newTodo,
              completed: false
            });
            $scope.newTodo = '';
          }
        };
        
        $scope.removeTodo = function(index) {
          $scope.todos.splice(index, 1);
        };
        
        $scope.getCompletedCount = function() {
          return $scope.todos.filter(function(todo) {
            return todo.completed;
          }).length;
        };
      });
  </script>
</body>
</html>
```

**Революция:**
- Двусторонний data binding
- Директивы
- Dependency Injection

## 5. React (современный с Hooks)

```jsx
import React, { useState, useMemo, useCallback } from 'react';

const TodoItem = React.memo(({ todo, onToggle, onRemove }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id)}
    />
    <span className={todo.completed ? 'completed' : ''}>
      {todo.text}
    </span>
    <button onClick={() => onRemove(todo.id)}>Remove</button>
  </li>
));

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [nextId, setNextId] = useState(1);
  
  const completedCount = useMemo(() =>
    todos.filter(todo => todo.completed).length,
    [todos]
  );
  
  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: nextId,
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
      setNextId(prev => prev + 1);
    }
  }, [newTodo, nextId]);
  
  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  }, []);
  
  const removeTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);
  
  const handleKeyUp = useCallback((e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  }, [addTodo]);
  
  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))}
      </ul>
      
      <p>Completed: {completedCount}</p>
    </div>
  );
}

export default TodoApp;
```

**Современные возможности:**
- Hooks для состояния
- useMemo для оптимизации
- useCallback для стабильных ссылок
- React.memo для предотвращения лишних рендеров

## 6. Redux + React

```jsx
// actions.js
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text, id: Date.now() }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id }
});

// reducer.js
const initialState = {
  todos: []
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: action.payload.id,
          text: action.payload.text,
          completed: false
        }]
      };
      
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
      
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
      
    default:
      return state;
  }
};

// selectors.js
export const selectTodos = (state) => state.todos;
export const selectCompletedCount = (state) =>
  state.todos.filter(todo => todo.completed).length;

// TodoApp.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from './actions';
import { selectTodos, selectCompletedCount } from './selectors';

function TodoApp() {
  const todos = useSelector(selectTodos);
  const completedCount = useSelector(selectCompletedCount);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };
  
  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && handleAddTodo()}
        placeholder="Add a todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      
      <p>Completed: {completedCount}</p>
    </div>
  );
}
```

**Преимущества Redux:**
- Предсказуемое состояние
- Time-travel debugging
- Централизованное управление

## 7. Vue 3 Composition API

```vue
<template>
  <div>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Add a todo"
    />
    <button @click="addTodo">Add</button>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          v-model="todo.completed"
        />
        <span :class="{ completed: todo.completed }">
          {{ todo.text }}
        </span>
        <button @click="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
    
    <p>Completed: {{ completedCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const todos = ref([]);
const newTodo = ref('');
let nextId = 1;

const completedCount = computed(() =>
  todos.value.filter(todo => todo.completed).length
);

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value,
      completed: false
    });
    newTodo.value = '';
  }
}

function removeTodo(id) {
  const index = todos.value.findIndex(todo => todo.id === id);
  if (index > -1) {
    todos.value.splice(index, 1);
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
```

**Современные возможности Vue 3:**
- Composition API для переиспользования логики
- ref() и reactive() для реактивности
- computed() для производных данных

## 8. Solid.js

```jsx
import { createSignal, createMemo, For } from 'solid-js';

function TodoApp() {
  const [todos, setTodos] = createSignal([]);
  const [newTodo, setNewTodo] = createSignal('');
  let nextId = 1;
  
  const completedCount = createMemo(() =>
    todos().filter(todo => todo.completed()).length
  );
  
  const addTodo = () => {
    if (newTodo().trim()) {
      setTodos(prev => [...prev, {
        id: nextId++,
        text: newTodo(),
        completed: createSignal(false)[0]
      }]);
      setNewTodo('');
    }
  };
  
  const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  const toggleTodo = (todo) => {
    const [completed, setCompleted] = createSignal(todo.completed());
    setCompleted(!completed());
  };
  
  return (
    <div>
      <input
        value={newTodo()}
        onInput={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        <For each={todos()}>
          {(todo) => (
            <li>
              <input
                type="checkbox"
                checked={todo.completed()}
                onChange={() => toggleTodo(todo)}
              />
              <span class={todo.completed() ? 'completed' : ''}>
                {todo.text}
              </span>
              <button onClick={() => removeTodo(todo.id)}>
                Remove
              </button>
            </li>
          )}
        </For>
      </ul>
      
      <p>Completed: {completedCount()}</p>
    </div>
  );
}
```

**Особенности Solid:**
- Signals для fine-grained реактивности
- Компиляция в оптимизированный код
- Нет виртуального DOM

## Демонстрационные сценарии

### Сценарий 1: Производительность
Создать список из 10000 элементов и показать разницу в производительности:
- React: виртуальный DOM reconciliation
- Vue: точечные обновления
- Svelte: компилированные обновления
- Solid: signal-based обновления

### Сценарий 2: Размер бандла
Собрать одно и то же приложение разными инструментами и показать размер:
```
jQuery: ~30KB + приложение ~5KB = 35KB
React: ~45KB + приложение ~10KB = 55KB  
Vue: ~35KB + приложение ~8KB = 43KB
Svelte: ~0KB runtime + приложение ~3KB = 3KB
```

### Сценарий 3: Сложность кода
Подсчитать строки кода для реализации одной и той же функциональности.

### Сценарий 4: Отладка
Показать инструменты разработчика для каждого подхода:
- React DevTools
- Vue DevTools  
- Redux DevTools
- Svelte REPL
