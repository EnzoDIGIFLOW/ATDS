import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

// Données centralisées pour le carrousel "Nos Créations"
const creationsData = [
  {
    id: 1,
    title: 'Sushi Saumon Premium',
    description: 'Saumon Écosse Label Rouge, riz vinaigré maison',
    image: '/creation1.jpg',
    price: '4,50€'
  },
  {
    id: 2,
    title: 'California Roll Signature',
    description: 'Avocat, concombre, saumon, tobiko',
    image: '/creation2.jpg',
    price: '12,90€'
  },
  {
    id: 3,
    title: 'Plateau Découverte',
    description: 'Assortiment du chef - 24 pièces',
    image: '/creation3.jpeg',
    price: '32,90€'
  },
  {
    id: 4,
    title: 'Chirashi Deluxe',
    description: 'Bol de riz, sashimis variés, légumes',
    image: '/creation4.jpeg',
    price: '18,90€'
  },
  {
    id: 5,
    title: 'Tempura Crevettes',
    description: 'Crevettes panées, sauce aigre-douce',
    image: '/creation5.jpeg',
    price: '14,90€'
  },
  {
    id: 6,
    title: 'Mochi Glacé',
    description: 'Dessert japonais, 3 parfums au choix',
    image: '/creation6.jpeg',
    price: '6,90€'
  }
]

export function CreationsCarousel() {
  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold text-center mb-6">Nos Créations</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {creationsData.map((creation) => (
          <Card key={creation.id} className="overflow-hidden hover:shadow-lg transition">
            <div className="relative h-32">
              <Image
                src={creation.image}
                alt={creation.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
            <CardContent className="p-3">
              <h4 className="font-semibold text-sm mb-1">{creation.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{creation.description}</p>
              <p className="text-temple-pink font-bold">{creation.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}