export const DELIVERY_ZONES = [
  { slug: "bouc-bel-air", label: "Bouc-Bel-Air", minOrder: 20, inZone: true },
  { slug: "cabries", label: "Cabriès", minOrder: 25, inZone: true },
  { slug: "calas", label: "Calas", minOrder: 25, inZone: true },
  { slug: "simiane", label: "Simiane-Collongue", minOrder: 25, inZone: true },
  { slug: "gardanne", label: "Gardanne", minOrder: 50, inZone: true },
  { slug: "biver", label: "Biver", minOrder: 50, inZone: true },
] as const;

export const RESTAURANT_CONFIG = {
  serviceDaysPerWeek: 6, // Service 6j/7 (fermé le lundi)
} as const;

// Type helper pour TypeScript
export type DeliveryZone = typeof DELIVERY_ZONES[number];