/**
 * Script pour générer automatiquement le mapping exact des images
 */

const fs = require('fs')
const path = require('path')

// Dossier des images
const menuDir = path.join(__dirname, '..', 'src', 'assets', 'menu')

// Charger les données du menu
const menuDataPath = path.join(__dirname, '..', 'menu-data-livraison.ts')
const menuContent = fs.readFileSync(menuDataPath, 'utf8')

// Fonction pour extraire les produits du menu
function extractMenuItems() {
  const items = []
  const lines = menuContent.split('\n')
  
  let currentCategory = ''
  let currentItem = null
  
  for (const line of lines) {
    if (line.includes('category:')) {
      const match = line.match(/category:\s*["']([^"']+)["']/)
      if (match) currentCategory = match[1]
    }
    
    if (line.includes('name:')) {
      const match = line.match(/name:\s*["']([^"']+)["']/)
      if (match) {
        if (currentItem) items.push(currentItem)
        currentItem = {
          name: match[1],
          category: currentCategory,
          id: '',
          price: 0
        }
      }
    }
    
    if (line.includes('id:') && currentItem) {
      const match = line.match(/id:\s*["']([^"']+)["']/)
      if (match) currentItem.id = match[1]
    }
    
    if (line.includes('price:') && currentItem) {
      const match = line.match(/price:\s*(\d+\.?\d*)/)
      if (match) currentItem.price = parseFloat(match[1])
    }
  }
  
  if (currentItem) items.push(currentItem)
  return items
}

// Fonction pour lister tous les fichiers d'images
function listAllImages() {
  const images = []
  
  function walkDir(dir, prefix = '') {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        const folderName = file
        walkDir(fullPath, folderName)
      } else if (file.endsWith('.webp')) {
        const relativePath = prefix ? `${prefix}/${file}` : file
        images.push({
          folder: prefix || 'root',
          filename: file,
          path: relativePath
        })
      }
    }
  }
  
  walkDir(menuDir)
  return images
}

// Fonction pour calculer la similarité entre deux chaînes
function calculateSimilarity(str1, str2) {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '')
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  if (s1 === s2) return 100
  
  // Calculer le score basé sur les caractères communs
  let matches = 0
  const minLength = Math.min(s1.length, s2.length)
  for (let i = 0; i < minLength; i++) {
    if (s1[i] === s2[i]) matches++
  }
  
  return Math.round((matches / Math.max(s1.length, s2.length)) * 100)
}

