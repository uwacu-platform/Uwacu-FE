/**
 * UWACU Auth Service
 * Wraps all /api/auth/* endpoints from the Postman collection.
 */

import { api, setToken, removeToken } from "./api.js";
import { API_ENDPOINTS } from "../config/apiConfig.js";

function getAccessToken(response) {
  return (
    response?.access_token ||
    response?.accessToken ||
    response?.token ||
    response?.data?.access_token ||
    response?.data?.accessToken ||
    response?.data?.token ||
    null
  );
}

function saveAccessToken(response) {
  const token = getAccessToken(response);
  if (token) setToken(token);
  return token;
}

/**
 * Register a new user.
 * POST /api/auth/register
 * Body: { email, username, password, first_name, last_name, role }
 */
export async function registerUser({ email, username, password, first_name, last_name, role }) {
  const data = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
    email,
    username,
    password,
    first_name,
    last_name,
    role,
  });
  // Some backends authenticate immediately after registration; persist that
  // token so the profile request can use it.
  saveAccessToken(data);
  return data;
}

/**
 * Log in with email/username + password.
 * POST /api/auth/login
 * Body: { email, username, password }
 * Returns: { access_token, user }
 */
export async function loginUser({ email, username, password }) {
  const data = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
    ...(email ? { email } : {}),
    ...(username ? { username } : {}),
    password,
  });
  saveAccessToken(data);
  return data;
}

/**
 * Get the currently authenticated user's profile.
 * GET /api/auth/profile
 */
export async function getProfile() {
  return api.get(API_ENDPOINTS.AUTH.PROFILE);
}

/**
 * Update the current user's profile.
 * PUT /api/auth/profile
 * Body: { first_name, last_name, bio }
 */
export async function updateProfile({ first_name, last_name, bio }) {
  return api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, { first_name, last_name, bio });
}

/**
 * Delete the current user's account.
 * DELETE /api/auth/account
 */
export async function deleteAccount() {
  const result = await api.delete(API_ENDPOINTS.AUTH.DELETE_ACCOUNT);
  removeToken();
  return result;
}

/**
 * Log out — just clears the local token (no dedicated logout endpoint).
 */
export function logoutUser() {
  removeToken();
}
