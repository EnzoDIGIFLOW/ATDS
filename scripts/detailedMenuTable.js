/**
 * Script pour extraire TOUS les détails des produits du menu
 */

const fs = require('fs')
const path = require('path')

// Lire le fichier menu
const menuDataPath = path.join(__dirname, '..', 'menu-data-livraison.ts')
const menuContent = fs.readFileSync(menuDataPath, 'utf8')

// Extraire tous les produits avec TOUS leurs détails
const productsByCategory = new Map()
const lines = menuContent.split('\n')
let currentCategory = ''
let currentProduct = null

for (const line of lines) {
  // Détecter nouvelle catégorie
  if (line.includes('category:')) {
    const match = line.match(/category:\s*"([^"]+)"/)
    if (match) {
      currentCategory = match[1]
      if (!productsByCategory.has(currentCategory)) {
        productsByCategory.set(currentCategory, [])
      }
    }
  }
  
  // Détecter nouveau produit
  if (line.includes('name:')) {
    const match = line.match(/name:\s*"([^"]+)"/)
    if (match) {
      // Sauvegarder le produit précédent
      if (currentProduct && currentCategory) {
        productsByCategory.get(currentCategory).push(currentProduct)
      }
      // Créer nouveau produit
      currentProduct = {
        name: match[1],
        price: '',
        description: '',
        category: currentCategory
      }
    }
  }
  
  // Détecter prix
  if (line.includes('price:') && currentProduct) {
    const match = line.match(/price:\s*"([^"]*)"/)
    if (match) {
      currentProduct.price = match[1]
    }
  }
  
  // Détecter description
  if (line.includes('description:') && currentProduct) {
    const match = line.match(/description:\s*"([^"]*)"/)
    if (match) {
      currentProduct.description = match[1]
    }
  }
}

// Ajouter le dernier produit
if (currentProduct && currentCategory) {
  productsByCategory.get(currentCategory).push(currentProduct)
}

// Fonction pour afficher une ligne de séparation
function separator(char = '─', length = 150) {
  return char.repeat(length)
}

// Fonction pour formater une ligne de produit
function formatProductLine(num, name, price, description) {
  const numCol = num.toString().padStart(3, ' ')
  const nameCol = name.substring(0, 42).padEnd(44)
  const priceCol = price.substring(0, 15).padEnd(17)
  const descCol = description.substring(0, 80).padEnd(82)
  return `| ${numCol} | ${nameCol}| ${priceCol}| ${descCol}|`
}

// Affichage complet

console.log('═'.repeat(150))

let totalProducts = 0
let totalCategories = 0

for (const [category, products] of productsByCategory) {
  totalCategories++
  totalProducts += products.length
  
  console.log(`\n🏷️  ${category.toUpperCase()} (${products.length} produits)`)
  console.log(separator())
  console.log(formatProductLine('N°', 'NOM DU PRODUIT', 'PRIX', 'DESCRIPTION'))
  console.log(separator())
  
  products.forEach((product, index) => {
    const num = index + 1
    const name = product.name
    const price = product.price || 'N/A'
    const description = product.description || ''
    
    console.log(formatProductLine(num, name, price, description))
  })
  
  console.log(separator())
  
  // Afficher quelques statistiques par catégorie
  const withPrice = products.filter(p => p.price && p.price.trim() !== '').length
  const withDescription = products.filter(p => p.description && p.description.trim() !== '').length

}

// Statistiques finales
console.log(`\n${'═'.repeat(150)}`)

console.log(`${'═'.repeat(150)}`)

console.log(`• Moyenne par catégorie   : ${Math.round(totalProducts / totalCategories)} produits`)

// Analyser les prix et descriptions
let totalWithPrice = 0
let totalWithDescription = 0

for (const [category, products] of productsByCategory) {
  totalWithPrice += products.filter(p => p.price && p.price.trim() !== '').length
  totalWithDescription += products.filter(p => p.description && p.description.trim() !== '').length
}

console.log(`• Produits avec prix      : ${totalWithPrice}/${totalProducts} (${Math.round(totalWithPrice/totalProducts*100)}%)`)
console.log(`• Produits avec description: ${totalWithDescription}/${totalProducts} (${Math.round(totalWithDescription/totalProducts*100)}%)`)

// Top catégories par taille

console.log(separator('─', 60))

const sortedCategories = Array.from(productsByCategory.entries())
  .sort(([,a], [,b]) => b.length - a.length)

sortedCategories.forEach(([category, products], index) => {
  const rank = (index + 1).toString().padStart(2, ' ')
  const count = products.length.toString().padStart(2, ' ')
  const name = category.substring(0, 40).padEnd(42)

})

console.log(`\n${'═'.repeat(150)}`)
console.log(`🍱 Menu généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`)
console.log(`${'═'.repeat(150)}\n`)