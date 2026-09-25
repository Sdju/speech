<script setup lang="ts">
import SvgArrow from '../addon/components/svg/SvgArrow.vue'
import type { ArchRiskKind } from '../data/arch-risks'

defineProps<{ kind: ArchRiskKind }>()
const checks = [70, 250, 460, 670].map((x, i) =>
  `M${x} 404 C${x} 420 ${310 + i * 100} 408 ${310 + i * 100} 418`,
)
</script>

<template>
  <div class="risk-details">
    <div class="risk-boundary" :class="{ 'is-hidden': kind !== 'boundaries' }">
      <span class="risk-boundary__question">?</span>
    </div>
    <div class="risk-boundary__label" :class="{ 'is-hidden': kind !== 'boundaries' }">Промокоды — Catalog или Cart?</div>

    <svg class="risk-svg" viewBox="0 0 920 444" width="920" height="444">
      <SvgArrow v-for="(d, i) in checks" :key="i" :d="d" :reveal="kind === 'ci' ? 1 : 0"
        class="risk-arrow" :class="{ 'is-on': kind === 'ci' }"
        :style="{ '--animation-delay': kind === 'ci' ? `${0.2 + i * 0.12}s` : '0s' }" />
    </svg>
    <div class="risk-ci" :class="{ 'is-hidden': kind !== 'ci' }">Интеграционный прогон и совместимость версий</div>

    <div class="risk-panel" :class="{ 'is-hidden': kind !== 'dev-all' }">
      <b>Shell + Catalog + Cart + Profile</b>
      <small>Все dev-серверы, API, конфиги и согласованные версии</small>
    </div>
    <div class="risk-panel" :class="{ 'is-hidden': kind !== 'dev-isolated' }">
      <b>Catalog + тестовые замены окружения</b>
      <small>Shell, API и соседние микрофронтенды — изолировать или замокать</small>
    </div>
    <div class="risk-panel risk-contract" :class="{ 'is-hidden': kind !== 'contracts' }">
      <div><small>Catalog отправляет</small><code>{ id: "42" }</code></div>
      <span class="risk-contract__mismatch">≠</span>
      <div><small>Cart ожидает</small><code>{ productId: "42" }</code></div>
    </div>
  </div>
</template>

<style scoped>
.risk-details, .risk-svg { position: absolute; inset: 0; pointer-events: none; }
.risk-details > div { transition: opacity 0.25s; }
.risk-details .is-hidden { opacity: 0; }
.risk-boundary {
  position: absolute; left: 154px; top: 107px; width: 400px; height: 101px;
  border: 1px dashed #fbbf24; border-radius: 14px;
  background: linear-gradient(90deg, #34d39908, #fbbf2414, #60a5fa08);
}
.risk-boundary__question {
  position: absolute; left: 182px; top: 28px; width: 36px;
  color: #fbbf24; font-size: 30px; font-weight: bold; text-align: center;
}
.risk-boundary__label {
  position: absolute; top: 239px; left: 180px; width: 350px;
  color: #fde68a; text-align: center; font-size: 17px;
}
.risk-arrow {
  --animation-duration: 0.65s; --arrow-width: 1.3px;
  stroke: #fbbf24; stroke-width: var(--arrow-width); fill: #fbbf24;
  opacity: 0; transition: opacity 0.2s;
}
.risk-arrow.is-on { opacity: 0.85; transition-delay: var(--animation-delay); }
.risk-arrow :deep(.arrow-head) { stroke: none; }
.risk-ci {
  position: absolute; left: 190px; top: 421px; width: 540px;
  padding: 4px 10px; border: 1px solid #fbbf2466; border-radius: 5px;
  background: #221b19; color: #fde68a; text-align: center; font-size: 13px;
}
.risk-panel {
  position: absolute; left: 190px; top: 233px; width: 540px; height: 44px;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  border: 1px solid #a78bfa55; border-radius: 6px; background: #171327;
}
.risk-panel b { font-size: 15px; font-weight: 600; }
.risk-panel small { font-size: 11px; color: #b5adc8; }
.risk-contract { flex-direction: row; gap: 26px; }
.risk-contract > div { display: flex; flex-direction: column; align-items: center; }
.risk-contract code { color: #fda4af; font-size: 13px; }
.risk-contract__mismatch { color: #fb7185; font-size: 24px; }
</style>
