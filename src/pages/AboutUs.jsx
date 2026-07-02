import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ─── Fade-up animation variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

/* ─── Team members ─── */
const team = [
  {
    name: "Amina Uwase",
    role: "Founder & Executive Director",
    bio: "A cultural anthropologist and native of Kigali, Amina founded UWACU after 12 years of field research documenting Rwanda's living oral traditions across all five provinces.",
    img: "src/assets/iningiri.png",
  },
  {
    name: "Jean-Baptiste Nkurunziza",
    role: "Head of Cultural Programs",
    bio: "A former Intore dancer and musician, Jean-Baptiste leads our community outreach efforts, weaving performance arts into school curricula and national festivals.",
    img: "src/assets/intore.png",
  },
  {
    name: "Clarisse Mukamana",
    role: "Creative Director",
    bio: "Award-winning visual artist and Imigongo painter, Clarisse shapes the aesthetic identity of UWACU—bridging ancestral geometry with modern digital expression.",
    img: "src/assets/imitako.png",
  },
  {
    name: "Patrick Habimana",
    role: "Technology & Partnerships Lead",
    bio: "Patrick connects UWACU with global institutions and diaspora communities, building digital platforms that carry Rwandan culture to every corner of the world.",
    img: "src/assets/kuboha.png",
  },
];

/* ─── Core values ─── */
const values = [
  {
    kiny: "Ubumuntu",
    title: "Humanity",
    desc: "Every person carries a story worth preserving. We center human dignity and community in all that we do.",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    kiny: "Ubuziranenge",
    title: "Integrity",
    desc: "We represent Rwandan culture with accuracy, respect, and a deep sense of responsibility to our ancestors.",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    kiny: "Ubutwari",
    title: "Courage",
    desc: "Preserving culture in a rapidly changing world demands bold choices. We embrace that challenge with open hearts.",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    kiny: "Ubunyangamugayo",
    title: "Excellence",
    desc: "From our exhibitions to our digital platforms, we pursue the highest standard in everything we create.",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
  },
];

/* ─── Milestones ─── */
const milestones = [
  { year: "2018", title: "UWACU Founded", desc: "Born from a research trip to Nyanza, UWACU was established to digitally archive Rwanda's living heritage before it fades." },
  { year: "2019", title: "First Cultural Exchange", desc: "Partnered with the Rwanda Arts Initiative to host our debut cultural exchange, bringing 200 artisans together in Kigali." },
  { year: "2021", title: "Digital Platform Launch", desc: "Launched the first iteration of UWACU online—a library of 500+ stories, songs, and craft tutorials in Kinyarwanda." },
  { year: "2023", title: "UNESCO Recognition", desc: "Received a commendation from UNESCO for outstanding contributions to intangible cultural heritage preservation in East Africa." },
  { year: "2025", title: "Diaspora Program", desc: "Launched our global diaspora outreach, connecting Rwandans in 40+ countries with their roots through virtual exhibitions and workshops." },
  { year: "2026", title: "New Digital Experience", desc: "Unveiled this fully redesigned platform to deliver an immersive, interactive cultural journey for the next generation." },
];

