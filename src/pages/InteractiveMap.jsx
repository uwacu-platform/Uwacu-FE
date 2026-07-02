import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

/* Province data for the interactive map */
const provinces = [
  {
    id: "kigali",
    name: "Kigali City",
    subtitle: "The Beating Heart",
    color: "#FAD201",
    x: 48,
    y: 44,
    heritage: ["Kandt House Museum", "Kimironko Market", "Kigali Genocide Memorial", "Nyamata Memorial"],
    population: "1.35M",
    area: "730 km²",
    desc: "Rwanda's capital and economic engine, Kigali sits at the crossroads of the country's five provinces. A model of African urban renaissance, it blends ultra-modern infrastructure with restored colonial buildings and vibrant street art.",
  },
  {
    id: "north",
    name: "Northern Province",
    subtitle: "The Volcanic Highlands",
    color: "#313A12",
    x: 40,
    y: 18,
    heritage: ["Volcanoes National Park", "Musanze Caves", "Twin Lakes", "Iby'Iwacu Cultural Village"],
    population: "1.73M",
    area: "4,787 km²",
    desc: "Dominated by the Virunga volcanoes, the north is Rwanda's adventure heartland. Dense rainforest shelters endangered mountain gorillas while highland villages preserve Intore warrior traditions and ancient hill-farming practices.",
  },
  {
    id: "south",
    name: "Southern Province",
    subtitle: "The Royal Legacy",
    color: "#6B4F3A",
    x: 38,
    y: 68,
    heritage: ["King's Palace Museum — Nyanza", "National Museum of Rwanda — Butare", "Nyungwe Forest", "Ethnographic Museum"],
    population: "2.59M",
    area: "5,759 km²",
    desc: "Once home to the mwami royal court at Nyanza, the south carries Rwanda's deepest regal heritage. The National Museum in Butare holds the country's most comprehensive ethnographic collection, while Nyungwe Forest shelters chimpanzees and rare primates.",
  },
  {
    id: "east",
    name: "Eastern Province",
    subtitle: "The Pastoral Plains",
    color: "#313A12",
    x: 73,
    y: 44,
    heritage: ["Akagera National Park", "Ibanda-Makera Forest", "Inyambo Cattle Ceremony", "Nyarubuye Memorial"],
    population: "2.35M",
    area: "10,862 km²",
    desc: "Rwanda's largest province stretches across vast savannahs where the legendary long-horned Inyambo cattle have grazed for centuries. Akagera National Park offers safari encounters, while the eastern shores of Lake Ihema shelter hippos and crocodiles.",
  },
  {
    id: "west",
    name: "Western Province",
    subtitle: "Lake & Forest",
    color: "#6B4F3A",
    x: 18,
    y: 44,
    heritage: ["Lake Kivu Shore", "Congo-Nile Trail", "Kibuye Churches", "Gishwati-Mukura Forest"],
    population: "2.49M",
    area: "5,883 km²",
    desc: "Dramatic cliffs plunge into the sapphire waters of Lake Kivu along Rwanda's western border. The Congo-Nile trail winds through terraced hills and forest reserves, connecting lakeside fishing communities with rich oral traditions and distinct pottery styles.",
  },
];

