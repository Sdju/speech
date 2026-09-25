import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import chairUrl from './assets/chair.glb?url'

/**
 * «Планета из стульев»: сотни экземпляров одного стула (universe/blender/chair.py →
 * assets/chair.glb) слетаются из глубины и слипаются в шар — изнутри наружу, слой за слоем.
 *
 * Два InstancedMesh (дерево и сиденье) с общими матрицами; цвет — на экземпляр:
 * натуральное дерево разных пород, изредка крашеный стул, как в куче на фото.
 * Собственный прозрачный канвас поверх звёзд общей сцены — планета не живёт в мире доклада.
 */

export interface ChairPlanetOptions {
  count?: number
  /** радиус шара в метрах: стул ~0.9 м, так что 1.6 — это слоя три-четыре */
  radius?: number
  /** секунд на сборку всей планеты */
  assemble?: number
  seed?: number
}

// натуральное дерево — чаще, крашеное — редко (вес, цвет)
const WOOD: [number, string][] = [
  [5, '#d9b27c'], // сосна
  [4, '#c08a50'], // дуб
  [4, '#e0bb8a'], // бук
  [2, '#8a5632'], // орех
  [2, '#a8683a'], // тик
  [1, '#e6e1d8'], // белая краска
  [1, '#b8452f'], // красная
  [1, '#2e2824'], // чёрная
]
const SEAT: [number, string][] = [
  [6, ''], // в тон каркасу
  [3, '#efe3cf'],
  [1, '#e39a92'],
  [1, '#d9a441'],
  [1, '#5f7da0'],
  [1, '#26262b'],
]

const ease = (t: number) => 1 - (1 - t) ** 3

interface Chair {
  pos: THREE.Vector3
  quat: THREE.Quaternion
  scale: number
  from: THREE.Vector3
  fromQuat: THREE.Quaternion
  delay: number
  flight: number
}

