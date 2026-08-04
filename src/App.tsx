import React, { useState, useEffect, useRef } from "react";
import ShowroomHero from "./components/ShowroomHero";
import ProductCatalog from "./components/ProductCatalog";
import AppointmentSection from "./components/AppointmentSection";
import ShowroomMap from "./components/ShowroomMap";
import ShowroomFooter from "./components/ShowroomFooter";
import HomeCatalogSection from "./components/HomeCatalogSection";
import HomePhilosophySection from "./components/HomePhilosophySection";
import ShowroomFAQ from "./components/ShowroomFAQ";
import ShowroomCareTips from "./components/ShowroomCareTips";
import { FurnitureProduct } from "./types";
import { PRODUCTS } from "./data";
import { Compass, Eye, Heart, Layers, Sparkles, Check, ChevronRight, Bookmark, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"showroom" | "catalog" | "appointment">("showroom");
  const [selectedProduct, setSelectedProduct] = useState<FurnitureProduct>(PRODUCTS[0]);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Floating feedback notice
  const [notification, setNotification] = useState<string | null>(null);

  const heritageRef = useRef<HTMLDivElement>(null);

  // Scroll listener for the navigation-bar scroll state change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // GSAP Reveal Animation trigger on scroll
  useEffect(() => {
    if (activeTab !== "showroom") return;

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a context to cleanly manage animations
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: "#showroom-heritage-section",
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 35,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out"
      });

      gsap.from(".reveal-image", {
        scrollTrigger: {
          trigger: "#showroom-heritage-section",
          start: "top 75%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1.1,
        stagger: 0.2,
        ease: "power2.out"
      });
    }, heritageRef);

    // Clean up animation on tab changes / unmount
    return () => {
      ctx.revert();
    };
  }, [activeTab]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleOpenAppointment = (product?: FurnitureProduct) => {
    if (product) setSelectedProduct(product);
    setActiveTab("appointment");
    triggerNotification("Formulaire de réservation de rendez-vous ouvert.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Redirect to flagship locations and map area
  const handleNavigateToLocations = () => {
    setActiveTab("showroom");
    triggerNotification("Redirection vers nos showrooms d'Alger et d'Oran.");

    setTimeout(() => {
      const el = document.getElementById("showroom-locations-section");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div id="main-flagship-container" className="min-h-screen bg-[#070913] text-stone-100 font-sans selection:bg-slate-800 selection:text-white">
      
      {/* BANNIÈRE DE NOTIFICATION FLOTTANTE */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce bg-slate-900 border border-sky-500/20 text-sky-200 px-5 py-3.5 rounded-xl flex items-center gap-3 shadow-2xl backdrop-blur-md max-w-sm">
          <Check className="w-5 h-5 shrink-0 text-sky-400" />
          <p className="text-xs font-medium font-mono leading-relaxed">{notification}</p>
        </div>
      )}

      {/* BARRE DE NAVIGATION SUPÉRIEURE */}
      <nav id="main-navigation-bar" className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300 ${
        scrolled 
          ? "bg-[#04060c]/95 border-white/10 backdrop-blur-2xl shadow-lg shadow-black/30" 
          : "bg-[#04060c]/80 border-white/5 backdrop-blur-xl"
      }`}>
        <div className={`max-w-7xl mx-auto px-6 lg:px-16 relative flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-20"
        }`}>
          
          {/* Logo de la marque */}
          <div className="flex items-center gap-3">
            <img 
              src="/src/assets/images/mobimall_logo_1784651556024.jpg" 
              alt="Mobimall" 
              className="w-10 h-10 rounded-full object-cover border border-white/10"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-widest font-semibold text-white leading-none">MOBIMALL</span>
              <span className="text-[9px] text-stone-400 font-mono tracking-widest uppercase mt-1">Maison de Prestige Algérienne</span>
            </div>
          </div>

          {/* Onglets de navigation */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-[calc(50%+40px)] items-center gap-1.5">
            {[
              { id: "showroom", label: "Showroom" },
              { id: "catalog", label: "Collections" },
              { id: "appointment", label: "Rendez-vous & Contact" }
            ].map(tab => (
              <button
                key={tab.id}
                id={`nav-link-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-white/5 border border-white/10 text-sky-400 font-bold" 
                    : "text-stone-400 hover:text-stone-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Actions à droite */}
          <div className="flex items-center gap-4">
            {/* Statut de l'onglet actif sur mobile */}
            <span className="md:hidden text-[10px] font-mono bg-stone-900 border border-white/10 text-stone-400 px-2 py-1 rounded">
              {activeTab === "showroom" ? "Showroom" : activeTab === "catalog" ? "Collections" : "Rendez-vous"}
            </span>

            <button
              id="view-locations-shortcut-btn"
              onClick={handleNavigateToLocations}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-sky-950/20 border border-white/10 text-stone-300 hover:text-sky-400 transition-all cursor-pointer text-xs font-mono flex items-center gap-2"
              title="Visiter nos salons d'Alger et d'Oran"
            >
              <Compass className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="hidden sm:inline uppercase text-[10px] tracking-wider">Nos Salons</span>
            </button>
          </div>

        </div>
      </nav>

      {/* RENDER ACTIVE SCREEN */}
      <main className="overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "showroom" && (
            <motion.div
              key="showroom-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* HERO COMPONENT */}
              <ShowroomHero selectedProduct={selectedProduct} onPlaceInPlanner={(id) => handleOpenAppointment(PRODUCTS.find(p => p.id === id))} />

              {/* INTERACTIVE DYNAMIC CATALOG GRIDS */}
              <HomeCatalogSection 
                onSelectProduct={(prod) => handleOpenAppointment(prod)} 
                onPlaceInPlanner={(id) => handleOpenAppointment(PRODUCTS.find(p => p.id === id))} 
                activeProductId={selectedProduct.id} 
              />

              {/* ARTISANAL PRESTIGE CONTENT BLOCK WITH GSAP REVEALS */}
              <section 
                id="showroom-heritage-section" 
                ref={heritageRef}
                className="py-24 px-6 lg:px-16 bg-[#0f0e0d] text-stone-100 border-t border-white/5 overflow-hidden"
              >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-xs font-mono tracking-widest text-sky-400 uppercase block reveal-text">Le Savoir-Faire Tellien</span>
                    <h3 className="text-3xl sm:text-4xl font-serif tracking-tight leading-tight reveal-text">
                      Des Matériaux de Prestige et d'Histoire
                    </h3>
                    <p className="text-stone-400 text-sm font-light leading-relaxed reveal-text">
                      Chaque courbe de notre mobilier rend hommage aux paysages légendaires de l'Algérie. Des structures sculptées dans le chêne de l'Atlas au cuir tressé à la main selon les techniques séculaires de Kabylie, nous dessinons l'élégance de demain.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 rounded-xl bg-stone-900/40 border border-white/5 space-y-1 reveal-text">
                        <span className="text-xs text-sky-400 font-mono">01. Origine Certifiée</span>
                        <p className="text-stone-300 text-xs font-light">Bois de noyer du Sahara et marbre cristallin de Constantine.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-stone-900/40 border border-white/5 space-y-1 reveal-text">
                        <span className="text-xs text-sky-400 font-mono">02. Design Élite</span>
                        <p className="text-stone-300 text-xs font-light">Un raffinement géométrique digne d'un musée contemporain.</p>
                      </div>
                    </div>

                    <button
                      id="explore-heritage-collections-btn"
                      onClick={() => setActiveTab("catalog")}
                      className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors uppercase tracking-wider group cursor-pointer pt-2 reveal-text"
                    >
                      Parcourir les essences d'art <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group reveal-image">
                      <img 
                        src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600" 
                        alt="Détail du travail du bois artisanal" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-xs font-mono text-stone-200">Placage Noyer Sahara</span>
                    </div>

                    <div className="space-y-4 flex flex-col justify-between">
                      <div className="relative aspect-square rounded-2xl overflow-hidden group reveal-image">
                        <img 
                          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600" 
                          alt="Détail du tissu bouclé" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                        <span className="absolute bottom-4 left-4 text-xs font-mono text-stone-200">Bouclé Tassili</span>
                      </div>

                      <div className="p-6 rounded-2xl bg-stone-900/30 border border-white/5 space-y-2 flex-1 flex flex-col justify-center reveal-image">
                        <span className="text-[10px] text-sky-400 font-mono uppercase tracking-wider block">Salon Privé</span>
                        <p className="font-serif text-sm text-stone-200">Disponible à Alger</p>
                        <p className="text-xs text-stone-500 font-light leading-relaxed">
                          Prenez rendez-vous dans notre salon d'Aïn Benian pour toucher nos échantillons de cuirs précieux.
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              </section>

              {/* DETAILED INTERACTIVE DESIGN PHILOSOPHY & TESTIMONIALS */}
              <HomePhilosophySection />

              {/* DYNAMIC ACCORDION FAQ SECTION */}
              <ShowroomFAQ />

              {/* INTERACTIVE SPECIFIC MATERIAL CARE TIPS */}
              <ShowroomCareTips />

              {/* INTERACTIVE STORE LOCATOR GOOGLE MAP */}
              <ShowroomMap />
            </motion.div>
          )}

          {activeTab === "catalog" && (
            <motion.div
              key="catalog-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="pt-12"
            >
              <ProductCatalog 
                onPlaceInPlanner={(id) => handleOpenAppointment(PRODUCTS.find(p => p.id === id))}
                onSelectProduct={(prod) => {
                  setSelectedProduct(prod);
                  handleOpenAppointment(prod);
                }}
              />
            </motion.div>
          )}

          {activeTab === "appointment" && (
            <motion.div
              key="appointment-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="pt-12"
            >
              <AppointmentSection preselectedProductName={selectedProduct?.name} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <ShowroomFooter />

    </div>
  );
}
