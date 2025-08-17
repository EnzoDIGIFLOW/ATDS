#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const menuDir = path.join(process.cwd(), 'src', 'assets', 'menu');
let totalSaved = 0;
let processedCount = 0;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    
    // Ne pas traiter les fichiers déjà petits
    if (originalSize < 50000) return; // < 50KB
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Redimensionner si trop grand
    let pipeline = image;
    if (metadata.width > 800 || metadata.height > 800) {
      pipeline = pipeline.resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Optimiser selon le format
    if (ext === '.webp') {
      await pipeline
        .webp({ quality: 85, effort: 6 })
        .toFile(filePath + '.tmp');
    } else if (['.jpg', '.jpeg'].includes(ext)) {
      await pipeline
        .jpeg({ quality: 85, progressive: true })
        .toFile(filePath + '.tmp');
    } else if (ext === '.png') {
      await pipeline
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(filePath + '.tmp');
    } else {
      return;
    }
    
    // Vérifier la nouvelle taille
    const newStats = fs.statSync(filePath + '.tmp');
    const newSize = newStats.size;
    
    // Remplacer seulement si plus petit
    if (newSize < originalSize) {
      fs.renameSync(filePath + '.tmp', filePath);
      const saved = originalSize - newSize;
      totalSaved += saved;
      processedCount++;
      console.log(`  ✓ ${path.basename(filePath)}: ${Math.round(saved/1024)}KB économisés`);
    } else {
      fs.unlinkSync(filePath + '.tmp');
    }
  } catch (error) {
    console.error(`  ✗ Erreur avec ${filePath}:`, error.message);
    if (fs.existsSync(filePath + '.tmp')) {
      fs.unlinkSync(filePath + '.tmp');
    }
  }
}

async function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(item)) {
      await optimizeImage(fullPath);
    }
  }
}

console.log('🖼️  Optimisation des images du menu...\n');

processDirectory(menuDir).then(() => {
  console.log('\n📊 Résumé:');
  console.log(`  - Images optimisées: ${processedCount}`);
  console.log(`  - Espace économisé: ${Math.round(totalSaved/1024/1024)}MB`);
}).catch(error => {
  console.error('Erreur:', error);
});