/**
 * Script pour extraire tous les produits du menu sous forme de tableau
 */

const fs = require('fs')
const path = require('path')

// Lire le fichier menu
const menuDataPath = path.join(__dirname, '..', 'menu-data-livraison.ts')
const menuContent = fs.readFileSync(menuDataPath, 'utf8')

// Extraire tous les produits par catégorie
const productsByCategory = new Map()
const lines = menuContent.split('\n')
let currentCategory = ''
let currentProduct = null

for (const line of lines) {
  if (line.includes('category:')) {
    const match = line.match(/category:\s*"([^"]+)"/)
    if (match) {
      currentCategory = match[1]
      if (!productsByCategory.has(currentCategory)) {
        productsByCategory.set(currentCategory, [])
      }
    }
  }
  
  if (line.includes('name:')) {
    const match = line.match(/name:\s*"([^"]+)"/)
    if (match) {
      if (currentProduct) {
        productsByCategory.get(currentCategory).push(currentProduct)
      }
      currentProduct = {
        name: match[1],
        price: '',
        description: ''
      }
    }
  }
  
  if (line.includes('price:')) {
    const match = line.match(/price:\s*"([^"]+)"/)
    if (match && currentProduct) {
      currentProduct.price = match[1]
    }
  }
  
  if (line.includes('description:')) {
    const match = line.match(/description:\s*"([^"]+)"/)
    if (match && currentProduct) {
      currentProduct.description = match[1]
    }
  }
}

// Ajouter le dernier produit
if (currentProduct && currentCategory) {
  productsByCategory.get(currentCategory).push(currentProduct)
}

// Afficher le tableau

console.log('═'.repeat(120))

for (const [category, products] of productsByCategory) {
  console.log(`\n🏷️  ${category.toUpperCase()} (${products.length} produits)`)
  console.log('─'.repeat(120))
  console.log('| N° | Nom du produit'.padEnd(45) + '| Prix'.padEnd(12) + '| Description'.padEnd(60) + '|')
  console.log('─'.repeat(120))
  
  products.forEach((product, index) => {
    const num = (index + 1).toString().padStart(2, '0')
    const name = product.name.substring(0, 42).padEnd(43)
    const price = product.price.padEnd(10)
    const desc = (product.description || '').substring(0, 57).padEnd(58)

  })
  
  console.log('─'.repeat(120))
}

// Statistiques globales
const totalProducts = Array.from(productsByCategory.values()).reduce((sum, products) => sum + products.length, 0)
const categoryCount = productsByCategory.size

console.log('═'.repeat(50))

console.log(`• Moyenne par catégorie       : ${Math.round(totalProducts / categoryCount)} produits`)

// Top 5 des catégories avec le plus de produits

console.log('─'.repeat(50))
const sortedCategories = Array.from(productsByCategory.entries())
  .sort(([,a], [,b]) => b.length - a.length)
  .slice(0, 5)

sortedCategories.forEach(([category, products], index) => {

})
