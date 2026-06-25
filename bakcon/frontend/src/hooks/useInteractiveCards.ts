import { useEffect } from 'react'
import type { RefObject } from 'react'

export default function useInteractiveCards(containerRef: RefObject<HTMLElement | null>, maxTilt = 8, scale = 1.03) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const cards = Array.from(root.querySelectorAll('.serve-card')) as HTMLElement[]
    if (!cards.length) return

    const handlers = new Map<HTMLElement, { move: (e: PointerEvent) => void; leave: () => void }>()

    cards.forEach((card) => {
      const move = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        const rotY = x * maxTilt
        const rotX = -y * maxTilt
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`
        card.style.transition = 'transform 120ms ease-out'
        card.style.zIndex = '10'
        // dynamic shadow
        const sx = -rotY * 1.5
        const sy = rotX * 1.5
        card.style.boxShadow = `${sx}px ${sy + 10}px 30px rgba(0,0,0,0.18)`
      }

      const leave = () => {
        card.style.transform = ''
        card.style.transition = 'transform 550ms cubic-bezier(.2,.9,.2,1)'
        card.style.zIndex = ''
        card.style.boxShadow = ''
      }

      card.addEventListener('pointermove', move)
      card.addEventListener('pointerleave', leave)
      handlers.set(card, { move, leave })
    })

    return () => {
      handlers.forEach((h, el) => {
        el.removeEventListener('pointermove', h.move)
        el.removeEventListener('pointerleave', h.leave)
      })
    }
  }, [containerRef, maxTilt, scale])
}
