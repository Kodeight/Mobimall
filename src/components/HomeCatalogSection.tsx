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
      className="py-24 px-6 lg:px-16 border-t"
      style={{ background: "var(--bg-mid)", color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* EN-TÊTE DE SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="type-label block" style={{ color: "var(--accent)" }}>
              La Collection Signature
            </span>
            <h2 className="type-h2 leading-none" style={{ color: "var(--text-primary)" }}>
              Le Catalogue d'Art Mobimall
            </h2>
            <p className="type-body-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Explorez nos créations d'exception. Chaque pièce est façonnée sur mesure dans nos ateliers avec les plus belles essences locales.
            </p>
          </div>

          {/* SÉLECTEUR DE CATÉGORIES */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl self-start md:self-end" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
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
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative group rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-500"
                style={{
                  background: isCurrentlySelected ? "var(--bg-elevated)" : "var(--bg-card)",
                  border: `1px solid ${isCurrentlySelected ? "var(--accent-border)" : "var(--border-subtle)"}`,
                  boxShadow: isCurrentlySelected ? "var(--shadow-glow)" : "none",
                }}
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
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bg-base) 0%, transparent 60%)", opacity: 0.9 }} />
                  
                  {/* Catégorie */}
                  <span className="absolute top-4 left-4 border text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md" style={{ background: "var(--bg-overlay)", borderColor: "var(--border-subtle)", color: "var(--accent)" }}>
                    {product.category}
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
                        <a
                          href={getShareUrl("twitter", product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span>🐦 Twitter / X</span>
                        </a>
                        <a
                          href={getShareUrl("facebook", product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span>👥 Facebook</span>
                        </a>
                        <a
                          href={getShareUrl("whatsapp", product)}
                          target="_blank"
                          rel="noopener noreferrer"
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

                  {/* Indicateur de Sélection */}
                  {isCurrentlySelected && (
                    <span className="absolute top-4 right-14 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-lg" style={{ background: "var(--accent)", color: "#fff" }}>
                      <Check className="w-3 h-3 stroke-[3]" /> Actif 3D
                    </span>
                  )}

                  {/* Prix initial & Collection */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: "var(--text-tertiary)" }}>Collection</p>
                      <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{product.collection}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: "var(--text-tertiary)" }}>Tarif</p>
                      <p className="text-xl font-serif font-bold" style={{ color: "var(--text-accent)" }}>
                        {product.basePrice.toLocaleString("fr-DZ")} DZD
                      </p>
                    </div>
                  </div>
                </div>

                {/* Descriptif détaillé */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="type-h3 leading-tight transition-colors" style={{ color: "var(--text-primary)" }}>
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-base font-arabic text-right font-normal tracking-wide" style={{ color: "var(--text-accent)" }}>
                      {product.arabicName}
                    </p>
                    <p className="text-xs font-light leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                      {product.description}
                    </p>
                  </div>

                  {/* Matières d'habillage */}
                  <div className="space-y-2 pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <span className="text-[9px] font-mono uppercase tracking-widest block" style={{ color: "var(--text-tertiary)" }}>
                      Options d'habillage ({product.materials.length})
                    </span>
                    <div className="flex gap-2">
                      {product.materials.map((mat) => (
                        <div
                          key={mat.id}
                          className="w-5 h-5 rounded-full border relative group/swatch"
                          style={{ backgroundColor: mat.colorHex, borderColor: "var(--border-default)" }}
                          title={mat.name}
                        >
                          <span className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[8px] px-2 py-0.5 rounded opacity-0 group-hover/swatch:opacity-100 transition-opacity whitespace-nowrap z-20 font-mono border pointer-events-none" style={{ background: "var(--bg-overlay)", color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}>
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
                      className="btn-press w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all cursor-pointer uppercase tracking-wider font-mono text-[11px]"
                      style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}
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
