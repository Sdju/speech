---
layout: center
topTitle: Subscribers
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

---
topTitle: Subscribers
---

<Timeline2 :steps="[{
  effectClasses: 'outline outline-2 outline-[#CCCCCC88]',
  schedulerClasses: '-blur-hidden outline-[#00000088]',
  batchClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 fx duration-500',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
}, {
}, {
}, {
}, {
}, {
  effectClasses: 'outline-[#00000088]',
  schedulerClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500',
}, {
  schedulerClasses: 'outline-[#00000088]',
  batchClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500',
}]" v-slot="t">

<h1 class="text-center">watchEffect</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.effectClasses">
    <div class="item-icon">
      <MaterialSymbolsContentCopyRounded/>
    </div>
    <div>
      Работает как и <strong>effect</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.schedulerClasses">
    <div class="item-icon">
      <UisSchedule/>
    </div>
    <div>
      Управляется планировщиком
    </div>
  </div>
  <div class="item fx duration-400" :class="t.batchClasses">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Использует возможности батчинга
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">

<div :class="t.example1">

````md magic-move {lines: false}
```ts
const a = ref(1)
effect(() => {
  console.log(a.value)
})
```
```ts
const a = ref(1)
watchEffect(() => {
  console.log(a.value)
})
```
```ts
const a = ref(1)
watchEffect((onCleanup) => {
  console.log(a.value)
  onCleanup(() => {
    console.log('cleanup')
  })
})
```
```ts
const a = ref(1)
watchEffect(() => {
  console.log(a.value)
  onWatcherCleanup(() => {
    console.log('cleanup')
  })
})
```
```ts
const a = ref(1)
const b = watchEffect(() => 
  /* ... */
)
b.stop()
b.pause()
b.resume()
b()
```
````

</div>

<div :class="t.example2">

```ts
const a = ref(1)
watchEffect(() => {
  console.log(a.value)
}, {
  flush: 'post'
})
```

</div>

<div :class="t.example3">

```ts
const a = ref(1)
watchEffect(() => {
  console.log(a.value)
})
a.value++
a.value++
a.value++

// 1 4
```

</div>

  </div>
</div>

</Timeline2>

---
topTitle: Subscribers
---

<Timeline2 :steps="[{
  effectClasses: 'outline outline-2 outline-[#CCCCCC88]',
  schedulerClasses: '-blur-hidden outline-[#00000088]',
  batchClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 fx duration-500',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
}, {
}, {
}, {
}, {
}, {
  effectClasses: 'outline-[#00000088]',
  schedulerClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500',
}, {
  schedulerClasses: 'outline-[#00000088]',
  batchClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500',
}]" v-slot="t">

<h1 class="text-center">watch</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.effectClasses">
    <div class="item-icon">
      <MaterialSymbolsContentCopyRounded/>
    </div>
    <div>
      Сбор зависимостей в отдельным параметром
    </div>
  </div>
  <div class="item fx duration-400" :class="t.schedulerClasses">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Использует возможности батчинга
    </div>
  </div>
  <div class="item fx duration-400" :class="t.batchClasses">
    <div class="item-icon">
      <MaterialSymbolsWeightOutline/>
    </div>
    <div>
      При передаче значения напрямую, то будет глубокая реактивность
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">

<div :class="t.example1">

````md magic-move {lines: false}
```ts
const a = ref(1)
watchEffect(() => {
  console.log(a.value)
})
```
```ts
const a = ref(1)
watch(() => a.value, (value, oldV) => {
  console.log(old - value)
}, { immediate: true })
```
```ts
const a = ref(1)
watch(() => a.value, (value) => {
  console.log(value)
})
```
```ts
const a = ref(1)
watch(() => a.value, (value, oldV) => {
  console.log(old - value)
})
```
````

</div>

<div :class="t.example2">

```ts
const a = ref(1)
watch(() => a.value, (value) => {
  console.log(value)
})
a.value++
a.value++
a.value++

// 4
```

</div>

<div :class="t.example3">

````md magic-move { at: 7, lines: false}
```ts
const a = ref(bigBigObject)
watch(a, (value) => {
  console.log(value)
})
```
```ts
const a = ref(bigBigObject)
watch(a, (value) => {
  console.log(value)
}, { deep: false })
```
```ts
const a = ref(bigBigObject)
watch(() => a.value, (value) => {
  console.log(value)
})
```
````

</div>

  </div>
</div>

</Timeline2>

---
topTitle: Subscribers
---

