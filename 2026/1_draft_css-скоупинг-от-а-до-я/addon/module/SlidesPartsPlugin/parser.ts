import { readFile } from 'node:fs/promises'
import type { SlidePart } from './types'

export async function parseSlidesParts(entryPath: string): Promise<SlidePart[]> {
  try {
    const content = await readFile(entryPath, 'utf-8')
    const parts = content.split('\n\n---').slice(1)
    
    const partsInfo = parts
      .map((part, index) => {
        const srcMatch = part.match(/\nsrc:\s*(.+\.md)\s*\n/)
        if (srcMatch) {
          const srcPath = srcMatch[1]
          const fileName = extractFileName(srcPath)
          const hidden = checkIfHidden(part)
          
          return {
            position: index + 1,
            name: fileName,
            src: srcPath,
            hidden
          }
        }
        return null
      })
      .filter((part): part is SlidePart => part !== null)
    
    return partsInfo
  } catch (error) {
    console.error('Ошибка при парсинге слайдов:', error)
    return []
  }
}

export function extractFileName(srcPath: string): string {
  return srcPath.split('/').pop()?.replace(/^\d+_/, '').replace('.md', '') || ''
}

export function extractFilePrefix(fileName: string): string {
  const prefixMatch = fileName.match(/^(\d+_)/)
  return prefixMatch ? prefixMatch[1] : ''
}

export function checkIfHidden(partContent: string): boolean {
  return /\nhide:\s*true\s*\n/.test(partContent)
}

