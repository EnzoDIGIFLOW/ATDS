import type { Metadata } from 'next'
import GoogleMapsEmbed from '@/components/google-maps-embed'

export const metadata: Metadata = {
  title: 'Où bien manger japonais à Bouc-Bel-Air ou Plan de Campagne ? | Au Temple du Sushi',
  description: 'Découvrez les meilleures adresses pour manger japonais à Bouc-Bel-Air et Plan de Campagne. Sushis frais, restaurants authentiques et conseils d\'experts.',
  keywords: 'restaurant japonais Bouc-Bel-Air, sushi Plan de Campagne, cuisine japonaise Provence, Au Temple du Sushi',
  openGraph: {
    title: 'Où bien manger japonais à Bouc-Bel-Air ou Plan de Campagne ?',
    description: 'Guide complet des meilleurs restaurants japonais à Bouc-Bel-Air et Plan de Campagne',
    type: 'article',
    publishedTime: '2024-12-15',
    authors: ['Au Temple du Sushi'],
    images: [
      {
        url: '/img1.jpg',
        width: 1200,
        height: 630,
        alt: 'Restaurant japonais Bouc-Bel-Air Plan de Campagne',
      },
    ],
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Où bien manger japonais à Bouc-Bel-Air ou Plan de Campagne ?",
  "description": "Guide complet des meilleurs restaurants japonais à Bouc-Bel-Air et Plan de Campagne avec conseils et recommandations",
  "image": "/img1.jpg",
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
    "@id": "https://www.au-temple-du-sushi.fr/blog/ou-manger-japonais-bouc-bel-air-plan-campagne"
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le meilleur restaurant japonais à Bouc-Bel-Air ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Au Temple du Sushi se distingue comme une référence incontournable pour la cuisine japonaise authentique à Bouc-Bel-Air, offrant des sushis frais et une expérience culinaire d'exception."
      }
    },
    {
      "@type": "Question",
      "name": "Y a-t-il des restaurants japonais ouverts le midi à Plan de Campagne ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, plusieurs restaurants japonais à Plan de Campagne proposent un service le midi, notamment Au Temple du Sushi qui offre des formules déjeuner adaptées."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on commander des sushis à emporter à Bouc-Bel-Air ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument ! Au Temple du Sushi propose un service de vente à emporter pour déguster leurs spécialités japonaises chez vous ou au bureau."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les plats japonais les plus populaires dans la région ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les sushis, sashimis, makis et chirashis sont très appréciés, ainsi que les plats chauds comme les ramens et les tempuras dans les restaurants de la région."
      }
    }
  ]
}

