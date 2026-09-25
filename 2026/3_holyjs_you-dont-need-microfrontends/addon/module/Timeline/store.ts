import type { Reactive } from 'vue'
import { reactive, toRaw } from 'vue'

/**
 * Timeline view model per slide instance, consumed by global `t` in markdown.
 * Key = `${page}:${renderContext}`: в режиме докладчика один слайд рисуется и на основном
 * экране, и в превью следующего клика — у каждого экземпляра своё состояние.
 */
type Key = string
const timelineByPage = reactive<Record<Key, Record<string, unknown>>>({})

export const timelineKey = (page: number, renderContext?: string) => `${page}:${renderContext ?? 'slide'}`

const EMPTY: Record<string, unknown> = reactive({})

export function publishTimeline(page: Key, state: Reactive<Record<string, unknown>> | Record<string, unknown>) {
  timelineByPage[page] = state
}

/**
 * При смене слайда Transition монтирует новый экземпляр раньше, чем размонтирует старый —
 * старый не должен стереть уже опубликованное состояние нового. Удаляем только своё.
 */
export function unpublishTimeline(page: Key, state?: Reactive<Record<string, unknown>> | Record<string, unknown>) {
  const current = timelineByPage[page]
  if (state && current && toRaw(current) !== toRaw(state))
    return
  delete timelineByPage[page]
}

export function readTimeline(page: Key | undefined | null): Record<string, unknown> {
  if (page == null)
    return EMPTY
  return timelineByPage[page] ?? EMPTY
}
