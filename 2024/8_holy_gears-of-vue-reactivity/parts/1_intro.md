<div class="mb-50px flex flex-row">
  <div class="size-80 rd-full of-hidden">
    <img class="size-full object-cover" src="/img/photo.png" />
  </div>
  <div class="size-80 rd-full ml-15px">
    <ZedeIcon class="size-full" />
  </div>
</div>
<div class="text-4xl mb-50px">Денис Чернов</div>
<div class="grid grid-cols-[36px_1fr] gap-2 items-center">
  <FileIconsTelegram /> @zede_code
  <IonLogoTwitch /> @izede
  <IonLogoGithub /> @Sdju
</div>

<QrCodeIntro class="sp-r80_200_200_200 absolute" />

<!--
продумать как будет происходить взаимодействие с картой на всем протяжении с картой
-->

---
layout: center
---

<h1 center> Шестеренки реактивности Vue </h1>

<div class="$obj sp-980_4_496_450">
  <IonCogSharp class="size-full animate-[spin_70s_linear_infinite] opacity-20" />
</div>
<div class="$obj sp-77_498_496_450">
  <IonCogSharp class="size-full animate-[spin_60s_linear_infinite] opacity-10" />
</div>

<!--
> продать цель доклада / продумать спич 2 и 3 слайда
> гораздо больше иллюстраций
> продумать переходы, продажа шестеренок
-->

---
slideClass: cs-green
---

<Timeline2 :steps="[{
  logo: 'pos-center size-176_176',
  vueGear: 'pos-center -popup-hidden',
  ref: 'pos-center -popup-hidden',
  computed: 'pos-center -popup-hidden',
  watch: 'pos-center -popup-hidden',
  watchEffect: 'pos-center -popup-hidden',
  reactive: 'pos-center -popup-hidden',
}, {
  logo: 'pos-490_281 size-46_46',
  vueGear: 'pos-center ',
}, {
  ref: 'pos-727_84 ',
}, {
  computed: 'pos-781_356 ',
}, {
  watch: 'pos-472_474 ',
}, {
  watchEffect: 'pos-165_356 ',
}, {
  reactive: 'pos-216_69 ',
}]" v-slot="t">

<div class="$obj size-223_202 fx" :class="t.vueGear">
  <MaterialSymbolsSettingsOutline class="animate-[spin_20s_linear_infinite] size-full" />
</div>

<LogosVue class="$obj" :class="t.logo" />

<Gear class="$obj fx size-103_131" :class="t.ref" name="ref" />
<Gear class="$obj fx size-141_118" :class="t.computed" name="computed" />
<Gear class="$obj fx size-134_105" :class="t.watch" name="watch" />
<Gear class="$obj fx size-142_119" :class="t.watchEffect" name="watchEffect" />
<Gear class="$obj fx size-104_95" :class="t.reactive" name="reactive" />

</Timeline2>

<!--
Если спросить за что вы любите Vue, то чаще всего будет хороший DX и классная реактивность. Но что же скрыто за этой реактивностью?

Поэтому сегодня мы с вами рассмотрим по отдельности каждую шестерёнку реактивности Vue по отдельности.

Чтоб получить более глубокое понимание того что происходит в нашем любимом фреймворке.

> объяснить почему тебя надо слушать. привыкли к простоте. попытаться вдолхновить уже тут
-->

---
layout: cover
---

<img class="framed center w-600px" src="/img/interview.png" />

---
layout: center
---

<Timeline2 :steps="[{
  q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 ',
  q1Mode: false,
  q2: '$obj fx text-1.3em pos-50% w-full text-center px-10 -popup-hidden',
  q2Mode: false,
  q3: '$obj fx text-1.3em pos-50% w-full text-center px-10 -popup-hidden',
  q3Mode: false,
}, {
  q1Mode: true,
}, {
  q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 -popup-hidden',
  q1Mode: false,
  q2: '$obj fx text-1.3em pos-50% w-full text-center px-10 ',
  q2Mode: true,
}, {
  q2: '$obj fx text-1.3em pos-50% w-full text-center px-10 ',
  q2Mode: false,
  q3: '$obj fx text-1.3em pos-50% w-full text-center px-10 ',
  q3Mode: true,
}]" v-slot="t">

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="Чем отличается computed от watch?"
/>
<AnimatedText
  :class="t.q2"
  :mode="t.q2Mode"
  words="Можно ли реализовать свой computed используя watch?"
