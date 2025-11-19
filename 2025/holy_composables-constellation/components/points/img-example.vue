<script lang="ts" setup>
const { 
  cover = true,
  contain = false
} = defineProps<{
  src: string
  cover?: boolean
  contain?: boolean
}>()
</script>

<template>
  <div 
    class="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat overflow-hidden rounded-[8px]"
    :class="{
      'bg-cover': cover,
      'bg-contain': contain,
    }" 
    :style="{backgroundImage: `url(${src})`}"
  />
</template>
