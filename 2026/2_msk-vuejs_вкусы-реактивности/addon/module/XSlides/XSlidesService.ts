import type { App, InjectionKey, Slot } from 'vue'
import { inject } from 'vue'

const xSlidesKey = Symbol('xSlides') as InjectionKey<XSlidesContext>

interface SlotEntry {
  page: number
  slot: Slot
}

interface XSlidesContext {
  /** name → definitions from slides that provided a default slot */
  entries: Record<string, SlotEntry[]>
}

export function useXSlides() {
  const ctx = inject(xSlidesKey)
  if (!ctx)
    throw new Error('[XSlide] provideXSlides() was not called in addon setup')

  function register(name: string, page: number, slot: Slot) {
    const list = ctx.entries[name] ?? (ctx.entries[name] = [])
    const idx = list.findIndex(e => e.page === page)
    if (idx >= 0)
      list[idx] = { page, slot }
    else
      list.push({ page, slot })
  }

  /**
   * For reuse slides (no local slot): nearest definition on this page or earlier.
   * Falls back to the earliest definition if none precede (preload edge case).
   */
  function resolve(name: string, page: number): Slot | undefined {
    const list = ctx.entries[name]
    if (!list?.length)
      return undefined
    const prior = list
      .filter(e => e.page <= page)
      .sort((a, b) => b.page - a.page)[0]
    if (prior)
      return prior.slot
    return [...list].sort((a, b) => a.page - b.page)[0]?.slot
  }

  return {
    register,
    resolve,
    /** @deprecated */
    get: (name: string) => resolve(name, Number.POSITIVE_INFINITY),
    slots: ctx.entries,
  }
}

export function provideXSlides(app: App) {
  app.provide(xSlidesKey, { entries: {} })
}
