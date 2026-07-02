import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const upcoming = [
  {
    title: "Umuganura — National Harvest Festival",
    date: "August 7, 2026",
    location: "Amahoro National Stadium, Kigali",
    type: "National Ceremony",
    desc: "Rwanda's national harvest festival — a celebration of gratitude, unity, and cultural pride. UWACU will document and broadcast the festivities for the global diaspora.",
    img: "src/assets/dance.png",
    featured: true,
  },
  {
    title: "Imigongo Masterclass — Kirehe Edition",
    date: "July 19, 2026",
    location: "Kirehe Cultural Centre, Eastern Province",
    type: "Workshop",
    desc: "An intensive one-day workshop with master Imigongo artist Clarisse Mukamana. Learn to design and apply traditional geometric patterns using authentic earth pigments.",
    img: "src/assets/imigongo.png",
    featured: false,
  },
  {
    title: "Night of Oral Traditions — Kigali",
    date: "July 25, 2026",
    location: "Inema Arts Center, Kacyiru",
    type: "Cultural Evening",
    desc: "An intimate evening of storytelling, proverb sharing, and praise poetry in Kinyarwanda. A rare opportunity to experience Rwanda's living oral heritage in its natural form.",
    img: "src/assets/ingoma.png",
    featured: false,
  },
  {
    title: "Digital Heritage Forum 2026",
    date: "August 3, 2026",
    location: "Virtual — Zoom Webinar",
    type: "Online Forum",
    desc: "A global conversation on preserving intangible cultural heritage through digital platforms, machine learning, and community participation. Speakers from 10+ countries.",
    img: "src/assets/amasunzu.png",
    featured: false,
  },
  {
    title: "Agaseke Basket Weaving Intensive",
    date: "August 17, 2026",
    location: "Musanze Cultural Village, Northern Province",
    type: "Workshop",
    desc: "Learn the art of Rwanda's iconic coiled grass baskets with community artisans. Participants will complete their own Agaseke piece to take home.",
    img: "src/assets/uduseke.png",
    featured: false,
  },
  {
    title: "Intore Dance Showcase",
    date: "September 5, 2026",
    location: "Rwanda Cultural Village, Butare",
    type: "Performance",
    desc: "A spectacular evening of traditional Intore warrior dance performed by Rwanda's most celebrated dance troupes. A visual and emotional experience not to be missed.",
    img: "src/assets/intore.png",
    featured: false,
  },
];

const typeColors = {
  "National Ceremony": "bg-brand-yellow text-brand-charcoal",
  "Workshop": "bg-brand-green/80 text-brand-white",
  "Cultural Evening": "bg-brand-brown/80 text-brand-white",
  "Online Forum": "bg-brand-charcoal/80 text-brand-white",
  "Performance": "bg-brand-green/80 text-brand-white",
};

export default function Events() {
  const featured = upcoming.find((e) => e.featured);
  const rest = upcoming.filter((e) => !e.featured);

  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src/assets/dance.png"
            alt="UWACU Events"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/60 via-brand-charcoal/35 to-brand-charcoal/90" />
          <div className="absolute inset-0 bg-traditional-grid opacity-[0.04] pointer-events-none" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">
            UWACU • IBIKORWA
          </span>
          <h1 className="text-hero leading-tight mb-6">Events</h1>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/80 max-w-2xl mx-auto leading-relaxed">
            Experience Rwanda's living culture through UWACU's curated programme of workshops, ceremonies, performances, and cultural gatherings.
          </p>
        </motion.div>
      </section>

      {/* ── FEATURED ── */}
      {featured && (
        <section className="py-20 bg-brand-white border-b border-brand-brown/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >
              <div className="w-full lg:w-1/2 aspect-[16/10] rounded-sm overflow-hidden shadow-2xl group flex-shrink-0">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex-1">
                <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 font-sans ${typeColors[featured.type] || "bg-brand-brown/80 text-brand-white"}`}>
                  {featured.type}
                </span>
                <h2 className="font-serif font-bold text-brand-green text-2xl lg:text-4xl mb-4 leading-tight">{featured.title}</h2>
                <div className="flex flex-col gap-2 text-sm text-brand-charcoal/55 font-sans mb-5">
                  <span>📅 {featured.date}</span>
                  <span>📍 {featured.location}</span>
                </div>
                <p className="text-body-custom text-brand-charcoal/70 leading-relaxed mb-8">{featured.desc}</p>
                <Link
                  to="/get-involved"
                  className="inline-block px-8 py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl border border-brand-yellow/10"
                >
                  Register Interest
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── ALL EVENTS ── */}
      <section className="py-24 lg:py-32 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">IBIKORWA BIZAZA</span>
            <h2 className="text-section-title text-brand-green">Upcoming Events</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-brand-white rounded-sm border border-brand-brown/10 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 flex flex-col"
              >
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={ev.img}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent" />
                  <span className={`absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm font-sans ${typeColors[ev.type] || "bg-brand-brown/80 text-brand-white"}`}>
                    {ev.type}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-serif font-bold text-brand-green text-lg mb-3 leading-snug group-hover:text-brand-brown transition-colors">
                    {ev.title}
                  </h3>
                  <div className="flex flex-col gap-1 text-[11px] text-brand-charcoal/45 font-sans mb-4">
                    <span>📅 {ev.date}</span>
                    <span>📍 {ev.location}</span>
                  </div>
                  <p className="text-small-custom text-brand-charcoal/60 leading-relaxed flex-grow text-xs">{ev.desc}</p>
                  <div className="mt-5 pt-4 border-t border-brand-brown/10">
                    <Link
                      to="/get-involved"
                      className="text-brand-green hover:text-brand-brown text-[11px] font-bold uppercase tracking-widest font-sans transition-colors inline-flex items-center gap-1 group/btn"
                    >
                      Register
                      <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section
        className="py-24 bg-brand-charcoal relative overflow-hidden"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.04] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">TUZAMARIKE</span>
          <h2 className="text-section-title text-brand-white mb-6">Host an Event with UWACU</h2>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/75 mb-10 leading-relaxed">
            Are you organizing a cultural event, exhibition, or community gathering? Partner with UWACU to document, promote, and amplify your work.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-brand-brown hover:bg-brand-brown/90 text-brand-white text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl border border-brand-yellow/20"
          >
            Get in Touch
          </Link>
        </div>
      </motion.section>

    </div>
  );
}
