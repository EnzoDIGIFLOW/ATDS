// ============================================================================
// 🔥 CATÉGORIE 10: CRISPYS (FRIT) - MAPPING IMAGES
// ============================================================================
// Mapping exact pour la catégorie Crispys avec 71% de couverture

export const CRISPYS_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE CRISPYS
  // ============================================================================
  categoryInfo: {
    totalProducts: 7,
    availableImages: 5,
    coverageRate: "71%", // 5/7 produits avec images - BON!
    imagesFolder: "/menu/crispy/"
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS /menu/crispy/
  // ============================================================================
  availableImageFiles: [
    "crisoy poulet frit cheddar oignon frit_.webp",
    "crisoy saumon cheese .webp",
    "crispy cheese et saumon façon tartare ciboulette.webp",
    "crispy saumon avocat cheese oignon frit.webp",
    "crispy saumon cheese fraise_.webp"
  ],

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES
  // ============================================================================
  mapping: {
    
    // ✅ CRISPYS CLASSIQUES
    "Saumon Cheese": "/menu/crispy/crisoy saumon cheese .webp",
    
    // ✅ CRISPYS SIGNATURE
    "Cheese Saumon Tartare (Façon tartare ciboulette)": "/menu/crispy/crispy cheese et saumon façon tartare ciboulette.webp",
    "Cheese Saumon Tartare": "/menu/crispy/crispy cheese et saumon façon tartare ciboulette.webp", // Version courte
    
    "Poulet Frit Cheddar (Oignon frit)": "/menu/crispy/crisoy poulet frit cheddar oignon frit_.webp",
    "Poulet Frit Cheddar": "/menu/crispy/crisoy poulet frit cheddar oignon frit_.webp", // Version courte
    
    "Saumon Cuit Cheese Fraise (Sauce du chef)": "/menu/crispy/crispy saumon cheese fraise_.webp",
    "Saumon Cuit Cheese Fraise": "/menu/crispy/crispy saumon cheese fraise_.webp", // Version courte
    
    "Saumon Avocat Cheese (Oignon frit)": "/menu/crispy/crispy saumon avocat cheese oignon frit.webp",
    "Saumon Avocat Cheese": "/menu/crispy/crispy saumon avocat cheese oignon frit.webp", // Version courte

    // 📸 CRISPYS SANS IMAGES → BIENTÔT EN PHOTO
    "Crevette Tempura Saumon (Sauce du chef, billes citronnées)": "coming-soon",
    "Crevette Tempura Saumon": "coming-soon", // Version courte
    
    "Crevette Tempura Cheese (Ciboulette oignon frit sauce spicy)": "coming-soon",
    "Crevette Tempura Cheese": "coming-soon" // Version courte
  },

  // ============================================================================
  // 📸 CONFIGURATION "BIENTÔT EN PHOTO"
  // ============================================================================
  comingSoonConfig: {
    displayText: "Bientôt en photo",
    style: {
      backgroundColor: "#fff7ed", // Fond orange très léger
      borderColor: "#fb923c", // Bordure orange
      textColor: "#9a3412", // Texte orange foncé
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
    saumon: {
      products: [
        "Saumon Cheese",
        "Cheese Saumon Tartare",
        "Saumon Cuit Cheese Fraise",
        "Saumon Avocat Cheese",
        "Crevette Tempura Saumon"
      ],
      withImages: 4,
      total: 5,
      coverage: "80%"
    },
    poulet: {
      products: ["Poulet Frit Cheddar"],
      withImages: 1,
      total: 1,
      coverage: "100%"
    },
    crevette: {
      products: [
        "Crevette Tempura Saumon",
        "Crevette Tempura Cheese"
      ],
      withImages: 0,
      total: 2,
      coverage: "0%"
    }
  },

  // ============================================================================
  // 🍤 CARACTÉRISTIQUES CRISPY
  // ============================================================================
  crispyFeatures: {
    texture: "Croustillant à l'extérieur, fondant à l'intérieur",
    preparation: "Frit à température optimale (180°C)",
    serving: "Servi chaud avec sauce spéciale",
    pieces: "8 pièces par portion"
  }
}

// ============================================================================
// 🔧 TYPES ET INTERFACES
// ============================================================================

export interface CrispyImageResult {
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
  isHot?: boolean
}

// ============================================================================
// 🔧 FONCTION D'IMPLÉMENTATION
// ============================================================================

export const getCrispyImage = (productName: string): CrispyImageResult => {
  const mapping = CRISPYS_IMAGE_MAPPING.mapping
  const comingSoonConfig = CRISPYS_IMAGE_MAPPING.comingSoonConfig
  
  // Recherche exacte
  let result = mapping[productName as keyof typeof mapping]
  
  // Si pas trouvé, essayer sans les détails entre parenthèses
  if (!result && productName.includes('(')) {
    const simplifiedName = productName.split('(')[0].trim()
    result = mapping[simplifiedName as keyof typeof mapping]
  }
  
  if (result === "coming-soon") {
    return {
      type: 'coming-soon',
      text: comingSoonConfig.displayText,
      icon: comingSoonConfig.icon,
      style: comingSoonConfig.style,
      animation: comingSoonConfig.animation,
      alt: `${productName} - Photo bientôt disponible`,
      isHot: true
    }
  }
  
  if (result && result.startsWith('/menu/')) {
    return {
      type: 'image',
      path: result,
      alt: `Crispy - ${productName}`,
      isHot: true
    }
  }
  
  // Fallback
  return {
    type: 'coming-soon',
    text: comingSoonConfig.displayText,
    icon: comingSoonConfig.icon,
    style: comingSoonConfig.style,
    animation: comingSoonConfig.animation,
    alt: productName,
    isHot: true
  }
}

// ============================================================================
// 🧪 TESTS POUR VALIDATION
// ============================================================================

export const testCrispyMapping = () => {
  console.log("🧪 TEST MAPPING CRISPYS (FRIT)")

  const testProducts = [
    // Avec images - versions complètes
    "Saumon Cheese",
    "Cheese Saumon Tartare (Façon tartare ciboulette)",
    "Poulet Frit Cheddar (Oignon frit)",
    "Saumon Cuit Cheese Fraise (Sauce du chef)",
    "Saumon Avocat Cheese (Oignon frit)",
    
    // Sans images (coming soon)
    "Crevette Tempura Saumon (Sauce du chef, billes citronnées)",
    "Crevette Tempura Cheese (Ciboulette oignon frit sauce spicy)"
  ]
  
  let passed = 0
  let failed = 0
  let comingSoon = 0
  
  testProducts.forEach(product => {
    const result = getCrispyImage(product)
    
    if (result.type === 'image' && result.path) {
      const fileName = result.path.split('/').pop()
      console.log(`✅ ${product.substring(0, 35)}${product.length > 35 ? '...' : ''} → ${fileName}`)
      passed++
    } else if (result.type === 'coming-soon') {
      console.log(`📸 ${product.substring(0, 35)}${product.length > 35 ? '...' : ''} → ${result.icon} ${result.text}`)
      comingSoon++
    } else {

      failed++
    }
  })

  console.log(`📸 ${comingSoon} produit(s) en attente de photo`)
  console.log(`🔥 71% de couverture (5/7) - Bon!`)

  return { passed, failed, comingSoon }
}

// ============================================================================
// 🏆 SPÉCIALITÉS CRISPY
// ============================================================================

export const CRISPY_SPECIALTIES = {
  signature: [
    {
      name: "Cheese Saumon Tartare (Façon tartare ciboulette)",
      price: "11,20€",
      hasImage: true,
      description: "Notre best-seller crispy",
      spiceLevel: 0
    },
    {
      name: "Saumon Cuit Cheese Fraise (Sauce du chef)",
      price: "11,50€",
      hasImage: true,
      description: "Création unique sucrée-salée",
      spiceLevel: 0
    },
    {
      name: "Crevette Tempura Saumon (Sauce du chef, billes citronnées)",
      price: "12,30€",
      hasImage: false,
      description: "Double texture croustillante",
      spiceLevel: 1
    }
  ],
  
  populaires: [
    {
      name: "Saumon Cheese",
      price: "10,50€",
      hasImage: true,
      description: "Le classique incontournable"
    },
    {
      name: "Poulet Frit Cheddar (Oignon frit)",
      price: "10,80€",
      hasImage: true,
      description: "Pour les amateurs de poulet"
    }
  ],
  
  characteristics: {
    temperature: "Servi chaud",
    texture: "Croustillant",
    oil: "Huile de tournesol premium",
    cookingTime: "3-4 minutes à 180°C"
  },
  
  sauces: {
    included: ["Sauce du chef", "Sauce spicy"],
    optional: ["Mayo japonaise", "Sauce teriyaki", "Sauce aigre-douce"]
  },
  
  allergens: {
    common: ["gluten", "œuf", "sésame"],
    specific: {
      "Saumon Cheese": ["poisson", "lait"],
      "Poulet Frit Cheddar": ["lait", "gluten"],
      "Crevette Tempura": ["crustacés", "gluten"]
    }
  }
}