<template>
  <div class="slidev-layout default w-full flex" :variant="$attrs.variant ?? 'first'">
    <div class="w-full flex flex-col justify-center items-stretch">
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