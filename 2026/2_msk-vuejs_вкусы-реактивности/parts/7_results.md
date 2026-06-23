---
slideClass: cs-pink
topTitle: · на выбор ·
topTitleClass: mk-top-flavor
layout: center
---

<div class="flex justify-center items-center">
  <h2 class="rainbow-text">
    Мои личный топ
  </h2>
</div>

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-red" v-click>
  <span class="text-red-300">Мой фаворит:</span>
  <DeviconVuejs />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-blue" v-click>
  <span class="text-blue-300">Для изучения:</span>
  <DeviconSolidjs />
  <img src="/img/reatom.svg" class="h-[1em]" />
  <img src="/img/mol.png" class="h-[1em]" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-green" v-click>
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
slideClass: cs-pink
topTitle: · на выбор ·
topTitleClass: mk-top-flavor
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
slideClass: cs-pink
topTitle: · на выбор ·
topTitleClass: mk-top-flavor
layout: center
class: text-center
---

<div class="text-2xl text-left $obj pos-113_500">
  <FileIconsTelegram /> @vueist <br/>
  <FileIconsTelegram /> @zede_code
</div>

# Спасибо за внимание!

## Вопросы?
