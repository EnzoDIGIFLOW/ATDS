import { useState, useRef, useCallback } from 'react'

export function useImageZoom(delay: number = 2000) {
  const [isHovering, setIsHovering] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()
  const progressIntervalRef = useRef<NodeJS.Interval>()
  const isActiveRef = useRef(false)
  
  const startHover = useCallback(() => {
    // Si déjà en cours, ne rien faire
    if (isActiveRef.current) return
    
    isActiveRef.current = true
    setIsHovering(true)
    setProgress(0)
    
    // Animation de progression
    let currentProgress = 0
    progressIntervalRef.current = setInterval(() => {
      currentProgress += (100 / (delay / 100))
      if (currentProgress >= 100) {
        currentProgress = 100
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
      }
      setProgress(currentProgress)
    }, 100)
    
    // Timer pour afficher le zoom
    hoverTimeoutRef.current = setTimeout(() => {
      setShowZoom(true)
      setIsHovering(false)
    }, delay)
  }, [delay])
  
  const endHover = useCallback(() => {
    isActiveRef.current = false
    
    // Nettoyer les timers
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    // Réinitialiser les états
    setIsHovering(false)
    setShowZoom(false)
    setProgress(0)
  }, [])
  
  return {
    isHovering,
    showZoom,
    progress,
    startHover,
    endHover
  }
}