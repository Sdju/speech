---
layout: full
chapter: стиль · станция
camera: { focus: station, distance: 3.6, yaw: -35, pitch: 16, shift: [-0.55, 0.05] }
station: {}
timeline:
  - title: 'Продукт — модульная станция'
    note: 'Хаб — оболочка, модули — команды'
  - station: { detached: [cart] }
    title: 'Модуль отстыковался'
    note: 'Независимый деплой: Cart уходит на обновление'
  - camera: { focus: station.cart, distance: 6, yaw: -20, pitch: 10, shift: [-0.6, 0] }
    station: { detached: [cart] }
    title: 'Cart отдельно'
    note: 'Своя команда, свой релизный цикл'
  - camera: { focus: station, distance: 3.6, yaw: -35, pitch: 16, shift: [-0.55, 0.05] }
    station: {}
    title: 'Стыковка'
    note: 'Новая версия пристыковалась к работающей станции'
  - station: { hidden: [profile, checkout] }
    title: 'Модулей может ещё не быть'
    note: 'Станция работает и без них'
  - station: {}
    title: 'Прилетели'
    note: 'Добавление модуля — стыковка на орбите'
---

<div class="absolute right-[64px] bottom-[64px] w-[360px] text-right">
  <div class="text-4xl font-bold leading-tight">{{ t.title }}</div>
  <div class="text-lg opacity-65 mt-2">{{ t.note }}</div>
</div>

<!--
Статус: предложение стиля
Демо станции (universe/station.ts): состояние `station:` во frontmatter/timeline — detached / hidden,
переходы анимируются; камера умеет `focus: station` и `focus: station.<модуль>`.
-->

---
layout: full
chapter: стиль · прогулка по системе
hide: true
camera: system
timeline:
  - title: 'Один продукт — одна планета'
    note: 'Модули — спутники на общей орбите'
  - camera: { focus: catalog, follow: orbit, distance: 7, yaw: 35, pitch: 12, shift: [-0.9, -0.1] }
    title: 'Catalog'
    note: 'Отдельный модуль: своя команда, свой код'
  - camera: { focus: cart, follow: orbit, distance: 6, yaw: -40, pitch: 8, shift: [-0.9, -0.1] }
    title: 'Cart'
    note: 'Живёт на той же орбите — стыкуется с продуктом'
  - camera: { focus: ocean, distance: 3.6, yaw: 25, pitch: 12, shift: [-0.8, 0], duration: 2.6 }
    title: 'Другой продукт'
    note: 'Своя планета, свои спутники'
  - camera: { focus: ember, distance: 4.2, yaw: -30, pitch: 14, shift: [-0.7, 0], duration: 2.6 }
    title: 'И ещё один'
    note: 'Система растёт — а планеты остаются целыми'
  - camera: { preset: system, duration: 2.6 }
    title: 'Назад на орбиту'
    note: ''
---

<div class="absolute right-[64px] bottom-[64px] w-[340px] text-right">
  <div class="text-4xl font-bold leading-tight">{{ t.title }}</div>
  <div class="text-lg opacity-65 mt-2">{{ t.note }}</div>
</div>

<!--
Статус: предложение стиля
Демо механизма камеры: общая 3D-сцена (UniverseLayer) живёт между слайдами,
камера задаётся в frontmatter `camera:` и в шагах timeline. См. universe/scene.ts.
-->

---
layout: center
slideClass: cs-purple
chapter: стиль · линия Кармана
hide: true
timeline:
  - step: 0
    active: -1
    title: 'Где стыкуются части продукта?'
  - step: 1
  - step: 2
  - step: 3
  - step: 4
  - step: 5
  - active: 4
    title: 'Только микрофронтенды стыкуются на орбите'
  - title: 'МКС собирали на орбите, потому что ни одна ракета не подняла бы её целиком'
---

<div class="w-full max-w-880px mx-auto">
  <h2 class="text-left !text-2xl !mb-6 min-h-[2.4em]">{{ t.title }}</h2>
  <KarmanLine :step="t.step" :active="t.active" />
</div>

<!--
Статус: предложение стиля
Сквозная схема доклада. Возвращается в конце каждой главы: открывается следующая колонка.
Три цвета — одни и те же три части продукта (домены) во всех колонках.
Все статические решения собирают продукт на Земле и запускают одной ракетой; микрофронтенды — N запусков и стыковка на орбите (нужен стандарт стыковочного узла = контракт).
Панч: МКС собирали на орбите не из-за моды, а потому что не было ракеты, способной поднять её целиком.
-->

