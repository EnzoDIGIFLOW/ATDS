'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react'
import OpeningHours from './opening-hours'

// Villes où la livraison est disponible
const deliveryCities = [
  { name: 'Bouc-Bel-Air', slug: 'bouc-bel-air' },
  { name: 'Cabriès', slug: 'cabries' },
  { name: 'Calas', slug: 'calas' },
  { name: 'Simiane-Collongue', slug: 'simiane' },
  { name: 'Gardanne', slug: 'gardanne' },
  { name: 'Biver', slug: 'biver' }
]

// Villes à proximité (pour SEO restaurant)
const nearbyCities = [
  { name: 'Plan de Campagne', slug: 'plan-de-campagne' },
  { name: 'Aix-en-Provence', slug: 'aix-en-provence' },
  { name: 'Les Milles', slug: 'les-milles' },
  { name: 'Luynes', slug: 'luynes' },
  { name: 'Aix La Duranne', slug: 'aix-la-duranne' },
  { name: 'Meyreuil', slug: 'meyreuil' },
  { name: 'Fuveau', slug: 'fuveau' },
  { name: 'Mimet', slug: 'mimet' }
]

const blogArticles = [
  { title: 'Où manger japonais à Bouc-Bel-Air ?', slug: 'ou-manger-japonais-bouc-bel-air-plan-campagne' },
  { title: 'Sushis de qualité près d\'Aix', slug: 'sushis-qualite-aix-provence-bouc-bel-air' },
  { title: 'Meilleur restaurant japonais', slug: 'meilleur-restaurant-japonais-bouc-bel-air' },
  { title: 'Restaurant midi Bouc-Bel-Air', slug: 'restaurant-japonais-midi-bouc-bel-air' }
]

export default function SEOFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale du footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Colonne 1 : À propos */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-temple-pink">Au Temple du Sushi</h3>
            <p className="text-gray-400 mb-4">
              Restaurant japonais authentique à Bouc-Bel-Air. Sushis frais, livraison et sur place.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" className="hover:text-temple-pink transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="hover:text-temple-pink transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" className="hover:text-temple-pink transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Livraison Sushi (zones desservies) */}
          <div>
            <h4 className="font-bold mb-4 text-temple-pink">Livraison Sushi</h4>
            <ul className="space-y-2">
              {deliveryCities.map((city) => (
                <li key={city.slug}>
                  <Link 
                    href={`/livraison-sushi-${city.slug}`}
                    className={`text-gray-400 hover:text-temple-pink transition-colors text-sm ${
                      city.slug === 'bouc-bel-air' ? 'font-semibold' : ''
                    }`}
                  >
                    Livraison {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Restaurant Japonais Bouc-Bel-Air */}
          <div>
            <h4 className="font-bold mb-4 text-temple-pink">Restaurant Japonais</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/restaurant-japonais-bouc-bel-air"
                  className="text-gray-400 hover:text-temple-pink transition-colors text-sm font-bold"
                >
                  Restaurant Bouc-Bel-Air ⭐
                </Link>
              </li>
              {nearbyCities.slice(0, 5).map((city) => (
                <li key={city.slug}>
                  <Link 
                    href={`/restaurant-japonais-proche-${city.slug}`}
                    className="text-gray-400 hover:text-temple-pink transition-colors text-sm"
                  >
                    Proche {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Plus de zones proches */}
          <div>
            <h4 className="font-bold mb-4 text-temple-pink">Zones Proches</h4>
            <ul className="space-y-2">
              {nearbyCities.slice(5).map((city) => (
                <li key={city.slug}>
                  <Link 
                    href={`/restaurant-japonais-proche-${city.slug}`}
                    className="text-gray-400 hover:text-temple-pink transition-colors text-sm"
                  >
                    Proche {city.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 mt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                  📍 Siège social
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  2010 Av. Croix d'Or<br/>
                  13320 Bouc-Bel-Air
                </p>
              </li>
            </ul>
          </div>

          {/* Colonne 5 : Blog & Contact */}
          <div>
            <h4 className="font-bold mb-4 text-temple-pink">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/blog"
                  className="text-gray-400 hover:text-temple-pink transition-colors text-sm font-semibold"
                >
                  Blog & Conseils
                </Link>
              </li>
              {blogArticles.slice(0, 3).map((article) => (
                <li key={article.slug} className="ml-2">
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="text-gray-500 hover:text-temple-pink transition-colors text-xs"
                  >
                    → {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section contact */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-temple-pink" />
              <span className="text-gray-400">2010 Av. de la Croix d\'Or, 13320 Bouc-Bel-Air</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-temple-pink" />
              <a href="tel:+33661387545" className="text-gray-400 hover:text-temple-pink">
                06 61 38 75 45
              </a>
            </div>
            <div className="w-full md:w-auto">
              <OpeningHours variant="compact" className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Section SEO */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-center text-xs text-gray-500 mb-2">
            <span className="font-semibold">Restaurant japonais Bouc-Bel-Air</span> | 
            Livraison sushi Cabriès, Calas, Simiane-Collongue | 
            Service Gardanne et Biver (50€ min)
          </p>
          <p className="text-center text-xs text-gray-500">
            Proche Aix-en-Provence | Plan de Campagne | Les Milles | 
            Cuisine japonaise authentique depuis 2014
          </p>
          <p className="text-center text-xs text-gray-600 mt-3">
            © 2025 Au Temple du Sushi - Tous droits réservés | 
            <Link href="/mentions-legales" className="hover:text-temple-pink ml-1">Mentions légales</Link> | 
            <Link href="/politique-confidentialite" className="hover:text-temple-pink ml-1">Confidentialité</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}