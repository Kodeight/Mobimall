import React, { useState } from "react";
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle, Sparkles, Send, User, Building, Compass } from "lucide-react";
import { motion } from "motion/react";

interface AppointmentSectionProps {
  preselectedProductName?: string;
  onClose?: () => void;
}

export default function AppointmentSection({ preselectedProductName, onClose }: AppointmentSectionProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Alger",
    date: "",
    timeSlot: "10:00 - 12:00",
    serviceType: preselectedProductName ? `Consultation pour ${preselectedProductName}` : "Visite du Salon Privé Aïn Benian",
    message: preselectedProductName ? `Bonjour, je souhaite réserver un rendez-vous pour découvrir le modèle ${preselectedProductName}.` : ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = "MOBI-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setSubmitted(true);
  };

  const WILAYAS = [
    "Alger", "Oran", "Constantine", "Annaba", "Blida", "Sétif", "Tlemcen", "Béjaïa", "Batna", "Biskra", "Chlef", "Autre Wilaya"
  ];

  return (
    <section id="appointment-contact-section" className="py-20 px-6 lg:px-16 min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="type-label block" style={{ color: "var(--accent)" }}>
            Espace Client Privilégié
          </span>
          <h1 className="type-h1" style={{ color: "var(--text-primary)" }}>
            Prise de Rendez-vous & Contact
          </h1>
          <p className="text-xs font-arabic text-xl tracking-wide font-serif" style={{ color: "var(--text-accent)", fontStyle: "italic" }}>
            حجز موعد visite المعرض الخاص والاستشارة
          </p>
          <div className="w-12 h-0.5 mx-auto mt-2" style={{ background: "var(--accent)" }} />
          <p className="type-body-sm font-light leading-relaxed pt-2" style={{ color: "var(--text-secondary)" }}>
            Rencontrez nos maîtres ébénistes et conseillers en aménagement intérieur dans notre salon privé d'Aïn Benian, Alger. Touchez nos échantillons de cuirs précieux et bois d'exception.
          </p>
        </div>

        {/* BENTO LAYOUT: INFO + FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: SHOWROOM INFORMATION CARD */}
          <div className="lg:col-span-5 space-y-6 rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", backdropFilter: "blur(12px)" }}>
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">Salon d'Exposition</span>
              <h3 className="font-serif text-2xl text-stone-100 mt-1">Aïn Benian, Alger</h3>
              <p className="text-xs font-arabic text-amber-200/90 text-base mt-1">عين بنيان ، الجزائر العاصمة</p>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Nos salons de présentation vous accueillent sur rendez-vous privé pour une expérience immersive exclusive avec nos designers d'intérieur.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/20 text-sky-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-200">Adresse Prestige</p>
                  <p className="text-xs text-stone-400 font-light">Résidence Les Oliviers, Route Littorale, Aïn Benian, Alger</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/20 text-sky-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-200">Téléphones Directs</p>
                  <p className="text-xs text-stone-400 font-mono">+213 (0) 23 45 67 89 / +213 (0) 550 12 34 56</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/20 text-sky-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-200">Service Conciergerie</p>
                  <p className="text-xs text-stone-400 font-mono">contact@mobimall.dz</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/20 text-sky-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-200">Horaires d'Ouverture</p>
                  <p className="text-xs text-stone-400 font-light">Samedi — Jeudi : 09h00 — 19h00 (Vendredi sur RDV)</p>
                </div>
              </div>
            </div>

            {/* BADGE ACCUEIL VIP */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Service VIP Gratuit
              </span>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Boissons d'accueil traditionnelles, conseils d'architectes d'intérieur et remise d'échantillons de matières lors de votre rendez-vous.
              </p>
            </div>
          </div>

          {/* RIGHT: APPOINTMENT BOOKING FORM */}
          <div className="lg:col-span-7 rounded-2xl p-8 relative overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", backdropFilter: "blur(12px)" }}>
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Rendez-vous Confirmé</span>
                  <h3 className="text-2xl font-serif text-stone-100">Merci, {formData.fullName} !</h3>
                  <p className="text-xs font-arabic text-amber-200/90 text-lg">تم تأكيد حجزك بنجاح. سنتصل بك قريباً</p>
                  <p className="text-xs text-stone-400 font-light max-w-md mx-auto pt-2 leading-relaxed">
                    Notre conciergerie a bien enregistré votre demande pour le <span className="text-stone-200 font-semibold">{formData.date || "prochain créneau"}</span> à <span className="text-stone-200 font-semibold">{formData.timeSlot}</span>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-white/5 inline-block font-mono text-xs space-y-1 text-left">
                  <p className="text-stone-500">Référence de réservation :</p>
                  <p className="text-sky-400 font-bold text-sm">{bookingRef}</p>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      if (onClose) onClose();
                    }}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono text-stone-200 hover:text-white transition-all cursor-pointer"
                  >
                    Réserver un autre rendez-vous
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-stone-100">Réserver un Créneau Privé</h3>
                  <p className="text-xs text-stone-400 font-light">Remplissez ce formulaire pour planifier votre venue.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nom complet */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300">Nom & Prénom *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Karim Mansouri"
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/5 hover:border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl text-xs text-stone-100 placeholder-stone-500 outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Numéro Téléphone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300">Téléphone (Algérie) *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0550 12 34 56"
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/5 hover:border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl text-xs text-stone-100 placeholder-stone-500 outline-none transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300">Email *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="m.karim@gmail.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/5 hover:border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl text-xs text-stone-100 placeholder-stone-500 outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Wilaya / Ville */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300">Wilaya *</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/5 hover:border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl text-xs text-stone-100 outline-none transition-all font-mono appearance-none cursor-pointer"
                      >
                        {WILAYAS.map((w) => (
                          <option key={w} value={w} className="bg-slate-900 text-stone-200">{w}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date de visite */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300">Date souhaitée *</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/5 hover:border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl text-xs text-stone-100 outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Créneau Horaire */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300">Créneau Horaire *</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/5 hover:border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl text-xs text-stone-100 outline-none transition-all font-mono appearance-none cursor-pointer"
                      >
                        <option value="09:00 - 11:00" className="bg-slate-900">Matin : 09h00 — 11h00</option>
                        <option value="11:00 - 13:00" className="bg-slate-900">Midi : 11h00 — 13h00</option>
                        <option value="14:00 - 16:00" className="bg-slate-900">Après-midi : 14h00 — 16h00</option>
                        <option value="16:00 - 18:00" className="bg-slate-900">Fin de journée : 16h00 — 18h00</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Motif / Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-stone-300">Objet / Projet d'Aménagement</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez votre recherche (ex: meuble salon, devis sur mesure, rénovation villa...)"
                    className="w-full p-4 bg-slate-900 border border-white/5 hover:border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl text-xs text-stone-100 placeholder-stone-500 outline-none transition-all font-mono resize-none"
                  />
                </div>

                {/* BOUTON SOUMISSION */}
                <button
                  type="submit"
                  id="submit-appointment-btn"
                  className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-stone-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 cursor-pointer flex items-center justify-center gap-2 font-mono"
                >
                  <Send className="w-4 h-4" /> Confirmer la Demande de Rendez-vous
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
