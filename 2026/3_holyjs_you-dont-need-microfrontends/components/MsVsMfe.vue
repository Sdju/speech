<script setup lang="ts">
import { computed } from 'vue'

/**
 * «Микросервисы ≠ микрофронтенды»: слева серверы, справа псевдосайт в окне браузера.
 * Один драйвер — внешний $clicks. Состояние целиком вычисляется из шага (без таймеров),
 * поэтому прямой вход на любой клик и шаг назад показывают правильную картинку.
 *
 * 0 — два мира: процессы на серверах и одна вкладка
 * 1 — масштабирование: копии сервиса vs «копии» каталога на странице пользователя
 * 2 — изоляция: сервис падает сам по себе vs стили Cart протекают в Catalog
 * 3 — один поток: занят один сервис vs тяжёлая задача Profile морозит всю вкладку
 * 4 — версии: API держит v1 и v2 vs пользователь видит обе версии UI сразу
 */
const { step = 0 } = defineProps<{ step?: number }>()

const LAST = 4
const s = computed(() => Math.max(0, Math.min(LAST, step)))

const captions = [
  'Похожие слова — разные миры: процессы на серверах против одной вкладки браузера',
  'Сервис масштабируют копиями. Микрофронтенд исполняет каждый пользователь сам — копировать нечего',
  'У сервисов свои процессы. У микрофронтендов — одна страница: общий DOM, стили и window',
  'Один главный поток на всю вкладку: тяжёлая задача одной части морозит все',
  'API живёт в двух версиях сразу. Интерфейс видит человек — и видит все версии одновременно',
]

const services = [
  { id: 'catalog', name: 'Catalog', color: '#34d399' },
  { id: 'cart', name: 'Cart', color: '#60a5fa' },
  { id: 'profile', name: 'Profile', color: '#f472b6' },
]

// левая панель
const replicas = computed(() => (s.value === 1 ? 4 : 1))
const latency = computed(() => (s.value === 1 ? '180 мс' : '820 мс'))
const serviceState = (id: string) => {
  if (s.value === 2 && id === 'profile')
    return 'down'
  if (s.value === 3 && id === 'profile')
    return 'busy'
  return 'ok'
}

// правая панель
const catalogCopies = computed(() => (s.value === 1 ? 4 : 1))
const cpu = computed(() => (s.value === 1 ? 97 : s.value === 3 ? 100 : 22))
const leak = computed(() => s.value === 2)
const frozen = computed(() => s.value === 3)
const versions = computed(() => s.value === 4)
</script>

