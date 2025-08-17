"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, Truck } from 'lucide-react';
import { MapPin, Phone, Clock, Star, Instagram, ShoppingCart, User, MenuIcon, X, ChevronDown, Heart, Utensils, Fish, Play, Pause, Volume2, VolumeX, Plus, Minus, UtensilsCrossed, ShoppingBag, Navigation, Send, Mail, Facebook, Youtube, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShineBorder } from "@/components/magicui/shine-border";
import dynamic from "next/dynamic";
import LanguageSwitcher from "@/components/language-switcher";
import GoogleReviewsCard from "@/components/google-review-card";
import SEOFooter from "@/components/seo-footer";
import { useLanguage } from "@/contexts/language-context";
// Temporairement désactivé - useInView causait des erreurs
// import { useInView } from "@/hooks/use-simple-in-view"
import { BlurFade } from "@/components/magicui/blur-fade";
import { AboutImages } from "@/components/about-images";
import InstagramFeed from "@/components/instagram-feed";
import GoogleReviews from "@/components/google-reviews";

const NosCreations = dynamic(
  () => import('../components/our-creation-section'),
  { ssr: false }
);
const ReviewMarquee = dynamic(() => import('@/components/review'), {
  ssr: false
});

// Mobile Menu Component
function MobileMenu({ isOpen, onClose, t, language }: { isOpen: boolean; onClose: () => void; t: any; language: string }) {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-full bg-white z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{t.nav.menus}</h2>
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-8 h-8 text-gray-700" />
        </Button>
      </div>
      <nav className="flex flex-col px-6 py-4 space-y-8 text-xl font-medium text-gray-800">
        <Link href="#accueil" className="hover:text-temple-pink transition-colors" onClick={onClose}>
          {t.nav.home}
        </Link>
        <div className="relative group">
          <button className="hover:text-temple-pink transition-colors flex items-center">
            {t.nav.menus} <ChevronDown className="w-6 h-6 ml-2" />
          </button>
          <div className="flex flex-col mt-4 space-y-4 text-xl font-medium text-gray-600">
            <Link href="#libre-service" className="hover:text-temple-pink transition-colors" onClick={onClose}>
              {language === 'fr' ? 'Libre-Service' : 'Self-Service'}
            </Link>
            <Link href="#nos-menus" className="hover:text-temple-pink transition-colors" onClick={onClose}>
              {t.nav.ourMenus}
            </Link>
            <Link href="#nos-creations" className="hover:text-temple-pink transition-colors" onClick={onClose}>
              {t.nav.ourCreations}
            </Link>
          </div>
        </div>
        <Link href="#qui-sommes-nous" className="hover:text-temple-pink transition-colors" onClick={onClose}>
          {t.nav.aboutUs}
        </Link>
        <Link href="#contact" className="hover:text-temple-pink transition-colors" onClick={onClose}>
          {t.nav.contact}
        </Link>
      </nav>
    </div>
  );
}

