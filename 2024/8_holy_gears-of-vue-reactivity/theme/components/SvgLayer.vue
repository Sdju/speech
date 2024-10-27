<script setup lang="ts">
import { computed, provide, ref } from 'vue'

const svg = ref<SVGElement>()

const sizes = computed(() => ({
  width: svg.value?.clientWidth || 960,
  height: svg.value?.clientHeight || 552
}))
provide('sizes', sizes)
</script>

<template>
    <div class="absolute w-[960px] h-[552px] top-0 left-0">
        <svg
            ref="svg"
            viewBox="0 0 960 552"
            stroke="currentColor"
            fill="currentColor"
            class="absolute top-0 left-0 w-full h-full"
        >
            <slot />
        </svg>
    </div>
</template>
