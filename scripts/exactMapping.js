/**
 * Script pour créer un mapping EXACT basé sur la structure réelle
 */

const fs = require('fs')
const path = require('path')

// Lire le menu pour avoir tous les produits par catégorie
const menuDataPath = path.join(__dirname, '..', 'menu-data-livraison.ts')
const menuContent = fs.readFileSync(menuDataPath, 'utf8')

// Fonction pour lister les images d'un dossier
function listImagesInFolder(folderName) {
  const folderPath = path.join(__dirname, '..', 'src', 'assets', 'menu', folderName)
  if (!fs.existsSync(folderPath)) {

    return []
  }
  return fs.readdirSync(folderPath).filter(f => f.endsWith('.webp'))
}

// Extraire tous les produits du menu avec leur catégorie
function extractProducts() {
  const products = []
  const lines = menuContent.split('\n')
  let currentCategory = ''
  let currentProduct = null
  
  for (const line of lines) {
    if (line.includes('category:')) {
      const match = line.match(/category:\s*"([^"]+)"/)
      if (match) {
        currentCategory = match[1]
      }
    }
    if (line.includes('name:')) {
      const match = line.match(/name:\s*["']([^"']+)["']/)
      if (match) {
        if (currentProduct) products.push(currentProduct)
        currentProduct = {
          name: match[1],
          category: currentCategory
        }
      }
    }
  }
  if (currentProduct) products.push(currentProduct)
  return products
}

// Mapping EXACT des catégories vers les dossiers
const CATEGORY_TO_FOLDER = {
  'Makis par 6': 'maki',
  'California par 6': 'california',
  "Sushi à l'unité": 'sushi nigiri',  // LE BON DOSSIER !
  'Sashimi par 5': 'sashimi',
  'Sashimi par 6': 'sashimi',
  'Poke Bowl sur lit de riz': 'poke bowl ',
  'Crispy par 6': 'crispy',
  'Crispys (frit) par 6': 'crispy',
  'Spring par 6': 'spring ',
  'Calispring par 6': 'spring ',
  'Plateaux': 'plateaux ',
  'Plateaux à partager': 'plateaux ',
  'Plats Chauds': 'plat chaud ',
  'Création du Chef par 6': 'création du chef',
  'Les Créations du Chef': 'création du chef',
  'Nos Accompagnements': 'accompagnement',
  'Desserts': 'dessert',
  'Boissons': 'boisson',
  'Formules du Midi': 'formule du midi ',
  'Les Formules': 'formule du midi ',
  'Roll\'s par 6': 'roll_s',
  'Flocon par 6': 'flocon',
  'Buritos': 'burito',
  'Chirashi 10 tranches': 'chirachi',
  'Tartare': 'tartare',
  'Soupes': 'soupe miso',
  'Nouilles': 'nouilles'
}

// Analyser et créer le mapping

console.log('=' .repeat(70))

const products = extractProducts()
const EXACT_MAPPING = {}

// Grouper par catégorie
const byCategory = {}
for (const product of products) {
  if (!byCategory[product.category]) {
    byCategory[product.category] = []
  }
  byCategory[product.category].push(product.name)
}

