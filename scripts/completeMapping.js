/**
 * Script pour créer un mapping complet basé sur l'analyse des fichiers
 */

const fs = require('fs')
const path = require('path')

// Scanner tous les fichiers
function scanAllImages() {
  const menuDir = path.join(__dirname, '..', 'src', 'assets', 'menu')
  const result = {}
  
  function scan(dir, prefix = '') {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        const folderName = file
        const folderImages = []
        const subFiles = fs.readdirSync(fullPath)
        for (const subFile of subFiles) {
          if (subFile.endsWith('.webp')) {
            folderImages.push(subFile)
          }
        }
        result[folderName] = folderImages
      }
    }
  }
  
  scan(menuDir)
  return result
}

// Afficher la structure
const structure = scanAllImages()

console.log('=' .repeat(70))

for (const [folder, files] of Object.entries(structure)) {
  console.log(`\n📂 ${folder}/ (${files.length} fichiers)`)
  if (files.length <= 15) {
    files.forEach(f => console.log(`   - ${f}`))
  } else {
    files.slice(0, 10).forEach(f => console.log(`   - ${f}`))

  }
}

// Créer un mapping étendu basé sur les fichiers réels
const EXTENDED_MAPPING = {
  // === MAKIS (basé sur le dossier 'maki') ===
  'Cheese': 'maki/makis cheese .webp',
  'Avocat': 'maki/makis avocat .webp',
  'Avocat, Mayo': 'maki/makis avocat mayo .webp',
  'Avocat Amyo': 'maki/makis avocat amyo .webp',
  'Poulet, Cheese': 'maki/makis poulet cheese .webp',
  'Poulet, Curry': 'maki/makis poulet curry .webp',
  'Poulet, Mayonnaise': 'maki/makis poulet mayo .webp',
  'Concombre, Cheese': 'maki/makis concombre cheese .webp',
  'Saumon': 'maki/makis saumon .webp',
  'Thon': 'maki/makis thon .webp',
  'Thon, Mayonnaise': 'maki/makis thon mayo .webp',
  'Surimi': 'maki/makis surimi .webp',
  
  // === CALIFORNIA (basé sur le dossier 'california') ===
  'Poulet, Avocat': 'california/cali poulet avocat .webp',
  'Poulet, Cheese': 'california/cali poulet cheese .webp',
  'Poulet, Curry': 'california/cali poulet curry .webp',
  'Saumon Avocat': 'california/cali saumon avocat .webp',
  'Saumon, Avocat': 'california/cali saumon avocat .webp',
  'Saumon, Avocat, Tobiko': 'california/cali saumon avocat tobiko.webp',
  'Saumon Cheese': 'california/cali saumon cheese .webp',
  'Saumon, Cheese': 'california/cali saumon cheese .webp',
  'Thon Avocat': 'california/cali thon avocat .webp',
  'Thon, Avocat': 'california/cali thon avocat .webp',
  'Gambas Cheese': 'california/cali gambas cheese .webp',
  'Gambas, Cheese': 'california/cali gambas cheese .webp',
  'Gambas Cheese, Oignon Frit': 'california/cali gambas cheese oignon frit .webp',
  'Gambas, Cheese, Oignon Frit': 'california/cali gambas cheese oignon frit .webp',
  
  // === SUSHI NIGIRI ===
  'Saumon Cheese': 'sushi nigiri/sushi saumon cheese .webp',
  'Saumon Braisé': 'sushi nigiri/sushi saumon braisé.webp',
  'Saumon Braisé Truffe': 'sushi nigiri/sushi saumon braisé truffe.webp',
  'Saumon Braisé, Truffe': 'sushi nigiri/sushi saumon braisé truffe.webp',
  'Saumon Mangue': 'sushi nigiri/sushi saumon mangue .webp',
  'Saumon Ciboulette': 'sushi nigiri/sushi saumon ciboulette .webp',
  'Thon': 'sushi nigiri/sushi thon .webp',
  'Crevette': 'sushi nigiri/sushi crevette .webp',
  
  // === CRISPY ===
  'Cheese': 'crispy/crispy cheese .webp',
  'Crispy Cheese': 'crispy/crispy cheese .webp',
  'Crispy Saumon Cheese': 'crispy/crispy saumon cheese .webp',
  'Crispy Thon Cheese': 'crispy/crispy thon cheese .webp',
  'Crispy Crevette Cheese': 'crispy/crispy crevette cheese.webp',
  
  // === SPRING ===
  'Spring Saumon': 'spring /spring saumon 2.webp',
  'Spring Saumon Cheese': 'spring /spring saumo cheese tobiko.webp',
  'Spring Thon Mayo': 'spring /spring thon mayo .webp',
  'Spring Thon Cheese': 'spring /spring thon cheese .webp',
  'Spring Thon Mangue': 'spring /spring thon mangue .webp',
  'Spring Gambas Avocat': 'spring /spring gambas avocat .webp',
  'Spring Gambas Cheese': 'spring /spring gambas cheese.webp',
  'Spring Poulet Frit Avocat Cheese': 'spring /spring poulet frit avoca cheese .webp',
  
  // === POKE BOWLS (tous les numéros) ===
  'Poke Bowl N°01': 'poke bowl /POKE 1.webp',
  'Poke Bowl N°02': 'poke bowl /POKE 2.webp',
  'Poke Bowl N°03': 'poke bowl /POKE 3.webp',
  'Poke Bowl N°04': 'poke bowl /POKE 4.webp',
  'Poke Bowl N°05': 'poke bowl /POKE 5.webp',
  'Poke Bowl N°06': 'poke bowl /poke 6.webp',
  'Poke Bowl N°07': 'poke bowl /POKE 7.webp',
  'Poke Bowl N°08': 'poke bowl /POKE 8.webp',
  'Poke Bowl N°09': 'poke bowl /POKE 9.webp',
  'Poke Bowl N°10': 'poke bowl /POKE 10.webp',
  'Poke Bowl N°11': 'poke bowl /POKE 11.webp',
  'Poke Bowl N°12': 'poke bowl /POKE 12.webp',
  
  // === PLATS CHAUDS ===
  'Gyoza (4 pièces)': 'plat chaud /gyoza 4 pieces .webp',
  'Gyoza Poulet Curry': 'plat chaud /gyoza poulet curry.webp',
  'Gyoza Porc': 'plat chaud /Gyoza porc .webp',
  'Gyoza Crevette': 'plat chaud /gyoza crevette .webp',
  'Yakitori Saumon': 'plat chaud /Brochette.webp',
  'Yakitori Poulet': 'plat chaud /Brochette poulet.webp',
  
  // === ACCOMPAGNEMENTS ===
  'Riz Vinaigré': 'accompagnement/riz vinaigre .webp',
  'Salade de Chou': 'accompagnement/salade de chou .webp',
  'Salade Edamame': 'accompagnement/edamame .webp',
  'Salade Algue Wakame': 'accompagnement/wakame .webp',
  'Soupe Miso': 'soupe miso/soupe miso.webp',
  'Soupe Miso Nature': 'soupe miso/soupe miso.webp',
  
  // === SASHIMI ===
  'Duo': 'sashimi/sashimi duo .webp',
  'Saumon': 'sashimi/sashimi saumon .webp',
  'Thon': 'sashimi/sashimi thon.webp',
  
  // === DESSERTS ===
  'Makis Mangue Nutella Coco Rapé': 'dessert/Makis mangue nutella coco rapé -2.webp',
  'Tiramisu Nutella Spéculoos': 'dessert/tiramisu nutella spéculos.webp',
  'Mochi du Jour': 'dessert/mochis .webp',
  'Mochis': 'dessert/mochis-coupe.webp',
  
  // === PLATEAUX ===
  'Plateau Makis (18 pièces)': 'plateaux /plateau 1.webp',
  'Super Box (14 pièces)': 'plateaux /plateau 2.webp',
  'Plateau California (18 pièces)': 'plateaux /plateau 3.webp',
  'Box Sushi Saumon (10 pièces)': 'plateaux /plateau 4.webp',
  'Chicken Box (24 pièces)': 'plateaux /plateau 5.webp',
  'Box Sushi Mix (12 pièces)': 'plateaux /plateau 6.webp',
  'Love Box (24 pièces)': 'plateaux /plateau 7.webp',
  'Calibox (30 pièces)': 'plateaux /plateau 8.webp',
  'Plateaux Chaud (26 pièces)': 'plateaux /plateau 9.webp',
  'Box Sushi Duo (20 pièces)': 'plateaux /plateau 10.webp',
  
  // === CRÉATION DU CHEF ===
  'California du Chef': 'création du chef/california du chef.webp',
  'Cheese Ball': 'création du chef/cheese ball.webp',
  'Création Crunchy': 'création du chef/création crunchy.webp',
  'Création Printemps': 'création du chef/création printemps .webp',
  'L\'Italien': 'création du chef/L_italien 2.webp',
  'L\'Italien 2': 'création du chef/L_italien 2 .webp',
  'Le Volcan': 'création du chef/Le volcan .webp',
  'Maki du Chef': 'création du chef/maki du chef .webp',
  
  // === BOISSONS ===
  'Coca Cola': 'boisson/coca.webp',
  'Coca Cola Zero': 'boisson/coca zero.webp',
  'Eau Plate': 'boisson/eau.webp',
  'San Pellegrino': 'boisson/san pellegrino.webp',
}

