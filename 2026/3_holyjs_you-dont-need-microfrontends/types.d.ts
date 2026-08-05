declare module '*.glsl?raw' {
  const content: string
  export default content
}
declare module '*.png' {
  const url: string
  export default url
}

// Виртуальные модули для работы с частями слайдов
declare module 'virtual:slides-parts-info' {
  export interface SlidePart {
    position: number
    name: string
    src: string
    hidden: boolean
  }
  
  export const slidesParts: SlidePart[]
  export default slidesParts
}

declare module 'virtual:slides-parts-api' {
  export interface OperationResult {
    success: boolean
    newPath?: string
    error?: string
  }
  
  export const slidesPartsApi: {
    renamePart(oldSrc: string, newName: string): Promise<OperationResult>
    createPart(name: string, position?: number): Promise<OperationResult>
    deletePart(src: string): Promise<OperationResult>
    movePart(src: string, direction: 'up' | 'down'): Promise<OperationResult>
    toggleHide(src: string): Promise<OperationResult>
  }
  
  export default slidesPartsApi
}