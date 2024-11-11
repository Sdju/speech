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
disabled: true
---

# СЛАЙД С СРАВНЕНИЕМ EVENT EMITTER И DEP

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
interface EventEmitter {
  emit: () => void
  on: (listener: () => void) => void
}
```

```ts
interface Dep {
  trigger: () => void
  track: () => void
}
```

```ts
interface Dep {
  trigger: () => void // похоже на EventEmitter.emit('notify', this)
  track: () => void // похоже на EventEmitter.on('notify', listener)
}
```
````

---
topTitle: Tracking
clicks: 3
---

<Timeline :steps="[{
  depClasses: 'outline outline-2 outline-[#CCCCCC88]',
  onClasses: '-blur-hidden outline-[#00000088]',
  emitClasses: '-blur-hidden outline-[#00000088]',
  baseClasses: '-blur-hidden outline-[#00000088]',
}, {
  depClasses: 'outline-[#00000088]',
  onClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  onClasses: 'outline-[#00000088]',
  emitClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  emitClasses: 'outline-[#00000088]',
  baseClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

  <Gear name="Dep" class="sp-165_282_103_103 figure fx" />

  <div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
    <div class="fx example row-span-4" />
    <div class="item fx duration-400" :class="t.depClasses">
      <div class="item-icon">
        <LucideRefreshCw/>
      </div>
      <div>
        Класс реализующий функционал зависимостей
      </div>
    </div>
    <div class="item fx duration-400" :class="t.onClasses">
      <div class="item-icon">
        <IcRoundAccessTime/>
      </div>
      <div>
        На Dep можно подписаться
      </div>
    </div>
    <div class="item fx duration-400" :class="t.emitClasses">
      <div class="item-icon">
        <FluentPeopleQueue32Filled/>
      </div>
      <div>
        Уведомляет об изменениях
      </div>
    </div>
    <div class="item fx duration-400" :class="t.baseClasses">
      <div class="item-icon">
        <FluentPeopleQueue32Filled/>
      </div>
      <div>
        Лежит в основе: <strong>ref</strong> и <strong>computed</strong>
      </div>
    </div>
  </div>

</Timeline>

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
  <SvgArrow :class="t.arrow4.class" :coords="t.arrow4.coords" :power="0.3" />
</SvgLayer>

</Timeline>

<!--
дать понимание что происходит через код
-->

---
topTitle: Tracking
clicks: 7
---

<Timeline :steps="[{
  effectClasses: 'outline outline-2 outline-[#CCCCCC88]',
  onlyOneClasses: '-blur-hidden outline-[#00000088]',
  stackClasses: '-blur-hidden outline-[#00000088]',
  noAccessClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 fx duration-500',
  example2: 'absolute pos-0 fx duration-500 size-full -blur-hidden',
  panel1: {
    class: '$obj fx duration-500 pos-50%_200 w-40% -blur-hidden',
    title: 'activeSub'
  },
  panel2: {
    class: '$obj fx duration-500 pos-50%_100 w-40% -blur-hidden',
    title: 'activeSub'
  },
  panel3: {
    class: '$obj fx duration-500 pos-50%_80 w-40% -blur-hidden',
    title: 'activeSub'
  },
}, {
  onlyOneClasses: 'outline outline-2 outline-[#CCCCCC88]',
  effectClasses: 'outline-[#00000088]',
}, {
  stackClasses: 'outline outline-2 outline-[#CCCCCC88]',
  onlyOneClasses: 'outline-[#00000088]',
  example1: 'absolute pos-0 fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500 size-full ',
  panel1: {
    class: '$obj fx duration-500 w-40% pos-50%_200 ',
  },
}, {
  panel1: {
    title: 'prevSub',
    color: 'blue',
  },
  panel2: {
    class: '$obj fx duration-500 w-40% pos-50%_140 ',
  },
}, {
  panel2: {
    title: 'prevSub',
    color: 'blue',
  },
  panel3: {
    class: '$obj fx duration-500 w-40% pos-50%_80 ',
  },
}, {
  panel2: {
    title: 'activeSub',
    color: 'green',
  },
  panel3: {
    class: '$obj fx duration-500 w-40% pos-50%_80 -blur-hidden',
  },
}, {
  panel1: {
    title: 'activeSub',
    color: 'green',
  },
  panel2: {
    class: '$obj fx duration-500 w-40% pos-50%_140 -blur-hidden',
  },
}, {
  noAccessClasses: 'outline outline-2 outline-[#CCCCCC88]',
  stackClasses: 'outline-[#00000088]',
}]" v-slot="t">

<mingcute-settings-7-fill v-drag="[447,62,88,89]" class="animate-[spin_17s_linear_infinite]" />
<div v-drag="[425,89,131,40]" class="text-[1em] text-shadow-xl bg-[#00000088] px-3 rd-[8px]"> activeSub </div>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.effectClasses">
    <div class="item-icon">
      <MdiCursorPointer/>
    </div>
    <div>
      Переменная которая указывает текущий эффект
    </div>
  </div>
  <div class="item fx duration-400" :class="t.onlyOneClasses">
    <div class="item-icon">
      <BiTrophyFill/>
    </div>
    <div>
      Только 1 активный эффект
    </div>
  </div>
  <div class="item fx duration-400" :class="t.stackClasses">
    <div class="item-icon">
      <MaterialSymbolsStacks/>
    </div>
    <div>
      Работает как стек для вложенных эффектов
    </div>
  </div>
  <div class="item fx duration-400" :class="t.noAccessClasses">
    <div class="item-icon">
      <MdiHandBackRightOff/>
    </div>
    <div>
      Нет ручного доступа
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">

<div :class="t.example1">

```ts
export let activeSub: 
  Subscriber | undefined
