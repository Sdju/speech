---
layout: center
---

<div class="section-kicker">обещание 4</div>

<XSlide name="promise-4" class="section-title-wrap">
  <h1 class="section-title">Динамическая подгрузка</h1>
</XSlide>

---
layout: full
clicks: 3
camera: ambient
---

<BuildVsRuntime :step="$clicks" />

<!--
Уникальная сила микрофронтендов — подгружать модули динамически. Сравним с тем, что было до этого.
Клик 1: линковка при сборке — пакеты из реестра линкуются в один бандл Shop на CI, версии зафиксированы в момент сборки.
Клик 2: подгрузка в рантайме — в браузер приходит только оболочка, модули она тянет по сети с серверов команд при открытии страницы.
Клик 3: Cart выпустил 2.2. Слева в проде всё ещё 2.1 — нужен релиз Shop. Справа Cart выкатил у себя — пользователь обновил страницу и получил 2.2.
-->

---

# Модули могут быть

<v-clicks>

- Выложены в разные хостинги
- Иметь множество версий
- Независимость в деплое

</v-clicks>

---

# Динамика — опасная штука

<v-clicks>

- Система может быть хрупкой и шаткой
- Испытание для тришейкинга

</v-clicks>

---
layout: full
clicks: 3
---

<MfeScenarios :step="$clicks" />

<!--
Когда микрофронтенды действительно оправданы:
Клик 1: версии выставляют из панели админки — без релиза и без разработчиков.
Клик 2: модуль приходит из независимого источника — от партнёра или другой компании.
Клик 3: модули заведомо крайне независимы, и их очень много.
-->

---
layout: full
camera: finale
station: {}
---

<div class="finale glass">
  <h1>Микрофронтенды — тяжёлый выбор,<br>а не инструмент для хайпа</h1>
</div>

<style>
.finale {
  position: absolute;
  left: 40px;
  bottom: 40px;
  padding: 24px 30px;
  text-align: left;
}

.finale h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
</style>

<!--
Финал: камера отъезжает на общий план — вся система, станция снова собрана.
Микрофронтенды — тяжёлый выбор, а не инструмент для хайпа.
Проговорить итог: чёткие границы — модули; свои пайплайны — монорепо;
независимый деплой — распределённый монолит; и только динамическая подгрузка
действительно требует микрофронтендов. Всё остальное достижимо без них.
-->

---
layout: full
camera: farewell
---

<script setup>
import current from '../img/current.svg?raw'
</script>

<div class="farewell glass">
  <h1>Спасибо за внимание!</h1>
  <p class="farewell__ask">Вопросы?</p>
  <div class="farewell__contacts">
    <span><FileIconsTelegram /> @vueist</span>
    <span><FileIconsTelegram /> @zede_code</span>
  </div>
</div>

<div class="farewell-qr glass">
  <div v-html="current" class="farewell-qr__code" />
  <span>слайды доклада</span>
</div>

<style>
.farewell {
  position: absolute;
  left: 50px;
  top: 50%;
  translate: 0 -50%;
  padding: 30px 36px 28px;
  text-align: left;
}

.farewell h1 {
  margin: 0;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.farewell__ask {
  margin: 8px 0 22px;
  font-size: 28px;
  color: rgb(255 255 255 / 0.75);
}

.farewell__contacts {
  display: grid;
  gap: 6px;
  font-size: 20px;
}

.farewell__contacts span {
  display: flex;
  align-items: center;
  gap: 10px;
}

.farewell-qr {
  position: absolute;
  right: 50px;
  bottom: 50px;
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 16px 16px 12px;
  font-size: 15px;
  color: rgb(255 255 255 / 0.75);
}

/* тёмный код на белой плашке — сканируется любым телефоном из зала */
.farewell-qr__code {
  width: 150px;
  height: 150px;
  padding: 8px;
  border-radius: 10px;
  background: #fff;
  color: #0b0b12;
}

.farewell-qr__code :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
