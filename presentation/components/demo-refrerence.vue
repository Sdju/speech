<script setup>

import {reactive, watch} from "vue";
import { useNav } from "@slidev/client";
import ZedeArrow from "./ZedeArrow.vue";

const { clicks, currentSlideNo } = useNav()


const valueA = reactive({
  color: 'bg-orange-2'
})
const valueB = reactive({
  top: '82px',
  color: 'b-orange-2 c-orange-2'
})

watch(clicks, () => {
  if (currentSlideNo.value !== 16) {
    return
  }
  if (clicks.value === 3) {
    valueB.top = '82px'
  }
  if (clicks.value === 4) {
    valueB.top = '262px'
  }
  if (clicks.value === 5) {
    valueA.color = 'bg-orange-2'
    valueB.color = 'b-orange-2 c-orange-2'
  }
  if (clicks.value === 6) {
    valueA.color = 'bg-green-3'
    valueB.color = 'b-green-3 c-green-3'
  }
  if (clicks.value === 7) {
    valueA.color = 'bg-red-3'
    valueB.color = 'b-red-3 c-red-3'
  }
})

</script>

<template>
  <div class="w-full h-full text-[14px] text-left relative bg-[#010b1e3f] p-4 rd-1 line-height-normal">
    <div class="absolute top-[60px] left-[330px] w-[140px] h-[90px] bg-white c-black rd-2 text-center" v-click="1">A</div>
    <div class="absolute top-[240px] left-[330px] w-[140px] h-[90px] bg-white c-black rd-2 text-center" v-click="2">B</div>
    <div
      class="absolute top-[82px] left-[340px] w-[120px] h-[60px] rd-2 text-center text-xl c-black font-600 vertical-mid line-height-[60px]"
      :class="valueA.color"
      key="valueA"
      v-click="3"
    >value
    </div>
    <div
      class="absolute left-[340px] w-[120px] h-[60px] b-2 b-dashed rd-2 text-center text-xl font-600 vertical-mid line-height-[60px]"
      :class="valueB.color"
      :style="valueB"
      key="valueB"
      v-click="4"
    >reference
    </div>
    <ZedeArrow y1="237" x1="400" y2="153" x2="400" stroke="dashed" v-click="5" />
  </div>
</template>

<style scoped>
* {
  transition: all 0.7s ease-out;
}
</style>