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
    <section id="catalog-section" className="py-24 px-6 lg:px-16 border-t" style={{ background: "var(--bg-base)", color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* EN-TÊTE DE SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="type-label" style={{ color: "var(--accent)" }}>Catalogue d'Exception</span>
            <h2 className="type-h2" style={{ color: "var(--text-primary)" }}>
              Les Chefs-d'œuvre Numériques
            </h2>
            <p className="type-body-sm font-light leading-relaxed max-w-lg" style={{ color: "var(--text-secondary)" }}>
              Explorez les collections d'exception de Mobimall Algérie. Chaque chef-d'œuvre allie rigueur architecturale contemporaine et patrimoine régional précieux.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
            <Grid className="w-4 h-4" style={{ color: "var(--accent)" }} /> Affichage de {filteredProducts.length} créations uniques
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
            className="w-full pl-10 pr-24 py-3.5 rounded-xl text-xs outline-none transition-all"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}
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
              className="p-1.5 rounded-lg border transition-all cursor-pointer"
              style={isListening
                ? { background: "rgba(239,68,68,0.15)", borderColor: "rgba(239,68,68,0.5)", color: "#f87171" }
                : { background: "var(--bg-elevated)", borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
              title={isListening ? "Écoute en cours..." : "Recherche vocale"}
            >
              {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* BARRE DE FILTRES : CATÉGORIES & COLLECTIONS */}
        <div className="space-y-4">
          {/* Filtre Catégories */}
          <div className="flex flex-wrap items-center gap-1.5 pb-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            <span className="text-xs font-mono uppercase mr-4" style={{ color: "var(--text-tertiary)" }}>Catégorie :</span>
            {categories.map(cat => (
              <button
                key={cat}
                id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className="btn-press px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all uppercase cursor-pointer"
                style={
                  activeCategory === cat
                    ? { background: "var(--accent-bg)", border: "1px solid var(--accent-border)", color: "var(--accent)" }
                    : { background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filtre Collections */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs font-mono uppercase mr-4" style={{ color: "var(--text-tertiary)" }}>Collection :</span>
            {collections.map(col => (
              <button
                key={col}
                id={`filter-collection-${col.toLowerCase()}`}
                onClick={() => setActiveCollection(col)}
                className="btn-press px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer"
                style={
                  activeCollection === col
                    ? { background: "var(--text-primary)", color: "var(--bg-base)", fontWeight: 600 }
                    : { background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }
                }
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
          <div className="text-center py-20 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <Compass className="w-12 h-12 mx-auto animate-pulse mb-4" style={{ color: "var(--text-tertiary)" }} />
            <p className="font-light" style={{ color: "var(--text-secondary)" }}>Aucun modèle ne correspond à vos critères de recherche.</p>
            <button
              id="clear-filters-btn"
              onClick={() => { setActiveCategory("Tout"); setActiveCollection("Toutes"); setSearchQuery(""); }}
              className="btn-press mt-4 px-4 py-2 rounded-lg text-xs transition-all"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
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
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-500"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", backdropFilter: "blur(12px)" }}
                >
                  {/* IMAGE & BADGES */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />

                    {/* Dégradé visuel */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bg-base) 0%, transparent 60%)", opacity: 0.85 }} />

                    {/* Collection badge */}
                    <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded-md" style={{ background: "var(--bg-overlay)", border: "1px solid var(--border-default)", color: "var(--accent)" }}>
                      Collection {product.collection}
                    </span>

                    {/* Share Button & Popup */}
                    <div className="absolute top-4 right-4 z-15 flex flex-col items-end gap-2">
                      <button
                        onClick={(e) => triggerShare(e, product.id)}
                        className="p-2 rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer"
                        style={sharingProductId === product.id
                          ? { background: "var(--accent)", borderColor: "var(--accent)", color: "#fff" }
                          : { background: "var(--bg-overlay)", borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
                        title="Partager ce produit"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      {sharingProductId === product.id && (
                        <div 
                          className="rounded-xl p-2 flex flex-col gap-1 shadow-2xl backdrop-blur-lg text-[10px] min-w-[130px]"
                          style={{ background: "var(--bg-overlay)", border: "1px solid var(--accent-border)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a href={getShareUrl("twitter", product)} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <span>🐦 Twitter / X</span>
                          </a>
                          <a href={getShareUrl("facebook", product)} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <span>👥 Facebook</span>
                          </a>
                          <a href={getShareUrl("whatsapp", product)} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <span>💬 WhatsApp</span>
                          </a>
                          <button
                            onClick={(e) => copyShareLink(e, product)}
                            className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer text-left"
                            style={{ color: "var(--text-secondary)" }}
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
                      className="absolute bottom-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      style={{ background: "var(--bg-overlay)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                      title="Analyse architecturale 3D"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* DESCRIPTIF & INFOS */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif text-lg leading-tight transition-colors" style={{ color: "var(--text-primary)" }}>
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-base font-arabic font-normal" style={{ color: "var(--text-accent)" }}>{product.arabicName}</p>
                      <p className="text-xs font-light line-clamp-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {product.description}
                      </p>
                    </div>

                    {/* FINITION SELECTOR */}
                     <div className="space-y-2 pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                      <div className="flex justify-between text-[10px] font-mono tracking-wider uppercase" style={{ color: "var(--text-tertiary)" }}>
                        <span>Finition active :</span>
                        <span style={{ color: "var(--text-primary)" }}>{selectedMat.name}</span>
                      </div>
                      <div className="flex gap-1.5">
                        {product.materials.map(mat => (
                          <button
                            key={mat.id}
                            id={`card-swatch-${product.id}-${mat.id}`}
                            onClick={() => handleMaterialSelect(product.id, mat.id)}
                             className={`w-7 h-7 rounded-full border transition-all duration-300 flex items-center justify-center relative cursor-pointer ${
                               selectedMat.id === mat.id ? "border-sky-500 scale-110 shadow shadow-sky-500/20" : ""
                             }`}
                             style={{ backgroundColor: mat.colorHex, borderColor: selectedMat.id === mat.id ? undefined : "var(--border-default)" }}
                          >
                            {selectedMat.id === mat.id && (
                              <Check className="w-3 h-3 text-white mix-blend-difference" />
                            )}
                            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[8px] px-1 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-mono" style={{ background: "var(--bg-overlay)", color: "var(--text-primary)" }}>
                              {mat.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* DIMENSIONS & TARIFS */}
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>Dimensions</span>
                        <p className="text-[11px] font-mono" style={{ color: "var(--text-secondary)" }}>
                          {product.dimensions.width}m × {product.dimensions.depth}m × {product.dimensions.height}m
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: "var(--text-tertiary)" }}>Tarif</span>
                        <span className="text-lg font-serif font-bold" style={{ color: "var(--text-accent)" }}>
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
                      className="btn-press w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all cursor-pointer uppercase tracking-wider font-mono text-[11px]"
                      style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}
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
