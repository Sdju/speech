import type { SlidePart } from './types'

export const VIRTUAL_INFO_ID = 'virtual:slides-parts-info'
export const VIRTUAL_API_ID = 'virtual:slides-parts-api'

export function resolveVirtualInfoId(id: string): string | undefined {
  if (id === VIRTUAL_INFO_ID) {
    return '\0' + VIRTUAL_INFO_ID
  }
}

export function resolveVirtualApiId(id: string): string | undefined {
  if (id === VIRTUAL_API_ID) {
    return '\0' + VIRTUAL_API_ID
  }
}

export function generateInfoModule(parts: SlidePart[]): string {
  return `export const slidesParts = ${JSON.stringify(parts, null, 2)};
export default slidesParts;`
}

export function generateApiModule(): string {
  return `
export const slidesPartsApi = {
  async renamePart(oldSrc, newName) {
    const response = await fetch('/__slides_parts_api/rename', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldSrc, newName })
    })
    return response.json()
  },
  
  async createPart(name, position) {
    const response = await fetch('/__slides_parts_api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, position })
    })
    return response.json()
  },
  
  async deletePart(src) {
    const response = await fetch('/__slides_parts_api/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ src })
    })
    return response.json()
  },
  
  async movePart(src, direction) {
    const response = await fetch('/__slides_parts_api/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ src, direction })
    })
    return response.json()
  },
  
  async toggleHide(src) {
    const response = await fetch('/__slides_parts_api/toggle-hide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ src })
    })
    return response.json()
  }
}

export default slidesPartsApi
`
}

