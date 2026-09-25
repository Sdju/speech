import * as THREE from 'three'
import type { BodyState, CameraFrame, StationState } from './camera'
import type { ModuleDef, Port, Vec3 } from './scene'
import { planets, satellites, station as def } from './scene'

/**
 * Модульная станция на three.js поверх рейтрейсера.
 *
 * Камера та же, что у рейтрейсера (позиция, направление, фокус, сдвиг объектива) — станция
 * совпадает с планетами пиксель в пиксель. Планеты и спутники стоят в сцене невидимыми
 * сферами, которые пишут только глубину: станция за планетой честно скрывается.
 * Свет — то же солнце; в тени планеты солнечный свет на станции гаснет.
 */

const H = 0.05 // радиус корпуса модуля
const HUB_R = H * 1.35
const HUB_LEN = H * 3.2
const COLLAR = H * 0.35
const CONE = H * 0.35

const PORT_DIR: Record<Port, THREE.Vector3> = {
  '+x': new THREE.Vector3(1, 0, 0),
  '-x': new THREE.Vector3(-1, 0, 0),
  '+z': new THREE.Vector3(0, 0, 1),
  '-z': new THREE.Vector3(0, 0, -1),
  '-y': new THREE.Vector3(0, -1, 0),
}

const srgb = (c: Vec3 | number[]) => new THREE.Color().setRGB(c[0], c[1], c[2], THREE.SRGBColorSpace)
const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2

// ── процедурные текстуры ────────────────────────────────────────────

function canvasTexture(w: number, h: number, paint: (ctx: CanvasRenderingContext2D) => void, color = true) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  paint(c.getContext('2d')!)
  const tex = new THREE.CanvasTexture(c)
  if (color)
    tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

let seed = 7
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647

// обшивка: панели разного тона, швы, заклёпки
const hullTexture = () => canvasTexture(512, 256, (ctx) => {
  ctx.fillStyle = '#d4d6db'
  ctx.fillRect(0, 0, 512, 256)
  for (let x = 0; x < 512; x += 64) {
    for (let y = 0; y < 256; y += 42) {
      const v = 204 + Math.floor(rnd() * 14)
      ctx.fillStyle = `rgb(${v},${v + 2},${v + 5})`
      ctx.fillRect(x + 1, y + 1, 62, 40)
    }
  }
  ctx.strokeStyle = 'rgba(60,64,72,0.28)'
  ctx.lineWidth = 1
  for (let x = 0; x <= 512; x += 64) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 256)
    ctx.stroke()
  }
  for (let y = 0; y <= 256; y += 42) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(512, y)
    ctx.stroke()
  }
  ctx.fillStyle = 'rgba(60,64,70,0.3)'
  for (let i = 0; i < 400; i++)
    ctx.fillRect(Math.floor(rnd() * 512), Math.floor(rnd() * 256), 2, 2)
})

// многослойная теплоизоляция: мятая золотая фольга
const foilTexture = () => canvasTexture(256, 256, (ctx) => {
  ctx.fillStyle = '#b8903c'
  ctx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 900; i++) {
    const x = rnd() * 256
    const y = rnd() * 256
    const l = 20 + rnd() * 40
    const a = rnd() * Math.PI
    const v = rnd()
    ctx.strokeStyle = v > 0.5 ? `rgba(255,228,150,${0.15 + v * 0.25})` : `rgba(90,60,20,${0.15 + v * 0.3})`
    ctx.lineWidth = 1 + rnd() * 2
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l)
    ctx.stroke()
  }
})

// солнечная батарея: ячейки в серебряной сетке
const solarTexture = () => canvasTexture(256, 512, (ctx) => {
  ctx.fillStyle = '#9aa0aa'
  ctx.fillRect(0, 0, 256, 512)
  const cw = 256 / 8
  const ch = 512 / 24
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 24; j++) {
      const g = ctx.createLinearGradient(i * cw, j * ch, (i + 1) * cw, (j + 1) * ch)
      const v = rnd() * 0.15
      g.addColorStop(0, `rgb(${46 + v * 60},${72 + v * 60},${150 + v * 60})`)
      g.addColorStop(1, `rgb(${26 + v * 40},${44 + v * 40},${104 + v * 50})`)
      ctx.fillStyle = g
      ctx.fillRect(i * cw + 1.5, j * ch + 1.5, cw - 3, ch - 3)
    }
  }
})

