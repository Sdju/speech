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
  trigger: (payload: any) => void
  track: (payload: any) => void
}
```

```ts
interface Dep {
  trigger: () => void
  track: () => void
}
```
````

<!--
продумать переходы - нужно объяснить а на кой вообще я на EventEmitter смотрю. и че такое Dep
-->

---
topTitle: Tracking
clicks: 9
---

<Timeline :steps="[{
  trigger: 'sp-165_282_103_103 -popup-hidden',
  triggerDesc: '-blur-hidden',
  track: 'sp-165_282_103_103 -popup-hidden',
  trackDesc: '-blur-hidden',
  activeSub: '-popup-hidden',
  arrow1: {
    coords: '205:275 324:195',
    class: 'fx duration-500 opacity-0'
  },
  arrow2: {
    coords: '432:194 617:283',
    class: 'fx duration-500 opacity-0'
  },
  arrow3: {
    coords: '617:305 431:391',
    class: 'fx duration-500 opacity-0'
  },
  arrow4: {
    coords: '338:391 201:308',
    class: 'fx duration-500 opacity-0'
  },
}, {
  track: ' sp-379_181_120_120 ',
}, {
  trackDesc: '',
}, {
  trigger: ' sp-387_378_120_120 ',
}, {
  triggerDesc: '',
}, {
  triggerDesc: '-blur-hidden',
  trackDesc: '-blur-hidden',
  activeSub: '',
}, {
  arrow1: {
    coords: '205:275 324:195',
    class: 'fx duration-500 animate'
  },
}, {
  arrow2: {
    coords: '432:195 617:283',
    class: 'fx duration-500 animate'
  },
}, {
  arrow3: {
    coords: '617:305 431:391',
    class: 'fx duration-500 animate'
  },
}, {
  arrow4: {
    coords: '338:391 201:308',
    class: 'fx duration-500 animate'
  },
}]" v-slot="t">

<Gear name="Dep" class="sp-165_282_103_103 figure fx" />

<Gear name="Track" class="figure fx" :class="t.track" />

<div v-drag="[505,165,391,54]" class="item fx" :class="t.trackDesc">
  <div class="item-icon">
    <MaterialSymbolsAdd2/>
  </div>
  <div>
    Начинает отслеживание зависимости
  </div>
</div>

<Gear name="Trigger" class="figure fx" :class="t.trigger" />

<div v-drag="[502,360,393,56]" class="item fx" :class="t.triggerDesc">
  <div class="item-icon">
    <MaterialSymbolsLightNotificationsActiveRounded/>
  </div>
  <div>
    Уведомляет всех подписчиков о обновлении
  </div>
</div>

<Gear name="activeSub" class="figure fx sp-661_276_100_100" :class="t.activeSub" />

<SvgLayer>
  <SvgArrow :class="t.arrow1.class" :coords="t.arrow1.coords" :power="0.3" />
  <SvgArrow :class="t.arrow2.class" :coords="t.arrow2.coords" :power="0.3" />
  <SvgArrow :class="t.arrow3.class" :coords="t.arrow3.coords" :power="0.3" />
  <SvgArrow :class="t.arrow4.class" :coords="t.arrow4.coords" :power="0.3" />
</SvgLayer>

</Timeline>

<!--
дать понимание что происходит через код
-->

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

<!--
Но как же связаны между собой activeSub и Dep? Раньше для этого использовались такие структуры как Map/Set и weakmap с weakset. Но операции над множествами были дорогими. Поэтому был придуман более оптимальный способ. Вместо того чтобы хранить массивы зависимостей и слушаетелей. Реализовали идею с двусвязным списком. Элемент этой структуры называется Link. Он связывает между собой Dep и подписчика. И теперь чтобы добавить еще одного подписчика достаточно создать новый Link и вставить его в начало списка. Таким образом выстраивается цепочка зависимостей. И эти действия позволили кратно снизить потребление памяти и увеличить скорость работы.
-->

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
- добавить реализацию fechtUsers
- код синтетический
-->
