import React from "react";
import { Compass, Mail, Phone, MapPin, Sparkles, Globe, ShieldCheck } from "lucide-react";

export default function ShowroomFooter() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  return (
    <footer id="showroom-footer" className="border-t py-16 px-6 lg:px-16" style={{ background: "var(--bg-base)", color: "var(--text-secondary)", borderColor: "var(--border-subtle)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* COL 1: LOGO & CONCEPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl tracking-wider font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}>MOBIMALL</span>
            <span className="text-[10px] px-2 py-0.5 rounded uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", background: "var(--accent-bg)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}>Algérie</span>
          </div>
          <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            Le premier showroom numérique 3D d'ameublement d'exception en Algérie. Une alliance unique d'art de vivre contemporain et de prestige régional précieux.
          </p>
          <div className="flex items-center gap-1 text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>
            <Globe className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} /> Alger • Oran • Constantine
          </div>
        </div>

        {/* COL 2: SHOWROOMS LOCATIONS */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>Nos Salons</h4>
          <ul className="space-y-3 text-xs font-light">
            <li className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
              <div>
                <p className="font-medium" style={{ color: "var(--text-secondary)" }}>Flagship Didouche Mourad</p>
                <p style={{ color: "var(--text-tertiary)" }}>14 Rue Didouche Mourad, Alger Centre</p>
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
              <div>
                <p className="font-medium" style={{ color: "var(--text-secondary)" }}>Atelier Les Falaises</p>
                <p style={{ color: "var(--text-tertiary)" }}>Boulevard de la Soummam, Oran</p>
              </div>
            </li>
          </ul>
        </div>

        {/* COL 3: CLIENT ASSISTANCE */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>Curation & Conseil</h4>
          <ul className="space-y-3 text-xs font-light">
            <li className="flex gap-2 items-center">
              <Phone className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>+213 (0) 21 55 44 33</span>
            </li>
            <li className="flex gap-2 items-center">
              <Mail className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>curation@mobimall.dz</span>
            </li>
            <li className="flex gap-2 items-center">
              <ShieldCheck className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <span style={{ color: "var(--text-secondary)" }}>Garantie structurelle de 5 ans</span>
            </li>
          </ul>
        </div>

        {/* COL 4: NEWSLETTER & PRESTIGE */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>Club Prestige</h4>
          <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            Abonnez-vous à notre catalogue privé et recevez en priorité nos lancements de collections éditées en séries limitées.
          </p>
          {subscribed ? (
            <div className="text-xs p-3 rounded-lg" style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
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
                className="w-full px-3 py-1.5 text-xs rounded-lg outline-none"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}
              />
              <button
                id="newsletter-submit-btn"
                onClick={() => { if (email.trim().includes("@")) { setSubscribed(true); } }}
                className="btn-press px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
              >
                Rejoindre
              </button>
            </div>
          )}
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]" style={{ borderTop: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>
        <p>© {new Date().getFullYear()} MOBIMALL ALGÉRIE. Tous droits réservés.</p>
        <p className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} /> Conception d'Abdelhalim K.</p>
      </div>
    </footer>
  );
}
