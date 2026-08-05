import { useEventListener } from '@vueuse/core'
import { onScopeDispose, reactive, ref, watch, type Ref } from 'vue'
import { createServiceKey } from '../VueServices/useDiContainer'

function wait<T>(ms: number | (<No>(no: No) => T | No)): Promise<T> {
    if (typeof ms === 'number') {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    return new Promise(resolve => {
        const no = Symbol()
        const intId = setInterval(() => {
            const result = ms(no)
            if (result !== no) {
                clearInterval(intId)
                resolve(result)
            }
        }, 100)
    })
}

export const SlideService = () => {
    const slideElement = ref() as Ref<HTMLElement | undefined>
    const scale = ref(1)
    const rect = ref<DOMRect>()
    const left = ref(0)
    const top = ref(0)
    const width = ref(0)
    const height = ref(0)
    /** Bumps whenever slide viewport metrics are refreshed. */
    const revision = ref(0)

    const observers: ResizeObserver[] = []

    function disconnectObservers() {
        while (observers.length) {
            observers.pop()!.disconnect()
        }
    }

    function observe(el: Element | null | undefined) {
        if (!el || typeof ResizeObserver === 'undefined')
            return
        const ro = new ResizeObserver(() => updateSlide())
        ro.observe(el)
        observers.push(ro)
    }

    function updateSlide() {
        const el = slideElement.value
        if (!el)
            return

        const newRect = el.getBoundingClientRect()
        const nextScale = el.clientWidth ? newRect.width / el.clientWidth : 1

        rect.value = newRect
        left.value = newRect.left
        top.value = newRect.top
        scale.value = nextScale
        // Logical slide size in unscaled CSS px (matches pos-* / $obj coords).
        width.value = el.clientWidth
        height.value = el.clientHeight
        revision.value++
    }

    function bindElement(el: HTMLElement) {
        disconnectObservers()
        updateSlide()
        // Parent / page-root change size when side panels open; transform-only
        // scale on #slide-content alone would not notify ResizeObserver.
        observe(el)
        observe(el.parentElement)
        observe(document.getElementById('page-root'))
    }

    watch(() => slideElement.value, async (el) => {
        if (!el) {
            slideElement.value = await wait(no => document.querySelector('#slide-content') as HTMLElement ?? no)
            return
        }
        bindElement(el)
    }, { immediate: true })

    useEventListener(window, 'resize', updateSlide)
    useEventListener(window, 'scroll', updateSlide, { capture: true, passive: true })

    onScopeDispose(() => {
        disconnectObservers()
    })

    return reactive({
        slideElement,
        rect,
        scale,
        left,
        top,
        width,
        height,
        revision,
        updateSlide,
    })
}
export const SLIDE_SERVICE_KEY = createServiceKey(SlideService)
