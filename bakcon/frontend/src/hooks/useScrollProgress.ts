import { useEffect } from 'react'

export default function useScrollProgress() {
  useEffect(() => {
    const el = document.getElementById('scroll-progress')
    if (!el) return

    let rafId: number | null = null

    function update() {
      const scrollTop = window.scrollY || window.pageYOffset
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      )
      const winHeight = window.innerHeight || document.documentElement.clientHeight
      const denom = Math.max(docHeight - winHeight, 1)
      const progress = Math.min(1, Math.max(0, scrollTop / denom))
      el.style.width = `${(progress * 100).toFixed(2)}%`
      rafId = null
    }

    function onScroll() {
      if (rafId == null) rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
