import * as THREE from 'three'

/**
 * Нарративный герой сцены со стульями — тот самый астронавт из слайдов с экипажем (CrewStation):
 * белый скафандр, серый ранец, тёмное забрало, полоса цвета команды.
 *
 * Скелет — иерархия суставов (Object3D): корень → таз → бёдра → голени, позвоночник → грудь → плечи → локти, шея → шлем.
 * Каждый сустав тянется к целевому углу позы (демпфер), поверх — процедурная анимация: дыхание,
 * дрожь, махи. На забрале светится «экранное» лицо: глаза, рот, брови-морщины — им он и играет эмоции.
 *
 * Сюжет по шагам слайда (`step`):
 *   0 — задумчиво парит у станции, рука у подбородка, поглядывает на два стула
 *   1 — стульев становится больше: настороженность, «!»
 *   2 — испуг: подтягивает колени, руки к шлему, пятится от кучи, «!!»
 *   3 — ужас от горы стульев: руки вверх, пот, «!!!»
 *   4 — куча трясётся: он сжимается в комок и трясётся вместе с ней
 *   5 — взрыв: его отбрасывает на зрителя, он кувыркается и барахтается, дыра подхватывает —
 *       по спирали летит над горизонтом, уменьшаясь, и растягивается в «спагетти»
 */

const SUIT = '#f1f1f4'
const PACK = '#b9bac4'
const TEAM = '#a78bfa'
const VISOR = '#1f1b3a'

type V3 = [number, number, number]

/** позы: углы суставов (рад). Плечо: x<0 — вперёд, z — в сторону; локоть: x<0 — сгиб вперёд-вверх */
interface Pose {
  spine: V3
  head: V3
  shL: V3
  shR: V3
  elL: V3
  elR: V3
  hipL: V3
  hipR: V3
  knL: V3
  knR: V3
  /** лицо: размер глаз, раскрытие рта (0 — нет), морщина-«хмурость» (0…1), улыбка (0…1), прищур глаз (0…1) */
  eyes: number
  mouth: number
  frown: number
  smile: number
  squint: number
  /** сила дрожи 0…1 */
  tremble: number
}

const P = (p: Partial<Pose>): Pose => ({
  spine: [0, 0, 0], head: [0, 0, 0],
  shL: [0, 0, -0.12], shR: [0, 0, 0.12], elL: [-0.2, 0, 0], elR: [-0.2, 0, 0],
  hipL: [-0.15, 0, -0.06], hipR: [-0.15, 0, 0.06], knL: [0.3, 0, 0], knR: [0.3, 0, 0],
  eyes: 1, mouth: 0, frown: 0, smile: 0, squint: 0, tremble: 0,
  ...p,
})

