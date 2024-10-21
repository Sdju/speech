<div class="mb-[50px] flex flex-row">
  <div class="w-[80px] h-[80px] rd-full of-hidden">
    <img class="w-full h-full object-cover" src="/img/photo.png" />
  </div>
  <div class="w-[80px] h-[80px] rd-full ml-[15px]">
    <zede-icon class="w-full h-full" />
  </div>
</div>
<div class="text-4xl mb-[50px]">Денис Чернов</div>
<p><file-icons-telegram /> @zede_code</p>
<p><ion-logo-twitch /> @izede</p>
<p><ion-logo-github /> @Sdju</p>

<QrCodeIntro class="w-[200px] h-[200px] absolute top-[200px] right-[80px]" />

---
layout: center
---

<h1 v-drag="[237,251,551,46]"> Шестеренки реактивности Vue </h1>

<ion-cog-sharp v-drag="[729,-220,496,450]" class="animate-[spin_70s_linear_infinite] opacity-20" />

<ion-cog-sharp v-drag="[-222,307,496,450]" class="animate-[spin_70s_linear_infinite] opacity-10" />

---

<div class="animate-spin" />

<material-symbols-settings-outline v-drag="[388,145,223,202]" class="animate-[spin_20s_linear_infinite]" />
<logos-vue v-drag="[476,229,46,42]" />

<f7-gear v-click v-drag="[656,115,104,95]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[691,84,40,40]" class="text-[1em] text-shadow-xl"> ref </div>

<heroicons-cog-solid v-click v-drag="[689,285,104,95]" class="animate-[spin_31s_linear_infinite]" />
<div v-click="'+0'" v-drag="[684,256,119,40]" class="text-[1em] text-shadow-xl"> computed </div>

<clarity-settings-solid v-click v-drag="[348,413,62,63]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[344,383,69,40]" class="text-[1em] text-shadow-xl"> watch </div>

<mingcute-settings-7-fill v-click v-drag="[178,278,88,89]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[165,252,138,40]" class="text-[1em] text-shadow-xl"> watchEffect </div>

<zondicons-cog v-click v-drag="[250,74,104,95]" class="animate-[spin_17s_linear_infinite]" />
<div v-click="'+0'" v-drag="[259,37,104,40]" class="text-[1em] text-shadow-xl"> reactive </div>

<!--
разгоняем за что мы любим Vue

мало кто знает а что за ними скрыто

поэтому мы посмотрим на каждую шестеренку по отдельности. Чтоб получить чуть более глубокое понимание.
-->

---
layout: cover
---

<img class="center w-[740px]" src="/img/interview.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/interview.png" />

---
layout: center
---

<div class="text-[1.5em]">Чем отличается computed от watch?</div>

<!--
Представим ситуацию из собеса

простые вопросы отвечается легко

- можно ли заменить computed на watch
- а можно ли заменить watch на computed

- визуализировать дополнительные вопросы
-->

---

<img class="center w-[740px]" src="/img/computed-watch.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[740px]" src="/img/computed-watch.png" />

<!--
Если вы начинаете чустсвовать себя неуверенно, то это доклад для вас.
-->

---
variant: second
---

<script setup>
const heights = [
  59,
  116,
  185,
  246,
  308,
  363,
  422,
  472,
]
</script>

<div class="center w-[340px] overflow-hidden transition-all duration-400" :style="{ maxHeight: `${heights[$clicks]}px` }" >
<img src="/img/iceberg.png" />
</div>
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<div class="center w-[340px] overflow-hidden transition-all duration-400" :style="{ maxHeight: `${heights[$clicks]}px` }" >
<img src="/img/iceberg.png" />
</div>

<div
  class="center overflow-hidden transition-all duration-400"
  :style="{ maxHeight: `${heights[$clicks]}px` }"
>
  <div class="text-shadow-xl w-[340px] h-[472px] flex flex-col items-stretch justify-around p-r-[60px] text-center relative">
    <div>азы реактивности</div>
    <div v-click>основной функционал</div>
    <div v-click>продвинутая реактивность</div>
    <div v-click>@vue/reactivity</div>
    <div v-click>@vue/runtime-core</div>
    <div v-click>Закрытый API</div>
    <div v-click class="text-size-[0.75em]">Контрибьютить во Vue</div>
    <div v-click class="text-size-[0.75em]">написать свою реактивность для Vapor Vue</div>
    <img class="absolute bottom-[-10px] right-0 h-[60px] w-[64px]" src="/img/jonson.jfif" />
  </div>
