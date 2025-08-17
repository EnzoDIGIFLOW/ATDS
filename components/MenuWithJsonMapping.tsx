'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useMenuImage } from '@/hooks/useMenuImage';
import { Clock, ImageOff, ChevronRight } from 'lucide-react';
import { menuLivraison } from '@/menu-data-livraison';

// Composant pour un item du menu
function MenuItem({ item, categoryName }: { item: any; categoryName: string }) {
  const { imagePath, isLoading, isSoon } = useMenuImage(item.id, categoryName);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="relative h-48 bg-gray-50">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : isSoon ? (
          <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
            <div className="text-center">
              <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
              <span className="text-sm text-yellow-700 font-medium">Image bientôt disponible</span>
            </div>
          </div>
        ) : imagePath && !imageError ? (
          <Image
            src={imagePath}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <ImageOff className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 right-2 flex gap-2">
          {item.isNew && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
              NOUVEAU
            </span>
          )}
          {item.isPopular && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
              POPULAIRE
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">{item.price.toFixed(2)} €</span>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant principal pour afficher le menu
export default function MenuWithJsonMapping() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Normaliser le nom de la catégorie pour le mapping
  const normalizeCategoryName = (category: string): string => {
    return category
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[''']/g, '')
      .replace(/[()]/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Menu - Au Temple du Sushi</h1>
          <p className="text-gray-600 mt-1">Cuisine japonaise authentique à Bouc-Bel-Air</p>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-white border-b sticky top-[88px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {menuLivraison.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === index
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.category}
                {category.items && (
                  <span className="ml-2 text-xs opacity-75">
                    ({category.items.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ChevronRight className="w-6 h-6 text-red-500 mr-2" />
            {menuLivraison[selectedCategory].category}
          </h2>
          <p className="text-gray-600 mt-1">
            {menuLivraison[selectedCategory].items?.length || 0} produits disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuLivraison[selectedCategory].items?.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              categoryName={normalizeCategoryName(menuLivraison[selectedCategory].category)}
            />
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg mb-2">📍 Bouc-Bel-Air • 📞 06 61 38 75 45</p>
          <p className="text-sm text-gray-400">
            Les images sont indicatives. Les produits peuvent varier selon les arrivages.
          </p>
        </div>
      </div>
    </div>
  );
}