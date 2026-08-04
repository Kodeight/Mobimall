export interface Material {
  id: string;
  name: string;
  type: "wood" | "fabric" | "leather" | "metal" | "stone" | "bois" | "tissu" | "cuir" | "pierre" | "métal";
  colorHex: string;
  textureUrl?: string; // or fallback CSS representation
  extraPrice: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  materialId: string;
  colorName: string;
  priceModifier: number;
  image?: string;
}

export interface FurnitureProduct {
  id: string;
  name: string;
  arabicName: string;
  collection: "Casbah" | "Sahara" | "Tassili" | "Atlas" | "Hoggar";
  category: "Living Room" | "Bedroom" | "Dining Room" | "Office" | "Lighting" | "Salon" | "Chambre" | "Salle à Manger" | "Bureau" | "Luminaire";
  basePrice: number; // in DZD (Algerian Dinars)
  description: string;
  dimensions: {
    width: number; // in meters
    depth: number; // in meters
    height: number; // in meters
  };
  image: string; // fallback illustration/placeholder
  materials: Material[];
}

export interface CartItem {
  id: string; // unique for variant config
  product: FurnitureProduct;
  selectedMaterial: Material;
  quantity: number;
  totalPrice: number;
}

export interface PlannerItem {
  id: string;
  productId: string;
  x: number; // grid meters from left
  y: number; // grid meters from top
  rotation: number; // in degrees (0, 90, 180, 270)
}

export interface AiSuggestionProduct {
  productId: string;
  coordinates: { x: number; y: number };
  rotation: number;
  reasoning: string;
}

export interface AiDesignResponse {
  overallConcept: string;
  colorPalette: string[];
  recommendations: AiSuggestionProduct[];
  proTips: string[];
}