<Timeline2 :steps="[{
  syncClasses: 'outline outline-2 outline-[#CCCCCC88]',
  tickClasses: '-blur-hidden outline-[#00000088]',
  queueClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 size-full fx duration-500',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
}, {
  syncClasses: 'outline-[#00000088]',
  tickClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500',
}, {
  tickClasses: 'outline-[#00000088]',
  queueClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 size-full fx duration-500',
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
      Синхронизация в очереди микротасков
    </div>
  </div>
  <div class="item fx example row-span-4 overflow-hidden no-bg" :class="t.exampleClasses">

<div :class="t.example1">
  <img src="/img/schedule.gif" class="absolute pos-0 size-full framed" />
</div>

<div :class="t.example2">

```ts
nextTick(() => {
  console.log('nextTick')
})

nextTick.then(() => {
  console.log('nextTick.then')
})

await nextTick()
console.log('await nextTick')
```

</div>

<div :class="t.example3">
<img src="/img/schedule.gif" class="absolute pos-0 size-full framed" />
</div>

  </div>
</div>

</Timeline2>

---
topTitle: Scheduler
---

<Timeline2 :steps="[{
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

</Timeline2>

---
topTitle: Subscribers
---

<Timeline2 :steps="[{
  domClasses: 'outline outline-2 outline-[#CCCCCC88]',
  defaultClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 size-full fx duration-500',
  example2: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
}, {
  domClasses: 'outline-[#00000088]',
  defaultClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 size-full fx duration-500',
}]" v-slot="t">

<h1 class="text-center">pre</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.domClasses">
    <div class="item-icon">
      <MdiWeatherSunset/>
    </div>
    <div>
      Исполнение до обновления DOM
    </div>
  </div>
  <div class="item fx duration-400" :class="t.defaultClasses">
    <div class="item-icon">
      <IcOutlineInsertDriveFile/>
    </div>
    <div>
      Режим работы по-умолчанию
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">

<div :class="t.example1">

```ts { lines: false }
watchEffect(() => {
  console.log(
    myElement.value.clientWidth
  )
})
```

</div>

<div :class="t.example2">

  ```ts { lines: false }
  watchEffect(() => {
    console.log(
      myElement.value.clientWidth
    )
  })

  watchEffect(() => {
    console.log('pre')
  }, { flush: 'pre' })
  ```

</div>

  </div>
</div>

</Timeline2>

---
topTitle: Subscribers
---

<Timeline2 :steps="[{
  afterClasses: 'outline outline-2 outline-[#CCCCCC88]',
  postClasses: '-blur-hidden outline-[#00000088]',
  ssrClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 size-full fx duration-500',
  example2: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
}, {
  afterClasses: 'outline-[#00000088]',
  postClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 size-full fx duration-500',
}, {
  postClasses: 'outline-[#00000088]',
  ssrClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example2: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 size-full fx duration-500',
}]" v-slot="t">

<h1 class="text-center">post</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.afterClasses">
    <div class="item-icon">
      <MynauiConfig/>
    </div>
    <div>
      Требует опции <strong>flush: post</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.postClasses">
    <div class="item-icon">
      <PhClockAfternoonBold/>
    </div>
    <div>
      Исполнение после обновления DOM
    </div>
  </div>
  <div class="item fx duration-400" :class="t.ssrClasses">
    <div class="item-icon">
      <MdiServerNetwork/>
    </div>
    <div>
      Не работает в SSR
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">

<div :class="t.example1">

```ts { lines: false }
watchEffect(() => {
  console.log(myElement.value)
}, { flush: 'post' })
```

</div>

<div :class="t.example2">

  ```ts { lines: false }
  watchEffect(() => {
    console.log(
      myElement.value.clientWidth
    )
  }, { flush: 'post' })
  ```

</div>
<div :class="t.example3">
<img src="/img/shrug.png" class="absolute pos-0 size-full framed" />
</div>

  </div>
</div>

</Timeline2>

---
topTitle: Subscribers
---

<Timeline2 :steps="[{
  syncClasses: 'outline outline-2 outline-[#CCCCCC88]',
  optionClasses: '-blur-hidden outline-[#00000088]',
  batchClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 size-full fx duration-500',
  example2: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
}, {
  syncClasses: 'outline-[#00000088]',
  optionClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 size-full fx duration-500',
}, {
  optionClasses: 'outline-[#00000088]',
  batchClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example2: 'absolute pos-0 size-full fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 size-full fx duration-500',
}]" v-slot="t">

