<script lang="ts" setup>
/**
 * Render-only alias of XSlide (no slot registration).
 * Prefer `<XSlide name="…" />` without children for the same effect.
 */
import XSlide from './XSlide.vue'

defineProps<{
  name?: string
  /** @deprecated use `name` */
  slot?: string
}>()
</script>

<template>
  <XSlide v-bind="{ ...$props, ...$attrs }" />
</template>
