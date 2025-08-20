import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Clock, Star, Truck, ChefHat, Timer, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GoogleReviewsWidget } from '@/components/shared/google-reviews-widget'
import { InstagramFeedWidget } from '@/components/shared/instagram-feed-widget'
import { CreationsCarousel } from '@/components/shared/creations-carousel'
import { restaurantConfig, getDeliveryZonesText } from '@/config/restaurant.config'

export const metadata: Metadata = {
  title: 'Livraison Sushi Bouc-Bel-Air - Au Temple du Sushi | Commande en Ligne',
  description: 'Livraison de sushis frais à Bouc-Bel-Air 13320. Commandez en ligne vos sushis, makis, california rolls. Livraison 6j/7. Fermé le lundi. ☎️ 06 61 38 75 45',
  keywords: 'livraison sushi bouc bel air, sushi bouc bel air, livraison japonais 13320, commande sushi en ligne bouc bel air, temple du sushi livraison',
  openGraph: {
    title: 'Livraison Sushi Bouc-Bel-Air - Au Temple du Sushi',
    description: 'Commandez vos sushis en ligne. Livraison rapide à Bouc-Bel-Air. Frais du jour, préparés à la commande.',
    images: ['/creation1.jpg'],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://autempledusushi.fr/livraison-sushi-bouc-bel-air'
  }
}

// Données structurées pour SEO local avec FAQ
const structuredDataRestaurant = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Au Temple du Sushi - Livraison Bouc-Bel-Air",
  "image": "https://autempledusushi.fr/logo-sushi.png",
  "url": "https://autempledusushi.fr/livraison-sushi-bouc-bel-air",
  "telephone": restaurantConfig.contact.phone,
  "priceRange": "€€",
  "servesCuisine": "Cuisine japonaise, Sushi",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": restaurantConfig.address.street,
    "addressLocality": restaurantConfig.address.city,
    "postalCode": restaurantConfig.address.postalCode,
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.4547,
    "longitude": 5.4142
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "11:30",
      "closes": "14:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "18:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "18:00",
      "closes": "22:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": restaurantConfig.googleReviews.rating.toString(),
    "reviewCount": restaurantConfig.googleReviews.reviewCount.toString()
  }
}

// FAQ structurée pour SEO
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quels sont vos délais de livraison de sushi à Bouc-Bel-Air ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre service de livraison de sushi à Bouc-Bel-Air garantit une livraison en 30-45 minutes sur le centre-ville. Commande minimum de 20€ pour Bouc-Bel-Air."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles zones livrez-vous autour de Bouc-Bel-Air ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Nous livrons à : Bouc-Bel-Air (dès 20€), Cabriès, Calas et Simiane-Collongue (dès 25€), Gardanne et Biver (dès 50€). Aucune autre ville n'est desservie actuellement.`
      }
    },
    {
      "@type": "Question",
      "name": "Comment garantissez-vous la fraîcheur des sushis en livraison ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tous nos sushis sont préparés à la commande par notre chef japonais. Le poisson est sélectionné chaque matin au marché de Marseille et conservé dans des conditions optimales. Livraison en véhicules réfrigérés."
      }
    }
  ]
}

