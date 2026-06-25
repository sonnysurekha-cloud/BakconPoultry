export type CartItem = { slug: string; qty: number }

const KEY = 'bakcon_cart_v1'

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as CartItem[]
  } catch (e) {
    return []
  }
}

export function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items))
    try {
      const ev = new CustomEvent('bakcon_cart_updated', { detail: items })
      window.dispatchEvent(ev)
    } catch (e) {
      // ignore event errors
    }
  } catch (e) {
    // ignore
  }
}

export function addToCart(slug: string, qty = 1) {
  const items = getCart()
  const existing = items.find(i => i.slug === slug)
  if (existing) {
    existing.qty += qty
  } else {
    items.push({ slug, qty })
  }
  saveCart(items)
  return items
}

export function updateQty(slug: string, qty: number) {
  const items = getCart()
  const idx = items.findIndex(i => i.slug === slug)
  if (idx >= 0) {
    if (qty <= 0) items.splice(idx, 1)
    else items[idx].qty = qty
    saveCart(items)
  }
  return items
}

export function removeFromCart(slug: string) {
  const items = getCart().filter(i => i.slug !== slug)
  saveCart(items)
  return items
}

export function clearCart() {
  saveCart([])
}

export function getCartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0)
}
