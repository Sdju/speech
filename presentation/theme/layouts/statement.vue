<template>
  <div class="slidev-layout statement flex flex-col justify-center">
    <slot />
  </div>
</template>
<style>
.statement {
  h1 {
    @apply font-size-12 m-b-10;
  }

  li {
    margin-left: 0.55em;
  }
}
</style>
