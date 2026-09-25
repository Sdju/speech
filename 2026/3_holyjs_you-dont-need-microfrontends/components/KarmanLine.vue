<script setup lang="ts">
const { step = 5, active = -1 } = defineProps<{
  step?: number
  active?: number
}>()

type Mode = 'solid' | 'segmented' | 'packages' | 'versioned' | 'docking'

const parts = ['#34d399', '#60a5fa', '#f472b6']

const columns: { name: string, launches: string, mode: Mode }[] = [
  { name: 'Монолит', launches: '1 запуск', mode: 'solid' },
  { name: 'Модули', launches: '1 запуск', mode: 'segmented' },
  { name: 'Монорепозиторий', launches: '1 запуск', mode: 'packages' },
  { name: 'Распределённый монолит', launches: '1 запуск', mode: 'versioned' },
  { name: 'Микрофронтенды', launches: 'N запусков', mode: 'docking' },
]
</script>

<template>
  <div class="karman">
    <div class="karman__zone karman__zone--orbit">
      <span class="hud-label">орбита · runtime · браузер</span>
    </div>
    <div class="karman__zone karman__zone--earth">
      <span class="hud-label">земля · build time · CI</span>
    </div>
    <div class="karman__line">
      <span class="hud-label">линия Кармана</span>
    </div>

    <div class="karman__cols">
      <div
        v-for="(col, i) in columns"
        :key="col.name"
        class="karman__col fx duration-500"
        :class="[
          i < step ? '' : '-blur-hidden',
          active >= 0 && active !== i ? 'opacity-30' : '',
          active === i ? 'karman__col--active' : '',
        ]"
      >
        <!-- орбита: что видит пользователь -->
        <div class="karman__cell karman__cell--orbit">
          <div v-if="col.mode === 'solid'" class="k-block k-block--mono" />
          <div v-else-if="col.mode !== 'docking'" class="k-block k-block--split">
            <span v-for="c in parts" :key="c" :style="{ background: c }" />
          </div>
          <div v-else class="k-dock">
            <template v-for="(c, j) in parts" :key="c">
              <span v-if="j" class="k-dock__port" />
              <span class="k-dock__module" :style="{ background: c }" />
            </template>
          </div>
        </div>

        <!-- траектория -->
        <div class="karman__cell karman__cell--flight">
          <div v-if="col.mode === 'docking'" class="k-rockets">
            <span v-for="c in parts" :key="c" class="k-rocket" :style="{ color: c }" />
          </div>
          <span v-else class="k-rocket k-rocket--main" />
        </div>

        <!-- земля: как устроена сборка -->
        <div class="karman__cell karman__cell--earth">
          <div v-if="col.mode === 'solid'" class="k-block k-block--mono" />
          <div v-else-if="col.mode === 'segmented'" class="k-block k-block--split">
            <span v-for="c in parts" :key="c" :style="{ background: c }" />
          </div>
          <div v-else class="k-packages" :class="{ 'k-packages--apart': col.mode === 'docking' }">
            <div v-for="c in parts" :key="c" class="k-package">
              <span class="k-package__box" :style="{ background: c }" />
              <span v-if="col.mode === 'versioned'" class="k-package__tag">v1.{{ parts.indexOf(c) + 2 }}</span>
            </div>
          </div>
        </div>

        <div class="karman__caption">
          <div class="karman__name">{{ col.name }}</div>
          <div class="hud-label !text-[10px] opacity-80">{{ col.launches }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.karman {
  --at-apply: relative w-full h-[360px];
}

.karman__zone {
  --at-apply: absolute left-0 right-0 flex px-2 py-1;
}

.karman__zone--orbit {
  --at-apply: top-0 h-[140px] items-start;
}

.karman__zone--earth {
  --at-apply: top-[140px] h-[150px] items-end;
  background: linear-gradient(to bottom, transparent, --set-alpha(var(--v-color), 10%));
  border-bottom: 1px solid --set-alpha(var(--v-color), 35%);
}

.karman__line {
  --at-apply: absolute left-0 right-0 top-[140px] h-0 px-2;
  border-top: 1px dashed var(--v-color);
  box-shadow: 0 0 14px --set-alpha(var(--v-color), 50%);

  & > span {
    display: block;
    width: fit-content;
    padding: 2px 8px;
    margin-top: -6px;
    transform: translateY(-100%);
    position: relative;
    z-index: 1;
    border-radius: 999px;
    background: #000a;
  }
}

.karman__cols {
  --at-apply: absolute inset-0 grid grid-cols-5 gap-4 px-2;
}

.karman__col {
  --at-apply: grid rounded-[8px];
  grid-template-rows: 90px 110px 90px 70px;
}

.karman__col--active {
  background: --set-alpha(var(--v-color), 10%);
  box-shadow: inset 0 0 0 1px --set-alpha(var(--v-color), 50%);
}

.karman__cell {
  --at-apply: flex items-center justify-center;
}

.karman__cell--orbit {
  --at-apply: items-end pb-1;
}

.karman__cell--earth {
  --at-apply: items-start pt-2;
}

.karman__cell--flight {
  --at-apply: items-stretch;
}

.k-rockets {
  --at-apply: flex gap-[44px];
}

.karman__caption {
  --at-apply: flex flex-col items-center justify-start gap-1 pt-3 text-center;
}

.karman__name {
  --at-apply: text-sm font-bold leading-tight c-white;
}

.k-block {
  --at-apply: h-9 w-[110px] rounded-[5px];
  box-shadow: 0 0 16px #ffffff22;
}

.k-block--mono {
  background: linear-gradient(135deg, #9ca3af, #4b5563);
}

.k-block--split {
  --at-apply: flex gap-[3px] p-[3px] bg-white/15;

  & > span {
    --at-apply: flex-1 rounded-[3px];
  }
}

.k-packages {
  --at-apply: flex gap-2;
}

.k-packages--apart {
  --at-apply: gap-5;
}

.k-package {
  --at-apply: flex flex-col items-center gap-1;
}

.k-package__box {
  --at-apply: block size-26 rounded-[4px];
}

.k-package__tag {
  --at-apply: font-mono text-[10px] opacity-70;
}

.k-dock {
  --at-apply: flex items-center;
}

.k-dock__module {
  --at-apply: block size-26 rounded-[4px];
}

.k-dock__port {
  --at-apply: block w-[20px] h-[6px] bg-white/60;
}

.k-rocket {
  --at-apply: relative block w-[2px] my-1;
  background: linear-gradient(to top, transparent, currentColor);
  color: var(--v-color);

  &::after {
    content: '';
    --at-apply: absolute -top-[2px] left-1/2 -translate-x-1/2;
    border: 5px solid transparent;
    border-bottom: 8px solid currentColor;
    border-top: 0;
  }
}

.k-rocket--main {
  --at-apply: w-[3px];
  color: white;
}
</style>
