---
layout: center
topTitle: Sources
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

<!--
встроить переход в сценарий
-->

---
topTitle: Sources
clicks: 7
---

<Timeline :steps="[{
  proxyClasses: 'outline outline-2 outline-[#CCCCCC88]',
  nestedClasses: '-blur-hidden outline-[#00000088]',
  shallowClasses: '-blur-hidden outline-[#00000088]',
  autoClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  proxyClasses: 'outline-[#00000088]',
  nestedClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  nestedClasses: 'outline-[#00000088]',
  shallowClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  shallowClasses: 'outline-[#00000088]',
  autoClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<h1 class="text-center">Reactive</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.proxyClasses">
    <div class="item-icon">
      <EosIconsProxy/>
    </div>
    <div>
      Основан на работе с <strong>Proxy</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.nestedClasses">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Вложенные объекты оборачиваются в <strong>Reactive</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.shallowClasses">
    <div class="item-icon">
      <StreamlineAiGenerateVariationSparkSolid/>
    </div>
    <div>
      <strong>shallow</strong> / <strong>readonly</strong> / <strong>shallowReadonly</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.autoClasses">
    <div class="item-icon">
      <MaterialSymbolsChipExtraction/>
    </div>
    <div>
      Автоматически развернет <strong>.value</strong> 
    </div>
  </div>
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>

<!--
- буллеты соединить с примерами из кода (сделать примеры кода сопроводительными) / илюстрациями
- опробьовать примеры с колонками
-->

---
topTitle: Sources
---

````md magic-move {at: 1}
```ts
const obj = thirdPartyObject()


⠀
```

```ts
import { ReactiveFlags } from 'vue'

const obj = thirdPartyObject()
obj[ReactiveFlags.SKIP] = true
```

```ts {*|*}
import { markRaw } from 'vue'

const obj = thirdPartyObject()
markRaw(obj)
```

```ts
import { isReactive } from 'vue'

const obj = isReactive(data)
⠀
```

```ts
import { readonly } from 'vue'

const obj = readonly(data)
⠀
```

```ts
import { readonly, isReadonly } from 'vue'

const obj = readonly(data)
const readonly = isReadonly(data)
```

```ts
import { shallowReactive, shallowReadonly } from 'vue'

const obj = shallowReactive(data)
const readonly = shallowReadonly(data)
```

```ts
import { shallowReactive, shallowReadonly } from 'vue'

const obj = shallowReactive(data)
const readonly = shallowReadonly(data)
```

```ts
import { ReactiveFlags } from 'vue'

const obj = reactive(data)
console.log(obj[ReactiveFlags.RAW] === data)
```

```ts
import { toRaw } from 'vue'

const obj = reactive(data)
console.log(toRaw(obj) === data)
```
````

---
topTitle: Sources
clicks: 8
---

<Timeline :steps="[{
  getterClasses: 'outline outline-2 outline-[#CCCCCC88]',
  objectClasses: '-blur-hidden outline-[#00000088]',
  refClasses: '-blur-hidden outline-[#00000088]',
  speedClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  getterClasses: 'outline-[#00000088]',
  objectClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  objectClasses: 'outline-[#00000088]',
  refClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  refClasses: 'outline-[#00000088]',
  speedClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<h1 class="text-center">ref</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.getterClasses">
    <div class="item-icon">
      <EosIconsProxy/>
    </div>
    <div>
      Работает на основе <strong>getter / setter</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.objectClasses">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Объекты оборачиваются в <strong>Reactive</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.refClasses">
    <div class="item-icon">
      <HugeiconsRecycle03/>
    </div>
    <div>
      Если в <strong>ref</strong> положить <strong>ref</strong> то вернется старый <strong>ref</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.speedClasses">
    <div class="item-icon">
      <MdiBikeFast/>
    </div>
    <div>
      Работает быстрее чем <strong>Reactive</strong>
    </div>
  </div>
  <div class="item fx example row-span-3" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>

---
topTitle: Sources
clicks: 5
---

