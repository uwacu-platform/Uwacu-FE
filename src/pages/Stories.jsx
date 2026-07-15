import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, canPostStory, loadStories } from "../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const categories = ["All", "Tradition", "Community", "Arts", "Land", "Family", "History"];

const seedStories = [
  {
    id: "1",
    category: "Tradition",
    title: "The Last Inanga Keeper of Musanze",
    excerpt:
      "Ninety-three-year-old Séraphine Mukandori is one of the last master players of the inanga — Rwanda's ancient trough zither. Every evening she plays for the hills, carrying a melody that has not changed in three hundred years.",
    author: "Jean-Pierre Habimana",
    date: "June 2026",
    readTime: "6 min",
    img: "src/assets/ingoma.png",
    featured: true,
  },
  {
    id: "2",
    category: "Community",
    title: "Umuganda: When a Nation Builds Together",
    excerpt:
      "Every last Saturday of the month, Rwanda pauses. Markets close. Roads quiet. Citizens pick up shovels and brushes — and the country builds itself, one community project at a time.",
    author: "Clarisse Uwimana",
    date: "May 2026",
    readTime: "8 min",
    img: "src/assets/uduseke.png",
    featured: false,
  },
  {
    id: "3",
    category: "Arts",
    title: "Imigongo: The Geometry of Memory",
    excerpt:
      "High on the hills of Kirehe, artisans have applied cow dung and earth pigments to walls for five centuries. The result is Imigongo — a visual language of spirals, triangles, and negative space.",
    author: "Amina Uwase",
    date: "April 2026",
    readTime: "5 min",
    img: "src/assets/imigongo.png",
    featured: false,
  },
  {
    id: "4",
    category: "Land",
    title: "The Thousand Hills at Golden Hour",
    excerpt:
      "Rwanda is called the Land of a Thousand Hills for good reason. Every ridge casts a different shadow, shelters a different community, carries a different name loaded with historical meaning.",
    author: "Patrick Habimana",
    date: "March 2026",
    readTime: "4 min",
    img: "src/assets/amasunzu.png",
    featured: false,
  },
  {
    id: "5",
    category: "Tradition",
    title: "Gusaba: The Language of Asking",
    excerpt:
      "A Rwandan wedding begins long before any vow is spoken. Gusaba — the formal marriage negotiation — is a performative art of eloquence, proverb, and communal witness.",
    author: "Rose Mukamana",
    date: "February 2026",
    readTime: "7 min",
    img: "src/assets/imitako.png",
    featured: false,
  },
  {
    id: "6",
    category: "Arts",
    title: "The Intore Warriors Dance Again",
    excerpt:
      "Once performed exclusively for the royal court, Intore dance has found a new stage — global festivals and digital screens. Yet its coded meanings of bravery and loyalty remain unchanged.",
    author: "Jean-Baptiste Nkurunziza",
    date: "January 2026",
    readTime: "6 min",
    img: "src/assets/intore.png",
    featured: false,
  },
];

