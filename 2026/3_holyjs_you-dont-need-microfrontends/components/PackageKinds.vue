<script setup lang="ts">
import { computed } from 'vue'

/**
 * «Пакет не обязан быть доменным модулем» — карточками, по одной на клик.
 * В каждой — мини-превью того, что лежит в пакете.
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, step))

const kinds = [
  { id: 'ui', name: 'UI-библиотека', pkg: '@shop/ui', what: 'Кнопки, поля и токены дизайна — общие для всех команд' },
  { id: 'contracts', name: 'Типы контрактов', pkg: '@shop/contracts', what: 'Общий язык между модулями и бэкендом, без кода рантайма' },
  { id: 'stack', name: 'Другой стек', pkg: '@shop/chart', what: 'Небольшой виджет на Svelte живёт внутри Vue-приложения' },
]
</script>

<template>
  <div class="kinds">
    <h1 class="kinds__title">
      Пакет не обязан быть доменным модулем
    </h1>

    <div class="kinds__grid">
      <article
        v-for="(k, i) in kinds"
        :key="k.id"
        class="kind glass"
        :class="i < s ? 'mf-on' : 'mf-off'"
      >
        <!-- превью содержимого пакета -->
        <div class="preview">
          <template v-if="k.id === 'ui'">
            <span class="ui-row">
              <span class="ui-btn">Купить</span>
              <span class="ui-btn ui-btn--ghost">В избранное</span>
            </span>
            <span class="ui-row">
              <span class="ui-input">Поиск</span>
              <span class="ui-toggle"><i /></span>
            </span>
          </template>

          <pre v-else-if="k.id === 'contracts'" class="code"><span class="kw">export interface</span> <span class="ty">Order</span> {
  id: <span class="ty">string</span>
  total: <span class="ty">number</span>
}</pre>

          <template v-else>
            <span class="host-app">
              <LogosVue class="host-app__logo" />
              <span class="widget">
                <LogosSvelteIcon />
                <span class="bars"><i /><i /><i /><i /></span>
              </span>
            </span>
          </template>
        </div>

        <h2>{{ k.name }}</h2>
        <code class="kind__pkg">{{ k.pkg }}</code>
        <p>{{ k.what }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.kinds {
  position: absolute;
  inset: 0;
  padding: 44px 50px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.kinds__title {
  margin: 0;
  max-width: 560px;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  /* станция справа вверху — заголовок держим левее неё */
}

.kinds__grid {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.kind {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 18px 20px;
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;

  & h2 {
    margin: 10px 0 0;
    font-size: 23px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  & p {
    margin: 4px 0 0;
    font-size: 15px;
    line-height: 1.4;
    color: rgb(255 255 255 / 0.72);
  }
}

.kind__pkg {
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  color: #c4b5fd;
}

/* ── превью ─────────────────────────────────────────────────────── */
.preview {
  height: 104px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgb(255 255 255 / 0.08);
  background: rgb(0 0 0 / 0.3);
}

.ui-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ui-btn {
  padding: 5px 12px;
  border-radius: 7px;
  background: #a78bfa;
  color: #140f24;
  font-size: 12px;
  font-weight: 700;
}

.ui-btn--ghost {
  background: transparent;
  border: 1.5px solid #a78bfa;
  color: #c4b5fd;
}

.ui-input {
  flex: 1;
  padding: 5px 10px;
  border-radius: 7px;
  border: 1px solid rgb(255 255 255 / 0.25);
  font-size: 12px;
  color: rgb(255 255 255 / 0.45);
}

.ui-toggle {
  position: relative;
  width: 30px;
  height: 17px;
  border-radius: 999px;
  background: #34d399;

  & i {
    position: absolute;
    right: 2px;
    top: 2px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
  }
}

.code {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 12.5px;
  line-height: 1.5;
  color: rgb(255 255 255 / 0.85);
  white-space: pre;

  & .kw {
    color: #f472b6;
  }

  & .ty {
    color: #60a5fa;
  }
}

/* Vue-приложение, внутри которого встроен Svelte-виджет */
.host-app {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  height: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1.5px solid rgb(65 184 131 / 0.6);
  font-size: 18px;
}

.widget {
  flex: 1;
  align-self: stretch;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1.5px dashed rgb(255 62 0 / 0.7);
  background: rgb(255 62 0 / 0.08);
}

.bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 100%;

  & i {
    flex: 1;
    border-radius: 2px 2px 0 0;
    background: #ff6b3d;
  }

  & i:nth-child(1) { height: 40%; }
  & i:nth-child(2) { height: 75%; }
  & i:nth-child(3) { height: 55%; }
  & i:nth-child(4) { height: 90%; }
}
</style>
