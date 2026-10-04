<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import LoadMeter from './LoadMeter.vue'

/**
 * «Микросервисы ≠ микрофронтенды»: слева серверы (поды), справа псевдосайт в окне браузера.
 * Один драйвер — внешний $clicks. Картинка шага вычисляется из шага; «живыми» делает её только
 * генератор нагрузки: пока слайд активен, каждый тик графики шагают к целевой нагрузке шага.
 *
 * 0 — два мира: у Catalog один под под 80%, вкладка спокойна
 * 1 — масштабирование: Catalog ×3 — нагрузка делится; «копии» каталога на странице — CPU в потолке
 * 2 — изоляция: сервис падает сам по себе vs стили Cart протекают в Catalog
 * 3 — один поток: Profile ×2 — завис один под, второй работает; во вкладке замерзает всё
 * 4 — версии: API держит v1 и v2 vs пользователь видит обе версии UI сразу
 * 5 — память: у пода Cart «пила» — течёт до лимита → OOMKilled → перезапуск, по кругу;
 *     вкладка упирается в память один раз → «Опаньки…»
 *
 * Прямой вход на шаг (или неактивный слайд) показывает шаг «идущим давно»: графики ровные
 * или уже с пилой, вкладка уже упала. Текста на слайде минимум — выводы в заметках спикера.
 */
const { step = 0 } = defineProps<{ step?: number }>()

const LAST = 5
const s = computed(() => Math.max(0, Math.min(LAST, step)))
const active = useIsSlideActive()

const services = [
  { id: 'catalog', name: 'Catalog', color: '#34d399', pods: 3 },
  { id: 'cart', name: 'Cart', color: '#60a5fa', pods: 1 },
  { id: 'profile', name: 'Profile', color: '#f472b6', pods: 2 },
] as const
type Pod = `${typeof services[number]['id']}-${number}`

// сколько подов сервиса запущено: Catalog масштабирован с шага 1, Profile — с шага 3
const replicas = (id: string) => {
  if (id === 'catalog')
    return s.value >= 1 ? 3 : 1
  if (id === 'profile')
    return s.value >= 3 ? 2 : 1
  return 1
}

// ── время внутри шага ─────────────────────────────────────────────
// сценарий памяти разворачивается во времени; без живого показа — как будто шаг идёт уже давно
const TICK = 320
const SETTLED = 30 // с, «давно»: вкладка уже упала, под уже не раз перезапускался
const now = ref(performance.now())
const enteredAt = ref(now.value - SETTLED * 1000)
const t = computed(() => (now.value - enteredAt.value) / 1000)

/*
 * Шаг 5, сервер — типичная «пила» памяти: под Cart течёт, упирается в лимит → OOMKilled →
 * Restarting… → снова с базовой памяти, и так по кругу. Сервис при этом продолжает жить,
 * растёт только счётчик рестартов. Браузер падает один раз и насовсем.
 */
const SAW = { leak: 3.2, killed: 0.8, restart: 0.6 }
const SAW_PERIOD = SAW.leak + SAW.killed + SAW.restart
const CRASH_AT = 4.6 // вкладка падает сразу после первого OOM на сервере — на контрасте

function saw(tt: number) {
  const cycle = Math.floor(tt / SAW_PERIOD)
  const u = tt - cycle * SAW_PERIOD
  const phase = u < SAW.leak ? 'leak' : u < SAW.leak + SAW.killed ? 'killed' : 'restart'
  return { phase, u, restarts: cycle + (phase === 'leak' ? 0 : 1) } as const
}
const cartSaw = computed(() => (s.value === 5 ? saw(t.value) : null))
const crashed = computed(() => s.value === 5 && t.value >= CRASH_AT)
const metric = computed(() => (s.value === 5 ? 'RAM' : 'CPU'))

type PodState = 'ok' | 'down' | 'busy' | 'killed' | 'restart'
function podStateAt(id: string, i: number, tt: number): PodState {
  if (id === 'profile' && i === 1 && s.value === 2)
    return 'down'
  if (id === 'profile' && i === 1 && s.value === 3)
    return 'busy'
  if (id === 'cart' && s.value === 5) {
    const { phase } = saw(tt)
    return phase === 'leak' ? 'ok' : phase
  }
  return 'ok'
}
const podState = (id: string, i: number) => podStateAt(id, i, t.value)
const podStatus: Record<PodState, string> = { ok: '', down: '✕ 500', busy: '', killed: 'OOMKilled', restart: 'Restarting…' }
const deadAt = (id: string, i: number, tt: number) => ['down', 'killed', 'restart'].includes(podStateAt(id, i, tt))
const dead = (id: string, i: number) => deadAt(id, i, t.value)
const restarts = computed(() => cartSaw.value?.restarts ?? 0)