export default function AboutUs() {
  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src/assets/ingoma.png"
            alt="Rwanda Cultural Heritage"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/60 via-brand-charcoal/30 to-brand-charcoal/80" />
          <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.03] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-brand-yellow font-bold uppercase tracking-[0.25em] text-sm mb-5 block font-sans">
              UWACU • WHO WE ARE
            </span>
            <h1 className="text-hero leading-tight mb-6">
              Honoring Rwanda's Past,<br className="hidden md:inline" /> Inspiring the Future
            </h1>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
            <p className="text-body-custom text-white/80 max-w-2xl mx-auto leading-relaxed">
              UWACU is a cultural platform dedicated to preserving and celebrating the living heritage of Rwanda — its stories, its art, its people, and its land.
            </p>
          </motion.div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-imigongo-chevron opacity-20" />
      </section>

      {/* ── MISSION & VISION ── */}
      <motion.section
        className="py-24 lg:py-32 bg-brand-offwhite relative border-b border-brand-brown/10 overflow-hidden"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-imigongo-diamonds opacity-[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              initial={{ x: -80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
              className="relative rounded-sm overflow-hidden shadow-2xl aspect-[4/3] border-4 border-brand-brown/10 group"
            >
              <img
                src="src/assets/Kubumba.png"
                alt="Rwandan artisan at work"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-brand-green/95 backdrop-blur-sm px-5 py-3 rounded-sm">
                <span className="text-brand-yellow text-xs font-bold uppercase tracking-widest font-sans">
                  Founded 2018 · Kigali, Rwanda
                </span>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ x: 80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
              className="flex flex-col"
            >
              <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs mb-3 font-sans">
                INTEGO YACU • OUR MISSION
              </span>
              <h2 className="text-section-title text-brand-green mb-6">
                In the Beginning, There Was UWACU
              </h2>
              <p className="text-body-custom text-brand-charcoal/80 mb-6 leading-relaxed">
                UWACU — meaning <em>"ours"</em> in Kinyarwanda — was born from a simple conviction: that the stories, traditions, and artistic heritage of Rwanda deserve a permanent, living home in the digital age.
              </p>
              <p className="text-body-custom text-brand-charcoal/70 mb-8 leading-relaxed">
                We document, preserve, and share the depth of Rwandan culture through immersive storytelling, interactive experiences, and community-driven content — ensuring that future generations across the diaspora can always find their way home.
              </p>
              <blockquote className="border-l-4 border-brand-yellow pl-6 italic text-brand-charcoal/90 text-lg font-serif leading-relaxed">
                "Culture is not what we inherit — it is what we choose to carry forward."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── WHAT WE STAND FOR ── */}
      <motion.section
        className="py-24 bg-brand-charcoal relative overflow-hidden"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              IBYO DUSHYIGIKIRA
            </span>
            <h2 className="text-section-title text-brand-white">
              What We Stand For: Humanity, Integrity, and Courage.
            </h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-brand-white/5 border border-brand-yellow/10 rounded-sm p-8 flex flex-col hover:bg-brand-white/10 hover:border-brand-yellow/30 transition-all duration-300"
              >
                <div className="text-brand-yellow mb-5">{v.icon}</div>
                <span className="text-brand-yellow/70 text-xs uppercase tracking-widest font-bold mb-1 font-sans">{v.kiny}</span>
                <h3 className="text-subheading text-brand-white mb-3">{v.title}</h3>
                <p className="text-small-custom text-brand-white/65 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── OUR STORY — TIMELINE ── */}
      <motion.section
        className="py-24 lg:py-32 bg-brand-offwhite relative border-b border-brand-brown/10 overflow-hidden"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-agaseke-motif opacity-[0.015] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              INKURU YACU • OUR STORY
            </span>
            <h2 className="text-section-title text-brand-green">A Journey Through Time</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-brand-brown/20 -translate-x-1/2" />

            <div className="flex flex-col gap-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-14 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="bg-brand-white rounded-sm border border-brand-brown/10 shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <span className="text-brand-brown text-xs uppercase tracking-widest font-bold font-sans">{m.year}</span>
                      <h3 className="text-subheading text-brand-green mt-1 mb-2">{m.title}</h3>
                      <p className="text-small-custom text-brand-charcoal/70 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-yellow border-4 border-brand-green shadow-md z-10" />

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── WHAT WE DO — IMAGE STRIPS ── */}
      <motion.section
        className="py-24 bg-brand-white relative border-b border-brand-brown/10 overflow-hidden"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-traditional-grid opacity-[0.025] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              IBIKORWA BYACU
            </span>
            <h2 className="text-section-title text-brand-green">What We Do</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </div>

          <div className="flex flex-col gap-0">
            {[
              {
                title: "Rooted in Identity",
                desc: "We document the living languages, oral histories, and naming ceremonies that anchor Rwandan identity across generations. From *Gusaba* marriage traditions to the recitation of royal lineages, we ensure these voices are never lost.",
                img: "src/assets/amasunzu.png",
                side: "left",
              },
              {
                title: "Strengthening Unity",
                desc: "Through *Umuganda* community stories and the philosophy of *Ubuntu*, UWACU maps the invisible threads that bind Rwandan society — celebrating collective progress as much as individual achievement.",
                img: "src/assets/uduseke.png",
                side: "right",
              },
              {
                title: "Inspiring Creativity",
                desc: "We collaborate with a new generation of Rwandan visual artists, musicians, and poets, providing a global stage for contemporary works rooted in traditional aesthetics — Imigongo geometry meeting modern design.",
                img: "src/assets/imigongo.png",
                side: "left",
              },
              {
                title: "Guiding Daily Values",
                desc: "The proverbs and wisdom of Rwanda's elders guide our editorial compass. Every piece of content we publish honors the values of *Ubumuntu*, *Ubuziranenge*, and *Agaciro* — dignity, integrity, and self-worth.",
                img: "src/assets/inzu.png",
                side: "right",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className={`flex flex-col ${item.side === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20 py-12 border-b border-brand-brown/10 last:border-0`}
              >
                <div className="w-full lg:w-2/5 aspect-[4/3] rounded-sm overflow-hidden shadow-xl border-4 border-brand-brown/10 group flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-subheading text-brand-green mb-4 text-2xl lg:text-3xl font-serif font-bold">{item.title}</h3>
                  <p className="text-body-custom text-brand-charcoal/75 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── TEAM ── */}
      <motion.section
        className="py-24 lg:py-32 bg-brand-offwhite relative border-b border-brand-brown/10 overflow-hidden"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-agaseke-motif opacity-[0.015] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              ABAKOZI BACU • OUR TEAM
            </span>
            <h2 className="text-section-title text-brand-green">The People Behind UWACU</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col bg-brand-white rounded-sm border border-brand-brown/10 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300"
              >
                <div className="h-64 overflow-hidden relative bg-brand-charcoal">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-brand-green text-base font-sans mb-1">{member.name}</h3>
                  <span className="text-brand-brown text-xs uppercase tracking-widest font-bold font-sans mb-3">{member.role}</span>
                  <p className="text-small-custom text-brand-charcoal/65 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA — JOIN THE MOVEMENT ── */}
      <motion.section
        className="relative py-32 bg-brand-charcoal overflow-hidden"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="absolute inset-0">
          <img
            src="src/assets/dance.png"
            alt="Cultural movement"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/80 via-brand-charcoal/70 to-brand-charcoal/90" />
          <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.04] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <span className="text-brand-yellow font-bold uppercase tracking-[0.25em] text-sm mb-5 block font-sans">
            IBICIRO BYACU • JOIN THE CULTURAL MOVEMENT
          </span>
          <h2 className="text-section-title text-brand-white mb-6">
            Be Part of the Story
          </h2>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/75 mb-10 leading-relaxed">
            Whether you are a Rwandan storyteller, an artist, a researcher, or simply someone who loves culture — UWACU has a place for you. Share your voice. Preserve your lineage. Inspire the future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-4 bg-brand-brown hover:bg-brand-brown/90 text-brand-white text-sm tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300 border border-brand-yellow/20 hover:scale-105 shadow-xl"
            >
              Contribute Your Story
            </Link>
            <Link
              to="/"
              className="px-8 py-4 bg-transparent border border-brand-white/30 hover:border-brand-yellow text-brand-white hover:text-brand-yellow text-sm tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300"
            >
              Explore the Platform
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
