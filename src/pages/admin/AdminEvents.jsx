import { useState, useEffect } from "react";
import { loadEvents, saveEvent } from "../../context/AuthContext";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    type: "Workshop",
    desc: "",
    img: "src/assets/dance.png",
    featured: false,
  });

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  function handleChange(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newEvent = {
      id: `e_${Date.now()}`,
      ...form,
    };
    const updatedEvents = saveEvent(newEvent);
    setEvents(updatedEvents);
    setShowForm(false);
    setForm({
      title: "",
      date: "",
      location: "",
      type: "Workshop",
      desc: "",
      img: "src/assets/dance.png",
      featured: false,
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-brown">Manage Events</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-green text-brand-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm hover:bg-brand-green/90 transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Event"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-sm border border-brand-brown/10 shadow-sm mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brand-charcoal mb-2">Title</label>
                <input required type="text" name="title" value={form.title} onChange={handleChange} className="w-full px-3 py-2 border border-brand-brown/20 rounded-sm text-sm focus:outline-none focus:border-brand-green" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brand-charcoal mb-2">Date</label>
                <input required type="text" name="date" value={form.date} onChange={handleChange} placeholder="e.g. October 15, 2026" className="w-full px-3 py-2 border border-brand-brown/20 rounded-sm text-sm focus:outline-none focus:border-brand-green" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brand-charcoal mb-2">Location</label>
                <input required type="text" name="location" value={form.location} onChange={handleChange} className="w-full px-3 py-2 border border-brand-brown/20 rounded-sm text-sm focus:outline-none focus:border-brand-green" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brand-charcoal mb-2">Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full px-3 py-2 border border-brand-brown/20 rounded-sm text-sm focus:outline-none focus:border-brand-green">
                  <option value="National Ceremony">National Ceremony</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Cultural Evening">Cultural Evening</option>
                  <option value="Online Forum">Online Forum</option>
                  <option value="Performance">Performance</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-brand-charcoal mb-2">Description</label>
                <textarea required name="desc" value={form.desc} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-brand-brown/20 rounded-sm text-sm focus:outline-none focus:border-brand-green" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-brand-charcoal mb-2">Image Path</label>
                <input required type="text" name="img" value={form.img} onChange={handleChange} className="w-full px-3 py-2 border border-brand-brown/20 rounded-sm text-sm focus:outline-none focus:border-brand-green" />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="accent-brand-green" />
                  <span className="text-sm font-sans text-brand-charcoal">Featured Event</span>
                </label>
              </div>
            </div>
            <button type="submit" className="self-start mt-2 bg-brand-yellow text-brand-charcoal text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-brand-yellow/90 transition-colors shadow-sm">
              Save Event
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-sm border border-brand-brown/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-offwhite border-b border-brand-brown/10">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Event</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Date & Location</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Type</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Featured</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id || ev.title} className="border-b border-brand-brown/10 hover:bg-brand-offwhite/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm overflow-hidden flex-shrink-0 bg-brand-brown/20">
                        <img src={`/${ev.img}`} alt={ev.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }} />
                      </div>
                      <div className="font-serif font-bold text-brand-green text-sm">{ev.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-brand-charcoal font-bold">{ev.date}</div>
                    <div className="text-xs text-brand-charcoal/60">{ev.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-brand-charcoal/5 text-brand-charcoal text-[10px] uppercase font-bold px-2 py-1 rounded-sm tracking-widest">
                      {ev.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ev.featured ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-brand-charcoal/40">No</span>}
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-brand-charcoal/50">No events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