export class ChairPlanet {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200)
  private planet = new THREE.Group()
  private meshes: THREE.InstancedMesh[] = []
  private chairs: Chair[] = []
  private colors: [THREE.Color, THREE.Color][] = []
  private start = 0
  private settled = false
  private ready = false
  private assemble: number
  private m = new THREE.Matrix4()
  private p = new THREE.Vector3()
  private q = new THREE.Quaternion()
  private s = new THREE.Vector3()
  /** модель загружена — пора перерисовать статичный кадр */
  onReady?: () => void

  constructor(private canvas: HTMLCanvasElement, opts: ChairPlanetOptions = {}) {
    const { count = 700, radius = 1.6, assemble = 4.5, seed = 4 } = opts
    this.assemble = assemble

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05

    // свет в ключе общей сцены: тёплое солнце слева сверху, фиолетовый контровой от «домашней» планеты
    const sun = new THREE.DirectionalLight(0xfff1dc, 3.0)
    sun.position.set(-0.85, 0.55, 0.62)
    const rim = new THREE.DirectionalLight(0xa855f7, 2.4)
    rim.position.set(0.9, -0.2, -0.8)
    this.scene.add(sun, rim, new THREE.HemisphereLight(0xffe6c8, 0x2a1640, 0.55))

    this.planet.rotation.set(0.35, 0, -0.2)
    this.scene.add(this.planet)
    this.camera.position.set(0, 0, 8.6)

    this.layout(count, radius, seed)
    new GLTFLoader().loadAsync(chairUrl)
      .then(gltf => this.attach(gltf.scene))
      .catch(e => console.error('[ChairPlanet] модель стула не загрузилась', e))
  }

  private layout(count: number, radius: number, seed: number) {
    let s = seed
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
    const rq = () => new THREE.Quaternion().setFromEuler(new THREE.Euler(rnd() * 6.283, rnd() * 6.283, rnd() * 6.283))
    for (let i = 0; i < count; i++) {
      // равномерно по сфере; шар сплошной, без ядра — стулья гуще к поверхности
      const u = rnd() * 2 - 1
      const v = rnd() * Math.PI * 2
      const n = new THREE.Vector3(Math.sqrt(1 - u * u) * Math.cos(v), u, Math.sqrt(1 - u * u) * Math.sin(v))
      const depth = rnd() ** 0.5
      const r = radius * (0.15 + 0.85 * depth)
      // прилетают издалека примерно со своей стороны, чуть сбоку
      const from = n.clone().multiplyScalar(radius * (5 + rnd() * 5))
        .add(new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(radius * 3))
      this.chairs.push({
        pos: n.multiplyScalar(r),
        quat: rq(),
        scale: 0.9 + rnd() * 0.2,
        from,
        fromQuat: rq(),
        // внутренние слои первыми, внутри слоя — вразнобой
        delay: (depth * 0.7 + rnd() * 0.3) * this.assemble * 0.7,
        flight: this.assemble * (0.22 + rnd() * 0.12),
      })
    }
    this.chairs.sort((a, b) => a.delay - b.delay)

    const pick = (list: [number, string][]) => {
      const total = list.reduce((a, [w]) => a + w, 0)
      let x = rnd() * total
      for (const [w, c] of list) {
        if ((x -= w) <= 0)
          return c
      }
      return list[0][1]
    }
    const tone = (hex: string) => new THREE.Color(hex).offsetHSL(0, (rnd() - 0.5) * 0.08, (rnd() - 0.5) * 0.08)
    this.colors = this.chairs.map(() => {
      const wood = pick(WOOD)
      const seat = pick(SEAT)
      return [tone(wood), tone(seat || wood).multiplyScalar(seat ? 1 : 1.08)]
    })
  }

  private attach(model: THREE.Object3D) {
    const parts: THREE.Mesh[] = []
    model.traverse((o) => {
      if (o instanceof THREE.Mesh)
        parts.push(o)
    })
    for (const part of parts) {
      const role = (part.material as THREE.Material).name === 'seat' ? 1 : 0
      const geo = part.geometry.clone().applyMatrix4(part.matrixWorld)
      const mat = new THREE.MeshStandardMaterial({ roughness: role ? 0.55 : 0.68, metalness: 0 })
      const mesh = new THREE.InstancedMesh(geo, mat, this.chairs.length)
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      mesh.frustumCulled = false
      this.colors.forEach((c, i) => mesh.setColorAt(i, c[role]))
      this.meshes.push(mesh)
      this.planet.add(mesh)
    }
    this.ready = true
    this.pose(this.settled ? Infinity : 0)
    this.onReady?.()
  }

  /** начать сборку заново (вход на слайд) или сразу показать готовую планету */
  restart(now: number, instant = false) {
    this.start = now
    this.settled = instant
    if (this.ready)
      this.pose(instant ? Infinity : 0)
  }

  private pose(t: number) {
    let moving = false
    this.chairs.forEach((c, i) => {
      const k = Math.min(1, Math.max(0, (t - c.delay) / c.flight))
      if (k < 1)
        moving = true
      if (k <= 0) {
        // ещё не вылетел — прячем
        this.m.makeScale(0, 0, 0)
      }
      else {
        const e = ease(k)
        this.p.lerpVectors(c.from, c.pos, e)
        this.q.slerpQuaternions(c.fromQuat, c.quat, e)
        this.s.setScalar(c.scale * Math.min(1, k * 4))
        this.m.compose(this.p, this.q, this.s)
      }
      for (const mesh of this.meshes)
        mesh.setMatrixAt(i, this.m)
    })
    for (const mesh of this.meshes)
      mesh.instanceMatrix.needsUpdate = true
    return moving
  }

  render(now: number) {
    const rect = this.canvas.getBoundingClientRect()
    const w = Math.max(1, Math.round(rect.width))
    const h = Math.max(1, Math.round(rect.height))
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    if (this.renderer.getPixelRatio() !== dpr)
      this.renderer.setPixelRatio(dpr)
    const size = this.renderer.getSize(new THREE.Vector2())
    if (size.x !== w || size.y !== h) {
      this.renderer.setSize(w, h, false)
      this.camera.aspect = w / h
      this.camera.updateProjectionMatrix()
    }

    const t = (now - this.start) / 1000
    if (this.ready && !this.settled)
      this.settled = !this.pose(t)
    // докручивается быстрее во время сборки и замедляется до ленивого вращения
    this.planet.rotation.y = t * 0.08 + 0.9 * (1 - Math.exp(-t * 0.6))
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose()
        ;(o.material as THREE.Material).dispose()
      }
    })
    this.renderer.dispose()
    // освободить контекст сразу, а не когда до канваса доберётся сборщик мусора
    this.renderer.forceContextLoss()
  }
}
