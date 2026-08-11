import React from "react";
import { Sparkles, Star, Quote, Award, ShieldCheck, Landmark } from "lucide-react";
import { motion } from "motion/react";

export default function HomePhilosophySection() {
  const materialsPhilosophy = [
    {
      id: "oak",
      title: "Chêne de l'Atlas",
      arabic: "خشب الأطلس العريق",
      desc: "Provenant de forêts gérées de manière durable dans la chaîne de l'Atlas. Un bois d'une densité exceptionnelle, sculpté avec précision numérique avant d'être fini à la main par des ébénistes d'art.",
      icon: Landmark,
      color: "border-sky-500/20 text-sky-400"
    },
    {
      id: "leather",
      title: "Cuir Souple du Hoggar",
      arabic: "جلد الهقار المدبوغ",
      desc: "Chaque pièce d'assise est enveloppée de cuir pleine fleur au tannage végétal, provenant des plateaux arides du Sud algérien. Les finitions coutures croisées rendent hommage aux motifs d'harnachement traditionnels.",
      icon: Award,
      color: "border-sky-500/20 text-sky-400"
    },
    {
      id: "marble",
      title: "Marbre Blanc de Constantine",
      arabic: "رخام قسنطينة الفاخر",
      desc: "Un calcaire cristallin prélevé dans les carrières millénaires de l'Est algérien. Poli à fleur d'eau, sa texture soyeuse réfléchit la lumière naturelle pour conférer une allure monumentale aux plateaux de table.",
      icon: ShieldCheck,
      color: "border-sky-500/20 text-sky-400"
    }
  ];

  const clientSpaces = [
    {
      id: "space-1",
      location: "Appartement Traditionnel, Alger Centre",
      client: "Amine K. — Collectionneur d'Art",
      comment: "Le fauteuil sculptural Tassili n'est pas seulement un siège; c'est une véritable sculpture de salon. Le contraste entre le chêne noir sablé et le tissu bouclé apporte exactement le raffinement que nous recherchions pour notre espace de réception.",
      product: "Fauteuil Sculptural Tassili",
      verifiedTag: "Achat & Installation Vérifiés",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "space-2",
      location: "Villa Contemporaine, Les Falaises (Oran)",
      client: "Dr. Selma B.",
      comment: "L'assemblage modulaire de l'ensemble Casbah nous permet de réinventer notre intérieur au gré des réceptions face à la mer. Le socle en chêne donne un effet suspendu absolument magique.",
      product: "Canapé Minimaliste Casbah",
      verifiedTag: "Client VIP Vérifié — Oran",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section
      id="home-philosophy-section"
      className="py-24 px-6 lg:px-16 border-t space-y-24"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* DIVISION 1: THREE-COLUMN PHILOSOPHY HIGHLIGHT */}
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="type-label block" style={{ color: "var(--accent)" }}>
              L'Esprit des Matières
            </span>
            <h2 className="type-h2" style={{ color: "var(--text-primary)" }}>
              L'Excellence du Mobilier Paramétrique
            </h2>
            <div className="w-12 h-0.5 mx-auto mt-4" style={{ background: "var(--accent)" }} />
            <p className="type-body-sm font-light leading-relaxed pt-2" style={{ color: "var(--text-secondary)" }}>
              Nous allions la poésie des matières organiques d'Algérie au génie du design algorithmique pour sculpter des formes audacieuses qui traverseront le temps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materialsPhilosophy.map((philosophy) => {
              const Icon = philosophy.icon;
              return (
                <div
                  key={philosophy.id}
                  className="p-8 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="space-y-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <h3 className="type-h3 leading-none" style={{ color: "var(--text-primary)" }}>
                        {philosophy.title}
                      </h3>
                      <span
                        className="text-sm sm:text-base font-arabic font-normal mt-1 block"
                        style={{ color: "var(--text-accent)", fontStyle: "italic" }}
                      >
                        {philosophy.arabic}
                      </span>
                    </div>
                    <p className="type-body-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {philosophy.desc}
                    </p>
                  </div>
                  <div className="pt-2 type-label flex items-center gap-1.5" style={{ color: "var(--accent)" }}>
                    <Sparkles className="w-3 h-3" /> Origine 100% Locale
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIVISION 2: IMMERSIVE EDITORIAL CLIENT GALLERY & TESTIMONIALS */}
        <div className="pt-16 space-y-16 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="type-label block" style={{ color: "var(--accent)" }}>
                Espaces d'Exception
              </span>
              <h2 className="type-h2" style={{ color: "var(--text-primary)" }}>
                L'Art de Vivre Mobimall chez Vous
              </h2>
              <p className="type-body-sm font-light" style={{ color: "var(--text-secondary)" }}>
                Entrez dans les intérieurs les plus prestigieux de notre communauté. Nos clients partagent leurs mises en scène d'exception.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {clientSpaces.map((space) => (
              <div
                key={space.id}
                className="group rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
              >
                {/* Space Image */}
                <div
                  className="relative md:col-span-5 aspect-square md:aspect-auto overflow-hidden"
                  style={{ background: "var(--bg-elevated)" }}
                >
                  <img
                    src={space.image}
                    alt={space.location}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bg-base) 0%, transparent 60%)" }} />
                  <span
                    className="absolute bottom-4 left-4 text-[9px] backdrop-blur-sm"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)", background: "var(--bg-overlay)", border: "1px solid var(--border-subtle)", padding: "2px 8px", borderRadius: 4 }}
                  >
                    {space.product}
                  </span>
                </div>

                {/* Feedback text */}
                <div className="p-8 md:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex gap-1" style={{ color: "var(--accent)" }}>
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-medium tracking-tight whitespace-nowrap" style={{ background: "var(--surface-inset)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                        <ShieldCheck className="w-3.5 h-3.5" style={{ color: "var(--text-accent)" }} />
                        <span>Client Vérifié</span>
                      </div>
                    </div>
                    <p className="type-body-sm font-light italic leading-relaxed relative" style={{ color: "var(--text-secondary)" }}>
                      <Quote className="w-8 h-8 absolute -top-4 -left-4 pointer-events-none" style={{ color: "var(--border-default)" }} />
                      "{space.comment}"
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 flex items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                        {space.client}
                      </h4>
                      <p className="text-[10px] truncate" style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>
                        {space.location}
                      </p>
                    </div>
                    <span className="text-[9px] px-2.5 py-0.5 rounded-md border whitespace-nowrap flex-shrink-0" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)", background: "var(--bg-elevated)", borderColor: "var(--border-subtle)" }}>
                      {space.verifiedTag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
