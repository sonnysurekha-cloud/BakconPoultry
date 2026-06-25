import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const footerStyles = `
.site-footer{background:linear-gradient(180deg,#ffffff,#fbfaf6);color:#111;padding:48px 20px;border-top:4px solid rgba(2,6,23,0.04)}
.footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:28px;align-items:start}
.footer-brand{display:flex;flex-direction:column;gap:12px;text-align:left}
.footer-brand .logo{font-weight:900;font-size:22px;color:var(--egg);letter-spacing:1px}
.footer-brand p{color:rgba(34,34,34,0.8);max-width:45ch}
.footer-links ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
.footer-links a{color:rgba(34,34,34,0.9);text-decoration:none;font-weight:600}
.contact-item{display:flex;gap:12px;align-items:center;color:rgba(34,34,34,0.9);margin-bottom:10px}
.contact-item svg{color:var(--egg);min-width:18px}
.newsletter{display:flex;gap:10px;align-items:center}
.newsletter input{flex:1;padding:12px 14px;border-radius:10px;border:1px solid rgba(34,34,34,0.06);background:#fff;color:#111}
.newsletter button{padding:12px 18px;border-radius:10px;border:none;background:linear-gradient(90deg,#F8C13B,#D4AF37);color:#111;font-weight:700}
.socials{display:flex;gap:10px;margin-top:8px}
.socials a{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:8px;background:rgba(34,34,34,0.04);color:rgba(34,34,34,0.9);transition:all 220ms}
.socials a:hover{transform:translateY(-4px);background:var(--egg);color:#111}
.footer-bottom{padding:18px 20px;border-top:1px solid rgba(34,34,34,0.04);display:flex;justify-content:space-between;align-items:center;font-size:14px;color:rgba(34,34,34,0.7);max-width:1200px;margin:0 auto}
.footer-bottom a{color:rgba(34,34,34,0.9);text-decoration:none}
@media (max-width:1000px){.footer-inner{grid-template-columns:1fr 1fr}}
@media (max-width:640px){.footer-inner{grid-template-columns:1fr;gap:20px}.newsletter{flex-direction:column;align-items:stretch}.newsletter input{width:100%}.footer-bottom{flex-direction:column;align-items:flex-start;gap:8px}}
`;

export default function Footer() {
  // WhatsApp contact removed — contact via site forms instead

  return (
    <footer className="site-footer" role="contentinfo">
      <style>{footerStyles}</style>

      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">BAKCON EGGS</div>
          <p>Premium commercial egg supplier in the Free State. Trusted by food businesses for quality, safety and reliable delivery.</p>
          <div className="socials" aria-label="social links">
            <a href="#" aria-label="facebook"><FaFacebookF /></a>
            <a href="#" aria-label="instagram"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4 style={{color:'var(--egg)',margin:'0 0 12px',fontSize:18}}>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4 style={{color:'var(--egg)',margin:'0 0 12px',fontSize:18}}>Contact</h4>
          <div className="contact-item"><FaMapMarkerAlt /><span>166 Voorspoed Ave, Bloemfontein</span></div>
          <div className="contact-item"><FaPhone /><a href="tel:0515268800" style={{color:'inherit',textDecoration:'none'}}>051 526 8800</a></div>
          <div className="contact-item"><FaEnvelope /><a href="mailto:info@bakcon.co.za" style={{color:'inherit',textDecoration:'none'}}>info@bakcon.co.za</a></div>
        </div>

        <div>
          <h4 style={{color:'var(--egg)',margin:'0 0 12px',fontSize:18}}>Newsletter</h4>
          <p style={{color:'rgba(255,255,255,0.85)',marginBottom:12}}>Get supply updates and pricing directly to your inbox.</p>
          <form className="newsletter" onSubmit={(e) => { e.preventDefault(); alert('Thanks — newsletter signup simulated.'); }}>
            <input name="email" aria-label="email" type="email" placeholder="Your business email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} Bakcon Poultry — All rights reserved.</div>
        <div><Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></div>
      </div>
    </footer>
  )
}
