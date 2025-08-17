#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

let totalConsoleRemoved = 0;
let totalFilesProcessed = 0;
let totalCommentsRemoved = 0;

// Fonction pour nettoyer un fichier
function cleanFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Supprimer console.log, console.error, console.warn
    const consolePattern = /^\s*console\.(log|error|warn|info|debug|trace)\([^)]*\);?\s*$/gm;
    const consoleMatches = content.match(consolePattern) || [];
    content = content.replace(consolePattern, '');
    
    // Supprimer les commentaires TODO obsolètes
    const todoPattern = /\/\/\s*TODO:.*$/gm;
    const todoMatches = content.match(todoPattern) || [];
    content = content.replace(todoPattern, '');
    
    // Supprimer les commentaires de débugage
    const debugCommentPattern = /\/\/\s*(DEBUG|FIXME|HACK|XXX|TEMP):.*$/gm;
    const debugMatches = content.match(debugCommentPattern) || [];
    content = content.replace(debugCommentPattern, '');
    
    // Supprimer les lignes vides multiples
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      totalConsoleRemoved += consoleMatches.length;
      totalCommentsRemoved += todoMatches.length + debugMatches.length;
      totalFilesProcessed++;
      console.log(`✅ Nettoyé: ${path.relative(process.cwd(), filePath)}`);

    }
  } catch (error) {

  }
}

// Fonction pour parcourir récursivement les dossiers
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Ignorer certains dossiers
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'public', 'dist', 'build'].includes(file)) {
        walkDir(filePath);
      }
    } else if (stat.isFile()) {
      // Traiter seulement les fichiers JS/TS
      if (/\.(ts|tsx|js|jsx)$/.test(file)) {
        cleanFile(filePath);
      }
    }
  });
}

// Démarrer le nettoyage depuis la racine du projet
walkDir(process.cwd());

