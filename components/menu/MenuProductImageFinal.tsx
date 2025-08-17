'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { getContextualIcon } from '@/lib/utils/contextualIcons'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuProductImageProps {
  productName: string
  productId?: string
  category?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  priority?: boolean
  zoomEffect?: string
  enableZoom?: boolean
}

const sizeClasses = {
  sm: { 
    container: 'w-12 h-12', 
    icon: 'w-6 h-6',
    iconSize: 20,
    imageSize: 48,
    zoomSize: 120
  },
  md: { 
    container: 'w-14 h-14', 
    icon: 'w-8 h-8',
    iconSize: 24,
    imageSize: 56,
    zoomSize: 180
  },
  lg: { 
    container: 'w-20 h-20', 
    icon: 'w-10 h-10',
    iconSize: 32,
    imageSize: 80,
    zoomSize: 240
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
        // Utiliser le cache si disponible
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
        
        // Chercher d'abord dans la catégorie si fournie
        if (normalizedCategory && mapping[normalizedCategory]) {
          if (normalizedId in mapping[normalizedCategory]) {
            image = mapping[normalizedCategory][normalizedId]
          }
        }
        
        // Si pas trouvé, chercher dans toutes les catégories
        if (image === undefined) {
          for (const cat of Object.values(mapping)) {
            if (normalizedId in cat) {
              image = cat[normalizedId]
              break
            }
          }
        }

        if (image === null) {
          // Explicitement null dans le JSON - ne rien afficher
          setIsNull(true)
          setImagePath(null)
        } else if (image === 'soon') {
          setIsSoon(true)
          setImagePath(null)
        } else if (image) {
          setImagePath(`/menu/${image}`)
        }
      } catch (error) {

      } finally {
        setIsLoading(false)
      }
    }

    loadImage()
  }, [productId, category])

  return { imagePath, isLoading, isSoon, isNull }
}

export default function MenuProductImageFinal({
  productName,
  productId,
  category,
  size = 'md',
  className,
  priority = false,
  zoomEffect = 'scale',
  enableZoom = true
}: MenuProductImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageReady, setImageReady] = useState(false)
  
  const imageRef = useRef<HTMLDivElement>(null)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Interval | null>(null)
  const isActiveRef = useRef(false)
  
  // Utiliser le nouveau hook pour obtenir l'image
  const { imagePath, isLoading: mappingLoading, isSoon, isNull } = useMenuImageMapping(productId, category)
  
  const sizes = sizeClasses[size]
  const { icon: IconComponent, color: iconColor } = getContextualIcon(productName, category)
  
  // Nettoyer les timers au démontage
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [])
  
  // Réinitialiser quand le productId change
  useEffect(() => {
    setShowZoom(false)
    setIsHovering(false)
    setProgress(0)
    setHasError(false)
    isActiveRef.current = false
    
    // Nettoyer les timers existants
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }, [productId])
  
  // Gestion du survol avec timer de 2 secondes
  const handleMouseEnter = () => {
    if (!enableZoom || !imagePath || isActiveRef.current) return
    
    isActiveRef.current = true
    
    // Nettoyer tout timer existant avant de commencer
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    
    setIsHovering(true)
    setProgress(0)
    
    // Animation de progression
    let currentProgress = 0
    progressIntervalRef.current = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)
      
      if (currentProgress >= 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
          progressIntervalRef.current = null
        }
      }
    }, 100) // Mise à jour toutes les 100ms pour 2 secondes
    
    // Timer pour afficher le zoom après 2 secondes
    hoverTimerRef.current = setTimeout(() => {
      setShowZoom(true)
      setProgress(100)
      setIsHovering(false) // Arrêter l'animation de chargement
    }, 2000)
  }
  
  const handleMouseLeave = () => {
    isActiveRef.current = false
    setIsHovering(false)
    setShowZoom(false)
    setProgress(0)
    
    // Nettoyer les timers
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }
  
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
  
  // URL de l'image directe - utiliser l'API pour l'accès aux images
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
    <>
      <div 
        ref={imageRef}
        className={cn(
          "relative inline-block",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className={cn(
            sizes.container,
            "relative rounded-full overflow-hidden shadow-sm cursor-pointer"
          )}
          animate={{
            scale: isHovering || showZoom ? 1.08 : 1,
            boxShadow: isHovering || showZoom 
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
          
          {/* Indicateur de progression circulaire élégant */}
          <AnimatePresence>
            {isHovering && !showZoom && enableZoom && imagePath && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Fond légèrement sombre */}
                <div className="absolute inset-0 bg-black/10 rounded-full" />
                
                {/* Cercle de progression animé */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  {/* Cercle de fond */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="47%"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="3"
                  />
                  {/* Cercle de progression */}
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
                      transition: 'stroke-dashoffset 0.1s linear',
                      filter: 'drop-shadow(0 0 6px rgba(233, 30, 99, 0.5))'
                    }}
                  />
                </svg>
                
                {/* Indicateur central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="bg-white/90 rounded-full p-1.5 shadow-lg"
                    animate={{ scale: [0.9, 1, 0.9] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-xs">🔍</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Modal de zoom élégant avec effet de flou - ANIMATIONS ORIGINALES */}
      <AnimatePresence>
        {showZoom && enableZoom && imageUrl && (
          <>
            {/* Overlay avec flou d'arrière-plan */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleMouseLeave}
            />
            
            {/* Image zoomée centrale avec animations originales */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] pointer-events-none"
              initial={{ 
                opacity: 0, 
                scale: 0.3,
                y: 50
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.3,
                y: 50
              }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              <div className="relative">
                {/* Ombre douce */}
                <div className="absolute -inset-2 bg-black/20 rounded-2xl blur-2xl" />
                
                {/* Conteneur principal */}
                <div className="relative bg-white rounded-2xl shadow-2xl p-3 overflow-hidden">
                  {/* Image zoomée */}
                  <Image
                    src={imageUrl}
                    alt={productName}
                    width={280}
                    height={280}
                    className="object-cover rounded-xl"
                    priority
                  />
                  
                  {/* Badge du nom simple */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg shadow-lg">
                      <p className="text-sm font-semibold text-center truncate">{productName}</p>
                      <p className="text-[10px] text-center text-gray-500 mt-0.5">Cliquez pour fermer</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}