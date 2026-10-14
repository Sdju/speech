import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import chairUrl from './assets/chair.glb?url'
import { Astronaut } from './astronaut'
import { BH_COS_I, BH_ROLL, BH_RS, createBlackHole, createBlast } from './blackhole'

/**
 * «Планета из стульев»: сотни экземпляров одного стула (universe/blender/chair.py →
 * assets/chair.glb) слетаются из глубины и слипаются в шар — изнутри наружу, слой за слоем.
 * Сначала в кадре два стула рядом, каждый клик (`setStage`) — новая волна стульев, камера отъезжает.
 * Шаг после последней волны — конструкция начинает трястись: шаткая, нестабильная куча.
 * Последний шаг — «сверхновая»: куча схлопывается, взрывается, а на её месте остаётся чёрная дыра
 * (universe/blackhole.ts) — часть стульев, не успевших улететь, по спирали падает в неё.
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
  /** сколько стульев в кадре на шагах 0…n-1; последний шаг — все `count`, а следующий за ним — тряска */
  stages?: number[]
  /** дистанция камеры на каждом шаге (стульев мало — ближе) */
  cameras?: number[]
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
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
/** детерминированный «шум» по индексу стула и номеру признака */
const H = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/** секунд схлопывания перед взрывом */
const COLLAPSE_S = 1.15

interface Chair {
  pos: THREE.Vector3
  quat: THREE.Quaternion
  scale: number
  from: THREE.Vector3
  fromQuat: THREE.Quaternion
  /** порядок слёта: внутренние слои первыми (по нему стулья делятся на волны) */
  delay: number
  flight: number
  /** когда стул вылетел, с (от старта слайда); Infinity — ещё не вылетел */
  t0: number
  /** «рассинхрон» внутри волны, 0…1 */
  jit: number
  /** параметры взрыва: куда и как разлетается; часть стульев остаётся и падает в чёрную дыру */
  b: {
    dir: THREE.Vector3
    axis: THREE.Vector3
    rate: number
    speed: number
    h: number
    captured: boolean
    rOut: number
    period: number
    off: number
    th0: number
  }
}

/** цилиндр на сиденье и радиус зоны цензуры вокруг него (мировые единицы модели стула) */
const CYL_R = 0.055
const CYL_H = 0.13
const CENSOR_R = 0.18

/**
 * Цензура поверх кадра, как на видео: внутри прямоугольника экрана картинка заменяется усреднёнными
 * крупными «пикселями». Сетка привязана к углу прямоугольника — мозаика едет вместе с объектом.
 */
