import type { Metadata } from 'next'
import GoogleMapsEmbed from '@/components/google-maps-embed'

export const metadata: Metadata = {
  title: 'Où manger des sushis de qualité à Aix-en-Provence ou Bouc-Bel-Air ? | Au Temple du Sushi',
  description: 'Guide des meilleurs sushis à Aix-en-Provence et Bouc-Bel-Air. Découvrez où trouver des sushis frais, authentiques et de qualité premium dans la région.',
  keywords: 'sushis qualité Aix-en-Provence, sushi Bouc-Bel-Air, poisson frais, restaurant japonais, Au Temple du Sushi',
  openGraph: {
    title: 'Où manger des sushis de qualité à Aix-en-Provence ou Bouc-Bel-Air ?',
    description: 'Découvrez les meilleurs endroits pour déguster des sushis de qualité exceptionnelle',
    type: 'article',
    publishedTime: '2024-12-15',
    authors: ['Au Temple du Sushi'],
    images: [
      {
        url: '/creation2.jpg',
        width: 1200,
        height: 630,
        alt: 'Sushis de qualité premium Aix-en-Provence Bouc-Bel-Air',
      },
    ],
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Où manger des sushis de qualité à Aix-en-Provence ou Bouc-Bel-Air ?",
  "description": "Guide expert pour trouver les meilleurs sushis de qualité à Aix-en-Provence et Bouc-Bel-Air",
  "image": "/creation2.jpg",
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
    "@id": "https://www.au-temple-du-sushi.fr/blog/sushis-qualite-aix-provence-bouc-bel-air"
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment reconnaître des sushis de qualité ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Des sushis de qualité se reconnaissent à la fraîcheur du poisson, la texture parfaite du riz vinaigré, la température idéale et une présentation soignée. Le poisson doit avoir une couleur vive et une chair ferme."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre sushi et sashimi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le sushi est composé de riz vinaigré surmonté de poisson ou fruits de mer, tandis que le sashimi est uniquement du poisson cru tranché finement, sans riz."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le meilleur moment pour manger des sushis ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les sushis se dégustent idéalement frais, juste après leur préparation. Au Temple du Sushi, nous préparons chaque commande à la demande pour garantir une fraîcheur optimale."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on commander des sushis en livraison à Aix-en-Provence ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, Au Temple du Sushi propose la livraison à domicile avec un conditionnement spécialement conçu pour préserver la fraîcheur et la qualité des sushis."
      }
    }
  ]
}