<template>
  <div class="mvm" :class="`mvm--step-${s}`">
    <!-- ── микросервисы ─────────────────────────────────────────── -->
    <section class="mvm__side">
      <header class="mvm__head">
        <span class="mvm__kicker">сервер</span>
        <span class="mvm__title">Микросервисы</span>
      </header>

      <div class="srv">
        <div class="srv__client">
          <span class="srv__icon">⌂</span> клиенты
          <span v-if="versions" class="srv__clients">
            <span class="srv__chip">web → v2</span>
            <span class="srv__chip srv__chip--old">ios → v1</span>
          </span>
        </div>
        <div class="srv__lb">
          балансировщик
          <span class="srv__metric" :class="{ 'srv__metric--good': s === 1 }">p95 {{ latency }}</span>
        </div>

        <div class="srv__row">
          <div
            v-for="svc in services"
            :key="svc.id"
            class="srv__col"
          >
            <div class="srv__stack" :style="{ '--n': svc.id === 'catalog' ? replicas : 1 }">
              <div
                v-for="i in (svc.id === 'catalog' ? 4 : 1)"
                :key="i"
                class="srv__box"
                :class="[
                  `srv__box--${serviceState(svc.id)}`,
                  { 'srv__box--ghost': svc.id === 'catalog' && i > replicas },
                ]"
                :style="{ '--c': svc.color, '--i': i - 1 }"
              >
                <span class="srv__leds"><i /><i /><i /></span>
                <span class="srv__name">{{ svc.name }}</span>
                <span class="srv__status">
                  {{ serviceState(svc.id) === 'down' ? '✕ 500' : serviceState(svc.id) === 'busy' ? 'CPU 100%' : '200 OK' }}
                </span>
              </div>
            </div>
            <div class="srv__mem">
              <template v-if="versions && svc.id === 'cart'">
                <span class="srv__api">/v1</span><span class="srv__api srv__api--new">/v2</span>
              </template>
              <template v-else>
                свой процесс · память
              </template>
            </div>
          </div>
        </div>

        <div class="srv__note">
          <template v-if="s === 1">
            Catalog ×4 — нагрузка делится между копиями
          </template>
          <template v-else-if="s === 2">
            Profile упал — Catalog и Cart отвечают
          </template>
          <template v-else-if="s === 3">
            Profile занят — соседи этого не чувствуют
          </template>
          <template v-else-if="s === 4">
            старые клиенты ходят в /v1, новые в /v2
          </template>
          <template v-else>
            у каждого сервиса свой процесс, память и ресурсы
          </template>
        </div>
      </div>
    </section>

    <div class="mvm__neq">
      ≠
    </div>

    <!-- ── микрофронтенды ───────────────────────────────────────── -->
    <section class="mvm__side">
      <header class="mvm__head">
        <span class="mvm__kicker">браузер пользователя</span>
        <span class="mvm__title">Микрофронтенды</span>
      </header>

      <div class="win" :class="{ 'win--frozen': frozen }">
        <div class="win__bar">
          <span class="win__dots"><i /><i /><i /></span>
          <span class="win__url">shop.example/catalog</span>
        </div>

        <div class="site">
          <div class="site__nav">
            <b>Shop</b><span>Каталог</span><span>Акции</span><span class="site__search" />
          </div>

          <div class="site__body">
            <!-- Catalog -->
            <div class="site__catalog">
              <div
                v-for="copy in 4"
                :key="copy"
                class="cat"
                :class="{
                  'cat--hidden': copy > catalogCopies,
                  'cat--v2': versions,
                  'cat--small': catalogCopies > 1,
                }"
              >
                <span class="tag" style="--c: #34d399">Catalog{{ versions ? ' v2' : '' }}</span>
                <div class="cat__grid">
                  <div v-for="p in 3" :key="p" class="card">
                    <div class="card__img">
                      <span v-if="p === 1" class="spin" />
                    </div>
                    <div class="card__line" />
                    <div class="card__line card__line--short" />
                    <button class="btn" :class="{ 'btn--leak': leak, 'btn--v2': versions }">
                      {{ versions ? 'Добавить' : 'В корзину' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cart -->
            <div class="site__cart" :class="{ 'site__cart--v1': versions }">
              <span class="tag" style="--c: #60a5fa">Cart{{ versions ? ' v1' : '' }}</span>
              <div class="cart__item" /><div class="cart__item" />
              <div class="cart__total">
                <span>Итого</span><b>4 980 ₽</b>
              </div>
              <button class="btn btn--cart" :class="{ 'btn--leak': leak, 'btn--v1': versions }">
                {{ versions ? 'ОФОРМИТЬ ЗАКАЗ' : 'Оформить' }}
              </button>
              <code class="leak-css" :class="{ 'leak-css--on': leak }">.btn { background: #ef4444 }</code>
            </div>
          </div>

          <!-- Profile -->
          <div class="site__profile">
            <span class="tag" style="--c: #f472b6">Profile</span>
            <span class="avatar" />
            <span class="card__line" style="width: 90px" />
            <span v-if="frozen" class="profile__task">считаем скидки…</span>
          </div>
        </div>

        <div class="win__freeze" :class="{ 'win__freeze--on': frozen }">
          <div class="win__dialog">
            <b>Страница не отвечает</b>
            <span>Profile занял главный поток</span>
          </div>
        </div>
      </div>

      <div class="dev">
        <span>CPU пользователя</span>
        <span class="dev__bar"><i :style="{ width: `${cpu}%` }" :class="{ hot: cpu > 80 }" /></span>
        <b>{{ cpu }}%</b>
      </div>
    </section>

    <!-- ── вывод шага ──────────────────────────────────────────── -->
    <div class="mvm__captions">
      <div
        v-for="(text, i) in captions"
        :key="i"
        class="mvm__caption"
        :class="i === s ? 'mf-on' : i < s ? 'mf-out' : 'mf-off'"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.mvm {
  --line: rgb(255 255 255 / 0.12);
  --panel: rgb(8 8 14 / 0.72);
  position: relative;
  display: grid;
  grid-template-columns: 1fr 44px 1fr;
  grid-template-rows: 1fr auto;
  gap: 10px 0;
  width: 900px;
  height: 480px;
  color: #fff;
  text-align: left;
  font-size: 14px;
}

.mvm__side {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.mvm__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.mvm__title {
  font-size: 22px;
  font-weight: 700;
}

.mvm__kicker {
  order: 2;
  font-size: 12px;
  color: rgb(255 255 255 / 0.5);
}

.mvm__neq {
  align-self: center;
  justify-self: center;
  font-size: 40px;
  font-weight: 300;
  color: rgb(255 255 255 / 0.45);
}

.mvm__captions {
  grid-column: 1 / -1;
  display: grid;
  font-size: 19px;
  line-height: 1.3;
  min-height: 2.6em;

  & > * {
    grid-area: 1 / 1;
  }
}

.mvm__caption {
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
}

/* ── серверы ─────────────────────────────────────────────────────── */

.srv {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel);
  backdrop-filter: blur(6px);
}

.srv__client,
.srv__lb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgb(255 255 255 / 0.05);
  font-size: 12px;
  color: rgb(255 255 255 / 0.7);
}

.srv__icon {
  font-size: 14px;
}

.srv__clients {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.srv__chip {
  padding: 1px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  background: rgb(52 211 153 / 0.18);
  color: #6ee7b7;
}

.srv__chip--old {
  background: rgb(255 255 255 / 0.08);
  color: rgb(255 255 255 / 0.6);
}

.srv__metric {
  margin-left: auto;
  font-family: 'Fira Code', monospace;
  color: #fca5a5;
  transition: color 0.5s;
}

.srv__metric--good {
  color: #6ee7b7;
}

.srv__row {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.srv__col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.srv__stack {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 0;
}

.srv__box {
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid color-mix(in oklab, var(--c) 60%, transparent);
  background: linear-gradient(160deg, color-mix(in oklab, var(--c) 22%, #0b0b12), #0b0b12 70%);
  transition: flex-grow 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, padding 0.7s, border-color 0.4s, background 0.4s;
}

/* копии Catalog: схлопнуты, на шаге масштабирования раскрываются в стопку */
.srv__box--ghost {
  flex-grow: 0.0001;
  padding-block: 0;
  border-width: 0;
  opacity: 0;
}

/* серверная стойка: полосы юнитов внизу корпуса */
.srv__box::after {
  content: '';
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  height: 40%;
  max-height: 120px;
  background: repeating-linear-gradient(180deg, rgb(255 255 255 / 0.06) 0 2px, transparent 2px 12px);
  pointer-events: none;
}

.srv__leds {
  display: flex;
  gap: 3px;

  & i {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--c);
    opacity: 0.8;
  }
}

.srv__name {
  font-weight: 700;
  font-size: 13px;
}

.srv__status {
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  color: #6ee7b7;
}

.srv__box--down {
  border-color: #ef4444;
  background: linear-gradient(160deg, rgb(239 68 68 / 0.25), #0b0b12 70%);

  & .srv__status { color: #fca5a5; }
  & .srv__leds i { background: #ef4444; }
}

.srv__box--busy {
  border-color: #fbbf24;

  & .srv__status { color: #fcd34d; }
  & .srv__leds i { background: #fbbf24; animation: blink 0.4s steps(2) infinite; }
}

.srv__mem {
  display: flex;
  gap: 4px;
  justify-content: center;
  font-size: 10.5px;
  color: rgb(255 255 255 / 0.45);
  text-align: center;
}

.srv__api {
  padding: 1px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  background: rgb(255 255 255 / 0.08);
  color: rgb(255 255 255 / 0.7);
}

.srv__api--new {
  background: rgb(52 211 153 / 0.18);
  color: #6ee7b7;
}

.srv__note {
  font-size: 12px;
  color: rgb(255 255 255 / 0.6);
  min-height: 1.4em;
}

/* ── окно браузера ───────────────────────────────────────────────── */

.win {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  background: #f4f4f7;
  color: #1c1c24;
}

.win__bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  background: #1e1e26;
}

.win__dots {
  display: flex;
  gap: 5px;

  & i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3f3f4a;
  }
}

.win__url {
  flex: 1;
  padding: 2px 10px;
  border-radius: 999px;
  background: #2c2c36;
  color: rgb(255 255 255 / 0.55);
  font-size: 11px;
}

.site {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  min-height: 0;
}

.site__nav {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #fff;
  border: 1px dashed #a78bfa;
  font-size: 11px;
  color: #555;

  & b { color: #7c3aed; font-size: 12px; }
}

.site__search {
  margin-left: auto;
  width: 70px;
  height: 12px;
  border-radius: 999px;
  background: #ececf1;
}

.site__body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 108px;
  gap: 6px;
  min-height: 0;
}

.site__catalog {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 4px;
  min-height: 0;
}

.tag {
  position: absolute;
  top: -1px;
  right: -1px;
  z-index: 2;
  padding: 0 5px;
  border-radius: 0 5px 0 5px;
  background: var(--c);
  color: #0b0b12;
  font-size: 9px;
  font-weight: 700;
}

.cat {
  position: relative;
  grid-column: span 2;
  grid-row: span 2;
  padding: 6px;
  border-radius: 6px;
  border: 1px dashed #34d399;
  background: #fff;
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Catalog ×4 — страница просто получает четыре каталога, а не больше мощности */
.cat--small {
  grid-column: span 1;
  grid-row: span 1;

  & .cat__grid { gap: 3px; }
  & .card { padding: 2px; gap: 2px; }
  & .card__line { height: 3px; }
  & .btn { font-size: 6px; padding: 1px 2px; }
}

.cat--hidden {
  display: none;
}

.cat__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  height: 100%;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-radius: 5px;
  background: #fafafc;
  border: 1px solid #ececf1;
  transition: border-radius 0.5s, background 0.5s;
}

.card__img {
  position: relative;
  flex: 1;
  min-height: 18px;
  border-radius: 4px;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
}

.card__line {
  display: block;
  height: 5px;
  border-radius: 3px;
  background: #e2e2ea;
}

.card__line--short {
  width: 60%;
}

.spin {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgb(16 185 129 / 0.3);
  border-top-color: #10b981;
  animation: spin 0.9s linear infinite;
}

.btn {
  border: 0;
  border-radius: 4px;
  padding: 3px 4px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #10b981;
  transition: background 0.5s, border-radius 0.5s, font-family 0.5s;
}

/* утечка стилей: правило .btn из Cart бьёт по всем кнопкам страницы, включая свои */
.btn.btn--leak {
  background: #ef4444;
  box-shadow: 0 0 0 2px rgb(239 68 68 / 0.35);
}

/* Catalog v2: новый дизайн-язык */
.cat--v2 .card {
  border-radius: 10px;
  background: #faf5ff;
  border-color: #e9d5ff;
}

.cat--v2 .card__img {
  border-radius: 8px;
  background: linear-gradient(135deg, #e9d5ff, #c4b5fd);
}

.btn--v2 {
  border-radius: 999px;
  background: linear-gradient(90deg, #8b5cf6, #d946ef);
}

.site__cart {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 6px;
  border-radius: 6px;
  border: 1px dashed #60a5fa;
  background: #fff;
  transition: font-family 0.5s, border-radius 0.5s;
}

.cart__item {
  height: 20px;
  border-radius: 4px;
  background: #eff6ff;
}

.cart__total {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  font-size: 9px;
  color: #555;

  & b { color: #1c1c24; }
}

.btn--cart {
  background: #3b82f6;
}

/* Cart v1: старый дизайн рядом с новым каталогом */
.site__cart--v1 {
  border-radius: 0;
  font-family: Georgia, 'Times New Roman', serif;

  & .cart__item { border-radius: 0; background: #e5e7eb; }
}

.btn--v1 {
  border-radius: 0;
  background: #6b7280;
  font-family: Georgia, 'Times New Roman', serif;
  letter-spacing: 0.04em;
}

.leak-css {
  position: absolute;
  left: -150px;
  top: 38%;
  z-index: 3;
  padding: 3px 6px;
  border-radius: 4px;
  background: #1c1c24;
  color: #fca5a5;
  font-size: 9px;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.5s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.leak-css--on {
  opacity: 1;
  transform: none;
}

.site__profile {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 6px;
  border: 1px dashed #f472b6;
  background: #fff;
}

.avatar {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fbcfe8;
}

.profile__task {
  margin-left: auto;
  margin-right: 50px;
  font-size: 10px;
  color: #db2777;
}

/* главный поток занят: вся вкладка замирает */
.win--frozen .spin,
.win--frozen .srv__leds i {
  animation-play-state: paused;
}

.win--frozen .site {
  filter: grayscale(0.6) brightness(0.92);
}

.win__freeze {
  position: absolute;
  inset: 26px 0 0;
  display: grid;
  place-items: center;
  background: rgb(10 10 16 / 0.35);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.win__freeze--on {
  opacity: 1;
}

.win__dialog {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  border-radius: 8px;
  background: #fff;
  color: #1c1c24;
  font-size: 12px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.35);

  & span { font-size: 10px; color: #666; }
}

.dev {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgb(255 255 255 / 0.6);

  & b { width: 40px; text-align: right; font-family: 'Fira Code', monospace; color: #fff; }
}

.dev__bar {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.1);
  overflow: hidden;

  & i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: #34d399;
    transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1), background 0.5s;
  }

  & i.hot { background: #ef4444; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes blink {
  50% { opacity: 0.2; }
}
</style>
