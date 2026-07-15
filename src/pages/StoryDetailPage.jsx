import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth, loadStories } from "../context/AuthContext";

// Static seed stories (same as Stories.jsx)
const seedStories = [
  {
    id: "1",
    category: "Tradition",
    title: "The Last Inanga Keeper of Musanze",
    excerpt:
      "Ninety-three-year-old Séraphine Mukandori is one of the last master players of the inanga — Rwanda's ancient trough zither. Every evening she plays for the hills, carrying a melody that has not changed in three hundred years.",
    content: `Ninety-three-year-old Séraphine Mukandori is one of the last master players of the inanga — Rwanda's ancient trough zither. Every evening, as the sun dips behind the green hills of Musanze, she takes her seat at the threshold of her home and begins to play.

The inanga is a trough-shaped instrument, carved from a single piece of wood, with strings stretched across its body. In Séraphine's hands it speaks — not just music, but memory. Each tune is a prayer, a lament, a celebration passed down through seven generations of her family.

"My grandmother taught me," she says, her voice carrying the careful cadence of someone who has always chosen words deliberately. "And her grandmother before her. The songs are not mine. I am only their keeper."

The melody she plays tonight is called Ibyo Ntabura — something that cannot be divided. It is traditionally sung at reconciliation ceremonies, when two families who have known conflict come together to share food and restore peace. It is a song about the indestructible nature of community.

Séraphine worries that she will be the last to play it. Her children moved to Kigali. Her grandchildren listen to music through small white earphones. When she asked her youngest grandson if he wanted to learn the inanga, he smiled the polite smile of someone who does not want to say no directly.

Yet she keeps playing. The hills keep listening. And perhaps that is enough — for now.`,
    author: "Jean-Pierre Habimana",
    authorBio: "Jean-Pierre Habimana is a cultural journalist based in Musanze, covering indigenous arts and oral traditions across Northern Rwanda.",
    date: "June 2026",
    readTime: "6 min",
    img: "src/assets/ingoma.png",
    featured: true,
  },
  {
    id: "2",
    category: "Community",
    title: "Umuganda: When a Nation Builds Together",
    excerpt:
      "Every last Saturday of the month, Rwanda pauses. Markets close. Roads quiet. Citizens pick up shovels and brushes — and the country builds itself, one community project at a time.",
    content: `Every last Saturday of the month, Rwanda pauses. Markets close, taxis park, and the usual rhythm of commerce gives way to something older and more intentional.

Umuganda — meaning "coming together in common purpose" — is Rwanda's national community work program. On this day, citizens gather in their neighborhoods to clean streets, plant trees, build schools, and repair roads. It is mandatory for able-bodied adults, though most participate willingly, even enthusiastically.

The tradition is not new. Long before colonization, Rwandan communities practised a form of collective labor called umuganda as a way of completing shared tasks that no single family could accomplish alone. A roof that needed thatching. A field that needed clearing before the rains. A bridge across a swollen stream.

What modern Rwanda has done is formalize and scale this spirit. Since 2009, the government has embedded umuganda into the national calendar, and it has become one of the country's most distinctive civic traditions.

In Nyamata, a town south of Kigali, the Saturday morning activity this month is painting the walls of the primary school. Dozens of residents — teachers, market vendors, engineers, and retired elders — stand side by side with rollers and brushes, chatting in Kinyarwanda about the week just past.

A retired schoolteacher named Anastase Niyonzima surveys the freshly painted wall with the satisfied expression of someone who has just finished a meal. "We built this school together in 1994," he says quietly. "We have maintained it together ever since. That is how it should be."`,
    author: "Clarisse Uwimana",
    authorBio: "Clarisse Uwimana writes on governance, community, and social renewal in post-genocide Rwanda.",
    date: "May 2026",
    readTime: "8 min",
    img: "src/assets/uduseke.png",
    featured: false,
  },
  {
    id: "3",
    category: "Arts",
    title: "Imigongo: The Geometry of Memory",
    excerpt:
      "High on the hills of Kirehe, artisans have applied cow dung and earth pigments to walls for five centuries. The result is Imigongo — a visual language of spirals, triangles, and negative space.",
    content: `High on the hills of Kirehe, in southeastern Rwanda, a cooperative of women has been making the same kind of art for five centuries. They mix cow dung with ash and apply it to flat surfaces with their hands, building up layers of texture before introducing earth pigments — ochres, blacks, and whites — in repeating geometric patterns.

The result is Imigongo: Rwanda's most distinctive visual art form, and one of the most striking craft traditions on the African continent.

The patterns are not random. Each form carries meaning: spirals represent the continuity of life; triangles mark transition; concentric squares indicate protection. The negative space — the gap between forms — is as meaningful as the forms themselves.

"The empty space is not emptiness," explains Marie-Claire Mukamusoni, one of the cooperative's senior artisans. "It is where the eye rests. It is where the meaning breathes."

Imigongo nearly disappeared in the violence of 1994. Many of its practitioners were killed; knowledge was scattered. What survived did so through the determination of a small number of women who returned to Kirehe after the genocide and resumed work almost immediately.

"We needed to do something with our hands," says Marie-Claire. "Making Imigongo was how we came back to ourselves."

Today the cooperative employs forty women and ships work to collections in Europe, the United States, and Japan. But for the artisans, the purpose remains what it has always been: to speak in the language of geometry, to say things that words cannot hold.`,
    author: "Amina Uwase",
    authorBio: "Amina Uwase is an art historian and curator at the Kigali Art Centre.",
    date: "April 2026",
    readTime: "5 min",
    img: "src/assets/imigongo.png",
    featured: false,
  },
];

