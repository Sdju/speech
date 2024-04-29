<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

setInterval(() => count.value++, 1000)
</script>
<template>
  <article>
    <h1>
      Простой пример верстки
    </h1>
    <div>
      С таймером {{ count }}
      <div v-if="count > 5" />
    </div>
  </article>
</template>