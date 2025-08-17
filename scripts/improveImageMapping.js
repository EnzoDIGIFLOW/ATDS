/**
 * Script amélioré pour générer un mapping plus précis
 */

const fs = require('fs')
const path = require('path')

// Lister toutes les images disponibles
function getAllImages() {
  const menuDir = path.join(__dirname, '..', 'src', 'assets', 'menu')
  const images = []
  
  function scan(dir, prefix = '') {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        scan(fullPath, file)
      } else if (file.endsWith('.webp')) {
        images.push({
          folder: prefix,
          filename: file,
          path: prefix ? `${prefix}/${file}` : file
        })
      }
    }
  }
  
  scan(menuDir)
  return images
}

// Créer un mapping manuel pour les produits les plus importants
const MANUAL_MAPPING = {
  // Makis
  'Cheese': 'maki/makis cheese .webp',
  'Avocat': 'maki/makis avocat .webp',
  'Avocat, Mayo': 'maki/makis avocat mayo .webp',
  'Poulet, Cheese': 'maki/makis poulet cheese .webp',
  'Poulet, Curry': 'maki/makis poulet curry .webp',
  'Concombre, Cheese': 'maki/makis concombre cheese .webp',
  'Avocat Amyo': 'maki/makis avocat amyo .webp',
  'Saumon': 'maki/makis saumon .webp',
  'Thon': 'maki/makis thon .webp',
  
  // California
  'Poulet, Avocat': 'california/cali poulet avocat .webp',
  'Saumon, Avocat, Tobiko': 'california/cali saumon avocat tobiko.webp',
  'Saumon Avocat': 'california/cali saumon avocat .webp',
  'Saumon Cheese': 'california/cali saumon cheese .webp',
  'Thon Avocat': 'california/cali thon avocat .webp',
  'Gambas Cheese': 'california/cali gambas cheese .webp',
  'Gambas Cheese, Oignon Frit': 'california/cali gambas cheese oignon frit .webp',
  
  // Sushi
  'Saumon Cheese': 'sushi nigiri/sushi saumon cheese .webp',
  'Saumon Braisé': 'sushi nigiri/sushi saumon braisé.webp',
  'Saumon Braisé Truffe': 'sushi nigiri/sushi saumon braisé truffe.webp',
  'Thon': 'sushi nigiri/sushi thon .webp',
  'Crevette': 'sushi nigiri/sushi crevette .webp',
  
  // Poke Bowls (déjà gérés automatiquement)
  'Poke Bowl N°01': 'poke bowl /POKE 1.webp',
  'Poke Bowl N°02': 'poke bowl /POKE 2.webp',
  'Poke Bowl N°03': 'poke bowl /POKE 3.webp',
  'Poke Bowl N°04': 'poke bowl /POKE 4.webp',
  'Poke Bowl N°05': 'poke bowl /POKE 5.webp',
  'Poke Bowl N°06': 'poke bowl /poke 6.webp',
  'Poke Bowl N°07': 'poke bowl /POKE 7.webp',
  'Poke Bowl N°08': 'poke bowl /POKE 8.webp',
  'Poke Bowl N°10': 'poke bowl /POKE 10.webp',
  'Poke Bowl N°11': 'poke bowl /POKE 11.webp',
  'Poke Bowl N°12': 'poke bowl /POKE 12.webp',
  
  // Accompagnements
  'Riz Vinaigré': 'accompagnement/riz vinaigre .webp',
  'Salade de Chou': 'accompagnement/salade de chou .webp',
  'Soupe Miso': 'soupe miso/soupe miso.webp',
  
  // Plats chauds
  'Gyoza (4 pièces)': 'plat chaud /gyoza 4 pieces .webp',
  'Gyoza Poulet Curry': 'plat chaud /gyoza poulet curry.webp',
  'Gyoza Porc': 'plat chaud /Gyoza porc .webp',
  'Gyoza Crevette': 'plat chaud /gyoza crevette .webp',
  
  // Desserts
  'Makis Mangue Nutella Coco Rapé': 'dessert/Makis mangue nutella coco rapé -2.webp',
  'Tiramisu Nutella Spéculoos': 'dessert/tiramisu nutella spéculos.webp',
  
  // Crispy
  'Cheese': 'crispy/crispy cheese .webp',
  
  // Sashimi
  'Duo': 'sashimi/sashimi duo .webp',
}

