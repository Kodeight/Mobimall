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
      className="py-24 px-6 lg:px-16 bg-[#02040a] text-stone-100 border-t border-white/5 space-y-24"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* DIVISION 1: THREE-COLUMN PHILOSOPHY HIGHLIGHT */}
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-sky-400 uppercase block">
              L'Esprit des Matières
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-stone-100">
              L'Excellence du Mobilier Paramétrique
            </h2>
            <div className="w-12 h-0.5 bg-sky-400 mx-auto mt-4" />
            <p className="text-stone-400 text-sm font-light leading-relaxed pt-2">
              Nous allions la poésie des matières organiques d'Algérie au génie du design algorithmique pour sculpter des formes audacieuses qui traverseront le temps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materialsPhilosophy.map((philosophy) => {
              const Icon = philosophy.icon;
              return (
                <div
                  key={philosophy.id}
                  className="p-8 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-stone-200 tracking-tight leading-none">
                        {philosophy.title}
                      </h3>
                      <span className="text-sm sm:text-base text-amber-200/90 font-arabic font-normal mt-1 block">
                        {philosophy.arabic}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">
                      {philosophy.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-[9px] font-mono uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Origine 100% Locale
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIVISION 2: IMMERSIVE EDITORIAL CLIENT GALLERY & TESTIMONIALS */}
        <div className="pt-16 space-y-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-mono tracking-widest text-sky-400 uppercase block">
                Espaces d'Exception
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-stone-100">
                L'Art de Vivre Mobimall chez Vous
              </h2>
              <p className="text-stone-400 text-sm font-light">
                Entrez dans les intérieurs les plus prestigieux de notre communauté. Nos clients partagent leurs mises en scène d'exception.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {clientSpaces.map((space) => (
              <div 
                key={space.id}
                className="group rounded-2xl overflow-hidden bg-slate-950/40 border border-white/5 grid grid-cols-1 md:grid-cols-12"
              >
                {/* Space Image */}
                <div className="relative md:col-span-5 aspect-square md:aspect-auto overflow-hidden bg-slate-950">
                  <img 
                    src={space.image} 
                    alt={space.location} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 md:from-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[9px] font-mono text-stone-300 bg-slate-950/80 px-2 py-0.5 rounded border border-white/5 backdrop-blur-sm">
                    {space.product}
                  </span>
                </div>

                {/* Feedback text */}
                <div className="p-8 md:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex gap-1 text-sky-400">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-medium tracking-tight">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Client Vérifié</span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-300 font-light italic leading-relaxed relative">
                      <Quote className="w-8 h-8 text-white/5 absolute -top-4 -left-4 pointer-events-none" />
                      "{space.comment}"
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/5 flex items-end justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-100 flex items-center gap-1.5">
                        {space.client}
                      </h4>
                      <p className="text-[10px] text-stone-500 font-mono">
                        {space.location}
                      </p>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400/80 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
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
