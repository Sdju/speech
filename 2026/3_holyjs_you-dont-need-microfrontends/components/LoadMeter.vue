<script setup lang="ts">
import { computed } from 'vue'

/**
 * Метрика нагрузки как в диспетчере задач: значок процессора/памяти, «шагающий» график и процент.
 * История значений приходит снаружи (генератор шагов в MsVsMfe) — компонент только рисует.
 *
 *   зелёный — норма, жёлтый — выше 65%, красный — выше 85% (значок пульсирует)
 *   compact — для подов на сервере: без значка, подпись CPU/RAM текстом
 *   tall — компактная, но с высоким графиком на всю ширину (одиночный под — видно «пилу»)
 *   dead — процесса нет (упал, перезапускается): прочерк вместо процента
 */
const props = defineProps<{
  hist: number[]
  label: string
  compact?: boolean
  tall?: boolean
  dead?: boolean
}>()

const value = computed(() => Math.round(props.hist[props.hist.length - 1] ?? 0))
const level = computed(() => props.dead ? 'dead' : value.value > 85 ? 'hot' : value.value > 65 ? 'warm' : 'ok')

const points = computed(() => {
  const n = props.hist.length
  return props.hist.map((v, i) => {
    const x = (i * 60) / Math.max(1, n - 1)
    const y = 20 - Math.max(0.8, Math.min(19.5, (v / 100) * 20))
    return `${x.toFixed(1)} ${y.toFixed(1)}`
  })
})
const line = computed(() => `M ${points.value.join(' L ')}`)
const area = computed(() => `M 0 20 L ${points.value.join(' L ')} L 60 20 Z`)
</script>

<template>
  <div class="lm" :class="[`lm--${level}`, { 'lm--compact': compact || tall, 'lm--tall': tall }]">
    <span v-if="!compact && !tall" class="lm__chip"><i>{{ label }}</i></span>
    <span v-else class="lm__label">{{ label }}</span>
    <svg class="lm__graph" viewBox="0 0 60 20" preserveAspectRatio="none" aria-hidden="true">
      <path class="lm__area" :d="area" />
      <path class="lm__line" :d="line" />
    </svg>
    <b>{{ dead ? '—' : `${value}%` }}</b>
  </div>
</template>

<style scoped>
.lm {
  --lm: #6ee7b7;
  --lm-fill: rgb(52 211 153 / 0.22);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 6px;
  border-radius: 8px;
  border: 1px solid rgb(255 255 255 / 0.14);
  background: rgb(10 10 18 / 0.7);
  transition: border-color 0.5s ease, background 0.5s ease;

  & b {
    min-width: 42px;
    text-align: right;
    font-family: 'Fira Code', monospace;
    font-size: 17px;
    color: var(--lm);
    transition: color 0.5s ease;
  }
}

.lm--warm {
  --lm: #fcd34d;
  --lm-fill: rgb(251 191 36 / 0.22);
}

.lm--hot {
  --lm: #f87171;
  --lm-fill: rgb(239 68 68 / 0.3);
  border-color: rgb(239 68 68 / 0.7);
  background: rgb(60 12 16 / 0.8);
  animation: lm-pulse 0.9s ease-in-out infinite;
}

.lm--dead {
  --lm: rgb(255 255 255 / 0.35);
  --lm-fill: transparent;
}

@keyframes lm-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgb(239 68 68 / 0); }
  50% { box-shadow: 0 0 18px 2px rgb(239 68 68 / 0.55); }
}

/* значок: кристалл с ножками по сторонам */
.lm__chip {
  position: relative;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin: 4px;
  border-radius: 4px;
  border: 1.5px solid var(--lm);
  background: color-mix(in srgb, var(--lm) 16%, transparent);
  transition: border-color 0.5s ease, background 0.5s ease;

  & i {
    font-style: normal;
    font-size: 8px;
    font-weight: 700;
    color: var(--lm);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &::before {
    inset: 5px -6px;
    background:
      repeating-linear-gradient(to bottom, var(--lm) 0 2px, transparent 2px 5px) left / 4px 100% no-repeat,
      repeating-linear-gradient(to bottom, var(--lm) 0 2px, transparent 2px 5px) right / 4px 100% no-repeat;
  }

  &::after {
    inset: -6px 5px;
    background:
      repeating-linear-gradient(to right, var(--lm) 0 2px, transparent 2px 5px) top / 100% 4px no-repeat,
      repeating-linear-gradient(to right, var(--lm) 0 2px, transparent 2px 5px) bottom / 100% 4px no-repeat;
  }
}

.lm__graph {
  width: 76px;
  height: 26px;
  overflow: visible;
}

.lm__line {
  fill: none;
  stroke: var(--lm);
  stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
  transition: stroke 0.5s ease;
}

.lm__area {
  fill: var(--lm-fill);
  transition: fill 0.5s ease;
}

/* компактная — внутри пода */
.lm--compact {
  gap: 5px;
  padding: 2px 6px;
  border-radius: 5px;
  animation: none;

  & b {
    min-width: 30px;
    font-size: 11px;
  }

  & .lm__graph {
    flex: 1;
    width: 0;
    height: 22px;
  }
}

.lm--compact.lm--hot {
  box-shadow: 0 0 10px rgb(239 68 68 / 0.45);
}

.lm--tall {
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 4px 6px 6px;

  & .lm__graph {
    order: 3;
    flex: 1 0 100%;
    height: 90px;
  }
}

.lm__label {
  font-family: 'Fira Code', monospace;
  font-size: 9px;
  font-weight: 700;
  color: var(--lm);
}
</style>
