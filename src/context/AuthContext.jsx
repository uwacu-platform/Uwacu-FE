import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
} from "../services/authService.js";
import { getToken } from "../services/api.js";

const AuthContext = createContext(null);

const SESSION_KEY = "uwacu_auth_user";

/* ── Session persistence helpers ─────────────────────────────────────────── */
function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

function saveSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

/* ── Provider ─────────────────────────────────────────────────────────────── */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // On mount, if we have a stored token, refresh profile from API
  useEffect(() => {
    const token = getToken();
    if (token && !user) {
      setLoading(true);
      getProfile()
        .then((profile) => {
          const session = normalizeUser(profile);
          setUser(session);
          saveSession(session);
        })
        .catch(() => {
          // Token is invalid or expired — clear everything
          logoutUser();
          setUser(null);
          saveSession(null);
        })
        .finally(() => setLoading(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist user session to localStorage whenever it changes
  useEffect(() => {
    saveSession(user);
  }, [user]);

  /**
   * Normalize the API user object to a flat shape the UI expects.
   * The backend may return different field names, so we map them here.
   */
  function normalizeUser(apiUser) {
    return {
      id: apiUser.id,
      // Support both "name" (legacy) and first_name + last_name (API)
      name:
        apiUser.name ||
        [apiUser.first_name, apiUser.last_name].filter(Boolean).join(" ") ||
        apiUser.username ||
        apiUser.email,
      username: apiUser.username,
      email: apiUser.email,
      first_name: apiUser.first_name,
      last_name: apiUser.last_name,
      bio: apiUser.bio,
      // The API uses "instructor", "learner", "vendor", "admin" roles
      role: apiUser.role,
      joinedAt: apiUser.created_at || apiUser.joinedAt || new Date().toISOString(),
      enrolledCourses: apiUser.enrolledCourses || [],
    };
  }

  /* ── Register ─────────────────────────────────────────────────────────── */
  const register = useCallback(async ({ name, email, password, role }) => {
    setError(null);
    setLoading(true);
    try {
      // Split name into first/last for the API
      const parts = (name || "").trim().split(" ");
      const first_name = parts[0] || "";
      const last_name = parts.slice(1).join(" ") || "";
      // Generate a username from email (API requires it)
      const username = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");

      let data;
      try {
        data = await registerUser({
          email,
          username,
          password,
          first_name,
          last_name,
          role,
        });
      } catch (apiErr) {
        // If network reset / server down, use local session fallback so user is not blocked
        if (apiErr.isNetworkError) {
          console.warn("API server connection reset/offline. Falling back to local account session.", apiErr.message);
          const fallbackUser = {
            id: `u_${Date.now()}`,
            name,
            username,
            email: email.toLowerCase(),
            role,
            joinedAt: new Date().toISOString(),
            enrolledCourses: [],
          };
          const users = loadUsers();
          saveUsers([...users, { ...fallbackUser, password }]);
          setUser(fallbackUser);
          return true;
        }
        throw apiErr;
      }

      // Try to get the full profile after registration
      let session;
      try {
        const profile = await getProfile();
        session = normalizeUser(profile);
      } catch {
        // Fallback: build from the registration response
        session = normalizeUser({ email, username, first_name, last_name, role, ...data?.user });
      }

      setUser(session);
      return true;
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Login ────────────────────────────────────────────────────────────── */
  const login = useCallback(async ({ email, password }) => {
    setError(null);
    setLoading(true);
    try {
      try {
        await loginUser({ email, password });
        const profile = await getProfile();
        const session = normalizeUser(profile);
        setUser(session);
        return true;
      } catch (apiErr) {
        if (apiErr.isNetworkError) {
          // Check local users fallback
          const users = loadUsers();
          const found = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
          );
          if (found) {
            const session = { ...found };
            delete session.password;
            setUser(session);
            return true;
          }
        }
        throw apiErr;
      }
    } catch (err) {
      setError(err.message || "Invalid email or password.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Logout ───────────────────────────────────────────────────────────── */
  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
    saveSession(null);
  }, []);

  /* ── Refresh user from API ────────────────────────────────────────────── */
  const refreshUser = useCallback(async () => {
    if (!getToken()) return;
    try {
      const profile = await getProfile();
      const session = normalizeUser(profile);
      setUser(session);
      saveSession(session);
    } catch {
      // Silently fail — keep existing user
    }
  }, []);

  /* ── Clear error ──────────────────────────────────────────────────────── */
  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, register, login, logout, refreshUser, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ─────────────────────────────────────────────────────────────────── */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

/* ── Role helpers ─────────────────────────────────────────────────────────── */
// API roles: "instructor", "learner", "vendor", "admin"
// Legacy UI roles: "author", "instructor", "student", "reader"
export const canPostStory = (user) =>
  user &&
  (user.role === "author" ||
    user.role === "instructor" ||
    user.role === "vendor");

export const canPostCourse = (user) =>
  user && (user.role === "instructor" || user.role === "vendor");

export const isStudent = (user) =>
  user &&
  (user.role === "student" ||
    user.role === "learner" ||
    user.role === "instructor");

/* ──────────────────────────────────────────────────────────────────────────
   LOCAL STORAGE HELPERS — kept for Stories & Events which are not yet backed
   by a backend API. These are NOT touched by the auth refactor.
   ────────────────────────────────────────────────────────────────────────── */
const STORIES_KEY = "uwacu_stories";
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

/* ── Legacy Admin Helpers (localStorage-backed) ──────────────────────────────
   The Postman collection does not expose a user-listing or course-listing
   endpoint for admins, so these remain localStorage-based for now.
   ────────────────────────────────────────────────────────────────────────── */
const USERS_KEY = "uwacu_users";
const COURSES_KEY = "uwacu_courses";

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
  const index = users.findIndex((u) => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
  }
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
