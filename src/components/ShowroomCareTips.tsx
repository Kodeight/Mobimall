import React, { useState } from "react";
import { Sparkles, Shield, Droplets, Info, Compass, Trees, HeartHandshake, Eye, Paintbrush, Wind } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CareMaterial {
  id: string;
  name: string;
  arabicName: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  bannerImage: string;
  careSteps: {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
  }[];
  proTip: string;
}

const CARE_MATERIALS: CareMaterial[] = [
  {
    id: "wood",
    name: "Bois de Noyer & Chêne",
    arabicName: "الأخشاب النبيلة",
    subtitle: "Chêne de l'Atlas & Noyer Sauvage du Sahara",
    icon: Trees,
    bannerImage: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800",
    careSteps: [
      {
        title: "Dépoussiérage quotidien",
        description: "Utilisez un chiffon doux en microfibre propre, sec ou extrêmement peu humide, dans le sens du grain du bois.",
        icon: Wind
      },
      {
        title: "Pas de produits chimiques",
        description: "Bannissez les sprays aérosols ménagers, solvants ou cires siliconées qui étouffent le bois massif naturel.",
        icon: Shield
      },
      {
        title: "Soin annuel à l'huile",
        description: "Appliquez une huile de lin pure ou une cire d'abeille naturelle une fois par an pour nourrir la fibre en profondeur.",
        icon: Sparkles
      }
    ],
    proTip: "Évitez d'exposer vos tables et buffets en bois massif à la lumière directe intense du soleil ou trop près d'un climatiseur pour prévenir les micro-fissures d'assèchement."
  },
  {
    id: "fabric",
    name: "Tissus & Velours",
    arabicName: "الأقمشة والقطيفة",
    subtitle: "Tissu Bouclé Sable & Velours d'Émeraude",
    icon: Wind,
    bannerImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    careSteps: [
      {
        title: "Aspiration douce",
        description: "Aspirez régulièrement avec un embout brosse souple à faible puissance pour éliminer la poussière accumulée.",
        icon: Paintbrush
      },
      {
        title: "Réaction immédiate",
        description: "En cas de tache, tamponnez immédiatement avec un papier absorbant sans jamais frotter le tissu pour ne pas l'étaler.",
        icon: Droplets
      },
      {
        title: "Nettoyage neutre",
        description: "Utilisez de l'eau tiède mélangée à un peu de savon de Marseille blanc. Frottez très délicatement par mouvements circulaires.",
        icon: Shield
      }
    ],
    proTip: "Pour redonner de la superbe au velours écrasé, brossez légèrement les poils à l'aide d'une brosse à vêtements souple dans le sens opposé de la fibre."
  },
  {
    id: "marble",
    name: "Marbre & Basalte",
    arabicName: "الرخام والجرانيت",
    subtitle: "Marbre Blanc de Constantine & Pierre de Basalte",
    icon: Compass,
    bannerImage: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800",
    careSteps: [
      {
        title: "Protection acide absolue",
        description: "Le citron, le vinaigre, le café et le cola attaquent le calcaire. Utilisez impérativement des sous-verres.",
        icon: Shield
      },
      {
        title: "Lavage doux",
        description: "Nettoyez à l'eau chaude savonneuse (savon de Marseille ou savon noir dilué) à l'aide d'une éponge non abrasive.",
        icon: Paintbrush
      },
      {
        title: "Séchage à fleur",
        description: "Essuyez toujours après nettoyage avec un chiffon en microfibre pour éviter l'apparition de traces de calcaire d'eau.",
        icon: Wind
      }
    ],
    proTip: "Le marbre est une pierre poreuse naturelle. Tous nos plateaux sont imperméabilisés par notre atelier, mais nous recommandons de renouveler le traitement oléofuge tous les 2 ans."
  },
  {
    id: "leather",
    name: "Cuir Souple du Hoggar",
    arabicName: "الجلود الأصلية",
    subtitle: "Cuir de Chameau & Terracotta d'Alger",
    icon: HeartHandshake,
    bannerImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
    careSteps: [
      {
        title: "Chiffon sec ou humide",
        description: "Dépoussiérez doucement avec une peau de chamois ou un chiffon microfibre légèrement humidifié à l'eau claire.",
        icon: Paintbrush
      },
      {
        title: "Hydratation bisannuelle",
        description: "Appliquez un lait nourrissant spécifique pour cuir deux fois par an pour maintenir sa souplesse originelle.",
        icon: Sparkles
      },
      {
        title: "Bannir les solvants",
        description: "N'utilisez jamais d'alcool, de démaquillant, d'aérosol cireux ou d'eau en excès sous peine de décoloration définitive.",
        icon: Shield
      }
    ],
    proTip: "Le cuir de chameau du Hoggar développe une magnifique patine unique au fil du temps. Évitez les sources de chaleur directes comme les radiateurs qui dessèchent le cuir."
  }
];

