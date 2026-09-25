<script setup lang="ts">
import { computed } from 'vue'

/**
 * «Сценарий для микрофронтендов» — карточками, по одной на клик.
 * В каждой — мини-превью ситуации, где динамическая подгрузка действительно нужна.
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, step))

const scenarios = [
  { id: 'admin', name: 'Версии из админки', what: 'Версию модуля переключают в панели — без релиза и без разработчиков' },
  { id: 'source', name: 'Внешний источник', what: 'Модуль приходит от партнёра или другой компании с их сервера' },
  { id: 'many', name: 'Десятки модулей', what: 'Много команд и виджетов, которые почти не связаны друг с другом' },
]

// сетка «много модулей»: цвета повторяются с небольшим сдвигом
const PALETTE = ['#34d399', '#60a5fa', '#f472b6', '#fbbf24', '#a78bfa', '#22d3ee']
const tiles = Array.from({ length: 28 }, (_, i) => PALETTE[(i * 5 + (i >> 2)) % PALETTE.length])
</script>

<template>
  <div class="sc">
    <h1 class="sc__title">
      Сценарий для микрофронтендов
    </h1>

    <div class="sc__grid">
      <article
        v-for="(c, i) in scenarios"
        :key="c.id"
        class="card glass"
        :class="i < s ? 'mf-on' : 'mf-off'"
      >
        <div class="preview">
          <!-- панель админки: у модуля выбрана версия -->
          <template v-if="c.id === 'admin'">
            <span class="adm-row">
              <span class="adm-name"><i style="background: #f472b6" />cart</span>
              <span class="adm-select">2.2.0 <small>▾</small></span>
            </span>
            <span class="adm-row">
              <span class="adm-name"><i style="background: #34d399" />catalog</span>
              <span class="adm-select adm-select--dim">1.5.0 <small>▾</small></span>
            </span>
            <span class="adm-row adm-row--note">
              <span>для 10% пользователей</span>
              <span class="adm-toggle"><i /></span>
            </span>
          </template>

          <!-- модуль с чужого сервера встаёт в слот страницы -->
          <template v-else-if="c.id === 'source'">
            <code class="src-url">partner.io/widget.js</code>
            <span class="src-page">
              <span class="src-block" />
              <span class="src-slot">виджет партнёра</span>
              <span class="src-block" />
            </span>
          </template>

          <!-- много мелких независимых модулей -->
          <span v-else class="tiles">
            <i v-for="(color, k) in tiles" :key="k" :style="{ background: color, animationDelay: `${(k % 7) * 0.05 + Math.floor(k / 7) * 0.08}s` }" />
          </span>
        </div>

        <h2>{{ c.name }}</h2>
        <p>{{ c.what }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.sc {
  position: absolute;
  inset: 0;
  padding: 44px 50px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}

.sc__title {
  margin: 0;
  max-width: 560px;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.sc__grid {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.card {
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
    margin: 2px 0 0;
    font-size: 15px;
    line-height: 1.4;
    color: rgb(255 255 255 / 0.72);
  }
}

.preview {
  height: 112px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgb(255 255 255 / 0.08);
  background: rgb(0 0 0 / 0.3);
}

/* ── админка ────────────────────────────────────────────────────── */
.adm-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.adm-name {
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;

  & i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
}

.adm-select {
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid #a78bfa;
  background: rgb(167 139 250 / 0.15);
  font-family: 'Fira Code', monospace;
  font-size: 11.5px;

  & small {
    margin-left: 4px;
    opacity: 0.7;
  }
}

.adm-select--dim {
  border-color: rgb(255 255 255 / 0.25);
  background: transparent;
  color: rgb(255 255 255 / 0.7);
}

.adm-row--note {
  padding-top: 5px;
  border-top: 1px solid rgb(255 255 255 / 0.08);
  color: rgb(255 255 255 / 0.6);
}

.adm-toggle {
  position: relative;
  width: 28px;
  height: 16px;
  border-radius: 999px;
  background: #34d399;

  & i {
    position: absolute;
    right: 2px;
    top: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
  }
}

/* ── чужой источник ─────────────────────────────────────────────── */
.src-url {
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgb(251 191 36 / 0.12);
  border: 1px solid rgb(251 191 36 / 0.5);
  font-family: 'Fira Code', monospace;
  font-size: 11.5px;
  color: #fcd34d;
}

.src-page {
  display: flex;
  gap: 6px;
  height: 52px;
  padding: 6px;
  border-radius: 7px;
  border: 1px solid rgb(255 255 255 / 0.18);
}

.src-block {
  width: 18%;
  border-radius: 4px;
  background: rgb(255 255 255 / 0.1);
}

.src-slot {
  flex: 1;
  display: grid;
  place-items: center;
  border-radius: 4px;
  border: 1.5px dashed #fbbf24;
  background: rgb(251 191 36 / 0.1);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  color: #fcd34d;
}

/* ── много модулей ──────────────────────────────────────────────── */
.tiles {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  height: 100%;

  & i {
    border-radius: 4px;
    opacity: 0.85;
  }
}

/* плитки заполняют сетку, когда карточка появилась */
.card.mf-on .tiles i {
  animation: tile 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

@keyframes tile {
  from { opacity: 0; transform: scale(0.3); }
}
</style>
