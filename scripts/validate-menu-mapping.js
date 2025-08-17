#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Chemins
const MAPPING_FILE = path.join(__dirname, '..', 'public', 'menu-images-mapping.json');
const MENU_IMAGES_DIR = path.join(__dirname, '..', 'public', 'menu');
const MENU_DATA_FILE = path.join(__dirname, '..', 'menu-data-livraison.ts');

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Charger le mapping
let mapping;
try {
  mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));

} catch (error) {

  process.exit(1);
}

// Fonction pour vérifier si un fichier image existe
function imageExists(imagePath) {
  if (!imagePath || imagePath === 'soon' || imagePath === null) {
    return true; // On considère ces valeurs comme valides
  }
  
  const fullPath = path.join(MENU_IMAGES_DIR, imagePath);
  return fs.existsSync(fullPath);
}

// Statistiques
let stats = {
  totalProducts: 0,
  withImages: 0,
  withSoon: 0,
  withNull: 0,
  missingImages: [],
  categories: {}
};

// Valider le mapping

for (const [category, products] of Object.entries(mapping)) {

  stats.categories[category] = {
    total: 0,
    withImages: 0,
    withSoon: 0,
    withNull: 0,
    missing: []
  };
  
  for (const [productId, imagePath] of Object.entries(products)) {
    stats.totalProducts++;
    stats.categories[category].total++;
    
    if (imagePath === 'soon') {
      stats.withSoon++;
      stats.categories[category].withSoon++;

    } else if (imagePath === null) {
      stats.withNull++;
      stats.categories[category].withNull++;

    } else if (imageExists(imagePath)) {
      stats.withImages++;
      stats.categories[category].withImages++;

    } else {
      stats.missingImages.push({ category, productId, imagePath });
      stats.categories[category].missing.push(productId);

    }
  }
  
  // Résumé par catégorie
  const cat = stats.categories[category];

  if (cat.missing.length > 0) {

  }

}

// Résumé global
console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);

console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);

console.log(`${colors.green}Avec images: ${stats.withImages} (${(stats.withImages/stats.totalProducts*100).toFixed(1)}%)${colors.reset}`);
console.log(`${colors.yellow}Bientôt disponibles: ${stats.withSoon} (${(stats.withSoon/stats.totalProducts*100).toFixed(1)}%)${colors.reset}`);
console.log(`${colors.magenta}Sans images: ${stats.withNull} (${(stats.withNull/stats.totalProducts*100).toFixed(1)}%)${colors.reset}`);

if (stats.missingImages.length > 0) {

  stats.missingImages.forEach(({ category, productId, imagePath }) => {

  });
}

// Suggestions d'amélioration
console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);

console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);

// Catégories avec le plus de "soon"
const categoriesWithSoon = Object.entries(stats.categories)
  .filter(([_, cat]) => cat.withSoon > 0)
  .sort((a, b) => b[1].withSoon - a[1].withSoon)
  .slice(0, 3);

if (categoriesWithSoon.length > 0) {

  categoriesWithSoon.forEach(([name, cat]) => {

  });
}

// Afficher la commande pour mettre à jour une image

