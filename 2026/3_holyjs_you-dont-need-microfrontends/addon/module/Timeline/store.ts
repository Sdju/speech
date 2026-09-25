import type { Reactive } from 'vue'
import { reactive, toRaw } from 'vue'

/** Per-slide timeline view model consumed by global `t` in markdown. */
const timelineByPage = reactive<Record<number, Record<string, unknown>>>({})

const EMPTY: Record<string, unknown> = reactive({})

export function publishTimeline(page: number, state: Reactive<Record<string, unknown>> | Record<string, unknown>) {
  timelineByPage[page] = state
}

/**
 * При смене слайда Transition монтирует новый экземпляр раньше, чем размонтирует старый —
 * старый не должен стереть уже опубликованное состояние нового. Удаляем только своё.
 */
export function unpublishTimeline(page: number, state?: Reactive<Record<string, unknown>> | Record<string, unknown>) {
  const current = timelineByPage[page]
  if (state && current && toRaw(current) !== toRaw(state))
    return
  delete timelineByPage[page]
}

export function readTimeline(page: number | undefined | null): Record<string, unknown> {
  if (page == null)
    return EMPTY
  return timelineByPage[page] ?? EMPTY
}
