import { App, InjectionKey, inject, provide, useSlots } from "vue"

const xSlidesKey = Symbol('xSlides') as InjectionKey<XSlidesContext>

interface XSlidesContext {
  slots: Record<string, any>
}

export const useXSlides = () => {
  const slots = inject(xSlidesKey)

  const register = (name: string, slot: any) => {
    slots!.slots[name] = slot
  }

  return {
    register,
    slots: slots!.slots
  }
}

export const provideXSlides = (app: App) => {
  app.provide(xSlidesKey, { slots: {} })
}
