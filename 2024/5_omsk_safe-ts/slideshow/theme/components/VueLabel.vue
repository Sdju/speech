<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="rd-1 bg-[rgb(18_18_18)] px-[0.75rem] c-white text-[0.8rem] text-center">
    {{ label }}
  </div>
</template>

<style scoped>

</style>