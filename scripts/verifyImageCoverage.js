/**
 * Script pour vérifier la couverture d'images du menu
 */

const fs = require('fs')
const path = require('path')

// Charger les données du menu
const menuDataPath = path.join(__dirname, '..', 'menu-data-livraison.ts')
const menuContent = fs.readFileSync(menuDataPath, 'utf8')

// Extraire tous les produits du menu
const productMatches = menuContent.matchAll(/name: "([^"]+)"/g)
const categoryMatches = menuContent.matchAll(/category: "([^"]+)"/g)

const products = []
const categories = []

for (const match of productMatches) {
  products.push(match[1])
}

for (const match of categoryMatches) {
  categories.push(match[1])
}

// Créer des paires produit-catégorie
const menuItems = []
let categoryIndex = 0
let itemCount = 0

menuContent.split('\n').forEach(line => {
  if (line.includes('category:')) {
    categoryIndex = categories.findIndex((c, i) => i >= categoryIndex && line.includes(`"${c}"`))
    itemCount = 0
  }
  if (line.includes('name:') && categoryIndex < categories.length) {
    const nameMatch = line.match(/name: "([^"]+)"/)
    if (nameMatch) {
      menuItems.push({
        name: nameMatch[1],
        category: categories[categoryIndex]
      })
      itemCount++
    }
  }
})

// Fonction de mapping existante
function normalizeProductNameForFile(productName) {
  return productName
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
}

const categoryToFolderMapping = {
  'Makis par 6': 'makis',
  'California par 6': 'california',
  'Sushi à l\'unité': 'sushis',
  'Sashimi par 5': 'sashimi',
  'Sashimi par 6': 'sashimi',
  'Spring par 6': 'spring',
  'Rolls par 6': 'rolls',
  'Roll\'s par 6': 'rolls',
  'Crispy par 6': 'crispy',
  'Crispys (frit) par 6': 'crispy',
  'Poke Bowl sur lit de riz': 'poke-bowls',
  'Nos Accompagnements': 'accompagnements',
  'Desserts': 'desserts',
  'Boissons': 'boissons',
  'Plateaux à partager': 'plateaux',
  'Plateaux': 'plateaux',
  'Les Formules': 'formules',
  'Formules du Midi': 'formules',
  'Les Créations du Chef': 'creation-chef',
  'Création du Chef par 6': 'creation-chef',
  'Plats Chauds': 'plats-chauds',
  'Chirashi 10 tranches': 'chirashi',
  'Calispring par 6': 'spring',
  'Flocon par 6': 'flocon',
  'Buritos': 'buritos',
  'Tartare': 'tartare'
}