---
layout: full
slideClass: cs-blue
chapter: стиль · схема
hide: true
timeline:
  - title: 'Module Federation'
    legend: 'интеграция в рантайме'
    remoteKind: 'remote'
    remoteNote: 'remoteEntry.js'
    hostTitle: 'Host · Shell'
    hostNote: 'оркестратор'
    sharedTitle: 'Shared dependencies'
    infra: 'CDN · независимый деплой каждого'
    karman: 'стыковка на орбите ↑'
    user:
      class: 'pos-480_38 w-[210px] text-base'
      color: 'gray'
    host:
      class: 'pos-480_172 w-[330px]'
      color: 'blue'
    catalog:
      class: 'pos-115_132 w-[170px] -blur-hidden'
      color: 'green'
    product:
      class: 'pos-115_242 w-[170px] -blur-hidden'
      color: 'green'
    cart:
      class: 'pos-845_132 w-[170px] -blur-hidden'
      color: 'purple'
    checkout:
      class: 'pos-845_242 w-[170px] -blur-hidden'
      color: 'purple'
    shared:
      class: 'pos-480_338 w-[400px] -blur-hidden'
      color: 'orange'
    infraLabel: 'fx duration-500 -blur-hidden'
    cdn1:
      class: 'pos-110_462 w-[160px] text-base -blur-hidden'
      color: 'green'
    cdn2:
      class: 'pos-295_462 w-[160px] text-base -blur-hidden'
      color: 'green'
    cdn3:
      class: 'pos-480_462 w-[160px] text-base -blur-hidden'
      color: 'blue'
    cdn4:
      class: 'pos-665_462 w-[160px] text-base -blur-hidden'
      color: 'purple'
    cdn5:
      class: 'pos-850_462 w-[160px] text-base -blur-hidden'
      color: 'purple'
    deployAll:
      class: 'pos-480_462 w-[160px] text-base -blur-hidden'
      color: 'blue'
    arrowUser:
      coords: '480:58 480:108'
      power: 0.001
      class: 'fx duration-500'
    arrowCatalog:
      coords: '313:142 202:132'
      power: 0.001
      startArrow: true
      class: 'fx duration-500 opacity-0'
    arrowProduct:
      coords: '313:204 202:244'
      power: 0.001
      startArrow: true
      class: 'fx duration-500 opacity-0'
    arrowCart:
      coords: '647:142 758:132'
      power: 0.001
      startArrow: true
      class: 'fx duration-500 opacity-0'
    arrowCheckout:
      coords: '647:204 758:244'
      power: 0.001
      startArrow: true
      class: 'fx duration-500 opacity-0'
    arrowHostShared:
      coords: '480:236 480:290'
      power: 0.001
      class: 'fx duration-500 opacity-0'
    arrowProductShared:
      coords: '115:296 276:338'
      power: 0.25
      dashed: true
      class: 'fx duration-500 opacity-0'
    arrowCheckoutShared:
      coords: '845:296 684:338'
      power: -0.25
      dashed: true
      class: 'fx duration-500 opacity-0'
  - catalog:
      class: 'pos-115_132 w-[170px]'
    product:
      class: 'pos-115_242 w-[170px]'
    cart:
      class: 'pos-845_132 w-[170px]'
    checkout:
      class: 'pos-845_242 w-[170px]'
    arrowCatalog:
      class: 'fx duration-500 animate'
    arrowProduct:
      class: 'fx duration-500 animate'
    arrowCart:
      class: 'fx duration-500 animate'
    arrowCheckout:
      class: 'fx duration-500 animate'
  - shared:
      class: 'pos-480_338 w-[400px]'
    arrowHostShared:
      class: 'fx duration-500 animate'
    arrowProductShared:
      class: 'fx duration-500 animate'
    arrowCheckoutShared:
      class: 'fx duration-500 animate'
  - infraLabel: 'fx duration-500'
    cdn1:
      class: 'pos-110_462 w-[160px] text-base'
    cdn2:
      class: 'pos-295_462 w-[160px] text-base'
    cdn3:
      class: 'pos-480_462 w-[160px] text-base'
    cdn4:
      class: 'pos-665_462 w-[160px] text-base'
    cdn5:
      class: 'pos-850_462 w-[160px] text-base'
  - title: 'Модульный монолит'
    legend: 'интеграция при сборке'
    remoteKind: 'модуль'
    remoteNote: 'feature module'
    hostTitle: 'Single App'
    hostNote: 'один проект · один репозиторий'
    sharedTitle: 'Shared core'
    infra: 'один артефакт · один деплой'
    karman: 'стыковка на земле ↓'
    cdn1:
      class: 'pos-480_462 w-[160px] text-base -blur-hidden'
    cdn2:
      class: 'pos-480_462 w-[160px] text-base -blur-hidden'
    cdn3:
      class: 'pos-480_462 w-[160px] text-base -blur-hidden'
    cdn4:
      class: 'pos-480_462 w-[160px] text-base -blur-hidden'
    cdn5:
      class: 'pos-480_462 w-[160px] text-base -blur-hidden'
    deployAll:
      class: 'pos-480_462 w-[900px] text-base'
  - title: 'Схема та же'
    infra: 'меняется только момент связывания'
    deployAll:
      class: 'pos-480_462 w-[900px] text-base'
      highlight: true
