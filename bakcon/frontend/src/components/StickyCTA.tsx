import React, { useEffect, useRef, useState } from 'react'
import useMagnetic from '../hooks/useMagnetic'

const StickyCTA: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [isNarrow, setIsNarrow] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth <= 980 : false)

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY || window.pageYOffset
      setVisible(scrollTop > 400)
    }
    function onResize() {
      setIsNarrow(window.innerWidth <= 980)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    onScroll()
    onResize()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const anchorRef = useRef<HTMLAnchorElement | null>(null)
  useMagnetic(anchorRef, { radius: 160, strength: 0.22, scale: 0.06 })

  // Only show sticky CTA on narrow / mobile view to avoid covering desktop product cards
  if (!visible || !isNarrow) return null

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1200 }}>
      <a ref={anchorRef} href="/products" aria-label="Shop now" style={{ display: 'inline-block', background: 'var(--egg)', color: '#111', padding: '14px 22px', borderRadius: 28, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', transform: 'translateZ(0)', textDecoration: 'none', fontWeight: 700, willChange: 'transform' }}>
        Shop Fresh Eggs
      </a>
    </div>
  )
}

export default StickyCTA
