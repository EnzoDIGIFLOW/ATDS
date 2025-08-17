"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ChevronLeft, 
  ChevronRight, 
  UtensilsCrossed, 
  Plus, 
  Star,
  Flame,
  Fish,
  Soup,
  Coffee,
  ChefHat,
  Sparkles,
  Wine,
  Beer,
  Beef,
  Salad,
  IceCream,
  Leaf
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'

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

interface OrderModalCarouselProps {
  menuData: MenuCategory[]
  onAddToCart?: (item: MenuItem) => void
  className?: string
}

// Icônes par catégorie (correspondant aux catégories réelles du menu)
const categoryIcons: { [key: string]: React.ElementType } = {
  // Boissons
  'Boissons avec Alcool': Wine,
  'Bières': Beer,
  'Cocktails du Temple': Wine,
  'Boissons Sans Alcool': Coffee,
  'Thés Japonais': Leaf,
  'Cocktails Sans Alcool': Coffee,
  'Boissons': Coffee,
  
  // Plats principaux
  'Boeuf Wagyu Grade A5, importé du Japon': Beef,
  'Nos plats chaud': Flame,
  'Ramen': Soup,
  'Nouilles': Soup,
  'Plats Chauds': Flame,
  
  // Formules et plateaux
  'Formules du Midi': Star,
  'Plateaux': UtensilsCrossed,
  
  // Poke et chirashi
  'Poke Bowl sur lit de riz': Salad,
  'Chirashi 10 tranches': Fish,
  
  // Sushis et makis
  'Makis par 6': Fish,
  'California par 6': Fish,
  'Sashimi par 6': Fish,
  'Sushi à l\'unité': Fish,
  
  // Créations spéciales
  'Création du Chef par 6': ChefHat,
  'Crispys (frit) par 6': Sparkles,
  'Calispring par 6': Fish,
  'Roll\'s par 6': Fish,
  'Flocon par 6': Fish,
  'Rolls Spéciaux': Star,
  
  // Autres
  'Buritos': UtensilsCrossed,
  'Nos Accompagnements': Salad,
  'Desserts': IceCream,
  
  // Par défaut
  'Default': UtensilsCrossed
}

export default function OrderModalCarousel({ 
  menuData, 
  onAddToCart,
  className = ""
}: OrderModalCarouselProps) {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  
  const currentCategory = menuData[selectedCategory]
  
  const getCategoryIcon = (categoryName: string) => {
    const Icon = categoryIcons[categoryName] || categoryIcons['Default']
    return Icon
  }
  
  const toggleItemExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }
  
  // Navigation par clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && selectedCategory > 0) {
        setSelectedCategory(prev => prev - 1)
      } else if (e.key === 'ArrowDown' && selectedCategory < menuData.length - 1) {
        setSelectedCategory(prev => prev + 1)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCategory, menuData.length])
  
  if (!menuData || menuData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">
          {language === 'fr' ? 'Aucun menu disponible' : 'No menu available'}
        </p>
      </div>
    )
  }
  
  return (
    <div className={`flex h-full ${className}`} ref={containerRef}>
      {/* Barre de navigation latérale des catégories */}
      <div className="w-48 border-r bg-gradient-to-b from-white to-gray-50 overflow-y-auto">
        <div className="p-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {language === 'fr' ? 'Catégories' : 'Categories'}
          </h4>
          <div className="space-y-1">
            {menuData.map((category, index) => {
              const Icon = getCategoryIcon(category.category)
              const isSelected = selectedCategory === index
              
              return (
                <motion.button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 group ${
                    isSelected 
                      ? 'bg-temple-pink text-white shadow-md' 
                      : 'hover:bg-temple-pink/10 text-gray-700'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-1.5 rounded-md transition-colors ${
                    isSelected 
                      ? 'bg-white/20' 
                      : 'bg-temple-pink/10 group-hover:bg-temple-pink/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      isSelected ? 'text-white' : 'text-temple-pink'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{category.category}</span>
                    <div className="text-xs opacity-75">
                      {category.items.length} {language === 'fr' ? 'plats' : 'dishes'}
                    </div>
                  </div>
                  {isSelected && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Zone d'affichage des plats de la catégorie sélectionnée */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentCategory && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              {/* En-tête de la catégorie */}
              <div className="mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getCategoryIcon(currentCategory.category)
                    return (
                      <div className="p-2 bg-temple-pink/10 rounded-lg">
                        <Icon className="w-6 h-6 text-temple-pink" />
                      </div>
                    )
                  })()}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {currentCategory.category}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {currentCategory.items.length} {language === 'fr' ? 'options disponibles' : 'available options'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Grille de plats */}
              <div className="grid gap-3">
                {currentCategory.items.map((item, index) => {
                  const isExpanded = expandedItems.has(item.id)
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900 group-hover:text-temple-pink transition-colors">
                                  {item.name}
                                </h4>
                                {item.isNew && (
                                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-0.5">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    {language === 'fr' ? 'Nouveau' : 'New'}
                                  </Badge>
                                )}
                                {item.isPopular && (
                                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-2 py-0.5">
                                    <Star className="w-3 h-3 mr-1" />
                                    {language === 'fr' ? 'Populaire' : 'Popular'}
                                  </Badge>
                                )}
                              </div>
                              
                              <p className={`text-sm text-gray-600 ${
                                isExpanded ? '' : 'line-clamp-2'
                              }`}>
                                {item.description}
                              </p>
                              
                              {item.description.length > 100 && (
                                <button
                                  onClick={() => toggleItemExpanded(item.id)}
                                  className="text-xs text-temple-pink hover:underline mt-1"
                                >
                                  {isExpanded 
                                    ? (language === 'fr' ? 'Voir moins' : 'Show less')
                                    : (language === 'fr' ? 'Voir plus' : 'Show more')
                                  }
                                </button>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <div className="text-lg font-bold text-temple-pink">
                                  {item.price.toFixed(2)}€
                                </div>
                              </div>
                              
                              {onAddToCart && (
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-temple-pink to-temple-pink/90 hover:from-temple-pink/90 hover:to-temple-pink text-white shadow-md hover:shadow-lg transition-all"
                                    onClick={() => onAddToCart(item)}
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    {language === 'fr' ? 'Ajouter' : 'Add'}
                                  </Button>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}