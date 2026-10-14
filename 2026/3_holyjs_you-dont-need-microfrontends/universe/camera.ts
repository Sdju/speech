import type { CameraSpec, Vec3 } from './scene'
import type { StationSpec } from './scene'
import { DEFAULT_DURATION, DEFAULT_PRESET, DEFAULT_STATION_DURATION, orbitsOf, partCameras, planets, presets, satellites, station, SUN_DIR } from './scene'

// ── векторная мелочь ───────────────────────────────────────────────

export const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
export const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
export const mul = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k]
export const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
export const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
export const len = (a: Vec3) => Math.sqrt(dot(a, a))
export const norm = (a: Vec3): Vec3 => mul(a, 1 / (len(a) || 1))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
const deg = Math.PI / 180

/** Базис плоскости колец — тот же, что в шейдере */
export function planeBasis(axis: Vec3): [Vec3, Vec3, Vec3] {
  const n = norm(axis)
  let e1 = cross(n, [0, 0, 1])
  if (len(e1) < 1e-3)
    e1 = [1, 0, 0]
  e1 = norm(e1)
  return [n, e1, cross(e1, n)]
}

type Spec = Required<Omit<CameraSpec, 'preset'>>

// ── мир во времени ─────────────────────────────────────────────────

export interface BodyState {
  pos: Vec3
  radius: number
  /** для модулей станции: куда модуль смотрит от хаба (мировые координаты) */
  dir?: Vec3
}

export function satellitePos(id: string, time: number): Vec3 | undefined {
  const s = satellites.find(s => s.id === id)
  if (!s)
    return
  const p = planets.find(p => p.id === s.parent)!
  const [, e1, e2] = planeBasis(p.axis)
  const a = time * s.speed + s.phase
  return add(p.pos, mul(add(mul(e1, Math.cos(a)), mul(e2, Math.sin(a))), s.orbit ?? p.orbit ?? 2))
}

/**
 * Поворот поверхности спутника: приливный захват (одна сторона к планете —
 * поворачивается вместе с орбитой) + собственное вращение. Ось = ось орбиты.
 */
export function satelliteRotation(id: string, time: number): { axis: Vec3, angle: number } | undefined {
  const s = satellites.find(s => s.id === id)
  if (!s)
    return
  const p = planets.find(p => p.id === s.parent)!
  const orbitAngle = time * s.speed + s.phase
  return { axis: norm(p.axis), angle: -orbitAngle - time * (s.spin ?? 0.125) }
}

/** Орбитальный базис спутника: наружу от планеты, ось орбиты, по ходу движения */
export function orbitFrame(id: string, time: number): { radial: Vec3, axis: Vec3, tangent: Vec3 } | undefined {
  const s = satellites.find(s => s.id === id)
  if (!s)
    return
  const p = planets.find(p => p.id === s.parent)!
  const axis = norm(p.axis)
  const radial = norm(sub(satellitePos(id, time)!, p.pos))
  return { radial, axis, tangent: cross(axis, radial) }
}

/**
 * Позиции станции и модулей живут в three.js-слое (анимации стыковки) —
 * он регистрирует здесь резолвер, чтобы камера могла на них навестись.
 */
let stationResolver: ((id: string) => BodyState | undefined) | null = null
export function setStationResolver(fn: typeof stationResolver) {
  stationResolver = fn
}

export function bodyAt(focus: string | Vec3 | undefined, time: number): BodyState {
  if (Array.isArray(focus))
    return { pos: focus, radius: 1 }
  if (typeof focus === 'string' && (focus === station.id || focus.startsWith(`${station.id}.`))) {
    return stationResolver?.(focus) ?? { pos: station.pos, radius: station.radius }
  }
  const p = planets.find(p => p.id === focus)
  if (p)
    return { pos: p.pos, radius: p.radius }
  const s = satellites.find(s => s.id === focus)
  if (s)
    return { pos: satellitePos(s.id, time)!, radius: s.radius }
  return { pos: [0, 0, 0], radius: 1 }
}

// ── какая камера нужна слайду ──────────────────────────────────────

type RawCamera = string | CameraSpec | undefined

