---
layout: center
---

# А что сейчас?

---
layout: center
---

# ECMAScript Signals

<img src="/img/signals.svg" class="size-50% mt-10" />

---

# WACG Proposal
## Observable

````md magic-move
```js
element
	.when('click')
	.filter((e) => e.target.matches('.foo'))
	.map((e) => ({ x: e.clientX, y: e.clientY }))
	.subscribe({ next: handleClickAtPoint });
```
```js
element.addEventListener('click', (e) => {
	if (e.target.matches('.foo')) {
		handleClickAtPoint({ x: e.clientX, y: e.clientY });
	}
});
```
````

---

# Текущие вызовы в мире реактивности

<v-clicks depth="2">

- Асинхронность
  - **Suspense**
  - **Async Context**
- Оптимизация
  - **Реализации графов зависимостей**
  - **React Compiler**
- Совместимость
- Стандартизация
- Стабильность
- Транзакции

</v-clicks>

---

# Что будет дальше?

<div class="box box-rich text-white p-4 gap-8 mt-8 cs-green" v-click>
  <span class="text-green-200">Sync Engine</span> - технология бесшовной синхронизации данных между удаленными хранилищами
</div>

<div class="box box-rich text-white p-4 gap-8 mt-8 cs-blue" v-click>
  <span class="text-blue-200">Streaming SSR</span> - потоковая передача данных с учетом приоритизации
</div>

<div class="box box-rich text-white p-4 gap-8 mt-8 cs-orange" v-click>
  <span class="text-orange-200">Влияние AI на реактивность</span>. Будут выигрывать те, где AI будет способно эффективно работать с реактивностью
</div>

---

<div class="flex justify-center items-center" v-click>
  <h2 class="rainbow-text">
    Личный топ реактивности
  </h2>
</div>

<div class="box box-rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-red" v-click>
  <span class="text-red-300">Мой фаворит:</span>
  <DeviconVuejs />
</div>
<div class="box box-rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-blue" v-click>
  <span class="text-blue-300">Для изучения:</span>
  <DeviconSolidjs />
  <img src="/img/reatom.svg" class="h-[1em]" />
  <img src="/img/mol.png" class="h-[1em]" />
</div>
<div class="box box-rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-green" v-click>
  <span class="text-green-300">Рабочие лошадки:</span>
  <img src="/img/effector.png" class="h-[1em]" />
  <DeviconSvelte/>
  <DeviconRxjs/>
  <DeviconAngular/>
</div>

<style>
.rainbow-text{
  font-size: 60px;
	position: relative;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  padding: 2px 4px 6px;
  margin: -2px -4px -6px;
	background: linear-gradient(90deg in hsl, rgb(255, 75, 75), rgb(81, 255, 75), rgb(123, 130, 255), rgb(255, 75, 75));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: move 10s linear infinite, pulse-alt 2s ease-in-out infinite;
}
@keyframes move{
  0%{background-position: 0 0;}
  100%{background-position: 1000px 0;}
}
</style>

---
layout: center
---

<span class="text-center w-full text-7xl rainbow-text">
  Не бойтесь экспериментировать!
</span>

<DeviconRxjs class="$obj pos-712_51 size-150 swinging" />
<DeviconReact class="$obj pos-492_444 size-150 drift" />
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
// import current from '../img/current.svg?raw'
</script>

<!-- <div v-html="current" class="$obj c-white pos-866_124 size-200" /> -->
<div class="text-2xl text-left $obj pos-113_500">
  <FileIconsTelegram /> @vueist <br/>
  <FileIconsTelegram /> @zede_code
</div>

# Спасибо за внимание!

## Вопросы? 