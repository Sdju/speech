import { InjectionKey, inject, provide, useSlots } from "vue"

const xSlidesKey = Symbol('xSlides') as InjectionKey<XSlidesContext>

interface XSlidesContext {
  slots: Record<string, ReturnType<typeof useSlots>>
}

export const useXSlides = () => {
  const slots = inject(xSlidesKey)

  const register = (name: string, slots: ReturnType<typeof useSlots>) => {
    slots.value![name] = slots
  }

  return {
    register,
  }
}

export const provideXSlides = () => {
  provide(xSlidesKey, { slots: {} })
}
