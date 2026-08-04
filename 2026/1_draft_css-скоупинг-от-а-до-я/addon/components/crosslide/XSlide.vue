<script lang="ts" setup>
import { useSlots } from 'vue'
import { useXSlides } from '../../module/XSlides/XSlidesService'

const props = defineProps<{
  slot: string
}>()

const slots =defineSlots<{
  default: (props: any) => any
}>()

const { register } = useXSlides()

register(props.slot, slots.default)
</script>

<template>
</template>
