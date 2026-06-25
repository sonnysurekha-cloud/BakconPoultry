import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import StoreLocator from './pages/StoreLocator'
import ProductDetail from './pages/ProductDetail'
import PaymentReturn from './pages/PaymentReturn'
import Showcase from './pages/Showcase'
import Cart from './pages/Cart'
import useScrollProgress from './hooks/useScrollProgress'
// StickyCTA removed: using FloatingCart for cart access instead
import FloatingCart from './components/FloatingCart'

function App() {
  useScrollProgress()

  return (
    <div className="app-root">
      <Header />
      {/* scroll progress bar */}
      <div id="scroll-progress" aria-hidden style={{ position: 'fixed', left: 0, top: 0, height: 3, background: 'var(--egg)', width: 0, zIndex: 9999 }} />
      {/* Sticky CTA removed per request */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payments/return" element={<PaymentReturn />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stores" element={<StoreLocator />} />
        </Routes>
      </main>
      <FloatingCart />
      <Footer />
    </div>
  )
}

export default App
