<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed, ref, watch, nextTick } from "vue";

const props = withDefaults(
  defineProps<{
    words: string;
    filter?: boolean;
    duration?: number;
    mode?: boolean;
  }>(),
  { duration: 0.7, filter: true, mode: true },
);

const scope = ref(null);
const wordsArray = computed(() => props.words.split(" "));

const spanStyle = computed(() => ({
  opacity: 0,
  filter: props.filter ? "blur(10px)" : "none",
  transition: `opacity ${props.duration}s, filter ${props.duration}s`,
}));

const startAnimation = () => {
  if (scope.value) {
    const spans = (scope.value as HTMLElement).querySelectorAll("span");
    spans.forEach((span: HTMLElement) => {
      span.style.opacity = "0";
      span.style.filter = props.filter ? "blur(10px)" : "none";
    });
    spans.forEach((span: HTMLElement, index: number) => {
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.filter = props.filter ? "blur(0px)" : "none";
      }, index * 200);
    });
  }
};

const stopAnimation = () => {
  if (scope.value) {
    const spans = (scope.value as HTMLElement).querySelectorAll("span");
    spans.forEach((span: HTMLElement) => {
      span.style.opacity = "0";
    });
  }
};

watch(() => props.mode, (newVal) => {
  nextTick(() => {
    if (newVal) {
      startAnimation();
    } else {
      stopAnimation();
    }
  });
}, { flush: "post", immediate: true });
</script>

<template>
  <div :class="twMerge('leading-snug tracking-wide', $attrs.class)">
    <div ref="scope">
      <span
        v-for="(word, idx) in wordsArray"
        :key="word + idx"
        class="inline-block"
        :style="spanStyle"
      >
        {{ word }}&nbsp;
      </span>
    </div>
  </div>
</template>