<h1 class="text-center">sync</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.syncClasses">
    <div class="item-icon">
      <MynauiConfig/>
    </div>
    <div>
      Требует опции <strong>flush: sync</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.optionClasses">
    <div class="item-icon">
      <MaterialSymbolsRefresh/>
    </div>
    <div>
      Исполнение в синхронном режиме
    </div>
  </div>
  <div class="item fx duration-400" :class="t.batchClasses">
    <div class="item-icon">
      <StreamlineInterfaceSettingMenu2ButtonParallelHorizontalLinesMenuNavigationStaggeredThreeHamburger/>
    </div>
    <div>
      Игнорирует возможности батчинга
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">

<div :class="t.example1">

```ts { lines: false }
watchEffect(() => {
  console.log(my.value)
}, { flush: 'sync' })
```

</div>

<div :class="t.example2">

  ```ts { lines: false }
  const my = ref(0)
  watchEffect(() => {
    console.log(my.value)
  }, { flush: 'sync' })

  my.value++
  console.log('sync')

  // 0 1 sync
  ```

</div>
<div :class="t.example3">

  ```ts { lines: false }
  const my = ref(0)
  watchEffect(() => {
    console.log(my.value)
  }, { flush: 'sync' })

  my.value++
  my.value++
  my.value++
  console.log('sync')

  // 0 1 2 3 sync
  ```

</div>

  </div>
</div>

</Timeline2>

---
layout: center
---

# Push / Pull реактивность

<img class="center w-[740px] slide" src="/img/push-pull.png" />

<div v-drag="[325,89,61,40]">Push</div>

<div v-drag="[570,145,48,40]">Pull</div>

---
disabled: true
---

<Timeline2 :steps="[{
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

</Timeline2>

---
topTitle: Subscribers
---

<Timeline2 :steps="[{
  pullClasses: 'outline outline-2 outline-[#CCCCCC88]',
  noSubsClasses: '-blur-hidden outline-[#00000088]',
  callClasses: '-blur-hidden outline-[#00000088]',
  batchClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
  example1: 'absolute pos-0 fx duration-500',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
  example4: 'absolute pos-0 fx duration-500 -blur-hidden',
}, {
  pullClasses: 'outline-[#00000088]',
  noSubsClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example1: 'absolute pos-0 fx duration-500 -blur-hidden',
  example2: 'absolute pos-0 fx duration-500',
}, {
  noSubsClasses: 'outline-[#00000088]',
  callClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example2: 'absolute pos-0 fx duration-500 -blur-hidden',
  example3: 'absolute pos-0 fx duration-500',
}, {
  callClasses: 'outline-[#00000088]',
  batchClasses: 'outline outline-2 outline-[#CCCCCC88]',
  example3: 'absolute pos-0 fx duration-500 -blur-hidden',
  example4: 'absolute pos-0 fx duration-500',
}]" v-slot="t">

<h1 class="text-center">computed</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.pullClasses">
    <div class="item-icon">
      <CarbonContainerImagePushPull/>
    </div>
    <div>
      Работает по принципу <strong>Pull-реактивности</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.noSubsClasses">
    <div class="item-icon">
      <MaterialSymbolsHourglassEmptyRounded/>
    </div>
    <div>
      Нет подписчиков - нет и обновлений
    </div>
  </div>
  <div class="item fx duration-400" :class="t.callClasses">
    <div class="item-icon">
      <MynauiRefresh/>
    </div>
    <div>
      Пересчет в момент вызова
    </div>
  </div>
  <div class="item fx duration-400" :class="t.batchClasses">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Работает с батчингом
    </div>
  </div>
  <div class="item fx example row-span-4 no-bg" :class="t.exampleClasses">

<div :class="t.example1">

```ts { lines: false }
const a = ref(1)
const b = computed(() => a.value * 2)
const c = computed(() => b.value + 1)

console.log(c.value)
// 3
```

</div>

<div :class="t.example2">

  ```ts { lines: false }
  const a = ref(1)
  const b = computed(() => a.value * 2)
  const c = computed(() => b.value + 1)

  // никогда не будут вычислены
  ```

</div>

<div :class="t.example3">

  ```ts { lines: false }
  const a = ref(1)
  const b = computed(() => a.value * 2)

  console.log(b.value) // 2
  a.value = 5
  console.log(b.value) // 10
  a.value = 8

  // b не будет больше перевичслен
  ```

</div>

<div :class="t.example4">

  ```ts { lines: false }
  const a = ref(1)
  const b = computed(() => a.value * 2)

  console.log(b.value) // 2
  a.value = 5
  a.value = 8
  console.log(b.value) // 16
  ```

</div>

  </div>
</div>

</Timeline2>
