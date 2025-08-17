"use client"

import React, { useState, useEffect, useRef, RefObject } from "react"

export function useInView(options = {}): [RefObject<HTMLDivElement | null>, boolean] {
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