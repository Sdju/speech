<template>
  <div
    class="slidev-layout center w-full flex"
    :class="$attrs.slideClass"
  >
    <div class="w-full flex flex-col justify-center items-center">
      <slot />
    </div>
  </div>
</template>