/>
<AnimatedText
  :class="t.q3"
  :mode="t.q3Mode"
  words="Для неизменемых значений лучше использовать computed или readonly?"
/>

</Timeline2>

<!--
Представим ситуацию на собеседовании. Вам задают вопросы по Vue и в целом вы отвечаете хорошо.

Но вот начинаются вопросы по реактивности.

- можно ли заменить computed на watch
- а можно ли заменить watch на computed
- а как насчёт watchEffect?

- > показать как пример с которым справятся, но потом тебя спрашивают "жесть"
придумать второй вопрос "сложный но интересный", чтоб мотиватор
-->

---

<img class="center framed w-740px" src="/img/computed-watch.png" />

<!--
И если такие вопросы вас ставят в замешательство, то этот доклад для вас. (если с дискомфортом у вас возникло олюбопытсво то этот доклад для вас)
-->

---
slideClass: cs-lightblue
---

<Timeline2 :steps="[{
  deep: 'opacity-0',
  height: '59px',
  ref: '-popup-hidden',
  computed: '-popup-hidden',
  reactive: '-popup-hidden',
  props: '-popup-hidden',
  watch: '-popup-hidden',
  watchEffect: '-popup-hidden',
  vModel: '-popup-hidden',
  effectScope: '-popup-hidden',
  customRef: '-popup-hidden',
  effect: '-popup-hidden',
  scheduler: '-popup-hidden',
  tracking: '-popup-hidden',
  effect: '-popup-hidden',
}, {
  ref: '',
  computed: '',
  reactive: '',
  props: '',
}, {
  deep: 'opacity-20',
  height: '117px',
  ref: 'opacity-50 scale-50',
  computed: 'opacity-50 scale-50 blur-2',
  reactive: 'opacity-50 scale-50 blur-2',
  props: 'opacity-50 scale-50 blur-2',
  watch: '',
  watchEffect: '',
  vModel: '',
}, {
  deep: 'opacity-30',
  height: '184px',
  ref: 'opacity-25 scale-25 blur-4',
  computed: 'opacity-25 scale-25 blur-4',
  reactive: 'opacity-25 scale-25 blur-4',
  props: 'opacity-25 scale-25 blur-4',
  watch: 'opacity-50 scale-50 blur-2',
  watchEffect: 'opacity-50 scale-50 blur-2',
  vModel: 'opacity-50 scale-50 blur-2',
  effectScope: '',
  customRef: '',
  render: '',
}, {
  deep: 'opacity-40',
  height: '245px',
  ref: 'opacity-12 scale-12 blur-6',
  computed: 'opacity-12 scale-12 blur-6',
  reactive: 'opacity-12 scale-12 blur-6',
  props: 'opacity-12 scale-12 blur-6',
  watch: 'opacity-25 scale-25 blur-4',
  watchEffect: 'opacity-25 scale-25 blur-4',
  vModel: 'opacity-25 scale-25 blur-4',
  effectScope: 'opacity-50 scale-50 blur-2',
  customRef: 'opacity-50 scale-50 blur-2',
  render: 'opacity-50 scale-50 blur-2',
  effect: '',
  tracking: '',
}, {
  deep: 'opacity-50',
  height: '306px',
  ref: 'opacity-0 scale-0',
  computed: 'opacity-0 scale-0',
  reactive: 'opacity-0 scale-0',
  props: 'opacity-0 scale-0',
  watch: 'opacity-12 scale-12 blur-6',
  watchEffect: 'opacity-12 scale-12 blur-6',
  vModel: 'opacity-12 scale-12 blur-6',
  effectScope: 'opacity-25 scale-25 blur-4',
  customRef: 'opacity-25 scale-25 blur-4',
  render: 'opacity-25 scale-25 blur-4',
  effect: 'opacity-50 scale-50 blur-2',
  tracking: 'opacity-50 scale-50 blur-2',
}, {
  deep: 'opacity-75',
  height: '360px',
  watch: 'opacity-0 scale-0',
  watchEffect: 'opacity-0 scale-0',
  vModel: 'opacity-0 scale-0',
  effectScope: 'opacity-12 scale-12 blur-6',
  customRef: 'opacity-12 scale-12 blur-6',
  render: 'opacity-12 scale-12 blur-6',
  effect: 'opacity-25 scale-25 blur-4',
  tracking: 'opacity-25 scale-25 blur-4',
}, {
  deep: 'opacity-100',
  height: '419px',
  effectScope: 'opacity-0 scale-0',
  customRef: 'opacity-0 scale-0',
  render: 'opacity-0 scale-0',
  effect: 'opacity-12 scale-12 blur-6',
  tracking: 'opacity-12 scale-12 blur-6',
}, {
  height: '479px',
  effect: 'opacity-0 scale-0',
  tracking: 'opacity-0 scale-0',
}]" v-slot="t">

