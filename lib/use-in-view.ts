'use client'

import { useEffect, useRef, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number
}

export function useInView({
  rootMargin = '280px 0px',
  threshold = 0.01,
}: Options = {}) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { ref, inView }
}
