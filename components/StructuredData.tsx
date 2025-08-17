export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Au Temple du Sushi",
    "image": "https://autempledusushi.fr/og-image.jpg",
    "url": "https://autempledusushi.fr",
    "telephone": "+33661387545",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Avenue de la République",
      "addressLocality": "Bouc-Bel-Air",
      "postalCode": "13320",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.45,
      "longitude": 5.42
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "11:30",
        "closes": "14:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "18:30",
        "closes": "22:30"
      }
    ],
    "servesCuisine": ["Japanese", "Sushi"],
    "hasMenu": "https://autempledusushi.fr/#menu",
    "acceptsReservations": "True",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "327"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}