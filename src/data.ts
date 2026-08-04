import { FurnitureProduct, Material } from "./types";

export const MATERIALS: Material[] = [
  // Bois
  { id: "m-walnut", name: "Noyer Sauvage du Sahara", type: "bois", colorHex: "#3d271d", extraPrice: 25000 },
  { id: "m-oak", name: "Chêne Sombre de l'Atlas", type: "bois", colorHex: "#1a1615", extraPrice: 18000 },
  { id: "m-ash", name: "Frêne de Méditerranée", type: "bois", colorHex: "#be9b7b", extraPrice: 0 },
  
  // Tissus
  { id: "f-boucle", name: "Tissu Bouclé Sable du Tassili", type: "tissu", colorHex: "#e3dbcb", extraPrice: 15000 },
  { id: "f-velvet", name: "Velours Émeraude de Constantine", type: "tissu", colorHex: "#004b39", extraPrice: 22000 },
  { id: "f-loom", name: "Tissage Traditionnel Kabyle", type: "tissu", colorHex: "#c94a29", extraPrice: 12000 },
  
  // Cuirs
  { id: "l-camel", name: "Cuir de Chameau du Hoggar", type: "cuir", colorHex: "#b56930", extraPrice: 45000 },
  { id: "l-terra", name: "Cuir Terracotta d'Alger", type: "cuir", colorHex: "#a04838", extraPrice: 38000 },

  // Pierres/Métaux
  { id: "s-basalt", name: "Pierre de Basalte Brossé", type: "pierre", colorHex: "#2b2c2c", extraPrice: 55000 },
  { id: "s-marble", name: "Marbre Blanc de Constantine", type: "pierre", colorHex: "#e8e8e8", extraPrice: 65000 }
];

export const PRODUCTS: FurnitureProduct[] = [
  {
    id: "p-tassili-chair",
    name: "Fauteuil Sculptural Tassili",
    arabicName: "كرسي تاسيلي الفاخر",
    collection: "Tassili",
    category: "Salon",
    basePrice: 145000,
    description: "Inspiré par les arches fluides de pierre sculptée du Tassili n'Ajjer. Façonné dans un frêne d'exception et revêtu d'un somptueux tissu bouclé, sa silhouette organique élève n'importe quel espace architectural.",
    dimensions: { width: 0.9, depth: 0.85, height: 0.78 },
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
    materials: [
      MATERIALS.find(m => m.id === "m-walnut")!,
      MATERIALS.find(m => m.id === "f-boucle")!,
      MATERIALS.find(m => m.id === "l-camel")!,
      MATERIALS.find(m => m.id === "f-velvet")!
    ]
  },
  {
    id: "p-casbah-sofa",
    name: "Canapé Minimaliste Casbah",
    arabicName: "أريكة القصبة العصرية",
    collection: "Casbah",
    category: "Salon",
    basePrice: 380000,
    description: "Un chef-d'œuvre modulaire au profil bas rendant hommage à l'agencement géométrique de la Casbah d'Alger. Assise d'un confort d'accueil moelleux incomparable reposant sur un chêne massif.",
    dimensions: { width: 2.4, depth: 1.05, height: 0.68 },
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    materials: [
      MATERIALS.find(m => m.id === "f-boucle")!,
      MATERIALS.find(m => m.id === "f-velvet")!,
      MATERIALS.find(m => m.id === "f-loom")!,
      MATERIALS.find(m => m.id === "l-terra")!
    ]
  },
  {
    id: "p-sahara-credenza",
    name: "Buffet Dunes du Sahara",
    arabicName: "خزانة الصحراء المنحوتة",
    collection: "Sahara",
    category: "Salon",
    basePrice: 295000,
    description: "Présente une somptueuse façade en bois massif cannelé imitant les dunes de sable sculptées par le vent du Grand Erg Oriental. Fabriqué avec une précision artisanale absolue.",
    dimensions: { width: 1.8, depth: 0.45, height: 0.72 },
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    materials: [
      MATERIALS.find(m => m.id === "m-walnut")!,
      MATERIALS.find(m => m.id === "m-oak")!,
      MATERIALS.find(m => m.id === "m-ash")!
    ]
  },
  {
    id: "p-hoggar-table",
    name: "Table Monolithe Hoggar",
    arabicName: "طاولة طعام الهقار الحجرية",
    collection: "Hoggar",
    category: "Salle à Manger",
    basePrice: 420000,
    description: "Une table de repas monumentale façonnée à partir d'une dalle adoucie de marbre blanc de Constantine ou de pierre de basalte brossé, soutenue par des pieds sculpturaux croisés.",
    dimensions: { width: 2.2, depth: 1.0, height: 0.75 },
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800",
    materials: [
      MATERIALS.find(m => m.id === "s-basalt")!,
      MATERIALS.find(m => m.id === "s-marble")!,
      MATERIALS.find(m => m.id === "m-oak")!
    ]
  },
  {
    id: "p-atlas-bed",
    name: "Lit à Baldaquin Atlas",
    arabicName: "سرير أطلس الخشبي",
    collection: "Atlas",
    category: "Chambre",
    basePrice: 340000,
    description: "Un lit à baldaquin majestueux et minimaliste célébrant la splendeur des forêts de cèdres de l'Atlas. Assemblages traditionnels faits à la main et tête de lin biologique d'exception.",
    dimensions: { width: 2.1, depth: 2.2, height: 2.1 },
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
    materials: [
      MATERIALS.find(m => m.id === "m-walnut")!,
      MATERIALS.find(m => m.id === "m-oak")!,
      MATERIALS.find(m => m.id === "m-ash")!
    ]
  },
  {
    id: "p-djurdjura-pendant",
    name: "Suspension Lumineuse Djurdjura",
    arabicName: "ثريا جرجرة النحاسية",
    collection: "Tassili",
    category: "Luminaire",
    basePrice: 85000,
    description: "Une suspension lumineuse architecturale dotée de verre soufflé à la bouche ambre fumé avec colliers en cuivre martelé à la main, diffusant une douce lueur chaleureuse.",
    dimensions: { width: 0.6, depth: 0.6, height: 1.2 },
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800",
    materials: [
      MATERIALS.find(m => m.id === "s-basalt")!,
      MATERIALS.find(m => m.id === "m-walnut")!
    ]
  }
];

export const ROOM_PRESETS = [
  {
    id: "preset-empty-algiers",
    name: "Salon Haussmannien d'Alger",
    description: "Une pièce élégante et lumineuse d'un appartement traditionnel à Alger, dotée de moulures d'époque, de grandes fenêtres de style français et d'un parquet d'exception.",
    dimensions: { width: 6, depth: 4 },
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "preset-modern-penthouse",
    name: "Penthouse Face à la Mer à Oran",
    description: "Salon d'angle avec baies vitrées panoramiques surplombant la mer Méditerranée à Oran. Finitions épurées en béton ciré, grand volume architectural.",
    dimensions: { width: 7, depth: 5 },
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "preset-constantine-loft",
    name: "Loft en Pierre à Constantine",
    description: "Murs hauts en pierre calcaire voûtée, colonnes en briques artisanales et textures d'argile typiques de l'architecture historique de Constantine.",
    dimensions: { width: 5, depth: 5 },
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"
  }
];