// ── целевая нагрузка в момент tt ──────────────────────────────────
const ramp = (tt: number, from: number, to: number, dur: number) => from + (to - from) * Math.min(1, Math.max(0, tt / dur))

function podTarget(id: string, i: number, tt: number): number {
  if (i > replicas(id) || deadAt(id, i, tt))
    return 0
  if (s.value === 5) {
    if (id === 'cart')
      return ramp(saw(tt).u, 15, 100, SAW.leak) // зубец пилы: от базовой памяти до лимита
    return id === 'catalog' ? 44 : 38
  }
  if (id === 'catalog')
    return s.value >= 1 ? 27 : 80 // один под на 80% → три по ~27%
  if (id === 'profile')
    return s.value === 3 && i === 1 ? 100 : 24
  return 30
}

function pageTarget(tt: number): number {
  switch (s.value) {
    case 1: return 97 // три каталога на странице: процессор пользователя в потолке
    case 2: return 30
    case 3: return 100
    case 4: return 26
    case 5: return tt >= CRASH_AT ? 0 : ramp(tt, 34, 100, CRASH_AT * 0.9)
    default: return 22
  }
}

// ── генератор нагрузки ────────────────────────────────────────────
const HIST = 40 // ~13 с истории — на графике пода видно два-три зубца пилы
const pods = services.flatMap(svc => Array.from({ length: svc.pods }, (_, k) => `${svc.id}-${k + 1}` as Pod))
const target = (key: string, tt = t.value) => {
  if (key === 'page')
    return pageTarget(tt)
  const [id, i] = key.split('-')
  return podTarget(id, Number(i), tt)
}

/** Бесконечный датчик: каждый next() — следующий отсчёт, шаг к цели с небольшим шумом */
function* sampler(key: string): Generator<number, never> {
  let v = target(key)
  while (true) {
    const goal = target(key)
    // память растёт ровно, процессор дёргается
    const amp = metric.value === 'RAM' ? 1.5 : goal > 90 ? 3 : 7
    // процесс убит — показание обрывается сразу, без плавного спада
    v = goal <= 0 ? 0 : v + (goal - v) * 0.4 + (Math.random() - 0.5) * amp
    v = Math.max(0, Math.min(100, v))
    yield v
  }
}

const keys = ['page', ...pods]
const samplers = new Map(keys.map(k => [k, sampler(k)]))
const hist = reactive(Object.fromEntries(keys.map(k => [k, [] as number[]]))) as Record<string, number[]>

/** История без анимации: цели за последние HIST тиков — ровная линия или готовая «пила» */
function settle() {
  for (const k of keys) {
    samplers.set(k, sampler(k))
    hist[k] = Array.from({ length: HIST }, (_, n) => target(k, t.value - ((HIST - 1 - n) * TICK) / 1000))
  }
}

function tick() {
  now.value = performance.now()
  for (const k of keys) {
    const next = samplers.get(k)!.next().value
    hist[k] = [...hist[k].slice(1 - HIST), next]
  }
}

settle()
let timer: ReturnType<typeof setInterval> | undefined
watch(active, (on) => {
  clearInterval(timer)
  timer = on ? setInterval(tick, TICK) : undefined
  if (!on) {
    now.value = performance.now()
    enteredAt.value = now.value - SETTLED * 1000
    settle()
  }
}, { immediate: true })
onBeforeUnmount(() => clearInterval(timer))

watch(s, (_, prev) => {
  // живой переход — сценарий шага идёт с нуля; сменилась метрика (CPU ↔ RAM) — графики с чистого листа
  now.value = performance.now()
  enteredAt.value = now.value - (active.value ? 0 : SETTLED * 1000)
  if (!active.value || (prev === 5) !== (s.value === 5))
    settle()
})

// ── правая панель ─────────────────────────────────────────────────
const catalogCopies = computed(() => (s.value === 1 ? 3 : 1))
const leak = computed(() => s.value === 2)
const frozen = computed(() => s.value === 3)
const versions = computed(() => s.value === 4)
const pageLoad = computed(() => hist.page[hist.page.length - 1] ?? 0)
// окно «греется» по фактическому показанию датчика — жар нарастает вместе с графиком
const hot = computed(() => !crashed.value && pageLoad.value > 80)

// имена для морфа со схемой в виде сайта (ArchScheme, слайд претензий) — окно, участки, серверы
const vt = (name: string) => ({ viewTransitionName: `x-site-${name}`, viewTransitionClass: 'x-site' })
</script>

