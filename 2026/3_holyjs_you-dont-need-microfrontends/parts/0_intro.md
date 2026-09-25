---
layout: center
---

<div class="sui">
  <div class="sui-bar">
    <span class="sui-bar__title">Экипаж</span>
    <span class="sui-bar__meta">борт 01 · бортинженер</span>
    <span class="sui-bar__spacer" />
    <span class="sui-bar__meta"><span class="sui-dot" /> связь установлена</span>
    <MissionClock class="sui-bar__meta" />
  </div>

  <div class="grid grid-cols-12 grid-rows-[148px_148px_104px] gap-3 w-full">
    <div class="bento-4_3 hud-card !p-0 sui-photo">
      <img class="absolute inset-0 size-full object-cover" src="/img/photo.png" />
      <div class="sui-reticle" />
      <div class="sui-scale" />
      <div class="absolute inset-x-0 bottom-0 px-4 pb-3 pt-10 bg-gradient-to-t from-black/90 to-transparent">
        <div class="sui-caption">ID DC-1697</div>
        <div class="text-3xl font-bold text-white leading-none">Денис Чернов</div>
      </div>
    </div>
    <div class="bento-5_1 hud-card flex flex-col justify-center text-left">
      <div class="sui-caption">роль</div>
      <div class="text-xl font-bold text-white leading-tight">Разработчик в платформенной команде</div>
    </div>
    <div class="bento-3_2 hud-card flex flex-col items-center justify-center gap-2">
      <QrCode url="https://t.me/zede1697" class="size-150 sui-qr" />
      <div class="text-center leading-tight">
        <div class="sui-caption !mb-0">канал связи</div>
        <div class="text-xs font-mono opacity-60">t.me/zede1697</div>
      </div>
    </div>
    <div class="bento-5_1 hud-card grid grid-cols-[1fr_auto] gap-x-8 items-center text-left">
      <div>
        <div class="sui-caption">налёт</div>
        <div class="text-3xl font-bold text-white leading-none">10+</div>
        <div class="text-xs opacity-60 mt-1 whitespace-nowrap">лет в разработке</div>
        <div class="sui-gauge"><span v-for="i in 12" :key="i" :class="{ on: i <= 10 }" /></div>
      </div>
      <div class="flex flex-col gap-1.5">
        <div class="sui-caption !mb-0 whitespace-nowrap">в программном комитете</div>
        <div class="sui-badge">HolyJS</div>
        <div class="sui-badge">Стачка</div>
      </div>
    </div>
    <div class="bento-4_1 hud-card flex items-center gap-4 text-left">
      <div class="sui-icon"><FileIconsTelegram /></div>
      <div>
        <div class="text-xl font-bold text-white leading-tight">@zede1697</div>
        <div class="sui-caption !mb-0">личный канал</div>
      </div>
    </div>
    <div class="bento-4_1 hud-card flex items-center gap-4 text-left">
      <div class="sui-icon"><LogosVue /></div>
      <div>
        <div class="text-xl font-bold text-white leading-tight">@vueist</div>
        <div class="sui-caption !mb-0">евангелист Vue</div>
      </div>
    </div>
  </div>
</div>

<!--
Цель: познакомиться
Контент:
- Имя / разработчик в платформенной команде (без лишнего корпоративного брендинга)
- Программный комитет HolyJS / Стачка
- QR: Telegram @zede1697
- Links: @zede1697, @vueist
Спикер:
- С кем не знаком, то я - Денис Чернов
- Разработчик в платформенной команде
- В разработке уже более 10 лет
- Член программного комитета HolyJS и Стачка
- Евангелист Vue и всего прекрасного в этом мире
Время: 10–15 сек
Статус: реализация
-->

---
layout: center
---

<h1 v-click.hide class="$obj pos-center">
  Микрофронтенды
</h1>
<h1 v-click="[1, 2]" class="$obj pos-center">
  Микрофронтенды <span v-click="[1, 2]" class="text-red-500">≠ зло</span>
</h1>
<h1 v-click="2" class="$obj pos-center w-100vw">
  Микрофронтенды&nbsp;<span class="text-green-500">=&nbsp;решение</span>
</h1>

<!--
Микрофронтенды это это решение которое имеет свою цену
-->

---
layout: center
---

<script setup>
  import logo from '../img/gun.png'
</script>

<img :src="logo" />

<!-- 
Мое личное мнение, что часто микрофронтенды берутся совершенно не оправданно, когда существуют решения проще и эффективнее.
-->

---

<v-clicks>

- Не каждый проект легко разделить на микрофронтенды
- Правильный CI/CD для микрофронтендов может быть сложным
- Правильно настроить Dev-окружение не тривиальная задача
- Сборка является более хрупкой
- Контракты менее четкие
- Поддержание единого стиля
- Массовые миграции

</v-clicks>

---
layout: center
---

(Подборка кучи докладов про микрофронтенды)

(50+ ру/англ за 5 лет)

---
layout: center
---

# Когда микрофронтенды оправданы?

---
layout: center
---

# Если не микрофронтенды, то что?
