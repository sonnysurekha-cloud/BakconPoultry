import { useState } from 'react'

const shops = [
  {
    id: 1,
    name: 'Shop 1',
    address: 'Bloemfontein Location',
    embedSrc: 'https://www.google.com/maps/embed?pb=!4v1782326946120!6m8!1m7!1st-4BmcLzNjuX8zze9VMzHQ!2m2!1d-29.13579014525846!2d26.29469531802798!3f112.4619035645858!4f-1.1599999999999966!5f0.7820865974627469',
  },
  {
    id: 2,
    name: 'Shop 2',
    address: 'Central Location',
    embedSrc: 'https://www.google.com/maps/embed?pb=!4v1782326827352!6m8!1m7!1sBXYurPTXgDW9S94iLl5o6w!2m2!1d-29.14305914410724!2d26.25313595023397!3f180.04481478246532!4f-3.2591819982783647!5f2.234817017502346',
  },
  {
    id: 3,
    name: 'Shop 3',
    address: 'North Location',
    embedSrc: 'https://www.google.com/maps/embed?pb=!4v1782326891697!6m8!1m7!1sSFpLinW4xioe0K4FCcWLvw!2m2!1d-29.16399758802343!2d26.28118369773485!3f252.65!4f-3.680000000000007!5f2.0390632519342096',
  },
]

export default function StoreLocator(){
  const [activeShop, setActiveShop] = useState(0)

  const storeStyles = `
    .store-header { text-align:center; margin-bottom:40px; }
    .store-header h1 { margin-bottom:10px; }
    .store-header p { color:var(--muted); font-size:16px; }
    .shop-tabs { display:flex; gap:12px; justify-content:center; margin-bottom:30px; flex-wrap:wrap; }
    .shop-tab { padding:10px 16px; border-radius:10px; border:2px solid var(--border); background:#fff; cursor:pointer; font-weight:600; transition:all 240ms ease; }
    .shop-tab:hover { transform:translateY(-2px); border-color:var(--egg); }
    .shop-tab.active { background:rgb(238, 255, 0); color:#111; border-color:rgb(238, 255, 0); }
    .active-shop-container { margin-bottom:40px;  }
    .active-shop-details { background:var(--card); padding:18px; border-radius:12px; margin-bottom:18px; box-shadow:var(--card-elev); }
    .active-shop-details h2 { margin:0 0 6px; color:rgb(255, 255, 0); }
    .active-shop-details p { margin:0; color:var(--muted); }
    .map-embed { border-radius:12px; overflow:hidden; box-shadow:0 18px 50px rgba(0,0,0,0.1); }
    .map-embed iframe { width:100%; height:250px; border:none; }
    @media (max-width:900px) {
      .shop-tabs { flex-direction:column; }
      .map-embed iframe { height:320px; }
    }
    @media (max-width:640px) {
      .shop-tab { width:100%; text-align:left; }
      .active-shop-details { padding:16px; }
      .map-embed iframe { height:280px; }
    }
  `

  return (
    <div className="container page stores">
      <style>{storeStyles}</style>
      
      <div className="store-header">
        <h1>🏪 Visit Our Shops</h1>
        <p>Find Bakcon Eggs at our locations across Bloemfontein</p>
      </div>

      <div className="shop-tabs">
        {shops.map((shop, idx) => (
          <button
            key={shop.id}
            className={`shop-tab ${activeShop === idx ? 'active' : ''}`}
            onClick={() => setActiveShop(idx)}
          >
            {shop.name}
          </button>
        ))}
      </div>

      <div className="active-shop-container">
        <div className="active-shop-details">
          <h2>{shops[activeShop].name}</h2>
          <p>{shops[activeShop].address}</p>
        </div>
        <div className="map-embed">
          <iframe
            title={`${shops[activeShop].name} location`}
            src={shops[activeShop].embedSrc}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  )
}
