"use client"

import { useEffect, useCallback } from 'react'

interface UseKeyboardNavigationProps {
  containerRef?: React.RefObject<HTMLElement>
  onEscape?: () => void
  onEnter?: () => void
  trapFocus?: boolean
}

export function useKeyboardNavigation({
  containerRef,
  onEscape,
  onEnter,
  trapFocus = false
}: UseKeyboardNavigationProps = {}) {

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        if (onEscape) {
          event.preventDefault()
          onEscape()
        }
        break
      case 'Enter':
        if (onEnter && event.target === event.currentTarget) {
          event.preventDefault()
          onEnter()
        }
        break
      case 'Tab':
        if (trapFocus && containerRef?.current) {
          handleTabTrap(event, containerRef.current)
        }
        break
    }
  }, [onEscape, onEnter, trapFocus, containerRef])

  const handleTabTrap = (event: KeyboardEvent, container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  const focusFirstElement = useCallback(() => {
    if (containerRef?.current) {
      const firstFocusable = containerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      if (firstFocusable) {
        firstFocusable.focus()
      }
    }
  }, [containerRef])

  const announcePage = useCallback((message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }, [])

  useEffect(() => {
    const element = containerRef?.current || document
    element.addEventListener('keydown', handleKeyDown as EventListener)
    
    return () => {
      element.removeEventListener('keydown', handleKeyDown as EventListener)
    }
  }, [handleKeyDown, containerRef])

  return {
    focusFirstElement,
    announcePage
  }
}