const glowTexture = () => canvasTexture(64, 64, (ctx) => {
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(200,225,255,0.6)')
  g.addColorStop(1, 'rgba(120,170,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
})

/**
 * Карта окружения для отражений: тёмный космос, свет солнца и цветной отсвет домашней планеты.
 * Равнопромежуточная развёртка по конвенции three.js (u = atan2(z, x), v = asin(y)).
 */
function environment(renderer: THREE.WebGLRenderer, sun: THREE.Vector3) {
  const home = planets[0]
  const toPlanet = new THREE.Vector3(...home.pos).sub(new THREE.Vector3(...def.pos)).normalize()
  const uv = (d: THREE.Vector3) => [
    (Math.atan2(d.z, d.x) / (2 * Math.PI) + 0.5) * 512,
    (1 - (Math.asin(THREE.MathUtils.clamp(d.y, -1, 1)) / Math.PI + 0.5)) * 256,
  ]
  const tex = canvasTexture(512, 256, (ctx) => {
    ctx.fillStyle = '#05050a'
    ctx.fillRect(0, 0, 512, 256)
    const blob = (d: THREE.Vector3, r: number, color: string) => {
      const [x, y] = uv(d)
      for (const dx of [-512, 0, 512]) {
        const g = ctx.createRadialGradient(x + dx, y, 0, x + dx, y, r)
        g.addColorStop(0, color)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, 512, 256)
      }
    }
    const c = home.color.map(v => Math.round(v * 255))
    blob(toPlanet, 90, `rgba(${c[0]},${c[1]},${c[2]},0.55)`)
    blob(sun, 40, 'rgba(255,245,225,1)')
  })
  tex.mapping = THREE.EquirectangularReflectionMapping
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromEquirectangular(tex).texture
  pmrem.dispose()
  tex.dispose()
  return env
}

// ── сборка ──────────────────────────────────────────────────────────

interface Materials {
  hull: THREE.MeshStandardMaterial
  foil: THREE.MeshStandardMaterial
  dark: THREE.MeshStandardMaterial
  truss: THREE.MeshStandardMaterial
  solar: THREE.MeshStandardMaterial
  radiator: THREE.MeshStandardMaterial
  window: THREE.MeshBasicMaterial
}

function materials(): Materials {
  return {
    hull: new THREE.MeshStandardMaterial({ map: hullTexture(), metalness: 0.25, roughness: 0.55 }),
    foil: new THREE.MeshStandardMaterial({ map: foilTexture(), metalness: 0.85, roughness: 0.3 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x2b2e35, metalness: 0.6, roughness: 0.45 }),
    truss: new THREE.MeshStandardMaterial({ color: 0xb4b8c0, metalness: 0.75, roughness: 0.35 }),
    solar: new THREE.MeshStandardMaterial({ map: solarTexture(), metalness: 0.25, roughness: 0.38, side: THREE.DoubleSide }),
    radiator: new THREE.MeshStandardMaterial({ color: 0xe8e9ec, metalness: 0.05, roughness: 0.75, side: THREE.DoubleSide }),
    window: new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.9, 0.72), toneMapped: false }),
  }
}

/** оболочка цилиндра вдоль X: CylinderGeometry строится вдоль Y */
function alongX(geo: THREE.BufferGeometry, dir = 1) {
  geo.rotateZ(dir > 0 ? -Math.PI / 2 : Math.PI / 2)
  return geo
}

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat)
  m.position.set(x, y, z)
  return m
}

