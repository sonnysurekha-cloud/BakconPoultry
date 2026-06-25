import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiSearch, FiX } from 'react-icons/fi'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/stores', label: 'Stores' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const headerStyles = `
  .site-header { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.92); border-bottom: 1px solid rgba(212, 175, 55, 0.14); box-shadow: 0 22px 70px rgba(15, 81, 50, 0.08); backdrop-filter: blur(22px); }
  .header-inner { max-width: 1200px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .header-nav { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  .header-actions { display: flex; align-items: center; gap: 10px; }
  .header-shop-link { display: inline-flex; align-items: center; justify-content: center; padding: 12px 20px; border-radius: 14px; background: linear-gradient(135deg, #F8C13B 0%, #D4AF37 100%); color: #111; font-weight: 700; text-decoration: none; box-shadow: 0 18px 48px rgba(212, 175, 55, 0.2); transition: transform 240ms ease; }
  .header-shop-link:hover { transform: translateY(-2px); }
  .mobile-menu-toggle { display: none; width: 44px; height: 44px; border-radius: 14px; border: 1px solid rgba(212, 175, 55, 0.2); background: #fff; color: #1F3E2F; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 240ms ease, box-shadow 240ms ease; box-shadow: 0 12px 30px rgba(15, 81, 50, 0.08); }
  .mobile-menu-toggle:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(15, 81, 50, 0.12); }
  .header-nav .nav-link { display: inline-flex; align-items: center; padding: 10px 18px; border-radius: 999px; font-weight: 700; font-size: 14px; text-decoration: none; transition: all 240ms ease; }
  @media (max-width: 900px) {
    .header-inner { padding: 14px 18px; gap: 14px; }
    .header-nav { display: none; }
    .header-shop-link { display: none; }
    .mobile-menu-toggle { display: inline-flex; }
  }
  @media (max-width: 640px) {
    .header-inner { flex-direction: column; align-items: stretch; }
    .header-actions { justify-content: space-between; width: 100%; }
  }
`

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  const pillStyle = (active: boolean) => ({
    padding: '10px 18px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14,
    color: active ? '#111' : '#4b5563',
    background: active ? 'linear-gradient(135deg, #F8C13B 0%, #D4AF37 100%)' : 'transparent',
    boxShadow: active ? '0 10px 30px rgba(209, 149, 42, 0.18)' : 'none',
    textDecoration: 'none',
    transition: 'all 240ms ease',
    display: 'inline-flex',
    alignItems: 'center',
  })

  return (
    <header
      role="banner"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.92)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.14)',
        boxShadow: '0 22px 70px rgba(15, 81, 50, 0.08)',
        backdropFilter: 'blur(22px)',
      }}
    >
      <style>{headerStyles}</style>
      <div
        className="header-inner"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <Link
          to="/"
          aria-label="Bakcon Eggs Home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 800,
            fontSize: 22,
            color: '#1F3E2F',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #F8C13B, #D4AF37)',
              color: '#111',
              boxShadow: '0 18px 40px rgba(212, 175, 55, 0.25)',
            }}
          >
    
          </span>
          <span style={{ letterSpacing: '-0.5px' }}>Bakcon Eggs</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto' }}>
          <nav className="header-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link"
                style={pillStyle(isActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              aria-label="Search"
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                border: '1px solid rgba(212, 175, 55, 0.2)',
                background: 'rgba(248, 193, 59, 0.12)',
                color: '#1F3E2F',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 240ms ease, background 240ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.background = 'rgba(248, 193, 59, 0.18)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.background = 'rgba(248, 193, 59, 0.12)'
              }}
            >
              <FiSearch size={18} />
            </button>

            <Link
              to="/products"
              className="header-shop-link"
              style={{
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Shop
            </Link>

            <button
              type="button"
              aria-label="Open mobile menu"
              onClick={() => setMobileOpen(true)}
              className="mobile-menu-toggle"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(6, 8, 15, 0.72)',
            backdropFilter: 'blur(10px)',
            zIndex: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: 110,
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{
              width: '92%',
              maxWidth: 420,
              background: 'rgba(255,255,255,0.98)',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 35px 90px rgba(15, 81, 50, 0.18)',
              border: '1px solid rgba(212, 175, 55, 0.18)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#1F3E2F' }}>Bakcon Menu</div>
                <div style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>Navigation for smaller screens</div>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  background: 'rgba(248, 193, 59, 0.16)',
                  color: '#1F3E2F',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <FiX size={20} />
              </button>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 16,
                    background: isActive(link.href) ? 'linear-gradient(135deg, rgba(248, 193, 59, 0.18), rgba(15, 81, 50, 0.08))' : '#F6F2E6',
                    color: isActive(link.href) ? '#111' : '#475059',
                    textDecoration: 'none',
                    fontWeight: 700,
                    transition: 'background 240ms ease',
                    display: 'block',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
