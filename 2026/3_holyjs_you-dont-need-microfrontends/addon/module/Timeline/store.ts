import type { Reactive } from 'vue'
import { reactive } from 'vue'

/** Per-slide timeline view model consumed by global `t` in markdown. */
const timelineByPage = reactive<Record<number, Record<string, unknown>>>({})

const EMPTY: Record<string, unknown> = reactive({})

export function publishTimeline(page: number, state: Reactive<Record<string, unknown>> | Record<string, unknown>) {
  timelineByPage[page] = state
}

export function unpublishTimeline(page: number) {
  delete timelineByPage[page]
}

export function readTimeline(page: number | undefined | null): Record<string, unknown> {
  if (page == null)
    return EMPTY
  return timelineByPage[page] ?? EMPTY
}