</div>

<!--
- вначале вам хватает простых ref computed и reactive
- затем познаете watch и watchEffect
- сложные случаи вынуждают познакомиться с effectScope, customRef

- показывать что прячется за каждым уровнем (визуально)
- прописать четкий сценарий развития и переходов
-->

---
variant: purple
---

<h1 absolute transition-all duration-400 text-center w-full left-0 :style="{ top: $clicks < 2 ? '27px' : '90px' }"> Реактивность </h1>

<img v-click="['+1', '+1']" v-drag="[165,96,673,403]" src="/img/magic.gif" />

<div v-click="'+0'" class="italic bg-[#00000048] p-4 rd-[8px] mb-4"> Способность системы автоматически реагировать на раздражители </div>

<v-click>

```ts
let oranges = ref(5)
let apples = ref(10)
let total = computed(() => oranges.value + apples.value)
console.log(total.value) // 15
apples.value = 7 
console.log(total.value) // 12
```

</v-click>

<!--
- тут точно можно сэкономить по времени. оставить основную суть
-->

---

<h1 v-drag="[365,32,244,46]"> Реактивность </h1>

<VueGraph v-click v-drag="[463,257,84,NaN]" label="Data" />
<Arrow v-click v-drag="[525,212,69,20,-58]" x1="0" y1="50%" x2="100%" y2="50%" />
<VueGraph v-click="'+0'" v-drag="[535,156,118,NaN]" label="Subscribers" />
<Arrow v-click v-drag="[470,317,69,20,270]" x1="0" y1="50%" x2="100%" y2="50%" />
<VueGraph v-click="'+0'" v-drag="[456,366,100,NaN]" label="Action" />
<Arrow v-click v-drag="[471,160,59,20,180]" x1="0" y1="50%" x2="100%" y2="50%" />
<VueGraph v-click="'+0'" v-drag="[319,152,141,NaN]" label="Scheduler" />
<Arrow v-click v-drag="[365,215,106,20,41]" x1="0" y1="50%" x2="100%" y2="50%" />

<!--
- продумать сценарий объяснения
- Date -> Model

- поясним а на кой планировщик
- вуй из коробки накапливает изменение и ищет место для коллбеков

- проговорить про планировщик
-->

---

<logos-vue v-drag="[441,49,119,108]" />

<div v-click v-drag="[231,210,191,54]" class="text-[1em] bg-green-5 rounded-md p-2" > @vue/reactivity </div>
<v-drag-arrow v-click="'+0'" pos="462,127,-72,71" />

<div v-click v-drag="[588,208,233,53]" class="text-[1em] bg-green-5 rounded-md p-2" > @vue/runtime-core </div>
<v-drag-arrow v-click="'+0'" pos="535,126,83,72" />

<div v-drag="[226,274,195,154]" class="absolute"><v-clicks>

- ref
- reactive
- <span class="text-red">computed</span>
- <span class="text-red">watchers</span>

</v-clicks></div>

<div v-drag="[587,273,195,154]" class="absolute"><v-clicks>

- computed
- watchers
- nextTick
- реактивность компонентов

</v-clicks></div>

<!--
визулизацию

что в нем лежит

- почему 2 пакета
- почему обрезан @vue/reactivity
- почему нет счедуллер
-->

---

# Карта реактивности

<img class="center w-[840px]" src="/img/map.png" />
<div class="absolute top-0 left-0 w-full h-full backdrop-blur-[30px]" />
<img class="center w-[840px]" src="/img/map.png" />

<div hidden v-drag="[120,392,757,182]" class="text-red text-[6em] text-shadow-lg"> ЗАМЕНИТЬ </div>

<!--
порешить этого слайда (переместить)

- обдумать идею глобальной карты и реактивности и доклада, максимально подробную при разгоне шестерни зумить часть карты (часть за которую отвечает эта шестерня)
-->
