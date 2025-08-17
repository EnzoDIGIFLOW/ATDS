/**
 * Système de mapping basé sur la structure d'images existante dans /public/menu/
 */

// Mapping des catégories du menu vers les dossiers existants
const categoryToFolderMapping: Record<string, string> = {
  // Formules du midi
  'Formules du Midi': 'formules',
  
  // Plateaux
  'Plateaux': 'plateaux',
  // Makis
  'Makis par 6': 'makis',
  'Makis': 'makis',
  
  // California
  'California par 6': 'california',
  'California': 'california',
  
  // Sushis
  'Sushi à l\'unité': 'sushis',
  'Sushis': 'sushis',
  'Sushi': 'sushis',
  
  // Sashimis
  'Sashimi par 5': 'sashimi',
  'Sashimi par 6': 'sashimi',
  'Sashimis': 'sashimi',
  'Sashimi': 'sashimi',
  
  // Spring
  'Spring par 6': 'spring',
  'Spring': 'spring',
  
  // Rolls
  'Rolls par 6': 'rolls',
  "Roll's par 6": 'rolls',
  'Roll': 'rolls',
  'Rolls': 'rolls',
  
  // Crispy
  'Crispy par 6': 'crispy',
  'Crispys (frit) par 6': 'crispy',
  'Crispy': 'crispy',
  
  // Flocon
  'Flocon par 6': 'flocon',
  'Flocon': 'flocon',
  
  // Tartare
  'Tartare': 'tartare',
  
  // Chirashi
  'Chirashi': 'chirashi',
  'Chirashi 10 tranches': 'chirashi',
  
  // Poke Bowls
  'Poke Bowl sur lit de riz': 'poke-bowls',
  'Poke Bowls': 'poke-bowls',
  'Poke Bowl': 'poke-bowls',
  
  // Buritos
  'Buritos': 'buritos',
  
  // Plateaux
  'Plateaux à partager': 'plateaux',
  'Plateaux': 'plateaux',
  'Plateau': 'plateaux',
  
  // Formules
  'Les Formules': 'formules',
  'Formules': 'formules',
  'Formule': 'formules',
  
  // Création du chef
  'Les Créations du Chef': 'creation-chef',
  'Créations du Chef': 'creation-chef',
  'Création du Chef par 6': 'creation-chef',
  'Création Chef': 'creation-chef',
  
  // Plats chauds
  'Plats Chauds': 'plats-chauds',
  
  // Nouilles
  'Nouilles': 'nouilles',
  
  // Soupes
  'Soupes': 'soupes',
  'Soupe': 'soupes',
  
  // Accompagnements
  'Nos Accompagnements': 'accompagnements',
  'Accompagnements': 'accompagnements',
  'Accompagnement': 'accompagnements',
  
  // Desserts
  'Desserts': 'desserts',
  'Dessert': 'desserts',
  
  // Mochis
  'Mochis': 'mochis',
  'Mochi': 'mochis',
  
  // Boissons
  'Boissons': 'boissons',
  'Boisson': 'boissons',
  
  // Calispring (nouveau)
  'Calispring par 6': 'spring'
}

/**
 * Normalise le nom du produit pour correspondre aux fichiers existants
 * Les fichiers ont des espaces dans leurs noms
 */
