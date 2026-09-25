import type { PlanetDef, SatelliteDef } from './scene'
import { BAKE_SIZE, bakeFragment, vertex } from './shader'

/**
 * Запекание процедурных поверхностей в куб-карты.
 *
 * Спутники статичны (рельеф не зависит от времени) — печём один раз.
 * У планет медленно течёт поверхность (полосы газа, облака), поэтому на планету три карты:
 * A и B — снимки в моменты T0 < T1, рендер смешивает их по времени; C фоном допекается
 * на T2 = T1 + PERIOD по одной грани за кадр. В T1 карты сдвигаются: A←B, B←C, C←A.
 */

export const BAKE_PERIOD = 4 // с между снимками поверхности планеты

interface PlanetBake {
  def: PlanetDef
  tex: [WebGLTexture, WebGLTexture, WebGLTexture]
  times: [number, number, number]
  /** сколько граней C уже запечено (6 — готово) */
  progress: number
}

export class SurfaceBaker {
  private program: WebGLProgram
  private fbo: WebGLFramebuffer
  private buf: WebGLBuffer
  private loc: number
  private U: Record<string, WebGLUniformLocation | null>
  readonly planets: PlanetBake[] = []
  readonly satellites: WebGLTexture[] = []
  private rr = 0

  constructor(private gl: WebGLRenderingContext, planets: PlanetDef[], satellites: SatelliteDef[], time: number) {
    const program = gl.createProgram()!
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error('[SurfaceBaker]', gl.getShaderInfoLog(s))
      return s
    }
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, bakeFragment))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      console.error('[SurfaceBaker]', gl.getProgramInfoLog(program))
    this.program = program
    this.loc = gl.getAttribLocation(program, 'a_pos')
    this.U = Object.fromEntries(['u_face', 'u_size', 'u_mode', 'u_color', 'u_seed', 'u_time']
      .map(n => [n, gl.getUniformLocation(program, n)]))
    this.fbo = gl.createFramebuffer()!
    this.buf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    satellites.forEach((s, i) => {
      const tex = this.createCube()
      for (let f = 0; f < 6; f++)
        this.bakeFace(tex, f, 2, s.color, i * 7.3, 0)
      this.finish(tex)
      this.satellites.push(tex)
    })

    for (const def of planets) {
      const tex: PlanetBake['tex'] = [this.createCube(), this.createCube(), this.createCube()]
      this.planets.push({ def, tex, times: [time, time + BAKE_PERIOD, time + 2 * BAKE_PERIOD], progress: 0 })
    }
    this.rebakeAll(time)
  }

  /** Синхронно перепечь A и B планет с T0 = time (старт и заморозка времени для сравнения). */
  rebakeAll(time: number) {
    for (const p of this.planets) {
      p.times = [time, time + BAKE_PERIOD, time + 2 * BAKE_PERIOD]
      for (const k of [0, 1] as const) {
        for (let f = 0; f < 6; f++)
          this.bakePlanetFace(p, k, f)
        this.finish(p.tex[k])
      }
      p.progress = 0
    }
  }

  /**
   * Вызывать раз в кадр: сдвигает снимки и допекает одну грань (бюджет ~1/18 полной планеты).
   * Возвращает для каждой планеты долю смешивания A→B.
   */
  update(time: number, frozen = false): number[] {
    if (!frozen) {
      for (const p of this.planets) {
        if (time >= p.times[1] && p.progress >= 6) {
          const [a, b, c] = p.tex
          p.tex = [b, c, a]
          // если время убежало (вкладка спала) — следующий снимок от «сейчас»
          const next = Math.max(p.times[2] + BAKE_PERIOD, time + BAKE_PERIOD)
          p.times = [p.times[1], p.times[2], next]
          p.progress = 0
        }
      }
      // одна грань за кадр, по кругу между планетами
      for (let k = 0; k < this.planets.length; k++) {
        const p = this.planets[(this.rr + k) % this.planets.length]
        if (p.progress < 6) {
          this.bakePlanetFace(p, 2, p.progress)
          p.progress++
          if (p.progress === 6)
            this.finish(p.tex[2])
          this.rr = (this.rr + k + 1) % this.planets.length
          break
        }
      }
    }
    return this.planets.map(p => Math.min(1, Math.max(0, (time - p.times[0]) / (p.times[1] - p.times[0]))))
  }

  private bakePlanetFace(p: PlanetBake, slot: 0 | 1 | 2, face: number) {
    this.bakeFace(p.tex[slot], face, p.def.style === 'rocky' ? 1 : 0, p.def.color, 0, p.times[slot])
  }

  private createCube(): WebGLTexture {
    const gl = this.gl
    const tex = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, tex)
    for (let f = 0; f < 6; f++)
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, gl.RGBA, BAKE_SIZE, BAKE_SIZE, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return tex
  }

  private bakeFace(tex: WebGLTexture, face: number, mode: number, color: number[], seed: number, time: number) {
    const gl = this.gl
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, tex, 0)
    gl.viewport(0, 0, BAKE_SIZE, BAKE_SIZE)
    gl.useProgram(this.program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf)
    gl.enableVertexAttribArray(this.loc)
    gl.vertexAttribPointer(this.loc, 2, gl.FLOAT, false, 0, 0)
    gl.uniform1i(this.U.u_face, face)
    gl.uniform1f(this.U.u_size, BAKE_SIZE)
    gl.uniform1i(this.U.u_mode, mode)
    gl.uniform3fv(this.U.u_color, color)
    gl.uniform1f(this.U.u_seed, seed)
    gl.uniform1f(this.U.u_time, time)
    // premultipliedAlpha не участвует: рисуем в текстуру, блендинг выключен
    gl.disable(gl.BLEND)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  private finish(tex: WebGLTexture) {
    const gl = this.gl
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, tex)
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
  }

  dispose() {
    const gl = this.gl
    for (const p of this.planets)
      p.tex.forEach(t => gl.deleteTexture(t))
    this.satellites.forEach(t => gl.deleteTexture(t))
    gl.deleteFramebuffer(this.fbo)
    gl.deleteBuffer(this.buf)
    gl.deleteProgram(this.program)
  }
}
