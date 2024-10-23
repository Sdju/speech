<script setup lang="ts">

import { twMerge } from 'tailwind-merge';
defineProps<{
  label: string
}>()
</script>

<template>
  <div
    :class="twMerge([
      'bg-[#4ade804d] rd-1 px-[0.75rem] py-1 c-white text-[1rem] flex flex-col items-center justify-center',
      $attrs.class,
    ])"
  >
    <slot />
  </div>
</template>
