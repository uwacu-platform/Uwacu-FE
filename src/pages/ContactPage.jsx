import React, { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const reasons = [
  { title: "Share a Story", desc: "Submit oral histories, memories, or traditions" },
  { title: "Partnership Inquiry", desc: "Explore collaboration with UWACU" },
  { title: "Volunteer", desc: "Join our network of cultural ambassadors" },
  { title: "Media & Press", desc: "Press kit, interviews, and documentation requests" },
  { title: "General Inquiry", desc: "Any other questions or ideas" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", reason: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full overflow-hidden bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="src/assets/imitako.png"
            alt="Contact UWACU"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/70 via-brand-charcoal/50 to-brand-charcoal/90" />
          <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.04] pointer-events-none" />
        </div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs mb-5 block font-sans">
            UWACU • TWANDIKIRE
          </span>
          <h1 className="text-hero leading-tight mb-6">Contact Us</h1>
          <div className="w-20 h-[2px] bg-brand-yellow mx-auto mb-8" />
          <p className="text-body-custom text-white/80 max-w-xl mx-auto leading-relaxed">
            Whether you're a storyteller, an artist, a researcher, or simply someone who loves culture — we'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="py-24 lg:py-32 bg-brand-offwhite">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Contact Info */}
            <motion.div
              className="w-full lg:w-2/5"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <span className="text-brand-brown font-bold tracking-[0.22em] uppercase text-xs block mb-4 font-sans">ADERESI ZACU</span>
              <h2 className="font-serif font-bold text-brand-green text-3xl mb-6 leading-tight">Get in Touch</h2>
              <div className="w-16 h-[2px] bg-brand-yellow mb-8" />

              <div className="flex flex-col gap-6 mb-10">
                {[
                  {
                    icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                    label: "Address",
                    value: "KG 563 St, Kigali, Rwanda",
                  },
                  {
                    icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
                    label: "Email",
                    value: "hello@uwacu.rw",
                  },
                  {
                    icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16c.143.312.232.644.19.92z" /></svg>,
                    label: "Phone",
                    value: "+250 788 000 000",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-brand-green/10 flex items-center justify-center text-brand-green flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest font-sans mb-1">{item.label}</div>
                      <div className="font-sans text-brand-charcoal font-medium text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-brand-charcoal rounded-sm p-6">
                <h3 className="font-sans font-bold text-brand-yellow text-xs uppercase tracking-widest mb-4">Office Hours</h3>
                <div className="flex flex-col gap-2 text-sm text-brand-white/70 font-sans">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="text-brand-white">8:00 – 17:00</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="text-brand-white">9:00 – 13:00</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-brand-white/30">Closed</span></div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="w-full lg:flex-1"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-yellow/15 flex items-center justify-center text-brand-yellow mb-6">
                    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-bold text-brand-green text-2xl mb-3">Message Sent!</h3>
                  <p className="text-brand-charcoal/65 text-sm leading-relaxed max-w-sm">
                    Thank you for reaching out to UWACU. Our team will respond within 2 business days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-brand-white border border-brand-brown/10 rounded-sm p-8 shadow-xl flex flex-col gap-6">
                  <h3 className="font-serif font-bold text-brand-green text-2xl">Send a Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-brand-charcoal/50 uppercase tracking-widest font-sans font-bold">Full Name *</label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="border border-brand-brown/20 rounded-sm px-4 py-3 text-sm font-sans focus:outline-none focus:border-brand-green transition-colors bg-brand-offwhite"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-brand-charcoal/50 uppercase tracking-widest font-sans font-bold">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="border border-brand-brown/20 rounded-sm px-4 py-3 text-sm font-sans focus:outline-none focus:border-brand-green transition-colors bg-brand-offwhite"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-brand-charcoal/50 uppercase tracking-widest font-sans font-bold">Reason for Contact</label>
                    <select
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className="border border-brand-brown/20 rounded-sm px-4 py-3 text-sm font-sans focus:outline-none focus:border-brand-green transition-colors bg-brand-offwhite text-brand-charcoal"
                    >
                      <option value="">Select a reason…</option>
                      {reasons.map((r) => (
                        <option key={r.title} value={r.title}>{r.title} — {r.desc}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-brand-charcoal/50 uppercase tracking-widest font-sans font-bold">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Share your thoughts, story, or inquiry…"
                      className="border border-brand-brown/20 rounded-sm px-4 py-3 text-sm font-sans focus:outline-none focus:border-brand-green transition-colors bg-brand-offwhite resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="self-start px-8 py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white text-xs tracking-[0.18em] uppercase rounded-sm font-semibold transition-all duration-300 hover:scale-105 shadow-xl border border-brand-yellow/10"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