const POSES = {
  // задумчивость: правая рука у подбородка, левая поддерживает локоть, взгляд на стулья слева
  think: P({
    spine: [0.08, -0.15, 0], head: [0.14, -0.5, 0.12],
    shR: [-0.95, 0, 0.15], elR: [-2.05, 0, 0],
    shL: [-0.55, 0, -0.1], elL: [-1.55, 0, 0],
    hipL: [-0.3, 0, -0.08], knL: [0.55, 0, 0], hipR: [-0.12, 0, 0.08], knR: [0.4, 0, 0],
    eyes: 0.8, squint: 0.15,
  }),
  // настороженность: руки к груди, голова поворачивается к куче
  worry: P({
    spine: [-0.04, -0.1, 0], head: [-0.05, -0.3, 0],
    shR: [-0.45, 0, 0.55], elR: [-1.1, 0, 0], shL: [-0.45, 0, -0.55], elL: [-1.1, 0, 0],
    hipL: [-0.45, 0, -0.1], knL: [0.7, 0, 0], hipR: [-0.4, 0, 0.1], knR: [0.7, 0, 0],
    eyes: 1.2, frown: 1, tremble: 0.1,
  }),
  // испуг: колени к животу, ладони у шлема, откинулся
  scared: P({
    spine: [-0.15, 0, 0], head: [-0.1, -0.15, 0],
    shR: [-1.15, 0, 0.45], elR: [-2.25, 0, 0], shL: [-1.15, 0, -0.45], elL: [-2.25, 0, 0],
    hipL: [-0.85, 0, -0.15], knL: [1.1, 0, 0], hipR: [-0.8, 0, 0.15], knR: [1.15, 0, 0],
    eyes: 1.45, mouth: 0.55, frown: 1, tremble: 0.3,
  }),
  // ужас: руки вверх, голова запрокинута, ноги врозь
  horror: P({
    spine: [-0.28, 0, 0], head: [-0.35, 0, 0],
    shR: [-0.15, 0, 2.55], elR: [-0.2, 0, 0], shL: [-0.15, 0, -2.55], elL: [-0.2, 0, 0],
    hipL: [-0.3, 0, -0.45], knL: [0.45, 0, 0], hipR: [-0.3, 0, 0.45], knR: [0.45, 0, 0],
    eyes: 1.75, mouth: 1.05, tremble: 0.5,
  }),
  // тряска: комок — колени к груди, руки закрывают шлем
  terror: P({
    spine: [0.45, 0, 0], head: [0.4, 0, 0],
    shR: [-2.2, 0, 0.35], elR: [-1.95, 0, 0], shL: [-2.2, 0, -0.35], elL: [-1.95, 0, 0],
    hipL: [-1.55, 0, -0.1], knL: [1.95, 0, 0], hipR: [-1.5, 0, 0.1], knR: [1.95, 0, 0],
    eyes: 1.3, mouth: 1.3, tremble: 1,
  }),
  // взрывом раскинуло звездой
  fly: P({
    spine: [-0.35, 0, 0], head: [-0.4, 0, 0],
    shR: [-0.3, 0, 2.0], elR: [-0.3, 0, 0], shL: [-0.3, 0, -2.0], elL: [-0.3, 0, 0],
    hipL: [-0.1, 0, -0.55], knL: [0.1, 0, 0], hipR: [-0.1, 0, 0.55], knR: [0.1, 0, 0],
    eyes: 1.9, mouth: 1.7, tremble: 0.6,
  }),
  // барахтается: руки и ноги ходят ходуном (амплитуды добавляются в update)
  flail: P({
    spine: [-0.2, 0, 0], head: [-0.2, 0, 0],
    shR: [-0.5, 0, 1.4], elR: [-0.6, 0, 0], shL: [-0.5, 0, -1.4], elL: [-0.6, 0, 0],
    hipL: [-0.6, 0, -0.3], knL: [0.7, 0, 0], hipR: [-0.6, 0, 0.3], knR: [0.7, 0, 0],
    eyes: 1.8, mouth: 1.5, tremble: 0.35,
  }),
} as const

type PoseName = keyof typeof POSES

/**
 * где парит астронавт на каждом шаге — в экранных координатах (x вправо, y вверх, −1…1) и доле высоты кадра:
 * камера на шагах разная, а герой должен оставаться в нижнем правом углу под станцией (её модули в этом
 * углу его закрыли бы). Мировая позиция считается из экранной каждый кадр.
 */
const BASE: [number, number, number][] = [
  [0.6, -0.6, 0.34],
  [0.68, -0.58, 0.36],
  [0.74, -0.57, 0.38],
  [0.78, -0.57, 0.4],
  [0.78, -0.57, 0.4],
]
/** глубина, на которой парит герой (мировой z), тангенс половины вертикального угла камеры и высота модели */
const HERO_Z = 0.6
const TAN = Math.tan(17 * Math.PI / 180)
const MODEL_H = 1.4

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const ease = (t: number) => 1 - (1 - t) ** 3

export interface AstronautState {
  /** шаг слайда 0…5 */
  step: number
  /** секунд от взрыва: <0 — схлопывание, 0 — вспышка; для шагов до 5 — -Infinity */
  te: number
  /** оси диска чёрной дыры (мир) и радиус тени */
  e1: THREE.Vector3
  e2: THREE.Vector3
  rs: number
  /** на входе сразу в нужном шаге (возврат на слайд) */
  instant?: boolean
  /** камера: дистанция и соотношение сторон кадра */
  camZ: number
  aspect: number
}

