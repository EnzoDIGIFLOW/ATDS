"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  Leaf,
  ChevronDown,
  Package
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { restructureMenu, type MenuCategory, type MenuItem } from '@/lib/menu-structure'
import { ScrollArea } from '@/components/ui/scroll-area'
import MenuProductImage from '@/components/menu/MenuProductImageNoZoom'

interface OrderModalCarouselV2Props {
  menuData: any[]
  onAddToCart?: (item: MenuItem) => void
  className?: string
}

// Icônes par catégorie principale
const categoryIcons: { [key: string]: React.ElementType } = {
  'wine': Wine,
  'fish': Fish,
  'flame': Flame,
  'salad': Salad,
  'star': Star,
  'beef': Beef,
  'dessert': IceCream,
  'default': UtensilsCrossed
}

export default function OrderModalCarouselV2({ 
  menuData, 
  onAddToCart,
  className = ""
}: OrderModalCarouselV2Props) {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedSubCategory, setSelectedSubCategory] = useState(0)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0)
  
  // Restructurer le menu plat en menu avec sous-catégories
  const structuredMenu = restructureMenu(menuData)
  const currentCategory = structuredMenu[selectedCategory]
  const currentSubCategory = currentCategory?.subCategories?.[selectedSubCategory]
  
  const getCategoryIcon = (iconName: string) => {
    const Icon = categoryIcons[iconName] || categoryIcons['default']
    return Icon
  }
  
  const toggleCategoryExpanded = (index: number) => {
    if (expandedCategory === index) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(index)
    }
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
  
  const selectCategory = (categoryIndex: number, subCategoryIndex: number = 0) => {
    setSelectedCategory(categoryIndex)
    setSelectedSubCategory(subCategoryIndex)
    // Ne pas ouvrir automatiquement les sous-catégories
    // L'utilisateur doit cliquer sur la flèche pour les ouvrir
  }
  
  // Calculer le nombre total d'items dans une catégorie
  const getTotalItems = (category: MenuCategory) => {
    if (category.items) {
      return category.items.length
    }
    return category.subCategories?.reduce((total, sub) => total + sub.items.length, 0) || 0
  }
  
  if (!structuredMenu || structuredMenu.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">
          {language === 'fr' ? 'Aucun menu disponible' : 'No menu available'}
        </p>
      </div>
    )
  }
  
  return (
    <div className={`flex h-full ${className}`}>
      {/* Barre de navigation latérale avec catégories et sous-catégories */}
      <div className="w-20 sm:w-32 md:w-48 lg:w-72 border-r bg-gradient-to-b from-white to-gray-50 overflow-hidden flex flex-col">
        <div className="p-3 border-b bg-white">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {language === 'fr' ? 'Notre Menu' : 'Our Menu'}
          </h4>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {structuredMenu.map((category, categoryIndex) => {
              const Icon = getCategoryIcon(category.icon || 'default')
              const isSelected = selectedCategory === categoryIndex
              const isExpanded = expandedCategory === categoryIndex
              const totalItems = getTotalItems(category)
              
              return (
                <div key={categoryIndex} className="space-y-1">
                  {/* Catégorie principale */}
                  <div className="relative">
                    <motion.button
                      onClick={() => {
                        if (category.subCategories && category.subCategories.length > 0) {
                          selectCategory(categoryIndex, 0)
                        } else {
                          selectCategory(categoryIndex)
                        }
                      }}
                      className={`w-full text-left px-3 py-2.5 ${
                        category.subCategories && category.subCategories.length > 0 ? 'pr-12' : 'pr-3'
                      } rounded-lg transition-all duration-200 flex items-center gap-2 group ${
                        isSelected 
                          ? 'bg-temple-pink text-white shadow-md' 
                          : isExpanded
                          ? 'bg-temple-pink/5 text-gray-800 border-l-2 border-temple-pink'
                          : 'hover:bg-temple-pink/10 text-gray-700'
                      }`}
                      whileHover={{ x: 2 }}
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
                          {totalItems} {language === 'fr' ? 'articles' : 'items'}
                        </div>
                      </div>
                    </motion.button>
                    
                    {category.subCategories && category.subCategories.length > 0 && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCategoryExpanded(categoryIndex)
                        }}
                        className={`absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all ${
                          isSelected
                            ? 'text-white hover:bg-white/20'
                            : 'text-gray-500 hover:bg-temple-pink/20'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </motion.button>
                    )}
                  </div>
                  
                  {/* Sous-catégories */}
                  <AnimatePresence>
                    {isExpanded && category.subCategories && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 space-y-1 overflow-hidden"
                      >
                        {category.subCategories.map((subCategory, subIndex) => {
                          const isSubSelected = isSelected && selectedSubCategory === subIndex
                          
                          return (
                            <motion.button
                              key={subIndex}
                              onClick={() => selectCategory(categoryIndex, subIndex)}
                              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 flex items-center gap-2 text-sm ${
                                isSubSelected 
                                  ? 'bg-temple-pink text-white font-medium shadow-sm' 
                                  : 'hover:bg-temple-pink/10 text-gray-600 hover:text-temple-pink'
                              }`}
                              whileHover={{ x: 2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                isSubSelected ? 'bg-white' : 'bg-temple-pink/50'
                              }`} />
                              <span className="flex-1">{subCategory.name}</span>
                              <span className="text-xs opacity-60">
                                {subCategory.items.length}
                              </span>
                            </motion.button>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>
      
      {/* Zone d'affichage des plats */}
      <div className="flex-1 overflow-y-auto bg-white">
        <AnimatePresence mode="wait">
          {currentCategory && (
            <motion.div
              key={`${selectedCategory}-${selectedSubCategory}`}
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
                    const Icon = getCategoryIcon(currentCategory.icon || 'default')
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
                    {currentSubCategory && (
                      <p className="text-sm text-gray-500">
                        {currentSubCategory.name} • {currentSubCategory.items.length} {language === 'fr' ? 'options' : 'options'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Grille de plats - Sans limitation de hauteur */}
              <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {(currentSubCategory?.items || currentCategory.items || []).map((item, index) => {
                  const isExpanded = expandedItems.has(item.id)
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="group"
                    >
                      <div className="border border-gray-200 rounded-lg p-3 hover:border-temple-pink/30 hover:bg-temple-pink/5 transition-all duration-200 cursor-pointer">
                        <div className="flex items-start gap-3">
                          {/* Image avec mapping automatique */}
                          <div className="relative flex-shrink-0">
                            <MenuProductImage
                              productName={item.name}
                              productId={item.id}
                              category={currentCategory.category}
                              size="md"
                              enableZoom={false}
                              className="ring-2 ring-gray-100 group-hover:ring-temple-pink/20 transition-all"
                              priority={index < 10}
                            />
                            {(item.isPopular || item.isNew) && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-temple-pink rounded-full animate-pulse" />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between mb-1">
                              <h4 className="font-medium text-gray-900 group-hover:text-temple-pink transition-colors">
                                {item.name}
                              </h4>
                              <span className="text-sm font-semibold text-gray-700 ml-2">
                                {item.price.toFixed(2)}€
                              </span>
                            </div>
                            
                            {item.description && (
                              <>
                                <p className={`text-xs text-gray-500 ${
                                  isExpanded ? '' : 'line-clamp-2'
                                }`}>
                                  {item.description}
                                </p>
                                
                                {item.description.length > 100 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleItemExpanded(item.id)
                                    }}
                                    className="text-xs text-temple-pink hover:underline mt-1"
                                  >
                                    {isExpanded 
                                      ? (language === 'fr' ? 'Voir moins' : 'Show less')
                                      : (language === 'fr' ? 'Voir plus' : 'Show more')
                                    }
                                  </button>
                                )}
                              </>
                            )}
                            
                            {/* Badges */}
                            <div className="flex gap-1 mt-1">
                              {item.isNew && (
                                <Badge className="bg-green-500/10 text-green-700 border-green-500/20 text-xs px-1.5 py-0">
                                  <Sparkles className="w-3 h-3 mr-0.5" />
                                  {language === 'fr' ? 'Nouveau' : 'New'}
                                </Badge>
                              )}
                              {item.isPopular && (
                                <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/20 text-xs px-1.5 py-0">
                                  <Star className="w-3 h-3 mr-0.5" />
                                  {language === 'fr' ? 'Populaire' : 'Popular'}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Add button */}
                          {onAddToCart && (
                            <motion.div
                              className="flex-shrink-0"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-temple-pink to-temple-pink/90 hover:from-temple-pink/90 hover:to-temple-pink text-white shadow-md hover:shadow-lg transition-all h-8 px-3"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onAddToCart(item)
                                }}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
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