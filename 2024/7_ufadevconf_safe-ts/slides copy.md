---
theme: ./theme
routerMode: hash
htmlAttrs:
  lang: ru
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
contextMenu: false
mdc: true
growSeed: 4
title: OpenAPI Codegen

layout: intro
author: Денис Чернов
name: 'unplugin-openapi-codegen'
variant: main
---

---
clicks: 7
---

<Timeline
  :steps="[{
    teamAClasses: 'left-[50%] top-[50%] w-[200px] fx-popup-hidden',
    teamBClasses: 'left-[50%] top-[50%] w-[200px] fx-popup-hidden',
    svgLayer: 'fx-blur-hidden',
    text: 'Созвоны, документация, личные сообщения',
    textClasses: 'fx-blur-hidden',
  }, {
    teamAClasses: 'left-[50%] top-[50%] w-[200px]',
    teamBClasses: 'left-[50%] top-[50%] w-[200px] fx-popup-hidden'
  }, {
    teamAClasses: 'left-[20%] top-[50%] w-[200px]',
    teamBClasses: 'left-[80%] top-[50%] w-[200px]',
    svgLayer: '',
  }, {
    textClasses: '',
  }, {
    text: 'Контракты'
  }]"
  v-slot="params"
>
  {{ console.log(params) }}

<div
  class="bg-green-500/20 figure circle aspect-square vclick-custom vclick-popup"
  :class="params.teamAClasses"
>команда A</div>

<div
  class="bg-blue-500/20 figure circle aspect-square vclick-custom vclick-popup"
  :class="params.teamBClasses"
>команда B</div>

<SvgLayer :class="params.svgLayer">
  <SvgArrow :start="{ x: 180, y: 258 }" :end="{ x: 605, y: 258 }" :power="-0.2" />
  <SvgArrow :start="{ x: 615, y: 288 }" :end="{ x: 190, y: 288 }" :power="-0.2" />
</SvgLayer>

<div :class="params.textClasses" class="text-[14px] figure text-shadow-xl left-[490px] top-[273px]"> {{ params.text }} </div>

</Timeline>

---

# OpenAPI

---

# openapi-ts

---

# Vite + openapi-ts

---

# unplugin

---

# unplugin-openapi-codegen

---

# zero cost

---

# install

---

# setup

---

# usage with openapi-fetch

---

# usage generated types

---

# usage with axios

---
