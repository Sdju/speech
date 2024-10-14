---
theme: ./theme
routerMode: hash
htmlAttrs:
  lang: ru
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
growSeed: 4
title: The Progressive Path

layout: full
dragPos:
  photo: 608,0,372,349
---

![img.png](/img/intro.png)

<div v-drag="'photo'">

![img.png](/img/photo.png)

</div>

---

<div class="mb-[50px] flex flex-row">
  <div class="w-[80px] h-[80px] rd-full of-hidden">
    <img class="w-full h-full object-cover" src="/img/photo.png" />
  </div>
  <div class="w-[80px] h-[80px] rd-full ml-[15px]">
    <zede-icon class="w-full h-full" />
  </div>
</div>
<div class="text-4xl mb-[50px]">Денис Чернов</div>
<p><file-icons-telegram /> @zede_code</p>
<p><ion-logo-twitch /> @izede</p>
<p><ion-logo-github /> @Sdju</p>

<QrCodeIntro class="w-[200px] h-[200px] absolute top-[200px] right-[80px]" />

---

# Зачем нам `TypeScript`?

## 1. Обнаруживаем ошибки раньше

<v-clicks>

- Видим ошибки не запуская код
- Проверяем соответствия на CI/CD
- Видим несоответствия во время написания кода

</v-clicks>

<!--
- Указать какие ошибки и когда обнаруживаем
- Объяснить понятие контрактов (взаимодействие между людьми front/back)
-->

---

# Зачем нам `TypeScript`?

## 2. Устанавливаем контракты

> **Контракт** - договоренности между отдельными участниками

<v-clicks>

- Согласованность между Frontend и Backend-ом
- Корректная работа между библиотеками и приложениями
- Единое представление в рамках одной кодовой базы

</v-clicks>

---

# Зачем нам `TypeScript`?

## 3. Упрощаем переиспользование кода

<v-clicks>

- Нам не нужно гадать что и как используется
- Четко фиксируем что ожидаем от конкретного участка кода
- Облегчаем понимание другим разработчиком

</v-clicks>

---

# Зачем нам `TypeScript`?

## 4. Служит своеобразной документацией

<v-clicks>

- Даем описание того что отдаем и что принимаем
- Вынуждаем разработчиков поддерживать ее в актуальном состоянии

</v-clicks>

---

# Зачем нам `TypeScript`?

## 5. Улучшает подсказки в редакторе

<v-clicks>

- Теперь IDE четко понимает что нам предлагать
- IDE легко показывает ошибки прямо в процессе работы

</v-clicks>

---
layout: center
---

# Особенности типизации TS

---

# Явная

- Явное определение типов

<div class="mb-4" />

````md magic-move
```ts
let name = 'John Doe'
```

```ts
let name: string = 'John Doe'
```
````

---

# Строгая

**Строгая типизация** - не позволяет смешивать типы данных в операциях

> Не путать со статической типизацией

````md magic-move
```ts {*|1,2|4,5}
const weight = 70
const person = { name: 'John Doe', weight: 60 }

console.log(weight + person.weight);
// Output: 130
⠀
```

```ts {*|4-6}
const weight = 70
const person = { name: 'John Doe', weight: 60 }

console.log(weight + person);
// ERROR! Operator '+' cannot be applied to types 
// 'number' and '{ name: string; weight: number; }'
```

```ts {*|1,2|4-5}
const greeting = 'Hello, '
const person = { name: 'John Doe' }

console.log(greeting + person)
// Output: Hello, [object Object]
⠀
```
````

---

# Утиная

> "Если это выглядит как утка, плавает как утка и крякает как утка, то это, вероятно, и есть утка."

**Утиная типизация** - это концепция, при которой тип объекта определяется его свойствами и методами, а не явным объявлением типа.

---

# Утиная

````md magic-move
```ts {*|1|2-10|12-16}
type Duck = { swim(): void, quack(): void }
function duckTest(a: any): a is Duck {
    if (!('quack' in a) || (typeof a.quack === 'function')) {
        return false
    }
    if (!('swim' in a) || (typeof a.swim === 'function')) {
        return false
    }
    return true
}

function action(a: unknown) {
  if (duckTest(a)) {
    a.swim()
  }
}
```
````


