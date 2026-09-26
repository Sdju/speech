<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import { computed, ref, watch } from 'vue'

/** Готовые средства модульности: два механизма Nuxt и группа методологий. */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(3, step)))
const active = useIsSlideActive()
const instant = ref(true)
watch([() => step, active], ([next, on], [previous, wasOn]) => {
  instant.value = !on || !wasOn || next <= previous || next - previous !== 1
}, { flush: 'sync' })

const options = [
  { id: 'modules', name: 'Nuxt Modules', label: 'Подключить возможности', color: '#34d399', what: 'Интеграции и расширения через модульную систему Nuxt' },
  { id: 'layers', name: 'Nuxt Layers', label: 'Переиспользовать части', color: '#60a5fa', what: 'Компоненты, страницы и конфигурация в общих слоях приложения' },
  { id: 'methods', name: 'FEOD · FDA · FSD', label: 'Организовать код', color: '#a78bfa', what: 'Подходы к разделению кода и управлению связями между частями' },
]
const layers = [
  { name: 'base', detail: 'UI · config' },
  { name: 'shop', detail: 'pages · logic' },
  { name: 'app', detail: 'приложение' },
]
</script>

<template>
  <div class="modularity-options" :class="{ 'is-instant': instant }">
    <h1>А есть ли что-то готовое?</h1>

    <div class="options-grid">
      <article v-for="(option, i) in options" :key="option.id"
        class="option glass" :class="i < s ? 'mf-on' : 'mf-off'"
        :style="{ '--option-color': option.color }" :aria-hidden="i >= s">
        <div class="option-preview" aria-hidden="true">
          <!-- Расширения подключаются к общему приложению. -->
          <div v-if="option.id === 'modules'" class="module-demo">
            <div class="module-app hud-frame hud-sm"><LogosNuxtIcon /><span>Nuxt app</span></div>
            <div class="module-ports">
              <span v-for="(name, k) in ['i18n', 'UI', 'SEO']" :key="name" class="module-plug hud-frame hud-sm"
                :style="{ '--part': k }">{{ name }}</span>
            </div>
          </div>

          <!-- Один слой содержит сразу несколько видов исходников. -->
          <div v-else-if="option.id === 'layers'" class="layer-demo">
            <div v-for="(layer, k) in layers" :key="layer.name" class="layer-sheet hud-frame hud-sm"
              :style="{ '--part': k }">
              <span>{{ layer.name }}</span><small>{{ layer.detail }}</small>
            </div>
          </div>

          <!-- Обобщённый пример границ, не дерево конкретной методологии. -->
          <div v-else class="boundary-demo">
            <div class="boundary-row">
              <div v-for="(name, k) in ['catalog', 'cart']" :key="name" class="boundary-module hud-dashed"
                :style="{ '--part': k }">
                <span class="boundary-name">{{ name }}<small>API</small></span>
                <span class="boundary-inside"><i>ui</i><i>model</i></span>
              </div>
            </div>
            <div class="boundary-shared hud-frame hud-sm">shared</div>
          </div>
        </div>

        <span class="option-label">{{ option.label }}</span>
        <h2>{{ option.name }}</h2>
        <p>{{ option.what }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.modularity-options {
  position: absolute;
  inset: 0;
  padding: 44px 50px;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: left;
}
.modularity-options h1 {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
.options-grid {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.option {
  min-width: 0;
  padding: 16px 18px 20px;
  display: flex;
  flex-direction: column;
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
}
.option h2 {
  margin: 5px 0 0;
  font-size: 23px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.option p {
  margin: 9px 0 0;
  font-size: 15px;
  line-height: 1.4;
  color: rgb(255 255 255 / 0.72);
}
.option-label {
  margin-top: 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--option-color);
}
.option-preview {
  height: 122px;
  display: grid;
  place-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgb(255 255 255 / 0.08);
  background: rgb(0 0 0 / 0.3);
  font-family: 'Fira Code', monospace;
  font-size: 11px;
}

/* Modules: приложение и три подключаемых расширения. */
.module-demo { width: 100%; display: grid; justify-items: center; }
.module-app {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 138px;
  height: 38px;
  padding: 0;
  --hud-c: #34d399;
  font-size: 13px;
}
.module-app svg { font-size: 25px; }
.module-ports {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  padding-top: 23px;
}
.module-ports::before {
  content: '';
  position: absolute;
  left: 16%; right: 16%; top: 10px;
  height: 12px;
  border: 1px solid #34d39966;
  border-bottom: 0;
}
.module-ports::after {
  content: '';
  position: absolute;
  left: 50%; top: 0;
  height: 23px;
  border-left: 1px solid #34d39966;
}
.module-plug {
  z-index: 1;
  padding: 4px 0;
  text-align: center;
  --hud-c: #34d399;
  --hud-bg: #12251f;
  color: #a7f3d0;
}

/* Layers: перекрывающиеся пластины с содержимым слоёв. */
.layer-demo { position: relative; width: 100%; height: 100px; }
.layer-sheet {
  position: absolute;
  left: calc(6px + var(--part) * 13px);
  bottom: calc(2px + var(--part) * 28px);
  width: calc(100% - 38px);
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  --hud-c: #60a5fa;
  /* пластины перекрываются — подложка непрозрачная */
  --hud-bg: #182235;
  box-shadow: 0 5px 12px #0005;
  color: #bfdbfe;
}
.layer-sheet small { font-size: 9px; color: #b5c5de; }

/* Методологии: явные границы и общий код. */
.boundary-demo { width: 100%; }
.boundary-row { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.boundary-module {
  position: relative;
  padding: 7px;
  --hud-c: #a78bfa;
}
.boundary-module::after {
  content: '';
  position: absolute;
  left: 50%; bottom: -12px;
  height: 11px;
  border-left: 1px solid #a78bfa88;
}
.boundary-name { display: flex; align-items: center; justify-content: space-between; gap: 4px; color: #ddd6fe; font-size: 10px; }
.boundary-name small { padding: 1px 3px; border-radius: 3px; background: #a78bfa30; font-size: 8px; }
.boundary-inside { display: flex; gap: 4px; margin-top: 7px; }
.boundary-inside i { flex: 1; padding: 3px 0; text-align: center; font-style: normal; font-size: 9px; border-radius: 3px; background: #ffffff0c; color: #b7b0c9; }
.boundary-shared { margin-top: 11px; padding: 3px; text-align: center; --hud-c: #a78bfa; color: #c4b5fd; }

.option.mf-on :is(.module-plug, .layer-sheet, .boundary-module) {
  animation: option-part 0.55s cubic-bezier(0.22, 1, 0.36, 1) calc(0.2s + var(--part) * 0.12s) backwards;
}
@keyframes option-part { from { opacity: 0; translate: 0 8px; } }
.is-instant *, .is-instant *::before, .is-instant *::after { transition: none !important; animation: none !important; }
@media (prefers-reduced-motion: reduce) {
  .modularity-options *, .modularity-options *::before, .modularity-options *::after { transition: none !important; animation: none !important; }
}
</style>
