---
layout: center
topTitle: Subscribers
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

---
topTitle: Subscribers
clicks: 5
---

<Timeline :steps="[{
  effectClasses: 'outline outline-2 outline-[#CCCCCC88]',
  schedulerClasses: '-blur-hidden outline-[#00000088]',
  batchClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  effectClasses: 'outline-[#00000088]',
  schedulerClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  schedulerClasses: 'outline-[#00000088]',
  batchClasses: 'outline outline-2 outline-[#CCCCCC88]',
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
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>

---
topTitle: Subscribers
clicks: 5
---

<Timeline :steps="[{
  effectClasses: 'outline outline-2 outline-[#CCCCCC88]',
  schedulerClasses: '-blur-hidden outline-[#00000088]',
  batchClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  effectClasses: 'outline-[#00000088]',
  schedulerClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  schedulerClasses: 'outline-[#00000088]',
  batchClasses: 'outline outline-2 outline-[#CCCCCC88]',
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
      <MaterialSymbolsArrowSplit/>
    </div>
    <div>
      При передаче значения напрямую, то будет глубокая реактивность
    </div>
  </div>
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>

---
topTitle: Subscribers
clicks: 5
---

<Timeline :steps="[{
  domClasses: 'outline outline-2 outline-[#CCCCCC88]',
  defaultClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  domClasses: 'outline-[#00000088]',
  defaultClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<h1 class="text-center">pre</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.domClasses">
    <div class="item-icon">
      <MaterialSymbolsContentCopyRounded/>
    </div>
    <div>
      Исполнение до обновления DOM
    </div>
  </div>
  <div class="item fx duration-400" :class="t.defaultClasses">
    <div class="item-icon">
      <UisSchedule/>
    </div>
    <div>
      Режим работы по-умолчанию
    </div>
  </div>
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>

---
topTitle: Subscribers
clicks: 5
---

<Timeline :steps="[{
  afterClasses: 'outline outline-2 outline-[#CCCCCC88]',
  postClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  afterClasses: 'outline-[#00000088]',
  postClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<h1 class="text-center">post</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.afterClasses">
    <div class="item-icon">
      <MaterialSymbolsContentCopyRounded/>
    </div>
    <div>
      Исполнение после обновления DOM
    </div>
  </div>
  <div class="item fx duration-400" :class="t.postClasses">
    <div class="item-icon">
      <UisSchedule/>
    </div>
    <div>
      Требует опции <strong>flush: post</strong>
    </div>
  </div>
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>

---
topTitle: Subscribers
clicks: 5
---

<Timeline :steps="[{
  syncClasses: 'outline outline-2 outline-[#CCCCCC88]',
  optionClasses: '-blur-hidden outline-[#00000088]',
  batchClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  syncClasses: 'outline-[#00000088]',
  optionClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  optionClasses: 'outline-[#00000088]',
  batchClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<h1 class="text-center">sync</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.syncClasses">
    <div class="item-icon">
      <MaterialSymbolsContentCopyRounded/>
    </div>
    <div>
      Исполнение в синхронном режиме
    </div>
  </div>
  <div class="item fx duration-400" :class="t.optionClasses">
    <div class="item-icon">
      <UisSchedule/>
    </div>
    <div>
      Требует опции <strong>flush: sync</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.batchClasses">
    <div class="item-icon">
      <UisSchedule/>
    </div>
    <div>
      Игнорирует возможности батчинга
    </div>
  </div>
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>

---
topTitle: Subscribers
clicks: 5
---

<Timeline :steps="[{
  pullClasses: 'outline outline-2 outline-[#CCCCCC88]',
  noSubsClasses: '-blur-hidden outline-[#00000088]',
  callClasses: '-blur-hidden outline-[#00000088]',
  batchClasses: '-blur-hidden outline-[#00000088]',
  exampleClasses: '',
}, {
  pullClasses: 'outline-[#00000088]',
  noSubsClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  noSubsClasses: 'outline-[#00000088]',
  callClasses: 'outline outline-2 outline-[#CCCCCC88]',
}, {
  callClasses: 'outline-[#00000088]',
  batchClasses: 'outline outline-2 outline-[#CCCCCC88]',
}]" v-slot="t">

<h1 class="text-center">computed</h1>

<div class="grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12">
  <div class="item fx duration-400" :class="t.pullClasses">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Работает по принципу <strong>Pull-реактивности</strong>
    </div>
  </div>
  <div class="item fx duration-400" :class="t.noSubsClasses">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Нет подписчиков - нет и обновлений
    </div>
  </div>
  <div class="item fx duration-400" :class="t.callClasses">
    <div class="item-icon">
      <UisSchedule/>
    </div>
    <div>
      Перечисление в момент вызова
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
  <div class="item fx example row-span-4" :class="t.exampleClasses">
    
  </div>
</div>

</Timeline>
