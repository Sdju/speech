---
layout: full
---

<div class="about">
  <div class="about__photo glass">
    <img src="/img/photo.png" alt="" />
    <div class="about__name">Денис Чернов</div>
  </div>

  <div class="about__role glass">
    <div class="about__big">Разработчик в платформенной команде</div>
    <div class="about__years"><b>10+</b> лет в разработке</div>
  </div>

  <div class="about__committee glass">
    <div class="about__label">Программный комитет</div>
    <div class="about__badges">
      <span class="hud-frame hud-sm">HolyJS</span>
      <span class="hud-frame hud-sm">Стачка</span>
    </div>
  </div>

  <div class="about__qr glass">
    <!-- белый код на весь блок, без плашки; канал подписан в карточке @zede1697 ниже -->
    <QrCode url="https://t.me/zede1697" class="about__qr-code" />
  </div>

  <div class="about__link glass">
    <span class="about__icon hud-frame hud-sm" style="--hud-c: #60a5fa"><FileIconsTelegram /></span>
    <div>
      <b>@zede1697</b>
      <small>личный канал</small>
    </div>
  </div>

  <div class="about__link glass">
    <span class="about__icon hud-frame hud-sm" style="--hud-c: #34d399"><LogosVue /></span>
    <div>
      <b>@vueist</b>
      <small>евангелист Vue</small>
    </div>
  </div>
</div>

<style>
.about {
  position: absolute;
  inset: 44px 50px;
  display: grid;
  grid-template-columns: 4fr 5fr 3fr;
  grid-template-rows: 150px 150px 104px;
  gap: 12px;
  align-content: center;
  color: #fff;
  text-align: left;
}

.about .glass {
  position: relative;
  overflow: hidden;
  padding: 18px 22px;
}

.about__photo {
  grid-row: 1 / 4;
  padding: 0 !important;

  & img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgb(0 0 0 / 0.85), transparent 45%);
  }
}

.about__name {
  position: absolute;
  z-index: 1;
  left: 20px;
  bottom: 16px;
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
}

.about__role {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.about__big {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
}

.about__years {
  font-size: 15px;
  color: rgb(255 255 255 / 0.7);

  & b {
    font-size: 22px;
    color: #c4b5fd;
  }
}

.about__committee {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.about__label {
  font-size: 15px;
  color: rgb(255 255 255 / 0.7);
}

.about__badges {
  display: flex;
  gap: 10px;

  & span {
    padding: 6px 16px;
    font-size: 17px;
    font-weight: 600;
    --hud-c: #a78bfa;
  }
}

.about__qr {
  grid-column: 3;
  grid-row: 1 / 3;
  display: grid;
  place-items: center;
  padding: 16px !important;
}

.about__qr-code {
  width: 100%;
  aspect-ratio: 1;

  & :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.about__link {
  grid-row: 3;
  display: flex;
  align-items: center;
  gap: 16px;

  & b {
    display: block;
    font-size: 20px;
    line-height: 1.2;
  }

  & small {
    font-size: 13px;
    color: rgb(255 255 255 / 0.65);
  }
}

/* две ссылки делят нижний ряд справа от фото поровну */
.about__link:nth-last-child(2) {
  grid-column: 2;
}

.about__link:last-child {
  grid-column: 3;
}

.about__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  font-size: 26px;
}
</style>

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
        <span class="crawl-caption__pro">54</span> призывают их внедрять,
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
