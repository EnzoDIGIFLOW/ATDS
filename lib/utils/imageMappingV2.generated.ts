/**
 * MAPPING V2 - Système de correspondance d'images précis et intelligent
 * Généré le 2025-08-15
 * 
 * Système avec:
 * - Correspondances exactes par ID de produit
 * - Fallback par catégorie uniquement
 * - Pas de recherche floue pour éviter les erreurs
 */

// Interface pour un mapping structuré
interface ProductImageMapping {
  productId: string
  productName: string
  category: string
  imagePath: string | null
}

// Mapping par ID de produit pour éviter les doublons
export const PRODUCT_IMAGE_MAPPING: Record<string, string> = {
  // === BOISSONS ===
  "eau-plate": null, // Pas d'image pour l'eau, utilisera une icône
  "coca-cola": null,
  "coca-zero": null,
  "orangina": null,
  "ice-tea": null,
  "oasis": null,
  "perrier": null,
  "jus-orange": null,
  "biere-asahi": null,
  "biere-kirin": null,
  "sake": null,
  
  // === MAKIS (PAR 6) ===
  "maki-cheese": "maki/makis cheese .webp",
  "maki-concombre-cheese": "maki/makis concombre cheese .webp",
  "maki-avocat": "maki/makis avocat amyo .webp",
  "maki-avocat-mayo": "maki/makis avocat amyo .webp",
  "maki-poulet-cheese": "maki/makis poulet cheese .webp",
  "maki-poulet-curry": "maki/makis poulet curry .webp",
  "maki-poulet-mayo": "maki/makis poulet mayo .webp",
  "maki-saumon": "maki/makis saumon .webp",
  "maki-saumon-cheese": "maki/makis saumon cheese .webp",
  "maki-thon": "maki/makis thon.webp",
  "maki-thon-cheese": "maki/makis thon cheese .webp",
  
  // === CALIFORNIA (PAR 6) ===
  "cali-poulet-cheese": "california/cali poulet cheese .webp",
  "cali-saumon-cheese": "california/cali saumon cheese .webp",
  "cali-poulet-curry": "california/cali poulet curry .webp",
  "cali-saumon-avocat": "california/cali saumon avocat .webp",
  "cali-saumon-avocat-tobiko": "california/cali saumon avocat tobiko.webp",
  "cali-crevette-tempura-mayo": "california/cali tempura avocat mayo .webp",
  "cali-saumon-mangue-menthe": "california/cali saumon mangue menthe.webp",
  "cali-gambas-cheese": "california/cali gambas cheese .webp",
  "cali-gambas-cheese-oignon": "california/cali gambas cheese oignon frit .webp",
  
  // === SASHIMI (PAR 6) ===
  "sashimi-saumon": "sashimi/sashimi saumon .webp",
  "sashimi-thon": "sashimi/sashimi thon.webp",
  "sashimi-duo": "sashimi/sashimi duo .webp",
  
  // === SUSHI À L'UNITÉ ===
  "sushi-saumon": "sushi nigiri/sushi saumon.webp",
  "sushi-saumon-cheese": "sushi nigiri/sushi saumon cheese .webp",
  "sushi-saumon-ciboulette": "sushi nigiri/sushi saumon ciboulette .webp",
  "sushi-saumon-mangue": "sushi nigiri/sushi saumon mangue .webp",
  "sushi-saumon-braise": "sushi nigiri/sushi saumon braisé.webp",
  "sushi-saumon-braise-truffe": "sushi nigiri/sushi saumon braisé truffe.webp",
  "sushi-thon": "sushi nigiri/sushi thon.webp",
  "sushi-thon-braise": "sushi nigiri/sushi thon braisé .webp",
  "sushi-saumon-avocat-jalapeno": "sushi nigiri/sushis saumon avocat jalapeno.webp",
  "sushi-saumon-tobiko": "sushi nigiri/sushis aumon tobiko.webp",
  
  // === POKE BOWLS ===
  "poke-bowl-01": "poke bowl /POKE 1.webp",
  "poke-bowl-02": "poke bowl /POKE 2.webp",
  "poke-bowl-03": "poke bowl /POKE 3.webp",
  "poke-bowl-04": "poke bowl /POKE 4.webp",
  "poke-bowl-05": "poke bowl /POKE 5.webp",
  "poke-bowl-06": "poke bowl /poke 6.webp",
  "poke-bowl-07": "poke bowl /POKE 7.webp",
  "poke-bowl-08": "poke bowl /POKE 8.webp",
  "poke-bowl-10": "poke bowl /POKE 10.webp",
  "poke-bowl-11": "poke bowl /POKE 11.webp",
  "poke-bowl-12": "poke bowl /POKE 12.webp",
  
  // === ACCOMPAGNEMENTS ===
  "riz-vinaigre": "accompagnement/riz vinaigre .webp",
  "salade-chou": "accompagnement/salade de chou .webp",
  "salade-edamame": "accompagnement/edamame.webp",
  "salade-wakame": "accompagnement/wakame .webp",
  "salade-chou-saumon": "accompagnement/chou saumon.webp",
  "salade-chou-thon": "accompagnement/chou thon 2.webp",
  
  // === PLATEAUX ===
  "box-sushi-mix": "plateaux /Box sushi mix 12pcs .webp",
  "box-sushi-saumon": "plateaux /box sushi saumon 10pcs.webp",
  "plateau-california": "plateaux /box california 18pcs  .webp",
  "plateau-makis": "plateaux /box makis 18pcs .webp",
  "love-box": "plateaux /love box - Grande.webp",
  "super-box": "plateaux /super box .webp",
  "plateau-premium": "plateaux /plateau 60 pcs.webp",
  "plateaux-chaud": "plateaux /plateau chaud  26 pièces .webp",
  "chicken-box": "plateaux /plateau chaud  26 pièces .webp",
  
  // === PLATS CHAUDS ===
  "soupe-miso": "soupe miso/soupe .webp",
  "nem-legumes": "plat chaud /nem .webp",
  "nem-poulet": "plat chaud /nem .webp",
  "nem-crevettes": "plat chaud /nem .webp",
  "samoussa-boeuf": "plat chaud /samoussa .webp",
  "samoussa-poulet": "plat chaud /samoussa .webp",
  "gyoza-porc": "plat chaud /Gyoza porc .webp",
  "gyoza-poulet-curry": "plat chaud /gyoza poulet curry.webp",
  "gyoza-crevette": "plat chaud /gyoza crevette .webp",
  "crevettes-tempura": "plat chaud /crevette tempura .webp",
  
  // === FORMULES DU MIDI ===
  "formule-a": "formule du midi /Formule A jpg.webp",
  "formule-b": "formule du midi /Formule A jpg.webp",
  "formule-c": "formule du midi /Formule A jpg.webp",
  
  // === BURITOS ===
  "burito-poulet-caramelise": "burito/buritos poulet caramelisé .webp",
  "burito-poulet-frit": "burito/buritos poulet frit avocat chesse.webp",
  "burito-saumon-avocat": "burito/buritos saumon avocat cheese .webp",
  
  // === CHIRASHI ===
  "chirashi-saumon-avocat": "chirachi/chirashi saumon avocat.webp",
  "chirashi-saumon-thon": "chirachi/chirashi saumo thon avocat cheese oignon frit .webp",
  
  // === CRISPY ===
  "crispy-saumon": "crispy/crispy saumon.webp",
  "crispy-thon": "crispy/crispy thon.webp",
  "crispy-poulet-frit": "crispy/crispy poulet frit.webp",
  
  // === SPRING ===
  "spring-thon-cuit-mayo": "spring /spring thon mayo .webp",
  "spring-thon-mangue": "spring /spring thon mangue .webp",
  "spring-gambas-avocat": "spring /spring gambas avocat .webp",
  "spring-gambas-cheese": "spring /spring gambas cheese.webp",
  "spring-poulet-frit": "spring /spring poulet frit avoca cheese .webp",
  "spring-saumon-cheese-tobiko": "spring /spring saumo cheese tobiko.webp",
  
  // === ROLL'S ===
  "rolls-avocat-cheese": "roll_s/rolls avocat cheese .webp",
  "rolls-saumon": "roll_s/tolls saumon .webp",
  "rolls-saumon-cheese": "roll_s/rollsa saumon cheese .webp",
  "rolls-concombre-avocat": "roll_s/rolls mangue saumon .webp",
  
  // === FLOCON ===
  "flocon-thon": "flocon/flocon thon .webp",
  "flocon-saumon-avocat": "création du chef/flocon saumon avocat tobiko menthe .webp",
  
  // === CRÉATION DU CHEF ===
  "italien": "création du chef/L_italien 4.webp",
  "cali-poulet-frit-chef": "création du chef/cali poulet frit guacamole jalap.webp",
  "cali-crevette-tempura-chef": "création du chef/cali tempura avocat enrobe saumon braisé .webp",
  "cali-poulet-caramelise-chef": "création du chef/california poulet caramelisé mangue .webp",
  "rolls-avocat-truffe": "création du chef/roll_s braisé truffe  - Grande - Grande.webp",
  "rolls-saumon-braise": "création du chef/roll_s avocat sauce spicy.webp",
  "avocat-mayo-chef": "création du chef/roll_s avocat pousse de cress.webp",
  "cali-saumon-chef": "création du chef/saumon guacamole jalap.webp",
  "rolls-avocat-chef": "création du chef/rolls avocat enrobé de thon, zeste de kiwi, tobiko.webp",
  
  // === DESSERTS ===
  "mochi": "dessert/mochis .webp",
  "makis-nutella": "dessert/Makis mangue nutella coco rapé -2.webp",
  
  // === TARTARE ===
  "tartare-saumon": "tartare/tartare saumon avoca.webp",
  "tartare-thon-saumon": "tartare/taratre thon saumon avocat tobiko 2.webp",
  
  // === NOUILLES ===
  "nouilles-crevettes": "nouilles/nouilles crevettes_.webp",
  "nouilles-poulet": "nouilles/nouille teryaki.webp"
}

