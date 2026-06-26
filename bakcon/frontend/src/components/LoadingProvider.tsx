import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './LoadingProvider.css'

type LoadingProviderProps = {
  children: React.ReactNode
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const hideLoader = () => setIsLoading(false)

    const checkPageReady = () => {
      if (document.readyState === 'complete') {
        setTimeout(hideLoader, 600)
        return true
      }
      return false
    }

    if (checkPageReady()) {
      return
    }

    const handleReadyStateChange = () => {
      if (document.readyState === 'complete') {
        setTimeout(hideLoader, 600)
      }
    }

    const handleLoad = () => {
      setTimeout(hideLoader, 600)
    }

    document.addEventListener('readystatechange', handleReadyStateChange)
    window.addEventListener('load', handleLoad)

    const maxTimeout = window.setTimeout(hideLoader, 10000)

    return () => {
      document.removeEventListener('readystatechange', handleReadyStateChange)
      window.removeEventListener('load', handleLoad)
      window.clearTimeout(maxTimeout)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    setIsLoading(true)
    const routeTimer = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(routeTimer)
  }, [location.pathname])

  return (
    <>
      {isLoading && (
        <div className="loading-provider-overlay" role="status" aria-label="Loading Bakcon Eggs">
          <div className="loading-provider-card">
            <div className="loading-provider-brand">Bakcon Eggs</div>
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
