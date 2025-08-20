import Image from 'next/image'
import { restaurantConfig } from '@/config/restaurant.config'

export function InstagramFeedWidget() {
  // Images Instagram statiques pour l'exemple - à remplacer par une vraie intégration API
  const instagramPosts = [
    '/creation1.jpg',
    '/creation2.jpg', 
    '/creation3.jpeg',
    '/creation4.jpeg',
    '/creation5.jpeg',
    '/creation6.jpeg'
  ]
  
  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold text-center mb-6">
        Suivez-nous sur Instagram
      </h3>
      <div className="text-center mb-6">
        <a 
          href={restaurantConfig.social.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-temple-pink hover:underline font-semibold"
        >
          {restaurantConfig.social.instagram}
        </a>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {instagramPosts.map((post, index) => (
          <a
            key={index}
            href={restaurantConfig.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition"
          >
            <Image
              src={post}
              alt={`Instagram post ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 16vw"
            />
          </a>
        ))}
      </div>
    </div>
  )
}