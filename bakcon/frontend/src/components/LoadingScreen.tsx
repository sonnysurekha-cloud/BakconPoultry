import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading Bakcon Eggs">
      <div className="loading-screen__canvas" aria-hidden="true">
        <div className="loading-screen__halo" />
        <div className="loading-screen__rings">
          <span className="ring ring--one" />
          <span className="ring ring--two" />
          <span className="ring ring--three" />
          <span className="core" />
        </div>
        <div className="loading-screen__spark loading-screen__spark--one" />
        <div className="loading-screen__spark loading-screen__spark--two" />
        <div className="loading-screen__spark loading-screen__spark--three" />
        <div className="loading-screen__spark loading-screen__spark--four" />
      </div>

      <div className="loading-screen__text">
        <p className="loading-screen__eyebrow">Bakcon Eggs</p>
        <h1>Loading your farm fresh experience</h1>
        <p className="loading-screen__caption">A premium spin of color, glow, and motion. Please wait.</p>
      </div>
    </div>
  )
}
