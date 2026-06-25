import React from 'react'
import { Link, useParams } from 'react-router-dom'
// axios removed: payments are initiated from the Cart page only
import { getProductBySlug, formatZAR } from '../data/products'
import useMagnetic from '../hooks/useMagnetic'
import { addToCart } from '../lib/cart'
import { useNavigate } from 'react-router-dom'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined

  const orderRef = React.useRef<HTMLButtonElement | null>(null)
  useMagnetic(orderRef, { radius: 160, strength: 0.2, scale: 0.06 })
  // Payment initiation is handled from the Cart page only.

  const navigate = useNavigate()

  function handleAddToCart() {
    if (!product) return
    addToCart(product.slug)
    navigate('/cart')
  }

  if (!product) {
    return (
      <div className="container page">
        <h1>Product not found</h1>
        <p>We couldn't find the product you were looking for.</p>
        <Link to="/products" className="btn">Back to products</Link>
      </div>
    )
  }

  return (
    <main className="container page product-detail">
      <style>{`
        .product-detail{padding:28px 20px}
        .detail-grid{display:grid;grid-template-columns:1fr 420px;gap:36px;align-items:start}
        .product-hero{display:flex;flex-direction:column;gap:12px}
        .product-hero h1{margin:0;font-size:32px}
        .price{font-size:28px;font-weight:900;color:var(--gold, #D4AF37)}
        .product-image{background:linear-gradient(180deg, #fff, #fbfbf9);padding:18px;border-radius:12px;display:flex;align-items:center;justify-content:center}
        .product-image img{max-width:320px;max-height:300px}
        .features{margin-top:12px;display:flex;flex-direction:column;gap:8px}
        .feature{background:var(--light-gray);padding:10px;border-radius:8px}
        .actions{display:flex;gap:12px;margin-top:18px}
        @media (max-width:900px){.detail-grid{grid-template-columns:1fr;gap:20px}}
        @media (max-width:760px){.product-detail{padding:18px 14px}.actions{flex-direction:column}.actions .btn{width:100%}.product-image img{max-width:100%;height:auto}}
      `}</style>

      <div className="detail-grid">
        <div>
          <div className="product-hero">
            <h1>{product.name}</h1>
            <div className="muted">{product.desc}</div>
            <div style={{display:'flex',gap:16,alignItems:'center',marginTop:8}}>
              <div className="price">{product.price ? formatZAR(product.price) : 'Request quote'}</div>
              {product.unit && <div className="muted">{product.unit}</div>}
            </div>
            <div className="features">
              {product.features?.map((f, i) => <div className="feature" key={i}>{f}</div>)}
            </div>

            <div className="actions">
              <button ref={orderRef} className="btn primary" onClick={handleAddToCart}>Add to cart</button>
              <Link to="/products" className="btn ghost">Back to products</Link>
            </div>
          </div>
        </div>

        <aside>
          <div className="product-image">
            <img src={product.img} alt={product.name} />
          </div>
        </aside>
      </div>
    </main>
  )
}
