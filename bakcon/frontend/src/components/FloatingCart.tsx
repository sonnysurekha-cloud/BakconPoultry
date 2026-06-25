import React, { useEffect, useState } from 'react'
import { getCartCount } from '../lib/cart'
import { useNavigate } from 'react-router-dom'

export default function FloatingCart() {
  const [count, setCount] = useState<number>(getCartCount())
  const navigate = useNavigate()

  useEffect(() => {
    const onUpdate = () => setCount(getCartCount())
    // custom event from our cart utils
    window.addEventListener('bakcon_cart_updated', onUpdate as EventListener)
    // storage event (in case other tabs update it)
    const onStorage = () => setCount(getCartCount())
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('bakcon_cart_updated', onUpdate as EventListener)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return (
    <button
      className="floating-cart"
      aria-label={`Cart with ${count} items`}
      title="View cart"
      onClick={() => navigate('/cart')}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1.6" fill="currentColor" />
        <circle cx="18" cy="20" r="1.6" fill="currentColor" />
      </svg>
      {count > 0 && <span className="floating-cart-badge">{count}</span>}
    </button>
  )
}
