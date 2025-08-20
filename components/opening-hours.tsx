'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  OPENING_HOURS, 
  isCurrentlyOpen, 
  getNextOpeningTime, 
  formatScheduleForDisplay,
  getCurrentDaySchedule,
  getDayName
} from '@/config/hours';

interface OpeningHoursProps {
  variant?: 'default' | 'compact' | 'card';
  showStatus?: boolean;
  className?: string;
}

export default function OpeningHours({ 
  variant = 'default', 
  showStatus = true, 
  className = '' 
}: OpeningHoursProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nextOpening, setNextOpening] = useState<{ day: string; time: string } | null>(null);
  const [currentDay, setCurrentDay] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateStatus = () => {
      setIsOpen(isCurrentlyOpen());
      setNextOpening(getNextOpeningTime());
      setCurrentDay(getDayName(new Date().getDay()));
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Mise à jour chaque minute

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className={`text-sm ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4" />
          <span className="font-semibold">Horaires</span>
        </div>
        <div className="space-y-1">
          {Object.entries(OPENING_HOURS.regular).map(([day, schedule]) => (
            <div key={day} className={`flex justify-between ${day === currentDay ? 'font-semibold' : ''}`}>
              <span className="capitalize">{day}</span>
              <span className="text-gray-600">{formatScheduleForDisplay(schedule)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-temple-pink/10 rounded-full">
              <Clock className="h-6 w-6 text-temple-pink" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Horaires d'ouverture</h3>
          </div>
          
          {showStatus && (
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="open"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Ouvert</span>
                </motion.div>
              ) : (
                <motion.div
                  key="closed"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1.5 rounded-full"
                >
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Fermé</span>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {nextOpening && !isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
          >
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Prochaine ouverture:</span> {nextOpening.day} à {nextOpening.time}
            </p>
          </motion.div>
        )}

        <div className="space-y-3">
          {Object.entries(OPENING_HOURS.regular).map(([day, schedule], index) => {
            const isToday = day === currentDay;
            
            return (
              <motion.div 
                key={day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  isToday 
                    ? 'bg-temple-pink/10 border-l-4 border-temple-pink' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isToday && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-temple-pink rounded-full"
                    />
                  )}
                  <span className={`capitalize ${isToday ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                    {day}
                  </span>
                </div>
                <span className={`text-sm ${
                  schedule.closed 
                    ? 'text-red-600 font-medium' 
                    : isToday 
                      ? 'text-gray-900 font-semibold' 
                      : 'text-gray-600'
                }`}>
                  {formatScheduleForDisplay(schedule)}
                </span>
              </motion.div>
            );
          })}
        </div>

        {OPENING_HOURS.special && OPENING_HOURS.special.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Horaires spéciaux</span>
            </div>
            <div className="space-y-1">
              {OPENING_HOURS.special.map((special) => (
                <div key={special.date} className="flex justify-between text-sm">
                  <span className="text-gray-600">{special.name}</span>
                  <span className="text-gray-700">{formatScheduleForDisplay(special.schedule)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Les horaires peuvent varier les jours fériés
          </p>
        </div>
      </motion.div>
    );
  }

  // Variant par défaut
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-temple-pink" />
        <h3 className="font-semibold text-gray-900">Horaires d'ouverture</h3>
        {showStatus && (
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
            isOpen 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isOpen ? 'Ouvert' : 'Fermé'}
          </span>
        )}
      </div>
      
      {nextOpening && !isOpen && (
        <p className="text-sm text-gray-600">
          Ouvre {nextOpening.day} à {nextOpening.time}
        </p>
      )}
      
      <div className="grid grid-cols-7 gap-2 text-xs">
        {Object.entries(OPENING_HOURS.regular).map(([day, schedule]) => (
          <div key={day} className={`text-center ${day === currentDay ? 'font-bold' : ''}`}>
            <div className="capitalize mb-1">{day.slice(0, 3)}</div>
            <div className={schedule.closed ? 'text-red-500' : 'text-gray-600'}>
              {schedule.closed ? 'Fermé' : schedule.slots?.[0]?.open || 'Fermé'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}