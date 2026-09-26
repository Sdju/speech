<script setup lang="ts">
import { useNav } from '@slidev/client'
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'
import { SurfaceBaker } from '../universe/baker'
import type { CameraFrame } from '../universe/camera'
import { bodyAt, CameraRig, dot, norm, resolveCamera, resolveStation, satelliteRotation, setStationResolver, sub } from '../universe/camera'
import type { CameraSpec, Vec3 } from '../universe/scene'
import { orbitsOf, planets, presets, satellites, station, SUN_DIR } from '../universe/scene'
import { BAKE_SIZE, MAX_P, MAX_S, renderFragment, vertex } from '../universe/shader'
import { StationScene } from '../universe/station'
import { stationScreen } from '../universe/screen'

/**
 * Общая 3D-сцена доклада. Живёт в global-bottom, поэтому не пересоздаётся между слайдами:
 * камера плавно летит от позы предыдущего слайда/клика к новой.
 *
 * Поверхности планет и спутников запекаются в куб-карты (universe/baker.ts);
 * процедурный режим остаётся как эталон и запасной путь без EXT_shader_texture_lod.
 */
type Mode = 'baked' | 'procedural'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const stationCanvas = useTemplateRef<HTMLCanvasElement>('stationCanvas')
const nav = useNav()
const rig = new CameraRig()
const SUN = norm(SUN_DIR)

let gl: WebGLRenderingContext | null = null
let raf = 0
let firstTarget = true
let dispose = () => {}
let stationScene: StationScene | null = null

watch(
  () => resolveCamera(nav.slides.value as any, nav.currentSlideNo.value, nav.clicks.value),
  (spec) => {
    // первый кадр — без перелёта, сразу на место
    rig.setTarget(spec, performance.now(), firstTarget)
    firstTarget = false
  },
  { immediate: true, deep: true },
)

// состояние станции: отстыкованные/скрытые модули; переходы анимирует StationScene
const stationState = () => resolveStation(nav.slides.value as any, nav.currentSlideNo.value, nav.clicks.value)
watch(stationState, state => stationScene?.setState(state, performance.now()), { deep: true })

const UNIFORMS = [
  'u_res', 'u_time', 'u_eye', 'u_right', 'u_up', 'u_fwd', 'u_focal', 'u_shift', 'u_sun',
  'u_pPos', 'u_pColor', 'u_pAxis', 'u_pRing', 'u_pOrbits', 'u_pOrbitA', 'u_pSpin',
  'u_sPos', 'u_sColor', 'u_sAxis', 'u_sRot',
  'u_pMix', 'u_texelAngle', 'u_fullDetail',
  'u_pA0', 'u_pA1', 'u_pA2', 'u_pB0', 'u_pB1', 'u_pB2',
  'u_s0', 'u_s1', 'u_s2', 'u_s3', 'u_s4', 'u_s5',
] as const

interface Program {
  program: WebGLProgram
  loc: number
  U: Record<typeof UNIFORMS[number], WebGLUniformLocation | null>
}

function createProgram(g: WebGLRenderingContext, fragment: string): Program | null {
  const compile = (type: number, src: string) => {
    const s = g.createShader(type)!
    g.shaderSource(s, src)
    g.compileShader(s)
    if (!g.getShaderParameter(s, g.COMPILE_STATUS))
      console.error('[UniverseLayer]', g.getShaderInfoLog(s))
    return s
  }
  const program = g.createProgram()!
  g.attachShader(program, compile(g.VERTEX_SHADER, vertex))
  g.attachShader(program, compile(g.FRAGMENT_SHADER, fragment))
  g.linkProgram(program)
  if (!g.getProgramParameter(program, g.LINK_STATUS)) {
    console.error('[UniverseLayer]', g.getProgramInfoLog(program))
    return null
  }
  const U = Object.fromEntries(UNIFORMS.map(n => [n, g.getUniformLocation(program, n)])) as Program['U']
  return { program, loc: g.getAttribLocation(program, 'a_pos'), U }
}