export default function OuMangerJaponaisArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Où bien manger japonais à Bouc-Bel-Air ou Plan de Campagne ?
          </h1>
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <time dateTime="2024-12-15">15 décembre 2024</time>
            <span className="mx-2">•</span>
            <span>8 min de lecture</span>
          </div>
          <img 
            src="/img1.jpg" 
            alt="Restaurant japonais authentique avec sushis frais à Bouc-Bel-Air"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Vous êtes passionné de cuisine japonaise et vous cherchez les meilleures adresses autour de Bouc-Bel-Air et Plan de Campagne ? 
            Vous êtes au bon endroit ! Cette région des Bouches-du-Rhône regorge de pépites culinaires nipponnes qui sauront satisfaire 
            votre envie d'authenticité et de fraîcheur. Découvrons ensemble les incontournables de la gastronomie japonaise dans ce secteur privilégié.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Le paysage gastronomique japonais à Bouc-Bel-Air
          </h2>
          
          <p>
            Bouc-Bel-Air, commune dynamique située entre Aix-en-Provence et Marseille, a vu fleurir ces dernières années 
            une scène culinaire japonaise particulièrement riche. Cette évolution s'explique par l'installation d'une 
            communauté japonaise locale et l'engouement croissant des Français pour cette cuisine raffinée.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Au Temple du Sushi : L'excellence au cœur de Bouc-Bel-Air
          </h3>
          
          <img 
            src="/creation1.jpg" 
            alt="Sushis artisanaux préparés avec soin au Temple du Sushi Bouc-Bel-Air"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            Parmi les adresses incontournables, <strong>Au Temple du Sushi</strong> se démarque par son approche authentique 
            de la cuisine japonaise. Situé au cœur de Bouc-Bel-Air, cet établissement propose une expérience culinaire 
            d'exception, alliant tradition et modernité. Les chefs, formés aux techniques japonaises traditionnelles, 
            sélectionnent minutieusement leurs produits pour garantir une fraîcheur optimale.
          </p>

          <p>
            Ce qui distingue Au Temple du Sushi, c'est sa philosophie : respecter les codes de la cuisine japonaise 
            tout en s'adaptant aux goûts locaux. Le poisson, livré quotidiennement, provient des meilleurs fournisseurs 
            de la région méditerranéenne, garantissant ainsi une qualité irréprochable.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Plan de Campagne : Un hub culinaire en expansion
          </h2>
          
          <p>
            Plan de Campagne, connu pour être l'un des plus grands centres commerciaux d'Europe, offre également 
            de belles surprises côté restauration japonaise. La zone commerciale attire de nombreux restaurateurs 
            soucieux de proposer une alternative de qualité à la restauration rapide traditionnelle.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Les critères d'un bon restaurant japonais
          </h3>
          
          <img 
            src="/creation2.jpg" 
            alt="Plat japonais traditionnel avec présentation soignée"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            Comment reconnaître un excellent restaurant japonais ? Plusieurs éléments sont à prendre en compte :
          </p>

          <ul className="list-disc pl-8 my-6">
            <li><strong>La fraîcheur des produits :</strong> Élément fondamental, le poisson doit être d'une fraîcheur irréprochable</li>
            <li><strong>La technique de préparation :</strong> Le riz à sushi doit être parfaitement assaisonné et à température idéale</li>
            <li><strong>La présentation :</strong> L'esthétique fait partie intégrante de la culture culinaire japonaise</li>
            <li><strong>L'authenticité :</strong> Respect des recettes et techniques traditionnelles</li>
            <li><strong>La diversité de la carte :</strong> Au-delà des sushis, un bon restaurant propose ramen, tempura, etc.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Les spécialités à ne pas manquer
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Les incontournables sushis et sashimis
          </h3>
          
          <p>
            Les sushis restent la vitrine de tout bon restaurant japonais. À Bouc-Bel-Air et Plan de Campagne, 
            vous trouverez une belle variété : du classique saumon au plus raffiné thon rouge, en passant par 
            les crevettes et les spécialités végétariennes. Les sashimis, ces lamelles de poisson cru sans riz, 
            permettent d'apprécier pleinement la qualité du produit.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Les plats chauds : une découverte gustative
          </h3>
          
          <img 
            src="/creation3.jpeg" 
            alt="Ramen traditionnel japonais avec garnitures authentiques"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            N'oubliez pas de goûter aux plats chauds ! Les ramen, ces soupes de nouilles réconfortantes, 
            gagnent en popularité. Les tempura, légumes ou crevettes enrobés d'une pâte légère et frits, 
            offrent un contraste textural délicieux. Les yakitori, brochettes de poulet grillées, 
            constituent également un excellent choix pour découvrir d'autres facettes de la cuisine japonaise.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Conseils pratiques pour votre expérience culinaire
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Quand réserver et comment choisir ?
          </h3>
          
          <p>
            Pour une expérience optimale, privilégiez les réservations en soirée, particulièrement les week-ends. 
            Les restaurants japonais de qualité, comme Au Temple du Sushi, préparent leurs spécialités tout au long 
            de la journée, mais c'est souvent le soir que l'ambiance est la plus authentique.
          </p>

          <p>
            N'hésitez pas à demander conseil au chef ou au serveur. Dans la culture japonaise, le dialogue avec 
            le client fait partie de l'expérience culinaire. C'est l'occasion de découvrir des spécialités 
            moins connues ou des associations de saveurs surprenantes.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Budget et formules disponibles
          </h3>
          
          <img 
            src="/creation4.jpeg" 
            alt="Bento traditionnel japonais avec variété de plats"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            Les restaurants japonais de la région proposent généralement des formules adaptées à tous les budgets. 
            Les menus déjeuner offrent un excellent rapport qualité-prix, tandis que les formules "omakase" 
            (menu dégustation laissé au choix du chef) permettent une découverte approfondie pour les plus aventureux.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            L'art de la dégustation japonaise
          </h2>
          
          <p>
            Déguster un repas japonais, c'est adopter une approche particulière. Prenez le temps de savourer 
            chaque bouchée, d'apprécier les textures et les subtilités d'assaisonnement. Le wasabi authentique, 
            le gingembre mariné et la sauce soja de qualité accompagnent traditionnellement les sushis.
          </p>

          <p>
            Dans l'idéal, les sushis se dégustent avec les doigts, dans l'ordre suggéré par le chef : 
            des saveurs les plus délicates aux plus intenses. Cette progression permet d'apprécier pleinement 
            chaque spécialité sans que les saveurs ne se masquent entre elles.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Questions fréquemment posées
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <h3 className="text-xl font-semibold mb-4">Quel est le meilleur restaurant japonais à Bouc-Bel-Air ?</h3>
            <p className="mb-6">
              Au Temple du Sushi se distingue comme une référence incontournable pour la cuisine japonaise authentique 
              à Bouc-Bel-Air, offrant des sushis frais et une expérience culinaire d'exception.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Y a-t-il des restaurants japonais ouverts le midi à Plan de Campagne ?</h3>
            <p className="mb-6">
              Oui, plusieurs restaurants japonais à Plan de Campagne proposent un service le midi, 
              notamment Au Temple du Sushi qui offre des formules déjeuner adaptées.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Peut-on commander des sushis à emporter à Bouc-Bel-Air ?</h3>
            <p className="mb-6">
              Absolument ! Au Temple du Sushi propose un service de vente à emporter pour déguster 
              leurs spécialités japonaises chez vous ou au bureau.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Quels sont les plats japonais les plus populaires dans la région ?</h3>
            <p>
              Les sushis, sashimis, makis et chirashis sont très appréciés, ainsi que les plats chauds 
              comme les ramens et les tempuras dans les restaurants de la région.
            </p>
          </div>

          <div className="bg-temple-pink/5 border-l-4 border-temple-pink p-6 my-8">
            <h3 className="text-xl font-semibold text-black mb-4">
              Prêt à découvrir l'excellence japonaise ?
            </h3>
            <p className="text-black">
              Ne cherchez plus ! Au Temple du Sushi vous attend à Bouc-Bel-Air pour une expérience 
              culinaire authentique et mémorable. Réservez dès maintenant votre table et laissez-vous 
              transporter par les saveurs du Japon, préparées avec passion et savoir-faire.
            </p>
          </div>

          {/* Google Maps */}
          <div className="my-12">
            <GoogleMapsEmbed />
          </div>
        </div>
      </article>
  )
}