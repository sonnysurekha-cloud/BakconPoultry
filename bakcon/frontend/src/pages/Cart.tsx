import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCart, updateQty, removeFromCart, clearCart } from '../lib/cart'
import { products, getProductBySlug, formatZAR } from '../data/products'

export default function Cart() {
  const [items, setItems] = useState<Array<{ product: any; qty: number }>>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    load()
  }, [])

  function load() {
    const cart = getCart()
    const detailed = cart.map(ci => ({ product: getProductBySlug(ci.slug), qty: ci.qty }))
    setItems(detailed)
  }

  function onQty(slug: string, qty: number) {
    updateQty(slug, qty)
    load()
  }

  function onRemove(slug: string) {
    removeFromCart(slug)
    load()
  }

  const subtotal = items.reduce((s, it) => s + ((it.product?.price || 0) * it.qty), 0)
  const hasPriceless = items.some(it => !it.product?.price)

  async function handleCheckout() {
    if (items.length === 0) {
      alert('Your cart is empty')
      return
    }
    if (hasPriceless) {
      alert('One or more items do not have a price. Please remove them or request a quote.')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/payments/ozow/init/', {
        amount: subtotal,
        currency: 'ZAR',
        order_ref: `cart-${Date.now()}`,
        return_url: `${window.location.origin}/payments/return`,
        items: items.map(it => ({ slug: it.product.slug, name: it.product.name, qty: it.qty, price: it.product.price }))
      })
      const redirect = res.data?.redirect_url
      if (redirect) {
        window.location.href = redirect
      } else {
        alert('Payment initiation failed')
      }
    } catch (err) {
      console.error(err)
      alert('Payment initiation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container page cart" style={{ padding: 28 }}>
      <style>{`
        .cart-grid{display:grid;grid-template-columns:1fr 360px;gap:28px}
        .cart-item{display:flex;gap:16px;align-items:center;padding:12px;border-radius:12px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));box-shadow:0 16px 50px rgba(2,6,23,0.18);border:1px solid rgba(255,255,255,0.04)}
        .cart-image{width:300px;height:400px;overflow:hidden;border-radius:12px;flex-shrink:0}
        .cart-image img{width:100%;height:100%;object-fit:cover}
        .qty-controls{display:flex;gap:8px;align-items:center}
        .checkout-panel{background:linear-gradient(180deg,#0b0b0b,#0d0d0d);padding:18px;border-radius:12px;color:#fff;box-shadow:0 30px 90px rgba(2,6,23,0.6)}
        .muted{color:var(--muted)}
        @media (max-width:900px){.cart-grid{grid-template-columns:1fr}}
        @media (max-width:760px){.cart-item{flex-direction:column;align-items:stretch}.cart-image{width:100%;height:auto;max-width:300px;margin:0 auto}.cart-image img{width:100%;height:auto}.checkout-panel{width:100%;padding:20px}.qty-controls{flex-wrap:wrap}.qty-controls button{flex:1}.qty-controls div{min-width:36px}.checkout-panel .btn{width:100%;margin-bottom:10px}}`}</style>

      <h1 style={{marginTop:0}}>Your Cart</h1>
      {items.length === 0 && (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn">Browse products</Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="cart-grid">
          <div>
            {items.map((it) => (
              <div className="cart-item" key={it.product?.slug || Math.random()}>
                <div className="cart-image">
                  {it.product?.img && <img src={it.product.img} alt={it.product?.name} />}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800}}>{it.product?.name || 'Unknown'}</div>
                  <div className="muted">{it.product?.desc}</div>
                  <div style={{display:'flex',gap:12,alignItems:'center',marginTop:8}}>
                    <div style={{fontWeight:900}}>{formatZAR(it.product?.price)}</div>
                    <div className="qty-controls">
                      <button className="btn" onClick={() => onQty(it.product.slug, Math.max(1, it.qty - 1))}>-</button>
                      <div style={{minWidth:28,textAlign:'center'}}>{it.qty}</div>
                      <button className="btn" onClick={() => onQty(it.product.slug, it.qty + 1)}>+</button>
                    </div>
                    <button className="btn ghost" onClick={() => onRemove(it.product.slug)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside>
            <div className="checkout-panel">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div className="muted">Subtotal</div>
                <div style={{fontWeight:900,fontSize:20}}>{formatZAR(subtotal)}</div>
              </div>
              <div style={{marginTop:12}} className="muted">{hasPriceless ? 'Remove items without prices to enable online payment.' : 'Proceed to secure payment'}</div>
              <div style={{display:'flex',gap:12,marginTop:16}}>
                <button className="btn order" onClick={handleCheckout} disabled={loading || hasPriceless}>{loading ? 'Starting payment…' : 'Checkout with Ozow'}</button>
                <button className="btn ghost" onClick={() => { clearCart(); load(); }}>Clear</button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}
