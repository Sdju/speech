<script setup lang="ts">

const { 
  color = 'green',
} = defineProps<{
  color?: 'green' | 'blue' | 'red'
}>()

const presets = {
  green: {
    color: 'bg-green/40 b-green c-green',
  },
  blue: {
    color: 'bg-blue/40 b-blue c-blue',
  },
  red: {
    color: 'bg-red/40 b-red c-red',
  },
}

</script>

<template>
  <div class="figure fx b-1 rounded-[8px] px-4 py-2" :class="presets[color].color">
    <slot />
  </div>
</template>