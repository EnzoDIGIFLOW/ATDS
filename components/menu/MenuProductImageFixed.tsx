'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getContextualIcon } from '@/lib/utils/contextualIcons'
import { cn } from '@/lib/utils'
import { useImageZoom } from '@/hooks/useImageZoom'

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

export default function MenuProductImageFixed({
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
  const { isHovering, showZoom, progress, startHover, endHover } = useImageZoom(2000)
  
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
        // Silent error
      }
    }

    loadImage()
  }, [productId, category])
  
  const imageUrl = imagePath ? `/api/menu-image?path=${encodeURIComponent(imagePath.replace('/menu/', ''))}` : null
  
  // Si pas d'image, afficher l'icône
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
  
  const handleMouseEnter = () => {
    if (enableZoom && !showZoom) {
      startHover()
    }
  }
  
  const handleMouseLeave = () => {
    endHover()
  }
  
  return (
    <>
      <div 
        className={cn("relative inline-block", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={cn(
            sizes.container,
            "relative rounded-full overflow-hidden shadow-sm cursor-pointer transition-transform",
            (isHovering || showZoom) && "scale-105"
          )}
        >
          <Image
            src={imageUrl}
            alt={productName}
            width={sizes.imageSize}
            height={sizes.imageSize}
            className="object-cover w-full h-full rounded-full"
            priority={priority}
            onError={() => setHasError(true)}
          />
          
          {/* Indicateur de progression */}
          {enableZoom && isHovering && !showZoom && (
            <div className="absolute inset-0 rounded-full pointer-events-none">
              <div className="absolute inset-0 bg-black/10 rounded-full" />
              
              {/* Cercle de progression */}
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
                  className="transition-all duration-100"
                />
              </svg>
              
              {/* Icône centrale */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-1.5 shadow-lg animate-pulse">
                  <span className="text-xs">🔍</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de zoom - Rendu conditionnel simple */}
      {enableZoom && showZoom && imageUrl && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] animate-fadeIn"
            onClick={endHover}
          />
          
          {/* Image zoomée */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] pointer-events-none animate-zoomIn">
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
        </>
      )}
    </>
  )
}