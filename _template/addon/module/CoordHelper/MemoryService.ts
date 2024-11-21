import { reactive } from 'vue'
import { createServiceKey } from '../VueServices/useDiContainer'

export const MemoryService = () => {
    const data = reactive({} as Record<string, any>)

    return reactive({
        data,
    })
}
export const MEMORY_SERVICE_KEY = createServiceKey(MemoryService)
