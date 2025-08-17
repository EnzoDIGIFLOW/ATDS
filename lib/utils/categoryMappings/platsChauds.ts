// ============================================================================
// 🔥 CATÉGORIE 4: PLATS CHAUDS - MAPPING IMAGES
// ============================================================================
// Mapping exact pour la catégorie Plats Chauds avec système "Bientôt en photo"

export const PLATS_CHAUDS_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE PLATS CHAUDS
  // ============================================================================
  categoryInfo: {
    totalProducts: 20,
    availableImages: 14,
    coverageRate: "70%", // 14/20 produits avec images
    imagesFolders: [
      "/menu/plat chaud /",
      "/menu/soupe miso/",
      "/menu/nouilles/"
    ]
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS LES DOSSIERS
  // ============================================================================
  availableImageFiles: {
    "plat chaud": [
      "Gyoza porc .webp",
      "crevette tempura .webp",
      "gyoza crevette .webp",
      "gyoza poulet curry.webp",
      "nem .webp",
      "samoussa .webp"
    ],
    "soupe miso": [
      "soupe .webp"
    ],
    "nouilles": [
      "nouille teryaki.webp",
      "nouilles crevettes_.webp"
    ]
  },

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES (CORRIGÉES)
  // ============================================================================
  mapping: {
    
    // ✅ SOUPES - Images disponibles
    "Soupe Miso Tofu": "/menu/soupe miso/soupe .webp",
    "Soupe Miso Tofu, Wakame, Ciboulette": "/menu/soupe miso/soupe .webp",
    "Soupe Miso Tofu, Algue Séché, Edamame": "/menu/soupe miso/soupe .webp",

    // ✅ ENTRÉES CHAUDES - Images disponibles (CORRESPONDANCES EXACTES)
    "Crevettes Tempura (X4)": "/menu/plat chaud /crevette tempura .webp",
    "Crevettes Tempura": "/menu/plat chaud /crevette tempura .webp",
    "Gyoza Crevette (X5)": "/menu/plat chaud /gyoza crevette .webp",
    "Gyoza Crevette": "/menu/plat chaud /gyoza crevette .webp",
    "Gyoza Porc (X5)": "/menu/plat chaud /Gyoza porc .webp",
    "Gyoza Porc": "/menu/plat chaud /Gyoza porc .webp",
    "Gyoza Poulet Curry (X5)": "/menu/plat chaud /gyoza poulet curry.webp",
    "Gyoza Poulet Curry": "/menu/plat chaud /gyoza poulet curry.webp",
    "Nem Légumes (X5)": "/menu/plat chaud /nem .webp",
    "Nem Légumes": "/menu/plat chaud /nem .webp",
    "Nem Poulet (X5)": "/menu/plat chaud /nem .webp",
    "Nem Poulet": "/menu/plat chaud /nem .webp",
    "Nem Crevettes (X5)": "/menu/plat chaud /nem .webp",
    "Nem Crevettes": "/menu/plat chaud /nem .webp",
    "Samoussa Bœuf (X5)": "/menu/plat chaud /samoussa .webp",
    "Samoussa Bœuf": "/menu/plat chaud /samoussa .webp",
    "Samoussa Poulet (X5)": "/menu/plat chaud /samoussa .webp",
    "Samoussa Poulet": "/menu/plat chaud /samoussa .webp",

    // ✅ NOUILLES - Images disponibles
    "Nouilles Poulet Teriyaki et Légumes": "/menu/nouilles/nouille teryaki.webp",
    "Nouilles Crevettes et Légumes": "/menu/nouilles/nouilles crevettes_.webp",

    // 📸 PLATS SANS IMAGES → BIENTÔT EN PHOTO
    "Poulet Karaage (X5)": "coming-soon",
    "Poulet Frit": "coming-soon",
    "Yakitori Poulet Caramélisé (X5)": "coming-soon",
    "Poulet Teriyaki": "coming-soon",
    "Nouilles Légumes": "coming-soon",
    "Nouilles Poulet Caramélisé et Légumes": "coming-soon"
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
  // 📈 ANALYSE DE COUVERTURE PAR SOUS-CATÉGORIE
  // ============================================================================
  coverageAnalysis: {
    soupes: {
      total: 3,
      withImages: 3,
      coverage: "100%"
    },
    entreesChauds: {
      total: 10,
      withImages: 9,
      coverage: "90%"
    },
    nouilles: {
      total: 5,
      withImages: 2,
      coverage: "40%"
    },
    platsProteines: {
      total: 2,
      withImages: 0,
      coverage: "0%"
    }
  }
}

// ============================================================================
// 🔧 TYPES ET INTERFACES
// ============================================================================

export interface PlatChaudImageResult {
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

export const getPlatChaudImage = (productName: string): PlatChaudImageResult => {
  const mapping = PLATS_CHAUDS_IMAGE_MAPPING.mapping
  const comingSoonConfig = PLATS_CHAUDS_IMAGE_MAPPING.comingSoonConfig
  
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

export const testPlatsChaudsMapping = () => {

  const testProducts = [
    // Avec images
    "Soupe Miso Tofu",                    // → Image soupe
    "Gyoza Poulet Curry (X5)",            // → Image gyoza curry
    "Crevettes Tempura (X4)",             // → Image tempura
    "Nouilles Poulet Teriyaki et Légumes", // → Image nouilles teriyaki
    
    // Bientôt en photo
    "Poulet Karaage (X5)",                // → Coming soon
    "Yakitori Poulet Caramélisé (X5)",    // → Coming soon
    "Nouilles Légumes"                     // → Coming soon
  ]
  
  let passed = 0
  let failed = 0
  
  testProducts.forEach(product => {
    const result = getPlatChaudImage(product)
    const expected = PLATS_CHAUDS_IMAGE_MAPPING.mapping[product as keyof typeof PLATS_CHAUDS_IMAGE_MAPPING.mapping]
    
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
// 📝 GROUPEMENT LOGIQUE DES PLATS
// ============================================================================

export const PLATS_CHAUDS_GROUPS = {
  soupes: {
    title: "Soupes Miso",
    products: [
      "Soupe Miso Tofu",
      "Soupe Miso Tofu, Wakame, Ciboulette", 
      "Soupe Miso Tofu, Algue Séché, Edamame"
    ],
    hasImages: true
  },
  
  entreesAsiatiques: {
    title: "Entrées Asiatiques",
    products: [
      "Nem Légumes (X5)",
      "Nem Poulet (X5)", 
      "Nem Crevettes (X5)",
      "Gyoza Poulet Curry (X5)",
      "Gyoza Porc (X5)",
      "Gyoza Crevette (X5)",
      "Samoussa Bœuf (X5)",
      "Samoussa Poulet (X5)",
      "Crevettes Tempura (X4)"
    ],
    hasImages: true
  },
  
  nouilles: {
    title: "Nouilles & Plats Principaux",
    products: [
      "Nouilles Légumes",
      "Nouilles Crevettes et Légumes",
      "Nouilles Poulet Teriyaki et Légumes", 
      "Nouilles Poulet Caramélisé et Légumes"
    ],
    hasImages: "partial" // 2/4 avec images
  },
  
  platesPoulet: {
    title: "Spécialités Poulet",
    products: [
      "Poulet Karaage (X5)",
      "Poulet Frit",
      "Yakitori Poulet Caramélisé (X5)",
      "Poulet Teriyaki"
    ],
    hasImages: false
  }
}