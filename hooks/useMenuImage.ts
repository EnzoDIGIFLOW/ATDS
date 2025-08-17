import { useState, useEffect } from 'react';

// Type pour le mapping
type ImageMapping = Record<string, Record<string, string | null>>;

// Charger le mapping de manière synchrone
let menuImageMapping: ImageMapping | null = null;

async function loadMapping() {
  if (!menuImageMapping) {
    try {
      const response = await fetch('/menu-images-mapping.json');
      menuImageMapping = await response.json();
    } catch (error) {

      menuImageMapping = {};
    }
  }
  return menuImageMapping;
}

// Convertir les IDs du menu-data-livraison.ts au format du JSON
function normalizeProductId(productId: string): string {
  return productId.toLowerCase().replace(/_/g, '-');
}

// Convertir les noms de catégories au format du JSON
function normalizeCategoryName(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[''']/g, '')
    .replace(/[()]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Hook pour obtenir l'image d'un produit
export function useMenuImage(productId: string, categoryName?: string): {
  imagePath: string | null;
  isLoading: boolean;
  isSoon: boolean;
} {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoon, setIsSoon] = useState(false);

  useEffect(() => {
    const findImage = async () => {
      setIsLoading(true);
      setIsSoon(false);

      const mapping = await loadMapping();
      if (!mapping) {
        setIsLoading(false);
        return;
      }

      const normalizedId = normalizeProductId(productId);

      // Si on a une catégorie, chercher directement
      if (categoryName) {
        const normalizedCategory = normalizeCategoryName(categoryName);
        const categoryMapping = mapping[normalizedCategory];
        
        if (categoryMapping && categoryMapping[normalizedId]) {
          const image = categoryMapping[normalizedId];
          if (image === 'soon') {
            setIsSoon(true);
            setImagePath(null);
          } else {
            setImagePath(image ? `/menu/${image}` : null);
          }
          setIsLoading(false);
          return;
        }
      }

      // Sinon, chercher dans toutes les catégories
      for (const category of Object.values(mapping)) {
        if (category[normalizedId]) {
          const image = category[normalizedId];
          if (image === 'soon') {
            setIsSoon(true);
            setImagePath(null);
          } else {
            setImagePath(image ? `/menu/${image}` : null);
          }
          setIsLoading(false);
          return;
        }
      }

      // Aucune image trouvée
      setImagePath(null);
      setIsLoading(false);
    };

    findImage();
  }, [productId, categoryName]);

  return { imagePath, isLoading, isSoon };
}

// Fonction utilitaire pour obtenir directement le chemin de l'image (async)
export async function getMenuImagePath(productId: string, categoryName?: string): Promise<string | null> {
  const mapping = await loadMapping();
  if (!mapping) return null;

  const normalizedId = normalizeProductId(productId);

  // Si on a une catégorie, chercher directement
  if (categoryName) {
    const normalizedCategory = normalizeCategoryName(categoryName);
    const categoryMapping = mapping[normalizedCategory];
    
    if (categoryMapping && categoryMapping[normalizedId]) {
      const image = categoryMapping[normalizedId];
      return (image && image !== 'soon') ? `/menu/${image}` : null;
    }
  }

  // Sinon, chercher dans toutes les catégories
  for (const category of Object.values(mapping)) {
    if (category[normalizedId]) {
      const image = category[normalizedId];
      return (image && image !== 'soon') ? `/menu/${image}` : null;
    }
  }

  return null;
}

// Fonction pour vérifier si une image est "soon"
export async function isImageSoon(productId: string, categoryName?: string): Promise<boolean> {
  const mapping = await loadMapping();
  if (!mapping) return false;

  const normalizedId = normalizeProductId(productId);

  // Si on a une catégorie, chercher directement
  if (categoryName) {
    const normalizedCategory = normalizeCategoryName(categoryName);
    const categoryMapping = mapping[normalizedCategory];
    
    if (categoryMapping && categoryMapping[normalizedId]) {
      return categoryMapping[normalizedId] === 'soon';
    }
  }

  // Sinon, chercher dans toutes les catégories
  for (const category of Object.values(mapping)) {
    if (category[normalizedId]) {
      return category[normalizedId] === 'soon';
    }
  }

  return false;
}