export default function Home() {
  const { t, isLoading, language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [scrollY, setScrollY] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
  }
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  const menuSurPlace = [
    {
      category: t.menu.categories.alcoholicDrinks,
      items: [
        {
          id: "whisky-coca",
          name: "Whisky Coca",
          description: "4cl - Whisky premium avec coca cola",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "whisky-label",
          name: "Whisky Label",
          description: "4cl - Johnnie Walker Red Label",
          price: 4.80,
          image: "/final-img.png"
        },
        {
          id: "whisky-yamazakura",
          name: "Whisky Yamazakura",
          description: "4cl - Whisky japonais premium",
          price: 8.00,
          image: "/final-img.png"
        },
        {
          id: "whisky-togouchi",
          name: "Whisky Togouchi",
          description: "4cl - Whisky japonais artisanal",
          price: 9.00,
          image: "/final-img.png"
        },
        {
          id: "pastis",
          name: "Pastis",
          description: "2cl - Pastis traditionnel",
          price: 3.50,
          image: "/final-img.png"
        },
        {
          id: "shochu",
          name: "Shochu",
          description: "2cl - Alcool de riz japonais",
          price: 6.00,
          image: "/final-img.png"
        },
      ]
    },
    {
      category: t.menu.categories.beers,
      items: [
        {
          id: "asashi-biere-blond",
          name: "Asashi Bière Blond",
          description: "33cl - Bière japonaise légère",
          price: 4.20,
          image: "/final-img.png"
        },
        {
          id: "kirin-biere-blonde",
          name: "Kirin Bière Blonde",
          description: "33cl - Bière japonaise premium",
          price: 4.20,
          image: "/final-img.png"
        },
        {
          id: "pietra-biere-ambree",
          name: "Pietra Bière Ambrée",
          description: "33cl - Bière corse aux châtaignes",
          price: 4.50,
          image: "/final-img.png"
        },
        {
          id: "desperados-blonde",
          name: "Desperados Blonde",
          description: "33cl - Bière aromatisée tequila",
          price: 5.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Cocktails du Temple",
      items: [
        {
          id: "cocktail-peche",
          name: "Cocktail Pêche",
          description: "Shochu, saké pétillant, liqueur japonaise",
          price: 12.80,
          image: "/final-img.png"
        },
        {
          id: "cocktail-fraise",
          name: "Cocktail Fraise",
          description: "Shochu, saké pétillant, liqueur japonaise",
          price: 12.80,
          image: "/final-img.png"
        },
        {
          id: "cocktail-citron",
          name: "Cocktail Citron",
          description: "Shochu, saké pétillant, liqueur japonaise",
          price: 12.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: t.menu.categories.nonAlcoholicDrinks,
      items: [
        {
          id: "eau-minerale",
          name: "Eau Minérale",
          description: "1l - Eau plate",
          price: 5.00,
          image: "/final-img.png"
        },
        {
          id: "eau-petillante",
          name: "Eau Pétillante",
          description: "1l - Eau gazeuse",
          price: 5.50,
          image: "/final-img.png"
        },
        {
          id: "sirop-menthe",
          name: "Sirop Menthe",
          description: "25cl - Sirop à la menthe fraîche",
          price: 2.50,
          image: "/final-img.png"
        },
        {
          id: "sirop-fraise",
          name: "Sirop Fraise",
          description: "25cl - Sirop à la fraise",
          price: 2.50,
          image: "/final-img.png"
        },
        {
          id: "oasis",
          name: "Oasis",
          description: "33cl - Boisson aux fruits tropicaux",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "coca-cola",
          name: "Coca Cola",
          description: "25cl - Cola classique",
          price: 3.00,
          image: "/final-img.png"
        },
        {
          id: "coca-cola-zero",
          name: "Coca Cola Zero",
          description: "25cl - Cola sans sucre",
          price: 3.00,
          image: "/final-img.png"
        },
        {
          id: "cafe",
          name: "Café",
          description: "Expresso traditionnel",
          price: 3.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Thés Japonais",
      items: [
        {
          id: "limonade-japonaise",
          name: "Limonade Japonaise",
          description: "200ml - Boisson pétillante au yuzu",
          price: 3.90,
          image: "/final-img.png"
        },
        {
          id: "goyave-litchi",
          name: "Goyave Litchi",
          description: "25cl - Thé glacé exotique",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-gingembre",
          name: "Thé Jomo Gingembre",
          description: "350ml - Thé vert au gingembre",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-mangue",
          name: "Thé Jomo Mangue",
          description: "350ml - Thé vert à la mangue",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-passion-citron-vert",
          name: "Thé Jomo Passion Citron Vert",
          description: "350ml - Thé vert passion citron",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-peche",
          name: "Thé Jomo Pêche",
          description: "350ml - Thé vert à la pêche",
          price: 3.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Cocktails Sans Alcool",
      items: [
        {
          id: "le-kimino-yuzu",
          name: "Le Kimino Yuzu",
          description: "Zeste de yuzu, gingembre, feuille de menthe",
          price: 9.00,
          image: "/final-img.png"
        },
        {
          id: "le-kimino-poire",
          name: "Le Kimino Poire",
          description: "Zeste de yuzu, poire, feuille de menthe",
          price: 9.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Boeuf Wagyu Grade A5, importé du Japon",
      items: [
        {
          id: "sashimi-de-boeuf",
          name: "Sashimi de boeuf",
          description: "Patates douces pané sur son lit de sauce truffé",
          price: 68.00,
          image: "/final-img.png"
        },
        {
          id: "nigiri-boeuf-wagyu-sauce-truffe",
          name: "Nigiri boeuf wagyu sauce truffe",
          description: "Feuille d'or (à l'unité)",
          price: 8.00,
          image: "/final-img.png"
        },
        {
          id: "nigiri-boeuf-wagyu",
          name: "Nigiri boeuf wagyu",
          description: "À l'unité",
          price: 6.00,
          image: "/final-img.png"
        },
        {
          id: "sashimi-de-boeuf-wagyu",
          name: "Sashimi de boeuf wagyu",
          description: "100G",
          price: 58.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Nos plats chaud",
      items: [
        {
          id: "yakitori-poulet-caramelise",
          name: "Yakitori poulet caramélisé",
          description: "Accompagné de riz vinaigré (X5)",
          price: 13.20,
          image: "/final-img.png"
        },
        {
          id: "poulet-karaage-sauce-cocktail",
          name: "Poulet karaage sauce cocktail",
          description: "(x5)",
          price: 8.20,
          image: "/final-img.png"
        },
        {
          id: "poulet-teriyaki",
          name: "Poulet teriyaki",
          description: "Accompagné de riz vinaigré",
          price: 13.60,
          image: "/final-img.png"
        },
        {
          id: "katsu-tori",
          name: "Katsu tori (poulet frit)",
          description: "Accompagné de riz vinaigré",
          price: 12.60,
          image: "/final-img.png"
        },
        {
          id: "kare-raisu-curry-japonais-riz-poulet",
          name: "Kare raisu (curry japonais)",
          description: "Riz, poulet, pomme grenaille tomate",
          price: 17.50,
          image: "/final-img.png"
        },
        {
          id: "kare-raisu-curry-japonais-riz-saucisse",
          name: "Kare raisu (curry japonais)",
          description: "Riz, saucisse, pomme grenaille tomate",
          price: 17.30,
          image: "/final-img.png"
        },
        {
          id: "bun-bao-legumes-gingembre",
          name: "Bun bao légumes, gingembre",
          description: "2pcs",
          price: 8.50,
          image: "/final-img.png"
        },
        {
          id: "bun-bao-champignon-teriyaki",
          name: "Bun bao champignon, teriyaki",
          description: "2pcs",
          price: 8.50,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Ramen",
      items: [
        {
          id: "ramen-karaage",
          name: "Ramen karaage",
          description: "Nouilles fraîche, bouillon miso, pousse de bambou, chou, edamame carotte, champignon poulet karaage",
          price: 20.80,
          image: "/final-img.png"
        },
        {
          id: "ramen-chashu",
          name: "Ramen chashu",
          description: "Nouilles fraîches, tranches de chashu (porc), pousse de bambou, bouillon miso, maïs, tomate, champignon, chou, algue nori",
          price: 22.50,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Nouilles",
      items: [
        {
          id: "nouilles-legumes",
          name: "Nouilles légumes",
          description: "Nouilles fraîches confectionnée par une fabrique de pâte local",
          price: 17.00,
          image: "/final-img.png"
        },
        {
          id: "nouilles-crevettes-legumes",
          name: "Nouilles crevettes, légumes",
          description: "",
          price: 18.80,
          image: "/final-img.png"
        },
        {
          id: "nouilles-poulet-teriyaki-legumes",
          name: "Nouilles poulet teriyaki, légumes",
          description: "",
          price: 17.30,
          image: "/final-img.png"
        },
        {
          id: "nouilles-poulet-caramelise-legumes",
          name: "Nouilles poulet caramélisé, légumes",
          description: "",
          price: 19.80,
          image: "/final-img.png"
        },
        {
          id: "nouille-saucisse-de-porc-japonaise-legumes",
          name: "Nouille saucisse de porc japonaise, légumes",
          description: "",
          price: 18.50,
          image: "/final-img.png"
        }
      ]
    }
  ];
  const menuLivraisons = menuSurPlace; // This was already defined as menuSurPlace, keeping it for consistency
  const menuAEmporter = [
    {
      category: "Formules du Midi",
      items: [
        {
          id: "formule-a",
          name: "Formule A",
          description: "Entrée offerte (soupe miso, riz vinaigré, salade edamame ou wakame) + 6 California saumon avocat + 6 Flocon saumon + 6 Makis saumon + 1 Sushi saumon",
          price: 21.00,
          image: "/final-img.png"
        },
        {
          id: "formule-b",
          name: "Formule B",
          description: "6 California saumon avocat tobiko + 6 California saumon cheese + 1 Sushi saumon + 1 Dessert du jour + 1 Boisson soft",
          price: 18.00,
          image: "/final-img.png"
        },
        {
          id: "formule-c",
          name: "Formule C",
          description: "Poke bowl au choix + 1 Dessert du jour + 1 Boisson soft",
          price: 19.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Plateaux",
      items: [
        {
          id: "box-sushi-mix",
          name: "Box Sushi Mix (12 pièces)",
          description: "2 sushi saumon, 2 sushi thon, 1 sushi saumon braisé, 1 sushi thon braisé, 1 sushi saumon avocat jalapeno, 1 sushi saumon ciboulette, 1 sushi saumon tobiko, 1 sushi saumon spicy tobiko, 1 sushi saumon avocat, 1 sushi saumon mangue",
          price: 25.50,
          image: "/final-img.png"
        },
        {
          id: "box-sushi-duo",
          name: "Box Sushi Duo (20 pièces)",
          description: "10 sushi saumon + 10 sushi thon",
          price: 45.00,
          image: "/final-img.png"
        },
        {
          id: "box-sushi-saumon",
          name: "Box Sushi Saumon (10 pièces)",
          description: "10 sushi saumon",
          price: 20.50,
          image: "/final-img.png"
        },
        {
          id: "love-box",
          name: "Love Box (24 pièces)",
          description: "6 makis cheese + 6 california gambas cheese + 6 flocon saumon + 6 rolls saumon",
          price: 25.50,
          image: "/final-img.png"
        },
        {
          id: "calibox",
          name: "Calibox (30 pièces)",
          description: "3 california saumon avocat + 3 california saumon avocat tobiko + 6 flocon saumon cheese + 6 makis thon avocat + 6 makis concombre cheese + 6 calispring thon cuit mayonnaise",
          price: 30.50,
          image: "/final-img.png"
        },
        {
          id: "plateaux-chaud",
          name: "Plateaux Chaud (26 pièces)",
          description: "Samoussa bœuf + samoussa poulet + gyoza porc + gyoza poulet curry + nem légume + crevette tempura + nem crevette + karaage",
          price: 35.00,
          image: "/final-img.png"
        },
        {
          id: "family-box",
          name: "Family Box (46 pièces)",
          description: "6 makis saumon + 6 makis thon + 6 california saumon avocat sésame + 6 rolls avocat concombre enrobé de mangue et saumon + 6 roll's avocat cheese + 6 flocon saumon cheese + 2 sushi saumon + 2 sushi thon + 3 sashimi saumon + 3 sashimi thon",
          price: 60.50,
          image: "/final-img.png"
        },
        {
          id: "chicken-box",
          name: "Chicken Box (24 pièces)",
          description: "6 calispring poulet frit avocat cheese + 6 california poulet frit cheddar oignon frit + 6 makis poulet curry + 6 makis poulet cheese",
          price: 24.00,
          image: "/final-img.png"
        },
        {
          id: "super-box",
          name: "Super Box (14 pièces)",
          description: "6 makis saumon cheese + 6 makis thon + 1 sushi saumon avocat + 1 sushi saumon braisé",
          price: 16.50,
          image: "/final-img.png"
        },
        {
          id: "plateau-california",
          name: "Plateau California (18 pièces)",
          description: "3 saumon avocat + 3 saumon avocat tobiko + 3 saumon cheese + 3 crevette tempura mayo + 3 saumon mangue menthe + 3 thon avocat",
          price: 18.50,
          image: "/final-img.png"
        },
        {
          id: "plateau-makis",
          name: "Plateau Makis (18 pièces)",
          description: "3 saumon + 3 thon + 3 avocat + 3 concombre cheese + 3 cheese + 3 avocat mayo",
          price: 15.50,
          image: "/final-img.png"
        },
        {
          id: "plateau-premium",
          name: "Plateau Premium (60 pièces)",
          description: "6 roll's avocat enrobé de saumon braisé sauce truffe + 6 california crevette tempura mayo + 2 sushi saumon + 2 sushi thon + 6 roll's saumon + 6 flocon saumon avocat + 4 sashimi thon + 4 sashimi saumon + 6 makis thon cru cheese + 6 california gambas cheese oignon frit + 6 roll's saumon braisé avocat sauce spicy bille citronnée + 6 california saumon avocat",
          price: 84.50,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Poke Bowl sur lit de riz",
      items: [
        {
          id: "poke-bowl-01",
          name: "Poke Bowl N°01",
          description: "Salade wakame, carotte, avocat, maïs, edamame, mangue, billes citronnées",
          price: 11.80,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-02",
          name: "Poke Bowl N°02",
          description: "Poulet curry, mangue, avocat, carotte",
          price: 11.80,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-03",
          name: "Poke Bowl N°03",
          description: "Poulet caramélisé, mangue, avocat, saumon",
          price: 13.40,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-04",
          name: "Poke Bowl N°04",
          description: "Poulet, tomate, chou, carotte, grenade",
          price: 11.80,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-05",
          name: "Poke Bowl N°05",
          description: "Gambas, avocat, carotte, chou, mangue",
          price: 12.80,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-06",
          name: "Poke Bowl N°06",
          description: "Saumon, avocat, mangue, concombre, edamame",
          price: 13.20,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-07",
          name: "Poke Bowl N°07",
          description: "Poulet karaage, avocat, chou, edamame",
          price: 12.20,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-08",
          name: "Poke Bowl N°08",
          description: "Poulet frit, maïs, mangue, concombre, edamame, oignon frit",
          price: 13.20,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-09",
          name: "Poke Bowl N°09",
          description: "Poulet teriyaki, saumon, avocat, mangue, edamame",
          price: 13.90,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-10",
          name: "Poke Bowl N°10",
          description: "Thon cuit, avocat, edamame, tomate, maïs",
          price: 13.50,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-11",
          name: "Poke Bowl N°11",
          description: "Saumon cuit, grenade, carotte, chou, edamame, billes citronnées",
          price: 12.90,
          image: "/final-img.png"
        },
        {
          id: "poke-bowl-12",
          name: "Poke Bowl N°12",
          description: "Thon, avocat, mangue, concombre, edamame",
          price: 13.40,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Plats Chauds",
      items: [
        {
          id: "samoussa-poulet",
          name: "Samoussa Poulet",
          description: "X5",
          price: 7.60,
          image: "/final-img.png"
        },
        {
          id: "samoussa-boeuf",
          name: "Samoussa Bœuf",
          description: "X5",
          price: 7.50,
          image: "/final-img.png"
        },
        {
          id: "yakitori-poulet-caramelise-takeaway",
          name: "Yakitori Poulet Caramélisé",
          description: "Accompagné de riz vinaigré (X5)",
          price: 10.90,
          image: "/final-img.png"
        },
        {
          id: "nem-poulet",
          name: "Nem Poulet",
          description: "X5",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "nem-crevettes",
          name: "Nem Crevettes",
          description: "X5",
          price: 7.30,
          image: "/final-img.png"
        },
        {
          id: "nem-legumes",
          name: "Nem Légumes",
          description: "X5",
          price: 6.50,
          image: "/final-img.png"
        },
        {
          id: "crevettes-tempura",
          name: "Crevettes Tempura",
          description: "X4",
          price: 7.70,
          image: "/final-img.png"
        },
        {
          id: "poulet-karaage",
          name: "Poulet Karaage",
          description: "Sauce cocktail (X5)",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "gyoza-poulet-curry",
          name: "Gyoza Poulet Curry",
          description: "X5",
          price: 7.40,
          image: "/final-img.png"
        },
        {
          id: "gyoza-crevette",
          name: "Gyoza Crevette",
          description: "X5",
          price: 7.80,
          image: "/final-img.png"
        },
        {
          id: "gyoza-porc",
          name: "Gyoza Porc",
          description: "X5",
          price: 7.60,
          image: "/final-img.png"
        },
        {
          id: "nouilles-legumes-takeaway",
          name: "Nouilles Légumes",
          description: "",
          price: 12.90,
          image: "/final-img.png"
        },
        {
          id: "nouilles-crevettes-et-legumes",
          name: "Nouilles Crevettes et Légumes",
          description: "",
          price: 14.40,
          image: "/final-img.png"
        },
        {
          id: "nouilles-poulet-teriyaki-et-legumes",
          name: "Nouilles Poulet Teriyaki et Légumes",
          description: "",
          price: 13.90,
          image: "/final-img.png"
        },
        {
          id: "nouilles-poulet-caramelise-et-legumes",
          name: "Nouilles Poulet Caramélisé et Légumes",
          description: "",
          price: 13.80,
          image: "/final-img.png"
        },
        {
          id: "poulet-teriyaki-takeaway",
          name: "Poulet Teriyaki",
          description: "Accompagné de riz vinaigré",
          price: 11.30,
          image: "/final-img.png"
        },
        {
          id: "poulet-frit",
          name: "Poulet Frit",
          description: "Accompagné de riz vinaigré",
          price: 10.50,
          image: "/final-img.png"
        },
        {
          id: "soupe-miso-tofu",
          name: "Soupe Miso Tofu",
          description: "",
          price: 4.60,
          image: "/final-img.png"
        },
        {
          id: "soupe-miso-tofu-wakame",
          name: "Soupe Miso Tofu, Wakame, Ciboulette",
          description: "",
          price: 4.80,
          image: "/final-img.png"
        },
        {
          id: "soupe-miso-tofu-algue",
          name: "Soupe Miso Tofu, Algue Séché, Edamame",
          description: "",
          price: 4.90,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Makis par 6",
      items: [
        {
          id: "makis-saumon",
          name: "Saumon",
          description: "",
          price: 5.80,
          image: "/final-img.png"
        },
        {
          id: "makis-saumon-cheese",
          name: "Saumon, Cheese",
          description: "",
          price: 6.20,
          image: "/final-img.png"
        },
        {
          id: "makis-thon-mayonnaise",
          name: "Thon, Mayonnaise",
          description: "",
          price: 6.70,
          image: "/final-img.png"
        },
        {
          id: "makis-thon-avocat",
          name: "Thon, Avocat",
          description: "",
          price: 6.90,
          image: "/final-img.png"
        },
        {
          id: "makis-poulet-mayonnaise",
          name: "Poulet, Mayonnaise",
          description: "",
          price: 5.50,
          image: "/final-img.png"
        },
        {
          id: "makis-poulet-cheese",
          name: "Poulet, Cheese",
          description: "",
          price: 5.40,
          image: "/final-img.png"
        },
        {
          id: "makis-concombre-cheese",
          name: "Concombre, Cheese",
          description: "",
          price: 4.90,
          image: "/final-img.png"
        },
        {
          id: "makis-poulet-curry",
          name: "Poulet Curry",
          description: "",
          price: 5.40,
          image: "/final-img.png"
        },
        {
          id: "makis-cheese",
          name: "Cheese",
          description: "",
          price: 4.90,
          image: "/final-img.png"
        },
        {
          id: "makis-gambas",
          name: "Gambas",
          description: "",
          price: 6.90,
          image: "/final-img.png"
        },
        {
          id: "makis-thon",
          name: "Thon",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "makis-thon-cheese",
          name: "Thon, Cheese",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "makis-avocat",
          name: "Avocat",
          description: "",
          price: 4.90,
          image: "/final-img.png"
        },
        {
          id: "makis-avocat-mayo",
          name: "Avocat, Mayo",
          description: "",
          price: 5.10,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "California par 6",
      items: [
        {
          id: "california-saumon-avocat",
          name: "Saumon, Avocat",
          description: "",
          price: 6.40,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-avocat-tobiko",
          name: "Saumon, Avocat, Tobiko",
          description: "",
          price: 6.50,
          image: "/final-img.png"
        },
        {
          id: "california-gambas-cheese",
          name: "Gambas, Cheese",
          description: "",
          price: 7.60,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-cheese",
          name: "Poulet, Cheese",
          description: "",
          price: 5.90,
          image: "/final-img.png"
        },
        {
          id: "california-gambas-cheese-avocat",
          name: "Gambas, Cheese, Avocat",
          description: "",
          price: 7.80,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-avocat",
          name: "Poulet, Avocat",
          description: "",
          price: 6.20,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-curry",
          name: "Poulet Curry",
          description: "",
          price: 6.20,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-frit-cheddar",
          name: "Poulet Frit, Cheddar, Oignon Frit",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "california-thon-avocat",
          name: "Thon, Avocat",
          description: "",
          price: 6.90,
          image: "/final-img.png"
        },
        {
          id: "california-crevette-tempura-mayo",
          name: "Crevette Tempura, Mayo",
          description: "",
          price: 6.50,
          image: "/final-img.png"
        },
        {
          id: "california-crevette-tempura-avocat",
          name: "Crevette Tempura, Avocat",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "california-gambas-cheese-oignon",
          name: "Gambas, Cheese, Oignon Frit",
          description: "",
          price: 7.70,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-mangue-menthe",
          name: "Saumon, Mangue, Menthe",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-cheese",
          name: "Saumon Cheese",
          description: "",
          price: 6.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Sashimi par 6",
      items: [
        {
          id: "sashimi-saumon",
          name: "Saumon",
          description: "",
          price: 9.30,
          image: "/final-img.png"
        },
        {
          id: "sashimi-thon",
          name: "Thon",
          description: "",
          price: 10.90,
          image: "/final-img.png"
        },
        {
          id: "sashimi-duo",
          name: "Duo",
          description: "4 Saumon - 4 Thon",
          price: 11.90,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Sushi à l'unité",
      items: [
        {
          id: "sushi-saumon",
          name: "Saumon",
          description: "",
          price: 2.20,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-avocat",
          name: "Saumon Avocat",
          description: "",
          price: 2.30,
          image: "/final-img.png"
        },
        {
          id: "sushi-thon",
          name: "Thon",
          description: "",
          price: 2.50,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-ciboulette",
          name: "Saumon Ciboulette",
          description: "",
          price: 2.30,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-cheese",
          name: "Saumon Cheese",
          description: "",
          price: 2.30,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-braise",
          name: "Saumon Braisé",
          description: "",
          price: 2.40,
          image: "/final-img.png"
        },
        {
          id: "sushi-thon-braise",
          name: "Thon Braisé",
          description: "",
          price: 2.60,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-braise-spicy",
          name: "Saumon Braisé, Sauce Spicy, Tobiko",
          description: "",
          price: 2.70,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-tobiko",
          name: "Saumon, Tobiko",
          description: "",
          price: 2.30,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-mangue",
          name: "Saumon Mangue",
          description: "",
          price: 2.70,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-braise-truffe",
          name: "Saumon Braisé, Truffe",
          description: "",
          price: 3.70,
          image: "/final-img.png"
        },
        {
          id: "sushi-saumon-avocat-jalapeno",
          name: "Saumon Avocat Jalapeno",
          description: "",
          price: 2.40,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Création du Chef par 6",
      items: [
        {
          id: "rolls-saumon-braise",
          name: "Rolls Saumon Braisé",
          description: "Avocat, sauce spicy, billes citronnées",
          price: 8.80,
          image: "/final-img.png"
        },
        {
          id: "l-italien",
          name: "L'Italien",
          description: "Tomate, mozza, parmesan, pesto",
          price: 11.80,
          image: "/final-img.png"
        },
        {
          id: "california-crevette-tempura-enrobe",
          name: "California Crevette Tempura",
          description: "Avocat, enrobé de saumon braisé, oignon frit",
          price: 8.90,
          image: "/final-img.png"
        },
        {
          id: "avocat-mayo-thon",
          name: "Avocat Mayo",
          description: "Enrobé de thon braisé, pousse de cress",
          price: 8.50,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-caramelise-mangue",
          name: "California Poulet Caramélisé",
          description: "Enrobé de mangue, tobiko",
          price: 9.80,
          image: "/final-img.png"
        },
        {
          id: "california-poulet-frit-guacamole",
          name: "California Poulet Frit",
          description: "Guacamole, jalapeno, oignon frit",
          price: 9.40,
          image: "/final-img.png"
        },
        {
          id: "rolls-avocat-thon",
          name: "Rolls Avocat",
          description: "Enrobé de thon, zeste de pêche, tobiko",
          price: 10.30,
          image: "/final-img.png"
        },
        {
          id: "flocon-saumon-avocat-menthe",
          name: "Flocon Saumon Avocat",
          description: "Tobiko, menthe",
          price: 7.40,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-braise-truffe",
          name: "California Saumon Braisé",
          description: "Enrobé de saumon braisé, truffe",
          price: 12.50,
          image: "/final-img.png"
        },
        {
          id: "california-saumon-guacamole",
          name: "California Saumon",
          description: "Guacamole jalapeno",
          price: 11.50,
          image: "/final-img.png"
        },
        {
          id: "rolls-avocat-truffe",
          name: "Roll's Avocat Truffe",
          description: "Enrobé de saumon braisé, sauce truffe",
          price: 13.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Crispys (frit) par 6",
      items: [
        {
          id: "crevette-tempura-cheese-crispy",
          name: "Crevette Tempura Cheese",
          description: "Ciboulette oignon frit sauce spicy",
          price: 12.40,
          image: "/final-img.png"
        },
        {
          id: "cheese-saumon-tartare",
          name: "Cheese Saumon Tartare",
          description: "Façon tartare ciboulette",
          price: 11.20,
          image: "/final-img.png"
        },
        {
          id: "saumon-cheese-crispy",
          name: "Saumon Cheese",
          description: "",
          price: 10.30,
          image: "/final-img.png"
        },
        {
          id: "saumon-avocat-cheese-crispy",
          name: "Saumon Avocat Cheese",
          description: "Oignon frit",
          price: 12.30,
          image: "/final-img.png"
        },
        {
          id: "poulet-frit-cheddar-crispy",
          name: "Poulet Frit Cheddar",
          description: "Oignon frit",
          price: 11.50,
          image: "/final-img.png"
        },
        {
          id: "crevette-tempura-saumon-crispy",
          name: "Crevette Tempura Saumon",
          description: "Sauce du chef, billes citronnées",
          price: 12.30,
          image: "/final-img.png"
        },
        {
          id: "saumon-cuit-cheese-fraise",
          name: "Saumon Cuit Cheese Fraise",
          description: "Sauce du chef",
          price: 11.50,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Calispring par 6",
      items: [
        {
          id: "calispring-thon-cuit-mayo",
          name: "Thon Cuit Mayo",
          description: "",
          price: 6.70,
          image: "/final-img.png"
        },
        {
          id: "calispring-poulet-frit-avocat",
          name: "Poulet Frit Avocat",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "calispring-poulet-frit-avocat-cheese",
          name: "Poulet Frit Avocat Cheese",
          description: "",
          price: 6.90,
          image: "/final-img.png"
        },
        {
          id: "calispring-gambas-cheese",
          name: "Gambas Cheese",
          description: "",
          price: 7.40,
          image: "/final-img.png"
        },
        {
          id: "calispring-gambas-avocat",
          name: "Gambas Avocat",
          description: "",
          price: 7.30,
          image: "/final-img.png"
        },
        {
          id: "calispring-saumon",
          name: "Saumon",
          description: "",
          price: 6.50,
          image: "/final-img.png"
        },
        {
          id: "calispring-thon-cuit-cheese",
          name: "Thon Cuit Cheese",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "calispring-saumon-cheese-tobiko",
          name: "Saumon, Cheese, Tobiko",
          description: "",
          price: 6.70,
          image: "/final-img.png"
        },
        {
          id: "calispring-thon-mangue",
          name: "Thon Mangue",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Roll's par 6",
      items: [
        {
          id: "rolls-saumon",
          name: "Saumon",
          description: "",
          price: 8.00,
          image: "/final-img.png"
        },
        {
          id: "rolls-saumon-cheese",
          name: "Saumon Cheese",
          description: "",
          price: 8.50,
          image: "/final-img.png"
        },
        {
          id: "rolls-avocat-cheese",
          name: "Avocat Cheese",
          description: "",
          price: 7.80,
          image: "/final-img.png"
        },
        {
          id: "rolls-cheese",
          name: "Cheese",
          description: "",
          price: 7.50,
          image: "/final-img.png"
        },
        {
          id: "rolls-concombre-avocat",
          name: "Concombre Avocat",
          description: "Enrobé de mangue et saumon",
          price: 8.60,
          image: "/final-img.png"
        },
        {
          id: "rolls-avocat-enrobe",
          name: "Avocat",
          description: "Enrobé de thon, saumon, tobiko",
          price: 8.90,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Flocon par 6",
      items: [
        {
          id: "flocon-saumon",
          name: "Saumon",
          description: "",
          price: 6.40,
          image: "/final-img.png"
        },
        {
          id: "flocon-saumon-cheese",
          name: "Saumon Cheese",
          description: "",
          price: 6.70,
          image: "/final-img.png"
        },
        {
          id: "flocon-saumon-avocat",
          name: "Saumon Avocat",
          description: "",
          price: 6.60,
          image: "/final-img.png"
        },
        {
          id: "flocon-gambas-mayo",
          name: "Gambas Mayo",
          description: "",
          price: 7.40,
          image: "/final-img.png"
        },
        {
          id: "flocon-thon",
          name: "Thon",
          description: "",
          price: 6.40,
          image: "/final-img.png"
        },
        {
          id: "flocon-thon-avocat",
          name: "Thon Avocat",
          description: "",
          price: 6.80,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Buritos",
      items: [
        {
          id: "buritos-saumon-avocat-cheese",
          name: "Saumon Avocat Cheese",
          description: "",
          price: 12.90,
          image: "/final-img.png"
        },
        {
          id: "buritos-poulet-frit-avocat-mayo",
          name: "Poulet Frit Avocat Mayo",
          description: "",
          price: 12.50,
          image: "/final-img.png"
        },
        {
          id: "buritos-poulet-caramelise",
          name: "Poulet Caramélisé",
          description: "",
          price: 12.30,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Chirashi 10 tranches",
      items: [
        {
          id: "chirashi-saumon",
          name: "Saumon",
          description: "",
          price: 16.50,
          image: "/final-img.png"
        },
        {
          id: "chirashi-saumon-avocat",
          name: "Saumon Avocat",
          description: "",
          price: 17.50,
          image: "/final-img.png"
        },
        {
          id: "chirashi-saumon-thon",
          name: "Saumon, Thon",
          description: "",
          price: 17.90,
          image: "/final-img.png"
        },
        {
          id: "chirashi-saumon-thon-avocat",
          name: "Saumon Thon Avocat",
          description: "",
          price: 18.50,
          image: "/final-img.png"
        },
        {
          id: "chirashi-gambas-saumon-thon",
          name: "Gambas, Saumon, Thon",
          description: "",
          price: 18.90,
          image: "/final-img.png"
        },
        {
          id: "chirashi-saumon-avocat-cheese-oignon",
          name: "Saumon Avocat Cheese Oignon Frit",
          description: "",
          price: 17.90,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Nos Accompagnements",
      items: [
        {
          id: "tartare-saumon",
          name: "Tartare Saumon",
          description: "Avocat, mangue, perles de yuzu",
          price: 16.80,
          image: "/final-img.png"
        },
        {
          id: "tartare-thon-saumon",
          name: "Tartare Thon, Saumon",
          description: "Avocat, tobiko",
          price: 17.50,
          image: "/final-img.png"
        },
        {
          id: "salade-algue-wakame",
          name: "Salade Algue Wakame",
          description: "",
          price: 5.00,
          image: "/final-img.png"
        },
        {
          id: "riz-vinaigre",
          name: "Riz Vinaigré",
          description: "",
          price: 3.50,
          image: "/final-img.png"
        },
        {
          id: "salade-edamame",
          name: "Salade Edamame",
          description: "",
          price: 4.50,
          image: "/final-img.png"
        },
        {
          id: "salade-de-chou",
          name: "Salade de Chou",
          description: "",
          price: 3.50,
          image: "/final-img.png"
        },
        {
          id: "salade-de-chou-saumon",
          name: "Salade de Chou Saumon",
          description: "",
          price: 5.40,
          image: "/final-img.png"
        },
        {
          id: "salade-de-chou-thon",
          name: "Salade de Chou Thon",
          description: "",
          price: 5.70,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Desserts",
      items: [
        {
          id: "dessert-du-jour",
          name: "Dessert du Jour",
          description: "",
          price: 5.00,
          image: "/final-img.png"
        },
        {
          id: "gyoza-pomme",
          name: "Gyoza Pomme",
          description: "X3",
          price: 4.00,
          image: "/final-img.png"
        },
        {
          id: "makis-nutella-banane",
          name: "Makis Nutella Banane",
          description: "X6",
          price: 5.70,
          image: "/final-img.png"
        },
        {
          id: "makis-mangue-nutella-coco",
          name: "Makis Mangue Nutella Coco Rapé",
          description: "X6",
          price: 6.20,
          image: "/final-img.png"
        },
        {
          id: "mochi-du-jour",
          name: "Mochi du Jour",
          description: "À l'unité",
          price: 3.00,
          image: "/final-img.png"
        }
      ]
    },
    {
      category: "Boissons",
      items: [
        {
          id: "eau-plate",
          name: "Eau Plate",
          description: "",
          price: 2.00,
          image: "/final-img.png"
        },
        {
          id: "san-pellegrino",
          name: "San Pellegrino",
          description: "",
          price: 2.50,
          image: "/final-img.png"
        },
        {
          id: "oasis",
          name: "Oasis",
          description: "",
          price: 3.50,
          image: "/final-img.png"
        },
        {
          id: "coca-cola",
          name: "Coca Cola",
          description: "",
          price: 3.50,
          image: "/final-img.png"
        },
        {
          id: "coca-cola-zero",
          name: "Coca Cola Zero",
          description: "",
          price: 3.50,
          image: "/final-img.png"
        },
        {
          id: "goyave-litchi",
          name: "Goyave Litchi",
          description: "",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-gingembre",
          name: "Thé Jomo Gingembre",
          description: "",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-mangue",
          name: "Thé Jomo Mangue",
          description: "",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-passion-citron",
          name: "Thé Jomo Passion Citron Vert",
          description: "",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "the-jomo-peche",
          name: "Thé Jomo Pêche",
          description: "",
          price: 3.80,
          image: "/final-img.png"
        },
        {
          id: "desperados-blonde",
          name: "Desperados Blonde",
          description: "",
          price: 4.50,
          image: "/final-img.png"
        },
        {
          id: "kirin",
          name: "Kirin",
          description: "",
          price: 4.00,
          image: "/final-img.png"
        },
        {
          id: "asahi",
          name: "Asahi",
          description: "",
          price: 4.00,
          image: "/final-img.png"
        },
        {
          id: "pietra",
          name: "Pietra",
          description: "",
          price: 4.00,
          image: "/final-img.png"
        }
      ]
    }
  ];

  const combinedLivraisonsMenu = [
    ...menuSurPlace,
    {
      category: "Rolls Spéciaux",
      items: [
        {
          id: "dragon-roll",
          name: "Dragon Roll",
          description: "Avocat, concombre, anguille grillée, sauce teriyaki",
          price: 14,
          image: "/final-img.png"
        },
        {
          id: "rainbow-roll",
          name: "Rainbow Roll",
          description: "Saumon, thon, avocat sur california roll",
          price: 16,
          image: "/final-img.png"
        },
        {
          id: "spicy-tuna-roll",
          name: "Spicy Tuna Roll",
          description: "Thon épicé, mayo sriracha, graines de sésame",
          price: 12,
          image: "/final-img.png"
        },
        {
          id: "philadelphia-roll",
          name: "Philadelphia Roll",
          description: "Saumon fumé, fromage frais, concombre",
          price: 13,
          image: "/final-img.png"
        }
      ]
    }
  ];

  const creations = [
    {
      name: "Sushi Saumon Avocat",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Maki California",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Sashimi Thon",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Chirashi Bowl",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Nigiri Assortiment",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Temaki Saumon",
      image: "/placeholder.svg?height=300&width=400",
    },
  ];
  const reviews = [
    {
      name: "Marie L.",
      rating: 5,
      comment: "Une expérience exceptionnelle ! La qualité est au rendez-vous.",
      date: "Il y a 2 jours",
    },
    {
      name: "Thomas M.",
      rating: 5,
      comment: "Le meilleur sushi de la région. Fraîcheur garantie !",
      date: "Il y a 1 semaine",
    },
    {
      name: "Sophie D.",
      rating: 5,
      comment: "Ambiance authentique et produits d'exception.",
      date: "Il y a 2 semaines",
    },
  ];
  // Temporairement désactivé - les animations seront réactivées plus tard
  // Pour l'instant, on simule que tout est visible
  const heroRef = null;
  const heroInView = true;
  const aboutRef = null;
  const aboutInView = true;
  const menusRef = null;
  const menusInView = true;
  const servicesRef = null;
  const servicesInView = true;
  const creationsRef = null;
  const creationsInView = true;
  const reviewsRef = null;
  const reviewsInView = true;
  const instagramRef = null;
  const instagramInView = true;
  const contactRef = null;
  const contactInView = true;

  const addToCart = (item: { id: any; name: string; price: number; description?: string; image?: string }) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }
  const removeFromCart = (itemId: any) => {
    setCart(cart.filter((item) => item.id !== itemId));
  }
  const updateQuantity = (itemId: any, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
    }
  }
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Carousel states for each tab
  const [currentSlideAEmporter, setCurrentSlideAEmporter] = useState(0);
  
  // Configuration du carousel simple
  const itemsVisible = 3; // 3 catégories visibles à la fois
  const totalItems = menuAEmporter.length; // 18 catégories
  const maxPosition = totalItems - itemsVisible; // Position max = 15 (pour voir les 3 dernières)
  
  const nextSlide = () => {
    setCurrentSlideAEmporter((prev) => Math.min(prev + 1, maxPosition));
  };
  
  const prevSlide = () => {
    setCurrentSlideAEmporter((prev) => Math.max(prev - 1, 0));
  };

  const handleOrderSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Redirection vers la page de commande
    window.location.href = 'https://au-temple-du-sushi-bouc-bel-air.order.app.hd.digital/menus';
  };
  
  const handleOrderClick = () => {
    window.open('https://au-temple-du-sushi-bouc-bel-air.order.app.hd.digital/menus', '_blank');
  };

  // Check loading state after all hooks
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-temple-pink"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Image src="/logo-sushi.png" alt="Au Temple du Sushi" width={60} height={60} className="object-contain" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#accueil" className="text-gray-700 hover:text-temple-pink transition-colors font-medium">
                {t.nav.home}
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-temple-pink transition-colors flex items-center font-medium">
                  {t.nav.menus} <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    href="#libre-service"
                    className="block px-4 py-2 text-gray-700 hover:bg-temple-pink/10 hover:text-temple-pink font-medium"
                  >
                    {language === 'fr' ? 'Libre-Service' : 'Self-Service'}
                  </Link>
                  <Link
                    href="#nos-menus"
                    className="block px-4 py-2 text-gray-700 hover:bg-temple-pink/10 hover:text-temple-pink font-medium"
                  >
                    {t.nav.ourMenus}
                  </Link>
                  <Link
                    href="#nos-creations"
                    className="block px-4 py-2 text-gray-700 hover:bg-temple-pink/10 hover:text-temple-pink font-medium"
                  >
                    {t.nav.ourCreations}
                  </Link>
                </div>
              </div>
              <Link
                href="#qui-sommes-nous"
                className="text-gray-700 hover:text-temple-pink transition-colors font-medium"
              >
                {t.nav.aboutUs}
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-temple-pink transition-colors font-medium"
              >
                {t.nav.contact}
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher className="hidden md:block" />
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} t={t} language={language} />

      {/* Hero Section avec Vidéo */}
      <section
        id="accueil"
        ref={heroRef}
        className={`relative h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted={isVideoMuted} playsInline>
          <source src="/hero3.webm?height=1080&width=1920" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="animate-fade-in-up">
            <TypingAnimation className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-temple-pink bg-clip-text text-transparent">
              {t.hero.title}
            </TypingAnimation>
            <p className="text-xl md:text-2xl mb-8 text-white font-light">{t.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-temple-pink hover:bg-temple-pink/90 text-black px-8 py-4 text-lg font-semibold"
                onClick={() => handleOrderClick()}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t.hero.orderNow}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent font-semibold"
                onClick={() => document.getElementById("nos-menus")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.viewMenu}
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Section Qui sommes-nous */}
      <section
        id="qui-sommes-nous"
        ref={aboutRef}
        className={`py-20 bg-white transition-all duration-1000 ease-in-out ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid lg:grid-cols-2 gap-12 items-center`}
          >
            <div
              className={`transition-all duration-800 ease-in-out ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">{t.about.title}</h2>
              <p className="text-lg text-gray-600 mb-6 font-medium leading-relaxed">
                {t.about.description}
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-temple-pink">
                    <NumberTicker className="text-temple-pink" value={10} />+ </div>
                  <div className="text-sm text-gray-600 font-medium">{t.stats.yearsExperience}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-temple-pink">
                    <NumberTicker className="text-temple-pink" value={1000} />+</div>
                  <div className="text-sm text-gray-600 font-medium">{t.stats.happyCustomers}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-temple-pink">
                    <NumberTicker className="text-temple-pink" value={50} />+</div>
                  <div className="text-sm text-gray-600 font-medium">{t.about.uniqueCreations}</div>
                </div>
              </div>
            </div>
            <div
              className={`transition-all duration-800 ease-in-out ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              <AboutImages />
            </div>
          </div>
        </div>
      </section>

      {/* Section Concept Libre-Service */}
      <section id="libre-service" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Colonne texte */}
            <div className="order-2 lg:order-1 animate-fade-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Concept Libre-Service' : 'Self-Service Concept'}
              </h2>
              <h3 className="text-xl md:text-2xl text-temple-pink mb-6">
                {language === 'fr' ? 'Simplicité et fraîcheur à votre rythme' : 'Simplicity and freshness at your own pace'}
              </h3>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p className="leading-relaxed">
                  {language === 'fr' 
                    ? "Chez Au Temple du Sushi, nous avons révolutionné votre expérience sushi ! Découvrez notre concept unique de libre-service :"
                    : "At Au Temple du Sushi, we've revolutionized your sushi experience! Discover our unique self-service concept:"
                  }
                </p>
                <div className="space-y-3 mt-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">✨</span>
                    <p className="text-gray-700">
                      {language === 'fr' 
                        ? "Choisissez vos plateaux directement dans notre vitrine réfrigérée"
                        : "Choose your platters directly from our refrigerated display"
                      }
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🕐</span>
                    <p className="text-gray-700">
                      {language === 'fr' 
                        ? "Servez-vous à votre rythme, quand vous le souhaitez"
                        : "Serve yourself at your own pace, whenever you want"
                      }
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">💳</span>
                    <p className="text-gray-700">
                      {language === 'fr' 
                        ? "Payez simplement en caisse"
                        : "Simply pay at the checkout"
                      }
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🥢</span>
                    <p className="text-gray-700">
                      {language === 'fr' 
                        ? "Dégustez sur place, à emporter ou en livraison"
                        : "Enjoy on-site, takeaway or delivery"
                      }
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-gray-700 leading-relaxed">
                  {language === 'fr' 
                    ? "Tous nos sushis sont préparés quotidiennement par notre chef avec des ingrédients frais et de qualité premium."
                    : "All our sushis are prepared daily by our chef with fresh and premium quality ingredients."
                  }
                </p>
              </div>
              {/* Call to action */}
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-temple-pink hover:bg-temple-pink/90 text-black font-semibold group"
                  onClick={() => {
                    const element = document.getElementById('nos-menus');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {language === 'fr' ? 'Découvrir notre menu' : 'Discover our menu'}
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Colonne image */}
            <div className="order-1 lg:order-2 animate-fade-in-right">
              <div className="relative aspect-[4/3] lg:aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
                {/* Placeholder image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center p-8">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium text-lg">
                      {language === 'fr' ? 'Photo vitrine à venir' : 'Showcase photo coming soon'}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {language === 'fr' ? 'Vitrine réfrigérée Au Temple du Sushi' : 'Au Temple du Sushi refrigerated display'}
                    </p>
                  </div>
                </div>
                {/* Quand l'image sera disponible, remplacer par :
                <Image
                  src="/vitrine-libre-service.jpg"
                  alt={language === 'fr' ? "Vitrine réfrigérée Au Temple du Sushi - Libre service" : "Au Temple du Sushi refrigerated display - Self service"}
                  fill
                  className="object-cover"
                  priority
                />
                */}
                {/* Overlay décoratif */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              {/* Badge flottant */}
              <div className="mt-6 flex items-center justify-center lg:justify-start space-x-4">
                <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                </div>
                <div className="bg-white rounded-full px-4 py-2 shadow-md">
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'fr' ? 'Service rapide' : 'Fast service'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Menus */}
      <section
        id="nos-menus"
        ref={menusRef}
        className={`py-20 bg-gray-50 transition-all duration-1000 ease-in-out ${menusInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-in-out delay-200 ${menusInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.menu.title}</h2>
            <p className="text-xl text-gray-600 font-medium">
              {t.menu.subtitle}
            </p>
          </div>
          
          {/* Card compacte et animée pour les délais */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {/* Effet de glow animé */}
              <div className="absolute -inset-1 bg-gradient-to-r from-temple-pink/20 via-temple-pink/40 to-temple-pink/20 rounded-xl blur opacity-75 animate-pulse"></div>
              <Card className="relative w-fit bg-white/90 backdrop-blur-sm border-2 border-temple-pink/30 hover:border-temple-pink/60 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105">
                <CardContent className="px-6 py-3">
                  <div className="flex items-center gap-6">
                    {/* Badge "Nouveau" */}
                    <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      ⚡ RAPIDE
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-temple-pink/20 to-temple-pink/30 rounded-full flex items-center justify-center shadow-inner">
                        <ShoppingBag className="w-5 h-5 text-temple-pink" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 font-medium">À emporter</p>
                        <p className="text-lg font-bold text-temple-pink">20-30min</p>
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-temple-pink/50 to-transparent"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-temple-pink/20 to-temple-pink/30 rounded-full flex items-center justify-center shadow-inner">
                        <Package className="w-5 h-5 text-temple-pink" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 font-medium">Livraison</p>
                        <p className="text-lg font-bold text-temple-pink">45min</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Carousel pour le menu */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlideAEmporter * (100/itemsVisible)}%)`
                }}
              >
                {/* Afficher toutes les 18 catégories en ligne */}
                {menuAEmporter.map((category, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 px-4"
                    style={{ width: `${100/itemsVisible}%` }}
                  >
                    <Card className="h-full bg-gradient-to-br from-white via-white to-gray-50/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                      <div className="relative bg-gradient-to-r from-temple-pink/10 via-temple-pink/5 to-temple-pink/10 p-6 border-b border-temple-pink/10">
                        <div className="absolute inset-0 bg-gradient-to-r from-temple-pink/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex items-center justify-center">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-temple-pink/20 rounded-full flex items-center justify-center hover:bg-temple-pink/30 transition-colors duration-300">
                              <UtensilsCrossed className="w-4 h-4 text-temple-pink" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 hover:text-temple-pink transition-colors duration-300">
                              {category.category}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-0">
                        <div className="max-h-96 overflow-y-auto">
                          {category.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="group/item p-4 border-b border-gray-100 last:border-b-0 hover:bg-temple-pink/5 transition-all duration-300"
                            >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-gray-900 group-hover/item:text-temple-pink transition-colors duration-300 truncate pr-2">
                                        {item.name}
                                      </h4>
                                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                        {item.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                      <Badge
                                        variant="outline"
                                        className="bg-temple-pink/10 text-temple-pink border-temple-pink/30 font-bold text-sm px-2 py-1"
                                      >
                                        {item.price}€
                                      </Badge>
                                      <Button
                                        size="sm"
                                        className="bg-gradient-to-r from-temple-pink to-temple-pink/90 hover:from-temple-pink/90 hover:to-temple-pink text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover/item:scale-110"
                                        onClick={() => addToCart(item)}
                                      >
                                        <Plus className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="h-0.5 bg-gradient-to-r from-temple-pink to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 mt-3"></div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1 text-temple-pink" />
                                Service continu
                              </span>
                              <span className="flex items-center font-medium text-temple-pink">
                                <MapPin className="w-4 h-4 mr-1" />
                                Sur place
                              </span>
                            </div>
                          </div>
                        </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Boutons de navigation */}
            {totalItems > itemsVisible && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-temple-pink/90 text-white rounded-full shadow-md z-10 hover:bg-temple-pink/100"
                  onClick={prevSlide}
                  disabled={currentSlideAEmporter === 0}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-temple-pink/90 text-white rounded-full shadow-md z-10 hover:bg-temple-pink/100"
                  onClick={nextSlide}
                  disabled={currentSlideAEmporter === maxPosition}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
            
            {/* Indicateur de position */}
            <div className="flex justify-center mt-8">
              <div className="text-sm text-gray-600">
                Catégories {currentSlideAEmporter + 1}-{Math.min(currentSlideAEmporter + itemsVisible, totalItems)} sur {totalItems}
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-temple-pink to-temple-pink/90 hover:from-temple-pink/90 hover:to-temple-pink text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold flex items-center gap-3 group"
              onClick={() => window.open('/menu.pdf', '_blank')}
            >
              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Voir la carte
            </Button>
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold flex items-center gap-3 group"
              onClick={() => window.location.href = 'tel:+33442220896'}
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform animate-pulse" />
              Réserver par téléphone
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        className={`py-20 bg-white transition-all duration-1000 ease-in-out ${servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-in-out delay-200 ${servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Une expérience complète pour savourer la cuisine japonaise selon vos envies
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Fish,
                title: "Fraîcheur Garantie",
                description: "Poissons sélectionnés quotidiennement auprès des meilleurs fournisseurs pour une qualité exceptionnelle",
              },
              {
                icon: Utensils,
                title: "Service Rapide",
                description: "À emporter en 20-30 minutes ou livraison en 45 minutes pour déguster nos créations où vous voulez",
              },
              {
                icon: Heart,
                title: "Ambiance Zen",
                description: "Un cadre authentique et raffiné pour une expérience culinaire japonaise inoubliable",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-2 ${servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-temple-pink/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-temple-pink/20 transition-colors duration-300 ease-in-out">
                    <service.icon className="w-8 h-8 text-temple-pink" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 font-medium">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Nos Créations avec Images */}
      <section
        id="nos-creations"
        ref={creationsRef}
        className={`py-20 bg-gray-50 transition-all duration-1000 ease-in-out ${creationsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <NosCreations />
      </section>

      {/* Reviews Section */}
      <section
        ref={reviewsRef}
        className={`py-20 bg-gray-50 transition-all duration-1000 ease-in-out ${reviewsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-in-out delay-200 ${reviewsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
            <GoogleReviews />
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section
        ref={instagramRef}
        className={`py-10 bg-gray-50 transition-all duration-1000 ease-in-out ${instagramInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-in-out delay-200 ${instagramInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">{t.footer.followUs}</h2>
            <InstagramFeed />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`relative py-20 bg-gray-900 text-white overflow-hidden transition-all duration-1000 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className={`text-center mb-16 transition-all duration-800 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-temple-pink bg-clip-text text-transparent">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact Form */}
            <div className={`transition-all duration-800 ease-in-out h-full ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`} style={{ transitionDelay: "200ms" }}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-temple-pink/20 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-temple-pink" />
                  </div>
                  <h3 className="text-2xl font-bold">{t.contact.form.send}</h3>
                </div>
                <form className="space-y-6 flex-grow">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <Input
                        placeholder={t.contact.form.namePlaceholder}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <div className="relative group">
                      <Input
                        placeholder={t.contact.form.emailPlaceholder}
                        type="email"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative group">
                    <Input
                      placeholder={t.contact.form.message}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <div className="relative group">
                    <Textarea
                      placeholder={t.contact.form.messagePlaceholder}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500 resize-none"
                      rows={5}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <Button className="w-full h-14 bg-gradient-to-r from-temple-pink to-pink-400 hover:from-pink-400 hover:to-temple-pink text-gray-900 font-bold text-lg rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-temple-pink/30 transform">
                    <Send className="w-5 h-5 mr-2" />
                    {t.contact.form.send}
                  </Button>
                </form>
              </div>
            </div>
            {/* Contact Info */}
            <div className={`space-y-6 transition-all duration-800 ease-in-out h-full ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "400ms" }}>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: t.contact.info.location,
                    content: "2010 Av. de la Croix d\'Or\n13320 Bouc-Bel-Air",
                    color: "from-blue-500 to-blue-600",
                    bgColor: "bg-blue-500/20"
                  },
                  {
                    icon: Phone,
                    title: t.contact.info.phone,
                    content: "06 61 38 75 45",
                    color: "from-green-500 to-green-600",
                    bgColor: "bg-green-500/20"
                  },
                  {
                    icon: Clock,
                    title: t.contact.info.hours,
                    content: "Mar - Sam: 11h30 - 14h00, 18h00 - 22h00\nDimanche: 18h00 - 22h00\nLundi: Fermé",
                    color: "from-orange-500 to-orange-600",
                    bgColor: "bg-orange-500/20"
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-lg cursor-pointer ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${600 + index * 150}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 ${item.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-6 h-6 text-temple-pink`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 whitespace-pre-line leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Social Media Section */}
              <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all duration-800 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "1050ms" }}>
                <h3 className="text-xl font-bold mb-4 text-center">{t.footer.followUs}</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a href="https://www.facebook.com/share/19UwPk6Ejc/?mibextid=wwXIfr" className="group p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center">
                    <Facebook className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </a>
                  <a href="https://www.instagram.com/autempledusushi__/" className="group p-3 bg-pink-600/20 hover:bg-pink-600/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20 flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors duration-300" />
                  </a>
                  <a href="https://www.tiktok.com/@au.temple.du.sushi?_t=ZN-8yW8HFTq4ta&_r=1" className="group p-3 bg-gray-900 hover:bg-gray-900/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-gray-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors duration-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                  <a href="https://g.co/kgs/uvnoQDs" className="group p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center">
                    <Image src="/google.svg" alt="google" width={26} height={26} className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                  </a>
                </div>
                <p className="text-center text-gray-400 text-sm mt-3">
                  Facebook • Instagram • Tiktok • Google Business
                </p>
              </div>
            </div>
          </div>
          {/* Google Maps - Full Width Below */}
          <div
            className={`mt-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 transition-all duration-800 ease-in-out hover:border-gray-600/50 ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "1200ms" }}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">Nous Trouver</h3>
            </div>
            <div className="rounded-xl overflow-hidden h-80 relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4099.657450652335!2d5.395389176969172!3d43.44936186558957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c99366e46187f9%3A0x5562ae9155d32d69!2sAu%20temple%20du%20sushi!5e1!3m2!1sfr!2sfr!4v1754385007549!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Au Temple du Sushi"
                className="transition-all duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-temple-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
            </div>
          </div>
          {/* Bottom CTA */}
        </div>
      </section>

      {/* Section Pages Populaires pour le SEO */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Découvrez nos services à proximité</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Liens vers les principales pages SEO */}
            <Link href="/restaurant-japonais-bouc-bel-air" className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 text-temple-pink mb-3" />
                  <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors">
                    Restaurant à Bouc-Bel-Air
                  </h3>
                  <p className="text-gray-600 text-sm">Notre restaurant principal avec salle zen</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/sushi-aix-en-provence" className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Truck className="w-8 h-8 text-temple-pink mb-3" />
                  <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors">
                    Livraison Aix-en-Provence
                  </h3>
                  <p className="text-gray-600 text-sm">Sushis livrés en 45 minutes</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/sushi-plan-de-campagne" className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <ShoppingBag className="w-8 h-8 text-temple-pink mb-3" />
                  <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors">
                    Sushi Plan de Campagne
                  </h3>
                  <p className="text-gray-600 text-sm">À emporter près des boutiques</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/sushi-gardanne" className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-temple-pink mb-3" />
                  <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors">
                    Livraison Gardanne
                  </h3>
                  <p className="text-gray-600 text-sm">Service rapide 30 minutes</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/restaurant-japonais-les-milles" className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Utensils className="w-8 h-8 text-temple-pink mb-3" />
                  <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors">
                    Restaurant Les Milles
                  </h3>
                  <p className="text-gray-600 text-sm">Zone commerciale Les Milles</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/sushi-cabries" className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Heart className="w-8 h-8 text-temple-pink mb-3" />
                  <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors">
                    Sushi Cabriès
                  </h3>
                  <p className="text-gray-600 text-sm">Village provençal authentique</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog" className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <FileText className="w-8 h-8 text-temple-pink mb-3" />
                  <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors">
                    Blog & Conseils
                  </h3>
                  <p className="text-gray-600 text-sm">Découvrez la cuisine japonaise</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/meilleur-restaurant-japonais-bouc-bel-air" className="group">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Star className="w-8 h-8 text-temple-pink mb-3" />
                  <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors">
                    Top Restaurant Japonais
                  </h3>
                  <p className="text-gray-600 text-sm">Notre sélection qualité</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Section zones de livraison */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6">Zones de livraison de sushis</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-temple-pink mb-2">Zone Express (30 min)</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Bouc-Bel-Air centre</li>
                  <li>• Gardanne</li>
                  <li>• Biver</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-temple-pink mb-2">Zone Rapide (45 min)</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Aix-en-Provence</li>
                  <li>• Plan de Campagne</li>
                  <li>• Cabriès</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-temple-pink mb-2">Zone Standard (60 min)</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Les Milles</li>
                  <li>• Luynes</li>
                  <li>• La Duranne</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-temple-pink mb-2">Autres zones</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Simiane-Collongue</li>
                  <li>• Calas</li>
                  <li>• Meyreuil</li>
                </ul>
              </div>
            </div>
            <p className="text-center mt-6 text-gray-600">
              <strong>Minimum de commande : 25€</strong> | 
              <Link href="/restaurant-japonais-bouc-bel-air" className="text-temple-pink hover:underline ml-2">
                En savoir plus →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* SEO Footer avec maillage interne */}
      <SEOFooter />

      {/* Modal de Commande */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-temple-pink">Votre Commande</DialogTitle>
          </DialogHeader>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Liste des plats */}
            <div>
              <h3 className="text-xl font-bold mb-4">Nos Plats</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {[...menuSurPlace, ...menuAEmporter].flatMap((category) =>
                  category.items.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="font-bold text-temple-pink">{item.price}€</p>
                          </div>
                          <Button
                            size="sm"
                            className="bg-temple-pink hover:bg-temple-pink/90"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
            {/* Panier et formulaire */}
            <div>
              <h3 className="text-xl font-bold mb-4">Votre Panier</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500 mb-6">Votre panier est vide</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.price}€ x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold">{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-temple-pink">{getTotalPrice()}€</span>
                    </div>
                  </div>
                </div>
              )}
              {cart.length > 0 && (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <Button asChild className="w-full bg-temple-pink text-black hover:bg-temple-pink/90 font-semibold">
                    <Link href="tel:+33661387545">
                      <Phone className="w-5 h-5 mr-2" />
                      Contactez le restaurant
                    </Link>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating CTA */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <Button
          size="lg"
          className="bg-temple-pink hover:bg-temple-pink/90 text-black shadow-lg rounded-full px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold relative"
          onClick={() => setIsOrderModalOpen(true)}
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Réserver
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  )
}
