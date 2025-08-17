// ============================================================================
// 🎯 SYSTÈME DE MAPPING V3 - APPROCHE MODULAIRE PAR CATÉGORIE
// ============================================================================
// Nouvelle approche : mapping précis catégorie par catégorie

import { getBoissonImage, type ImageResult } from './categoryMappings/boissons'
import { getFormuleImage } from './categoryMappings/formules'
import { getPlateauImage } from './categoryMappings/plateaux'
import { getPlatChaudImage } from './categoryMappings/platsChauds'
import { getMakiImage } from './categoryMappings/makis'
import { getCaliforniaImage } from './categoryMappings/california'
import { getSashimiImage } from './categoryMappings/sashimi'
import { getSushiImage } from './categoryMappings/sushi'
import { getCreationChefImage } from './categoryMappings/creationChef'
import { getCrispyImage } from './categoryMappings/crispys'

// ============================================================================
// 📊 MAPPING GLOBAL PAR CATÉGORIE
// ============================================================================

export const CATEGORY_MAPPINGS = {
  "Boissons": getBoissonImage,
  "Formules du Midi": getFormuleImage,
  "Plateaux": getPlateauImage,
  "Plats Chauds": getPlatChaudImage,
  "Makis par 6": getMakiImage,
  "California par 6": getCaliforniaImage,
  "Sashimi par 6": getSashimiImage,
  "Sushi à l'unité": getSushiImage,
  "Création du Chef": getCreationChefImage,
  "Création du Chef par 6": getCreationChefImage, // Nom exact dans le menu
  "Crispys (Frit)": getCrispyImage,
  "Crispys": getCrispyImage,
  "Crispys (frit) par 6": getCrispyImage, // Nom exact dans le menu
  
  // "Poke Bowls": getPokeImage,
  // "Buritos": getBuritoImage,
  // "Spring": getSpringImage,
  // "Roll's": getRollsImage,
  // etc...
}

// ============================================================================
// 🔧 FONCTION PRINCIPALE DE MAPPING V3
// ============================================================================

export function getProductImageV3(
  productName: string,
  category?: string
): ImageResult {
  // 1. Si on a une catégorie, utiliser le mapping spécifique
  if (category && CATEGORY_MAPPINGS[category as keyof typeof CATEGORY_MAPPINGS]) {
    const categoryMapper = CATEGORY_MAPPINGS[category as keyof typeof CATEGORY_MAPPINGS]
    return categoryMapper(productName)
  }
  
  // 2. Fallback : essayer de deviner la catégorie depuis le nom
  const normalizedName = productName.toLowerCase()
  
  // Boissons
  if (normalizedName.includes('eau') || 
      normalizedName.includes('coca') || 
      normalizedName.includes('thé') ||
      normalizedName.includes('bière') ||
      normalizedName.includes('asahi') ||
      normalizedName.includes('kirin')) {
    return getBoissonImage(productName)
  }
  
  // 3. Fallback générique
  return {
    type: 'icon',
    icon: 'UtensilsCrossed',
    color: 'text-gray-400',
    emoji: '🍽️',
    alt: productName
  }
}

// ============================================================================
// 🎨 COMPOSANT REACT UNIVERSEL
// ============================================================================

export interface ProductImageProps {
  productName: string
  category?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Cette fonction sera utilisée par le composant React
export function getImageDataForProduct(productName: string, category?: string): {
  hasImage: boolean
  imagePath?: string
  iconName?: string
  iconColor?: string
  fallbackEmoji?: string
  isComingSoon?: boolean
  isNoIcon?: boolean
} {
  const result = getProductImageV3(productName, category)
  
  if (result.type === 'image' && result.path) {
    return {
      hasImage: true,
      imagePath: result.path
    }
  }
  
  if (result.type === 'coming-soon') {
    return {
      hasImage: false,
      isComingSoon: true,
      fallbackEmoji: result.icon
    }
  }
  
  if (result.type === 'no-icon') {
    return {
      hasImage: false,
      isNoIcon: true
    }
  }
  
  return {
    hasImage: false,
    iconName: result.icon,
    iconColor: result.color,
    fallbackEmoji: result.emoji
  }
}

// ============================================================================
// 🧪 TESTS DU SYSTÈME V3
// ============================================================================

export function testMappingV3() {

  const testCases = [
    // Boissons
    { name: "Eau Plate", category: "Boissons", expected: "icon" },
    { name: "Goyave Litchi", category: "Boissons", expected: "image" },
    { name: "Thé Jomo Mangue", category: "Boissons", expected: "image" },
    { name: "Asahi", category: "Boissons", expected: "icon" },
    
    // Sans catégorie (doit deviner)
    { name: "Coca Cola", category: undefined, expected: "icon" },
    { name: "Thé Jomo Pêche", category: undefined, expected: "image" },
    
    // Produit inconnu
    { name: "Produit Inexistant", category: undefined, expected: "icon" }
  ]
  
  let passed = 0
  let failed = 0
  
  testCases.forEach((test, index) => {
    const result = getProductImageV3(test.name, test.category)
    const success = result.type === test.expected
    
    if (success) {
      console.log(`✅ Test ${index + 1}: "${test.name}" (${test.category || 'sans catégorie'})`)

      passed++
    } else {
      console.log(`❌ Test ${index + 1}: "${test.name}" (${test.category || 'sans catégorie'})`)

      failed++
    }
  })

  return { passed, failed }
}

// ============================================================================
// 📤 EXPORT POUR COMPATIBILITÉ
// ============================================================================

// Pour remplacer progressivement l'ancien système
export { getProductImageV3 as getProductImageWithFallback }