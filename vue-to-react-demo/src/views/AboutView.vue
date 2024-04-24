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

    <button @click="count++"> + </button>
    <input :value="count" type="number" @input="count = Number($event.target.value)" />
    <h1 ref="test">Count: {{ count }}</h1>
  </div>
</template>

<style>
.about {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
  font-size: 24px;

  button, input {
    font-size: 1em;
    background: #333;
    border-radius: 4px;
    border: 1px solid #222;
    color: white;
  }

  input, button {
    padding: 0.5em 1em;
  }

  input {
    padding-left: 0.3em;
  }
}

@media (max-width: 1024px) {
  .about {
    align-items: stretch;
  }
}
</style>
