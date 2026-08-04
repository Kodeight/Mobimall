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
      className="py-24 px-6 lg:px-16 bg-[#04060c] text-stone-100 border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* EN-TÊTE DE SECTION */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-widest text-sky-400 uppercase flex items-center justify-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" /> Assistance & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-stone-100">
            Questions Fréquentes
          </h2>
          <div className="w-12 h-0.5 bg-sky-400 mx-auto mt-4" />
          <p className="text-stone-400 text-sm font-light max-w-xl mx-auto pt-2">
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
                className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-slate-950/40 ${
                  isExpanded 
                    ? "border-sky-500/40 shadow-lg shadow-sky-500/5 bg-slate-950/70" 
                    : "border-white/5 hover:border-white/10 hover:bg-slate-950/60"
                }`}
              >
                {/* Entête cliquable */}
                <button
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggleExpand(item.id)}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 flex justify-between items-center text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex gap-4 items-center">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isExpanded ? "bg-sky-950/40 border-sky-500/30 text-sky-400" : "bg-slate-900 border-white/5 text-stone-400"
                    }`}>
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-serif text-stone-200 tracking-tight leading-snug">
                        {item.question}
                      </h3>
                      <p className="text-sm sm:text-base text-amber-200/90 font-arabic text-left font-normal tracking-wide">
                        {item.arabicQuestion}
                      </p>
                    </div>
                  </div>
                  <div className={`p-1.5 rounded-lg border border-white/5 text-stone-400 transition-transform duration-300 shrink-0 ${
                    isExpanded ? "rotate-180 text-sky-400 border-sky-500/20" : ""
                  }`}>
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-7 border-t border-white/5 text-xs sm:text-sm text-stone-400 font-light leading-relaxed space-y-4">
                        <p>{item.answer}</p>
                        <div className="flex items-center gap-1.5 text-[10px] text-sky-400/80 font-mono uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 animate-pulse" /> Charte d'Excellence Mobimall
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
        <div className="p-6 rounded-2xl bg-sky-950/10 border border-sky-500/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-stone-200">Vous avez une autre question ?</h4>
            <p className="text-xs text-stone-400 font-light">Notre équipe d'assistance de curation vous répond sous 24h.</p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("showroom-footer");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-sky-500/20 text-stone-300 hover:text-sky-400 transition-all rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            Nous Contacter
          </button>
        </div>

      </div>
    </section>
  );
}
