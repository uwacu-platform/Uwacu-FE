/**
 * UWACU Backend Communication & API Configuration
 * 
 * Centralized variables and endpoints for Frontend-Backend communication.
 * Environment variables use Vite's `import.meta.env.VITE_*` standard.
 */

// ── Base Environment Variables ────────────────────────────────────────────────
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://uwacu.onrender.com/api";

export const TOKEN_KEY =
  import.meta.env.VITE_TOKEN_STORAGE_KEY || "uwacu_access_token";

export const SESSION_KEY =
  import.meta.env.VITE_SESSION_STORAGE_KEY || "uwacu_auth_user";

export const API_TIMEOUT =
  Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

export const RETRY_ATTEMPTS =
  Number(import.meta.env.VITE_RETRY_ATTEMPTS) || 1;

export const RETRY_DELAY_MS =
  Number(import.meta.env.VITE_RETRY_DELAY_MS) || 2000;

// ── API Endpoints Registry ───────────────────────────────────────────────────
export const API_ENDPOINTS = {
  // Authentication & User Profile
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    PROFILE: "/auth/profile",
    UPDATE_PROFILE: "/auth/profile",
    DELETE_ACCOUNT: "/auth/account",
  },

  // Courses & Learning
  COURSES: {
    LIST: "/courses/",
    DETAIL: (id) => `/courses/${id}`,
    CREATE: "/courses/",
    ENROLL: (id) => `/courses/${id}/enroll`,
  },

  // Stories (Future Backend Integration)
  STORIES: {
    LIST: "/stories/",
    DETAIL: (id) => `/stories/${id}`,
    CREATE: "/stories/",
  },

  // Events (Future Backend Integration)
  EVENTS: {
    LIST: "/events/",
    DETAIL: (id) => `/events/${id}`,
    CREATE: "/events/",
  },
};
