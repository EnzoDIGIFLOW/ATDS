// ============================================================================
// 🌯 CATÉGORIE 6: CALIFORNIA PAR 6 - MAPPING IMAGES
// ============================================================================
// Mapping exact pour la catégorie California par 6 avec système "Bientôt en photo"

export const CALIFORNIA_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE CALIFORNIA PAR 6
  // ============================================================================
  categoryInfo: {
    totalProducts: 14,
    availableImages: 9,
    coverageRate: "64%", // 9/14 produits avec images
    imagesFolder: "/menu/california/"
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS /menu/california/
  // ============================================================================
  availableImageFiles: [
    "cali gambas cheese .webp",
    "cali gambas cheese oignon frit .webp",
    "cali poulet cheese .webp",
    "cali poulet curry .webp",
    "cali saumon avocat .webp",
    "cali saumon avocat tobiko.webp",
    "cali saumon cheese .webp",
    "cali saumon mangue menthe.webp",
    "cali tempura avocat mayo .webp"
  ],

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES
  // ============================================================================
  mapping: {
    
    // ✅ CALIFORNIA AVEC IMAGES CORRESPONDANTES
    "Poulet, Cheese": "/menu/california/cali poulet cheese .webp",
    "Saumon Cheese": "/menu/california/cali saumon cheese .webp",
    "Poulet Curry": "/menu/california/cali poulet curry .webp",
    "Saumon, Avocat": "/menu/california/cali saumon avocat .webp",
    "Saumon, Avocat, Tobiko": "/menu/california/cali saumon avocat tobiko.webp",
    "Crevette Tempura, Mayo": "/menu/california/cali tempura avocat mayo .webp",
    "Crevette Tempura, Avocat": "/menu/california/cali tempura avocat mayo .webp", // Même image
    "Saumon, Mangue, Menthe": "/menu/california/cali saumon mangue menthe.webp",
    "Gambas, Cheese": "/menu/california/cali gambas cheese .webp",
    "Gambas, Cheese, Oignon Frit": "/menu/california/cali gambas cheese oignon frit .webp",

    // 📸 CALIFORNIA SANS IMAGES → BIENTÔT EN PHOTO
    "Poulet, Avocat": "coming-soon",
    "Poulet Frit, Cheddar, Oignon Frit": "coming-soon",
    "Thon, Avocat": "coming-soon",
    "Gambas, Cheese, Avocat": "coming-soon"
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
  // 📈 ANALYSE DE COUVERTURE PAR TYPE D'INGRÉDIENT
  // ============================================================================
  coverageAnalysis: {
    saumon: {
      products: ["Saumon Cheese", "Saumon, Avocat", "Saumon, Avocat, Tobiko", "Saumon, Mangue, Menthe"],
      withImages: 4,
      total: 4,
      coverage: "100%"
    },
    poulet: {
      products: ["Poulet, Cheese", "Poulet Curry", "Poulet, Avocat", "Poulet Frit, Cheddar, Oignon Frit"],
      withImages: 2,
      total: 4,
      coverage: "50%"
    },
    gambas: {
      products: ["Gambas, Cheese", "Gambas, Cheese, Oignon Frit", "Gambas, Cheese, Avocat"],
      withImages: 2,
      total: 3,
      coverage: "67%"
    },
    crevetteTempura: {
      products: ["Crevette Tempura, Mayo", "Crevette Tempura, Avocat"],
      withImages: 2, // Même image pour les 2
      total: 2,
      coverage: "100%"
    },
    thon: {
      products: ["Thon, Avocat"],
      withImages: 0,
      total: 1,
      coverage: "0%"
    }
  },

  // ============================================================================
  // 🏆 PRODUITS PREMIUM AVEC IMAGES
  // ============================================================================
  premiumWithImages: [
    "Saumon, Avocat, Tobiko",
    "Saumon, Mangue, Menthe",
    "Gambas, Cheese, Oignon Frit",
    "Crevette Tempura, Mayo"
  ]
}

// ============================================================================
// 🔧 TYPES ET INTERFACES
// ============================================================================

export interface CaliforniaImageResult {
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

export const getCaliforniaImage = (productName: string): CaliforniaImageResult => {
  const mapping = CALIFORNIA_IMAGE_MAPPING.mapping
  const comingSoonConfig = CALIFORNIA_IMAGE_MAPPING.comingSoonConfig
  
  const result = mapping[productName as keyof typeof mapping]
  
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
      alt: `California ${productName}`
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

export const testCaliforniaMapping = () => {

  const testProducts = [
    // Avec images - Populaires
    "Saumon, Avocat",                    // → Image saumon avocat
    "Poulet, Cheese",                    // → Image poulet cheese  
    "Saumon Cheese",                     // → Image saumon cheese
    "Gambas, Cheese",                    // → Image gambas cheese
    
    // Avec images - Premium
    "Saumon, Avocat, Tobiko",            // → Image saumon avocat tobiko
    "Saumon, Mangue, Menthe",            // → Image saumon mangue menthe
    "Crevette Tempura, Mayo",            // → Image tempura mayo
    
    // Bientôt en photo
    "Poulet, Avocat",                    // → Coming soon
    "Thon, Avocat",                      // → Coming soon
    "Poulet Frit, Cheddar, Oignon Frit" // → Coming soon
  ]
  
  let passed = 0
  let failed = 0
  
  testProducts.forEach(product => {
    const result = getCaliforniaImage(product)
    const expected = CALIFORNIA_IMAGE_MAPPING.mapping[product as keyof typeof CALIFORNIA_IMAGE_MAPPING.mapping]
    
    if ((expected && expected !== "coming-soon" && result.type === 'image') || 
        (expected === "coming-soon" && result.type === 'coming-soon')) {
      const display = result.type === 'image' ? 
        `IMAGE: ${result.path}` : 
        `COMING SOON: ${result.icon} ${result.text}`

      passed++
    } else {

      failed++
    }
  })

  return { passed, failed }
}

// ============================================================================
// 🎨 SPÉCIFICITÉS CALIFORNIA
// ============================================================================

export const CALIFORNIA_SPECIALTIES = {
  signature: {
    "Saumon, Avocat, Tobiko": {
      description: "California signature avec tobiko",
      price: "6,50€",
      hasImage: true,
      premium: true
    },
    "Saumon, Mangue, Menthe": {
      description: "California fusion exotique",
      price: "6,80€", 
      hasImage: true,
      premium: true
    }
  },
  
  classiques: {
    "Saumon, Avocat": {
      description: "California classique le plus populaire",
      price: "6,40€",
      hasImage: true,
      popular: true
    },
    "Poulet, Cheese": {
      description: "California poulet économique",
      price: "5,90€",
      hasImage: true,
      popular: true
    }
  },
  
  tempura: {
    "Crevette Tempura, Mayo": {
      description: "California avec crevette frite",
      price: "6,50€",
      hasImage: true,
      specialty: "tempura"
    },
    "Crevette Tempura, Avocat": {
      description: "California tempura à l'avocat",
      price: "6,60€",
      hasImage: true,
      specialty: "tempura"
    }
  }
}