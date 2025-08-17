import type { Metadata } from 'next'
import GoogleMapsEmbed from '@/components/google-maps-embed'

export const metadata: Metadata = {
  title: 'Restaurant japonais ouvert le midi à Bouc-Bel-Air | Au Temple du Sushi',
  description: 'Trouvez un restaurant japonais ouvert le midi à Bouc-Bel-Air. Horaires, services de midi, formules déjeuner et réservations disponibles.',
  keywords: 'restaurant japonais ouvert midi Bouc-Bel-Air, horaires déjeuner sushi, service midi japonais, Au Temple du Sushi horaires',
}

export default function RestaurantJaponaisOuvertMidiBouc() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Restaurant japonais ouvert le midi à Bouc-Bel-Air
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <time dateTime="2024-12-15">15 décembre 2024</time>
          <span className="mx-2">•</span>
          <span>7 min de lecture</span>
        </div>
        <img 
          src="/img5.jpg" 
          alt="Restaurant japonais service midi Bouc-Bel-Air"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          Vous recherchez un restaurant japonais ouvert le midi à Bouc-Bel-Air ? Au Temple du Sushi 
          vous accueille tous les jours avec un service déjeuner adapté à vos contraintes horaires, 
          sans compromis sur la qualité et l'authenticité de nos préparations.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Au Temple du Sushi : votre solution midi à Bouc-Bel-Air
        </h2>
        
        <img 
          src="/creation6.jpeg" 
          alt="Service midi Au Temple du Sushi Bouc-Bel-Air"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          <strong>Au Temple du Sushi</strong> propose un service déjeuner complet du lundi au dimanche, 
          avec des horaires étendus pour s'adapter à toutes les pauses déjeuner. Notre équipe est 
          spécialement formée pour assurer un service rapide sans compromettre la qualité de nos préparations.
        </p>

        <div className="bg-green-50 p-6 rounded-lg my-8">
          <h3 className="text-lg font-semibold text-green-900 mb-3">Nos horaires déjeuner :</h3>
          <div className="text-green-800">
            <p><strong>Lundi à Vendredi :</strong> 11h30 - 14h30</p>
            <p><strong>Samedi :</strong> 11h30 - 15h00</p>
            <p><strong>Dimanche :</strong> 12h00 - 15h00</p>
            <p className="mt-3"><strong>Service rapide :</strong> Commandes servies en 15-20 minutes</p>
            <p><strong>Réservation recommandée</strong> pour les groupes</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Formules déjeuner adaptées
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Des menus pensés pour le midi
        </h3>
        
        <p>
          Nos formules déjeuner combinent rapidité et qualité. Chaque menu est équilibré, nutritif 
          et préparé avec la même exigence que nos services du soir. Cette approche garantit une 
          expérience culinaire complète même lors d'une pause déjeuner limitée.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Services complémentaires
        </h2>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Vente à emporter optimisée
        </h3>
        
        <img 
          src="/creation5.jpeg" 
          alt="Service emporter midi restaurant japonais"
          className="w-full h-48 object-cover rounded-lg shadow-md my-6"
        />
        
        <p>
          Pour les professionnels pressés, notre service à emporter est spécialement optimisé le midi. 
          Commandez par téléphone ou en ligne, et récupérez votre repas en quelques minutes. 
          Nos emballages préservent parfaitement la fraîcheur et la présentation de nos spécialités.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Avantages du déjeuner japonais
        </h2>
        
        <p>
          Un déjeuner japonais apporte légèreté et énergie pour l'après-midi. Nos préparations 
          privilégient les ingrédients sains : poisson riche en oméga-3, légumes frais, riz complet. 
          Cette alimentation équilibrée évite les coups de fatigue post-repas.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
          Réservations et informations pratiques
        </h2>
        
        <p>
          Bien que les réservations ne soient pas obligatoires le midi, elles sont recommandées 
          pour les groupes ou lors de créneaux particulièrement demandés. Notre équipe reste 
          disponible pour adapter le service à vos contraintes spécifiques.
        </p>

        <div className="bg-temple-pink/5 border-l-4 border-temple-pink p-6 my-8">
          <h3 className="text-xl font-semibold text-black mb-4">
            Votre pause déjeuner japonaise à Bouc-Bel-Air
          </h3>
          <p className="text-black">
            Au Temple du Sushi transforme votre pause déjeuner en moment d'exception. 
            Ouvert tous les jours avec un service adapté à vos horaires, nous vous accueillons 
            pour une expérience culinaire authentique au cœur de Bouc-Bel-Air.
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