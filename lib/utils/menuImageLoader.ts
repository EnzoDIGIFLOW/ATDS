/**
 * Loader d'images pour le menu depuis src/assets/menu/
 * Utilise un import dynamique pour charger les images
 */

// Cache pour les images déjà chargées
const imageCache = new Map<string, string>()

/**
 * Charge une image depuis src/assets/menu/
 * @param path - Chemin relatif depuis menu/ (ex: "maki/makis cheese .webp")
 * @returns URL de l'image ou null si non trouvée
 */
export async function loadMenuImage(path: string): Promise<string | null> {
  // Vérifier le cache
  if (imageCache.has(path)) {
    return imageCache.get(path) || null
  }

  try {
    // Construire le chemin d'import
    // Note: Les imports dynamiques nécessitent un chemin littéral ou semi-littéral
    const imagePath = `/src/assets/menu/${path}`
    
    // Pour Next.js, nous devons utiliser un import statique ou configurer un loader
    // Option: Utiliser next/image avec un loader personnalisé
    
    // Pour l'instant, retourner le chemin pour utilisation avec un loader personnalisé
    return imagePath
  } catch (error) {

    return null
  }
}

/**
 * Loader personnalisé pour Next.js Image
 * Configure dans next.config.js
 */
export function menuImageLoader({ src }: { src: string }) {
  // Si le src commence par /menu/, c'est une image du menu
  if (src.startsWith('/menu/')) {
    // Retourner le chemin vers l'API qui servira l'image
    return `/api/menu-image?path=${encodeURIComponent(src.replace('/menu/', ''))}`
  }
  // Sinon, utiliser le comportement par défaut
  return src
}

/**
 * Obtient le chemin de l'image pour un produit
 */
export function getMenuImagePath(productName: string, category?: string): string {
  // Normaliser le nom
  const normalizedName = productName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[''']/g, '')
    .replace(/n°/g, '')
    .replace(/°/g, '')
    .replace(/[()]/g, '')
    .replace(/,/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  // Mapper la catégorie vers le dossier
  const categoryToFolder: Record<string, string> = {
    'Makis par 6': 'maki',
    'California par 6': 'california',
    'Sushi à l\'unité': 'sushi nigiri',
    'Sashimi par 5': 'sashimi',
    'Sashimi par 6': 'sashimi',
    'Spring par 6': 'spring ',
    'Calispring par 6': 'spring ',
    'Rolls par 6': 'roll_s',
    'Roll\'s par 6': 'roll_s',
    'Crispy par 6': 'crispy',
    'Crispys (frit) par 6': 'crispy',
    'Poke Bowl sur lit de riz': 'poke bowl ',
    'Nos Accompagnements': 'accompagnement',
    'Desserts': 'dessert',
    'Boissons': 'boisson',
    'Plateaux à partager': 'plateaux ',
    'Plateaux': 'plateaux ',
    'Les Formules': 'formule du midi ',
    'Formules du Midi': 'formule du midi ',
    'Les Créations du Chef': 'création du chef',
    'Création du Chef par 6': 'création du chef',
    'Plats Chauds': 'plat chaud ',
    'Chirashi 10 tranches': 'chirachi',
    'Flocon par 6': 'flocon',
    'Buritos': 'burito',
    'Tartare': 'tartare'
  }

  const folder = category ? categoryToFolder[category] : null
  if (!folder) return `/menu/PHOTOS/${normalizedName}.webp`

  // Construire le chemin selon le type
  let fileName = normalizedName

  // Cas spéciaux par dossier
  if (folder === 'maki' && !fileName.startsWith('makis ')) {
    fileName = `makis ${fileName}`
  } else if (folder === 'california' && !fileName.startsWith('cali ')) {
    fileName = `cali ${fileName}`
  } else if (folder === 'sushi nigiri' && !fileName.startsWith('sushi ')) {
    fileName = `sushi ${fileName}`
  }

  // Gérer les poke bowls
  if (folder === 'poke bowl ') {
    const numberMatch = productName.match(/(?:N°|n°|#)?(\d+)/)
    if (numberMatch) {
      const num = parseInt(numberMatch[1])
      // poke 6 est en minuscules, les autres en majuscules
      return `/menu/${folder}/${num === 6 ? 'poke' : 'POKE'} ${num}.webp`
    }
  }

  // La plupart des fichiers ont un espace avant .webp
  const needsSpace = [
    'maki', 'california', 'sushi nigiri', 'accompagnement', 
    'boisson', 'spring ', 'roll_s', 'crispy', 'création du chef',
    'plat chaud ', 'plateaux ', 'dessert'
  ].includes(folder)

  return `/menu/${folder}/${fileName}${needsSpace ? ' ' : ''}.webp`
}