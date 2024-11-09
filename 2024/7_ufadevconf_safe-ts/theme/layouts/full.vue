<template>
  <div
    class="full size-full flex"
    :class="$attrs.slideClass"
  >
    <div class="size-full flex flex-col justify-center items-stretch">
      <slot />
    </div>
  </div>
</template>
<style>
.center {
  h2 {
    --at-apply: my-4;
  }
}
</style>
