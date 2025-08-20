'use client'

import { useState } from 'react'
import NosCreations from './our-creation-section'
import menuImageMapping from "../public/menu-images-mapping.json"

// Données du menu à emporter (créations du chef)
const menuAEmporter = [
  {
    category: "Création du Chef par 6",
    items: [
      {
        id: "rolls-saumon-braise",
        name: "Rolls Saumon Braisé",
        description: "Avocat, sauce spicy, billes citronnées",
        price: 8.80
      },
      {
        id: "l-italien",
        name: "L'Italien",
        description: "Tomate, mozza, parmesan, pesto",
        price: 11.80
      },
      {
        id: "california-crevette-tempura-enrobe",
        name: "California Crevette Tempura",
        description: "Avocat, enrobé de saumon braisé, oignon frit",
        price: 8.90
      },
      {
        id: "avocat-mayo-thon",
        name: "Avocat Mayo",
        description: "Enrobé de thon braisé, pousse de cress",
        price: 8.50
      },
      {
        id: "california-poulet-caramelise-mangue",
        name: "California Poulet Caramélisé",
        description: "Enrobé de mangue, tobiko",
        price: 9.80
      },
      {
        id: "california-poulet-frit-guacamole",
        name: "California Poulet Frit",
        description: "Guacamole, jalapeno, oignon frit",
        price: 9.40
      },
      {
        id: "rolls-avocat-thon",
        name: "Rolls Avocat",
        description: "Enrobé de thon, zeste de pêche, tobiko",
        price: 10.30
      },
      {
        id: "flocon-saumon-avocat-menthe",
        name: "Flocon Saumon Avocat",
        description: "Tobiko, menthe",
        price: 7.40
      },
      {
        id: "california-saumon-braise-truffe",
        name: "California Saumon Braisé",
        description: "Enrobé de saumon braisé, truffe",
        price: 12.50
      },
      {
        id: "california-saumon-guacamole",
        name: "California Saumon",
        description: "Guacamole jalapeno",
        price: 11.50
      },
      {
        id: "rolls-avocat-truffe",
        name: "Roll's Avocat Truffe",
        description: "Enrobé de saumon braisé, sauce truffe",
        price: 13.80
      }
    ]
  }
]

export default function NosCreationsWithCart() {
  const [cart, setCart] = useState<any[]>([])
  const [showAddedToCart, setShowAddedToCart] = useState<string | null>(null)

  const addToCart = (item: any) => {
    setCart([...cart, { ...item, quantity: 1 }])
    
    // Afficher le feedback visuel
    setShowAddedToCart(item.id)
    setTimeout(() => {
      setShowAddedToCart(null)
    }, 2000)
  }

  const getProductImage = (itemId: string, categoryName: string) => {
    try {
      // Normaliser le nom de la catégorie pour correspondre aux clés du JSON
      const categoryMappings: { [key: string]: string } = {
        "Création du Chef par 6": "creation-du-chef-par-6"
      }
      
      const categoryKey = categoryMappings[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-')
      const imagePath = (menuImageMapping as any)[categoryKey]?.[itemId]
      
      if (imagePath === "soon") return { type: 'soon' as const }
      if (imagePath && imagePath !== null) return { type: 'image' as const, path: `/menu/${imagePath}` }
      return { type: 'none' as const }
    } catch (error) {
      console.warn('Erreur chargement mapping images:', error)
      return { type: 'none' as const }
    }
  }

  return (
    <NosCreations 
      creationsData={menuAEmporter.find(cat => cat.category === "Création du Chef par 6")}
      onAddToCart={addToCart}
      showAddedToCart={showAddedToCart}
      getProductImage={getProductImage}
    />
  )
}