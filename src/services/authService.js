/**
 * UWACU Auth Service
 * Wraps all /api/auth/* endpoints from the Postman collection.
 */

import { api, setToken, removeToken } from "./api.js";

/**
 * Register a new user.
 * POST /api/auth/register
 * Body: { email, username, password, first_name, last_name, role }
 */
export async function registerUser({ email, username, password, first_name, last_name, role }) {
  const data = await api.post("/auth/register", {
    email,
    username,
    password,
    first_name,
    last_name,
    role,
  });
  // Auto-login: if the API returns a token on registration, store it
  if (data?.access_token) {
    setToken(data.access_token);
  }
  return data;
}

/**
 * Log in with email/username + password.
 * POST /api/auth/login
 * Body: { email, username, password }
 * Returns: { access_token, user }
 */
export async function loginUser({ email, username, password }) {
  const data = await api.post("/auth/login", {
    ...(email ? { email } : {}),
    ...(username ? { username } : {}),
    password,
  });
  if (data?.access_token) {
    setToken(data.access_token);
  }
  return data;
}

/**
 * Get the currently authenticated user's profile.
 * GET /api/auth/profile
 */
export async function getProfile() {
  return api.get("/auth/profile");
}

/**
 * Update the current user's profile.
 * PUT /api/auth/profile
 * Body: { first_name, last_name, bio }
 */
export async function updateProfile({ first_name, last_name, bio }) {
  return api.put("/auth/profile", { first_name, last_name, bio });
}

/**
 * Delete the current user's account.
 * DELETE /api/auth/account
 */
export async function deleteAccount() {
  const result = await api.delete("/auth/account");
  removeToken();
  return result;
}

/**
 * Log out — just clears the local token (no dedicated logout endpoint).
 */
export function logoutUser() {
  removeToken();
}
