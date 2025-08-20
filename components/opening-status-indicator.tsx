'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { isCurrentlyOpen, getNextOpeningTime } from '@/config/hours';

interface OpeningStatusIndicatorProps {
  variant?: 'floating' | 'banner' | 'minimal';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center';
  className?: string;
}

export default function OpeningStatusIndicator({ 
  variant = 'floating',
  position = 'bottom-right',
  className = '' 
}: OpeningStatusIndicatorProps) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [nextOpening, setNextOpening] = useState<{ day: string; time: string } | null>(null);
  const [isReliable, setIsReliable] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      try {
        // Vérifier que nous sommes côté client
        if (typeof window === 'undefined') {
          setIsReliable(false);
          return;
        }

        // Vérifier que la date système semble correcte
        const now = new Date();
        const year = now.getFullYear();
        if (year < 2024 || year > 2030) {
          // Date système probablement incorrecte
          setIsReliable(false);
          return;
        }

        // Tout semble OK, on peut faire confiance aux données
        const openStatus = isCurrentlyOpen();
        setIsOpen(openStatus);
        
        if (!openStatus) {
          const next = getNextOpeningTime();
          setNextOpening(next);
        }
        
        setIsReliable(true);
      } catch (error) {
        // En cas d'erreur, on n'affiche rien
        console.error('Error checking opening status:', error);
        setIsReliable(false);
      }
    };

    checkStatus();
    // Vérifier toutes les 30 secondes
    const interval = setInterval(checkStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  // Ne rien afficher si les données ne sont pas fiables
  if (!isReliable || isOpen === null) {
    return null;
  }

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2'
  };

  if (variant === 'minimal') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={`fixed ${positionClasses[position]} z-50 ${className}`}
        >
          <div className={`
            w-3 h-3 rounded-full shadow-lg
            ${isOpen ? 'bg-green-500' : 'bg-red-500'}
            animate-pulse
          `} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (variant === 'banner') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className={`fixed top-0 left-0 right-0 z-50 ${className}`}
        >
          <div className={`
            py-2 px-4 text-center text-sm font-medium
            ${isOpen 
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
              : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
            }
          `}>
            <div className="flex items-center justify-center gap-2">
              {isOpen ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nous sommes actuellement ouverts</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Nous sommes actuellement fermés</span>
                  {nextOpening && (
                    <span className="ml-2 opacity-90">
                      • Réouverture {nextOpening.day} à {nextOpening.time}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Variant floating (par défaut)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className={`fixed ${positionClasses[position]} z-50 ${className}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <motion.div
          animate={{ 
            width: isExpanded ? 'auto' : 'auto'
          }}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl backdrop-blur-sm
            cursor-pointer select-none
            ${isOpen 
              ? 'bg-green-500/95 text-white border-2 border-green-400/50' 
              : 'bg-red-500/95 text-white border-2 border-red-400/50'
            }
          `}
        >
          {/* Icône animée */}
          <motion.div
            animate={{ 
              rotate: isOpen ? 0 : 180,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 0.5 },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            {isOpen ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
          </motion.div>

          {/* Texte */}
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {isOpen ? 'OUVERT' : 'FERMÉ'}
            </span>
            
            {/* Info supplémentaire au survol */}
            <AnimatePresence>
              {isExpanded && !isOpen && nextOpening && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs opacity-90"
                >
                  Ouvre {nextOpening.day} à {nextOpening.time}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Point lumineux animé */}
          <motion.div
            className={`
              absolute -top-1 -right-1 w-3 h-3 rounded-full
              ${isOpen ? 'bg-green-300' : 'bg-red-300'}
            `}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Effet de halo */}
        <motion.div
          className={`
            absolute inset-0 rounded-full -z-10
            ${isOpen ? 'bg-green-500' : 'bg-red-500'}
          `}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}