export class Astronaut {
  readonly group = new THREE.Group()
  /** корень с ручной матрицей: сюда складывается растяжение «спагетти» */
  private rig = new THREE.Group()
  private joints: Record<string, THREE.Object3D> = {}
  private cur: Record<string, V3> = {}
  private face = { eyes: 1, mouth: 0, frown: 0, smile: 0, squint: 0, tremble: 0 }
  private eyeL!: THREE.Mesh
  private eyeR!: THREE.Mesh
  private mouthO!: THREE.Mesh
  private frownM!: THREE.Mesh
  private smileM!: THREE.Mesh
  private sweat: THREE.Mesh[] = []
  private bang!: THREE.Sprite
  private bangTex: THREE.CanvasTexture[] = []
  /** экранная позиция героя: x, y (−1…1) и доля высоты кадра — сглаживается между шагами */
  private ndc = { x: 1.6, y: -0.3, f: 0.2 }
  private lastT = 0
  private lastStep = -1
  private pulse = 0
  private first = true
  private disposables: { dispose: () => void }[] = []
  private m = new THREE.Matrix4()
  private q = new THREE.Quaternion()
  private v = new THREE.Vector3()
  private zero = new THREE.Vector3()

  constructor() {
    this.rig.matrixAutoUpdate = false
    this.group.add(this.rig)
    this.group.visible = false
    this.build()
  }