// Analyser chaque catégorie
for (const [category, productNames] of Object.entries(byCategory)) {
  const folder = CATEGORY_TO_FOLDER[category]
  
  if (!folder) {

    continue
  }

  const images = listImagesInFolder(folder)

  // Mapper chaque produit
  for (const productName of productNames) {
    let imagePath = null
    
    // === RÈGLES SPÉCIFIQUES PAR CATÉGORIE ===
    
    // SUSHI À L'UNITÉ
    if (category === "Sushi à l'unité") {
      const mapping = {
        'Saumon': 'sushi saumon.webp',  // SANS ESPACE avant .webp pour celui-là
        'Saumon Avocat': 'sushi saumon avocat.webp',
        'Saumon, Tobiko': 'sushi saumon tobiko sauce spicy.webp',
        'Saumon Cheese': 'sushi saumon cheese .webp',
        'Saumon Braisé': 'sushi saumon braisé.webp',
        'Saumon Braisé Cheese': 'sushi saumon braisé truffe.webp',
        'Saumon Braisé Truffe': 'sushi saumon braisé truffe.webp',
        'Saumon Ciboulette': 'sushi saumon ciboulette .webp',
        'Saumon Mangue': 'sushi saumon mangue .webp',
        'Thon': 'sushi thon .webp',
        'Thon Braisé': 'sushi thon braisé.webp',
        'Thon Cheese': 'sushi thon cheese.webp',
        'Crevette': 'sushi crevette .webp',
        'Omelette': 'sushi omelette.webp',
        'Avocat': 'sushi avocat.webp'
      }
      const fileName = mapping[productName]
      if (fileName && images.includes(fileName)) {
        imagePath = `${folder}/${fileName}`
      }
    }
    
    // MAKIS PAR 6
    else if (category === 'Makis par 6') {
      const normalizedName = productName.toLowerCase()
        .replace(/,\s*/g, ' ')
        .replace(/'/g, '')
        .trim()
      
      // Chercher "makis [nom] .webp"
      const expectedFile = `makis ${normalizedName} .webp`
      if (images.includes(expectedFile)) {
        imagePath = `${folder}/${expectedFile}`
      } else {
        // Variantes possibles
        const variants = [
          `makis ${normalizedName}.webp`,
          `maki ${normalizedName} .webp`,
          `maki ${normalizedName}.webp`
        ]
        for (const variant of variants) {
          if (images.includes(variant)) {
            imagePath = `${folder}/${variant}`
            break
          }
        }
      }
    }
    
    // CALIFORNIA PAR 6
    else if (category === 'California par 6') {
      const normalizedName = productName.toLowerCase()
        .replace(/,\s*/g, ' ')
        .replace(/'/g, '')
        .trim()
      
      // Chercher "cali [nom] .webp" ou "cali [nom].webp"
      const variants = [
        `cali ${normalizedName} .webp`,
        `cali ${normalizedName}.webp`,
        `california ${normalizedName} .webp`,
        `california ${normalizedName}.webp`
      ]
      
      for (const variant of variants) {
        if (images.includes(variant)) {
          imagePath = `${folder}/${variant}`
          break
        }
      }
    }
    
    // POKE BOWLS
    else if (category === 'Poke Bowl sur lit de riz') {
      const match = productName.match(/N°(\d+)/)
      if (match) {
        const num = parseInt(match[1])
        // poke 6 est en minuscules, les autres en majuscules
        const fileName = num === 6 ? `poke ${num}.webp` : `POKE ${num}.webp`
        if (images.includes(fileName)) {
          imagePath = `${folder}/${fileName}`
        }
      }
    }
    
    // SASHIMI
    else if (category.includes('Sashimi')) {
      const mapping = {
        'Saumon': 'sashimi saumon .webp',
        'Thon': 'sashimi thon.webp',
        'Duo': 'sashimi duo .webp'
      }
      const fileName = mapping[productName]
      if (fileName && images.includes(fileName)) {
        imagePath = `${folder}/${fileName}`
      }
    }
    
    // CRISPY
    else if (category.includes('Crispy')) {
      const normalizedName = productName.toLowerCase()
        .replace(/,\s*/g, ' ')
        .trim()
      
      const variants = [
        `crispy ${normalizedName} .webp`,
        `crispy ${normalizedName}.webp`,
        `${normalizedName}.webp`
      ]
      
      for (const variant of variants) {
        if (images.includes(variant)) {
          imagePath = `${folder}/${variant}`
          break
        }
      }
    }
    
    // PLATS CHAUDS
    else if (category === 'Plats Chauds') {
      // Mapping manuel pour certains
      const mapping = {
        'Gyoza (4 pièces)': 'gyoza 4 pieces .webp',
        'Tempura Crevette (6 pièces)': 'tempura crevette 6 pieces.webp',
        'Yakitori Saumon': 'Brochette.webp',
        'Yakitori Poulet': 'Brochette poulet.webp',
        'Yakitori Crevette': 'Brochette crevette.webp',
        'Yakitori Bœuf Fromage': 'Brochette boeuf fromage.webp'
      }
      
      const fileName = mapping[productName]
      if (fileName && images.includes(fileName)) {
        imagePath = `${folder}/${fileName}`
      }
    }
    
    // ACCOMPAGNEMENTS
    else if (category === 'Nos Accompagnements') {
      const mapping = {
        'Riz Vinaigré': 'riz vinaigre .webp',
        'Salade de Chou': 'salade de chou .webp',
        'Salade Edamame': 'edamame.webp',
        'Salade Algue Wakame': 'wakame .webp',
        'Soupe Miso': '../soupe miso/soupe miso.webp',  // Dans un autre dossier !
        'Soupe Miso Nature': '../soupe miso/soupe miso.webp',
        'Bol de Riz': 'riz vinaigre .webp'
      }
      
      const fileName = mapping[productName]
      if (fileName) {
        if (fileName.startsWith('../')) {
          imagePath = fileName.replace('../', '')
        } else if (images.includes(fileName)) {
          imagePath = `${folder}/${fileName}`
        }
      }
    }
    
    // PLATEAUX
    else if (category.includes('Plateau')) {
      // Les plateaux sont numérotés
      const plateauOrder = [
        'Plateau Makis (18 pièces)',
        'Super Box (14 pièces)',
        'Plateau California (18 pièces)',
        'Plateau Sushi (10 pièces)',
        'Plateau Sushi Maki (14 pièces)',
        'Plateau Découverte (14 pièces)',
        'Plateau Original (23 pièces)',
        'Plateau California Dream (15 pièces)',
        'Plateau Tasty (24 pièces)',
        'Plateau Party (45 pièces)',
        'Plateau Prestige (70 pièces)',
        'Plateau Gold (112 pièces)'
      ]
      
      const index = plateauOrder.indexOf(productName)
      if (index !== -1) {
        const fileName = `plateau ${index + 1}.webp`
        if (images.includes(fileName)) {
          imagePath = `${folder}/${fileName}`
        }
      }
    }
    
    // Si on a trouvé une image, l'ajouter au mapping
    if (imagePath) {
      EXACT_MAPPING[productName] = imagePath

    } else {

    }
  }
}

// Générer le fichier TypeScript final
const tsContent = `/**
 * MAPPING EXACT des images - Généré le ${new Date().toISOString()}
 * ${Object.keys(EXACT_MAPPING).length} produits avec images sur ${products.length}
 */

export const IMAGE_MAPPING: Record<string, string> = {
${Object.entries(EXACT_MAPPING)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, path]) => `  "${name}": "${path}"`)
  .join(',\n')}
}

export function getProductImage(productName: string): string | null {
  return IMAGE_MAPPING[productName] || null
}
`

// Sauvegarder
const outputPath = path.join(__dirname, '..', 'lib', 'utils', 'imageMapping.generated.ts')
fs.writeFileSync(outputPath, tsContent)

console.log(`\n\n${'=' .repeat(70)}`)

console.log(`   - ${Object.keys(EXACT_MAPPING).length} produits avec images`)
console.log(`   - ${products.length - Object.keys(EXACT_MAPPING).length} produits sans images`)
