import React from "react";
import { Compass, Mail, Phone, MapPin, Sparkles, Globe, ShieldCheck } from "lucide-react";

export default function ShowroomFooter() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  return (
    <footer id="showroom-footer" className="bg-[#02040a] text-stone-400 border-t border-white/5 py-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* COL 1: LOGO & CONCEPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl tracking-wider text-white font-semibold">MOBIMALL</span>
            <span className="text-[10px] bg-sky-950/40 border border-sky-500/20 text-sky-400 font-mono px-2 py-0.5 rounded uppercase tracking-widest">Algérie</span>
          </div>
          <p className="text-xs text-stone-500 font-light leading-relaxed">
            Le premier showroom numérique 3D d'ameublement d'exception en Algérie. Une alliance unique d'art de vivre contemporain et de prestige régional précieux.
          </p>
          <div className="flex items-center gap-1 text-[10px] text-stone-500 font-mono">
            <Globe className="w-3.5 h-3.5 text-sky-400" /> Alger • Oran • Constantine
          </div>
        </div>

        {/* COL 2: SHOWROOMS LOCATIONS */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono text-stone-200 uppercase tracking-widest font-semibold">Nos Salons</h4>
          <ul className="space-y-3 text-xs font-light">
            <li className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <p className="text-stone-300 font-medium">Flagship Didouche Mourad</p>
                <p className="text-stone-500">14 Rue Didouche Mourad, Alger Centre</p>
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <p className="text-stone-300 font-medium">Atelier Les Falaises</p>
                <p className="text-stone-500">Boulevard de la Soummam, Oran</p>
              </div>
            </li>
          </ul>
        </div>

        {/* COL 3: CLIENT ASSISTANCE */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono text-stone-200 uppercase tracking-widest font-semibold">Curation & Conseil</h4>
          <ul className="space-y-3 text-xs font-light">
            <li className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-sky-400" />
              <span className="text-stone-300 font-mono">+213 (0) 21 55 44 33</span>
            </li>
            <li className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-sky-400" />
              <span className="text-stone-300 font-mono">curation@mobimall.dz</span>
            </li>
            <li className="flex gap-2 items-center">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span className="text-stone-300">Garantie structurelle de 5 ans</span>
            </li>
          </ul>
        </div>

        {/* COL 4: NEWSLETTER & PRESTIGE */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono text-stone-200 uppercase tracking-widest font-semibold">Club Prestige</h4>
          <p className="text-xs text-stone-500 font-light leading-relaxed">
            Abonnez-vous à notre catalogue privé et recevez en priorité nos lancements de collections éditées en séries limitées.
          </p>
          {subscribed ? (
            <div className="text-xs text-sky-400 font-mono bg-sky-950/40 p-3 rounded-lg border border-sky-500/20">
              ✓ Inscrit avec succès au Club Prestige !
            </div>
          ) : (
            <div className="flex gap-1.5">
              <input 
                id="newsletter-email-input"
                type="email" 
                placeholder="votre.adresse@mail.dz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-950 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-stone-300 outline-none w-full animate-none"
              />
              <button 
                id="newsletter-submit-btn"
                onClick={() => {
                  if (email.trim().includes("@")) {
                    setSubscribed(true);
                  }
                }}
                className="px-3 py-1.5 bg-slate-900 hover:bg-sky-900 text-stone-200 hover:text-white rounded-lg text-xs transition-all cursor-pointer font-mono"
              >
                Rejoindre
              </button>
            </div>
          )}
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-stone-600 font-mono">
        <p>© {new Date().getFullYear()} MOBIMALL ALGÉRIE. Tous droits réservés.</p>
        <p className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-sky-400" /> Conception d'Élite Digitale</p>
      </div>
    </footer>
  );
}