<Timeline :steps="[{
  getterClasses: 'outline outline-2 outline-[#CCCCCC88]',
  objectClasses: '-blur-hidden outline-[#00000088]',
  refClasses: '-blur-hidden outline-[#00000088]',
  speedClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  getterClasses: 'outline-[#00000088]',
  objectClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  objectClasses: 'outline-[#00000088]',
  refClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  refClasses: 'outline-[#00000088]',
  speedClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<h1 class="text-center">shallowRef</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.getterClasses">
    <div class="item-icon">
      <AkarIconsCross/>
    </div>
    <div>
      Не оборачивает объекты в <strong>Reactive</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.objectClasses">
    <div class="item-icon">
      <Fa6RegularClone/>
    </div>
    <div>
      Ничем не отличается от <strong>ref</strong> для примитивов
    </div>
  </div>
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>

---
layout: center
---

# Push / Pull реактивность

<img class="center w-[740px] slide" src="/img/push-pull.png" />

<div v-drag="[325,89,61,40]">Push</div>

<div v-drag="[570,145,48,40]">Pull</div>

---
clicks: 10
---

<Timeline :steps="[{
  node1_1: {
    class: 'pos-290_290 size-48 -popup-hidden',
    form: 'circle',
  },
  arrow1_1To2_1: {
    coords: '307:265 370:215',
    class: 'fx duration-500 opacity-0',
    power: 0.3,
  },
  arrow1_1To2_2: {
    coords: '307:312 370:355',
    class: 'fx duration-500 opacity-0',
    power: -0.3,
  },
  node2_1: {
    class: 'pos-400_215 size-48 -popup-hidden',
    form: 'circle',
  },
  arrow2_1To3_1: {
    coords: '417:192 482:140',
    class: 'fx duration-500 opacity-0',
    power: 0.3,
  },
  arrow2_1To3_2: {
    coords: '417:235 482:290',
    class: 'fx duration-500 opacity-0',
    power: -0.3,
  },
  node2_2: {
    class: 'pos-400_355 size-48 -popup-hidden',
    form: 'circle',
  },
  arrow2_2To3_3: {
    coords: '417:376 482:430',
    class: 'fx duration-500 opacity-0',
    power: -0.3,
  },
  node3_1: {
    class: 'pos-510_140 size-48 -popup-hidden',
    form: 'circle',
  },
  node3_2: {
    class: 'pos-510_290 size-48 -popup-hidden',
    form: 'circle',
  },
  node3_3: {
    class: 'pos-510_430 size-48 -popup-hidden',
    form: 'circle',
  },
}, {
  node1_1: {
    class: 'pos-290_290 size-48 ',
  },
}, {
  arrow1_1To2_1: {
    class: 'fx duration-500 animate'
  },
  arrow1_1To2_2: {
    class: 'fx duration-500 animate'
  },
  node2_1: {
    class: 'pos-400_215 size-48 ',
  },
  node2_2: {
    class: 'pos-400_355 size-48 ',
  },
}, {
  arrow2_1To3_1: {
    class: 'fx duration-500 animate'
  },
  arrow2_1To3_2: {
    class: 'fx duration-500 animate'
  },
  arrow2_2To3_3: {
    class: 'fx duration-500 animate'
  },
  node3_1: {
    class: 'pos-510_140 size-48 ',
  },
  node3_2: {
    class: 'pos-510_290 size-48 ',
  },
  node3_3: {
    class: 'pos-510_430 size-48 ',
  },
}, {
  node1_1: {
    color: 'red',
  },
}, {
  node2_1: {
    color: 'red',
  },
  node2_2: {
    color: 'red',
  },
}, {
  node3_1: {
    color: 'red',
  },
  node3_2: {
    color: 'red',
  },
  node3_3: {
    color: 'red',
  },
}]" v-slot="t">

<Node v-bind="t.node1_1" />
<Node v-bind="t.node2_1" />
<Node v-bind="t.node2_2" />
<Node v-bind="t.node3_1" />
<Node v-bind="t.node3_2" />
<Node v-bind="t.node3_3" />

<SvgLayer>
  <SvgArrow v-bind="t.arrow1_1To2_1" />
  <SvgArrow v-bind="t.arrow1_1To2_2" />
  <SvgArrow v-bind="t.arrow2_1To3_1" />
  <SvgArrow v-bind="t.arrow2_1To3_2" />
  <SvgArrow v-bind="t.arrow2_2To3_3" />
