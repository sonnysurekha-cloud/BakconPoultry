import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import useParallax from "../hooks/useParallax";
import useMouseTilt from "../hooks/useMouseTilt";
import useParticles from "../hooks/useParticles";
import useInteractiveCards from "../hooks/useInteractiveCards";
import useSparkleBurst from "../hooks/useSparkleBurst";
import usePointerShimmer from "../hooks/usePointerShimmer";
import CountUp from "../components/CountUp";

const homeStyles = `
:root{ --black:#111111; --gold:#D4AF37; --white:#FFFFFF; --light-gray:#F9F9F9; --dark-text:#1A1A1A; --text:#5a5a5a; --radius:12px; --shadow: 0 25px 80px rgba(212,175,55,0.12); --shadow-lg: 0 40px 120px rgba(212,175,55,0.08); }
*{box-sizing:border-box}
html,body,#root{height:100%}
main{font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial; color:var(--text); background:var(--white);}
.container{max-width:1280px;margin:0 auto;padding:0 20px}

/* HERO - Image Background with Premium Glow */
.hero{background:linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,250,236,0.65)), url('/static/images/6.png');background-size:cover;background-position:center;background-attachment:fixed;color:#111;display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:center;padding:70px 20px;position:relative;overflow:hidden}
.hero::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at 20% 50%,rgba(212,175,55,0.18),transparent),radial-gradient(circle at 80% 80%,rgba(255,255,255,0.6),transparent);pointer-events:none}
.hero h1{font-size:62px;line-height:1.12;margin:0 0 24px;font-weight:900;letter-spacing:-1px;color:#111;text-shadow:0 8px 30px rgba(212,175,55,0.15);position:relative;z-index:2}
.hero p{font-size:19px;color:rgba(34,34,34,0.9);margin-bottom:32px;line-height:1.8;max-width:58ch;position:relative;z-index:2;font-weight:500;}
.hero-left{display:flex;flex-direction:column;gap:28px}
.hero-cta{display:flex;gap:18px;flex-wrap:wrap;position:relative;z-index:2}
.btn{display:inline-flex;align-items:center;gap:10px;padding:16px 32px;border-radius:10px;font-weight:700;text-decoration:none;border:none;cursor:pointer;transition:all 280ms cubic-bezier(0.2,0.9,0.2,1);font-size:15px;letter-spacing:0.5px}
.btn.primary{background:var(--gold);color:var(--black);box-shadow:0 20px 60px rgba(212,175,55,0.24);position:relative;overflow:hidden}
.btn.primary::before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent);transition:left 500ms}
.btn.primary:hover{transform:translateY(-4px);box-shadow:0 28px 80px rgb(167, 122, 45);background:linear-gradient(135deg,#e5c158,var(--gold))}
.btn.primary:hover::before{left:100%}
.btn.secondary{background:#fff;color:#111;border:2px solid rgba(212,175,55,0.2);font-weight:700}
.btn.secondary:hover{background:rgba(255,255,255,0.95);border-color:var(--gold);transform:translateY(-4px)}

.hero-image{width:700px;max-height:360px;object-fit:cover;border-radius:12px;box-shadow:0 40px 120px rgba(212,175,55,0.14);position:relative;z-index:2;border:1px solid rgba(212,175,55,0.18);will-change:transform;transition:transform 280ms ease}
.hero-image:hover{transform:translateY(-6px) scale(1.01)}
.parallax-element{will-change:transform;transition:transform 0.25s ease-out}
/* Statistics Strip */
.stats-strip{background:linear-gradient(135deg,#fafaf8,#f5f5f3);padding:64px 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:32px;position:relative}
.stats-strip::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:repeating-linear-gradient(90deg,transparent,transparent 1px,rgba(212,175,55,0.02) 1px,rgba(212,175,55,0.02) 2px);pointer-events:none}
.stat{text-align:center;position:relative;z-index:2}
.stat h3{font-size:48px;margin:0;font-weight:900;color:rgb(242, 255, 63);letter-spacing:-1px;text-shadow:0 2px 8px rgba(212,175,55,0.15)}
.stat p{margin:12px 0 0;font-size:16px;color:var(--text);font-weight:600;letter-spacing:0.3px}

/* Section Styles */
.section{padding:100px 20px;background:var(--white);position:relative}
.section.dark{background:linear-gradient(135deg,#fff8ec,#f7efe3);color:#111}
.section h2{font-size:48px;margin:0 0 20px;font-weight:900;letter-spacing:-0.8px;color:var(--dark-text)}
.section.dark h2{color:#111;text-shadow:none}
.section .lead{font-size:18px;margin-bottom:40px;line-height:1.8;max-width:70ch;color:rgba(0,0,0,0.75);font-weight:500}
.section.dark .lead{color:rgba(34,34,34,0.78)}

/* About Section - Two Column */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.about-image img{width:100%;border-radius:12px;box-shadow:0 40px 120px rgba(212,175,55,0.12);border:1px solid rgba(212,175,55,0.08);transition:transform 400ms ease,box-shadow 400ms ease}
.about-image:hover img{transform:scale(1.02);box-shadow:0 50px 150px rgba(212,175,55,0.14)}
.about-content h2{color:var(--dark-text)}
.about-content p{font-size:17px;line-height:1.9;margin:0 0 22px;color:var(--text)}
.about-content strong{color:var(--gold);font-weight:700}

/* Who We Supply */
.serve-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-top:40px}
.serve-card{background:var(--light-gray);padding:40px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.04);text-align:center;border-top:4px solid var(--gold);transition:all 320ms cubic-bezier(0.2,0.9,0.2,1);position:relative;overflow:hidden}
.serve-card::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,rgba(212,175,55,0),rgba(212,175,55,0.05));opacity:0;transition:opacity 320ms ease}
.serve-card:hover{transform:translateY(-12px);box-shadow:0 30px 80px rgba(212,175,55,0.15);background:linear-gradient(135deg,#ffffff,#fafaf8)}
.serve-card:hover::before{opacity:1}
.serve-card h3{font-size:22px;margin:0;font-weight:800;color:var(--dark-text);letter-spacing:-0.3px;position:relative;z-index:2}
.serve-card p{margin:14px 0 0;font-size:15px;color:var(--text);line-height:1.7;position:relative;z-index:2}

/* Why Choose Benefits */
.benefits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;margin-top:40px}
.benefit{font-size:17px;line-height:1.9;color:var(--text);padding:32px;background:var(--light-gray);border-radius:10px;transition:all 300ms ease;border-left:4px solid transparent}
.benefit:hover{border-left-color:var(--gold);background:linear-gradient(135deg,#ffffff,#fafaf8)}
.benefit strong{display:block;color:var(--dark-text);margin-bottom:12px;font-size:20px;letter-spacing:-0.3px}

        /* Sparkle floating + burst (CSS fallback) */
        .benefits-grid{position:relative}
        .spark-floating{position:absolute;border-radius:50%;pointer-events:none;mix-blend-mode:screen;filter:blur(6px);transform:translate3d(0,0,0);animation:floatMove 10s linear infinite}
        @keyframes floatMove{0%{transform:translateY(0) scale(1)}50%{transform:translateY(-40px) scale(1.08)}100%{transform:translateY(0) scale(1)}}
        .spark-burst{position:absolute;border-radius:50%;pointer-events:none;mix-blend-mode:screen;filter:blur(2px);transform:translate(-50%,-50%);animation:burstMove var(--dur,800ms) cubic-bezier(.2,.9,.2,1) forwards}
        @keyframes burstMove{to{transform:translate(var(--tx),var(--ty)) scale(.6);opacity:0;filter:blur(8px)}}

/* Distribution Network */
.distribution-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:40px}
.distribution-locations h4{font-size:24px;margin:0 0 24px;font-weight:800;color:var(--gold);letter-spacing:-0.3px}
.distribution-item{background:#fff;padding:24px;margin-bottom:18px;border-radius:16px;border-left:4px solid var(--gold);color:rgba(17,17,17,0.9);box-shadow:0 20px 60px rgba(15,20,12,0.06);transition:all 300ms ease}
.distribution-item:hover{background:rgb(246, 255, 0);transform:translateX(8px)}
.distribution-item strong{display:block;font-size:18px;margin-bottom:6px;letter-spacing:-0.2px}
.distribution-item span{display:block;font-size:14px;color:rgba(34,34,34,0.72);margin-top:4px}
  .distribution-image img{width:100%;border-radius:12px;box-shadow:0 40px 120px rgba(0,0,0,0.18);border:1px solid rgba(212,175,55,0.15);transition:transform 400ms ease}
  .distribution-image:hover img{transform:scale(1.01)}

  /* Gallery and Photo Strip */
  .gallery-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:32px}
  .gallery-item{position:relative;border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(212,175,55,0.12);transition:transform 350ms cubic-bezier(0.2,0.9,0.2,1),box-shadow 350ms}
  .gallery-item:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 40px 120px rgba(212,175,55,0.16)}
  .gallery-image{width:100%;height:220px;object-fit:cover;display:block;transition:transform 400ms}

  .photo-strip{display:flex;gap:14px;overflow-x:auto;padding:18px 4px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;margin-top:12px}
  .photo{min-width:220px;height:140px;flex:0 0 auto;border-radius:10px;overflow:hidden;box-shadow:0 12px 40px rgba(212,175,55,0.08);transition:transform 280ms}
  .photo img{width:100%;height:100%;object-fit:cover;display:block}
  .photo:hover{transform:translateY(-6px) scale(1.02)}

/* Final CTA */
.final-cta{background: linear-gradient(135deg, rgba(212,175,55,0.88), rgba(229,193,88,0.88)), url('/static/images/16.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; background-blend-mode: multiply; color: var(--black); padding: 120px 20px; text-align: center; border-radius: 0; position: relative; overflow: hidden}
.final-cta::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at 20% 50%,rgba(255,255,255,0.2),transparent),radial-gradient(circle at 80% 80%,rgba(255,255,255,0.1),transparent);pointer-events:none}
.final-cta h2{font-size:52px;margin:0 0 20px;font-weight:900;letter-spacing:-0.8px;color:var(--dark-text);position:relative;z-index:2}
.final-cta p{font-size:20px;margin:0 0 40px;max-width:70ch;margin-left:auto;margin-right:auto;color:rgba(0,0,0,0.85);line-height:1.8;font-weight:500;position:relative;z-index:2}
.final-cta .hero-cta{justify-content:center;position:relative;z-index:2}

/* Footer styles moved to components/Footer.tsx */

@media (max-width:1000px){
  .hero{grid-template-columns:1fr;gap:40px;padding:80px 20px}
  .hero h1{font-size:48px}
  .stats-strip{grid-template-columns:repeat(2,1fr);gap:24px;padding:50px 20px}
  .serve-grid{grid-template-columns:repeat(2,1fr)}
  .benefits-grid{grid-template-columns:1fr}
  .about-grid{grid-template-columns:1fr;gap:40px}
  .distribution-grid{grid-template-columns:1fr;gap:40px}
  .section{padding:80px 20px}
}
@media (max-width:760px){
  .gallery-grid{grid-template-columns:1fr;gap:16px}
  .photo-strip{padding:14px 2px}
  .photo{min-width:180px}
}
@media (max-width:640px){
  .hero h1{font-size:36px;line-height:1.2}
  .section h2{font-size:36px}
  .stats-strip{grid-template-columns:1fr}
  .serve-grid{grid-template-columns:1fr}
  .distribution-grid{grid-template-columns:1fr}
  .gallery-grid{grid-template-columns:1fr}
  .photo-strip{padding:12px 0}
  .photo{min-width:100%;}
  .benefits-grid{gap:20px}
  .benefit{padding:24px}
  .final-cta{padding:80px 20px}
  .final-cta h2{font-size:36px}
}
`;

