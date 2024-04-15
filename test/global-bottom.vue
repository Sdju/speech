<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNav } from '@slidev/client'

const { currentSlideRoute } = useNav()

const frontmatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const offset = computed(() => frontmatter.value['bg.offset']?.split(' ').map(x => Number(x)) ?? [980, 0])
const sizes = computed(() => frontmatter.value['bg.sizes']?.split(' ').map(x => Number(x)) ?? [320, 280])
const green = computed(() => frontmatter.value['bg.green'] ?? '#3ABA7F')
const speed = computed(() => frontmatter.value['bg.speed'] ?? '0.7s')
</script>

<template>
  <div class="absolute w-full h-full">
    <svg class="absolute left-[0px] top-0 w-[980px] h-[554px] back" viewBox="0 0 980 532" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse class="back__green" :fill="green"/>
      <ellipse class="back__black" fill="#111214"/>
    </svg>
    <div class="absolute left-0 top-0 w-full h-full backdrop-blur-[40px] " />
  </div>


</template>
<style>
.back {
  &__green, &__black {
    transition: all v-bind(speed) ease-out;
  }

  &__green {
    rx: v-bind('sizes[0]');
    ry: v-bind('sizes[0]');
    cx: v-bind('offset[0] + 190');
    cy: v-bind('offset[1] + 290');
  }

  &__black {
    rx: v-bind('sizes[1]');
    ry: v-bind('sizes[1]');
    cx: v-bind('170 + offset[0]');
    cy: v-bind('250 + offset[1]');
  }
}
</style>