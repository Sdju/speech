<script lang="ts" setup>
const { 
  cover = true 
} = defineProps<{
  src: string
  cover: boolean
}>()
</script>

<template>
  <div 
    class="absolute top-0 left-0 w-full h-full bg-center"
    :class="{
      'bg-cover': cover,
    }" 
    :style="{backgroundImage: `url(${src})`}"
  />
</template>