```

</div>

<div :class="t.example2">

<Node v-bind="t.panel1" />
<Node v-bind="t.panel2" />
<Node v-bind="t.panel3" />

</div>

  </div>
</div>

</Timeline>

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

(шашечки анимация шестеренок)
-->

---
topTitle: Tracking
---

<div v-drag="[136,234,392,40]" v-click="[0, 3]">
  <div class="w-full" v-mark.underline.red="{ at: '1'}" />
  <div font-hand c-red text-center v-click="1">Effect</div>
</div>

<div v-drag="[404,172,114,40]" v-click="[0, 3]">
  <div font-hand c-blue text-center v-click="2">Dependency</div>
  <div class="w-full" v-mark.underline.blue="{ at: '2'}" />
</div>

<div v-drag="[493,168,114,40]" v-click="[0, 6]">
  <div font-hand c-blue text-center v-click="4">Dependency</div>
  <div class="w-full" v-mark.underline.blue="{ at: '4'}" />
</div>

<div v-drag="[434,269,128,40]" v-click="[0, 6]">
  <div class="w-full" v-mark.underline.blue="{ at: '5'}" />
  <div font-hand c-blue text-center v-click="5">Dependency</div>
</div>

<div v-drag="[178,152,174,40]">
  <div font-hand c-red text-center v-click="11">Effect</div>
  <div class="w-full" v-mark.underline.red="{ at: '11'}" />
</div>

````md magic-move
```ts {*|*|*}
watchEffect(() => {
  const { user } = fetchUsers(userId.value)
})





⠀
```

```ts {*|*|*}
watchEffect(() => {
  const { user, loading } = fetchUsers(userId.value)

  console.log('Loading State: ', loading.value)
})  



⠀
```

```ts {*|1|6-8|*}
import { pauseTracking, resetTracking } from '@vue/reactivity'

watchEffect(() => {
  const { user, loading } = fetchUsers(userId.value)

  pauseTracking()
  console.log('Loading State: ', loading.value)
  resetTracking()
})
```

```ts {*|*}
watch(() => userId.value, (id) => {
  const { user, loading } = fetchUsers(id)

  console.log('Loading State: ', loading.value)
})



⠀
```
````

<!--
сделать иллюстрацию либо ответси к коллбеку (показать замкнутость цикла)
-->