---

# Структурная

````md magic-move
```ts {1-2|4-5|7-8}
type Duck = { eat(): void }
type Cat = { eat(): void }

type DuckIsCat = Duck extends Cat ? true : false; // true
type CatIsDuck = Cat extends Duck ? true : false; // true

let duck: Duck = { eat() }
let cat: Cat = duck // OK!
⠀
```
````

---

````md magic-move
```ts
type Duck = { eat(): void }
type Cat = { eat(): void }

type DuckIsCat = Duck extends Cat ? true : false; // true
type CatIsDuck = Cat extends Duck ? true : false; // true

let duck: Duck = { eat() }
let cat: Cat = duck // OK!







⠀
```

```ts
class Duck { 
  eat() {
    console.log('duck is eating')
  }
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
}

type DuckIsCat = Duck extends Cat ? true : false; // true
type CatIsDuck = Cat extends Duck ? true : false; // true

let duck: Duck = new Duck()
let cat: Cat = duck // OK!
```

```ts
class Duck { 
  eat() {
    console.log('duck is eating')
  }
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
}

let duck: Duck = new Duck()
let cat: Cat = duck // OK!

type DuckIsCat = Duck extends Cat ? true : false; // true
type CatIsDuck = Cat extends Duck ? true : false; // true
```

```ts
class Duck { 
  eat() {
    console.log('duck is eating')
  }
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
}

let duck = new Duck()
let cat = new Cat()

type DuckIsCat = Duck extends Cat ? true : false; // true
type CatIsDuck = Cat extends Duck ? true : false; // true
```

```ts
class Duck { 
  eat() {
    console.log('duck is eating')
  }
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
}

let duck = new Duck()
let cat = new Cat()

type DuckIsCat = duck instanceof Cat
type CatIsDuck = cat instanceof Duck
```

```ts
class Duck { 
  eat() {
    console.log('duck is eating')
  }
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
}

let duck = new Duck()
let cat = new Cat()

type DuckIsCat = duck instanceof Cat // false
type CatIsDuck = cat instanceof Duck // false
```
````

---

# Проблема

- С точки зрения TS сущности совместимы
- С точки зрения JS сущности не совместимы

<v-click>

## Причина
- TS использует **структурную** типизацию, а не **номинальную**

</v-click>

---

# Номинальная типизация

<v-clicks>

- Типизация основанная на связи идентификаторов
- Не важно насколько похожи структуры, если связи между ними нет, то типы не совместимы
- Увеличивает предсказуемость
- Ближе по логике работы с JS

</v-clicks>

---

````md magic-move
```ts {*|12,13}
class Duck { 
  eat() {
    console.log('duck is eating')
  }
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
}

type DuckIsCat = Duck extends Cat ? true : false; // true
type CatIsDuck = Cat extends Duck ? true : false; // true





⠀
```

```ts
const brand = Symbol()

class Duck { 
  eat() {
    console.log('duck is eating')
  }
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
}

type DuckIsCat = Duck extends Cat ? true : false; // true
type CatIsDuck = Cat extends Duck ? true : false; // true



⠀
```

```ts {*|1,8,15|18,19}
const brand = Symbol()

class Duck { 
  eat() {
    console.log('duck is eating')
  }
  
  private [brand] = 'Duck'
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
  
  private [brand] = 'Cat'
}

type DuckIsCat = Duck extends Cat ? true : false; // false
type CatIsDuck = Cat extends Duck ? true : false; // false
```

```ts {*|8,15|1}
const brand = Symbol()

class Duck { 
  eat() {
    console.log('duck is eating')
  }
  
  private [brand]!: 'Duck'
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
  
  private [brand]!: 'Cat'
}

type DuckIsCat = Duck extends Cat ? true : false; // false
type CatIsDuck = Cat extends Duck ? true : false; // false
```

```ts {*|1}
declare const brand: unique symbol;

class Duck { 
  eat() {
    console.log('duck is eating')
  }
  
  private [brand]!: 'Duck'
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
  
  private [brand]!: 'Cat'
}

type DuckIsCat = Duck extends Cat ? true : false; // false
type CatIsDuck = Cat extends Duck ? true : false; // false
```