export default function StoryDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Merge seed + user stories
  const allStories = [...seedStories, ...loadStories()];
  const story = allStories.find((s) => String(s.id) === String(id));

  if (!story) {
    return (
      <div className="min-h-screen bg-brand-offwhite flex items-center justify-center pt-20">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">📖</div>
          <h1 className="font-serif font-bold text-brand-green text-2xl mb-4">Story Not Found</h1>
          <p className="text-brand-charcoal/65 font-sans text-sm mb-6">This story may have been moved or removed.</p>
          <Link to="/stories" className="inline-block px-6 py-3 bg-brand-green text-brand-white text-xs uppercase tracking-widest rounded-sm font-semibold hover:bg-brand-brown transition-colors">
            Browse All Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-offwhite">

      {/* ── HERO ── */}
      <section className="relative w-full h-[60vh] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/50 to-brand-charcoal/20" />
        </div>
        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 pb-16 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-brand-yellow text-brand-charcoal text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 font-sans">
            {story.category}
          </span>
          <h1 className="font-serif font-bold text-3xl lg:text-5xl leading-tight mb-4">{story.title}</h1>
          <div className="flex items-center gap-4 text-xs text-white/60 font-sans">
            <span>By {story.author}</span>
            <span>·</span>
            <span>{story.date}</span>
            <span>·</span>
            <span>{story.readTime} read</span>
          </div>
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Back link */}
        <Link to="/stories" className="inline-flex items-center gap-2 text-brand-brown hover:text-brand-green text-xs uppercase tracking-widest font-sans font-semibold mb-10 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Stories
        </Link>

        {/* Excerpt — always visible */}
        <p className="font-sans text-brand-charcoal/75 text-base leading-relaxed mb-8 border-l-4 border-brand-yellow pl-6 italic">
          {story.excerpt}
        </p>

        {/* Full Content — gated */}
        {user ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-brand-charcoal/80 text-[15px] leading-[1.85] whitespace-pre-wrap"
          >
            {story.content}
          </motion.div>
        ) : (
          /* Gate */
          <div className="relative">
            {/* Blurred preview of content */}
            <div className="font-sans text-brand-charcoal/80 text-[15px] leading-[1.85] line-clamp-4 blur-[3px] select-none pointer-events-none">
              {story.content}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-offwhite/60 to-brand-offwhite" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 mt-8 text-center"
            >
              <div className="inline-block bg-brand-white border border-brand-brown/20 rounded-sm shadow-xl p-8 max-w-sm mx-auto">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="font-serif font-bold text-brand-green text-xl mb-3">Read the Full Story</h3>
                <p className="text-brand-charcoal/60 text-sm font-sans leading-relaxed mb-6">
                  Sign in to UWACU to access the complete story and the full cultural archive.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate(`/login?redirect=${encodeURIComponent(`/stories/${id}`)}`)}
                    id="gate-login"
                    className="w-full py-3 bg-brand-green hover:bg-brand-green/90 text-brand-white text-xs uppercase tracking-widest rounded-sm font-semibold transition-all"
                  >
                    Sign In
                  </button>
                  <Link
                    to="/register"
                    id="gate-register"
                    className="block w-full py-3 border border-brand-brown/30 hover:border-brand-green text-brand-charcoal hover:text-brand-green text-xs uppercase tracking-widest rounded-sm font-semibold text-center transition-all"
                  >
                    Create Free Account
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Author Bio */}
        {user && story.authorBio && (
          <div className="mt-16 pt-8 border-t border-brand-brown/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-green/15 flex items-center justify-center text-brand-green font-bold font-sans text-lg flex-shrink-0">
                {story.author[0]}
              </div>
              <div>
                <div className="font-sans font-bold text-brand-green text-sm mb-1">{story.author}</div>
                <p className="text-brand-charcoal/60 text-xs font-sans leading-relaxed">{story.authorBio}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-brand-brown/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link to="/stories" className="text-brand-brown hover:text-brand-green text-xs uppercase tracking-widest font-sans font-semibold transition-colors">
            ← More Stories
          </Link>
          {user && (
            <Link
              to="/stories/post"
              className="px-6 py-3 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal text-xs uppercase tracking-widest rounded-sm font-bold transition-all hover:scale-105 shadow-md"
            >
              Share Your Own Story
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