<div class="absolute size-full pos-0 bg-[#13151d] duration-2000 ease-in-out" :class="t.deep" />

<div class="center w-340px overflow-hidden transition-all duration-400 framed" :style="{ maxHeight: t.height }" >
  <img src="/img/iceberg.png" class="w-full" />
</div>

<div
  class="center overflow-hidden transition-all duration-400"
  :style="{ maxHeight: t.height }"
>
  <div class="text-shadow-xl size-338_475 flex flex-col items-stretch pr-60px text-center relative overflow-hidden rounded-10px">
    <div class="mt-10px mb-20px">азы реактивности</div>
    <div class="mb-32px">основной функционал</div>
    <div class="text-size-0.75em mb-32px">продвинутая реактивность</div>
    <div class="mb-25px">@vue/reactivity</div>
    <div class="mb-23px">@vue/runtime-core</div>
    <div class="mb-23px">Закрытый API</div>
    <div class="text-size-0.75em mb-19px">Контрибьютить во Vue</div>
    <div class="text-size-0.75em">написать свою реактивность для Vapor Vue</div>
    <img class="absolute -bottom-7px right-0 size-66_63 object-cover" src="/img/jonson.jfif" />
  </div>
</div>


<Gear class="$obj sp-742_449_103_151" :class="t.ref" name="ref" />
<Gear class="$obj sp-118_115_103_135" :class="t.computed" name="computed" />

<!-- width height top left -> left top width height  -->
<Gear class="$obj sp-135_439_103_135" :class="t.reactive" name="reactive" />
<Gear class="$obj sp-812_124_103_141" :class="t.props" name="props" />

<Gear class="$obj sp-96_273_103_151" :class="t.watch" name="watch" />
<Gear class="$obj sp-869_321_103_151" :class="t.watchEffect" name="watchEffect" />
<Gear class="$obj sp-692_89_103_141" :class="t.vModel" name="vModel" />

<Gear class="$obj sp-788_101_103_151" :class="t.effectScope" name="effectScope" />
<Gear class="$obj sp-342_75_125_107" :class="t.customRef" name="customRef" />

<Gear class="$obj sp-802_259_125_107" :class="t.effect" name="effect" />
<Gear class="$obj sp-208_408_125_107" :class="t.tracking" name="tracking" />

</Timeline2>

<!--
Но что вообще скрывается во тьме воды?

Вначале вы берете Vue и вы изучаете самые базовые примитивы реактивности.

Постепенно задачи становятся сложнее и вам приходится столкнуться с новыми примитивами.

Идет время и вам попадаются нетривиальные задачи которые уже с трудом покрываются документацией. Там вы знакомитесь с концептами кастомных рефов и эффект скоупов.

Теперь пришло время изучать исходники Vue и вы берете основной пакет реактивности Vue @vue/reactivity.
Знакомитесь с концепциями реактивных эффектов и Deps/Link.

Однако нужно еще понять как все это дело работает внутри компонентов Vue. И вы начинаете изучать реактивность из @vue/runtime-core. Там вы знакомитесь с концептами render, setup, планировщика.

Вас уже не остановить, вы погружаетесь в изучение всего чтобы можно использовать в вашем коде, чтобы выжать максимум из возможностей реактивности.

Теперь ваших знаний вполне хватает, чтобы начать контрибьютить в сам Vue. Возможно у вас уже есть идеи как сделать реактивность еще лучше.

Но не забывайте что где-то там, всегда есть тот кто нарушит все правила игры и сделает кратно лучше.

И нет, мы с вами не будем сейчас аккуратно погружаться в глубину. Вместо этого мы будем наоборот всплывать на поверхность из глубин.

> сторитейлинг / персонаж
-->

---
slideClass: cs-purple
---

<Timeline2 :steps="[{
  title: 'top-50% ',
}, {
  title: 'top-40px ',
}, {
  title: 'top-90px ',
}]" v-slot="t">

<h1 class="absolute transition-all duration-400 text-center w-full left-0" :class="t.title"> Реактивность </h1>

