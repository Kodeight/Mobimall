import React, { useState } from "react";
import { MapPin, Phone, Clock, Compass, Sparkles, Map as MapIcon, ExternalLink } from "lucide-react";

interface ShowroomLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
}

const SHOWROOMS: ShowroomLocation[] = [
  {
    id: "alger",
    name: "Flagship Didouche Mourad",
    city: "Alger Centre",
    address: "14 Rue Didouche Mourad, Alger Centre, Algérie",
    phone: "+213 (0) 21 55 44 33",
    hours: "Samedi - Jeudi : 10:00 - 19:30",
    lat: 36.7645,
    lng: 3.0565,
    googleMapsUrl: "https://maps.google.com/?q=36.7645,3.0565",
  },
  {
    id: "oran",
    name: "Atelier Les Falaises",
    city: "Oran",
    address: "Boulevard de la Soummam, Oran, Algérie",
    phone: "+213 (0) 41 22 88 99",
    hours: "Samedi - Jeudi : 10:00 - 19:00",
    lat: 35.7030,
    lng: -0.6350,
    googleMapsUrl: "https://maps.google.com/?q=35.7030,-0.6350",
  }
];

export default function ShowroomMap() {
  const [activeId, setActiveId] = useState<string>("alger");
  const activeShowroom = SHOWROOMS.find((s) => s.id === activeId) || SHOWROOMS[0];

  const handleSelectShowroom = (id: string) => {
    setActiveId(id);
  };

  const getOSMEmbedUrl = (lat: number, lng: number) => {
    const delta = 0.0035; 
    const minLat = lat - delta;
    const maxLat = lat + delta;
    const minLng = lng - delta;
    const maxLng = lng + delta;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}`;
  };

  return (
    <section id="showroom-locations-section" className="py-24 px-6 lg:px-16 border-t scroll-mt-20" style={{ background: "var(--bg-base)", color: "var(--text-primary)", borderColor: "var(--border-subtle)" }}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="type-label flex items-center gap-2" style={{ color: "var(--text-accent)" }}>
              <MapIcon className="w-3.5 h-3.5" /> Réseau de Showrooms
            </span>
            <h2 className="type-h2" style={{ color: "var(--text-primary)" }}>
              Nos Salons Privés
            </h2>
            <p className="type-body-sm font-light leading-relaxed max-w-lg" style={{ color: "var(--text-secondary)" }}>
              Venez toucher nos matières, admirer les assemblages en chêne de l'Atlas et échanger sur vos projets d'aménagement avec nos experts d'art de vivre.
            </p>
          </div>

          {/* APPLE SEGMENTED CONTROL BUTTONS */}
          <div className="p-1 rounded-2xl flex gap-1 border" style={{ background: "var(--surface-inset)", borderColor: "var(--border-subtle)" }}>
            {SHOWROOMS.map((s) => {
              const isActive = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectShowroom(s.id)}
                  className="px-5 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? "var(--text-primary)" : "transparent",
                    color: isActive ? "var(--bg-base)" : "var(--text-secondary)",
                    fontWeight: isActive ? 600 : 400,
                    boxShadow: isActive ? "var(--shadow-sm)" : "none",
                  }}
                >
                  {s.city}
                </button>
              );
            })}
          </div>
        </div>

        {/* DETAILS & MAP BENTO PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LOCATION DETAILS PANEL */}
          <div className="lg:col-span-5 rounded-2xl p-8 flex flex-col justify-between space-y-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", backdropFilter: "blur(12px)" }}>
            <div className="space-y-6">
              <span className="type-label px-2.5 py-1 rounded-md" style={{ color: "var(--text-secondary)", background: "var(--surface-inset)", border: "1px solid var(--border-subtle)" }}>
                Salon Sélectionné
              </span>
              
              <div className="space-y-1">
                <h3 className="type-h3" style={{ color: "var(--text-primary)" }}>{activeShowroom.name}</h3>
                <p className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>{activeShowroom.city}</p>
              </div>

              <div className="space-y-4 pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <div className="flex gap-3 items-start text-sm font-light">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--text-accent)" }} />
                  <div>
                    <p className="type-label" style={{ color: "var(--text-tertiary)" }}>Adresse</p>
                    <p className="mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{activeShowroom.address}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start text-sm font-light">
                  <Phone className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--text-accent)" }} />
                  <div>
                    <p className="type-label" style={{ color: "var(--text-tertiary)" }}>Contact Showroom</p>
                    <p className="mt-1 font-mono font-medium" style={{ color: "var(--text-primary)" }}>{activeShowroom.phone}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start text-sm font-light">
                  <Clock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--text-accent)" }} />
                  <div>
                    <p className="type-label" style={{ color: "var(--text-tertiary)" }}>Horaires de Visite</p>
                    <p className="mt-1" style={{ color: "var(--text-secondary)" }}>{activeShowroom.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* REFINED APPLE EDITORIAL CALLOUT */}
              <div className="p-5 rounded-2xl text-xs font-light leading-relaxed space-y-2" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-sm)" }}>
                <p className="font-medium flex items-center gap-1.5 type-label" style={{ color: "var(--text-primary)" }}>
                  <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--text-accent)" }} /> Service Privé de Curation
                </p>
                <p style={{ color: "var(--text-secondary)" }}>
                  Besoin d'un accompagnement personnalisé ? Contactez directement notre équipe pour réserver un créneau exclusif d'une heure.
                </p>
              </div>

              <a 
                href={activeShowroom.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press w-full py-3.5 px-4 rounded-xl transition-all text-xs font-mono flex items-center justify-center gap-2 tracking-wide cursor-pointer font-medium"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
              >
                <ExternalLink className="w-4 h-4" style={{ color: "var(--text-accent)" }} /> Ouvrir dans Google Maps
              </a>
            </div>
          </div>

          {/* OPENSTREETMAP EMBED INTEGRATION WITH DYNAMIC MAP FILTER */}
          <div className="lg:col-span-7 h-[450px] rounded-2xl overflow-hidden relative" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <iframe
              title={`Carte de ${activeShowroom.name}`}
              width="100%"
              height="100%"
              style={{ 
                border: 0,
                filter: "var(--map-filter)",
              }}
              src={getOSMEmbedUrl(activeShowroom.lat, activeShowroom.lng)}
              allowFullScreen
            />
            <div className="absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] tracking-wider flex items-center gap-1.5 pointer-events-none" style={{ background: "var(--bg-overlay)", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> CARTE : OPENSTREETMAP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
