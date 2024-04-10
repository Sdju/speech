<script setup>

import {reactive, watch} from "vue";
import { useNav } from "@slidev/client";
import ZedeArrow from "./ZedeArrow.vue";

const { clicks, currentSlideNo } = useNav()

const vars = reactive({
  pos: 'left-[330px]'
})

const valueA = reactive({
  color: 'bg-orange-2',
  pos: 'left-[340px]'
})
const refA = reactive({
  color: 'b-orange-4 c-orange-4',
})
const valueB = reactive({
  top: '82px',
  color: 'b-orange-4 c-orange-4',
  color2: 'bg-blue-2'
})
const arrowB = reactive({
  y1: 237,
  y2: 147,
  x1: 300,
  x2: 370,
})

watch(clicks, () => {
  if (currentSlideNo.value !== 18) {
    return
  }
  if (clicks.value === 3) {
    valueA.pos = 'left-[340px]'
    vars.pos = 'left-[330px]'
  }
  if (clicks.value === 4) {
    valueA.pos = 'left-[370px]'
    vars.pos = 'left-[160px]'
  }
  if (clicks.value === 5) {
    valueB.top = '82px'
  }
  if (clicks.value === 6) {
    valueB.top = '262px'
    valueA.color = 'bg-orange-2';
    refA.color = 'b-orange-4 c-orange-4';
    valueB.color = 'b-orange-4 c-orange-4';
  }
  if (clicks.value === 7) {
    valueB.top = '262px'
    valueA.color = 'bg-green-2';
    refA.color = 'b-green-4 c-green-4';
    valueB.color = 'b-green-4 c-green-4';

    Object.assign(arrowB, {
      y1: 237,
      y2: 147,
      x1: 300,
      x2: 370,
    })
  }
  if (clicks.value === 8) {
    Object.assign(arrowB, {
      y1: 295,
      y2: 295,
      x1: 305,
      x2: 365,
    })
    valueB.color = 'b-blue-4 c-blue-4';
  }
})

</script>

<template>
  <div class="w-full h-full text-[14px] text-left relative bg-[#010b1e3f] p-4 rd-1 line-height-normal">
    <div
      class="absolute top-[60px] w-[140px] h-[90px] bg-white c-black rd-2 text-center"
      :class="vars.pos"
      v-click="1"
    >A</div>
    <div
      class="absolute top-[240px] w-[140px] h-[90px] bg-white c-black rd-2 text-center"
      :class="vars.pos"
      v-click="2"
    >B</div>
    <div
      class="absolute top-[82px] w-[120px] h-[60px] rd-2 text-center text-xl c-black font-600 vertical-mid line-height-[60px]"
      :class="[valueA.color, valueA.pos]"
      v-click="3"
    >value
    </div>
    <div
      class="absolute left-[340px] top-[40px] w-[320px] h-[320px] c-orange-4 b-orange-4 b-2 b-dashed rd-2 text-center text-xl font-600"
      v-click="4"
    >Heap
    </div>
    <div class="base top-[262px] left-[510px]" v-click="4">value</div>
    <div class="base top-[168px] left-[510px]" v-click="4">value</div>
    <div class="base top-[82px] left-[510px]" v-click="4">value</div>
    <div class="base top-[82px] left-[510px]" v-click="4">value</div>
    <div class="base top-[168px] left-[370px]" v-click="4">value</div>
    <div class="base top-[262px] left-[370px]" v-click="4">value</div>
    <ZedeArrow y1="113" x1="305" y2="113" x2="365" stroke="dashed" color="white" v-click="5" />
    <div
      class="absolute left-[170px] top-[80px] w-[120px] h-[60px] b-2 b-dashed rd-2 text-center text-xl font-600 vertical-mid line-height-[55px]"
      :class="[refA.color]"
      v-click="5"
    >reference
    </div>
    <div
      class="absolute left-[170px] w-[120px] h-[60px] b-2 b-dashed rd-2 text-center text-xl font-600 vertical-mid line-height-[55px]"
      :class="valueB.color"
      :style="valueB"
      v-click="6"
    >reference
    </div>
    <ZedeArrow :y1="arrowB.y1" :x1="arrowB.x1" :y2="arrowB.y2" :x2="arrowB.x2" stroke="dashed" v-click="6" />
    <div
      class="absolute top-[262px] left-[370px] w-[120px] h-[60px] rd-2 text-center text-xl c-black font-600 vertical-mid line-height-[60px]"
      :class="[valueB.color2]"
      v-click="8"
    >value
    </div>
  </div>
</template>

<style scoped>
* {
  transition: all 0.7s ease-out;
}

.base {
  @apply absolute w-[120px] h-[60px] b-gray-3 c-gray-3 b-2 b-dashed rd-2 text-center text-xl font-600 vertical-mid line-height-[55px] op40;
}
</style>