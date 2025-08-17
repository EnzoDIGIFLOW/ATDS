#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Charger le mapping actuel
const mappingPath = path.join(process.cwd(), 'public', 'menu-images-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Dossier des images
const menuDir = path.join(process.cwd(), 'src', 'assets', 'menu');

// Fonction pour lister récursivement toutes les images
function getAllImages(dir, prefix = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = prefix ? `${prefix}/${item}` : item;
    
    if (fs.statSync(fullPath).isDirectory()) {
      // Récupérer les images dans les sous-dossiers
      files.push(...getAllImages(fullPath, relativePath));
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(item)) {
      files.push(relativePath);
    }
  }
  
  return files;
}

// Obtenir toutes les images disponibles
const availableImages = getAllImages(menuDir);
console.log(`✅ Trouvé ${availableImages.length} images disponibles`);

// Créer un index des images pour recherche rapide
const imageIndex = {};
availableImages.forEach(img => {
  const normalizedName = path.basename(img)
    .toLowerCase()
    .replace(/\.(webp|jpg|jpeg|png)$/i, '')
    .replace(/[_\s-]+/g, '-');
  imageIndex[normalizedName] = img;
});

// Fonction pour trouver la meilleure correspondance
function findBestMatch(productId, category) {
  // Recherche exacte
  if (imageIndex[productId]) {
    return imageIndex[productId];
  }
  
  // Recherche avec variantes
  const variants = [
    productId,
    productId.replace(/-/g, ' '),
    productId.replace(/-/g, '_'),
    productId.replace(/-/g, ''),
  ];
  
  for (const variant of variants) {
    for (const [key, value] of Object.entries(imageIndex)) {
      if (key.includes(variant) || variant.includes(key)) {
        return value;
      }
    }
  }
  
  return null;
}

// Corriger le mapping
let fixedCount = 0;
let nullCount = 0;
let soonCount = 0;

for (const [category, items] of Object.entries(mapping)) {
  for (const [productId, currentValue] of Object.entries(items)) {
    // Garder les valeurs null et "soon"
    if (currentValue === null) {
      nullCount++;
      continue;
    }
    if (currentValue === "soon") {
      soonCount++;
      continue;
    }
    
    // Vérifier si le chemin actuel existe
    const currentPath = currentValue;
    const exists = availableImages.some(img => img === currentPath);
    
    if (!exists) {
      // Essayer de trouver une correspondance
      const match = findBestMatch(productId, category);
      if (match) {
        mapping[category][productId] = match;
        fixedCount++;
        console.log(`  ✓ Corrigé: ${productId} -> ${match}`);
      } else {
        // Si aucune correspondance, mettre "soon"
        mapping[category][productId] = "soon";
        console.log(`  ⚠️ Aucune image trouvée pour: ${productId} (mis à "soon")`);
      }
    }
  }
}

// Sauvegarder le mapping corrigé
fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));

console.log('\n📊 Résumé:');
console.log(`  - Images corrigées: ${fixedCount}`);
console.log(`  - Valeurs null: ${nullCount}`);
console.log(`  - Valeurs "soon": ${soonCount}`);
console.log(`  - Total d'entrées: ${Object.values(mapping).reduce((acc, cat) => acc + Object.keys(cat).length, 0)}`);