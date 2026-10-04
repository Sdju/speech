import { defineAppSetup } from '@slidev/types'
import { getCurrentInstance, unref } from 'vue'
import { provideXSlides } from '../module/XSlides/XSlidesService'
import { readTimeline, timelineKey } from '../module/Timeline/store'

/** Same string keys as `@slidev/client` `injectionCurrentPage` / `injectionRenderContext`. */
const PAGE_KEY = '$$slidev-page'
const RENDER_CONTEXT_KEY = '$$slidev-render-context'

function readKey(): string | undefined {
  const instance = getCurrentInstance()
  if (!instance)
    return undefined
  const provides = instance.provides as Record<string | symbol, unknown>
  const page = unref(provides[PAGE_KEY] as number | { value: number } | undefined)
  if (page == null)
    return undefined
  return timelineKey(page, unref(provides[RENDER_CONTEXT_KEY] as string | { value: string } | undefined))
}

export default defineAppSetup(({ app }) => {
  app.use({
    install() {
      document.body.classList.add('cs-main', 'duration-200', 'ease-in-out')
    },
  })
  provideXSlides(app)
  // Global `t` for markdown templates — reads per-page timeline store (no ClicksContext patch).
  app.mixin({
    computed: {
      t() {
        return readTimeline(readKey())
      },
    },
  })
})
