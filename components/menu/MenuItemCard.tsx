'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import MenuProductImage from './MenuProductImageNoZoom'
import { Star, TrendingUp, Clock, ChefHat } from 'lucide-react'

interface MenuItemCardProps {
  name: string
  description?: string
  price: number | string
  category?: string
  variant?: 'classic' | 'modern' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  isNew?: boolean
  isPopular?: boolean
  badge?: string
  className?: string
}

/**
 * Variante 1: Design Classique avec image à gauche
 */
const ClassicVariant: React.FC<MenuItemCardProps> = ({
  name,
  description,
  price,
  category,
  size = 'md',
  isNew,
  isPopular,
  badge,
  className
}) => {
  const imageSize = size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'
  
  return (
    <div className={cn(
      'flex items-center gap-3 p-3 rounded-lg',
      'hover:bg-gray-50 transition-all duration-200',
      'group cursor-pointer',
      className
    )}>
      {/* Image */}
      <div className="relative">
        <MenuProductImage
          productName={name}
          productId={name.toLowerCase().replace(/\s+/g, '-')}
          category={category}
          size={imageSize}
          enableZoom={false}
          className="shadow-sm group-hover:shadow-md transition-shadow"
        />
        {isPopular && (
          <div className="absolute -top-1 -right-1 bg-rose-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
            <Star size={12} className="fill-white" />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
              {name}
              {isNew && (
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Nouveau
                </span>
              )}
            </h3>
            {description && (
              <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{description}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-bold text-rose-600">
              {typeof price === 'number' ? `${price.toFixed(2)}€` : price}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Variante 2: Design Moderne en Card
 */
const ModernVariant: React.FC<MenuItemCardProps> = ({
  name,
  description,
  price,
  category,
  isNew,
  isPopular,
  badge,
  className
}) => {
  
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-sm hover:shadow-lg',
      'transition-all duration-300 hover:-translate-y-1',
      'overflow-hidden group cursor-pointer',
      className
    )}>
      {/* Image Header */}
      <div className="relative h-40 bg-gradient-to-br from-rose-50 to-pink-50">
        <MenuProductImage
          productName={name}
          productId={name.toLowerCase().replace(/\s+/g, '-')}
          category={category}
          size="lg"
          enableZoom={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isPopular && (
            <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <TrendingUp size={12} />
              Populaire
            </div>
          )}
          {isNew && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Nouveau
            </div>
          )}
          {badge && (
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {badge}
            </div>
          )}
        </div>
        
        {/* Prix overlay */}
        <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
          <p className="font-bold text-rose-600">
            {typeof price === 'number' ? `${price.toFixed(2)}€` : price}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}
        
        <button className="mt-3 w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-[1.02]">
          Commander
        </button>
      </div>
    </div>
  )
}

/**
 * Variante 3: Design Minimaliste
 */
const MinimalVariant: React.FC<MenuItemCardProps> = ({
  name,
  description,
  price,
  category,
  isNew,
  isPopular,
  className
}) => {
  
  return (
    <div className={cn(
      'border border-gray-200 rounded-lg p-4',
      'hover:border-rose-300 hover:bg-rose-50/50',
      'transition-all duration-200 group cursor-pointer',
      className
    )}>
      <div className="flex items-start gap-4">
        {/* Image ronde */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-rose-200 transition-all">
            <MenuProductImage
              productName={name}
              productId={name.toLowerCase().replace(/\s+/g, '-')}
              category={category}
              size="md"
              enableZoom={false}
              className="w-full h-full object-cover"
            />
          </div>
          {(isPopular || isNew) && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-rose-500 rounded-full animate-pulse" />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
              {name}
            </h3>
            <span className="text-sm font-semibold text-gray-700">
              {typeof price === 'number' ? `${price.toFixed(2)}€` : price}
            </span>
          </div>
          {description && (
            <p className="text-xs text-gray-500 line-clamp-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Composant principal avec sélection de variante
 */
export const MenuItemCard: React.FC<MenuItemCardProps> = (props) => {
  const { variant = 'classic', ...rest } = props
  
  switch (variant) {
    case 'modern':
      return <ModernVariant {...rest} />
    case 'minimal':
      return <MinimalVariant {...rest} />
    case 'classic':
    default:
      return <ClassicVariant {...rest} />
  }
}

/**
 * Composant de liste responsive pour mobile
 */
export const MenuItemList: React.FC<{
  items: Array<{
    name: string
    description?: string
    price: number | string
    category?: string
    isNew?: boolean
    isPopular?: boolean
  }>
  variant?: 'classic' | 'modern' | 'minimal'
  columns?: 1 | 2 | 3 | 4
}> = ({ items, variant = 'classic', columns = 1 }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }
  
  return (
    <div className={cn(
      'grid gap-4',
      gridCols[columns]
    )}>
      {items.map((item, index) => (
        <MenuItemCard
          key={`${item.name}-${index}`}
          {...item}
          variant={variant}
        />
      ))}
    </div>
  )
}

export default MenuItemCard