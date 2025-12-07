import type { Connect } from 'vite'
import type { ViteDevServer } from 'vite'
import { FileOperations } from './file-operations'
import type { RenameRequest, CreateRequest, DeleteRequest, MoveRequest, ToggleHideRequest } from './types'

export function createApiMiddleware(
  fileOps: FileOperations,
  invalidateModule: () => void
): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (!req.url?.startsWith('/__slides_parts_api/')) {
      return next()
    }

    const action = req.url.split('/__slides_parts_api/')[1]

    if (req.method !== 'POST') {
      res.statusCode = 405
      res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
      return
    }

    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const data = JSON.parse(body)
        let result

        switch (action) {
          case 'rename':
            result = await handleRename(fileOps, data)
            break
          case 'create':
            result = await handleCreate(fileOps, data)
            break
          case 'delete':
            result = await handleDelete(fileOps, data)
            break
          case 'move':
            result = await handleMove(fileOps, data)
            break
          case 'toggle-hide':
            result = await handleToggleHide(fileOps, data)
            break
          default:
            res.statusCode = 404
            res.end(JSON.stringify({ success: false, error: 'Unknown action' }))
            return
        }

        if (result.success) {
          invalidateModule()
        }

        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(result))
      } catch (error) {
        res.statusCode = 500
        res.end(JSON.stringify({ success: false, error: String(error) }))
      }
    })
  }
}

async function handleRename(fileOps: FileOperations, data: RenameRequest) {
  const { oldSrc, newName } = data
  return await fileOps.renamePartFile(oldSrc, newName)
}

async function handleCreate(fileOps: FileOperations, data: CreateRequest) {
  const { name, position } = data
  return await fileOps.createPartFile(name, position)
}

async function handleDelete(fileOps: FileOperations, data: DeleteRequest) {
  const { src } = data
  return await fileOps.deletePartFile(src)
}

async function handleMove(fileOps: FileOperations, data: MoveRequest) {
  const { src, direction } = data
  return await fileOps.movePartFile(src, direction)
}

async function handleToggleHide(fileOps: FileOperations, data: ToggleHideRequest) {
  const { src } = data
  return await fileOps.toggleHidePartFile(src)
}

