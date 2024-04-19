---
layout: clear
growSeed: 14
class: pt-[100px] pl-[100px]
bg.green: 308 359 280 277
bg.black: 285 320 235 232
bg.accent: 287 344 182 192
bg.green.trans: rotate(-20.8609 308.673 359.341)
bg.black.trans: rotate(-20.8609 285.307 320.668)
bg.accent.trans: rotate(-20.8609 287.186 344.356)
---

<div class="mb-[50px] flex flex-row">
  <div class="w-[80px] h-[80px] bg-amber rd-full of-hidden">
    <img class="w-full h-full object-cover" src="/img/photo.png" />
  </div>
  <div class="w-[80px] h-[80px] rd-full ml-[15px]">
    <zede-icon class="w-full h-full" />
  </div>
</div>
<div class="text-4xl mb-[50px]">Денис Чернов</div>
<p><file-icons-telegram /> @zede_code</p>
<p><ion-logo-twitch /> @izede</p>
<p><ion-logo-github /> @Sdju</p>

<QrCodeIntro class="w-[200px] h-[200px] absolute top-[200px] right-[80px]" />

<style> p { @apply text-[1.25rem]; } </style>

<!--
- Всем еще раз привет
- Я Чернов Денис
- Влюблен в JS уже более 10 лет
- Я за это время успел переброюовать много очень много языков. Занимался кроме работы менторингом, консультациями веду блог и являюсь одним из администраторов русскоговорящего сообщества Vue в телеграме
- Ну и соответственно вторая моя любовь - Vue
- Я ее совершенно не стесняюсь и делюсь ею как могу. Во всех телеграм-чатах, на твиче и, конечно, у себя на канале
- QR код которого вы сейчас видите
-->

---
layout: clear
class: flex flex-col justify-center items-center
bg.green: 327 409 523 260
bg.black: 289 534 577 372
bg.accent: 269 283 405 591
bg.green.trans: rotate(-40.4524 523.141 260.053)
bg.black.trans: rotate(-40.4524 577.792 372.724)
bg.accent.trans: rotate(-40.4524 405.31 591.236)
---

<style>
.item {
  @apply text-sm bg-black p-[12px] rd-[8px] flex flex-row items-center gap-[8px]
}
.item-icon {
  @apply w-[27px] h-[27px] rd-[4px] flex items-center justify-center;
  background-color: #D9D9D920;
}
</style>

<img src="/img/smlab.png" class="w-[240px]" />

<div class="-mt-2 text-xl">Ведущий разработчик в платформенной команде</div>

<div class="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[14px]" mt-12>
  <div v-click="1" class="item">
    <div class="item-icon">
      <material-symbols-light-checklist-rtl-rounded />
    </div>
    <div>
      Выбираем подходы и инструменты
    </div>
  </div>
  <div v-click="2" class="item">
    <div class="item-icon">
      <material-symbols-tools-wrench />
    </div>
    <div>
      Разработка внутренних инструментов
    </div>
  </div>
  <div v-click="3" class="item">
    <div class="item-icon">
      <fa6-solid-gears />
    </div>
    <div>
      Помогаем с внедрением и проработкой решений
    </div>
  </div>
  <div v-click="4" class="item">
    <div class="item-icon">
      <icon-park-solid-bubble-chart />
    </div>
    <div>
      Глубоко погружаемся в существующие инструменты
    </div>
  </div>
</div>

<!--
<div class="flex flex-col gap-4">
  <img src="/img/smlogo.png" class="w-[140px]" v-click />
  <img src="/img/demix.png" class="w-[140px]" v-click />
  <img src="/img/funday.png" class="w-[140px]" v-click />
</div>
-->

<!--
- Работаю я в платформенной команде в платформенной команде SM Lab он же Спортмастер
- И спормастер это не только сам спортмастер, но и множество брендов за ним
  - funday
  - O'Stin
  - Demix
  - и другие и внутренних продуктов

В рамках команды мы определяемся с технологическим стеком

Разрабатываем решения для пользования другими продуктовыми командами

Помогаем с внедрением этих технологий другими командами 

И для всего этого при работе часто приходится изучать технологии вглубину. А почти весь фронтенд в рамках компании на Vue, поэтому ему уделяем особое внимание. Ну и тема сегодняшнего доклада
-->

---
layout: clear
class: flex flex-col justify-center text-center
bg.offset: 300 100
bg.green: '#42b883'
bg.sizes: 1000 0
---

# Vue Renderer

Магия рендеринга своими руками

<!--
Vue Renderer - магия рендеринг своими руками

И проблема этой темы заключается в том, что это одна из таких тем, которая остается в тени и почти никак не покрыта в документации, там буквально 1 абзац с типом и ВСЕ

Может есть какие-то статьи? Да их тоже особо найти не удалось. Буквально 1-2 и то на английском и наполовину проработанным содержанием

Поэтому пришлось вооружиться с лупой и косплеить Дашу Путешественницу. В поисках информации по исходникам. Но вот я тут и готов поделиться с вами этими ~тайными знаниями~
-->
