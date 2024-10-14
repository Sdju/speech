<script setup lang="ts">
import {ReactiveFlags, watchEffect} from 'vue'

const props = defineProps<{
  src: string
}>()

</script>

<template>
  <img class="absolute center w-[740px] max-h-[500px] object-contain" :src />
  <div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
  <img class="absolute center w-[740px] max-h-[500px] object-contain" :src />
</template>