// Mapping des noms de produits vers les IDs
export const PRODUCT_NAME_TO_ID: Record<string, string> = {
  // Boissons
  "Eau Plate": "eau-plate",
  "Coca-Cola": "coca-cola",
  "Coca Zéro": "coca-zero",
  "Orangina": "orangina",
  "Ice Tea": "ice-tea",
  "Oasis": "oasis",
  "Perrier": "perrier",
  "Jus d'Orange": "jus-orange",
  "Bière Asahi": "biere-asahi",
  "Bière Kirin": "biere-kirin",
  "Saké": "sake",
  
  // Makis - Noms exacts du menu (avec catégorie pour éviter les conflits)
  "Cheese [Makis]": "maki-cheese",
  "Cheese": "maki-cheese",
  "Concombre, Cheese": "maki-concombre-cheese",
  "Avocat [Makis]": "maki-avocat",
  "Avocat": "maki-avocat",
  "Avocat, Mayo": "maki-avocat-mayo",
  "Poulet, Cheese [Makis]": "maki-poulet-cheese",
  "Poulet, Cheese": "maki-poulet-cheese",
  "Poulet Curry [Makis]": "maki-poulet-curry",
  "Poulet Curry": "maki-poulet-curry",
  "Poulet, Mayonnaise": "maki-poulet-mayo",
  "Saumon [Makis]": "maki-saumon",
  "Saumon, Cheese [Makis]": "maki-saumon-cheese",
  "Thon [Makis]": "maki-thon",
  "Thon, Cheese": "maki-thon-cheese",
  
  // Sushi - Avec catégorie pour différencier des Makis
  "Saumon [Sushi]": "sushi-saumon",
  "Thon [Sushi]": "sushi-thon",
  "Saumon Cheese [Sushi]": "sushi-saumon-cheese",
  "Saumon Ciboulette": "sushi-saumon-ciboulette",
  "Saumon Mangue": "sushi-saumon-mangue",
  "Saumon Braisé": "sushi-saumon-braise",
  "Saumon Braisé, Truffe": "sushi-saumon-braise-truffe",
  "Thon Braisé": "sushi-thon-braise",
  "Saumon, Tobiko": "sushi-saumon-tobiko",
  
  // California - Avec distinction par catégorie
  "Poulet Curry [California]": "cali-poulet-curry",
  "Poulet, Cheese [California]": "cali-poulet-cheese",
  "Saumon Cheese [California]": "cali-saumon-cheese",
  
  // California - Ajout des correspondances
  "Saumon, Avocat": "cali-saumon-avocat",
  "Saumon, Avocat, Tobiko": "cali-saumon-avocat-tobiko",
  "Crevette Tempura, Mayo": "cali-crevette-tempura-mayo",
  "Saumon, Mangue, Menthe": "cali-saumon-mangue-menthe",
  "Gambas, Cheese": "cali-gambas-cheese",
  "Gambas, Cheese, Oignon Frit": "cali-gambas-cheese-oignon",
  
  // Plateaux - Ajout des correspondances
  "Plateau Makis (18 pièces)": "plateau-makis",
  "Plateau California (18 pièces)": "plateau-california",
  "Box Sushi Mix (12 pièces)": "box-sushi-mix",
  "Box Sushi Saumon (10 pièces)": "box-sushi-saumon",
  "Love Box (24 pièces)": "love-box",
  "Super Box (14 pièces)": "super-box",
  "Plateau (60 pièces)": "plateau-premium",
  "Plateaux Chaud (26 pièces)": "plateaux-chaud",
  "Chicken Box (24 pièces)": "chicken-box"
}

