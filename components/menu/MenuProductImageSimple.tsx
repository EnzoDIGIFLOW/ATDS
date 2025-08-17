'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { getContextualIcon } from '@/lib/utils/contextualIcons'
import { cn } from '@/lib/utils'

interface MenuProductImageProps {
  productName: string
  productId?: string
  category?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  priority?: boolean
  enableZoom?: boolean
}

const sizeClasses = {
  sm: { 
    container: 'w-12 h-12', 
    icon: 'w-6 h-6',
    iconSize: 20,
    imageSize: 48
  },
  md: { 
    container: 'w-14 h-14', 
    icon: 'w-8 h-8',
    iconSize: 24,
    imageSize: 56
  },
  lg: { 
    container: 'w-20 h-20', 
    icon: 'w-10 h-10',
    iconSize: 32,
    imageSize: 80
  }
}

// Cache global pour le mapping
let mappingCache: any = null

export default function MenuProductImageSimple({
  productName,
  productId,
  category,
  size = 'md',
  className,
  priority = false,
  enableZoom = true
}: MenuProductImageProps) {
  const [imagePath, setImagePath] = useState<string | null>(null)
  const [hasError, setHasError] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const timerRef = useRef<any>(null)
  const progressRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const sizes = sizeClasses[size]
  const { icon: IconComponent, color: iconColor } = getContextualIcon(productName, category)
  
  // Charger le mapping
  useEffect(() => {
    if (!productId) return
    
    const loadImage = async () => {
      try {
        let mapping = mappingCache
        if (!mapping) {
          const response = await fetch('/menu-images-mapping.json')
          mapping = await response.json()
          mappingCache = mapping
        }
        
        const normalizedId = productId.toLowerCase().replace(/_/g, '-')
        const normalizedCategory = category ? 
          category.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[''']/g, '')
            .replace(/[()]/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') : null

        let image = undefined
        
        if (normalizedCategory && mapping[normalizedCategory]) {
          if (normalizedId in mapping[normalizedCategory]) {
            image = mapping[normalizedCategory][normalizedId]
          }
        }
        
        if (image === undefined) {
          for (const cat of Object.values(mapping)) {
            if (normalizedId in cat) {
              image = cat[normalizedId]
              break
            }
          }
        }

        if (image && image !== null && image !== 'soon') {
          setImagePath(`/menu/${image}`)
        }
      } catch (error) {
        console.error('Error loading image mapping:', error)
      }
    }

    loadImage()
  }, [productId, category])
  
  const startZoomTimer = () => {
    if (!enableZoom || !imagePath || showZoom) return
    
    // Clear any existing timers
    if (timerRef.current) clearTimeout(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)
    
    setShowLoader(true)
    setProgress(0)
    
    // Progress animation
    let currentProgress = 0
    progressRef.current = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(progressRef.current)
      }
    }, 100)
    
    // Show zoom after 2 seconds
    timerRef.current = setTimeout(() => {
      setShowLoader(false)
      setShowZoom(true)
      setProgress(100)
    }, 2000)
  }
  
  const cancelZoom = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (progressRef.current) {
      clearInterval(progressRef.current)
      progressRef.current = null
    }
    setShowLoader(false)
    setShowZoom(false)
    setProgress(0)
  }
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [])
  
  const imageUrl = imagePath ? `/api/menu-image?path=${encodeURIComponent(imagePath.replace('/menu/', ''))}` : null
  
  if (!imagePath || hasError || !imageUrl) {
    return (
      <div
        className={cn(
          sizes.container,
          "rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-white via-gray-50 to-gray-100",
          "border-2 border-gray-200 shadow-sm",
          "group-hover:border-temple-pink/30 group-hover:shadow-md transition-all duration-300",
          className
        )}
      >
        <IconComponent 
          className={cn(sizes.icon, iconColor)}
          size={sizes.iconSize}
        />
      </div>
    )
  }
  
  return (
    <>
      <div 
        ref={containerRef}
        className={cn("relative inline-block", className)}
        onMouseEnter={startZoomTimer}
        onMouseLeave={cancelZoom}
      >
        <div
          className={cn(
            sizes.container,
            "relative rounded-full overflow-hidden shadow-sm cursor-pointer",
            showLoader && "scale-105"
          )}
          style={{
            transition: "transform 0.3s ease"
          }}
        >
          <Image
            src={imageUrl}
            alt={productName}
            width={sizes.imageSize}
            height={sizes.imageSize}
            className="object-cover w-full h-full rounded-full"
            priority={priority}
            onError={() => setHasError(true)}
            onLoad={() => setImageReady(true)}
          />
          
          {/* Progress indicator */}
          {showLoader && (
            <div className="absolute inset-0 rounded-full pointer-events-none">
              <div className="absolute inset-0 bg-black/10 rounded-full" />
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="47%"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="3"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="47%"
                  fill="none"
                  stroke="#e91e63"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 47}`}
                  strokeDashoffset={`${2 * Math.PI * 47 * (1 - progress / 100)}`}
                  style={{
                    transition: 'stroke-dashoffset 0.1s linear'
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-1.5 shadow-lg">
                  <span className="text-xs">🔍</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Zoom Modal */}
      {showZoom && imageUrl && (
        <div
          className="fixed inset-0 z-[998]"
          onClick={cancelZoom}
          style={{
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] pointer-events-none"
            style={{
              animation: 'zoomIn 0.2s ease-out'
            }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-black/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl p-3 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={productName}
                  width={280}
                  height={280}
                  className="object-cover rounded-xl block"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg shadow-lg">
                    <p className="text-sm font-semibold text-center truncate">{productName}</p>
                    <p className="text-[10px] text-center text-gray-500 mt-0.5">Cliquez pour fermer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  )
}