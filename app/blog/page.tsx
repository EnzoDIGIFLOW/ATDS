import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blog Au Temple du Sushi - Conseils et Guide Restaurants Japonais Aix-en-Provence',
  description: 'Découvrez notre blog dédié à la cuisine japonaise près d\'Aix-en-Provence. Conseils d\'experts, guides des meilleurs restaurants, et actualités sushi.',
  keywords: 'blog restaurant japonais Aix-en-Provence, conseils sushi, guide cuisine japonaise, Au Temple du Sushi actualités',
  openGraph: {
    title: 'Blog Au Temple du Sushi - Guide de la cuisine japonaise',
    description: 'Tous nos conseils et guides pour découvrir la meilleure cuisine japonaise près d\'Aix-en-Provence',
    type: 'website',
    images: [
      {
        url: '/creation1.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Au Temple du Sushi cuisine japonaise Aix-en-Provence',
      },
    ],
  },
}

const blogArticles = [
  {
    id: 1,
    title: 'Où bien manger japonais à Bouc-Bel-Air ou Plan de Campagne ?',
    excerpt: 'Découvrez les meilleures adresses pour manger japonais à Bouc-Bel-Air et Plan de Campagne. Sushis frais, restaurants authentiques et conseils d\'experts.',
    slug: 'ou-manger-japonais-bouc-bel-air-plan-campagne',
    image: '/img1.jpg',
    date: '2024-12-15',
    readTime: '8 min',
    category: 'Guide Restaurants'
  },
  {
    id: 2,
    title: 'Où manger des sushis de qualité à Aix-en-Provence ou Bouc-Bel-Air ?',
    excerpt: 'Guide des meilleurs sushis à Aix-en-Provence et Bouc-Bel-Air. Découvrez où trouver des sushis frais, authentiques et de qualité premium.',
    slug: 'sushis-qualite-aix-provence-bouc-bel-air',
    image: '/creation2.jpg',
    date: '2024-12-15',
    readTime: '9 min',
    category: 'Qualité & Fraîcheur'
  },
  {
    id: 3,
    title: 'Quel est le meilleur restaurant japonais autour de Bouc-Bel-Air ?',
    excerpt: 'Découvrez le meilleur restaurant japonais près de Bouc-Bel-Air. Guide complet avec avis, spécialités et conseils pour une expérience authentique.',
    slug: 'meilleur-restaurant-japonais-bouc-bel-air',
    image: '/creation1.jpg',
    date: '2024-12-15',
    readTime: '10 min',
    category: 'Sélection Expert'
  },
  {
    id: 4,
    title: 'Restaurant japonais bon rapport qualité-prix à Aix-en-Provence',
    excerpt: 'Les meilleures adresses japonaises à Aix-en-Provence pour allier qualité et prix accessible. Formules, conseils et astuces budget.',
    slug: 'restaurant-japonais-rapport-qualite-prix-aix',
    image: '/creation6.jpeg',
    date: '2024-12-15',
    readTime: '8 min',
    category: 'Bon Plans'
  },
  {
    id: 5,
    title: 'Sushis frais et savoureux près d\'Aix-en-Provence',
    excerpt: 'Les meilleures adresses pour des sushis d\'une fraîcheur exceptionnelle près d\'Aix-en-Provence. Secrets de la fraîcheur et conseils de dégustation.',
    slug: 'sushis-frais-pres-aix-provence',
    image: '/creation5.jpeg',
    date: '2024-12-15',
    readTime: '8 min',
    category: 'Qualité & Fraîcheur'
  },
  {
    id: 6,
    title: 'Où manger japonais le midi à Bouc-Bel-Air ou Plan de Campagne ?',
    excerpt: 'Découvrez les restaurants japonais ouverts le midi avec formules déjeuner, service rapide et cuisine authentique pour votre pause de midi.',
    slug: 'restaurant-japonais-midi-bouc-bel-air',
    image: '/img4.jpg',
    date: '2024-12-15',
    readTime: '7 min',
    category: 'Service Midi'
  },
  {
    id: 7,
    title: 'Top restaurants de sushis entre Aix-en-Provence et Marseille Nord',
    excerpt: 'Classement des meilleurs restaurants de sushis entre Aix-en-Provence et Marseille Nord. Sélection d\'experts et adresses incontournables.',
    slug: 'top-restaurants-sushis-aix-marseille',
    image: '/creation1.jpg',
    date: '2024-12-15',
    readTime: '9 min',
    category: 'Classement'
  },
  {
    id: 8,
    title: 'Restaurant japonais ouvert le midi à Bouc-Bel-Air',
    excerpt: 'Guide complet des restaurants japonais ouverts le midi à Bouc-Bel-Air. Horaires, formules déjeuner et services disponibles.',
    slug: 'restaurant-japonais-ouvert-midi-bouc-bel-air',
    image: '/img5.jpg',
    date: '2024-12-15',
    readTime: '7 min',
    category: 'Service Midi'
  },
  {
    id: 9,
    title: 'Le meilleur restaurant de sushis à Bouc-Bel-Air',
    excerpt: 'Pourquoi Au Temple du Sushi est reconnu comme le meilleur restaurant de sushis à Bouc-Bel-Air. Excellence, authenticité et service d\'exception.',
    slug: 'meilleur-restaurant-sushis-bouc-bel-air',
    image: '/creation1.jpg',
    date: '2024-12-15',
    readTime: '8 min',
    category: 'Sélection Expert'
  },
  {
    id: 10,
    title: 'Restaurant japonais à emporter ou sur place proche d\'Aix',
    excerpt: 'Service flexible proche d\'Aix-en-Provence : sur place, à emporter et livraison. Découvrez notre offre adaptée à tous vos besoins.',
    slug: 'restaurant-japonais-emporter-sur-place-aix',
    image: '/creation6.jpeg',
    date: '2024-12-15',
    readTime: '7 min',
    category: 'Services'
  }
]

