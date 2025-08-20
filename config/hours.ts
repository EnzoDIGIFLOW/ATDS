export interface TimeSlot {
  open: string;
  close: string;
}

export interface DaySchedule {
  closed?: boolean;
  slots?: TimeSlot[];
}

export interface SpecialHours {
  date: string; // Format: YYYY-MM-DD
  name: string;
  schedule: DaySchedule;
}

export interface OpeningHours {
  regular: {
    [key: string]: DaySchedule;
  };
  special?: SpecialHours[];
}

// Configuration centralisée des horaires
export const OPENING_HOURS: OpeningHours = {
  regular: {
    lundi: { closed: true },
    mardi: {
      slots: [
        { open: "11:30", close: "14:30" },
        { open: "18:00", close: "22:30" }
      ]
    },
    mercredi: {
      slots: [
        { open: "11:30", close: "14:30" },
        { open: "18:00", close: "22:30" }
      ]
    },
    jeudi: {
      slots: [
        { open: "11:30", close: "14:30" },
        { open: "18:00", close: "22:30" }
      ]
    },
    vendredi: {
      slots: [
        { open: "11:30", close: "14:30" },
        { open: "18:00", close: "23:00" }
      ]
    },
    samedi: {
      slots: [
        { open: "11:30", close: "14:30" },
        { open: "18:00", close: "23:00" }
      ]
    },
    dimanche: {
      slots: [
        { open: "18:00", close: "22:30" }
      ]
    }
  },
  special: [
    // Exemple de jours spéciaux (à personnaliser selon les besoins)
    // {
    //   date: "2024-12-25",
    //   name: "Noël",
    //   schedule: { closed: true }
    // },
    // {
    //   date: "2024-12-31",
    //   name: "Nouvel An",
    //   schedule: {
    //     slots: [{ open: "18:00", close: "02:00" }]
    //   }
    // }
  ]
};

// Utilitaires pour les horaires
export function getDayName(dayIndex: number): string {
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  return days[dayIndex];
}

export function getCurrentDaySchedule(): DaySchedule {
  const today = new Date();
  const dayName = getDayName(today.getDay());
  
  // Vérifier d'abord les horaires spéciaux
  const todayStr = today.toISOString().split('T')[0];
  const special = OPENING_HOURS.special?.find(s => s.date === todayStr);
  
  if (special) {
    return special.schedule;
  }
  
  return OPENING_HOURS.regular[dayName];
}

export function isCurrentlyOpen(): boolean {
  const now = new Date();
  const schedule = getCurrentDaySchedule();
  
  if (!schedule || schedule.closed) {
    return false;
  }
  
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  return schedule.slots?.some(slot => {
    const [openHour, openMin] = slot.open.split(':').map(Number);
    const [closeHour, closeMin] = slot.close.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    return currentTime >= openTime && currentTime < closeTime;
  }) || false;
}

export function isOpeningSoon(): boolean {
  const now = new Date();
  const schedule = getCurrentDaySchedule();
  
  if (!schedule || schedule.closed) {
    return false;
  }
  
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  // Vérifier si on est dans les 30 minutes avant une ouverture
  return schedule.slots?.some(slot => {
    const [openHour, openMin] = slot.open.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    
    // Entre 30 minutes avant et le moment de l'ouverture
    return currentTime >= (openTime - 30) && currentTime < openTime;
  }) || false;
}

export function getNextOpeningTime(): { day: string; time: string } | null {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const currentDayIndex = now.getDay();
  
  // Vérifier le jour actuel d'abord
  const todaySchedule = getCurrentDaySchedule();
  if (todaySchedule && !todaySchedule.closed && todaySchedule.slots) {
    for (const slot of todaySchedule.slots) {
      const [openHour, openMin] = slot.open.split(':').map(Number);
      const openTime = openHour * 60 + openMin;
      
      if (openTime > currentTime) {
        return { day: "aujourd'hui", time: slot.open };
      }
    }
  }
  
  // Vérifier les 7 prochains jours
  for (let i = 1; i <= 7; i++) {
    const checkDay = (currentDayIndex + i) % 7;
    const dayName = getDayName(checkDay);
    const schedule = OPENING_HOURS.regular[dayName];
    
    if (schedule && !schedule.closed && schedule.slots && schedule.slots.length > 0) {
      const dayLabel = i === 1 ? "demain" : dayName;
      return { day: dayLabel, time: schedule.slots[0].open };
    }
  }
  
  return null;
}

export function formatScheduleForDisplay(schedule: DaySchedule): string {
  if (schedule.closed) {
    return "Fermé";
  }
  
  if (!schedule.slots || schedule.slots.length === 0) {
    return "Fermé";
  }
  
  return schedule.slots
    .map(slot => `${slot.open} - ${slot.close}`)
    .join(', ');
}

// Fonction pour obtenir les horaires formatés pour le SEO
export function getStructuredDataHours(): string[] {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const result: string[] = [];
  
  Object.entries(OPENING_HOURS.regular).forEach(([day, schedule]) => {
    const dayIndex = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].indexOf(day);
    if (dayIndex === -1) return;
    
    const dayCode = days[dayIndex === 0 ? 6 : dayIndex - 1]; // Ajuster pour dimanche
    
    if (!schedule.closed && schedule.slots) {
      schedule.slots.forEach(slot => {
        result.push(`${dayCode} ${slot.open}-${slot.close}`);
      });
    }
  });
  
  return result;
}