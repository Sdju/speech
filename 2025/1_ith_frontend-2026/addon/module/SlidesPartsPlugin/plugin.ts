import type { Plugin, ViteDevServer } from 'vite'
import { FileOperations } from './file-operations'
import { parseSlidesParts } from './parser'
import { createApiMiddleware } from './middleware'
import {
  VIRTUAL_INFO_ID,
  VIRTUAL_API_ID,
  resolveVirtualInfoId,
  resolveVirtualApiId,
  generateInfoModule,
  generateApiModule
} from './virtual-modules'

export function createSlidesPartsPlugin(entryPath: string): Plugin {
  let server: ViteDevServer | undefined
  const fileOps = new FileOperations(entryPath)

  const invalidateModule = () => {
    if (server) {
      const module = server.moduleGraph.getModuleById('\0' + VIRTUAL_INFO_ID)
      if (module) {
        server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }
    }
  }

  return {
    name: 'slidev-slides-parts',

    configureServer(_server) {
      server = _server
      const middleware = createApiMiddleware(fileOps, invalidateModule)
      server.middlewares.use(middleware)
    },

    resolveId(id) {
      return resolveVirtualInfoId(id) || resolveVirtualApiId(id)
    },

    async load(id) {
      if (id === '\0' + VIRTUAL_INFO_ID) {
        const parts = await parseSlidesParts(entryPath)
        return generateInfoModule(parts)
      }

      if (id === '\0' + VIRTUAL_API_ID) {
        return generateApiModule()
      }
    }
  }
}

