import { useEffect } from 'react'
import type { RefObject } from 'react'

type Options = {
  burstCount?: number
  floatCount?: number
  colors?: string[]
}

export default function useSparkleBurst(containerRef: RefObject<HTMLElement | null>, options: Options = {}) {
  useEffect(() => {
    const container = containerRef?.current
    if (!container) return

    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const opts = {
      burstCount: options.burstCount ?? 36,
      floatCount: options.floatCount ?? 18,
      colors: options.colors ?? ['255,223,87', '255,239,166', '255,250,210'],
    }

    try { container.dataset.sparkleStarted = '1' } catch (e) {}
    const prevPos = container.style.position
    if (!prevPos) container.style.position = 'relative'

    const canvas = document.createElement('canvas')
    canvas.className = 'benefits-sparkle-canvas'
    canvas.style.position = 'absolute'
    canvas.style.inset = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '3'
    container.prepend(canvas)
    try { container.dataset.sparkleAttached = '1' } catch (e) { /* ignore */ }

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

    type Spark = {
      x: number
      y: number
      vx: number
      vy: number
      ttl: number
      life: number
      size: number
      color: string
      alpha: number
      rotation: number
      spin: number
    }

    const floats: Spark[] = []
    const bursts: Spark[] = []

    function createFloat() {
      const x = Math.random() * width
      const y = height + Math.random() * height * 0.6
      const vx = (Math.random() - 0.5) * 0.3
      const vy = -(0.4 + Math.random() * 0.6)
      const size = 1 + Math.random() * 3
      const color = opts.colors[Math.floor(Math.random() * opts.colors.length)]
      const ttl = 400 + Math.random() * 800
      const alpha = 0.06 + Math.random() * 0.18
      const rotation = Math.random() * Math.PI * 2
      const spin = (Math.random() - 0.5) * 0.01
      return { x, y, vx, vy, ttl, life: 0, size, color, alpha, rotation, spin }
    }

    for (let i = 0; i < opts.floatCount; i++) floats.push(createFloat())

    function createBurstAt(x: number, y: number) {
      for (let i = 0; i < opts.burstCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 2 + Math.random() * 6
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed - (1 + Math.random() * 2)
        const size = 3 + Math.random() * 6
        const ttl = 40 + Math.random() * 80
        const color = opts.colors[Math.floor(Math.random() * opts.colors.length)]
        const alpha = 0.9
        const rotation = Math.random() * Math.PI * 2
        const spin = (Math.random() - 0.5) * 0.2
        bursts.push({ x, y, vx, vy, ttl, life: 0, size, color, alpha, rotation, spin })
      }
    }

    let fired = false
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !fired) {
          fired = true
          const rect = container.getBoundingClientRect()
          createBurstAt(rect.width * 0.5, rect.height * 0.35)
        }
      })
    }, { root: null, threshold: 0.2 })

    observer.observe(container)

    function onPointerMove(e: PointerEvent) {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (Math.random() < 0.08) createBurstAt(x, y)
    }

    function onPointerDown(e: PointerEvent) {
      const rect = container.getBoundingClientRect()
      createBurstAt(e.clientX - rect.left, e.clientY - rect.top)
    }

    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerdown', onPointerDown)

    let raf = 0
    let last = performance.now()

    function step(t: number) {
      const dt = Math.min(40, t - (last || t)) / 16
      last = t
      ctx.clearRect(0, 0, width, height)

      // draw floats (slow background glow)
      for (let f of floats) {
        f.life += dt
        f.x += f.vx * dt * 1.2
        f.y += f.vy * dt * 1.2
        f.rotation += f.spin * dt
        if (f.y < -30) {
          f.x = Math.random() * width
          f.y = height + Math.random() * 60
        }
        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, f.alpha))
        ctx.fillStyle = `rgba(${f.color}, ${1})`
        ctx.beginPath()
        ctx.ellipse(f.x, f.y, f.size, f.size * 0.6, f.rotation, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // draw bursts (bright sparkles)
      for (let i = bursts.length - 1; i >= 0; i--) {
        const p = bursts[i]
        p.life += dt
        p.x += p.vx * dt * 1.4
        p.y += p.vy * dt * 1.4
        p.vy += 0.06 * dt
        p.rotation += p.spin * dt
        const tNorm = p.life / p.ttl
        const alpha = Math.max(0, 1 - tNorm)
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = alpha
        ctx.fillStyle = `rgba(${p.color}, 1)`
        ctx.beginPath()
        ctx.ellipse(p.x, p.y, p.size * (1 - tNorm * 0.6), p.size * (0.6 - tNorm * 0.4), p.rotation, 0, Math.PI * 2)
        ctx.shadowColor = `rgba(${p.color}, ${0.9 * alpha})`
        ctx.shadowBlur = 14 * (1 - tNorm)
        ctx.fill()
        ctx.restore()
        if (p.life > p.ttl) bursts.splice(i, 1)
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerdown', onPointerDown)
      observer.disconnect()
      try { canvas.remove() } catch (e) {}
      if (!prevPos) container.style.position = ''
    }
  }, [containerRef, options.burstCount, options.floatCount, options.colors])
}
