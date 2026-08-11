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
      className="py-24 px-6 lg:px-16 border-t scroll-mt-24"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}
    >
      <div className="max-w-7xl mx-auto space-y-16">

        {/* EN-TÊTE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="type-label block" style={{ color: "var(--accent)" }}>
            Manuel de Conservation
          </span>
          <h2 className="type-h2 leading-tight" style={{ color: "var(--text-primary)" }}>
            Préserver l'Éclat de Vos Matières
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ background: "var(--accent)" }} />
          <p className="type-body-sm font-light leading-relaxed pt-2" style={{ color: "var(--text-secondary)" }}>
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
                  className="btn-press w-full p-5 rounded-2xl text-left flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer"
                  style={{
                    background: isSelected ? "var(--accent-bg)" : "var(--bg-card)",
                    border: `1px solid ${isSelected ? "var(--accent-border)" : "var(--border-subtle)"}`,
                    color: isSelected ? "var(--accent)" : "var(--text-secondary)",
                    boxShadow: isSelected ? "var(--shadow-glow)" : "none",
                  }}
                >
                  <div className="flex gap-4 items-center">
                    <div
                      className="p-2.5 rounded-xl border transition-colors"
                      style={{
                        background: isSelected ? "var(--accent-bg)" : "var(--bg-elevated)",
                        borderColor: isSelected ? "var(--accent-border)" : "var(--border-default)",
                        color: isSelected ? "var(--accent)" : "var(--text-tertiary)",
                      }}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="type-h3 leading-tight" style={{ color: "var(--text-primary)" }}>
                        {mat.name}
                      </h3>
                      <p className="text-[10px] tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>
                        {mat.subtitle.split(" & ")[0]}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm sm:text-base font-arabic tracking-wide select-none" style={{ color: "var(--text-accent)", fontStyle: "italic" }}>
                    {mat.arabicName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* COLONNE DROITE: AFFICHAGE DU GUIDE SÉLECTIONNÉ AVEC ANIMATIONS */}
          <div
            className="lg:col-span-8 rounded-2xl overflow-hidden flex flex-col justify-between"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMaterial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                className="flex-1 flex flex-col lg:grid lg:grid-cols-12 h-full items-stretch"
              >
                {/* APERÇU VISUEL DE LA MATIÈRE */}
                <div
                  className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[220px]"
                  style={{ background: "var(--bg-elevated)" }}
                >
                  <img
                    src={activeMaterial.bannerImage}
                    alt={activeMaterial.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bg-base) 0%, transparent 60%)" }} />

                  <div className="absolute bottom-6 left-6 right-6 space-y-1">
                    <span
                      className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-md inline-block"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}
                    >
                      Matière Signature
                    </span>
                    <h4 className="type-h3" style={{ color: "var(--text-primary)" }}>
                      {activeMaterial.name}
                    </h4>
                  </div>
                </div>

                {/* ÉTAPES D'ENTRETIEN */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">

                  <div className="space-y-5">
                    <div className="space-y-1">
                      <p className="type-label" style={{ color: "var(--accent)" }}>Protocole d'Entretien</p>
                      <h4 className="type-h3" style={{ color: "var(--text-primary)" }}>{activeMaterial.subtitle}</h4>
                    </div>

                    <div className="space-y-4">
                      {activeMaterial.careSteps.map((step, idx) => {
                        const StepIcon = step.icon;

                        return (
                          <div key={idx} className="flex gap-4 items-start">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}
                            >
                              <StepIcon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                            </div>
                            <div className="space-y-1">
                              <h5 className="type-label" style={{ color: "var(--text-primary)" }}>
                                {idx + 1}. {step.title}
                              </h5>
                              <p className="type-body-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ASTUCE DE L'ATELIER (PRO TIP) */}
                  <div
                    className="flex gap-3 items-start p-4 rounded-xl"
                    style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}
                  >
                    <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                    <div className="space-y-0.5">
                      <p className="type-label" style={{ color: "var(--accent)" }}>Conseil de l'Ébéniste</p>
                      <p className="type-body-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
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