function getImagePath(productName, category) {
  const folder = categoryToFolderMapping[category]
  if (!folder) return null
  
  const fileName = normalizeProductNameForFile(productName)
  
  if (folder === 'makis') {
    if (!fileName.startsWith('makis ')) {
      return path.join(__dirname, '..', 'public', 'menu', folder, `makis ${fileName} .webp`)
    }
    return path.join(__dirname, '..', 'public', 'menu', folder, `${fileName} .webp`)
  }
  
  if (folder === 'california') {
    if (!fileName.startsWith('cali ')) {
      return path.join(__dirname, '..', 'public', 'menu', folder, `cali ${fileName} .webp`)
    }
    return path.join(__dirname, '..', 'public', 'menu', folder, `${fileName} .webp`)
  }
  
  if (folder === 'sushis') {
    if (!fileName.startsWith('sushi ')) {
      if (fileName.includes('braisé') || fileName.includes('braise')) {
        return path.join(__dirname, '..', 'public', 'menu', folder, `sushi ${fileName}.webp`)
      }
      return path.join(__dirname, '..', 'public', 'menu', folder, `sushi ${fileName} .webp`)
    }
    return path.join(__dirname, '..', 'public', 'menu', folder, `${fileName} .webp`)
  }
  
  if (folder === 'poke-bowls') {
    const numberMatch = productName.match(/(?:N°|n°|#)?(\d+)/)
    if (numberMatch) {
      const num = parseInt(numberMatch[1])
      return path.join(__dirname, '..', 'public', 'menu', folder, `POKE ${num}.webp`)
    }
  }
  
  if (folder === 'accompagnements') {
    return path.join(__dirname, '..', 'public', 'menu', folder, `${fileName} .webp`)
  }
  
  const foldersWithSpace = ['desserts', 'boissons', 'plats-chauds', 'spring', 'rolls', 'crispy']
  if (foldersWithSpace.includes(folder)) {
    return path.join(__dirname, '..', 'public', 'menu', folder, `${fileName} .webp`)
  }
  
  return path.join(__dirname, '..', 'public', 'menu', folder, `${fileName}.webp`)
}

// Analyser la couverture

console.log('=' .repeat(70))

const stats = {
  total: 0,
  withImage: 0,
  withoutImage: 0,
  byCategory: {}
}

// Grouper par catégorie
const groupedByCategory = {}
menuItems.forEach(item => {
  if (!groupedByCategory[item.category]) {
    groupedByCategory[item.category] = []
  }
  groupedByCategory[item.category].push(item)
})

// Analyser chaque catégorie
Object.entries(groupedByCategory).forEach(([category, items]) => {
  let found = 0
  let missing = 0
  const missingItems = []
  
  items.forEach(item => {
    stats.total++
    const imagePath = getImagePath(item.name, category)
    
    if (imagePath && fs.existsSync(imagePath)) {
      found++
      stats.withImage++
    } else {
      missing++
      stats.withoutImage++
      missingItems.push(item.name)
    }
  })
  
  stats.byCategory[category] = {
    total: items.length,
    found,
    missing,
    percentage: Math.round((found / items.length) * 100),
    missingItems
  }
})

// Afficher les résultats
console.log(`\n📸 COUVERTURE GLOBALE: ${Math.round((stats.withImage / stats.total) * 100)}%`)

// Trier par pourcentage de couverture
const sortedCategories = Object.entries(stats.byCategory)
  .sort((a, b) => b[1].percentage - a[1].percentage)

sortedCategories.forEach(([category, data]) => {
  const emoji = data.percentage === 100 ? '✅' : data.percentage >= 50 ? '⚠️' : '❌'
  console.log(`${emoji} ${category}: ${data.percentage}% (${data.found}/${data.total})`)
  
  if (data.missing > 0 && data.missing <= 5) {
    console.log(`   Manquants: ${data.missingItems.join(', ')}`)
  } else if (data.missing > 5) {
    console.log(`   Manquants: ${data.missingItems.slice(0, 3).join(', ')}... (+${data.missing - 3} autres)`)
  }
})

// Recommandations

const lowCoverageCategories = sortedCategories
  .filter(([_, data]) => data.percentage < 50)
  .map(([cat, _]) => cat)

if (lowCoverageCategories.length > 0) {

  lowCoverageCategories.forEach(cat => {
    console.log(`   - ${cat} (dossier: ${categoryToFolderMapping[cat] || 'non mappé'})`)
  })
} else {

}

// Statistiques des dossiers

const menuDir = path.join(__dirname, '..', 'public', 'menu')
const folders = fs.readdirSync(menuDir).filter(f => 
  fs.statSync(path.join(menuDir, f)).isDirectory()
)

const usedFolders = new Set(Object.values(categoryToFolderMapping))
const unusedFolders = folders.filter(f => !usedFolders.has(f))

if (unusedFolders.length > 0) {

  unusedFolders.forEach(f => {
    const fileCount = fs.readdirSync(path.join(menuDir, f)).length
    console.log(`   - ${f}/ (${fileCount} fichiers)`)
  })
}

console.log('\n' + '=' .repeat(70))
