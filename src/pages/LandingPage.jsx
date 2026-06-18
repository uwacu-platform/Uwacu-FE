import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import ContributeCulturalContent from "../components/contact";

// CountUp component using React hooks
const CountUp = ({ endVal, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(endVal);
    if (isNaN(end)) {
      setCount(endVal);
      return;
    }

    const duration = 2; // seconds
    const totalFrames = 60 * duration;
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const currentVal = Math.floor(end * (progress * (2 - progress)));
      setCount(currentVal);

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [endVal, isInView]);

  return (
    <span ref={ref} className="tabular-nums font-bold text-5xl lg:text-[64px] text-brand-green font-serif tracking-tight">
      {count}
      {suffix}
    </span>
  );
};

export default function LandingPage() {
  const heroRef = useRef(null);
  const heroMediaRef = useRef(null);
  const [selectedProvince, setSelectedProvince] = useState("kigali");

  // GSAP Parallax Effect for Hero Media
  useEffect(() => {
    if (heroMediaRef.current) {
      gsap.to(heroMediaRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const provinces = {
    kigali: {
      name: "Kigali City (Umujyi wa Kigali)",
      kiny: "Umujyi wa Kigali",
      history: "Founded in 1907 by German resident Dr. Richard Kandt, Kigali was chosen for its central location. It became the capital of Rwanda upon independence in 1962 and has since evolved into one of Africa's cleanest and safest cities.",
      culture: "Kigali is a melting pot of Rwandan culture, hosting major galleries like Inema and Ivuka Arts. It's home to the Kigali Genocide Memorial, a place of historical remembrance that represents the resilience of the nation.",
      attractions: "Kigali Genocide Memorial, Kandt House Museum, Mount Kigali Hiking, Nyamirambo Women's Center, Kimironko Market, local contemporary art galleries."
    },
    northern: {
      name: "Northern Province (Intara y'Amajyaruguru)",
      kiny: "Amajyaruguru",
      history: "Historically part of the northern kingdoms, this region is defined by the majestic Virunga volcanic range. It is the sanctuary where Dian Fossey conducted her pioneering gorilla research.",
      culture: "The culture here is deeply connected to the volcanoes and the forest. It is celebrated during 'Kwita Izina', the annual baby gorilla naming ceremony, rooted in traditional naming rites.",
      attractions: "Volcanoes National Park (mountain gorilla trekking, golden monkey tracking), Twin Lakes (Ruhondo and Burera), Musanze Caves, Buhanga Eco-Park."
    },
    southern: {
      name: "Southern Province (Intara y'Amajyepfo)",
      kiny: "Amajyepfo",
      history: "The cradle of Rwanda's kingdom, royal history, and modern academia. Nyanza served as the seat of the Rwandan kings (Mwami), while Butare (Huye) was the intellectual capital housing the National University.",
      culture: "Famed for classical oral traditions, the King's Palace Museum (Urukari) with its sacred long-horned Inyambo cattle, and traditional songs sung to herd the cattle.",
      attractions: "King's Palace Museum (Nyanza), Ethnographic Museum of Rwanda (Huye), Nyungwe Forest National Park (Eastern Gate), Kamegeri Rock."
    },
    eastern: {
      name: "Eastern Province (Intara y'Iburasirazuba)",
      kiny: "Iburasirazuba",
      history: "Characterized by rolling savanna hills and lakes, this province was traditionally home to pastoralist communities and historical cattle grazing reserves of the royal court.",
      culture: "Origin of the traditional Imigongo art style, created using cow dung and natural clay pigments in geometric patterns. The art was invented by Prince Kakira of the Gisaka kingdom.",
      attractions: "Akagera National Park (savanna game drives to see the Big Five, Lake Ihema boat safaris), Lake Muhazi, Nyakarambi (Imigongo artisan workshops)."
    },
    western: {
      name: "Western Province (Intara y'Iburengerazuba)",
      kiny: "Iburengerazuba",
      history: "A region shaped by the Albertine Rift and Lake Kivu, Western Province was historically a hub for fishing, maritime trade, and tea cultivation on the high volcanic slopes.",
      culture: "Defined by lakeside traditions, including the iconic night fishermen of Lake Kivu who paddle in three-boat formations singing rhythmic folk songs to guide their nets.",
      attractions: "Lake Kivu resort cities (Rubavu, Karongi, Rusizi), Nyungwe Forest National Park (canopy walk, chimpanzee trekking, Gisakura Tea Estate)."
    }
  };

  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">
      {/* SECTION 1 — HERO SECTION */}
      <section
        ref={heroRef}
        className="hero-section relative w-full h-screen flex items-center justify-center bg-black overflow-hidden"
      >
        {/* Background Drone Video Loop & Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <motion.video
            ref={heroMediaRef}
            className="hero-bg-media w-full h-[120%] object-cover opacity-65 scale-105"
            autoPlay
            loop
            muted
            playsInline
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          >
            <source
              src="src/assets/Visit Rwanda - The Land of a Thousand Hills.mp4"
              type="video/mp4"
            />
            {/* Fallback high-res image if video doesn't play */}
            <img
              src="src/assets/kuboha.png"
              alt="Rwanda Hills"
              className="w-full h-full object-cover"
            />
          </motion.video>
          {/* Dark Overlay (40% as requested) */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Subtle Imigongo overlay on top of hero */}
          <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.03] pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-brand-yellow font-bold uppercase tracking-[0.25em] text-sm md:text-base mb-4 block font-sans">
              DISCOVER RWANDA
            </span>
            <h1 className="text-hero leading-tight mb-8">
              A Journey Through Culture, <br className="hidden md:inline" />
              Heritage and Tradition
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <a
              href="#about"
              className="px-8 py-4 bg-brand-green text-brand-white text-sm tracking-[0.18em] uppercase rounded-sm font-semibold hover:bg-brand-green/90 border border-brand-yellow/30 hover:border-brand-yellow/70 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
            >
              Explore Rwanda
            </a>
          </motion.div>
        </div>

        {/* Traditional Geometric Border Accent at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-imigongo-chevron opacity-20" />
      </section>

      {/* SECTION 2 — ABOUT RWANDA */}
      <motion.section
        id="about"
        className="relative py-24 lg:py-32 bg-brand-offwhite border-b border-brand-brown/10 overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-imigongo-diamonds opacity-[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Image - Slides from left */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-sm overflow-hidden shadow-2xl aspect-[4/3] group border-4 border-brand-brown/10"
            >
              <img
                src="src/assets/kuboha.png"
                alt="Beautiful Rwandan Landscape"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 to-transparent" />
            </motion.div>

            {/* Right Story - Slides from right */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs mb-3 font-sans">
                AMATEKA N'IMICO • HISTORY & LEGACY
              </span>
              <h2 className="text-section-title text-brand-green mb-6">
                Land of a Thousand Hills, Cradle of Ancient Wisdom
              </h2>
              <p className="text-body-custom text-brand-charcoal/80 mb-6 leading-relaxed">
                Rwanda's culture is a tapestry woven over centuries of community, honor, and deep connection to the Earth.
                From the misty peaks of the Virunga Mountains to the warm currents of Lake Kivu, our history lives in
                every song, every dance, and the intricate lines of traditional crafts.
              </p>
              <p className="text-body-custom text-brand-charcoal/70 mb-8 leading-relaxed">
                UWACU is dedicated to capturing this living lineage. We invite you to discover the community bonds of
                *Umuganda*, the majesty of our traditional arts, and the storytelling traditions that ground our modern progression.
              </p>
              <div>
                <a
                  href="#heritage"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-brown hover:bg-brand-brown/95 text-brand-white text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 rounded-sm hover:-translate-y-px shadow-md"
                >
                  Explore Our Heritage <span className="text-brand-yellow text-sm">→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3 — CULTURAL HERITAGE CARDS */}
      <motion.section
        id="heritage"
        className="py-24 bg-brand-offwhite relative border-b border-brand-brown/10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-agaseke-motif opacity-[0.015] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              UMURAGE NDANGAMUCO
            </span>
            <h2 className="text-section-title text-brand-green">
              Pillars of Cultural Legacy
            </h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Traditional Dance",
                kiny: "Amatorero",
                desc: "The heartbeat of celebration, recounting tales of ancient battles and communal victories.",
                img: "src/assets/intore.png",
              },
              {
                title: "Arts & Crafts",
                kiny: "Ububoshyi n'Ibihangano",
                desc: "Agaseke baskets and Imigongo geometry representing unity, geometric beauty, and precision.",
                img: "src/assets/imitako.png",
              },
              {
                title: "Traditional Clothing",
                kiny: "Umushanana",
                desc: "Elegant flowing silk and draped sashes representing grace, elegance, and respect for history.",
                img: "src/assets/kuboha.png",
              },
              {
                title: "Language & Identity",
                kiny: "Ikinyarwanda",
                desc: "The sacred tongue that binds all Rwandans, preserving our idioms, poetry, and values.",
                img: "src/assets/iningiri.png",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="flex flex-col bg-brand-white rounded-sm overflow-hidden border border-brand-brown/10 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="h-64 overflow-hidden relative bg-brand-charcoal">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-750"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-brand-yellow text-xs tracking-widest font-bold uppercase font-sans">
                    {card.kiny}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-subheading text-brand-green mb-2">{card.title}</h3>
                    <p className="text-small-custom text-brand-charcoal/70 leading-relaxed mb-4">{card.desc}</p>
                  </div>
                  <a
                    href="#details"
                    className="text-xs font-bold uppercase text-brand-brown hover:text-brand-green tracking-wider inline-flex items-center gap-1 group/link"
                  >
                    Read Details <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4 — INTORE DANCE (IMMERSIVE MAGAZINE SHOWCASE) */}
      <motion.section
        className="relative bg-brand-charcoal text-brand-white py-28 overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Massive Editorial Photo */}
            <div className="w-full lg:w-1/2 relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-brand-white/10 group">
              <img
                src="src/assets/intore.png"
                alt="Intore Warrior Dancer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 to-transparent" />
            </div>

            {/* Immersive Narrative Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-amber-50">
              <span className="text-brand-yellow font-bold tracking-[0.25em] uppercase text-xs mb-3 font-sans">
                INTORE • THE DANCE OF HEROES
              </span>
              <h2 className="text-section-title text-brand-white mb-6">
                Rhythms of the Brave
              </h2>
              <div className="w-16 h-[2px] bg-brand-yellow mb-8" />
              <p className="text-body-custom text-brand-white/80 mb-6 leading-relaxed">
                The Intore dance is a legendary artistic form that dates back to the royal courts of ancient Rwanda.
                Performers, known as the "chosen ones", wear grass wigs (umugara) that mimic the lion's mane, bells around
                their ankles (amayugi), and carry wooden shields (ingabo) and spears (umuheto).
              </p>
              <p className="text-body-custom text-brand-white/70 mb-8 leading-relaxed">
                Historically, the dance was performed to celebrate victories, welcome royal guests, and train warriors.
                Today, the high leaps, precise steps, and rhythmic coordination represent the strength, dignity, and unity
                of the Rwandan people.
              </p>
              <blockquote className="border-l-4 border-brand-yellow pl-6 italic text-brand-white/95 text-lg font-serif mb-8 leading-relaxed">
                "The drum does not speak out of turn. Every beat, every jump, is a testament to the warriors who built the foundations of our country."
              </blockquote>
              <div>
                <a
                  href="#gallery"
                  className="px-8 py-3.5 bg-brand-green text-brand-white text-xs tracking-[0.18em] uppercase rounded-sm font-semibold hover:bg-brand-green/90 transition-all duration-300 border border-brand-yellow/20"
                >
                  View Performance Gallery
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5 — TRADITIONAL ARTS (ALTERNATE LAYOUT) */}
      <motion.section
        className="py-24 lg:py-32 bg-brand-offwhite relative border-b border-brand-brown/10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-traditional-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            {/* Image Right */}
            <div className="w-full lg:w-1/2 aspect-[4/3] rounded-sm overflow-hidden shadow-xl border-4 border-brand-brown/10 group">
              <img
                src="src/assets/imitako.png"
                alt="Rwandan Weaving and Arts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Text Left */}
            <div className="w-full lg:w-1/2">
              <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs mb-3 font-sans">
                IBIHANGANO N'UBUBOSHYI • ARTISANAL WEAVING
              </span>
              <h2 className="text-section-title text-brand-green mb-6">
                Woven Integrity: The Agaseke and Imigongo
              </h2>
              <p className="text-body-custom text-brand-charcoal/80 mb-6 leading-relaxed">
                Rwandan traditional design is globally recognized for its geometric precision. The **Agaseke**—a pointed-lid
                basket woven from sisal fibers and sweet grass—is a symbol of peace, purity, and sisterhood. Historically,
                these baskets were used to present wedding gifts and store dry foodstuffs, embodying community values of giving.
              </p>
              <p className="text-body-custom text-brand-charcoal/70 mb-8 leading-relaxed">
                Complementing this is **Imigongo**, a unique geometric painting style originating in Eastern Rwanda. Created
                using cow dung mixed with ash and natural minerals, these abstract black, white, and red motifs were
                traditionally used to decorate royal dwellings and are now celebrated globally as high-concept design.
              </p>
              <div>
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-brand-green/95 text-brand-white text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 rounded-sm hover:-translate-y-px shadow-md"
                >
                  Explore Traditional Crafts
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6 — RWANDA STATISTICS (COUNT-UP) */}
      <motion.section
        className="py-24 bg-brand-white relative border-b border-brand-brown/10 overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-agaseke-motif opacity-[0.015] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              IMIBARE Y'INGENZI
            </span>
            <h2 className="text-section-title text-brand-green">
              Rwanda in Numbers
            </h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <CountUp endVal="13" suffix="M+" />
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-brown font-bold mb-1">
                Population
              </span>
              <span className="text-small-custom text-brand-charcoal/60">
                A young, vibrant society
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <CountUp endVal="1000" suffix="+" />
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-brown font-bold mb-1">
                Hills
              </span>
              <span className="text-small-custom text-brand-charcoal/60">
                Lush topographic waves
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <CountUp endVal="3" suffix="" />
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-brown font-bold mb-1">
                Official Languages
              </span>
              <span className="text-small-custom text-brand-charcoal/60">
                Kinyarwanda, English, French
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <CountUp endVal="5" suffix="" />
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-brown font-bold mb-1">
                Administrative Regions
              </span>
              <span className="text-small-custom text-brand-charcoal/60">
                4 Provinces and Kigali City
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 7 — INTERACTIVE MAP */}
      <motion.section
        className="py-24 bg-brand-offwhite relative border-b border-brand-brown/10 overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              IKARITA Y'IGIHUGU • INTERACTIVE MAP
            </span>
            <h2 className="text-section-title text-brand-green">
              Explore Our Provinces
            </h2>
            <p className="text-body-custom text-brand-charcoal/70 mt-3">
              Hover or click on the map provinces to reveal local history, unique cultural traits, and must-visit attractions.
            </p>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* SVG Interactive Map Column */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[450px]">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-auto drop-shadow-2xl border border-brand-brown/10 p-4 rounded-sm bg-brand-white/80"
                >
                  <g className="transition-all duration-300">
                    {/* Western Province */}
                    <path
                      d="M 60,60 L 130,50 L 140,120 L 120,160 L 110,240 L 70,220 L 50,130 Z"
                      fill={selectedProvince === "western" ? "#20603D" : "#E2E2D8"}
                      stroke={selectedProvince === "western" ? "#FAD201" : "#FAFAF7"}
                      strokeWidth={selectedProvince === "western" ? "2" : "1.5"}
                      className="cursor-pointer transition-all duration-350 hover:fill-brand-green/90"
                      onMouseEnter={() => setSelectedProvince("western")}
                      onClick={() => setSelectedProvince("western")}
                    />

                    {/* Northern Province */}
                    <path
                      d="M 130,50 L 260,40 L 240,100 L 175,105 L 140,120 Z"
                      fill={selectedProvince === "northern" ? "#20603D" : "#D4D4C9"}
                      stroke={selectedProvince === "northern" ? "#FAD201" : "#FAFAF7"}
                      strokeWidth={selectedProvince === "northern" ? "2" : "1.5"}
                      className="cursor-pointer transition-all duration-350 hover:fill-brand-green/90"
                      onMouseEnter={() => setSelectedProvince("northern")}
                      onClick={() => setSelectedProvince("northern")}
                    />

                    {/* Kigali City */}
                    <path
                      d="M 175,105 L 240,100 L 250,140 L 175,150 Z"
                      fill={selectedProvince === "kigali" ? "#20603D" : "#A6A696"}
                      stroke={selectedProvince === "kigali" ? "#FAD201" : "#FAFAF7"}
                      strokeWidth={selectedProvince === "kigali" ? "2.5" : "1.5"}
                      className="cursor-pointer transition-all duration-350 hover:fill-brand-green/90"
                      onMouseEnter={() => setSelectedProvince("kigali")}
                      onClick={() => setSelectedProvince("kigali")}
                    />

                    {/* Southern Province */}
                    <path
                      d="M 140,120 L 175,105 L 175,150 L 250,140 L 210,240 L 110,240 L 120,160 Z"
                      fill={selectedProvince === "southern" ? "#20603D" : "#E2E2D8"}
                      stroke={selectedProvince === "southern" ? "#FAD201" : "#FAFAF7"}
                      strokeWidth={selectedProvince === "southern" ? "2" : "1.5"}
                      className="cursor-pointer transition-all duration-350 hover:fill-brand-green/90"
                      onMouseEnter={() => setSelectedProvince("southern")}
                      onClick={() => setSelectedProvince("southern")}
                    />

                    {/* Eastern Province */}
                    <path
                      d="M 260,40 L 350,60 L 340,230 L 210,240 L 250,140 L 240,100 Z"
                      fill={selectedProvince === "eastern" ? "#20603D" : "#D4D4C9"}
                      stroke={selectedProvince === "eastern" ? "#FAD201" : "#FAFAF7"}
                      strokeWidth={selectedProvince === "eastern" ? "2" : "1.5"}
                      className="cursor-pointer transition-all duration-350 hover:fill-brand-green/90"
                      onMouseEnter={() => setSelectedProvince("eastern")}
                      onClick={() => setSelectedProvince("eastern")}
                    />
                  </g>

                  {/* SVG Labels */}
                  <g pointerEvents="none" className="font-sans font-semibold fill-brand-charcoal text-[9px] uppercase tracking-wider">
                    <text x="75" y="140" fill={selectedProvince === "western" ? "#FAFAF7" : "#1A1A1A"}>West</text>
                    <text x="180" y="70" fill={selectedProvince === "northern" ? "#FAFAF7" : "#1A1A1A"}>North</text>
                    <text x="190" y="130" fill={selectedProvince === "kigali" ? "#FAFAF7" : "#1A1A1A"} fontSize="8px">Kigali</text>
                    <text x="145" y="190" fill={selectedProvince === "southern" ? "#FAFAF7" : "#1A1A1A"}>South</text>
                    <text x="270" y="150" fill={selectedProvince === "eastern" ? "#FAFAF7" : "#1A1A1A"}>East</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Information Panel Column */}
            <div className="lg:col-span-6 bg-brand-white p-8 lg:p-10 rounded-sm border border-brand-brown/10 shadow-2xl relative min-h-[380px] flex flex-col justify-between overflow-hidden">
              {/* Subtle Pattern in info card */}
              <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.015] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProvince}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="z-10"
                >
                  <span className="text-brand-brown font-bold tracking-[0.2em] text-xs uppercase block mb-1 font-sans">
                    {provinces[selectedProvince].kiny}
                  </span>
                  <h3 className="text-subheading text-brand-green mb-6 pb-3 border-b border-brand-brown/10">
                    {provinces[selectedProvince].name}
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-brand-brown mb-1.5 font-sans">History</h4>
                    <p className="text-small-custom text-brand-charcoal/80 leading-relaxed">
                      {provinces[selectedProvince].history}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-brand-brown mb-1.5 font-sans">Culture</h4>
                    <p className="text-small-custom text-brand-charcoal/80 leading-relaxed">
                      {provinces[selectedProvince].culture}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-brand-brown mb-1.5 font-sans">Key Attractions</h4>
                    <p className="text-small-custom text-brand-green font-semibold">
                      {provinces[selectedProvince].attractions}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 8 — TOURISM HIGHLIGHTS */}
      <motion.section
        className="py-24 bg-brand-white relative border-b border-brand-brown/10 overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-agaseke-motif opacity-[0.015] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              UBUKERARUGENDO • EXPLORATION
            </span>
            <h2 className="text-section-title text-brand-green">
              Tourism Highlights
            </h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "Volcanoes National Park",
                desc: "Nestled in the northwest, Volcanoes National Park protects the steep slopes of the magnificent Virunga mountain range. It is home to the rare and majestic mountain gorillas, offering breathtaking encounters in wild, ancient rainforests.",
                img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Nyungwe Forest National Park",
                desc: "One of Africa's oldest montane rainforests, Nyungwe is a rich biodiversity hotspot. Home to 13 primate species, including chimpanzees, it offers canopy walkways suspended 70 meters above the forest floor and magnificent waterfalls.",
                img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Lake Kivu",
                desc: "Part of Africa’s Great Lakes, Lake Kivu is a vast inland sea enclosed by terraced green hills. Known for its resort towns, emerald waters, and the iconic night fishermen whose songs echo across the water at dusk.",
                img: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Akagera National Park",
                desc: "Rwanda's eastern border transforms into sprawling savanna plains, woodlands, and swamps. Akagera is a conservation success story hosting the Big Five, offering a classic safari experience alongside beautiful lakes.",
                img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
              },
            ].map((destination, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row bg-brand-offwhite rounded-sm overflow-hidden border border-brand-brown/10 shadow-lg cursor-pointer group"
              >
                <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative bg-brand-charcoal">
                  <img
                    src={destination.img}
                    alt={destination.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-subheading text-brand-green mb-3">{destination.title}</h3>
                    <p className="text-small-custom text-brand-charcoal/70 leading-relaxed mb-4">{destination.desc}</p>
                  </div>
                  <span className="text-xs font-bold uppercase text-brand-brown inline-flex items-center gap-1 group-hover:text-brand-green">
                    Explore Park Details <span>→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 9 — GALLERY (MASONRY LAYOUT) */}
      <motion.section
        id="gallery"
        className="py-24 bg-brand-offwhite relative border-b border-brand-brown/10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              AMAFOTO • PHOTO GALLERY
            </span>
            <h2 className="text-section-title text-brand-green">
              Immersive Photography
            </h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              {
                url: "src/assets/iningiri.png",
                aspect: "aspect-[4/3]"
              },
              {
                url: "src/assets/kuboha.png",
                aspect: "aspect-[1/1]"
              },
              {
                url: "src/assets/infunguro.png",
                aspect: "aspect-[3/4]"
              },
              {
                url: "src/assets/icyokurya.png",
                aspect: "aspect-[16/9]"
              },
              {
                url: "src/assets/imitako.png",
                aspect: "aspect-[4/5]"
              },
              {
                url: "src/assets/imigongo.png",
                aspect: "aspect-[3/2]"
              }
              
            ].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className={`break-inside-avoid relative rounded-sm overflow-hidden border border-brand-brown/10 shadow-lg group bg-brand-charcoal ${img.aspect}`}
              >
                <img
                  src={img.url}
                  alt={`Rwanda Gallery Grid Image ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-brand-white/90 text-brand-green text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm shadow-md">
                    View Image
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 10 — TESTIMONIALS */}
      <motion.section
        className="py-28 bg-brand-white relative border-b border-brand-brown/10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-imigongo-diamonds opacity-[0.015] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-brown font-bold tracking-[0.2em] uppercase text-xs block mb-3 font-sans">
              UBUHAMYA • TESTIMONIALS
            </span>
            <h2 className="text-section-title text-brand-green">
              Voices of the Land
            </h2>
            <div className="w-20 h-[2px] bg-brand-yellow mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                quote: "Preserving our weaving traditions is not just about making baskets; it is about carrying our community's soul into the future. Each thread tells our descendants where we came from.",
                author: "Anathalie Mukakarera",
                role: "Agaseke Master Weaver, Huye"
              },
              {
                quote: "To dance the Intore is to feel the heartbeat of our ancestors beneath your feet. It requires absolute focus, strength, and respect. When we leap, we carry the stories of a thousand generations.",
                author: "Jean-Paul Uwase",
                role: "Traditional Dancer, Musanze"
              },
              {
                quote: "Visiting Akagera and Volcanoes National Park opened my eyes to Rwanda's conservation triumph. The deep respect between the locals, the land, and the wild mountain gorillas is truly inspiring.",
                author: "Sarah Jenkins",
                role: "Traveler & Anthropologist"
              }
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-brand-offwhite p-10 rounded-sm border border-brand-brown/15 shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 relative"
              >
                <span className="text-brand-yellow text-6xl font-serif absolute top-4 left-4 opacity-20 pointer-events-none">“</span>
                <p className="text-body-custom text-brand-charcoal/80 italic leading-relaxed mb-8 relative z-10">
                  {t.quote}
                </p>
                <div>
                  <h4 className="font-bold text-brand-green tracking-wide text-sm font-sans mb-1">{t.author}</h4>
                  <span className="text-xs uppercase tracking-widest text-brand-brown font-semibold">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 11 — FOOTER (Integrated / Handled via separate component but updated styling here) */}
      <ContributeCulturalContent />
    </div>
  );
}
