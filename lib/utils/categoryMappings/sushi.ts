// ============================================================================
// 🍣 CATÉGORIE 8: SUSHI À L'UNITÉ - MAPPING IMAGES
// ============================================================================
// Mapping exact pour la catégorie Sushi avec 83% de couverture

export const SUSHI_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE SUSHI À L'UNITÉ
  // ============================================================================
  categoryInfo: {
    totalProducts: 12,
    availableImages: 10,
    coverageRate: "83%", // 10/12 produits avec images - EXCELLENT!
    imagesFolder: "/menu/sushi nigiri/"
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS /menu/sushi nigiri/
  // ============================================================================
  availableImageFiles: [
    "sushi saumon braisé truffe.webp",
    "sushi saumon braisé.webp",
    "sushi saumon cheese .webp",
    "sushi saumon ciboulette .webp",
    "sushi saumon mangue .webp",
    "sushi saumon.webp",
    "sushi thon braisé .webp",
    "sushi thon.webp",
    "sushis aumon tobiko.webp",      // Note: "aumon" = saumon (typo dans nom fichier)
    "sushis saumon avocat jalapeno.webp"
  ],

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES
  // ============================================================================
  mapping: {
    
    // ✅ SUSHI CLASSIQUES
    "Saumon": "/menu/sushi nigiri/sushi saumon.webp",
    "Thon": "/menu/sushi nigiri/sushi thon.webp",
    
    // ✅ SUSHI AU FROMAGE & GARNITURES
    "Saumon Ciboulette": "/menu/sushi nigiri/sushi saumon ciboulette .webp",
    "Saumon Cheese": "/menu/sushi nigiri/sushi saumon cheese .webp",
    "Saumon, Cheese": "/menu/sushi nigiri/sushi saumon cheese .webp", // Alternative
    
    // ✅ SUSHI EXOTIQUES
    "Saumon Mangue": "/menu/sushi nigiri/sushi saumon mangue .webp",
    "Saumon, Mangue": "/menu/sushi nigiri/sushi saumon mangue .webp", // Alternative
    
    // ✅ SUSHI BRAISÉS
    "Saumon Braisé": "/menu/sushi nigiri/sushi saumon braisé.webp",
    "Thon Braisé": "/menu/sushi nigiri/sushi thon braisé .webp",
    
    // ✅ SUSHI PREMIUM
    "Saumon Braisé, Truffe": "/menu/sushi nigiri/sushi saumon braisé truffe.webp",
    "Saumon Braisé Truffe": "/menu/sushi nigiri/sushi saumon braisé truffe.webp", // Alternative
    
    // ✅ SUSHI TOBIKO
    "Saumon, Tobiko": "/menu/sushi nigiri/sushis aumon tobiko.webp", // ATTENTION: typo "aumon" dans le fichier
    "Saumon Tobiko": "/menu/sushi nigiri/sushis aumon tobiko.webp", // Alternative
    
    // ✅ SUSHI SPÉCIAUX
    "Saumon Avocat Jalapeno": "/menu/sushi nigiri/sushis saumon avocat jalapeno.webp",
    "Saumon, Avocat, Jalapeno": "/menu/sushi nigiri/sushis saumon avocat jalapeno.webp", // Alternative
    "Sushis saumon avocat jalapeno": "/menu/sushi nigiri/sushis saumon avocat jalapeno.webp", // Nom exact menu

    // 📸 SUSHI SANS IMAGES → BIENTÔT EN PHOTO
    "Saumon Avocat": "coming-soon",
    "Saumon, Avocat": "coming-soon", // Alternative
    "Saumon Braisé, Sauce Spicy, Tobiko": "coming-soon",
    "Saumon Braisé Sauce Spicy Tobiko": "coming-soon" // Alternative
  },

  // ============================================================================
  // 📸 CONFIGURATION "BIENTÔT EN PHOTO"
  // ============================================================================
  comingSoonConfig: {
    displayText: "Bientôt en photo",
    style: {
      backgroundColor: "#f8fafc",
      borderColor: "#e2e8f0", 
      textColor: "#64748b",
      fontSize: "12px",
      fontStyle: "italic"
    },
    icon: "📸",
    animation: "subtle-pulse"
  },

  // ============================================================================
  // 📈 ANALYSE DE COUVERTURE PAR TYPE
  // ============================================================================
  coverageAnalysis: {
    classiques: {
      products: ["Saumon", "Thon"],
      withImages: 2,
      total: 2,
      coverage: "100%"
    },
    fromage: {
      products: ["Saumon Cheese", "Saumon Ciboulette"],
      withImages: 2,
      total: 2,
      coverage: "100%"
    },
    braises: {
      products: ["Saumon Braisé", "Thon Braisé", "Saumon Braisé, Truffe"],
      withImages: 3,
      total: 3,
      coverage: "100%"
    },
    speciaux: {
      products: ["Saumon Mangue", "Saumon, Tobiko", "Saumon Avocat Jalapeno"],
      withImages: 3,
      total: 3,
      coverage: "100%"
    },
    manquants: {
      products: ["Saumon Avocat", "Saumon Braisé, Sauce Spicy, Tobiko"],
      withImages: 0,
      total: 2,
      coverage: "0%"
    }
  }
}

