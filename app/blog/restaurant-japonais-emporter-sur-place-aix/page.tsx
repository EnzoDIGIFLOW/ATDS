import type { Metadata } from 'next'
import GoogleMapsEmbed from '@/components/google-maps-embed'

export const metadata: Metadata = {
  title: 'Restaurant japonais à emporter ou sur place proche d\'Aix | Au Temple du Sushi',
  description: 'Restaurant japonais flexible proche d\'Aix-en-Provence : service sur place, vente à emporter et livraison. Sushis frais, service adapté à vos besoins.',
  keywords: 'restaurant japonais emporter Aix-en-Provence, sushi livraison, sur place à emporter, Au Temple du Sushi services',
}

export default function RestaurantJaponaisEmporterSurPlaceAix() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Restaurant japonais à emporter ou sur place proche d'Aix
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <time dateTime="2024-12-15">15 décembre 2024</time>
          <span className="mx-2">•</span>
          <span>7 min de lecture</span>
        </div>
        <img 
          src="/creation6.jpeg" 
          alt="Restaurant japonais flexible emporter sur place Aix-en-Provence"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          Proche d'Aix-en-Provence, Au Temple du Sushi s'adapte à tous vos modes de consommation. 
          Que vous préfériez savourer nos spécialités dans notre cadre authentique ou les déguster 
          chez vous, nous garantissons la même excellence culinaire et le même service attentionné.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Flexibilité et qualité : notre engagement
        </h2>
        
        <img 
          src="/creation1.jpg" 
          alt="Service flexible Au Temple du Sushi sur place emporter"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          <strong>Au Temple du Sushi</strong> comprend que chaque client a des besoins spécifiques. 
          C'est pourquoi nous avons développé une offre complète qui s'adapte à toutes les situations : 
          repas d'affaires sur place, dîner romantique à domicile, ou pause déjeuner à emporter.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Service sur place : l'expérience complète
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Ambiance authentique japonaise
        </h3>
        
        <p>
          Notre salle de restaurant offre une atmosphère zen et authentique, parfaite pour savourer 
          nos créations dans les meilleures conditions. Décoration épurée, éclairage tamisé et 
          musique d'ambiance créent l'environnement idéal pour une expérience culinaire mémorable.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Vente à emporter : qualité nomade
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Emballages spécialisés pour préserver la fraîcheur
        </h3>
        
        <img 
          src="/creation2.jpg" 
          alt="Emballage spécialisé sushi à emporter qualité préservée"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          Nos emballages sont spécialement conçus pour maintenir la température idéale et préserver 
          la fraîcheur de nos sushis. Cette attention aux détails garantit une expérience gustative 
          optimale, même en dehors de notre restaurant.
        </p>

        <div className="bg-green-50 p-6 rounded-lg my-8">
          <h3 className="text-lg font-semibold text-green-900 mb-3">Avantages de notre service à emporter :</h3>
          <ul className="text-green-800 space-y-2">
            <li>• Commande par téléphone ou en ligne</li>
            <li>• Préparation rapide : 15-20 minutes</li>
            <li>• Emballages éco-responsables</li>
            <li>• Conditionnement réfrigérant inclus</li>
            <li>• Sauces et accompagnements fournis</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Service de livraison : le Japon à domicile
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Zone de livraison étendue
        </h3>
        
        <p>
          Notre service de livraison couvre Aix-en-Provence et ses environs, avec des créneaux 
          étendus pour s'adapter à vos horaires. Nous utilisons des véhicules équipés de systèmes 
          de réfrigération pour garantir une livraison dans les meilleures conditions.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Menus adaptés à chaque service
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Plateaux et bento pour l'emporter
        </h3>
        
        <img 
          src="/creation3.jpeg" 
          alt="Plateaux bento spécialisés vente à emporter"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          Nos plateaux et bento sont spécialement conçus pour la vente à emporter. Ces formats 
          pratiques conservent la présentation soignée de nos spécialités tout en facilitant 
          la dégustation nomade. Chaque plateau offre une sélection équilibrée et variée.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Commandes groupées et événements
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Service traiteur pour vos événements
        </h3>
        
        <p>
          Au Temple du Sushi propose également un service traiteur pour vos réceptions, 
          réunions d'entreprise ou événements familiaux. Nos plateaux de prestige et 
          nos assortiments personnalisés s'adaptent à tous vos besoins.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Informations pratiques
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-temple-pink/5 p-6 rounded-lg">
            <h4 className="font-semibold text-black mb-3">🏪 Sur place</h4>
            <p className="text-black">Ouvert 7j/7, réservation recommandée</p>
            <p className="text-black">Ambiance authentique japonaise</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-3">📦 À emporter</h4>
            <p className="text-orange-800">Commande 15min à l'avance</p>
            <p className="text-orange-800">Emballages réfrigérants fournis</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Engagement qualité tous services
        </h2>
        
        <p>
          Quel que soit le service choisi, Au Temple du Sushi maintient les mêmes standards 
          d'excellence. Nos produits sont sélectionnés avec le même soin, nos préparations 
          suivent les mêmes protocoles rigoureux, et notre attention aux détails reste constante.
        </p>

        <div className="bg-temple-pink/5 border-l-4 border-temple-pink p-6 my-8">
          <h3 className="text-xl font-semibold text-black mb-4">
            Votre restaurant japonais s'adapte à vous
          </h3>
          <p className="text-black">
            Au Temple du Sushi près d'Aix-en-Provence vous offre la flexibilité que vous méritez. 
            Sur place, à emporter ou en livraison : la même excellence, adaptée à votre mode de vie. 
            Contactez-nous pour découvrir toutes nos formules.
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