<script setup lang="ts">
import SvgArrow from '../addon/components/svg/SvgArrow.vue'
import type { ArchRiskKind } from '../data/arch-risks'

/**
 * Оверлеи претензий на уровне CI (схема в виде сайта). Всё, что происходит в браузере, —
 * ошибки, diff контракта, зависимости — рисует сама ArchScheme на странице.
 */
defineProps<{ kind: ArchRiskKind }>()
// от каждой стойки — прямо вниз в общий прогон
const checks = [40, 250, 460, 670].map(x => `M${x} 404 L${x} 436`)
</script>

<template>
  <div class="risk-details">
    <!-- чья логика промокодов: рамка вокруг стоек Catalog и Cart, «?» — в зазоре между ними -->
    <div class="risk-boundary hud-dashed" :class="{ 'is-hidden': kind !== 'boundaries' }">
      <span class="risk-boundary__question">?</span>
    </div>
    <div class="risk-boundary__label" :class="{ 'is-hidden': kind !== 'boundaries' }">Промокоды — чьи?</div>

    <svg class="risk-svg" viewBox="0 0 920 488" width="920" height="488">
      <SvgArrow v-for="(d, i) in checks" :key="i" :d="d" :reveal="kind === 'ci' ? 1 : 0"
        class="risk-arrow" :class="{ 'is-on': kind === 'ci' }"
        :style="{ '--animation-delay': kind === 'ci' ? `${0.2 + i * 0.12}s` : '0s' }" />
    </svg>
    <HudBlock class="risk-ci" :shown="kind === 'ci'" color="#fbbf24" sm solid>общий прогон</HudBlock>
  </div>
</template>

<style scoped>
/* поверх непрозрачных участков страницы */
.risk-details { z-index: 5; }
.risk-details, .risk-svg { position: absolute; inset: 0; pointer-events: none; }
.risk-details > div:not(.hb) { transition: opacity 0.25s; }
.risk-details .is-hidden { opacity: 0; }
.risk-boundary {
  position: absolute; left: 176px; top: 326px; width: 358px; height: 84px;
  --hud-c: #fbbf24;
}
.risk-boundary__question {
  position: absolute; left: 161px; top: 18px; width: 36px;
  color: #fbbf24; font-size: 30px; font-weight: bold; text-align: center;
}
.risk-boundary__label {
  position: absolute; top: 414px; left: 176px; width: 358px;
  color: #fde68a; text-align: center; font-size: 15px;
}
.risk-arrow {
  --animation-duration: 0.65s; --arrow-width: 1.3px;
  stroke: #fbbf24; stroke-width: var(--arrow-width); fill: #fbbf24;
  opacity: 0; transition: opacity 0.2s;
}
.risk-arrow.is-on { opacity: 0.85; transition-delay: var(--animation-delay); }
.risk-arrow :deep(.arrow-head) { stroke: none; }
.risk-ci {
  /* на всю ширину ряда стоек: от левого края Shell (40 − 64) до правого края Profile (670 + 64) */
  position: absolute; left: -24px; top: 440px; width: 758px;
  padding: 4px 10px; color: #fde68a; text-align: center; font-size: 13px;
}
</style>
