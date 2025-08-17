/**
 * Système de mapping basé sur la vraie structure d'images dans src/assets/menu/
 */

// Mapping des catégories du menu vers les VRAIS dossiers
const categoryToFolderMapping: Record<string, string> = {
  // Formules (avec espace à la fin du dossier)
  'Formules du Midi': 'formule du midi ',
  'Les Formules': 'formule du midi ',
  
  // Plateaux (avec espace à la fin du dossier)
  'Plateaux': 'plateaux ',
  'Plateaux à partager': 'plateaux ',
  
  // Plats chauds (avec espace à la fin du dossier)
  'Plats Chauds': 'plat chaud ',
  
  // Makis
  'Makis par 6': 'maki',
  'Makis': 'maki',
  
  // California
  'California par 6': 'california',
  'California': 'california',
  
  // Sushis
  'Sushi à l\'unité': 'sushi nigiri',
  'Sushis': 'sushi nigiri',
  'Sushi': 'sushi nigiri',
  
  // Sashimis
  'Sashimi par 5': 'sashimi',
  'Sashimi par 6': 'sashimi',
  'Sashimis': 'sashimi',
  'Sashimi': 'sashimi',
  
  // Spring (avec espace à la fin du dossier)
  'Spring par 6': 'spring ',
  'Spring': 'spring ',
  'Calispring par 6': 'spring ',
  
  // Rolls
  'Rolls par 6': 'roll_s',
  'Roll\'s par 6': 'roll_s',
  'Roll': 'roll_s',
  'Rolls': 'roll_s',
  
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
  'Chirashi': 'chirachi',
  'Chirashi 10 tranches': 'chirachi',
  
  // Poke Bowls (avec espace à la fin du dossier)
  'Poke Bowl sur lit de riz': 'poke bowl ',
  'Poke Bowls': 'poke bowl ',
  'Poke Bowl': 'poke bowl ',
  
  // Buritos
  'Buritos': 'burito',
  
  // Création du chef
  'Les Créations du Chef': 'création du chef',
  'Créations du Chef': 'création du chef',
  'Création du Chef par 6': 'création du chef',
  'Création Chef': 'création du chef',
  
  // Accompagnements
  'Nos Accompagnements': 'accompagnement',
  'Accompagnements': 'accompagnement',
  'Accompagnement': 'accompagnement',
  
  // Desserts
  'Desserts': 'dessert',
  'Dessert': 'dessert',
  
  // Boissons
  'Boissons': 'boisson',
  'Boisson': 'boisson',
  
  // Soupes
  'Soupes': 'soupe miso',
  'Soupe': 'soupe miso',
  
  // Nouilles
  'Nouilles': 'nouilles',
}

/**
 * Normalise le nom du produit pour correspondre aux fichiers existants
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
 * Obtient le chemin de l'image basé sur la structure réelle
 */