// Fonction pour trouver la meilleure correspondance
function findBestMatch(productName, category, images) {
  let bestMatch = null
  let bestScore = 0
  
  // Normaliser le nom du produit
  const normalizedProduct = productName.toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/n°/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
  
  // Mapper les catégories
  const categoryMapping = {
    'Makis par 6': 'maki',
    'California par 6': 'california',
    'Sushi à l\'unité': 'sushi nigiri',
    'Sashimi par 6': 'sashimi',
    'Poke Bowl sur lit de riz': 'poke bowl ',
    'Crispy par 6': 'crispy',
    'Crispys (frit) par 6': 'crispy',
    'Spring par 6': 'spring ',
    'Calispring par 6': 'spring ',
    'Plateaux': 'plateaux ',
    'Plateaux à partager': 'plateaux ',
    'Plats Chauds': 'plat chaud ',
    'Les Créations du Chef': 'création du chef',
    'Création du Chef par 6': 'création du chef',
    'Nos Accompagnements': 'accompagnement',
    'Desserts': 'dessert',
    'Boissons': 'boisson',
    'Formules du Midi': 'formule du midi ',
    'Les Formules': 'formule du midi ',
    'Roll\'s par 6': 'roll_s',
    'Flocon par 6': 'flocon',
    'Buritos': 'burito',
    'Chirashi 10 tranches': 'chirachi'
  }
  
  const expectedFolder = categoryMapping[category] || 'PHOTOS'
  
  // Filtrer les images du bon dossier
  const folderImages = images.filter(img => img.folder === expectedFolder)
  
  // Cas spécial pour les Poke Bowls
  if (productName.includes('Poke Bowl N°')) {
    const numberMatch = productName.match(/N°(\d+)/)
    if (numberMatch) {
      const num = parseInt(numberMatch[1])
      const pokeName = num === 6 ? `poke ${num}.webp` : `POKE ${num}.webp`
      const pokeImage = folderImages.find(img => img.filename === pokeName)
      if (pokeImage) {
        return {
          productName,
          category,
          imagePath: pokeImage.path,
          score: 100,
          method: 'exact_poke'
        }
      }
    }
  }
  
  // Chercher dans le dossier approprié
  for (const image of folderImages) {
    const imageName = image.filename.replace('.webp', '').trim()
    
    // Correspondance exacte
    if (imageName.toLowerCase() === normalizedProduct) {
      return {
        productName,
        category,
        imagePath: image.path,
        score: 100,
        method: 'exact'
      }
    }
    
    // Calculer le score de similarité
    const score = calculateSimilarity(normalizedProduct, imageName)
    if (score > bestScore) {
      bestScore = score
      bestMatch = image
    }
  }
  
  // Si pas de bonne correspondance dans le dossier, chercher dans PHOTOS
  if (bestScore < 50) {
    const photosImages = images.filter(img => img.folder === 'PHOTOS')
    for (const image of photosImages) {
      const imageName = image.filename.replace('.webp', '').trim()
      const score = calculateSimilarity(normalizedProduct, imageName)
      if (score > bestScore) {
        bestScore = score
        bestMatch = image
      }
    }
  }
  
  if (bestMatch) {
    return {
      productName,
      category,
      imagePath: bestMatch.path,
      score: bestScore,
      method: bestScore >= 80 ? 'high_match' : bestScore >= 50 ? 'medium_match' : 'low_match'
    }
  }
  
  return {
    productName,
    category,
    imagePath: null,
    score: 0,
    method: 'no_match'
  }
}

// Exécution principale

const menuItems = extractMenuItems()
const images = listAllImages()

console.log(`   - ${new Set(images.map(i => i.folder)).size} dossiers\n`)

// Générer le mapping
const mapping = []
const stats = {
  exact: 0,
  high: 0,
  medium: 0,
  low: 0,
  none: 0
}

for (const item of menuItems) {
  const match = findBestMatch(item.name, item.category, images)
  mapping.push(match)
  
  if (match.method === 'exact' || match.method === 'exact_poke') stats.exact++
  else if (match.method === 'high_match') stats.high++
  else if (match.method === 'medium_match') stats.medium++
  else if (match.method === 'low_match') stats.low++
  else stats.none++
}

// Afficher les résultats

console.log(`   🟢 Haute similarité (>80%): ${stats.high}`)
console.log(`   🟡 Moyenne similarité (50-80%): ${stats.medium}`)
console.log(`   🟠 Faible similarité (<50%): ${stats.low}`)

// Générer le fichier TypeScript avec le mapping
const tsContent = `/**
 * Mapping automatique des images généré le ${new Date().toISOString()}
 * ${stats.exact + stats.high} correspondances fiables sur ${menuItems.length} produits
 */

export const IMAGE_MAPPING: Record<string, string> = {
${mapping
  .filter(m => m.imagePath && m.score >= 50)
  .map(m => `  "${m.productName}": "${m.imagePath}"`)
  .join(',\n')}
}

export function getProductImage(productName: string): string | null {
  return IMAGE_MAPPING[productName] || null
}
`

// Sauvegarder le mapping
const outputPath = path.join(__dirname, '..', 'lib', 'utils', 'imageMapping.generated.ts')
fs.writeFileSync(outputPath, tsContent)

// Afficher quelques exemples

const examples = mapping
  .filter(m => m.imagePath)
  .sort((a, b) => b.score - a.score)
  .slice(0, 10)

for (const ex of examples) {
  const emoji = ex.score === 100 ? '✅' : ex.score >= 80 ? '🟢' : ex.score >= 50 ? '🟡' : '🟠'
  console.log(`${emoji} ${ex.productName} → ${ex.imagePath} (${ex.score}%)`)
}