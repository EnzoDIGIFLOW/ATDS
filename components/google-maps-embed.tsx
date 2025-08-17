'use client'

interface GoogleMapsEmbedProps {
  className?: string
}

export default function GoogleMapsEmbed({ className = "" }: GoogleMapsEmbedProps) {
  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-xl font-bold mb-4">Nous trouver</h3>
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.1234567890123!2d5.414123456789012!3d43.456789012345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c98b12345678%3A0x123456789abcdef!2sAu%20Temple%20du%20Sushi!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Au Temple du Sushi Location"
        />
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Au Temple du Sushi</strong><br />
          2010 Avenue de la Croix d'Or<br />
          13320 Bouc-Bel-Air<br />
          <a href="tel:+33661387545" className="text-temple-pink hover:underline">06 61 38 75 45</a>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Parking gratuit disponible • Accès handicapé
        </p>
      </div>
    </div>
  )
}