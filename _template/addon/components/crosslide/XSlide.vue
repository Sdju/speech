<script lang="ts" setup>
import { useNav } from '@slidev/client'
import { useSlots } from 'vue';

const slots = useSlots()

</script>

<template>
  <div v-if="isCurrent">
    <slot />
  </div>
</template>
