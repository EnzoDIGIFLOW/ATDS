/**
 * Système intelligent de correspondance automatique entre les noms de produits et les images
 */

// Cache pour les correspondances déjà trouvées
const imageCache = new Map<string, string | null>()

// Liste des images disponibles (sera chargée dynamiquement)
let availableImages: string[] | null = null

/**
 * Normalise un nom pour la comparaison
 */
const normalizeName = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[''']/g, '') // Supprime les apostrophes
    .replace(/n°/g, '') // Supprime N°
    .replace(/°/g, '') // Supprime °
    .replace(/[^\w\s-]/g, '') // Garde seulement lettres, chiffres, espaces, tirets
    .replace(/\s+/g, '-') // Remplace espaces par tirets
    .replace(/-+/g, '-') // Évite les tirets multiples
    .replace(/^-|-$/g, '') // Supprime tirets début/fin
    .trim()
}

/**
 * Normalise un nom pour correspondre aux fichiers avec espaces
 */
const normalizeForFile = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[''']/g, '') // Supprime les apostrophes
    .replace(/n°/g, '') // Supprime N°
    .replace(/°/g, '') // Supprime °
    .replace(/[^\w\s-]/g, '') // Garde seulement lettres, chiffres, espaces, tirets
    .trim()
}

/**
 * Extrait les mots-clés principaux d'un nom de produit
 */
const extractKeywords = (productName: string): string[] => {
  const normalized = normalizeName(productName)
  const words = normalized.split('-').filter(w => w.length > 2)
  
  // Mots-clés prioritaires
  const priorityWords = ['saumon', 'thon', 'crevette', 'avocat', 'california', 
    'maki', 'sushi', 'sashimi', 'poke', 'bowl', 'wagyu', 'tempura', 'spring', 
    'crispy', 'roll', 'tartare', 'chirashi', 'plateau']
  
  // Trier par priorité
  return words.sort((a, b) => {
    const aPriority = priorityWords.includes(a) ? 0 : 1
    const bPriority = priorityWords.includes(b) ? 0 : 1
    return aPriority - bPriority
  })
}

/**
 * Calcule un score de similarité entre deux chaînes
 */
const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = normalizeName(str1)
  const s2 = normalizeName(str2)
  
  // Correspondance exacte
  if (s1 === s2) return 100
  
  // L'un contient l'autre
  if (s1.includes(s2) || s2.includes(s1)) return 80
  
  // Calcul de similarité par mots-clés communs
  const words1 = s1.split('-')
  const words2 = s2.split('-')
  const commonWords = words1.filter(w => words2.includes(w))
  
  if (commonWords.length === 0) return 0
  
  const similarity = (commonWords.length / Math.max(words1.length, words2.length)) * 100
  return Math.round(similarity)
}

/**
 * Détermine la catégorie d'un produit basée sur son nom
 */
const detectCategory = (productName: string, menuCategory?: string): string => {
  const normalized = normalizeName(productName + ' ' + (menuCategory || ''))
  
  // Mapping des patterns vers les dossiers
  const categoryPatterns: Record<string, string[]> = {
    'sushis': ['sushi', 'nigiri'],
    'sashimi': ['sashimi'],
    'makis': ['maki', 'maki-'],
    'california': ['california', 'cali'],
    'rolls': ['roll', 'rolls'],
    'spring': ['spring'],
    'crispy': ['crispy'],
    'flocon': ['flocon'],
    'tartare': ['tartare'],
    'buritos': ['burito', 'burrito'],
    'plats-chauds': ['plat-chaud', 'tempura', 'yakitori', 'gyoza'],
    'nouilles': ['nouille', 'ramen', 'udon', 'soba'],
    'poke-bowls': ['poke', 'bowl'],
    'chirashi': ['chirashi'],
    'plateaux': ['plateau', 'assortiment', 'box'],
    'formules': ['formule', 'menu'],
    'accompagnements': ['accompagnement', 'riz', 'salade', 'soupe-miso'],
    'desserts': ['dessert', 'glace', 'dorayaki'],
    'mochis': ['mochi'],
    'boissons': ['boisson', 'coca', 'eau', 'the', 'biere', 'sake'],
    'soupes': ['soupe'],
    'creation-chef': ['creation', 'chef', 'special']
  }
  
  // Cherche la meilleure correspondance
  for (const [folder, patterns] of Object.entries(categoryPatterns)) {
    for (const pattern of patterns) {
      if (normalized.includes(pattern)) {
        return folder
      }
    }
  }
  
  // Fallback vers 'autres' si aucune catégorie trouvée
  return 'autres'
}

/**
 * Trouve la meilleure correspondance d'image pour un produit
 */