/**
 * Fonction de recherche d'image V2 - Plus précise et sans erreurs
 * @param productName - Nom exact du produit
 * @param category - Catégorie du produit
 * @param productId - ID unique du produit (optionnel mais recommandé)
 * @returns Le chemin de l'image ou null
 */
export function getProductImageV2(
  productName: string, 
  category?: string,
  productId?: string
): string | null {
  // 1. Si on a un ID de produit, utilisation directe
  if (productId && PRODUCT_IMAGE_MAPPING[productId]) {
    return PRODUCT_IMAGE_MAPPING[productId]
  }
  
  // 2. Pour gérer les produits avec la même nom dans différentes catégories
  // On crée une clé composée si on a la catégorie
  if (category) {
    const categoryKey = `${productName} [${category}]`
    const foundIdWithCategory = PRODUCT_NAME_TO_ID[categoryKey]
    if (foundIdWithCategory && PRODUCT_IMAGE_MAPPING[foundIdWithCategory]) {
      return PRODUCT_IMAGE_MAPPING[foundIdWithCategory]
    }
  }
  
  // 3. Essayer de trouver l'ID à partir du nom exact
  const foundId = PRODUCT_NAME_TO_ID[productName]
  if (foundId && PRODUCT_IMAGE_MAPPING[foundId]) {
    return PRODUCT_IMAGE_MAPPING[foundId]
  }
  
  // 4. Pour les produits numérotés (Poke Bowl N°XX)
  if (productName.includes("Poke Bowl N°")) {
    const match = productName.match(/N°(\d+)/)
    if (match) {
      const num = match[1].padStart(2, '0')
      const pokeId = `poke-bowl-${num}`
      if (PRODUCT_IMAGE_MAPPING[pokeId]) {
        return PRODUCT_IMAGE_MAPPING[pokeId]
      }
    }
  }
  
  // 5. Pas de recherche floue - retourner null pour éviter les erreurs
  // Le composant utilisera une icône contextuelle à la place
  return null
}

/**
 * Fonction pour obtenir l'image avec fallback intelligent
 */
export function getProductImageWithFallbackV2(
  productName: string,
  category?: string,
  productId?: string
): string | null {
  // Essayer de récupérer l'image exacte
  const imagePath = getProductImageV2(productName, category, productId)
  
  // Si on a une image, la retourner avec le préfixe /menu/
  if (imagePath) {
    return `/menu/${imagePath}`
  }
  
  // Pas d'image trouvée - le composant utilisera une icône
  return null
}

// Export pour compatibilité
export { getProductImageWithFallbackV2 as getProductImageWithFallback }