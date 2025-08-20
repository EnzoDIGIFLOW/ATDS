import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Clock, Star, Calendar, Users, Heart, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getStructuredDataHours, OPENING_HOURS } from '@/config/hours'
import dynamic from 'next/dynamic'
import ExperienceSection from '@/components/experience-section'

// Import dynamique pour le composant client
const OpeningHours = dynamic(() => import('@/components/opening-hours'))

export const metadata: Metadata = {
  title: 'Restaurant Japonais Bouc-Bel-Air - Au Temple du Sushi | Cuisine Authentique',
  description: 'Restaurant japonais traditionnel à Bouc-Bel-Air. Sushis frais, sashimis, cuisine japonaise authentique. Ouvert 7j/7 midi et soir. Réservation: 06 61 38 75 45',
  keywords: 'restaurant japonais bouc bel air, sushi bouc bel air, restaurant japonais 13320, temple du sushi, restaurant asiatique bouc bel air',
  openGraph: {
    title: 'Au Temple du Sushi - Restaurant Japonais à Bouc-Bel-Air',
    description: 'Découvrez notre cuisine japonaise authentique dans un cadre zen et moderne. Réservation recommandée.',
    images: ['/img1.jpg'],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://autempledusushi.fr/restaurant-japonais-bouc-bel-air'
  }
}

// Données structurées complètes pour restaurant
const structuredDataRestaurant = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Au Temple du Sushi - Restaurant Japonais Bouc-Bel-Air",
  "image": [
    "https://autempledusushi.fr/img1.jpg",
    "https://autempledusushi.fr/img2.jpg",
    "https://autempledusushi.fr/img3.jpg"
  ],
  "url": "https://autempledusushi.fr/restaurant-japonais-bouc-bel-air",
  "telephone": "+33661387545",
  "priceRange": "€€",
  "servesCuisine": ["Japanese", "Sushi", "Asian"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2010 Avenue de la Croix d'Or",
    "addressLocality": "Bouc-Bel-Air",
    "postalCode": "13320",
    "addressCountry": "FR",
    "addressRegion": "Provence-Alpes-Côte d'Azur"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.4547,
    "longitude": 5.4142
  },
  "openingHours": getStructuredDataHours(),
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "247",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Marie L."
      },
      "datePublished": "2024-12-15",
      "reviewBody": "Meilleur restaurant japonais de la région ! Les sushis sont d'une fraîcheur incomparable."
    }
  ],
  "acceptsReservations": "True",
  "menu": "https://autempledusushi.fr/menu",
  "hasMenu": {
    "@type": "Menu",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Sushis",
        "hasMenuItem": {
          "@type": "MenuItem",
          "name": "Sushi Saumon",
          "description": "2 pièces de sushi au saumon frais",
          "offers": {
            "@type": "Offer",
            "price": "4.50",
            "priceCurrency": "EUR"
          }
        }
      }
    ]
  }
}

// FAQ structurée pour SEO
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le meilleur restaurant japonais à Bouc-Bel-Air ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Au Temple du Sushi est reconnu comme le meilleur restaurant japonais de Bouc-Bel-Air avec une note de 4.8/5 sur Google et 247 avis vérifiés. Notre chef japonais avec 20 ans d'expérience garantit une authenticité unique dans le Pays d'Aix."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il réserver pour manger au restaurant japonais de Bouc-Bel-Air ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La réservation est fortement recommandée le week-end et les jours fériés. Notre restaurant de 60 couverts accueille régulièrement des habitants de Bouc-Bel-Air, Aix-en-Provence et Plan de Campagne. Réservez au 06 61 38 75 45."
      }
    },
    {
      "@type": "Question",
      "name": "Proposez-vous des menus halal ou végétariens ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, notre restaurant japonais propose de nombreuses options végétariennes et des plats sans porc. Nous pouvons adapter nos créations selon vos régimes alimentaires spécifiques."
      }
    }
  ]
}

