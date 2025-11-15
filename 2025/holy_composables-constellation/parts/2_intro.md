---
timeline:
  - box1: '-blur-hidden'
    box2: '-blur-hidden'
    box3: '-blur-hidden'
  - box1: ''
  - box2: ''
  - box3: ''
---

<div class="grid grid-cols-12 grid-rows-[120px_120px_1fr] gap-4 h-full relative top-[-12px]">
  <div class="bento-6_3 box box--rich cs-blue">
    <img class="absolute inset-0 w-full h-full object-cover" src="/img/photo.png" />
    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg-keyword)] to-transparent p-6">
      <p class="text-4xl font-bold text-center text-white mb-2">Денис Чернов</p>
    </div>
  </div>
  <div class="bento-3_2 box box--rich cs-purple flex-center fx" :class="t.box1">
    <QrCodeIntro class="size-180" />
    <p class="text-white text-center text-lg">@zede_code</p>
  </div>
  <div class="bento-3_1 box box--rich cs-orange flex items-center gap-4 fx" :class="t.box2">
    <div class="size-80 rd-xl">
      <ZedeIcon class="size-full" />
    </div>
    <div>
      <h4 class="text-xl font-semibold text-orange-300 mb-1">Zede</h4>
      <p class="text-sm text-orange-400/70">@zede_code</p>
    </div>
  </div>
  <div class="bento-3_1 box box--rich cs-green flex items-center gap-4 fx" :class="t.box2">
    <div class="size-80 rd-xl of-hidden">
      <img src="../img/vueist.png" class="size-full object-cover" />
    </div>
    <div>
      <h4 class="text-xl font-semibold text-green-300 mb-1">Vueist</h4>
      <p class="text-sm text-green-400/70">@vueist</p>
    </div>
  </div>
  <div class="col-span-6 row-span-1 box box--rich cs-purple fx" :class="t.box3">
    <h4 class="text-lg font-semibold text-purple-300 mb-4">SM Lab</h4>
  </div>
</div>

---

<LogosVue class="$obj sp-486_278_400_400" />

---

<img src="../img/holy.png" class="$obj pos-486_278" />

---
shading: true
timeline:
  - point1: 'active'
    point2: 'hidden'
    point3: 'hidden'
    point4: 'hidden'
    example: 'pos-0 fx duration-500 cs-red'
  - point1: ''
    point2: 'active'
    example: 'cs-blue'
  - point2: ''
    point3: 'active'
    example: 'cs-green'
  - point3: ''
    point4: 'active'
    example: 'cs-purple'
---

<h1 class="text-center">План на сегодня</h1>

<Points>
  <Point icon="i-lineicons-bricks" :attrs="t.point1" class="cs-red">
    Что такое же композаблы
  </Point>
  <Point icon="i-mingcute-baby-fill" :attrs="t.point2" class="cs-blue">
    Овладеем основами
  </Point>
  <Point icon="i-ri-graduation-cap-fill" :attrs="t.point3" class="cs-green">
    Познакомимся с паттернами
  </Point>
  <Point icon="i-game-icons-trophy-cup" :attrs="t.point4" class="cs-purple">
    Приправляем бест практисами
  </Point>
  <Point full :class="t.example">
    <Example>

````md magic-move {lines: false}
```ts
useLearnComposable()





⠀
```
```ts
useLearnComposable({
  basics: 'learn'
})



⠀
```
```ts
const [
  advanced, 
  setAdvanced
] = useLearnComposable({
  basics: 'learn'
})
setAdvanced(true)
```
```ts
const { 
  advanced
} = useLearnComposable({
  basics: 'learn'
})
advanced.value = true
⠀
```
````

</Example>
</Point>
</Points>

---
layout: center
class: text-center
---

<img src="../img/pain.png" class="$obj pos-187_68 danger" />
<SolarDangerTriangleLinear class="$obj sp-50%_50%_200_200 c-#FF0000 animate-pulse" />

<style>
.danger {
  animation: 
    alert-shake 0.4s ease-in-out infinite, 
    alert-color 10s linear infinite;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FF0000;
  }
}

/* Вибрация через поворот */
@keyframes alert-shake {
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(2deg); }
  50%  { transform: rotate(-2deg); }
  75%  { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
}

/* Сдвиг цвета в красную сторону */
@keyframes alert-color {
  0% {
    filter: hue-rotate(0deg) brightness(100%);
  }
  100% {
    filter: hue-rotate(360deg) brightness(120%);
  }
}
</style>