export default function Stories() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  // Merge seed + user-submitted stories
  const userStories = loadStories();
  const allStories = [...seedStories, ...userStories];

  const filtered =
    activeCategory === "All"
      ? allStories
      : allStories.filter((s) => s.category === activeCategory);

  const featured = seedStories.find((s) => s.featured);

  function handlePostStory() {
    if (!user) {
      navigate("/login?redirect=/stories/post");
      return;
    }
    if (!canPostStory(user)) {
      alert("Only Authors and Instructors can post stories. Please register with an Author role.");
      return;
    }
    navigate("/stories/post");
  }

  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[75vh] flex items-end justify-center bg-brand-charcoal overflow-hidden pb-20">
        <div className="absolute inset-0">
          <img
            src="src/assets/amasunzu.png"
            alt="Rwanda Stories"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/50 via-brand-charcoal/40 to-brand-charcoal/90" />
          <div className="absolute inset-0 bg-agaseke-motif opacity-[0.03] pointer-events-none" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">
            UWACU • INKURU ZACU
          </span>
          <h1 className="text-hero leading-tight mb-6">Stories</h1>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            Every community has its storytellers. Every hill has its tale. Here is where UWACU collects and preserves the voices of Rwanda — past, present, and emerging.
          </p>
          {/* Hero CTA */}
          <button
            onClick={handlePostStory}
            id="hero-post-story"
            className="inline-block px-8 py-4 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal text-xs tracking-[0.18em] uppercase rounded-sm font-bold transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Share Your Story
          </button>
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
                <span className="inline-block bg-brand-yellow text-brand-charcoal text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 font-sans">
                  Featured Story
                </span>
                <span className="text-brand-brown text-xs uppercase tracking-widest font-bold font-sans block mb-3">{featured.category}</span>
                <h2 className="font-serif font-bold text-brand-green text-2xl lg:text-4xl mb-5 leading-tight">{featured.title}</h2>
                <p className="text-body-custom text-brand-charcoal/75 leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-brand-charcoal/50 font-sans mb-8">
                  <span>By {featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime} read</span>
                </div>
                <Link
                  to={`/stories/${featured.id}`}
                  id="featured-read-btn"
                  className="inline-flex items-center gap-2 text-brand-green hover:text-brand-brown text-xs font-bold uppercase tracking-widest font-sans transition-colors group"
                >
                  {user ? "Read Full Story" : "Read Story (Sign in to access full)"}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── ALL STORIES ── */}
      <section className="py-24 lg:py-32 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-3 font-sans">INKURU ZOSE</span>
            <h2 className="text-section-title text-brand-green">All Stories</h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-sm border font-sans transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-green text-brand-white border-brand-green"
                    : "bg-transparent text-brand-charcoal/60 border-brand-brown/25 hover:border-brand-green hover:text-brand-green"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Story Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((story, i) => (
                <motion.article
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -6 }}
                  className="group bg-brand-white rounded-sm border border-brand-brown/10 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 flex flex-col"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={story.img || "src/assets/amasunzu.png"}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent" />
                    <span className="absolute top-4 left-4 bg-brand-yellow text-brand-charcoal text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm font-sans">
                      {story.category}
                    </span>
                    {story.isUserStory && (
                      <span className="absolute top-4 right-4 bg-brand-green text-brand-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm font-sans">
                        Community
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-brand-green text-lg mb-3 leading-snug group-hover:text-brand-brown transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-small-custom text-brand-charcoal/65 leading-relaxed mb-5 flex-grow">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-brand-charcoal/40 font-sans border-t border-brand-brown/10 pt-4 mt-auto mb-4">
                      <span>{story.author}</span>
                      <span>{story.readTime} read</span>
                    </div>
                    <Link
                      to={`/stories/${story.id}`}
                      id={`read-story-${story.id}`}
                      className="flex items-center justify-center gap-2 py-2.5 border border-brand-green/30 hover:border-brand-green hover:bg-brand-green text-brand-green hover:text-brand-white text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300 font-sans group/btn"
                    >
                      {user ? "Read Full Story" : "🔒 Sign In to Read"}
                      <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section
        className="py-24 bg-brand-charcoal relative overflow-hidden"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.04] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">TANGA INKURU YAWE</span>
          <h2 className="text-section-title text-brand-white mb-6">Share Your Story</h2>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/75 mb-10 leading-relaxed">
            Every Rwandan carries a story worth telling. Submit your memories, traditions, and experiences to become part of UWACU's permanent cultural archive.
          </p>
          <button
            onClick={handlePostStory}
            id="cta-post-story"
            className="inline-block px-8 py-4 bg-brand-brown hover:bg-brand-brown/90 text-brand-white text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl border border-brand-yellow/20"
          >
            {user ? (canPostStory(user) ? "Post a Story" : "Register as Author") : "Sign In to Share"}
          </button>
        </div>
      </motion.section>

    </div>
  );
}
