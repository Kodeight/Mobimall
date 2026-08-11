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
import { ThemeProvider, useTheme } from "./ThemeContext";
import { Compass, Check, ChevronRight, Sun, Moon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

/* ── Theme Toggle Button ───────────────────────────────────── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      title={theme === "dark" ? "Mode Clair" : "Mode Sombre"}
      className="btn-press p-2.5 rounded-xl border transition-colors duration-200 cursor-pointer flex items-center justify-center"
      style={{
        background: "var(--surface-glass)",
        borderColor: "var(--border-default)",
        color: "var(--text-secondary)",
      }}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" style={{ color: "var(--accent)" }} />
      ) : (
        <Moon className="w-4 h-4" style={{ color: "var(--accent)" }} />
      )}
    </button>
  );
}

/* ── Inner App (needs theme context) ──────────────────────── */
function AppInner() {
  const [activeTab, setActiveTab] = useState<"showroom" | "catalog" | "appointment">("showroom");
  const [selectedProduct, setSelectedProduct] = useState<FurnitureProduct>(PRODUCTS[0]);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const heritageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeTab !== "showroom") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: "#showroom-heritage-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 35,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
      });
      gsap.from(".reveal-image", {
        scrollTrigger: {
          trigger: "#showroom-heritage-section",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1.1,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, heritageRef);
    return () => ctx.revert();
  }, [activeTab]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenAppointment = (product?: FurnitureProduct) => {
    if (product) setSelectedProduct(product);
    setActiveTab("appointment");
    triggerNotification("Formulaire de réservation de rendez-vous ouvert.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToLocations = () => {
    setActiveTab("showroom");
    triggerNotification("Redirection vers nos showrooms d'Alger et d'Oran.");
    setTimeout(() => {
      document.getElementById("showroom-locations-section")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div
      id="main-flagship-container"
      className="min-h-screen font-sans"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      {/* ── FLOATING NOTIFICATION ─────────────────────────────── */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl max-w-sm"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--accent-border)",
              color: "var(--text-link)",
              boxShadow: "var(--shadow-lg)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Check className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
            <p className="text-xs font-medium leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>
              {notification}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVIGATION ────────────────────────────────────────── */}
      <nav
        id="main-navigation-bar"
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg-idle)",
          borderBottom: `1px solid ${scrolled ? "var(--border-default)" : "var(--border-subtle)"}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: scrolled ? "var(--shadow-md)" : "none",
        }}
      >
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-16 relative flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/mobimall_logo_1784651556024.jpg"
              alt="Mobimall"
              className="w-9 h-9 rounded-full object-cover"
              style={{ border: "1px solid var(--border-default)" }}
            />
            <div className="flex flex-col">
              <span
                className="text-lg tracking-widest font-semibold leading-none"
                style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
              >
                MOBIMALL
              </span>
              <span
                className="text-[9px] tracking-widest uppercase mt-1"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
              >
                Maison de Prestige Algérienne
              </span>
            </div>
          </div>

          {/* Nav tabs */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-[calc(50%+40px)] items-center gap-1.5">
            {[
              { id: "showroom", label: "Showroom" },
              { id: "catalog", label: "Collections" },
              { id: "appointment", label: "Rendez-vous & Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`nav-link-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className="btn-press px-5 py-2 rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: activeTab === tab.id ? "var(--surface-glass)" : "transparent",
                  border: `1px solid ${activeTab === tab.id ? "var(--border-default)" : "transparent"}`,
                  color: activeTab === tab.id ? "var(--accent)" : "var(--text-secondary)",
                  fontWeight: activeTab === tab.id ? 600 : 400,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Mobile active tab indicator */}
            <span
              className="md:hidden text-[10px] px-2 py-1 rounded"
              style={{
                fontFamily: "var(--font-mono)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-tertiary)",
              }}
            >
              {activeTab === "showroom" ? "Showroom" : activeTab === "catalog" ? "Collections" : "Rendez-vous"}
            </span>

            <button
              id="view-locations-shortcut-btn"
              onClick={handleNavigateToLocations}
              className="btn-press p-2.5 rounded-xl border transition-colors cursor-pointer text-xs font-mono flex items-center gap-2"
              title="Visiter nos salons d'Alger et d'Oran"
              style={{
                background: "var(--surface-glass)",
                borderColor: "var(--border-default)",
                color: "var(--text-secondary)",
              }}
            >
              <Compass className="w-4 h-4" style={{ color: "var(--accent)", animation: "spin 8s linear infinite" }} />
              <span className="hidden sm:inline uppercase text-[10px] tracking-wider">Nos Salons</span>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      <main className="overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "showroom" && (
            <motion.div
              key="showroom-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              <ShowroomHero
                selectedProduct={selectedProduct}
                onPlaceInPlanner={(id) => handleOpenAppointment(PRODUCTS.find((p) => p.id === id))}
              />

              <HomeCatalogSection
                onSelectProduct={(prod) => handleOpenAppointment(prod)}
                onPlaceInPlanner={(id) => handleOpenAppointment(PRODUCTS.find((p) => p.id === id))}
                activeProductId={selectedProduct.id}
              />

              {/* HERITAGE SECTION */}
              <section
                id="showroom-heritage-section"
                ref={heritageRef}
                className="py-24 px-6 lg:px-16 border-t overflow-hidden"
                style={{
                  background: "var(--bg-mid)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <span className="type-label block reveal-text" style={{ color: "var(--accent)" }}>
                      Le Savoir-Faire Tellien
                    </span>
                    <h3 className="type-h2 reveal-text" style={{ color: "var(--text-primary)" }}>
                      Des Matériaux de Prestige et d'Histoire
                    </h3>
                    <p className="type-body-sm font-light leading-relaxed reveal-text" style={{ color: "var(--text-secondary)" }}>
                      Chaque courbe de notre mobilier rend hommage aux paysages légendaires de l'Algérie. Des structures sculptées dans le chêne de l'Atlas au cuir tressé à la main selon les techniques séculaires de Kabylie, nous dessinons l'élégance de demain.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {[
                        { num: "01.", title: "Origine Certifiée", desc: "Bois de noyer du Sahara et marbre cristallin de Constantine." },
                        { num: "02.", title: "Design Élite", desc: "Un raffinement géométrique digne d'un musée contemporain." },
                      ].map((item) => (
                        <div
                          key={item.num}
                          className="p-4 rounded-xl space-y-1 reveal-text"
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          <span className="type-label" style={{ color: "var(--accent)" }}>
                            {item.num} {item.title}
                          </span>
                          <p className="text-xs font-light" style={{ color: "var(--text-secondary)" }}>
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      id="explore-heritage-collections-btn"
                      onClick={() => setActiveTab("catalog")}
                      className="btn-press inline-flex items-center gap-2 type-label hover:opacity-70 transition-opacity uppercase tracking-wider group cursor-pointer pt-2 reveal-text"
                      style={{ color: "var(--accent)" }}
                    >
                      Parcourir les essences d'art{" "}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, var(--bg-mid) 0%, transparent 60%)" }}
                      />
                      <span className="absolute bottom-4 left-4 type-label" style={{ color: "var(--text-secondary)" }}>
                        Placage Noyer Sahara
                      </span>
                    </div>

                    <div className="space-y-4 flex flex-col justify-between">
                      <div className="relative aspect-square rounded-2xl overflow-hidden group reveal-image">
                        <img
                          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600"
                          alt="Détail du tissu bouclé"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(to top, var(--bg-mid) 0%, transparent 60%)" }}
                        />
                        <span className="absolute bottom-4 left-4 type-label" style={{ color: "var(--text-secondary)" }}>
                          Bouclé Tassili
                        </span>
                      </div>

                      <div
                        className="p-6 rounded-2xl space-y-2 flex-1 flex flex-col justify-center reveal-image"
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <span className="type-label block" style={{ color: "var(--accent)" }}>
                          Salon Privé
                        </span>
                        <p className="type-h3" style={{ color: "var(--text-primary)" }}>
                          Disponible à Alger
                        </p>
                        <p className="type-body-sm font-light leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                          Prenez rendez-vous dans notre salon d'Aïn Benian pour toucher nos échantillons de cuirs précieux.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <HomePhilosophySection />
              <ShowroomFAQ />
              <ShowroomCareTips />
              <ShowroomMap />
            </motion.div>
          )}

          {activeTab === "catalog" && (
            <motion.div
              key="catalog-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="pt-12"
            >
              <ProductCatalog
                onPlaceInPlanner={(id) => handleOpenAppointment(PRODUCTS.find((p) => p.id === id))}
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
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="pt-12"
            >
              <AppointmentSection preselectedProductName={selectedProduct?.name} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ShowroomFooter />
    </div>
  );
}

/* ── Root Export ─────────────────────────────────────────── */
export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
