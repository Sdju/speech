import { useEventListener } from '@vueuse/core'
import { onMounted, ref, watch, type Ref } from 'vue'
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
    const scale = ref<number>(1)
    const rect = ref<DOMRect>()
    

    watch(() => slideElement.value, async (el) => {
        console.log('slideElement', slideElement)
        if (!el) {
            slideElement.value = await wait(no => document.querySelector('#slide-content') as HTMLElement ?? no)
        }
    }, { immediate: true })

    watch( () => slideElement.value, () => {
        rect.value = slideElement.value!.getBoundingClientRect()
        scale.value = rect.value!.width / slideElement.value!.clientWidth
    })

    useEventListener(window, 'resize', () => {
        rect.value = slideElement.value!.getBoundingClientRect()
        scale.value = rect.value!.width / slideElement.value!.clientWidth
    })

    return {
        slideElement,
        rect,
        scale
    }
}
export const SLIDE_SERVICE_KEY = createServiceKey(SlideService)