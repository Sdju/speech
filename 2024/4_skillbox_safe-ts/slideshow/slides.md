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

layout: intro
author: Денис Чернов
name: 'Безопасный TypeScript'
twitch: '@izede'
discord: '@izede'
telegram: '@zede1697'
variant: first
contextMenu: false
---

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

<v-clicks>

- Обнаруживаем ошибки раньше
- Устанавливаем контракты
- Упрощаем переиспользование кода
- Служит своеобразной документацией
- Улучшает подсказки в редакторе

</v-clicks>

<!--
- Указать какие ошибки и когда обнаруживаем
- Объяснить понятие контрактов (взаимодействие между людьми front/back)
-->

---

# Особенности типизации TS

<v-clicks>

- явная
- более строгая
- утиная
- структурная

</v-clicks>

````md magic-move {at: 1}
```ts
⠀







⠀
```

```ts
let a = 5
let b: number | string = 5






⠀
```

```ts
let a = 5 + 'x' // OK '5x'
let b = 5 + {} // ERROR!






⠀
```

```ts
type Duck = { swim(), quack() }
let duckTest: (a: unknown) => a is Duck
  = (a: unknown) => ('quack' in a) && ('swim' in a)

function action(a: unknown) {
  if (duckTest(a)) {
    a.swim()
  }
} 
```

```ts
type Duck = { eat(): void }
type Cat = { eat(): void }

type DuckIsCat = Duck extends Cat ? true : false; // true
type CatIsDuck = Cat extends Duck ? true : false; // true

let duck: Duck = { eat() }
let cat: Cat = duck // OK!
⠀
```
````

<!--
- добавить слайды по номинальной и структурной типизации
- попробовать добавить табличку для разбора разницы между JS и TS
- сосредоточиться структурной/явной
-->

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
layout: center
---

# А что делать то?

<!--
оставить описание проблемы ошибки для понимания

Решение сюда вставить
-->

---

# Номинальная типизация

<v-clicks>

- типизация основанная на связи идентификаторов
- более строгие типы
- большая предсказуемость
- большая гармоничность с JS

</v-clicks>

<!--
- более строгие типы заменить
- Утка != кошка (строгость)
- подумать как заменить с примером про JS
-->

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
declare const __Brand: unique symbol;

class Duck { 
  eat() {
    console.log('duck is eating')
  }
  
  private [__Brand]!: 'Duck'
}
class Cat {
  eat() {
    console.log('cat is eating')
  }
  
  private [__Brand]!: 'Cat'
}

type DuckIsCat = Duck extends Cat ? true : false; // false
type CatIsDuck = Cat extends Duck ? true : false; // false
```

```ts

```
````

<!--
- подумать над упрощением кода
- разбить код на части
- вынести delcare const в отдельный слайд (объяснить что происходит)
- тоже самое с оператором [ x ]:!
- убрать __ чтобы не смущать
-->

---

# А это точно решение?

<v-clicks>

- решает проблему только для классов / объектов
- не самый удобный в использовании
- требует много манипуляций

</v-clicks>

<!--
- описать еще раз проблему которую решали и решение
-
-->

---

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
declare const __Brand: unique symbol;

type Pixels = number
type Percents = number

function getOffset(size: Pixels) {
  return size * 0.2 + 10
}

let widthInPercents: Percents = 10
getOffset(widthInPercents) // OK!



⠀
```

```ts {*|3,4|10|*}
declare const __Brand: unique symbol;

type Pixels = number & {[__Brand]: 'Pixels'}
type Percents = number & {[__Brand]: 'Percents'}

function getOffset(size: Pixels) {
  return size * 0.2 + 10
}

let widthInPercents: Percents = 10 // ERROR!
getOffset(widthInPercents)



⠀
```

