<template>
  <div class="parts-manager">
    <h3>Управление частями слайдов</h3>
    <div v-for="part in slidesParts" :key="part.position" class="part-item">
      <span>{{ part.position }}. {{ part.name }}</span>
      <button @click="renamePart(part)">Переименовать</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { slidesParts } from 'virtual:slides-parts-info'
import { slidesPartsApi } from 'virtual:slides-parts-api'

async function renamePart(part: any) {
  const newName = prompt(`Новое имя для "${part.name}":`, part.name)
  if (newName && newName !== part.name) {
    const result = await slidesPartsApi.renamePart(part.src, newName)
    if (result.success) {
      alert(`Файл успешно переименован!`)
      // Страница перезагрузится автоматически через HMR
    } else {
      alert(`Ошибка: ${result.error}`)
    }
  }
}
</script>

<style scoped>
.parts-manager {
  padding: 20px;
  background: #1a1a1a;
  color: white;
}

.part-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 5px 0;
  background: #2a2a2a;
  border-radius: 4px;
}

button {
  padding: 5px 15px;
  background: #4a9eff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #357abd;
}
</style>