onMounted(() => {
  const el = canvas.value!
  gl = el.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
  if (!gl)
    return
  const g = gl

  // запечённый режим требует явного mip-уровня (LodEXT) и 6 + 6 текстурных юнитов
  const canBake = !!g.getExtension('EXT_shader_texture_lod')
    && g.getParameter(g.MAX_TEXTURE_IMAGE_UNITS) >= 12
  const programs: Partial<Record<Mode, Program>> = {
    procedural: createProgram(g, renderFragment(false)) ?? undefined,
  }
  if (canBake)
    programs.baked = createProgram(g, renderFragment(true)) ?? undefined
  let mode: Mode = programs.baked ? 'baked' : 'procedural'

  const buf = g.createBuffer()
  g.bindBuffer(g.ARRAY_BUFFER, buf)
  g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), g.STATIC_DRAW)

  // статичные данные тел
  const pPos = new Float32Array(MAX_P * 4)
  const pColor = new Float32Array(MAX_P * 3)
  const pAxis = new Float32Array(MAX_P * 3)
  const pRing = new Float32Array(MAX_P * 4)
  const pOrbits = new Float32Array(MAX_P * 4)
  const pOrbitA = new Float32Array(MAX_P * 4).fill(-1)
  const pSpin = new Float32Array(MAX_P)
  const pMix = new Float32Array(MAX_P)
  planets.slice(0, MAX_P).forEach((p, i) => {
    pPos.set([...p.pos, p.radius], i * 4)
    pColor.set(p.color, i * 3)
    pAxis.set(norm(p.axis), i * 3)
    pRing.set([p.ring?.inner ?? 0, p.ring?.outer ?? 0, p.orbit ?? 0, p.style === 'rocky' ? 1 : 0], i * 4)
    pOrbits.set(orbitsOf(p).slice(0, 4), i * 4)
  })
  const sPos = new Float32Array(MAX_S * 4)
  const sColor = new Float32Array(MAX_S * 3)
  const sAxis = new Float32Array(MAX_S * 3)
  const sRot = new Float32Array(MAX_S)
  satellites.slice(0, MAX_S).forEach((s, i) => sColor.set(s.color, i * 3))

  for (const p of Object.values(programs)) {
    g.useProgram(p.program)
    g.uniform4fv(p.U.u_pPos, pPos)
    g.uniform3fv(p.U.u_pColor, pColor)
    g.uniform3fv(p.U.u_pAxis, pAxis)
    g.uniform4fv(p.U.u_pRing, pRing)
    g.uniform4fv(p.U.u_pOrbits, pOrbits)
    g.uniform3fv(p.U.u_sColor, sColor)
    g.uniform3fv(p.U.u_sun, SUN)
    // сэмплеры: A планет → 0..2, B → 3..5, спутники → 6..11
    ;(['u_pA0', 'u_pA1', 'u_pA2', 'u_pB0', 'u_pB1', 'u_pB2', 'u_s0', 'u_s1', 'u_s2', 'u_s3', 'u_s4', 'u_s5'] as const)
      .forEach((n, unit) => p.U[n] && g.uniform1i(p.U[n], unit))
    g.uniform1f(p.U.u_texelAngle, Math.PI / 2 / BAKE_SIZE)
  }

  const start = performance.now()
  let frozenAt: number | null = null
  const worldTime = (now: number) => frozenAt ?? (now - start) / 1000

  const t0 = performance.now()
  const baker = programs.baked ? new SurfaceBaker(g, planets.slice(0, MAX_P), satellites.slice(0, MAX_S), 0) : null
  if (baker) {
    g.finish()
    console.info(`[UniverseLayer] поверхности запечены за ${(performance.now() - t0).toFixed(0)} мс`)
  }

  // станция — three.js поверх рейтрейсера, камера и солнце общие
  stationScene = new StationScene(stationCanvas.value!, SUN as Vec3)
  stationScene.setState(stationState(), performance.now(), true)
  setStationResolver(id => stationScene?.resolve(id))

  // ── управление нагрузкой ──────────────────────────────────────────
  // quality — базовая доля экранного разрешения, подстраивается по времени кадра
  // (на 60 Гц кадр ≈ 16.7 мс, поэтому вверх — при < 18 мс, вниз — при > 24 мс);
  // в полёте рендерим ещё мельче (движение прячет мягкость), в покое — в полную базу.
  let quality = 1
  let frameEma = 16
  let lastTune = 0
  let lastDraw = 0

  const resize = (scale: number) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    const rect = el.getBoundingClientRect()
    const w = Math.max(1, Math.round((rect.width || el.clientWidth) * dpr * scale))
    const h = Math.max(1, Math.round((rect.height || el.clientHeight) * dpr * scale))
    if (w !== el.width || h !== el.height) {
      el.width = w
      el.height = h
    }
  }

  // видно ли хоть одно тело (с кольцами/орбитой) — иначе в кадре только звёзды
  const bodiesInView = (cam: CameraFrame) => {
    const aspect = el.width / el.height
    const bounds = planets.slice(0, MAX_P)
      .map(p => [p.pos, Math.max(p.radius * 1.3, p.ring?.outer ?? 0, Math.max(0, ...orbitsOf(p)) + 0.2)] as [Vec3, number])
    bounds.push([station.pos, station.radius * 2.5])
    return bounds.some(([pos, radius]) => {
      const v = sub(pos, cam.eye)
      const z = dot(v, cam.fwd)
      if (z < -radius)
        return false
      if (z < radius)
        return true
      const x = dot(v, cam.right) / z * cam.fov + cam.shift[0]
      const y = dot(v, cam.up) / z * cam.fov + cam.shift[1]
      const m = radius / z * cam.fov * 1.3 + 0.1
      return Math.abs(x) < aspect + m && Math.abs(y) < 1 + m
    })
  }

  const updateBodies = (time: number) => {
    planets.slice(0, MAX_P).forEach((p, i) => {
      pSpin[i] = time * p.spin
      // фаза спутника на каждой из орбит планеты — для шлейфа
      orbitsOf(p).slice(0, 4).forEach((r, k) => {
        const s = satellites.find(s => s.parent === p.id && (s.orbit ?? p.orbit ?? 2) === r)
        const a = s ? time * s.speed + s.phase : -1
        pOrbitA[i * 4 + k] = s ? ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) : -1
      })
    })
    satellites.slice(0, MAX_S).forEach((s, i) => {
      sPos.set([...bodyAt(s.id, time).pos, s.radius], i * 4)
      const rot = satelliteRotation(s.id, time)!
      sAxis.set(rot.axis, i * 3)
      sRot[i] = rot.angle
    })
  }

  const draw = (cam: CameraFrame, time: number, m: Mode, target: WebGLFramebuffer | null = null, fullDetail = false) => {
    const p = programs[m]!
    g.bindFramebuffer(g.FRAMEBUFFER, target)
    g.viewport(0, 0, el.width, el.height)
    g.useProgram(p.program)
    g.bindBuffer(g.ARRAY_BUFFER, buf)
    g.enableVertexAttribArray(p.loc)
    g.vertexAttribPointer(p.loc, 2, g.FLOAT, false, 0, 0)

    if (m === 'baked' && baker) {
      baker.planets.forEach((pb, i) => {
        g.activeTexture(g.TEXTURE0 + i)
        g.bindTexture(g.TEXTURE_CUBE_MAP, pb.tex[0])
        g.activeTexture(g.TEXTURE0 + 3 + i)
        g.bindTexture(g.TEXTURE_CUBE_MAP, pb.tex[1])
      })
      baker.satellites.forEach((tex, i) => {
        g.activeTexture(g.TEXTURE0 + 6 + i)
        g.bindTexture(g.TEXTURE_CUBE_MAP, tex)
      })
      g.activeTexture(g.TEXTURE0)
      g.uniform1fv(p.U.u_pMix, pMix)
    }

    g.clearColor(0, 0, 0, 0)
    g.clear(g.COLOR_BUFFER_BIT)
    g.uniform2f(p.U.u_res, el.width, el.height)
    g.uniform1f(p.U.u_time, time)
    g.uniform3fv(p.U.u_eye, cam.eye)
    g.uniform3fv(p.U.u_right, cam.right)
    g.uniform3fv(p.U.u_up, cam.up)
    g.uniform3fv(p.U.u_fwd, cam.fwd)
    g.uniform1f(p.U.u_focal, cam.fov)
    g.uniform2fv(p.U.u_shift, cam.shift)
    g.uniform1fv(p.U.u_pSpin, pSpin)
    g.uniform4fv(p.U.u_sPos, sPos)
    g.uniform4fv(p.U.u_pOrbitA, pOrbitA)
    g.uniform3fv(p.U.u_sAxis, sAxis)
    g.uniform1fv(p.U.u_sRot, sRot)
    g.uniform1f(p.U.u_fullDetail, fullDetail ? 1 : 0)
    g.drawArrays(g.TRIANGLE_STRIP, 0, 4)
  }

  let lastCam: CameraFrame | null = null

  // выноски на слайдах следят за модулями — публикуем их экранные позиции
  const publishScreen = () => {
    const visible = stationScene?.visible ?? false
    if (!visible) {
      if (stationScreen.value)
        stationScreen.value = null
      return
    }
    stationScreen.value = { ...stationScene!.screen }
  }

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const time = worldTime(now)
    const cam = rig.frame(time, now)
    if (!cam)
      return
    lastCam = cam

    // пустой космос и камера стоит — звёздам хватит 15 fps
    const idle = !rig.moving && !bodiesInView(cam)
    if (idle && now - lastDraw < 1000 / 15)
      return

    // автоподстройка качества по сглаженному времени кадра (только в покое, раз в 0.5 с)
    const dt = lastDraw ? now - lastDraw : 16
    lastDraw = now
    if (!idle) {
      frameEma = frameEma * 0.9 + dt * 0.1
      if (!rig.moving && now - lastTune > 500) {
        lastTune = now
        if (frameEma > 24 && quality > 0.55)
          quality = Math.max(0.55, quality - 0.1)
        else if (frameEma < 18 && quality < 1)
          quality = Math.min(1, quality + 0.05)
      }
    }

    updateBodies(time)
    if (baker)
      pMix.set(baker.update(time, frozenAt !== null))
    resize(rig.moving ? quality * 0.65 : quality)
    // ошибка кадра не должна останавливать цикл
    try {
      draw(cam, time, mode)
      stationScene?.render(cam, time, now, pPos, sPos)
      publishScreen()
    }
    catch (e) {
      console.error('[UniverseLayer]', e)
    }
  }
  raf = requestAnimationFrame(frame)

  // ── dev: сравнение режимов ──────────────────────────────────────────
  if (import.meta.env.DEV) {
    // замеры — при фиксированном 1920×1080, независимо от окна и видимости вкладки
    const benchSize = () => {
      el.width = 1920
      el.height = 1080
    }
    const readAll = () => {
      const px = new Uint8Array(el.width * el.height * 4)
      g.readPixels(0, 0, el.width, el.height, g.RGBA, g.UNSIGNED_BYTE, px)
      return px
    }
    ;(window as any).__universe = {
      get mode() { return mode },
      set mode(m: Mode) { if (programs[m]) mode = m },
      canBake,
      /** подбор ракурса: поставить камеру поверх слайда (пресет + переопределения); null — вернуть слайдовую */
      camera(spec: (CameraSpec & { preset?: string }) | null) {
        const slide = resolveCamera(nav.slides.value as any, nav.currentSlideNo.value, nav.clicks.value)
        const extra = spec ? { ...(spec.preset ? presets[spec.preset] : {}), ...spec } : {}
        delete (extra as any).preset
        rig.setTarget({ ...slide, ...extra } as any, performance.now(), true)
        lastCam = rig.frame(worldTime(performance.now()), performance.now())
      },
      /** подбор мира: сдвинуть планету (и её спутники) на лету; радиус — по желанию */
      planet(id: string, pos: Vec3, radius?: number) {
        const i = planets.findIndex(p => p.id === id)
        if (i < 0 || i >= MAX_P)
          return
        planets[i].pos = pos
        if (radius)
          planets[i].radius = radius
        pPos.set([...pos, planets[i].radius], i * 4)
        for (const pr of Object.values(programs)) {
          g.useProgram(pr.program)
          g.uniform4fv(pr.U.u_pPos, pPos)
        }
      },
      /** где тела на экране: x, y в долях кадра (0..1), размер — радиус в долях высоты */
      project() {
        const time = worldTime(performance.now())
        const cam = rig.frame(time, performance.now())
        if (!cam)
          return null
        const aspect = el.width / el.height
        const at = (pos: Vec3, radius: number) => {
          const v = sub(pos, cam.eye)
          const z = dot(v, cam.fwd)
          const x = dot(v, cam.right) / z * cam.fov + cam.shift[0]
          const y = dot(v, cam.up) / z * cam.fov + cam.shift[1]
          return { x: +(0.5 + x / aspect / 2).toFixed(3), y: +(0.5 - y / 2).toFixed(3), size: +(radius / z * cam.fov / 2).toFixed(3), behind: z < 0 }
        }
        const out: Record<string, any> = {}
        planets.forEach(p => { out[p.id] = at(p.pos, p.radius) })
        satellites.forEach(s => { out[s.id] = at(bodyAt(s.id, time).pos, s.radius) })
        out.station = at(bodyAt('station', time).pos, station.radius)
        return out
      },
      /** заморозить время мира (t — секунды) и перепечь снимки ровно на t; null — отпустить */
      freeze(t: number | null) {
        frozenAt = t
        if (t !== null) {
          baker?.rebakeAll(t)
          pMix.fill(0)
        }
      },
      /** попиксельное сравнение режимов в текущем кадре (1920×1080); fullDetail — процедурный без LOD */
      diff({ fullDetail = false } = {}) {
        const time = worldTime(performance.now())
        // во фоновой вкладке rAF не идёт — считаем кадр камеры сами
        lastCam = rig.frame(time, performance.now())
        if (!lastCam || !baker)
          return null
        benchSize()
        updateBodies(time)
        draw(lastCam, time, 'procedural', null, fullDetail)
        const a = readAll()
        draw(lastCam, time, 'baked')
        const b = readAll()
        let max = 0
        let sum = 0
        let over4 = 0
        let over16 = 0
        let covered = 0
        for (let i = 0; i < a.length; i += 4) {
          if (a[i + 3] < 250 && b[i + 3] < 250)
            continue // пустой космос одинаков — считаем только тела
          covered++
          const d = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2]))
          max = Math.max(max, d)
          sum += d
          if (d > 4)
            over4++
          if (d > 16)
            over16++
        }
        return {
          size: `${el.width}x${el.height}`,
          bodyPixels: covered,
          maxDiff: max,
          meanDiff: +(sum / Math.max(1, covered)).toFixed(3),
          over4: `${(over4 / Math.max(1, covered) * 100).toFixed(2)}%`,
          over16: `${(over16 / Math.max(1, covered) * 100).toFixed(2)}%`,
        }
      },
      /** время кадра станции (three.js) в текущем ракурсе, мс; сцена рейтрейсера не входит */
      benchStation(n = 40) {
        const now = performance.now()
        const time = worldTime(now)
        const cam = rig.frame(time, now)
        if (!cam || !stationScene)
          return null
        for (let i = 0; i < 3; i++) {
          stationScene.render(cam, time, now, pPos, sPos, true)
          stationScene.sync()
        }
        const t = performance.now()
        for (let i = 0; i < n; i++) {
          stationScene.render(cam, time, now, pPos, sPos, true)
          stationScene.sync()
        }
        return +((performance.now() - t) / n).toFixed(2)
      },
      /** картинки обоих режимов и усиленный ×8 дифф — оверлеем поверх страницы (повторный вызов убирает) */
      showDiff({ fullDetail = false, zoom = [0, 0, 1920, 1080] } = {}) {
        document.getElementById('universe-diff')?.remove()
        const time = worldTime(performance.now())
        lastCam = rig.frame(time, performance.now())
        if (!lastCam || !baker)
          return null
        benchSize()
        updateBodies(time)
        draw(lastCam, time, 'procedural', null, fullDetail)
        const a = readAll()
        draw(lastCam, time, 'baked')
        const b = readAll()
        const [x0, y0, x1, y1] = zoom
        const w = x1 - x0
        const h = y1 - y0
        const toCanvas = (f: (i: number) => [number, number, number]) => {
          const c = document.createElement('canvas')
          c.width = w
          c.height = h
          const ctx = c.getContext('2d')!
          const img = ctx.createImageData(w, h)
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              // readPixels снизу вверх, zoom — в экранных координатах сверху
              const src = ((el.height - 1 - (y0 + y)) * el.width + (x0 + x)) * 4
              const [r, gg, bb] = f(src)
              const dst = (y * w + x) * 4
              img.data.set([r, gg, bb, 255], dst)
            }
          }
          ctx.putImageData(img, 0, 0)
          c.style.cssText = 'width:32vw;image-rendering:pixelated;border:1px solid #555'
          return c
        }
        const wrap = document.createElement('div')
        wrap.id = 'universe-diff'
        wrap.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#000;display:flex;gap:8px;align-items:center;justify-content:center'
        wrap.append(
          toCanvas(i => [a[i], a[i + 1], a[i + 2]]),
          toCanvas(i => [b[i], b[i + 1], b[i + 2]]),
          toCanvas(i => [0, 1, 2].map(k => Math.min(255, Math.abs(a[i + k] - b[i + k]) * 8)) as [number, number, number]),
        )
        document.body.append(wrap)
        return 'процедурный | запечённый | |разница|×8'
      },
      /**
       * GPU-время кадра: n отрисовок 1920×1080 во внеэкранный framebuffer,
       * каждая с синхронизацией через readPixels. Экранный буфер не годится — он ждёт vsync.
       */
      bench(n = 40) {
        const time = worldTime(performance.now())
        lastCam = rig.frame(time, performance.now())
        if (!lastCam)
          return null
        benchSize()
        updateBodies(time)
        const tex = g.createTexture()
        g.bindTexture(g.TEXTURE_2D, tex)
        g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, el.width, el.height, 0, g.RGBA, g.UNSIGNED_BYTE, null)
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR)
        const fbo = g.createFramebuffer()
        g.bindFramebuffer(g.FRAMEBUFFER, fbo)
        g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, tex, 0)
        const one = new Uint8Array(4)
        const run = (m: Mode) => {
          if (!programs[m])
            return null
          for (let i = 0; i < 3; i++) {
            draw(lastCam!, time, m, fbo)
            g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, one)
          }
          const t = performance.now()
          for (let i = 0; i < n; i++) {
            draw(lastCam!, time, m, fbo)
            g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, one)
          }
          return +((performance.now() - t) / n).toFixed(2)
        }
        // чередуем режимы несколько раундов и берём медиану — частоты GPU плавают
        const median = (xs: number[]) => xs.sort((a, b) => a - b)[Math.floor(xs.length / 2)]
        const pr: number[] = []
        const bk: number[] = []
        for (let r = 0; r < 5; r++) {
          pr.push(run('procedural')!)
          if (programs.baked)
            bk.push(run('baked')!)
        }
        const procedural = median(pr)
        const baked = bk.length ? median(bk) : null
        g.bindFramebuffer(g.FRAMEBUFFER, null)
        g.deleteFramebuffer(fbo)
        g.deleteTexture(tex)

        // цена фонового перепекания: A+B всех планет = 12 граней на планету
        let bakeFaceMs: number | null = null
        if (baker) {
          const faces = baker.planets.length * 12
          g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, one)
          const t = performance.now()
          baker.rebakeAll(time)
          g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, one)
          bakeFaceMs = +((performance.now() - t) / faces).toFixed(3)
        }
        return {
          bakeFaceMs,
          size: `${el.width}x${el.height}`,
          proceduralMs: procedural,
          bakedMs: baked,
          speedup: procedural && baked ? `${(procedural / baked).toFixed(2)}x` : null,
        }
      },
    }
  }

  dispose = () => {
    setStationResolver(null)
    stationScene?.dispose()
    stationScene = null
    baker?.dispose()
    g.getExtension('WEBGL_lose_context')?.loseContext()
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  dispose()
})
</script>

<template>
  <canvas ref="canvas" class="universe-layer" />
  <canvas ref="stationCanvas" class="universe-layer universe-layer--station" />
</template>

<style>
.universe-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -9;
  pointer-events: none;
}

.universe-layer--station {
  z-index: -8;
}
</style>
