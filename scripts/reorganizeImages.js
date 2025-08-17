#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'src', 'assets', 'menu');
const destDir = path.join(__dirname, '..', 'public', 'menu');

// Mapping des dossiers vers les catégories finales
const folderMapping = {
  'california': 'california',
  'maki': 'makis',
  'sushi nigiri': 'sushis',
  'sashimi': 'sashimi',
  'burito': 'buritos',
  'flocon': 'flocon',
  'crispy': 'crispy',
  'création du chef': 'creation-chef',
  'roll\'s': 'rolls',
  'spring': 'spring',
  'plat chaud': 'plats-chauds',
  'nouilles': 'nouilles',
  'poke bowl': 'poke-bowls',
  'chirachi': 'chirashi',
  'plateaux': 'plateaux',
  'formule du midi': 'formules',
  'accompagnement': 'accompagnements',
  'dessert': 'desserts',
  'boisson': 'boissons',
  'mochi': 'mochis',
  'soupe miso': 'soupes',
  'tartare': 'tartare',
  'restaurant et image déco': 'restaurant',
  'AUTRES PHOTOS': 'autres'
};

async function reorganizeImages() {
  try {

    // Créer le dossier de destination
    await fs.mkdir(destDir, { recursive: true });
    
    // Lire tous les dossiers dans src/assets/menu
    const folders = await fs.readdir(sourceDir, { withFileTypes: true });
    
    let totalImages = 0;
    
    for (const folder of folders) {
      if (!folder.isDirectory()) continue;
      
      const folderPath = path.join(sourceDir, folder.name);
      
      // Trouver la catégorie correspondante
      let targetCategory = 'autres';
      const folderNameLower = folder.name.toLowerCase();
      
      for (const [key, value] of Object.entries(folderMapping)) {
        if (folderNameLower.includes(key)) {
          targetCategory = value;
          break;
        }
      }
      
      // Créer le dossier de destination
      const targetDir = path.join(destDir, targetCategory);
      await fs.mkdir(targetDir, { recursive: true });
      
      // Parcourir récursivement le dossier source
      async function copyImages(srcPath, category) {
        const entries = await fs.readdir(srcPath, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(srcPath, entry.name);
          
          if (entry.isDirectory()) {
            // Récursion pour les sous-dossiers
            await copyImages(fullPath, category);
          } else if (entry.isFile() && entry.name.endsWith('.webp')) {
            // Copier l'image
            const destPath = path.join(destDir, category, entry.name);
            
            try {
              await fs.copyFile(fullPath, destPath);
              totalImages++;

            } catch (error) {

            }
          }
        }
      }
      
      await copyImages(folderPath, targetCategory);
    }

  } catch (error) {

  }
}

reorganizeImages();