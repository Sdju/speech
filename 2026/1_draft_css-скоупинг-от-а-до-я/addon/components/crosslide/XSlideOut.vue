<script lang="ts" setup>
import { useNav } from '@slidev/client'
import { useXSlides } from '../../module/XSlides/XSlidesService'

defineProps<{
  slot: string
}>()

const { isPlaying  } = useNav()
const { slots } = useXSlides()
</script>

<template>
  <component 
    v-if="isPlaying" 
    :is="slots[slot]"
    :style="{ 'view-transition-name': `x-slide-${slot}` }"
    :className="['vt', $attrs.class]"
    v-bind="$attrs"
  />
</template>
