import React, { useEffect, useState } from "react";
import {
  Shield,
  Crown,
  User,
  Trash2,
  Search,
  Fingerprint,
  RefreshCcw,
  Plus,
  ChevronDown,
  Activity,
  Users,
  CheckCircle2,
  XCircle,
  ExternalLink
} from "lucide-react";
import AddUserModal from "../components/AddUserModal";
import UserDetailModal from "../components/UserDetailModal";
import API_URL from "../utils/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    const oldUsers = [...users];
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role } : u))
    );

    try {
      await fetch(`${API_URL}/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ role }),
      });
    } catch (err) {
      console.error(err);
      setUsers(oldUsers);
    }
  };

  const updateStatus = async (id, status) => {
    const oldUsers = [...users];
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, status } : u))
    );

    try {
      await fetch(`${API_URL}/users/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error(err);
      setUsers(oldUsers);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    const oldUsers = [...users];
    setUsers((prev) => prev.filter((u) => u._id !== id));

    try {
      await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    } catch (err) {
      console.error(err);
      setUsers(oldUsers);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u?.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u?._id?.includes(searchTerm)
  );

  const getRoleBadgeStyles = (role) => {
    switch (role) {
      case "superadmin": return "bg-purple-50 text-purple-700 border-purple-100 ring-purple-500/20";
      case "admin": return "bg-blue-50 text-blue-700 border-blue-100 ring-blue-500/20";
      default: return "bg-slate-50 text-slate-600 border-slate-100 ring-slate-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP BAR / NAVIGATION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest border border-indigo-100 mb-2">
              <Activity size={12} /> Management Console
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              User Directory <span className="text-slate-300 font-light text-2xl">/</span> 
              <span className="text-indigo-600">{users.length}</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search by email..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm w-full sm:w-64 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95"
            >
              <Plus size={18} strokeWidth={3} />
              New Member
            </button>
          </div>
        </div>

        {/* DATA TABLE CONTAINER */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Basic Profile</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">System Role</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Account Status</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Management</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-24 text-center">
                      <div className="inline-flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fetching Registry...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50/80 transition-all group">
                      {/* USER INFO */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center text-slate-700 font-black text-lg border border-white shadow-sm group-hover:scale-110 transition-transform">
                            {u.email?.charAt(0).toUpperCase()}
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-sm font-bold text-slate-800 tracking-tight">{u.email}</div>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                              <Fingerprint size={10} /> {u._id.slice(-8).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ROLE SELECT */}
                      <td className="px-8 py-5">
                        <div className="flex justify-center">
                          <div className="relative inline-block w-40">
                            <select
                              value={u.role}
                              onChange={(e) => updateRole(u._id, e.target.value)}
                              className={`appearance-none w-full pl-4 pr-10 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider border ring-inset focus:ring-4 focus:ring-opacity-20 outline-none cursor-pointer transition-all ${getRoleBadgeStyles(u.role)}`}
                            >
                              <option value="user">Standard User</option>
                              <option value="admin">Administrator</option>
                              <option value="superadmin">Super Admin</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
                          </div>
                        </div>
                      </td>

                      {/* STATUS SELECT */}
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center">
                          <div className="relative inline-block w-32">
                            <select
                              value={u.status || "active"}
                              onChange={(e) => updateStatus(u._id, e.target.value)}
                              className={`appearance-none w-full px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider border cursor-pointer transition-all ${
                                (u.status || "active") === "active" 
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                                  : "bg-rose-50 text-rose-700 border-rose-100"
                              }`}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setSelectedUser(u); setIsDetailModalOpen(true); }}
                            className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-black uppercase text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          >
                            <ExternalLink size={14} /> Details
                          </button>
                          <button
                            onClick={() => deleteUser(u._id)}
                            className="p-2.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="text-slate-200" size={48} />
                        <span className="text-sm font-medium text-slate-400">No users match your current filters.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="bg-slate-50/50 px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active System</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Updated {new Date().toLocaleTimeString()}
                </div>
             </div>
             <button 
               onClick={fetchUsers}
               className="text-indigo-600 hover:text-indigo-800 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group transition-all"
             >
               <RefreshCcw size={14} className={`group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
               Sync Registry
             </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <AddUserModal 
        isOpen={isAddUserModalOpen} 
        onClose={() => setIsAddUserModalOpen(false)} 
        onUserAdded={fetchUsers} 
      />

      <UserDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        user={selectedUser} 
      />
    </div>
  );
};

export default UserManagement;