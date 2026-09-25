<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { onBeforeUnmount, useTemplateRef, watch } from 'vue'
import type { ChairPlanetOptions } from '../universe/chairs'
import { ChairPlanet } from '../universe/chairs'

/**
 * Планета из стульев (universe/chairs.ts). При каждом входе на слайд стулья слетаются заново.
 *
 * WebGL-контекст живёт только пока слайд активен и только на основном экране / у докладчика.
 * Slidev заранее монтирует все слайды и рисует их копии в превью и обзоре — если создавать
 * контекст при монтировании, их набирается больше лимита браузера (~16), и Chrome гасит самый
 * старый: фоновый шейдер и сцену доклада. В превью/обзоре/экспорте WebGL не создаётся вообще.
 */
const props = defineProps<ChairPlanetOptions>()

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
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
  scene = new ChairPlanet(canvas.value, props)
  scene.restart(performance.now())
  raf = requestAnimationFrame(loop)
}

function stop() {
  cancelAnimationFrame(raf)
  raf = 0
  scene?.dispose()
  scene = null
}

watch([active, canvas], ([on, el]) => {
  if (on && el && live())
    start()
  else
    stop()
}, { immediate: true })

onBeforeUnmount(stop)
</script>

<template>
  <canvas ref="canvas" class="chair-planet" />
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
