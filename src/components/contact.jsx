import React from "react";

export default function ContributeCulturalContent() {
  const categories = [
    "Stories & Oral Traditions",
    "Visual Art & Crafts",
    "Music & Poetry",
    "Cultural Practices",
  ];

  return (
    <section className="relative w-full min-h-[560px] flex items-center justify-center overflow-hidden border-t border-brand-brown/10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('src/assets/amasunzu.png')",
        }}
      />

      {/* Dark overlay (40% to match premium overlay styling) */}
      <div className="absolute inset-0 bg-brand-charcoal/50" />
      {/* Imigongo subtle border pattern overlay */}
      <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.03] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-4xl mx-auto">
        {/* Heading */}
        <span className="text-brand-yellow font-bold uppercase tracking-[0.25em] text-xs mb-3 font-sans">
          UMURAGE • GET INVOLVED
        </span>
        <h2 className="text-white text-4xl md:text-5xl font-extrabold uppercase tracking-wide mb-5 leading-tight font-serif">
          Contribute Cultural Content
        </h2>

        {/* Subtext */}
        <p className="text-brand-offwhite/90 text-base md:text-lg max-w-2xl mb-8 leading-relaxed font-sans">
          Help us preserve and celebrate Rwanda's rich traditions by sharing
          stories, art, and history from your community.
        </p>

        {/* Category badges */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-2 text-white text-sm font-medium font-sans">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-green/30 border border-brand-yellow/60">
                <svg
                  className="w-3 h-3 text-brand-yellow"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {cat}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 shadow-xl">
          <button className="px-10 py-4 bg-brand-green text-brand-white text-sm font-semibold hover:bg-brand-green/90 transition-all duration-300 rounded-sm whitespace-nowrap tracking-wider border border-brand-yellow/20 hover:scale-[1.02] active:scale-[0.98]">
            Upload Your Cultural Story
          </button>
          <button className="px-10 py-4 bg-brand-white text-brand-charcoal text-sm font-semibold hover:bg-brand-offwhite transition-all duration-300 rounded-sm whitespace-nowrap tracking-wider border border-brand-brown/10 hover:scale-[1.02] active:scale-[0.98]">
            Contact Us for More info
          </button>
        </div>
      </div>
    </section>
  );
}