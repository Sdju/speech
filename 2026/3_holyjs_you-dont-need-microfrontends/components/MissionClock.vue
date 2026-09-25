<script setup lang="ts">
import { useNow } from '@vueuse/core'
import { computed } from 'vue'

const now = useNow({ interval: 1000 })
const time = computed(() => now.value.toISOString().slice(11, 19))
</script>

<template>
  <span class="font-mono tabular-nums">UTC {{ time }}</span>
</template>
