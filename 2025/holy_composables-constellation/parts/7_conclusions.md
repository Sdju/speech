---
shading: true
timeline:
  - point1: 'active'
    point2: 'hidden'
    point3: 'hidden'
    point4: 'hidden'
    example: 'pos-0 fx duration-500 cs-red'
  - point1: ''
    point2: 'active'
    example: 'cs-blue'
  - point2: ''
    point3: 'active'
    example: 'cs-green'
  - point3: ''
    point4: 'active'
    example: 'cs-purple'
---

<h1 class="text-center title-bg">Что мы не успели обсудить:</h1>

<Points>
  <Point icon="i-mdi-test-tube" :attrs="t.point1" class="cs-red">
    Тестирование композаблов
  </Point>
  <Point icon="i-mingcute-baby-fill" :attrs="t.point2" class="cs-blue">
    DI в композаблах
  </Point>
  <Point icon="i-mdi-server-network-outline" :attrs="t.point3" class="cs-green">
    SSR
  </Point>
  <Point icon="i-codicon-symbol-class" :attrs="t.point4" class="cs-purple">
    Классы вместо композаблов
  </Point>
  <Point full :class="t.example">
    <Example>

````md magic-move {lines: false}
```ts
it("isn't lazy", async () => {
  const func = vi.fn(
    () => Promise.resolve('data')
  )
  const data = computedAsync(func)
  expect(func).toBeCalledTimes(1)

  expect(data.value).toBeUndefined()
  await nextTick()
  expect(data.value).toBe('data')
})
```

```ts
useUserProvider(
  mockUserService()
)

const { user } = useUser()
console.log(user)
// {MOCK_DATA}
```
```ts
const user = await useAsyncData(
  'user',
  () => loadUser(userUrl)
)
```
```ts
const user = useUserStore()
// vs
const user = new UserService()
```
````

</Example>
</Point>
</Points>

---
timeline:
  - point1: 'active'
    point2: 'hidden'
    point3: 'hidden'
    point4: 'hidden'
    example: 'pos-0 fx duration-500 cs-red'
    exampleId: 1
  - point1: ''
    point2: 'active'
    exampleId: 2
    example: 'cs-blue'
  - point2: ''
    point3: 'active'
    exampleId: 3
    example: 'cs-green'
---

<script setup lang="ts">
import VueuseImg from '../img/vueuse.png'
import VueFinalModalImg from '../img/modal.png'
import VeeValidateImg from '../img/vee.png'
</script>

<h1 class="text-center title-bg">Что посмотреть:</h1>

<Points>
  <Point icon="i-logos-vueuse" :attrs="t.point1" class="cs-red">
    <strong>VueUse</strong>
  </Point>
  <Point :attrs="t.point2" class="cs-blue">
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-1rem h-1.3rem" viewBox="0 0 149 65">
  <path fill="#fff" stroke="#214B62" d="M47.0463 1.3904h20.9496c.3792 0 .6204.4056.4393.7388L35.278 63.1444c-.1893.3483-.6893.3483-.8786 0L23.9246 43.8689a.5.5 0 0 1 0-.4775L35.278 22.499 46.607 1.6517a.5.5 0 0 1 .4393-.2613Z"/>
  <path fill="#03BF7A" stroke="#214B62" d="M22.6311 1.3904H1.6815c-.3791 0-.6203.4056-.4393.7388l33.1572 61.0152c.1893.3483.6893.3483.8786 0l10.4748-19.2755a.5.5 0 0 0 0-.4775L34.3994 22.499 23.0704 1.6517a.4998.4998 0 0 0-.4393-.2613Z"/>
  <path fill="#fff" stroke="#214B62" d="M80.9173 63.6096h20.9497c.379 0 .62-.4056.439-.7388L69.149 1.8556c-.1893-.3483-.6893-.3483-.8786 0L57.7956 21.1311a.5.5 0 0 0 0 .4775L69.149 42.501l11.329 20.8473a.5.5 0 0 0 .4393.2613Z"/>
  <path fill="#214B62" stroke="#214B62" d="M56.5021 63.6096H35.5525c-.3792 0-.6204-.4056-.4393-.7388L68.2703 1.8556c.1893-.3483.6894-.3483.8787 0l10.4748 19.2755a.5.5 0 0 1 0 .4775L68.2703 42.501 56.9414 63.3483a.5.5 0 0 1-.4393.2613Z"/>
  <path fill="#fff" stroke="#214B62" d="M126.369 63.6096h20.949c.38 0 .621-.4056.44-.7388L114.601 1.8556c-.19-.3483-.69-.3483-.879 0l-10.475 19.2755a.4995.4995 0 0 0 0 .4775l11.354 20.8924 11.329 20.8473c.087.161.256.2613.439.2613Z"/>
  <path fill="#214B62" stroke="#214B62" d="M101.954 63.6096H81.0041c-.3792 0-.6204-.4056-.4393-.7388L113.722 1.8556c.189-.3483.689-.3483.879 0l10.474 19.2755a.4995.4995 0 0 1 0 .4775L113.722 42.501l-11.329 20.8473a.5004.5004 0 0 1-.439.2613Z"/>
