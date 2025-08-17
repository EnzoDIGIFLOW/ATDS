export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  isNew?: boolean
  isPopular?: boolean
  badge?: string
}

export interface SubCategory {
  name: string
  items: MenuItem[]
}

export interface MenuCategory {
  category: string
  icon?: string
  subCategories?: SubCategory[]
  items?: MenuItem[] // Pour compatibilité avec l'ancien format
}

// Fonction pour restructurer le menu plat en menu avec sous-catégories
export function restructureMenu(flatMenu: any[]): MenuCategory[] {
  const restructuredMenu: MenuCategory[] = []
  
  // Créer un map temporaire pour collecter les items par type
  const menuMap = new Map<string, any[]>()
  
  flatMenu.forEach(category => {
    menuMap.set(category.category, category.items || [])
  })
  
  // 1. BOISSONS - Regrouper toutes les boissons
  const boissons: MenuCategory = {
    category: "Boissons",
    icon: "wine",
    subCategories: []
  }
  
  // Ajouter les sous-catégories de boissons
  if (menuMap.has("Boissons avec Alcool")) {
    boissons.subCategories!.push({
      name: "Boissons avec Alcool",
      items: menuMap.get("Boissons avec Alcool")!
    })
  }
  
  if (menuMap.has("Bières")) {
    boissons.subCategories!.push({
      name: "Bières",
      items: menuMap.get("Bières")!
    })
  }
  
  if (menuMap.has("Cocktails du Temple")) {
    boissons.subCategories!.push({
      name: "Cocktails avec Alcool",
      items: menuMap.get("Cocktails du Temple")!
    })
  }
  
  if (menuMap.has("Cocktails Sans Alcool")) {
    boissons.subCategories!.push({
      name: "Cocktails Sans Alcool",
      items: menuMap.get("Cocktails Sans Alcool")!
    })
  }
  
  if (menuMap.has("Boissons Sans Alcool")) {
    boissons.subCategories!.push({
      name: "Boissons Sans Alcool",
      items: menuMap.get("Boissons Sans Alcool")!
    })
  }
  
  if (menuMap.has("Thés Japonais")) {
    boissons.subCategories!.push({
      name: "Thés Japonais",
      items: menuMap.get("Thés Japonais")!
    })
  }
  
  if (menuMap.has("Boissons")) {
    boissons.subCategories!.push({
      name: "Autres Boissons",
      items: menuMap.get("Boissons")!
    })
  }
  
  if (boissons.subCategories!.length > 0) {
    restructuredMenu.push(boissons)
  }
  
  // 2. SUSHIS & CRÉATIONS - Regrouper tous les sushis et dérivés
  const sushis: MenuCategory = {
    category: "Sushis & Créations",
    icon: "fish",
    subCategories: []
  }
  
  if (menuMap.has("Sushi à l'unité")) {
    sushis.subCategories!.push({
      name: "Sushi à l'unité",
      items: menuMap.get("Sushi à l'unité")!
    })
  }
  
  if (menuMap.has("Sashimi par 6")) {
    sushis.subCategories!.push({
      name: "Sashimi",
      items: menuMap.get("Sashimi par 6")!
    })
  }
  
  if (menuMap.has("Makis par 6")) {
    sushis.subCategories!.push({
      name: "Makis",
      items: menuMap.get("Makis par 6")!
    })
  }
  
  if (menuMap.has("California par 6")) {
    sushis.subCategories!.push({
      name: "California",
      items: menuMap.get("California par 6")!
    })
  }
  
  if (menuMap.has("Roll's par 6")) {
    sushis.subCategories!.push({
      name: "Roll's",
      items: menuMap.get("Roll's par 6")!
    })
  }
  
  if (menuMap.has("Flocon par 6")) {
    sushis.subCategories!.push({
      name: "Flocon",
      items: menuMap.get("Flocon par 6")!
    })
  }
  
  if (menuMap.has("Crispys (frit) par 6")) {
    sushis.subCategories!.push({
      name: "Crispys",
      items: menuMap.get("Crispys (frit) par 6")!
    })
  }
  
  if (menuMap.has("Calispring par 6")) {
    sushis.subCategories!.push({
      name: "Calispring",
      items: menuMap.get("Calispring par 6")!
    })
  }
  
  if (menuMap.has("Création du Chef par 6")) {
    sushis.subCategories!.push({
      name: "Création du Chef",
      items: menuMap.get("Création du Chef par 6")!
    })
  }
  
  if (menuMap.has("Rolls Spéciaux")) {
    sushis.subCategories!.push({
      name: "Rolls Spéciaux",
      items: menuMap.get("Rolls Spéciaux")!
    })
  }
  
  if (menuMap.has("Buritos")) {
    sushis.subCategories!.push({
      name: "Buritos",
      items: menuMap.get("Buritos")!
    })
  }
  
  if (sushis.subCategories!.length > 0) {
    restructuredMenu.push(sushis)
  }
  
  // 3. PLATS CHAUDS - Regrouper tous les plats chauds
  const platsChauds: MenuCategory = {
    category: "Plats Chauds",
    icon: "flame",
    subCategories: []
  }
  
  if (menuMap.has("Nos plats chaud")) {
    platsChauds.subCategories!.push({
      name: "Spécialités Chaudes",
      items: menuMap.get("Nos plats chaud")!
    })
  }
  
  if (menuMap.has("Plats Chauds")) {
    platsChauds.subCategories!.push({
      name: "Entrées Chaudes",
      items: menuMap.get("Plats Chauds")!
    })
  }
  
  if (menuMap.has("Ramen")) {
    platsChauds.subCategories!.push({
      name: "Ramen",
      items: menuMap.get("Ramen")!
    })
  }
  
  if (menuMap.has("Nouilles")) {
    platsChauds.subCategories!.push({
      name: "Nouilles",
      items: menuMap.get("Nouilles")!
    })
  }
  
  if (platsChauds.subCategories!.length > 0) {
    restructuredMenu.push(platsChauds)
  }
  
  // 4. PLATS FROIDS - Poke bowls et chirashi
  const platsFroids: MenuCategory = {
    category: "Plats Froids",
    icon: "salad",
    subCategories: []
  }
  
  if (menuMap.has("Poke Bowl sur lit de riz")) {
    platsFroids.subCategories!.push({
      name: "Poke Bowls",
      items: menuMap.get("Poke Bowl sur lit de riz")!
    })
  }
  
  if (menuMap.has("Chirashi 10 tranches")) {
    platsFroids.subCategories!.push({
      name: "Chirashi",
      items: menuMap.get("Chirashi 10 tranches")!
    })
  }
  
  if (platsFroids.subCategories!.length > 0) {
    restructuredMenu.push(platsFroids)
  }
  
  // 5. FORMULES & PLATEAUX
  const formules: MenuCategory = {
    category: "Formules & Plateaux",
    icon: "star",
    subCategories: []
  }
  
  if (menuMap.has("Formules du Midi")) {
    formules.subCategories!.push({
      name: "Formules du Midi",
      items: menuMap.get("Formules du Midi")!
    })
  }
  
  if (menuMap.has("Plateaux")) {
    formules.subCategories!.push({
      name: "Plateaux",
      items: menuMap.get("Plateaux")!
    })
  }
  
  if (formules.subCategories!.length > 0) {
    restructuredMenu.push(formules)
  }
  
  // 6. SPÉCIALITÉS PREMIUM
  if (menuMap.has("Boeuf Wagyu Grade A5, importé du Japon")) {
    const premium: MenuCategory = {
      category: "Spécialités Premium",
      icon: "beef",
      subCategories: [{
        name: "Boeuf Wagyu Grade A5",
        items: menuMap.get("Boeuf Wagyu Grade A5, importé du Japon")!
      }]
    }
    restructuredMenu.push(premium)
  }
  
  // 7. ACCOMPAGNEMENTS & DESSERTS
  const accompagnements: MenuCategory = {
    category: "Accompagnements & Desserts",
    icon: "dessert",
    subCategories: []
  }
  
  if (menuMap.has("Nos Accompagnements")) {
    accompagnements.subCategories!.push({
      name: "Accompagnements",
      items: menuMap.get("Nos Accompagnements")!
    })
  }
  
  if (menuMap.has("Desserts")) {
    accompagnements.subCategories!.push({
      name: "Desserts",
      items: menuMap.get("Desserts")!
    })
  }
  
  if (accompagnements.subCategories!.length > 0) {
    restructuredMenu.push(accompagnements)
  }
  
  return restructuredMenu
}