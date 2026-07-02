import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const courses = [
  {
    title: "Introduction to Kinyarwanda",
    level: "Beginner",
    lessons: 12,
    duration: "4 weeks",
    desc: "Learn the foundations of Rwanda's national language — greetings, numbers, proverbs, and everyday phrases — taught through cultural context and storytelling.",
    img: "src/assets/ingoma.png",
    tag: "Language",
  },
  {
    title: "The Art of Imigongo",
    level: "All Levels",
    lessons: 8,
    duration: "3 weeks",
    desc: "A hands-on guide to Rwanda's geometric mural tradition. Learn the symbolic vocabulary of Imigongo patterns, their historical origins, and how to create your own designs.",
    img: "src/assets/imigongo.png",
    tag: "Visual Arts",
  },
  {
    title: "Rwandan Oral Traditions",
    level: "Intermediate",
    lessons: 10,
    duration: "5 weeks",
    desc: "Explore the rich oral heritage of Rwanda — praise poetry (amazina), epic narratives (ibitekerezo), riddles (ibisakuzo), and their role in shaping communal identity.",
    img: "src/assets/amasunzu.png",
    tag: "History",
  },
  {
    title: "Understanding Umuganura",
    level: "All Levels",
    lessons: 6,
    duration: "2 weeks",
    desc: "Dive deep into Rwanda's national harvest festival — its spiritual roots, community rituals, royal traditions, and contemporary revival as a symbol of national unity.",
    img: "src/assets/dance.png",
    tag: "Ceremony",
  },
  {
    title: "Traditional Rwandan Music",
    level: "Beginner",
    lessons: 14,
    duration: "6 weeks",
    desc: "From the inanga zither to the ikembe thumb piano, this course covers Rwanda's traditional instruments, their tuning systems, and the cultural contexts in which they are played.",
    img: "src/assets/intore.png",
    tag: "Music",
  },
  {
    title: "Agaseke Basket Weaving",
    level: "All Levels",
    lessons: 9,
    duration: "4 weeks",
    desc: "Rwanda's coiled grass baskets are among Africa's most celebrated crafts. Learn the symbolic patterns, proper techniques, and the social significance of Agaseke in Rwandan life.",
    img: "src/assets/uduseke.png",
    tag: "Craft",
  },
];

const resources = [
  { title: "Kinyarwanda Proverbs Dictionary", type: "PDF Guide", size: "2.4 MB" },
  { title: "Imigongo Pattern Templates", type: "Design Pack", size: "8.1 MB" },
  { title: "Rwandan Cultural Calendar 2026", type: "Interactive PDF", size: "1.7 MB" },
  { title: "Traditional Instruments — Audio Library", type: "Audio Collection", size: "Free Stream" },
];

export default function Learn() {
  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src/assets/Kubumba.png"
            alt="Learning Rwanda"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/65 via-brand-charcoal/35 to-brand-charcoal/85" />
          <div className="absolute inset-0 bg-imigongo-diamonds opacity-[0.04] pointer-events-none" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">
            UWACU • KWIGA
          </span>
          <h1 className="text-hero leading-tight mb-6">Learn</h1>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/80 max-w-2xl mx-auto leading-relaxed">
            Deepen your understanding of Rwandan culture through guided courses, curated resources, and interactive lessons created by cultural experts and community practitioners.
          </p>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <div className="bg-brand-green py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { num: "24", label: "Cultural Courses" },
            { num: "1,200+", label: "Active Learners" },
            { num: "8", label: "Languages Available" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-brand-yellow font-serif font-bold text-3xl lg:text-4xl mb-1">{stat.num}</div>
              <div className="text-brand-white/65 text-xs uppercase tracking-widest font-sans">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COURSES ── */}
      <section className="py-24 lg:py-32 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">AMASOMO YACU</span>
            <h2 className="text-section-title text-brand-green">Our Courses</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-brand-white rounded-sm border border-brand-brown/10 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent" />
                  <span className="absolute top-4 left-4 bg-brand-yellow text-brand-charcoal text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm font-sans">
                    {course.tag}
                  </span>
                  <span className="absolute bottom-4 right-4 text-brand-white/70 text-[10px] font-sans bg-brand-charcoal/60 px-2 py-1 rounded-sm">
                    {course.level}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-serif font-bold text-brand-green text-lg mb-3 leading-snug group-hover:text-brand-brown transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-small-custom text-brand-charcoal/65 leading-relaxed mb-5 flex-grow">
                    {course.desc}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-brand-charcoal/40 font-sans border-t border-brand-brown/10 pt-4 mt-auto">
                    <span>{course.lessons} lessons</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section className="py-20 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-agaseke-motif opacity-[0.03] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-yellow font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">IBIKORESHO</span>
            <h2 className="text-section-title text-brand-white">Free Resources</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          <div className="flex flex-col gap-4">
            {resources.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center justify-between gap-6 bg-brand-white/5 border border-brand-yellow/10 rounded-sm px-6 py-5 hover:bg-brand-white/10 hover:border-brand-yellow/25 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-brand-yellow/10 flex items-center justify-center text-brand-yellow flex-shrink-0">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-sans font-bold text-brand-white text-sm group-hover:text-brand-yellow transition-colors">{res.title}</div>
                    <div className="text-brand-white/40 text-[10px] uppercase tracking-widest font-sans">{res.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-brand-white/40 text-[10px] font-sans">{res.size}</span>
                  <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-charcoal transition-all">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                </div>
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
          <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-4 font-sans">KOMEZA KWIGA</span>
          <h2 className="text-section-title text-brand-green mb-6">Ready to Explore More?</h2>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-10" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/culture"
              className="px-8 py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl border border-brand-yellow/10"
            >
              Culture &amp; Heritage
            </Link>
            <Link
              to="/map"
              className="px-8 py-4 bg-transparent border border-brand-brown/40 hover:border-brand-green text-brand-charcoal hover:text-brand-green text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300"
            >
              Interactive Map
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
