<script setup lang="ts">
defineProps<{
  label: string
  color?: string
}>()
</script>

<template>
  <div :style="{background: color ?? '#3ABA7F'}" class="vue-graph rd-1 px-[0.75rem] py-1 c-white text-[1rem] text-center">
    {{ label }}
  </div>
</template>

<style>
.vue-graph {
  transition: 0.3s ease-out;
}
</style>