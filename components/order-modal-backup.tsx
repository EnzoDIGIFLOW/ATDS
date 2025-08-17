"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Phone, 
  UtensilsCrossed,
  Package,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  Star
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/language-context'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  isNew?: boolean
  isPopular?: boolean
  category?: string
}

interface CartItem extends MenuItem {
  quantity: number
}

interface MenuCategory {
  category: string
  items: MenuItem[]
}

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  menuSurPlace: MenuCategory[]
  menuAEmporter: MenuCategory[]
  cart: CartItem[]
  onAddToCart: (item: MenuItem) => void
  onRemoveFromCart: (itemId: string) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onSubmitOrder: () => void
}

export default function OrderModal({
  isOpen,
  onClose,
  menuSurPlace,
  menuAEmporter,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onSubmitOrder
}: OrderModalProps) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('emporter')
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyPopular, setShowOnlyPopular] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(3)
  
  const activeMenu = activeTab === 'surplace' ? menuSurPlace : menuAEmporter
  const filteredMenu = activeMenu.map(category => ({
    ...category,
    items: category.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPopular = !showOnlyPopular || item.isPopular
      return matchesSearch && matchesPopular
    })
  })).filter(category => category.items.length > 0)
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Responsive items per view for categories
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setItemsPerView(1)
      } else if (width < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const maxPosition = Math.max(0, filteredMenu.length - itemsPerView)
  
  const nextCategory = () => {
    setSelectedCategoryIndex(prev => Math.min(prev + 1, maxPosition))
  }
  
  const prevCategory = () => {
    setSelectedCategoryIndex(prev => Math.max(prev - 1, 0))
  }
  
  // Reset category selection when switching tabs
  useEffect(() => {
    setSelectedCategoryIndex(0)
  }, [activeTab])
  
  // Get currently selected category
  const selectedCategory = filteredMenu[selectedCategoryIndex] || filteredMenu[0]
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-temple-pink/5 to-temple-pink/10">
            <div className="flex items-center justify-between mb-3">
              <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-temple-pink/20 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-temple-pink" />
                </div>
                {language === 'fr' ? 'Votre commande' : 'Your order'}
              </DialogTitle>
              <div className="flex items-center gap-4">
                {totalItems > 0 && (
                  <Badge className="bg-temple-pink text-white text-lg px-3 py-1">
                    {totalItems} {language === 'fr' ? 'articles' : 'items'} • {totalPrice.toFixed(2)}€
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {/* Note informative pour le client */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-3">
              <div className="p-1.5 bg-temple-pink/10 rounded-full">
                <Phone className="w-4 h-4 text-temple-pink" />
              </div>
              <p className="text-sm text-gray-700 font-medium">
                {language === 'fr' 
                  ? "Composez votre liste d'envies puis contactez-nous pour finaliser votre commande" 
                  : "Create your wishlist then contact us to finalize your order"}
              </p>
            </div>
          </DialogHeader>
          
          {/* Content */}
          <div className="flex-1 overflow-hidden flex">
            {/* Left side - Menu selection */}
            <div className="flex-1 flex flex-col border-r">
              {/* Tabs and Search */}
              <div className="p-4 border-b bg-gray-50">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="emporter" className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {language === 'fr' ? 'À emporter' : 'Takeaway'}
                    </TabsTrigger>
                    <TabsTrigger value="surplace" className="flex items-center gap-2">
                      <UtensilsCrossed className="w-4 h-4" />
                      {language === 'fr' ? 'Sur place' : 'Dine-in'}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {/* Search and Filter */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={language === 'fr' ? 'Rechercher un plat...' : 'Search for a dish...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    variant={showOnlyPopular ? "default" : "outline"}
                    size="icon"
                    onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                    className={showOnlyPopular ? "bg-temple-pink hover:bg-temple-pink/90" : ""}
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Category Carousel */}
              <div className="p-4 border-b bg-white">
                <div className="relative">
                  <div className="overflow-hidden">
                    <motion.div 
                      className="flex gap-2"
                      animate={{ x: `-${(selectedCategoryIndex * 100) / itemsPerView}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {filteredMenu.map((category, index) => (
                        <button
                          key={index}
                          className={`flex-shrink-0 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                            index === selectedCategoryIndex
                              ? 'border-temple-pink bg-temple-pink/10 text-temple-pink font-semibold'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ width: `calc(${100 / itemsPerView}% - 0.5rem)` }}
                          onClick={() => setSelectedCategoryIndex(index)}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <UtensilsCrossed className="w-4 h-4" />
                            <span className="truncate">{category.category}</span>
                            <Badge variant="secondary" className="ml-1">
                              {category.items.length}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  </div>
                  
                  {/* Navigation buttons */}
                  {filteredMenu.length > itemsPerView && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-md z-10"
                        onClick={prevCategory}
                        disabled={selectedCategoryIndex === 0}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-md z-10"
                        onClick={nextCategory}
                        disabled={selectedCategoryIndex >= maxPosition}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Items Grid */}
              <ScrollArea className="flex-1 p-4">
                {selectedCategory && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <UtensilsCrossed className="w-5 h-5 text-temple-pink" />
                      {selectedCategory.category}
                      <Badge variant="outline" className="ml-2">
                        {selectedCategory.items.length} {language === 'fr' ? 'plats' : 'dishes'}
                      </Badge>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence mode="wait">
                        {selectedCategory.items.map((item, index) => (
                          <motion.div
                            key={`${selectedCategory.category}-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold text-gray-900 group-hover:text-temple-pink transition-colors">
                                        {item.name}
                                      </h4>
                                      {item.isNew && (
                                        <Badge className="bg-green-500 text-white text-xs">
                                          <Sparkles className="w-3 h-3 mr-1" />
                                          {language === 'fr' ? 'Nouveau' : 'New'}
                                        </Badge>
                                      )}
                                      {item.isPopular && (
                                        <Badge className="bg-orange-500 text-white text-xs">
                                          <Star className="w-3 h-3 mr-1" />
                                          {language === 'fr' ? 'Populaire' : 'Popular'}
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                      {item.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-lg font-bold text-temple-pink">
                                        {item.price.toFixed(2)}€
                                      </span>
                                      <Badge variant="outline" className="text-xs">
                                        {selectedCategory.category}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  className="w-full mt-3 bg-temple-pink hover:bg-temple-pink/90 text-white"
                                  onClick={() => onAddToCart(item)}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  {language === 'fr' ? 'Ajouter' : 'Add'}
                                </Button>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))
                      )}
                  </AnimatePresence>
                </div>
                
                {filteredMenu.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      {language === 'fr' ? 'Aucun plat trouvé' : 'No dishes found'}
                    </p>
                  </div>
                )}
              </ScrollArea>
            </div>
            
            {/* Right side - Cart */}
            <div className="w-full lg:w-96 flex flex-col bg-gray-50">
              <div className="p-4 border-b bg-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-temple-pink" />
                  {language === 'fr' ? 'Votre panier' : 'Your cart'}
                </h3>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {language === 'fr' 
                        ? 'Ajoutez des plats depuis le menu' 
                        : 'Add dishes from the menu'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="bg-white rounded-lg p-3 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                {item.price.toFixed(2)}€ × {item.quantity} = {(item.price * item.quantity).toFixed(2)}€
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </ScrollArea>
              
              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-4 border-t bg-white">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>{language === 'fr' ? 'Total' : 'Total'}</span>
                      <span className="text-2xl text-temple-pink">{totalPrice.toFixed(2)}€</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {language === 'fr' 
                          ? 'Préparation: 20-30 min' 
                          : 'Preparation: 20-30 min'}
                      </span>
                    </div>
                    
                    <Button
                      className="w-full bg-temple-pink hover:bg-temple-pink/90 text-white font-semibold py-6 text-lg"
                      onClick={onSubmitOrder}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      {language === 'fr' ? 'Commander maintenant' : 'Order now'}
                    </Button>
                    
                    <p className="text-xs text-center text-gray-500">
                      {language === 'fr' 
                        ? 'Vous serez redirigé vers notre système de commande' 
                        : 'You will be redirected to our ordering system'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}