```ts

```
````

---

# Что мы сделали?

<v-clicks>

- Добавили номинальную типизацию засчет брендирования
- Кошки больше не могут быть утками
- Решает проблему только для классов / объектов
- Не самый удобный в использовании
- Требует много манипуляций
- Никак не влияет на рантайм

</v-clicks>

---

# Улучшаем решение

````md magic-move
```ts {*|1,2|5,6}
function getOffset(size: number) {
  return size * 0.2 + 10
}

let widthInPercents = 10
getOffset(widthInPercents) // OK!








⠀
```

```ts {*|1,2|4,8|9}
type Pixels = number
type Percents = number

function getOffset(size: Pixels) {
  return size * 0.2 + 10
}

let widthInPercents: Percents = 10
getOffset(widthInPercents) // OK!





⠀
```

```ts
declare const brand: unique symbol;

type Pixels = number
type Percents = number

function getOffset(size: Pixels) {
  return size * 0.2 + 10
}

let widthInPercents: Percents = 10
getOffset(widthInPercents) // OK!



⠀
```

```ts {*|3,4|10-11|12-13|*}
declare const brand: unique symbol;

type Pixels = number & {[brand]: 'Pixels'}
type Percents = number & {[brand]: 'Percents'}

function getOffset(size: Pixels) {
  return size * 0.2 + 10
}

let widthInPercents: Percents = 10 
// ERROR! Type 'number' is not assignable to type 'Percents'
getOffset(widthInPercents)
// ERROR! Argument of type 'Percents' is not assignable to parameter of type 'Pixels'

⠀
```

```ts {*|2-5|7-8|9-11|13|*}
declare const brand: unique symbol;
type Nominal<Type, Identifier> = Type & {
  readonly [brand]: Identifier;
}

type Pixels = Nominal<number, 'Pixels'>
type Percents = Nominal<number, 'Percents'>

function getOffset(size: Pixels) {
  return size * 0.2 + 10
}

let widthInPercents = 10 as Percents
getOffset(widthInPercents)
// Argument of type 'Percents' is not assignable to parameter of type 'Pixels'
```

```ts {*|10|13}
declare const brand: unique symbol;
type Nominal<Type, Identifier> = Type & {
  readonly [brand]: Identifier;
}

type Pixels = Nominal<number, 'Pixels'>
type Percents = Nominal<number, 'Percents'>

function getOffset(size: Pixels) {
  return (size * 0.2 + 10) as Pixels
}

let widthInPercents = ToPercents(10)
getOffset(widthInPercents)
// Argument of type 'Percents' is not assignable to parameter of type 'Pixels'
```
````

<!--
- добавить заголовок с указанием на примитивы
- можно подумать об отдельном слайде
- разобрать понятие "брендирования"
-->

---

# Брендирование

<v-clicks>

- Работает с примитивами
- Не создает нагрузки в рантайме
- Требует избыточного кода
- Бренды отклеиваются после операторов
- Брендированные значения не могут быть ключами объектов

</v-clicks>

<!--
- а к чему итоги?
- упростить выражение про нагрузку
- иначе сказать про код в TS
- сопроводить примерами проблемы с брендами
-->

---

# Решения от самого TypeScript

<v-clicks>

- Есть предложения на добавление ключевого слова `nominal`
- Есть предложения на добавление ключевого слова `instanceof` для типов
- Есть предложения на возможность быть ключами у брендированных строк
- Уже существует тип, который работает по номинальной типизации...

</v-clicks>

<!--

