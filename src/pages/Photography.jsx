import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const photoCollections = [
  {
    id: 1,
    title: "Ingoma Drumming — Muhanga Festival",
    photographer: "Eric Nsanzimana",
    year: "2025",
    count: "34 photos",
    tag: "Performing Arts",
    img: "src/assets/ingoma.png",
    desc: "A comprehensive visual record of the Muhanga Cultural Festival's grand Ingoma drumming finale — 24 master drummers performing in precise formation at dusk.",
  },
  {
    id: 2,
    title: "Faces of the Inyambo — Eastern Plains",
    photographer: "Amina Uwase",
    year: "2025",
    count: "52 photos",
    tag: "Pastoral Life",
    img: "src/assets/inzu.png",
    desc: "Portrait series following the Inyambo cattlemen of Nyagatare through a full lunar month — documenting their daily rituals, cattle ceremonies, and grazing routes.",
  },
  {
    id: 3,
    title: "Imigongo Artisans — Kirehe",
    photographer: "Clarisse Mukamana",
    year: "2024",
    count: "27 photos",
    tag: "Visual Arts",
    img: "src/assets/imigongo.png",
    desc: "Close-up process photography of Imigongo creation — from the first pencil sketch to the final earth-pigment application — capturing a craft unchanged for five centuries.",
  },
  {
    id: 4,
    title: "Intore Warriors — Kigali National Museum",
    photographer: "Patrick Habimana",
    year: "2024",
    count: "41 photos",
    tag: "Dance & Ceremony",
    img: "src/assets/intore.png",
    desc: "High-speed photography captures the explosive athleticism of Intore dance during the annual national museum performance series.",
  },
  {
    id: 5,
    title: "Amasunzu — The Architecture of Identity",
    photographer: "Jean-Pierre Habimana",
    year: "2025",
    count: "18 photos",
    tag: "Portrait",
    img: "src/assets/amasunzu.png",
    desc: "A quiet, intimate portrait series celebrating the resurgence of the Amasunzu hairstyle among Rwanda's younger generation as a statement of cultural pride.",
  },
  {
    id: 6,
    title: "Kubumba — Clay and Memory",
    photographer: "Rose Mukamana",
    year: "2024",
    count: "23 photos",
    tag: "Craft & Artisan",
    img: "src/assets/Kubumba.png",
    desc: "Documentary photography of Rwanda's last traditional clay potters working in Huye — a practice at risk of disappearing within a generation.",
  },
];

const tags = ["All", "Performing Arts", "Pastoral Life", "Visual Arts", "Dance & Ceremony", "Portrait", "Craft & Artisan"];

export default function Photography() {
  const [activeTag, setActiveTag] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeTag === "All" ? photoCollections : photoCollections.filter((p) => p.tag === activeTag);

  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src/assets/intore.png"
            alt="Rwanda Photography"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/60 via-brand-charcoal/30 to-brand-charcoal/85" />
          <div className="absolute inset-0 bg-traditional-grid opacity-[0.04] pointer-events-none" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">
            UWACU • AMAFOTO
          </span>
          <h1 className="text-hero leading-tight mb-6">Photography</h1>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/80 max-w-2xl mx-auto leading-relaxed">
            Every photograph is a window into a living culture. UWACU's photography archive documents Rwanda's communities, ceremonies, artisans, and landscapes with documentary precision and artistic sensitivity.
          </p>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-brand-green py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { num: "2,400+", label: "Photographs Archived" },
            { num: "48", label: "Collections Published" },
            { num: "12", label: "Active Photographers" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-brand-yellow font-serif font-bold text-3xl lg:text-4xl mb-1">{stat.num}</div>
              <div className="text-brand-white/65 text-xs uppercase tracking-widest font-sans">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── GALLERY ── */}
      <section className="py-24 lg:py-32 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">AMAFOTO YACU</span>
            <h2 className="text-section-title text-brand-green">Photo Collections</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border font-sans transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-brand-green text-brand-white border-brand-green"
                    : "bg-transparent text-brand-charcoal/60 border-brand-brown/25 hover:border-brand-green hover:text-brand-green"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((col, i) => (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setLightbox(col)}
                  className="group bg-brand-white rounded-sm border border-brand-brown/10 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="h-60 overflow-hidden relative">
                    <img
                      src={col.img}
                      alt={col.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow/90 flex items-center justify-center">
                        <svg width="20" height="20" fill="none" stroke="#1A1A1A" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </div>
                    <span className="absolute top-4 left-4 bg-brand-yellow text-brand-charcoal text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm font-sans">
                      {col.tag}
                    </span>
                    <span className="absolute bottom-4 right-4 text-brand-white/70 text-[10px] font-sans">{col.count}</span>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-brand-green text-base mb-2 leading-snug">{col.title}</h3>
                    <p className="text-small-custom text-brand-charcoal/60 leading-relaxed text-xs flex-grow">{col.desc}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-brown/10 text-[10px] text-brand-charcoal/40 font-sans">
                      <span>📷 {col.photographer}</span>
                      <span>{col.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-charcoal/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl w-full bg-brand-white rounded-sm overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={lightbox.img} alt={lightbox.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <span className="text-brand-brown text-xs uppercase tracking-widest font-bold font-sans block mb-2">{lightbox.tag}</span>
                <h3 className="font-serif font-bold text-brand-green text-2xl mb-3">{lightbox.title}</h3>
                <p className="text-brand-charcoal/70 text-sm leading-relaxed mb-4">{lightbox.desc}</p>
                <div className="flex items-center gap-4 text-[11px] text-brand-charcoal/40 font-sans">
                  <span>📷 {lightbox.photographer}</span>
                  <span>·</span>
                  <span>{lightbox.year}</span>
                  <span>·</span>
                  <span>{lightbox.count}</span>
                </div>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-brand-charcoal/80 flex items-center justify-center text-brand-white hover:bg-brand-charcoal transition-colors"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <motion.section
        className="py-24 bg-brand-charcoal"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">UMUFOTOGRAFI</span>
          <h2 className="text-section-title text-brand-white mb-6">Contribute Your Lens</h2>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/75 mb-10 leading-relaxed">
            Are you a photographer documenting Rwandan culture? We'd love to feature your work in the UWACU archive and share your perspective with the world.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/about"
              className="px-8 py-4 bg-brand-brown hover:bg-brand-brown/90 text-brand-white text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl border border-brand-yellow/20"
            >
              Get in Touch
            </Link>
            <Link
              to="/culture"
              className="px-8 py-4 bg-transparent border border-brand-white/30 hover:border-brand-yellow text-brand-white hover:text-brand-yellow text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300"
            >
              Explore Culture
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
