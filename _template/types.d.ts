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
  }
  
  export const slidesParts: SlidePart[]
  export default slidesParts
}

declare module 'virtual:slides-parts-api' {
  export interface RenameResult {
    success: boolean
    newPath?: string
    error?: string
  }
  
  export const slidesPartsApi: {
    renamePart(oldSrc: string, newName: string): Promise<RenameResult>
  }
  
  export default slidesPartsApi
}