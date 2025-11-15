<script lang="ts" setup>
defineProps<{
  src: string
}>()
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center" :style="{backgroundImage: `url(${src})`}" >
  </div>
</template>