/** timeline deepMerge превращает массивы в объекты {0: …, 1: …} — возвращаем массив */
function toArray<T extends number[]>(v: unknown): T | undefined {
  if (v == null || typeof v === 'string')
    return v as undefined
  if (Array.isArray(v))
    return v.map(Number) as T
  if (typeof v === 'object')
    return Object.keys(v as object).sort().map(k => Number((v as any)[k])) as T
  return undefined
}

function fix(spec: CameraSpec): CameraSpec {
  const out = { ...spec }
  if (out.shift !== undefined)
    out.shift = toArray<[number, number]>(out.shift)
  if (out.focus !== undefined && typeof out.focus !== 'string')
    out.focus = toArray<Vec3>(out.focus)
  return out
}

function expand(raw: RawCamera): CameraSpec {
  return fix(expandRaw(raw))
}

function expandRaw(raw: RawCamera): CameraSpec {
  if (!raw || raw === 'keep')
    return {}
  if (typeof raw === 'string')
    return { ...presets[raw] }
  const base = raw.preset ? presets[raw.preset] ?? {} : {}
  const { preset: _, ...rest } = raw
  return { ...base, ...rest }
}

interface SlideLike { meta?: { slide?: { frontmatter?: Record<string, any>, filepath?: string } } }

/** камера части доклада по имени файла: parts/2_what-is-mfe.md → what-is-mfe */
function partCamera(slide: SlideLike | undefined): RawCamera {
  const file = slide?.meta?.slide?.filepath?.split(/[\\/]/).pop()?.replace(/\.md$/, '').replace(/^\d+_/, '')
  return file ? partCameras[file] : undefined
}

function slideCamera(slide: SlideLike | undefined, click: number | 'last'): RawCamera | null {
  const fm = slide?.meta?.slide?.frontmatter ?? {}
  const steps = Array.isArray(fm.timeline) ? fm.timeline : []
  const fromTimeline = steps.some((s: any) => s && 'camera' in s)
  const own = fm.camera ?? partCamera(slide)
  if (own === undefined && !fromTimeline)
    return null

  let spec = expand(own === 'keep' ? undefined : own)
  if (fromTimeline) {
    // камера в шаге не накапливается: действует последний шаг с `camera` до текущего клика
    const last = click === 'last' ? steps.length - 1 : Math.min(click, steps.length - 1)
    for (let i = last; i >= 0; i--) {
      if (steps[i] && 'camera' in steps[i]) {
        spec = { ...spec, ...expand(steps[i].camera) }
        break
      }
    }
  }
  if (own === 'keep' && !fromTimeline)
    return 'keep'
  return spec
}

/**
 * Камера для слайда `no` (1-based) на клике `click`.
 * `keep` и пустой `camera: keep` берут итоговую камеру предыдущего слайда.
 */
function resolveRaw(slides: SlideLike[], no: number, click: number): Required<Omit<CameraSpec, 'preset'>> {
  let raw = slideCamera(slides[no - 1], click)
  for (let i = no - 1; raw === 'keep' && i >= 1; i--)
    raw = slideCamera(slides[i - 1], 'last')
  const spec = raw && raw !== 'keep' ? raw as CameraSpec : expand(DEFAULT_PRESET)
  const d = presets[DEFAULT_PRESET]
  return {
    focus: spec.focus ?? d.focus!,
    distance: spec.distance ?? d.distance!,
    yaw: spec.yaw ?? 0,
    pitch: spec.pitch ?? 0,
    shift: spec.shift ?? [0, 0],
    fov: spec.fov ?? d.fov!,
    spin: spec.spin ?? 0,
    follow: spec.follow ?? 'world',
    duration: spec.duration ?? DEFAULT_DURATION,
    hold: spec.hold ?? false,
    face: spec.face ?? '',
    exact: spec.exact ?? false,
  }
}

// ── детерминированный ракурс слайда ────────────────────────────────
//
// Ракурс каждого (слайд, клик) вычисляется один раз, в порядке доклада, от ракурса предыдущего шага:
// он ближе к нему по повороту, но не зависит от того, как зритель пришёл на слайд —
// вернувшись назад, он увидит ровно тот же кадр.

