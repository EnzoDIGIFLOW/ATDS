'use client'

import { useState, useEffect, useCallback } from 'react'
import { ZoomEffect } from '@/components/ui/zoomable-image'

interface ZoomSettings {
  effect: ZoomEffect
  enabled: boolean
  scale: number
  reducedMotion: boolean
  isMobile: boolean
}

interface UseZoomSettingsReturn {
  settings: ZoomSettings
  updateEffect: (effect: ZoomEffect) => void
  toggleEnabled: () => void
  getOptimalSettings: (context: 'menu' | 'gallery' | 'demo') => Partial<ZoomSettings>
}

export function useZoomSettings(): UseZoomSettingsReturn {
  const [settings, setSettings] = useState<ZoomSettings>({
    effect: 'scale',
    enabled: true,
    scale: 1.5,
    reducedMotion: false,
    isMobile: false
  })

  // Détecter les préférences utilisateur
  useEffect(() => {
    const detectPreferences = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      
      setSettings(prev => ({
        ...prev,
        reducedMotion,
        isMobile,
        // Désactiver le zoom sur mobile si motion réduite
        enabled: prev.enabled && !(reducedMotion && isMobile)
      }))
    }

    detectPreferences()

    // Écouter les changements
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQueryList = window.matchMedia('(max-width: 768px)')
    
    mediaQueryList.addEventListener('change', detectPreferences)
    mobileQueryList.addEventListener('change', detectPreferences)

    return () => {
      mediaQueryList.removeEventListener('change', detectPreferences)
      mobileQueryList.removeEventListener('change', detectPreferences)
    }
  }, [])

  // Sauvegarder les préférences dans localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zoom-preferences')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setSettings(prev => ({ ...prev, ...parsed }))
        } catch (error) {

        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('zoom-preferences', JSON.stringify({
        effect: settings.effect,
        enabled: settings.enabled,
        scale: settings.scale
      }))
    }
  }, [settings.effect, settings.enabled, settings.scale])

  const updateEffect = useCallback((effect: ZoomEffect) => {
    setSettings(prev => ({ ...prev, effect }))
  }, [])

  const toggleEnabled = useCallback(() => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }))
  }, [])

  // Obtenir les paramètres optimaux selon le contexte
  const getOptimalSettings = useCallback((context: 'menu' | 'gallery' | 'demo'): Partial<ZoomSettings> => {
    const { isMobile, reducedMotion } = settings

    // Configuration par défaut selon le contexte
    const contextSettings = {
      menu: {
        effect: 'lens' as ZoomEffect,
        scale: isMobile ? 1.3 : 1.5,
        enabled: !reducedMotion
      },
      gallery: {
        effect: 'overlay' as ZoomEffect,
        scale: isMobile ? 1.8 : 2.5,
        enabled: true
      },
      demo: {
        effect: settings.effect,
        scale: isMobile ? 1.5 : 2.0,
        enabled: true
      }
    }

    return contextSettings[context]
  }, [settings])

  return {
    settings,
    updateEffect,
    toggleEnabled,
    getOptimalSettings
  }
}

// Hook pour performance et optimisation
export function useZoomPerformance() {
  const [isHovered, setIsHovered] = useState(false)
  const [shouldPreload, setShouldPreload] = useState(false)

  const handleZoomStart = useCallback(() => {
    setIsHovered(true)
    // Précharger les images haute résolution après un délai
    setTimeout(() => setShouldPreload(true), 100)
  }, [])

  const handleZoomEnd = useCallback(() => {
    setIsHovered(false)
    // Nettoyer le préchargement après un délai
    setTimeout(() => setShouldPreload(false), 500)
  }, [])

  return {
    isHovered,
    shouldPreload,
    handleZoomStart,
    handleZoomEnd
  }
}

// Context provider pour les paramètres de zoom globaux
import React, { createContext, useContext } from 'react'

const ZoomSettingsContext = createContext<UseZoomSettingsReturn | null>(null)

export function ZoomSettingsProvider({ children }: { children: React.ReactNode }) {
  const zoomSettings = useZoomSettings()

  return (
    <ZoomSettingsContext.Provider value={zoomSettings}>
      {children}
    </ZoomSettingsContext.Provider>
  )
}

export function useZoomContext() {
  const context = useContext(ZoomSettingsContext)
  if (!context) {
    throw new Error('useZoomContext must be used within a ZoomSettingsProvider')
  }
  return context
}