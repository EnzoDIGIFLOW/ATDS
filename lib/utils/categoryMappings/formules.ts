// ============================================================================
// 🍱 CATÉGORIE 2: FORMULES DU MIDI - MAPPING IMAGES
// ============================================================================
// Mapping exact pour la catégorie Formules du Midi avec système "Bientôt en photo"

export const FORMULES_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE FORMULES DU MIDI
  // ============================================================================
  categoryInfo: {
    totalProducts: 3,
    availableImages: 1,
    coverageRate: "33%", // 1/3 produits avec images
    imagesFolder: "/menu/formule du midi /"
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS /menu/formule du midi /
  // ============================================================================
  availableImageFiles: [
    "Formule A jpg.webp"
  ],

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES
  // ============================================================================
  mapping: {
    
    // ✅ PRODUIT AVEC IMAGE DISPONIBLE
    "Formule A": "/menu/formule du midi /Formule A jpg.webp",

    // 📸 PRODUITS EN ATTENTE DE PHOTOS → MENTION "BIENTÔT EN PHOTO"
    "Formule B": "coming-soon",
    "Formule C": "coming-soon"
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
    animation: "subtle-pulse" // Animation discrète
  }
}

// ============================================================================
// 🔧 TYPES ET INTERFACES
// ============================================================================

export interface FormuleImageResult {
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

export const getFormuleImage = (productName: string): FormuleImageResult => {
  const mapping = FORMULES_IMAGE_MAPPING.mapping
  const comingSoonConfig = FORMULES_IMAGE_MAPPING.comingSoonConfig
  
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
  
  // Fallback (ne devrait pas arriver pour les formules)
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

export const testFormulesMapping = () => {

  const testProducts = [
    "Formule A",  // Devrait avoir une image
    "Formule B",  // Devrait afficher "Bientôt en photo"
    "Formule C"   // Devrait afficher "Bientôt en photo"
  ]
  
  let passed = 0
  let failed = 0
  
  testProducts.forEach(product => {
    const result = getFormuleImage(product)
    const expected = FORMULES_IMAGE_MAPPING.mapping[product as keyof typeof FORMULES_IMAGE_MAPPING.mapping]
    
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