/** на сколько камера может довернуть yaw/pitch слайда, чтобы сократить поворот от предыдущего шага */
const YAW_FLEX = 60
const PITCH_FLEX = 8
const FLEX_COST = 0.35
/** `hold`: шаг поворота камеры на месте, градусы; берём минимальный угол, при котором в кадре нет объектов */
const HOLD_TURN_STEP = 5
const HOLD_TURN_MAX = 100
/** запас по ширине кадра при проверке видимости объектов на `hold` */
const HOLD_ASPECT = 1.8

const PORT_DIR: Record<string, Vec3> = { '+x': [1, 0, 0], '-x': [-1, 0, 0], '+z': [0, 0, 1], '-z': [0, 0, -1], '-y': [0, -1, 0] }

/** направление модуля от хаба при нулевом времени — не зависит от живой сцены */
function staticModuleDir(focus: string): Vec3 | undefined {
  const m = station.modules.find(m => `${station.id}.${m.id}` === focus)
  if (!m)
    return
  const [x, y, z] = PORT_DIR[m.port]
  const a = stationYaw(0)
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)]
}

const turnDeg = (a: Vec3, b: Vec3) => Math.acos(Math.max(-1, Math.min(1, dot(a, b)))) / deg

/** положение и размер тела без живой сцены: для детерминированных расчётов ракурсов */
function staticBody(focus: string | Vec3): BodyState {
  if (Array.isArray(focus))
    return { pos: focus, radius: 1 }
  if (focus === station.id || focus.startsWith(`${station.id}.`))
    return { pos: station.pos, radius: station.radius }
  return bodyAt(focus, 0)
}

/**
 * Попадает ли в кадр хоть одно тело (сфера с запасом). Угловой критерий вместо проекции:
 * работает и для тел рядом с камерой, где проекция вырождается.
 */
function anyBodyInView(eye: Vec3, fwd: Vec3, shift: [number, number], fov: number): boolean {
  const right = norm(cross(fwd, Math.abs(fwd[1]) > 0.999 ? [0, 0, -1] : [0, 1, 0]))
  const up = cross(right, fwd)
  const bounds = planets.map(p => [p.pos, Math.max(p.radius * 1.3, p.ring?.outer ?? 0, Math.max(0, ...orbitsOf(p)) + 0.2)] as [Vec3, number])
  bounds.push([station.pos, station.radius * 2.5])
  return bounds.some(([pos, radius]) => {
    const v = sub(pos, eye)
    const d = len(v)
    if (d <= radius)
      return true
    const beta = Math.acos(Math.max(-1, Math.min(1, dot(v, fwd) / d)))
    // полуугол кадра в направлении на тело: окно |x/z·fov + shift| < aspect, |y/z·fov + shift| < 1
    const px = dot(v, right)
    const py = dot(v, up)
    const pl = Math.hypot(px, py) || 1
    const ux = px / pl
    const uy = py / pl
    const edge = (u: number, lo: number, hi: number) => Math.abs(u) < 1e-6 ? Infinity : (u > 0 ? hi : lo) / u
    const t = Math.min(
      edge(ux, (-HOLD_ASPECT - shift[0]) / fov, (HOLD_ASPECT - shift[0]) / fov),
      edge(uy, (-1 - shift[1]) / fov, (1 - shift[1]) / fov),
    )
    return beta < Math.atan(t) + Math.asin(Math.min(1, radius / d)) + 0.05
  })
}

/**
 * Слайд без объектов в кадре: камера остаётся на месте и поворачивается на минимальный угол,
 * при котором в кадре остаются одни звёзды. Дистанция та же, облёта нет.
 */
