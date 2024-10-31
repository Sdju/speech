import { computed, reactive, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { SLIDE_SERVICE_KEY } from './SlideService'
import { useDi, createServiceKey } from '../VueServices/useDiContainer'

export const MouseService = (injector: ReturnType<typeof useDi>) => {
    const slideService = injector.inject(SLIDE_SERVICE_KEY)
    const mousePosX = ref(0)
    const mousePosY = ref(0)
    const inSlide = ref(false)
    const isMouseDown = ref(false)
    const { rect, scale, slideElement } = slideService

    const localX = computed(() => (mousePosX.value - (rect.value?.left ?? 0)) / scale.value)
    const localY = computed(() => (mousePosY.value - (rect.value?.top ?? 0)) / scale.value)
    const localXPercent = computed(() => Math.round((localX.value / ((rect.value?.width ?? 0) / scale.value)) * 100_00) / 100)
    const localYPercent = computed(() => Math.round((localY.value / ((rect.value?.height ?? 0) / scale.value)) * 100_00) / 100)
    
    const mouse = reactive({
        globalX: computed(() => mousePosX.value),
        globalY: computed(() => mousePosY.value),
        inSlide: computed(() => inSlide.value),
        isDown: computed(() => isMouseDown.value),
        localX,
        localY,
        localXPercent,
        localYPercent,
    })

    useEventListener(slideElement, 'mouseleave', () => {
        inSlide.value = false
    })
    useEventListener(slideElement, 'mouseenter', () => {
        inSlide.value = true
    })
    useEventListener(window, 'mousemove', (e) => {
        mousePosX.value = e.clientX
        mousePosY.value = e.clientY
    })
    useEventListener(slideElement, 'mousedown', () => {
        isMouseDown.value = true
    })
    useEventListener(slideElement, 'mouseup', () => {
        isMouseDown.value = false
    })
    return mouse
}
export const MOUSE_SERVICE_KEY = createServiceKey(MouseService)