export function getRealImagePath(productName: string, category?: string): string | null {
  // Déterminer le dossier basé sur la catégorie
  const folder = category ? categoryToFolderMapping[category] : null
  
  if (!folder) {
    // Essayer de détecter le dossier basé sur le nom du produit
    const lowerName = productName.toLowerCase()
    
    if (lowerName.includes('maki')) return `/menu/maki/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('california') || lowerName.includes('cali')) return `/menu/california/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('sushi')) return `/menu/sushi nigiri/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('sashimi')) return `/menu/sashimi/${normalizeProductNameForFile(productName)}.webp`
    if (lowerName.includes('poke')) {
      const numberMatch = productName.match(/(?:N°|n°|#)?(\d+)/)
      if (numberMatch) {
        const num = parseInt(numberMatch[1])
        if (num === 6) {
          return `/menu/poke bowl /poke ${num}.webp`
        }
        return `/menu/poke bowl /POKE ${num}.webp`
      }
      return `/menu/poke bowl /${normalizeProductNameForFile(productName)}.webp`
    }
    
    // Fallback vers PHOTOS (dossier avec beaucoup d'images)
    return `/menu/PHOTOS/${normalizeProductNameForFile(productName)}.webp`
  }
  
  const fileName = normalizeProductNameForFile(productName)
  
  // Cas spéciaux basés sur les noms de fichiers observés
  if (folder === 'maki') {
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
  
  if (folder === 'sushi nigiri') {
    // Les fichiers sushi commencent par "sushi "
    if (!fileName.startsWith('sushi ')) {
      // Vérifier cas spéciaux comme braisé
      if (fileName.includes('braisé') || fileName.includes('braise')) {
        return `/menu/${folder}/sushi ${fileName}.webp`
      }
      return `/menu/${folder}/sushi ${fileName} .webp`
    }
    return `/menu/${folder}/${fileName} .webp`
  }
  
  if (folder === 'poke bowl ') {
    // Gérer les numéros de poke bowls
    const numberMatch = productName.match(/(?:N°|n°|#)?(\d+)/)
    if (numberMatch) {
      const num = parseInt(numberMatch[1])
      // Cas spécial pour POKE 6 qui est en minuscules
      if (num === 6) {
        return `/menu/${folder}/poke ${num}.webp`
      }
      return `/menu/${folder}/POKE ${num}.webp`
    }
    return `/menu/${folder}/${fileName}.webp`
  }
  
  // Pour la plupart des autres dossiers, les fichiers ont un espace avant .webp
  const foldersWithSpace = [
    'accompagnement', 'boisson', 'spring ', 'roll_s', 'crispy', 
    'création du chef', 'plat chaud ', 'plateaux ', 'dessert'
  ]
  
  if (foldersWithSpace.includes(folder)) {
    return `/menu/${folder}/${fileName} .webp`
  }
  
  // Chemin standard
  return `/menu/${folder}/${fileName}.webp`
}

/**
 * Génère une liste de chemins alternatifs à essayer
 */
export function getRealAlternativePaths(productName: string, category?: string): string[] {
  const paths: string[] = []
  const normalizedName = normalizeProductNameForFile(productName)
  
  // Chemin principal
  const mainPath = getRealImagePath(productName, category)
  if (mainPath) paths.push(mainPath)
  
  // Variations possibles
  const folder = category ? categoryToFolderMapping[category] : null
  
  if (folder) {
    // Sans préfixe
    paths.push(`/menu/${folder}/${normalizedName}.webp`)
    
    // Avec espace avant .webp
    paths.push(`/menu/${folder}/${normalizedName} .webp`)
    
    // Avec tirets au lieu d'espaces
    paths.push(`/menu/${folder}/${normalizedName.replace(/\s+/g, '-')}.webp`)
    
    // Avec underscores
    paths.push(`/menu/${folder}/${normalizedName.replace(/\s+/g, '_')}.webp`)
  }
  
  // Chercher dans 'PHOTOS' (beaucoup d'images)
  paths.push(`/menu/PHOTOS/${normalizedName}.webp`)
  paths.push(`/menu/PHOTOS/${normalizedName} .webp`)
  
  // Chercher dans 'restaurant et image déco'
  paths.push(`/menu/restaurant et image déco/${normalizedName}.webp`)
  paths.push(`/menu/restaurant et image déco/${normalizedName} .webp`)
  
  // Pour certains produits spécifiques
  if (productName.toLowerCase().includes('saumon')) {
    paths.push('/menu/restaurant et image déco/sushi saumon tobiko sauce spicy .webp')
    paths.push('/menu/PHOTOS/sushi saumon tobiko sauce spicy .webp')
  }
  
  if (productName.toLowerCase().includes('wagyu')) {
    paths.push('/menu/restaurant et image déco/wagyu .webp')
    paths.push('/menu/PHOTOS/wagyu .webp')
  }
  
  return [...new Set(paths)] // Éliminer les doublons
}