/**
 * Mapper pour convertir les noms d'items du menu en noms de fichiers d'images
 */

export interface ItemMapping {
  category: string
  itemName: string
}

/**
 * Normalise un nom d'item pour correspondre au nom de fichier
 */
export function normalizeItemName(name: string): string {
  return name
    .toLowerCase()
    .replace(/n°/g, '')
    .replace(/[àâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Détermine la catégorie d'image basée sur le nom de l'item et sa catégorie
 */
export function getCategoryFromName(itemName: string, menuCategory?: string): string {
  const name = itemName.toLowerCase()
  const category = menuCategory?.toLowerCase() || ''
  
  // Mapping spécifique basé sur les mots-clés
  if (name.includes('sushi') || category.includes('sushi')) return 'sushis'
  if (name.includes('sashimi') || category.includes('sashimi')) return 'sashimi'
  if (name.includes('maki') || category.includes('maki')) return 'makis'
  if (name.includes('california') || category.includes('california')) return 'california'
  if (name.includes('roll') || category.includes('roll')) return 'rolls'
  if (name.includes('flocon') || category.includes('flocon')) return 'flocon'
  if (name.includes('crispy') || category.includes('crispy')) return 'crispy'
  if (name.includes('spring') || category.includes('spring')) return 'spring'
  if (name.includes('burito') || category.includes('burito')) return 'buritos'
  if (name.includes('poke') || category.includes('poke')) return 'poke-bowls'
  if (name.includes('chirashi') || category.includes('chirashi')) return 'chirashi'
  if (name.includes('plateau') || category.includes('plateau')) return 'plateaux'
  if (name.includes('formule') || category.includes('formule')) return 'formules'
  if (name.includes('ramen') || category.includes('ramen')) return 'nouilles'
  if (name.includes('nouille') || category.includes('nouille')) return 'nouilles'
  if (name.includes('yakisoba') || category.includes('yakisoba')) return 'nouilles'
  if (name.includes('tempura') || name.includes('gyoza')) return 'plats-chauds'
  if (name.includes('mochi') || category.includes('mochi')) return 'mochis'
  if (name.includes('dessert') || category.includes('dessert')) return 'desserts'
  if (name.includes('boisson') || category.includes('boisson')) return 'boissons'
  if (name.includes('soupe') || category.includes('soupe')) return 'soupes'
  if (name.includes('accompagnement') || category.includes('accompagnement')) return 'accompagnements'
  if (name.includes('wagyu')) return 'autres'
  
  // Catégorie par défaut basée sur le menu
  if (category.includes('plat') && category.includes('chaud')) return 'plats-chauds'
  
  return 'autres'
}

/**
 * Obtient le mapping complet pour un item
 */
export function getItemImageMapping(itemName: string, menuCategory?: string): ItemMapping {
  const category = getCategoryFromName(itemName, menuCategory)
  const normalizedName = normalizeItemName(itemName)
  
  return {
    category,
    itemName: normalizedName
  }
}

/**
 * Mapping manuel pour certains items spécifiques
 */
export const specificMappings: Record<string, ItemMapping> = {
  'Box Sushi Mix (12 pièces)': { category: 'plateaux', itemName: 'box-sushi-mix-12pcs' },
  'Love Box (24 pièces)': { category: 'plateaux', itemName: 'love-box' },
  'Family Box (46 pièces)': { category: 'plateaux', itemName: 'family-box' },
  'Chicken Box (24 pièces)': { category: 'plateaux', itemName: 'chicken-box' },
  'Formule A': { category: 'formules', itemName: 'formule-a' },
  'Formule B': { category: 'formules', itemName: 'formule-b' },
  'Formule C': { category: 'formules', itemName: 'formule-c' },
  'Poke Bowl N°01': { category: 'poke-bowls', itemName: 'poke-bowl-1' },
  'Poke Bowl N°02': { category: 'poke-bowls', itemName: 'poke-bowl-2' },
  'Poke Bowl N°03': { category: 'poke-bowls', itemName: 'poke-bowl-3' },
  'Poke Bowl N°04': { category: 'poke-bowls', itemName: 'poke-bowl-4' },
  'Poke Bowl N°05': { category: 'poke-bowls', itemName: 'poke-bowl-5' },
  'Poke Bowl N°06': { category: 'poke-bowls', itemName: 'poke-bowl-6' },
  'Poke Bowl N°07': { category: 'poke-bowls', itemName: 'poke-bowl-7' },
  'Poke Bowl N°08': { category: 'poke-bowls', itemName: 'poke-bowl-8' },
  'Poke Bowl N°09': { category: 'poke-bowls', itemName: 'poke-bowl-9' },
  'Poke Bowl N°10': { category: 'poke-bowls', itemName: 'poke-bowl-10' },
  'Poke Bowl N°11': { category: 'poke-bowls', itemName: 'poke-bowl-11' },
  'Poke Bowl N°12': { category: 'poke-bowls', itemName: 'poke-bowl-12' },
}

/**
 * Obtient le mapping final en vérifiant d'abord les mappings spécifiques
 */
export function getImageMapping(itemName: string, menuCategory?: string): ItemMapping {
  // Vérifier d'abord les mappings spécifiques
  if (specificMappings[itemName]) {
    return specificMappings[itemName]
  }
  
  // Sinon utiliser le mapping automatique
  return getItemImageMapping(itemName, menuCategory)
}