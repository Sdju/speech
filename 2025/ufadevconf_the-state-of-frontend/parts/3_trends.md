---
layout: center
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="AI AI AI AI AI AI"
/>

# 

---
timeline:
  - point1: 'active'
    point2: 'hidden'
    point3: 'hidden'
    point4: 'hidden'
    exampleId: 1
    example: 'pos-0 fx duration-500 cs-red'
  - point1: ''
    point2: 'active'
    exampleId: 2
    example: 'cs-blue'
  - point2: ''
    point3: 'active'
    exampleId: 3
    example: 'cs-green'
  - point3: ''
    point4: 'active'
    exampleId: 4
    example: 'cs-purple'
---

<script setup lang="ts">
import imgHand from '../img/hands.png'
import imgLife from '../img/life.png'
import imgBread from '../img/bread.png'
import imgShit from '../img/shit.png'
</script>

<h1 class="text-center">Влияние AI на фронтенд</h1>

<Points>
  <Point icon="i-lineicons-bricks" :attrs="t.point1" class="cs-red">
    Засматриваются разработчики
  </Point>
  <Point icon="i-ri-graduation-cap-fill" :attrs="t.point2" class="cs-green">
    Засматриваются работодатели
  </Point>
  <Point icon="i-mingcute-baby-fill" :attrs="t.point3" class="cs-blue">
    Повсеместное внедрение
  </Point>
  <Point icon="i-game-icons-trophy-cup" :attrs="t.point4" class="cs-purple">
    Невообразимый спрос
  </Point>
  <Point full :class="t.example">
    <ImgExample v-if="t.exampleId === 1" :src="imgHand" />
    <ImgExample v-if="t.exampleId === 2" :src="imgLife" />
    <ImgExample v-if="t.exampleId === 3" :src="imgBread" />
    <ImgExample v-if="t.exampleId === 4" :src="imgShit" />
  </Point>
</Points>

