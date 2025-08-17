"use client"

import React, { createContext, useContext, useEffect, ReactNode } from 'react'

interface AccessibilityContextType {
  announceLiveRegion: (message: string, priority?: 'polite' | 'assertive') => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Créer les régions live pour les annonces
    const politeRegion = document.createElement('div')
    politeRegion.setAttribute('aria-live', 'polite')
    politeRegion.setAttribute('aria-atomic', 'true')
    politeRegion.className = 'sr-only'
    politeRegion.id = 'live-region-polite'
    document.body.appendChild(politeRegion)

    const assertiveRegion = document.createElement('div')
    assertiveRegion.setAttribute('aria-live', 'assertive')
    assertiveRegion.setAttribute('aria-atomic', 'true')
    assertiveRegion.className = 'sr-only'
    assertiveRegion.id = 'live-region-assertive'
    document.body.appendChild(assertiveRegion)

    // Gérer la navigation clavier
    const handleKeyDown = (event: KeyboardEvent) => {
      // Tab trap pour modales (si nécessaire)
      if (event.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement
        if (activeElement && activeElement.getAttribute('role') === 'dialog') {
          const closeButton = activeElement.querySelector('[aria-label*="fermer"], [aria-label*="close"]') as HTMLElement
          if (closeButton) {
            closeButton.click()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      politeRegion.remove()
      assertiveRegion.remove()
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const announceLiveRegion = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const region = document.getElementById(`live-region-${priority}`)
    if (region) {
      region.textContent = message
      // Clear after announcement
      setTimeout(() => {
        region.textContent = ''
      }, 1000)
    }
  }

  const value = {
    announceLiveRegion
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
        <a 
          href="#main-content"
          className="bg-temple-pink text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-temple-pink focus:ring-offset-2"
        >
          Aller au contenu principal
        </a>
        <a 
          href="#navigation"
          className="bg-temple-pink text-white px-4 py-2 rounded-md font-medium ml-2 focus:outline-none focus:ring-2 focus:ring-temple-pink focus:ring-offset-2"
        >
          Aller à la navigation
        </a>
      </div>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}