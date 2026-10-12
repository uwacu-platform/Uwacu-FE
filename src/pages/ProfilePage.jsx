import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(date);
}

export default function ProfilePage() {
  const { user, loading, error, refreshUser, clearError } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const initials = (user?.name || user?.username || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  async function handleRefresh() {
    clearError();
    setRefreshing(true);
    try {
      await refreshUser();
    } catch {
      // The API error is displayed below from AuthContext.
    } finally {
      setRefreshing(false);
    }
  }

  const fields = [
    ["First name", user?.first_name],
    ["Last name", user?.last_name],
    ["Username", user?.username],
    ["Email", user?.email],
    ["Role", user?.role],
    ["Member since", formatDate(user?.joinedAt)],
  ];

  return (
    <section className="min-h-screen bg-brand-offwhite px-6 pt-32 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <p className="text-brand-brown text-xs font-bold uppercase tracking-[0.18em] mb-3">Your account</p>
            <h1 className="font-serif font-bold text-brand-green text-4xl">Profile</h1>
            <p className="text-brand-charcoal/60 font-sans text-sm mt-2">
              Details loaded from your UWACU account.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="px-5 py-3 bg-brand-green text-brand-white text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-brand-green/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading || refreshing ? "Refreshing…" : "Refresh profile"}
          </button>
        </div>

        {error && (
          <div role="alert" className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm font-sans rounded-sm">
            {error}
          </div>
        )}

        <div className="bg-brand-white border border-brand-brown/15 shadow-sm rounded-sm overflow-hidden">
          <div className="bg-brand-green px-6 sm:px-8 py-8 flex items-center gap-5">
            <div className="w-16 h-16 shrink-0 rounded-full bg-brand-yellow text-brand-charcoal flex items-center justify-center font-sans font-bold text-xl">
              {initials}
            </div>
            <div className="min-w-0">
              <h2 className="font-serif font-bold text-brand-white text-2xl truncate">
                {user?.name || user?.username || "UWACU member"}
              </h2>
              <p className="text-brand-white/70 font-sans text-sm truncate">{user?.email}</p>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2">
            {fields.map(([label, value]) => (
              <div key={label} className="px-6 sm:px-8 py-5 border-b border-brand-brown/10 even:sm:border-l">
                <dt className="text-brand-charcoal/45 text-[11px] font-bold uppercase tracking-[0.14em] font-sans mb-1.5">
                  {label}
                </dt>
                <dd className="text-brand-charcoal font-sans text-sm break-words">
                  {value || "Not available"}
                </dd>
              </div>
            ))}
          </dl>

          {user?.bio && (
            <div className="px-6 sm:px-8 py-5">
              <p className="text-brand-charcoal/45 text-[11px] font-bold uppercase tracking-[0.14em] font-sans mb-1.5">Bio</p>
              <p className="text-brand-charcoal font-sans text-sm leading-relaxed">{user.bio}</p>
            </div>
          )}
        </div>

        <Link
          to="/"
          className="inline-block mt-7 text-brand-green hover:text-brand-brown text-xs font-bold uppercase tracking-[0.14em] transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
