// Prefer images from `public/images/products/` placed by the designer
const img6 = '/static/images/products/6eggs.png'
const img12 = '/static/images/products/12egg.png'
const img18 = '/static/images/products/18eggs.png'
const img30 = '/static/images/products/30eggs.png'
const img60 = '/static/images/products/60eggs.png'

export type Product = {
  name: string
  slug: string
  img: string
  price?: number
  unit?: string
  tag?: string
  desc?: string
  features?: string[]
}

export const products: Product[] = [
  {
    name: 'Half Dozen',
    slug: '6-eggs',
    img: img6,
    price: 13,
    unit: 'per pack',
    tag: 'Popular',
    desc: 'Convenient retail pack of 6 fresh eggs — great for households and light catering needs.',
    features: ['Fresh same-day packed', 'Grade A eggs', 'Carton-packed for retail']
  },
  {
    name: 'Dozen',
    slug: '12-eggs',
    img: img12,
    price: 25,
    unit: 'per pack',
    desc: 'Family-sized 12-pack for home cooks and small businesses.',
    features: ['Economical', 'Secure packaging', 'Longer shelf rotation']
  },
  {
    name: '18 Eggs',
    slug: '18-eggs',
    img: img18,
    price: 38,
    unit: 'per pack',
    desc: 'Baker-friendly 18-pack with stable supply for pastry chefs and bakeries.',
    features: ['Consistent sizing', 'Reliable supply', 'Ideal for bakers']
  },
  {
    name: '30 Eggs',
    slug: '30-eggs',
    img: img30,
    price: 65,
    unit: 'per pack',
    desc: 'Wholesale tray (30 eggs) for hospitality and retail restocking.',
    features: ['Bulk-ready', 'Stackable trays', 'Optimized for distribution']
  },
  {
    name: '60 Eggs',
    slug: '60-eggs',
    img: img60,
    price: 130,
    unit: 'per tray',
    desc: 'Large wholesale pack (60 eggs) for extensive catering and retail needs.',
    features: ['Economical', 'Secure packaging', 'Longer shelf rotation']
  }
]

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug)
}

export const formatZAR = (value?: number) => {
  if (value == null) return ''
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(value)
}