<img class="framed" v-click="['+1', '+1']" v-drag="[165,96,673,403]" src="/img/magic.gif" />

<div v-click="'+0'" class="italic bg-[#00000048] p-4 rd-8px mb-4"> Способность системы автоматически реагировать на раздражители </div>

<div v-click="3">

```ts {*|*|1-3|4|5|6}
let oranges = ref(5)
let apples = ref(10)
let total = computed(() => oranges.value + apples.value)
console.log(total.value) // 15
apples.value = 7 
console.log(total.value) // 12
```

</div>

</Timeline2>

<!--
Но для начала. Что же такое реактивность?

Наверное самый простой и вполне обоснованный ответ: магия

Однако нам, инженерам, довольствоваться магией будет не интересно. К сожалению точного определения реактивного подхода я не нашел и вряд ли оно существует. Каждый находит в нем что-то свое. Так и у меня есть краткое определение:

Способность системы автоматически реагировать на раздражители

Давайте рассмотрим пример:

Здесь у нас есть две переменные: oranges и apples. И есть вычисляемая переменная total, которая зависит от значений oranges и apples. Это и есть правила работы системы, которые нельзя нарушать.

В качестве раздражителя здесь выступает изменение значения apples. Однако система автоматически пересчитает значение total без нашего вмешательства.
-->

---
slideClass: cs-lightblue
---

<Timeline2 :steps="[{
  title: 'pos-center ',
  model: {
    class: 'pos-center -popup-hidden',
  },
  subscriber: {
    class: 'pos-50%_156 -popup-hidden',
  },
  action: {
    class: 'pos-50%_366 -popup-hidden',
    color: 'red',
    form: 'circle',
  },
  effect: {
    class: 'pos-660_50% -popup-hidden',
  },
  scheduler: {
    class: 'pos-660_366 -popup-hidden',
  },
  arrowModelToSubscriber: {
    coords: '51%:245 51%:188',
    class: 'fx duration-500 opacity-0',
    power: 0.1,
  },
  arrowSubscriberToEffect: {
    coords: '569:156 660:245',
    class: 'fx duration-500 opacity-0',
    power: 0.5,
  },
  arrowActionToModel: {
    coords: '51%:372 51%:306',
    class: 'fx duration-500 opacity-0',
    power: 0.1,
  },
  arrowEffectToX: {
    coords: '660:306 544:400',
    class: 'fx duration-500 opacity-0',
    power: 0.5,
  },
  arrowSchedulerToAction: {
    coords: '588:400 543:400',
    class: 'fx duration-500 opacity-0',
    power: 0.1,
  },
}, {
  title: 'pos-50%_10% ',
  model: {
    class: 'pos-center ',
  },
}, {
  subscriber: {
    class: 'pos-50%_156 ',
  },
  arrowModelToSubscriber: {
    class: 'fx duration-500 animate'
  },
}, {
  effect: {
    class: 'pos-660_50% ',
  },
  arrowSubscriberToEffect: {
    class: 'fx duration-500 animate'
  },
}, {
  action: {
    class: 'pos-50%_400 ',
  },
  arrowActionToModel: {
    class: 'fx duration-500 animate'
  },
}, {
  arrowEffectToX: {
    class: 'fx duration-500 animate'
  },
}, {
  subscriber: {
    multiple: true,
  },
}, {
  effect: {
    multiple: true,
  },
}, {
  action: {
    multiple: true,
  },
}, {
  arrowEffectToX: {
    coords: '660:306 660:372',
    power: 0.1,
  },
  arrowSchedulerToEffect: {
    coords: '660:306 544:400',
    class: 'fx duration-500 opacity-0'
  },
  scheduler: {
    class: 'pos-660_400 ',
  },
  action: {
    multiple: false,
  },
}, {
  arrowSchedulerToAction: {
    coords: '588:400 543:400',
    class: 'fx duration-500 animate'
  },
  arrowSchedulerToAction: {
    coords: '588:400 543:400',
    class: 'fx duration-500 animate'
  },
}]" v-slot="t">

<h1 class="$obj fx text-center" :class="t.title"> Реактивность </h1>

<Node v-bind="t.model">Model</Node>
<Node v-bind="t.subscriber">Subscribers</Node>
<Node v-bind="t.effect">Effect</Node>
<Node v-bind="t.action">Action</Node>
<Node v-bind="t.scheduler">Scheduler</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrowModelToSubscriber" />
  <SvgArrow v-bind="t.arrowSubscriberToEffect" />
  <SvgArrow v-bind="t.arrowActionToModel" />
  <SvgArrow v-bind="t.arrowEffectToX" />
  <SvgArrow v-bind="t.arrowSchedulerToAction" />
