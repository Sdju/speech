import type { CameraSpec, Vec3 } from './scene'
import type { StationSpec } from './scene'
import { DEFAULT_DURATION, DEFAULT_PRESET, DEFAULT_STATION_DURATION, partCameras, planets, presets, satellites, station } from './scene'

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

// ── мир во времени ─────────────────────────────────────────────────

export interface BodyState { pos: Vec3, radius: number }

export function satellitePos(id: string, time: number): Vec3 | undefined {
  const s = satellites.find(s => s.id === id)
  if (!s)
    return
  const p = planets.find(p => p.id === s.parent)!
  const [, e1, e2] = planeBasis(p.axis)
  const a = time * s.speed + s.phase
  return add(p.pos, mul(add(mul(e1, Math.cos(a)), mul(e2, Math.sin(a))), p.orbit ?? 2))
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
  return { axis: norm(p.axis), angle: -orbitAngle - time * (s.spin ?? 0.25) }
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
export function resolveCamera(slides: SlideLike[], no: number, click: number): Required<Omit<CameraSpec, 'preset'>> {
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
  }
}

// ── состояние станции ──────────────────────────────────────────────

export interface StationState { detached: string[], hidden: string[], duration: number }

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
    duration: spec?.duration ?? DEFAULT_STATION_DURATION,
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

const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2

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

type Spec = ReturnType<typeof resolveCamera>

function specDir(s: Spec, time: number, spinDeg: number): Vec3 {
  const yaw = (s.yaw + spinDeg) * deg
  const pitch = s.pitch * deg
  const frame = s.follow === 'orbit' && typeof s.focus === 'string' ? orbitFrame(s.focus, time) : undefined
  if (frame) {
    // yaw 0 — снаружи орбиты (планета за спутником), yaw 90 — вдогонку сбоку
    const horiz = add(mul(frame.radial, Math.cos(yaw)), mul(frame.tangent, Math.sin(yaw)))
    return norm(add(mul(horiz, Math.cos(pitch)), mul(frame.axis, Math.sin(pitch))))
  }
  return [Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch), Math.cos(pitch) * Math.cos(yaw)]
}

export class CameraRig {
  private spec: Spec | null = null
  private key = ''
  private from: Pose | null = null
  private start = 0
  private specStart = 0
  private current: Pose | null = null

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
    this.spec = spec
    this.start = now
    this.specStart = now
  }

  private goal(time: number, now: number): Pose {
    const s = this.spec!
    const body = bodyAt(s.focus, time)
    const scale = Array.isArray(s.focus) ? 1 : body.radius
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
    const goal = this.goal(time, now)
    let pose = goal
    if (this.from) {
      const raw = Math.min(1, (now - this.start) / 1000 / Math.max(0.01, this.spec.duration))
      const e = ease(raw)
      const f = this.from
      // дальний перелёт — отъезжаем назад в середине пути
      const span = len(sub(goal.target, f.target))
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

    const eye = add(pose.target, mul(pose.dir, pose.dist))
    const fwd = norm(sub(pose.target, eye))
    let right = cross(fwd, [0, 1, 0])
    if (len(right) < 1e-3)
      right = cross(fwd, [0, 0, -1])
    right = norm(right)
    const up = cross(right, fwd)
    return { eye, right, up, fwd, fov: pose.fov, shift: pose.shift }
  }
}
