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
layout: full
camera: { focus: station, distance: 3.7, yaw: -48, pitch: 14, shift: [1.05, 0.2], spin: 1.2, duration: 2.8 }
station: { hidden: [cart] }
timeline:
  - evil: 'mf-off'
    solution: 'mf-off'
  - evil: 'mf-on'
  - evil: 'mf-out'
    solution: 'mf-on'
    station: {}
    camera: { focus: station, distance: 3.3, yaw: -28, pitch: 12, shift: [1.05, 0.2], spin: 1.2, duration: 2.6 }
---

<div class="mf-title">
  <div class="mf-title__word">Микрофронтенды</div>
  <div class="mf-title__slot">
    <span class="mf-title__suffix mf-title__suffix--evil" :class="t.evil">≠ зло</span>
    <span class="mf-title__suffix mf-title__suffix--solution" :class="t.solution">= решение</span>
  </div>
</div>

<!--
Микрофронтенды это это решение которое имеет свою цену
-->

---
layout: full
timeline:
  - stats: 'mf-on'
    when: 'mf-off'
    instead: 'mf-off'
  - stats: 'mf-out'
    when: 'mf-on'
  - when: 'mf-out'
    instead: 'mf-on'
---

<div class="mf-crawl">
  <TalksCrawl />
</div>

<div class="mf-stage">
  <div class="mf-stage__slot">
    <div class="mf-title__suffix crawl-caption" :class="t.stats">
      <div class="crawl-caption__num">68+</div>
      <div class="crawl-caption__text">
        докладов о микрофронтендах<br>
        <span class="crawl-caption__pro">54</span> призывают их внедрять ·
        <span class="crawl-caption__contra">14</span> настроены скептически
      </div>
    </div>
    <div class="mf-title__suffix mf-title__word mf-title__word--question" :class="t.when">Когда микрофронтенды<br>оправданы?</div>
    <div class="mf-title__suffix mf-title__word mf-title__word--question" :class="t.instead">Если не микрофронтенды,<br>то что?</div>
  </div>
</div>

<!--
Подборка кучи докладов про микрофронтенды: 54 «за», 14 «против» (красная кромка).
Источник: find-some.md → data/mfe-talks.json, обложки — img/shows/.
Лента крутится весь слайд — пока говорю, зритель видит, сколько уже сказано.
Клик 1: аналитика → «Когда микрофронтенды оправданы?»
Клик 2: → «Если не микрофронтенды, то что?»
-->