---

<div class="absolute left-[30px] top-[14px] text-left">
  <div class="hud-label">схема</div>
  <div class="text-2xl font-bold whitespace-nowrap">{{ t.title }}</div>
</div>

<div class="absolute right-[30px] top-[18px] flex flex-col gap-1 text-xs font-mono opacity-80 whitespace-nowrap">
  <div class="flex items-center gap-2"><span class="w-6 h-[2px] bg-current" /> {{ t.legend }}</div>
  <div class="flex items-center gap-2"><span class="w-6 b-t-2 b-dashed b-current" /> общие зависимости</div>
</div>

<Node v-bind="t.user">
  <div class="flex items-center gap-2"><CarbonUserAvatar /> Пользователь</div>
</Node>

<Node v-bind="t.host">
  <div class="hud-node w-full">
    <div class="flex items-center gap-2"><CarbonCube /> {{ t.hostTitle }}</div>
    <small>{{ t.hostNote }}</small>
    <div class="grid grid-cols-4 gap-2 mt-2 w-full">
      <div class="hud-chip"><CarbonFlow />Router</div>
      <div class="hud-chip"><CarbonCompass />Nav</div>
      <div class="hud-chip"><CarbonLocked />Auth</div>
      <div class="hud-chip"><CarbonTemplate />Layout</div>
    </div>
  </div>
</Node>

<Node v-bind="t.catalog">
  <div class="hud-node"><small>{{ t.remoteKind }}</small>Catalog<small>{{ t.remoteNote }}</small></div>
</Node>
<Node v-bind="t.product">
  <div class="hud-node"><small>{{ t.remoteKind }}</small>Product<small>{{ t.remoteNote }}</small></div>
</Node>
<Node v-bind="t.cart">
  <div class="hud-node"><small>{{ t.remoteKind }}</small>Cart<small>{{ t.remoteNote }}</small></div>
</Node>
<Node v-bind="t.checkout">
  <div class="hud-node"><small>{{ t.remoteKind }}</small>Checkout<small>{{ t.remoteNote }}</small></div>
</Node>

<Node v-bind="t.shared">
  <div class="hud-node w-full">
    <div>{{ t.sharedTitle }}</div>
    <div class="grid grid-cols-4 gap-2 mt-1 w-full">
      <div class="hud-chip"><CarbonCode />Фреймворк</div>
      <div class="hud-chip"><CarbonApps />UI Kit</div>
      <div class="hud-chip"><CarbonDataBase />State</div>
      <div class="hud-chip"><CarbonToolKit />Utils</div>
    </div>
  </div>
</Node>

<div :class="t.infraLabel" class="absolute left-0 right-0 top-[394px] b-t-1 b-dashed b-[var(--v-color)] shadow-[0_0_14px_var(--v-color)]">
  <span class="hud-label absolute left-[30px] top-[6px] whitespace-nowrap">{{ t.karman }}</span>
</div>
<div :class="t.infraLabel" class="$obj pos-480_416 hud-label whitespace-nowrap">{{ t.infra }}</div>

<Node v-bind="t.cdn1"><div class="hud-node">Catalog<small>CDN</small></div></Node>
<Node v-bind="t.cdn2"><div class="hud-node">Product<small>CDN</small></div></Node>
<Node v-bind="t.cdn3"><div class="hud-node">Host<small>CDN</small></div></Node>
<Node v-bind="t.cdn4"><div class="hud-node">Cart<small>CDN</small></div></Node>
<Node v-bind="t.cdn5"><div class="hud-node">Checkout<small>CDN</small></div></Node>
<Node v-bind="t.deployAll">
  <div class="flex items-center gap-8 whitespace-nowrap">
    <span class="flex items-center gap-2"><CarbonRepoSourceCode /> 1 репозиторий</span>
    <span class="flex items-center gap-2"><CarbonBuildTool /> 1 сборка</span>
    <span class="flex items-center gap-2"><CarbonDeploy /> 1 деплой</span>
  </div>
</Node>

<SvgLayer>
  <SvgArrow v-bind="t.arrowUser" />
  <SvgArrow v-bind="t.arrowCatalog" />
  <SvgArrow v-bind="t.arrowProduct" />
  <SvgArrow v-bind="t.arrowCart" />
  <SvgArrow v-bind="t.arrowCheckout" />
  <SvgArrow v-bind="t.arrowHostShared" />
  <SvgArrow v-bind="t.arrowProductShared" />
  <SvgArrow v-bind="t.arrowCheckoutShared" />
</SvgLayer>

<!--
Статус: предложение стиля
Замена картинок mf.png + modules.png одной анимированной схемой.
Клики: host → remotes (рантайм) → shared → CDN каждого → морф в модульный монолит (тот же граф, один деплой) → панч «схема та же».
-->
