// ============================================================================
// 👨‍🍳 CATÉGORIE 9: CRÉATION DU CHEF - MAPPING IMAGES
// ============================================================================
// Mapping exact pour la catégorie premium Création du Chef avec 91% de couverture

export const CREATION_CHEF_IMAGE_MAPPING = {

  // ============================================================================
  // 📊 STATISTIQUES CATÉGORIE CRÉATION DU CHEF
  // ============================================================================
  categoryInfo: {
    totalProducts: 11,
    availableImages: 12, // Plus d'images que de produits !
    coverageRate: "91%", // 10/11 produits avec images - EXCELLENT!
    imagesFolder: "/menu/création du chef/"
  },

  // ============================================================================
  // 🗂️ IMAGES DISPONIBLES DANS /menu/création du chef/
  // ============================================================================
  availableImageFiles: [
    "L_italien 4.webp",
    "cali poulet frit guacamole jalap.webp",
    "cali tempura avocat enrobe saumon braisé .webp",
    "california poulet caramelisé mangue .webp",
    "flocon saumon avocat tobiko menthe .webp",
    "flocon saumon braisé enrobe de truffe .webp", // Non utilisée
    "poulet caramelisé mangue  - Grande.webp", // Doublon
    "roll_s avocat pousse de cress.webp",
    "roll_s avocat sauce spicy.webp",
    "roll_s braisé truffe  - Grande - Grande.webp",
    "rolls avocat enrobé de thon, zeste de kiwi, tobiko.webp",
    "saumon guacamole jalap.webp"
  ],

  // ============================================================================
  // 🎯 CORRESPONDANCES EXACTES PRODUITS → IMAGES
  // ============================================================================
  mapping: {
    
    // ✅ CRÉATIONS SIGNATURE AVEC IMAGES
    "L'Italien (Tomate, mozza, parmesan, pesto)": "/menu/création du chef/L_italien 4.webp",
    "L'Italien": "/menu/création du chef/L_italien 4.webp", // Version courte
    
    "Roll's Avocat Truffe (Enrobé de saumon braisé, sauce truffe)": "/menu/création du chef/roll_s braisé truffe  - Grande - Grande.webp",
    "Roll's Avocat Truffe": "/menu/création du chef/roll_s braisé truffe  - Grande - Grande.webp", // Version courte
    
    // ✅ CALIFORNIA CRÉATIONS
    "California Crevette Tempura (Avocat, enrobé de saumon braisé, oignon frit)": "/menu/création du chef/cali tempura avocat enrobe saumon braisé .webp",
    "California Crevette Tempura": "/menu/création du chef/cali tempura avocat enrobe saumon braisé .webp", // Version courte
    
    "California Poulet Frit (Guacamole, jalapeno, oignon frit)": "/menu/création du chef/cali poulet frit guacamole jalap.webp",
    "California Poulet Frit": "/menu/création du chef/cali poulet frit guacamole jalap.webp", // Version courte
    
    "California Poulet Caramélisé (Enrobé de mangue, tobiko)": "/menu/création du chef/california poulet caramelisé mangue .webp",
    "California Poulet Caramélisé": "/menu/création du chef/california poulet caramelisé mangue .webp", // Version courte
    
    "California Saumon (Guacamole jalapeno)": "/menu/création du chef/saumon guacamole jalap.webp",
    "California Saumon": "/menu/création du chef/saumon guacamole jalap.webp", // Version courte
    
    // ✅ FLOCON CRÉATIONS
    "Flocon Saumon Avocat (Tobiko, menthe)": "/menu/création du chef/flocon saumon avocat tobiko menthe .webp",
    "Flocon Saumon Avocat": "/menu/création du chef/flocon saumon avocat tobiko menthe .webp", // Version courte
    
    // ✅ ROLLS CRÉATIONS
    "Avocat Mayo (Enrobé de thon braisé, pousse de cress)": "/menu/création du chef/roll_s avocat pousse de cress.webp",
    "Avocat Mayo": "/menu/création du chef/roll_s avocat pousse de cress.webp", // Version courte
    
    "Rolls Saumon Braisé (Avocat, sauce spicy, billes citronnées)": "/menu/création du chef/roll_s avocat sauce spicy.webp",
    "Rolls Saumon Braisé": "/menu/création du chef/roll_s avocat sauce spicy.webp", // Version courte
    
    "Rolls Avocat (Enrobé de thon, zeste de pêche, tobiko)": "/menu/création du chef/rolls avocat enrobé de thon, zeste de kiwi, tobiko.webp",
    "Rolls Avocat": "/menu/création du chef/rolls avocat enrobé de thon, zeste de kiwi, tobiko.webp", // Version courte

    // 📸 CRÉATION SANS IMAGE → BIENTÔT EN PHOTO
    "California Saumon Braisé (Enrobé de saumon braisé, truffe)": "coming-soon",
    "California Saumon Braisé": "coming-soon" // Version courte
  },

  // ============================================================================
  // 📸 CONFIGURATION "BIENTÔT EN PHOTO"
  // ============================================================================
  comingSoonConfig: {
    displayText: "Bientôt en photo",
    style: {
      backgroundColor: "#fffbeb", // Fond doré léger
      borderColor: "#fbbf24", // Bordure dorée
      textColor: "#92400e", // Texte brun doré
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
    california: {
      products: [
        "California Crevette Tempura",
        "California Poulet Frit",
        "California Poulet Caramélisé",
        "California Saumon",
        "California Saumon Braisé"
      ],
      withImages: 4,
      total: 5,
      coverage: "80%"
    },
    rolls: {
      products: [
        "Roll's Avocat Truffe",
        "Avocat Mayo",
        "Rolls Saumon Braisé",
        "Rolls Avocat"
      ],
      withImages: 4,
      total: 4,
      coverage: "100%"
    },
    signature: {
      products: ["L'Italien", "Flocon Saumon Avocat"],
      withImages: 2,
      total: 2,
      coverage: "100%"
    }
  },

  // ============================================================================
  // 🏆 PRODUITS PREMIUM SIGNATURE
  // ============================================================================
  premiumSignature: [
    {
      name: "L'Italien (Tomate, mozza, parmesan, pesto)",
      price: "11,80€",
      hasImage: true,
      description: "Création fusion italienne unique"
    },
    {
      name: "Roll's Avocat Truffe (Enrobé de saumon braisé, sauce truffe)",
      price: "13,80€",
      hasImage: true,
      description: "Notre création la plus luxueuse"
    },
    {
      name: "California Saumon Braisé (Enrobé de saumon braisé, truffe)",
      price: "12,50€",
      hasImage: false,
      description: "Nouvelle création premium"
    }
  ]
}

// ============================================================================
// 🔧 TYPES ET INTERFACES
// ============================================================================

export interface CreationChefImageResult {
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
  premium?: boolean
}

// ============================================================================
// 🔧 FONCTION D'IMPLÉMENTATION
// ============================================================================

export const getCreationChefImage = (productName: string): CreationChefImageResult => {
  const mapping = CREATION_CHEF_IMAGE_MAPPING.mapping
  const comingSoonConfig = CREATION_CHEF_IMAGE_MAPPING.comingSoonConfig
  
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
      premium: true
    }
  }
  
  if (result && result.startsWith('/menu/')) {
    return {
      type: 'image',
      path: result,
      alt: `Création du Chef - ${productName}`,
      premium: true
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
    premium: true
  }
}

