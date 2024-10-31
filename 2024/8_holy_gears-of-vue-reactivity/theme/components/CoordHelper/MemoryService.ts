import { reactive } from 'vue'
import { createServiceKey } from '../VueServices/useDiContainer'

export const MemoryService = () => {
    const memory = reactive({} as Record<string, any>)

    return {
        data: memory
    }
}
export const MEMORY_SERVICE_KEY = createServiceKey(MemoryService)
