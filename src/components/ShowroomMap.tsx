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
    <section id="showroom-locations-section" className="py-24 px-6 lg:px-16 bg-[#02040a] text-stone-100 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-sky-400 uppercase flex items-center gap-2">
              <MapIcon className="w-3.5 h-3.5" /> Réseau de Showrooms
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-stone-100">
              Nos Salons Privés
            </h2>
            <p className="text-stone-400 text-sm max-w-lg font-light leading-relaxed">
              Venez toucher nos matières, admirer les assemblages en chêne de l'Atlas et échanger sur vos projets d'aménagement avec nos experts d'art de vivre.
            </p>
          </div>
          <div className="flex gap-2">
            {SHOWROOMS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectShowroom(s.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer ${
                  activeId === s.id
                    ? "bg-sky-950/40 border-sky-500/50 text-sky-400 font-bold"
                    : "bg-slate-950/40 border-white/5 text-stone-400 hover:text-stone-200"
                }`}
              >
                {s.city}
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS & MAP BENTO PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LOCATION DETAILS PANEL */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-white/5 p-8 rounded-2xl flex flex-col justify-between backdrop-blur-md space-y-6">
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase bg-sky-950/40 px-2 py-1 rounded">
                Salon Sélectionné
              </span>
              
              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-stone-100">{activeShowroom.name}</h3>
                <p className="text-xs text-stone-500 font-mono">{activeShowroom.city}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-900">
                <div className="flex gap-3 items-start text-stone-300 text-sm font-light">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs text-stone-400 uppercase tracking-wider">Adresse</p>
                    <p className="mt-1 leading-relaxed text-stone-200">{activeShowroom.address}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start text-stone-300 text-sm font-light">
                  <Phone className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs text-stone-400 uppercase tracking-wider">Contact Showroom</p>
                    <p className="mt-1 font-mono text-sky-400">{activeShowroom.phone}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start text-stone-300 text-sm font-light">
                  <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs text-stone-400 uppercase tracking-wider">Horaires de Visite</p>
                    <p className="mt-1 text-stone-300">{activeShowroom.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/10 text-xs text-stone-400 font-light leading-relaxed">
                <p className="text-stone-300 font-medium mb-1 flex items-center gap-1.5 text-sky-400 font-mono uppercase tracking-wider text-[10px]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Service Privé de Curation
                </p>
                Besoin d'un accompagnement personnalisé ? Contactez directement notre équipe pour réserver un créneau exclusif d'une heure.
              </div>

              <a 
                href={activeShowroom.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/5 text-stone-300 hover:text-stone-100 transition-colors text-xs font-mono flex items-center justify-center gap-2 tracking-wide cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-sky-400" /> Ouvrir dans Google Maps
              </a>
            </div>
          </div>

          {/* OPENSTREETMAP EMBED INTEGRATION */}
          <div className="lg:col-span-7 h-[450px] rounded-2xl overflow-hidden border border-white/5 relative bg-slate-950">
            <iframe
              title={`Carte de ${activeShowroom.name}`}
              width="100%"
              height="100%"
              style={{ 
                border: 0,
                filter: "invert(90%) hue-rotate(180deg) brightness(88%) contrast(92%) grayscale(25%)",
              }}
              src={getOSMEmbedUrl(activeShowroom.lat, activeShowroom.lng)}
              allowFullScreen
            />
            <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[9px] font-mono text-stone-400 tracking-wider flex items-center gap-1.5 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> CARTE : OPENSTREETMAP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
