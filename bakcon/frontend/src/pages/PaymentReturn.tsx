import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function PaymentReturn() {
  const loc = useLocation()
  const params = new URLSearchParams(loc.search)
  const status = params.get('status')
  const tx = params.get('tx') || params.get('transaction_id')

  const [serverStatus, setServerStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!tx) return
    let mounted = true
    setLoading(true)
    axios.get(`http://127.0.0.1:8000/api/payments/ozow/status/${tx}/`).then(res => {
      if (!mounted) return
      setServerStatus(res.data.status)
    }).catch(err => {
      console.error(err)
      if (mounted) setServerStatus('unknown')
    }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [tx])

  return (
    <div className="container page payments-return" style={{padding:28}}>
      <style>{`
        .payments-return { padding: 28px 0; }
        .payments-return h1 { margin-top: 0; }
        .payments-return p, .payments-return div { line-height: 1.75; }
        .payments-return .btn { margin-top: 16px; }
        @media (max-width: 760px) {
          .payments-return { padding: 18px 0; }
          .payments-return .btn { width: 100%; margin-left: 0; margin-bottom: 10px; }
        }
      `}</style>
      <h1>Payment Result</h1>
      <p>Query result from provider: <strong>{status || '—'}</strong></p>
      {tx && (
        <div style={{marginTop:12}}>
          <div>Transaction id: <code>{tx}</code></div>
          <div style={{marginTop:8}}>Server status: {loading ? 'checking…' : <strong>{serverStatus ?? '—'}</strong>}</div>
        </div>
      )}

      <div style={{marginTop:18}}>
        <Link to="/products" className="btn ghost">Back to Products</Link>
        <Link to="/" className="btn" style={{marginLeft:8}}>Home</Link>
      </div>
    </div>
  )
}
