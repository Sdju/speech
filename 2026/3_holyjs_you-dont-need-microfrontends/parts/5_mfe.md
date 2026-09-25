---
layout: center
---

<div class="section-kicker">обещание 4</div>

<XSlide name="promise-4" class="section-title-wrap">
  <h1 class="section-title">Динамическая подгрузка</h1>
</XSlide>

---

Главная сила микрофронтендов - подгружать модули динамически

---

Модули могут быть:

- Выложены в разные хостинги
- Иметь множество версий
- Независимость в деплое

---

Динамика - опасная штука

<v-clicks>

- Система может быть хрупкой и шаткой
- Испытание для тришейкинга

</v-clicks>

---

Сценарий для микрофронтендов

<v-clicks>

- Выставлять версии из панели админки
- Подгрузка из независимого источника
- Модули завеедомо крайне независимы и их очень много

</v-clicks>

---

Микрофронтенды - это тяжелый выбор, а не инструмент для хайпа

---
layout: center
class: text-center
---

<script setup>
import current from '../img/current.svg?raw'
</script>

<div v-html="current" class="$obj c-white pos-866_124 size-200" />
<div class="text-2xl text-left $obj pos-869_243">
  презентация
</div>
<div class="text-2xl text-left $obj pos-113_500">
  <FileIconsTelegram /> @vueist <br/>
  <FileIconsTelegram /> @zede_code
</div>

# Спасибо за внимание!

## Вопросы? 