```ts {*|2-5|9-11|13|*}
declare const __Brand: unique symbol;
type Nominal<Type, Identifier> = Type & {
  readonly [__Brand]: Identifier;
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
declare const __Brand: unique symbol;
type Nominal<Type, Identifier> = Type & {
  readonly [__Brand]: Identifier;
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

# Итоги

<v-clicks>

- работает с примитивами
- не создает нагрузки в рантайме
- требует избыточного кода
- бренды отклеиваются после операторов
- "брендированные" значения не могут быть ключами объектов

</v-clicks>

<!--
- а к чему итоги?
- упростить выражение про нагрузку
- иначе сказать про код в TS
- сопроводить примерами проблемы с брендами
-->

---

# А Языку OК?

<v-clicks>

- [Пропозал](https://github.com/Microsoft/Typescript/issues/202) на добавление ключевого слова nominal
- [Пропозал](https://github.com/microsoft/TypeScript/issues/58181) на добавление ключевого слова instanceof для типов
- [issue](https://github.com/microsoft/TypeScript/issues/57767) на возможность быть ключами у брендированных строк
- есть одно исключение...

</v-clicks>

<!--
- упростить понятия про пропозалы
- подсветить ключевые слова
- сопроводить кодом
- изменить поток повествования на модель с подготовкой перед нагружением информацией
-->

---

# Enums

<v-clicks>

- Существует с самой первой версии TS
- Является "плохишом" в мире TS
- Enum-ы номинальные
- Единственная TS-сущность непосредственно влияющая на JS
- Имеют порой непредсказуемое поведение

</v-clicks>

<!--
номинальность Enum-ов главный момент в данном случае
- переформулировать понятие "TS влияет на JS"
-->

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

console.log(Roles.Admin)
console.log(Roles[Roles.Admin])



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

```ts {*|3|*}
enum Roles {
  Admin, // 0 -> 0
  Writer,  // x -> 1
  Reader // 1 -> 2
}

declare function doSmth(user: Roles): void
doSmth(Roles.Admin)


⠀
```

```ts {*|3|*}
enum Roles {
  Admin = 0
  Writer = 1
  Reader = 2
}

declare function doSmth(user: Roles): void
doSmth(Roles.Admin)


⠀
```

```ts {*|3|*}
enum Roles {
  Admin = 0
  Writer = 1
  Reader = 2
}

declare function doSmth(user: Roles): void
doSmth(10)


⠀
```

```ts {*|3|*}
enum Roles {
  Admin = 0
  Writer = 1
  Reader = 2
}

declare function doSmth(user: Roles): void
doSmth(10) // it's OK!


⠀
```

```ts {*|3|*}
enum Roles {
  Admin = 0
  Writer = 1
  Reader = 2
}

declare function doSmth(user: Roles): void
doSmth(10) // it's OK! (for TS4)


⠀
```

```ts {*|3|*}
enum Roles {
  Admin = 'Admin'
  Writer = 'Writer'
  Reader = 'Reader'
}

declare function doSmth(user: Roles): void
doSmth(Roles.Admin)


⠀
```

```ts {*|3|*}
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

```ts {*|3|*}
enum Roles {
  Admin = 'Admin'
  Reader = 'Reader'
}

enum Roles {
  Writer = 'Writer'
}


⠀
```

```ts {*|3|*}
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

# Советы

<v-clicks>

- всегда инициализировать свойства
- ESLint `prefer-enum-initializers`
- избегать `const enum`
- предпочитать строковые значения численным
- предпочесть использование `as const` для объектов

</v-clicks>

<!--
- вынести as const в отдельный слайд
- подумать над заменой слову советы
-->

---

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
export type Roles = typeof Roles[keyof typeof Roles]

declare function doSmth(user: Roles): void
// Roles: 'Admin' | 'Reader'
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
- логическое повествование доработать
-->

---
layout: center
---

# Что не так с объектами?

<!--
- непонятный и резкий переход
- перепродумать слайд
-->

---

````md magic-move
```ts
interface Obj {
  version1(param: string): void;
  version2: (param: string) => void;
}
















⠀
```

```ts {*|1-7|9-13|15-17|19}
interface Dog {
  barkAt(dog: Dog): void;
}

interface SmallDog extends Dog {
  whimper: () => void;
}

const brian: Dog = {
  barkAt(smallDog: SmallDog) {
    smallDog.whimper();
  },
};

const normalDog: Dog = {
  barkAt() {},
};

brian.barkAt(normalDog);

⠀
```

```ts {*|20|10-11|15-17}
interface Dog {
  barkAt(dog: Dog): void;
}

interface SmallDog extends Dog {
  whimper: () => void;
}

const brian: Dog = {
  barkAt(smallDog: SmallDog) {
    smallDog.whimper();
  },
};