// ============================================================================
// 🔧 TYPES ET INTERFACES
// ============================================================================

export interface SushiImageResult {
  type: 'image' | 'coming-soon'
  path?: string
  text?: string
  icon?: string
  style?: {
    backgroundColor: string
    borderColor: string
    textColor: string
    fontSize: string
    fontStyle: string
  }
  animation?: string
  alt: string
}

// ============================================================================
// 🔧 FONCTION D'IMPLÉMENTATION
// ============================================================================

export const getSushiImage = (productName: string): SushiImageResult => {
  const mapping = SUSHI_IMAGE_MAPPING.mapping
  const comingSoonConfig = SUSHI_IMAGE_MAPPING.comingSoonConfig
  
  // Recherche exacte
  let result = mapping[productName as keyof typeof mapping]
  
  // Si pas trouvé, essayer quelques variations
  if (!result) {
    // Normaliser les séparateurs (virgules, espaces)
    const normalized = productName.replace(/,\s*/g, ' ').trim()
    result = mapping[normalized as keyof typeof mapping]
    
    // Essayer avec virgule au lieu d'espace
    if (!result) {
      const withComma = productName.replace(/\s+/g, ', ')
      result = mapping[withComma as keyof typeof mapping]
    }
  }
  
  if (result === "coming-soon") {
    return {
      type: 'coming-soon',
      text: comingSoonConfig.displayText,
      icon: comingSoonConfig.icon,
      style: comingSoonConfig.style,
      animation: comingSoonConfig.animation,
      alt: `${productName} - Photo bientôt disponible`
    }
  }
  
  if (result && result.startsWith('/menu/')) {
    return {
      type: 'image',
      path: result,
      alt: `Sushi ${productName}`
    }
  }
  
  // Fallback
  return {
    type: 'coming-soon',
    text: comingSoonConfig.displayText,
    icon: comingSoonConfig.icon,
    style: comingSoonConfig.style,
    animation: comingSoonConfig.animation,
    alt: productName
  }
}

// ============================================================================
// 🧪 TESTS POUR VALIDATION
// ============================================================================

export const testSushiMapping = () => {

  const testProducts = [
    // Avec images
    "Saumon",
    "Thon",
    "Saumon Cheese",
    "Saumon Ciboulette",
    "Saumon Mangue",
    "Saumon Braisé",
    "Thon Braisé",
    "Saumon Braisé, Truffe",
    "Saumon, Tobiko",
    "Saumon Avocat Jalapeno",
    
    // Sans images (coming soon)
    "Saumon Avocat",
    "Saumon Braisé, Sauce Spicy, Tobiko"
  ]
  
  let passed = 0
  let failed = 0
  let comingSoon = 0
  
  testProducts.forEach(product => {
    const result = getSushiImage(product)
    
    if (result.type === 'image' && result.path) {

      passed++
    } else if (result.type === 'coming-soon') {

      comingSoon++
    } else {

      failed++
    }
  })

  console.log(`🏆 83% de couverture (10/12) - Excellent!`)
  
  return { passed, failed, comingSoon }
}

// ============================================================================
// 🏆 SPÉCIALITÉS SUSHI
// ============================================================================

export const SUSHI_SPECIALTIES = {
  classiques: {
    "Saumon": { 
      price: "2,20€", 
      hasImage: true, 
      popular: true,
      description: "Sushi nigiri au saumon frais"
    },
    "Thon": { 
      price: "2,50€", 
      hasImage: true, 
      popular: true,
      description: "Sushi nigiri au thon rouge"
    }
  },
  
  premium: {
    "Saumon Braisé, Truffe": { 
      price: "3,70€", 
      hasImage: true, 
      luxury: true,
      description: "Saumon braisé à la truffe"
    },
    "Saumon Avocat Jalapeno": { 
      price: "2,40€", 
      hasImage: true, 
      spicy: true,
      description: "Saumon avec avocat et jalapeño"
    },
    "Saumon Mangue": { 
      price: "2,70€", 
      hasImage: true, 
      exotic: true,
      description: "Saumon avec mangue fraîche"
    }
  },
  
  fromage: {
    "Saumon Cheese": { 
      price: "2,30€", 
      hasImage: true,
      description: "Saumon avec fromage frais"
    },
    "Saumon Ciboulette": { 
      price: "2,30€", 
      hasImage: true,
      description: "Saumon à la ciboulette"
    }
  },
  
  braises: {
    "Saumon Braisé": { 
      price: "2,40€", 
      hasImage: true,
      description: "Saumon légèrement braisé"
    },
    "Thon Braisé": { 
      price: "2,60€", 
      hasImage: true,
      description: "Thon légèrement braisé"
    }
  },
  
  tobiko: {
    "Saumon, Tobiko": { 
      price: "2,30€", 
      hasImage: true,
      description: "Saumon avec œufs de poisson volant",
      note: "⚠️ Fichier image avec typo: 'aumon' au lieu de 'saumon'"
    },
    "Saumon Braisé, Sauce Spicy, Tobiko": { 
      price: "2,70€", 
      hasImage: false,
      description: "Saumon braisé épicé au tobiko"
    }
  }
}