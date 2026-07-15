import { useState } from "react";
import { Link } from "react-router-dom";

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.562 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.498 2.127-4.498 4.324 0 .856.33 1.773.741 2.274a.3.3 0 0 1 .069.283c-.076.312-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const menuLinks = [
  { label: "About Us", href: "/about" },
  { label: "Culture & Heritage", href: "/culture" },
  { label: "Stories", href: "/stories" },
  { label: "Photo Gallery", href: "/photography" },
  { label: "Get Involved", href: "/get-involved" }
];

const exploreLinks = [
  { label: "Intore Dance", href: "/culture" },
  { label: "Traditional Arts", href: "/culture" },
  { label: "Events", href: "/events" },
  { label: "Interactive Map", href: "/map" }
];

const getInvolvedLinks = [
  { label: "Share Your Story", href: "/stories/post" },
  { label: "Contribute Content", href: "/learn/post" },
  { label: "Learn", href: "/learn" },
  { label: "Contact Us", href: "/contact" }
];

const socialLinks = [
  { icon: <PinterestIcon />, label: "Pinterest" },
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <XIcon />, label: "X" },
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <LinkedInIcon />, label: "LinkedIn" },
];

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col">
    <h4 className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-5 font-sans">{title}</h4>
    <ul className="flex flex-col gap-3 p-0 list-none m-0">
      {links.map((item) => (
        <li key={item.label}>
          <Link to={item.href} className="text-brand-offwhite/80 text-sm hover:text-brand-yellow transition-colors duration-200 font-sans">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function UwacuFooter() {
  const [email, setEmail] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="w-full relative overflow-hidden" style={{ backgroundColor: "#313A12" }}>
      {/* Subtle Imigongo pattern backdrop */}
      <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          <FooterColumn title="About" links={menuLinks} />
          <FooterColumn title="Culture" links={exploreLinks} />
          <FooterColumn title="Tourism" links={getInvolvedLinks} />

          {/* Contact & Mailing */}
          <div className="flex flex-col">
            <h4 className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-5 font-sans">
              Contact & Mailing List
            </h4>
            <p className="text-brand-offwhite/85 text-sm mb-3 font-sans">Kigali, Rwanda</p>
            <p className="text-brand-offwhite/85 text-sm mb-3 font-sans">info@uwacu.org</p>
            <p className="text-brand-offwhite/85 text-sm mb-6 font-sans">+250 788 123 456</p>

            <h5 className="text-brand-offwhite text-xs font-bold uppercase tracking-widest mb-3 font-sans">
              Join Our Mailing List
            </h5>
            <form onSubmit={handleSignUp} className="flex rounded-sm overflow-hidden shadow-lg border border-brand-yellow/20">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-sm text-brand-white placeholder-brand-offwhite/40 outline-none border-none bg-brand-white/10"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-brand-brown hover:bg-brand-brown/90 text-brand-white text-xs font-semibold whitespace-nowrap transition-colors duration-200 border-l border-brand-yellow/20"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-brand-yellow/15 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-brand-offwhite/70 text-sm font-sans">© 2026 Uwacu. All rights reserved.</p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-brand-offwhite/30 text-brand-offwhite hover:text-brand-yellow hover:border-brand-yellow transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
