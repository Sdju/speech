import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'

export const showTimelineEditor = useLocalStorage('slidev-show-timeline-editor', false, { listenToStorageChanges: false })
export const isTimelineEditorVertical = useLocalStorage('slidev-timeline-editor-vertical', false, { listenToStorageChanges: false })
export const timelineEditorWidth = useLocalStorage('slidev-timeline-editor-width', typeof window !== 'undefined' ? window.innerWidth * 0.3 : 400, { listenToStorageChanges: false })
export const timelineEditorHeight = useLocalStorage('slidev-timeline-editor-height', typeof window !== 'undefined' ? window.innerHeight * 0.3 : 250, { listenToStorageChanges: false })

export const currentTimelineStep = ref<number>(0)

