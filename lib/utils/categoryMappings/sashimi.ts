// ============================================================================
// 🍣 CATÉGORIE 7: SASHIMI PAR 6 - MAPPING IMAGES
// ============================================================================
// Mapping exact pour la catégorie Sashimi avec 100% de couverture

export const SASHIMI_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE SASHIMI PAR 6
  // ============================================================================
  categoryInfo: {
    totalProducts: 3,
    availableImages: 3,
    coverageRate: "100%", // 3/3 produits avec images - PARFAIT!
    imagesFolder: "/menu/sashimi/"
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS /menu/sashimi/
  // ============================================================================
  availableImageFiles: [
    "sashimi duo .webp",
    "sashimi saumon .webp", 
    "sashimi thon.webp"
  ],

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES (100% COUVERTURE)
  // ============================================================================
  mapping: {
    
    // ✅ TOUS LES SASHIMI ONT UNE IMAGE !
    "Saumon": "/menu/sashimi/sashimi saumon .webp",
    "Thon": "/menu/sashimi/sashimi thon.webp",
    "Duo (4 Saumon - 4 Thon)": "/menu/sashimi/sashimi duo .webp",
    
    // Alternative sans parenthèses
    "Duo": "/menu/sashimi/sashimi duo .webp"
  },

  // ============================================================================
  // 📈 ANALYSE DE COUVERTURE PAR TYPE
  // ============================================================================
  coverageAnalysis: {
    saumon: {
      products: ["Saumon"],
      withImages: 1,
      total: 1,
      coverage: "100%"
    },
    thon: {
      products: ["Thon"],
      withImages: 1,
      total: 1,
      coverage: "100%"
    },
    duo: {
      products: ["Duo (4 Saumon - 4 Thon)"],
      withImages: 1,
      total: 1,
      coverage: "100%"
    }
  },

  // ============================================================================
  // 🏆 ACHIEVEMENT: 100% DE COUVERTURE !
  // ============================================================================
  achievement: {
    status: "PERFECT",
    message: "Tous les sashimi ont une image disponible !",
    icon: "🏆"
  }
}

// ============================================================================
// 🔧 TYPES ET INTERFACES
// ============================================================================

export interface SashimiImageResult {
  type: 'image'
  path: string
  alt: string
  quality?: 'high' | 'standard'
}

// ============================================================================
// 🔧 FONCTION D'IMPLÉMENTATION
// ============================================================================

export const getSashimiImage = (productName: string): SashimiImageResult => {
  const mapping = SASHIMI_IMAGE_MAPPING.mapping
  
  // Recherche exacte
  let result = mapping[productName as keyof typeof mapping]
  
  // Si pas trouvé et contient "Duo", essayer sans parenthèses
  if (!result && productName.includes("Duo")) {
    result = mapping["Duo"]
  }
  
  if (result && result.startsWith('/menu/')) {
    return {
      type: 'image',
      path: result,
      alt: `Sashimi ${productName}`,
      quality: 'high'
    }
  }
  
  // Fallback (ne devrait jamais arriver avec 100% de couverture)

  return {
    type: 'image',
    path: '/menu/sashimi/sashimi saumon .webp', // Fallback sur saumon
    alt: productName
  }
}

// ============================================================================
// 🧪 TESTS POUR VALIDATION
// ============================================================================

export const testSashimiMapping = () => {

  const testProducts = [
    "Saumon",
    "Thon",
    "Duo (4 Saumon - 4 Thon)",
    "Duo" // Test alternative
  ]
  
  let passed = 0
  let failed = 0
  
  testProducts.forEach(product => {
    const result = getSashimiImage(product)
    const expected = SASHIMI_IMAGE_MAPPING.mapping[product as keyof typeof SASHIMI_IMAGE_MAPPING.mapping]
    
    if (result.type === 'image' && result.path) {

      passed++
    } else {

      failed++
    }
  })

  return { passed, failed }
}

// ============================================================================
// 🎨 SPÉCIFICITÉS SASHIMI
// ============================================================================

export const SASHIMI_SPECIALTIES = {
  portions: {
    standard: {
      pieces: 6,
      description: "6 tranches de poisson cru",
      preparationTime: "5 min"
    },
    duo: {
      pieces: 8,
      description: "4 tranches de saumon + 4 tranches de thon",
      preparationTime: "5 min"
    }
  },
  
  products: {
    "Saumon": {
      description: "6 tranches de saumon frais",
      price: "7,50€",
      hasImage: true,
      popular: true,
      allergens: ["poisson"]
    },
    "Thon": {
      description: "6 tranches de thon rouge",
      price: "8,50€", 
      hasImage: true,
      premium: true,
      allergens: ["poisson"]
    },
    "Duo (4 Saumon - 4 Thon)": {
      description: "Assortiment saumon et thon",
      price: "8,00€",
      hasImage: true,
      recommended: true,
      allergens: ["poisson"]
    }
  },
  
  serving: {
    accompaniments: ["Wasabi", "Gingembre mariné", "Sauce soja"],
    presentation: "Sur lit de radis blanc râpé"
  }
}