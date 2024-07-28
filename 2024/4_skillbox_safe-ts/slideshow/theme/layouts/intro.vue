<script setup lang="ts">
defineProps<{
  author?: string,
  name?: string,
  telegram?: string,
  twitch?: string,
  github?: string,
  discord?: string,
}>()
</script>
<template>
  <div class="slidev-layout flex flex-col justify-center items-center">
    <span text-5xl>{{ name }}</span>
    <span text-3xl pt6>{{ author }}</span>

    <div  absolute pos="bottom-xl right-xl" flex="~ col">
      <div v-if="telegram">
        <file-icons-telegram /> {{ telegram }}
      </div>
      <div v-if="twitch">
        <ion-logo-twitch /> {{ twitch }}
      </div>
      <div v-if="github">
        <ion-logo-github /> {{ github }}
      </div>
      <div v-if="discord">
        <ion-logo-discord /> {{ discord }}
      </div>
    </div>
  </div>
</template>