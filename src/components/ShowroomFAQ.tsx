import React, { useState } from "react";
import { HelpCircle, ChevronDown, Truck, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: string;
  question: string;
  arabicQuestion: string;
  answer: string;
  icon: React.ComponentType<any>;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-delivery",
    question: "Comment se déroule la livraison de mon mobilier d'exception en Algérie ?",
    arabicQuestion: "كيف تتم عملية توصيل الأثاث الفاخر في الجزائر؟",
    answer: "Nous assurons une livraison premium et hautement sécurisée à travers les 58 wilayas d'Algérie. Notre service spécialisé d'installation comprend le transport par des techniciens habitués au mobilier d'art, le déballage méticuleux dans la pièce de votre choix, ainsi que l'assemblage et le calage complets par nos ébénistes qualifiés.",
    icon: Truck
  },
  {
    id: "faq-timeline",
    question: "Quels sont les délais de fabrication et de livraison de vos pièces ?",
    arabicQuestion: "ما هي مدة التصنيع والتسليم لقطع الأثاث؟",
    answer: "Chaque meuble Mobimall étant façonné sur commande et fini à la main dans nos ateliers, le délai moyen de livraison varie entre 3 et 5 semaines. Ce temps de confection rigoureux garantit une stabilisation optimale des essences de bois nobles et une découpe parfaite de nos plateaux de marbre.",
    icon: Sparkles
  },
  {
    id: "faq-wood-care",
    question: "Comment entretenir le Chêne de l'Atlas ou le Noyer du Sahara ?",
    arabicQuestion: "كيف يمكنني العناية بخشب الأطلس أو خشب الصحراء؟",
    answer: "Le bois massif est une matière vivante et précieuse. Pour le dépoussiérage quotidien, privilégiez un chiffon doux en microfibre légèrement humide ou sec. Évitez absolument les détergents agressifs ou abrasifs. Nous recommandons d'appliquer une fine couche de cire d'abeille naturelle ou d'huile de lin de qualité une fois par an afin de préserver l'éclat et la protection de la fibre.",
    icon: ShieldCheck
  },
  {
    id: "faq-marble-care",
    question: "Le marbre blanc de Constantine nécessite-t-il un traitement spécial ?",
    arabicQuestion: "هل يحتاج رخام قسنطينة الأبيض إلى عناية خاصة؟",
    answer: "Oui. Bien que tous nos marbres reçoivent un traitement hydrofuge et oléofuge de pointe lors de la fabrication, la pierre calcaire reste sensible aux liquides acides (comme le citron, le café ou le soda). Nous vous conseillons d'essuyer immédiatement toute éclaboussure. Nettoyez régulièrement la surface avec un chiffon doux, de l'eau tiède et un peu de savon de Marseille neutre.",
    icon: ShieldCheck
  },
  {
    id: "faq-customization",
    question: "Est-il possible de demander une fabrication sur mesure ?",
    arabicQuestion: "هل من الممكن طلب تصنيع مقاسات خاصة؟",
    answer: "Absolument. Nos designers et ébénistes d'art collaborent étroitement avec nos clients pour des projets résidentiels ou professionnels prestigieux. Nous pouvons adapter les dimensions de nos collections emblématiques ou sélectionner des matières spécifiques (tissages kabyles sur-mesure, coloris de cuir exclusifs). N'hésitez pas à solliciter notre service de curation pour une étude technique complète.",
    icon: MessageSquare
  }
];

export default function ShowroomFAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="showroom-faq-section"
      className="py-24 px-6 lg:px-16 border-t scroll-mt-24"
      style={{ background: "var(--bg-mid)", color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}
    >
      <div className="max-w-4xl mx-auto space-y-16">

        {/* EN-TÊTE DE SECTION */}
        <div className="text-center space-y-4">
          <span className="type-label flex items-center justify-center gap-2" style={{ color: "var(--accent)" }}>
            <HelpCircle className="w-3.5 h-3.5" /> Assistance & Expertise
          </span>
          <h2 className="type-h2" style={{ color: "var(--text-primary)" }}>
            Questions Fréquentes
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ background: "var(--accent)" }} />
          <p className="type-body-sm font-light max-w-xl mx-auto pt-2" style={{ color: "var(--text-secondary)" }}>
            Afin de vous accompagner sereinement dans l'acquisition de nos créations, voici les réponses à vos interrogations sur la logistique d'art et la pérennité de vos meubles.
          </p>
        </div>

        {/* ACCORDÉON DE FAQ */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isExpanded = expandedId === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${isExpanded ? "var(--accent-border)" : "var(--border-subtle)"}`,
                  boxShadow: isExpanded ? "var(--shadow-glow)" : "none",
                }}
              >
                {/* Entête cliquable */}
                <button
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggleExpand(item.id)}
                  className="btn-press w-full px-6 py-5 sm:px-8 sm:py-6 flex justify-between items-center text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex gap-4 items-center">
                    <div
                      className="p-2.5 rounded-xl border transition-colors"
                      style={{
                        background: isExpanded ? "var(--accent-bg)" : "var(--bg-elevated)",
                        borderColor: isExpanded ? "var(--accent-border)" : "var(--border-default)",
                        color: isExpanded ? "var(--accent)" : "var(--text-tertiary)",
                      }}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="type-h3 leading-snug" style={{ color: "var(--text-primary)" }}>
                        {item.question}
                      </h3>
                      <p
                        className="text-sm sm:text-base font-arabic text-left font-normal tracking-wide"
                        style={{ color: "var(--text-accent)", fontStyle: "italic" }}
                      >
                        {item.arabicQuestion}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`p-1.5 rounded-lg border transition-all duration-300 shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                    style={{
                      borderColor: isExpanded ? "var(--accent-border)" : "var(--border-subtle)",
                      color: isExpanded ? "var(--accent)" : "var(--text-tertiary)",
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Contenu expansible */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`faq-content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                    >
                      <div
                        className="px-6 pb-6 pt-1 sm:px-8 sm:pb-7 type-body-sm font-light leading-relaxed space-y-4"
                        style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                      >
                        <p>{item.answer}</p>
                        <div className="flex items-center gap-1.5 type-label" style={{ color: "var(--accent)" }}>
                          <Sparkles className="w-3 h-3" /> Charte d'Excellence Mobimall
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* BESOIN D'ASSISTANCE COMPLÉMENTAIRE */}
        <div
          className="p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Vous avez une autre question ?
            </h4>
            <p className="type-body-sm font-light" style={{ color: "var(--text-secondary)" }}>
              Notre équipe d'assistance de curation vous répond sous 24h.
            </p>
          </div>
          <button
            onClick={() => document.getElementById("showroom-footer")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-press px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Nous Contacter
          </button>
        </div>

      </div>
    </section>
  );
}

