import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const pillars = [
  {
    kiny: "Indimi",
    title: "Language & Oral Traditions",
    desc:
      "Kinyarwanda is not merely a language — it is a living archive. Proverbs, riddles, praise poetry (amazina), and ceremonial speeches carry centuries of wisdom, passed down through careful recitation at family gatherings and community events.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    img: "src/assets/ingoma.png",
  },
  {
    kiny: "Imigenzo",
    title: "Ceremonies & Rituals",
    desc:
      "From Gusaba marriage negotiations and Umuganura harvest festivals to the solemn Kwibuka commemoration, Rwandan ceremonies mark the passage of life with structured ritual, song, and communal participation.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    img: "src/assets/dance.png",
  },
  {
    kiny: "Ubuhanzi",
    title: "Visual Arts & Craft",
    desc:
      "Imigongo geometric painting, Agaseke coiled basketry, Ubumba pottery, and Inzuki beadwork are not decorative luxuries — they are coded languages expressing cosmology, identity, and social hierarchy.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    img: "src/assets/imigongo.png",
  },
  {
    kiny: "Indirimbo",
    title: "Music & Dance",
    desc:
      "Intore warrior dance, Umushagiriro women's dance, Ingoma drumming ensembles — Rwandan performing arts fuse athleticism, storytelling, and spirituality into powerful public spectacle.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>
    ),
    img: "src/assets/intore.png",
  },
];

const provinces = [
  {
    name: "Kigali City",
    highlight: "Urban Heritage",
    desc: "The capital blends ultra-modern architecture with restored colonial-era buildings and vibrant street art celebrating post-genocide renaissance.",
    color: "bg-brand-green",
  },
  {
    name: "Northern Province",
    highlight: "Volcanic Highlands",
    desc: "Home to the Virunga volcanoes and gorilla territory. The north is where ancient Intore warrior traditions were forged in highland villages.",
    color: "bg-brand-brown",
  },
  {
    name: "Southern Province",
    highlight: "Royal Legacy",
    desc: "Nyanza, seat of the mwami (king). The King's Palace Museum and the Butare National Museum anchor the south's deep historical identity.",
    color: "bg-brand-charcoal",
  },
  {
    name: "Eastern Province",
    highlight: "Pastoral Plains",
    desc: "Vast savannahs and the shores of Lake Ihema. The east is the heartland of Rwandan pastoral culture and the legendary long-horned Inyambo cattle.",
    color: "bg-brand-green",
  },
  {
    name: "Western Province",
    highlight: "Lake & Forest",
    desc: "Dramatic lake shores and rainforest ridges. The west harbours the Congo-Nile trail and ancient fishing communities with distinct oral traditions.",
    color: "bg-brand-brown",
  },
];

export default function CultureHeritage() {
  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[88vh] flex items-center justify-center bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src/assets/imigongo.png"
            alt="Rwandan Imigongo Art"
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/70 via-brand-charcoal/40 to-brand-charcoal/85" />
          <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.04] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">
              UWACU • UBUHUZA N'AMATEKA
            </span>
            <h1 className="text-hero leading-tight mb-6">
              Culture &amp; Heritage
            </h1>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
            <p className="text-body-custom text-white/80 max-w-2xl mx-auto leading-relaxed">
              Rwanda's cultural heritage is a living, breathing tapestry — woven from language, ritual, art, and community across millennia. Explore the pillars that define who we are.
            </p>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-yellow/60"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section className="py-24 lg:py-32 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-20"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">INZEGO Z'UBUHUZA</span>
            <h2 className="text-section-title text-brand-green">The Four Pillars of Heritage</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          <div className="flex flex-col gap-0">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className={`flex flex-col ${i % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20 py-14 border-b border-brand-brown/10 last:border-0`}
              >
                <div className="w-full lg:w-2/5 aspect-[4/3] rounded-sm overflow-hidden shadow-xl border-4 border-brand-brown/10 group flex-shrink-0">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-brand-yellow mb-4">{p.icon}</div>
                  <span className="text-brand-brown text-xs uppercase tracking-widest font-bold font-sans block mb-2">{p.kiny}</span>
                  <h3 className="font-serif font-bold text-brand-green text-2xl lg:text-3xl mb-4">{p.title}</h3>
                  <p className="text-body-custom text-brand-charcoal/75 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROVINCES ── */}
      <section className="py-24 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-imigongo-diamonds opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-yellow font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">INTARA ZOSE</span>
            <h2 className="text-section-title text-brand-white">Heritage Across Five Provinces</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {provinces.map((prov, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.09 }}
                whileHover={{ y: -6 }}
                className="bg-brand-white/5 border border-brand-yellow/10 rounded-sm p-8 hover:bg-brand-white/10 hover:border-brand-yellow/30 transition-all duration-300 cursor-default"
              >
                <div className={`inline-block text-brand-yellow text-xs font-bold uppercase tracking-widest font-sans px-3 py-1 rounded-sm mb-4 ${prov.color}/30 border border-brand-yellow/20`}>
                  {prov.highlight}
                </div>
                <h3 className="font-serif font-bold text-brand-white text-xl mb-3">{prov.name}</h3>
                <p className="text-small-custom text-brand-white/65 leading-relaxed">{prov.desc}</p>
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
          <h2 className="text-section-title text-brand-green mb-6">Keep Exploring UWACU</h2>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-10" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/stories"
              className="px-8 py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl border border-brand-yellow/10"
            >
              Read Our Stories
            </Link>
            <Link
              to="/photography"
              className="px-8 py-4 bg-transparent border border-brand-brown/40 hover:border-brand-green text-brand-charcoal hover:text-brand-green text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300"
            >
              View Photography
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
