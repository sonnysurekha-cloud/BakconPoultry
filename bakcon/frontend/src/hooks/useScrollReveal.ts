import { useEffect } from 'react'
import type { RefObject } from 'react'

export default function useScrollReveal(rootRef?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const rootElement = rootRef?.current ?? document
    const container = rootElement as Document | Element
    const items = Array.from(container.querySelectorAll('[data-reveal]')) as HTMLElement[]
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            // staggered delay: apply a CSS variable for small staggering
            const delayVal = el.dataset.revealDelay ? `${el.dataset.revealDelay}s` : `${Math.min(0.5, index * 0.06)}s`
            el.style.setProperty('--reveal-delay', delayVal)
            el.classList.add('reveal-visible', 'visible')
            obs.unobserve(el)
          }
        })
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    items.forEach((it, idx) => {
      it.classList.add('reveal')
      // set a per-element reveal delay that can be overridden with data-reveal-delay
      if (!it.dataset.revealDelay) it.dataset.revealDelay = `${Math.min(0.5, idx * 0.06)}`
      observer.observe(it)
    })

    return () => observer.disconnect()
  }, [rootRef])
}