// WhatsApp ordering removed — contact via site forms instead

export default function Home() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroImgRef = useRef<HTMLImageElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const distImgRef = useRef<HTMLDivElement | null>(null);
  const serveRef = useRef<HTMLDivElement | null>(null);
  const benefitsRef = useRef<HTMLDivElement | null>(null);
  const benefitsGridRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLElement | null>(null);
  const heroCardRef = useRef<HTMLDivElement | null>(null);

  // Wire up scroll reveal and parallax
  useScrollReveal(rootRef);
  useScrollReveal(serveRef);
  useSparkleBurst(benefitsGridRef, { burstCount: 44, floatCount: 20 })
  useParallax(heroImgRef, 0.04);
  useParallax(distImgRef, 0.02);
  useParallax(finalRef, 0.015);
  useMouseTilt(heroCardRef, 6)
  usePointerShimmer(heroSectionRef, { size: 320, intensity: 0.9 })
  useParticles(serveRef, { count: 28, colors: ['rgb(255, 254, 0)', 'rgb(255, 255, 255)', 'rgb(255, 251, 0)'] })
  useInteractiveCards(serveRef, 8, 1.03)

  // Small JS fallback: create floating sparks and pointer/scroll bursts inside benefits grid
  useEffect(() => {
    const grid = benefitsGridRef.current
    if (!grid) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    grid.style.position = grid.style.position || 'relative'
    const floats: HTMLElement[] = []

    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div')
      el.className = 'spark-floating'
      const size = 6 + Math.random() * 18
      el.style.width = size + 'px'
      el.style.height = size + 'px'
      el.style.left = Math.round(Math.random() * 90) + '%'
      el.style.top = Math.round(Math.random() * 90) + '%'
      el.style.opacity = String(0.2 + Math.random() * 0.6)
      el.style.animationDelay = Math.random() * 6 + 's'
      el.style.background = 'radial-gradient(circle, rgba(255,223,87,0.95), rgba(255,239,166,0.6) 50%, transparent 60%)'
      grid.appendChild(el)
      floats.push(el)
    }

    function createBurstAt(x: number, y: number) {
      for (let i = 0; i < 26; i++) {
        const s = document.createElement('div')
        s.className = 'spark-burst'
        const size = 4 + Math.random() * 10
        s.style.width = size + 'px'
        s.style.height = size + 'px'
        s.style.left = x + 'px'
        s.style.top = y + 'px'
        s.style.background = 'radial-gradient(circle, rgba(213, 183, 50, 0.81), rgba(255,239,166,0.9) 60%, transparent 70%)'
        s.style.transform = 'translate(-50%,-50%)'
        const angle = Math.random() * Math.PI * 2
        const dist = 20 + Math.random() * 140
        s.style.setProperty('--tx', Math.cos(angle) * dist + 'px')
        s.style.setProperty('--ty', Math.sin(angle) * dist + 'px')
        s.style.setProperty('--dur', (600 + Math.random() * 900) + 'ms')
        grid.appendChild(s)
        s.addEventListener('animationend', () => s.remove(), { once: true })
      }
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = grid.getBoundingClientRect()
          createBurstAt(rect.width * 0.5, rect.height * 0.35)
        }
      })
    }, { threshold: 0.2 })
    obs.observe(grid)

    function onPointer(e: PointerEvent) {
      const rect = grid.getBoundingClientRect()
      createBurstAt(e.clientX - rect.left, e.clientY - rect.top)
    }

    grid.addEventListener('pointerdown', onPointer)

    return () => {
      obs.disconnect()
      grid.removeEventListener('pointerdown', onPointer)
      floats.forEach(f => f.remove())
    }
  }, [benefitsGridRef])

  return (
    <main ref={rootRef}>
      <style>{homeStyles}</style>
      <style>{`
        /* Hero shimmer glow */
        .pointer-shimmer{position:absolute;border-radius:50%;pointer-events:none;mix-blend-mode:overlay;filter:blur(36px) saturate(120%);transition:opacity 260ms ease,transform 260ms cubic-bezier(.2,.9,.2,1);z-index:1}
        .hero{overflow:hidden}
        .hero::after { content: ''; position: absolute; inset: -20% -10% -10% -10%; background: radial-gradient(circle at 20% 30%, rgba(212,175,55,0.12), transparent 12%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.04), transparent 30%); pointer-events:none; z-index:1; filter: blur(40px); opacity:0.95; }
        /* subtle depth shadow for parallax elements */
        .parallax-element { will-change: transform; transform-origin: center; }
        /* gallery tilt */
        .gallery-item { perspective: 900px }
        .gallery-item img { transform-origin: center; transition: transform 360ms cubic-bezier(.2,.9,.2,1) }
        .gallery-item:hover img { transform: translateY(-6px) rotateX(6deg) scale(1.02) }
        /* Who we serve: particle canvas container and glass cards */
        .serve-area { position: relative; padding: 28px 0; }
        .serve-area .serve-grid { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; z-index: 2 }
        .serve-card { background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)); padding: 28px; border-radius: 14px; border: 1px solid rgba(212,175,55,0.06); backdrop-filter: blur(8px); transition: transform 420ms cubic-bezier(.2,.9,.2,1), box-shadow 420ms; transform-style: preserve-3d; box-shadow: 0 18px 40px rgba(0,0,0,0.06); position: relative }
        .serve-card::before { content: ''; position: absolute; inset: 0; border-radius: 14px; background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent); pointer-events:none }
        .serve-card h3 { margin: 0 0 8px; color: var(--dark-text) }
        .serve-card p { margin: 0; color: rgba(0,0,0,0.7) }
        .serve-card[data-index] { opacity: 1; transform: none; }
        .serve-card.reveal-visible, .serve-card.visible { opacity: 1; transform: none; transition-delay: var(--reveal-delay, 0s); }
        @media (max-width: 900px) {
          .serve-area .serve-grid { grid-template-columns: 1fr }
        }
      `}</style>

      {/* HERO */}
      <section className="hero" data-reveal="up" ref={heroSectionRef}>
        <div className="hero-left" data-reveal="left">
          <h1>Supplying Food Businesses With Quality Eggs Every Day</h1>
          <p>Trusted by restaurants, retailers, wholesalers, and food businesses across the Free State with reliable delivery and premium supply.</p>
          <div className="hero-cta">
            <Link to="/products" className="btn primary">Shop Now</Link>
            <Link to="/contact" className="btn secondary">Contact Sales</Link>
          </div>
        </div>
        <div data-reveal="right">
          <div ref={heroCardRef} style={{display:'inline-block',borderRadius:12,overflow:'hidden'}}>
            <img ref={heroImgRef} className="hero-image parallax-element" src="/static/images/15.jpg" alt="Team and staff" />
          </div>
        </div>
      </section>

      {/* STATISTICS STRIP */}
      <section className="stats-strip" data-reveal="up">
        <div className="stat">
          <h3><CountUp end={100000} duration={4000} suffix="+" /></h3>
          <p>Eggs Distributed</p>
        </div>
        <div className="stat">
          <h3><CountUp end={50} duration={3000} suffix="+" /></h3>
          <p>Business Clients</p>
        </div>
        <div className="stat">
          <h3><CountUp end={15} duration={3000} suffix="+" /></h3>
          <p>Delivery Routes</p>
        </div>
        <div className="stat">
          <h3><CountUp end={24} duration={3000} suffix="hrs" /></h3>
          <p>Order to Delivery</p>
        </div>
      </section>

      {/* ABOUT - White Background */}
      <section className="section" data-reveal="up">
        <div ref={benefitsRef} className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/static/images/12.jpg" alt="Bakcon Poultry operation" />
            </div>
            <div className="about-content">
              <h2>About Bakcon Poultry</h2>
              <p>Bakcon Poultry is a professional commercial supplier serving businesses across the Free State with consistent, high-quality eggs and poultry products.</p>
              <p>Based in Bloemfontein, we've built our reputation on reliability, food safety standards, and the ability to serve high-volume orders. Our operation is designed for businesses that need dependable supply chains, not one-off purchases.</p>
              <p><strong>We supply:</strong> Restaurants, hotels, retail stores, bakeries, schools, wholesalers, and food service operations.</p>
            </div>
          </div>
        </div>
      </section>




      {/* WHO WE SERVE */}
      <section className="section" data-reveal="up">
        <div className="container">
          <h2>Who We Supply</h2>
          <p className="lead">Bakcon Poultry serves commercial food businesses across industries:</p>
          <div ref={serveRef} className="serve-area">
            <div className="serve-grid">
            <div className="serve-card" data-reveal="up" style={{zIndex:2}} data-index={0}>
              <h3>Restaurants & Cafes</h3>
              <p>Consistent daily supply for kitchens and catering operations</p>
            </div>
            <div className="serve-card" data-reveal="up" style={{zIndex:2}} data-index={1}>
              <h3>Hotels & Hospitality</h3>
              <p>Premium supply for hotel chains and hospitality groups</p>
            </div>
            <div className="serve-card" data-reveal="up" style={{zIndex:2}} data-index={2}>
              <h3>Retail Stores</h3>
              <p>Shelf-ready supply for supermarkets and independent retailers</p>
            </div>
            <div className="serve-card" data-reveal="up" style={{zIndex:2}} data-index={3}>
              <h3>Bakeries & Pastry</h3>
              <p>Bulk eggs for professional bakers and pastry chefs</p>
            </div>
            <div className="serve-card" data-reveal="up" style={{zIndex:2}} data-index={4}>
              <h3>Schools & Institutions</h3>
              <p>Safe, inspected supply for institutional food services</p>
            </div>
            <div className="serve-card" data-reveal="up" style={{zIndex:2}} data-index={5}>
              <h3>Wholesalers & Distributors</h3>
              <p>Logistics-ready supply for wholesale distribution networks</p>
            </div>
          </div>
          </div>
        </div>
      </section>



      {/* DISTRIBUTION NETWORK - Dark Green */}
      <section className="section dark" data-reveal="up">
        <div className="container">
          <h2>Distribution Network</h2>
          <p className="lead">We operate scheduled delivery routes across the Free State, reaching businesses daily with cold-chain logistics.</p>
          <div className="distribution-grid">
            <div className="distribution-locations">
              <h4>Coverage Areas</h4>
              <div className="distribution-item">
                <strong>Bloemfontein</strong>
                <span>Primary hub & daily local delivery</span>
              </div>
              <div className="distribution-item">
                <strong>Welkom & Surrounding</strong>
                <span>Weekly scheduled routes</span>
              </div>
              <div className="distribution-item" data-reveal="up">
                <strong>Free State Region</strong>
                <span>Botshabelo, Thaba Nchu, and surrounding areas</span>
              </div>
            </div>
            <div className="distribution-image parallax-element" ref={distImgRef} data-reveal="right">
              <img src="/static/images/4.jpg" alt="Distribution logistics" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section" data-reveal="up">
        <div className="container">
          <h2>Why Businesses Choose Bakcon</h2>
          <div ref={benefitsGridRef} className="benefits-grid">
            <div className="benefit" data-reveal="up">
              <strong>Consistent Supply</strong>
              <p>Reliable daily collection and processing ensures your business never runs short.</p>
            </div>
            <div className="benefit" data-reveal="up">
              <strong>Professional Logistics</strong>
              <p>Scheduled deliveries across the Free State with cold-chain temperature control.</p>
            </div>
            <div className="benefit" data-reveal="up">
              <strong>Quality Assurance</strong>
              <p>Rigorous inspection and food safety compliance for every delivery.</p>
            </div>
            <div className="benefit" data-reveal="up">
              <strong>Competitive Pricing</strong>
              <p>Wholesale rates and volume discounts for regular business partners.</p>
            </div>
            <div className="benefit" data-reveal="up">
              <strong>High-Volume Capacity</strong>
              <p>Built for large-scale orders and growing business needs.</p>
            </div>
            <div className="benefit" data-reveal="up">
              <strong>Commercial Partnerships</strong>
              <p>Flexible terms and dedicated support for long-term business relationships.</p>
            </div>
          </div>
        </div>
      </section>


      {/* GALLERY */}
      <section className="section" data-reveal="up">
        <div className="container">
          <h2>Our Farm & Operations</h2>
          <p className="lead">A quick look at our facilities, team, and distribution fleet — real photos from our operation.</p>

          <div className="gallery-grid">
            <div className="gallery-item" data-reveal="up"><img className="gallery-image" src="/static/images/1.jpg" alt="Egg trays stacked" /></div>
            <div className="gallery-item" data-reveal="up"><img className="gallery-image" src="/static/images/15.jpg" alt="Team and staff" /></div>
            <div className="gallery-item" data-reveal="up"><img className="gallery-image" src="/static/images/3.jpg" alt="Facility exterior" /></div>
            <div className="gallery-item" data-reveal="up"><img className="gallery-image" src="/static/images/6.jpg" alt="Egg shop signage" /></div>
          </div>

          <div className="photo-strip" aria-hidden>
            <div className="photo"><img src="/static/images/2.jpg" alt="Delivery van" /></div>
            <div className="photo"><img src="/static/images/7.jpg" alt="Fleet and tanks" /></div>
            <div className="photo"><img src="/static/images/8.jpg" alt="Workers under tent" /></div>
            <div className="photo"><img src="/static/images/9.jpg" alt="Interior rows" /></div>
            <div className="photo"><img src="/static/images/11.jpg" alt="Welcome sign" /></div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - Gold */}
      <section className="final-cta parallax-element" ref={finalRef} data-reveal="up">
        <h2>Ready to Supply Your Business?</h2>
        <p>Contact Bakcon Poultry today to discuss wholesale pricing, bulk orders, and reliable supply arrangements tailored for your business.</p>
          <div className="hero-cta" style={{ justifyContent: 'center' }}>
          <Link to="/request-quote" className="btn primary">Request a Wholesale Quote</Link>
          <Link to="/contact" className="btn secondary" style={{ borderColor: 'var(--gold)', color: 'var(--black)' }}>Sales Team</Link>
        </div>
      </section>

      {/* Footer is now a shared component rendered in App.tsx */}
    </main>
  );
}