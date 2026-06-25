import { useEffect } from 'react'
import type { RefObject } from 'react'

type Options = {
  count?: number
  colors?: string[]
  size?: [number, number]
  speed?: [number, number]
}

export default function useParticles(containerRef: RefObject<HTMLElement | null>, options: Options = {}) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const opts = {
      count: options.count ?? 30,
      // default to warm egg-yellow palette for floating particles
      colors: options.colors ?? ['rgba(255,223,87,0.32)', 'rgba(255,239,166,0.22)', 'rgba(255,250,210,0.14)'],
      size: options.size ?? [6, 20],
      speed: options.speed ?? [12, 45],
    }

    // ensure container is positioned
    const prevPosition = container.style.position
    if (!prevPosition) container.style.position = 'relative'

    const canvas = document.createElement('canvas')
    canvas.className = 'serve-particles-canvas'
    canvas.style.position = 'absolute'
    canvas.style.inset = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '0'
    container.prepend(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = window.devicePixelRatio || 1
    let width = container.clientWidth
    let height = container.clientHeight

    function resize() {
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = Math.round(width * DPR)
      canvas.height = Math.round(height * DPR)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    type Particle = {
      x: number
      y: number
      r: number
      vx: number
      vy: number
      color: string
      alpha: number
      phase: number
    }

    const particles: Particle[] = []

    function createParticle() {
      const r = Math.random() * (opts.size[1] - opts.size[0]) + opts.size[0]
      const x = Math.random() * width
      const y = height + Math.random() * height * 0.6
      const speed = Math.random() * (opts.speed[1] - opts.speed[0]) + opts.speed[0]
      const vy = -(speed / 60)
      const vx = (Math.random() - 0.5) * 0.3
      const color = opts.colors[Math.floor(Math.random() * opts.colors.length)]
      const alpha = 0.25 + Math.random() * 0.6
      const phase = Math.random() * Math.PI * 2
      return { x, y, r, vx, vy, color, alpha, phase }
    }

    for (let i = 0; i < opts.count; i++) particles.push(createParticle())

    let raf = 0
    let last = performance.now()
    let pointer = { x: -9999, y: -9999 }

    function onPointer(e: PointerEvent) {
      const rect = container.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }

    function step(t: number) {
      const dt = Math.min(40, t - (last || t)) / 16
      last = t
      ctx.clearRect(0, 0, width, height)

      for (let p of particles) {
        p.phase += 0.01 * dt
        p.x += Math.sin(p.phase) * 0.3 + p.vx * dt
        p.y += p.vy * dt * 16

        // pointer repulsion
        const px = pointer.x
        const py = pointer.y
        const dx = p.x - px
        const dy = p.y - py
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (px >= 0 && dist < 120) {
          const force = (1 - dist / 120) * 0.6
          p.x += (dx / (dist || 1)) * force * 6
          p.y += (dy / (dist || 1)) * force * 6
        }

        // draw egg-like ellipse
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha))
        ctx.ellipse(p.x, p.y, p.r, p.r * 0.8, 0, 0, Math.PI * 2)
        ctx.fill()

        if (p.y < -40 || p.x < -60 || p.x > width + 60) {
          const np = createParticle()
          p.x = np.x
          p.y = height + Math.random() * 60
          p.r = np.r
          p.vx = np.vx
          p.vy = np.vy
          p.color = np.color
          p.alpha = np.alpha
          p.phase = np.phase
        }
      }

      raf = requestAnimationFrame(step)
    }

    container.addEventListener('pointermove', onPointer)
    container.addEventListener('pointerleave', () => {
      pointer.x = -9999
      pointer.y = -9999
    })

    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      container.removeEventListener('pointermove', onPointer)
      container.removeEventListener('pointerleave', () => {})
      try { canvas.remove() } catch (e) {}
      if (!prevPosition) container.style.position = ''
    }
  }, [containerRef, options.count, options.size, options.speed, options.colors])
}