<template>
  <div class="mvm" :class="`mvm--step-${s}`">
    <!-- ── микросервисы ─────────────────────────────────────────── -->
    <section class="mvm__side">
      <header class="mvm__head">
        <span class="mvm__title">Микросервисы</span>
      </header>

      <div class="srv">
        <div class="srv__row">
          <div
            v-for="svc in services"
            :key="svc.id"
            class="srv__col"
          >
            <div class="srv__stack">
              <div
                v-for="i in svc.pods"
                :key="i"
                class="srv__box hud-frame hud-sm hud-solid"
                :class="[
                  `srv__box--${podState(svc.id, i)}`,
                  { 'srv__box--ghost': i > replicas(svc.id) },
                ]"
                :style="{ '--c': svc.color, ...(i === 1 ? vt(`srv-${svc.id}`) : {}) }"
              >
                <span class="srv__top">
                  <span class="srv__leds"><i /><i /><i /></span>
                  <span class="srv__name">{{ svc.name }}</span>
                </span>
                <span class="srv__status">
                  {{ podStatus[podState(svc.id, i)] || (svc.id === 'cart' && restarts ? `↻ ${restarts}` : '') }}
                </span>
                <LoadMeter
                  class="srv__meter"
                  compact
                  :tall="svc.id === 'cart'"
                  :hist="hist[`${svc.id}-${i}`]"
                  :label="metric"
                  :dead="dead(svc.id, i)"
                />
              </div>
            </div>
            <div class="srv__mem">
              <template v-if="versions && svc.id === 'cart'">
                <span class="srv__api">/v1</span><span class="srv__api srv__api--new">/v2</span>
              </template>
            </div>
          </div>
        </div>

      </div>
    </section>

    <div class="mvm__neq">
      ≠
    </div>

    <!-- ── микрофронтенды ───────────────────────────────────────── -->
    <section class="mvm__side">
      <header class="mvm__head">
        <span class="mvm__title">Микрофронтенды</span>
        <!-- нагрузка на машине пользователя: CPU, на шаге 5 — память -->
        <LoadMeter :hist="hist.page" :label="metric" :dead="crashed" />
      </header>

      <div class="win-wrap" :class="{ 'win-wrap--hot': hot }">
        <!-- волны жара над окном при перегрузке -->
        <span class="heat" aria-hidden="true"><i /><i /><i /><i /><i /></span>

      <div class="win" :class="{ 'win--frozen': frozen }" :style="vt('win')">
        <div class="win__bar">
          <span class="win__dots"><i /><i /><i /></span>
          <span class="win__url" />
        </div>

        <div class="site">
          <div class="site__nav" :style="vt('nav')">
            <b>Shop</b><span class="skel" /><span class="skel" /><span class="site__search" />
          </div>

          <div class="site__body">
            <!-- Catalog -->
            <div class="site__catalog" :style="vt('catalog')">
              <div
                v-for="copy in 3"
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
            <div class="site__cart" :class="{ 'site__cart--v1': versions }" :style="vt('cart')">
              <span class="tag" style="--c: #60a5fa">Cart{{ versions ? ' v1' : '' }}</span>
              <div class="cart__item" /><div class="cart__item" />
              <div class="cart__total">
                <span class="skel" /><span class="skel skel--short" />
              </div>
              <button class="btn btn--cart" :class="{ 'btn--leak': leak, 'btn--v1': versions }">
                {{ versions ? 'ОФОРМИТЬ ЗАКАЗ' : 'Оформить' }}
              </button>
              <code class="leak-css" :class="{ 'leak-css--on': leak }">.btn { background: #ef4444 }</code>
            </div>
          </div>

          <!-- Profile -->
          <div class="site__profile" :style="vt('profile')">
            <span class="tag" style="--c: #f472b6">Profile</span>
            <span class="avatar" />
            <span class="card__line" style="width: 90px" />
          </div>
        </div>

        <div class="win__freeze" :class="{ 'win__freeze--on': frozen }">
          <div class="win__dialog">
            <b>Страница не отвечает</b>
          </div>
        </div>

        <!-- вкладка упала по памяти: та самая страница «Опаньки…» -->
        <div class="crash" :class="{ 'crash--on': crashed }">
          <svg class="crash__icon" viewBox="0 0 48 56" aria-hidden="true">
            <path d="M4 3h28l12 12v38H4z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
            <path d="M32 3v12h12" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
            <path d="M14 27l5 3M34 27l-5 3" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            <path d="M15 44q9-7 18 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </svg>
          <b>Опаньки…</b>
          <span>Код ошибки: Out of Memory</span>
          <i>Перезагрузить</i>
        </div>
      </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.mvm {
  --line: rgb(255 255 255 / 0.12);
  --panel: rgb(8 8 14 / 0.72);
  position: relative;
  display: grid;
  grid-template-columns: 1fr 44px 1fr;
  grid-template-rows: 1fr;
  gap: 10px 0;
  width: 900px;
  /* без строки подписи; снизу остаётся место под номер слайда — полоса CPU его не задевает */
  height: 440px;
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
  align-items: center;
  min-height: 42px;
  justify-content: space-between;
}

.mvm__title {
  font-size: 22px;
  font-weight: 700;
}

.mvm__neq {
  align-self: center;
  justify-self: center;
  font-size: 40px;
  font-weight: 300;
  color: rgb(255 255 255 / 0.45);
}

/* плашка-заглушка вместо текста интерфейса: это скелет сайта, а не информация */
.skel {
  display: inline-block;
  width: 46px;
  height: 7px;
  border-radius: 4px;
  background: rgb(0 0 0 / 0.12);
}

.skel--short {
  width: 30px;
}

/* окно «греется»: красное свечение по краю и волны жара над ним */
.win-wrap {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  transition: box-shadow 0.6s ease;
}

.win-wrap--hot {
  box-shadow: 0 0 0 1.5px rgb(239 68 68 / 0.7), 0 0 36px rgb(239 68 68 / 0.45);
}

.heat {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;

  & i {
    width: 16px;
    height: 34px;
    align-self: flex-end;
    border-radius: 50%;
    background: radial-gradient(closest-side, rgb(248 113 113 / 0.6), transparent);
    filter: blur(3px);
    animation: heat-rise 1.6s ease-in infinite;
  }

  & i:nth-child(2) { animation-delay: 0.35s; }
  & i:nth-child(3) { animation-delay: 0.9s; }
  & i:nth-child(4) { animation-delay: 0.55s; }
  & i:nth-child(5) { animation-delay: 1.2s; }
}

.win-wrap--hot .heat {
  opacity: 1;
}

@keyframes heat-rise {
  0% { transform: translateY(12px) scaleX(0.6); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(-26px) scaleX(1.3); opacity: 0; }
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

.srv__row {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
  justify-content: space-between;
  gap: 4px;
  padding: 8px;
  --hud-c: var(--c);
  transition: flex-grow 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, padding 0.7s, margin 0.7s;
}

/* копии Catalog: схлопнуты, на шаге масштабирования раскрываются в стопку */
.srv__box--ghost {
  flex-grow: 0.0001;
  padding-block: 0;
  /* съедает gap стопки — колонки с разным числом подов остаются одной высоты */
  margin-top: -5px;
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

.srv__top {
  display: flex;
  align-items: center;
  gap: 7px;
}

.srv__meter {
  position: relative;
  z-index: 1;
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
  flex: 1;
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  color: #6ee7b7;
}

.srv__box--down {
  --hud-c: #ef4444;

  & .srv__status { color: #fca5a5; }
  & .srv__leds i { background: #ef4444; }
}

.srv__box--killed {
  --hud-c: #ef4444;

  & .srv__status { color: #fca5a5; }
  & .srv__leds i { background: #ef4444; }
}

.srv__box--restart {
  --hud-c: #fbbf24;

  & .srv__status { color: #fcd34d; }
  & .srv__leds i { background: #fbbf24; animation: blink 0.5s steps(2) infinite; }
}

.srv__box--busy {
  --hud-c: #fbbf24;

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
  height: 14px;
  border-radius: 999px;
  background: #2c2c36;
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

/* Catalog ×3 — страница просто получает три каталога, а не больше мощности */
.cat--small {
  grid-column: span 2;
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

/* Out of Memory: вкладка вместо сайта показывает страницу сбоя */
.crash {
  position: absolute;
  z-index: 5;
  inset: 26px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #fff;
  color: #5f6368;
  opacity: 0;
  transition: opacity 0.25s;
  pointer-events: none;

  & b {
    margin-top: 6px;
    font-size: 22px;
    font-weight: 500;
    color: #202124;
  }

  & span {
    font-family: 'Fira Code', monospace;
    font-size: 11px;
  }

  & i {
    margin-top: 8px;
    padding: 5px 14px;
    border-radius: 999px;
    background: #1a73e8;
    color: #fff;
    font-style: normal;
    font-size: 11px;
    font-weight: 500;
  }
}

.crash--on {
  opacity: 1;
}

.crash__icon {
  width: 44px;
  height: 52px;
  color: #5f6368;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes blink {
  50% { opacity: 0.2; }
}
</style>
