import type { Metadata } from 'next'
import ExperienceSection from '@/components/experience-section'

export const metadata: Metadata = {
  title: 'Restaurant japonais bon rapport qualité-prix à Aix-en-Provence | Au Temple du Sushi',
  description: 'Découvrez les meilleurs restaurants japonais au rapport qualité-prix exceptionnel à Aix-en-Provence. Sushis de qualité, prix abordables et service premium.',
  keywords: 'restaurant japonais pas cher Aix-en-Provence, bon rapport qualité prix sushi, menu abordable japonais, Au Temple du Sushi tarifs',
  openGraph: {
    title: 'Restaurant japonais bon rapport qualité-prix à Aix-en-Provence',
    description: 'Les meilleures adresses japonaises à Aix-en-Provence pour allier qualité et prix accessible',
    type: 'article',
    publishedTime: '2024-12-15',
    authors: ['Au Temple du Sushi'],
    images: [
      {
        url: '/creation6.jpeg',
        width: 1200,
        height: 630,
        alt: 'Menu restaurant japonais rapport qualité prix Aix-en-Provence',
      },
    ],
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Restaurant japonais bon rapport qualité-prix à Aix-en-Provence",
  "description": "Guide des restaurants japonais offrant le meilleur rapport qualité-prix à Aix-en-Provence",
  "image": "/creation6.jpeg",
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
    "@id": "https://www.au-temple-du-sushi.fr/blog/restaurant-japonais-rapport-qualite-prix-aix"
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel budget prévoir pour un bon restaurant japonais à Aix-en-Provence ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour un repas de qualité, comptez entre 15-25€ le midi avec les menus, et 30-50€ le soir. Au Temple du Sushi propose d'excellentes formules déjeuner à partir de 18€."
      }
    },
    {
      "@type": "Question",
      "name": "Y a-t-il des menus déjeuner avantageux dans les restaurants japonais ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, la plupart des restaurants japonais proposent des formules déjeuner très avantageuses, souvent 30% moins chères qu'en soirée, sans compromis sur la qualité."
      }
    },
    {
      "@type": "Question",
      "name": "Comment évaluer le rapport qualité-prix d'un restaurant japonais ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Observez la fraîcheur des produits, la générosité des portions, la qualité du service et l'authenticité des préparations par rapport aux prix pratiqués."
      }
    }
  ]
}

