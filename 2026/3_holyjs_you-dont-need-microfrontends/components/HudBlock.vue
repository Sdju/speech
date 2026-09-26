<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import { computed, onBeforeUnmount, ref, watch } from 'vue'

/**
 * Блок с уголками, который появляется механически — пространство между уголками раскрывается.
 *
 * Корень ничего не анимирует и не задаёт transition: его можно позиционировать и анимировать
 * снаружи (transform, left, width — как блоки схемы архитектуры). Механика — во внутреннем
 * «приводе» (.hb__rig): там живут переменные раскрытия и их переходы. Слои:
 *   уголки  — едут из центра к своим углам: сначала в ширину, затем в высоту;
 *             в конце «пружинит» длина уголка, а не позиция — за блок они не выходят;
 *   заливка — масштабируется из центра вместе с рамкой;
 *   содержимое — только по прозрачности: проявляется, когда рамка почти раскрыта,
 *             и гаснет первым при сворачивании — за рамку не вылезает.
 *
 * Показ — проп `shown`. Если слайд только что стал активным (Slidev сбрасывает клики при
 * входе на слайд) или неактивен, смена мгновенная — без анимации сокрытия заведомо скрытых блоков.
 */
const props = withDefaults(defineProps<{
  shown?: boolean
  /** цвет уголков и заливки */
  color?: string
  /** компактные уголки */
  sm?: boolean
  /** тёмная подложка — читается поверх яркой сцены */
  solid?: boolean
  /** задержка раскрытия, секунд (строка вида '0.4s' тоже принимается) */
  delay?: number | string
  /**
   * свечение — по геометрии рамки (на заливке и уголках), раскрывается и сворачивается вместе с ней;
   * true — цветом блока, строка — своим цветом
   */
  glow?: boolean | string
  /** тонкая обводка по рамке (например, состояние «ожидает» / «готово») */
  ring?: string
  /** пунктирная рамка-заглушка с тёмной подложкой (тестовая замена, макет) */
  dashed?: boolean
  as?: string
}>(), { shown: true, as: 'div', delay: 0 })

const active = useIsSlideActive()
let activatedAt = -Infinity
watch(active, (a) => {
  if (a)
    activatedAt = performance.now()
}, { immediate: true })

const instant = ref(false)
let raf = 0
watch(() => props.shown, () => {
  instant.value = !active.value || performance.now() - activatedAt < 400
  if (instant.value) {
    cancelAnimationFrame(raf)
    // снять флаг, когда новое состояние уже применено без перехода
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => (instant.value = false))
    })
  }
})
onBeforeUnmount(() => cancelAnimationFrame(raf))

const delaySec = computed(() => typeof props.delay === 'number' ? `${props.delay}s` : props.delay || '0s')
</script>

<template>
  <component
    :is="as"
    class="hb"
    :class="{ 'is-open': shown, 'is-instant': instant, 'hb--sm': sm, 'hb--solid': solid, 'hb--glow': !!glow, 'hb--ring': !!ring, 'hb--dashed': dashed }"
    :style="{
      ...(color ? { '--hud-c': color } : {}),
      ...(typeof glow === 'string' ? { '--hb-glow': glow } : {}),
      ...(ring ? { '--hb-ring': ring } : {}),
      '--hb-delay': delaySec,
    }"
  >
    <div class="hb__rig">
      <span class="hb__fill" aria-hidden="true" />
      <span class="hb__corner hb__corner--tl" aria-hidden="true" />
      <span class="hb__corner hb__corner--tr" aria-hidden="true" />
      <span class="hb__corner hb__corner--bl" aria-hidden="true" />
      <span class="hb__corner hb__corner--br" aria-hidden="true" />
      <div class="hb__content">
        <slot />
      </div>
    </div>
  </component>
</template>

<style>
/* раскрытие по осям и «пружина» длины уголков — наследуются слоями блока */
@property --hb-x {
  syntax: '<number>';
  inherits: true;
  initial-value: 1;
}

@property --hb-y {
  syntax: '<number>';
  inherits: true;
  initial-value: 1;
}

@property --hb-s {
  syntax: '<number>';
  inherits: true;
  initial-value: 1;
}
</style>

<style scoped>
/* дефолты корня — через :where, чтобы любые стили снаружи (position, padding, цвет) побеждали */
:where(.hb) {
  --hud-c: var(--v-color);
  position: relative;
  padding: 16px 20px;
}

.hb {
  --hud-l: 14px;
  --hud-w: 2px;
  /* своя группа наложения: заливка уходит под содержимое, но не под фон слайда */
  isolation: isolate;
}

/* привод: повторяет раскладку корня (вёрстка снаружи задаётся как обычно) и несёт механику.
   Не позиционирован — абсолютные слои и абсолютные дети из слота отсчитываются от корня */
.hb__rig,
.hb__content {
  display: inherit;
  flex-direction: inherit;
  flex-wrap: inherit;
  align-items: inherit;
  justify-content: inherit;
  gap: inherit;
  grid-template-columns: inherit;
  width: 100%;
  height: 100%;
}