const CENSOR_FRAG = /* glsl */`
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec4 uRects[2];
uniform float uCells[2];
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec2 fc = vUv * uRes;
  vec4 col;
  bool hit = false;
  for (int i = 0; i < 2; i++) {
    vec4 r = uRects[i];
    if (r.z > r.x && fc.x >= r.x && fc.x < r.z && fc.y >= r.y && fc.y < r.w) {
      float cell = uCells[i];
      vec2 id = floor((fc - r.xy) / cell);
      vec2 c0 = r.xy + id * cell;
      vec4 sum = vec4(0.0);
      for (int y = 0; y < 3; y++)
        for (int x = 0; x < 3; x++)
          sum += texture2D(uTex, (c0 + (vec2(float(x), float(y)) + 0.5) * cell / 3.0) / uRes);
      col = sum / 9.0;
      col.rgb *= 0.94 + 0.12 * hash(id + float(i) * 17.0);
      hit = true;
    }
  }
  if (!hit)
    col = texture2D(uTex, vUv);
  gl_FragColor = col;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

export class ChairPlanet {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200)
  private planet = new THREE.Group()
  private meshes: THREE.InstancedMesh[] = []
  private censors: THREE.Object3D[] = []
  private envTex: THREE.Texture | null = null
  private censorAt = new THREE.Vector3()
  private post: { target: THREE.WebGLRenderTarget, scene: THREE.Scene, cam: THREE.OrthographicCamera, mat: THREE.ShaderMaterial } | null = null
  private chairs: Chair[] = []
  private colors: [THREE.Color, THREE.Color][] = []
  private start = 0
  private settled = false
  private ready = false
  private assemble: number
  private stages: number[] = []
  private cameras: number[] = []
  /** текущая волна и сколько стульев уже вылетело */
  private stage = 0
  private triggered = 0
  private stageAt = 0
  /** с какого момента конструкция трясётся (c); Infinity — устойчива */
  private shakeAt = Infinity
  /** с какого момента взрыв (c); Infinity — планета цела */
  private blastAt = Infinity
  private camDur = 2.2
  private mats: THREE.MeshStandardMaterial[] = []
  private hero = new Astronaut()
  private entryInstant = false
  private hole = createBlackHole(14)
  private flare = createBlast(16)
  private heatLight = new THREE.PointLight(0xffa860, 0, 0, 2)
  /** оси диска чёрной дыры в мировых координатах (тот же поворот и наклон, что в шейдере) */
  private e1 = new THREE.Vector3(Math.cos(BH_ROLL), Math.sin(BH_ROLL), 0)
  private e2 = new THREE.Vector3(
    -Math.sin(BH_ROLL) * BH_COS_I,
    Math.cos(BH_ROLL) * BH_COS_I,
    -Math.sqrt(1 - BH_COS_I * BH_COS_I),
  )
  private pw = new THREE.Matrix4()
  private pi = new THREE.Matrix4()
  private pwQ = new THREE.Quaternion()
  private tmpQ = new THREE.Quaternion()
  private tmpV = new THREE.Vector3()
  private tmpM = new THREE.Matrix4()
  private camFrom = 8.6
  private camTo = 8.6
  private camAt = 0
  /** угол собственного вращения двух первых стульев; копится, пока они «одни» */
  private spinAngle = 0
  private lastT = 0
  private up = new THREE.Vector3(0, 1, 0)
  private axis = new THREE.Vector3()
  private radius = 1.6
  private m = new THREE.Matrix4()
  private p = new THREE.Vector3()
  private q = new THREE.Quaternion()
  private s = new THREE.Vector3()
  /** модель загружена — пора перерисовать статичный кадр */
  onReady?: () => void

  constructor(private canvas: HTMLCanvasElement, opts: ChairPlanetOptions = {}) {
    const { count = 700, radius = 1.6, assemble = 4.5, seed = 4, stages = [2, 12, 60], cameras = [4.4, 5.6, 6.8, 8.6] } = opts
    this.assemble = assemble
    this.radius = radius
    this.stages = [...stages, count]
    this.cameras = cameras

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
    this.scene.add(this.planet, this.hero.group, this.hole, this.flare, this.heatLight)
    this.camera.position.set(0, 0, this.cameras[0] ?? 8.6)
    this.camFrom = this.camTo = this.cameras[0] ?? 8.6

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
        t0: Infinity,
        jit: (this.chairs.length * 0.61803) % 1,
        b: null as never,
      })
    }
    this.chairs.sort((a, b) => a.delay - b.delay)
    this.chairs.forEach((c, i) => {
      const dir = c.pos.clone().add(new THREE.Vector3(H(i, 1) - 0.5, H(i, 2) - 0.5, H(i, 3) - 0.5).multiplyScalar(0.7)).normalize()
      dir.z *= 0.55
      c.b = {
        dir: dir.normalize(),
        axis: new THREE.Vector3(H(i, 4) - 0.5, H(i, 5) - 0.5, H(i, 6) - 0.5).normalize(),
        rate: (2 + H(i, 7) * 6) * (H(i, 8) > 0.5 ? 1 : -1),
        speed: 3.2 + H(i, 9) * 8.5,
        h: H(i, 10),
        // около трёх процентов стульев не улетает, а остаётся кружить и падать в дыру
        captured: i > 1 && H(i, 11) < 0.035,
        rOut: 3.2 + H(i, 12) * 1.6,
        period: 7 + H(i, 13) * 5,
        off: H(i, 14),
        th0: H(i, 15) * Math.PI * 2,
      }
    })
    // два первых стула — рядышком, прямо, лицом к зрителю: они вращаются в одиночестве первыми
    this.chairs[0].pos.set(-0.62, 0, 0)
    this.chairs[1].pos.set(0.62, 0, 0)
    this.chairs[0].quat.identity()
    this.chairs[1].quat.identity()
    this.chairs[0].scale = this.chairs[1].scale = 1

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
    const seatBox = new THREE.Box3()
    for (const part of parts) {
      const role = (part.material as THREE.Material).name === 'seat' ? 1 : 0
      const geo = part.geometry.clone().applyMatrix4(part.matrixWorld)
      if (role) {
        geo.computeBoundingBox()
        seatBox.union(geo.boundingBox!)
      }
      const mat = new THREE.MeshStandardMaterial({ roughness: role ? 0.55 : 0.68, metalness: 0, emissive: new THREE.Color(1, 0.45, 0.15), emissiveIntensity: 0 })
      this.mats.push(mat)
      const mesh = new THREE.InstancedMesh(geo, mat, this.chairs.length)
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      mesh.frustumCulled = false
      this.colors.forEach((c, i) => mesh.setColorAt(i, c[role]))
      this.meshes.push(mesh)
      this.planet.add(mesh)
    }
    this.addCensor(seatBox)
    this.ready = true
    this.pose(0)
    this.onReady?.()
  }

  /**
   * В центре сиденья двух первых стульев стоит цилиндр. Сам он рисуется как обычно, а закрывает его цензура:
   * пост-шейдер в экранном пространстве (см. CENSOR_FRAG), как пикселизация на видео.
   */
  private addCensor(seatBox: THREE.Box3) {
    const center = seatBox.getCenter(new THREE.Vector3())
    this.censorAt.set(center.x, seatBox.max.y + CYL_H / 2, center.z)
    // металл без окружения выглядит чёрным: даём ему мягкое студийное отражение
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    pmrem.dispose()
    this.envTex = env
    const heat = { emissive: new THREE.Color(1, 0.45, 0.15), emissiveIntensity: 0 }

    // первый стул: цилиндр под цензурой
    const geo = new THREE.CylinderGeometry(CYL_R, CYL_R, CYL_H, 28)
    geo.translate(this.censorAt.x, this.censorAt.y, this.censorAt.z)
    const body = new THREE.MeshStandardMaterial({ color: '#ffdaab', roughness: 0.4, metalness: 0.1, ...heat })
    const cap = new THREE.MeshStandardMaterial({ color: '#ffdaab', roughness: 0.4, metalness: 0.1, ...heat })
    this.mats.push(body, cap)
    const cyl = new THREE.Mesh(geo, [body, cap, cap])
    cyl.matrixAutoUpdate = false
    cyl.frustumCulled = false
    this.censors.push(cyl)
    this.planet.add(cyl)

    // второй стул: несколько металлических конусов, без цензуры
    const cones = new THREE.Group()
    cones.matrixAutoUpdate = false
    const specs: [number, number, number, number, string][] = [
      [-0.085, 0.03, 0.04, 0.13, '#c9ced9'],
      [0.07, -0.05, 0.04, 0.13, '#d8a94a'],
      [0.02, 0.09, 0.04, 0.13, '#b87333'],
    ]
    for (const [dx, dz, r, h, color] of specs) {
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 1, envMap: env, envMapIntensity: 1.1, ...heat })
      this.mats.push(mat)
      const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 32), mat)
      cone.position.set(this.censorAt.x + dx, seatBox.max.y + h / 2, this.censorAt.z + dz)
      cone.frustumCulled = false
      cones.add(cone)
    }
    this.censors.push(cones)
    this.planet.add(cones)
  }

  /** сила цензуры 0…1: пока стулья одни — полная, держится до второго клика, затем быстро сходит на нет (цилиндр оказывается внутри кучи) */
  private censorAmount(t: number) {
    if (this.blastAt !== Infinity)
      return 0
    if (this.stage <= 1)
      return 1
    return Math.max(0, 1 - (t - this.stageAt) / 1.2)
  }

  /** экранные прямоугольники цензуры в пикселях буфера (начало — снизу слева); пустые — вне кадра */
  private censorRects(W: number, H: number, k: number) {
    const out = new Float32Array(8)
    const cells = new Float32Array(2)
    const v = new THREE.Vector3()
    const e = new THREE.Vector3()
    for (let i = 0; i < 2; i++) {
      // цензура только на первом стуле — с цилиндром
      if (k <= 0 || i > 0 || !this.censors[i])
        continue
      v.copy(this.censorAt).applyMatrix4(this.censors[i].matrix).applyMatrix4(this.planet.matrixWorld)
      e.copy(v).x += CENSOR_R
      v.project(this.camera)
      e.project(this.camera)
      if (v.z > 1)
        continue
      const cx = (v.x * 0.5 + 0.5) * W
      const cy = (v.y * 0.5 + 0.5) * H
      const r = Math.abs(e.x - v.x) * 0.5 * W * k
      out.set([cx - r, cy - r, cx + r, cy + r], i * 4)
      cells[i] = Math.max(5, r * 2 / 8)
    }
    return { rects: out, cells }
  }

  /**
   * Запустить волну `stage`: вылетают стулья, которых ещё нет в кадре (до `stages[stage]`), камера отъезжает.
   * instant — стулья сразу на местах (возврат на слайд с уже сделанными кликами).
   */
  setStage(stage: number, now: number, instant = false) {
    if (instant)
      this.entryInstant = true
    const last = this.stages.length - 1
    const k = Math.max(0, Math.min(last, stage))
    const t = (now - this.start) / 1000
    // шаг за последней волной — тряска; стульев не добавляется
    if (stage > last && this.shakeAt === Infinity)
      this.shakeAt = instant ? -1e4 : t
    const goal = Math.min(this.chairs.length, this.stages[k])
    const lo = this.triggered
    const span = Math.max(1, goal - lo)
    // чем больше волна, тем дольше она налетает
    const dur = Math.min(3.2, 0.7 + span / 140)
    for (let i = lo; i < goal; i++) {
      const j = i - lo
      this.chairs[i].t0 = instant ? -1e4 : t + (k === 0 ? 0.15 * j : (0.55 * j / span + 0.45 * this.chairs[i].jit) * dur)
    }
    this.triggered = Math.max(lo, goal)
    if (k !== this.stage || lo === 0) {
      this.camFrom = instant ? (this.cameras[k] ?? 8.6) : this.camera.position.z
      this.camTo = this.cameras[k] ?? 8.6
      this.camAt = instant ? -1e4 : t
      if (k > 0 && this.stage === 0)
        this.stageAt = instant ? -1e4 : t
    }
    // шаг за тряской — взрыв: камера чуть сближается с местом, где будет дыра
    if (stage > last + 1 && this.blastAt === Infinity) {
      this.blastAt = instant ? -1e4 : t
      this.camFrom = instant ? 7.3 : this.camera.position.z
      this.camTo = 7.3
      this.camAt = instant ? -1e4 : t + COLLAPSE_S + 0.6
      this.camDur = 4.5
    }
    this.stage = k
    this.settled = false
  }

  /** начать сборку заново (вход на слайд) или сразу показать готовую планету */
  restart(now: number) {
    this.start = now
    this.settled = false
    this.stage = 0
    this.triggered = 0
    this.stageAt = 0
    this.spinAngle = 0
    this.lastT = 0
    this.shakeAt = Infinity
    this.blastAt = Infinity
    this.entryInstant = false
    this.hero.reset()
    this.camDur = 2.2
    this.hole.visible = false
    this.flare.visible = false
    this.heatLight.intensity = 0
    for (const m of this.mats)
      m.emissiveIntensity = 0
    this.renderer.setClearColor(0x000000, 0)
    for (const c of this.chairs)
      c.t0 = Infinity
    this.camFrom = this.camTo = this.cameras[0] ?? 8.6
    this.camAt = 0
    this.camera.position.z = this.camTo
    if (this.ready)
      this.pose(0)
  }

  /** собственное вращение первых двух стульев: гаснет в первую секунду-две после первого клика */
  private spinAmount(t: number) {
    if (this.stage === 0)
      return 1
    return Math.max(0, 1 - (t - this.stageAt) / 1.8)
  }

  /** сила тряски 0…1: разгоняется за секунду, дальше «дышит» — то стихает, то снова бьёт */
  private shakeAmount(t: number) {
    if (this.shakeAt === Infinity)
      return 0
    // перед взрывом дребезг нарастает до предела, после взрыва стихает мгновенно
    if (this.blastAt !== Infinity) {
      const tc = t - this.blastAt
      return tc >= COLLAPSE_S ? 0 : 0.8 + 1.5 * Math.max(0, tc) / COLLAPSE_S
    }
    const ramp = Math.min(1, Math.max(0, (t - this.shakeAt) / 1.1))
    const bursts = 0.62 + 0.38 * Math.sin(t * 2.1) * Math.sin(t * 0.7 + 1)
    return ramp * ramp * bursts
  }

  /** дребезг одного стула: своя частота и ось, внешние сильнее внутренних */
  private rattle(c: Chair, i: number, t: number, shake: number) {
    const f = 14 + (i % 9) * 3
    const ph = i * 1.7
    const amp = shake * (0.25 + 0.75 * Math.min(1, c.pos.length() / this.radius))
    this.p.x += Math.sin(t * f + ph) * 0.1 * amp
    this.p.y += Math.sin(t * f * 0.8 + ph * 1.3) * 0.1 * amp
    this.p.z += Math.cos(t * f * 0.9 + ph * 0.7) * 0.1 * amp
    this.q.premultiply(this.tmpQ.setFromAxisAngle(this.axis.set(Math.sin(ph), Math.cos(ph * 1.3), Math.sin(ph * 0.7)).normalize(), Math.sin(t * f * 1.1 + ph) * 0.16 * amp))
  }

  /** положение стула во время схлопывания и взрыва; результат — в this.m (локальные координаты планеты) */
  private blastPose(c: Chair, i: number, t: number, tauC: number, te: number, shake: number) {
    const b = c.b
    const collapse = Math.min(1, tauC / COLLAPSE_S)
    this.p.copy(c.pos).multiplyScalar(1 - 0.28 * collapse * collapse)
    this.q.copy(c.quat)
    let sc = c.scale
    if (te <= 0) {
      this.rattle(c, i, t, shake)
      this.s.setScalar(sc)
      this.m.compose(this.p, this.q, this.s)
      return
    }
    // взрыв: удар разгоняет стулья по радиусу, дальше они тормозят и кувыркаются
    const speedK = b.captured ? 0.45 : 1
    const dist = (b.speed * (1 - Math.exp(-1.6 * te)) / 1.6 + b.speed * 0.15 * te) * speedK
    this.p.addScaledVector(b.dir, dist)
    this.q.premultiply(this.tmpQ.setFromAxisAngle(b.axis, b.rate * te))
    if (!b.captured) {
      sc *= 1 - smooth(1.8 + 2 * b.h, 3.8 + 2 * b.h, te)
      this.s.setScalar(sc)
      this.m.compose(this.p, this.q, this.s)
      return
    }

    // оставшиеся стулья захватывает дыра: спираль в плоскости диска, вытягивание вдоль радиуса и исчезновение у горизонта
    const w = smooth(0.9, 1.9, te)
    const u = (te / b.period + b.off) % 1
    const rho = (0.45 + b.rOut * (1 - u) ** 1.5) * BH_RS
    const th = b.th0 + 8.5 * (1 - (1 - u) ** 0.4)
    const world = this.p.applyMatrix4(this.pw)
    const orbit = this.tmpV.copy(this.e1).multiplyScalar(Math.cos(th) * rho).addScaledVector(this.e2, Math.sin(th) * rho)
    world.lerp(orbit, w)
    this.q.premultiply(this.pwQ)
    const fade = (1 - w * (1 - smooth(0, 0.08, u))) * (1 - w * smooth(0.82, 0.97, u))
    sc = (sc + (0.3 - sc) * w) * fade
    this.s.setScalar(sc)
    const stretch = 1 + 4.5 * u ** 3 * w
    const r = this.axis.copy(world).normalize()
    const k = stretch - 1
    this.tmpM.set(
      1 + k * r.x * r.x, k * r.x * r.y, k * r.x * r.z, 0,
      k * r.x * r.y, 1 + k * r.y * r.y, k * r.y * r.z, 0,
      k * r.x * r.z, k * r.y * r.z, 1 + k * r.z * r.z, 0,
      0, 0, 0, 1,
    )
    // растяжение вокруг собственного центра стула, потом перенос в мировую позицию и в систему планеты
    this.m.compose(this.tmpV.set(0, 0, 0), this.q, this.s).premultiply(this.tmpM).setPosition(world)
    this.m.premultiply(this.pi)
  }

  private pose(t: number) {
    const shake = this.shakeAmount(t)
    const tauC = t - this.blastAt
    const blasting = this.blastAt !== Infinity && tauC >= 0
    const te = tauC - COLLAPSE_S
    let moving = this.spinAmount(t) > 0 || this.shakeAt !== Infinity || blasting
    if (blasting) {
      this.planet.updateMatrixWorld(true)
      this.pw.copy(this.planet.matrixWorld)
      this.pi.copy(this.pw).invert()
      this.pwQ.setFromRotationMatrix(this.pw)
    }
    const spin = new THREE.Quaternion()
    this.chairs.forEach((c, i) => {
      const k = Math.min(1, Math.max(0, (t - c.t0) / c.flight))
      if (k < 1 && c.t0 !== Infinity)
        moving = true
      if (k <= 0) {
        // ещё не вылетел — прячем
        this.m.makeScale(0, 0, 0)
      }
      else if (blasting && k >= 1) {
        this.blastPose(c, i, t, tauC, te, shake)
      }
      else {
        const e = ease(k)
        this.p.lerpVectors(c.from, c.pos, e)
        this.q.slerpQuaternions(c.fromQuat, c.quat, e)
        // два первых стула вертятся вокруг своей вертикали, пока они одни
        if (i < 2)
          this.q.premultiply(spin.setFromAxisAngle(this.up, this.spinAngle * (i ? -1 : 1)))
        // тряска: каждый стул дребезжит на своей частоте, внешние — сильнее внутренних
        if (shake > 0 && k >= 1)
          this.rattle(c, i, t, shake)
        this.s.setScalar(c.scale * Math.min(1, k * 4))
        this.m.compose(this.p, this.q, this.s)
      }
      for (const mesh of this.meshes)
        mesh.setMatrixAt(i, this.m)
      if (i < 2 && this.censors[i])
        this.censors[i].matrix.copy(this.m)
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
    const buf = this.renderer.getDrawingBufferSize(new THREE.Vector2())

    const t = (now - this.start) / 1000
    this.spinAngle += Math.max(0, t - this.lastT) * 1.1 * this.spinAmount(t)
    this.lastT = t
    this.camera.position.z = this.camFrom + (this.camTo - this.camFrom) * ease(Math.min(1, Math.max(0, (t - this.camAt) / this.camDur)))

    // докручивается быстрее во время сборки и замедляется до ленивого вращения
    this.planet.rotation.y = t * 0.08 + 0.9 * (1 - Math.exp(-t * 0.6))
    // шаткая конструкция: вся куча дёргается и качается, будто вот-вот посыплется
    const shake = this.shakeAmount(t)
    this.planet.position.set(
      (Math.sin(t * 41) * 0.05 + Math.sin(t * 23 + 1) * 0.04) * shake,
      (Math.sin(t * 37 + 2) * 0.045 + Math.sin(t * 19) * 0.03) * shake,
      0,
    )
    this.planet.rotation.x = 0.35 + Math.sin(t * 1.9) * 0.05 * shake
    this.planet.rotation.z = -0.2 + (Math.sin(t * 13) * 0.012 + Math.sin(t * 1.4) * 0.07) * shake
    this.planet.updateMatrixWorld(true)

    this.blastEffects(t)
    // герой сцены: шаг сюжета — по тому, что уже случилось с кучей
    const tauB = t - this.blastAt
    const step = this.blastAt !== Infinity && tauB >= 0 ? 5 : this.shakeAt !== Infinity && t >= this.shakeAt ? 4 : this.stage
    this.hero.update(t, {
      step,
      te: step === 5 ? tauB - COLLAPSE_S : -Infinity,
      e1: this.e1,
      e2: this.e2,
      rs: BH_RS,
      instant: this.entryInstant,
      camZ: this.camera.position.z,
      aspect: this.camera.aspect,
    })
    if (this.ready && !this.settled)
      this.settled = !this.pose(t)
    const censor = this.ready && this.censors.length ? this.censorAmount(t) : 0
    if (censor > 0)
      this.renderCensored(buf, censor)
    else
      this.renderer.render(this.scene, this.camera)
  }

  /** кадр во внеэкранную цель, затем на экран через шейдер цензуры */
  private renderCensored(buf: THREE.Vector2, k: number) {
    if (!this.post) {
      const target = new THREE.WebGLRenderTarget(buf.x, buf.y, { type: THREE.HalfFloatType, samples: 4 })
      const mat = new THREE.ShaderMaterial({
        vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
        fragmentShader: CENSOR_FRAG,
        uniforms: {
          uTex: { value: target.texture },
          uRes: { value: new THREE.Vector2() },
          uRects: { value: [new THREE.Vector4(), new THREE.Vector4()] },
          uCells: { value: [8, 8] },
        },
        depthTest: false,
        depthWrite: false,
        blending: THREE.NoBlending,
      })
      const scene = new THREE.Scene()
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat))
      this.post = { target, scene, cam: new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), mat }
    }
    const { target, scene, cam, mat } = this.post
    if (target.width !== buf.x || target.height !== buf.y)
      target.setSize(buf.x, buf.y)
    const { rects, cells } = this.censorRects(buf.x, buf.y, k)
    const u = mat.uniforms
    u.uRes.value.copy(buf)
    ;(u.uRects.value as THREE.Vector4[]).forEach((r, i) => r.fromArray(rects, i * 4))
    u.uCells.value = [cells[0], cells[1]]
    this.renderer.setRenderTarget(target)
    this.renderer.clear()
    this.renderer.render(this.scene, this.camera)
    this.renderer.setRenderTarget(null)
    this.renderer.render(scene, cam)
  }

  /** вспышка, жар, ударные волны и чёрная дыра: всё, что не стулья; зависит только от времени взрыва */
  private blastEffects(t: number) {
    const tauC = t - this.blastAt
    const blasting = this.blastAt !== Infinity && tauC >= 0
    if (!blasting) {
      if (this.flare.visible || this.hole.visible)
        this.restartEffects()
      return
    }
    const collapse = Math.min(1, tauC / COLLAPSE_S)
    const te = tauC - COLLAPSE_S

    // жар: стулья раскаляются при схлопывании и вспыхивают при взрыве
    const heat = te <= 0 ? 0.9 * collapse * collapse : 1.4 * Math.exp(-te * 2.2)
    for (const m of this.mats)
      m.emissiveIntensity = heat
    this.heatLight.intensity = heat * 55

    // белая вспышка на весь кадр: перед взрывом нарастает, после — быстро гаснет
    const flash = te > 0 ? Math.exp(-te * 5) * 0.95 : smooth(0.8, 1, collapse) * 0.4
    this.renderer.setClearColor(0xfff2e0, flash)

    // ядро и ударные волны
    const fu = this.flare.material as THREE.ShaderMaterial
    fu.uniforms.uTau.value = te
    fu.uniforms.uCol.value = te <= 0 ? collapse * collapse : Math.exp(-te * 1.8)
    this.flare.visible = te < 7

    // чёрная дыра растёт из центра, пока рассеивается огонь
    const hu = this.hole.material as THREE.ShaderMaterial
    hu.uniforms.uTime.value = t
    hu.uniforms.uGrow.value = ease(Math.min(1, Math.max(0, (te - 0.35) / 3.4)))
    hu.uniforms.uFade.value = smooth(0.3, 1.1, te)
    this.hole.visible = te > 0.3

    // толчок при взрыве
    if (te > 0) {
      const k = Math.exp(-te * 3.2)
      this.camera.position.x = Math.sin(te * 55) * 0.14 * k
      this.camera.position.y = Math.cos(te * 47) * 0.11 * k
    }
    else {
      this.camera.position.x = Math.sin(t * 90) * 0.02 * collapse
      this.camera.position.y = Math.cos(t * 83) * 0.02 * collapse
    }
  }

  private restartEffects() {
    this.hole.visible = false
    this.flare.visible = false
    this.heatLight.intensity = 0
    for (const m of this.mats)
      m.emissiveIntensity = 0
    this.renderer.setClearColor(0x000000, 0)
    this.camera.position.x = this.camera.position.y = 0
  }

  dispose() {
    this.hero.dispose()
    this.envTex?.dispose()
    this.post?.target.dispose()
    this.post?.mat.dispose()
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
