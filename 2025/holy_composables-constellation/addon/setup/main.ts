import { defineAppSetup } from '@slidev/types'
import { getCurrentInstance, unref } from 'vue'
import { provideXSlides } from '../module/XSlides/XSlidesService'
import { readTimeline } from '../module/Timeline/store'

/** Same string key as `@slidev/client` `injectionCurrentPage`. */
const PAGE_KEY = '$$slidev-page'

function readPage(): number | undefined {
  const instance = getCurrentInstance()
  if (!instance)
    return undefined
  const provides = instance.provides as Record<string | symbol, unknown>
  return unref(provides[PAGE_KEY] as number | { value: number } | undefined)
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
        return readTimeline(readPage())
      },
    },
  })
})