function holdSpec(prev: Spec, hold: Spec): Spec {
  const body = staticBody(prev.focus)
  const dist = prev.distance * (Array.isArray(prev.focus) ? 1 : body.radius)
  const dir = specDir(prev, 0, 0, true)
  const eye = add(body.pos, mul(dir, dist))
  const fwd = mul(dir, -1)
  const right = norm(cross(fwd, Math.abs(fwd[1]) > 0.999 ? [0, 0, -1] : [0, 1, 0]))
  const up = cross(right, fwd)
  // направления поворота по предпочтению: вверх, вправо, влево, вниз
  const sides: Vec3[] = [up, right, mul(right, -1), mul(up, -1)]
  for (let a = HOLD_TURN_STEP; a <= HOLD_TURN_MAX; a += HOLD_TURN_STEP) {
    for (const side of sides) {
      const f = norm(add(mul(fwd, Math.cos(a * deg)), mul(side, Math.sin(a * deg))))
      if (anyBodyInView(eye, f, prev.shift, prev.fov))
        continue
      return {
        ...prev,
        focus: add(eye, mul(f, dist)),
        follow: 'world',
        distance: dist,
        yaw: Math.atan2(-f[0], -f[2]) / deg,
        pitch: Math.asin(-f[1]) / deg,
        fov: hold.fov,
        spin: 0,
        duration: hold.duration,
        hold: true,
      }
    }
  }
  return { ...prev, shift: hold.shift, fov: hold.fov, duration: hold.duration, hold: true }
}

const canonCache = new WeakMap<object, Map<string, Spec>>()

function canonical(slides: SlideLike[]): Map<string, Spec> {
  const out = new Map<string, Spec>()
  /** последний «настоящий» кадр (не hold) и его направление: следующий слайд подгоняется под него */
  let real: Spec | null = null
  let realDir: Vec3 | null = null
  let held: Spec | null = null
  slides.forEach((slide, i) => {
    const steps = slide?.meta?.slide?.frontmatter?.timeline
    const n = Math.max(1, Array.isArray(steps) ? steps.length : 1)
    for (let c = 0; c < n; c++) {
      let spec = resolveRaw(slides, i + 1, c)
      if (real && realDir) {
        if (spec.hold) {
          held = held ?? holdSpec(real, spec)
          out.set(`${i + 1}.${c}`, held)
          continue
        }
        let best = Infinity
        let pick = spec
        const yawFlex = spec.exact ? 0 : YAW_FLEX
        const pitchFlex = spec.exact ? 0 : PITCH_FLEX
        for (let dy = -yawFlex; dy <= yawFlex; dy += 5) {
          for (let dp = -pitchFlex; dp <= pitchFlex; dp += 4) {
            const cand = { ...spec, yaw: spec.yaw + dy, pitch: spec.pitch + dp }
            const cost = turnDeg(realDir, specDir(cand, 0, 0, true)) + FLEX_COST * (Math.abs(dy) + Math.abs(dp))
            if (cost < best) {
              best = cost
              pick = cand
            }
          }
        }
        spec = pick
      }
      held = null
      out.set(`${i + 1}.${c}`, spec)
      if (!spec.hold) {
        real = spec
        realDir = specDir(spec, 0, 0, true)
      }
    }
  })
  return out
}

/**
 * Камера для слайда `no` (1-based) на клике `click`.
 * Ракурс подогнан под предыдущий шаг (см. выше) и не зависит от маршрута зрителя.
 */
export function resolveCamera(slides: SlideLike[], no: number, click: number): Spec {
  let map = canonCache.get(slides)
  if (!map) {
    map = canonical(slides)
    canonCache.set(slides, map)
  }
  const steps = slides[no - 1]?.meta?.slide?.frontmatter?.timeline
  const n = Math.max(1, Array.isArray(steps) ? steps.length : 1)
  return map.get(`${no}.${Math.max(0, Math.min(click, n - 1))}`) ?? resolveRaw(slides, no, click)
}

// ── состояние станции ──────────────────────────────────────────────

export interface StationState { detached: string[], hidden: string[], blueprint: boolean, mf: boolean, snap: boolean, glow: boolean, duration: number, delay: number }

function stationOf(slide: SlideLike | undefined, click: number | 'last'): StationSpec | null {
  const fm = slide?.meta?.slide?.frontmatter ?? {}
  const steps = Array.isArray(fm.timeline) ? fm.timeline : []
  const last = click === 'last' ? steps.length - 1 : Math.min(click, steps.length - 1)
  for (let i = last; i >= 0; i--) {
    if (steps[i] && 'station' in steps[i])
      return steps[i].station ?? {}
  }
  return fm.station === undefined ? null : (fm.station ?? {})
}

