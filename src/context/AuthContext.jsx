import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "uwacu_auth";
const USERS_KEY = "uwacu_users";

/* ── Helpers ── */
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
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
