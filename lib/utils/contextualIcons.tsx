/**
 * Système d'icônes contextuelles intelligentes
 * Associe automatiquement l'icône la plus appropriée selon le type de produit
 */

import React from 'react'
import {
  Fish,        // Poissons (sushi, sashimi)
  Shell,       // Fruits de mer (crevettes, crabe)
  Leaf,        // Végétarien
  Beef,        // Viande (wagyu, boeuf)
  Egg,         // Omelette, œufs
  Soup,        // Soupes, ramen, nouilles
  Salad,       // Salades, légumes
  Coffee,      // Boissons chaudes
  Beer,        // Bières
  Wine,        // Vins, saké
  GlassWater,  // Eau, boissons sans alcool
  IceCream,    // Desserts glacés
  Cookie,      // Desserts sucrés
  Package,     // Plateaux, formules
  Flame,       // Plats chauds, tempura
  Sparkles,    // Nouveautés
  Star,        // Populaires
  ChefHat,     // Créations chef
  Wheat,       // Riz, accompagnements
  Apple,       // Fruits
  Zap,         // Crispy, frit
  Utensils,    // Générique nourriture
  LucideIcon
} from 'lucide-react'

// Types d'icônes et leurs mots-clés associés
interface IconMapping {
  icon: LucideIcon
  keywords: string[]
  priority: number // Plus le nombre est bas, plus la priorité est haute
  color?: string
}

// Base de données des correspondances icône-produit
const iconMappings: IconMapping[] = [
  // Poissons et fruits de mer
  {
    icon: Fish,
    keywords: ['saumon', 'thon', 'bar', 'daurade', 'maquereau', 'anguille', 'unagi', 'maguro', 'sake', 'hamachi', 'tai', 'saba', 'poisson'],
    priority: 1,
    color: 'text-blue-500'
  },
  {
    icon: Shell,
    keywords: ['crevette', 'crabe', 'homard', 'poulpe', 'calamar', 'saint-jacques', 'ebi', 'tako', 'ika', 'kani', 'hotate', 'fruits de mer'],
    priority: 1,
    color: 'text-orange-500'
  },
  
  // Viandes
  {
    icon: Beef,
    keywords: ['wagyu', 'boeuf', 'beef', 'viande', 'poulet', 'porc', 'canard', 'tori', 'butaniku', 'gyu'],
    priority: 1,
    color: 'text-red-600'
  },
  
  // Plats spécifiques
  {
    icon: Flame,
    keywords: ['tempura', 'frit', 'grillé', 'yakitori', 'teppanyaki', 'teriyaki', 'katsu', 'gyoza', 'karaage', 'chaud', 'hot'],
    priority: 2,
    color: 'text-orange-600'
  },
  {
    icon: Zap,
    keywords: ['crispy', 'crunchy', 'croustillant', 'panko', 'pané'],
    priority: 2,
    color: 'text-yellow-500'
  },
  {
    icon: Soup,
    keywords: ['soupe', 'miso', 'ramen', 'udon', 'soba', 'nouille', 'bouillon', 'pho', 'tom yum'],
    priority: 2,
    color: 'text-amber-600'
  },
  
  // Végétarien
  {
    icon: Leaf,
    keywords: ['végétarien', 'vegan', 'avocat', 'concombre', 'kappa', 'légume', 'tofu', 'edamame', 'wakame', 'salade', 'vegetable'],
    priority: 2,
    color: 'text-green-500'
  },
  {
    icon: Salad,
    keywords: ['salade', 'chou', 'carotte', 'radis', 'daikon', 'mixed', 'mesclun'],
    priority: 3,
    color: 'text-green-600'
  },
  
  // Œufs et omelettes
  {
    icon: Egg,
    keywords: ['œuf', 'oeuf', 'omelette', 'tamago', 'egg'],
    priority: 2,
    color: 'text-yellow-400'
  },
  
  // Riz et accompagnements
  {
    icon: Wheat,
    keywords: ['riz', 'rice', 'gohan', 'sushi rice', 'vinaigré', 'nature'],
    priority: 3,
    color: 'text-amber-500'
  },
  
  // Desserts
  {
    icon: IceCream,
    keywords: ['glace', 'glacé', 'mochi', 'ice cream', 'sorbet', 'frozen'],
    priority: 2,
    color: 'text-pink-400'
  },
  {
    icon: Cookie,
    keywords: ['dorayaki', 'cookie', 'gâteau', 'cake', 'dessert', 'sucré', 'sweet'],
    priority: 3,
    color: 'text-amber-400'
  },
  {
    icon: Apple,
    keywords: ['fruit', 'mangue', 'litchi', 'ananas', 'fraise', 'citron'],
    priority: 3,
    color: 'text-red-400'
  },
  
  // Boissons
  {
    icon: Beer,
    keywords: ['bière', 'beer', 'asahi', 'kirin', 'sapporo'],
    priority: 2,
    color: 'text-amber-600'
  },
  {
    icon: Wine,
    keywords: ['vin', 'wine', 'saké', 'sake', 'alcool'],
    priority: 2,
    color: 'text-purple-600'
  },
  {
    icon: Coffee,
    keywords: ['thé', 'café', 'matcha', 'sencha', 'coffee', 'tea', 'hot'],
    priority: 3,
    color: 'text-brown-600'
  },
  {
    icon: GlassWater,
    keywords: ['eau', 'water', 'coca', 'soda', 'jus', 'juice', 'limonade', 'sprite', 'fanta'],
    priority: 3,
    color: 'text-blue-400'
  },
  
  // Plateaux et formules
  {
    icon: Package,
    keywords: ['plateau', 'box', 'formule', 'menu', 'assortiment', 'combo', 'bento'],
    priority: 2,
    color: 'text-indigo-500'
  },
  
  // Créations spéciales
  {
    icon: ChefHat,
    keywords: ['chef', 'création', 'spécial', 'signature', 'premium', 'deluxe'],
    priority: 2,
    color: 'text-purple-500'
  },
  {
    icon: Sparkles,
    keywords: ['nouveau', 'new', 'nouveauté', 'limited'],
    priority: 3,
    color: 'text-yellow-500'
  },
  {
    icon: Star,
    keywords: ['populaire', 'popular', 'best', 'top', 'favori'],
    priority: 3,
    color: 'text-yellow-500'
  },
  
  // Générique (fallback)
  {
    icon: Utensils,
    keywords: [''],
    priority: 999,
    color: 'text-gray-500'
  }
]

