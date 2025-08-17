import type { Metadata } from 'next'
import GoogleMapsEmbed from '@/components/google-maps-embed'

export const metadata: Metadata = {
  title: 'Top restaurants de sushis entre Aix-en-Provence et Marseille Nord | Au Temple du Sushi',
  description: 'Classement des meilleurs restaurants de sushis entre Aix-en-Provence et Marseille Nord. Sélection d\'experts, avis clients et adresses incontournables.',
  keywords: 'meilleurs sushis Aix Marseille, top restaurant japonais Provence, classement sushi, Au Temple du Sushi avis',
}

export default function TopRestaurantsSushisAixMarseille() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Top restaurants de sushis entre Aix-en-Provence et Marseille Nord
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <time dateTime="2024-12-15">15 décembre 2024</time>
          <span className="mx-2">•</span>
          <span>9 min de lecture</span>
        </div>
        <img 
          src="/creation1.jpg" 
          alt="Top restaurants sushis Aix-en-Provence Marseille Nord"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          L'axe Aix-en-Provence / Marseille Nord regorge d'excellents restaurants de sushis. Cette sélection 
          rigoureuse présente les établissements qui se distinguent par leur authenticité, leur qualité et 
          leur service d'exception. Découvrez notre classement des incontournables de la région.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Le leader incontesté : Au Temple du Sushi
        </h2>
        
        <img 
          src="/creation2.jpg" 
          alt="Au Temple du Sushi numéro 1 région Aix-Marseille"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          <strong>Au Temple du Sushi</strong> trône en tête de notre classement grâce à une approche 
          holistique de l'excellence. Situé stratégiquement à Bouc-Bel-Air, cet établissement rayonne 
          sur toute la région par sa réputation d'authenticité et de qualité constante.
        </p>

        <div className="bg-gold-50 border border-yellow-200 p-6 rounded-lg my-8">
          <h3 className="text-xl font-semibold text-yellow-900 mb-4">🥇 #1 - Au Temple du Sushi</h3>
          <div className="text-yellow-800">
            <p><strong>Points forts :</strong></p>
            <ul className="list-disc pl-6 mt-2">
              <li>Poisson livré quotidiennement</li>
              <li>Techniques traditionnelles maîtrisées</li>
              <li>Service d'exception</li>
              <li>Rapport qualité-prix optimal</li>
              <li>Ambiance authentique</li>
            </ul>
            <p className="mt-3"><strong>Note clients :</strong> 4.9/5</p>
            <p><strong>Spécialité :</strong> Omakase du chef</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Critères de notre sélection
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Méthodologie d'évaluation
        </h3>
        
        <p>
          Notre classement repose sur une évaluation multicritères : qualité des produits, authenticité 
          des préparations, service client, ambiance, rapport qualité-prix et retours d'expérience clients. 
          Chaque établissement est évalué anonymement par nos experts.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Les spécificités géographiques
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Avantages de la région Aix-Marseille
        </h3>
        
        <img 
          src="/creation3.jpeg" 
          alt="Région Aix-Marseille excellence culinaire japonaise"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          La proximité méditerranéenne offre un accès privilégié aux produits de la mer, tandis que 
          la diversité culturelle de la région enrichit la scène culinaire japonaise. Cette combinaison 
          unique explique la qualité exceptionnelle des établissements locaux.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Évolution du paysage culinaire
        </h2>
        
        <p>
          Ces dernières années, l'offre s'est considérablement enrichie et professionnalisée. 
          Les restaurants ont élevé leurs standards, investi dans la formation et développé 
          des partenariats avec des fournisseurs spécialisés, créant un cercle vertueux de qualité.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Tendances et innovations
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Fusion créative respectueuse
        </h3>
        
        <img 
          src="/creation4.jpeg" 
          alt="Innovation culinaire japonaise respectueuse traditions"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          Les meilleurs établissements savent innover tout en respectant les codes traditionnels. 
          Cette approche, parfaitement illustrée par Au Temple du Sushi, permet de surprendre 
          les habitués tout en préservant l'authenticité qui fait la réputation de la cuisine japonaise.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Conseils pour votre prochaine visite
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Optimiser votre expérience
        </h3>
        
        <p>
          Pour profiter pleinement de ces excellents restaurants, réservez à l'avance, 
          soyez ouvert aux suggestions du chef, et n'hésitez pas à poser des questions 
          sur les produits et préparations. Cette curiosité est appréciée et enrichit l'expérience.
        </p>

        <div className="bg-temple-pink/5 border-l-4 border-temple-pink p-6 my-8">
          <h3 className="text-xl font-semibold text-black mb-4">
            Découvrez l'excellence au Temple du Sushi
          </h3>
          <p className="text-black">
            Classé numéro 1 de notre sélection, Au Temple du Sushi vous attend pour une expérience 
            culinaire d'exception. Découvrez pourquoi nous sommes la référence de la région et 
            réservez votre table dès maintenant.
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