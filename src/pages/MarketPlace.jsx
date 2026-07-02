import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ContributeCulturalContent from "../components/contact";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const ways = [
  {
    title: "Share Your Story",
    kiny: "Tanga Inkuru Yawe",
    desc: "Every Rwandan — at home or in the diaspora — carries memories, traditions, and knowledge that deserve to be preserved. Submit written stories, audio recordings, or video testimonials.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    action: "Submit a Story",
    to: "/contact",
  },
  {
    title: "Volunteer with Us",
    kiny: "Bera Insenga Yacu",
    desc: "Join our network of cultural ambassadors, translators, event organizers, and digital archivists working to preserve Rwandan heritage for future generations.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    action: "Join as Volunteer",
    to: "/contact",
  },
  {
    title: "Partner with UWACU",
    kiny: "Gukorana Natwe",
    desc: "Cultural organizations, schools, NGOs, and businesses can collaborate with UWACU on exhibitions, digital projects, workshops, and community outreach programs.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-4-4H12" /><circle cx="16" cy="7" r="4" />
      </svg>
    ),
    action: "Explore Partnerships",
    to: "/contact",
  },
  {
    title: "Support Our Mission",
    kiny: "Shyigikira Intego Yacu",
    desc: "Your financial support directly funds documentation expeditions, cultural workshops, youth education programs, and the maintenance of our growing digital archive.",
    icon: (
      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    action: "Donate to UWACU",
    to: "/contact",
  },
];

const events = [
  {
    title: "Imigongo Workshop — Kigali",
    date: "July 12, 2026",
    location: "UWACU Cultural Center, Kigali",
    type: "Workshop",
    spots: "12 spots left",
  },
  {
    title: "Rwandan Storytelling Evening",
    date: "July 19, 2026",
    location: "Norrsken House, Kigali",
    type: "Cultural Event",
    spots: "Open",
  },
  {
    title: "Digital Heritage Forum",
    date: "August 3, 2026",
    location: "Virtual — Zoom",
    type: "Online Forum",
    spots: "Unlimited",
  },
  {
    title: "Agaseke Basket Weaving Class",
    date: "August 17, 2026",
    location: "Southern Province Community Center",
    type: "Workshop",
    spots: "8 spots left",
  },
];

export default function MarketPlace() {
  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src/assets/dance.png"
            alt="Get Involved with UWACU"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/60 via-brand-charcoal/40 to-brand-charcoal/85" />
          <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.04] pointer-events-none" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">
            UWACU • BERA INSENGA
          </span>
          <h1 className="text-hero leading-tight mb-6">Get Involved</h1>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/80 max-w-2xl mx-auto leading-relaxed">
            Culture is not a spectator sport. UWACU's mission lives through the collective effort of storytellers, artists, volunteers, and partners who believe Rwanda's heritage deserves a future.
          </p>
        </motion.div>
      </section>

      {/* ── WAYS TO GET INVOLVED ── */}
      <section className="py-24 lg:py-32 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">UBURYO BWO GUFASHA</span>
            <h2 className="text-section-title text-brand-green">How You Can Help</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {ways.map((way, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-brand-white border border-brand-brown/10 rounded-sm p-8 shadow-lg hover:shadow-2xl hover:border-brand-green/30 transition-all duration-300 flex flex-col"
              >
                <div className="text-brand-yellow mb-5">{way.icon}</div>
                <span className="text-brand-brown text-xs uppercase tracking-widest font-bold font-sans block mb-2">{way.kiny}</span>
                <h3 className="font-serif font-bold text-brand-green text-xl mb-4">{way.title}</h3>
                <p className="text-brand-charcoal/70 text-sm leading-relaxed mb-6 flex-grow">{way.desc}</p>
                <Link
                  to={way.to}
                  className="inline-flex items-center gap-2 text-brand-green hover:text-brand-brown text-xs font-bold uppercase tracking-widest font-sans transition-colors group/btn"
                >
                  {way.action}
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="py-20 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 bg-agaseke-motif opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-yellow font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">IBIKORWA BIZAZA</span>
            <h2 className="text-section-title text-brand-white">Upcoming Events</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-brand-white/5 border border-brand-yellow/15 rounded-sm p-6 hover:bg-brand-white/10 hover:border-brand-yellow/35 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-brand-yellow text-brand-charcoal text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm font-sans">{ev.type}</span>
                  <span className="text-brand-yellow/60 text-[10px] font-sans">{ev.spots}</span>
                </div>
                <h3 className="font-serif font-bold text-brand-white text-lg mb-2 group-hover:text-brand-yellow transition-colors">{ev.title}</h3>
                <div className="flex flex-col gap-1 text-[11px] text-brand-white/55 font-sans">
                  <span>📅 {ev.date}</span>
                  <span>📍 {ev.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTRIBUTE SECTION (existing component) ── */}
      <ContributeCulturalContent />

    </div>
  );
}
