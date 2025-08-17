// ============================================================================
// 🍤 CATÉGORIE 3: PLATEAUX - MAPPING IMAGES
// ============================================================================
// Mapping exact pour la catégorie Plateaux avec système "Bientôt en photo"

export const PLATEAUX_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE PLATEAUX
  // ============================================================================
  categoryInfo: {
    totalProducts: 12,
    availableImages: 10,
    coverageRate: "75%", // 9/12 produits avec images
    imagesFolder: "/menu/plateaux /"
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS /menu/plateaux /
  // ============================================================================
  availableImageFiles: [
    "Box sushi mix 12pcs .webp",
    "box california 18pcs  .webp",
    "box makis 18pcs .webp",
    "box sushi saumon 10pcs.webp",
    "love box - Grande.webp",
    "ox sushi mix.webp",
    "plateau 60 pcs.webp",
    "plateau 6£0 pcs.webp",  // Note: fichier avec caractère spécial
    "plateau chaud  26 pièces .webp",
    "super box .webp"
  ],

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES
  // ============================================================================
  mapping: {
    
    // ✅ PRODUITS AVEC IMAGES CORRESPONDANTES
    "Plateau Makis (18 pièces)": "/menu/plateaux /box makis 18pcs .webp",
    "Super Box (14 pièces)": "/menu/plateaux /super box .webp",
    "Plateau California (18 pièces)": "/menu/plateaux /box california 18pcs  .webp",
    "Box Sushi Saumon (10 pièces)": "/menu/plateaux /box sushi saumon 10pcs.webp",
    "Box Sushi Mix (12 pièces)": "/menu/plateaux /Box sushi mix 12pcs .webp",
    "Love Box (24 pièces)": "/menu/plateaux /love box - Grande.webp",
    "Plateau (60 pièces)": "/menu/plateaux /plateau 60 pcs.webp",
    "Plateaux Chaud (26 pièces)": "/menu/plateaux /plateau chaud  26 pièces .webp",

    // 📸 PRODUITS SANS IMAGES → MENTION "BIENTÔT EN PHOTO"
    "Chicken Box (24 pièces)": "coming-soon",
    "Calibox (30 pièces)": "coming-soon", 
    "Box Sushi Duo (20 pièces)": "coming-soon",
    "Family Box (46 pièces)": "coming-soon"
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
  // 📝 IMAGES NON UTILISÉES (DISPONIBLES)
  // ============================================================================
  unusedImages: [
    "/menu/plateaux /ox sushi mix.webp",        // Variante de Box sushi mix
    "/menu/plateaux /plateau 6£0 pcs.webp"      // Doublon avec caractère spécial
  ],

  // ============================================================================
  // 🔄 SUGGESTIONS D'AMÉLIORATION
  // ============================================================================
  suggestions: {
    "Chicken Box (24 pièces)": "Pourrait utiliser une photo du plateau chaud comme référence",
    "Calibox (30 pièces)": "Pourrait utiliser l'image california comme base",
    "Box Sushi Duo (20 pièces)": "Pourrait combiner deux images sushi",
    "Family Box (46 pièces)": "Pourrait créer un montage des différents plateaux"
  }
}

// ============================================================================
// 🔧 TYPES ET INTERFACES
// ============================================================================

export interface PlateauImageResult {
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

export const getPlateauImage = (productName: string): PlateauImageResult => {
  const mapping = PLATEAUX_IMAGE_MAPPING.mapping
  const comingSoonConfig = PLATEAUX_IMAGE_MAPPING.comingSoonConfig
  
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
      alt: productName
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

export const testPlateauxMapping = () => {

  const testProducts = [
    "Box Sushi Mix (12 pièces)",    // Devrait avoir une image
    "Love Box (24 pièces)",          // Devrait avoir une image
    "Plateau California (18 pièces)", // Devrait avoir une image
    "Super Box (14 pièces)",          // Devrait avoir une image
    "Chicken Box (24 pièces)",       // Devrait afficher "Bientôt en photo"
    "Family Box (46 pièces)"         // Devrait afficher "Bientôt en photo"
  ]
  
  let passed = 0
  let failed = 0
  
  testProducts.forEach(product => {
    const result = getPlateauImage(product)
    const expected = PLATEAUX_IMAGE_MAPPING.mapping[product as keyof typeof PLATEAUX_IMAGE_MAPPING.mapping]
    
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