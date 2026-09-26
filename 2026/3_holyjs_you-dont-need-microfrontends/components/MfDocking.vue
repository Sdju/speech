<script setup lang="ts">
import { computed } from 'vue'

/**
 * Module Federation — двигатель внутри станции. Всё показывает сама станция
 * (состояние `blueprint` + `mf` и камера — во frontmatter слайда):
 *
 *   0 — станция целиком: скан переводит её в чертёж, внутри хаба проступает двигатель
 *   1 — камера влетает в хаб к двигателю; на его корпусе — лента с логотипом MF.
 *       Подпись появляется, когда камера долетела
 */
const { step = 0 } = defineProps<{ step?: number }>()
const s = computed(() => Math.max(0, Math.min(1, step)))
</script>

<template>
  <div class="mfe">
    <div class="mfe__caption glass" :class="s >= 1 ? 'mf-on' : 'mf-off'">
      <b>Module Federation</b>
      <span>двигатель станции</span>
    </div>
  </div>
</template>

<style scoped>
.mfe {
  position: absolute;
  inset: 0;
  color: #fff;
  text-align: left;
}

.mfe__caption {
  position: absolute;
  left: 60px;
  bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 22px;
  transition: opacity 0.6s ease 2.2s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.2s, filter 0.6s ease 2.2s;

  & b {
    font-size: 26px;
    font-weight: 700;
    color: #7dd3fc;
  }

  & span {
    font-size: 18px;
    color: rgb(255 255 255 / 0.75);
  }

  /* при возврате — сразу, без ожидания камеры */
  &.mf-off {
    transition-delay: 0s;
  }
}
</style>
