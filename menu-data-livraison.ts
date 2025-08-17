// Menu complet à emporter/livraison - Au Temple du Sushi
export const menuLivraison = [
  // SUPPRESSION COMPLETE de la section "Boissons avec Alcool"
  
  // BOISSONS
  {
    category: "Boissons",
    items: [
      {
        id: "eau-plate",
        name: "Eau Plate",
        description: "",
        price: 2.30,
        image: "/final-img.png"
      },
      {
        id: "san-pellegrino",
        name: "San Pellegrino",
        description: "",
        price: 2.90,
        image: "/final-img.png"
      },
      {
        id: "oasis",
        name: "Oasis",
        description: "",
        price: 4.00,
        image: "/final-img.png"
      },
      {
        id: "coca-cola",
        name: "Coca Cola",
        description: "",
        price: 4.00,
        image: "/final-img.png"
      },
      {
        id: "coca-cola-zero",
        name: "Coca Cola Zero",
        description: "",
        price: 4.00,
        image: "/final-img.png"
      },
      {
        id: "goyave-litchi",
        name: "Goyave Litchi",
        description: "",
        price: 4.40,
        image: "/final-img.png"
      },
      {
        id: "the-jomo-gingembre",
        name: "Thé Jomo Gingembre",
        description: "",
        price: 4.40,
        image: "/final-img.png"
      },
      {
        id: "the-jomo-mangue",
        name: "Thé Jomo Mangue",
        description: "",
        price: 4.40,
        image: "/final-img.png"
      },
      {
        id: "the-jomo-passion-citron",
        name: "Thé Jomo Passion Citron Vert",
        description: "",
        price: 4.40,
        image: "/final-img.png"
      },
      {
        id: "the-jomo-peche",
        name: "Thé Jomo Pêche",
        description: "",
        price: 4.40,
        image: "/final-img.png"
      },
      {
        id: "desperados-blonde",
        name: "Desperados Blonde",
        description: "",
        price: 5.20,
        image: "/final-img.png"
      },
      {
        id: "kirin",
        name: "Kirin",
        description: "",
        price: 4.60,
        image: "/final-img.png"
      },
      {
        id: "asahi",
        name: "Asahi",
        description: "",
        price: 4.60,
        image: "/final-img.png"
      },
      {
        id: "pietra",
        name: "Pietra",
        description: "",
        price: 4.60,
        image: "/final-img.png"
      }
    ]
  },

  // FORMULES DU MIDI - PRIX MIS À JOUR
  {
    category: "Formules du Midi",
    items: [
      {
        id: "formule-a",
        name: "Formule A",
        description: "Entrée au choix offerte (soupe miso, riz vinaigré, salade edamame ou wakame) + 6 California saumon avocat + 6 Flocon saumon + 6 Makis saumon + 1 Sushi saumon",
        price: 24.20,
        image: "/final-img.png",
        isPopular: true
      },
      {
        id: "formule-b",
        name: "Formule B",
        description: "6 California saumon avocat tobiko + 6 California saumon cheese + 1 Sushi saumon + 1 Dessert du jour + 1 Boisson soft",
        price: 20.70,
        image: "/final-img.png"
      },
      {
        id: "formule-c",
        name: "Formule C",
        description: "Poke bowl au choix + 1 Dessert du jour + 1 Boisson soft",
        price: 21.90,
        image: "/final-img.png",
        isNew: true
      }
    ]
  },

  // PLATEAUX
  {
    category: "Plateaux",
    items: [
      {
        id: "plateau-makis",
        name: "Plateau Makis (18 pièces)",
        description: "3 saumon + 3 thon + 3 avocat + 3 concombre cheese + 3 cheese + 3 avocat mayo",
        price: 17.80,
        image: "/final-img.png"
      },
      {
        id: "super-box",
        name: "Super Box (14 pièces)",
        description: "6 makis saumon cheese + 6 makis thon + 1 sushi saumon avocat + 1 sushi saumon braisé",
        price: 19.00,
        image: "/final-img.png"
      },
      {
        id: "plateau-california",
        name: "Plateau California (18 pièces)",
        description: "3 saumon avocat + 3 saumon avocat tobiko + 3 saumon cheese + 3 crevette tempura mayo + 3 saumon mangue menthe + 3 thon avocat",
        price: 21.30,
        image: "/final-img.png"
      },
      {
        id: "box-sushi-saumon",
        name: "Box Sushi Saumon (10 pièces)",
        description: "10 sushi saumon",
        price: 23.60,
        image: "/final-img.png"
      },
      {
        id: "chicken-box",
        name: "Chicken Box (24 pièces)",
        description: "6 calispring poulet frit avocat cheese + 6 california poulet frit cheddar oignon frit + 6 makis poulet curry + 6 makis poulet cheese",
        price: 27.60,
        image: "/final-img.png"
      },
      {
        id: "box-sushi-mix",
        name: "Box Sushi Mix (12 pièces)",
        description: "2 sushi saumon + 2 sushi thon + 1 sushi saumon braisé + 1 sushi thon braisé + 1 sushi saumon avocat jalapeno + 1 sushi saumon ciboulette + 1 sushi saumon tobiko + 1 sushi saumon spicy tobiko + 1 sushi saumon avocat + 1 sushi saumon mangue",
        price: 29.30,
        image: "/final-img.png",
        isNew: true,
        isPopular: true
      },
      {
        id: "love-box",
        name: "Love Box (24 pièces)",
        description: "6 makis cheese + 6 california gambas cheese + 6 flocon saumon + 6 rolls saumon",
        price: 29.30,
        image: "/final-img.png"
      },
      {
        id: "calibox",
        name: "Calibox (30 pièces)",
        description: "3 california saumon avocat + 3 california saumon avocat tobiko + 6 flocon saumon cheese + 6 makis thon avocat + 6 makis concombre cheese + 6 calispring thon cuit mayonnaise",
        price: 35.10,
        image: "/final-img.png"
      },
      {
        id: "plateaux-chaud",
        name: "Plateaux Chaud (26 pièces)",
        description: "Samoussa boeuf + samoussa poulet + gyoza porc + gyoza poulet curry + nem légume + crevette tempura + nem crevette + karaage",
        price: 40.30,
        image: "/final-img.png"
      },
      {
        id: "box-sushi-duo",
        name: "Box Sushi Duo (20 pièces)",
        description: "10 sushi saumon + 10 sushi thon",
        price: 51.80,
        image: "/final-img.png"
      },
      {
        id: "family-box",
        name: "Family Box (46 pièces)",
        description: "6 makis saumon + 6 makis thon + 6 california saumon avocat sésame + 6 rolls avocat concombre enrobé de mangue et saumon + 6 roll's avocat cheese + 6 flocon saumon cheese + 2 sushi saumon + 2 sushi thon + 3 sashimi saumon + 3 sashimi thon",
        price: 69.60,
        image: "/final-img.png"
      },
      {
        id: "plateau-premium",
        name: "Plateau (60 pièces)",
        description: "6 roll's avocat enrobé de saumon braisé sauce truffe + 6 california crevette tempura mayo + 2 sushi saumon + 2 sushi thon + 6 roll's saumon + 6 flocon saumon avocat + 4 sashimi thon + 4 sashimi saumon + 6 makis thon cru cheese + 6 california gambas cheese oignon frit + 6 roll's saumon braisé avocat sauce spicy bille citronnée + 6 california saumon avocat",
        price: 97.20,
        image: "/final-img.png"
      }
    ]
  },

  // PLATS CHAUDS
  {
    category: "Plats Chauds",
    items: [
      {
        id: "soupe-miso-tofu",
        name: "Soupe Miso Tofu",
        description: "",
        price: 5.30,
        image: "/final-img.png"
      },
      {
        id: "soupe-miso-tofu-wakame",
        name: "Soupe Miso Tofu, Wakame, Ciboulette",
        description: "",
        price: 5.50,
        image: "/final-img.png"
      },
      {
        id: "soupe-miso-tofu-algue",
        name: "Soupe Miso Tofu, Algue Séché, Edamame",
        description: "",
        price: 5.60,
        image: "/final-img.png"
      },
      {
        id: "nem-legumes",
        name: "Nem Légumes",
        description: "X5",
        price: 7.50,
        image: "/final-img.png"
      },
      {
        id: "nem-poulet",
        name: "Nem Poulet",
        description: "X5",
        price: 7.80,
        image: "/final-img.png"
      },
      {
        id: "poulet-karaage",
        name: "Poulet Karaage",
        description: "Sauce cocktail (X5)",
        price: 7.80,
        image: "/final-img.png"
      },
      {
        id: "nem-crevettes",
        name: "Nem Crevettes",
        description: "X5",
        price: 8.40,
        image: "/final-img.png"
      },
      {
        id: "gyoza-poulet-curry",
        name: "Gyoza Poulet Curry",
        description: "X5",
        price: 8.50,
        image: "/final-img.png"
      },
      {
        id: "samoussa-boeuf",
        name: "Samoussa Bœuf",
        description: "X5",
        price: 8.60,
        image: "/final-img.png"
      },
      {
        id: "samoussa-poulet",
        name: "Samoussa Poulet",
        description: "X5",
        price: 8.70,
        image: "/final-img.png"
      },
      {
        id: "gyoza-porc",
        name: "Gyoza Porc",
        description: "X5",
        price: 8.70,
        image: "/final-img.png"
      },
      {
        id: "crevettes-tempura",
        name: "Crevettes Tempura",
        description: "X4",
        price: 8.90,
        image: "/final-img.png"
      },
      {
        id: "gyoza-crevette",
        name: "Gyoza Crevette",
        description: "X5",
        price: 9.00,
        image: "/final-img.png"
      },
      {
        id: "poulet-frit",
        name: "Poulet Frit",
        description: "Accompagné de riz vinaigré",
        price: 12.10,
        image: "/final-img.png"
      },
      {
        id: "yakitori-poulet-caramelise",
        name: "Yakitori Poulet Caramélisé",
        description: "Accompagné de riz vinaigré (X5)",
        price: 12.50,
        image: "/final-img.png"
      },
      {
        id: "poulet-teriyaki",
        name: "Poulet Teriyaki",
        description: "Accompagné de riz vinaigré",
        price: 13.00,
        image: "/final-img.png"
      },
      {
        id: "nouilles-legumes",
        name: "Nouilles Légumes",
        description: "",
        price: 14.80,
        image: "/final-img.png"
      },
      {
        id: "nouilles-poulet-caramelise-et-legumes",
        name: "Nouilles Poulet Caramélisé et Légumes",
        description: "",
        price: 15.90,
        image: "/final-img.png"
      },
      {
        id: "nouilles-poulet-teriyaki-et-legumes",
        name: "Nouilles Poulet Teriyaki et Légumes",
        description: "",
        price: 16.00,
        image: "/final-img.png"
      },
      {
        id: "nouilles-crevettes-et-legumes",
        name: "Nouilles Crevettes et Légumes",
        description: "",
        price: 16.60,
        image: "/final-img.png"
      }
    ]
  },

  // MAKIS PAR 6
  {
    category: "Makis par 6",
    items: [
      {
        id: "makis-cheese",
        name: "Cheese",
        description: "",
        price: 5.60,
        image: "/final-img.png"
      },
      {
        id: "makis-concombre-cheese",
        name: "Concombre, Cheese",
        description: "",
        price: 5.60,
        image: "/final-img.png"
      },
      {
        id: "makis-avocat",
        name: "Avocat",
        description: "",
        price: 5.60,
        image: "/final-img.png"
      },
      {
        id: "makis-avocat-mayo",
        name: "Avocat, Mayo",
        description: "",
        price: 5.90,
        image: "/final-img.png"
      },
      {
        id: "makis-poulet-cheese",
        name: "Poulet, Cheese",
        description: "",
        price: 6.20,
        image: "/final-img.png"
      },
      {
        id: "makis-poulet-curry",
        name: "Poulet Curry",
        description: "",
        price: 6.20,
        image: "/final-img.png"
      },
      {
        id: "makis-poulet-mayonnaise",
        name: "Poulet, Mayonnaise",
        description: "",
        price: 6.30,
        image: "/final-img.png"
      },
      {
        id: "makis-saumon",
        name: "Saumon",
        description: "",
        price: 6.70,
        image: "/final-img.png"
      },
      {
        id: "makis-saumon-cheese",
        name: "Saumon, Cheese",
        description: "",
        price: 7.10,
        image: "/final-img.png"
      },
      {
        id: "makis-thon",
        name: "Thon",
        description: "",
        price: 7.60,
        image: "/final-img.png"
      },
      {
        id: "makis-thon-mayonnaise",
        name: "Thon, Mayonnaise",
        description: "",
        price: 7.70,
        image: "/final-img.png"
      },
      {
        id: "makis-thon-cheese",
        name: "Thon, Cheese",
        description: "",
        price: 7.80,
        image: "/final-img.png"
      },
      {
        id: "makis-gambas",
        name: "Gambas",
        description: "",
        price: 7.90,
        image: "/final-img.png"
      },
      {
        id: "makis-thon-avocat",
        name: "Thon, Avocat",
        description: "",
        price: 7.90,
        image: "/final-img.png"
      }
    ]
  },

  // CALIFORNIA PAR 6
  {
    category: "California par 6",
    items: [
      {
        id: "california-poulet-cheese",
        name: "Poulet, Cheese",
        description: "",
        price: 6.80,
        image: "/final-img.png"
      },
      {
        id: "california-saumon-cheese",
        name: "Saumon Cheese",
        description: "",
        price: 6.90,
        image: "/final-img.png"
      },
      {
        id: "california-poulet-avocat",
        name: "Poulet, Avocat",
        description: "",
        price: 7.10,
        image: "/final-img.png"
      },
      {
        id: "california-poulet-curry",
        name: "Poulet Curry",
        description: "",
        price: 7.10,
        image: "/final-img.png"
      },
      {
        id: "california-saumon-avocat",
        name: "Saumon, Avocat",
        description: "",
        price: 7.40,
        image: "/final-img.png"
      },
      {
        id: "california-saumon-avocat-tobiko",
        name: "Saumon, Avocat, Tobiko",
        description: "",
        price: 7.50,
        image: "/final-img.png"
      },
      {
        id: "california-crevette-tempura-mayo",
        name: "Crevette Tempura, Mayo",
        description: "",
        price: 7.50,
        image: "/final-img.png"
      },
      {
        id: "california-crevette-tempura-avocat",
        name: "Crevette Tempura, Avocat",
        description: "",
        price: 7.60,
        image: "/final-img.png"
      },
      {
        id: "california-poulet-frit-cheddar",
        name: "Poulet Frit, Cheddar, Oignon Frit",
        description: "",
        price: 7.80,
        image: "/final-img.png"
      },
      {
        id: "california-saumon-mangue-menthe",
        name: "Saumon, Mangue, Menthe",
        description: "",
        price: 7.80,
        image: "/final-img.png"
      },
      {
        id: "california-thon-avocat",
        name: "Thon, Avocat",
        description: "",
        price: 7.90,
        image: "/final-img.png"
      },
      {
        id: "california-gambas-cheese",
        name: "Gambas, Cheese",
        description: "",
        price: 8.70,
        image: "/final-img.png"
      },
      {
        id: "california-gambas-cheese-oignon",
        name: "Gambas, Cheese, Oignon Frit",
        description: "",
        price: 8.90,
        image: "/final-img.png"
      },
      {
        id: "california-gambas-cheese-avocat",
        name: "Gambas, Cheese, Avocat",
        description: "",
        price: 9.00,
        image: "/final-img.png"
      }
    ]
  },

  // SASHIMI PAR 6
  {
    category: "Sashimi par 6",
    items: [
      {
        id: "sashimi-saumon",
        name: "Saumon",
        description: "",
        price: 10.70,
        image: "/final-img.png"
      },
      {
        id: "sashimi-thon",
        name: "Thon",
        description: "",
        price: 12.50,
        image: "/final-img.png"
      },
      {
        id: "sashimi-duo",
        name: "Duo",
        description: "4 Saumon - 4 Thon",
        price: 13.70,
        image: "/final-img.png"
      }
    ]
  },

  // SUSHI À L'UNITÉ
  {
    category: "Sushi à l'unité",
    items: [
      {
        id: "sushi-saumon",
        name: "Saumon",
        description: "",
        price: 2.50,
        image: "/final-img.png"
      },
      {
        id: "sushi-saumon-avocat",
        name: "Saumon Avocat",
        description: "",
        price: 2.60,
        image: "/final-img.png"
      },
      {
        id: "sushi-saumon-ciboulette",
        name: "Saumon Ciboulette",
        description: "",
        price: 2.60,
        image: "/final-img.png"
      },
      {
        id: "sushi-saumon-cheese",
        name: "Saumon Cheese",
        description: "",
        price: 2.60,
        image: "/final-img.png"
      },
      {
        id: "sushi-saumon-tobiko",
        name: "Saumon, Tobiko",
        description: "",
        price: 2.60,
        image: "/final-img.png"
      },
      {
        id: "sushi-saumon-braise",
        name: "Saumon Braisé",
        description: "",
        price: 2.80,
        image: "/final-img.png"
      },
      {
        id: "sushi-saumon-avocat-jalapeno",
        name: "Saumon Avocat Jalapeno",
        description: "",
        price: 2.80,
        image: "/final-img.png"
      },
      {
        id: "sushi-thon",
        name: "Thon",
        description: "",
        price: 2.90,
        image: "/final-img.png"
      },
      {
        id: "sushi-thon-braise",
        name: "Thon Braisé",
        description: "",
        price: 3.00,
        image: "/final-img.png"
      },
      {
        id: "sushi-saumon-mangue",
        name: "Saumon Mangue",
        description: "",
        price: 3.10,
        image: "/final-img.png"
      },
      {
        id: "sushi-saumon-braise-spicy",
        name: "Saumon Braisé, Sauce Spicy, Tobiko",
        description: "",
        price: 3.10,
        image: "/final-img.png"
      },
      {
        id: "sushi-saumon-braise-truffe",
        name: "Saumon Braisé, Truffe",
        description: "",
        price: 4.30,
        image: "/final-img.png"
      }
    ]
  },

  // CRÉATION DU CHEF PAR 6
  {
    category: "Création du Chef par 6",
    items: [
      {
        id: "flocon-saumon-avocat-menthe",
        name: "Flocon Saumon Avocat",
        description: "Tobiko, menthe",
        price: 8.50,
        image: "/final-img.png"
      },
      {
        id: "avocat-mayo-thon",
        name: "Avocat Mayo",
        description: "Enrobé de thon braisé, pousse de cress",
        price: 9.80,
        image: "/final-img.png"
      },
      {
        id: "rolls-saumon-braise",
        name: "Rolls Saumon Braisé",
        description: "Avocat, sauce spicy, billes citronnées",
        price: 10.10,
        image: "/final-img.png"
      },
      {
        id: "california-crevette-tempura-enrobe",
        name: "California Crevette Tempura",
        description: "Avocat, enrobé de saumon braisé, oignon frit",
        price: 10.20,
        image: "/final-img.png"
      },
      {
        id: "california-poulet-frit-guacamole",
        name: "California Poulet Frit",
        description: "Guacamole, jalapeno, oignon frit",
        price: 10.80,
        image: "/final-img.png"
      },
      {
        id: "california-poulet-caramelise-mangue",
        name: "California Poulet Caramélisé",
        description: "Enrobé de mangue, tobiko",
        price: 11.30,
        image: "/final-img.png"
      },
      {
        id: "rolls-avocat-thon",
        name: "Rolls Avocat",
        description: "Enrobé de thon, zeste de pêche, tobiko",
        price: 11.80,
        image: "/final-img.png"
      },
      {
        id: "california-saumon-guacamole",
        name: "California Saumon",
        description: "Guacamole jalapeno",
        price: 13.20,
        image: "/final-img.png"
      },
      {
        id: "l-italien",
        name: "L'Italien",
        description: "Tomate, mozza, parmesan, pesto",
        price: 13.60,
        image: "/final-img.png"
      },
      {
        id: "california-saumon-braise-truffe",
        name: "California Saumon Braisé",
        description: "Enrobé de saumon braisé, truffe",
        price: 14.40,
        image: "/final-img.png"
      },
      {
        id: "rolls-avocat-truffe",
        name: "Roll's Avocat Truffe",
        description: "Enrobé de saumon braisé, sauce truffe",
        price: 15.90,
        image: "/final-img.png"
      }
    ]
  },

  // CRISPYS (FRIT) PAR 6
  {
    category: "Crispys (frit) par 6",
    items: [
      {
        id: "saumon-cheese-crispy",
        name: "Saumon Cheese",
        description: "",
        price: 11.80,
        image: "/final-img.png"
      },
      {
        id: "cheese-saumon-tartare",
        name: "Cheese Saumon Tartare",
        description: "Façon tartare ciboulette",
        price: 12.90,
        image: "/final-img.png"
      },
      {
        id: "poulet-frit-cheddar-crispy",
        name: "Poulet Frit Cheddar",
        description: "Oignon frit",
        price: 13.20,
        image: "/final-img.png"
      },
      {
        id: "saumon-cuit-cheese-fraise",
        name: "Saumon Cuit Cheese Fraise",
        description: "Sauce du chef",
        price: 13.20,
        image: "/final-img.png"
      },
      {
        id: "saumon-avocat-cheese-crispy",
        name: "Saumon Avocat Cheese",
        description: "Oignon frit",
        price: 14.10,
        image: "/final-img.png"
      },
      {
        id: "crevette-tempura-saumon-crispy",
        name: "Crevette Tempura Saumon",
        description: "Sauce du chef, billes citronnées",
        price: 14.10,
        image: "/final-img.png"
      },
      {
        id: "crevette-tempura-cheese-crispy",
        name: "Crevette Tempura Cheese",
        description: "Ciboulette oignon frit sauce spicy",
        price: 14.30,
        image: "/final-img.png"
      }
    ]
  },

  // CALISPRING PAR 6
  {
    category: "Calispring par 6",
    items: [
      {
        id: "calispring-saumon",
        name: "Saumon",
        description: "",
        price: 7.50,
        image: "/final-img.png"
      },
      {
        id: "calispring-poulet-frit-avocat",
        name: "Poulet Frit Avocat",
        description: "",
        price: 7.60,
        image: "/final-img.png"
      },
      {
        id: "calispring-thon-cuit-cheese",
        name: "Thon Cuit Cheese",
        description: "",
        price: 7.60,
        image: "/final-img.png"
      },
      {
        id: "calispring-thon-cuit-mayo",
        name: "Thon Cuit Mayo",
        description: "",
        price: 7.70,
        image: "/final-img.png"
      },
      {
        id: "calispring-saumon-cheese-tobiko",
        name: "Saumon, Cheese, Tobiko",
        description: "",
        price: 7.70,
        image: "/final-img.png"
      },
      {
        id: "calispring-thon-mangue",
        name: "Thon Mangue",
        description: "",
        price: 7.80,
        image: "/final-img.png"
      },
      {
        id: "calispring-poulet-frit-avocat-cheese",
        name: "Poulet Frit Avocat Cheese",
        description: "",
        price: 7.90,
        image: "/final-img.png"
      },
      {
        id: "calispring-gambas-avocat",
        name: "Gambas Avocat",
        description: "",
        price: 8.40,
        image: "/final-img.png"
      },
      {
        id: "calispring-gambas-cheese",
        name: "Gambas Cheese",
        description: "",
        price: 8.50,
        image: "/final-img.png"
      }
    ]
  },

  // ROLL'S PAR 6
  {
    category: "Roll's par 6",
    items: [
      {
        id: "rolls-cheese",
        name: "Cheese",
        description: "",
        price: 8.60,
        image: "/final-img.png"
      },
      {
        id: "rolls-avocat-cheese",
        name: "Avocat Cheese",
        description: "",
        price: 9.00,
        image: "/final-img.png"
      },
      {
        id: "rolls-saumon",
        name: "Saumon",
        description: "",
        price: 9.20,
        image: "/final-img.png"
      },
      {
        id: "rolls-saumon-cheese",
        name: "Saumon Cheese",
        description: "",
        price: 9.80,
        image: "/final-img.png"
      },
      {
        id: "rolls-concombre-avocat",
        name: "Concombre Avocat",
        description: "Enrobé de mangue et saumon",
        price: 9.90,
        image: "/final-img.png"
      },
      {
        id: "rolls-avocat-enrobe",
        name: "Avocat",
        description: "Enrobé de thon, saumon, tobiko",
        price: 10.20,
        image: "/final-img.png"
      }
    ]
  },

  // FLOCON PAR 6
  {
    category: "Flocon par 6",
    items: [
      {
        id: "flocon-saumon",
        name: "Saumon",
        description: "",
        price: 7.40,
        image: "/final-img.png"
      },
      {
        id: "flocon-thon",
        name: "Thon",
        description: "",
        price: 7.40,
        image: "/final-img.png"
      },
      {
        id: "flocon-saumon-avocat",
        name: "Saumon Avocat",
        description: "",
        price: 7.60,
        image: "/final-img.png"
      },
      {
        id: "flocon-saumon-cheese",
        name: "Saumon Cheese",
        description: "",
        price: 7.70,
        image: "/final-img.png"
      },
      {
        id: "flocon-thon-avocat",
        name: "Thon Avocat",
        description: "",
        price: 7.80,
        image: "/final-img.png"
      },
      {
        id: "flocon-gambas-mayo",
        name: "Gambas Mayo",
        description: "",
        price: 8.50,
        image: "/final-img.png"
      }
    ]
  },

  // BURITOS
  {
    category: "Buritos",
    items: [
      {
        id: "buritos-poulet-caramelise",
        name: "Poulet Caramélisé",
        description: "",
        price: 14.10,
        image: "/final-img.png"
      },
      {
        id: "buritos-poulet-frit-avocat-mayo",
        name: "Poulet Frit Avocat Mayo",
        description: "",
        price: 14.40,
        image: "/final-img.png"
      },
      {
        id: "buritos-saumon-avocat-cheese",
        name: "Saumon Avocat Cheese",
        description: "",
        price: 14.80,
        image: "/final-img.png"
      }
    ]
  },

  // CHIRASHI 10 TRANCHES
  {
    category: "Chirashi 10 tranches",
    items: [
      {
        id: "chirashi-saumon",
        name: "Saumon",
        description: "",
        price: 19.00,
        image: "/final-img.png"
      },
      {
        id: "chirashi-saumon-avocat",
        name: "Saumon Avocat",
        description: "",
        price: 20.10,
        image: "/final-img.png"
      },
      {
        id: "chirashi-saumon-thon",
        name: "Saumon, Thon",
        description: "",
        price: 20.60,
        image: "/final-img.png"
      },
      {
        id: "chirashi-saumon-avocat-cheese-oignon",
        name: "Saumon Avocat Cheese Oignon Frit",
        description: "",
        price: 20.60,
        image: "/final-img.png"
      },
      {
        id: "chirashi-saumon-thon-avocat",
        name: "Saumon Thon Avocat",
        description: "",
        price: 21.30,
        image: "/final-img.png"
      },
      {
        id: "chirashi-gambas-saumon-thon",
        name: "Gambas, Saumon, Thon",
        description: "",
        price: 21.70,
        image: "/final-img.png"
      }
    ]
  },

  // POKE BOWL SUR LIT DE RIZ
  {
    category: "Poke Bowl sur lit de riz",
    items: [
      {
        id: "poke-bowl-01",
        name: "Poke Bowl N°01",
        description: "Salade wakame, carotte, avocat, maïs, edamame, mangue, billes citronnées",
        price: 13.60,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-02",
        name: "Poke Bowl N°02",
        description: "Poulet curry, mangue, avocat, carotte",
        price: 13.60,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-04",
        name: "Poke Bowl N°04",
        description: "Poulet, tomate, chou, carotte, grenade",
        price: 13.60,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-07",
        name: "Poke Bowl N°07",
        description: "Poulet karaage, avocat, chou, edamame",
        price: 14.00,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-05",
        name: "Poke Bowl N°05",
        description: "Gambas, avocat, carotte, chou, mangue",
        price: 14.70,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-11",
        name: "Poke Bowl N°11",
        description: "Saumon cuit, grenade, carotte, chou, edamame, billes citronnées",
        price: 14.80,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-06",
        name: "Poke Bowl N°06",
        description: "Saumon, avocat, mangue, concombre, edamame",
        price: 15.20,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-08",
        name: "Poke Bowl N°08",
        description: "Poulet frit, maïs, mangue, concombre, edamame, oignon frit",
        price: 15.20,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-03",
        name: "Poke Bowl N°03",
        description: "Poulet caramélisé, saumon, mangue, avocat",
        price: 15.40,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-12",
        name: "Poke Bowl N°12",
        description: "Thon, avocat, mangue, concombre, edamame",
        price: 15.40,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-10",
        name: "Poke Bowl N°10",
        description: "Thon cuit, avocat, edamame, tomate, maïs",
        price: 15.50,
        image: "/final-img.png"
      },
      {
        id: "poke-bowl-09",
        name: "Poke Bowl N°09",
        description: "Poulet teriyaki, saumon, avocat, mangue, edamame",
        price: 16.00,
        image: "/final-img.png"
      }
    ]
  },

  // NOS ACCOMPAGNEMENTS
  {
    category: "Nos Accompagnements",
    items: [
      {
        id: "riz-vinaigre",
        name: "Riz Vinaigré",
        description: "",
        price: 4.00,
        image: "/final-img.png"
      },
      {
        id: "salade-de-chou",
        name: "Salade de Chou",
        description: "",
        price: 4.00,
        image: "/final-img.png"
      },
      {
        id: "salade-edamame",
        name: "Salade Edamame",
        description: "",
        price: 5.20,
        image: "/final-img.png"
      },
      {
        id: "salade-algue-wakame",
        name: "Salade Algue Wakame",
        description: "",
        price: 5.80,
        image: "/final-img.png"
      },
      {
        id: "salade-de-chou-saumon",
        name: "Salade de Chou Accompagné de Saumon",
        description: "",
        price: 6.20,
        image: "/final-img.png"
      },
      {
        id: "salade-de-chou-thon",
        name: "Salade de Chou Accompagné de Thon",
        description: "",
        price: 6.60,
        image: "/final-img.png"
      },
      {
        id: "tartare-saumon",
        name: "Tartare Saumon",
        description: "Avocat, mangue, perles de yuzu",
        price: 19.30,
        image: "/final-img.png"
      },
      {
        id: "tartare-thon-saumon",
        name: "Tartare Thon, Saumon",
        description: "Avocat, tobiko",
        price: 20.10,
        image: "/final-img.png"
      }
    ]
  },

  // WAGYU (BŒUF JAPONAIS)
  {
    category: "Wagyu (Bœuf Japonais)",
    items: [
      {
        id: "wagyu-sushi",
        name: "Sushi Wagyu",
        description: "Bœuf Wagyu premium légèrement braisé",
        price: 5.80,
        image: "/final-img.png",
        isNew: true,
        isPremium: true
      },
      {
        id: "wagyu-sashimi",
        name: "Sashimi Wagyu",
        description: "6 tranches de bœuf Wagyu",
        price: 28.80,
        image: "/final-img.png",
        isNew: true,
        isPremium: true
      },
      {
        id: "wagyu-tataki",
        name: "Tataki Wagyu",
        description: "Bœuf Wagyu légèrement saisi, sauce ponzu",
        price: 32.20,
        image: "/final-img.png",
        isNew: true,
        isPremium: true
      }
    ]
  },

  // DESSERTS
  {
    category: "Desserts",
    items: [
      {
        id: "mochi-du-jour",
        name: "Mochi du Jour",
        description: "À l'unité",
        price: 3.50,
        image: "/final-img.png"
      },
      {
        id: "gyoza-pomme",
        name: "Gyoza Pomme",
        description: "X3",
        price: 4.60,
        image: "/final-img.png"
      },
      {
        id: "dessert-du-jour",
        name: "Dessert du Jour",
        description: "",
        price: 5.80,
        image: "/final-img.png"
      },
      {
        id: "makis-nutella-banane",
        name: "Makis Nutella Banane",
        description: "X6",
        price: 6.60,
        image: "/final-img.png"
      },
      {
        id: "makis-mangue-nutella-coco",
        name: "Makis Mangue Nutella Coco Rapé",
        description: "X6",
        price: 7.10,
        image: "/final-img.png"
      }
    ]
  }
];