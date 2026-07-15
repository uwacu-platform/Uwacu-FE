import { useState, useEffect } from "react";
import { loadUsers, updateUser } from "../../context/AuthContext";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  const handleRoleChange = (userId, newRole) => {
    updateUser(userId, { role: newRole });
    setUsers(loadUsers()); // refresh
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-brown">Manage Users</h3>
      </div>

      <div className="bg-white rounded-sm border border-brand-brown/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-offwhite border-b border-brand-brown/10">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Email</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Joined Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-charcoal">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-brand-brown/10 hover:bg-brand-offwhite/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-sans font-bold text-brand-green text-sm">{u.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-brand-charcoal/80 font-sans">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-brand-charcoal/60 font-sans">
                      {u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="px-2 py-1 text-xs border border-brand-brown/20 rounded-sm focus:outline-none focus:border-brand-green bg-transparent text-brand-charcoal font-bold uppercase tracking-widest"
                    >
                      <option value="reader">Reader</option>
                      <option value="author">Author</option>
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-brand-charcoal/50">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