/** Состояние станции «прилипает»: действует последнее заданное на этом или предыдущих слайдах. */
export function resolveStation(slides: SlideLike[], no: number, click: number): StationState {
  let spec = stationOf(slides[no - 1], click)
  for (let i = no - 1; spec === null && i >= 1; i--)
    spec = stationOf(slides[i - 1], 'last')
  const list = (v: unknown) => (Array.isArray(v) ? v : typeof v === 'object' && v ? Object.values(v) : []).map(String)
  return {
    detached: list(spec?.detached),
    hidden: list(spec?.hidden),
    blueprint: spec?.blueprint === true || String(spec?.blueprint) === 'true',
    mf: spec?.mf === true || String(spec?.mf) === 'true',
    snap: spec?.snap === true || String(spec?.snap) === 'true',
    glow: spec?.glow === true || String(spec?.glow) === 'true',
    duration: spec?.duration ?? DEFAULT_STATION_DURATION,
    delay: Number(spec?.delay ?? 0),
  }
}

// ── полёт камеры ───────────────────────────────────────────────────

export interface Pose {
  target: Vec3
  /** единичный вектор от цели к камере */
  dir: Vec3
  /** мировые единицы */
  dist: number
  shift: [number, number]
  fov: number
}

export interface CameraFrame {
  eye: Vec3
  right: Vec3
  up: Vec3
  fwd: Vec3
  fov: number
  shift: [number, number]
}

/** мягкий старт и остановка: пиковая скорость всего в 1.57× от средней (у кубической — в 3×) */
const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2

/** средняя угловая скорость поворота камеры, град/с: дальний поворот растягивается во времени */
const MAX_TURN_DEG_PER_S = 20
const MAX_FLIGHT_S = 4.5

/** сферическая интерполяция направлений (без рывков при смене системы отсчёта) */
function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const d = Math.max(-1, Math.min(1, dot(a, b)))
  const theta = Math.acos(d)
  if (theta < 1e-4)
    return norm(lerp3(a, b, t))
  if (Math.PI - theta < 1e-3) {
    // противоположные направления — обходим через «верх»
    const mid = norm(cross(a, len(cross(a, [0, 1, 0])) > 1e-3 ? [0, 1, 0] : [1, 0, 0]))
    return t < 0.5 ? slerp(a, cross(mid, a), t * 2) : slerp(cross(mid, a), b, t * 2 - 1)
  }
  const s = Math.sin(theta)
  return add(mul(a, Math.sin((1 - t) * theta) / s), mul(b, Math.sin(t * theta) / s))
}


/** поворот корпуса станции вокруг вертикали — тот же, что в StationScene.animate */
export const stationYaw = (time: number) => 0.5 + time * station.spin

// ── доворот станции ─────────────────────────────────────────────────
// Вместо облёта камеры вокруг вращающейся станции станция сама поворачивается нужным модулем к камере
// (`face`), выбирая из двух симметричных ракурсов тот, что ближе к текущему углу; без `face` станция плавно
// возвращается к обычному вращению.

/** секунд на доворот станции */
const TURN_S = 2.4
/** на сколько градусов от направления на камеру смотрит модуль: он виден сбоку, а не торцом */
const FACE_OFFSET = 50
let faceYaw: number | null = null
/** какой доворот уже запущен: модуль и yaw камеры — повторный вход в тот же ракурс его не перезапускает */
let faceKey = ''
let turnFrom = 0
let turnStart = -1e9

const wrapPi = (a: number) => a - Math.PI * 2 * Math.round(a / (Math.PI * 2))

/** живой угол станции с учётом доворота: им пользуются сцена станции и ракурсы `follow: station` */
export function liveYaw(time: number): number {
  const goal = faceYaw ?? stationYaw(time)
  const k = ease(Math.min(1, Math.max(0, (time - turnStart) / TURN_S)))
  return turnFrom + wrapPi(goal - turnFrom) * k
}