export default function ShowroomCareTips() {
  const [selectedId, setSelectedId] = useState<string>("wood");
  const activeMaterial = CARE_MATERIALS.find((m) => m.id === selectedId) || CARE_MATERIALS[0];

  return (
    <section 
      id="showroom-care-tips-section" 
      className="py-24 px-6 lg:px-16 bg-[#02040a] text-stone-100 border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* EN-TÊTE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono tracking-widest text-sky-400 uppercase block">
            Manuel de Conservation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-stone-100 leading-tight">
            Préserver l'Éclat de Vos Matières
          </h2>
          <div className="w-12 h-0.5 bg-sky-400 mx-auto mt-4" />
          <p className="text-stone-400 text-sm font-light leading-relaxed pt-2">
            Chaque pièce d'ameublement Mobimall est confectionnée à partir d'essences et de fibres précieuses d'Algérie. Découvrez notre guide d'entretien artisanal pour faire traverser les générations à vos chefs-d'œuvre.
          </p>
        </div>

        {/* CONTENU INTERACTIF BENTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLONNE GAUCHE: MENU DE SÉLECTION */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            {CARE_MATERIALS.map((mat) => {
              const Icon = mat.icon;
              const isSelected = selectedId === mat.id;

              return (
                <button
                  key={mat.id}
                  id={`care-tab-${mat.id}`}
                  onClick={() => setSelectedId(mat.id)}
                  className={`w-full p-5 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-sky-950/40 border-sky-500/40 text-sky-400 shadow-lg shadow-sky-500/5 ring-1 ring-sky-500/10"
                      : "bg-slate-950/30 border-white/5 text-stone-400 hover:border-white/10 hover:bg-slate-950/60 hover:text-stone-200"
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isSelected ? "bg-sky-950 border-sky-500/30 text-sky-400" : "bg-slate-900 border-white/5 text-stone-500"
                    }`}>
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-sm font-semibold tracking-wide leading-tight">
                        {mat.name}
                      </h3>
                      <p className="text-[10px] text-stone-500 font-mono tracking-wider">
                        {mat.subtitle.split(" & ")[0]}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm sm:text-base font-arabic text-amber-200/90 tracking-wide select-none">
                    {mat.arabicName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* COLONNE DROITE: AFFICHAGE DU GUIDE SÉLECTIONNÉ AVEC ANIMATIONS */}
          <div className="lg:col-span-8 bg-slate-950/30 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMaterial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex-1 flex flex-col lg:grid lg:grid-cols-12 h-full items-stretch"
              >
                {/* APERÇU VISUEL DE LA MATIÈRE */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[220px] bg-slate-950">
                  <img
                    src={activeMaterial.bannerImage}
                    alt={activeMaterial.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#02040a] via-[#02040a]/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase bg-sky-950/80 border border-sky-500/20 px-2.5 py-1 rounded-full backdrop-blur-md inline-block">
                      Matière Signature
                    </span>
                    <h4 className="font-serif text-xl text-stone-100 tracking-tight">
                      {activeMaterial.name}
                    </h4>
                  </div>
                </div>

                {/* ÉTAPES D'ENTRETIEN */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-slate-950/20 backdrop-blur-sm">
                  
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">Protocole d'Entretien</p>
                      <h4 className="font-serif text-lg text-stone-200 tracking-tight">{activeMaterial.subtitle}</h4>
                    </div>

                    <div className="space-y-4">
                      {activeMaterial.careSteps.map((step, idx) => {
                        const StepIcon = step.icon;

                        return (
                          <div key={idx} className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-lg bg-sky-950/30 border border-sky-500/15 flex items-center justify-center shrink-0 mt-0.5">
                              <StepIcon className="w-4 h-4 text-sky-400" />
                            </div>
                            <div className="space-y-1">
                              <h5 className="text-xs font-semibold text-stone-200 uppercase tracking-wide font-mono">
                                {idx + 1}. {step.title}
                              </h5>
                              <p className="text-xs text-stone-400 font-light leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ASTUCE DE L'ATELIER (PRO TIP) */}
                  <div className="pt-6 border-t border-white/5 flex gap-3 items-start bg-sky-950/5 p-4 rounded-xl border border-sky-500/5">
                    <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-mono uppercase tracking-wider text-sky-400 font-bold">Conseil de l'Ébéniste</p>
                      <p className="text-[11px] text-stone-300 font-light leading-relaxed">
                        {activeMaterial.proTip}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
