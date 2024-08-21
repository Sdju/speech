<template>
  <div class="full w-full h-full flex" >
    <div class="w-full h-full flex flex-col justify-center items-stretch">
      <slot />
    </div>
  </div>
</template>
<style>
.center {
  h2 {
    @apply my-4;
  }
}
</style>
<script setup>
</script>