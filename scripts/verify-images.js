/**
 * Script pour vérifier que toutes les images mappées existent réellement
 */

const fs = require('fs')
const path = require('path')

// Import du mapping (adaptation pour Node.js)
const mappingPath = path.join(__dirname, '..', 'lib', 'utils', 'imageMapping.generated.ts')
const mappingContent = fs.readFileSync(mappingPath, 'utf8')

// Extraction du mapping depuis le fichier TypeScript
const mappingMatch = mappingContent.match(/export const IMAGE_MAPPING: Record<string, string> = \{([\s\S]*?)\}/s)
if (!mappingMatch) {

  process.exit(1)
}

// Parse manuel du mapping (simpliste mais fonctionnel)
const mappingLines = mappingMatch[1].split('\n').filter(line => line.includes(':'))
const IMAGE_MAPPING = {}

mappingLines.forEach(line => {
  const match = line.match(/"([^"]+)":\s*"([^"]+)"/)
  if (match) {
    IMAGE_MAPPING[match[1]] = match[2]
  }
})

console.log(`🔍 Vérification de ${Object.keys(IMAGE_MAPPING).length} images mappées...\n`)

const publicDir = path.join(__dirname, '..', 'public', 'menu')
let foundCount = 0
let missingCount = 0
const missingImages = []

Object.entries(IMAGE_MAPPING).forEach(([productName, imagePath]) => {
  const fullPath = path.join(publicDir, imagePath)
  
  if (fs.existsSync(fullPath)) {

    foundCount++
  } else {
    console.log(`❌ ${productName} → ${imagePath} (MANQUANT)`)
    missingCount++
    missingImages.push({ productName, imagePath })
  }
})

console.log(`\n${'='.repeat(60)}`)

console.log(`${'='.repeat(60)}`)

console.log(`📈 Taux de disponibilité: ${Math.round(foundCount/(foundCount + missingCount)*100)}%`)

if (missingImages.length > 0) {

  missingImages.forEach(({ productName, imagePath }) => {

  })

}

// Export pour réutilisation
module.exports = {
  foundCount,
  missingCount,
  missingImages,
  availabilityRate: Math.round(foundCount/(foundCount + missingCount)*100)
}