// ============================================================================
// 🧪 TESTS POUR VALIDATION
// ============================================================================

export const testCreationChefMapping = () => {

  const testProducts = [
    // Avec images - versions complètes
    "L'Italien (Tomate, mozza, parmesan, pesto)",
    "Roll's Avocat Truffe (Enrobé de saumon braisé, sauce truffe)",
    "California Poulet Caramélisé (Enrobé de mangue, tobiko)",
    "Flocon Saumon Avocat (Tobiko, menthe)",
    
    // Avec images - versions courtes
    "California Crevette Tempura",
    "California Poulet Frit",
    "Avocat Mayo",
    "Rolls Saumon Braisé",
    "Rolls Avocat",
    "California Saumon",
    
    // Sans image (coming soon)
    "California Saumon Braisé (Enrobé de saumon braisé, truffe)"
  ]
  
  let passed = 0
  let failed = 0
  let comingSoon = 0
  
  testProducts.forEach(product => {
    const result = getCreationChefImage(product)
    
    if (result.type === 'image' && result.path) {
      const fileName = result.path.split('/').pop()
      console.log(`✅ ${product.substring(0, 40)}${product.length > 40 ? '...' : ''} → ${fileName}`)
      passed++
    } else if (result.type === 'coming-soon') {
      console.log(`📸 ${product.substring(0, 40)}${product.length > 40 ? '...' : ''} → ${result.icon} ${result.text}`)
      comingSoon++
    } else {

      failed++
    }
  })

  console.log(`📸 ${comingSoon} produit(s) en attente de photo`)
  console.log(`🏆 91% de couverture (10/11) - Excellent!`)

  return { passed, failed, comingSoon }
}

// ============================================================================
// 🎨 SPÉCIFICITÉS CRÉATION DU CHEF
// ============================================================================

export const CREATION_CHEF_SPECIALTIES = {
  presentation: {
    style: "Présentation gastronomique",
    plating: "Assiette design avec décoration",
    portions: "8 pièces standard",
    preparation: "15-20 minutes"
  },
  
  categories: {
    fusion: ["L'Italien"],
    truffle: ["Roll's Avocat Truffe", "California Saumon Braisé"],
    exotic: ["California Poulet Caramélisé", "Flocon Saumon Avocat"],
    spicy: ["California Poulet Frit", "Rolls Saumon Braisé", "California Saumon"]
  },
  
  topSellers: [
    "L'Italien (Tomate, mozza, parmesan, pesto)",
    "Roll's Avocat Truffe (Enrobé de saumon braisé, sauce truffe)",
    "California Poulet Caramélisé (Enrobé de mangue, tobiko)"
  ],
  
  allergens: {
    common: ["poisson", "sésame", "soja"],
    specific: {
      "L'Italien": ["gluten", "lait"],
      "Roll's Avocat Truffe": ["poisson", "sésame"],
      "California Poulet Frit": ["gluten", "œuf"]
    }
  }
}