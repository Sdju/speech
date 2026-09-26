<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import { computed, ref, watch } from 'vue'

/** Вопрос → раскрытие примера → сопоставление пользы и цены. Один внешний драйвер $clicks. */
const { step = 0 } = defineProps<{ step?: number }>()
const exampleShown = computed(() => step >= 1)
const revealed = computed(() => step >= 2)
const active = useIsSlideActive()
const instant = ref(true)
watch([() => step, active], ([next, on], [previous, wasOn]) => {
  instant.value = !on || !wasOn || next <= previous || next - previous !== 1
}, { flush: 'sync' })

const costs = [
  { name: 'Сложнее сборка', icon: 'build' },
  { name: 'Больше настройки CI', icon: 'pipeline' },
  { name: 'Обучение команды', icon: 'team' },
]
</script>

<template>
  <div class="architecture-choice" :class="{ 'has-example': exampleShown, 'has-cost': revealed, 'is-instant': instant }">
    <h1>Перед выбором архитектуры</h1>

    <div class="choice-stage">
      <div class="choice-benefit-slot">
        <article class="choice-panel choice-benefit glass">
          <span class="choice-label"><i /> Задача</span>
          <h2>Какую проблему<br>я пытаюсь решить?</h2>

          <div class="benefit-example" :aria-hidden="!exampleShown">
            <span class="example-label">Например</span>
            <div class="documentation">
              <svg class="document-icon" viewBox="0 0 48 56" fill="none" aria-hidden="true">
                <path d="M9 2h22l10 10v40a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
                <path d="M30 2v12h11M15 24h18M15 32h18M15 40h11" />
              </svg>
              <div>
                <h3>Удобная документация</h3>
                <p>Быстро находить ответы<br>по проекту</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="choice-link" :aria-hidden="true"><span>?</span></div>

      <article class="choice-panel choice-cost glass" :aria-hidden="!revealed">
        <span class="choice-label"><i /> Цена решения</span>
        <h2>Чем я готов<br>пожертвовать?</h2>

        <div class="costs">
          <div v-for="(cost, i) in costs" :key="cost.icon" class="cost-row" :style="{ '--order': i }">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <template v-if="cost.icon === 'build'">
                <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z M4 7.5l8 4.5 8-4.5M12 12v9M8 5.3l8 4.5v4.5" />
              </template>
              <template v-else-if="cost.icon === 'pipeline'">
                <rect x="2" y="9" width="5" height="6" rx="1" />
                <rect x="17" y="3" width="5" height="6" rx="1" />
                <rect x="17" y="15" width="5" height="6" rx="1" />
                <path d="M7 12h5M12 6v12M12 6h5M12 18h5" />
              </template>
              <template v-else>
                <circle cx="9" cy="7" r="3" /><path d="M3 20v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6M18 13a5 5 0 0 1 4 5v2" />
              </template>
            </svg>
            <span>{{ cost.name }}</span>
          </div>
        </div>
      </article>
    </div>

    <div class="choice-conclusion" :aria-hidden="!revealed">Польза оправдывает эту цену?</div>
  </div>
</template>

<style scoped>
.architecture-choice {
  --choice-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: absolute;
  inset: 0;
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #fff;
}
.architecture-choice h1 {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
.choice-stage {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 68px minmax(0, 1fr);
  align-items: center;
}
.choice-panel {
  --accent: #34d399;
  min-width: 0;
  height: 318px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-color: color-mix(in srgb, var(--accent) 25%, transparent);
}
.choice-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
}
.choice-label i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 12px currentColor; }
.choice-panel h2 {
  margin: 16px 0 0;
  font-size: 29px;
  font-weight: 600;
  line-height: 1.17;
  letter-spacing: -0.025em;
}
.choice-benefit-slot { height: 318px; min-width: 0; }
.choice-benefit {
  width: 100%;
  height: 180px;
  overflow: hidden;
  transform: translateX(calc(50% + 34px));
  transition: height 0.85s var(--choice-ease), transform 0.85s var(--choice-ease);
}
.choice-benefit :is(.choice-label, h2) { flex-shrink: 0; }
.has-example .choice-benefit { height: 318px; }
.has-cost .choice-benefit { transform: none; }
.benefit-example {
  flex-shrink: 0;
  margin-top: auto;
  padding: 15px 14px;
  border-radius: 10px;
  border: 1px solid #34d39926;
  background: #34d39909;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.55s ease, transform 0.65s var(--choice-ease);
}
.has-example .benefit-example { opacity: 1; transform: none; transition-delay: 0.25s; }
.example-label { color: #9cadab; font-size: 11px; }
.documentation { display: flex; gap: 14px; align-items: center; margin-top: 10px; }
.document-icon { flex: 0 0 39px; height: 47px; stroke: #6ee7b7; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.documentation h3 { margin: 0; font-size: 17px; font-weight: 600; letter-spacing: -0.015em; color: #d1fae5; }
.documentation p { margin: 6px 0 0; font-size: 13px; line-height: 1.4; color: #ffffffa8; }
.choice-cost {
  --accent: #fbbf24;
  opacity: 0;
  transform: translateX(20px);
  filter: blur(8px);
  transition: opacity 0.55s ease, transform 0.7s var(--choice-ease), filter 0.55s ease;
}
.has-cost .choice-cost { opacity: 1; transform: none; filter: none; transition-delay: 0.3s; }
.costs { display: grid; gap: 8px; margin-top: auto; }
.cost-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 7px;
  border: 1px solid #fbbf241f;
  background: #fbbf2408;
  font-size: 15px;
  line-height: 1.3;
  color: #fff3d4;
}
.cost-row svg { width: 21px; height: 21px; flex-shrink: 0; stroke: #fbbf24; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.has-cost .cost-row { animation: cost-enter 0.45s var(--choice-ease) calc(0.6s + var(--order) * 0.13s) backwards; }
.choice-link {
  position: relative;
  display: grid;
  place-items: center;
  opacity: 0;
  transition: opacity 0.5s;
}
.choice-link::before { content: ''; position: absolute; left: 0; right: 0; border-top: 1px dashed #c4b5fd66; }
.choice-link span { z-index: 1; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #c4b5fd66; background: #191426; color: #ddd6fe; font-size: 23px; font-weight: 300; }
.has-cost .choice-link { opacity: 1; transition-delay: 0.65s; }
.choice-conclusion {
  height: 30px;
  text-align: center;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #ddd6fe;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s, transform 0.6s var(--choice-ease);
}
.has-cost .choice-conclusion { opacity: 1; transform: none; transition-delay: 1.05s; }
@keyframes cost-enter { from { opacity: 0; transform: translateX(10px); } }
.is-instant *, .is-instant *::before { transition: none !important; animation: none !important; }
@media (prefers-reduced-motion: reduce) {
  .architecture-choice *, .architecture-choice *::before { transition: none !important; animation: none !important; }
}
</style>
