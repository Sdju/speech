---
layout: center
topTitle: Subscribers
topTitleClass: transition-none top-[220px] left-[50%] text-[4em] translate-x-[-50%]
---

---
topTitle: Subscribers
---

<h1 class="text-center">watchEffect</h1>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <MaterialSymbolsContentCopyRounded/>
    </div>
    <div>
      Работает как и <strong>effect</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <UisSchedule/>
    </div>
    <div>
      Управляется планировщиком
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Использует возможности батчинга
    </div>
  </div>
</div>

---
topTitle: Subscribers
---

<h1 class="text-center">watch</h1>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <MaterialSymbolsContentCopyRounded/>
    </div>
    <div>
      Сбор зависимостей в отдельным параметром
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Использует возможности батчинга
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <MaterialSymbolsArrowSplit/>
    </div>
    <div>
      При передаче значения напрямую, то будет глубокая реактивность
    </div>
  </div>
</div>

---
topTitle: Subscribers
---

<Gear v-drag="[41,283,109,100]" name="watchers" />

<div v-click v-drag="[419,65,47,40]" class="text-shadow-lg"> pre </div>

<div v-click v-drag="[501,26,434,60]" class="item">
  <div class="item-icon">
    <MaterialSymbolsContentCopyRounded/>
  </div>
  <div>
    Исполнение до обновления DOM
  </div>
</div>

<div v-click v-drag="[500,92,434,60]" class="item">
  <div class="item-icon">
    <UisSchedule/>
  </div>
  <div>
    Режим работы по-умолчанию
  </div>
</div>

<div v-click v-drag="[422,223,109,40]" class="text-shadow-lg"> post </div>

<div v-click v-drag="[496,177,434,60]" class="item">
  <div class="item-icon">
    <MaterialSymbolsContentCopyRounded/>
  </div>
  <div>
    Исполнение после обновления DOM
  </div>
</div>

<div v-click v-drag="[496,243,434,60]" class="item">
  <div class="item-icon">
    <UisSchedule/>
  </div>
  <div>
    Требует опции <strong>flush: post</strong>
  </div>
</div>

<div v-click v-drag="[420,412,57,40]" class="text-shadow-lg"> sync </div>

<div v-click v-drag="[496,333,434,60]" class="item">
  <div class="item-icon">
    <MaterialSymbolsContentCopyRounded/>
  </div>
  <div>
    Исполнение в синхронном режиме
  </div>
</div>

<div v-click v-drag="[496,397,434,60]" class="item">
  <div class="item-icon">
    <UisSchedule/>
  </div>
  <div>
    Требует опции <strong>flush: sync</strong>
  </div>
</div>

<div v-click v-drag="[496,461,434,60]" class="item">
  <div class="item-icon">
    <UisSchedule/>
  </div>
  <div>
    Игнорирует возможности батчинга
  </div>
</div>

---
topTitle: Subscribers
---

<h1 class="text-center">computed</h1>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click class="item">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Работает по принципу <strong>Pull-реактивности</strong>
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Нет подписчиков - нет и обновлений
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <UisSchedule/>
    </div>
    <div>
      Перечисление в момент вызова
    </div>
  </div>
  <div v-click class="item">
    <div class="item-icon">
      <UilBox/>
    </div>
    <div>
      Работает с батчингом
    </div>
  </div>
</div>
