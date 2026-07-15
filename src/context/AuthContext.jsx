import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "uwacu_auth";
const USERS_KEY = "uwacu_users";

/* ── Helpers ── */
export function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function updateUser(userId, updates) {
  const users = loadUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
  }
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

/* ── Provider ── */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist session on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  /* Register */
  const register = useCallback(({ name, email, password, role }) => {
    setError(null);
    const users = loadUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setError("An account with this email already exists.");
      return false;
    }
    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password, // stored plaintext — prototype only
      role, // reader | author | student | instructor
      joinedAt: new Date().toISOString(),
      enrolledCourses: [],
      postedStories: [],
      postedCourses: [],
    };
    saveUsers([...users, newUser]);
    // Auto-login after register (omit password from session)
    const session = { ...newUser };
    delete session.password;
    setUser(session);
    return true;
  }, []);

  /* Login */
  const login = useCallback(({ email, password }) => {
    setError(null);
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      setError("Invalid email or password.");
      return false;
    }
    const session = { ...found };
    delete session.password;
    setUser(session);
    return true;
  }, []);

  /* Logout */
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  /* Refresh user data from localStorage (after posting story/course) */
  const refreshUser = useCallback(() => {
    if (!user) return;
    const users = loadUsers();
    const updated = users.find((u) => u.id === user.id);
    if (updated) {
      const session = { ...updated };
      delete session.password;
      setUser(session);
    }
  }, [user]);

  /* Clear error */
  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, register, login, logout, refreshUser, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ── */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

/* ── Role helpers ── */
export const canPostStory = (user) =>
  user && (user.role === "author" || user.role === "instructor");

export const canPostCourse = (user) => user && user.role === "instructor";

export const isStudent = (user) =>
  user && (user.role === "student" || user.role === "instructor");

/* ── Stories / Courses localStorage helpers ── */
const STORIES_KEY = "uwacu_stories";
const COURSES_KEY = "uwacu_courses";
const EVENTS_KEY = "uwacu_events";

const defaultEvents = [
  {
    id: "e1",
    title: "Umuganura — National Harvest Festival",
    date: "August 7, 2026",
    location: "Amahoro National Stadium, Kigali",
    type: "National Ceremony",
    desc: "Rwanda's national harvest festival — a celebration of gratitude, unity, and cultural pride. UWACU will document and broadcast the festivities for the global diaspora.",
    img: "src/assets/dance.png",
    featured: true,
  },
  {
    id: "e2",
    title: "Imigongo Masterclass — Kirehe Edition",
    date: "July 19, 2026",
    location: "Kirehe Cultural Centre, Eastern Province",
    type: "Workshop",
    desc: "An intensive one-day workshop with master Imigongo artist Clarisse Mukamana. Learn to design and apply traditional geometric patterns using authentic earth pigments.",
    img: "src/assets/imigongo.png",
    featured: false,
  },
  {
    id: "e3",
    title: "Night of Oral Traditions — Kigali",
    date: "July 25, 2026",
    location: "Inema Arts Center, Kacyiru",
    type: "Cultural Evening",
    desc: "An intimate evening of storytelling, proverb sharing, and praise poetry in Kinyarwanda. A rare opportunity to experience Rwanda's living oral heritage in its natural form.",
    img: "src/assets/ingoma.png",
    featured: false,
  },
  {
    id: "e4",
    title: "Digital Heritage Forum 2026",
    date: "August 3, 2026",
    location: "Virtual — Zoom Webinar",
    type: "Online Forum",
    desc: "A global conversation on preserving intangible cultural heritage through digital platforms, machine learning, and community participation. Speakers from 10+ countries.",
    img: "src/assets/amasunzu.png",
    featured: false,
  },
  {
    id: "e5",
    title: "Agaseke Basket Weaving Intensive",
    date: "August 17, 2026",
    location: "Musanze Cultural Village, Northern Province",
    type: "Workshop",
    desc: "Learn the art of Rwanda's iconic coiled grass baskets with community artisans. Participants will complete their own Agaseke piece to take home.",
    img: "src/assets/uduseke.png",
    featured: false,
  },
  {
    id: "e6",
    title: "Intore Dance Showcase",
    date: "September 5, 2026",
    location: "Rwanda Cultural Village, Butare",
    type: "Performance",
    desc: "A spectacular evening of traditional Intore warrior dance performed by Rwanda's most celebrated dance troupes. A visual and emotional experience not to be missed.",
    img: "src/assets/intore.png",
    featured: false,
  },
];

export function loadEvents() {
  try {
    const stored = JSON.parse(localStorage.getItem(EVENTS_KEY));
    if (stored && stored.length > 0) return stored;
    localStorage.setItem(EVENTS_KEY, JSON.stringify(defaultEvents));
    return defaultEvents;
  } catch {
    return defaultEvents;
  }
}

export function saveEvent(event) {
  const events = loadEvents();
  const updated = [event, ...events];
  localStorage.setItem(EVENTS_KEY, JSON.stringify(updated));
  return updated;
}

export function loadStories() {
  try {
    return JSON.parse(localStorage.getItem(STORIES_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveStory(story) {
  const stories = loadStories();
  const updated = [story, ...stories];
  localStorage.setItem(STORIES_KEY, JSON.stringify(updated));
  return updated;
}

export function loadCourses() {
  try {
    return JSON.parse(localStorage.getItem(COURSES_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCourse(course) {
  const courses = loadCourses();
  const updated = [course, ...courses];
  localStorage.setItem(COURSES_KEY, JSON.stringify(updated));
  return updated;
}

export function enrollInCourse(userId, courseId) {
  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return;
  if (!users[idx].enrolledCourses) users[idx].enrolledCourses = [];
  if (!users[idx].enrolledCourses.includes(courseId)) {
    users[idx].enrolledCourses.push(courseId);
    saveUsers(users);
  }
}
