/**
 * Utilitaires pour la gestion des images du menu
 */

// Cache en mémoire pour les images chargées
const imageCache = new Map<string, string | null>();

// Mapping des catégories vers les dossiers d'images
const categoryMapping: Record<string, string> = {
  'sushi': 'sushis',
  'sashimi': 'sashimi',
  'maki': 'makis',
  'california': 'california',
  'roll': 'rolls',
  'flocon': 'flocon',
  'crispy': 'crispy',
  'calispring': 'calispring',
  'creation': 'creation-chef',
  'burito': 'buritos',
  'plat-chaud': 'plats-chauds',
  'ramen': 'nouilles',
  'nouilles': 'nouilles',
  'poke': 'poke-bowls',
  'chirashi': 'chirashi',
  'plateau': 'plateaux',
  'formule': 'formules',
  'accompagnement': 'accompagnements',
  'dessert': 'desserts',
  'boisson': 'boissons',
  'mochi': 'mochis',
  'soupe': 'soupes',
  'tartare': 'tartare',
  'spring': 'spring',
  'wagyu': 'autres'
};

/**
 * Nettoie et normalise un nom pour correspondre au nom de fichier
 */
function normalizeItemName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[àâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Trouve la catégorie appropriée pour un item
 */
function findCategory(category: string, subcategory?: string, itemName?: string): string {
  const searchString = `${category} ${subcategory || ''} ${itemName || ''}`.toLowerCase();
  
  // Recherche dans le mapping
  for (const [key, value] of Object.entries(categoryMapping)) {
    if (searchString.includes(key)) {
      return value;
    }
  }
  
  // Fallback sur la catégorie normalisée
  return normalizeItemName(category);
}

/**
 * Construit le chemin de l'image pour un item du menu
 */
export function buildImagePath(
  category: string,
  subcategory?: string,
  itemName?: string
): string {
  const folder = findCategory(category, subcategory, itemName);
  const fileName = itemName ? normalizeItemName(itemName) : 'default';
  
  return `/menu/${folder}/${fileName}.webp`;
}

/**
 * Charge une image du menu avec gestion du cache et des erreurs
 */
export async function loadMenuImage(
  category: string,
  subcategory?: string,
  itemName?: string
): Promise<string | null> {
  const cacheKey = `${category}-${subcategory || ''}-${itemName || ''}`;
  
  // Vérifier le cache
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey) || null;
  }
  
  const imagePath = buildImagePath(category, subcategory, itemName);
  
  try {
    // Tenter de charger l'image WebP
    const response = await fetch(imagePath);
    if (response.ok) {
      imageCache.set(cacheKey, imagePath);
      return imagePath;
    }
    
    // Essayer avec une extension PNG en fallback
    const pngPath = imagePath.replace('.webp', '.png');
    const pngResponse = await fetch(pngPath);
    if (pngResponse.ok) {
      imageCache.set(cacheKey, pngPath);
      return pngPath;
    }
    
    // Essayer avec une extension JPG en fallback
    const jpgPath = imagePath.replace('.webp', '.jpg');
    const jpgResponse = await fetch(jpgPath);
    if (jpgResponse.ok) {
      imageCache.set(cacheKey, jpgPath);
      return jpgPath;
    }
    
  } catch (error) {
    // Erreur silencieuse

  }
  
  // Mettre en cache le fait qu'il n'y a pas d'image
  imageCache.set(cacheKey, null);
  return null;
}

/**
 * Précharge une liste d'images
 */
export function preloadImages(items: Array<{
  category: string;
  subcategory?: string;
  name?: string;
}>): void {
  items.forEach(item => {
    loadMenuImage(item.category, item.subcategory, item.name);
  });
}

/**
 * Vide le cache des images
 */
export function clearImageCache(): void {
  imageCache.clear();
}

/**
 * Obtient le chemin d'une image depuis le cache
 */
export function getCachedImage(
  category: string,
  subcategory?: string,
  itemName?: string
): string | null {
  const cacheKey = `${category}-${subcategory || ''}-${itemName || ''}`;
  return imageCache.get(cacheKey) || null;
}