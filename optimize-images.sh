#!/bin/bash

# Script d'optimisation des images pour Au Temple du Sushi
echo "🖼️  Optimisation des images en cours..."

cd /Users/enzoflippe/Documents/Au-temple-du-sushi-main/public

# Créer un dossier de backup
mkdir -p backup
echo "📦 Sauvegarde des images originales..."

# Fonction d'optimisation
optimize_image() {
    local file="$1"
    local quality="$2"
    local max_width="$3"
    
    if [ -f "$file" ]; then
        echo "🔧 Optimisation de $file..."
        
        # Backup
        cp "$file" "backup/$file"
        
        # Optimisation avec redimensionnement et compression
        convert "$file" \
            -resize "${max_width}x${max_width}>" \
            -quality "$quality" \
            -strip \
            -interlace Plane \
            "$file"
        
        # Afficher la réduction de taille
        original_size=$(stat -f%z "backup/$file")
        new_size=$(stat -f%z "$file")
        reduction=$((100 - (new_size * 100 / original_size)))
        echo "✅ $file: $(echo "scale=1; $original_size/1024/1024" | bc)MB → $(echo "scale=1; $new_size/1024/1024" | bc)MB (-${reduction}%)"
    fi
}

# Optimiser les images les plus lourdes avec différents paramètres
echo "🚀 Optimisation des images critiques..."

# Images hero/principales (qualité élevée)
optimize_image "img1.jpg" 85 1920
optimize_image "img2.jpg" 85 1920
optimize_image "img3.jpg" 85 1920

# Images de créations (qualité élevée pour les plats)
optimize_image "creation1.jpg" 85 1200
optimize_image "creation2.jpg" 85 1200
optimize_image "creation3.jpeg" 85 1200
optimize_image "creation4.jpeg" 85 1200
optimize_image "creation5.jpeg" 85 1200
optimize_image "creation6.jpeg" 85 1200

# Images diverses
optimize_image "img.jpg" 80 1200
optimize_image "our.jpeg" 80 1200
optimize_image "IMG_2746 2.jpeg" 80 1200

# Optimiser les images du dossier about
echo "🏠 Optimisation des images About..."
cd about
for img in *.jpeg *.jpg; do
    if [ -f "$img" ]; then
        echo "🔧 Optimisation de about/$img..."
        convert "$img" \
            -resize "800x800>" \
            -quality 80 \
            -strip \
            -interlace Plane \
            "$img"
    fi
done
cd ..

echo "✅ Optimisation terminée !"
echo "📊 Statistiques finales :"

# Afficher les tailles finales
echo "🎯 Tailles des principales images :"
ls -lah img1.jpg img2.jpg img3.jpg creation*.jpg creation*.jpeg 2>/dev/null | awk '{print $9 ": " $5}'

# Taille totale
total_size=$(du -sh . | awk '{print $1}')
echo "📁 Taille totale du dossier public : $total_size"

echo "🎉 Optimisation des performances complète !"