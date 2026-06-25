import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export default function usePointerShimmer(ref: RefObject<HTMLElement | null>, opts?: { size?: number; intensity?: number }) {
  useEffect(() => {
    const container = ref.current
    if (!container) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const size = opts?.size ?? 260
    const intensity = opts?.intensity ?? 0.95

    // ensure container is positioned for absolute child
    if (getComputedStyle(container).position === 'static') container.style.position = 'relative'

    const shimmer = document.createElement('div')
    shimmer.className = 'pointer-shimmer'
    shimmer.style.position = 'absolute'
    shimmer.style.left = '50%'
    shimmer.style.top = '50%'
    shimmer.style.width = `${size}px`
    shimmer.style.height = `${size}px`
    shimmer.style.pointerEvents = 'none'
    shimmer.style.transform = `translate(-50%,-50%) scale(0.9)`
    shimmer.style.opacity = String(intensity)
    shimmer.style.borderRadius = '50%'
    shimmer.style.background = 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.08) 60%, transparent 70%)'
    shimmer.style.mixBlendMode = 'overlay'
    shimmer.style.filter = 'blur(36px) saturate(120%)'
    shimmer.style.zIndex = '1'
    shimmer.style.transition = 'opacity 260ms ease, transform 260ms cubic-bezier(.2,.9,.2,1)'

    container.appendChild(shimmer)

    let rafId: number | null = null
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty

    function tick() {
      cx += (tx - cx) * 0.16
      cy += (ty - cy) * 0.16
      const rect = container.getBoundingClientRect()
      const localX = cx - rect.left
      const localY = cy - rect.top
      shimmer.style.transform = `translate(${(localX - size / 2).toFixed(2)}px, ${(localY - size / 2).toFixed(2)}px) scale(1)`
      rafId = requestAnimationFrame(tick)
    }

    function onMove(e: PointerEvent) {
      tx = e.clientX
      ty = e.clientY
      if (rafId == null) rafId = requestAnimationFrame(tick)
    }

    function onLeave() {
      // gracefully center back
      const rect = container.getBoundingClientRect()
      tx = rect.left + rect.width / 2
      ty = rect.top + rect.height / 2
    }

    container.addEventListener('pointermove', onMove, { passive: true })
    container.addEventListener('pointerleave', onLeave)

    return () => {
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
      shimmer.remove()
    }
  }, [ref, opts])
}
