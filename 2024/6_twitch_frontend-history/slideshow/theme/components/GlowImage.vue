<script setup lang="ts">
import {ReactiveFlags, watchEffect} from 'vue'

const props = defineProps<{
  src: string
}>()

const a = async function () {
  console.log('1')

  new Promise((res) => res(console.log('2')))
    .then(() => console.log('3'))

  await console.log('4')

  new Promise((res) => {
    throw Promise.resolve(50)
  })
    .then(() => console.log('6'))
    .finally(() => console.log('7'))

  console.log('8')
}

setTimeout(() => console.log('9'), 0)

a().then(() => console.log('10'))

console.log('11')

</script>

<template>
  <img class="absolute center w-[740px] max-h-[500px] object-contain" :src />
  <div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
  <img class="absolute center w-[740px] max-h-[500px] object-contain" :src />
</template>
