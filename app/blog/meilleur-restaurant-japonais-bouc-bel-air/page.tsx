import type { Metadata } from 'next'
import { ContentLinks, RelatedArticles } from '@/components/internal-links'
import Breadcrumb from '@/components/breadcrumb'
import GoogleMapsEmbed from '@/components/google-maps-embed'

export const metadata: Metadata = {
  title: 'Quel est le meilleur restaurant japonais autour de Bouc-Bel-Air ? | Au Temple du Sushi',
  description: 'Découvrez le meilleur restaurant japonais près de Bouc-Bel-Air. Guide complet avec avis, spécialités et conseils pour une expérience culinaire authentique.',
  keywords: 'meilleur restaurant japonais Bouc-Bel-Air, sushi authentique, cuisine japonaise Provence, Au Temple du Sushi avis',
  openGraph: {
    title: 'Quel est le meilleur restaurant japonais autour de Bouc-Bel-Air ?',
    description: 'Guide expert pour trouver le meilleur restaurant japonais près de Bouc-Bel-Air',
    type: 'article',
    publishedTime: '2024-12-15',
    authors: ['Au Temple du Sushi'],
    images: [
      {
        url: '/creation1.jpg',
        width: 1200,
        height: 630,
        alt: 'Meilleur restaurant japonais Bouc-Bel-Air',
      },
    ],
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Quel est le meilleur restaurant japonais autour de Bouc-Bel-Air ?",
  "description": "Guide complet pour identifier et choisir le meilleur restaurant japonais près de Bouc-Bel-Air",
  "image": "/creation1.jpg",
  "author": {
    "@type": "Organization",
    "name": "Au Temple du Sushi",
    "url": "https://www.au-temple-du-sushi.fr"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Au Temple du Sushi",
    "logo": {
      "@type": "ImageObject",
      "url": "/logo-sushi.png"
    }
  },
  "datePublished": "2024-12-15",
  "dateModified": "2024-12-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.au-temple-du-sushi.fr/blog/meilleur-restaurant-japonais-bouc-bel-air"
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quels critères définissent le meilleur restaurant japonais ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un excellent restaurant japonais se distingue par la fraîcheur des produits, l'authenticité des recettes, la maîtrise technique des chefs, l'ambiance et le service. Au Temple du Sushi excelle dans tous ces domaines."
      }
    },
    {
      "@type": "Question",
      "name": "Au Temple du Sushi est-il vraiment le meilleur à Bouc-Bel-Air ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Au Temple du Sushi s'est imposé comme une référence grâce à son approche authentique, ses produits premium et son service d'exception, ce qui en fait le choix privilégié des connaisseurs."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il réserver à l'avance ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il est recommandé de réserver, surtout en soirée et le week-end, car les meilleurs restaurants japonais comme Au Temple du Sushi sont très demandés."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les spécialités à ne pas manquer ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ne manquez pas les sushis omakase, les sashimis de saison, les makis signature et les plats chauds traditionnels comme les tempuras et ramens."
      }
    }
  ]
}

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Au Temple du Sushi",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bouc-Bel-Air",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "addressCountry": "FR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "servesCuisine": "Japonaise",
  "priceRange": "€€€"
}