- [Пропозал](https://github.com/Microsoft/Typescript/issues/202) на добавление ключевого слова nominal
- [Пропозал](https://github.com/microsoft/TypeScript/issues/58181) на добавление ключевого слова instanceof для типов
- [issue](https://github.com/microsoft/TypeScript/issues/57767) на возможность быть ключами у брендированных строк

- сопроводить кодом
- изменить поток повествования на модель с подготовкой перед нагружением информацией
-->

---
layout: center
---

# Перечисления

---

# Enums

<v-clicks>

- Единственный тип с номинальной типизацие
- Единственный TS тип непосредственно влияющий на JS
- Есть сценарии с неожиданным поведением

</v-clicks>

---

````md magic-move
```ts
enum Roles {
  Admin,
  Reader
}






⠀
```
```ts {*|6|7}
enum Roles {
  Admin,
  Reader
}

console.log(Roles.Admin) // 0
console.log(Roles[Roles.Admin]) // 'Admin'



⠀
```

```ts {*|6|7}
enum Roles {
  Admin,
  Reader
}

declare function doSmth(user: Roles): void
doSmth(Roles.Admin)



⠀
```

```ts {*|3|*}
enum Roles {
  Admin,
  Writer, 
  Reader
}

declare function doSmth(user: Roles): void
doSmth(Roles.Admin)


⠀
```

```ts {*|2|3|4|*}
enum Roles {
  Admin, // было 0 -> стало 0
  Writer,  // не существовало -> стало 1
  Reader // было 1 -> стало 2
}

declare function doSmth(user: Roles): void
doSmth(Roles.Admin)


⠀
```

```ts
enum Roles {
  Admin = 0
  Writer = 1
  Reader = 2
}

declare function doSmth(user: Roles): void
doSmth(Roles.Admin)


⠀
```

```ts
enum Roles {
  Admin = 0
  Writer = 1
  Reader = 2
}

declare function doSmth(user: Roles): void
doSmth(10)


⠀
```

```ts {*|2-4|8}
enum Roles {
  Admin = 2 << 0, // 1 001
  Writer = 2 << 1, // 2 010
  Reader = 2 << 2 // 4 100
}

declare function doSmth(user: Roles): void
doSmth(Roles.Reader | Roles.Admin) // 001 | 100 = 101


⠀
```

```ts
enum Roles {
  Admin = 2 << 0, // 1 001
  Writer = 2 << 1, // 2 010
  Reader = 2 << 2 // 4 100
}

declare function doSmth(user: Roles): void
doSmth(10) // it's OK! (for TS4)


⠀
```

```ts
enum Roles {
  Admin = 'Admin'
  Writer = 'Writer'
  Reader = 'Reader'
}

declare function doSmth(user: Roles): void
doSmth(Roles.Admin)


⠀
```

```ts
enum Roles {
  Admin = 'Admin'
  Reader = 'Reader'
}

enum Roles {
  Writer = 'Writer'
}

declare function doSmth(user: Roles): void
doSmth(Roles.Admin)
```

```ts
enum Roles {
  Admin = 'Admin'
  Reader = 'Reader'
}

enum Roles {
  Writer = 'Writer'
}

declare function doSmth(user: Roles): void
doSmth('Admin') // ERROR!
```

```ts
enum Roles {
  Admin = 'Admin'
  Reader = 'Reader'
}

enum Roles {
  Writer = 'Writer'
}


⠀
```

```ts
const enum Roles {
  Admin = 'Admin'
  Reader = 'Reader'
}

console.log(Roles.Admin)
console.log('Admin') // ERROR!



⠀
```
````

<!--
- дописать в комментариях что именно доходит до doSmth
- разделить 2 примера
- оставить комментарий и про строки
-->

---

# Работа с Enum

<v-clicks>

- Всегда инициализировать варианты Enum
- Использовать ESLint `prefer-enum-initializers`
- Избегать `const enum`
- Предпочитать строковые значения численным

</v-clicks>

<!--
- вынести as const в отдельный слайд
- подумать над заменой слову советы
-->

---

# Альтернатива Enum

<v-clicks>

- Использовать `union type`
- Использовать объекты с `as const`

</v-clicks>

---

# Используем `as const`

````md magic-move
```ts
enum Roles {
  Admin = 'Admin',
  Reader = 'Reader'
}



⠀
```

```ts
const Roles = {
  Admin: 'Admin',
  Reader: 'Reader'
} as const



⠀
```

```ts
const Roles = {
  Admin: 'Admin',
  Reader: 'Reader'
} as const

declare function doSmth(user: Roles): void
// ERROR Roles is not type
⠀
```

```ts
const Roles = {
  Admin: 'Admin',
  Reader: 'Reader'
} as const

declare function doSmth(user: typeof Roles[keyof typeof Roles]): void
// Ok!
⠀
```

```ts
const Roles = {
  Admin: 'Admin',
  Reader: 'Reader'
} as const
export type Roles = typeof Roles[keyof typeof Roles]

declare function doSmth(user: Roles): void
// Ok
```

```ts
type Enum<Base extends Object> = Base[keyof Base]

const Roles = {
  Admin: 'Admin',
  Reader: 'Reader'
} as const
type Roles = Enum<typeof Roles>
⠀
```

```ts
type Enum<Base extends Object> = Base[keyof Base]

export const Roles = {
  Admin: 'Admin',
  Reader: 'Reader'
} as const
export type Roles = Enum<typeof Roles>
⠀
```
````

<!--
- добавить подсветку на описание действий
-->

---
layout: center
---

# Работаем с объектами

---

# В чем разница?

```ts
interface Obj {
  version1(param: string): void

  version2: (param: string) => void
}
```

---

# Собака гавкующая на щенков

````md magic-move
```ts {*|1-7|9-13|15-17|19}
interface Dog {
  barkAt(dog: Dog): void
}

interface SmallDog extends Dog {
  whimper(): void
}

const brian: Dog = {
  barkAt(smallDog: SmallDog) {
    smallDog.whimper()
  },
};

const normalDog: Dog = {
  barkAt() {},
}

brian.barkAt(normalDog)

⠀
```

```ts {*|20|10-11|15-17}
interface Dog {
  barkAt(dog: Dog): void
}

interface SmallDog extends Dog {
  whimper(): void
}

const brian: Dog = {
  barkAt(smallDog: SmallDog) {
    smallDog.whimper()
  },
}

const normalDog: Dog = {
  barkAt() {},
}

brian.barkAt(normalDog);
// RUNTIME ERROR! 'undefined' is not a function
⠀
```

```ts {*|2|2,10-12}
interface Dog {
  barkAt: (dog: Dog) => void;
}

interface SmallDog extends Dog {
  whimper(): void
}

const brian: Dog = {
  // ERROR! Type '(smallDog: SmallDog) => void' is not
  // assignable to type '(dog: Dog) => void'.
  barkAt(smallDog: SmallDog) {
    smallDog.whimper();
  },
};

const normalDog: Dog = {
  barkAt() {},
};

brian.barkAt(normalDog);
```
````

<!--
- добавить подсветки
- четко разделить синтаксис метода
- синтаксис как функции
- совпроводить код текстом
-->

---

# Почему это происходит

<v-clicks>

- Раньше функции тоже могли принимать более широкие типы
- Теперь при использовании `strict` это не пропускается
- Методам оставили поддержку более широкого типа
- Иначе все сломается

</v-clicks>

<!--
([Объяснение](https://github.com/microsoft/TypeScript/wiki/FAQ#why-are-function-parameters-bivariant))
- понятие бивариантности заменить на что-то более простое
- добавить пример о какой работе с массивами идет речь
-->

---
layout: center
---

# `interface != type`

---

# Очевидное

<v-clicks>

- `interface` не может описать примитивы
- `type` позволяет описывать более сложные типы
- Оба могут описывать объекты и их расширения

</v-clicks>

---

# `interface` может быть расширен

````md magic-move
```ts
interface Animal {
  name: string
}

interface Animal {
  weight: number
}

// Animal = { name: string, weight: number }
```

```ts
type Animal = {
  name: string
}

type Animal = {
  weight: number
}

// ERROR! Duplicate identifier 'Animal'
```
````

---

# Индексирование по-умолчанию

````md magic-move
```ts {*|1-4|6|8|10|1-4,8|*}
type Animal = {
  tag: 'animal',
  name: 'some animal'
}

declare var animal: Animal;

const handleRecord = (obj:Record<string, unknown>) => { }

const result = handleRecord(animal)
```

```ts {*|1-4}
interface Animal {
  tag: 'animal',
  name: 'some animal'
}

declare var animal: Animal;

const handleRecord = (obj:Record<string, unknown>) => { }

const result = handleRecord(animal)
```

```ts {*|1-4}
interface Animal {
  tag: 'animal',
  name: 'some animal'
}

declare var animal: Animal;

const handleRecord = (obj:Record<string, unknown>) => { }

const result = handleRecord(animal)
// Error! Index signature for type 'string' is missing in type 'Animal'
```
````

---

# `satisfies`

---

# Предпочитайте использование `satisfies`

<v-clicks>

- Не дает случайно обмануть компилятор как `as`
- Значение важнее чем указанный тип

</v-clicks>

---

````md magic-move
```ts
let a = "123"
const b = "123"
let c: number | string = '123'
let d = 123 as number | string
let e = 123 satisfies number | string
let f = false satisfies number | string
⠀
```

```ts {1|2|3|4|5|6,7}
let a = "123"; // string
const b = "123"; // string
let c: number | string = '123' // string | number
let d = 123 as number | string // number | string
let e = 123 satisfies number | string // number
let f = (123 as number) satisfies 123
// ERROR! Type number does not satisfy the expected type 123
let f = (123 as number) as 123 // OK!
```
````

---

# Определение типа

````md magic-move
```ts
type Palette = 'red' | 'green' | 'blue'

const palette = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
} as Record<Palette, string>
// OK!

⠀
```

```ts
type Palette = 'red' | 'green' | 'blue' | 'yellow'

const palette = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
} as Record<Palette, string>
// OK!

const yellow = palette.yellow // OK!
// ERROR! Property 'yellow' does not exist on type 'Record<Palette, string>'
```

```ts
type Palette = 'red' | 'green' | 'blue' | 'yellow'

const palette: Record<Palette, string> = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
}
// ERROR! Property 'yellow' is missing in type ...
```

```ts
type Palette = 'red' | 'green' | 'blue' | 'yellow'

const palette: Record<Palette, string | number> = {
  red: 16711680,
  green: '#00FF00',
  blue: '#0000FF',
  yellow: '#FFFF00',
}

document.body.style.backgroundColor = palette.yellow
// ERROR! Type 'string' is not assignable to type 'string | number'
```

```ts
type Palette = 'red' | 'green' | 'blue' | 'yellow'

const palette = {
  red: 16711680,
  green: '#00FF00',
  blue: '#0000FF',
  yellow: '#FFFF00',
} satisfies Record<Palette, string | number>

document.body.style.backgroundColor = palette.yellow
// OK!
```

```ts
type Palette = 'red' | 'green' | 'blue' | 'yellow'

const palette = {
  red: 16711680, // number
  green: '#00FF00', // string
  blue: '#0000FF', // string
  yellow: '#FFFF00', // string
} satisfies Record<Palette, string | number>

document.body.style.backgroundColor = palette.yellow
// OK!
```

```ts
type Palette = 'red' | 'green' | 'blue' | 'yellow'

const palette = {
  red: 16711680, // readonly 16711680
  green: '#00FF00', // readonly '#00FF00'
  blue: '#0000FF', // readonly '#0000FF'
  yellow: '#FFFF00', // readonly '#FFFF00'
} as const satisfies Record<Palette, string | number>

⠀
```
````

---

# Улучшаем работу TypeScript

---

# Как влиять на поведение TypeScript?

<v-clicks>

- Флаги и настройки в `tsconfig.json`
- Переопределение интерфейсов методов
- Подбирая более удачные синтаксисы в нужные моменты времени

</v-clicks>

---

# Какие флаги включить?

<v-clicks>

- `strict` - Базовая опция включающая большую часть строгих проверок
- `exactOptionalPropertyTypes` - в случае `?:` не дает значениям быть `undefined`
- `noFallthroughCasesInSwitch` - не дает забыть вам поставить `break` в конце `case`
- `noUncheckedIndexedAccess` - не доверяет индексации без проверки

</v-clicks>

---

<script setup>
  import img from '/img/ts-reset.png'
</script>

<GlowImage :src="img" />

---

# ts-reset

<v-clicks>

- Подключается 1 строкой
- `fetch` / `JSON.parse` возвращают `unknown`, а не `any`
- Поиск в массивах больше не ограничен типом элементов массива
- `.filter(Boolean)` убирает из типов элемента `falsy-значения`

</v-clicks>

<v-click>

```ts
import "@total-typescript/ts-reset";
```

</v-click>

---
layout: center
---

# TypeScript и рантайм

---

# TypeScript и рантайм

<v-clicks>

1. У нас есть возможности JS!
2. Делаем описание типа используя JS
3. Выгружаем из описания TS-схему
4. Валидируем значения при необходимости в рантайме

</v-clicks>


---

# Валидаторы

- Проверяем значение на соответствие правилам
- Прослойка между TS и JS
- Устраняет необходимость писать валидацию вручную
- Проверки соответствия правилам и в рантайме и в типах

---

# Существующие решения

<v-clicks>

- `zod` - популярный и мощный инструмент
- `joi` - крайне мощный инструмент
- `yup` - популярный и мощный инструмент
- `class-validator` - основан на декораторах
- `valibot` - супер-легковесный инструмент

</v-clicks>

---

# Пример с `zod`

```ts {*|1|3|4|6-7}
import { z } from 'zod'

const A = z.string()
type A = z.infer<typeof A> // string

const a1: A = 12 // ERROR!
const a2: A = "asdf" // compiles
```

---

# Когда использовать валидаторы?

<v-clicks>

- Когда TS не может гарантировать правильность данных
- Когда TS не может покрыть все возможные правила
- Когда валидацию нужно проводить в рантайме

</v-clicks>

---
layout: center
---

# Итоги

---
layout: center
---

`Typescript` - мощный инструмент, но им нужно управлять

---
layout: center
---

Похожие решения могут быть разными на деле

---
layout: center
---

TypeScript не всемогущий

---
layout: center
---

Типизация хорошо, но не слишком увлекайтесь

---
layout: intro
author: ''
name: 'Задавайте вопросы'
twitch: '@izede'
discord: '@izede'
telegram: '@zede1697'
variant: first
---

# Дополнение

- [Лучшие и доступные статьи](https://www.totaltypescript.com/articles)
- [Кладезь информации](https://github.com/Microsoft/TypeScript/wiki/FAQ)
- [Ковариантность/контрвариантность/бивариантность/инвариатность](https://github.com/Microsoft/TypeScript/wiki/FAQ)

---

---

````md magic-move
```ts {1|2-6|8-9|11-12|14-16|*|9|*}
type RGB = [red: number, green: number, blue: number]
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0],
}

// Должно быть корректно
const redComponent = palette.red.at(0)

// Должна быть ошибка
const redNormalized = palette.red.toUpperCase()

// Должно быть корректно
const greenNormalized = palette.green.toUpperCase()
```

```ts {*|2|5|8|9-10}
type RGB = [red: number, green: number, blue: number];
const palette: Record<string, string | RGB> = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0]
};

const redComponent = palette.red.at(0);
const redNormalized = palette.red.toUpperCase();
const greenNormalized = palette.green.toUpperCase();
```

```ts
type RGB = [red: number, green: number, blue: number];
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0]
} as Record<string, string | RGB>

const redComponent = palette.red.at(0);
const redNormalized = palette.red.toUpperCase();
const greenNormalized = palette.green.toUpperCase();
```

```ts {*|5|9-10}
type RGB = [red: number, green: number, blue: number];
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 0] as [number, number, number | null]
} as Record<string, string | RGB>

const redComponent = palette.red.at(0);
const redNormalized = palette.red.toUpperCase();
const greenNormalized = palette.green.toUpperCase();
```

```ts {*|6|5|8|9|10|*}
type RGB = [red: number, green: number, blue: number];
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 0] as [number, number, number | null]
} satisfies Record<string, string | RGB>

const redComponent = palette.red.at(0);
const redNormalized = palette.red.toUpperCase();
const greenNormalized = palette.green.toUpperCase();
```

```ts {*|5}
type RGB = [red: number, green: number, blue: number];
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0]
} satisfies Record<string, string | RGB>

const redComponent = palette.red.at(0);
const redNormalized = palette.red.toUpperCase();
const greenNormalized = palette.green.toUpperCase();
```
````