import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UwacuIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="20" width="20" height="10" rx="2" fill="currentColor" />
    <path d="M18 6 L28 16 L8 16 Z" fill="currentColor" />
    <circle cx="18" cy="5" r="3" fill="currentColor" />
    <rect x="10" y="16" width="3" height="4" fill="currentColor" />
    <rect x="23" y="16" width="3" height="4" fill="currentColor" />
  </svg>
);

const exploreItems = [
  { label: "Culture & Heritage", to: "/culture" },
  { label: "Stories", to: "/stories" },
  { label: "Photography", to: "/photography" },
  { label: "Interactive Map", to: "/map" },
];

export default function UwacuNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-green/95 backdrop-blur-xl shadow-xl border-b border-brand-yellow/15"
          : "bg-gradient-to-b from-brand-charcoal/60 to-transparent"
      }`}
    >
      {/* Desktop */}
      <div className="max-w-7xl mx-auto px-10 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-brand-white uppercase tracking-[0.2em] text-sm font-bold hover:text-brand-yellow transition-colors duration-300">
          <span className="text-brand-yellow">
            <UwacuIcon />
          </span>
          UWACU
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">

          <li>
            <Link to="/about" className="text-brand-white/90 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase transition-colors relative group font-sans">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-yellow transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>

          {/* Explore Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-brand-white/90 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase transition-colors bg-transparent border-none cursor-pointer p-0 relative group font-sans font-normal">
              Explore <ChevronDown />
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-yellow transition-all duration-300 group-hover:w-full" />
            </button>

            <div
              className={`absolute top-[calc(100%+18px)] left-1/2 -translate-x-1/2 min-w-[200px] bg-brand-green/98 backdrop-blur-xl border border-brand-yellow/20 rounded-sm py-2 transition-all duration-300 ${
                exploreOpen ? "opacity-100 pointer-events-auto translate-y-0 shadow-2xl" : "opacity-0 pointer-events-none -translate-y-2"
              }`}
            >
              {exploreItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setExploreOpen(false)}
                  className="block px-6 py-2.5 text-[11px] tracking-[0.14em] uppercase text-brand-white/85 hover:text-brand-yellow hover:bg-brand-white/5 transition-all font-sans"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </li>

          <li>
            <Link to="/get-involved" className="text-brand-white/90 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase transition-colors relative group font-sans">
              Get Involved
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-yellow transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>

          <li>
            <Link to="/learn" className="text-brand-white/90 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase transition-colors relative group font-sans">
              Learn
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-yellow transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        </ul>

        {/* Contact Button */}
        <Link to="/contact"
           className="hidden md:inline-block bg-brand-brown hover:bg-brand-brown/90 text-brand-white text-xs tracking-[0.14em] uppercase px-6 py-2.5 rounded-sm font-semibold transition-all duration-200 hover:-translate-y-px shadow-md border border-brand-yellow/10"
        >
          Contact Us
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-[1.5px] bg-brand-white transition-transform duration-300 ${mobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block w-[22px] h-[1.5px] bg-brand-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-[22px] h-[1.5px] bg-brand-white transition-transform duration-300 ${mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-green/98 backdrop-blur-xl border-t border-brand-yellow/15 px-6 pb-7 pt-2 flex flex-col">

          <Link to="/about" onClick={() => setMobileOpen(false)} className="text-brand-white/80 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase py-3.5 border-b border-brand-white/[0.06] transition-colors font-sans">
            About Us
          </Link>

          <button
            onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
            className="flex items-center gap-2 text-brand-white/80 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase py-3.5 border-b border-brand-white/[0.06] bg-transparent border-none cursor-pointer text-left transition-colors font-sans"
          >
            Explore <ChevronDown />
          </button>

          {mobileExploreOpen && (
            <div className="pl-4">
              {exploreItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => { setMobileOpen(false); setMobileExploreOpen(false); }}
                  className="block text-brand-white/65 hover:text-brand-yellow text-[11px] tracking-[0.14em] uppercase py-2.5 border-b border-brand-white/[0.04] transition-colors font-sans"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <Link to="/get-involved" onClick={() => setMobileOpen(false)} className="text-brand-white/80 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase py-3.5 border-b border-brand-white/[0.06] transition-colors font-sans">
            Get Involved
          </Link>

          <Link to="/learn" onClick={() => setMobileOpen(false)} className="text-brand-white/80 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase py-3.5 border-b border-brand-white/[0.06] transition-colors font-sans">
            Learn
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-5 bg-brand-brown text-brand-white text-xs tracking-[0.14em] uppercase py-3.5 text-center rounded-sm hover:bg-brand-brown/90 transition-colors font-sans font-semibold border border-brand-yellow/10"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}