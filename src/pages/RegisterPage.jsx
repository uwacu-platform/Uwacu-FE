import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const roles = [
  {
    id: "reader",
    label: "Reader",
    icon: "📖",
    desc: "Explore stories and cultural content",
  },
  {
    id: "author",
    label: "Author",
    icon: "✍️",
    desc: "Read and post your own stories",
  },
  {
    id: "student",
    label: "Student",
    icon: "🎓",
    desc: "Enroll in courses and learn",
  },
  {
    id: "instructor",
    label: "Instructor",
    icon: "🏫",
    desc: "Post courses and share knowledge",
  },
];

const UwacuIcon = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
    <rect x="8" y="20" width="20" height="10" rx="2" fill="currentColor" />
    <path d="M18 6 L28 16 L8 16 Z" fill="currentColor" />
    <circle cx="18" cy="5" r="3" fill="currentColor" />
    <rect x="10" y="16" width="3" height="4" fill="currentColor" />
    <rect x="23" y="16" width="3" height="4" fill="currentColor" />
  </svg>
);

export default function RegisterPage() {
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [localError, setLocalError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    clearError();
    setLocalError("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function selectRole(id) {
    clearError();
    setLocalError("");
    setForm((f) => ({ ...f, role: id }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!form.role) return "Please select a role.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setLocalError(err); return; }
    setSubmitting(true);
    const ok = register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    });
    setSubmitting(false);
    if (ok) navigate("/", { replace: true });
  }

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-brand-charcoal flex">

      {/* ── LEFT PANEL ── */}
      <motion.div
        className="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col items-center justify-center p-16"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="absolute inset-0 bg-brand-green/90" />
        <div className="absolute inset-0 bg-agaseke-motif opacity-[0.05] pointer-events-none" />
        <div className="absolute top-[-100px] right-[-80px] w-[300px] h-[300px] rounded-full bg-brand-yellow/10 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[240px] h-[240px] rounded-full bg-brand-brown/20 blur-3xl" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="text-brand-yellow mb-8 flex justify-center">
            <UwacuIcon />
          </div>
          <h2 className="font-serif font-bold text-brand-white text-3xl mb-5 leading-tight">
            Join the UWACU community
          </h2>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mb-6" />
          <p className="text-brand-white/70 font-sans text-sm leading-relaxed">
            Preserve and share Rwanda's cultural heritage. Every voice matters.
          </p>
        </div>
      </motion.div>

      {/* ── RIGHT PANEL — FORM ── */}
      <motion.div
        className="w-full lg:w-7/12 flex items-start justify-center px-6 py-12 bg-brand-offwhite overflow-y-auto"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="w-full max-w-lg py-4">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 text-brand-green">
            <span className="text-brand-yellow"><UwacuIcon /></span>
            <span className="font-bold uppercase tracking-widest text-sm">UWACU</span>
          </div>

          <h1 className="font-serif font-bold text-brand-green text-3xl mb-2">Create Account</h1>
          <p className="text-brand-charcoal/55 font-sans text-sm mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-brown font-semibold hover:text-brand-green transition-colors">
              Sign in here
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Full Name */}
            <div>
              <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="reg-name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Amina Uwase"
                className="w-full px-4 py-3.5 bg-brand-white border border-brand-brown/25 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="reg-email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 bg-brand-white border border-brand-brown/25 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all"
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="reg-password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Min 6 characters"
                    className="w-full px-4 py-3.5 bg-brand-white border border-brand-brown/25 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-green transition-colors"
                  >
                    {showPass ? (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Confirm Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  name="confirm"
                  id="reg-confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                  placeholder="Repeat password"
                  className="w-full px-4 py-3.5 bg-brand-white border border-brand-brown/25 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all"
                />
              </div>
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-3 font-sans">
                I am joining as…
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    id={`role-${r.id}`}
                    onClick={() => selectRole(r.id)}
                    className={`flex flex-col items-start gap-1.5 p-4 border rounded-sm text-left transition-all duration-200 ${
                      form.role === r.id
                        ? "border-brand-green bg-brand-green/5 shadow-md ring-2 ring-brand-green/20"
                        : "border-brand-brown/20 bg-brand-white hover:border-brand-green/40 hover:bg-brand-green/[0.02]"
                    }`}
                  >
                    <span className="text-xl">{r.icon}</span>
                    <span
                      className={`font-sans font-bold text-sm ${
                        form.role === r.id ? "text-brand-green" : "text-brand-charcoal"
                      }`}
                    >
                      {r.label}
                    </span>
                    <span className="text-brand-charcoal/50 text-[11px] font-sans leading-snug">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {displayError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm font-sans"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {displayError}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="register-submit"
              disabled={submitting}
              className="w-full py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-sm transition-all duration-300 hover:scale-[1.01] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {submitting ? "Creating account…" : "Create Account"}
            </button>

          </form>

          <p className="text-center text-brand-charcoal/35 text-xs font-sans mt-6 leading-relaxed">
            By registering you agree to UWACU's Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