export default function MeilleurRestaurantJaponaisArticle() {
  return (
    <div>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: 'Blog', href: '/blog' },
          { label: 'Meilleur Restaurant Japonais à Bouc-Bel-Air' }
        ]}
      />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quel est le meilleur restaurant japonais autour de Bouc-Bel-Air ?
          </h1>
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <time dateTime="2024-12-15">15 décembre 2024</time>
            <span className="mx-2">•</span>
            <span>10 min de lecture</span>
          </div>
          <img 
            src="/creation1.jpg" 
            alt="Intérieur élégant du meilleur restaurant japonais de Bouc-Bel-Air"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Chercher le meilleur restaurant japonais autour de Bouc-Bel-Air peut s'avérer être un véritable défi tant l'offre 
            s'est enrichie ces dernières années. Entre authenticité traditionnelle et créativité moderne, comment identifier 
            l'établissement qui vous offrira une expérience culinaire inoubliable ? Voici notre guide expert pour vous aider 
            à faire le meilleur choix et découvrir la perle rare de la gastronomie nippone locale.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Les critères d'excellence d'un restaurant japonais de qualité
          </h2>
          
          <p>
            Avant de dévoiler notre sélection, il est crucial de comprendre les éléments qui distinguent un excellent 
            restaurant japonais. Ces critères, forgés par des siècles de tradition culinaire, constituent les fondements 
            de l'évaluation que tout amateur éclairé devrait appliquer.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            L'authenticité : au cœur de l'expérience
          </h3>
          
          <img 
            src="/img3.jpg" 
            alt="Chef japonais préparant des sushis avec technique traditionnelle"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            L'authenticité ne se limite pas à la nationalité du chef, mais englobe le respect des techniques ancestrales, 
            l'utilisation d'ingrédients traditionnels et la préservation de l'esprit japonais. Un restaurant authentique 
            respecte les saisons, propose des spécialités régionales et maintient un équilibre subtil entre tradition et adaptation locale.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            La qualité des produits : fondement de l'excellence
          </h3>
          
          <p>
            La cuisine japonaise repose sur la sublimation de produits d'exception. Un excellent restaurant sélectionne 
            rigoureusement ses fournisseurs, privilégie la fraîcheur quotidienne et n'hésite pas à adapter sa carte en 
            fonction des arrivages. Cette exigence qualitative se ressent immédiatement dans l'assiette et justifie pleinement 
            la réputation des meilleurs établissements.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Au Temple du Sushi : l'excellence incontestée à Bouc-Bel-Air
          </h2>
          
          <p>
            Après une analyse approfondie des établissements de la région, <strong>Au Temple du Sushi</strong> s'impose 
            naturellement comme la référence absolue pour la cuisine japonaise authentique à Bouc-Bel-Air. Cette reconnaissance 
            ne relève pas du hasard mais d'un ensemble d'éléments qui placent cet établissement dans une catégorie à part.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Une philosophie culinaire unique
          </h3>
          
          <img 
            src="/creation2.jpg" 
            alt="Plats signature Au Temple du Sushi Bouc-Bel-Air"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            Ce qui distingue Au Temple du Sushi, c'est sa philosophie holistique de la cuisine japonaise. L'établissement 
            ne se contente pas de proposer des sushis, mais offre une véritable immersion dans la culture culinaire nippone. 
            Chaque plat raconte une histoire, chaque préparation respecte un rituel ancestral, créant ainsi une expérience 
            qui transcende la simple restauration.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            L'expertise technique au service du goût
          </h3>
          
          <p>
            Les chefs d'Au Temple du Sushi maîtrisent parfaitement les techniques japonaises traditionnelles. Du découpage 
            du poisson à la préparation du riz, chaque geste est précis, chaque détail soigné. Cette expertise technique, 
            acquise au fil des années, se traduit par une régularité et une excellence qui fidélisent une clientèle exigeante.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            L'expérience client : au-delà de la simple restauration
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            L'accueil à la japonaise : omotenashi
          </h3>
          
          <p>
            Le concept japonais d'omotenashi, qui désigne l'hospitalité sincère et désintéressée, est parfaitement incarné 
            chez Au Temple du Sushi. L'accueil y est chaleureux mais respectueux, le service attentionné sans être intrusif. 
            Cette approche crée une atmosphère propice à la dégustation et contribue significativement à l'expérience globale.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Un cadre authentique et apaisant
          </h3>
          
          <img 
            src="/creation3.jpeg" 
            alt="Intérieur zen et authentique restaurant japonais"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            L'environnement joue un rôle crucial dans l'appréciation d'un repas japonais. Au Temple du Sushi a créé un cadre 
            qui évoque subtilement le Japon sans tomber dans le pastiche. L'éclairage tamisé, la décoration épurée et 
            l'agencement réfléchi contribuent à créer cette atmosphère zen indispensable à une véritable expérience culinaire japonaise.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            La carte : un voyage culinaire complet
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Les spécialités sushi et sashimi
          </h3>
          
          <p>
            La carte d'Au Temple du Sushi révèle l'étendue du savoir-faire de l'établissement. Les sushis, préparés à la commande, 
            présentent cet équilibre parfait entre riz vinaigré et poisson frais qui caractérise l'excellence. Les sashimis, 
            véritables œuvres d'art culinaires, mettent en valeur la qualité exceptionnelle des produits sélectionnés.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Au-delà des sushis : la richesse de la cuisine japonaise
          </h3>
          
          <img 
            src="/creation4.jpeg" 
            alt="Variété de plats japonais traditionnels tempura ramen"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            Un excellent restaurant japonais ne se limite jamais aux sushis. Au Temple du Sushi propose une carte étendue 
            incluant tempuras croustillantes, ramens réconfortants, et autres spécialités qui témoignent de la diversité 
            de la gastronomie nippone. Cette approche globale permet aux clients de découvrir l'amplitude de cette cuisine raffinée.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Témoignages clients : la validation de l'excellence
          </h2>
          
          <p>
            Les retours clients constituent un indicateur fiable de la qualité d'un établissement. Au Temple du Sushi 
            bénéficie d'une réputation exceptionnelle, construite sur des années de service irréprochable. Les habitués 
            apprécient particulièrement la constance de la qualité, l'accueil personnalisé et la capacité de l'équipe 
            à surprendre avec de nouvelles créations.
          </p>

          <blockquote className="border-l-4 border-temple-pink pl-6 py-4 my-8 bg-gray-50 italic text-gray-700">
            "Après avoir testé de nombreux restaurants japonais dans la région, Au Temple du Sushi reste notre référence. 
            La qualité est constante, l'accueil chaleureux, et on découvre toujours quelque chose de nouveau. 
            C'est notre adresse pour les grandes occasions comme pour les envies du quotidien."
            <footer className="text-sm text-gray-600 mt-2">- Marie L., cliente fidèle</footer>
          </blockquote>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Conseils pour profiter pleinement de votre visite
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Le meilleur moment pour réserver
          </h3>
          
          <p>
            Pour une expérience optimale chez Au Temple du Sushi, privilégiez les réservations en milieu de semaine pour 
            bénéficier d'un service plus personnalisé. Les soirées de week-end, bien qu'animées, nécessitent une réservation 
            anticipée en raison de la popularité bien méritée de l'établissement.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Comment commander comme un connaisseur
          </h3>
          
          <img 
            src="/creation5.jpeg" 
            alt="Menu dégustation omakase restaurant japonais"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            N'hésitez pas à faire confiance au chef en optant pour les suggestions du jour ou le menu omakase. Cette approche 
            permet de découvrir des spécialités saisonnières et de profiter de l'expertise culinaire dans toute sa splendeur. 
            C'est souvent ainsi que naissent les plus belles surprises gustatives.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Accessibilité et services pratiques
          </h2>
          
          <p>
            Au Temple du Sushi a pensé à tous les aspects pratiques qui facilitent l'accès à l'excellence culinaire. 
            L'établissement propose des services de livraison pour déguster à domicile, des formules à emporter pour 
            les déjeuners d'affaires, et s'adapte aux régimes alimentaires spécifiques avec des options végétariennes 
            et sans gluten soigneusement élaborées.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Un engagement durable et responsable
          </h2>
          
          <p>
            Au-delà de l'excellence culinaire, Au Temple du Sushi s'engage dans une démarche responsable, privilégiant 
            les circuits courts, le respect de la saisonnalité et la lutte contre le gaspillage alimentaire. Cette conscience 
            environnementale s'inscrit parfaitement dans la philosophie japonaise du respect de la nature et des cycles naturels.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Questions fréquemment posées
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <h3 className="text-xl font-semibold mb-4">Quels critères définissent le meilleur restaurant japonais ?</h3>
            <p className="mb-6">
              Un excellent restaurant japonais se distingue par la fraîcheur des produits, l'authenticité des recettes, 
              la maîtrise technique des chefs, l'ambiance et le service. Au Temple du Sushi excelle dans tous ces domaines.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Au Temple du Sushi est-il vraiment le meilleur à Bouc-Bel-Air ?</h3>
            <p className="mb-6">
              Au Temple du Sushi s'est imposé comme une référence grâce à son approche authentique, ses produits premium 
              et son service d'exception, ce qui en fait le choix privilégié des connaisseurs.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Faut-il réserver à l'avance ?</h3>
            <p className="mb-6">
              Il est recommandé de réserver, surtout en soirée et le week-end, car les meilleurs restaurants japonais 
              comme Au Temple du Sushi sont très demandés.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Quelles sont les spécialités à ne pas manquer ?</h3>
            <p>
              Ne manquez pas les sushis omakase, les sashimis de saison, les makis signature et les plats chauds 
              traditionnels comme les tempuras et ramens.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-6 my-8">
            <h3 className="text-xl font-semibold text-green-900 mb-4">
              Découvrez l'excellence japonaise à Bouc-Bel-Air
            </h3>
            <p className="text-green-800">
              Au Temple du Sushi vous attend pour une expérience culinaire d'exception qui justifie sa réputation 
              de meilleur restaurant japonais de la région. Réservez dès maintenant votre table et découvrez pourquoi 
              tant de connaisseurs font le choix de l'authenticité et de la qualité. Votre voyage gustatif au cœur 
              du Japon commence ici.
            </p>
          </div>

          {/* Google Maps */}
          <div className="my-12">
            <GoogleMapsEmbed />
          </div>

          {/* Articles recommandés */}
          <div className="my-12">
            <RelatedArticles />
          </div>
        </div>
      </article>
    </div>
  )
}