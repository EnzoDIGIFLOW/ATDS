import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://autempledusushi.fr'
  
  // Pages principales
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ]
  
  // Pages de blog
  const blogPages = [
    'top-restaurants-sushis-aix-marseille',
    'sushis-qualite-aix-provence-bouc-bel-air',
    'sushis-frais-pres-aix-provence',
    'restaurant-japonais-rapport-qualite-prix-aix',
    'restaurant-japonais-ouvert-midi-bouc-bel-air',
    'restaurant-japonais-midi-bouc-bel-air',
    'restaurant-japonais-emporter-sur-place-aix',
    'ou-manger-japonais-bouc-bel-air-plan-campagne',
    'meilleur-restaurant-sushis-bouc-bel-air',
    'meilleur-restaurant-japonais-bouc-bel-air',
  ].map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  return [...mainPages, ...blogPages]
}