/** Модуль вдоль +X; стыковочный узел на −X. */
function buildModule(m: ModuleDef, M: Materials) {
  const len = m.length * H
  const g = new THREE.Group()
  const accent = new THREE.MeshStandardMaterial({
    color: srgb(m.color),
    emissive: srgb(m.color),
    emissiveIntensity: 0.45,
    metalness: 0.3,
    roughness: 0.4,
  })

  const skin = m.kind === 'cargo' ? M.foil : M.hull
  const body = mesh(alongX(new THREE.CylinderGeometry(H, H, len, 48, 1, true)), skin)
  ;(body.material as THREE.MeshStandardMaterial).map!.repeat.set(2, 1)
  g.add(body)
  // конусы на торцах и стыковочный воротник
  g.add(mesh(alongX(new THREE.CylinderGeometry(H * 0.72, H, CONE, 48)), M.hull, len / 2 + CONE / 2))
  g.add(mesh(alongX(new THREE.CylinderGeometry(H * 0.72, H, CONE, 48), -1), M.hull, -len / 2 - CONE / 2))
  g.add(mesh(alongX(new THREE.CylinderGeometry(H * 0.55, H * 0.6, COLLAR, 32)), M.dark, -len / 2 - CONE - COLLAR / 2))
  g.add(mesh(alongX(new THREE.CylinderGeometry(H * 0.3, H * 0.3, H * 0.12, 24)), M.dark, len / 2 + CONE + H * 0.06))

  // рёбра жёсткости
  const rings = Math.max(2, Math.round(len / (H * 1.4)))
  for (let i = 1; i < rings; i++) {
    const ring = mesh(new THREE.TorusGeometry(H * 1.006, H * 0.03, 8, 48), M.truss, -len / 2 + (len / rings) * i)
    ring.rotation.y = Math.PI / 2
    g.add(ring)
  }
  // цветной пояс — «команда» модуля
  g.add(mesh(alongX(new THREE.CylinderGeometry(H * 1.015, H * 1.015, H * 0.45, 48, 1, true)), accent, len / 2 - H * 0.55))

  if (m.kind === 'lab') {
    // внешние полезные нагрузки и радиаторы
    for (const x of [-0.25, 0.15]) {
      g.add(mesh(new THREE.BoxGeometry(H * 0.7, H * 0.32, H * 0.55), M.dark, x * len, H * 1.12, 0))
      g.add(mesh(new THREE.BoxGeometry(H * 0.5, H * 0.1, H * 0.4), M.foil, x * len, H * 1.34, 0))
    }
    for (const s of [-1, 1])
      g.add(mesh(new THREE.BoxGeometry(len * 0.32, H * 0.02, H * 0.8), M.radiator, len * 0.05, 0, s * H * 1.45))
  }
  if (m.kind === 'hab') {
    // иллюминаторы
    for (let i = 0; i < 4; i++)
      g.add(mesh(new THREE.BoxGeometry(H * 0.18, H * 0.06, H * 0.12), M.window, -len * 0.3 + i * len * 0.2, H * 0.99, 0))
    g.add(mesh(new THREE.SphereGeometry(H * 0.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.window, 0, H * 0.96, H * 0.5))
  }
  if (m.kind === 'cargo')
    g.add(mesh(alongX(new THREE.CylinderGeometry(H * 1.02, H * 1.02, H * 0.25, 48, 1, true)), M.hull, -len / 2 + H * 0.4))

  // навигационный огонь на внешнем торце
  const nav = mesh(new THREE.SphereGeometry(H * 0.08, 12, 8), new THREE.MeshBasicMaterial({ color: srgb(m.color), toneMapped: false }), len / 2 + CONE, H * 0.55)
  g.add(nav)

  return { group: g, length: len, accent }
}

function buildHub(M: Materials) {
  const g = new THREE.Group()
  g.add(mesh(new THREE.CylinderGeometry(HUB_R, HUB_R, HUB_LEN, 48), M.hull))
  g.add(mesh(new THREE.SphereGeometry(HUB_R, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.hull, 0, HUB_LEN / 2))
  // стыковочные порты и их огни
  const portLights = new Map<Port, THREE.Mesh>()
  for (const port of Object.keys(PORT_DIR) as Port[]) {
    const d = PORT_DIR[port]
    const base = port === '-y' ? new THREE.Vector3(0, -HUB_LEN / 2, 0) : d.clone().multiplyScalar(HUB_R)
    const collar = mesh(new THREE.CylinderGeometry(H * 0.6, H * 0.65, H * 0.3, 32), M.dark)
    collar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d)
    collar.position.copy(base).addScaledVector(d, H * 0.15)
    g.add(collar)
    const light = new THREE.Mesh(
      new THREE.TorusGeometry(H * 0.64, H * 0.05, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0xffb347, toneMapped: false }),
    )
    light.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), d)
    light.position.copy(base).addScaledVector(d, H * 0.3)
    g.add(light)
    portLights.set(port, light)
  }

  // мачта, ферма, солнечные крылья, радиаторы, антенна
  const top = HUB_LEN / 2 + H * 5
  g.add(mesh(new THREE.CylinderGeometry(H * 0.22, H * 0.22, H * 5, 12), M.truss, 0, HUB_LEN / 2 + H * 2.5))
  const L = H * 22
  const s = H * 0.7
  const beams = new THREE.Group()
  for (const [y, z] of [[s, s], [s, -s], [-s, s], [-s, -s]])
    beams.add(mesh(new THREE.BoxGeometry(L, H * 0.07, H * 0.07), M.truss, 0, y / 2, z / 2))
  const bays = 22
  for (let i = 0; i <= bays; i++) {
    const x = -L / 2 + (L / bays) * i
    beams.add(mesh(new THREE.BoxGeometry(H * 0.05, s, H * 0.05), M.truss, x, 0, s / 2))
    beams.add(mesh(new THREE.BoxGeometry(H * 0.05, s, H * 0.05), M.truss, x, 0, -s / 2))
    beams.add(mesh(new THREE.BoxGeometry(H * 0.05, H * 0.05, s), M.truss, x, s / 2, 0))
    beams.add(mesh(new THREE.BoxGeometry(H * 0.05, H * 0.05, s), M.truss, x, -s / 2, 0))
    if (i < bays) {
      const diag = mesh(new THREE.BoxGeometry(Math.hypot(L / bays, s), H * 0.04, H * 0.04), M.truss, x + L / bays / 2, 0, s / 2)
      diag.rotation.z = (i % 2 ? 1 : -1) * Math.atan2(s, L / bays)
      beams.add(diag)
    }
  }
  beams.position.y = top
  g.add(beams)

  const wings: THREE.Group[] = []
  for (const side of [-1, 1]) {
    const wing = new THREE.Group()
    wing.position.set(side * (L / 2 + H * 0.4), top, 0)
    for (const dz of [-1, 1]) {
      const panel = mesh(new THREE.BoxGeometry(H * 2.6, H * 0.03, H * 9), M.solar, 0, 0, dz * (H * 4.5 + H * 0.4))
      wing.add(panel)
      wing.add(mesh(new THREE.BoxGeometry(H * 0.08, H * 0.08, H * 9.4), M.truss, 0, H * 0.05, dz * (H * 4.5 + H * 0.4)))
    }
    wing.add(mesh(new THREE.BoxGeometry(H * 0.5, H * 0.5, H * 0.9), M.dark))
    g.add(wing)
    wings.push(wing)
  }
  for (const dz of [-1, 1]) {
    const rad = mesh(new THREE.BoxGeometry(H * 1.8, H * 0.03, H * 4.2), M.radiator, 0, top - H * 0.4, dz * H * 2.6)
    rad.rotation.x = dz * 0.35
    g.add(rad)
  }
  const dish = mesh(new THREE.SphereGeometry(H * 0.9, 24, 8, 0, Math.PI * 2, 0, Math.PI * 0.32), M.radiator, H * 4, top + H * 1.1, 0)
  dish.rotation.z = 0.5
  g.add(dish)
  g.add(mesh(new THREE.CylinderGeometry(H * 0.06, H * 0.06, H * 1.2, 8), M.truss, H * 4, top + H * 0.5, 0))

  return { group: g, portLights, wings }
}