export default function SushisQualiteArticle() {
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
            Où manger des sushis de qualité à Aix-en-Provence ou Bouc-Bel-Air ?
          </h1>
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <time dateTime="2024-12-15">15 décembre 2024</time>
            <span className="mx-2">•</span>
            <span>9 min de lecture</span>
          </div>
          <img 
            src="/creation2.jpg" 
            alt="Sushis de qualité premium avec poisson frais à Aix-en-Provence"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            La quête de sushis de qualité supérieure à Aix-en-Provence et Bouc-Bel-Air peut sembler complexe, mais rassurez-vous : 
            la région regorge de véritables pépites culinaires. Entre tradition ancestrale et innovation moderne, découvrons ensemble 
            les critères qui définissent l'excellence et les adresses incontournables pour une expérience sushi authentique et mémorable.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Les critères d'excellence pour des sushis de qualité
          </h2>
          
          <p>
            Avant de vous révéler les meilleures adresses, il est essentiel de comprendre ce qui distingue véritablement 
            des sushis d'exception. Cette connaissance vous permettra d'apprécier pleinement votre expérience culinaire 
            et de faire des choix éclairés lors de vos futures sorties gastronomiques.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            La fraîcheur absolue : le fondement de l'excellence
          </h3>
          
          <img 
            src="/img2.jpg" 
            alt="Poisson ultra-frais sélectionné pour sushis de qualité"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            La fraîcheur du poisson constitue le pilier central de tout sushi digne de ce nom. Un poisson de qualité 
            se reconnaît à sa chair ferme, sa couleur vive et naturelle, ainsi qu'à l'absence totale d'odeur désagréable. 
            Les meilleurs établissements, comme <strong>Au Temple du Sushi</strong>, s'approvisionnent quotidiennement 
            auprès de fournisseurs sélectionnés, garantissant une traçabilité irréprochable.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            L'art du riz à sushi : technique et précision
          </h3>
          
          <p>
            Le riz à sushi, ou "shari", représente l'âme de cette spécialité japonaise. Sa préparation requiert un savoir-faire 
            particulier : le grain doit être parfaitement cuit, assaisonné avec un mélange subtil de vinaigre de riz, 
            de sucre et de sel, puis maintenu à température corporelle. Cette technique ancestrale, maîtrisée par les chefs 
            d'Au Temple du Sushi, fait toute la différence entre un sushi ordinaire et une création d'exception.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Aix-en-Provence : un terroir d'excellence pour les sushis
          </h2>
          
          <p>
            Aix-en-Provence, avec son riche patrimoine culinaire et sa proximité avec la Méditerranée, offre un cadre 
            idéal pour la cuisine japonaise haut de gamme. La ville attire des chefs passionnés qui allient respect 
            des traditions nippones et utilisation de produits locaux d'exception.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            L'influence méditerranéenne sur la cuisine japonaise locale
          </h3>
          
          <img 
            src="/creation3.jpeg" 
            alt="Fusion cuisine méditerranéenne japonaise Aix-en-Provence"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            La proximité des côtes méditerranéennes offre aux restaurants aixois un accès privilégié à des poissons 
            d'une fraîcheur remarquable. Cette situation géographique permet aux chefs de proposer des créations 
            uniques, mêlant traditions japonaises et produits du terroir provençal. Certains établissements, 
            à l'image d'Au Temple du Sushi, exploitent brillamment cette richesse locale.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Bouc-Bel-Air : l'excellence accessible
          </h2>
          
          <p>
            Bouc-Bel-Air s'est imposée comme une destination incontournable pour les amateurs de sushis de qualité. 
            Cette commune dynamique a su attirer des établissements de renom, proposant une alternative séduisante 
            aux grandes métropoles voisines.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Au Temple du Sushi : l'art culinaire japonais à Bouc-Bel-Air
          </h3>
          
          <p>
            Au cœur de Bouc-Bel-Air, <strong>Au Temple du Sushi</strong> incarne l'excellence japonaise. 
            Cet établissement se distingue par sa philosophie unique : allier authenticité traditionnelle et innovation 
            créative. Les chefs, véritables artisans de leur art, façonnent chaque sushi comme une œuvre d'art éphémère.
          </p>

          <p>
            Ce qui rend Au Temple du Sushi exceptionnel, c'est sa démarche qualité irréprochable. Chaque matin, 
            les chefs sélectionnent personnellement les meilleurs produits, privilégiant la qualité à la quantité. 
            Cette attention minutieuse se ressent dans chaque bouchée, offrant une expérience gustative d'une rare intensité.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Les différents types de sushis et leurs spécificités
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Nigiri : la pureté à l'état pur
          </h3>
          
          <img 
            src="/creation4.jpeg" 
            alt="Nigiri sushi artisanal avec poisson premium"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            Le nigiri, composé d'une boulette de riz surmontée d'une lamelle de poisson, représente l'essence même 
            du sushi. Cette apparente simplicité cache une complexité technique remarquable. La pression exercée 
            sur le riz, l'épaisseur de la tranche de poisson, l'harmonie des saveurs : tout concourt à créer 
            un équilibre parfait que seuls les maîtres sushi savent atteindre.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Maki et uramaki : l'art de l'enroulement
          </h3>
          
          <p>
            Les maki, sushis enroulés dans une feuille de nori, et les uramaki, où le riz se trouve à l'extérieur, 
            offrent des possibilités créatives infinies. Ces préparations permettent aux chefs d'exprimer leur 
            créativité tout en respectant les codes traditionnels. Au Temple du Sushi propose ainsi des créations 
            originales qui surprennent et enchantent les palais les plus exigeants.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Conseils d'expert pour choisir ses sushis
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            L'ordre de dégustation optimal
          </h3>
          
          <p>
            Pour apprécier pleinement un assortiment de sushis, l'ordre de dégustation revêt une importance capitale. 
            Commencez par les poissons blancs aux saveurs délicates, progressez vers les poissons plus gras comme 
            le saumon, et terminez par les préparations les plus intenses comme le thon rouge ou l'anguille. 
            Cette progression permet à vos papilles de savourer chaque nuance sans masquage des saveurs.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Les accompagnements traditionnels
          </h3>
          
          <img 
            src="/creation5.jpeg" 
            alt="Condiments traditionnels japonais wasabi gingembre"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            Le wasabi frais, le gingembre mariné et la sauce soja de qualité constituent le trio d'accompagnements 
            indispensables. Attention toutefois à ne pas en abuser : ces condiments doivent sublimer le goût du poisson, 
            non le masquer. Un établissement de qualité comme Au Temple du Sushi propose ces accompagnements 
            dans leur version la plus authentique.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Saisonnalité et sushis : respecter les cycles naturels
          </h2>
          
          <p>
            La cuisine japonaise accorde une importance fondamentale à la saisonnalité. Chaque saison apporte 
            ses spécialités : le thon rouge en hiver, les poissons blancs au printemps, les crustacés en été. 
            Cette philosophie "kaiseki" influence naturellement la carte des sushis, offrant une expérience 
            renouvelée tout au long de l'année.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Innovation et tradition : l'équilibre parfait
          </h2>
          
          <p>
            Les meilleurs établissements savent allier respect des traditions ancestrales et innovations créatives. 
            Cette approche permet de proposer des créations surprenantes tout en conservant l'authenticité 
            qui fait la richesse de la cuisine japonaise. Au Temple du Sushi illustre parfaitement cette philosophie, 
            proposant régulièrement des créations saisonnières qui enchantent sa clientèle fidèle.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Questions fréquemment posées
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <h3 className="text-xl font-semibold mb-4">Comment reconnaître des sushis de qualité ?</h3>
            <p className="mb-6">
              Des sushis de qualité se reconnaissent à la fraîcheur du poisson, la texture parfaite du riz vinaigré, 
              la température idéale et une présentation soignée. Le poisson doit avoir une couleur vive et une chair ferme.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Quelle est la différence entre sushi et sashimi ?</h3>
            <p className="mb-6">
              Le sushi est composé de riz vinaigré surmonté de poisson ou fruits de mer, tandis que le sashimi 
              est uniquement du poisson cru tranché finement, sans riz.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Quel est le meilleur moment pour manger des sushis ?</h3>
            <p className="mb-6">
              Les sushis se dégustent idéalement frais, juste après leur préparation. Au Temple du Sushi, 
              nous préparons chaque commande à la demande pour garantir une fraîcheur optimale.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Peut-on commander des sushis en livraison à Aix-en-Provence ?</h3>
            <p>
              Oui, Au Temple du Sushi propose la livraison à domicile avec un conditionnement spécialement 
              conçu pour préserver la fraîcheur et la qualité des sushis.
            </p>
          </div>

          <div className="bg-temple-pink/5 border-l-4 border-temple-pink p-6 my-8">
            <h3 className="text-xl font-semibold text-black mb-4">
              Découvrez l'excellence des sushis à Bouc-Bel-Air
            </h3>
            <p className="text-black">
              Au Temple du Sushi vous invite à découvrir l'art véritable du sushi dans un cadre authentique et chaleureux. 
              Nos chefs passionnés vous proposent une expérience culinaire d'exception, alliant tradition japonaise 
              et produits d'excellence. Réservez dès maintenant et laissez-vous séduire par l'authenticité de nos créations.
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