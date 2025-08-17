import type { Metadata } from 'next'
import GoogleMapsEmbed from '@/components/google-maps-embed'

export const metadata: Metadata = {
  title: 'Sushis frais et savoureux près d\'Aix-en-Provence | Au Temple du Sushi',
  description: 'Découvrez où déguster les meilleurs sushis frais près d\'Aix-en-Provence. Poisson ultra-frais, préparations authentiques et saveurs exceptionnelles.',
  keywords: 'sushis frais Aix-en-Provence, poisson frais sushi, restaurant sushi fraîcheur, Au Temple du Sushi qualité',
  openGraph: {
    title: 'Sushis frais et savoureux près d\'Aix-en-Provence',
    description: 'Les meilleures adresses pour des sushis d\'une fraîcheur exceptionnelle près d\'Aix-en-Provence',
    type: 'article',
    publishedTime: '2024-12-15',
    authors: ['Au Temple du Sushi'],
    images: [
      {
        url: '/creation5.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sushis ultra-frais près Aix-en-Provence',
      },
    ],
  },
}

export default function SushisFraisPresAix() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sushis frais et savoureux près d'Aix-en-Provence
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <time dateTime="2024-12-15">15 décembre 2024</time>
          <span className="mx-2">•</span>
          <span>8 min de lecture</span>
        </div>
        <img 
          src="/creation5.jpeg" 
          alt="Sushis ultra-frais préparés avec poisson de qualité premium"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          La fraîcheur constitue l'essence même d'un sushi d'exception. Près d'Aix-en-Provence, cette quête de la 
          perfection trouve ses lettres de noblesse dans des établissements qui ont fait de la qualité absolue 
          leur signature. Découvrez les secrets d'une fraîcheur incomparable et les adresses qui subliment 
          l'art ancestral du sushi.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          L'art de la fraîcheur : pilier de l'excellence sushi
        </h2>
        
        <p>
          Un sushi frais transcende la simple restauration pour devenir une expérience sensorielle unique. 
          La fraîcheur du poisson, la texture parfaite du riz et l'harmonie des saveurs créent cette alchimie 
          qui distingue un sushi ordinaire d'une création d'exception.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Au Temple du Sushi : la fraîcheur absolue près d'Aix-en-Provence
        </h3>
        
        <img 
          src="/creation1.jpg" 
          alt="Sélection quotidienne de poisson frais Au Temple du Sushi"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          <strong>Au Temple du Sushi</strong> a érigé la fraîcheur en art de vivre. Chaque matin, les chefs 
          sélectionnent personnellement les meilleurs produits, privilégiant les circuits courts et les 
          fournisseurs de confiance. Cette exigence quotidienne garantit une qualité constante qui fidélise 
          les palais les plus exigeants.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Les secrets d'une fraîcheur exceptionnelle
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          La sélection rigoureuse des produits
        </h3>
        
        <p>
          La fraîcheur commence dès la sélection. Un poisson destiné aux sushis doit répondre à des critères 
          stricts : chair ferme, couleur naturelle éclatante, absence totale d'odeur désagréable. 
          Cette expertise, maîtrisée par les professionnels d'Au Temple du Sushi, fait toute la différence.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          La chaîne du froid maîtrisée
        </h3>
        
        <img 
          src="/creation2.jpg" 
          alt="Conservation optimale des produits sushi frais"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          De la livraison à l'assiette, maintenir la chaîne du froid demeure crucial. Les meilleurs établissements 
          investissent dans des équipements de pointe et forment leur personnel aux bonnes pratiques de conservation. 
          Cette rigueur technique préserve les qualités organoleptiques et garantit une sécurité alimentaire optimale.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Reconnaître la fraîcheur : guide du connaisseur
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Les indices visuels de qualité
        </h3>
        
        <ul className="list-disc pl-8 my-6">
          <li><strong>Couleur vive et naturelle :</strong> Le poisson frais présente des couleurs éclatantes</li>
          <li><strong>Chair ferme :</strong> Une texture élastique qui reprend sa forme au toucher</li>
          <li><strong>Brillance naturelle :</strong> La surface doit avoir un aspect nacré, non terne</li>
          <li><strong>Absence d'écoulement :</strong> Pas de liquide suspect autour du produit</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          L'importance du timing de préparation
        </h3>
        
        <p>
          Un sushi frais se déguste idéalement dans les minutes suivant sa préparation. Cette contrainte 
          temporelle explique pourquoi les meilleurs restaurants préparent chaque commande individuellement, 
          refusant les préparations à l'avance qui compromettraient la qualité.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          La saisonnalité : respecter les cycles naturels
        </h2>
        
        <img 
          src="/creation3.jpeg" 
          alt="Poissons de saison sélection sushi fraîcheur"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          La fraîcheur s'accompagne naturellement du respect de la saisonnalité. Chaque saison apporte 
          ses spécialités : poissons gras en hiver, variétés printanières délicates, richesses estivales. 
          Au Temple du Sushi adapte sa carte selon ces cycles naturels, garantissant une fraîcheur et 
          des saveurs optimales.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          L'expérience de dégustation optimale
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          L'ordre de dégustation idéal
        </h3>
        
        <p>
          Pour apprécier pleinement la fraîcheur, respectez un ordre de dégustation progressif : commencez 
          par les poissons blancs aux saveurs subtiles, progressez vers les poissons plus gras, terminez 
          par les préparations les plus intenses. Cette progression révèle toutes les nuances gustatives.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Questions fréquemment posées
        </h2>
        
        <div className="bg-gray-50 p-6 rounded-lg my-8">
          <h3 className="text-xl font-semibold mb-4">Comment reconnaître des sushis vraiment frais ?</h3>
          <p className="mb-6">
            Des sushis frais se reconnaissent à la couleur vive du poisson, la texture ferme et élastique, 
            l'absence d'odeur, et la température idéale de service.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Combien de temps peut-on conserver des sushis frais ?</h3>
          <p className="mb-6">
            Les sushis se consomment idéalement immédiatement après préparation. En cas de conservation, 
            maximum 2-3 heures au réfrigérateur, mais la qualité diminue rapidement.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Où trouver les sushis les plus frais près d'Aix-en-Provence ?</h3>
          <p>
            Au Temple du Sushi se distingue par sa sélection quotidienne de produits frais et sa 
            préparation à la commande, garantissant une fraîcheur optimale.
          </p>
        </div>

        <div className="bg-temple-pink/5 border-l-4 border-temple-pink p-6 my-8">
          <h3 className="text-xl font-semibold text-black mb-4">
            Découvrez la fraîcheur absolue
          </h3>
          <p className="text-black">
            Au Temple du Sushi vous invite à redécouvrir l'art du sushi frais. Nos sélections quotidiennes 
            et notre préparation minute garantissent une expérience gustative d'exception. 
            Réservez maintenant et savourez la différence !
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