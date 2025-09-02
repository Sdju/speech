# Эра фреймворков (2010-2016)

## AngularJS: dirty checking революция (2012)

```javascript
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
});
```

```html
<div ng-controller="TodoController">
  <input ng-model="newTodo" ng-keyup="$event.keyCode == 13 && addTodo()" />
  <li ng-repeat="todo in todos">{{ todo.text }}</li>
</div>
```

**Революционные идеи:** двусторонний data binding, dependency injection, директивы

<!-- Начались 2010-е - десятилетие, которое определило современный фронтенд. Появились фреймворки, которые мы знаем и используем до сих пор. Началась эта эра с AngularJS - первого полноценного фреймворка для SPA. -->

---

# RxJS: реактивные потоки (2010)

```javascript
const searchResults = fromEvent(searchInput, 'input')
  .pipe(
    map(event => event.target.value),
    filter(text => text.length > 2),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => searchAPI(query))
  );

searchResults.subscribe(results => {
  displayResults(results);
});
```

**Концепция:** все как поток данных, композиция операторов, функциональное программирование

**Применение:** Angular экосистема, сложные асинхронные сценарии

<!-- Параллельно развивался другой подход - reactive programming. RxJS принес идеи функционального программирования во фронтенд. Все стало потоком данных, который можно трансформировать композицией операторов. -->

---

# React: push-based революция (2013)

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
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
  
  return (
    <div>
      <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}
```

**Ключевые идеи:** виртуальный DOM, однонаправленный поток данных, компонентная архитектура

<!-- 2013 год - появляется React от Facebook. Это был радикально новый подход. Забудьте о двустороннем binding, забудьте о watch-функциях. Данные текут в одном направлении, состояние изменяется через специальные функции, а виртуальный DOM решает проблемы производительности. -->

---

# Flux/Redux: управление состоянием (2014-2015)

```javascript
// Actions
const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: { text, id: Date.now() }
});

// Reducer
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      }];
    default:
      return state;
  }
};

// Component
const todos = useSelector(state => state.todos);
const dispatch = useDispatch();
```

**Принципы:** single source of truth, state is read-only, pure functions

<!-- React решил проблему рендеринга, но остался вопрос управления состоянием в больших приложениях. Facebook предложил архитектуру Flux, а Dan Abramov создал Redux - реализацию, которая стала стандартом. -->

---

# Vue.js: прогрессивный фреймворк (2014)

```vue
<template>
  <div>
    <input v-model="newTodo" @keyup.enter="addTodo" />
    <button @click="addTodo">Add Todo</button>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
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
  }
};
</script>
```

**Особенности:** автоматическое отслеживание зависимостей, простота изучения, Single File Components

<!-- В том же 2014 году Evan You представил Vue.js. Это была попытка взять лучшее от Angular (реактивность) и React (простота), но сделать это более доступным для изучения. Vue стал "прогрессивным" - его можно было внедрять постепенно. -->

---

# Angular 2+: zone-based подход (2016)

```typescript
@Component({
  selector: 'todo-app',
  template: `
    <input [(ngModel)]="newTodo" (keyup.enter)="addTodo()" />
    <button (click)="addTodo()">Add Todo</button>
    
    <ul>
      <li *ngFor="let todo of todos; trackBy: trackByFn">
        <input type="checkbox" [(ngModel)]="todo.completed" />
        <span [class.completed]="todo.completed">{{ todo.text }}</span>
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
}
```

**Инновации:** TypeScript из коробки, Zone.js для автоматического change detection, компонентная архитектура

<!-- К 2016 году Google понял, что AngularJS достиг пределов возможностей. Angular 2 был полной перепиской с TypeScript и радикально новым подходом к change detection через Zone.js - библиотеку, которая патчит браузерные API для автоматического отслеживания изменений. -->

---

# Итоги эры фреймворков

**Ключевые достижения 2010-2016:**

- Появление полноценных фреймворков для SPA
- Решение проблем производительности (virtual DOM, change detection)
- Стандартизация компонентного подхода
- Развитие экосистем и tooling

**Устоявшиеся подходы:**
- **Angular**: автоматический change detection
- **React**: явное управление состоянием + virtual DOM  
- **Vue**: реактивная система на геттерах/сеттерах
- **Redux**: централизованное управление состоянием

<!-- К 2016 году сформировалась "большая тройка" - Angular, React, Vue. Каждый предложил свой подход к реактивности. Angular - автоматическое отслеживание через зоны, React - явное управление состоянием, Vue - автоматическое отслеживание зависимостей. -->