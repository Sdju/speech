<script setup lang="ts">
import { computed } from 'vue'

/**
 * Инструменты монорепозитория — карточками, по одной на клик.
 * От базового слоя (workspaces связывают пакеты) к тем, что берут на себя
 * задачи, кэш, границы и публикацию.
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, step))

const tools = [
  { name: 'Workspaces', icons: ['npm', 'yarn', 'pnpm'], what: 'Пакеты в одном репо ссылаются друг на друга, общий install' },
  { name: 'Turborepo', icons: ['turbo'], what: 'Кэш и параллельный запуск задач по графу пакетов' },
  { name: 'Nx', icons: ['nx'], what: 'Граф проекта, запуск только затронутого и контроль границ модулей' },
  { name: 'Rush', icons: ['rush'], what: 'Строгие версии и публикация пакетов для больших команд' },
]
</script>

<template>
  <div class="tools">
    <h1 class="tools__title">
      Существующие инструменты
    </h1>

    <div class="tools__grid">
      <article
        v-for="(t, i) in tools"
        :key="t.name"
        class="tool glass"
        :class="i < s ? 'mf-on' : 'mf-off'"
      >
        <span class="tool__icons">
          <template v-for="ic in t.icons" :key="ic">
            <LogosNpmIcon v-if="ic === 'npm'" />
            <LogosYarn v-else-if="ic === 'yarn'" />
            <LogosPnpm v-else-if="ic === 'pnpm'" />
            <LogosTurborepoIcon v-else-if="ic === 'turbo'" />
            <LogosNx v-else-if="ic === 'nx'" class="is-mono" />
            <LogosRushIcon v-else-if="ic === 'rush'" class="is-mono" />
          </template>
        </span>
        <h2>{{ t.name }}</h2>
        <p>{{ t.what }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.tools {
  position: absolute;
  inset: 0;
  padding: 44px 50px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.tools__title {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.tools__grid {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.tool {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 220px;
  padding: 20px 18px;
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;

  & h2 {
    margin: 6px 0 0;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  & p {
    margin: 0;
    font-size: 15px;
    line-height: 1.4;
    color: rgb(255 255 255 / 0.72);
  }
}

.tool__icons {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  font-size: 40px;

  /* тёмные логотипы (Nx, Rush) на тёмном стекле — осветляем */
  & .is-mono {
    filter: invert(1) brightness(1.4);
  }
}
</style>
