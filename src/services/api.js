import { API_BASE_URL, TOKEN_KEY, RETRY_ATTEMPTS, RETRY_DELAY_MS } from "../config/apiConfig.js";

const BASE_URL = API_BASE_URL;

// ── Token helpers ────────────────────────────────────────────────────────────
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// ── Core fetch wrapper with automatic retry for server wake-up ───────────────
/**
 * @param {string} path   - API path, e.g. "/auth/login"
 * @param {RequestInit} options - fetch options
 * @param {number} retriesLeft - number of automatic retry attempts
 * @returns {Promise<any>} - parsed JSON response
 */
async function request(path, options = {}, retriesLeft = RETRY_ATTEMPTS) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  // Only set Content-Type JSON if we are NOT sending FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (netErr) {
    // Backend free instances (Render) go to sleep and can cause ERR_CONNECTION_RESET or network timeout on initial connection
    if (retriesLeft > 0) {
      console.warn(`Network error (${netErr.message}), retrying in ${RETRY_DELAY_MS}ms... (Backend server may be spinning up)`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
      return request(path, options, retriesLeft - 1);
    }
    const err = new Error(
      "Unable to connect to UWACU server (ERR_CONNECTION_RESET). The backend on Render may be waking up from sleep. Please wait a few seconds and try again."
    );
    err.isNetworkError = true;
    throw err;
  }

  // Parse JSON (or empty body)
  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    // Surface the backend error message if available
    const detail = Array.isArray(data?.detail)
      ? data.detail.map((item) => item.msg || item.message).filter(Boolean).join(" ")
      : data?.detail;
    const message =
      data?.message ||
      data?.msg ||
      data?.error ||
      detail ||
      `Request failed with status ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

// ── Convenience methods ──────────────────────────────────────────────────────
export const api = {
  get: (path, opts = {}) =>
    request(path, { method: "GET", ...opts }),

  post: (path, body, opts = {}) =>
    request(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...opts,
    }),

  put: (path, body, opts = {}) =>
    request(path, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...opts,
    }),

  delete: (path, opts = {}) =>
    request(path, { method: "DELETE", ...opts }),
};