/**
 * угол станции, при котором модуль `id` смотрит в сторону камеры (yaw камеры — в градусах).
 * Модуль виден сбоку: его можно отвернуть от камеры на FACE_OFFSET в любую из двух сторон —
 * берём ту, до которой станции ближе доворачиваться от текущего угла `from` (вместо 180° выходит около 90°).
 */
function faceTarget(id: string, camYaw: number, from: number): number | null {
  const m = station.modules.find(m => m.id === id)
  if (!m)
    return null
  const [x, , z] = PORT_DIR[m.port]
  if (!x && !z)
    return null
  const base = camYaw * deg - Math.atan2(x, z)
  const left = base - FACE_OFFSET * deg
  const right = base + FACE_OFFSET * deg
  return Math.abs(wrapPi(left - from)) < Math.abs(wrapPi(right - from)) ? left : right
}

function setFace(spec: Spec, time: number, instant: boolean) {
  const key = spec.face ? `${spec.face}|${spec.yaw}` : ''
  if (key === faceKey)
    return
  faceKey = key
  const from = liveYaw(time)
  turnFrom = from
  faceYaw = spec.face ? faceTarget(spec.face, spec.yaw, from) : null
  turnStart = instant ? -1e9 : time
}

/** `fixed` — модуль берётся из статической раскладки станции, а не из живой сцены (для детерминированной подгонки) */
export function specDir(s: Spec, time: number, spinDeg: number, fixed = false): Vec3 {
  // follow: station — ракурс держится относительно станции, а не мира
  const yaw = (s.yaw + spinDeg) * deg + (s.follow === 'station' ? liveYaw(time) : 0)
  const pitch = s.pitch * deg
  if (s.follow === 'module' && typeof s.focus === 'string') {
    // yaw 0 — со стороны торца модуля, yaw 90 — сбоку; pitch — над/под плоскостью портов.
    // Станция вращается, но ракурс держится относительно модуля — он всегда в кадре сбоку.
    const out = fixed ? staticModuleDir(s.focus) : bodyAt(s.focus, time).dir
    if (out) {
      const up: Vec3 = Math.abs(out[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0]
      const radial = norm(sub(out, mul(up, dot(out, up))))
      const tangent = norm(cross(up, radial))
      let horiz = add(mul(radial, Math.cos(yaw)), mul(tangent, Math.sin(yaw)))
      // клоним ракурс к солнцу — модуль на освещённой стороне; непрерывно, без скачков при вращении
      const sunH = sub(norm(SUN_DIR), mul(up, dot(norm(SUN_DIR), up)))
      horiz = norm(add(horiz, mul(norm(sunH), 1.4)))
      return norm(add(mul(horiz, Math.cos(pitch)), mul(up, Math.sin(pitch))))
    }
  }
  const frame = s.follow === 'orbit' && typeof s.focus === 'string' ? orbitFrame(s.focus, time) : undefined
  if (frame) {
    // yaw 0 — снаружи орбиты (планета за спутником), yaw 90 — вдогонку сбоку
    const horiz = add(mul(frame.radial, Math.cos(yaw)), mul(frame.tangent, Math.sin(yaw)))
    return norm(add(mul(horiz, Math.cos(pitch)), mul(frame.axis, Math.sin(pitch))))
  }
  return [Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch), Math.cos(pitch) * Math.cos(yaw)]
}

function toFrame(pose: Pose): CameraFrame {
  const eye = add(pose.target, mul(pose.dir, pose.dist))
  const fwd = norm(sub(pose.target, eye))
  let right = cross(fwd, [0, 1, 0])
  if (len(right) < 1e-3)
    right = cross(fwd, [0, 0, -1])
  right = norm(right)
  const up = cross(right, fwd)
  return { eye, right, up, fwd, fov: pose.fov, shift: pose.shift }
}

export class CameraRig {
  private spec: Spec | null = null
  private key = ''
  private from: Pose | null = null
  private start = 0
  private specStart = 0
  private current: Pose | null = null
  /** длительность текущего перелёта: не короче `duration`, но так, чтобы поворот не был резким */
  private flight = 0
  private pending = false
  private fresh = false
  /** hold: живое положение глаза в момент входа на слайд — камера лишь поворачивается на месте */
  private holdEye: Vec3 | null = null
  private instantSet = false
  /** момент удара (performance.now) — короткая встряска кадра */
  private shakeAt = -1e9
  /** кадр, в котором камера окажется по завершении перелёта (без встряски) */
  goalFrame: CameraFrame | null = null

