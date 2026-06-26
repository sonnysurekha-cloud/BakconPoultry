import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading Bakcon Eggs">
      <div className="loading-screen__panel">
        <div className="loading-screen__header">
          <p className="loading-screen__eyebrow">Bakcon Eggs</p>
        </div>

        <div className="loading-screen__spinner" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}
