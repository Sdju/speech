<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed, ref, watch, nextTick, useTemplateRef } from "vue";

const props = withDefaults(
  defineProps<{
    words: string;
    filter?: boolean;
    duration?: number;
    mode?: boolean;
  }>(),
  { duration: 0.7, filter: true, mode: true },
);

const scope = useTemplateRef<HTMLElement>("scope");
const wordsArray = ref(props.words.split(" ").map((word) => ({
  word,
  style: {
    opacity: 0,
    filter: props.filter ? "blur(10px)" : "none",
    transition: `opacity ${props.duration}s, filter ${props.duration}s`,
  }
})));

const startAnimation = () => {
  if (scope.value) {
    wordsArray.value.forEach((word, index) => {
      setTimeout(() => {
        word.style.opacity = 1;
        word.style.filter = props.filter ? "blur(0px)" : "none";
      }, index * 200);
    });
  }
};

const stopAnimation = () => {
  if (scope.value) {
    wordsArray.value.forEach((word) => {
      word.style.opacity = 0;
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
  <div :class="twMerge('leading-snug tracking-wide')">
    <div ref="scope">
      <span
        v-for="(word, idx) in wordsArray"
        :key="word.word + idx"
        class="inline-block"
        :style="word.style"
      >
        {{ word.word }}&nbsp;
      </span>
    </div>
  </div>
</template>
