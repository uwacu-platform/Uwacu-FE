import { useState, useEffect } from "react";
import { loadUsers, loadEvents, loadStories, loadCourses } from "../../context/AuthContext";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    stories: 0,
    courses: 0,
  });

  useEffect(() => {
    setStats({
      users: loadUsers().length,
      events: loadEvents().length,
      stories: loadStories().length,
      courses: loadCourses().length,
    });
  }, []);

  const statCards = [
    { label: "Total Users", value: stats.users, icon: "👥", color: "text-brand-green", bg: "bg-brand-green/10" },
    { label: "Total Events", value: stats.events, icon: "📅", color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
    { label: "Total Stories", value: stats.stories, icon: "✍️", color: "text-brand-brown", bg: "bg-brand-brown/10" },
    { label: "Total Courses", value: stats.courses, icon: "🏫", color: "text-brand-charcoal", bg: "bg-brand-charcoal/10" },
  ];

  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-widest text-brand-brown mb-6">Overview Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-sm border border-brand-brown/10 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${card.bg} ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <div className="text-3xl font-bold font-serif text-brand-charcoal">{card.value}</div>
              <div className="text-xs font-sans text-brand-charcoal/60 uppercase tracking-widest">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white p-8 rounded-sm border border-brand-brown/10 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-brown mb-4">System Notice</h3>
        <p className="text-brand-charcoal/70 text-sm leading-relaxed max-w-2xl">
          Welcome to the UWACU Admin Panel. From here you can monitor system activity, manage upcoming cultural events, and oversee user roles. Select an option from the sidebar to begin managing the platform.
        </p>
      </div>
    </div>
  );
}
