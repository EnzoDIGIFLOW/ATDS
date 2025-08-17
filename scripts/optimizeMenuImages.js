#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { performance } = require('perf_hooks');

// Configuration
const CONFIG = {
  sourceDir: path.join(__dirname, '..', 'scripts', 'images-source', 'extracted'),
  destDir: path.join(__dirname, '..', 'src', 'assets', 'menu'),
  maxWidth: 400,
  maxHeight: 300,
  quality: 85,
  targetSizeMin: 20 * 1024, // 20KB
  targetSizeMax: 50 * 1024, // 50KB
  supportedFormats: ['.png', '.jpg', '.jpeg', '.gif', '.webp']
};

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Stats globales
const stats = {
  totalFiles: 0,
  processedFiles: 0,
  skippedFiles: 0,
  failedFiles: 0,
  totalSizeBefore: 0,
  totalSizeAfter: 0,
  errors: []
};

// Barre de progression
class ProgressBar {
  constructor(total, label = 'Progress') {
    this.total = total;
    this.current = 0;
    this.label = label;
    this.barLength = 40;
  }

  update(current, status = '') {
    this.current = current;
    const percentage = Math.round((this.current / this.total) * 100);
    const filled = Math.round((this.barLength * this.current) / this.total);
    const empty = this.barLength - filled;
    
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    const statusText = status ? ` - ${status}` : '';
    
    process.stdout.write(
      `\r${colors.cyan}${this.label}:${colors.reset} [${colors.green}${bar}${colors.reset}] ${percentage}% (${this.current}/${this.total})${statusText}${' '.repeat(20)}`
    );
  }

  complete(message = 'Complete!') {
    this.update(this.total);

  }
}

// Fonction pour obtenir la taille d'un fichier
async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

// Fonction pour formater la taille
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Fonction pour créer la structure de dossiers
async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {

  }
}

// Fonction pour lister récursivement tous les fichiers image
async function getImageFiles(dir, baseDir = dir) {
  const files = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Récursion pour les sous-dossiers
        const subFiles = await getImageFiles(fullPath, baseDir);
        files.push(...subFiles);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (CONFIG.supportedFormats.includes(ext)) {
          const relativePath = path.relative(baseDir, fullPath);
          files.push({ fullPath, relativePath });
        }
      }
    }
  } catch (error) {

  }
  
  return files;
}

// Fonction pour optimiser une image
async function optimizeImage(sourcePath, destPath) {
  const startTime = performance.now();
  
  try {
    // Obtenir la taille originale
    const sizeBefore = await getFileSize(sourcePath);
    stats.totalSizeBefore += sizeBefore;
    
    // Créer le dossier de destination si nécessaire
    await ensureDirectoryExists(path.dirname(destPath));
    
    // Pipeline d'optimisation
    let pipeline = sharp(sourcePath)
      .resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ 
        quality: CONFIG.quality,
        effort: 6 // Effort de compression (0-6, 6 = maximum)
      });
    
    // Sauvegarder l'image optimisée
    await pipeline.toFile(destPath);
    
    // Obtenir la taille après optimisation
    let sizeAfter = await getFileSize(destPath);
    
    // Si l'image est trop lourde, essayer avec une qualité réduite
    if (sizeAfter > CONFIG.targetSizeMax) {
      let adjustedQuality = CONFIG.quality;
      
      while (sizeAfter > CONFIG.targetSizeMax && adjustedQuality > 50) {
        adjustedQuality -= 10;
        
        pipeline = sharp(sourcePath)
          .resize(CONFIG.maxWidth, CONFIG.maxHeight, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ 
            quality: adjustedQuality,
            effort: 6
          });
        
        await pipeline.toFile(destPath);
        sizeAfter = await getFileSize(destPath);
      }
    }
    
    stats.totalSizeAfter += sizeAfter;
    
    const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);
    
    return {
      success: true,
      sizeBefore,
      sizeAfter,
      reduction,
      processingTime,
      finalQuality: sizeAfter > CONFIG.targetSizeMax ? 'adjusted' : 'standard'
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Fonction principale
async function main() {

  // Vérifier que le dossier source existe
  try {
    await fs.access(CONFIG.sourceDir);
  } catch {

    // Créer le dossier source comme exemple
    await ensureDirectoryExists(CONFIG.sourceDir);

    return;
  }
  
  // Scanner les fichiers

  const imageFiles = await getImageFiles(CONFIG.sourceDir);
  
  if (imageFiles.length === 0) {

    return;
  }
  
  stats.totalFiles = imageFiles.length;

  // Créer le dossier de destination
  await ensureDirectoryExists(CONFIG.destDir);
  
  // Traiter les images
  const progressBar = new ProgressBar(imageFiles.length, 'Optimisation');
  const results = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const { fullPath, relativePath } = imageFiles[i];
    const fileName = path.basename(relativePath, path.extname(relativePath));
    const destRelativePath = path.join(
      path.dirname(relativePath),
      `${fileName}.webp`
    );
    const destPath = path.join(CONFIG.destDir, destRelativePath);
    
    progressBar.update(i, `${fileName}...`);
    
    const result = await optimizeImage(fullPath, destPath);
    
    if (result.success) {
      stats.processedFiles++;
      results.push({
        file: relativePath,
        ...result
      });
    } else {
      stats.failedFiles++;
      stats.errors.push({
        file: relativePath,
        error: result.error
      });
    }
  }
  
  progressBar.complete('Optimisation terminée!');
  
  // Afficher le rapport

  console.log(`  • Taille totale avant: ${colors.yellow}${formatSize(stats.totalSizeBefore)}${colors.reset}`);
  console.log(`  • Taille totale après: ${colors.green}${formatSize(stats.totalSizeAfter)}${colors.reset}`);
  
  const totalReduction = stats.totalSizeBefore > 0 
    ? ((stats.totalSizeBefore - stats.totalSizeAfter) / stats.totalSizeBefore * 100).toFixed(1)
    : 0;

  // Top 5 des meilleures compressions
  if (results.length > 0) {

    const topCompressions = results
      .sort((a, b) => parseFloat(b.reduction) - parseFloat(a.reduction))
      .slice(0, 5);
    
    topCompressions.forEach((result, index) => {
      const fileName = path.basename(result.file);
      console.log(`  ${index + 1}. ${fileName}: ${colors.green}${result.reduction}%${colors.reset} (${formatSize(result.sizeBefore)} → ${formatSize(result.sizeAfter)})`);
    });
  }
  
  // Afficher les erreurs s'il y en a
  if (stats.errors.length > 0) {

    stats.errors.forEach(({ file, error }) => {

    });
  }
  
  // Fichiers trop lourds
  const heavyFiles = results.filter(r => r.sizeAfter > CONFIG.targetSizeMax);
  if (heavyFiles.length > 0) {
    console.log(`\n${colors.yellow}${colors.bright}⚠️  Images dépassant ${formatSize(CONFIG.targetSizeMax)}:${colors.reset}`);
    heavyFiles.forEach(result => {
      const fileName = path.basename(result.file);
      console.log(`  • ${fileName}: ${colors.yellow}${formatSize(result.sizeAfter)}${colors.reset}`);
    });
  }

}

// Gestion des erreurs non interceptées
process.on('unhandledRejection', (error) => {

  process.exit(1);
});

// Lancer le script
main().catch(error => {

  process.exit(1);
});