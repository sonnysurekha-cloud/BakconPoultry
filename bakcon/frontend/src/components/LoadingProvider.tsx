import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './LoadingProvider.css'

type LoadingProviderProps = {
  children: React.ReactNode
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hideLoader = () => setIsLoading(false)

    if (document.readyState === 'complete') {
      const initTimer = window.setTimeout(hideLoader, 1200)
      return () => window.clearTimeout(initTimer)
    }

    const handleLoad = () => {
      window.setTimeout(hideLoader, 1200)
    }

    window.addEventListener('load', handleLoad)
    const maxTimeout = window.setTimeout(hideLoader, 10000)

    return () => {
      window.removeEventListener('load', handleLoad)
      window.clearTimeout(maxTimeout)
    }
  }, [])

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      setIsLoading(true)
      const routeTimer = window.setTimeout(() => setIsLoading(false), 700)
      return () => window.clearTimeout(routeTimer)
    }
  }, [location.pathname])

  return (
    <>
      {isLoading && (
        <div className="loading-provider-overlay" role="status" aria-label="Loading Bakcon Eggs">
          <div className="loading-provider-card">
            <div className="loading-provider-brand">Bakcon Eggs</div>
            <div className="loading-provider-spinner" aria-hidden="true">
              <div className="spinner-ring" />
              <div className="spinner-dot" />
            </div>
            <div className="loading-provider-dots">
              <span style={{ animationDelay: '0s' }} />
              <span style={{ animationDelay: '0.15s' }} />
              <span style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}
