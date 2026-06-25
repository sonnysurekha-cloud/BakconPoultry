import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  end: number
  start?: number
  duration?: number // ms
  decimals?: number
  suffix?: string
  prefix?: string
  format?: (n: number) => string
}

export default function CountUp({ end, start = 0, duration = 1500, decimals = 0, suffix = '', prefix = '', format }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(start)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    let startTime = 0

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const progress = Math.min(1, elapsed / duration)
      const eased = easeOutCubic(progress)
      const current = start + (end - start) * eased
      setValue(Number(current.toFixed(decimals)))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          raf = requestAnimationFrame(step)
          observer.disconnect()
        }
      })
    }, { threshold: 0.25 })

    observer.observe(el)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [end, start, duration, decimals])

  const display = format ? format(value) : value.toLocaleString()
  return (
    <span ref={ref} aria-hidden>
      {prefix}{display}{suffix}
    </span>
  )
}
