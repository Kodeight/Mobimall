import React, { useState, useEffect } from "react";
import { PRODUCTS } from "../data";
import { FurnitureProduct, Material } from "../types";
import { Grid, Eye, Plus, Compass, Check, Search, X, Mic, MicOff, Share2, Link } from "lucide-react";

function ProductCatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div
          key={idx}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-950/25 border border-white/5 p-0 backdrop-blur-md animate-pulse"
        >
          {/* IMAGE CONTAINER PLACEHOLDER */}
          <div className="relative aspect-[4/3] w-full bg-slate-950 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-slate-900/60 flex items-center justify-center border border-white/5">
              <Compass className="w-4 h-4 text-slate-700 animate-spin" style={{ animationDuration: "6s" }} />
            </div>
            
            <div className="absolute top-4 left-4 h-5 w-20 bg-slate-900 rounded" />
            <div className="absolute top-4 right-4 h-5 w-16 bg-slate-900 rounded" />
          </div>

          {/* CONTENT PLACEHOLDER */}
          <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-5 w-3/4 bg-slate-900 rounded" />
              <div className="h-3 w-1/3 bg-slate-900/60 rounded" />
              <div className="space-y-1.5 pt-1">
                <div className="h-3 w-full bg-slate-900/40 rounded" />
                <div className="h-3 w-5/6 bg-slate-900/40 rounded" />
              </div>
            </div>

            {/* MATERIAL CHOICES SKELETON */}
            <div className="space-y-2 pt-3 border-t border-white/5">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-slate-900 rounded" />
                <div className="h-3 w-16 bg-slate-900 rounded" />
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="w-7 h-7 rounded-full bg-slate-900 border border-slate-850" />
                ))}
              </div>
            </div>

            {/* FOOTER METRICS SKELETON */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="space-y-1">
                <div className="h-2.5 w-12 bg-slate-900 rounded" />
                <div className="h-3 w-24 bg-slate-900 rounded" />
              </div>
              <div className="space-y-1 text-right">
                <div className="h-2.5 w-10 bg-slate-900 rounded ml-auto" />
                <div className="h-4.5 w-24 bg-sky-600/25 rounded" />
              </div>
            </div>

            {/* BUTTON SKELETON */}
            <div className="h-11 w-full bg-slate-900 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductCatalog({ 
  onPlaceInPlanner, 
  onSelectProduct 
}: { 
  onPlaceInPlanner: (productId: string) => void;
  onSelectProduct: (product: FurnitureProduct) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("Tout");
  const [activeCollection, setActiveCollection] = useState<string>("Toutes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  
  // Track custom selected material configurations per-product-card
  const [cardMaterials, setCardMaterials] = useState<Record<string, string>>({});

  const [sharingProductId, setSharingProductId] = useState<string | null>(null);
  const [copiedProductId, setCopiedProductId] = useState<string | null>(null);

  const triggerShare = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setSharingProductId(sharingProductId === productId ? null : productId);
  };

  const copyShareLink = (e: React.MouseEvent, product: FurnitureProduct) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}?product=${product.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedProductId(product.id);
      setTimeout(() => setCopiedProductId(null), 2000);
    });
  };

  const getShareUrl = (platform: "twitter" | "facebook" | "whatsapp", product: FurnitureProduct) => {
    const shareUrl = encodeURIComponent(`${window.location.origin}?product=${product.id}`);
    const text = encodeURIComponent(`Découvrez le magnifique meuble "${product.name}" sur Mobimall Algérie ! ✨`);
    
    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${text}%20${shareUrl}`;
    }
  };

  // Voice Search Handler
  const startVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur actuel.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-DZ"; // set standard Algerian/French locale for voice translation
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setSearchQuery(transcript);
      }
      setIsListening(false);
    };

    recognition.start();
  };

  // 3D Tilt Card Animation Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = -((y - centerY) / centerY) * 12; // Max 12 deg
    const rotateY = ((x - centerX) / centerX) * 12; // Max 12 deg
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = "0 25px 45px -12px rgba(14, 165, 233, 0.25)";
    card.style.borderColor = "rgba(14, 165, 233, 0.35)";
    card.style.transition = "transform 0.1s ease, box-shadow 0.2s ease, border-color 0.2s ease";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)";
    card.style.boxShadow = "none";
    card.style.borderColor = "rgba(255, 255, 255, 0.05)";
    card.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease, border-color 0.5s ease";
  };

  // Simulate premium catalog loading on filter/category/search changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [activeCategory, activeCollection, searchQuery]);

  // French Categories and Collections
  const categories = ["Tout", "Salon", "Salle à Manger", "Chambre", "Luminaire"];
  const collections = ["Toutes", "Casbah", "Sahara", "Tassili", "Atlas", "Hoggar"];

  // Mapping from French categories/collections to actual English data strings to keep filter logic compatible
  const categoryMap: Record<string, string> = {
    "Tout": "All",
    "Salon": "Living Room",
    "Salle à Manger": "Dining Room",
    "Chambre": "Bedroom",
    "Luminaire": "Lighting"
  };

  const collectionMap: Record<string, string> = {
    "Toutes": "All",
    "Casbah": "Casbah",
    "Sahara": "Sahara",
    "Tassili": "Tassili",
    "Atlas": "Atlas",
    "Hoggar": "Hoggar"
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const targetCat = categoryMap[activeCategory];
    const targetCol = collectionMap[activeCollection];

    const catMatch = targetCat === "All" || p.category === targetCat;
    const colMatch = targetCol === "All" || p.collection === targetCol;
    
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return catMatch && colMatch;
    }

    const nameMatch = p.name.toLowerCase().includes(query) || (p.arabicName && p.arabicName.toLowerCase().includes(query));
    // Support searching either French or English categories
    const catSearchMatch = p.category.toLowerCase().includes(query) || 
                           (p.category === "Living Room" && "salon".includes(query)) ||
                           (p.category === "Dining Room" && "salle à manger".includes(query)) ||
                           (p.category === "Bedroom" && "chambre".includes(query)) ||
                           (p.category === "Lighting" && "luminaire".includes(query));

    const matMatch = p.materials.some(
      m => m.name.toLowerCase().includes(query) || m.type.toLowerCase().includes(query)
    );

    return (nameMatch || catSearchMatch || matMatch) && catMatch && colMatch;
  });

  const getCardSelectedMaterial = (product: FurnitureProduct) => {
    const customMatId = cardMaterials[product.id];
    if (customMatId) {
      const found = product.materials.find(m => m.id === customMatId);
      if (found) return found;
    }
    return product.materials[0]; // fallback to default
  };

  const handleMaterialSelect = (productId: string, materialId: string) => {
    setCardMaterials(prev => ({
      ...prev,
      [productId]: materialId
    }));
  };

  return (
    <section id="catalog-section" className="py-24 px-6 lg:px-16 bg-[#02040a] text-stone-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* EN-TÊTE DE SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-sky-400 uppercase">Catalogue d'Exception</span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-stone-100">
              Les Chefs-d'œuvre Numériques
            </h2>
            <p className="text-stone-400 text-sm max-w-lg font-light leading-relaxed">
              Explorez les collections d'exception de Mobimall Algérie. Chaque chef-d'œuvre allie rigueur architecturale contemporaine et patrimoine régional précieux.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <Grid className="w-4 h-4 text-sky-400" /> Affichage de {filteredProducts.length} créations uniques
          </div>
        </div>

        {/* BARRE DE RECHERCHE */}
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-500" />
          </div>
          <input
            type="text"
            id="product-search-input"
            placeholder="Rechercher par modèle, catégorie, matériau (ex: cuir, chêne, velours)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-24 py-3.5 bg-slate-950 border border-white/5 hover:border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl text-xs text-stone-100 placeholder-stone-500 outline-none transition-all font-mono"
          />
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-2">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-stone-500 hover:text-stone-300 cursor-pointer p-1 rounded-md hover:bg-white/5 transition-colors"
                title="Effacer la recherche"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              id="voice-search-mic-btn"
              onClick={startVoiceSearch}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isListening
                  ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse"
                  : "bg-slate-900 border-white/5 text-stone-400 hover:text-sky-400 hover:border-sky-500/30"
              }`}
              title={isListening ? "Écoute en cours..." : "Recherche vocale"}
            >
              {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* BARRE DE FILTRES : CATÉGORIES & COLLECTIONS */}
        <div className="space-y-4">
          {/* Filtre Catégories */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-900 pb-4">
            <span className="text-xs font-mono text-stone-500 uppercase mr-4">Catégorie :</span>
            {categories.map(cat => (
              <button
                key={cat}
                id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all uppercase cursor-pointer ${
                  activeCategory === cat 
                    ? "bg-sky-900/60 border border-sky-500/20 text-white shadow-lg shadow-sky-900/10" 
                    : "bg-slate-950 border border-white/5 text-stone-400 hover:text-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filtre Collections */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs font-mono text-stone-500 uppercase mr-4">Collection :</span>
            {collections.map(col => (
              <button
                key={col}
                id={`filter-collection-${col.toLowerCase()}`}
                onClick={() => setActiveCollection(col)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  activeCollection === col 
                    ? "bg-stone-100 text-stone-900 font-semibold" 
                    : "bg-slate-950 border border-white/5 text-stone-400 hover:text-stone-200"
                }`}
              >
                {col === "Toutes" ? col : `Erg ${col}`}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLE BENTO DES PRODUITS */}
        {isLoading ? (
          <ProductCatalogSkeleton />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-950 rounded-2xl border border-white/5">
            <Compass className="w-12 h-12 mx-auto text-stone-600 animate-pulse mb-4" />
            <p className="text-stone-400 font-light">Aucun modèle ne correspond à vos critères de recherche.</p>
            <button
              id="clear-filters-btn"
              onClick={() => { setActiveCategory("Tout"); setActiveCollection("Toutes"); setSearchQuery(""); }}
              className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-xs text-stone-200 rounded-lg transition-all"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => {
              const selectedMat = getCardSelectedMaterial(product);
              const totalPrice = product.basePrice + selectedMat.extraPrice;

              return (
                <div 
                  key={product.id}
                  id={`product-card-${product.id}`}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-all duration-500 backdrop-blur-md"
                >
                  {/* IMAGE & BADGES */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />

                    {/* Dégradé visuel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                    {/* Collection badge */}
                    <span className="absolute top-4 left-4 bg-black/60 border border-white/10 text-sky-400 font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded-md">
                      Collection {product.collection}
                    </span>

                    {/* Share Button & Popup */}
                    <div className="absolute top-4 right-4 z-15 flex flex-col items-end gap-2">
                      <button
                        onClick={(e) => triggerShare(e, product.id)}
                        className={`p-2 rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer ${
                          sharingProductId === product.id
                            ? "bg-sky-500 border-sky-400 text-stone-950"
                            : "bg-slate-950/80 border-white/10 text-stone-300 hover:text-sky-400 hover:border-sky-500/30"
                        }`}
                        title="Partager ce produit"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      {sharingProductId === product.id && (
                        <div 
                          className="bg-slate-950/95 border border-sky-500/30 rounded-xl p-2 flex flex-col gap-1 shadow-2xl backdrop-blur-lg animate-fade-in text-[10px] min-w-[130px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a
                            href={getShareUrl("twitter", product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <span>🐦 Twitter / X</span>
                          </a>
                          <a
                            href={getShareUrl("facebook", product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <span>👥 Facebook</span>
                          </a>
                          <a
                            href={getShareUrl("whatsapp", product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <span>💬 WhatsApp</span>
                          </a>
                          <button
                            onClick={(e) => copyShareLink(e, product)}
                            className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-left"
                          >
                            <span className="flex items-center gap-2">🔗 Copier le lien</span>
                            {copiedProductId === product.id && (
                              <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Quick View Button */}
                    <button
                      id={`quick-view-${product.id}`}
                      onClick={() => onSelectProduct(product)}
                      className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/10 border border-white/15 text-stone-200 hover:text-white hover:bg-sky-900 transition-all backdrop-blur-md cursor-pointer opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      title="Analyse architecturale 3D"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* DESCRIPTIF & INFOS */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif text-lg leading-tight text-stone-100 group-hover:text-amber-200 transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-base text-amber-200/90 font-arabic font-normal">{product.arabicName}</p>
                      <p className="text-stone-400 text-xs font-light line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* FINITION SELECTOR */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="flex justify-between text-[10px] text-stone-400 font-mono tracking-wider uppercase">
                        <span>Finition active :</span>
                        <span className="text-stone-200 font-medium">{selectedMat.name}</span>
                      </div>
                      <div className="flex gap-1.5">
                        {product.materials.map(mat => (
                          <button
                            key={mat.id}
                            id={`card-swatch-${product.id}-${mat.id}`}
                            onClick={() => handleMaterialSelect(product.id, mat.id)}
                            className={`w-7 h-7 rounded-full border transition-all duration-300 flex items-center justify-center relative cursor-pointer ${
                              selectedMat.id === mat.id ? "border-sky-500 scale-110 shadow shadow-sky-500/20" : "border-slate-800 hover:border-slate-600"
                            }`}
                            style={{ backgroundColor: mat.colorHex }}
                          >
                            {selectedMat.id === mat.id && (
                              <Check className="w-3 h-3 text-white mix-blend-difference" />
                            )}
                            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-slate-950 text-[8px] text-stone-200 px-1 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-mono">
                              {mat.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* DIMENSIONS & TARIFS */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">Dimensions</span>
                        <p className="text-[11px] text-stone-300 font-mono">
                          {product.dimensions.width}m × {product.dimensions.depth}m × {product.dimensions.height}m
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block">Tarif</span>
                        <span className="text-lg font-serif font-bold text-amber-200/95">
                          {totalPrice.toLocaleString("fr-DZ")} DZD
                        </span>
                      </div>
                    </div>

                    {/* APPOINTMENT / QUOTE BUTTON */}
                    <button
                      id={`appointment-product-btn-${product.id}`}
                      onClick={() => {
                        const el = document.getElementById("appointment-contact-section");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        } else {
                          onSelectProduct(product);
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-sky-950/80 hover:bg-sky-900 border border-sky-500/30 text-sky-300 hover:text-white transition-all cursor-pointer shadow-md uppercase tracking-wider font-mono text-[11px] rounded-xl"
                    >
                      Prendre Rendez-vous / Devis
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