export default function RestaurantJaponaisRapportQualitePrixAix() {
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
            Restaurant japonais bon rapport qualité-prix à Aix-en-Provence
          </h1>
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <time dateTime="2024-12-15">15 décembre 2024</time>
            <span className="mx-2">•</span>
            <span>8 min de lecture</span>
          </div>
          <img 
            src="/creation6.jpeg" 
            alt="Menu abordable restaurant japonais qualité Aix-en-Provence"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Trouver un restaurant japonais alliant excellence culinaire et prix raisonnables à Aix-en-Provence n'est plus 
            un défi impossible ! Contrairement aux idées reçues, la gastronomie nippone de qualité peut être accessible 
            à tous les budgets. Découvrez comment identifier les meilleures adresses qui privilégient l'authenticité 
            sans compromettre l'accessibilité financière.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Comprendre le rapport qualité-prix en restauration japonaise
          </h2>
          
          <p>
            Le concept de rapport qualité-prix en restauration japonaise dépasse la simple équation coût-quantité. 
            Il englobe l'authenticité des préparations, la fraîcheur des ingrédients, l'expertise culinaire et 
            l'expérience globale proposée. Un bon restaurant japonais sait optimiser ces éléments pour offrir 
            une proposition de valeur exceptionnelle.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Les facteurs qui déterminent un excellent rapport qualité-prix
          </h3>
          
          <ul className="list-disc pl-8 my-6">
            <li><strong>Fraîcheur des produits :</strong> Poisson livré quotidiennement, légumes de saison</li>
            <li><strong>Portions généreuses :</strong> Quantités satisfaisantes sans gaspillage</li>
            <li><strong>Techniques authentiques :</strong> Respect des méthodes traditionnelles</li>
            <li><strong>Service efficace :</strong> Accueil chaleureux et service rapide</li>
            <li><strong>Ambiance soignée :</strong> Cadre agréable sans superflu coûteux</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Au Temple du Sushi : l'excellence accessible à Aix-en-Provence
          </h2>
          
          <img 
            src="/creation1.jpg" 
            alt="Formule déjeuner avantageuse Au Temple du Sushi"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            <strong>Au Temple du Sushi</strong> illustre parfaitement comment l'excellence peut être accessible. 
            Situé près d'Aix-en-Provence, cet établissement a fait le pari audacieux de proposer une cuisine 
            japonaise authentique à des prix étudiés, sans jamais transiger sur la qualité.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Les formules déjeuner : un concentré de valeur
          </h3>
          
          <p>
            Les menus déjeuner d'Au Temple du Sushi représentent une opportunité exceptionnelle de découvrir 
            l'excellence japonaise à prix maîtrisé. Ces formules, élaborées avec la même exigence que les menus 
            du soir, permettent d'accéder à des spécialités premium dans un format optimisé.
          </p>

          <div className="bg-temple-pink/5 p-6 rounded-lg my-8">
            <h4 className="text-lg font-semibold text-black mb-3">Exemple de formule déjeuner :</h4>
            <ul className="text-black space-y-2">
              <li>• Assortiment de 6 sushis du chef</li>
              <li>• Salade de chou ou soupe miso</li>
              <li>• Riz ou accompagnement du jour</li>
              <li>• Thé vert offert</li>
              <li className="font-semibold">Prix : à partir de 18€</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Stratégies pour optimiser votre budget restaurant japonais
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Privilégiez les déjeuners en semaine
          </h3>
          
          <p>
            Les restaurants japonais pratiquent généralement des tarifs préférentiels le midi en semaine. 
            Cette stratégie tarifaire permet de découvrir l'excellence culinaire avec des réductions 
            pouvant atteindre 30% par rapport aux tarifs du soir, tout en bénéficiant d'un service 
            plus personnalisé.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Explorez les menus découverte
          </h3>
          
          <img 
            src="/creation2.jpg" 
            alt="Menu découverte varié restaurant japonais"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            Les menus dégustation ou "omakase" offrent souvent un rapport qualité-prix exceptionnel. 
            Ces formules permettent au chef d'exprimer son savoir-faire en proposant ses meilleures 
            créations à un tarif global attractif. C'est également l'occasion de découvrir des 
            spécialités que vous n'auriez pas osé commander individuellement.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Les alternatives économiques sans compromis
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Les plats chauds : découvertes savoureuses
          </h3>
          
          <p>
            Au-delà des sushis, la cuisine japonaise offre une multitude de plats chauds au rapport 
            qualité-prix remarquable. Ramens, donburi, curry japonais ou teriyaki constituent des 
            options rassasiantes et authentiques, souvent proposées à des tarifs très accessibles.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            La vente à emporter : qualité nomade
          </h3>
          
          <img 
            src="/creation3.jpeg" 
            alt="Bento à emporter restaurant japonais qualité prix"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            La formule à emporter permet souvent de bénéficier de tarifs préférentiels tout en 
            conservant la qualité des préparations. Au Temple du Sushi propose ainsi des bento 
            et plateaux sushi conçus spécifiquement pour la vente à emporter, avec un conditionnement 
            qui préserve fraîcheur et saveurs.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Décrypter les cartes et tarifs
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Comment évaluer la justesse des prix ?</h3>
          
          <p>
            Un tarif juste en restauration japonaise reflète la qualité des ingrédients, la complexité 
            de préparation et l'expertise requise. Méfiez-vous des prix anormalement bas qui cachent 
            souvent des compromis sur la fraîcheur ou l'authenticité. À l'inverse, des tarifs excessifs 
            ne garantissent pas forcément une qualité supérieure.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <h4 className="text-lg font-semibold mb-3">Grille tarifaire indicative (Aix-en-Provence) :</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold">Sushis (pièce)</h5>
                <p>Saumon/Thon : 2,50-3,50€</p>
                <p>Poissons nobles : 4-6€</p>
              </div>
              <div>
                <h5 className="font-semibold">Menus déjeuner</h5>
                <p>Entrée+Plat : 15-22€</p>
                <p>Formule complète : 18-28€</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Les avantages méconnus du rapport qualité-prix
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Fidélité récompensée
          </h3>
          
          <p>
            De nombreux restaurants japonais, à l'image d'Au Temple du Sushi, développent des programmes 
            de fidélité récompensant leurs clients réguliers. Ces initiatives peuvent prendre la forme 
            de réductions progressives, de plats offerts ou d'invitations à des dégustations spéciales.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Événements et promotions saisonnières
          </h3>
          
          <img 
            src="/creation4.jpeg" 
            alt="Événement spécial restaurant japonais prix attractifs"
            className="w-full h-48 object-cover rounded-lg shadow-md my-6"
          />
          
          <p>
            Suivre les actualités de vos restaurants favoris permet de profiter d'événements spéciaux, 
            de menus thématiques ou de promotions ponctuelles qui enrichissent l'expérience tout en 
            optimisant le budget. Ces occasions sont souvent l'opportunité de découvrir des spécialités 
            rares à des conditions privilégiées.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Conseils pratiques pour une expérience optimale
          </h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Planifier ses sorties restaurant
          </h3>
          
          <p>
            Une planification intelligente permet de maximiser le plaisir tout en respectant son budget. 
            Alterner entre découvertes d'établissements et retours dans vos adresses favorites, 
            profiter des créneaux avantageux et rester ouvert aux suggestions du chef constituent 
            autant de stratégies gagnantes.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Questions fréquemment posées
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <h3 className="text-xl font-semibold mb-4">Quel budget prévoir pour un bon restaurant japonais à Aix-en-Provence ?</h3>
            <p className="mb-6">
              Pour un repas de qualité, comptez entre 15-25€ le midi avec les menus, et 30-50€ le soir. 
              Au Temple du Sushi propose d'excellentes formules déjeuner à partir de 18€.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Y a-t-il des menus déjeuner avantageux dans les restaurants japonais ?</h3>
            <p className="mb-6">
              Oui, la plupart des restaurants japonais proposent des formules déjeuner très avantageuses, 
              souvent 30% moins chères qu'en soirée, sans compromis sur la qualité.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Comment évaluer le rapport qualité-prix d'un restaurant japonais ?</h3>
            <p>
              Observez la fraîcheur des produits, la générosité des portions, la qualité du service 
              et l'authenticité des préparations par rapport aux prix pratiqués.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-6 my-8">
            <h3 className="text-xl font-semibold text-green-900 mb-4">
              L'excellence japonaise à votre portée
            </h3>
            <p className="text-green-800">
              Au Temple du Sushi prouve quotidiennement qu'excellence et accessibilité peuvent parfaitement 
              coexister. Venez découvrir nos formules étudiées pour tous les budgets et laissez-vous convaincre 
              par notre approche du rapport qualité-prix. Votre prochaine expérience culinaire japonaise 
              authentique vous attend !
            </p>
          </div>

        </div>
      </article>
      
      {/* Section Vivez l'Expérience */}
      <ExperienceSection />
    </>
  )
}