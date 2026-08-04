import { createServiceKey, useDi } from "../VueServices/useDiContainer"
import { ref, reactive, onScopeDispose } from "vue"

export interface CorrectSignal extends AbortSignal {
  abort: () => void
}

export function abortSignal(): CorrectSignal {
  const controller = new AbortController()
  const signal = controller.signal as CorrectSignal
  signal.abort = () => controller.abort()
  return signal
}

export function createChainedSignal(parent: CorrectSignal): CorrectSignal {
  const signal = abortSignal()
  parent.addEventListener('abort', () => {
    signal.abort()
  })
  return signal
}

export function getObjectElement(el: HTMLElement | null): ObjectElement | undefined {
  return (el as any)?._object
}

export interface ObjectElement {
  element: HTMLElement
  signal: CorrectSignal
  addListener: <T extends Event>(event: string, listener: (event: T) => void, signal?: CorrectSignal) => void
  dispose: () => void
  locked: boolean
}

export function ObjectService() {
  const objects = ref<Set<HTMLElement>>(new Set())
  const hovered = ref<HTMLElement | null>(null)
  const active = ref<HTMLElement | null>(null)
  let scanInterval: number | null = null

  class ObjectElement implements ObjectElement {
    element: HTMLElement
    signal = abortSignal()
    hoveredSignal: CorrectSignal | null = null
    locked = false

    constructor(element: HTMLElement) {
      this.element = element
      this.addListener('mouseenter', this.onEnter)
    }
  
    addListener<T extends Event>(
      event: string,
      listener: (event: T) => void,
      signal: CorrectSignal = this.signal
    ) {
      this.element.addEventListener(event, listener.bind(this), { signal })
    }
  
    onEnter() {
      this.hoveredSignal = createChainedSignal(this.signal)
      this.addListener('click', this.onClick, this.hoveredSignal)
      this.addListener('mouseleave', this.onLeave, this.hoveredSignal)
      hovered.value = this.element
    }
  
    onClick() {
      if (this.locked) {
        return
      }
      active.value = active.value === this.element ? null : this.element
    }
  
    onLeave() {
      this.hoveredSignal!.abort()
      this.hoveredSignal = null
      hovered.value = null
    }
  
    dispose() {
      console.log('dispose')
      this.signal.abort()
    }
  }

  function isOnVisibleSlide(el: HTMLElement) {
    const page = el.closest('.slidev-page') as HTMLElement | null
    if (!page)
      return el.getClientRects().length > 0
    return getComputedStyle(page).display !== 'none'
  }

  function scanForFigures() {
    const elements = [...document.querySelectorAll(`#slide-content .\\$obj`)]
      .filter((el): el is HTMLElement => el instanceof HTMLElement && isOnVisibleSlide(el))
    const newObjects = new Set(elements)
    const addedObjects = [...newObjects].filter(o => !objects.value.has(o))
    addedObjects.forEach(o => {
      objects.value.add(o)
      ;(o as any)._object = new ObjectElement(o)
    })
    const removedObjects = [...objects.value].filter(o => !newObjects.has(o))
    removedObjects.forEach(o => {
      objects.value.delete(o)
      ;(o as any)._object?.dispose()
      delete (o as any)._object
    })
  }

  scanInterval = setInterval(scanForFigures, 1000)
  onScopeDispose(() => {
    if (scanInterval) {
      clearInterval(scanInterval)
      scanInterval = null
    }
  })

  return reactive({
    objects,
    hovered,
    active
  })
}

export const OBJECT_SERVICE_KEY = createServiceKey(ObjectService)
