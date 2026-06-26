import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { products, formatZAR } from '../data/products'
import useMagnetic from '../hooks/useMagnetic'
import useScrollReveal from '../hooks/useScrollReveal'
import { addToCart } from '../lib/cart'

function ProductCard({ p, onQuickView }: { p: typeof products[number]; onQuickView?: (p: typeof products[number]) => void }) {
  const orderRef = useRef<HTMLButtonElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [added, setAdded] = useState(false)
  useMagnetic(orderRef, { radius: 140, strength: 0.18, scale: 0.06 })

  function handleOrder() {
    addToCart(p.slug)
    setAdded(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="product-card" aria-label={p.name} data-reveal="up">
      {p.tag && <div className="badge">{p.tag}</div>}
      <div className="product-media">
        <Link to={`/products/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="product-image">
            <img src={p.img} alt={p.name} />
          </div>
        </Link>
        <button className="quick" aria-label={`Quick view ${p.name}`} onClick={() => onQuickView?.(p)}>Quick View</button>
      </div>
      <div className="product-body">
        <h3 className="product-title"><Link to={`/products/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{p.name}</Link></h3>
        <div className="muted product-desc">{p.desc}</div>
        <div className="price-row">
          <div className="price">{p.price ? formatZAR(p.price) : 'Request quote'}</div>
          {p.unit && <div className="muted">{p.unit}</div>}
        </div>
      </div>
      <div className="card-actions">
        <button ref={orderRef} className={`btn order ${added ? 'added' : ''}`} onClick={handleOrder} aria-pressed={added}>{added ? 'Added!' : 'Add to Cart'}</button>
      </div>
    </article>
  )
}

export default function Products() {
  const heroRef = useRef<HTMLElement | null>(null)
  const heroMediaRef = useRef<HTMLDivElement | null>(null)
  const heroPrimaryRef = useRef<HTMLButtonElement | null>(null)
  const gridRef = useRef<HTMLElement | null>(null)
  const [quick, setQuick] = useState<null | typeof products[number]>(null)
  const navigate = useNavigate()

  // Animations for the hero section have been disabled — keep the hero static

  // reveal animations for hero and product grid
  useScrollReveal(heroRef)
  useScrollReveal(gridRef)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setQuick(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const visible = products

  return (
    <div className="page products">
      <style>{`
        .products{padding-bottom:72px;background:linear-gradient(180deg,#ffffff 0%, #f8f6ef 100%);color:#111}
        .products-hero{background:linear-gradient(180deg,#fff,#f7f5ec);color:#111;padding:48px 20px 36px;border-radius:20px;margin-bottom:36px;position:relative;overflow:hidden;box-shadow:0 18px 40px rgba(15,20,12,0.06);border:1px solid rgba(2,6,23,0.04)}
        .products-hero:before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 12% 20%, rgba(248,193,59,0.06), transparent 8%), radial-gradient(circle at 86% 76%, rgba(0,0,0,0.02), transparent 12%)}
        .products-hero:after{content:'';position:absolute;right:-60px;bottom:-60px;width:300px;height:300px;background:radial-gradient(circle at 30% 30%, rgba(248,193,59,0.06), transparent 40%);filter:blur(26px);opacity:0.9;pointer-events:none}
        .hero-inner{max-width:1200px;margin:0 auto;display:flex;gap:28px;align-items:center;justify-content:space-between}
        .hero-copy{flex:1;min-width:0}
        .hero-copy h1{font-size:clamp(28px,5.5vw,46px);margin:0 0 10px;letter-spacing:-0.6px;line-height:1.02;font-weight:900;color:#111}
        .hero-copy p{margin:0 0 14px;color:rgba(34,34,34,0.8);font-size:15px;max-width:60ch}
        .hero-cta{display:flex;gap:14px;align-items:center}
        .hero-cta .btn{padding:12px 20px;border-radius:999px;font-weight:800;border:0}
        .hero-cta .btn.ghost{background:transparent;border:1px solid rgba(34,34,34,0.06);color:#111}
        .hero-cta .btn.primary{background:linear-gradient(90deg,#F8C13B,#D4AF37);color:#111;position:relative;overflow:hidden}
        .hero-cta .btn.primary::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,0.15),rgba(255,255,255,0.02));mix-blend-mode:overlay;opacity:0;transform:translateX(-30%);transition:opacity .28s,transform .6s}
        .hero-cta .btn.primary:hover::after{opacity:1;transform:translateX(30%)}
        .hero-media{width:420px;flex:0 0 420px;display:flex;align-items:center;justify-content:center}
        .hero-card{width:360px;height:220px;border-radius:18px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 60px rgba(15,20,12,0.06);transform-style:preserve-3d;overflow:hidden;transition:transform .45s ease}
        .hero-card:hover{transform:translateY(-6px) rotateZ(-0.5deg)}
        .hero-card img{width:86%;height:auto;object-fit:contain}

        /* FILTER + GRID */
        .products-header{display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:1200px;margin:18px auto}
        .products-header h2{font-size:22px;margin:0;font-weight:900;color:#111}
        .filters{display:flex;gap:8px}
        .filter-btn{background:transparent;border:1px solid rgba(34,34,34,0.06);padding:10px 14px;border-radius:999px;cursor:pointer;color:rgba(34,34,34,0.9);font-weight:700}
        .filter-btn.active{background:linear-gradient(90deg,#F8C13B,#D4AF37);color:#111;border-color:transparent;box-shadow:0 10px 30px rgba(209,149,42,0.06)}
        .products-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px;padding:8px}

        /* PRODUCT CARD */
        .products-grid .product-card.reveal{opacity:0;transform:translateY(18px) translateX(var(--reveal-x,0));will-change:transform,opacity;transition:transform .62s cubic-bezier(.2,.9,.2,1) var(--reveal-delay),opacity .5s ease var(--reveal-delay)}
        .products-grid .product-card:nth-child(odd).reveal{--reveal-x:-18px}
        .products-grid .product-card:nth-child(even).reveal{--reveal-x:18px}
        .products-grid .product-card.reveal.visible,.products-grid .product-card.reveal.reveal-visible{opacity:1;transform:none}

        @keyframes sway { 0% { transform: translateX(-4px); } 50% { transform: translateX(4px); } 100% { transform: translateX(-4px); } }
        .products-grid .product-card.reveal.visible, .products-grid .product-card.reveal.reveal-visible { animation: sway 6s ease-in-out infinite; will-change: transform; }
        .products-grid .product-card:nth-child(even).reveal.visible, .products-grid .product-card:nth-child(even).reveal.reveal-visible { animation-direction: reverse; animation-duration: 5.6s; }
        @media (prefers-reduced-motion: reduce) { .products-grid .product-card.reveal.visible, .products-grid .product-card.reveal.reveal-visible { animation: none; } }

        .product-card{position:relative;background:#fff;border:1px solid rgba(34,34,34,0.04);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:12px;transition:transform .28s cubic-bezier(.2,.9,.2,1),box-shadow .28s;overflow:hidden;height:100%}
        .product-card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(15,20,12,0.08);animation-play-state:paused}
        .product-media{position:relative;display:flex;align-items:center;justify-content:center;height:200px;border-radius:12px;overflow:hidden;background:linear-gradient(135deg, rgba(248,193,59,0.03), rgba(0,0,0,0.02));box-shadow:0 8px 26px rgba(15,20,12,0.04);}
        .product-image{box-shadow:0 12px 30px rgba(15,20,12,0.04);}
        .product-image{width:100%;height:100%;display:block}
        .product-image img{width:100%;height:100%;object-fit:cover;border-radius:8px;transition:transform 420ms cubic-bezier(.2,.9,.2,1)}
        .product-card:hover .product-image img{transform:scale(1.04) translateY(-3px)}
        .quick{position:absolute;right:12px;bottom:12px;background:rgba(0,0,0,0.6);color:#fff;border:0;padding:8px 10px;border-radius:999px;font-weight:800;cursor:pointer}
        .badge{position:absolute;top:12px;left:12px;background:linear-gradient(90deg,#F8C13B,#D4AF37);padding:8px 12px;border-radius:999px;font-weight:900;color:#111;box-shadow:0 8px 24px rgba(209,149,42,0.06)}
        .product-title{margin:8px 0 6px;font-size:18px;letter-spacing:-0.2px;color:#111}
        .product-desc{color:rgba(34,34,34,0.7);font-size:14px;margin-bottom:8px;line-height:1.45;min-height:42px}
        .price-row{display:flex;align-items:baseline;gap:10px;justify-content:space-between}
        .price{font-size:20px;font-weight:900;color:var(--egg)}
        .card-actions{display:flex;gap:10px;margin-top:12px}
        .btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:10px;text-decoration:none}
        .btn.order{background:linear-gradient(90deg,#F8C13B,#D4AF37);color:#111;font-weight:800;box-shadow:0 10px 26px rgba(209,149,42,0.06);transition:transform .18s ease, box-shadow .18s ease;position:relative;}
        .btn.order.added{animation:pop-glow 0.36s ease forwards;box-shadow:0 12px 52px rgba(209,149,42,0.14);}
        .btn.order.added::after{content:'';position:absolute;inset:-6px;z-index:-1;border-radius:12px;box-shadow:0 0 24px rgba(255,234,153,0.35);opacity:0.85;pointer-events:none;}
        @keyframes pop-glow { 0% { transform: scale(1); box-shadow:0 6px 18px rgba(209,149,42,0.04); } 40% { transform: scale(1.08); box-shadow:0 18px 48px rgba(209,149,42,0.12); } 70% { transform: scale(1.04); box-shadow:0 14px 38px rgba(209,149,42,0.1); } 100% { transform: scale(1); box-shadow:0 12px 34px rgba(209,149,42,0.08); } }
        .btn.ghost{background:transparent;border:1px solid rgba(34,34,34,0.06);color:rgba(34,34,34,0.8)}

        /* QUICK VIEW MODAL */
        .quick-modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:60;padding:28px}
        .quick-backdrop{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.6))}
        .quick-panel{position:relative;z-index:61;background:#fff;border-radius:12px;max-width:920px;width:100%;display:flex;gap:18px;padding:20px;box-shadow:0 30px 90px rgba(15,20,12,0.08);color:#111}
        .quick-media{flex:0 0 340px;display:flex;align-items:center;justify-content:center;border-radius:12px;overflow:hidden;background:linear-gradient(135deg, rgba(248,193,59,0.02), rgba(0,0,0,0.02))}
        .quick-info{flex:1}
        .close-quick{position:absolute;top:12px;right:12px;border:0;background:transparent;color:#111;font-size:20px;cursor:pointer}
        @media (max-width:980px){.hero-inner{flex-direction:column;align-items:flex-start}.hero-media{width:100%;flex:1}.hero-card{width:100%}.quick-panel{flex-direction:column}.quick-media{width:100%;flex:0 0 auto}.product-media{height:180px}}
        @media (max-width:760px){.products-hero{padding:32px 18px 26px}.hero-copy{width:100%}.hero-copy h1{font-size:32px}.hero-copy p{font-size:15px;max-width:100%}.hero-cta{flex-direction:column;align-items:stretch}.hero-cta .btn{width:100%}.products-header{flex-direction:column;align-items:flex-start}.products-grid{gap:20px;padding:0 4px}.product-card{padding:16px}.product-media{height:170px}.card-actions{flex-direction:column;align-items:stretch}.card-actions .btn{width:100%}.quick-panel{padding:18px}.quick-info{width:100%}}`}</style>

      <section className="products-hero" ref={heroRef}>
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Premium Eggs — A Brighter Breakfast</h1>
            <p>Our award-winning eggs are hand-sorted, cold-stored, and delivered with care. Premium taste for homes and businesses.</p>
            <div className="hero-cta">
              <button ref={heroPrimaryRef} className="btn primary" onClick={() => { const el = document.getElementById('products-grid'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Shop Packs</button>
            </div>
          </div>
          <div className="hero-media" aria-hidden ref={heroMediaRef}>
            <div className="hero-card float">
              <img src={'/static/images/products/60.jpg'} alt="featured" />
            </div>
          </div>
        </div>
      </section>

      <div className="products-header">
        <div>
          <h2 style={{margin:0}}>Our Packs</h2>
          <div className="muted">Select a pack to view details or add it to your cart.</div>
        </div>
      </div>

      <section id="products-grid" className="products-grid" ref={gridRef}>
        {visible.map(p => <ProductCard p={p} key={p.slug} onQuickView={(prod) => setQuick(prod)} />)}
      </section>

      {quick && (
        <div className="quick-modal" role="dialog" aria-modal="true">
          <div className="quick-backdrop" onClick={() => setQuick(null)} />
          <div className="quick-panel" role="document" aria-label={`Quick view ${quick.name}`}>
            <button className="close-quick" onClick={() => setQuick(null)}>×</button>
            <div className="quick-media">
              <img src={quick.img} alt={quick.name} style={{maxWidth:'100%',borderRadius:12}} />
            </div>
            <div className="quick-info">
              <h3 style={{marginTop:0}}>{quick.name}</h3>
              {quick.tag && <div className="muted">{quick.tag}</div>}
              <div style={{marginTop:12, marginBottom:12}}>{quick.desc}</div>
              <div className="price" style={{fontSize:22, marginBottom:12}}>{quick.price ? formatZAR(quick.price) : 'Request quote'}</div>
              <div style={{display:'flex',gap:10}}>
                <button className="btn order" onClick={() => { addToCart(quick.slug); setQuick(null); navigate('/cart') }}>Add to cart</button>
                <Link to={`/products/${quick.slug}`} className="btn ghost" onClick={() => setQuick(null)}>View Details</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
