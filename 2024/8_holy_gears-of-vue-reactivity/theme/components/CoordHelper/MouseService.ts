import { computed, reactive, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { SLIDE_SERVICE_KEY } from './SlideService'
import { Injector, createServiceKey } from '../VueServices/useDiContainer'

export const MouseService = (injector: Injector) => {
    const slideService = injector.inject(SLIDE_SERVICE_KEY)
    const mousePosX = ref(0)
    const mousePosY = ref(0)
    const inSlide = ref(false)
    const isMouseDown = ref(false)

    const localX = computed(() => (mousePosX.value - slideService.left) / slideService.scale)
    const localY = computed(() => (mousePosY.value - slideService.top) / slideService.scale)
    const localXPercent = computed(() => Math.round((localX.value / (slideService.width / slideService.scale)) * 100_00) / 100)
    const localYPercent = computed(() => Math.round((localY.value / (slideService.height / slideService.scale)) * 100_00) / 100)

    useEventListener(() => slideService.slideElement, 'mouseleave', () => {
        inSlide.value = false
    })
    useEventListener(() => slideService.slideElement, 'mouseenter', () => {
        inSlide.value = true
    })
    useEventListener(() => slideService.slideElement, 'mousedown', () => {
        isMouseDown.value = true
    })
    useEventListener(() => slideService.slideElement, 'mouseup', () => {
        isMouseDown.value = false
    })
    useEventListener(window, 'mousemove', (e) => {
        mousePosX.value = e.clientX
        mousePosY.value = e.clientY
    })

    function globalToLocal({x, y}: {x: number, y: number}) {
        return {
            x: (x - slideService.left) / slideService.scale,
            y: (y - slideService.top) / slideService.scale
        }
    }
    return reactive({
        globalX: computed(() => mousePosX.value),
        globalY: computed(() => mousePosY.value),
        inSlide: computed(() => inSlide.value),
        isDown: computed(() => isMouseDown.value),
        localX,
        localY,
        localXPercent,
        localYPercent,
        globalToLocal,
    })
}
export const MOUSE_SERVICE_KEY = createServiceKey(MouseService)
