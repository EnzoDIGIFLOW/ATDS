'use client'

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";

interface SushiDish {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  likes: number;
  price: string;
  category: string;
}

interface SushiCarouselProps {
  dishes?: SushiDish[];
  autoplay?: boolean;
  cardsPerView?: number;
}

const SushiCarousel = ({ 
  dishes = [], 
  autoplay = true, 
  cardsPerView = 6 
}: SushiCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [responsiveCardsPerView, setResponsiveCardsPerView] = useState(cardsPerView);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<any | null>(null);

  // Responsive breakpoints
  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      if (width < 640) { // mobile
        setResponsiveCardsPerView(2);
      } else if (width < 768) { // small tablet
        setResponsiveCardsPerView(3);
      } else if (width < 1024) { // tablet
        setResponsiveCardsPerView(4);
      } else if (width < 1280) { // small desktop
        setResponsiveCardsPerView(5);
      } else { // large desktop
        setResponsiveCardsPerView(cardsPerView);
      }
    };
  
    // Vérifier si window existe avant d'ajouter les event listeners
    if (typeof window !== 'undefined') {
      updateCardsPerView();
      window.addEventListener('resize', updateCardsPerView);
      
      return () => {
        window.removeEventListener('resize', updateCardsPerView);
      };
    }
  }, [cardsPerView]);

  useEffect(() => {
    if (autoplay && dishes.length > responsiveCardsPerView) {
      autoplayIntervalRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, dishes.length, responsiveCardsPerView, currentIndex]);

  const cardWidth = 100 / responsiveCardsPerView;

  const nextSlide = () => {
    if (isAnimating || dishes.length <= responsiveCardsPerView) return;
    
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % dishes.length;
    
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = "translateX(0)";
          void containerRef.current.offsetWidth;
          setIsAnimating(false);
        }
      }, 600);
    }
  };

  const prevSlide = () => {
    if (isAnimating || dishes.length <= responsiveCardsPerView) return;
    
    setIsAnimating(true);
    const prevIndex = (currentIndex - 1 + dishes.length) % dishes.length;
    
    if (containerRef.current) {
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;
      setCurrentIndex(prevIndex);
      void containerRef.current.offsetWidth;
      
      containerRef.current.style.transition = "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)";
      containerRef.current.style.transform = "translateX(0)";
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  };

  const getVisibleCards = () => {
    if (dishes.length <= responsiveCardsPerView) return dishes;
    
    const visibleCards = [];
    for (let i = 0; i < responsiveCardsPerView + 1; i++) {
      const index = (currentIndex + i) % dishes.length;
      visibleCards.push(dishes[index]);
    }
    return visibleCards;
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && dishes.length > responsiveCardsPerView) {
      nextSlide();
      stopAutoplay();
    }
    if (isRightSwipe && dishes.length > responsiveCardsPerView) {
      prevSlide();
      stopAutoplay();
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
            Nos Créations
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Découvrez nos créations de sushi les plus appréciées. 
            Chaque plat est préparé avec passion.
          </p>
          {/* Swipe indicator for mobile */}
          <div className="mt-4 md:hidden">
            <p className="text-xs text-slate-500 text-center">👈 Swipez pour naviguer 👉</p>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          {dishes.length > responsiveCardsPerView && (
            <>
              <motion.button
                onClick={() => { prevSlide(); stopAutoplay(); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-slate-700 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                disabled={isAnimating}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </motion.button>
              <motion.button
                onClick={() => { nextSlide(); stopAutoplay(); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-slate-700 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                disabled={isAnimating}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </motion.button>
            </>
          )}

          {/* Cards Container */}
          <div 
            className="overflow-hidden rounded-xl sm:rounded-2xl mx-2 sm:mx-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={containerRef}
              className="flex"
              style={{
                width: dishes.length > responsiveCardsPerView ? `${(responsiveCardsPerView + 1) * 100 / responsiveCardsPerView}%` : '100%'
              }}
            >
              {getVisibleCards().map((dish, idx) => (
                <motion.div
                  key={`${dish.id}-${currentIndex}-${idx}`}
                  style={{
                    width: dishes.length > responsiveCardsPerView ? `${100 / (responsiveCardsPerView + 1)}%` : `${100 / Math.min(responsiveCardsPerView, dishes.length)}%`
                  }}
                  className="px-1 sm:px-2"
                  onMouseEnter={() => setHoveredCard(dish.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div 
                    className="relative bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden group h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px]"
                    whileHover={{ y: typeof window !== 'undefined' && window.innerWidth >= 640 ? -6 : -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Container */}
                    <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden">
                      <motion.img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredCard === dish.id && typeof window !== 'undefined' && window.innerWidth >= 640 ? 1.1 : 1
                        }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        <span className="bg-temple-pink text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium">
                          {dish.category}
                        </span>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
                          {dish.price}
                        </span>
                      </div>

                      {/* Floating Heart Animation - Only on desktop */}
                      <AnimatePresence>
                        {hoveredCard === dish.id && typeof window !== 'undefined' && window.innerWidth >= 640 && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute"
                                initial={{
                                  x: Math.random() * 200 + 50,
                                  y: 200,
                                  opacity: 0,
                                  scale: 0
                                }}
                                animate={{
                                  y: -20,
                                  opacity: [0, 1, 0],
                                  scale: [0, 1, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.2,
                                  repeat: Infinity,
                                  repeatDelay: 1
                                }}
                              >
                                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-temple-pink fill-current" />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1 group-hover:text-temple-pink transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-slate-600 text-[11px] sm:text-xs mb-2 line-clamp-2 min-h-[2rem]">
                        {dish.description}
                      </p>
                      
                      {/* Rating and Likes */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                                  i < Math.floor(dish.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] sm:text-xs font-medium text-slate-700 ml-1">
                            {dish.rating}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-0.5 text-temple-pink">
                          <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-temple-pink fill-current" />
                          <span className="text-[10px] sm:text-xs font-medium text-temple-pink">{dish.likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay - Only on desktop */}
                    <motion.div
                      className="absolute inset-0 bg-temple-pink/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex"
                      initial={false}
                    >
                      <motion.button
                        className="bg-white text-temple-pink px-3 py-2 rounded-full text-xs font-semibold hover:bg-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Commander
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Dots Indicator */}
          <div className="flex justify-center mt-6 sm:hidden">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(dishes.length / responsiveCardsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    stopAutoplay();
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / responsiveCardsPerView) === index
                      ? 'bg-red-500 w-6'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const defaultSushiDishes: SushiDish[] = [
  {
    id: 1,
    name: "Rolls saumon braisé",
    description: "Avocat, sauce spicy, billes citronnées",
    imageUrl: "/menu/création du chef/roll_s avocat sauce spicy.webp",
    rating: 4.8,
    likes: 215,
    price: "8,80€",
    category: "Rolls"
  },
  {
    id: 2,
    name: "L'italien",
    description: "Tomate, mozza, parmesan, pesto",
    imageUrl: "/menu/création du chef/L_italien 4.webp",
    rating: 4.9,
    likes: 248,
    price: "11,80€",
    category: "Signature"
  },
  {
    id: 3,
    name: "California crevette tempura",
    description: "Avocat, enrobé de saumon braisé, oignon frit",
    imageUrl: "/menu/création du chef/cali tempura avocat enrobe saumon braisé .webp",
    rating: 4.7,
    likes: 192,
    price: "8,90€",
    category: "California"
  },
  {
    id: 4,
    name: "Avocat mayo",
    description: "Enrobé de thon braisé, pousse de cress",
    imageUrl: "/menu/création du chef/roll_s avocat pousse de cress.webp",
    rating: 4.7,
    likes: 178,
    price: "8,50€",
    category: "Rolls"
  },
  {
    id: 5,
    name: "California poulet caramélisé",
    description: "Enrobé de mangue, tobiko",
    imageUrl: "/menu/création du chef/california poulet caramelisé mangue .webp",
    rating: 4.8,
    likes: 206,
    price: "9,80€",
    category: "California"
  },
  {
    id: 6,
    name: "California poulet frit",
    description: "Guacamole, jalapeno, oignon frit",
    imageUrl: "/menu/création du chef/cali poulet frit guacamole jalap.webp",
    rating: 4.8,
    likes: 197,
    price: "9,40€",
    category: "California"
  },
  {
    id: 7,
    name: "Rolls avocat",
    description: "Enrobé de thon, zeste de pêche, tobiko",
    imageUrl: "/menu/création du chef/rolls avocat enrobé de thon, zeste de kiwi, tobiko.webp",
    rating: 4.9,
    likes: 211,
    price: "10,30€",
    category: "Rolls"
  },
  {
    id: 8,
    name: "Flocon saumon avocat",
    description: "Tobiko, menthe",
    imageUrl: "/menu/création du chef/flocon saumon avocat tobiko menthe .webp",
    rating: 4.7,
    likes: 164,
    price: "7,40€",
    category: "Flocon"
  },
  {
    id: 9,
    name: "Cheese saumon tartare",
    description: "Façon tartare ciboulette",
    imageUrl: "/menu/crispy/crispy cheese et saumon façon tartare ciboulette.webp",
    rating: 5.0,
    likes: 267,
    price: "11,20€",
    category: "Crispy"
  },
  {
    id: 10,
    name: "California saumon",
    description: "Guacamole jalapeno",
    imageUrl: "/menu/création du chef/saumon guacamole jalap.webp",
    rating: 4.8,
    likes: 223,
    price: "11,50€",
    category: "California"
  },
  {
    id: 11,
    name: "Roll's avocat truffe",
    description: "Enrobé de saumon braisé, sauce truffe",
    imageUrl: "/menu/création du chef/roll_s braisé truffe  - Grande - Grande.webp",
    rating: 4.9,
    likes: 254,
    price: "13,80€",
    category: "Rolls"
  }
];

const NosCreations = () => {
  return (
    <SushiCarousel 
      dishes={defaultSushiDishes.slice(0, 12)} // Limiter à 12 plats pour éviter trop de scroll
      autoplay={true}
      cardsPerView={6}
    />
  );
};

export default NosCreations;