// ── анимации модулей ────────────────────────────────────────────────

type Mode = 'docked' | 'detached' | 'hidden'

interface Pose { pos: THREE.Vector3, quat: THREE.Quaternion, scale: number }

interface ModuleRuntime {
  def: ModuleDef
  pivot: THREE.Group
  length: number
  mode: Mode
  from: Pose
  start: number
  duration: number
  thrusters: THREE.Sprite[]
  phase: number
}

export class StationScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(50, 1, 0.01, 400)
  private root = new THREE.Group()
  private body = new THREE.Group()
  private modules = new Map<string, ModuleRuntime>()
  private portLights: Map<Port, THREE.Mesh>
  private sunLight: THREE.DirectionalLight
  private occluders: THREE.Mesh[] = []
  private sun: THREE.Vector3
  private wasVisible = true
  private tmp = new THREE.Vector3()

  constructor(private canvas: HTMLCanvasElement, sun: Vec3) {
    this.sun = new THREE.Vector3(...sun).normalize()
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    this.scene.environment = environment(this.renderer, this.sun)
    this.scene.environmentIntensity = 0.9

    this.sunLight = new THREE.DirectionalLight(0xfff1dc, 3.2)
    this.scene.add(this.sunLight, this.sunLight.target)
    this.scene.add(new THREE.HemisphereLight(srgb(planets[0].color), 0x050508, 0.35))

    const M = materials()
    const hub = buildHub(M)
    this.portLights = hub.portLights
    this.body.add(hub.group)
    for (const m of def.modules) {
      const built = buildModule(m, M)
      const pivot = new THREE.Group()
      pivot.add(built.group)
      const thrusters = [-1, 1].map((s) => {
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({
          map: glowTexture(),
          color: 0xbfd8ff,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
          opacity: 0,
        }))
        sp.scale.setScalar(H * 2.2)
        sp.position.set(s * (built.length / 2 + CONE + H * 0.3), 0, 0)
        pivot.add(sp)
        return sp
      })
      this.body.add(pivot)
      const rt: ModuleRuntime = {
        def: m,
        pivot,
        length: built.length,
        mode: 'docked',
        from: this.target(m, built.length, 'docked'),
        start: -1e9,
        duration: 1,
        thrusters,
        phase: rnd() * 10,
      }
      this.apply(rt, rt.from)
      this.modules.set(m.id, rt)
    }
    // лёгкий наклон — станция не должна стоять «по стойке смирно»
    this.body.rotation.set(0.32, 0.5, -0.16)
    this.root.add(this.body)
    this.root.position.set(...def.pos)
    this.scene.add(this.root)

    // планеты и спутники — только в буфер глубины
    const occ = new THREE.MeshBasicMaterial({ colorWrite: false })
    const sphere = new THREE.SphereGeometry(1, 64, 32)
    for (let i = 0; i < planets.length + satellites.length; i++) {
      const o = new THREE.Mesh(sphere, occ)
      o.renderOrder = -1
      this.scene.add(o)
      this.occluders.push(o)
    }
  }

  private target(m: ModuleDef, length: number, mode: Mode): Pose {
    const d = PORT_DIR[m.port]
    const base = m.port === '-y' ? new THREE.Vector3(0, -HUB_LEN / 2, 0) : d.clone().multiplyScalar(HUB_R)
    const docked = base.clone().addScaledVector(d, H * 0.3 + COLLAR + CONE + length / 2)
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), d)
    if (mode === 'docked')
      return { pos: docked, quat, scale: 1 }
    const side = new THREE.Vector3(0, 1, 0)
    if (Math.abs(d.y) > 0.9)
      side.set(1, 0, 0)
    if (mode === 'detached') {
      const tilt = new THREE.Quaternion().setFromAxisAngle(side.clone().cross(d).normalize(), 0.35)
      return {
        pos: docked.clone().addScaledVector(d, length * 0.7 + H * 3).addScaledVector(side, H * 1.2),
        quat: tilt.multiply(quat),
        scale: 1,
      }
    }
    return { pos: docked.clone().addScaledVector(d, H * 60), quat, scale: 0.001 }
  }

  private apply(rt: ModuleRuntime, p: Pose) {
    rt.pivot.position.copy(p.pos)
    rt.pivot.quaternion.copy(p.quat)
    rt.pivot.scale.setScalar(p.scale)
  }

  setState(state: StationState, now: number, instant = false) {
    for (const rt of this.modules.values()) {
      const mode: Mode = state.hidden.includes(rt.def.id) ? 'hidden' : state.detached.includes(rt.def.id) ? 'detached' : 'docked'
      if (mode === rt.mode)
        continue
      rt.from = { pos: rt.pivot.position.clone(), quat: rt.pivot.quaternion.clone(), scale: rt.pivot.scale.x }
      rt.mode = mode
      rt.start = instant ? -1e9 : now
      rt.duration = state.duration * 1000 * (mode === 'hidden' || rt.from.scale < 0.5 ? 1.4 : 1)
      if (instant)
        this.apply(rt, this.target(rt.def, rt.length, mode))
    }
  }

  /** Позиции для камеры: `station` или `station.<модуль>` */
  resolve(id: string): BodyState | undefined {
    this.root.updateMatrixWorld()
    if (id === def.id)
      return { pos: def.pos, radius: def.radius }
    const rt = this.modules.get(id.slice(def.id.length + 1))
    if (!rt)
      return
    const p = rt.pivot.getWorldPosition(this.tmp)
    return { pos: [p.x, p.y, p.z], radius: rt.length * 0.6 }
  }

  private animate(time: number, now: number) {
    this.body.rotation.y = 0.5 + time * def.spin
    for (const rt of this.modules.values()) {
      const target = this.target(rt.def, rt.length, rt.mode)
      const raw = Math.min(1, Math.max(0, (now - rt.start) / rt.duration))
      const e = ease(raw)
      const pose: Pose = {
        pos: rt.from.pos.clone().lerp(target.pos, e),
        quat: rt.from.quat.clone().slerp(target.quat, e),
        scale: THREE.MathUtils.lerp(rt.from.scale, target.scale, e),
      }
      // отстыкованный модуль дрейфует
      if (rt.mode === 'detached') {
        const drift = Math.sin(time * 0.5 + rt.phase) * H * 0.4 * e
        pose.pos.y += drift
        pose.quat.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.sin(time * 0.3 + rt.phase) * 0.15 * e))
      }
      this.apply(rt, pose)

      // сопла: импульс на разгоне и торможении
      const moving = raw > 0 && raw < 1
      const burn = moving ? Math.max(0, 1 - raw / 0.22) + Math.max(0, (raw - 0.78) / 0.22) : 0
      const flicker = 0.75 + 0.25 * Math.sin(now * 0.07 + rt.phase)
      rt.thrusters.forEach((sp, k) => {
        // уходим — толкает внутренний торец, подходим — тормозит внешний
        const leaving = rt.mode !== 'docked'
        const active = (k === 0) === leaving ? burn : burn * 0.35
        ;(sp.material as THREE.SpriteMaterial).opacity = Math.min(1, active) * flicker
      })

      // огонь порта: мигает во время манёвра, зелёный — занят, янтарный — свободен
      const light = this.portLights.get(rt.def.port)!
      const mat = light.material as THREE.MeshBasicMaterial
      if (moving)
        mat.color.set(Math.sin(now * 0.02) > 0 ? 0xffffff : 0x303030)
      else
        mat.color.set(rt.mode === 'docked' ? 0x39e58c : 0xffa53a)
    }
  }

  /** видна ли станция в кадре (грубо, по ограничивающей сфере) */
  private inView(cam: CameraFrame, aspect: number) {
    const v = new THREE.Vector3(...def.pos).sub(new THREE.Vector3(...cam.eye))
    const f = new THREE.Vector3(...cam.fwd)
    const z = v.dot(f)
    const r = def.radius * 2.5
    if (z < -r)
      return false
    if (z < r)
      return true
    const x = v.dot(new THREE.Vector3(...cam.right)) / z * cam.fov + cam.shift[0]
    const y = v.dot(new THREE.Vector3(...cam.up)) / z * cam.fov + cam.shift[1]
    const m = r / z * cam.fov + 0.1
    return Math.abs(x) < aspect + m && Math.abs(y) < 1 + m
  }

  private benchTarget: THREE.WebGLRenderTarget | null = null

  render(cam: CameraFrame, time: number, now: number, pPos: Float32Array, sPos: Float32Array, offscreen = false) {
    const rect = this.canvas.getBoundingClientRect()
    const w = Math.max(1, Math.round(rect.width || this.canvas.clientWidth))
    const h = Math.max(1, Math.round(rect.height || this.canvas.clientHeight))
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    if (this.renderer.getPixelRatio() !== dpr)
      this.renderer.setPixelRatio(dpr)
    const size = this.renderer.getSize(new THREE.Vector2())
    if (size.x !== w || size.y !== h)
      this.renderer.setSize(w, h, false)

    this.animate(time, now)

    const visible = this.inView(cam, w / h)
    if (!visible) {
      if (this.wasVisible)
        this.renderer.clear()
      this.wasVisible = false
      return
    }
    this.wasVisible = true

    // камера рейтрейсера: фокус f = 1 / tan(fov/2), сдвиг объектива — в матрице проекции
    const c = this.camera
    c.position.set(...cam.eye)
    c.up.set(...cam.up)
    c.lookAt(cam.eye[0] + cam.fwd[0], cam.eye[1] + cam.fwd[1], cam.eye[2] + cam.fwd[2])
    c.fov = THREE.MathUtils.radToDeg(2 * Math.atan(1 / cam.fov))
    c.aspect = w / h
    c.updateProjectionMatrix()
    c.projectionMatrix.elements[8] = -cam.shift[0] / c.aspect
    c.projectionMatrix.elements[9] = -cam.shift[1]
    c.projectionMatrixInverse.copy(c.projectionMatrix).invert()

    // заглушки глубины
    let k = 0
    for (let i = 0; i < planets.length; i++, k++) {
      this.occluders[k].position.set(pPos[i * 4], pPos[i * 4 + 1], pPos[i * 4 + 2])
      this.occluders[k].scale.setScalar(pPos[i * 4 + 3] || 1e-4)
    }
    for (let i = 0; i < satellites.length; i++, k++) {
      this.occluders[k].position.set(sPos[i * 4], sPos[i * 4 + 1], sPos[i * 4 + 2])
      this.occluders[k].scale.setScalar(sPos[i * 4 + 3] || 1e-4)
    }

    // солнце и тень планеты: луч от станции к солнцу
    const sp = new THREE.Vector3(...def.pos)
    let lit = 1
    for (const p of planets) {
      const c0 = new THREE.Vector3(...p.pos).sub(sp)
      const along = c0.dot(this.sun)
      if (along <= 0)
        continue
      const dist = c0.clone().sub(this.sun.clone().multiplyScalar(along)).length()
      lit = Math.min(lit, THREE.MathUtils.smoothstep(dist, p.radius * 0.95, p.radius * 1.08))
    }
    this.sunLight.position.copy(sp).addScaledVector(this.sun, 10)
    this.sunLight.target.position.copy(sp)
    this.sunLight.intensity = 3.2 * lit

    if (offscreen) {
      // замеры: во внеэкранную цель того же размера — экранный буфер ждёт vsync
      const px = this.renderer.getDrawingBufferSize(new THREE.Vector2())
      if (!this.benchTarget || this.benchTarget.width !== px.x || this.benchTarget.height !== px.y) {
        this.benchTarget?.dispose()
        this.benchTarget = new THREE.WebGLRenderTarget(px.x, px.y, { samples: 4 })
      }
      this.renderer.setRenderTarget(this.benchTarget)
      this.renderer.render(this.scene, c)
      this.renderer.setRenderTarget(null)
      return
    }
    this.renderer.render(this.scene, c)
  }

  /** дождаться GPU (для замеров): чтение одного пикселя блокирует до конца отрисовки */
  sync() {
    const gl = this.renderer.getContext()
    if (this.benchTarget)
      this.renderer.setRenderTarget(this.benchTarget)
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4))
    this.renderer.setRenderTarget(null)
  }

  dispose() {
    this.renderer.dispose()
    this.scene.traverse((o) => {
      if (o instanceof THREE.Mesh)
        o.geometry.dispose()
    })
  }
}
