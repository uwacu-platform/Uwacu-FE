import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const UwacuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
    <rect x="8" y="20" width="20" height="10" rx="2" fill="currentColor" />
    <path d="M18 6 L28 16 L8 16 Z" fill="currentColor" />
    <circle cx="18" cy="5" r="3" fill="currentColor" />
    <rect x="10" y="16" width="3" height="4" fill="currentColor" />
    <rect x="23" y="16" width="3" height="4" fill="currentColor" />
  </svg>
);

const navItems = [
  { label: "Dashboard", path: "/admin", icon: "📊" },
  { label: "Manage Events", path: "/admin/events", icon: "📅" },
  { label: "Manage Users", path: "/admin/users", icon: "👥" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="flex h-screen bg-brand-offwhite overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-charcoal text-brand-white flex flex-col">
        <div className="p-6 border-b border-brand-white/10 flex items-center gap-2">
          <span className="text-brand-yellow">
            <UwacuIcon />
          </span>
          <span className="font-bold uppercase tracking-widest text-sm text-brand-white">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-sans transition-all duration-200 ${
                  isActive
                    ? "bg-brand-green text-brand-white shadow-md font-bold"
                    : "text-brand-white/70 hover:bg-brand-white/10 hover:text-brand-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-brand-white/10">
          <div className="mb-4">
            <div className="text-sm font-bold font-sans truncate">{user?.name}</div>
            <div className="text-xs text-brand-white/50 font-sans uppercase">{user?.role}</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-900/40 hover:bg-red-800 text-red-200 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
          >
            Sign Out
          </button>
          <Link
            to="/"
            className="block mt-3 text-center text-xs text-brand-yellow hover:underline uppercase tracking-widest font-sans"
          >
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-brand-brown/10 flex items-center justify-between px-8">
          <h2 className="font-serif font-bold text-brand-green text-xl">
            {navItems.find((i) => i.path === location.pathname)?.label || "Admin Area"}
          </h2>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