export const findBestImageMatch = async (
  productName: string, 
  menuCategory?: string
): Promise<string | null> => {
  // Vérifier le cache
  const cacheKey = `${productName}-${menuCategory || ''}`
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey) || null
  }
  
  // Détecter la catégorie
  const category = detectCategory(productName, menuCategory)
  const normalizedName = normalizeName(productName)
  
  // Construire les chemins possibles dans l'ordre de priorité
  const possiblePaths: string[] = []
  const fileNameWithSpaces = normalizeForFile(productName)
  
  // 1. Correspondance exacte dans la catégorie détectée (avec espaces)
  possiblePaths.push(`/menu/${category}/${fileNameWithSpaces}.webp`)
  // 2. Correspondance exacte dans la catégorie détectée (avec tirets)
  possiblePaths.push(`/menu/${category}/${normalizedName}.webp`)
  
  // 2. Gestion des numéros pour les poke bowls
  if (productName.toLowerCase().includes('poke') || productName.includes('N°')) {
    const numberMatch = productName.match(/(?:N°|n°|#)?(\d+)/)
    if (numberMatch) {
      const number = numberMatch[1]
      possiblePaths.push(`/menu/poke-bowls/POKE ${number}.webp`)
      possiblePaths.push(`/menu/poke-bowls/poke ${number}.webp`)
      possiblePaths.push(`/menu/poke-bowls/poke-${number}.webp`)
    }
  }
  
  // 3. Essayer avec les mots-clés principaux
  const keywords = extractKeywords(productName)
  if (keywords.length > 0) {
    // Essayer le premier mot-clé
    possiblePaths.push(`/menu/${category}/${keywords[0]}.webp`)
    
    // Essayer une combinaison des 2 premiers mots-clés (avec espace)
    if (keywords.length > 1) {
      possiblePaths.push(`/menu/${category}/${keywords[0]} ${keywords[1]}.webp`)
      possiblePaths.push(`/menu/${category}/${keywords[0]}-${keywords[1]}.webp`)
    }
  }
  
  // 4. Chercher dans 'autres' si pas trouvé dans la catégorie
  if (category !== 'autres') {
    possiblePaths.push(`/menu/autres/${fileNameWithSpaces}.webp`)
    possiblePaths.push(`/menu/autres/${normalizedName}.webp`)
    if (keywords.length > 0) {
      possiblePaths.push(`/menu/autres/${keywords[0]}.webp`)
    }
  }
  
  // 5. Chercher dans 'restaurant' pour les images génériques
  possiblePaths.push(`/menu/restaurant/${fileNameWithSpaces}.webp`)
  possiblePaths.push(`/menu/restaurant/${normalizedName}.webp`)
  
  // 6. Cas spéciaux pour certains produits connus
  if (productName.toLowerCase().includes('saumon')) {
    possiblePaths.push('/menu/restaurant/sushi saumon tobiko sauce spicy .webp')
  }
  if (productName.toLowerCase().includes('wagyu')) {
    possiblePaths.push('/menu/restaurant/wagyu .webp')
  }
  if (productName.toLowerCase().includes('sashimi')) {
    possiblePaths.push('/menu/restaurant/sashimi duo .webp')
  }
  
  // Tester chaque chemin (en production, on devrait faire une vraie vérification)
  for (const path of possiblePaths) {
    // Pour l'instant, on retourne le premier chemin construit
    // En production, il faudrait vérifier que le fichier existe vraiment
    if (path) {
      imageCache.set(cacheKey, path)
      return path
    }
  }
  
  // Aucune correspondance trouvée
  imageCache.set(cacheKey, null)
  return null
}

/**
 * Précharge les correspondances pour une liste de produits
 */
export const preloadImageMappings = async (products: Array<{name: string, category?: string}>) => {
  const promises = products.map(p => findBestImageMatch(p.name, p.category))
  await Promise.all(promises)
}

/**
 * Réinitialise le cache (utile pour le développement)
 */
export const clearImageCache = () => {
  imageCache.clear()
}

/**
 * Fonction helper pour obtenir le chemin d'image ou null
 */
export const getProductImagePath = (productName: string, category?: string): string | null => {
  // Version synchrone qui utilise le cache
  const cacheKey = `${productName}-${category || ''}`
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey) || null
  }
  
  // Si pas en cache, générer un chemin probable
  const detectedCategory = detectCategory(productName, category)
  const fileNameWithSpaces = normalizeForFile(productName)
  
  // Gérer les cas spéciaux des poke bowls
  if (productName.toLowerCase().includes('poke') || productName.includes('N°')) {
    const numberMatch = productName.match(/(?:N°|n°|#)?(\d+)/)
    if (numberMatch) {
      return `/menu/poke-bowls/POKE ${numberMatch[1]}.webp`
    }
  }
  
  // Cas spéciaux pour certains produits
  if (productName.toLowerCase().includes('saumon') && productName.toLowerCase().includes('tobiko')) {
    return '/menu/restaurant/sushi saumon tobiko sauce spicy .webp'
  }
  if (productName.toLowerCase().includes('wagyu')) {
    return '/menu/restaurant/wagyu .webp'
  }
  if (productName.toLowerCase().includes('sashimi') && productName.toLowerCase().includes('duo')) {
    return '/menu/restaurant/sashimi duo .webp'
  }
  
  // Essayer d'abord avec les espaces
  return `/menu/${detectedCategory}/${fileNameWithSpaces}.webp`
}