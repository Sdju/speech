export interface SlidePart {
  position: number
  name: string
  src: string
  hidden: boolean
}

export interface OperationResult {
  success: boolean
  newPath?: string
  error?: string
}

export interface RenameRequest {
  oldSrc: string
  newName: string
}

export interface CreateRequest {
  name: string
  position?: number
}

export interface DeleteRequest {
  src: string
}

export interface MoveRequest {
  src: string
  direction: 'up' | 'down'
}

export interface ToggleHideRequest {
  src: string
}

