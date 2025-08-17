'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface RelatedPage {
  title: string
  href: string
  description: string
  type: 'sushi' | 'restaurant' | 'blog'
}

interface InternalLinksProps {
  currentCity?: string
  currentType?: 'sushi' | 'restaurant'
}

export function InternalLinks({ currentCity, currentType }: InternalLinksProps) {
  // Villes proches basées sur la ville actuelle
  const getNearbyLocations = (city?: string): RelatedPage[] => {
    const cityRelations: Record<string, RelatedPage[]> = {
      'gardanne': [
        { title: 'Sushi Biver', href: '/sushi-biver', description: 'Livraison rapide à Biver (5km)', type: 'sushi' },
        { title: 'Restaurant Meyreuil', href: '/restaurant-japonais-meyreuil', description: 'Restaurant japonais à Meyreuil', type: 'restaurant' },
        { title: 'Sushi Aix-en-Provence', href: '/sushi-aix-en-provence', description: 'Livraison sur Aix', type: 'sushi' }
      ],
      'aix-en-provence': [
        { title: 'Sushi Les Milles', href: '/sushi-les-milles', description: 'Zone Les Milles', type: 'sushi' },
        { title: 'Restaurant Luynes', href: '/restaurant-japonais-luynes', description: 'Restaurant à Luynes', type: 'restaurant' },
        { title: 'Sushi La Duranne', href: '/sushi-aix-la-duranne', description: 'Technopôle Aix La Duranne', type: 'sushi' }
      ],
      'plan-de-campagne': [
        { title: 'Sushi Cabriès', href: '/sushi-cabries', description: 'Village de Cabriès', type: 'sushi' },
        { title: 'Restaurant Simiane', href: '/restaurant-japonais-simiane', description: 'Simiane-Collongue', type: 'restaurant' },
        { title: 'Sushi Calas', href: '/sushi-calas', description: 'Livraison Calas', type: 'sushi' }
      ],
      'default': [
        { title: 'Restaurant Bouc-Bel-Air', href: '/restaurant-japonais-bouc-bel-air', description: 'Notre restaurant principal', type: 'restaurant' },
        { title: 'Sushi Aix-en-Provence', href: '/sushi-aix-en-provence', description: 'Livraison Aix et environs', type: 'sushi' },
        { title: 'Blog Sushi', href: '/blog', description: 'Conseils et actualités', type: 'blog' }
      ]
    }
    
    return cityRelations[city || 'default'] || cityRelations['default']
  }

  const relatedPages = getNearbyLocations(currentCity)

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Découvrez aussi nos services à proximité</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedPages.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-temple-pink transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{page.description}</p>
                  </div>
                  <div className="flex items-center text-temple-pink">
                    {page.type === 'sushi' || page.type === 'restaurant' ? (
                      <MapPin className="w-5 h-5" />
                    ) : (
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Composant pour liens dans le contenu
export function ContentLinks({ city }: { city?: string }) {
  const links = [
    { text: 'restaurant japonais à Bouc-Bel-Air', href: '/restaurant-japonais-bouc-bel-air' },
    { text: 'meilleurs sushis près d\'Aix', href: '/blog/sushis-qualite-aix-provence-bouc-bel-air' },
    { text: 'livraison de sushi', href: '/sushi-aix-en-provence' },
    { text: 'commander en ligne', href: '/#nos-menus' },
    { text: 'nos créations signature', href: '/#nos-creations' },
    { text: 'formules midi', href: '/blog/restaurant-japonais-midi-bouc-bel-air' }
  ]

  return (
    <div className="my-8 p-6 bg-temple-pink/5 rounded-lg border border-temple-pink/20">
      <h3 className="font-semibold mb-3">À découvrir également :</h3>
      <ul className="space-y-2">
        {links.slice(0, 4).map((link, index) => (
          <li key={index} className="flex items-center">
            <ArrowRight className="w-4 h-4 text-temple-pink mr-2" />
            <Link 
              href={link.href}
              className="text-gray-700 hover:text-temple-pink transition-colors underline-offset-2 hover:underline"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Widget pour la sidebar ou fin d'article
export function RelatedArticles() {
  const articles = [
    { 
      title: 'Top 5 des meilleurs sushis', 
      href: '/blog/meilleur-restaurant-sushis-bouc-bel-air',
      excerpt: 'Découvrez notre sélection des créations les plus appréciées'
    },
    { 
      title: 'Guide du déjeuner japonais', 
      href: '/blog/restaurant-japonais-midi-bouc-bel-air',
      excerpt: 'Formules et menus pour le midi'
    },
    { 
      title: 'Sushis : qualité et fraîcheur', 
      href: '/blog/sushis-frais-pres-aix-provence',
      excerpt: 'Comment reconnaître un sushi de qualité'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Articles recommandés</h3>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.href} href={article.href} className="block group">
            <h4 className="font-semibold text-gray-900 group-hover:text-temple-pink transition-colors">
              {article.title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">{article.excerpt}</p>
          </Link>
        ))}
      </div>
      <Link 
        href="/blog"
        className="mt-4 inline-flex items-center text-temple-pink hover:underline"
      >
        Voir tous les articles
        <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  )
}