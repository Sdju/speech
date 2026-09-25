<script setup lang="ts">
import { computed } from 'vue'

/**
 * «Новые потребности» — карточками, по одной на клик.
 * Команды выросли и хотят большего; в каждой карточке — мини-превью потребности.
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, step))

const needs = [
  { id: 'tools', name: 'Свои инструменты', what: 'У каждой команды свои тесты и линтеры' },
  { id: 'pipeline', name: 'Свой пайплайн', what: 'Шаги CI команда настраивает под себя' },
  { id: 'free', name: 'Больше независимости', what: 'Жить и релизиться отдельно от остальных' },
  { id: 'stack', name: 'Может, даже свой стек', what: 'Другой фреймворк там, где он удобнее' },
]

const pipelines = [
  { team: 'catalog', color: '#34d399', steps: ['lint', 'test', 'build'] },
  { team: 'cart', color: '#f472b6', steps: ['lint', 'test', 'e2e', 'build'] },
]
</script>

<template>
  <div class="needs">
    <h1 class="needs__title">
      Новые потребности
    </h1>

    <div class="needs__grid">
      <article
        v-for="(n, i) in needs"
        :key="n.id"
        class="need glass"
        :class="[i < s ? 'mf-on' : 'mf-off', { 'is-live': i < s }]"
      >
        <div class="preview">
          <!-- две команды — разные наборы инструментов -->
          <template v-if="n.id === 'tools'">
            <span class="tool-row">
              <i class="team-dot" style="background: #34d399" />
              <LogosVitest /><LogosEslint />
            </span>
            <span class="tool-row">
              <i class="team-dot" style="background: #f472b6" />
              <LogosJest /><LogosPrettier />
            </span>
          </template>

          <!-- пайплайны разной длины -->
          <template v-else-if="n.id === 'pipeline'">
            <span v-for="p in pipelines" :key="p.team" class="pipe" :style="{ '--c': p.color }">
              <span
                v-for="(st, k) in p.steps"
                :key="st"
                class="pipe__step"
                :class="{ 'is-extra': st === 'e2e' }"
                :style="{ animationDelay: `${0.3 + k * 0.15}s` }"
              >{{ st }}</span>
            </span>
          </template>

          <!-- модуль отделяется от общего блока -->
          <span v-else-if="n.id === 'free'" class="split">
            <i style="--c: #34d399" />
            <i style="--c: #60a5fa" />
            <i class="split__out" style="--c: #f472b6" />
          </span>

          <!-- разные фреймворки -->
          <span v-else class="stacks">
            <LogosVue />
            <LogosReact />
            <LogosSvelteIcon />
          </span>
        </div>

        <h2>{{ n.name }}</h2>
        <p>{{ n.what }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.needs {
  position: absolute;
  inset: 0;
  padding: 44px 50px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.needs__title {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.needs__grid {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.need {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px 18px;
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;

  & h2 {
    margin: 10px 0 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    /* названия в одну и две строки — описания всё равно на одной высоте */
    min-height: 2.4em;
  }

  & p {
    margin: 2px 0 0;
    font-size: 14px;
    line-height: 1.4;
    color: rgb(255 255 255 / 0.72);
  }
}

.preview {
  height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgb(255 255 255 / 0.08);
  background: rgb(0 0 0 / 0.3);
}

/* ── инструменты ────────────────────────────────────────────────── */
.tool-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 26px;
}

.team-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

/* ── пайплайны ──────────────────────────────────────────────────── */
.pipe {
  display: flex;
  gap: 3px;
}

.pipe__step {
  padding: 2px 5px;
  border-radius: 5px;
  border: 1px solid color-mix(in oklab, var(--c) 70%, transparent);
  background: color-mix(in oklab, var(--c) 18%, #0b0b12);
  font-family: 'Fira Code', monospace;
  font-size: 10px;
}

/* шаг, который есть только у одной команды */
.pipe__step.is-extra {
  border-style: dashed;
  border-color: #fbbf24;
  background: rgb(251 191 36 / 0.14);
  color: #fcd34d;
}

.is-live .pipe__step {
  animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

/* ── независимость ──────────────────────────────────────────────── */
.split {
  display: flex;
  align-items: center;
  height: 44px;

  & i {
    width: 32%;
    height: 100%;
    background: color-mix(in oklab, var(--c) 35%, #0b0b12);
    border: 1.5px solid var(--c);
  }

  & i:first-child {
    border-radius: 8px 0 0 8px;
  }

  & i:nth-child(2) {
    border-left: none;
  }
}

/* последний модуль отходит от общего блока */
.split__out {
  border-radius: 8px;
  transition: translate 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s;
}

.is-live .split__out {
  translate: 14px -6px;
}

/* ── стеки ──────────────────────────────────────────────────────── */
.stacks {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 34px;
}

.is-live .stacks > * {
  animation: pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

.is-live .stacks > :nth-child(2) { animation-delay: 0.12s; }
.is-live .stacks > :nth-child(3) { animation-delay: 0.24s; }

@keyframes pop {
  from { opacity: 0; transform: scale(0.4); }
}
</style>