export default function LivraisonSushiBoucBelAir() {
  const { contact, googleReviews, address, deliveryZones } = restaurantConfig
  
  return (
    <>
      {/* Données structurées */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataRestaurant) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Hero Section avec overlay amélioré */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/creation1.jpg"
            alt="Livraison sushi frais Bouc-Bel-Air - Au Temple du Sushi"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Overlay avec dégradé rose temple */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-temple-pink/30 to-black/60 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Livraison Sushi à Bouc-Bel-Air - Restaurant Japonais
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Sushis frais, makis et sashimis livrés chez vous • 6j/7 • Fermé le lundi
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${contact.phone}`}>
              <Button size="lg" className="bg-temple-pink hover:bg-temple-pink/90 text-white">
                <Phone className="mr-2" />
                Commander : {contact.phoneDisplay}
              </Button>
            </a>
            <Link href="/#zone-livraison">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white">
                <Truck className="mr-2" />
                Zone de livraison
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section avantages livraison */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Service de Livraison de Sushi à Bouc-Bel-Air et Environs d'Aix-en-Provence
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Timer className="w-12 h-12 mx-auto mb-4 text-temple-pink" />
                <h3 className="font-bold mb-2">Livraison Express</h3>
                <p className="text-sm text-gray-600">30-45 min sur Bouc-Bel-Air</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <ChefHat className="w-12 h-12 mx-auto mb-4 text-temple-pink" />
                <h3 className="font-bold mb-2">Fraîcheur Garantie</h3>
                <p className="text-sm text-gray-600">Plats préparés minute par notre chef</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-temple-pink" />
                <h3 className="font-bold mb-2">Qualité Restaurant</h3>
                <p className="text-sm text-gray-600">Poisson frais du marché de Marseille</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-temple-pink" />
                <h3 className="font-bold mb-2">{googleReviews.rating}/5 ⭐</h3>
                <p className="text-sm text-gray-600">{googleReviews.reviewCount} avis vérifiés Google</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Zone de livraison avec carte */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Livraison de Cuisine Japonaise sur Bouc-Bel-Air et le Pays d'Aix</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">📍 Zones de livraison et tarifs minimum :</h3>
              <ul className="space-y-3 mb-6">
                {Object.entries(deliveryZones).map(([city, info]) => (
                  <li key={city} className="flex items-start">
                    <MapPin className="w-5 h-5 mr-2 text-temple-pink flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>{city}</strong> - À partir de {info.minOrder}€ 
                      <span className="text-gray-600"> ({info.deliveryTime})</span>
                    </span>
                  </li>
                ))}
              </ul>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <h3 className="text-lg font-semibold mb-3">🚚 Conditions de livraison :</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Bouc-Bel-Air :</strong> Minimum 20€</li>
                  <li>• <strong>Cabriès, Calas, Simiane :</strong> Minimum 25€</li>
                  <li>• <strong>Gardanne, Biver :</strong> Minimum 50€</li>
                  <li>• <strong>Horaires :</strong> Mar-Sam: 11h30-14h00 et 18h00-22h00 | Dim: 18h00-22h00</li>
                  <li>• <strong>Fermé :</strong> Lundi</li>
                </ul>
              </Card>
            </div>

            {/* Google Maps Embed avec la bonne URL */}
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={address.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zone de livraison Au Temple du Sushi Bouc-Bel-Air"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Widgets dynamiques avant la FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Widget Avis Google */}
          <GoogleReviewsWidget />
          
          {/* Widget Instagram Feed */}
          <InstagramFeedWidget />
          
          {/* Carrousel Nos Créations */}
          <CreationsCarousel />
        </div>
      </section>

      {/* Section FAQ SEO avec données structurées */}
      <section className="py-12" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Questions Fréquentes - Livraison de Sushi à Bouc-Bel-Air</h2>
          
          <div className="space-y-6">
            <div itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-semibold mb-2" itemProp="name">
                Quels sont vos délais de livraison de sushi à Bouc-Bel-Air ?
              </h3>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-gray-600" itemProp="text">
                  Notre service de livraison de sushi à Bouc-Bel-Air garantit une livraison en 30-45 minutes 
                  sur le centre-ville. Commande minimum de 20€ pour Bouc-Bel-Air. Nous livrons du mardi au samedi 
                  de 11h30 à 14h00 et de 18h00 à 22h00, et le dimanche de 18h00 à 22h00. Fermé le lundi.
                </p>
              </div>
            </div>

            <div itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-semibold mb-2" itemProp="name">
                Quelles zones livrez-vous autour de Bouc-Bel-Air ?
              </h3>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-gray-600" itemProp="text">
                  Nous livrons exclusivement dans les zones suivantes : 
                  Bouc-Bel-Air (minimum 20€), Cabriès, Calas et Simiane-Collongue (minimum 25€), 
                  Gardanne et Biver (minimum 50€). Aucune autre ville n'est actuellement desservie par notre service de livraison.
                </p>
              </div>
            </div>

            <div itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-semibold mb-2" itemProp="name">
                Proposez-vous des formules midi pour les entreprises de Bouc-Bel-Air ?
              </h3>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-gray-600" itemProp="text">
                  Oui ! Notre restaurant japonais propose un service de livraison le midi de 11h30 à 14h00 
                  du mardi au samedi, parfait pour les déjeuners d'affaires. Nous offrons des plateaux repas 
                  bento et des formules adaptées aux entreprises de la zone Bouc-Bel-Air et La Malle.
                </p>
              </div>
            </div>

            <div itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
              <h3 className="text-xl font-semibold mb-2" itemProp="name">
                Comment garantissez-vous la fraîcheur des sushis en livraison ?
              </h3>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-gray-600" itemProp="text">
                  Tous nos sushis, makis et sashimis sont préparés à la commande par notre chef japonais 
                  avec 20 ans d'expérience. Le poisson est sélectionné chaque matin au marché de Marseille, 
                  conservé selon les normes HACCP et découpé au moment de votre commande. 
                  La livraison s'effectue en véhicules réfrigérés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final avec maillage interne cohérent */}
      <section className="py-12 bg-temple-pink/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Commander des Sushis en Livraison à Bouc-Bel-Air
          </h2>
          <p className="text-xl mb-8">
            Livraison de cuisine japonaise authentique 6j/7 • Sushis frais préparés à la commande
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={`tel:${contact.phone}`}>
              <Button size="lg" className="bg-temple-pink hover:bg-temple-pink/90">
                <Phone className="mr-2" />
                Commander : {contact.phoneDisplay}
              </Button>
            </a>
            <Link href="/">
              <Button size="lg" variant="outline">
                Voir la carte complète
              </Button>
            </Link>
          </div>

          {/* Liens de maillage interne cohérents */}
          <div className="border-t pt-8 mt-8">
            <p className="text-sm text-gray-600 mb-4">Découvrez aussi :</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/restaurant-japonais-bouc-bel-air" className="text-temple-pink hover:underline">
                Restaurant sur place
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/" className="text-temple-pink hover:underline">
                Carte et menus
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/livraison-sushi-gardanne" className="text-temple-pink hover:underline">
                Livraison Gardanne
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/livraison-sushi-cabries" className="text-temple-pink hover:underline">
                Livraison Cabriès
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/restaurant-japonais-proche-aix-en-provence" className="text-temple-pink hover:underline">
                Proche Aix-en-Provence
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/#avis" className="text-temple-pink hover:underline">
                Avis clients
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}