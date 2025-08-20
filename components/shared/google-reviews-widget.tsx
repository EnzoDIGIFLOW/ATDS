import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { restaurantConfig } from '@/config/restaurant.config'

export function GoogleReviewsWidget() {
  const { rating, reviewCount, url } = restaurantConfig.googleReviews
  
  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold text-center mb-6">Avis de nos Clients</h3>
      <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-2 mb-2">
          <span className="text-3xl font-bold">{rating}/5</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-6 h-6 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
        <p className="text-gray-600">{reviewCount} avis vérifiés sur Google</p>
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-2 bg-temple-pink text-white rounded-lg hover:bg-temple-pink/90 transition"
        >
          Voir tous les avis
        </a>
      </div>
      
      {/* Exemples d'avis récents */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">
              "Meilleur restaurant japonais de la région ! Fraîcheur et qualité au rendez-vous."
            </p>
            <p className="text-xs font-semibold">Sophie M.</p>
            <p className="text-xs text-gray-500">Il y a 1 semaine</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">
              "Livraison rapide et sushis délicieux. Je recommande vivement !"
            </p>
            <p className="text-xs font-semibold">Thomas L.</p>
            <p className="text-xs text-gray-500">Il y a 2 semaines</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">
              "Service impeccable et plats savoureux. Une vraie découverte !"
            </p>
            <p className="text-xs font-semibold">Marie D.</p>
            <p className="text-xs text-gray-500">Il y a 3 semaines</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}