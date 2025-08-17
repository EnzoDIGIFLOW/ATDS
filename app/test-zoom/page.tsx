'use client'

import MenuProductImage from '@/components/menu/MenuProductImageNoZoom'

export default function TestZoomPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Test du Zoom des Images</h1>
      
      <div className="grid grid-cols-4 gap-8">
        <div className="text-center">
          <p className="mb-2 text-sm">California Saumon</p>
          <MenuProductImage
            productName="California Saumon Cheese"
            productId="california-saumon-cheese"
            category="california-par-6"
            size="lg"
            enableZoom={false}
          />
        </div>
        
        <div className="text-center">
          <p className="mb-2 text-sm">Makis Saumon</p>
          <MenuProductImage
            productName="Makis Saumon"
            productId="makis-saumon"
            category="makis-par-6"
            size="lg"
            enableZoom={false}
          />
        </div>
        
        <div className="text-center">
          <p className="mb-2 text-sm">Sushi Saumon</p>
          <MenuProductImage
            productName="Sushi Saumon"
            productId="sushi-saumon"
            category="sushi-a-lunite"
            size="lg"
            enableZoom={false}
          />
        </div>
        
        <div className="text-center">
          <p className="mb-2 text-sm">L&apos;italien</p>
          <MenuProductImage
            productName="L'italien"
            productId="l-italien"
            category="creation-du-chef-par-6"
            size="lg"
            enableZoom={false}
          />
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-white rounded-lg">
        <h2 className="font-bold mb-2">Instructions:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Survolez une image pendant 2 secondes</li>
          <li>Un cercle de progression rose apparaît</li>
          <li>Après 2 secondes, l&apos;image zoomée s&apos;affiche au centre</li>
          <li>Cliquez ailleurs pour fermer le zoom</li>
        </ul>
      </div>
    </div>
  )
}