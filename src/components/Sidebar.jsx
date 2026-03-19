import { Home, Users, BarChart3, Menu, X, LogOut, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ user }) => { // ✅ changed
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ✅ added
  const isSuperAdmin = user?.role === "superadmin";
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-950 text-white p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`group fixed top-0 left-0 h-screen bg-blue-950 text-white transition-all duration-300 z-40
        w-64 md:w-24 md:hover:w-64
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}>

        <div className="flex flex-col items-center justify-center p-4 border-b border-blue-800">
          <div className="flex flex-col md:group-hover:flex-row items-center gap-2 transition-all duration-300">
            <img src="/ched.png" className="w-12 h-12" />
            <img src="/achieve.png" className="w-12 h-12" />
          </div>

          <span className="mt-2 text-lg font-extrabold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition whitespace-nowrap">
            Scholarship Analytics
          </span>
        </div>

        <nav className="mt-6">
          <SidebarItem to="/dashboard" icon={<Home size={22} />} text="Dashboard" active={location.pathname === "/dashboard"} />

          {/* ✅ restricted */}
          {(isSuperAdmin || isAdmin) && (
            <>
              <SidebarDropdown icon={<Users size={22} />} text="Scholars" active={location.pathname.includes("/scholars")}>
                <SubItem to="/scholars" text="All Scholars" active={location.pathname === "/scholars"} />
                <SubItem to="/msrs" text="MSRS" active={location.pathname === "/msrs"} />
                <SubItem to="/sikap" text="SIKAP" active={location.pathname === "/sikap"} />
                <SubItem to="/husay" text="HUSAY" active={location.pathname === "/husay"} />
              </SidebarDropdown>

              <SidebarItem to="/reports" icon={<BarChart3 size={22} />} text="Reports" active={location.pathname === "/reports"} />
            </>
          )}

          {/* ✅ superadmin only */}
          {isSuperAdmin && (
            <SidebarItem to="/users" icon={<Users size={22} />} text="User Management" active={location.pathname === "/users"} />
          )}
        </nav>

        <div className="absolute bottom-0 w-full">
          <Link to="/settings" className={`flex items-center gap-4 p-4 transition ${location.pathname === "/settings" ? "bg-blue-800" : "hover:bg-blue-800"}`}>
            <div className="w-10 flex justify-center"><Settings size={22} /></div>
            <span className="font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition whitespace-nowrap">Settings</span>
          </Link>

          <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 hover:bg-red-600 transition text-left">
            <div className="w-10 flex justify-center"><LogOut size={22} /></div>
            <span className="font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition whitespace-nowrap">Logout</span>
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 rounded-lg bg-gray-200">Cancel</button>
              <button onClick={confirmLogout} className="px-4 py-2 rounded-lg bg-red-600 text-white">Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SidebarItem = ({ icon, text, to, active }) => (
  <Link to={to} className={`flex items-center gap-4 p-4 transition ${active ? "bg-blue-800" : "hover:bg-blue-800"}`}>
    <div className="w-10 flex justify-center">{icon}</div>
    <span className="font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition whitespace-nowrap">{text}</span>
  </Link>
);

const SidebarDropdown = ({ icon, text, children, active }) => (
  <div className="group/item relative">
    <div className={`flex items-center gap-4 p-4 cursor-pointer ${active ? "bg-blue-800" : "hover:bg-blue-800"}`}>
      <div className="w-10 flex justify-center">{icon}</div>
      <span className="font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition whitespace-nowrap">{text}</span>
    </div>
    <div className="hidden group-hover/item:block bg-blue-900">{children}</div>
  </div>
);

const SubItem = ({ to, text, active }) => (
  <Link to={to} className={`block pl-16 pr-4 py-2 text-sm transition ${active ? "bg-blue-700" : "hover:bg-blue-700"}`}>
    {text}
  </Link>
);

export default Sidebar;