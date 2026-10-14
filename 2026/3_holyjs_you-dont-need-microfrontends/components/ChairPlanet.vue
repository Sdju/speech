<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
import type { ChairPlanetOptions } from '../universe/chairs'
import { ChairPlanet } from '../universe/chairs'

/**
 * Планета из стульев (universe/chairs.ts). При каждом входе на слайд — два стула, по кликам налетают новые волны.
 *
 * WebGL-контекст живёт только пока слайд активен и только на основном экране / у докладчика.
 * Slidev заранее монтирует все слайды и рисует их копии в превью и обзоре — если создавать
 * контекст при монтировании, их набирается больше лимита браузера (~16), и Chrome гасит самый
 * старый: фоновый шейдер и сцену доклада. В превью/обзоре/экспорте WebGL не создаётся вообще.
 */
const props = defineProps<ChairPlanetOptions & {
  /** клик слайда: 0 — два стула, дальше — всё больше */
  step?: number
}>()

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
/**
 * Поколение канваса. При уходе со слайда контекст гасится (forceContextLoss), а потерянный
 * контекст остаётся привязан к своему канвасу навсегда: новый рендерер на том же элементе
 * получил бы мёртвый контекст. Поэтому после освобождения канвас заменяется новым.
 */
const generation = ref(0)
const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const live = () => $renderContext.value === 'slide' || $renderContext.value === 'presenter'

let scene: ChairPlanet | null = null
let raf = 0

function loop(now: number) {
  scene?.render(now)
  raf = requestAnimationFrame(loop)
}

function start() {
  if (scene || !canvas.value)
    return
  const now = performance.now()
  scene = new ChairPlanet(canvas.value, props)
  scene.restart(now)
  // вход на слайд с уже сделанными кликами: прошлые волны сразу на местах
  const step = props.step ?? 0
  for (let k = 0; k <= step; k++)
    scene.setStage(k, now, step > 0)
  raf = requestAnimationFrame(loop)
}

function stop() {
  cancelAnimationFrame(raf)
  raf = 0
  if (!scene)
    return
  scene.dispose()
  scene = null
  generation.value++
}

watch([active, canvas], ([on, el]) => {
  if (on && el && live())
    start()
  else
    stop()
}, { immediate: true })

watch(() => props.step, (step, old) => {
  if (!scene || step == null)
    return
  // клики вперёд — налетает следующая волна; назад — просто ничего не убираем
  if (old == null || step > old)
    scene.setStage(step, performance.now())
})

onBeforeUnmount(stop)
</script>

<template>
  <canvas :key="generation" ref="canvas" class="chair-planet" />
</template>

<style scoped>
.chair-planet {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
