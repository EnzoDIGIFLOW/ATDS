import type { Metadata } from 'next'
import GoogleMapsEmbed from '@/components/google-maps-embed'

export const metadata: Metadata = {
  title: 'Le meilleur restaurant de sushis à Bouc-Bel-Air | Au Temple du Sushi',
  description: 'Découvrez pourquoi Au Temple du Sushi est reconnu comme le meilleur restaurant de sushis à Bouc-Bel-Air. Excellence, authenticité et service d\'exception.',
  keywords: 'meilleur sushi Bouc-Bel-Air, restaurant japonais numéro 1, Au Temple du Sushi excellence, meilleur poisson frais',
}

export default function MeilleurRestaurantSushisBoucBelAir() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Le meilleur restaurant de sushis à Bouc-Bel-Air
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <time dateTime="2024-12-15">15 décembre 2024</time>
          <span className="mx-2">•</span>
          <span>8 min de lecture</span>
        </div>
        <img 
          src="/creation1.jpg" 
          alt="Au Temple du Sushi meilleur restaurant Bouc-Bel-Air"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          Quand il s'agit de désigner le meilleur restaurant de sushis à Bouc-Bel-Air, Au Temple du Sushi 
          fait l'unanimité auprès des connaisseurs. Cette reconnaissance ne relève pas du hasard mais 
          d'un engagement constant vers l'excellence, l'authenticité et l'innovation respectueuse des traditions.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Au Temple du Sushi : l'excellence reconnue
        </h2>
        
        <img 
          src="/creation2.jpg" 
          alt="Excellence culinaire Au Temple du Sushi Bouc-Bel-Air"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          <strong>Au Temple du Sushi</strong> s'est imposé comme LA référence incontournable de Bouc-Bel-Air 
          grâce à une approche holistique de l'excellence. Chaque aspect de l'expérience client est 
          pensé et optimisé : de la sélection des produits au service en salle, en passant par 
          l'ambiance et la présentation des plats.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Les piliers de notre excellence
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-temple-pink/5 p-6 rounded-lg">
            <h4 className="font-semibold text-black mb-3">🐟 Produits Premium</h4>
            <p className="text-black">Sélection quotidienne des meilleurs poissons, traçabilité garantie</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-3">👨‍🍳 Expertise Technique</h4>
            <p className="text-green-800">Maîtrise parfaite des techniques traditionnelles japonaises</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-3">🎋 Authenticité</h4>
            <p className="text-purple-800">Respect scrupuleux des codes et traditions culinaires</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-3">🌟 Service d'Exception</h4>
            <p className="text-yellow-800">Accueil personnalisé et attention aux détails</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Ce qui nous distingue de la concurrence
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Une approche artisanale unique
        </h3>
        
        <p>
          Contrairement aux chaînes standardisées, Au Temple du Sushi privilégie l'approche artisanale. 
          Chaque sushi est façonné individuellement, chaque plat bénéficie d'une attention particulière. 
          Cette démarche artisanale garantit une qualité constante et des saveurs préservées.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Innovation respectueuse
        </h3>
        
        <img 
          src="/creation3.jpeg" 
          alt="Créations innovantes respectueuses traditions japonaises"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          Notre carte évolue régulièrement avec des créations saisonnières qui respectent l'esprit 
          japonais tout en surprenant nos clients. Cette capacité à innover sans trahir l'authenticité 
          constitue l'un de nos atouts majeurs et fidélise notre clientèle exigeante.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Témoignages et reconnaissance
        </h2>
        
        <blockquote className="border-l-4 border-temple-pink pl-6 py-4 my-8 bg-gray-50 italic text-gray-700">
          "Après avoir goûté les sushis d'Au Temple du Sushi, impossible de retourner ailleurs. 
          La fraîcheur est incomparable, le service irréprochable. C'est notre adresse de référence 
          depuis trois ans maintenant."
          <footer className="text-sm text-gray-600 mt-2">- Sophie M., cliente fidèle</footer>
        </blockquote>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Notre engagement qualité
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Traçabilité et fraîcheur garanties
        </h3>
        
        <p>
          Nous sélectionnons personnellement nos fournisseurs et connaissons l'origine de chaque produit. 
          Cette traçabilité complète nous permet de garantir une fraîcheur optimale et une qualité 
          constante, jour après jour, saison après saison.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Formation continue de nos équipes
        </h3>
        
        <img 
          src="/creation4.jpeg" 
          alt="Formation équipe Au Temple du Sushi excellence service"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          Nos équipes suivent régulièrement des formations pour perfectionner leurs techniques 
          et maintenir le niveau d'excellence attendu. Cette démarche d'amélioration continue 
          garantit un service irréprochable et des prestations toujours au top.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          L'expérience Au Temple du Sushi
        </h2>
        
        <p>
          Dès votre arrivée, vous découvrez une ambiance authentique qui vous transporte au Japon. 
          Notre décoration épurée, notre éclairage tamisé et notre musique d'ambiance créent l'atmosphère 
          idéale pour savourer nos créations dans les meilleures conditions.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Nos spécialités incontournables
        </h2>
        
        <div className="bg-red-50 p-6 rounded-lg my-8">
          <h3 className="text-lg font-semibold text-red-900 mb-3">À ne pas manquer :</h3>
          <ul className="text-red-800 space-y-2">
            <li>• Omakase du chef (menu dégustation surprise)</li>
            <li>• Sashimi de thon rouge de Méditerranée</li>
            <li>• Maki signature aux saveurs provençales</li>
            <li>• Tempura de légumes de saison</li>
            <li>• Chirashi bowl premium</li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-6 my-8">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            Découvrez pourquoi nous sommes les meilleurs
          </h3>
          <p className="text-green-800">
            Au Temple du Sushi vous invite à vivre l'expérience qui nous a valu notre réputation 
            d'excellence à Bouc-Bel-Air. Réservez votre table et découvrez par vous-même ce qui 
            fait de nous la référence incontournable de la gastronomie japonaise dans la région.
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