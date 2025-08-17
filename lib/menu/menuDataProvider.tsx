'use client'

import React, { createContext, useContext, useMemo, ReactNode } from 'react'
import { menuLivraison } from '@/menu-data-livraison'

// Types
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  isNew?: boolean
  isPopular?: boolean
  isVegan?: boolean
  isSpicy?: boolean
  pieces?: number
  ingredients?: string[]
}

export interface MenuCategory {
  category: string
  items: MenuItem[]
  icon?: string
  color?: string
  description?: string
}

export interface MenuContextValue {
  menu: MenuCategory[]
  searchItems: (query: string) => MenuItem[]
  getItemsByCategory: (category: string) => MenuItem[]
  getPopularItems: () => MenuItem[]
  getNewItems: () => MenuItem[]
  getTotalItems: () => number
  getItemById: (id: string) => MenuItem | undefined
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined)

interface MenuDataProviderProps {
  children: ReactNode
}

export function MenuDataProvider({ children }: MenuDataProviderProps) {
  // Traiter les données du menu une seule fois
  const processedMenu = useMemo(() => {
    return menuLivraison as MenuCategory[]
  }, [])

  // Fonction de recherche optimisée
  const searchItems = useMemo(() => {
    return (query: string): MenuItem[] => {
      if (!query) return []
      
      const searchLower = query.toLowerCase()
      const results: MenuItem[] = []
      
      processedMenu.forEach(category => {
        category.items.forEach(item => {
          const nameLower = item.name.toLowerCase()
          const descLower = item.description?.toLowerCase() || ''
          const categoryLower = category.category.toLowerCase()
          const ingredientsText = item.ingredients?.join(' ').toLowerCase() || ''
          
          if (
            nameLower.includes(searchLower) ||
            descLower.includes(searchLower) ||
            categoryLower.includes(searchLower) ||
            ingredientsText.includes(searchLower)
          ) {
            results.push(item)
          }
        })
      })
      
      return results
    }
  }, [processedMenu])

  // Obtenir les items par catégorie
  const getItemsByCategory = useMemo(() => {
    return (category: string): MenuItem[] => {
      const cat = processedMenu.find(c => 
        c.category.toLowerCase() === category.toLowerCase()
      )
      return cat?.items || []
    }
  }, [processedMenu])

  // Obtenir les items populaires
  const getPopularItems = useMemo(() => {
    return (): MenuItem[] => {
      const popular: MenuItem[] = []
      processedMenu.forEach(category => {
        category.items.forEach(item => {
          if (item.isPopular) {
            popular.push(item)
          }
        })
      })
      return popular
    }
  }, [processedMenu])

  // Obtenir les nouveaux items
  const getNewItems = useMemo(() => {
    return (): MenuItem[] => {
      const newItems: MenuItem[] = []
      processedMenu.forEach(category => {
        category.items.forEach(item => {
          if (item.isNew) {
            newItems.push(item)
          }
        })
      })
      return newItems
    }
  }, [processedMenu])

  // Obtenir le nombre total d'items
  const getTotalItems = useMemo(() => {
    return (): number => {
      return processedMenu.reduce((total, category) => 
        total + category.items.length, 0
      )
    }
  }, [processedMenu])

  // Obtenir un item par son ID
  const getItemById = useMemo(() => {
    return (id: string): MenuItem | undefined => {
      for (const category of processedMenu) {
        const item = category.items.find(i => i.id === id)
        if (item) return item
      }
      return undefined
    }
  }, [processedMenu])

  const value: MenuContextValue = {
    menu: processedMenu,
    searchItems,
    getItemsByCategory,
    getPopularItems,
    getNewItems,
    getTotalItems,
    getItemById
  }

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}

// Hook pour utiliser le contexte du menu
export function useMenuData() {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenuData must be used within a MenuDataProvider')
  }
  return context
}

// Export des utilitaires
export const menuHelpers = {
  formatPrice: (price: number): string => {
    return `${price.toFixed(2)}€`
  },
  
  getCategoryIcon: (category: string): string => {
    const icons: Record<string, string> = {
      'formules': '🍱',
      'plateaux': '🍽️',
      'sushis': '🍣',
      'sashimi': '🐟',
      'makis': '🌯',
      'california': '🥢',
      'rolls': '🌀',
      'buritos': '🌮',
      'plats chauds': '🍜',
      'nouilles': '🍝',
      'poke bowls': '🥗',
      'chirashi': '🍚',
      'accompagnements': '🥟',
      'desserts': '🍮',
      'boissons': '🥤',
      'mochis': '🍡'
    }
    return icons[category.toLowerCase()] || '🍴'
  },
  
  isAvailable: (item: MenuItem): boolean => {
    // Logique pour vérifier la disponibilité
    // Peut être étendue avec des horaires, stocks, etc.
    return true
  },
  
  getDeliveryTime: (): string => {
    // Logique pour calculer le temps de livraison
    return '20-30 min'
  }
}