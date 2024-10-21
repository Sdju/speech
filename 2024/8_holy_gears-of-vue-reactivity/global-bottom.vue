<script setup>
import { useNav } from "@slidev/client"
import BlurredPolyBackground from "./theme/components/backgrounds/BlurredPolyBackground.vue"

const { currentSlideNo, currentSlideRoute } = useNav()
</script>

<template>
  <div>
    <BlurredPolyBackground />
  </div>
</template>
