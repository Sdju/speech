import { shallowRef } from 'vue'
import type { Mode } from './station'

export interface ModuleScreen {
  /** центр модуля, доли канваса 0..1 */
  module: [number, number]
  /** точка стыковки на хабе */
  port: [number, number]
  mode: Mode
  /** модуль не спрятан за хабом */
  front: boolean
}

/**
 * Экранные позиции модулей станции, обновляются каждый кадр, пока станция в кадре.
 * null — станции в кадре нет. Канвас сцены совпадает с областью слайда,
 * поэтому доли переводятся в координаты слайда умножением на его размер.
 */
export const stationScreen = shallowRef<Record<string, ModuleScreen> | null>(null)
