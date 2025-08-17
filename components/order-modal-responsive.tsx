"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Phone, 
  UtensilsCrossed,
  Package,
  Clock,
  Search,
  TrendingUp,
  Truck,
  Menu
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/language-context'
import OrderModalCarouselV2 from './order-modal-carousel-v2'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  isNew?: boolean
  isPopular?: boolean
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
  menu: MenuCategory[]
  cart: CartItem[]
  onAddToCart: (item: MenuItem) => void
  onRemoveFromCart: (itemId: string) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onSubmitOrder: () => void
}

export default function OrderModalResponsive(props: OrderModalProps) {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyPopular, setShowOnlyPopular] = useState(false)
  const [mobileView, setMobileView] = useState<'menu' | 'cart'>('menu')
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileCart, setShowMobileCart] = useState(false)
  
  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const filteredMenu = props.menu.filter(category => {
    const hasMatchingItems = category.items.some(item => {
      const searchLower = searchQuery.toLowerCase()
      const nameLower = item.name.toLowerCase()
      const descLower = item.description?.toLowerCase() || ''
      const categoryLower = category.category.toLowerCase()
      
      // Recherche dans le nom, la description et la catégorie
      const matchesSearch = searchQuery === '' || 
        nameLower.includes(searchLower) || 
        descLower.includes(searchLower) ||
        categoryLower.includes(searchLower)
      
      const matchesPopular = !showOnlyPopular || item.isPopular
      return matchesSearch && matchesPopular
    })
    return hasMatchingItems
  })
  
  const totalItems = props.cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = props.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Composant Panier réutilisable
  const CartContent = () => (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        {props.cart.length === 0 ? (
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
            {props.cart.map((item) => (
              <motion.div 
                key={item.id} 
                className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {item.price.toFixed(2)}€ × {item.quantity} = {(item.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => props.onRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 -mr-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => props.onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => props.onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* CTA toujours visible, même quand le panier est vide */}
        <div className="p-4 border-t bg-gradient-to-t from-white to-gray-50/50">
          <div className="space-y-3">
            {props.cart.length > 0 && (
              <>
                <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                  <span>{language === 'fr' ? 'Total' : 'Total'}</span>
                  <span className="text-xl sm:text-2xl text-temple-pink">{totalPrice.toFixed(2)}€</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    {language === 'fr' 
                      ? 'Préparation: 20-30 min' 
                      : 'Preparation: 20-30 min'}
                  </span>
                </div>
              </>
            )}
            
            <Button
              className="w-full bg-temple-pink hover:bg-temple-pink/90 text-white font-semibold py-4 sm:py-6 text-base sm:text-lg"
              onClick={() => {
                if (isMobile) setShowMobileCart(false)
                props.onSubmitOrder()
              }}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {language === 'fr' ? `Appeler le ${process.env.NEXT_PUBLIC_PHONE || '04 42 51 10 10'}` : `Call ${process.env.NEXT_PUBLIC_PHONE || '04 42 51 10 10'}`}
            </Button>
            
            {props.cart.length === 0 && (
              <p className="text-center text-sm text-gray-500 mt-2">
                {language === 'fr' 
                  ? 'Composez votre liste puis appelez pour commander' 
                  : 'Build your list then call to order'}
              </p>
            )}
          </div>
        </div>
    </>
  )

  // Sur mobile, utiliser un Sheet pour le panier
  if (isMobile) {
    return (
      <>
        <Dialog open={props.isOpen} onOpenChange={props.onClose}>
          <DialogContent className="max-w-full w-full h-[100vh] p-0 overflow-hidden rounded-none">
            <div className="flex flex-col h-full">
              {/* Header mobile */}
              <div className="p-4 border-b bg-gradient-to-r from-temple-pink/5 to-temple-pink/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-temple-pink" />
                    {language === 'fr' ? 'Menu' : 'Menu'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-temple-pink/10 text-temple-pink text-xs px-2 py-1">
                      <Package className="w-3 h-3 mr-1" />
                      {language === 'fr' ? 'À emporter' : 'Takeaway'}
                    </Badge>
                    <Badge className="bg-temple-pink/10 text-temple-pink text-xs px-2 py-1">
                      <Truck className="w-3 h-3 mr-1" />
                      {language === 'fr' ? 'Livraison' : 'Delivery'}
                    </Badge>
                  </div>
                </div>
                
                {/* Barre de recherche mobile */}
                <div className="flex gap-2 mt-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={language === 'fr' ? 'Rechercher...' : 'Search...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-9 text-sm"
                    />
                  </div>
                  <Button
                    variant={showOnlyPopular ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                    className={showOnlyPopular ? "bg-temple-pink hover:bg-temple-pink/90" : ""}
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Contenu menu mobile */}
              <div className="flex-1 overflow-hidden">
                {filteredMenu.length === 0 ? (
                  <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center">
                      <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {language === 'fr' ? 'Aucun plat trouvé' : 'No dishes found'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <OrderModalCarouselV2 
                    menuData={filteredMenu}
                    onAddToCart={props.onAddToCart}
                    className="h-full"
                  />
                )}
              </div>
              
              {/* Bouton flottant panier mobile */}
              {totalItems > 0 && (
                <div className="absolute bottom-4 right-4 z-20">
                  <Button
                    className="bg-temple-pink hover:bg-temple-pink/90 text-white rounded-full shadow-lg px-4 py-3"
                    onClick={() => setShowMobileCart(true)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    <span className="font-bold">{totalItems}</span>
                    <span className="ml-2 text-sm">{totalPrice.toFixed(2)}€</span>
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Sheet pour le panier mobile */}
        <Sheet open={showMobileCart} onOpenChange={setShowMobileCart}>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-xl">
            <div className="flex flex-col h-full">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-temple-pink" />
                  {language === 'fr' ? 'Votre panier' : 'Your cart'}
                  {totalItems > 0 && (
                    <Badge className="ml-auto bg-temple-pink text-white">
                      {totalItems} articles
                    </Badge>
                  )}
                </SheetTitle>
              </SheetHeader>
              <CartContent />
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Version tablette et desktop
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="max-w-[1400px] w-[95vw] h-[90vh] p-0 overflow-hidden rounded-xl">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-4 sm:p-6 pb-4 border-b bg-gradient-to-r from-temple-pink/5 to-temple-pink/10">
            <div className="flex items-center justify-between mb-3">
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-1.5 sm:p-2 bg-temple-pink/20 rounded-lg">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-temple-pink" />
                </div>
                {language === 'fr' ? 'Votre commande' : 'Your order'}
              </DialogTitle>
              {totalItems > 0 && (
                <Badge className="bg-temple-pink text-white text-sm sm:text-lg px-2 sm:px-3 py-1">
                  {totalItems} {language === 'fr' ? 'articles' : 'items'} • {totalPrice.toFixed(2)}€
                </Badge>
              )}
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 flex items-center gap-3">
              <div className="p-1 sm:p-1.5 bg-temple-pink/10 rounded-full">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-temple-pink" />
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium">
                {language === 'fr' 
                  ? "Composez votre liste d'envies puis contactez-nous pour finaliser votre commande" 
                  : "Create your wishlist then contact us to finalize your order"}
              </p>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Menu avec carousel - responsive */}
            <div className="w-full md:w-[65%] lg:w-[65%] flex flex-col bg-gradient-to-br from-white via-white to-gray-50/50">
              <div className="p-3 sm:p-4 border-b bg-white/90 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-temple-pink" />
                    {language === 'fr' ? 'Notre Menu' : 'Our Menu'}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-600 bg-temple-pink/5 px-2 sm:px-2.5 py-1 rounded-md">
                      <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-temple-pink" />
                      <span className="font-medium">{language === 'fr' ? 'À emporter' : 'Takeaway'}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-600 bg-temple-pink/5 px-2 sm:px-2.5 py-1 rounded-md">
                      <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-temple-pink" />
                      <span className="font-medium">{language === 'fr' ? 'Livraison' : 'Delivery'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={language === 'fr' ? 'Rechercher un plat...' : 'Search for a dish...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-8 sm:h-9 text-xs sm:text-sm"
                    />
                  </div>
                  <Button
                    variant={showOnlyPopular ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                    className={showOnlyPopular ? "bg-temple-pink hover:bg-temple-pink/90" : ""}
                    title={language === 'fr' ? 'Filtrer les plats populaires' : 'Filter popular dishes'}
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden p-2 sm:p-4">
                {filteredMenu.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center py-12">
                      <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {language === 'fr' ? 'Aucun plat trouvé' : 'No dishes found'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <OrderModalCarouselV2 
                    menuData={filteredMenu}
                    onAddToCart={props.onAddToCart}
                    className="h-full"
                  />
                )}
              </div>
            </div>
            
            {/* Panier - responsive */}
            <div className="w-full md:w-[35%] lg:w-[35%] flex flex-col bg-gradient-to-br from-gray-50 to-white border-t md:border-t-0 md:border-l">
              <div className="p-3 sm:p-4 border-b bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 bg-temple-pink/10 rounded-lg">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-temple-pink" />
                    </div>
                    {language === 'fr' ? 'Votre panier' : 'Your cart'}
                  </h3>
                  {props.cart.length > 0 && (
                    <Badge className="bg-temple-pink/10 text-temple-pink border-temple-pink/20 text-xs sm:text-sm">
                      {totalItems} {language === 'fr' ? 'articles' : 'items'}
                    </Badge>
                  )}
                </div>
              </div>
              <CartContent />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}