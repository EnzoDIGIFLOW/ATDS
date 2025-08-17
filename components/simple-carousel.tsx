"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, UtensilsCrossed, Plus } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface MenuCategory {
  category: string
  items: MenuItem[]
}

interface SimpleCarouselProps {
  menuData: MenuCategory[]
  onAddToCart?: (item: MenuItem) => void
}

export default function SimpleCarousel({ menuData, onAddToCart }: SimpleCarouselProps) {
  // État pour la position actuelle du carousel
  const [currentPosition, setCurrentPosition] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  // Configuration : 3 catégories visibles à la fois
  const itemsVisible = 3
  const totalItems = menuData.length
  const maxPosition = Math.max(0, totalItems - itemsVisible)
  
  // Navigation : défilement d'une catégorie à la fois
  const goNext = () => {
    setCurrentPosition(prev => Math.min(prev + 1, maxPosition))
  }
  
  const goPrev = () => {
    setCurrentPosition(prev => Math.max(prev - 1, 0))
  }

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

    if (isLeftSwipe && currentPosition < maxPosition) {
      goNext()
    }
    if (isRightSwipe && currentPosition > 0) {
      goPrev()
    }
  }
  
  return (
    <div className="relative overflow-hidden px-4">
      {/* Swipe indicator for mobile */}
      <div className="mb-4 md:hidden">
        <p className="text-xs text-gray-500 text-center">👈 Swipez pour naviguer 👉</p>
      </div>
      
      {/* Container principal du carousel */}
      <div 
        className="flex transition-transform duration-300 ease-in-out"
        style={{ 
          transform: `translateX(-${currentPosition * (100 / itemsVisible)}%)` 
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Chaque catégorie du menu */}
        {menuData.map((category, index) => (
          <div 
            key={index}
            className="flex-shrink-0 px-2"
            style={{ width: `${100 / itemsVisible}%` }}
          >
            <Card className="h-full">
              {/* En-tête de la catégorie */}
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 border-b">
                <div className="flex items-center justify-center space-x-2">
                  <UtensilsCrossed className="w-5 h-5 text-pink-600" />
                  <h3 className="text-lg font-bold text-gray-900">
                    {category.category}
                  </h3>
                </div>
              </div>
              
              {/* Liste des items */}
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="p-3 border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.price.toFixed(2)}€
                          </Badge>
                          {onAddToCart && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0"
                              onClick={() => onAddToCart(item)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Bouton précédent */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={goPrev}
        disabled={currentPosition === 0}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      
      {/* Bouton suivant */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={goNext}
        disabled={currentPosition === maxPosition}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
      
      {/* Indicateur de position */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Catégories {currentPosition + 1}-{Math.min(currentPosition + itemsVisible, totalItems)} sur {totalItems}
        </p>
        
        {/* Points de navigation */}
        <div className="flex justify-center space-x-2 mt-2">
          {Array.from({ length: maxPosition + 1 }, (_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentPosition ? 'bg-pink-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentPosition(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}