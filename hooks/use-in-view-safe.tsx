"use client"

import { useInView as useInViewLib } from 'react-intersection-observer'

export function useInView(options = {}) {
  const { ref, inView } = useInViewLib({
    threshold: 0.1,
    rootMargin: "50px",
    triggerOnce: true,
    ...options
  })

  return [ref, inView] as const
}