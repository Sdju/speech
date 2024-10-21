---
layout: center
topTitle: Tracking
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

<!--
- сделать отсылку на определение реактивности
-->

---
topTitle: Tracking
---

````md magic-move
```ts
interface EventEmitter {
  emit: (event: EventName, payload: any) => void
  on: (event: EventName, listener: (payload: any) => void) => void
  off: (event: EventName, listener: (payload: any) => void) => void
}
```

```ts
interface EventEmitter {
  emit: (payload: any) => void
  on: (listener: (payload: any) => void) => void
  off: (listener: (payload: any) => void) => void
}
```

```ts
interface EventEmitter {
  emit: (payload: any) => void
  on: (listener: (payload: any) => void) => void
}
```

```ts
interface Dep {
  track: (payload: any) => void
  trigger: (payload: any) => void
}
```

```ts
interface Dep {
  track: (payload: any) => void
  trigger: (payload: any) => void
}
```

```ts
interface Dep {
  track: () => void
  trigger: () => void
}
```
````

---
topTitle: Tracking
---

<IonGearA v-click v-drag="[114,240,88,89]" class="animate-[spin_11s_linear_infinite]" />
<div v-click="'+0'" v-drag="[134,204,68,40]" class="text-[1em] text-shadow-xl"> Dep </div>

<zondicons-cog v-click v-drag="[365,169,90,83]" class="animate-[spin_31s_linear_infinite]" />
<div v-click="'+0'" v-drag="[372,129,119,40]" class="text-[1em] text-shadow-xl"> trigger </div>

<div v-click="['+0', '+2']" v-drag="[490,177,384,56]" class="item">
  <div class="item-icon">
    <MaterialSymbolsLightNotificationsActiveRounded/>
  </div>
  <div>
    Уведомляет всех подписчиков о обновлении
  </div>
</div>

<heroicons-cog-solid v-click="'-1'" v-drag="[363,349,104,95]" class="animate-[spin_31s_linear_infinite]" />
<div v-click="'+0'" v-drag="[387,319,119,40]" class="text-[1em] text-shadow-xl"> track </div>

<div v-click="['+0', '+1']" v-drag="[493,366,391,54]" class="item">
  <div class="item-icon">
    <MaterialSymbolsAdd2/>
  </div>
  <div>
    Начинает отслеживание зависимости
  </div>
</div>

<mingcute-settings-7-fill v-click v-drag="[663,238,88,89]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[653,199,120,40]" class="text-[1em] text-shadow-xl"> activeSub </div>

---
topTitle: Tracking
---

<mingcute-settings-7-fill v-drag="[437,138,88,89]" class="animate-[spin_17s_linear_infinite]" />
<div v-drag="[413,166,131,40]" class="text-[1em] text-shadow-xl bg-[#00000088] px-3 rd-[8px]"> activeSub </div>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <MdiCursorPointer/>
    </div>
    <div>
      Переменная которая указывает текущий эффект
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <BiTrophyFill/>
    </div>
    <div>
      Только 1 активный эффект
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MaterialSymbolsStacks/>
    </div>
    <div>
      Работает как стек для вложенных эффектов
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MdiHandBackRightOff/>
    </div>
    <div>
      Нет ручного доступа
    </div>
  </div>
</div>

<!--
- ПРИДУМАТЬ ИЛЛЮСТРАЦИЮ (думать о шестеренках)
- подумать о спиче
- исходить от проблематики. как это помогает вью
-->

---
topTitle: Tracking
---

<IonGearA v-drag="[114,240,88,89]" class="animate-[spin_11s_linear_infinite]" />
<div  v-drag="[134,204,68,40]" class="text-[1em] text-shadow-xl"> Dep </div>

<mingcute-settings-7-fill v-drag="[698,237,88,89]" class="animate-[spin_17s_linear_infinite]" />
<div v-drag="[694,202,120,40]" class="text-[1em] text-shadow-xl"> activeSub </div>

<zondicons-cog v-click v-drag="[398,239,90,83]" class="animate-[spin_15s_linear_infinite]" />
<div v-click="'+0'" v-drag="[422,198,58,40]" class="text-[1em] text-shadow-xl"> Link </div>

<zondicons-cog v-click v-drag="[207,255,56,51]" class="animate-[spin_15s_linear_infinite] opacity-50" />

<zondicons-cog v-click="'+0'" v-drag="[250,246,56,51]" class="animate-[spin_15s_linear_infinite_reverse] opacity-50" />

<zondicons-cog v-click="'+0'" v-drag="[295,254,56,51]" class="animate-[spin_15s_linear_infinite] opacity-50" />

<zondicons-cog v-click="'+0'" v-drag="[339,246,56,51]" class="animate-[spin_15s_linear_infinite_reverse] opacity-50" />

<zondicons-cog v-click v-drag="[503,255,56,51]" class="animate-[spin_15s_linear_infinite] opacity-50" />

<zondicons-cog v-click="'+0'" v-drag="[548,246,56,51]" class="animate-[spin_15s_linear_infinite_reverse] opacity-50" />

<zondicons-cog v-click="'+0'" v-drag="[594,254,56,51]" class="animate-[spin_15s_linear_infinite] opacity-50" />

<zondicons-cog v-click="'+0'" v-drag="[639,246,56,51]" class="animate-[spin_15s_linear_infinite_reverse] opacity-50" />

---
topTitle: Tracking
---

````md magic-move
```ts
watchEffect(() => {
  const user = fetchUsers()
})
```

```ts {*|2}
watchEffect(() => {
  console.log('Loading State: ', loadingState.value)
  const user = fetchUsers()
})
```

```ts {*|1,4-6|*}
import { pauseTracking, resetTracking } from '@vue/reactivity'

watchEffect(() => {
  pauseTracking()
  console.log('Loading State: ', loadingState.value)
  resetTracking()

  const user = fetchUsers()
})
```

```ts
import { pauseTracking, resetTracking } from '@vue/reactivity'

watchEffect(() => {
  pauseTracking() // временно приостанавливает сбор зависимостей
  console.log('Loading State: ', loadingState.value)
  resetTracking() // востанавливает прежнее состояние

  const user = fetchUsers()
})
```
````

<!--
- попробовать подвести через код
- обяъснить а на кой их добавили
-->
