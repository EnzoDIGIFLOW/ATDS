'use client'

import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  
  const phrases = [
    "🍣 Préparation de vos sushis frais...",
    "🍱 Sélection des meilleurs ingrédients...",
    "🥢 Notre chef prépare votre expérience...",
    "🎌 Bienvenue au temple du goût...",
  ]
  
  const [currentPhrase, setCurrentPhrase] = useState(0)
  
  useEffect(() => {
    // Animation de progression
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsVisible(false), 300)
          return 100
        }
        return prev + 2
      })
    }, 20)
    
    // Changement de phrase
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(prev => (prev + 1) % phrases.length)
    }, 800)
    
    // Nettoyage
    return () => {
      clearInterval(progressInterval)
      clearInterval(phraseInterval)
    }
  }, [])
  
  if (!isVisible) return null
  
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-300"
         style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? 'none' : 'auto' }}>
      
      {/* Logo animé */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-temple-pink/10 flex items-center justify-center animate-pulse">
          <div className="text-6xl animate-bounce" style={{ animationDelay: '0.1s' }}>
            🍣
          </div>
        </div>
        
        {/* Cercle de progression */}
        <svg className="absolute inset-0 w-32 h-32 -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-temple-pink transition-all duration-300 ease-out"
            strokeDasharray={`${2 * Math.PI * 60}`}
            strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Au Temple du Sushi
      </h1>
      
      {/* Phrase d'accroche animée */}
      <div className="h-8 relative overflow-hidden">
        <p className="text-lg text-gray-600 absolute w-full text-center transition-all duration-500 ease-in-out"
           style={{
             transform: `translateY(${currentPhrase * -100}%)`,
           }}>
          {phrases.map((phrase, index) => (
            <span key={index} className="block h-8 leading-8">
              {phrase}
            </span>
          ))}
        </p>
      </div>
      
      {/* Barre de progression */}
      <div className="w-64 h-1 bg-gray-200 rounded-full mt-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-temple-pink to-pink-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Pourcentage */}
      <p className="text-sm text-gray-500 mt-2">
        {progress}%
      </p>
    </div>
  )
}