function normalizeProductNameForFile(productName: string): string {
  return productName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[''']/g, '') // Supprime les apostrophes
    .replace(/n°/g, '') // Supprime N°
    .replace(/°/g, '') // Supprime °
    .replace(/[()]/g, '') // Supprime les parenthèses
    .replace(/,/g, '') // Supprime les virgules
    .replace(/\s+/g, ' ') // Normalise les espaces multiples
    .trim()
}

/**
 * Obtient le chemin de l'image basé sur la structure existante
 */
export function getImageFromExistingStructure(productName: string, category?: string): string | null {
  // Déterminer le dossier basé sur la catégorie
  const folder = category ? categoryToFolderMapping[category] : null
  
  if (!folder) {
    // Essayer de détecter le dossier basé sur le nom du produit
    const lowerName = productName.toLowerCase()
    
    if (lowerName.includes('maki')) return `/menu/makis/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('california') || lowerName.includes('cali')) return `/menu/california/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('sushi')) return `/menu/sushis/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('sashimi')) return `/menu/sashimi/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('poke')) {
      // Cas spécial pour les poke bowls avec numéros
      const numberMatch = productName.match(/(?:N°|n°|#)?(\d+)/)
      if (numberMatch) {
        return `/menu/poke-bowls/POKE ${numberMatch[1]}.webp`
      }
      return `/menu/poke-bowls/${normalizeProductNameForFile(productName)}.webp`
    }
    if (lowerName.includes('spring')) return `/menu/spring/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('crispy')) return `/menu/crispy/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('roll')) return `/menu/rolls/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('plateau')) return `/menu/plateaux/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('formule')) return `/menu/formules/${normalizeProductNameForFile(productName)}.webp`
    
    // Fallback vers 'autres'
    return `/menu/autres/${normalizeProductNameForFile(productName)}.webp`
  }
  
  // Normaliser le nom du produit
  const fileName = normalizeProductNameForFile(productName)
  
  // Cas spéciaux basés sur les noms de fichiers observés
  // IMPORTANT: Les fichiers ont un espace avant .webp
  if (folder === 'makis') {
    // Les fichiers makis commencent par "makis " et finissent par " .webp"
    if (!fileName.startsWith('makis ')) {
      return `/menu/${folder}/makis ${fileName} .webp`
    }
    return `/menu/${folder}/${fileName} .webp`
  }
  
  if (folder === 'california') {
    // Les fichiers california commencent par "cali " et finissent par " .webp"
    if (!fileName.startsWith('cali ')) {
      return `/menu/${folder}/cali ${fileName} .webp`
    }
    return `/menu/${folder}/${fileName} .webp`
  }
  
  if (folder === 'sushis') {
    // Les fichiers sushis commencent par "sushi " et finissent par " .webp" ou ".webp"
    if (!fileName.startsWith('sushi ')) {
      // Vérifier si c'est un cas spécial comme "sushi saumon braisé.webp" (sans espace)
      if (fileName.includes('braisé') || fileName.includes('braise')) {
        return `/menu/${folder}/sushi ${fileName}.webp`
      }
      return `/menu/${folder}/sushi ${fileName} .webp`
    }
    return `/menu/${folder}/${fileName} .webp`
  }
  
  if (folder === 'poke-bowls') {
    // Gérer les numéros de poke bowls
    const numberMatch = productName.match(/(?:N°|n°|#)?(\d+)/)
    if (numberMatch) {
      const num = parseInt(numberMatch[1])
      // POKE 1 au lieu de POKE 01
      return `/menu/${folder}/POKE ${num}.webp`
    }
  }
  
  if (folder === 'accompagnements') {
    // Les accompagnements ont un espace avant .webp
    return `/menu/${folder}/${fileName} .webp`
  }
  
  // Chemin standard (avec espace avant .webp pour certains dossiers)
  const foldersWithSpace = ['desserts', 'boissons', 'plats-chauds', 'spring', 'rolls', 'crispy']
  if (foldersWithSpace.includes(folder)) {
    return `/menu/${folder}/${fileName} .webp`
  }
  
  return `/menu/${folder}/${fileName}.webp`
}

/**
 * Génère une liste de chemins alternatifs à essayer
 */
export function getAlternativeImagePaths(productName: string, category?: string): string[] {
  const paths: string[] = []
  const normalizedName = normalizeProductNameForFile(productName)
  
  // Chemin principal
  const mainPath = getImageFromExistingStructure(productName, category)
  if (mainPath) paths.push(mainPath)
  
  // Variations possibles
  const folder = category ? categoryToFolderMapping[category] : 'autres'
  
  if (folder) {
    // Sans préfixe
    paths.push(`/menu/${folder}/${normalizedName}.webp`)
    
    // Avec tirets au lieu d'espaces
    paths.push(`/menu/${folder}/${normalizedName.replace(/\s+/g, '-')}.webp`)
    
    // Avec underscores
    paths.push(`/menu/${folder}/${normalizedName.replace(/\s+/g, '_')}.webp`)
  }
  
  // Chercher dans 'restaurant' (images génériques)
  paths.push(`/menu/restaurant/${normalizedName}.webp`)
  
  // Chercher dans 'autres'
  paths.push(`/menu/autres/${normalizedName}.webp`)
  
  return [...new Set(paths)] // Éliminer les doublons
}

/**
 * Teste si une image existe (pour le développement)
 */
export function testImagePath(path: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }
    
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = path
  })
}

/**
 * Trouve la meilleure image disponible parmi les alternatives
 */
export async function findBestAvailableImage(productName: string, category?: string): Promise<string | null> {
  const paths = getAlternativeImagePaths(productName, category)
  
  for (const path of paths) {
    const exists = await testImagePath(path)
    if (exists) {

      return path
    }
  }

  return null
}