export default function RestaurantJaponaisBoucBelAir() {
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

      {/* Hero Section avec galerie */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img1.jpg"
            alt="Restaurant japonais Bouc-Bel-Air - Salle Au Temple du Sushi"
            fill
            className="object-cover brightness-50"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Restaurant Japonais à Bouc-Bel-Air - Au Temple du Sushi
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Cuisine nippone authentique depuis 2014 • Maître sushi japonais • Entre Aix-en-Provence et Marseille
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-temple-pink hover:bg-temple-pink/90 text-white">
              <Phone className="mr-2" />
              Réserver : 06 61 38 75 45
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white">
              <Calendar className="mr-2" />
              Voir les horaires
            </Button>
          </div>

          {/* Badges de confiance */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">4.8/5 sur Google</span>
              </span>
            </div>
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">+10 000 clients satisfaits</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section présentation du restaurant */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Au Temple du Sushi : Le Meilleur Restaurant Japonais de Bouc-Bel-Air et du Pays d'Aix
              </h2>
              <p className="text-gray-600 mb-4">
                Idéalement situé à Bouc-Bel-Air (13320), entre Aix-en-Provence et Gardanne, <strong>Au Temple du Sushi</strong> 
                est LA référence de la cuisine japonaise authentique dans le Pays d'Aix. Notre établissement, ouvert depuis 2014, 
                propose une expérience culinaire nippone unique, alliant tradition japonaise et créativité contemporaine.
              </p>
              <p className="text-gray-600 mb-4">
                Notre maître sushi japonais, formé à Tokyo et fort de 20 ans d'expérience, sélectionne personnellement 
                chaque matin les meilleurs poissons au marché aux poissons de Marseille. Thon rouge, saumon Écosse Label Rouge, 
                daurade sauvage... Cette exigence de qualité exceptionnelle fait d'Au Temple du Sushi <strong>le restaurant 
                japonais préféré des habitants de Bouc-Bel-Air, Cabriès, Simiane-Collongue</strong> et des environs d'Aix-en-Provence.
              </p>
              <p className="text-gray-600 mb-6">
                Que vous soyez amateur de sushis nigiri traditionnels, passionné de sashimis délicats, curieux de découvrir 
                nos spécialités chaudes (tempura, gyoza, yakitori) ou à la recherche d'un cadre zen pour un déjeuner d'affaires 
                entre Aix et Plan de Campagne, notre restaurant japonais saura satisfaire les palais les plus exigeants. 
                Nous accueillons également vos événements privés (anniversaires, repas d'entreprise) jusqu'à 30 personnes.
              </p>

              {/* Points forts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-temple-pink flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">100% Fait Maison</h3>
                    <p className="text-sm text-gray-600">Aucun produit surgelé, tout est frais</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Utensils className="w-5 h-5 text-temple-pink flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Maître Sushi Nippon</h3>
                    <p className="text-sm text-gray-600">Formé à Tokyo, 20 ans d'expérience</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-temple-pink flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Poissons du Jour</h3>
                    <p className="text-sm text-gray-600">Marché de Marseille chaque matin</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-temple-pink flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Restaurant 60 Places</h3>
                    <p className="text-sm text-gray-600">Terrasse, parking gratuit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Galerie d'images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48">
                <Image
                  src="/img2.jpg"
                  alt="Salle restaurant japonais Bouc-Bel-Air intérieur zen"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48">
                <Image
                  src="/img3.jpg"
                  alt="Plateau sushi restaurant Bouc-Bel-Air présentation"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48">
                <Image
                  src="/img4.jpg"
                  alt="Chef japonais préparation sushi Bouc-Bel-Air"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48">
                <Image
                  src="/img5.jpg"
                  alt="Terrasse restaurant japonais Bouc-Bel-Air"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Spécialités */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Spécialités du Restaurant Japonais - Sushi, Sashimi, Plats Chauds à Bouc-Bel-Air
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="relative h-32 mb-4">
                  <Image
                    src="/creation1.jpg"
                    alt="Sushi premium restaurant Bouc-Bel-Air"
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="font-bold mb-2">Sushis Nigiri & Sashimis</h3>
                <p className="text-sm text-gray-600">
                  Thon rouge Mediterranée, saumon Écosse, daurade royale, crevette tiger... Les meilleurs poissons d'Aix-Marseille
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="relative h-32 mb-4">
                  <Image
                    src="/creation2.jpg"
                    alt="California rolls restaurant Bouc-Bel-Air"
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="font-bold mb-2">California Rolls & Makis</h3>
                <p className="text-sm text-gray-600">
                  Spécialités du Temple : Dragon Roll, Rainbow Roll, Spicy Tuna... Uniques à Bouc-Bel-Air
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="relative h-32 mb-4">
                  <Image
                    src="/creation5.jpeg"
                    alt="Plats chauds japonais Bouc-Bel-Air"
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="font-bold mb-2">Cuisine Chaude Japonaise</h3>
                <p className="text-sm text-gray-600">
                  Tempura de légumes, Gyoza maison, Yakitori, Ramen, Katsu... Plats traditionnels nippons
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="relative h-32 mb-4">
                  <Image
                    src="/creation6.jpeg"
                    alt="Desserts japonais restaurant Bouc-Bel-Air"
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="font-bold mb-2">Pâtisseries Japonaises</h3>
                <p className="text-sm text-gray-600">
                  Mochis artisanaux, Dorayaki, glace au thé vert matcha, cheesecake japonais
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Informations pratiques avec Google Maps */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Informations Pratiques & Accès</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Infos */}
            <div>
              <div className="mb-6">
                <OpeningHours variant="card" showStatus={true} />
              </div>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-temple-pink" />
                    Adresse & Accès
                  </h3>
                  <address className="not-italic space-y-2">
                    <p className="font-medium">Au Temple du Sushi</p>
                    <p>2010 Avenue de la Croix d'Or</p>
                    <p>13320 Bouc-Bel-Air</p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Parking gratuit</strong> devant le restaurant
                    </p>
                    <p className="text-sm text-gray-600">
                      À 5 min de Plan de Campagne • 15 min d'Aix-en-Provence
                    </p>
                  </address>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-temple-pink" />
                    Réservation
                  </h3>
                  <p className="mb-3">
                    <a href="tel:+33661387545" className="text-2xl font-bold text-temple-pink hover:underline">
                      06 61 38 75 45
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    Réservation recommandée le week-end et jours fériés.
                    Possibilité de privatisation pour événements.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Google Maps */}
            <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.8268881755!2d5.4120!3d43.4547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9f3f3f3f3f3f3%3A0x1234567890abcdef!2sAu%20Temple%20du%20Sushi!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Au Temple du Sushi Bouc-Bel-Air localisation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Avis Clients */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ce que Disent nos Clients du Restaurant
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Le meilleur restaurant japonais de Bouc-Bel-Air sans hésitation ! 
                  Les sushis sont d'une fraîcheur incomparable et le service est impeccable."
                </p>
                <p className="font-semibold">Marie L.</p>
                <p className="text-sm text-gray-500">Client régulier depuis 2018</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Un vrai voyage au Japon ! Le chef maîtrise parfaitement son art. 
                  Je recommande particulièrement les sashimis et le chirashi."
                </p>
                <p className="font-semibold">Thomas D.</p>
                <p className="text-sm text-gray-500">Avis Google 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Parfait pour un déjeuner d'affaires ou un dîner en amoureux. 
                  Le cadre est zen et l'ambiance très agréable."
                </p>
                <p className="font-semibold">Sophie M.</p>
                <p className="text-sm text-gray-500">Entreprise locale</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ SEO Local */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            Questions Fréquentes - Restaurant Japonais Bouc-Bel-Air
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Votre restaurant japonais est-il adapté aux végétariens ?
              </h3>
              <p className="text-gray-600">
                Oui, nous proposons plusieurs options végétariennes : makis avocat-concombre, 
                california végétarien, edamame, salade de wakame, et des plats chauds végétariens. 
                Notre chef peut également adapter certains plats sur demande.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Proposez-vous des menus pour les groupes ?
              </h3>
              <p className="text-gray-600">
                Absolument ! Nous accueillons régulièrement des groupes jusqu'à 30 personnes. 
                Des menus spéciaux peuvent être élaborés pour les anniversaires, repas d'entreprise 
                ou autres événements. Contactez-nous pour un devis personnalisé.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Quelle est la différence avec les autres restaurants japonais près d'Aix ?
              </h3>
              <p className="text-gray-600">
                Au Temple du Sushi se distingue par son authenticité : notre chef est japonais, 
                nous n'utilisons que des produits frais (jamais de surgelé), et nous préparons 
                tout à la commande. Notre proximité avec{' '}
                <Link href="/restaurant-japonais-proche-aix-en-provence" className="text-temple-pink hover:underline">
                  Aix-en-Provence
                </Link>{' '}et{' '}
                <Link href="/restaurant-japonais-proche-plan-de-campagne" className="text-temple-pink hover:underline">
                  Plan de Campagne
                </Link>{' '}
                nous permet d'accueillir une clientèle exigeante qui recherche la qualité.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Peut-on commander à emporter au restaurant ?
              </h3>
              <p className="text-gray-600">
                Bien sûr ! Vous pouvez commander à emporter directement au restaurant ou par téléphone. 
                Nous proposons également un{' '}
                <Link href="/livraison-sushi-bouc-bel-air" className="text-temple-pink hover:underline">
                  service de livraison sur Bouc-Bel-Air
                </Link>{' '}
                et les communes voisines pour votre confort.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Y a-t-il un parking près du restaurant ?
              </h3>
              <p className="text-gray-600">
                Oui, un parking gratuit est disponible juste devant le restaurant avec une vingtaine 
                de places. L'accès est très facile depuis l'avenue de la Croix d'Or, 
                à seulement 2 minutes de la sortie autoroute Bouc-Bel-Air.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vivez l'Expérience - Composant réutilisable */}
      <ExperienceSection />

      {/* Maillage interne */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-4">Découvrez aussi nos services :</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/livraison-sushi-bouc-bel-air" className="text-temple-pink hover:underline">
              Service de livraison
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/restaurant-japonais-proche-plan-de-campagne" className="text-temple-pink hover:underline">
              Proche Plan de Campagne
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/restaurant-japonais-proche-aix-en-provence" className="text-temple-pink hover:underline">
              15 min d'Aix-en-Provence
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/blog/meilleur-restaurant-japonais-bouc-bel-air" className="text-temple-pink hover:underline">
              Notre histoire
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/blog/restaurant-japonais-midi-bouc-bel-air" className="text-temple-pink hover:underline">
              Menu du midi
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}