  /** Встряхнуть кадр в момент `at` (например, модуль с силой встал в порт) */
  kick(at: number) {
    this.shakeAt = at
  }

  /** идёт перелёт между позами */
  get moving() {
    return this.from !== null
  }

  /** Задать новую цель; перелёт начинается от текущей позы. */
  setTarget(spec: Spec, now: number, instant = false) {
    const key = JSON.stringify(spec)
    if (key === this.key)
      return
    this.key = key
    this.from = instant ? null : this.current
    this.flight = spec.duration
    this.pending = this.from !== null
    this.fresh = true
    this.instantSet = instant
    this.spec = spec
    this.start = now
    this.specStart = now
  }

  private goal(time: number, now: number): Pose {
    const s = this.spec!
    const body = bodyAt(s.focus, time)
    const scale = Array.isArray(s.focus) ? 1 : body.radius
    if (s.hold && this.holdEye) {
      const dir = specDir(s, time, 0)
      return { target: sub(this.holdEye, mul(dir, s.distance)), dir, dist: s.distance, shift: s.shift, fov: s.fov }
    }
    return {
      target: body.pos,
      dir: specDir(s, time, s.spin * (now - this.specStart) / 1000),
      dist: s.distance * scale,
      shift: s.shift,
      fov: s.fov,
    }
  }

  /** time — время мира (с), now — performance.now() */
  frame(time: number, now: number): CameraFrame | null {
    if (!this.spec)
      return null
    if (this.fresh) {
      setFace(this.spec, time, this.instantSet)
      const c = this.current
      this.holdEye = this.spec.hold && c ? add(c.target, mul(c.dir, c.dist)) : null
      this.fresh = false
    }
    const goal = this.goal(time, now)
    if (this.pending && this.from) {
      const turn = Math.acos(Math.max(-1, Math.min(1, dot(this.from.dir, goal.dir)))) / deg
      this.flight = Math.min(MAX_FLIGHT_S, Math.max(this.spec.duration, turn / MAX_TURN_DEG_PER_S))
    }
    this.pending = false
    this.goalFrame = toFrame(goal)
    let pose = goal
    if (this.from) {
      const raw = Math.min(1, (now - this.start) / 1000 / Math.max(0.01, this.flight))
      const e = ease(raw)
      const f = this.from
      // дальний перелёт — отъезжаем назад в середине пути
      // поворот на месте и облёт одной точки — не перелёт: отъезд только когда сдвигаются и цель, и камера
      const span = Math.min(
        len(sub(goal.target, f.target)),
        len(sub(add(goal.target, mul(goal.dir, goal.dist)), add(f.target, mul(f.dir, f.dist)))),
      )
      const boost = Math.min(3, span / Math.max(f.dist, goal.dist) * 0.35)
      pose = {
        target: lerp3(f.target, goal.target, e),
        dir: slerp(f.dir, goal.dir, e),
        dist: Math.exp(lerp(Math.log(f.dist), Math.log(goal.dist), e)) * (1 + boost * Math.sin(Math.PI * e)),
        shift: [lerp(f.shift[0], goal.shift[0], e), lerp(f.shift[1], goal.shift[1], e)],
        fov: lerp(f.fov, goal.fov, e),
      }
      if (raw >= 1)
        this.from = null
    }
    this.current = pose

    const { eye, right, up, fwd } = toFrame(pose)
    // встряска — сдвигом объектива: весь кадр (планеты и станция) дёргается вместе, без поворота
    let shift = pose.shift
    const since = now - this.shakeAt
    if (since >= 0 && since < 600) {
      const amp = 0.022 * Math.exp(-since / 130)
      shift = [shift[0] + Math.sin(since * 0.11) * amp, shift[1] + Math.cos(since * 0.087 + 1) * amp * 0.8]
    }
    return { eye, right, up, fwd, fov: pose.fov, shift }
  }
}
