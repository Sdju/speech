import { defineVitePluginsSetup } from '@slidev/types'
import { readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join, basename } from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'

export default defineVitePluginsSetup((options) => {
  const virtualModuleId = 'virtual:slides-parts-info'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  
  const virtualApiId = 'virtual:slides-parts-api'
  const resolvedVirtualApiId = '\0' + virtualApiId

  let server: ViteDevServer | undefined

  // Функции для работы с файловой системой
  const fsOperations = {
    async renamePartFile(oldSrc: string, newName: string) {
      try {
        const entryDir = dirname(options.entry)
        const oldPath = join(entryDir, oldSrc)
        const dir = dirname(oldPath)
        const oldFileName = basename(oldPath)
        
        // Сохраняем префикс с номером (например, "1_")
        const prefixMatch = oldFileName.match(/^(\d+_)/)
        const prefix = prefixMatch ? prefixMatch[1] : ''
        
        const newFileName = `${prefix}${newName}.md`
        const newPath = join(dir, newFileName)
        
        await rename(oldPath, newPath)
        
        // Обновляем содержимое slides.md
        const slidesContent = await readFile(options.entry, 'utf-8')
        const newSlidesContent = slidesContent.replace(
          `src: ${oldSrc}`,
          `src: ${oldSrc.replace(oldFileName, newFileName)}`
        )
        await writeFile(options.entry, newSlidesContent, 'utf-8')
        
        // Отправляем HMR обновление
        if (server) {
          const module = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
          if (module) {
            server.moduleGraph.invalidateModule(module)
            server.ws.send({
              type: 'full-reload'
            })
          }
        }
        
        return { success: true, newPath: oldSrc.replace(oldFileName, newFileName) }
      } catch (error) {
        console.error('Ошибка при переименовании файла:', error)
        return { success: false, error: String(error) }
      }
    }
  }

  const slidesPartsPlugin: Plugin = {
    name: 'slidev-slides-parts-info',
    
    configureServer(_server) {
      server = _server
      
      // Добавляем middleware для обработки API запросов
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/__slides_parts_api/')) {
          const action = req.url.split('/__slides_parts_api/')[1]
          
          if (action === 'rename' && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                const { oldSrc, newName } = JSON.parse(body)
                const result = await fsOperations.renamePartFile(oldSrc, newName)
                
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(result))
              } catch (error) {
                res.statusCode = 500
                res.end(JSON.stringify({ success: false, error: String(error) }))
              }
            })
            return
          }
        }
        next()
      })
    },
    
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
      if (id === virtualApiId) {
        return resolvedVirtualApiId
      }
    },
    
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        try {
          const entryPath = options.entry
          const content = await readFile(entryPath, 'utf-8')
          const parts = content.split('\n\n---').slice(1)
          
          // Извлекаем информацию о файлах из частей
          const partsInfo = parts
            .map((part, index) => {
              // Ищем строку src: ./parts/имя_файла.md
              const srcMatch = part.match(/\nsrc:\s*(.+\.md)\s*\n/)
              if (srcMatch) {
                const srcPath = srcMatch[1]
                // Извлекаем имя файла без пути и расширения
                const fileName = srcPath.split('/').pop()?.replace(/^\d+_/, '').replace('.md', '') || ''
                
                return {
                  position: index + 1,
                  name: fileName,
                  src: srcPath
                }
              }
              return null
            })
            .filter(Boolean)
          
          return `export const slidesParts = ${JSON.stringify(partsInfo, null, 2)};
export default slidesParts;`
        } catch (error) {
          console.error('Ошибка при чтении файла слайдов:', error)
          return `export const slidesParts = [];
export default slidesParts;`
        }
      }
      
      if (id === resolvedVirtualApiId) {
        // Экспортируем API для клиентского кода
        return `
export const slidesPartsApi = {
  async renamePart(oldSrc, newName) {
    const response = await fetch('/__slides_parts_api/rename', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldSrc, newName })
    })
    return response.json()
  }
}

export default slidesPartsApi
`
      }
    }
  }

  return [
    slidesPartsPlugin
  ]
})
