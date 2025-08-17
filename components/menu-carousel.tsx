"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  UtensilsCrossed, 
  Plus, 
  Clock, 
  MapPin,
  Pause,
  Play,
  ChevronDown 
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import MenuProductImage from '@/components/menu/MenuProductImageNoZoom'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  badge?: string
  isNew?: boolean
  isPopular?: boolean
}

interface MenuCategory {
  category: string
  items: MenuItem[]
  icon?: React.ElementType
  color?: string
}

interface MenuCarouselProps {
  menuData: MenuCategory[]
  onAddToCart?: (item: MenuItem) => void
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  className?: string
}

export default function MenuCarousel({ 
  menuData, 
  onAddToCart,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  className = ""
}: MenuCarouselProps) {
  const { language } = useLanguage()
  const [currentPosition, setCurrentPosition] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [visibleColumns, setVisibleColumns] = useState<Set<number>>(new Set([0, 1, 2]))
  const intervalRef = useRef<NodeJS.Timeout>()
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Calculate totalItems and maxPosition first
  const totalItems = menuData?.length || 0
  const maxPosition = Math.max(0, totalItems - itemsPerView)
  
  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let newItemsPerView: number
      
      if (width < 640) {
        newItemsPerView = 1  // Mobile: 1 colonne
      } else if (width < 768) {
        newItemsPerView = 2  // Petit tablet: 2 colonnes  
      } else if (width < 1024) {
        newItemsPerView = 2  // Tablette: 2 colonnes
      } else {
        newItemsPerView = 3  // Desktop et Large desktop: 3 colonnes max
      }
      
      setItemsPerView(newItemsPerView)
      
      // Update visible columns based on new view
      const newVisible = new Set<number>()
      for (let i = 0; i < newItemsPerView + 2; i++) {
        if (totalItems > 0) {
          newVisible.add((currentPosition + i) % totalItems)
        }
      }
      setVisibleColumns(newVisible)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentPosition, totalItems])
  
  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && autoPlayInterval > 0 && totalItems > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentPosition(prev => {
          if (prev >= maxPosition) return 0
          return prev + 1
        })
      }, autoPlayInterval)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, autoPlayInterval, maxPosition, totalItems])
  
  // Navigation functions
  const goNext = useCallback(() => {
    if (totalItems === 0) return
    
    setCurrentPosition(prev => {
      const newPos = prev >= maxPosition ? 0 : Math.min(prev + 1, maxPosition)
      // Update visible columns for lazy loading
      const newVisible = new Set<number>()
      for (let i = 0; i < itemsPerView + 2; i++) {
        newVisible.add((newPos + i) % totalItems)
      }
      setVisibleColumns(newVisible)
      return newPos
    })
  }, [maxPosition, itemsPerView, totalItems])
  
  const goPrev = useCallback(() => {
    if (totalItems === 0) return
    
    setCurrentPosition(prev => {
      const newPos = prev <= 0 ? maxPosition : Math.max(prev - 1, 0)
      // Update visible columns for lazy loading
      const newVisible = new Set<number>()
      for (let i = 0; i < itemsPerView + 2; i++) {
        newVisible.add((newPos + i) % totalItems)
      }
      setVisibleColumns(newVisible)
      return newPos
    })
  }, [maxPosition, itemsPerView, totalItems])
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goPrev()
      } else if (e.key === 'ArrowRight') {
        goNext()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      goNext()
    }
    if (isRightSwipe) {
      goPrev()
    }
  }
  
  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlay) {
      setIsAutoPlaying(false)
    }
  }
  
  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsAutoPlaying(true)
    }
  }
  
  // Early return if no menu data
  if (!menuData || menuData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">
          {language === 'fr' ? 'Aucun menu disponible' : 'No menu available'}
        </p>
      </div>
    )
  }
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={carouselRef}
      role="region"
      aria-label={language === 'fr' ? "Carrousel du menu" : "Menu carousel"}
      aria-roledescription="carousel"
    >
      {/* Auto-play toggle button */}
      {autoPlay && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur-sm"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      )}
      
      {/* Main carousel container */}
      <div className="overflow-hidden px-2 md:px-4">
        <motion.div 
          className="flex gap-4"
          animate={{ x: `-${(currentPosition * (100 / itemsPerView + 2))}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Each menu category */}
          {menuData.map((category, index) => (
            <motion.div 
              key={index}
              className="flex-shrink-0"
              style={{ 
                width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 16 / itemsPerView}px)`,
                minWidth: '300px',
                maxWidth: '420px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              role="group"
              aria-label={`${category.category} - ${index + 1} sur ${totalItems}`}
            >
              <Card className="menu-card bg-gradient-to-br from-white via-white to-gray-50/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden group flex flex-col h-[450px] md:h-[500px] lg:h-[550px]">
                {/* Category header */}
                <div className="relative bg-gradient-to-r from-temple-pink/10 via-temple-pink/5 to-temple-pink/10 p-4 md:p-6 border-b border-temple-pink/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-temple-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className="w-8 h-8 bg-temple-pink/20 rounded-full flex items-center justify-center group-hover:bg-temple-pink/30 transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <UtensilsCrossed className="w-4 h-4 text-temple-pink" />
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-temple-pink transition-colors duration-300">
                        {category.category}
                      </h3>
                    </div>
                  </div>
                </div>
                
                {/* Items list with fixed height and internal scroll */}
                <CardContent className="p-0 relative flex-1 overflow-hidden">
                  {/* Gradient fade at bottom to indicate more content */}
                  {category.items.length > 5 && (
                    <>
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
                      <div className="absolute bottom-2 right-2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md animate-bounce">
                        <ChevronDown className="w-4 h-4 text-temple-pink" />
                      </div>
                    </>
                  )}
                  <div className="menu-column overflow-y-auto relative h-full max-h-[320px] md:max-h-[370px] lg:max-h-[420px] pb-5" style={{
                    scrollBehavior: 'smooth'
                  }}>
                    <AnimatePresence mode="popLayout">
                      {category.items.map((item, itemIndex) => {
                        // Only render images for visible columns for performance
                        const shouldLoadImage = visibleColumns.has(index) || Math.abs(index - currentPosition) <= 1
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: itemIndex * 0.05 }}
                            className="group/item p-3 md:p-4 border-b border-gray-100 last:border-b-0 hover:bg-temple-pink/5 transition-all duration-300"
                          >
                            <div className="flex items-start gap-3">
                              {/* Image avec mapping automatique et zoom */}
                              <div className="relative flex-shrink-0">
                                {shouldLoadImage ? (
                                  <MenuProductImage
                                    productName={item.name}
                                    productId={item.id}
                                    category={category.category}
                                    size="md"
                                    className="ring-2 ring-gray-100 group-hover/item:ring-temple-pink/30 transition-all"
                                    priority={index === currentPosition && itemIndex < 3}
                                    zoomEffect="lens"
                                    enableZoom={false}
                                  />
                                ) : (
                                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                                )}
                                {(item.isPopular || item.isNew) && (
                                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-temple-pink rounded-full animate-pulse" />
                                )}
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                {/* Titre avec tooltip pour les noms longs */}
                                <div className="relative group/title mb-1">
                                  <h4 
                                    className="font-medium text-gray-900 group-hover/item:text-temple-pink transition-colors truncate"
                                    title={item.name}
                                  >
                                    {item.name}
                                  </h4>
                                  {item.name.length > 25 && (
                                    <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover/title:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30 shadow-lg">
                                      {item.name}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Prix repositionné en dessous */}
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-temple-pink">
                                    {item.price.toFixed(2)}€
                                  </span>
                                </div>
                                {item.description && (
                                  <p className="text-xs text-gray-500 line-clamp-1">
                                    {item.description}
                                  </p>
                                )}
                                {/* Badges en dessous pour mobile */}
                                <div className="flex gap-1 mt-1">
                                  {item.isNew && (
                                    <Badge className="bg-green-500/10 text-green-700 border-green-500/20 text-xs px-1 py-0">
                                      {language === 'fr' ? 'Nouveau' : 'New'}
                                    </Badge>
                                  )}
                                  {item.isPopular && (
                                    <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/20 text-xs px-1 py-0">
                                      {language === 'fr' ? 'Populaire' : 'Popular'}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              {/* Add button for desktop */}
                              {onAddToCart && (
                                <motion.div
                                  className="hidden md:block"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-temple-pink to-temple-pink/90 hover:from-temple-pink/90 hover:to-temple-pink text-white shadow-md hover:shadow-lg transition-all duration-300"
                                    onClick={() => onAddToCart(item)}
                                    aria-label={`Ajouter ${item.name} au panier`}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </CardContent>
                
                {/* Footer */}
                <div className="p-3 md:p-4 bg-gray-50/50 border-t border-gray-100 mt-auto">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-temple-pink" />
                      {language === 'fr' ? 'Service rapide' : 'Fast service'}
                    </span>
                    <span className="flex items-center font-medium text-temple-pink">
                      <MapPin className="w-4 h-4 mr-1" />
                      {language === 'fr' ? 'À emporter / Livraison' : 'Takeaway / Delivery'}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Navigation buttons */}
      {totalItems > itemsPerView && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="carousel-nav-button absolute left-0 md:left-2 top-1/2 -translate-y-1/2 bg-temple-pink/90 text-white rounded-full shadow-lg z-10 hover:bg-temple-pink disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 md:w-12 md:h-12"
            onClick={goPrev}
            disabled={currentPosition === 0 && !autoPlay}
            aria-label={language === 'fr' ? "Catégorie précédente" : "Previous category"}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="carousel-nav-button absolute right-0 md:right-2 top-1/2 -translate-y-1/2 bg-temple-pink/90 text-white rounded-full shadow-lg z-10 hover:bg-temple-pink disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 md:w-12 md:h-12"
            onClick={goNext}
            disabled={currentPosition === maxPosition && !autoPlay}
            aria-label={language === 'fr' ? "Catégorie suivante" : "Next category"}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </>
      )}
      
      {/* Position indicators */}
      {showIndicators && (
        <div className="mt-6 md:mt-8">
          {/* Text indicator */}
          <div className="text-center mb-3">
            <p className="text-sm text-gray-600">
              {language === 'fr' 
                ? `Catégories ${currentPosition + 1}-${Math.min(currentPosition + itemsPerView, totalItems)} sur ${totalItems}`
                : `Categories ${currentPosition + 1}-${Math.min(currentPosition + itemsPerView, totalItems)} of ${totalItems}`
              }
            </p>
          </div>
          
          {/* Enhanced dot indicators with labels */}
          <div className="flex justify-center items-center gap-1 md:gap-2">
            {Array.from({ length: Math.min(maxPosition + 1, 8) }, (_, i) => {
              const dotPosition = maxPosition > 7 
                ? Math.floor(i * maxPosition / 7)
                : i
                
              return (
                <motion.button
                  key={i}
                  className={`transition-all duration-300 relative group ${
                    dotPosition === currentPosition 
                      ? 'w-8 h-2.5 bg-temple-pink rounded-full shadow-md' 
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400 hover:scale-125'
                  }`}
                  onClick={() => setCurrentPosition(dotPosition)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`${language === 'fr' ? 'Aller à la catégorie' : 'Go to category'} ${dotPosition + 1}`}
                >
                  {/* Tooltip on hover */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {menuData[dotPosition]?.category}
                  </span>
                </motion.button>
              )
            })}
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 max-w-xs mx-auto">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-temple-pink to-temple-pink/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentPosition + 1) / (maxPosition + 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}