// Analyse sémantique pour déterminer le type de produit
export function analyzeProductType(productName: string, category?: string): string[] {
  const normalizedName = productName.toLowerCase()
  const normalizedCategory = (category || '').toLowerCase()
  const combined = `${normalizedName} ${normalizedCategory}`
  
  const productTypes: string[] = []
  
  // Détection des types de sushi
  if (combined.match(/sushi|nigiri/)) productTypes.push('sushi')
  if (combined.match(/sashimi/)) productTypes.push('sashimi')
  if (combined.match(/maki/)) productTypes.push('maki')
  if (combined.match(/california|cali/)) productTypes.push('california')
  if (combined.match(/roll/)) productTypes.push('roll')
  if (combined.match(/spring|calispring/)) productTypes.push('spring')
  if (combined.match(/temaki/)) productTypes.push('temaki')
  if (combined.match(/chirashi/)) productTypes.push('chirashi')
  if (combined.match(/flocon/)) productTypes.push('flocon')
  if (combined.match(/crispy/)) productTypes.push('crispy')
  
  // Détection des ingrédients principaux
  if (combined.match(/saumon|salmon/)) productTypes.push('saumon')
  if (combined.match(/thon|tuna/)) productTypes.push('thon')
  if (combined.match(/crevette|shrimp|ebi/)) productTypes.push('crevette')
  if (combined.match(/avocat|avocado/)) productTypes.push('avocat')
  if (combined.match(/wagyu|bœuf|beef/)) productTypes.push('viande')
  
  // Détection des méthodes de préparation
  if (combined.match(/tempura|frit|fried/)) productTypes.push('frit')
  if (combined.match(/crispy|crunchy/)) productTypes.push('crispy')
  if (combined.match(/grillé|grilled|yakitori/)) productTypes.push('grillé')
  if (combined.match(/tartare/)) productTypes.push('tartare')
  
  // Détection des catégories spéciales
  if (combined.match(/végé|vegan|vegetarian/)) productTypes.push('végétarien')
  if (combined.match(/poke|bowl/)) productTypes.push('poke')
  if (combined.match(/plateau|assortiment|box/)) productTypes.push('plateau')
  if (combined.match(/formule|menu|combo/)) productTypes.push('formule')
  if (combined.match(/soupe|soup|miso/)) productTypes.push('soupe')
  if (combined.match(/nouille|ramen|udon|soba/)) productTypes.push('nouilles')
  if (combined.match(/dessert|mochi|glace|dorayaki|nutella|mangue.*coco/)) productTypes.push('dessert')
  if (combined.match(/boisson|drink|coca|thé|café|eau|san pellegrino|oasis|jomo|desperados|kirin|asahi|pietra/)) productTypes.push('boisson')
  if (combined.match(/buritos?|wrap/)) productTypes.push('burrito')
  if (combined.match(/tartare/)) productTypes.push('tartare')
  if (combined.match(/création.*chef|signature/)) productTypes.push('création_chef')
  
  return productTypes
}

// Fonction pour obtenir l'icône la plus appropriée
export function getContextualIcon(
  productName: string,
  category?: string
): { icon: LucideIcon; color: string } {
  const normalizedName = productName.toLowerCase()
  const normalizedCategory = (category || '').toLowerCase()
  const combined = `${normalizedName} ${normalizedCategory}`
  
  // Chercher la meilleure correspondance
  let bestMatch: IconMapping | null = null
  let bestScore = -1
  
  for (const mapping of iconMappings) {
    let score = 0
    
    // Vérifier chaque mot-clé
    for (const keyword of mapping.keywords) {
      if (keyword && combined.includes(keyword)) {
        // Score basé sur la longueur du mot-clé (plus long = plus spécifique)
        score += keyword.length * (100 - mapping.priority)
      }
    }
    
    if (score > bestScore) {
      bestScore = score
      bestMatch = mapping
    }
  }
  
  // Fallback vers l'icône générique
  if (!bestMatch || bestScore === 0) {
    bestMatch = iconMappings.find(m => m.icon === Utensils)!
  }
  
  return {
    icon: bestMatch.icon,
    color: bestMatch.color || 'text-gray-500'
  }
}

// Composant React pour afficher l'icône contextuelle
interface ContextualIconProps {
  productName: string
  category?: string
  className?: string
  size?: number
}

export function ContextualIcon({
  productName,
  category,
  className = '',
  size = 24
}: ContextualIconProps) {
  const { icon: Icon, color } = getContextualIcon(productName, category)
  
  return (
    <Icon 
      className={`${color} ${className}`}
      size={size}
    />
  )
}

// Export des types pour réutilisation
export type { IconMapping }