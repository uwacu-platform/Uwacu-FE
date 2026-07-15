import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth, canPostStory, saveStory } from "../context/AuthContext";

const categories = ["Tradition", "Community", "Arts", "Land", "Family", "History"];

export default function PostStoryPage() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    authorBio: "",
  });
  const [preview, setPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.category || !form.content) return;

    const story = {
      id: `story_${Date.now()}`,
      title: form.title,
      category: form.category,
      excerpt: form.excerpt || form.content.slice(0, 160) + "…",
      content: form.content,
      author: user.name,
      authorId: user.id,
      authorBio: form.authorBio,
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      readTime: `${Math.max(1, Math.ceil(form.content.split(" ").length / 200))} min`,
      img: "src/assets/amasunzu.png", // default
      featured: false,
      isUserStory: true,
    };

    saveStory(story);
    refreshUser();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-offwhite flex items-center justify-center pt-20">
        <motion.div
          className="text-center max-w-md px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="font-serif font-bold text-brand-green text-3xl mb-4">Story Published!</h1>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mb-6" />
          <p className="text-brand-charcoal/65 font-sans text-sm leading-relaxed mb-8">
            Your story "<strong>{form.title}</strong>" has been added to the UWACU archive. Thank you for contributing to Rwanda's cultural heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/stories"
              className="px-6 py-3 bg-brand-green text-brand-white text-xs uppercase tracking-widest rounded-sm font-semibold hover:bg-brand-brown transition-colors"
            >
              View All Stories
            </Link>
            <button
              onClick={() => { setSubmitted(false); setForm({ title: "", category: "", excerpt: "", content: "", authorBio: "" }); }}
              className="px-6 py-3 border border-brand-brown/30 text-brand-charcoal text-xs uppercase tracking-widest rounded-sm font-semibold hover:border-brand-green hover:text-brand-green transition-colors"
            >
              Write Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-offwhite pt-24 pb-20">

      {/* Hero Bar */}
      <div className="bg-brand-green py-12 px-6 text-center relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-imigongo-chevron opacity-[0.05]" />
        <div className="relative z-10">
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs block mb-4 font-sans">
            TANGA INKURU YAWE
          </span>
          <h1 className="font-serif font-bold text-brand-white text-4xl lg:text-5xl">Share Your Story</h1>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mt-5" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">

        {/* Tab: Write / Preview */}
        <div className="flex gap-1 mb-8 bg-brand-white border border-brand-brown/15 rounded-sm p-1 w-fit">
          <button
            onClick={() => setPreview(false)}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-all font-sans ${
              !preview ? "bg-brand-green text-brand-white shadow-sm" : "text-brand-charcoal/50 hover:text-brand-green"
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setPreview(true)}
            disabled={!form.title && !form.content}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-all font-sans ${
              preview ? "bg-brand-green text-brand-white shadow-sm" : "text-brand-charcoal/50 hover:text-brand-green"
            } disabled:opacity-30`}
          >
            Preview
          </button>
        </div>

        {preview ? (
          /* ── Preview ── */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-white border border-brand-brown/15 rounded-sm shadow-lg p-8"
          >
            <span className="inline-block bg-brand-yellow text-brand-charcoal text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm mb-4 font-sans">
              {form.category || "Category"}
            </span>
            <h2 className="font-serif font-bold text-brand-green text-3xl mb-4 leading-tight">{form.title || "Your Story Title"}</h2>
            <div className="flex items-center gap-3 text-xs text-brand-charcoal/45 font-sans mb-6 border-b border-brand-brown/10 pb-6">
              <span>By {user.name}</span>
              <span>·</span>
              <span>{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            </div>
            <div className="font-sans text-brand-charcoal/80 text-sm leading-relaxed whitespace-pre-wrap">
              {form.content || "Your story content will appear here…"}
            </div>
            {form.authorBio && (
              <div className="mt-8 pt-6 border-t border-brand-brown/10 bg-brand-offwhite rounded-sm p-4">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-brown font-sans mb-1">About the Author</div>
                <p className="text-xs text-brand-charcoal/65 font-sans leading-relaxed">{form.authorBio}</p>
              </div>
            )}
          </motion.div>
        ) : (
          /* ── Write Form ── */
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="bg-brand-white border border-brand-brown/15 rounded-sm shadow-sm p-6 flex flex-col gap-5">

              {/* Title */}
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Story Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="story-title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Give your story a compelling title…"
                  className="w-full px-4 py-3 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Category <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, category: cat }))}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm border font-sans transition-all duration-200 ${
                        form.category === cat
                          ? "bg-brand-green text-brand-white border-brand-green"
                          : "bg-transparent text-brand-charcoal/60 border-brand-brown/25 hover:border-brand-green hover:text-brand-green"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Short Excerpt */}
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Short Excerpt <span className="text-brand-charcoal/35 normal-case font-normal">(optional — shown in story cards)</span>
                </label>
                <textarea
                  name="excerpt"
                  id="story-excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={2}
                  placeholder="A brief summary of your story (max 200 characters)…"
                  maxLength={200}
                  className="w-full px-4 py-3 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all resize-none"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Full Story <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="content"
                  id="story-content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={14}
                  placeholder="Tell your story here… Use paragraph breaks to structure your narrative."
                  className="w-full px-4 py-3 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all resize-y"
                />
                <div className="text-right text-[10px] text-brand-charcoal/35 font-sans mt-1">
                  {form.content.split(/\s+/).filter(Boolean).length} words · ~{Math.max(1, Math.ceil(form.content.split(/\s+/).filter(Boolean).length / 200))} min read
                </div>
              </div>

              {/* Author Bio */}
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Author Bio <span className="text-brand-charcoal/35 normal-case font-normal">(optional)</span>
                </label>
                <textarea
                  name="authorBio"
                  id="story-authorbio"
                  value={form.authorBio}
                  onChange={handleChange}
                  rows={2}
                  placeholder="A short sentence about yourself…"
                  className="w-full px-4 py-3 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                id="publish-story"
                className="flex-1 py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-sm transition-all duration-300 hover:scale-[1.01] shadow-lg"
              >
                Publish Story
              </button>
              <button
                type="button"
                onClick={() => setPreview(true)}
                disabled={!form.title && !form.content}
                className="flex-1 py-4 border border-brand-brown/30 hover:border-brand-green text-brand-charcoal hover:text-brand-green font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-sm transition-all duration-300 disabled:opacity-40"
              >
                Preview First
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
