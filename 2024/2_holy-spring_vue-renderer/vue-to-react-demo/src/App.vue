<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue';

const r = ref<null|number>(0)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Статика</RouterLink>
        <RouterLink to="/dynamic">Динамика</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  margin-bottom: 40px;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a:not(.router-link-active) {
  opacity: 0.5;
}
</style>
