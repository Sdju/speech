<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
  background: {
    default: '',
  },
})

const a = async function () {
  console.log('1')

  new Promise((res) => res(console.log('2')))
    .then(() => console.log('3')

  await console.log('4')

  new Promise((res) => res(console.log('5')))
    .then(() => console.log('6')

  console.log('7')
}

setTimeout(() => console.log('8'), 0)

a().then(() => console.log('9'))

console.log('10')

const style = computed(() => handleBackground(props.background, true))
</script>

<template>
  <div class="slidev-layout cover" :style="style">
    <div class="my-auto w-full">
      <slot />
    </div>
  </div>
</template>
