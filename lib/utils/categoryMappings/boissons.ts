// ============================================================================
// 🥤 CATÉGORIE 1: BOISSONS - MAPPING IMAGES
// ============================================================================
// Mapping exact et structuré pour la catégorie Boissons

export const BOISSONS_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE BOISSONS
  // ============================================================================
  categoryInfo: {
    totalProducts: 14,
    availableImages: 4,
    coverageRate: "29%", // 4/14 produits avec images
    imagesFolder: "/menu/boisson/"
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS /menu/boisson/
  // ============================================================================
  availableImageFiles: [
    "Thé JOMO grenade litchie.webp",
    "Thé JOMO menthe citron_.webp", 
    "UME.webp",
    "boisson yuzu .webp"
  ],

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES
  // ============================================================================
  mapping: {
    
    // ✅ PRODUITS AVEC IMAGES CORRESPONDANTES
    "Goyave Litchi": "/menu/boisson/Thé JOMO grenade litchie.webp",
    "Thé Jomo Gingembre": "/menu/boisson/Thé JOMO menthe citron_.webp",
    "Thé Jomo Mangue": "/menu/boisson/Thé JOMO menthe citron_.webp",
    "Thé Jomo Passion Citron Vert": "/menu/boisson/Thé JOMO menthe citron_.webp",
    "Thé Jomo Pêche": "/menu/boisson/Thé JOMO menthe citron_.webp",

    // ❌ PRODUITS SANS IMAGES → ICÔNES CONTEXTUELLES
    "Eau Plate": null,                    // → Icône 💧
    "San Pellegrino": null,               // → Icône 💧  
    "Oasis": null,                        // → Icône 🥤
    "Coca Cola": null,                    // → Icône 🥤
    "Coca Cola Zero": null,               // → Icône 🥤
    "Asahi": null,                        // → Icône 🍺
    "Kirin": null,                        // → Icône 🍺
    "Pietra": null,                       // → Icône 🍺
    "Desperados Blonde": null             // → Icône 🍺
  },

  // ============================================================================
  // 🎨 ICÔNES CONTEXTUELLES SPÉCIFIQUES AUX BOISSONS
  // ============================================================================
  contextualIcons: {
    "Eau Plate": { icon: "Droplets", color: "text-blue-500", emoji: "💧" },
    "San Pellegrino": { icon: "Droplets", color: "text-emerald-500", emoji: "💧" },
    "Oasis": { icon: "Coffee", color: "text-amber-500", emoji: "🥤" },
    "Coca Cola": { icon: "Coffee", color: "text-red-600", emoji: "🥤" },
    "Coca Cola Zero": { icon: "Coffee", color: "text-gray-700", emoji: "🥤" },
    "Asahi": { icon: "Beer", color: "text-amber-600", emoji: "🍺" },
    "Kirin": { icon: "Beer", color: "text-amber-600", emoji: "🍺" },
    "Pietra": { icon: "Beer", color: "text-amber-800", emoji: "🍺" },
    "Desperados Blonde": { icon: "Beer", color: "text-yellow-500", emoji: "🍺" }
  },

  // ============================================================================
  // 📝 IMAGES NON UTILISÉES (DISPONIBLES POUR D'AUTRES USAGES)
  // ============================================================================
  unusedImages: [
    "/menu/boisson/UME.webp",           // Pourrait être utilisée pour un produit Ume
    "/menu/boisson/boisson yuzu .webp"  // Pourrait être utilisée pour un produit Yuzu
  ]
}

// ============================================================================
// 🔧 FONCTION D'IMPLÉMENTATION
// ============================================================================

export interface ImageResult {
  type: 'image' | 'icon' | 'no-icon' | 'coming-soon'
  path?: string
  icon?: string
  color?: string
  emoji?: string
  alt: string
}

export const getBoissonImage = (productName: string): ImageResult => {
  const mapping = BOISSONS_IMAGE_MAPPING.mapping
  
  // Recherche directe dans le mapping
  const imagePath = mapping[productName as keyof typeof mapping]
  
  if (imagePath) {
    return {
      type: 'image',
      path: imagePath,
      alt: productName
    }
  }
  
  // Pour les boissons sans images, on retourne "no-icon" 
  // pour ne pas afficher d'icône du tout
  return {
    type: 'no-icon',
    alt: productName
  }
}

// ============================================================================
// 🧪 TESTS POUR VALIDATION
// ============================================================================

export const testBoissonsMapping = () => {

  const testProducts = [
    "Goyave Litchi",        // Devrait avoir une image
    "Thé Jomo Gingembre",   // Devrait avoir une image  
    "Eau Plate",            // Devrait avoir no-icon
    "Asahi",                // Devrait avoir no-icon
    "Coca Cola"             // Devrait avoir no-icon
  ]
  
  let passed = 0
  let failed = 0
  
  testProducts.forEach(product => {
    const result = getBoissonImage(product)
    const expected = BOISSONS_IMAGE_MAPPING.mapping[product as keyof typeof BOISSONS_IMAGE_MAPPING.mapping]
    
    if ((expected && result.type === 'image') || (!expected && result.type === 'no-icon')) {

      passed++
    } else {

      failed++
    }
  })

  return { passed, failed }
}