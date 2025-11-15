import { useLocalStorage } from '@vueuse/core'

export const showPartsManager = useLocalStorage('slidev-show-parts-manager', false, { listenToStorageChanges: false })
export const isPartsManagerVertical = useLocalStorage('slidev-parts-manager-vertical', false, { listenToStorageChanges: false })
export const partsManagerWidth = useLocalStorage('slidev-parts-manager-width', typeof window !== 'undefined' ? window.innerWidth * 0.3 : 400, { listenToStorageChanges: false })
export const partsManagerHeight = useLocalStorage('slidev-parts-manager-height', typeof window !== 'undefined' ? window.innerHeight * 0.4 : 300, { listenToStorageChanges: false })