</SvgLayer>

</Timeline2>

<!--
Таким образом я бы хотел выделить следующую схему реактивности, которая будет нам полезна для понимания того как работает реактивность во Vue:

У нас есть модель данных, которая хранит в себе все наши данные.

У модели есть подписчики, которые получают уведомления о любых изменениях.

В ответ на изменения модели подписчики могут запускать различные эффекты.

Далее мы привносим раздражитель в нашу систему.

И система автоматически пересчитывает значения зависимостей и запускает соответствующие эффекты. Которые могут повлечь новые изменения модели.

Если все это происходит синхронно, то множественные эффекты могут начать мешать друг другу или вообще сломать систему. Поэтому системе нужно как-то регулировать порядок и моменты запуска эффектов.

Для этого и нужен планировщик. Он берет на себя бремя управления порядком и моментами запуска эффектов. Что позволяет убирать ненужные эффекты и запускать нужные в точные моменты.

> показать хаос эффектов (продать шедуллер полностью) - к нему вернемся позже
-->

---
clicks: 6
---

<Timeline2 :steps="[{
  vueReactivity: '-popup-hidden',
  vueRuntimeCore: '-popup-hidden',
  runtimeList: '-blur-hidden',
  vue: '',
  computedOpacity: 1,
  watchersOpacity: 1,
}, {
  vueReactivity: '',
}, {
  vueRuntimeCore: '',
}, {
  computedOpacity: 0.4,
  watchersOpacity: 0.4,
}, {
}, {
}, {
  runtimeList: '',
}]" v-slot="t">

<logos-vue :class="t.vue" class="$obj sp-482_118_119_108" />

<div class="$obj sp-251_300_379_210 text-[1em] bg-blue-5/30 rounded-2xl px-4 py-2" :class="t.vueReactivity" > 
  <div class="text-center"> @vue/reactivity </div>

  <div class="text-size-0.75em flex flex-col mt-4 w-full">
    <Gear inline name="ref" />
    <Gear inline name="reactive" />
    <Gear inline w-min :style="{ opacity: t.computedOpacity }" name="computed" />
    <Gear inline w-min :style="{ opacity: t.watchersOpacity }" name="watchers" />
    <Gear v-click="4" inline w-min v-mark.red.cross="{at: 5}" name="scheduler" />
  </div>
</div>

<div class="$obj sp-719_300_398_210 text-[1em] bg-cyan-5/30 rounded-2xl px-4 py-2" :class="t.vueRuntimeCore" > 
  <div class="text-center"> @vue/runtime-core </div>

  <div class="text-size-0.75em flex flex-col mt-4 w-full fx duration-[0.2s]" :class="t.runtimeList">
    <Gear inline name="scheduler" />
    <Gear inline name="watchers" />
    <Gear inline name="nextTick" />
    <Gear inline name="components" />
  </div>
</div>

</Timeline2>

<!--
Вернемся непосредственно ко Vue. Сама реактивность Vue разделена на два пакета: @vue/reactivity и @vue/runtime-core. Во vue reactivity можно ожидать различные реактивные примитивы... Но на деле там лежит далеко не все что вы ожидаете там увидеть.

Там нет в привычном понимании computed, watchers а вот планировщика нет вовсе. Почему так произошло? @vue/reactivity это самостоятельная и независимая библиотека реактивности. Вы можете ее взять и использовать далеко за пределами проектов на Vue. А в самом Vue необходимо взаимодействовать с DOM и многие аспекты опираются именно на это. Поэтому планировщик и элементы завязанные на планировщик реализованы в @vue/runtime-core.

Мы начнем изучение с @vue/reactivity, а затем перейдем к @vue/runtime-core.
-->

---

<VueMap />

<!--
Но ведь можно попробовать представить карту реактивности Vue. И она выглядит примерно следующим образом:

не пугайтесь, сейчас она большая и запутанная, но разобрав каждый элемент карты по отдельности мы сможем в ней ориентироваться.

> найти в какой момент ее можно показывать/ продумать что на ней можно говорить (это артефакт доклада/где ее достать/успокоить)

> проработать переходы между слайдами (начало-конец и перебор либо плавность переходов)

как ее продать
-->
