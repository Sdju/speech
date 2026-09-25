<script lang="ts">
/**
 * Время старта ленты — общее для всех экземпляров слайда (основной экран, превью докладчика,
 * перемонтирование при HMR/синхронизации): пока слайд открыт, лента не начинается заново.
 */
const crawlClock = new Map<number, { start: number, seen: number }>()
</script>

<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'
import talks from '../data/mfe-talks.json'

/**
 * Лента докладов «как в Звёздных войнах»: плоскость наклонена в перспективе,
 * карточки уезжают вверх и растворяются в глубине космоса.
 * Анимация бесконечная и не зависит от кликов — под неё можно говорить.
 */
const { duration = 60 } = defineProps<{
  /** секунд на один полный проход ленты */
  duration?: number
}>()

const covers = import.meta.glob<string>('../img/shows/*.jpg', { eager: true, import: 'default' })
const cover = (id: string) => covers[`../img/shows/${id}.jpg`]

const COLUMNS = 3

// ru и en вперемешку, «против» — вкраплениями, чтобы лента не делилась на блоки
const shuffled = [...talks].sort((a, b) => {
  const k = (i: number) => ((i * 7919) % 97) / 97
  return k(talks.indexOf(a)) - k(talks.indexOf(b))
})
// копия списка должна занимать целое число рядов, иначе на стыке цикла лента дёрнется
const ordered = [...shuffled, ...shuffled.slice(0, (COLUMNS - shuffled.length % COLUMNS) % COLUMNS)]

/*
 * Движение считаем покадрово: при входе на слайд лента стартует из-под нижнего края
 * (экран пуст) и въезжает, как титры; дальше крутится бесшовно по одной копии списка.
 */
const plane = useTemplateRef<HTMLElement>('plane')
const track = useTemplateRef<HTMLElement>('track')
const { $page } = useSlideContext()
const { currentSlideNo } = useNav()

let raf = 0

function frame(now: number) {
  raf = requestAnimationFrame(frame)
  const clock = crawlClock.get($page.value)!
  clock.seen = now
  const start = clock.start
  const t = track.value
  const p = plane.value
  if (!t || !p)
    return
  const copy = t.offsetHeight / 2 + 8 // высота одной копии с половиной зазора
  const entry = p.offsetHeight // сначала вся лента под плоскостью
  const speed = copy / duration // px/с
  // как титры: с первой секунды одна скорость, голова ленты въезжает снизу и уходит к горизонту
  const d = (now - start) / 1000 * speed
  const y = d < entry ? entry - d : -((d - entry) % copy)
  t.style.transform = `translateY(${y}px)`
}

function play() {
  cancelAnimationFrame(raf)
  const now = performance.now()
  const clock = crawlClock.get($page.value)
  // слайд был открыт только что — это тот же показ, продолжаем с того же места
  if (!clock || now - clock.seen > 1000)
    crawlClock.set($page.value, { start: now, seen: now })
  raf = requestAnimationFrame(frame)
}

onMounted(() => {
  watch(() => currentSlideNo.value === $page.value, (active) => {
    if (active)
      play()
    else
      cancelAnimationFrame(raf)
  }, { immediate: true })
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div class="crawl">
    <div ref="plane" class="crawl__plane">
      <!-- две копии подряд — бесшовный цикл -->
      <div ref="track" class="crawl__track">
        <template v-for="copy in 2" :key="copy">
          <figure
            v-for="t in ordered"
            :key="`${copy}-${t.id}`"
            class="crawl__card"
            :class="{ 'crawl__card--contra': t.camp === 'contra' }"
          >
            <img :src="cover(t.id)" :alt="t.title" loading="eager" decoding="async">
          </figure>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.crawl {
  position: absolute;
  inset: 0;
  overflow: hidden;
  perspective: 440px;
  perspective-origin: 50% 0%;
  /* даль растворяется в космосе, низ уходит под подпись */
  mask-image: linear-gradient(to top, transparent 0%, #000 34%, #000 58%, transparent 92%);
  pointer-events: none;
}

.crawl__plane {
  position: absolute;
  left: 50%;
  bottom: -4%;
  width: 760px;
  height: 320%;
  transform: translateX(-50%) rotateX(64deg);
  transform-origin: 50% 100%;
}

.crawl__track {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* = COLUMNS */
  gap: 16px;
  /* до первого кадра — под плоскостью, чтобы не мигнуть заполненным экраном */
  transform: translateY(100vh);
  will-change: transform;
}

.crawl__card {
  margin: 0;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  background: #111;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.12), 0 12px 40px rgb(0 0 0 / 0.6);

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* лагерь «против» — тонкая красная кромка, различимая даже вдали */
.crawl__card--contra {
  box-shadow: 0 0 0 2px #f87171, 0 12px 40px rgb(0 0 0 / 0.6);
}
</style>
