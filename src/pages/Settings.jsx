import { useEffect, useState } from "react";
import API_URL from "../utils/api";
import ChangePassword from "../components/ChangePassword";
import { 
  Mail, 
  ShieldCheck, 
  Calendar, 
  User, 
  KeyRound, 
  ChevronRight,
  BadgeCheck 
} from "lucide-react";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fullName = user?.fullName || 
    `${user?.firstName || ""} ${user?.middleInitial ? user.middleInitial + "." : ""} ${user?.lastName || ""}`.trim();

  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 gap-4">
        <div className="relative flex h-12 w-12">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-12 w-12 bg-blue-600"></span>
        </div>
        <p className="text-slate-500 font-medium animate-pulse">Syncing your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100">
      <div className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-12">
        
        {/* HEADER */}
        <header className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Account Settings
            </h1>
            <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-md">
              Manage your personal information, security protocols, and account preferences.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: MINI PROFILE */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center">
              <div className="relative group">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl transform group-hover:rotate-3 transition-transform duration-300">
                  {initials || <User size={40} />}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-lg border border-slate-50">
                  <BadgeCheck className="text-blue-500" size={20} />
                </div>
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-xl font-bold text-slate-800 leading-tight">
                  {fullName || "User Account"}
                </h2>
                <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">
                  {user?.role || "Member"}
                </p>
              </div>

              <div className="w-full mt-8 pt-8 border-t border-slate-100 space-y-4">
                {[
                  { label: "Account ID", value: user?._id?.slice(-8).toUpperCase() || "N/A" },
                  { label: "First Name", value: user?.firstName },
                  { label: "Last Name", value: user?.lastName },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-medium">{item.label}</span>
                    <span className="text-slate-700 font-semibold">{item.value || "-"}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: MAIN CONTENT */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* ACCOUNT INFORMATION SECTION */}
            <section className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">General Information</h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold uppercase tracking-widest">Details</span>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  
                  <InfoItem 
                    icon={<Mail className="text-blue-500" size={18} />}
                    label="Email Address"
                    value={user?.email}
                  />

                  <InfoItem 
                    icon={<ShieldCheck className="text-emerald-500" size={18} />}
                    label="Account Status"
                    value="Verified & Active"
                    valueClass="text-emerald-600"
                  />

                  <InfoItem 
                    icon={<Calendar className="text-indigo-500" size={18} />}
                    label="Member Since"
                    value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }) : "N/A"}
                  />

                  <InfoItem 
                    icon={<User className="text-amber-500" size={18} />}
                    label="Access Level"
                    value={user?.role}
                    valueClass="capitalize"
                  />

                </div>
              </div>
            </section>

            {/* SECURITY SECTION */}
            <section className="group relative overflow-hidden bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-blue-200/20">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40"></div>
              
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                    <KeyRound className="text-blue-400" size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Security & Authentication</h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Control your access and keep your account protected.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowChangePassword(true)}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                >
                  Change Password
                  <ChevronRight size={18} />
                </button>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* MODAL */}
      <ChangePassword
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
};

// Reusable Helper Component for Info Grid
const InfoItem = ({ icon, label, value, valueClass = "" }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 p-2 bg-slate-50 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
      <p className={`font-semibold text-slate-700 mt-0.5 ${valueClass}`}>
        {value || "Not specified"}
      </p>
    </div>
  </div>
);

export default Settings;