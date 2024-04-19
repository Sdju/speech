<script setup lang="ts">
import {computed, getCurrentInstance, ref, watch} from 'vue'
import {useNav} from '@slidev/client'

const {currentSlideRoute, currentSlideNo} = useNav()

const frontmatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})

function ellipseMapper(key, base) {
  const array = frontmatter.value[key]?.split(' ').map((x, id) => x === '_' ? base[id] : Number(x)) ?? base
  return {
    rx: array[0],
    ry: array[1],
    cx: array[2],
    cy: array[3]
  }
}

const offset = computed(() => frontmatter.value['bg.offset']?.split(' ').map(x => Number(x)) ?? [0, 0])
const ellipseGreen = computed(() => ellipseMapper('bg.green', [320, 320, 190, 290]))
const ellipseBlack = computed(() => ellipseMapper('bg.black', [280, 280, 170, 250]))
const ellipseAccent = computed(() => ellipseMapper('bg.accent', [280, 280, 170, 250]))
const transGreen = computed(() => frontmatter.value['bg.green.trans'] ?? 'rotate(-40.4524 587.434 858.064)')
const transBlack = computed(() => frontmatter.value['bg.black.trans'] ?? 'rotate(-40.4524 705.266 526.881)')
const transAccent = computed(() => frontmatter.value['bg.accent.trans'] ?? 'rotate(-40.4524 759.916 639.553)')
const speed = computed(() => frontmatter.value['bg.speed'] ?? '0.7s')

</script>

<template>
  <div hidden>
  </div>
  <div class="absolute w-full h-full">
    <svg
      class="absolute left-[0px] top-0 w-[980px] h-[554px] back"
      :viewBox="`${offset} ${offset} ${offset + 980} ${offset + 532}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        :rx="ellipseAccent.rx"
        :ry="ellipseAccent.ry"
        :cx="ellipseAccent.cx"
        :cy="ellipseAccent.cy"
        :transform="transAccent"
        fill="#34475E"
      />
      <ellipse
        :rx="ellipseGreen.rx"
        :ry="ellipseGreen.ry"
        :cx="ellipseGreen.cx"
        :cy="ellipseGreen.cy"
        :transform="transGreen"
        fill="#3ABA7F"
      />
      <ellipse
        :rx="ellipseBlack.rx"
        :ry="ellipseBlack.ry"
        :cx="ellipseBlack.cx"
        :cy="ellipseBlack.cy"
        :transform="transBlack"
        fill="#111214"
      />
    </svg>
    <div class="absolute left-0 top-0 w-full h-full backdrop-blur-[40px] "/>
    <div class="absolute right-[20px] bottom-[20px] text-lg opacity-50">{{ currentSlideNo }}</div>
  </div>

</template>
<style>
.back *, .back {
  transition: all v-bind(speed) ease-out;
}
</style>