// Générer le fichier TypeScript final
const tsContent = `/**
 * Mapping complet des images - Généré le ${new Date().toISOString()}
 * ${Object.keys(EXTENDED_MAPPING).length} produits mappés
 */

export const IMAGE_MAPPING: Record<string, string> = {
${Object.entries(EXTENDED_MAPPING)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, path]) => `  "${name}": "${path}"`)
  .join(',\n')}
}

export function getProductImage(productName: string): string | null {
  // Recherche directe
  if (IMAGE_MAPPING[productName]) {
    return IMAGE_MAPPING[productName]
  }
  
  // Gestion des variantes (virgules, espaces, etc.)
  const normalized = productName.replace(/,\\s*/g, ', ')
  if (IMAGE_MAPPING[normalized]) {
    return IMAGE_MAPPING[normalized]
  }
  
  // Gestion des Poke Bowls par numéro
  if (productName.includes('Poke Bowl N°')) {
    const num = productName.match(/N°(\\d+)/)?.[1]
    if (num) {
      const path = num === '6' 
        ? 'poke bowl /poke 6.webp'
        : \`poke bowl /POKE \${parseInt(num)}.webp\`
      return path
    }
  }
  
  return null
}

// Liste des produits sans images
export const PRODUCTS_WITHOUT_IMAGES = [
  "Formules",
  "Quelques boissons",
  "Certains plats chauds spéciaux",
  "Certains desserts du jour"
]
`

// Sauvegarder
const outputPath = path.join(__dirname, '..', 'lib', 'utils', 'imageMapping.generated.ts')
fs.writeFileSync(outputPath, tsContent)

console.log(`   - ${Object.keys(EXTENDED_MAPPING).length} produits avec images`)
