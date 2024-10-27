<script setup lang="ts">

const { 
  color = 'green',
  form = 'rect',
  inject = false,
} = defineProps<{
  color?: 'green' | 'blue' | 'red',
  form?: 'circle' | 'rect',
  inject?: boolean,
}>()

const colorPresets = {
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

const formPresets = {
  circle: 'rounded-[50%] px-4 py-2',
  rect: 'rounded-[8px] px-4 py-2',
}

</script>

<template>
  <div 
    class="fx b-1" 
    :class="[
      colorPresets[color].color, 
      formPresets[form], 
      {
        figure: !inject,
      }
    ]"
  >
    <slot />
  </div>
</template>