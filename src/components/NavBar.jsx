import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UwacuIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
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

const roleColors = {
  reader: "bg-brand-brown/20 text-brand-brown",
  author: "bg-brand-yellow/20 text-brand-charcoal",
  student: "bg-brand-green/20 text-brand-green",
  instructor: "bg-brand-yellow text-brand-charcoal",
};

export default function UwacuNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    navigate("/");
  }

  // User initials for avatar
  const initials = user
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "";

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
          <span className="text-brand-yellow"><UwacuIcon /></span>
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

        {/* Right CTA — Auth Aware */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            /* ── User Menu ── */
            <div className="relative" ref={userMenuRef}>
              <button
                id="user-menu-btn"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-brand-white/10 hover:bg-brand-white/20 border border-brand-white/15 hover:border-brand-yellow/30 transition-all duration-200"
              >
                {/* Avatar */}
                <span className="w-7 h-7 rounded-full bg-brand-yellow text-brand-charcoal text-[11px] font-bold font-sans flex items-center justify-center flex-shrink-0">
                  {initials}
                </span>
                <span className="text-brand-white text-xs font-sans font-medium max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </span>
                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm ${roleColors[user.role] || "bg-brand-white/20 text-brand-white"}`}>
                  {user.role}
                </span>
                <ChevronDown />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute top-[calc(100%+12px)] right-0 min-w-[200px] bg-brand-green/98 backdrop-blur-xl border border-brand-yellow/20 rounded-sm py-2 shadow-2xl">
                  <div className="px-5 py-3 border-b border-brand-white/10">
                    <div className="text-brand-white font-sans font-bold text-sm truncate">{user.name}</div>
                    <div className="text-brand-white/45 text-[10px] font-sans truncate">{user.email}</div>
                  </div>
                  {(user.role === "author" || user.role === "instructor") && (
                    <Link
                      to="/stories/post"
                      onClick={() => setUserMenuOpen(false)}
                      id="nav-post-story"
                      className="flex items-center gap-2.5 px-5 py-2.5 text-[11px] tracking-[0.1em] uppercase text-brand-white/85 hover:text-brand-yellow hover:bg-brand-white/5 transition-all font-sans"
                    >
                      <span>✍️</span> Post a Story
                    </Link>
                  )}
                  {user.role === "instructor" && (
                    <Link
                      to="/learn/post"
                      onClick={() => setUserMenuOpen(false)}
                      id="nav-post-course"
                      className="flex items-center gap-2.5 px-5 py-2.5 text-[11px] tracking-[0.1em] uppercase text-brand-white/85 hover:text-brand-yellow hover:bg-brand-white/5 transition-all font-sans"
                    >
                      <span>🏫</span> Post a Course
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    id="nav-logout"
                    className="w-full text-left flex items-center gap-2.5 px-5 py-2.5 text-[11px] tracking-[0.1em] uppercase text-red-300 hover:text-red-200 hover:bg-brand-white/5 transition-all font-sans"
                  >
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Guest: Login + Register ── */
            <>
              <Link
                to="/login"
                id="nav-login"
                className="text-brand-white/85 hover:text-brand-yellow text-xs tracking-[0.14em] uppercase font-sans font-semibold transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                id="nav-register"
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal text-xs tracking-[0.14em] uppercase px-5 py-2.5 rounded-sm font-bold transition-all duration-200 hover:-translate-y-px shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>

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

      {/* ── Mobile Menu ── */}
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

          {user ? (
            <>
              <div className="py-3.5 border-b border-brand-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-yellow text-brand-charcoal text-xs font-bold font-sans flex items-center justify-center flex-shrink-0">
                    {initials}
                  </span>
                  <div>
                    <div className="text-brand-white text-xs font-sans font-bold">{user.name}</div>
                    <div className="text-brand-white/45 text-[10px] font-sans">{user.role}</div>
                  </div>
                </div>
              </div>
              {(user.role === "author" || user.role === "instructor") && (
                <Link to="/stories/post" onClick={() => setMobileOpen(false)} className="text-brand-white/80 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase py-3.5 border-b border-brand-white/[0.06] transition-colors font-sans">
                  ✍️ Post a Story
                </Link>
              )}
              {user.role === "instructor" && (
                <Link to="/learn/post" onClick={() => setMobileOpen(false)} className="text-brand-white/80 hover:text-brand-yellow text-xs tracking-[0.16em] uppercase py-3.5 border-b border-brand-white/[0.06] transition-colors font-sans">
                  🏫 Post a Course
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="mt-4 text-red-300 text-xs tracking-[0.14em] uppercase py-3 text-left font-sans font-semibold"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-5">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="border border-brand-white/30 text-brand-white text-xs tracking-[0.14em] uppercase py-3 text-center rounded-sm hover:bg-brand-white/10 transition-colors font-sans font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="bg-brand-yellow text-brand-charcoal text-xs tracking-[0.14em] uppercase py-3.5 text-center rounded-sm hover:bg-brand-yellow/90 transition-colors font-sans font-bold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}