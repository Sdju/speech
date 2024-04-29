<script setup lang="ts">
import {computed, getCurrentInstance, ref, watch, onScopeDispose} from 'vue'
import {useNav} from '@slidev/client'

window.$doubleClick = function(ctx, when: number | number[]) {
  if (ctx.value !== 'slide') {
    return
  }
  const instance = getCurrentInstance()
  const isCurrent = computed(() => currentSlideNo.value === instance.setupState.$page)

  const whenDouble = new Set([when].flat())


  const { clicks, next } = useNav();
  watch(clicks, (id, prev) => {
    if (whenDouble.has(id) && (id > prev) && isCurrent.value) {
      setTimeout(() => {
        next()
      }, 500)
    }
  });
}

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
const ellipseGreen = computed(() => ellipseMapper('bg.green', [280, 277, 1100, 276]))
const ellipseBlack = computed(() => ellipseMapper('bg.black', [235, 282, 1102, 262]))
const ellipseAccent = computed(() => ellipseMapper('bg.accent', [0, 0, 682, 692]))
const transGreen = computed(() => frontmatter.value['bg.green.trans'] ?? 'rotate(0)')
const transBlack = computed(() => frontmatter.value['bg.black.trans'] ?? 'rotate(0)')
const transAccent = computed(() => frontmatter.value['bg.accent.trans'] ?? 'rotate(0)')
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

.tehas {
  @apply animate-spin;
}
</style>