export default function InteractiveMap() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src/assets/inzu.png"
            alt="Rwanda Map"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/70 via-brand-charcoal/50 to-brand-charcoal/90" />
          <div className="absolute inset-0 bg-agaseke-motif opacity-[0.04] pointer-events-none" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">
            UWACU • IKARITA Y'U RWANDA
          </span>
          <h1 className="text-hero leading-tight mb-6">Interactive Map</h1>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/80 max-w-2xl mx-auto leading-relaxed">
            Rwanda's five provinces each hold a distinct cultural identity, landscape, and living heritage. Click on any province to explore its unique story.
          </p>
        </motion.div>
      </section>

      {/* ── MAP + PANEL ── */}
      <section className="py-20 lg:py-28 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* SVG Map */}
            <motion.div
              className="w-full lg:w-3/5 flex-shrink-0"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="relative aspect-square max-w-xl mx-auto bg-brand-green/5 border border-brand-brown/15 rounded-sm overflow-hidden shadow-2xl">
                {/* SVG background grid */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[10,20,30,40,50,60,70,80,90].map(v => (
                    <React.Fragment key={v}>
                      <line x1={v} y1="0" x2={v} y2="100" stroke="#6B4F3A" strokeWidth="0.3" />
                      <line x1="0" y1={v} x2="100" y2={v} stroke="#6B4F3A" strokeWidth="0.3" />
                    </React.Fragment>
                  ))}
                </svg>

                {/* Rwanda silhouette background */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <ellipse cx="48" cy="50" rx="36" ry="40" fill="#313A12" fillOpacity="0.06" />
                </svg>

                {/* Province pins */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  {provinces.map((prov) => (
                    <g
                      key={prov.id}
                      onClick={() => setSelected(selected?.id === prov.id ? null : prov)}
                      className="cursor-pointer"
                    >
                      {/* Pulse ring */}
                      {selected?.id === prov.id && (
                        <circle cx={prov.x} cy={prov.y} r="8" fill={prov.color} fillOpacity="0.2">
                          <animate attributeName="r" from="8" to="14" dur="1.5s" repeatCount="indefinite" />
                          <animate attributeName="fill-opacity" from="0.2" to="0" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {/* Pin circle */}
                      <circle
                        cx={prov.x}
                        cy={prov.y}
                        r={selected?.id === prov.id ? 5.5 : 4}
                        fill={selected?.id === prov.id ? "#FAD201" : prov.color}
                        stroke="white"
                        strokeWidth="1.5"
                        style={{ transition: "all 0.3s" }}
                      />
                      {/* Label */}
                      <text
                        x={prov.x}
                        y={prov.y + 9}
                        textAnchor="middle"
                        fontSize="3.2"
                        fill={selected?.id === prov.id ? "#FAD201" : "#1A1A1A"}
                        fontFamily="Inter, sans-serif"
                        fontWeight="600"
                        style={{ transition: "fill 0.3s" }}
                      >
                        {prov.name}
                      </text>
                    </g>
                  ))}

                  {/* Compass */}
                  <g transform="translate(88, 88)">
                    <circle r="5" fill="white" fillOpacity="0.9" />
                    <text textAnchor="middle" y="-2.5" fontSize="3" fill="#313A12" fontWeight="700" fontFamily="Inter,sans-serif">N</text>
                    <line x1="0" y1="-4.5" x2="0" y2="4.5" stroke="#313A12" strokeWidth="0.5" />
                    <line x1="-4.5" y1="0" x2="4.5" y2="0" stroke="#313A12" strokeWidth="0.5" />
                  </g>
                </svg>

                {/* Map title */}
                <div className="absolute top-4 left-4 bg-brand-green/90 backdrop-blur-sm px-4 py-2 rounded-sm">
                  <span className="text-brand-yellow text-[9px] font-bold uppercase tracking-widest font-sans">Republic of Rwanda</span>
                </div>

                {/* Hint */}
                {!selected && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-4 right-4 text-[9px] text-brand-charcoal/40 font-sans"
                  >
                    Click a province to explore →
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Info Panel */}
            <div className="w-full lg:flex-1">
              {!selected ? (
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  className="sticky top-28"
                >
                  <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-4 font-sans">INTARA ZOSE</span>
                  <h2 className="text-section-title text-brand-green mb-6">Five Provinces, One Rwanda</h2>
                  <div className="w-16 h-[2px] bg-brand-yellow mb-8" />
                  <p className="text-body-custom text-brand-charcoal/70 leading-relaxed mb-8">
                    Rwanda's five provinces — Kigali City, North, South, East, and West — each carry a distinct cultural fingerprint shaped by their geography, history, and communities.
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {provinces.map((prov) => (
                      <button
                        key={prov.id}
                        onClick={() => setSelected(prov)}
                        className="flex items-center gap-4 p-4 bg-brand-white border border-brand-brown/10 rounded-sm hover:border-brand-green hover:shadow-lg transition-all duration-200 text-left group"
                      >
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: prov.color }}
                        />
                        <div>
                          <div className="font-sans font-bold text-brand-green text-sm group-hover:text-brand-brown transition-colors">{prov.name}</div>
                          <div className="text-brand-charcoal/40 text-[10px] uppercase tracking-widest font-sans">{prov.subtitle}</div>
                        </div>
                        <svg className="ml-auto w-4 h-4 text-brand-charcoal/30 group-hover:text-brand-green transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="sticky top-28"
                >
                  <button
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-2 text-brand-charcoal/50 hover:text-brand-green text-xs font-sans uppercase tracking-widest transition-colors mb-6"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    All Provinces
                  </button>

                  <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-2 font-sans">{selected.subtitle}</span>
                  <h2 className="font-serif font-bold text-brand-green text-3xl lg:text-4xl mb-4 leading-tight">{selected.name}</h2>
                  <div className="w-16 h-[2px] bg-brand-yellow mb-6" />

                  <div className="flex gap-6 mb-6">
                    <div className="text-center">
                      <div className="font-serif font-bold text-brand-green text-xl">{selected.population}</div>
                      <div className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest font-sans">Population</div>
                    </div>
                    <div className="w-px bg-brand-brown/15" />
                    <div className="text-center">
                      <div className="font-serif font-bold text-brand-green text-xl">{selected.area}</div>
                      <div className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest font-sans">Area</div>
                    </div>
                  </div>

                  <p className="text-body-custom text-brand-charcoal/70 leading-relaxed mb-8">{selected.desc}</p>

                  <div className="bg-brand-white border border-brand-brown/10 rounded-sm p-6">
                    <h3 className="font-sans font-bold text-brand-green text-xs uppercase tracking-widest mb-4">Heritage Sites & Points of Interest</h3>
                    <ul className="flex flex-col gap-3">
                      {selected.heritage.map((h, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-brand-charcoal/70 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── DID YOU KNOW ── */}
      <section className="py-20 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.04] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-yellow font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">REBA N'IBI</span>
            <h2 className="text-section-title text-brand-white">Rwanda by the Numbers</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "26,338", unit: "km²", label: "Total Land Area" },
              { num: "1,000+", unit: "", label: "Hills (Inzitane)" },
              { num: "5", unit: "", label: "Provinces" },
              { num: "30", unit: "", label: "Districts" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-brand-white/5 border border-brand-yellow/15 rounded-sm p-6 text-center"
              >
                <div className="font-serif font-bold text-brand-yellow text-3xl mb-1">
                  {stat.num}<span className="text-lg ml-1">{stat.unit}</span>
                </div>
                <div className="text-brand-white/60 text-xs uppercase tracking-widest font-sans">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section
        className="py-24 bg-brand-offwhite border-t border-brand-brown/10"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-4 font-sans">REBA KANDI</span>
          <h2 className="text-section-title text-brand-green mb-6">Discover More of Rwanda</h2>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-10" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/culture"
              className="px-8 py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl border border-brand-yellow/10"
            >
              Culture &amp; Heritage
            </Link>
            <Link
              to="/stories"
              className="px-8 py-4 bg-transparent border border-brand-brown/40 hover:border-brand-green text-brand-charcoal hover:text-brand-green text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300"
            >
              Read Our Stories
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
