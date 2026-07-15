import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth, loadCourses, enrollInCourse } from "../context/AuthContext";
import { useState } from "react";

// Same seed courses as Learn.jsx to ensure they can be viewed
const seedCourses = [
  {
    id: "c1",
    title: "Introduction to Kinyarwanda",
    level: "Beginner",
    lessonCount: 12,
    duration: "4 weeks",
    desc: "Learn the foundations of Rwanda's national language — greetings, numbers, proverbs, and everyday phrases — taught through cultural context and storytelling.",
    img: "src/assets/ingoma.png",
    tag: "Language",
    instructorName: "UWACU Academy",
    lessons: ["Greetings and Politeness", "Numbers and Counting", "Basic Sentence Structure", "Common Proverbs (Imigani)", "Market Vocabulary", "Telling Time", "Family Relationships", "Describing Places", "Food and Dining", "Expressing Emotions", "Past and Future Tense", "Conversational Practice"],
  },
  {
    id: "c2",
    title: "The Art of Imigongo",
    level: "All Levels",
    lessonCount: 8,
    duration: "3 weeks",
    desc: "A hands-on guide to Rwanda's geometric mural tradition. Learn the symbolic vocabulary of Imigongo patterns, their historical origins, and how to create your own designs.",
    img: "src/assets/imigongo.png",
    tag: "Visual Arts",
    instructorName: "Marie-Claire Mukamusoni",
    lessons: ["History of Imigongo", "Materials and Preparation", "Basic Geometric Patterns", "The Meaning of Spirals", "Combining Patterns", "Color Theory and Pigments", "Creating Your First Piece", "Preserving Imigongo Art"],
  },
  {
    id: "c3",
    title: "Rwandan Oral Traditions",
    level: "Intermediate",
    lessonCount: 10,
    duration: "5 weeks",
    desc: "Explore the rich oral heritage of Rwanda — praise poetry (amazina), epic narratives (ibitekerezo), riddles (ibisakuzo), and their role in shaping communal identity.",
    img: "src/assets/amasunzu.png",
    tag: "History",
    instructorName: "UWACU Academy",
    lessons: ["Introduction to Orality", "Ibisakuzo: Riddles and Logic", "Imigani: Proverbs and Wisdom", "Amazina: Praise Poetry", "Ibitekerezo: Epic Historical Narratives", "The Role of the Storyteller", "Music in Oral Tradition", "Memory and Preservation", "Orality in Modern Rwanda", "Final Project: Recording a Story"],
  },
  // Adding just enough mock lessons for the rest
  { id: "c4", title: "Understanding Umuganura", level: "All Levels", lessonCount: 6, duration: "2 weeks", desc: "Dive deep into Rwanda's national harvest festival — its spiritual roots, community rituals, royal traditions, and contemporary revival as a symbol of national unity.", img: "src/assets/dance.png", tag: "Ceremony", instructorName: "UWACU Academy", lessons: ["Origins of Umuganura", "The Royal Court's Role", "Agricultural Cycles", "Rituals and Offerings", "Music and Dance of Harvest", "Umuganura Today"] },
  { id: "c5", title: "Traditional Rwandan Music", level: "Beginner", lessonCount: 14, duration: "6 weeks", desc: "From the inanga zither to the ikembe thumb piano, this course covers Rwanda's traditional instruments, their tuning systems, and the cultural contexts in which they are played.", img: "src/assets/intore.png", tag: "Music", instructorName: "UWACU Academy", lessons: ["Introduction to Rwandan Sound", "The Inanga (Zither)", "The Ikembe (Thumb Piano)", "The Umuduri (Musical Bow)", "The Amakondera (Horns)", "The Ingoma (Drums)", "Vocal Styles", "Music for Work", "Music for Celebration", "Music for Mourning", "Modern Adaptations", "Building Instruments", "Rhythm and Dance", "Final Performance"] },
  { id: "c6", title: "Agaseke Basket Weaving", level: "All Levels", lessonCount: 9, duration: "4 weeks", desc: "Rwanda's coiled grass baskets are among Africa's most celebrated crafts. Learn the symbolic patterns, proper techniques, and the social significance of Agaseke in Rwandan life.", img: "src/assets/uduseke.png", tag: "Craft", instructorName: "UWACU Academy", lessons: ["History of Agaseke", "Harvesting Materials", "Preparation and Dyeing", "The Core Technique (Coiling)", "The Zig-Zag Pattern", "The Diamond Pattern", "Finishing the Lid", "The Role of Agaseke in Marriage", "Economic Empowerment through Weaving"] },
];

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [enrolling, setEnrolling] = useState(false);

  // Merge seed + user courses
  const userCourses = loadCourses();
  const allCourses = [...seedCourses, ...userCourses];
  const course = allCourses.find((c) => String(c.id) === String(courseId));

  if (!course) {
    return (
      <div className="min-h-screen bg-brand-offwhite flex items-center justify-center pt-20">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">🏫</div>
          <h1 className="font-serif font-bold text-brand-green text-2xl mb-4">Course Not Found</h1>
          <p className="text-brand-charcoal/65 font-sans text-sm mb-6">This course may have been removed or does not exist.</p>
          <Link to="/learn" className="inline-block px-6 py-3 bg-brand-green text-brand-white text-xs uppercase tracking-widest rounded-sm font-semibold hover:bg-brand-brown transition-colors">
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  const isEnrolled = user && user.enrolledCourses && user.enrolledCourses.includes(course.id);
  const isInstructor = user && (user.id === course.instructorId || user.role === "instructor");
  const hasAccess = isEnrolled || isInstructor;

  const handleEnroll = () => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/learn/${courseId}`)}`);
      return;
    }
    
    setEnrolling(true);
    // Simulate network delay
    setTimeout(() => {
      enrollInCourse(user.id, course.id);
      refreshUser();
      setEnrolling(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-brand-offwhite">
      
      {/* ── HERO ── */}
      <section className="relative w-full min-h-[55vh] flex items-end justify-start overflow-hidden bg-brand-charcoal pt-24 pb-16">
        <div className="absolute inset-0">
          <img src={course.img} alt={course.title} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/70 to-brand-charcoal/30" />
        </div>
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 w-full text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block bg-brand-yellow text-brand-charcoal text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm font-sans">
              {course.tag}
            </span>
            <span className="inline-block bg-brand-white/20 text-brand-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm font-sans">
              {course.level}
            </span>
          </div>
          
          <h1 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 max-w-4xl">{course.title}</h1>
          
          <p className="text-brand-white/80 font-sans text-base md:text-lg max-w-3xl leading-relaxed mb-10">
            {course.desc}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-white/10 flex items-center justify-center font-bold font-sans text-brand-yellow">
                {course.instructorName[0]}
              </div>
              <div>
                <div className="text-[10px] text-brand-white/50 uppercase tracking-widest font-sans mb-0.5">Instructor</div>
                <div className="text-sm font-bold font-sans">{course.instructorName}</div>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-brand-white/20" />
            
            <div>
              <div className="text-[10px] text-brand-white/50 uppercase tracking-widest font-sans mb-0.5">Duration</div>
              <div className="text-sm font-bold font-sans">{course.duration} • {course.lessonCount} Lessons</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── COURSE CONTENT ── */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        
        {/* Left Column: Syllabus */}
        <div className="lg:col-span-2">
          <Link to="/learn" className="inline-flex items-center gap-2 text-brand-brown hover:text-brand-green text-[10px] uppercase tracking-widest font-sans font-bold mb-10 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </Link>

          <h2 className="font-serif font-bold text-brand-green text-2xl mb-8">Course Syllabus</h2>
          
          <div className="flex flex-col gap-4">
            {course.lessons.map((lesson, index) => {
              // First lesson is always accessible (preview). Rest depend on hasAccess.
              const isLocked = index > 0 && !hasAccess;
              
              return (
                <div 
                  key={index} 
                  className={`border rounded-sm p-5 transition-all ${
                    isLocked 
                      ? "border-brand-brown/10 bg-brand-white/50 opacity-70" 
                      : "border-brand-brown/20 bg-brand-white shadow-sm hover:border-brand-green/40 hover:shadow-md cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-sans flex-shrink-0 ${
                        isLocked ? "bg-brand-charcoal/5 text-brand-charcoal/40" : "bg-brand-green/10 text-brand-green"
                      }`}>
                        {index + 1}
                      </div>
                      <h3 className={`font-sans font-semibold ${isLocked ? "text-brand-charcoal/60" : "text-brand-charcoal"} text-[15px]`}>
                        {lesson}
                      </h3>
                    </div>
                    <div>
                      {isLocked ? (
                        <svg className="w-5 h-5 text-brand-charcoal/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-brand-green/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4l3 3" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Enrollment Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-[100px] bg-brand-white border border-brand-brown/15 shadow-xl rounded-sm p-8">
            {hasAccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="font-serif font-bold text-brand-green text-xl mb-2">
                  {isInstructor ? "You Manage This Course" : "You're Enrolled!"}
                </h3>
                <p className="text-brand-charcoal/60 font-sans text-xs leading-relaxed mb-6">
                  {isInstructor 
                    ? "As an instructor, you have full access to all course materials."
                    : "You have full access to all lessons and materials. Pick up where you left off."}
                </p>
                <button className="w-full py-3.5 bg-brand-green hover:bg-brand-green/90 text-brand-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-sm transition-all shadow-md">
                  Continue Learning
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-serif font-bold text-brand-green text-xl mb-4">Start Learning Today</h3>
                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3 text-brand-charcoal/70 text-sm font-sans">
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Full access to all {course.lessonCount} lessons</span>
                  </div>
                  <div className="flex items-center gap-3 text-brand-charcoal/70 text-sm font-sans">
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Self-paced learning</span>
                  </div>
                  <div className="flex items-center gap-3 text-brand-charcoal/70 text-sm font-sans">
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Certificate of completion</span>
                  </div>
                </div>
                <button 
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-4 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal text-xs font-bold uppercase tracking-[0.15em] rounded-sm transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {enrolling ? "Enrolling..." : "Enroll for Free"}
                </button>
                <p className="text-center text-[10px] text-brand-charcoal/40 font-sans mt-4">
                  Takes less than a minute. No credit card required.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
