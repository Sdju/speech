<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useNav } from '@slidev/client'
import { showTimelineEditor, isTimelineEditorVertical as vertical, timelineEditorWidth, timelineEditorHeight } from '../state/timeline'
import PropertyDiff from './timeline/PropertyDiff.vue'

const props = defineProps<{
  resize?: boolean
}>()
const { clicks, currentSlideRoute, go } = useNav()

const actionStatus = ref('')

const slideMeta = computed(() => {
  const slide = currentSlideRoute.value.meta?.slide as {
    filepath?: string
    start?: number
    source?: { filepath?: string, start?: number }
  } | undefined
  return {
    filepath: slide?.source?.filepath || slide?.filepath || 'slides.md',
    start: slide?.source?.start ?? slide?.start ?? 0,
  }
})

const frontmatter = computed(() => {
  const meta = currentSlideRoute.value.meta?.slide as any
  return meta?.frontmatter || {}
})
const timeline = computed(() => frontmatter.value.timeline ?? [])
const hasTimeline = computed(() => (frontmatter.value.timeline ?? []).length > 0)

const allKeys = computed(() => {
  if (!hasTimeline.value) return []
  const keys = new Set<string>()
  timeline.value.forEach((step: any) => {
    Object.keys(step).forEach(key => {
      if (!key.startsWith('$')) {
        keys.add(key)
      }
    })
  })
  return Array.from(keys).sort()
})

const currentStep = computed(() => {
  return Math.min(clicks.value, timeline.value.length - 1)
})

const expandedOverride = ref<Record<number, boolean>>({})

function isStepExpanded(stepIndex: number): boolean {
  const override = expandedOverride.value[stepIndex]
  if (override !== undefined)
    return override
  // Default: collapse only heavy steps
  return !shouldCollapseByDefault(stepIndex)
}

function toggleStepExpanded(stepIndex: number) {
  expandedOverride.value = {
    ...expandedOverride.value,
    [stepIndex]: !isStepExpanded(stepIndex),
  }
}

function getChangesCount(stepIndex: number): number {
  return allKeys.value.filter(key => isKeyChanged(stepIndex, key)).length
}

function shouldCollapseByDefault(stepIndex: number): boolean {
  return getChangesCount(stepIndex) > 3
}

function goToStep(stepIndex: number) {
  if (stepIndex >= 0 && stepIndex < timeline.value.length) {
    go(currentSlideRoute.value.no, stepIndex, true)
  }
}

function getStepValue(stepIndex: number, key: string): any {
  const step = timeline.value[stepIndex]
  return step?.[key]
}

function getPrevStepValue(stepIndex: number, key: string): any {
  if (stepIndex === 0) return undefined
  const prevStep = timeline.value[stepIndex - 1]
  return prevStep?.[key]
}

function isKeyChanged(stepIndex: number, key: string): boolean {
  if (stepIndex === 0) return true
  const currentValue = timeline.value[stepIndex]?.[key]
  const prevValue = timeline.value[stepIndex - 1]?.[key]

  if (typeof currentValue === 'object' && typeof prevValue === 'object') {
    return JSON.stringify(currentValue) !== JSON.stringify(prevValue)
  }

  return currentValue !== undefined && currentValue !== prevValue
}

function close() {
  showTimelineEditor.value = false
}

function handlePropertyUpdate(path: string, oldValue: any, newValue: any, stepIndex: number, propertyName: string) {
  console.log('🔄 Обновление свойства в timeline:', {
    path,
    stepIndex,
    propertyName,
    oldValue,
    newValue,
  })
}

