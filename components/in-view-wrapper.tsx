"use client"

import React, { useState, useEffect, useRef, ReactNode } from "react"

interface InViewWrapperProps {
  children: (ref: React.RefObject<HTMLDivElement | null>, isInView: boolean) => ReactNode
  options?: IntersectionObserverInit
}

export function InViewWrapper({ children, options = {} }: InViewWrapperProps) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <>{children(ref, isInView)}</>
}

// Export a hook version that works with the existing code
export function useInView(options = {}): [React.RefObject<HTMLDivElement | null>, boolean] {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}