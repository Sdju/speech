/**
 * Мир доклада: планеты, спутники-модули и пресеты камеры.
 *
 * Камера задаётся во frontmatter слайда или в шаге timeline:
 *
 *   camera: title                      # имя пресета
 *   camera: { preset: title, yaw: 20 } # пресет + переопределения
 *   camera: { focus: catalog, distance: 7, yaw: -30, pitch: 10, shift: [0.9, 0] }
 *   camera: keep                       # оставить камеру предыдущего слайда
 *
 * Слайд без `camera` получает пресет `ambient` — все тела за кадром, только звёзды.
 * В timeline `camera` шага — полная спецификация поверх frontmatter-камеры слайда;
 * между шагами не накапливается: действует последний шаг с `camera` до текущего клика.
 *
 *   focus     — id планеты/спутника, `station`, `station.<модуль>` или точка [x, y, z]
 *   distance  — расстояние от центра фокуса в радиусах тела (для точки — в мировых единицах)
 *   yaw/pitch — градусы; yaw 0 = смотрим с +Z, pitch > 0 = сверху
 *   shift     — где фокус окажется в кадре: [x, y] в единицах высоты кадра / 2 (x ∈ ±1.78)
 *   fov       — фокусное расстояние (больше = уже угол)
 *   spin      — облёт вокруг фокуса, градусов в секунду
 *   follow    — world | orbit: ракурс относительно мира или орбиты спутника
 *   duration  — длительность перелёта к этой камере, секунд
 */

export type Vec3 = [number, number, number]

export interface PlanetDef {
  id: string
  pos: Vec3
  radius: number
  color: Vec3
  /** ось вращения = нормаль плоскости колец и орбит */
  axis: Vec3
  /** скорость вращения, рад/с */
  spin: number
  ring?: { inner: number, outer: number }
  /** радиус орбиты спутников (в мировых единицах), 0 — без орбиты */
  orbit?: number
  style: 'gas' | 'rocky'
}

export interface SatelliteDef {
  id: string
  parent: string
  radius: number
  color: Vec3
  /** начальная фаза, рад */
  phase: number
  /** угловая скорость по орбите, рад/с */
  speed: number
  /** собственное вращение поверхности сверх приливного захвата, рад/с */
  spin?: number
}

export interface CameraSpec {
  preset?: string
  focus?: string | Vec3
  distance?: number
  yaw?: number
  pitch?: number
  shift?: [number, number]
  fov?: number
  spin?: number
  /**
   * world — yaw/pitch относительно мира (по умолчанию);
   * orbit — относительно орбиты спутника: yaw 0 = снаружи орбиты, планета за спутником.
   * Камера облетает планету вместе со спутником, фаза освещения меняется.
   */
  follow?: 'world' | 'orbit'
  duration?: number
}

const tilt = (ang: number, z: number): Vec3 => [Math.sin(ang) * 0.95, Math.cos(ang) * 0.95, z]

export const planets: PlanetDef[] = [
  {
    id: 'home',
    pos: [0, 0, 0],
    radius: 1,
    color: [0.66, 0.33, 0.97],
    axis: tilt(-0.32, 0.3),
    spin: 0.035,
    ring: { inner: 1.32, outer: 2.05 },
    orbit: 2.3,
    style: 'gas',
  },
  {
    id: 'ocean',
    pos: [-11, 2.5, -16],
    radius: 0.85,
    color: [0.16, 0.46, 0.95],
    axis: tilt(0.25, 0.1),
    spin: 0.05,
    orbit: 1.7,
    style: 'rocky',
  },
  {
    id: 'ember',
    pos: [16, -3, -30],
    radius: 1.6,
    color: [0.98, 0.55, 0.2],
    axis: tilt(0.5, 0.35),
    spin: 0.02,
    ring: { inner: 2.0, outer: 2.6 },
    style: 'gas',
  },
]

export const satellites: SatelliteDef[] = [
  { id: 'catalog', parent: 'home', radius: 0.065, color: [0.2, 0.83, 0.6], phase: 0.6, speed: 0.16 },
  { id: 'search', parent: 'home', radius: 0.065, color: [0.38, 0.65, 0.98], phase: 1.15, speed: 0.16 },
  { id: 'cart', parent: 'home', radius: 0.065, color: [0.96, 0.45, 0.71], phase: 1.7, speed: 0.16 },
  { id: 'moon', parent: 'ocean', radius: 0.12, color: [0.8, 0.82, 0.9], phase: 0, speed: 0.1 },
]

export const presets: Record<string, CameraSpec> = {
  /** титул: планета справа сверху, место под заголовок слева */
  title: { focus: 'home', distance: 5, yaw: 0, pitch: 0, shift: [1.0, 0.31], fov: 2.35 },
  /** обзор системы по центру */
  system: { focus: 'home', distance: 7.5, yaw: 0, pitch: 6, shift: [0, 0], fov: 2.35 },
  /**
   * всё за кадром — только звёзды; для текстовых слайдов.
   * Точка в стороне от планет: перелёт туда не проходит сквозь тела,
   * сдвиг объектива 0 — иначе широкоугольно растягиваются звёзды.
   */
  ambient: { focus: [60, 40, -120], distance: 10, yaw: 0, pitch: 0, shift: [0, 0], fov: 2.35 },
}

export const DEFAULT_PRESET = 'ambient'
export const DEFAULT_DURATION = 1.8

// ── модульная станция = продукт на микрофронтендах ─────────────────
//
// Хаб (host/shell) с шестью стыковочными портами; модули — команды/микрофронтенды.
// Состояние задаётся во frontmatter или шаге timeline и «прилипает» к следующим слайдам:
//
//   station: { detached: [cart] }          # cart отстыкован и висит рядом
//   station: { hidden: [profile, search] } # модулей ещё/уже нет
//   station: {}                            # все пристыкованы
//
// Камера наводится на станцию `focus: station` или на модуль `focus: station.cart`.

export type Port = '+x' | '-x' | '+z' | '-z' | '-y'

export interface ModuleDef {
  id: string
  port: Port
  color: Vec3
  /** длина модуля, в радиусах корпуса */
  length: number
  kind: 'lab' | 'hab' | 'cargo'
}

export interface StationSpec {
  detached?: string[]
  hidden?: string[]
  duration?: number
}

export const station = {
  id: 'station',
  pos: [-3.6, -0.55, 2.2] as Vec3,
  /** масштаб для камеры: distance в `camera` считается в этих единицах */
  radius: 0.45,
  /** медленное вращение вокруг вертикали, рад/с */
  spin: 0.025,
  modules: [
    { id: 'catalog', port: '+x', color: [0.2, 0.83, 0.6], length: 5.5, kind: 'lab' },
    { id: 'search', port: '-x', color: [0.38, 0.65, 0.98], length: 4.5, kind: 'lab' },
    { id: 'cart', port: '+z', color: [0.96, 0.45, 0.71], length: 3.6, kind: 'hab' },
    { id: 'checkout', port: '-z', color: [0.66, 0.4, 0.97], length: 3.2, kind: 'cargo' },
    { id: 'profile', port: '-y', color: [0.98, 0.64, 0.25], length: 2.8, kind: 'hab' },
  ] as ModuleDef[],
}

export const DEFAULT_STATION_DURATION = 2.2
