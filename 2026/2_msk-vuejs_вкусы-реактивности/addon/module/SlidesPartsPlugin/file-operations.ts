import { readFile, writeFile, rename, unlink } from 'node:fs/promises'
import { dirname, join, basename } from 'node:path'
import type { OperationResult } from './types'
import { extractFilePrefix } from './parser'

export class FileOperations {
  constructor(private entryPath: string) {}

  async renamePartFile(oldSrc: string, newName: string): Promise<OperationResult> {
    try {
      const entryDir = dirname(this.entryPath)
      const oldPath = join(entryDir, oldSrc)
      const dir = dirname(oldPath)
      const oldFileName = basename(oldPath)
      
      const prefix = extractFilePrefix(oldFileName)
      const newFileName = `${prefix}${newName}.md`
      const newPath = join(dir, newFileName)
      
      await rename(oldPath, newPath)
      
      const slidesContent = await readFile(this.entryPath, 'utf-8')
      const newSlidesContent = slidesContent.replace(
        `src: ${oldSrc}`,
        `src: ${oldSrc.replace(oldFileName, newFileName)}`
      )
      await writeFile(this.entryPath, newSlidesContent, 'utf-8')
      
      return { 
        success: true, 
        newPath: oldSrc.replace(oldFileName, newFileName) 
      }
    } catch (error) {
      console.error('Ошибка при переименовании файла:', error)
      return { success: false, error: String(error) }
    }
  }

  async createPartFile(name: string, position?: number): Promise<OperationResult> {
    try {
      const entryDir = dirname(this.entryPath)
      const partsDir = join(entryDir, 'parts')
      
      const slidesContent = await readFile(this.entryPath, 'utf-8')
      const existingParts = slidesContent.match(/src:\s*\.\/parts\/(\d+)_/g) || []
      
      const nextNumber = existingParts.length > 0
        ? Math.max(...existingParts.map(p => parseInt(p.match(/(\d+)_/)?.[1] || '0'))) + 1
        : 1
      
      const fileName = `${nextNumber}_${name}.md`
      const filePath = join(partsDir, fileName)
      const relativePath = `./parts/${fileName}`
      
      const fileContent = `# ${name}\n\nСодержимое части слайдов "${name}"\n`
      await writeFile(filePath, fileContent, 'utf-8')
      
      const slideEntry = `\n\n---\nsrc: ${relativePath}\n---`
      
      let newSlidesContent: string
      if (position !== undefined && position > 0) {
        const parts = slidesContent.split('\n\n---')
        parts.splice(position + 1, 0, slideEntry)
        newSlidesContent = parts.join('\n\n---')
      } else {
        newSlidesContent = slidesContent + slideEntry
      }
      
      await writeFile(this.entryPath, newSlidesContent, 'utf-8')
      
      return { 
        success: true, 
        newPath: relativePath 
      }
    } catch (error) {
      console.error('Ошибка при создании файла:', error)
      return { success: false, error: String(error) }
    }
  }

  async deletePartFile(src: string): Promise<OperationResult> {
    try {
      const entryDir = dirname(this.entryPath)
      const filePath = join(entryDir, src)
      
      await unlink(filePath)
      
      const slidesContent = await readFile(this.entryPath, 'utf-8')
      const partRegex = new RegExp(`\\n\\n---\\nsrc:\\s*${src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n---`, 'g')
      const newSlidesContent = slidesContent.replace(partRegex, '')
      
      await writeFile(this.entryPath, newSlidesContent, 'utf-8')
      
      return { success: true }
    } catch (error) {
      console.error('Ошибка при удалении файла:', error)
      return { success: false, error: String(error) }
    }
  }

  async movePartFile(src: string, direction: 'up' | 'down'): Promise<OperationResult> {
    try {
      const slidesContent = await readFile(this.entryPath, 'utf-8')
      const parts = slidesContent.split('\n\n---')
      
      const partIndex = parts.findIndex(part => part.includes(`src: ${src}`))
      
      if (partIndex === -1) {
        return { success: false, error: 'Часть не найдена' }
      }
      
      if (partIndex === 0) {
        return { success: false, error: 'Нельзя переместить заголовочную часть' }
      }
      
      const targetIndex = direction === 'up' ? partIndex - 1 : partIndex + 1
      
      if (targetIndex === 0) {
        return { success: false, error: 'Нельзя переместить часть перед заголовком' }
      }
      
      if (targetIndex >= parts.length) {
        return { success: false, error: 'Это последняя часть' }
      }
      
      const temp = parts[partIndex]
      parts[partIndex] = parts[targetIndex]
      parts[targetIndex] = temp
      
      const newSlidesContent = parts.join('\n\n---')
      await writeFile(this.entryPath, newSlidesContent, 'utf-8')
      
      return { success: true }
    } catch (error) {
      console.error('Ошибка при перемещении части:', error)
      return { success: false, error: String(error) }
    }
  }

  async toggleHidePartFile(src: string): Promise<OperationResult> {
    try {
      const slidesContent = await readFile(this.entryPath, 'utf-8')
      const parts = slidesContent.split('\n\n---')
      
      const partIndex = parts.findIndex(part => part.includes(`src: ${src}`))
      
      if (partIndex === -1) {
        return { success: false, error: 'Часть не найдена' }
      }
      
      let partContent = parts[partIndex]
      const hasHide = /\nhide:\s*true\s*\n/.test(partContent)
      
      if (hasHide) {
        partContent = partContent.replace(/\nhide:\s*true\s*\n/, '\n')
      } else {
        const srcMatch = partContent.match(/(\nsrc:\s*.+\.md\s*\n)/)
        if (srcMatch) {
          partContent = partContent.replace(srcMatch[1], `${srcMatch[1].trimEnd()}\nhide: true\n`)
        }
      }
      
      parts[partIndex] = partContent
      const newSlidesContent = parts.join('\n\n---')
      await writeFile(this.entryPath, newSlidesContent, 'utf-8')
      
      return { success: true }
    } catch (error) {
      console.error('Ошибка при переключении скрытия:', error)
      return { success: false, error: String(error) }
    }
  }
}

