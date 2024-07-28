<template>
  <div class="slidev-layout center w-full flex">
    <div class="w-full flex flex-col justify-center items-center">
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