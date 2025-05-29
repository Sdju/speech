
<div class="mb-50px flex flex-row">
  <div class="size-120 rd-full of-hidden">
    <img class="size-full object-cover" src="/img/photo.png" />
  </div>
  <div class="size-120 rd-full ml-15px">
    <ZedeIcon class="size-full" />
  </div>
  <div class="size-120 rd-full ml-15px of-hidden">
    <img src="../img/vueist.png" class="size-full" />
  </div>
</div>
<div class="text-4xl mb-50px">Денис Чернов</div>
<div class="grid grid-cols-[36px_1fr] gap-2 items-center">
  <FileIconsTelegram /> @zede_code
  <FileIconsTelegram /> @vueist
  <IonLogoGithub /> @Sdju
</div>

<img src="../img/holyjs.png" class="$obj pos-800_104" />
<QrCodeIntro class="sp-r80_200_200_200 absolute" />

---

<LogosVue class="$obj sp-486_278_400_400" />

---

<img src="../img/holy.png" class="$obj pos-486_278" />

---
timeline:
  - point1: 'outline outline-2 outline-[#CCCCCC88]'
    point2: '-blur-hidden outline-[#00000088]'
    point3: '-blur-hidden outline-[#00000088]'
    point4: '-blur-hidden outline-[#00000088]'
    example: 'pos-0 fx duration-500'
  - point1: 'outline-[#00000088]'
    point2: 'outline outline-2 outline-[#CCCCCC88]'
  - point2: 'outline-[#00000088]'
    point3: 'outline outline-2 outline-[#CCCCCC88]'
  - point3: 'outline-[#00000088]'
    point4: 'outline outline-2 outline-[#CCCCCC88]'
---

<h1 class="text-center">План на сегодня</h1>

<Points>
  <Point icon="i-lineicons-bricks" :class="t.point1">
    Что такое <strong>композаблы</strong> и зачем они нужны
  </Point>
  <Point icon="i-mingcute-baby-fill" :class="t.point2">
    Базовые приемы использования
  </Point>
  <Point icon="i-ri-graduation-cap-fill" :class="t.point3">
    Продвинутые техники и паттерны
  </Point>
  <Point icon="i-game-icons-trophy-cup" :class="t.point4">
    Приправляем бест практисами
  </Point>
  <Point full :class="t.example">
    <Example :class="t.example">

````md magic-move {lines: false}
```ts
useLearnComposable()
```
```ts
useLearnComposable({
  basics: 'learn'
})
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

---
layout: center
class: text-center
---

<img src="../img/milk.gif" class="$obj pos-486_278" />
