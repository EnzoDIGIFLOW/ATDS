import type { Metadata } from 'next'
import GoogleMapsEmbed from '@/components/google-maps-embed'

export const metadata: Metadata = {
  title: 'Où manger japonais le midi à Bouc-Bel-Air ou Plan de Campagne ? | Au Temple du Sushi',
  description: 'Découvrez les meilleurs restaurants japonais ouverts le midi à Bouc-Bel-Air et Plan de Campagne. Formules déjeuner, service rapide et cuisine authentique.',
  keywords: 'restaurant japonais midi Bouc-Bel-Air, déjeuner sushi Plan de Campagne, menu midi japonais, Au Temple du Sushi horaires',
}

export default function RestaurantJaponaisMidiArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Où manger japonais le midi à Bouc-Bel-Air ou Plan de Campagne ?
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <time dateTime="2024-12-15">15 décembre 2024</time>
          <span className="mx-2">•</span>
          <span>7 min de lecture</span>
        </div>
        <img 
          src="/img4.jpg" 
          alt="Déjeuner japonais Bouc-Bel-Air Plan de Campagne"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          Vous cherchez un endroit pour déguster un délicieux repas japonais le midi à Bouc-Bel-Air ou Plan de Campagne ? 
          La pause déjeuner devient une évasion culinaire grâce aux nombreux établissements qui proposent des formules 
          adaptées aux contraintes horaires tout en préservant l'authenticité japonaise.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Au Temple du Sushi : l'excellence accessible le midi
        </h2>
        
        <p>
          <strong>Au Temple du Sushi</strong> propose des formules déjeuner qui allient rapidité et qualité. 
          Nos menus midi permettent de savourer l'excellence japonaise dans un timing adapté à votre pause déjeuner, 
          sans compromis sur la fraîcheur et l'authenticité.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Formules déjeuner optimisées
        </h3>
        
        <img 
          src="/creation6.jpeg" 
          alt="Menu déjeuner restaurant japonais formule midi"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <div className="bg-green-50 p-6 rounded-lg my-8">
          <h4 className="text-lg font-semibold text-green-900 mb-3">Nos formules midi :</h4>
          <ul className="text-green-800 space-y-2">
            <li>• Menu Sushi Express : 6 sushis + soupe miso (18€)</li>
            <li>• Formule Bento : plat principal + accompagnements (16€)</li>
            <li>• Menu Découverte : assortiment varié (22€)</li>
            <li>• Service rapide : 15-20 minutes maximum</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Avantages du déjeuner japonais
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Une pause déjeuner saine et équilibrée
        </h3>
        
        <p>
          La cuisine japonaise midi offre l'équilibre nutritionnel idéal : protéines de qualité, légumes frais, 
          riz complet. Cette alimentation légère évite la sensation de lourdeur post-repas tout en apportant 
          l'énergie nécessaire pour l'après-midi.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Service adapté aux professionnels
        </h2>
        
        <p>
          Au Temple du Sushi comprend les contraintes des déjeuners d'affaires et des pauses limitées. 
          Notre service optimisé garantit un repas de qualité dans des délais respectés, avec possibilité 
          de réservation et de commandes à emporter.
        </p>

        <div className="bg-temple-pink/5 border-l-4 border-temple-pink p-6 my-8">
          <h3 className="text-xl font-semibold text-black mb-4">
            Votre pause déjeuner japonaise vous attend
          </h3>
          <p className="text-black">
            Au Temple du Sushi transforme votre pause déjeuner en moment d'évasion culinaire. 
            Réservez votre table ou commandez à emporter pour une expérience midi authentique et savoureuse.
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