import { useEventListener } from '@vueuse/core'
import { reactive, ref, watch, type Ref } from 'vue'
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
    const slideElement = ref() as Ref<HTMLElement>
    const scale = ref(1)
    const rect = ref<DOMRect>()
    const left = ref(0)
    const top = ref(0)
    const width = ref(0)
    const height = ref(0)
    
    watch(() => slideElement.value, async (el) => {
        if (!el) {
            slideElement.value = await wait(no => document.querySelector('#slide-content') as HTMLElement ?? no)
        }
    }, { immediate: true })

    function updateSlide() {
        const newRect = slideElement.value.getBoundingClientRect()
        rect.value = newRect
        left.value = newRect.left
        top.value = newRect.top
        width.value = slideElement.value.clientWidth / scale.value
        height.value = slideElement.value.clientHeight / scale.value
        scale.value = newRect.width / slideElement.value!.clientWidth
    }

    watch( () => slideElement.value, () => {
        updateSlide()
    })

    useEventListener(window, 'resize', () => {
        updateSlide()
    })

    return reactive({
        slideElement,
        rect,
        scale,
        left,
        top,
        width,
        height,
    })
}
export const SLIDE_SERVICE_KEY = createServiceKey(SlideService)
