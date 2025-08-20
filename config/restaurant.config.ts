// Configuration centralisée pour le restaurant
export const restaurantConfig = {
  // Informations de contact
  contact: {
    phone: '+33661387545',
    phoneDisplay: '06 61 38 75 45',
    email: 'contact@autempledusushi.fr'
  },
  
  // Horaires d'ouverture (6j/7)
  openingHours: {
    days: 'Mardi - Dimanche', // Fermé le lundi
    lunch: '11h30 - 14h00',
    dinner: '18h00 - 22h00',
    closedDay: 'Lundi',
    serviceNote: 'Dimanche soir uniquement',
    schedule: {
      lundi: 'Fermé',
      mardi: '11h30-14h00, 18h00-22h00',
      mercredi: '11h30-14h00, 18h00-22h00',
      jeudi: '11h30-14h00, 18h00-22h00',
      vendredi: '11h30-14h00, 18h00-22h00',
      samedi: '11h30-14h00, 18h00-22h00',
      dimanche: '18h00-22h00'
    }
  },
  
  // Zones de livraison et tarifs minimum
  deliveryZones: {
    'Bouc-Bel-Air': {
      minOrder: 20,
      deliveryTime: '30-45 min',
      freeDelivery: true
    },
    'Cabriès': {
      minOrder: 25,
      deliveryTime: '35-50 min',
      freeDelivery: true
    },
    'Calas': {
      minOrder: 25,
      deliveryTime: '35-50 min',
      freeDelivery: true
    },
    'Simiane-Collongue': {
      minOrder: 25,
      deliveryTime: '40-55 min',
      freeDelivery: true
    },
    'Gardanne': {
      minOrder: 50,
      deliveryTime: '45-60 min',
      freeDelivery: false
    },
    'Biver': {
      minOrder: 50,
      deliveryTime: '45-60 min',
      freeDelivery: false
    }
  },
  
  // Avis Google
  googleReviews: {
    rating: 4.9,
    reviewCount: 312,
    url: 'https://g.page/au-temple-du-sushi-bouc-bel-air'
  },
  
  // Adresse
  address: {
    street: '2010 Avenue de la Croix d\'Or',
    city: 'Bouc-Bel-Air',
    postalCode: '13320',
    country: 'France',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4099.657450652335!2d5.395389176969172!3d43.44936186558957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c99366e46187f9%3A0x5562ae9155d32d69!2sAu%20temple%20du%20sushi!5e1!3m2!1sfr!2sfr!4v1754385007549!5m2!1sfr!2sfr'
  },
  
  // Réseaux sociaux
  social: {
    instagram: '@autempledusushi',
    instagramUrl: 'https://www.instagram.com/autempledusushi',
    facebook: 'Au Temple du Sushi',
    facebookUrl: 'https://www.facebook.com/autempledusushi'
  }
}

// Fonction helper pour formater les zones de livraison
export function getDeliveryZonesText(): string {
  const zones = Object.entries(restaurantConfig.deliveryZones)
    .map(([city, info]) => `${city}: à partir de ${info.minOrder}€`)
    .join(', ')
  return zones
}

// Fonction pour obtenir les horaires formatés
export function getFormattedHours(): string {
  const { days, lunch, dinner, closedDay } = restaurantConfig.openingHours
  return `${days}: ${lunch} et ${dinner}. Fermé le ${closedDay}`
}