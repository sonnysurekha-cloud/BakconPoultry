import { useEffect } from 'react'
import type { RefObject } from 'react'

export default function useParallax(ref: RefObject<HTMLElement | null>, speed = 0.12) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let ticking = false

    const update = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const center = rect.top + rect.height / 2
      const offset = center - windowHeight / 2
      const translateY = -offset * speed

      // add a slight rotation for depth based on element center
      const maxRot = Math.min(6, speed * 40)
      const rot = (offset / (windowHeight / 2)) * maxRot

      el.style.transform = `translate3d(0, ${translateY}px, 0) rotateX(${rot}deg)`
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          update()
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (el) el.style.transform = ''
    }
  }, [ref, speed])
}
