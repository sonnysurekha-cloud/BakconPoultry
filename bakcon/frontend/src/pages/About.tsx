import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import CountUp from '../components/CountUp'

export default function About() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  useScrollReveal(rootRef)

  return (
    <main ref={rootRef}>
      <style>{`
        .about-hero-inner{display:flex;gap:48px;align-items:center;justify-content:space-between;max-width:1100px;margin:0 auto;padding:12px 0}
        .about-hero-content{flex:1;min-width:0}
        .about-hero-media{flex:0 0 420px;display:flex;align-items:center;justify-content:center}
        .about-hero-media img{width:100%;max-width:420px;height:auto;border-radius:16px;box-shadow:var(--card-elev);display:block}
        .about-hero-content h1{margin:0 0 12px;font-size:44px;line-height:1.08}
        .about-hero-content .lead{margin-top:12px;color:var(--muted);max-width:56ch}
        .about-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-top:20px}
        .about-stat{background:var(--card);padding:20px;border-radius:12px;box-shadow:var(--shadow);flex:1;text-align:center}
        .about-stat h3{margin:0;font-size:28px;color:var(--egg-dark)}
        .about-values{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-top:28px}
        .value-card{background:linear-gradient(180deg, var(--card), var(--card));padding:20px;border-radius:12px;border:1px solid var(--border);box-shadow:var(--shadow);min-height:88px}
        .team-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin-top:22px}
        .team-member{border-radius:10px;overflow:hidden;background:var(--card);box-shadow:var(--shadow);min-height:220px}
        .team-member img{display:block;width:100%;height:160px;object-fit:cover}
        .team-member .meta{padding:12px}
        .vision-mission{display:flex;gap:18px;margin-top:20px;align-items:stretch}
        .vm-card{flex:1;padding:20px;border-radius:12px;background:linear-gradient(180deg,var(--card),#fff);border:1px solid var(--border);box-shadow:var(--shadow)}
        .vm-card h3{margin:0 0 8px;color:var(--egg-dark)}
        .vm-card p{margin:0;color:var(--muted)}
        @media (max-width:900px){
          .about-hero-inner{flex-direction:column;gap:24px;padding:12px 0}
          .about-hero-media img{width:100%;max-width:720px}
          .about-values{grid-template-columns:1fr}
          .team-grid{grid-template-columns:repeat(2,1fr)}
          .vision-mission{flex-direction:column}
        }
        @media (max-width:640px){
          .about-hero-inner{padding:12px 0}
          .about-hero-media img{max-width:100%}
          .about-stat h3{font-size:24px}
          .about-values{gap:14px}
          .team-grid{grid-template-columns:1fr}
          .vision-mission{gap:14px}
          .btn{width:100%;justify-content:center}
        }
      `}</style>

      <section className="section" data-reveal="up">
        <div className="container about">
          <div className="about-hero-inner">
            <div className="about-hero-content">
              <h1>About Bakcon Eggs</h1>
              <p className="lead">Bakcon Eggs is a locally owned poultry business committed to supplying fresh, high-quality eggs to households and businesses across the Free State. We focus on food safety, reliable logistics, and long-term partnerships.</p>

              <div className="about-stats" aria-hidden>
                <div className="about-stat">
                  <h3><CountUp end={100000} duration={3000} suffix="+" /></h3>
                  <div style={{marginTop:8,fontSize:14,color:'var(--muted)'}}>Eggs Distributed</div>
                </div>
                <div className="about-stat">
                  <h3><CountUp end={50} duration={2400} suffix="+" /></h3>
                  <div style={{marginTop:8,fontSize:14,color:'var(--muted)'}}>Business Clients</div>
                </div>
                <div className="about-stat">
                  <h3><CountUp end={15} duration={2400} suffix="+" /></h3>
                  <div style={{marginTop:8,fontSize:14,color:'var(--muted)'}}>Delivery Routes</div>
                </div>
              </div>

              <div className="about-values">
                <div className="value-card" data-reveal="up"><strong>Food Safety</strong><p style={{marginTop:8,color:'var(--muted)'}}>We follow strict inspection and storage procedures.</p></div>
                <div className="value-card" data-reveal="up"><strong>Reliable Delivery</strong><p style={{marginTop:8,color:'var(--muted)'}}>Scheduled routes and cold-chain logistics.</p></div>
                <div className="value-card" data-reveal="up"><strong>Premium Quality</strong><p style={{marginTop:8,color:'var(--muted)'}}>Fresh, consistent eggs for business needs.</p></div>
              </div>

              <div className="vision-mission" data-reveal="up">
                <div className="vm-card" data-reveal="up">
                  <h3>Our Vision</h3>
                  <p>To be the trusted, leading supplier of high-quality eggs across the Free State — empowering food businesses with consistent, safe, and sustainable products.</p>
                </div>
                <div className="vm-card" data-reveal="up">
                  <h3>Our Mission</h3>
                  <p>Deliver fresh, safe eggs through dependable logistics, rigorous quality control, and strong partnerships, while supporting sustainable local operations.</p>
                </div>
              </div>

              <div style={{marginTop:20}}>
                <Link to="/products" className="btn primary">Shop Now</Link>
                <Link to="/contact" className="btn" style={{marginLeft:12}}>Contact Us</Link>
              </div>
            </div>

            <div className="about-hero-media">
              <img src="/images/12.jpg" alt="Bakcon Poultry operation" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-reveal="up">
        <div className="container">
          <h2>Meet The Team</h2>
          <p className="lead">Our local team keeps operations running smoothly — from farm management to delivery and customer support.</p>

          <div className="team-grid">
            <div className="team-member" data-reveal="up"><img src="/images/13.jpg" alt="Team member" /><div className="meta"><strong>John Doe</strong><div style={{fontSize:13,color:'var(--muted)'}}>Operations Manager</div></div></div>
            <div className="team-member" data-reveal="up"><img src="/images/14.jpg" alt="Team member" /><div className="meta"><strong>Jane Smith</strong><div style={{fontSize:13,color:'var(--muted)'}}>Logistics</div></div></div>
            <div className="team-member" data-reveal="up"><img src="/images/15.jpg" alt="Team member" /><div className="meta"><strong>Pamela</strong><div style={{fontSize:13,color:'var(--muted)'}}>Quality Control</div></div></div>
          </div>
        </div>
      </section>

    </main>
  )
}
