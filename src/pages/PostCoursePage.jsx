import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { createCourse } from "../services/courseService.js";

const tags = ["Language", "Visual Arts", "History", "Ceremony", "Music", "Craft", "Dance", "Literature"];
const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

export default function PostCoursePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    tag: "",
    level: "",
    duration: "",
    description: "",
    price: "0",
    lessons: ["", "", ""],
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleLessonChange(i, value) {
    setForm((f) => {
      const lessons = [...f.lessons];
      lessons[i] = value;
      return { ...f, lessons };
    });
  }

  function addLesson() {
    setForm((f) => ({ ...f, lessons: [...f.lessons, ""] }));
  }

  function removeLesson(i) {
    setForm((f) => {
      const lessons = f.lessons.filter((_, idx) => idx !== i);
      return { ...f, lessons };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError(null);
    setSubmitting(true);
    try {
      await createCourse({
        title: form.title,
        description: form.description,
        price: form.price || "0",
        thumbnail: thumbnail || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setApiError(err.message || "Failed to publish course. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
          <div className="text-6xl mb-6">🎓</div>
          <h1 className="font-serif font-bold text-brand-green text-3xl mb-4">Course Published!</h1>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mb-6" />
          <p className="text-brand-charcoal/65 font-sans text-sm leading-relaxed mb-8">
            "<strong>{form.title}</strong>" is now available for students to enroll.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/learn"
              className="px-6 py-3 bg-brand-green text-brand-white text-xs uppercase tracking-widest rounded-sm font-semibold hover:bg-brand-brown transition-colors"
            >
              View All Courses
            </Link>
            <button
              onClick={() => { setSubmitted(false); setForm({ title: "", tag: "", level: "", duration: "", description: "", lessons: ["", "", ""] }); }}
              className="px-6 py-3 border border-brand-brown/30 text-brand-charcoal text-xs uppercase tracking-widest rounded-sm font-semibold hover:border-brand-green hover:text-brand-green transition-colors"
            >
              Add Another
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
        <div className="absolute inset-0 bg-imigongo-diamonds opacity-[0.05]" />
        <div className="relative z-10">
          <span className="text-brand-yellow font-bold uppercase tracking-[0.28em] text-xs block mb-4 font-sans">
            INSTRUCTOR PORTAL
          </span>
          <h1 className="font-serif font-bold text-brand-white text-4xl lg:text-5xl">Post a Course</h1>
          <div className="w-16 h-[2px] bg-brand-yellow mx-auto mt-5" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="bg-brand-white border border-brand-brown/15 rounded-sm shadow-sm p-6 flex flex-col gap-5">

            {/* Course Title */}
            <div>
              <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                Course Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="course-title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Advanced Imigongo Pattern Design"
                className="w-full px-4 py-3 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all"
              />
            </div>

            {/* Tag + Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Category Tag <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, tag: t }))}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm border font-sans transition-all duration-200 ${
                        form.tag === t
                          ? "bg-brand-green text-brand-white border-brand-green"
                          : "bg-transparent text-brand-charcoal/60 border-brand-brown/25 hover:border-brand-green hover:text-brand-green"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Level <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {levels.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, level: l }))}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm border font-sans transition-all duration-200 ${
                        form.level === l
                          ? "bg-brand-brown text-brand-white border-brand-brown"
                          : "bg-transparent text-brand-charcoal/60 border-brand-brown/25 hover:border-brand-brown hover:text-brand-brown"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                id="course-duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 4 weeks"
                className="w-full px-4 py-3 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                Course Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                id="course-description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe what students will learn in this course…"
                className="w-full px-4 py-3 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all resize-none"
              />
            </div>
          </div>

          {/* Lessons */}
          <div className="bg-brand-white border border-brand-brown/15 rounded-sm shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-brand-charcoal text-xs font-bold uppercase tracking-widest font-sans">
                Lesson Titles
              </label>
              <button
                type="button"
                onClick={addLesson}
                className="text-[10px] font-bold uppercase tracking-widest text-brand-green hover:text-brand-brown font-sans transition-colors flex items-center gap-1"
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Lesson
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {form.lessons.map((lesson, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold font-sans flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={lesson}
                    id={`lesson-${i}`}
                    onChange={(e) => handleLessonChange(i, e.target.value)}
                    placeholder={`Lesson ${i + 1} title…`}
                    className="flex-1 px-3 py-2.5 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green transition-all"
                  />
                  {form.lessons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLesson(i)}
                      className="text-brand-charcoal/30 hover:text-red-400 transition-colors"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price + Thumbnail */}
          <div className="bg-brand-white border border-brand-brown/15 rounded-sm shadow-sm p-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Price (RWF)
                </label>
                <input
                  type="number"
                  name="price"
                  id="course-price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  placeholder="0 for free"
                  className="w-full px-4 py-3 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all"
                />
              </div>
              {/* Thumbnail */}
              <div>
                <label className="block text-brand-charcoal text-xs font-bold uppercase tracking-widest mb-2 font-sans">
                  Thumbnail Image
                </label>
                <input
                  type="file"
                  id="course-thumbnail"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0] || null)}
                  className="w-full px-4 py-2.5 bg-brand-offwhite border border-brand-brown/20 rounded-sm font-sans text-sm text-brand-charcoal file:mr-3 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-brand-green file:text-brand-white hover:file:bg-brand-brown transition-all"
                />
                {thumbnail && (
                  <p className="text-[10px] text-brand-charcoal/50 font-sans mt-1">{thumbnail.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* API Error */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm font-sans"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {apiError}
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            id="publish-course"
            disabled={submitting}
            className="w-full py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white font-sans font-semibold text-xs uppercase tracking-[0.18em] rounded-sm transition-all duration-300 hover:scale-[1.01] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {submitting ? "Publishing…" : "Publish Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