const normalDog: Dog = {
  barkAt() {},
};

brian.barkAt(normalDog);
// RUNTIME ERROR! 'undefined' is not a function
⠀
```

```ts {*|2|2,10-12}
interface Dog {
  barkAt: (dog: Dog) => void;
}

interface SmallDog extends Dog {
  whimper: () => void;
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

- Кратко: параметры функций бивариантны ([Объяснение](https://github.com/microsoft/TypeScript/wiki/FAQ#why-are-function-parameters-bivariant))
- Это удобно для работы в случае с массивами

</v-clicks>

<!--
- понятие бивариантности заменить на что-то более простое
- добавить пример о какой работе с массивами идет речь
-->

---

# А можем ли мы корректировать работу TS?

<v-clicks>

- Да, с помощью флагов
- Да, с помощью переопределения интерфейсов методов
- Да, подбирая более удачные синтаксисы в нужные моменты времени

</v-clicks>

<!--
- подумать над формулировками еще раз
-->

---

# Какие флаги включить?

- `strict` - Базовая опция включающая большую часть строгих проверок
- `exactOptionalPropertyTypes` - в случае `?:` не дает значениям быть `undefined`
- `noFallthroughCasesInSwitch` - не дает забыть вам поставить `break` в конце `case`
- `noUncheckedIndexedAccess` - не доверяет

<!--
- последний пример не дописан
-->

---

<script setup>
  import img from '/img/ts-reset.png'
</script>

<GlowImage :src="img" />

<!--
- подписать: библиотека ts-reset
-->

---

# ts-reset

<v-clicks>

- Делает `fetch` / `JSON.parse` возвращающими `unknown`
- Уменьшает строгость для поиска массивов и других коллекций
- Исправляет работу `.filter(Boolean)`
- Подключается 1 строкой

</v-clicks>

<v-click>

```ts
import "@total-typescript/ts-reset";
```

</v-click>

<!--
- заменить undefined на unknown
- обосновать почему именно ее
- объяснить работу с filter(Boolean)
- добавить примеры на 2 и 3ий пункт
-->

---

Но в рантайме нет TypeScript!

<!--
- переверстать
- подумать о подводке
-->

---

<v-clicks>

# Но в рантайме нет TypeScript!

- С одной стороны да
- С другой у нас есть возможности JS
- Берем описание типа на JS
- Выгружаем из него TS-схему
- Валидируем при необходимости в рантайме

</v-clicks>

<!--
- поправить анимацию
-->

---

```ts {*|1|2|4,5}
const A = z.string()
type A = z.infer<typeof A> // string

const a1: A = 12 // ERROR!
const a2: A = "asdf" // compiles
```

<!--
- развернуть пример получше
- объяснить что такое zod и валидаторы
-->

---

# Выводы

<v-clicks>

- Для важных определений предпочитайте валидаторы
- Желательно покрывать валидаторами результаты `JSON.parse` и `API`
- Решение имеет множественные интеграции

</v-clicks>

<!--
- поменять выводы на что-то другое
-->

---

# `interface != type`

<v-clicks>

- `interface` это потенциальная точка для расширения
- `type` гораздо более строгий по работе
- `interface` не может быть индексированным по-умолчанию

</v-clicks>

<!--
- добавить расшифровки
-->

---

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

# Предпочитайте использование `satisfies`

<v-clicks>

- Не дает случайно обмануть компилятор как `as`
- Значение важнее чем указанный тип

</v-clicks>

---

````md magic-move
```ts {1|2|3|4|5}
let a = "123";
const b = "123";
let c: number | string = '123'
let d = 123 as number | string
let e = 123 satisfies number | string
```

```ts {1|2-6|8|9|10|*|9|*}
type RGB = [red: number, green: number, blue: number];
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0]
};

const redComponent = palette.red.at(0);
const redNormalized = palette.red.toUpperCase();
const greenNormalized = palette.green.toUpperCase();
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

<!--
прописать словами что делаю
описать что будет происходить
-->

---

# Итого

- `Typescript` мощный инструмент, но им нужно управлять
- Делать выбор нужно всегда осознанно
- Лучше не подбивать к обходу правил
- Старайтесь не перестараться со строгостью типизации

<!--
- добавить последовательную анимацию
- формулировки
-->

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