</SvgLayer>

</Timeline>

---
topTitle: Scheduler
clicks: 7
---

<Timeline :steps="[{
  update: {
    class: 'pos-287_292 -popup-hidden',
  },
  arrowUpdateToSync: {
    coords: '287:265 358:186',
    class: 'fx duration-500 opacity-0',
    power: 0.5,
  },
  sync: {
    class: 'pos-402_183 -popup-hidden',
    color: 'red',
    form: 'circle',
  },
  arrowSyncToScheduler: {
    coords: '445:182 492:182',
    class: 'fx duration-500 opacity-0',
    power: 0.1,
  },
  scheduler: {
    class: 'pos-645_274 -popup-hidden',
  },
  arrowSchedulerToPre: {
    coords: '632:186 700:265',
    class: 'fx duration-500 opacity-0',
    power: 0.4,
  },
  pre: {
    class: 'pos-700_292 -popup-hidden',
    color: 'red',
    form: 'circle',
  },
  arrowPreToDOM: {
    coords: '700:319 616:396',
    class: 'fx duration-500 opacity-0',
    power: 0.5,
  },
  dom: {
    class: 'pos-570_394 -popup-hidden',
  },
  arrowDomToPost: {
    coords: '525:394 448:394',
    class: 'fx duration-500 opacity-0',
    power: 0.1,
  },
  post: {
    class: 'pos-407_394 -popup-hidden',
    color: 'red',
    form: 'circle',
  },
  arrowPostToUpdate: {
    coords: '366:394 287:319',
    class: 'fx duration-500 opacity-0',
    power: 0.5,
  },
}, {
  update: {
    class: 'pos-287_292 ',
  },
}, {
  sync: {
    class: 'pos-402_183 ',
  },
  arrowUpdateToSync: {
    class: 'fx duration-500 animate'
  },
}, {
  scheduler: {
    class: 'pos-563_177 ',
  },
  arrowSyncToScheduler: {
    class: 'fx duration-500 animate'
  },
}, {
  pre: {
    class: 'pos-700_292 ',
  },
  arrowSchedulerToPre: {
    class: 'fx duration-500 animate'
  },
}, {
  dom: {
    class: 'pos-570_394 ',
  },
  arrowPreToDOM: {
    class: 'fx duration-500 animate'
  },
}, {
  post: {
    class: 'pos-407_394 ',
  },
  arrowDomToPost: {
    class: 'fx duration-500 animate'
  },
}, {
  arrowPostToUpdate: {
    class: 'fx duration-500 animate'
  },
}]" v-slot="t">

<Node v-bind="t.update">Update</Node>
<Node v-bind="t.sync">Sync</Node>
<Node v-bind="t.scheduler">Scheduler</Node>
<Node v-bind="t.pre">Pre</Node>
<Node v-bind="t.dom">DOM</Node>
<Node v-bind="t.post">Post</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrowUpdateToSync" />
  <SvgArrow v-bind="t.arrowSyncToScheduler" />
  <SvgArrow v-bind="t.arrowSchedulerToPre" />
  <SvgArrow v-bind="t.arrowPreToDOM" />
  <SvgArrow v-bind="t.arrowDomToPost" />
  <SvgArrow v-bind="t.arrowPostToUpdate" />
</SvgLayer>

</Timeline>

---
clicks: 5
---

<Timeline :steps="[{
  syncClasses: 'outline outline-2 outline-[#CCCCCC88]',
  tickClasses: '-blur-hidden outline-[#00000088]',
  queueClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  syncClasses: 'outline-[#00000088]',
  tickClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  tickClasses: 'outline-[#00000088]',
  queueClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<h1 class="text-center">Scheduler</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.syncClasses">
    <div class="item-icon">
      <LucideRefreshCw/>
    </div>
    <div>
      Механизм синхронизирующий обновления
    </div>
  </div>
  <div class="item fx duration-400" :class="t.tickClasses">
    <div class="item-icon">
      <IcRoundAccessTime/>
    </div>
    <div>
      Доступное API: <strong>nextTick</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.queueClasses">
    <div class="item-icon">
      <FluentPeopleQueue32Filled/>
    </div>
    <div>
      Синхронизация в конце очереди микротасков
    </div>
  </div>
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>
