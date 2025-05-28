
<div class="mb-50px flex flex-row">
  <div class="size-80 rd-full of-hidden">
    <img class="size-full object-cover" src="/img/photo.png" />
  </div>
  <div class="size-80 rd-full ml-15px">
    <ZedeIcon class="size-full" />
  </div>
</div>
<div class="text-4xl mb-50px">Денис Чернов</div>
<div class="grid grid-cols-[36px_1fr] gap-2 items-center">
  <FileIconsTelegram /> @zede_code
  <FileIconsTelegram /> @vueist
  <IonLogoGithub /> @Sdju
</div>

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

{{ console.log(t) }}

<h1 class="text-center">План на сегодня</h1>

<div class="items-grid">
  <div class="item fx duration-400" :class="t.point1">
    <div class="item-icon">
      <LineiconsBricks/>
    </div>
    <div>
      Что такое <strong>композаблы</strong> и зачем они нужны
    </div>
  </div>
  <div class="item fx duration-400" :class="t.point2">
    <div class="item-icon">
      <MingcuteBabyFill/>
    </div>
    <div>
      Базовые приемы использования
    </div>
  </div>
  <div class="item fx duration-400" :class="t.point3">
    <div class="item-icon">
      <RiGraduationCapFill/>
    </div>
    <div>
      Продвинутые техники и паттерны
    </div>
  </div>
  <div class="item fx duration-400" :class="t.point4">
    <div class="item-icon">
      <GameIconsTrophyCup/>
    </div>
    <div>
      Приправляем бест практисами
    </div>
  </div>
  <div class="item-example fx example row-span-4 no-bg" :class="t.example">

<div :class="t.example">

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
const { advanced } = useLearnComposable({
  basics: 'learn'
})
advanced.value = true
```
````

</div>

  </div>
</div>

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
