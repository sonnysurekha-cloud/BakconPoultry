import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export default function useMagnetic(ref: RefObject<HTMLElement | null>, opts?: { radius?: number; strength?: number; scale?: number }) {
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const radius = opts?.radius ?? 140
    const strength = opts?.strength ?? 0.22
    const scaleMax = opts?.scale ?? 0.06

    let targetX = 0
    let targetY = 0
    let targetScale = 1
    let currentX = 0
    let currentY = 0
    let currentScale = 1

    function step() {
      currentX += (targetX - currentX) * 0.14
      currentY += (targetY - currentY) * 0.14
      currentScale += (targetScale - currentScale) * 0.14
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(${currentScale.toFixed(3)})`
      rafRef.current = requestAnimationFrame(step)
    }

    function onMove(e: PointerEvent) {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius) {
        targetX = 0
        targetY = 0
        targetScale = 1
      } else {
        const ratio = 1 - dist / radius
        targetX = dx * ratio * strength
        targetY = dy * ratio * strength * 0.6
        targetScale = 1 + scaleMax * ratio
      }
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step)
    }

    function onEnter() {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step)
      el.style.transition = 'box-shadow 220ms ease'
      el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.22)'
    }

    function onLeave() {
      targetX = 0
      targetY = 0
      targetScale = 1
      el.style.boxShadow = ''
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      el.style.transform = ''
      el.style.boxShadow = ''
    }
  }, [ref, opts])
}
