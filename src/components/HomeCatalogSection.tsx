import React, { useState } from "react";
import { PRODUCTS } from "../data";
import { FurnitureProduct } from "../types";
import { Sparkles, ArrowUpRight, Check, Compass, Sliders, Share2, Link } from "lucide-react";
import { motion } from "motion/react";

interface HomeCatalogSectionProps {
  onSelectProduct: (product: FurnitureProduct) => void;
  onPlaceInPlanner: (productId: string) => void;
  activeProductId: string;
}

export default function HomeCatalogSection({
  onSelectProduct,
  onPlaceInPlanner,
  activeProductId
}: HomeCatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Tout");
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

  const categories = ["Tout", "Salon", "Salle à Manger", "Chambre", "Luminaire"];

  const categoryMap: Record<string, string> = {
    "Tout": "All",
    "Salon": "Salon",
    "Salle à Manger": "Salle à Manger",
    "Chambre": "Chambre",
    "Luminaire": "Luminaire"
  };

  const filteredProducts = activeCategory === "Tout"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleConfigure3D = (product: FurnitureProduct) => {
    onSelectProduct(product);
    const el = document.getElementById("hero-showroom-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
    card.style.transition = "transform 0.1s ease, box-shadow 0.2s ease";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)";
    card.style.boxShadow = "none";
    card.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease";
  };

  return (
    <section 
      id="home-catalogue-section" 
      className="py-24 px-6 lg:px-16 bg-[#02040a] text-stone-100 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* EN-TÊTE DE SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono tracking-widest text-sky-400 uppercase block">
              La Collection Signature
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-stone-100 leading-none">
              Le Catalogue d'Art Mobimall
            </h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Explorez nos créations d'exception. Chaque pièce est façonnée sur mesure dans nos ateliers avec les plus belles essences locales.
            </p>
          </div>

          {/* SÉLECTEUR DE CATÉGORIES */}
          <div className="flex flex-wrap gap-2 bg-slate-950 border border-white/5 p-1.5 rounded-xl self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-sky-900/60 border border-sky-500/20 text-white shadow-md shadow-sky-900/15"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLE DES PRODUITS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isCurrentlySelected = activeProductId === product.id;

            return (
              <motion.div
                layout
                key={product.id}
                id={`home-product-card-${product.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative group rounded-2xl bg-slate-950/40 border transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                  isCurrentlySelected
                    ? "border-sky-500 bg-slate-950/60 ring-1 ring-sky-500/20"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Aperçu visuel */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                  
                  {/* Catégorie */}
                  <span className="absolute top-4 left-4 bg-slate-950/80 border border-white/10 text-[9px] font-mono uppercase tracking-widest text-sky-400 px-2.5 py-1 rounded-full backdrop-blur-md">
                    {product.category}
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

                  {/* Indicateur de Sélection */}
                  {isCurrentlySelected && (
                    <span className="absolute top-4 right-14 bg-sky-500 text-stone-950 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-lg shadow-sky-500/20">
                      <Check className="w-3 h-3 stroke-[3]" /> Actif 3D
                    </span>
                  )}

                  {/* Prix initial & Collection */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-mono text-stone-400 tracking-wider uppercase">Collection</p>
                      <p className="text-xs text-stone-200 font-medium">{product.collection}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-stone-400 tracking-wider uppercase">Tarif</p>
                      <p className="text-xl font-serif font-bold text-amber-200/95">
                        {product.basePrice.toLocaleString("fr-DZ")} DZD
                      </p>
                    </div>
                  </div>
                </div>

                {/* Descriptif détaillé */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-slate-950/20">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-serif tracking-tight text-stone-200 leading-tight group-hover:text-amber-200 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-base text-amber-200/90 font-arabic text-right font-normal tracking-wide">
                      {product.arabicName}
                    </p>
                    <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Matières d'habillage */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">
                      Options d'habillage ({product.materials.length})
                    </span>
                    <div className="flex gap-2">
                      {product.materials.map((mat) => (
                        <div
                          key={mat.id}
                          className="w-5 h-5 rounded-full border border-white/10 relative group/swatch"
                          style={{ backgroundColor: mat.colorHex }}
                          title={mat.name}
                        >
                          <span className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-slate-950 text-[8px] text-stone-200 px-2 py-0.5 rounded opacity-0 group-hover/swatch:opacity-100 transition-opacity whitespace-nowrap z-20 font-mono border border-white/5 pointer-events-none">
                            {mat.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions boutons */}
                  <div className="pt-4">
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
                      className="w-full flex items-center justify-center gap-2 py-3 bg-sky-950/80 hover:bg-sky-900 border border-sky-500/30 text-sky-300 hover:text-white rounded-xl transition-all text-xs font-mono uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-sky-500/10"
                    >
                      <span>Prendre Rendez-vous / Devis</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