async function postTimelineMutation(action: 'timeline-add-step' | 'timeline-delete-step', body: Record<string, unknown>) {
  actionStatus.value = '…'
  try {
    const res = await fetch(`/__slides_parts_api/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filePath: slideMeta.value.filepath,
        slideStart: slideMeta.value.start,
        ...body,
      }),
    })
    const data = await res.json()
    if (!data.success) {
      actionStatus.value = data.error || 'ошибка'
      return null
    }
    actionStatus.value = data.detail || 'ok'
    return data as { stepCount?: number }
  }
  catch (e) {
    actionStatus.value = String(e)
    return null
  }
}

async function addEmptyStep() {
  const data = await postTimelineMutation('timeline-add-step', {})
  if (!data?.stepCount)
    return
  const nextIndex = data.stepCount - 1
  setTimeout(() => {
    go(currentSlideRoute.value.no, nextIndex, true)
  }, 200)
}

/** First click arms delete; second click within timeout confirms. */
const pendingDeleteStep = ref<number | null>(null)
let pendingDeleteTimer: ReturnType<typeof setTimeout> | null = null

function clearPendingDelete() {
  pendingDeleteStep.value = null
  if (pendingDeleteTimer) {
    clearTimeout(pendingDeleteTimer)
    pendingDeleteTimer = null
  }
}

function requestDeleteStep(stepIndex: number) {
  if (timeline.value.length <= 1) {
    actionStatus.value = 'нельзя удалить единственный шаг'
    return
  }

  if (pendingDeleteStep.value === stepIndex) {
    clearPendingDelete()
    void confirmDeleteStep(stepIndex)
    return
  }

  clearPendingDelete()
  pendingDeleteStep.value = stepIndex
  actionStatus.value = `ещё раз нажмите 🗑 чтобы удалить шаг ${stepIndex + 1}`
  pendingDeleteTimer = setTimeout(() => {
    if (pendingDeleteStep.value === stepIndex) {
      pendingDeleteStep.value = null
      if (actionStatus.value.includes('ещё раз нажмите'))
        actionStatus.value = ''
    }
  }, 3000)
}

async function confirmDeleteStep(stepIndex: number) {
  const data = await postTimelineMutation('timeline-delete-step', { stepIndex })
  if (!data)
    return
  const next = Math.min(stepIndex, (data.stepCount ?? 1) - 1)
  setTimeout(() => {
    go(currentSlideRoute.value.no, Math.max(0, next), true)
  }, 200)
}

const handlerDown = ref(false)
function onHandlerDown() {
  handlerDown.value = true
}
function updateSize(v?: number) {
  if (vertical.value)
    timelineEditorHeight.value = Math.min(Math.max(150, v ?? timelineEditorHeight.value), window.innerHeight - 200)
  else
    timelineEditorWidth.value = Math.min(Math.max(300, v ?? timelineEditorWidth.value), window.innerWidth - 200)
}

if (props.resize) {
  useEventListener('pointermove', (e) => {
    if (handlerDown.value) {
      updateSize(vertical.value
        ? window.innerHeight - e.pageY
        : window.innerWidth - e.pageX)
    }
  }, { passive: true })
  useEventListener('pointerup', () => {
    handlerDown.value = false
  })
  useEventListener('resize', () => {
    updateSize()
  })
}
</script>

<template>
  <!-- Single root so Teleport adds one grid child (handle is fixed inside). -->
  <div
    class="timeline-dock overflow-hidden"
    :class="vertical ? 'w-full min-h-0' : 'h-full min-w-0'"
    :style="resize ? {
      height: vertical ? `${timelineEditorHeight}px` : '100%',
      width: vertical ? '100%' : `${timelineEditorWidth}px`,
    } : {}"
  >
    <div
      v-if="resize"
      class="fixed bg-gray-400 select-none opacity-0 hover:opacity-10 z-dragging"
      :class="vertical ? 'left-0 right-0 w-full h-10px' : 'top-0 bottom-0 w-10px h-full'"
      :style="{
        opacity: handlerDown ? '0.3' : undefined,
        bottom: vertical ? `${timelineEditorHeight - 5}px` : undefined,
        right: !vertical ? `${timelineEditorWidth - 5}px` : undefined,
        cursor: vertical ? 'row-resize' : 'col-resize',
      }"
      @pointerdown="onHandlerDown"
    />
    <div
      class="shadow bg-main p-2 pt-4 grid grid-rows-[max-content_1fr] h-full w-full overflow-hidden"
      :class="resize
        ? (vertical ? 'border-t border-gray-400 border-opacity-20' : 'border-l border-gray-400 border-opacity-20')
        : ''"
    >
    <div class="flex pb-2 text-xl -mt-1 items-center">
      <span class="text-2xl pt-1">
        Timeline
      </span>
      <div class="flex-auto" />
      <template v-if="resize">
        <button v-if="vertical" title="Dock to right" class="slidev-icon-btn" @click="vertical = false">
          <div class="i-carbon:open-panel-right" />
        </button>
        <button v-else title="Dock to bottom" class="slidev-icon-btn" @click="vertical = true">
          <div class="i-carbon:open-panel-bottom" />
        </button>
      </template>
      <button title="Close" class="slidev-icon-btn" @click="close">
        <div class="i-carbon:close" />
      </button>
    </div>

    <div class="relative overflow-auto rounded bg-[#1a1a1a] p-2 min-h-0">
      <div v-if="!hasTimeline" class="text-white/50 text-center py-8 text-sm">
        Нет таймлайна на этом слайде.<br>
        Добавьте frontmatter с <code class="text-blue-400">timeline</code>
      </div>

      <div v-else class="flex flex-col gap-2">
        <div class="bg-blue-500/20 rounded p-2 border border-blue-500/50 flex items-center gap-2">
          <div class="text-white font-bold text-lg font-mono">
            {{ currentStep + 1 }} / {{ timeline.length }}
          </div>
          <div class="flex-auto" />
          <button
            class="step-action-btn add"
            title="Добавить пустой шаг в конец"
            @click="addEmptyStep"
          >
            <div class="i-carbon:add" />
            <span>шаг</span>
          </button>
        </div>

        <div v-if="actionStatus" class="text-[10px] text-white/60 px-1 break-all font-mono">
          {{ actionStatus }}
        </div>

        <div class="flex flex-col gap-1">
          <div
            v-for="(step, index) in timeline"
            :key="index"
            class="step-card"
            :class="{
              'step-active': index === currentStep,
              'step-past': index < currentStep,
              'step-future': index > currentStep
            }"
          >
            <div class="step-header" @click="goToStep(index)">
              <span class="step-number">{{ index + 1 }}</span>
              <span class="step-title">
                Шаг {{ index + 1 }}
                <span v-if="step.$clicksAlias" class="text-xs opacity-70">
                  ({{ Array.isArray(step.$clicksAlias) ? step.$clicksAlias.join(', ') : step.$clicksAlias }})
                </span>
              </span>
              <div class="flex-auto" />
              <span class="changes-badge">{{ getChangesCount(index) }}</span>
              <button
                class="expand-btn delete-btn"
                :class="{ 'delete-confirm': pendingDeleteStep === index }"
                :title="pendingDeleteStep === index ? 'Нажмите ещё раз для удаления' : 'Удалить шаг'"
                :disabled="timeline.length <= 1"
                @click.stop="requestDeleteStep(index)"
              >
                <div v-if="pendingDeleteStep === index" class="i-carbon:warning-alt" />
                <div v-else class="i-carbon:trash-can" />
              </button>
              <button
                class="expand-btn"
                @click.stop="toggleStepExpanded(index)"
              >
                <div v-if="isStepExpanded(index)" class="i-carbon:chevron-up" />
                <div v-else class="i-carbon:chevron-down" />
              </button>
            </div>

            <div
              v-if="isStepExpanded(index)"
              class="step-content"
            >
              <PropertyDiff
                v-for="key in allKeys.filter(key => isKeyChanged(index, key))"
                :key="key"
                :name="key"
                :value="getStepValue(index, key)"
                :prev-value="getPrevStepValue(index, key)"
                :show-diff="index > 0"
                :step-index="index"
                :path="`timeline.${index}.${key}`"
                :slide-meta="slideMeta"
                @update="handlePropertyUpdate"
              />
              <div
                v-if="!allKeys.some(key => isKeyChanged(index, key))"
                class="text-xs text-white/40 font-mono px-1"
              >
                пустой шаг
              </div>
            </div>

            <div
              v-else
              class="step-content-collapsed"
              @click="toggleStepExpanded(index)"
            >
              <div class="text-xs text-white/50">
                {{ getChangesCount(index) }} изменений • Клик для раскрытия
              </div>
            </div>
          </div>
        </div>

        <button
          class="add-step-footer"
          title="Добавить пустой шаг в конец"
          @click="addEmptyStep"
        >
          <div class="i-carbon:add" />
          Добавить пустой шаг
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.step-card {
  @apply bg-white/5 rounded border border-white/10 overflow-hidden cursor-pointer
         hover:bg-white/10 transition-all duration-200;
}

.step-card.step-active {
  @apply bg-blue-500/20 border-blue-500/50 ring-2 ring-blue-500/30;
}

.step-card.step-past {
  @apply opacity-60;
}

.step-card.step-future {
  @apply opacity-40;
}

.step-header {
  @apply flex items-center gap-2 p-2 bg-white/5 cursor-pointer;
}

.step-number {
  @apply flex items-center justify-center w-6 h-6 bg-white/10 rounded-full
         text-white font-bold text-xs shrink-0;
}

.step-active .step-number {
  @apply bg-blue-500 text-white;
}

.step-title {
  @apply text-white text-sm font-mono;
}

.changes-badge {
  @apply px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-mono;
}

.expand-btn {
  @apply flex items-center justify-center w-5 h-5 rounded hover:bg-white/10 text-white/70 hover:text-white;
}

.delete-btn {
  @apply text-red-400/70 hover:text-red-300 hover:bg-red-500/20;
}

.delete-btn.delete-confirm {
  @apply bg-red-500/40 text-red-100 ring-1 ring-red-400 animate-pulse w-auto px-1;
}

.delete-btn:disabled {
  @apply opacity-30 pointer-events-none;
}

.step-action-btn {
  @apply flex items-center gap-1 px-2 py-1 rounded text-xs font-mono
         bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors;
}

.step-action-btn.add {
  @apply bg-green-500/20 text-green-300 hover:bg-green-500/30;
}

.add-step-footer {
  @apply flex items-center justify-center gap-2 w-full py-2 rounded border border-dashed
         border-white/20 text-white/60 text-sm hover:border-green-500/50 hover:text-green-300
         hover:bg-green-500/10 transition-colors;
}

.step-content {
  @apply p-2 flex flex-col gap-2;
}

.step-content-collapsed {
  @apply p-2 text-center cursor-pointer hover:bg-white/5 border-t border-white/5;
}
</style>
