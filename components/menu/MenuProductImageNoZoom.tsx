'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getContextualIcon } from '@/lib/utils/contextualIcons'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface MenuProductImageProps {
  productName: string
  productId?: string
  category?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  priority?: boolean
  enableZoom?: boolean
  zoomEffect?: string
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

// Hook personnalisé pour charger le mapping JSON
function useMenuImageMapping(productId: string | undefined, category?: string) {
  const [imagePath, setImagePath] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSoon, setIsSoon] = useState(false)
  const [isNull, setIsNull] = useState(false)

  useEffect(() => {
    if (!productId) {
      setIsLoading(false)
      return
    }

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

        if (image === null) {
          setIsNull(true)
          setImagePath(null)
        } else if (image === 'soon') {
          setIsSoon(true)
          setImagePath(null)
        } else if (image) {
          setImagePath(`/menu/${image}`)
        }
      } catch (error) {
        // Silent error
      } finally {
        setIsLoading(false)
      }
    }

    loadImage()
  }, [productId, category])

  return { imagePath, isLoading, isSoon, isNull }
}

export default function MenuProductImageNoZoom({
  productName,
  productId,
  category,
  size = 'md',
  className,
  priority = false
}: MenuProductImageProps) {
  const [hasError, setHasError] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const { imagePath, isLoading: mappingLoading, isSoon, isNull } = useMenuImageMapping(productId, category)
  
  const sizes = sizeClasses[size]
  const { icon: IconComponent, color: iconColor } = getContextualIcon(productName, category)
  
  // Si c'est explicitement null dans le JSON, ne rien afficher
  if (isNull) {
    return null
  }
  
  // Si l'image est "bientôt disponible"
  if (isSoon) {
    return (
      <motion.div
        className={cn(
          sizes.container,
          "rounded-full flex items-center justify-center relative",
          "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200",
          "border-2 border-gray-300 shadow-sm",
          "group-hover:border-temple-pink/20 transition-all duration-300",
          className
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-lg mb-0.5">📸</span>
          <span className="text-[9px] text-gray-500 italic font-light">
            Bientôt
          </span>
        </div>
        <div className="absolute inset-0 rounded-full animate-subtle-pulse opacity-30 bg-gradient-to-r from-temple-pink to-transparent" />
      </motion.div>
    )
  }
  
  const imageUrl = imagePath ? `/api/menu-image?path=${encodeURIComponent(imagePath.replace('/menu/', ''))}` : null
  
  // Si pas d'image ou erreur, afficher l'icône contextuelle
  if (!imagePath || hasError || !imageUrl) {
    return (
      <motion.div
        className={cn(
          sizes.container,
          "rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-white via-gray-50 to-gray-100",
          "border-2 border-gray-200 shadow-sm",
          "group-hover:border-temple-pink/30 group-hover:shadow-md transition-all duration-300",
          className
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <IconComponent 
          className={cn(sizes.icon, iconColor)}
          size={sizes.iconSize}
        />
      </motion.div>
    )
  }
  
  return (
    <div 
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className={cn(
          sizes.container,
          "relative rounded-full overflow-hidden shadow-sm cursor-pointer"
        )}
        animate={{
          scale: isHovering ? 1.08 : 1,
          boxShadow: isHovering 
            ? "0 12px 24px rgba(0,0,0,0.15)" 
            : "0 2px 4px rgba(0,0,0,0.1)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25 
        }}
      >
        {/* Loader */}
        {(mappingLoading || !imageReady) && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse z-10" />
        )}
        
        {/* Image principale */}
        <Image
          src={imageUrl}
          alt={productName}
          width={sizes.imageSize}
          height={sizes.imageSize}
          className="object-cover w-full h-full rounded-full"
          priority={priority}
          onError={() => {
            setHasError(true)
            setImageReady(false)
          }}
          onLoad={() => setImageReady(true)}
        />
      </motion.div>
    </div>
  )
}