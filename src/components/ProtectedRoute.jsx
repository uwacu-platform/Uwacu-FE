import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Wraps a route that requires authentication.
 * Optionally pass `roles` array to restrict to specific roles.
 * Saves current location so user is redirected back after login.
 */
export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  if (roles && !roles.includes(user.role)) {
    // Logged in but wrong role — show a friendly forbidden page
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="font-serif font-bold text-brand-green text-2xl mb-4">
            Access Restricted
          </h1>
          <p className="text-brand-charcoal/65 font-sans text-sm leading-relaxed mb-6">
            Your current role (<strong className="text-brand-brown">{user.role}</strong>) does not
            have permission to access this page. You need to be a{" "}
            <strong>{roles.join(" or ")}</strong> to continue.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-brand-green text-brand-white text-xs uppercase tracking-widest rounded-sm font-semibold hover:bg-brand-brown transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return children;
}