// Charger le menu
const menuDataPath = path.join(__dirname, '..', 'menu-data-livraison.ts')
const menuContent = fs.readFileSync(menuDataPath, 'utf8')

// Extraire les produits uniques
const products = new Set()
const productCategories = new Map()
const lines = menuContent.split('\n')
let currentCategory = ''

for (const line of lines) {
  if (line.includes('category:')) {
    const match = line.match(/category:\s*["']([^"']+)["']/)
    if (match) currentCategory = match[1]
  }
  if (line.includes('name:')) {
    const match = line.match(/name:\s*["']([^"']+)["']/)
    if (match) {
      products.add(match[1])
      productCategories.set(match[1], currentCategory)
    }
  }
}

// Vérifier les images disponibles
const images = getAllImages()

console.log(`   - ${Object.keys(MANUAL_MAPPING).length} correspondances manuelles\n`)

// Générer le mapping complet
const finalMapping = {}
let found = 0
let notFound = []

for (const product of products) {
  const category = productCategories.get(product)
  
  // 1. Vérifier le mapping manuel
  if (MANUAL_MAPPING[product]) {
    finalMapping[product] = MANUAL_MAPPING[product]
    found++
  }
  // 2. Gérer les Poke Bowls automatiquement
  else if (product.includes('Poke Bowl N°')) {
    const num = product.match(/N°(\d+)/)?.[1]
    if (num) {
      const path = num === '6' 
        ? 'poke bowl /poke 6.webp'
        : `poke bowl /POKE ${parseInt(num)}.webp`
      finalMapping[product] = path
      found++
    }
  }
  // 3. Cas spéciaux par catégorie
  else if (category === 'Makis par 6') {
    const normalized = product.toLowerCase().replace(/,/g, '').replace(/\s+/g, ' ')
    const possiblePath = `maki/makis ${normalized} .webp`
    if (images.some(img => img.path === possiblePath)) {
      finalMapping[product] = possiblePath
      found++
    } else {
      notFound.push({ product, category })
    }
  }
  else if (category === 'California par 6') {
    const normalized = product.toLowerCase().replace(/,/g, '').replace(/\s+/g, ' ')
    const possiblePath = `california/cali ${normalized} .webp`
    if (images.some(img => img.path === possiblePath)) {
      finalMapping[product] = possiblePath
      found++
    } else {
      notFound.push({ product, category })
    }
  }
  else {
    notFound.push({ product, category })
  }
}

// Générer le fichier TypeScript
const tsContent = `/**
 * Mapping précis des images généré le ${new Date().toISOString()}
 * ${found} correspondances sur ${products.size} produits
 */

export const IMAGE_MAPPING: Record<string, string> = {
${Object.entries(finalMapping)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, path]) => `  "${name}": "${path}"`)
  .join(',\n')}
}

export function getProductImage(productName: string): string | null {
  return IMAGE_MAPPING[productName] || null
}

// Export pour debug
export const UNMAPPED_PRODUCTS = [
${notFound.map(p => `  { name: "${p.product}", category: "${p.category}" }`).join(',\n')}
]
`

// Sauvegarder
const outputPath = path.join(__dirname, '..', 'lib', 'utils', 'imageMapping.generated.ts')
fs.writeFileSync(outputPath, tsContent)

// Afficher les produits non mappés par catégorie
const byCategory = {}
for (const item of notFound) {
  if (!byCategory[item.category]) byCategory[item.category] = []
  byCategory[item.category].push(item.product)
}

console.log('❌ Produits sans images (par catégorie):')
for (const [cat, items] of Object.entries(byCategory)) {
  console.log(`\n   ${cat}: (${items.length})`)
  items.slice(0, 5).forEach(item => console.log(`      - ${item}`))
  if (items.length > 5) console.log(`      ... +${items.length - 5} autres`)
}