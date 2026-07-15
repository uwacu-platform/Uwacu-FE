import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const UwacuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
    <rect x="8" y="20" width="20" height="10" rx="2" fill="currentColor" />
    <path d="M18 6 L28 16 L8 16 Z" fill="currentColor" />
    <circle cx="18" cy="5" r="3" fill="currentColor" />
    <rect x="10" y="16" width="3" height="4" fill="currentColor" />
    <rect x="23" y="16" width="3" height="4" fill="currentColor" />
  </svg>
);

export default function LoginPage() {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    clearError();
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const ok = login({ email: form.email, password: form.password });
    setSubmitting(false);
    if (ok) navigate(redirect, { replace: true });
  }

  return (
    <div className="min-h-screen bg-brand-charcoal flex">

      {/* ── LEFT PANEL ── */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-16"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="absolute inset-0 bg-brand-green/90" />
        <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.06] pointer-events-none" />
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full bg-brand-yellow/10 blur-3xl" />
        <div className="absolute bottom-[-80px] left-[-60px] w-[260px] h-[260px] rounded-full bg-brand-brown/20 blur-3xl" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="text-brand-yellow mb-8 flex justify-center">
            <UwacuIcon />
          </div>
          <h2 className="font-serif font-bold text-brand-white text-4xl mb-5 leading-tight">
            Welcome back to UWACU
          </h2>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mb-6" />
          <p className="text-brand-white/70 font-sans text-sm leading-relaxed">
            The living archive of Rwandan culture — stories, traditions, and knowledge, preserved for generations.
          </p>
          <div className="mt-12 flex flex-col gap-4 text-left">
            {[
              { icon: "📖", label: "Read full cultural stories" },
              { icon: "🎓", label: "Enroll in learning courses" },
              { icon: "✍️", label: "Share your own stories" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-brand-white/80 font-sans text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── RIGHT PANEL — FORM ── */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-brand-offwhite"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10 text-brand-green">
            <span className="text-brand-yellow"><UwacuIcon /></span>
            <span className="font-bold uppercase tracking-widest text-sm">UWACU</span>
          </div>

          <h1 className="font-serif font-bold text-brand-green text-3xl mb-2">Sign In</h1>
          <p className="text-brand-charcoal/55 font-sans text-sm mb-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-brand-brown font-semibold hover:text-brand-green transition-colors">
              Register here
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="login-email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 bg-brand-white border border-brand-brown/25 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="login-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-brand-white border border-brand-brown/25 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-green transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm font-sans"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="login-submit"
              disabled={submitting}
              className="w-full py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-sm transition-all duration-300 hover:scale-[1.01] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {submitting ? "Signing in…" : "Sign In"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-brand-brown/15" />
            <span className="text-brand-charcoal/35 text-xs font-sans">or</span>
            <div className="flex-1 h-px bg-brand-brown/15" />
          </div>

          <Link
            to="/register"
            id="goto-register"
            className="block w-full py-3.5 border border-brand-brown/30 hover:border-brand-green text-brand-charcoal hover:text-brand-green text-center font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-sm transition-all duration-300"
          >
            Create New Account
          </Link>

          <p className="text-center text-brand-charcoal/35 text-xs font-sans mt-8 leading-relaxed">
            By signing in you agree to UWACU's{" "}
            <span className="underline cursor-pointer hover:text-brand-brown transition-colors">Terms of Service</span>{" "}
            and{" "}
            <span className="underline cursor-pointer hover:text-brand-brown transition-colors">Privacy Policy</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
