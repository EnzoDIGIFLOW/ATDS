'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isCurrentlyOpen, isOpeningSoon, getNextOpeningTime } from '@/config/hours';

type Status = 'open' | 'closed' | 'opening-soon';

export default function OpeningStatusBadge() {
  const [status, setStatus] = useState<Status | null>(null);
  const [nextOpening, setNextOpening] = useState<{ day: string; time: string } | null>(null);
  const [isReliable, setIsReliable] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
          setIsReliable(false);
          return;
        }

        // Tout semble OK, déterminer le statut
        if (isCurrentlyOpen()) {
          setStatus('open');
        } else if (isOpeningSoon()) {
          setStatus('opening-soon');
        } else {
          setStatus('closed');
          const next = getNextOpeningTime();
          setNextOpening(next);
        }
        
        setIsReliable(true);
      } catch (error) {
        console.error('Error checking opening status:', error);
        setIsReliable(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Ne rien afficher si les données ne sont pas fiables
  if (!isReliable || status === null) {
    return null;
  }
  
  // Configuration des styles selon le statut
  const statusConfig = {
    'open': {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      textColor: 'text-green-700',
      dotColor: 'bg-green-500',
      text: 'Ouvert actuellement'
    },
    'closed': {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      textColor: 'text-red-700',
      dotColor: 'bg-red-500',
      text: 'Fermé actuellement'
    },
    'opening-soon': {
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-700',
      dotColor: 'bg-orange-500',
      text: 'Ouvre bientôt'
    }
  };
  
  const config = statusConfig[status];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="relative flex items-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Badge minimaliste */}
        <div className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
          border transition-all duration-300
          ${config.bgColor} ${config.borderColor} ${config.textColor}
        `}>
          {/* Point lumineux animé */}
          <motion.div
            className={`w-2 h-2 rounded-full ${config.dotColor}`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          
          {/* Texte */}
          <span className="text-xs uppercase tracking-wide">
            {config.text}
          </span>
        </div>

        {/* Tooltip au survol avec info supplémentaire */}
        <AnimatePresence>
          {showTooltip && status === 'closed' && nextOpening && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-2 left-0 z-50"
            >
              <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                Réouverture {nextOpening.day} à {nextOpening.time}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}