  private mat(color: string, extra: THREE.MeshStandardMaterialParameters = {}) {
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05, ...extra })
    this.disposables.push(m)
    return m
  }

  private geo<T extends THREE.BufferGeometry>(g: T) {
    this.disposables.push(g)
    return g
  }

  private joint(name: string, parent: THREE.Object3D, x: number, y: number, z: number) {
    const o = new THREE.Object3D()
    o.position.set(x, y, z)
    parent.add(o)
    this.joints[name] = o
    this.cur[name] = [0, 0, 0]
    return o
  }

  /** капсула, свисающая вниз от сустава */
  private limb(parent: THREE.Object3D, r: number, len: number, mat: THREE.Material) {
    const g = this.geo(new THREE.CapsuleGeometry(r, len, 6, 14))
    g.translate(0, -len / 2 - r * 0.2, 0)
    const m = new THREE.Mesh(g, mat)
    parent.add(m)
    return m
  }

  private build() {
    const suit = this.mat(SUIT)
    const pack = this.mat(PACK)
    const team = this.mat(TEAM, { emissive: new THREE.Color(TEAM), emissiveIntensity: 0.25 })
    const glove = this.mat('#d9dae4')
    const visor = this.mat(VISOR, { roughness: 0.12, metalness: 0.4, emissive: new THREE.Color('#2a1d5c'), emissiveIntensity: 0.6 })

    const body = this.joint('body', this.rig, 0, 0, 0)
    const hips = this.joint('hips', body, 0, 0, 0)
    // «спина»: позвоночник и грудь
    const spine = this.joint('spine', hips, 0, 0.02, 0)
    const torsoG = this.geo(new THREE.CapsuleGeometry(0.14, 0.2, 6, 16))
    torsoG.translate(0, 0.16, 0)
    spine.add(new THREE.Mesh(torsoG, suit))
    const stripeG = this.geo(new THREE.CylinderGeometry(0.147, 0.147, 0.045, 24))
    const stripe = new THREE.Mesh(stripeG, team)
    stripe.position.y = 0.2
    spine.add(stripe)
    const packG = this.geo(new THREE.BoxGeometry(0.26, 0.32, 0.13))
    const packM = new THREE.Mesh(packG, pack)
    packM.position.set(0, 0.2, -0.17)
    spine.add(packM)

    // голова: шея, шлем, забрало, лицо
    const neck = this.joint('head', spine, 0, 0.36, 0)
    const helmG = this.geo(new THREE.SphereGeometry(0.175, 28, 20))
    const helm = new THREE.Mesh(helmG, suit)
    helm.position.y = 0.13
    neck.add(helm)
    const visG = this.geo(new THREE.SphereGeometry(1, 24, 16))
    const vis = new THREE.Mesh(visG, visor)
    vis.scale.set(0.125, 0.098, 0.08)
    vis.position.set(0, 0.135, 0.115)
    neck.add(vis)

    const faceMat = new THREE.MeshBasicMaterial({ color: '#d9ccff' })
    this.disposables.push(faceMat)
    const eyeG = this.geo(new THREE.SphereGeometry(1, 14, 10))
    const mkEye = (x: number) => {
      const e = new THREE.Mesh(eyeG, faceMat)
      e.position.set(x, 0.15, 0.185)
      neck.add(e)
      return e
    }
    this.eyeL = mkEye(-0.045)
    this.eyeR = mkEye(0.045)
    this.mouthO = new THREE.Mesh(eyeG, faceMat)
    this.mouthO.position.set(0, 0.098, 0.186)
    neck.add(this.mouthO)
    // дуга: ∩ — хмурость, ∪ — улыбка
    const arcG = this.geo(new THREE.TorusGeometry(0.03, 0.007, 6, 16, Math.PI))
    this.frownM = new THREE.Mesh(arcG, faceMat)
    this.frownM.position.set(0, 0.088, 0.187)
    this.smileM = new THREE.Mesh(arcG, faceMat)
    this.smileM.rotation.z = Math.PI
    this.smileM.position.set(0, 0.112, 0.187)
    neck.add(this.frownM, this.smileM)

    // капли пота
    const dropG = this.geo(new THREE.SphereGeometry(0.022, 8, 8))
    const dropM = new THREE.MeshBasicMaterial({ color: '#9bdcff' })
    this.disposables.push(dropM)
    for (let i = 0; i < 5; i++) {
      const d = new THREE.Mesh(dropG, dropM)
      d.visible = false
      neck.add(d)
      this.sweat.push(d)
    }

    // «!» над головой
    for (const text of ['!', '!!', '!!!']) {
      const c = document.createElement('canvas')
      c.width = 256
      c.height = 128
      const g = c.getContext('2d')!
      g.font = '900 120px sans-serif'
      g.textAlign = 'center'
      g.textBaseline = 'middle'
      g.lineWidth = 14
      g.strokeStyle = '#2b1d4d'
      g.strokeText(text, 128, 70)
      g.fillStyle = '#fde047'
      g.fillText(text, 128, 70)
      const tex = new THREE.CanvasTexture(c)
      tex.colorSpace = THREE.SRGBColorSpace
      this.bangTex.push(tex)
      this.disposables.push(tex)
    }
    const bangMat = new THREE.SpriteMaterial({ map: this.bangTex[0], transparent: true, depthTest: false })
    this.disposables.push(bangMat)
    this.bang = new THREE.Sprite(bangMat)
    this.bang.visible = false
    this.bang.renderOrder = 5
    this.rig.add(this.bang)

    // руки: плечо → локоть → перчатка
    for (const side of [-1, 1] as const) {
      const n = side < 0 ? 'L' : 'R'
      const sh = this.joint(`sh${n}`, spine, side * 0.185, 0.3, 0)
      this.limb(sh, 0.052, 0.17, suit)
      const el = this.joint(`el${n}`, sh, 0, -0.26, 0)
      this.limb(el, 0.047, 0.15, suit)
      const hand = new THREE.Mesh(this.geo(new THREE.SphereGeometry(0.062, 14, 10)), glove)
      hand.position.set(0, -0.28, 0)
      el.add(hand)
      // ноги: бедро → колено → ботинок
      const hip = this.joint(`hip${n}`, hips, side * 0.075, -0.02, 0)
      this.limb(hip, 0.066, 0.2, suit)
      const kn = this.joint(`kn${n}`, hip, 0, -0.3, 0)
      this.limb(kn, 0.058, 0.2, suit)
      const boot = new THREE.Mesh(this.geo(new THREE.BoxGeometry(0.1, 0.07, 0.17)), pack)
      boot.position.set(0, -0.32, 0.035)
      kn.add(boot)
    }
    // ось «вокруг себя»: центр тела примерно на уровне пояса
    body.position.y = 0.05
    // матрица корня задаётся вручную — отсечение по границам не нужно (герой всегда в кадре или за кадром сознательно)
    this.group.traverse((o) => {
      o.frustumCulled = false
    })
  }

  /** сбросить на новый вход на слайд */
  reset() {
    this.first = true
    this.lastStep = -1
    this.lastT = 0
    this.group.visible = false
    this.pulse = 0
    this.ndc = { x: 1.6, y: -0.3, f: 0.2 }
    this.face = { eyes: 1, mouth: 0, frown: 0, smile: 0, squint: 0, tremble: 0 }
  }

  update(t: number, s: AstronautState) {
    const dt = Math.min(0.5, Math.max(0, t - this.lastT))
    this.lastT = t
    const snap = this.first && !!s.instant
    this.first = false
    if (s.step !== this.lastStep) {
      if (this.lastStep >= 0 && s.step >= 1 && s.step <= 4)
        this.pulse = 1
      this.lastStep = s.step
    }
    this.pulse = Math.max(0, this.pulse - dt * 2.2)

    const blasting = s.step >= 5
    const te = blasting ? s.te : -Infinity
    const orbitU = blasting ? Math.min(1, Math.max(0, (te - 3.0) / 8.5)) : 0
    if (blasting && orbitU >= 1) {
      this.group.visible = false
      return
    }

    // ── поза и лицо ────────────────────────────────────────────
    let target: Pose
    let flail = 0
    if (!blasting) {
      target = [POSES.think, POSES.worry, POSES.scared, POSES.horror, POSES.terror][Math.min(4, s.step)]
    }
    else if (te < 0) {
      target = POSES.terror
    }
    else if (te < 1.3) {
      target = POSES.fly
      flail = 0.4
    }
    else {
      target = POSES.flail
      flail = 1
    }

    const k = snap ? 1 : 1 - Math.exp(-dt * (blasting && te > 0 ? 7 : 4.2))
    for (const name of Object.keys(this.cur)) {
      const tg = (target as unknown as Record<string, V3>)[name === 'head' ? 'head' : name]
      if (!tg)
        continue
      const c = this.cur[name]
      for (let i = 0; i < 3; i++)
        c[i] += (tg[i] - c[i]) * k
    }
    const f = this.face
    f.eyes += (target.eyes - f.eyes) * k
    f.mouth += (target.mouth - f.mouth) * k
    f.frown += (target.frown - f.frown) * k
    f.smile += (target.smile - f.smile) * k
    f.squint += (target.squint - f.squint) * k
    f.tremble += (target.tremble - f.tremble) * k

    const tr = f.tremble
    // дрожь: быстрая и мелкая, «шумом» из нескольких синусов; в тряске — сильнее
    const jit = (seed: number, amp: number) => (Math.sin(t * 38 + seed) + 0.6 * Math.sin(t * 57 + seed * 1.9) + 0.4 * Math.sin(t * 91 + seed * 0.7)) * amp * tr
    let idx = 0
    for (const [name, c] of Object.entries(this.cur)) {
      const j = this.joints[name]
      idx++
      let x = c[0] + jit(idx, 0.06)
      let y = c[1] + jit(idx + 3, 0.04)
      let z = c[2] + jit(idx + 7, 0.05)
      // дыхание/парение: медленные покачивания, пока не страшно
      const calm = 1 - Math.min(1, tr * 1.6)
      if (name === 'spine')
        x += Math.sin(t * 1.3) * 0.03 * calm
      if (name === 'head')
        z += Math.sin(t * 0.8) * 0.04 * calm
      // барахтанье: руки и ноги ходят ходуном
      if (flail > 0) {
        const w = flail
        if (name === 'shR') { z += Math.sin(t * 9) * 0.8 * w; x += Math.cos(t * 7) * 0.5 * w }
        if (name === 'shL') { z -= Math.sin(t * 9 + 1.3) * 0.8 * w; x += Math.cos(t * 7 + 2) * 0.5 * w }
        if (name === 'elR' || name === 'elL')
          x += Math.sin(t * 11 + idx) * 0.6 * w
        if (name === 'hipL') x += Math.sin(t * 8) * 0.8 * w
        if (name === 'hipR') x += Math.sin(t * 8 + Math.PI) * 0.8 * w
        if (name === 'knL' || name === 'knR')
          x += Math.abs(Math.sin(t * 8 + idx)) * 0.8 * w
        if (name === 'head')
          y += Math.sin(t * 13) * 0.35 * w
      }
      j.rotation.set(x, y, z)
    }

    // лицо: глаза-овалы, рот-«О», хмурая и весёлая дуги
    const blink = (Math.sin(t * 0.9 + 1) > 0.992 || Math.sin(t * 1.7) > 0.998) ? 0.15 : 1
    const ey = f.eyes * (1 - f.squint * 0.85) * blink
    const ex = f.eyes * (1 + f.squint * 0.3)
    this.eyeL.scale.set(0.017 * ex, 0.024 * ey, 0.01)
    this.eyeR.scale.copy(this.eyeL.scale)
    // взгляд: в задумчивости глаза скошены в сторону стульев
    const gaze = (1 - Math.min(1, f.eyes - 0.8)) * 0.01
    this.eyeL.position.x = -0.045 - gaze
    this.eyeR.position.x = 0.045 - gaze
    const open = f.mouth
    this.mouthO.visible = open > 0.05
    this.mouthO.scale.set(0.014 + 0.012 * open, 0.008 + 0.022 * open, 0.01)
    this.frownM.visible = f.frown > 0.4 && open < 0.4
    this.smileM.visible = f.smile > 0.4

    // пот: капли срываются с головы при сильном испуге
    for (let i = 0; i < this.sweat.length; i++) {
      const d = this.sweat[i]
      const on = tr > 0.4
      d.visible = on
      if (!on)
        continue
      const ph = (t * 0.9 + i / this.sweat.length) % 1
      const side = i % 2 ? 1 : -1
      d.position.set(side * (0.17 + ph * 0.28), 0.28 + ph * 0.18 - ph * ph * 0.34, 0.03)
      d.scale.setScalar(1 - ph * 0.7)
    }

    // «!» над головой на шагах 1…3: всплывает пружинкой, при смене шага вздрагивает
    this.bang.visible = !blasting && s.step >= 1 && s.step <= 3
    if (this.bang.visible) {
      ;(this.bang.material as THREE.SpriteMaterial).map = this.bangTex[Math.min(2, s.step - 1)]
      const sc = 0.55 * (1 + 0.35 * this.pulse * Math.sin(this.pulse * 12)) * (1 - 0.15 * (1 - this.pulse))
      this.bang.scale.set(sc * 1.4, sc * 0.7, 1)
      this.bang.position.set(0.12, 1.1 + Math.sin(t * 6) * 0.015, 0)
    }

    // ── положение ─────────────────────────────────────────────
    const ent = ease(Math.min(1, Math.max(0, (t - 0.5) / 1.8)))
    const base = BASE[Math.min(4, s.step)]
    const fear = Math.min(1, tr * 1.3)
    const bob = Math.sin(t * 0.9) * 0.04 * (1 - fear)
    const jolt = this.pulse * Math.sin(this.pulse * 9) * 0.06
    const posK = snap ? 1 : 1 - Math.exp(-dt * 2.2)
    this.ndc.x += (base[0] - this.ndc.x) * posK
    this.ndc.y += (base[1] - this.ndc.y) * posK
    this.ndc.f += (base[2] - this.ndc.f) * posK
    const depth = s.camZ - HERO_Z
    const toWorld = (x: number, y: number, f: number, d: number) => ({
      p: new THREE.Vector3(x * d * TAN * s.aspect, y * d * TAN, HERO_Z),
      sc: f * 2 * d * TAN / MODEL_H,
    })
    const here = toWorld(this.ndc.x + (1 - ent) * 0.5 + jolt, this.ndc.y + bob + (1 - ent) * 0.25, this.ndc.f, depth)
    const place = here.p
    place.x += jit(42, 0.05) * 0.8
    place.y += jit(41, 0.05) * 0.5
    let roll = Math.sin(t * 0.55) * 0.09 * (1 - fear) + jit(43, 0.05) * 0.8
    let yaw = -0.35 + Math.sin(t * 0.4) * 0.07
    let pitch = 0
    let scale = here.sc * (snap ? 1 : 0.4 + 0.6 * ent)
    if (s.step >= 1 && s.step <= 4)
      yaw = -0.35 - 0.12 * Math.min(1, s.step)
    let stretchK = 0
    const radial = this.v.clone()

    if (blasting) {
      // схлопывание: жмётся и дрожит сильнее, затем взрыв
      const b4 = BASE[4]
      const d4 = 8.6 - HERO_Z
      const bw = toWorld(b4[0], b4[1], b4[2], d4)
      const bx = bw.p.toArray()
      if (te < 0) {
        place.copy(bw.p)
        place.x += jit(50, 0.1)
        place.y += jit(51, 0.1)
        scale = bw.sc
      }
      else {
        // удар: отбросило на зрителя и к центру кадра, вращая; дальше дыра тянет на орбиту
        const dirB = new THREE.Vector3(-0.55, 0.15, 0.82).normalize()
        const A = 3.1 * (1 - Math.exp(-1.7 * te))
        const fly = new THREE.Vector3(bx[0], bx[1], bx[2]).addScaledVector(dirB, A)
        // орбита в плоскости диска: по спирали к горизонту
        const rho = 0.5 + 2.8 * (1 - orbitU) ** 1.35
        const th = 0.25 + Math.PI * 2 * 1.35 * (1 - (1 - orbitU) ** 0.55)
        const orbit = new THREE.Vector3().copy(s.e1).multiplyScalar(Math.cos(th) * rho).addScaledVector(s.e2, Math.sin(th) * rho)
        const w = smooth(1.2, 3.2, te)
        place.copy(fly).lerp(orbit, w)
        // у дыры он крошечный: тень горизонта — 0.55, а в кадре у взрыва он выше неё в несколько раз
        scale = bw.sc * (1 - 0.8 * w)
        // кувырки: сильные сразу после удара, затухают по мере захвата
        const tumble = 1 - smooth(2.5, 4.5, te)
        roll = (te * 3.1) * Math.exp(-te * 0.18) * tumble + roll * (1 - tumble)
        pitch = (te * 2.2) * Math.exp(-te * 0.22) * tumble
        yaw = yaw * (1 - tumble) + Math.sin(te * 1.7) * 0.5 * tumble
        // голова вперёд, к горизонту, перед самым падением
        const dive = smooth(0.62, 0.88, orbitU)
        if (dive > 0) {
          radial.copy(place).normalize()
          const phi = Math.atan2(-radial.y, -radial.x)
          roll = roll * (1 - dive) + (phi - Math.PI / 2) * dive
        }
        // чем ближе к дыре, тем меньше и тем сильнее вытянут вдоль радиуса
        scale *= 0.45 + 0.55 * (1 - orbitU) ** 0.5
        scale *= 1 - smooth(0.86, 0.99, orbitU)
        stretchK = 7 * orbitU ** 4
        radial.copy(place).normalize()
      }
    }

    // матрица корня: перенос · поворот · масштаб, затем растяжение вдоль радиуса «спагетти»
    this.q.setFromEuler(new THREE.Euler(pitch, yaw, roll, 'ZYX'))
    this.m.compose(this.zero, this.q, this.v.setScalar(scale))
    if (stretchK > 0) {
      const r = radial
      const kk = stretchK
      const sm = new THREE.Matrix4().set(
        1 + kk * r.x * r.x, kk * r.x * r.y, kk * r.x * r.z, 0,
        kk * r.x * r.y, 1 + kk * r.y * r.y, kk * r.y * r.z, 0,
        kk * r.x * r.z, kk * r.y * r.z, 1 + kk * r.z * r.z, 0,
        0, 0, 0, 1,
      )
      // вытягиваем вокруг собственного центра, а не вокруг дыры — иначе он «уезжает» вместе с растяжением
      this.m.premultiply(sm)
    }
    this.m.setPosition(place)
    this.rig.matrix.copy(this.m)
    this.rig.matrixWorldNeedsUpdate = true
    this.group.visible = true
  }

  dispose() {
    for (const d of this.disposables)
      d.dispose()
  }
}
