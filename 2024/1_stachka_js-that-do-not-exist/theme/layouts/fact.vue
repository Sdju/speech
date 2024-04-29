<template>
  <div class="slidev-layout fact flex flex-col justify-center">
    <div class="my-auto">
      <slot />
    </div>
  </div>
</template>
<style>
.fact {
  @apply font-size-8 text-center;

  h1 {
    @apply m-b-11;
  }

  p:has(img) {
    @apply flex justify-center;
  }

  img {
    @apply w-[30em] h-[15em];
    object-fit: contain;
  }

  pre {
    @apply text-left font-size-4;
  }
}
</style>
<script setup>
</script>