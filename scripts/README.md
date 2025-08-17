# Script d'Optimisation des Images du Menu

## 📋 Description
Ce script optimise automatiquement les images du menu du restaurant en les convertissant en format WebP avec compression optimale.

## 🚀 Utilisation

### Installation des dépendances
```bash
npm install
```

### Lancement du script
```bash
npm run optimize:images
```

## 📁 Structure des dossiers

### Source (scripts/images-source/)
Placez vos images PNG originales dans cette structure :
```
scripts/images-source/
├── sushis/
│   ├── saumon.png
│   ├── thon.png
│   └── ...
├── makis/
│   ├── california.png
│   └── ...
├── plats-chauds/
│   ├── ramen.png
│   ├── tempura.png
│   └── ...
├── boissons/
│   ├── sake.png
│   └── ...
└── desserts/
    ├── mochi.png
    └── ...
```

### Destination (src/assets/menu/)
Les images optimisées seront automatiquement organisées dans :
```
src/assets/menu/
├── sushis/
│   ├── saumon.webp
│   ├── thon.webp
│   └── ...
├── makis/
│   ├── california.webp
│   └── ...
└── ...
```

## ⚙️ Configuration

Le script utilise les paramètres suivants :
- **Format de sortie** : WebP
- **Dimensions max** : 400x300px (ratio préservé)
- **Qualité** : 85% (ajustée automatiquement si nécessaire)
- **Poids cible** : 20-50KB par image
- **Formats supportés** : PNG, JPG, JPEG, GIF, WebP

## 📊 Fonctionnalités

✅ **Optimisation automatique**
- Conversion en WebP
- Redimensionnement intelligent
- Compression adaptative

✅ **Traitement par lot**
- Barre de progression en temps réel
- Traitement récursif des sous-dossiers
- Conservation de la structure

✅ **Rapport détaillé**
- Taille avant/après
- Pourcentage de compression
- Top 5 des meilleures compressions
- Détection des images trop lourdes

✅ **Gestion d'erreurs**
- Skip des images corrompues
- Rapport d'erreurs détaillé
- Création automatique des dossiers manquants

## 📈 Exemple de rapport

```
═══════════════════════════════════════════════════
     🖼️  OPTIMISATION DES IMAGES DU MENU 🖼️
═══════════════════════════════════════════════════

🔍 Recherche des images...
✓ 200 images trouvées

Optimisation: [████████████████████████] 100% (200/200)
✓ Optimisation terminée!

═══════════════════════════════════════════════════
                  📊 RAPPORT 📊
═══════════════════════════════════════════════════

Résumé:
  • Images traitées: 198/200
  • Images échouées: 2
  • Taille totale avant: 45.2 MB
  • Taille totale après: 6.8 MB
  • Réduction totale: 85.0%

Top 5 des meilleures compressions:
  1. saumon.png: 92.3% (450 KB → 35 KB)
  2. ramen.png: 89.5% (380 KB → 40 KB)
  3. california.png: 88.2% (320 KB → 38 KB)
  4. tempura.png: 86.7% (290 KB → 39 KB)
  5. mochi.png: 85.1% (280 KB → 42 KB)

✅ Optimisation terminée!
Images optimisées sauvegardées dans: src/assets/menu/
```

## 🛠️ Dépannage

### Le script ne trouve pas d'images
- Vérifiez que les images sont dans `scripts/images-source/`
- Assurez-vous que les extensions sont supportées (.png, .jpg, etc.)

### Images trop lourdes après optimisation
- Le script ajuste automatiquement la qualité
- Si nécessaire, modifiez `CONFIG.quality` dans le script

### Erreur "sharp not installed"
```bash
npm install sharp --save-dev --legacy-peer-deps
```

## 💡 Conseils

1. **Images sources** : Utilisez des PNG de haute qualité
2. **Organisation** : Respectez la structure de dossiers pour une meilleure organisation
3. **Nommage** : Utilisez des noms descriptifs (ex: `sushi-saumon-deluxe.png`)
4. **Backup** : Gardez toujours une copie des images originales