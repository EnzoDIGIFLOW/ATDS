'use client'

import { MapPin, Clock, Truck } from 'lucide-react'
import { Card } from '@/components/ui/card'

const deliveryZones = [
  {
    name: "Bouc-Bel-Air",
    time: "30 min",
    minOrder: "20€",
    free: true,
    highlight: true
  },
  {
    name: "Cabriès",
    time: "35 min",
    minOrder: "25€",
    free: false,
    fee: "3€"
  },
  {
    name: "Calas",
    time: "35 min",
    minOrder: "25€",
    free: false,
    fee: "3€"
  },
  {
    name: "Simiane-Collongue",
    time: "35 min",
    minOrder: "25€",
    free: false,
    fee: "3€"
  },
  {
    name: "Gardanne",
    time: "45 min",
    minOrder: "50€",
    free: false,
    fee: "5€"
  },
  {
    name: "Biver",
    time: "45 min",
    minOrder: "50€",
    free: false,
    fee: "5€"
  }
]

export default function DeliveryZones() {
  return (
    <div className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Zones de Livraison
          </h2>
          <p className="text-gray-600">
            Nous livrons vos sushis frais dans un rayon de 10km
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliveryZones.map((zone) => (
            <Card 
              key={zone.name}
              className={`hover:shadow-lg transition-shadow duration-300 ${
                zone.highlight 
                  ? 'border-2 border-temple-pink bg-temple-pink/5' 
                  : 'border-gray-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-temple-pink" />
                    <h3 className="font-semibold text-gray-900">
                      {zone.name}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    {zone.highlight && (
                      <span className="bg-temple-pink text-white text-xs px-2 py-1 rounded-full font-bold">
                        Zone principale
                      </span>
                    )}
                    {zone.free && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Gratuit
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Livraison en {zone.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>
                      Minimum {zone.minOrder}
                      {!zone.free && ` • Frais: ${zone.fee}`}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Horaires de livraison : 11h30 - 14h30 et 18h30 - 22h30
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Pour les zones non listées, nous consulter au 06 61 38 75 45
          </p>
        </div>
      </div>
    </div>
  )
}