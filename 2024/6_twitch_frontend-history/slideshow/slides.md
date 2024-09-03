---
theme: ./theme
routerMode: hash
htmlAttrs:
  lang: ru
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
growSeed: 4
title: The Progressive Path

layout: intro
author: Денис Чернов
name: 'История Frontend-разработки'
twitch: '@izede'
discord: '@izede'
telegram: '@zede1697'
variant: first
contextMenu: false
---

---
layout: center
---

# `1. И появился WWW`

## 1990-1995

---

<div v-drag="[38,52,539,432]">

![img.png](/img/tim.png)

</div>

<div v-drag="[611,68,337,398]">

<h1 class="text-center"> Тим Бернерс Ли </h1>

<div mt-10>
<v-clicks>

- Nexus (WorldWideWeb)
- URI / URL
- HTTP
- httpd

</v-clicks>
</div>

</div>

---

<div v-drag="[399,34,539,432]">

![img.png](/img/www.png)

</div>

<div v-drag="[36,85,337,398]">

<h1 class="text-center"> <b>Nexus</b><br/> <span class="text-[0.75em]"> WorldWideWeb </span> </h1>

<div mt-10>
<v-clicks>

- Графическая оболочка
- Работал только на NeXT
- Переработал концепцию языка `SGML`
- Появление тега `<a>`

</v-clicks>
</div>

</div>

---

<div v-drag="[41,130,539,432]">

![img.png](/img/lmb.png)

</div>

<div v-drag="[610,138,337,398]">

<h1 class="text-center"> <b>Line Mode Browser</b></h1>

<div mt-10>
<v-clicks>

- Libwww (до 2017)
- FTP
- Платформонезависимый
- 1991

</v-clicks>
</div>

</div>

---

<div v-drag="[392,38,539,432]">

![img.png](/img/lynx.png)

</div>

<div v-drag="[32,91,337,398]">

<h1 class="text-center"> <b>Lynx</b></h1>

<div mt-10>
<v-clicks>

- 1992
- Жив до сих пор
- Лучший из текстовых
- Все еще нет JS

</v-clicks>
</div>

</div>

---

# Прочие браузеры

<v-clicks>

- Midas - PostScript - PDF
- Arena - Таблицы в вебе
- InternetWorks - Вкладки
- Viola - ViolaLang - 

</v-clicks>

---

<div v-drag="[392,38,539,432]">

# Viola Lang

</div>

<div v-drag="[65,136,394,432]">

```js
\class {txtDisp}
\name {showTime}
\script { switch (arg[0]) {
  case "tick":
    set("content"), date());
    after(1000, self(), "tick");
    return; break;
  case "init":
    after(1000, self(), "tick");
    break;
  }
  usual();
}
\width {100}
\height {50} 
```

</div>
<div v-drag="[515,136,394,432]" v-click>

```js
function showTimeInDoc() {
  var theTime = document.getElementById('theTime');
  var date = new Date();
  theTime.innerHTML = 
    date.getHours() + ":" +
    date.getMinutes() + ":" +
    date.getSeconds();
  setTimeout(showTimeInDoc, 1000);
}
```

</div>

---

<div v-drag="[269,40,539,432]">

# viola-style stylesheet

</div>

<div v-drag="[256,154,394,432]">

```css
 (BODY,INPUT,P   FGColor=black
                 BGColor=grey70
                 BDColor=grey70
                 align=left

(H1   FGColor=white
      BGColor=red
      BDColor=black
      align=center
```

</div>

---

<div v-drag="[449,15,446,306]">

![img.png](/img/mosaic.png)

</div>

<div v-drag="[32,91,337,398]">

<h1 class="text-center"> <b>Mosaic</b></h1>

<div mt-10>
<v-clicks>

- 1993 - 1997
- Завоевал основную популярность
- Графический
- Простой в использовании
- Простой в установке

</v-clicks>
</div>

</div>

---
layout: center
variant: second
---

# `2. Первая браузерная война`

## 1995—1999

---
variant: second
---

<div v-drag="[462,104,446,306]">

![img.png](/img/netscape.png)

</div>

<div v-drag="[32,91,337,398]">

<h1 class="text-center"> <b>Netscape</b></h1>

<div mt-10>
<v-clicks>

- 1994 - 2003/2008
- Произошел от Mosaic
- В последствии станет Firefox

</v-clicks>
</div>

</div>

---

# Использованный материал

- [История фронтенда. Браузер, который умел всё. 18+](https://youtu.be/7nrDctGYOIk?si=_rEVBIqRlaiE2UmM)