/* свернуто: сначала складывается высота, затем ширина */
.hb__rig {
  --hb-x: 0;
  --hb-y: 0;
  --hb-s: 1;
  transition:
    --hb-y 0.22s cubic-bezier(0.6, 0, 0.8, 0.4),
    --hb-x 0.22s cubic-bezier(0.6, 0, 0.8, 0.4) 0.18s;
}

/* раскрыто: сначала ширина (щель), затем высота; в конце пружинят уголки */
.hb.is-open > .hb__rig {
  --hb-x: 1;
  --hb-y: 1;
  transition:
    --hb-x 0.32s cubic-bezier(0.55, 0, 0.3, 1) var(--hb-delay),
    --hb-y 0.38s cubic-bezier(0.3, 0, 0.2, 1) calc(var(--hb-delay) + 0.26s);
  animation: hb-spring 0.8s calc(var(--hb-delay) + 0.5s) both;
}

.hb.is-instant > .hb__rig {
  transition: none !important;
  animation: none !important;
}

.hb--sm {
  --hud-l: 8px;
  --hud-w: 1.5px;
}

.hb__fill {
  position: absolute;
  inset: 0;
  /* под содержимым — иначе её размытие фона размывает и текст */
  z-index: -1;
  pointer-events: none;
  background-color: color-mix(in srgb, var(--hud-c) 8%, transparent);
  transform: scale(var(--hb-x), var(--hb-y));
  backdrop-filter: blur(6px);
}

/* эффекты рамки живут на её слоях: масштабируются вместе с заливкой, а не висят по корню */
.hb__fill,
.hb__corner {
  --hb-glow-c: var(--hb-glow, var(--hud-c));
}

.hb__fill {
  box-sizing: border-box;
  border: 1px solid transparent;
  transition: box-shadow 0.45s ease, border-color 0.45s ease;
}

.hb--glow .hb__fill {
  box-shadow:
    0 0 24px color-mix(in srgb, var(--hb-glow-c) 35%, transparent),
    inset 0 0 18px color-mix(in srgb, var(--hb-glow-c) 14%, transparent);
}

.hb--glow .hb__corner {
  filter: drop-shadow(0 0 4px color-mix(in srgb, var(--hb-glow-c) 80%, transparent));
}

.hb--ring .hb__fill {
  border-color: var(--hb-ring);
}

.hb--dashed .hb__fill {
  border-style: dashed;
  border-color: color-mix(in srgb, var(--hud-c) 70%, transparent);
  background-color: #171327;
}

.hb--solid .hb__fill {
  background-image: linear-gradient(color-mix(in srgb, var(--hud-c) 8%, transparent) 0 0);
  background-color: rgb(10 10 20 / 0.72);
}

/* уголок: при 0 — в центре блока, при 1 — в своём углу; длина пружинит, позиция — нет */
.hb__corner {
  position: absolute;
  z-index: 1;
  transition: filter 0.45s ease;
  width: calc(var(--hud-l) * var(--hb-s));
  height: calc(var(--hud-l) * var(--hb-s));
  border: 0 solid var(--hud-c);
  pointer-events: none;
  /* собранные в центре уголки не видны — проявляются, когда начинают разъезжаться */
  opacity: clamp(0, calc(var(--hb-x) * 6), 1);
}

.hb__corner--tl {
  left: calc(50% * (1 - var(--hb-x)));
  top: calc(50% * (1 - var(--hb-y)));
  translate: calc(-50% * (1 - var(--hb-x))) calc(-50% * (1 - var(--hb-y)));
  border-top-width: var(--hud-w);
  border-left-width: var(--hud-w);
}

.hb__corner--tr {
  right: calc(50% * (1 - var(--hb-x)));
  top: calc(50% * (1 - var(--hb-y)));
  translate: calc(50% * (1 - var(--hb-x))) calc(-50% * (1 - var(--hb-y)));
  border-top-width: var(--hud-w);
  border-right-width: var(--hud-w);
}

.hb__corner--bl {
  left: calc(50% * (1 - var(--hb-x)));
  bottom: calc(50% * (1 - var(--hb-y)));
  translate: calc(-50% * (1 - var(--hb-x))) calc(50% * (1 - var(--hb-y)));
  border-bottom-width: var(--hud-w);
  border-left-width: var(--hud-w);
}

.hb__corner--br {
  right: calc(50% * (1 - var(--hb-x)));
  bottom: calc(50% * (1 - var(--hb-y)));
  translate: calc(50% * (1 - var(--hb-x))) calc(50% * (1 - var(--hb-y)));
  border-bottom-width: var(--hud-w);
  border-right-width: var(--hud-w);
}

/* содержимое видно, только когда рамка почти раскрыта — за неё не вылезает */
.hb__content {
  opacity: clamp(0, calc((var(--hb-y) - 0.6) * 2.5), 1);
}

/* затухающее колебание длины: мягкий подъём, плавные перегибы, каждая волна меньше предыдущей */
@keyframes hb-spring {
  0% { --hb-s: 1; animation-timing-function: cubic-bezier(0.33, 0, 0.3, 1); }
  30% { --hb-s: 1.32; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  62% { --hb-s: 0.96; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  84% { --hb-s: 1.02; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  100% { --hb-s: 1; }
}
</style>
