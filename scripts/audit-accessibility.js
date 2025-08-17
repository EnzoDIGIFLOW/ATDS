#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

let issues = [];
let fixedCount = 0;

// Fonction pour vérifier et corriger l'accessibilité dans un fichier
function auditFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let fileIssues = [];
    
    // Vérifier les images sans alt
    const imgWithoutAlt = content.match(/<img(?![^>]*alt=)[^>]*>/gi) || [];
    if (imgWithoutAlt.length > 0) {
      fileIssues.push(`${imgWithoutAlt.length} images sans attribut alt`);
    }
    
    // Vérifier les boutons sans aria-label ou texte
    const buttonPattern = /<button[^>]*>[\s]*<\/button>/gi;
    const emptyButtons = content.match(buttonPattern) || [];
    if (emptyButtons.length > 0) {
      fileIssues.push(`${emptyButtons.length} boutons vides sans label`);
    }
    
    // Vérifier les divs avec onClick mais sans role
    const divWithOnClick = /<div[^>]*onClick[^>]*(?![^>]*role=)[^>]*>/gi;
    const clickableDivs = content.match(divWithOnClick) || [];
    if (clickableDivs.length > 0) {
      fileIssues.push(`${clickableDivs.length} divs cliquables sans role`);
    }
    
    // Corriger automatiquement certains problèmes
    // Ajouter role="button" aux divs avec onClick
    content = content.replace(
      /<div([^>]*onClick[^>]*(?![^>]*role=)[^>]*)>/gi,
      '<div$1 role="button" tabIndex={0}>'
    );
    
    // Ajouter aria-label aux boutons d'icône
    content = content.replace(
      /<button([^>]*className="[^"]*icon[^"]*"[^>]*(?![^>]*aria-label)[^>]*)>/gi,
      '<button$1 aria-label="Action button">'
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      fixedCount++;
    }
    
    if (fileIssues.length > 0) {
      issues.push({
        file: path.relative(process.cwd(), filePath),
        issues: fileIssues
      });
    }
  } catch (error) {
    // Ignorer les erreurs de lecture
  }
}

// Fonction pour parcourir récursivement les dossiers
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'public'].includes(file)) {
        walkDir(filePath);
      }
    } else if (stat.isFile()) {
      if (/\.(tsx|jsx)$/.test(file)) {
        auditFile(filePath);
      }
    }
  });
}

console.log('♿ Audit d\'accessibilité en cours...\n');

// Démarrer l'audit
walkDir(path.join(process.cwd(), 'components'));
walkDir(path.join(process.cwd(), 'app'));

console.log('\n📊 Résumé de l\'audit:');
console.log(`  - Fichiers corrigés automatiquement: ${fixedCount}`);
console.log(`  - Problèmes détectés: ${issues.length} fichiers avec des problèmes`);

if (issues.length > 0) {
  console.log('\n⚠️  Problèmes à corriger manuellement:');
  issues.forEach(issue => {
    console.log(`\n  ${issue.file}:`);
    issue.issues.forEach(i => console.log(`    - ${i}`));
  });
}

// Créer un rapport
const report = {
  timestamp: new Date().toISOString(),
  fixedAutomatically: fixedCount,
  remainingIssues: issues,
  recommendations: [
    "Ajouter des attributs alt descriptifs à toutes les images",
    "Utiliser des balises sémantiques HTML5 (nav, main, article, section)",
    "Assurer un contraste de couleur suffisant (WCAG AA minimum 4.5:1)",
    "Fournir des labels pour tous les champs de formulaire",
    "Implémenter la navigation au clavier pour tous les éléments interactifs",
    "Ajouter des aria-labels pour les boutons d'icône",
    "Utiliser les attributs ARIA appropriés pour les composants complexes"
  ]
};

fs.writeFileSync(
  path.join(process.cwd(), 'accessibility-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n✅ Rapport d\'accessibilité généré: accessibility-report.json');