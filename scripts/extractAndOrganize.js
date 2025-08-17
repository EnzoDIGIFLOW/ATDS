#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  imagesSourceDir: path.join(__dirname, 'images-source'),
  videosSourceDir: path.join(__dirname, 'videos-sources'),
  imagesExtractDir: path.join(__dirname, 'images-source', 'extracted'),
  videosExtractDir: path.join(__dirname, 'videos-extracted'),
  restaurantImagesDir: path.join(__dirname, '..', 'public', 'restaurant'),
  menuImagesDir: path.join(__dirname, 'images-source', 'menu')
};

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Mapping des noms de fichiers ZIP vers les catégories
const categoryMapping = {
  'accompagnement': 'accompagnements',
  'boisson': 'boissons',
  'burito': 'buritos',
  'california': 'california',
  'chirachi': 'chirashi',
  'création du chef': 'creation-chef',
  'crispy': 'crispy',
  'dessert': 'desserts',
  'flocon': 'flocon',
  'formule du midi': 'formules',
  'maki': 'makis',
  'mochi': 'mochis',
  'nouilles': 'nouilles',
  'plat chaud': 'plats-chauds',
  'plateaux': 'plateaux',
  'poke bowl': 'poke-bowls',
  'roll\'s': 'rolls',
  'sashimi': 'sashimi',
  'soupe miso': 'soupes',
  'spring': 'spring',
  'sushi nigiri': 'sushis',
  'tartare': 'tartare',
  'restaurant et image déco': 'restaurant',
  'AUTRES PHOTOS': 'autres'
};

// Fonction pour créer un dossier
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {

  }
}

// Fonction pour obtenir la catégorie à partir du nom de fichier
function getCategoryFromFilename(filename) {
  const normalized = filename.toLowerCase().replace(/-\d{8}T\d{6}Z.*\.zip$/, '').trim();
  
  for (const [key, value] of Object.entries(categoryMapping)) {
    if (normalized.includes(key)) {
      return value;
    }
  }
  
  return 'autres';
}

// Fonction pour décompresser un fichier ZIP
async function extractZip(zipPath, outputDir) {
  try {
    await ensureDir(outputDir);
    
    // Utiliser unzip pour extraire (macOS)
    const command = `unzip -q -o "${zipPath}" -d "${outputDir}"`;
    await execAsync(command);
    
    return true;
  } catch (error) {
    console.error(`${colors.red}Erreur lors de l'extraction de ${path.basename(zipPath)}:${colors.reset}`, error.message);
    return false;
  }
}

// Fonction pour déplacer les fichiers extraits vers leur catégorie
async function organizeExtractedFiles(extractDir, category, isRestaurant = false) {
  try {
    const files = await fs.readdir(extractDir, { withFileTypes: true });
    
    // Déterminer le dossier de destination
    let destDir;
    if (isRestaurant) {
      destDir = CONFIG.restaurantImagesDir;
    } else {
      destDir = path.join(CONFIG.menuImagesDir, category);
    }
    
    await ensureDir(destDir);
    
    let movedCount = 0;
    
    for (const file of files) {
      const srcPath = path.join(extractDir, file.name);
      
      if (file.isFile()) {
        const ext = path.extname(file.name).toLowerCase();
        
        // Vérifier si c'est une image
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].includes(ext)) {
          const destPath = path.join(destDir, file.name);
          
          try {
            // Copier le fichier
            await fs.copyFile(srcPath, destPath);
            movedCount++;
          } catch (error) {

          }
        }
      } else if (file.isDirectory()) {
        // Récursion pour les sous-dossiers
        await organizeExtractedFiles(srcPath, category, isRestaurant);
      }
    }
    
    return movedCount;
  } catch (error) {

    return 0;
  }
}

// Fonction principale
async function main() {

  // Créer les dossiers nécessaires
  await ensureDir(CONFIG.imagesExtractDir);
  await ensureDir(CONFIG.videosExtractDir);
  await ensureDir(CONFIG.restaurantImagesDir);
  await ensureDir(CONFIG.menuImagesDir);
  
  // Traiter les images

  try {
    const imageZips = await fs.readdir(CONFIG.imagesSourceDir);
    const zipFiles = imageZips.filter(file => file.endsWith('.zip'));

    let totalImages = 0;
    
    for (const zipFile of zipFiles) {
      const zipPath = path.join(CONFIG.imagesSourceDir, zipFile);
      const category = getCategoryFromFilename(zipFile);
      const isRestaurant = category === 'restaurant';

      // Créer un dossier temporaire pour l'extraction
      const tempExtractDir = path.join(CONFIG.imagesExtractDir, `temp_${Date.now()}`);
      
      // Extraire le ZIP
      const extracted = await extractZip(zipPath, tempExtractDir);
      
      if (extracted) {
        // Organiser les fichiers extraits
        const movedCount = await organizeExtractedFiles(tempExtractDir, category, isRestaurant);
        totalImages += movedCount;

        // Nettoyer le dossier temporaire
        try {
          await execAsync(`rm -rf "${tempExtractDir}"`);
        } catch (error) {
          // Ignorer les erreurs de nettoyage
        }
      }

    }

  } catch (error) {

  }
  
  // Traiter les vidéos

  try {
    const videoZips = await fs.readdir(CONFIG.videosSourceDir);
    const videoZipFiles = videoZips.filter(file => file.endsWith('.zip'));
    
    if (videoZipFiles.length > 0) {
      console.log(`${colors.green}✓ ${videoZipFiles.length} archive(s) vidéo trouvée(s)${colors.reset}\n`);
      
      for (const zipFile of videoZipFiles) {
        const zipPath = path.join(CONFIG.videosSourceDir, zipFile);

        // Extraire directement dans le dossier videos-extracted
        const extracted = await extractZip(zipPath, CONFIG.videosExtractDir);
        
        if (extracted) {
          // Compter les vidéos extraites
          const files = await fs.readdir(CONFIG.videosExtractDir);
          const videoFiles = files.filter(f => {
            const ext = path.extname(f).toLowerCase();
            return ['.mp4', '.mov', '.avi', '.webm', '.mkv'].includes(ext);
          });
          
          console.log(`   ${colors.green}✓ ${videoFiles.length} vidéo(s) extraite(s)${colors.reset}\n`);
        }
      }
    } else {

    }
    
  } catch (error) {

  }
  
  // Rapport final

}

// Gestion des erreurs
process.on('unhandledRejection', (error) => {

  process.exit(1);
});

// Lancer le script
main().catch(error => {

  process.exit(1);
});