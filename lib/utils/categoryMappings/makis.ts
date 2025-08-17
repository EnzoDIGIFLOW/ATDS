// ============================================================================
// 🍙 CATÉGORIE 5: MAKIS PAR 6 - MAPPING IMAGES
// ============================================================================
// Mapping exact pour la catégorie Makis par 6 avec système "Bientôt en photo"

export const MAKIS_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE MAKIS PAR 6
  // ============================================================================
  categoryInfo: {
    totalProducts: 14,
    availableImages: 9,
    coverageRate: "64%", // 9/14 produits avec images
    imagesFolder: "/menu/maki/"
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS /menu/maki/
  // ============================================================================
  availableImageFiles: [
    "makis avocat amyo .webp",
    "makis cheese .webp",
    "makis concombre cheese .webp",
    "makis poulet cheese .webp",
    "makis poulet curry .webp",
    "makis poulet mayo .webp",
    "makis saumon .webp",
    "makis saumon cheese .webp",
    "makis thon cheese .webp"
  ],

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES
  // ============================================================================
  mapping: {
    
    // ✅ MAKIS AVEC IMAGES CORRESPONDANTES
    "Cheese": "/menu/maki/makis cheese .webp",
    "Concombre, Cheese": "/menu/maki/makis concombre cheese .webp",
    "Avocat": "/menu/maki/makis avocat amyo .webp",
    "Avocat, Mayo": "/menu/maki/makis avocat amyo .webp", // Même image (avocat mayo)
    "Poulet, Cheese": "/menu/maki/makis poulet cheese .webp",
    "Poulet Curry": "/menu/maki/makis poulet curry .webp",
    "Poulet, Mayonnaise": "/menu/maki/makis poulet mayo .webp",
    "Saumon": "/menu/maki/makis saumon .webp",
    "Saumon, Cheese": "/menu/maki/makis saumon cheese .webp",
    "Thon, Cheese": "/menu/maki/makis thon cheese .webp",

    // 📸 MAKIS SANS IMAGES → BIENTÔT EN PHOTO
    "Thon": "coming-soon",
    "Thon, Mayonnaise": "coming-soon",
    "Gambas": "coming-soon",
    "Thon, Avocat": "coming-soon"
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
    fromage: {
      products: ["Cheese", "Concombre, Cheese", "Poulet, Cheese", "Saumon, Cheese", "Thon, Cheese"],
      withImages: 5,
      total: 5,
      coverage: "100%"
    },
    avocat: {
      products: ["Avocat", "Avocat, Mayo", "Thon, Avocat"],
      withImages: 2,
      total: 3,
      coverage: "67%"
    },
    saumon: {
      products: ["Saumon", "Saumon, Cheese"],
      withImages: 2,
      total: 2,
      coverage: "100%"
    },
    poulet: {
      products: ["Poulet, Cheese", "Poulet Curry", "Poulet, Mayonnaise"],
      withImages: 3,
      total: 3,
      coverage: "100%"
    },
    thon: {
      products: ["Thon", "Thon, Mayonnaise", "Thon, Cheese", "Thon, Avocat"],
      withImages: 1,
      total: 4,
      coverage: "25%"
    },
    autres: {
      products: ["Gambas"],
      withImages: 0,
      total: 1,
      coverage: "0%"
    }
  },

  // ============================================================================
  // 🎯 PRODUITS POPULAIRES AVEC IMAGES
  // ============================================================================
  popularWithImages: [
    "Saumon",
    "Saumon, Cheese", 
    "Avocat",
    "Cheese",
    "Poulet, Cheese"
  ]
}

// ============================================================================
// 🔧 TYPES ET INTERFACES
// ============================================================================

export interface MakiImageResult {
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

export const getMakiImage = (productName: string): MakiImageResult => {
  const mapping = MAKIS_IMAGE_MAPPING.mapping
  const comingSoonConfig = MAKIS_IMAGE_MAPPING.comingSoonConfig
  
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
      alt: `Maki ${productName}`
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

export const testMakisMapping = () => {

  const testProducts = [
    // Avec images - Populaires
    "Saumon",                    // → Image saumon
    "Cheese",                    // → Image cheese
    "Avocat",                    // → Image avocat mayo
    "Poulet, Cheese",            // → Image poulet cheese
    
    // Avec images - Spéciaux
    "Concombre, Cheese",         // → Image concombre cheese
    "Poulet Curry",              // → Image poulet curry
    
    // Bientôt en photo
    "Thon",                      // → Coming soon
    "Gambas",                    // → Coming soon
    "Thon, Avocat"               // → Coming soon
  ]
  
  let passed = 0
  let failed = 0
  
  testProducts.forEach(product => {
    const result = getMakiImage(product)
    const expected = MAKIS_IMAGE_MAPPING.mapping[product as keyof typeof MAKIS_IMAGE_MAPPING.mapping]
    
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
// 🏆 PRIORITÉS D'AFFICHAGE POUR LE MENU
// ============================================================================

export const MAKIS_DISPLAY_PRIORITY = {
  // Produits avec images à mettre en avant
  withImages: [
    { name: "Saumon", price: "5,80€", popular: true },
    { name: "Saumon, Cheese", price: "6,20€", popular: true },
    { name: "Cheese", price: "4,90€", popular: true },
    { name: "Avocat", price: "4,90€", popular: true },
    { name: "Poulet, Cheese", price: "5,40€", popular: true },
    { name: "Concombre, Cheese", price: "4,90€", popular: false },
    { name: "Avocat, Mayo", price: "5,10€", popular: false },
    { name: "Poulet Curry", price: "5,40€", popular: false },
    { name: "Poulet, Mayonnaise", price: "5,50€", popular: false },
    { name: "Thon, Cheese", price: "6,80€", popular: false }
  ],
  
  // Produits sans images
  comingSoon: [
    { name: "Thon", price: "6,60€" },
    { name: "Thon, Mayonnaise", price: "6,70€" },
    { name: "Gambas", price: "6,90€" },
    { name: "Thon, Avocat", price: "6,90€" }
  ]
}