const categories = [
  'Tous les articles',
  'Guide Restaurants',
  'Qualité & Fraîcheur', 
  'Sélection Expert',
  'Bon Plans',
  'Service Midi',
  'Classement',
  'Services'
]

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Blog Au Temple du Sushi
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Découvrez tous nos conseils d'experts, guides des meilleures adresses et actualités 
          de la cuisine japonaise près d'Aix-en-Provence. Votre référence pour une expérience 
          culinaire authentique et de qualité.
        </p>
      </header>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-gray-100 hover:bg-temple-pink/10 rounded-full text-sm font-medium text-gray-700 hover:text-temple-pink transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-temple-pink to-temple-pink/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="/creation1.jpg" 
                alt="Article featured Au Temple du Sushi"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                Article Featured
              </span>
              <h2 className="text-3xl font-bold mb-4">
                Quel est le meilleur restaurant japonais autour de Bouc-Bel-Air ?
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Découvrez pourquoi Au Temple du Sushi s'impose comme LA référence incontournable 
                pour la cuisine japonaise authentique près de Bouc-Bel-Air.
              </p>
              <Link 
                href="/blog/meilleur-restaurant-japonais-bouc-bel-air"
                className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Lire l'article
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Tous nos articles</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-temple-pink text-black text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center text-temple-pink font-semibold hover:text-temple-pink/80 transition-colors"
                >
                  Lire la suite
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-20 bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Restez informé de nos actualités
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Abonnez-vous à notre newsletter pour recevoir nos derniers articles, conseils d'experts 
          et actualités du restaurant Au Temple du Sushi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Votre adresse email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-temple-pink"
          />
          <button className="px-6 py-3 bg-temple-pink text-white font-semibold rounded-lg hover:bg-temple-pink/90 transition-colors">
            S'abonner
          </button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">
          Prêt à découvrir Au Temple du Sushi ?
        </h3>
        <p className="text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Après avoir lu nos conseils, il est temps de vivre l'expérience ! 
          Réservez votre table et découvrez pourquoi nous sommes la référence 
          de la cuisine japonaise près d'Aix-en-Provence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/restaurant-japonais-bouc-bel-air"
            className="inline-block px-8 py-4 bg-white text-green-800 font-bold rounded-lg hover:bg-green-50 transition-colors"
          >
            Découvrir le restaurant
          </Link>
          <Link 
            href="#contact"
            className="inline-block px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
          >
            Réserver une table
          </Link>
        </div>
      </section>
    </div>
  )
}