import React, { useRef, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart } from '../lib/cart'
import useParticles from '../hooks/useParticles'
import useSparkleBurst from '../hooks/useSparkleBurst'
import usePointerShimmer from '../hooks/usePointerShimmer'
import useMouseTilt from '../hooks/useMouseTilt'
import useMagnetic from '../hooks/useMagnetic'
import { products } from '../data/products'

function CountUp({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const from = 0
    const animate = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(from + (end - from) * eased))
      if (p < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [end, duration])
  return <span>{val.toLocaleString()}</span>
}

export default function Showcase() {
  const navigate = useNavigate()
  const heroRef = useRef<HTMLElement | null>(null)
  const heroCardRef = useRef<HTMLDivElement | null>(null)
  const ctaRef = useRef<HTMLButtonElement | null>(null)

  useParticles(heroRef, { count: 64 })
  useSparkleBurst(heroRef, { burstCount: 56, floatCount: 28 })
  usePointerShimmer(heroRef, { size: 420, intensity: 0.98 })
  useMouseTilt(heroCardRef, 8)
  useMagnetic(ctaRef, { radius: 220, strength: 0.22, scale: 0.08 })

  const stats = [
    { label: 'Eggs Sold', value: 1200000 },
    { label: 'Happy Customers', value: 12500 },
    { label: 'Years Growing', value: 12 },
  ]

  return (
    <div className="page showcase">
      <style>{`
        .showcase-hero{min-height:78vh;display:flex;align-items:center;padding:48px 20px;border-radius:14px;margin:18px 0;position:relative;overflow:hidden;background:linear-gradient(180deg, #070606 0%, #0b0b0b 60%)}
        .showcase-inner{max-width:1200px;margin:0 auto;display:flex;gap:36px;align-items:center}
        .showcase-copy{flex:1}
        .showcase-copy h1{font-size:64px;line-height:0.98;margin:0;font-weight:900;background:linear-gradient(90deg,var(--egg),var(--egg-dark));-webkit-background-clip:text;background-clip:text;color:transparent}
        .showcase-copy p{margin:12px 0 20px;color:rgba(255,255,255,0.9);font-size:18px}
        .showcase-cta{display:flex;gap:14px}
        .btn.ghost-light{background:transparent;border:1px solid rgba(255,255,255,0.12);color:#fff}
        .hero-media{flex:0 0 420px;display:flex;align-items:center;justify-content:center}
        .hero-card{width:420px;height:260px;border-radius:18px;background:linear-gradient(180deg,#fff,#f7f6f4);display:flex;align-items:center;justify-content:center;box-shadow:0 50px 140px rgba(2,6,23,0.5);transform-style:preserve-3d}
        .hero-card img{max-width:320px}

        .stats{display:flex;gap:18px;margin-top:28px}
        .stat{background:linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,250,248,0.98));padding:18px;border-radius:12px;min-width:180px;box-shadow:0 20px 60px rgba(2,6,23,0.08)}
        .stat .num{font-weight:900;font-size:28px;color:var(--egg)}
        .stat .label{color:var(--muted);font-size:13px}

        .showcase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
        .card-spot{background:linear-gradient(180deg,#fff,#fbfbf9);border-radius:12px;padding:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 20px 60px rgba(2,6,23,0.08)}
        .card-spot img{max-width:160px;margin-bottom:12px}
        .card-spot h4{margin:6px 0 0}

        @media (max-width:980px){
          .showcase-inner{flex-direction:column}
          .showcase-grid{grid-template-columns:repeat(1,1fr)}
          .hero-media{width:100%}
        }
        @media (max-width:760px){
          .showcase-hero{padding:28px 16px;min-height:auto}
          .showcase-copy h1{font-size:36px}
          .showcase-copy p{font-size:16px}
          .showcase-cta{flex-direction:column;align-items:stretch}
          .showcase-cta .btn{width:100%}
          .stats{flex-direction:column}
          .stat{width:100%}
          .hero-card{width:100%;height:auto}
          .card-spot{padding:18px}
          .card-spot img{max-width:100%}
          .card-spot div > .btn{width:100%;margin-bottom:10px}
        }
      `}</style>

      <section className="showcase-hero" ref={heroRef} aria-label="Showcase hero">
        <div className="showcase-inner">
          <div className="showcase-copy">
            <h1>Bakcon — The Golden Egg Experience</h1>
            <p>Delightful, nutritious, and responsibly farmed eggs. Taste the premium difference — crafted for chefs and breakfast lovers.</p>
            <div className="showcase-cta">
              <button ref={ctaRef} className="btn primary" onClick={() => { const el = document.getElementById('products-grid'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Shop Packs</button>
              <Link to="/contact" className="btn ghost-light">Contact Sales</Link>
            </div>

            <div className="stats" aria-hidden>
              {stats.map(s => (
                <div className="stat" key={s.label}>
                  <div className="num"><CountUp end={s.value} duration={1800} /></div>
                  <div className="label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-card" ref={heroCardRef}>
              <img src={products[0]?.img} alt="Featured eggs" />
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-grid" aria-label="Featured packs">
        {products.slice(0,3).map(p => (
          <div className="card-spot" key={p.slug} data-reveal="up">
            <img src={p.img} alt={p.name} />
            <h4>{p.name}</h4>
            <div className="muted">{p.desc}</div>
            <div style={{marginTop:10}}>
              <Link to={`/products/${p.slug}`} className="btn ghost-light" style={{marginRight:8}}>View</Link>
              <button className="btn primary" onClick={() => { addToCart(p.slug); navigate('/cart') }}>Order</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
