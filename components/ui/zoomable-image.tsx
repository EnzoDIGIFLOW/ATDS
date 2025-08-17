'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ZoomEffect = 
  | 'scale' // Simple agrandissement
  | 'lens' // Effet loupe
  | 'pan' // Zoom avec suivi de la souris
  | 'overlay' // Modal avec image agrandie

interface ZoomableImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  zoomEffect?: ZoomEffect
  zoomScale?: number
  showZoomIndicator?: boolean
  disabled?: boolean
  priority?: boolean
  onZoomChange?: (isZoomed: boolean) => void
}

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
  zoomEffect = 'scale',
  zoomScale = 1.5,
  showZoomIndicator = true,
  disabled = false,
  priority = false,
  onZoomChange
}: ZoomableImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseEnter = useCallback(() => {
    if (disabled) return
    setIsHovered(true)
    onZoomChange?.(true)
  }, [disabled, onZoomChange])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setIsZoomed(false)
    onZoomChange?.(false)
  }, [onZoomChange])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }, [])

  const handleClick = useCallback(() => {
    if (disabled || zoomEffect !== 'overlay') return
    setIsZoomed(true)
  }, [disabled, zoomEffect])

  // Styles pour chaque effet de zoom
  const getZoomStyles = () => {
    switch (zoomEffect) {
      case 'scale':
        return {
          transform: isHovered ? `scale(${zoomScale})` : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }
      
      case 'lens':
        return {
          transform: isHovered ? `scale(${zoomScale})` : 'scale(1)',
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          transition: 'transform 0.2s ease-out'
        }
      
      case 'pan':
        return {
          transform: isHovered 
            ? `scale(${zoomScale}) translate(${(50 - mousePosition.x) * 0.3}px, ${(50 - mousePosition.y) * 0.3}px)`
            : 'scale(1)',
          transition: 'transform 0.2s ease-out'
        }
      
      default:
        return {}
    }
  }

  return (
    <div className="relative inline-block">
      {/* Container principal */}
      <motion.div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden cursor-pointer",
          disabled && "cursor-default",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        whileHover={{ 
          scale: zoomEffect === 'scale' ? 1 : 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {/* Image principale */}
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "w-full h-full object-cover",
            zoomEffect !== 'overlay' && "transition-transform duration-300"
          )}
          style={zoomEffect !== 'overlay' ? getZoomStyles() : undefined}
          priority={priority}
        />

        {/* Indicateur de zoom */}
        <AnimatePresence>
          {showZoomIndicator && isHovered && !disabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full text-xs"
            >
              {zoomEffect === 'overlay' ? '🔍' : '⚡'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Effet de lens (cercle de zoom) */}
        {zoomEffect === 'lens' && isHovered && !disabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute border-2 border-white/80 rounded-full pointer-events-none shadow-lg"
            style={{
              width: '60px',
              height: '60px',
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)'
            }}
          />
        )}

        {/* Overlay de zoom */}
        <AnimatePresence>
          {isHovered && !disabled && zoomEffect !== 'overlay' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal d'overlay (pour zoomEffect='overlay') */}
      <AnimatePresence>
        {isZoomed && zoomEffect === 'overlay' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 cursor-pointer"
              onClick={() => setIsZoomed(false)}
            />
            
            {/* Image agrandie */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-4 z-50 flex items-center justify-center"
            >
              <div className="relative max-w-4xl max-h-full">
                <Image
                  src={src}
                  alt={alt}
                  width={width * 3}
                  height={height * 3}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                
                {/* Bouton de fermeture */}
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute -top-4 -right-4 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Hook pour utiliser le zoom dans d'autres composants
export function useZoomableImage() {
  const [isZoomed, setIsZoomed] = useState(false)
  
  return {
    isZoomed,
    onZoomChange: setIsZoomed
  }
}