</svg>
    </template>
    <strong>vue-final-modal</strong>
  </Point>
  <Point icon="i-devicon-veevalidate" :attrs="t.point3" class="cs-green">
    <strong>vee-validate</strong>
  </Point>
  <Point full :class="t.example">
    <ImgExample v-if="t.exampleId === 1" :src="VueuseImg" contain />
    <ImgExample v-if="t.exampleId === 2" :src="VueFinalModalImg" contain />
    <ImgExample v-if="t.exampleId === 3" :src="VeeValidateImg" contain />
  </Point>
</Points>

---
layout: center
---

<h1 class="title-bg"><strong>Композаблы</strong> — мощный инструмент</h1>

---
layout: center
---

<h1 class="title-bg">Следуйте лучшим практикам</h1>

---
layout: center
---

<h1 class="title-bg">Смотрите на решения других разработчиков</h1>

---
layout: center
---

<span class="text-center w-full text-7xl rainbow-text">
  Не бойтесь экспериментировать!
</span>

<LogosVueuse class="$obj pos-712_51 size-150 swinging" />
<VscodeIconsFileTypeNuxt class="$obj pos-492_444 size-150 drift" />
<LogosPinia class="$obj pos-85_70 size-150 pinia" />

<style>
.rainbow-text{
	position: relative;
  
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  padding: 2px 4px 6px;
  margin: -2px -4px -6px;
	background: linear-gradient(90deg in hsl, rgb(255, 75, 75), rgb(81, 255, 75), rgb(123, 130, 255), rgb(255, 75, 75));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: move 1s linear infinite, pulse-alt 2s ease-in-out infinite;
}

.swinging {
  animation: swinging 2s linear infinite;
}

.pinia {
  animation: hue-rotate 1.7s linear infinite, shake 0.5s linear infinite;
}

.drift {
  animation: drift 1.7s linear infinite;
}

@keyframes move{
  0%{background-position: 0 0;}
  100%{background-position: 1000px 0;}
}

@keyframes shake {
  0%{transform: rotate(7deg) scale(1.05);}
  50%{transform: rotate(20deg) scale(1.1);}
  100%{transform: rotate(7deg) scale(1.05);}
}

@keyframes hue-rotate {
  0%{filter: hue-rotate(0deg); }
  100%{filter: hue-rotate(360deg);}
  200%{filter: hue-rotate(720deg);}
}

@keyframes swinging {
  0%{transform: rotate(0deg) scale(1);}
  50%{transform: rotate(180deg) scale(70%);}
  100%{transform: rotate(360deg) scale(1);}
}

@keyframes drift {
  0%{transform: skew(0deg) translate(-500px, -50%);}
  100%{transform: skew(40deg) translate(500px, -50%);}
}
</style>

---
layout: center
class: text-center
---

<script setup>
import current from '../img/current.svg?raw'
</script>

<div v-html="current" class="$obj c-white pos-866_124 size-200" />
<div class="text-2xl text-left $obj pos-869_243">
  презентация
</div>
<div class="text-2xl text-left $obj pos-113_500">
  <FileIconsTelegram /> @vueist <br/>
  <FileIconsTelegram /> @zede_code
</div>

# Спасибо за внимание!

## Вопросы? 