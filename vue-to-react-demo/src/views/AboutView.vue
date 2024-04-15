<script setup>
import { ref, watch, nextTick } from 'vue'
const count = ref(0)
const test = ref(null)

watch(test, async () => {
  setTimeout(() => {
    console.log(test.value.ref)
  })
})
</script>

<template>
  <div class="about">
    <h1 ref="test">This is an about page</h1>
    {{ count }}
    <button @click="count++"> + </button>
    <input :value="count" type="number" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
