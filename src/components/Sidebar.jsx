import { Home, Users, BarChart3, Menu, X, LogOut, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // 🔥 NORMALIZE ROLE (THIS FIXES EVERYTHING)
  const role = storedUser?.role
    ? storedUser.role.toLowerCase().replace(/[\s_-]/g, "")
    : "guest";

  const isSuperAdmin = role === "superadmin";
  const isAdmin = role === "admin";

  const handleLogout = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-950 text-white p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <div
        className={`group fixed top-0 left-0 h-screen bg-blue-950 text-white transition-all duration-300 z-40
        w-24 hover:w-64
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >

        {/* Logo */}
        <div className="flex flex-col items-center p-4 border-b border-blue-800">
          <div className="flex flex-col items-center gap-2 group-hover:flex-row group-hover:gap-3 transition-all">
            <img src="/ched.png" className="w-10 h-10" />
            <img src="/achieve.png" className="w-10 h-10" />
          </div>

          <span className="mt-2 font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Scholarship Analytics
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-6">

          {/* Dashboard */}
          <SidebarItem
            to="/dashboard"
            icon={<Home size={22} />}
            text="Dashboard"
            active={location.pathname === "/dashboard"}
          />

          {/* ADMIN + SUPERADMIN */}
          {(isAdmin || isSuperAdmin) && (
            <>
              {/* Scholars */}
              <div className="group/item relative">
                <div
                  className={`flex items-center gap-4 p-4 cursor-pointer ${
                    location.pathname.startsWith("/scholars") ||
                    location.pathname === "/msrs" ||
                    location.pathname === "/sikap" ||
                    location.pathname === "/husay"
                      ? "bg-blue-800"
                      : "hover:bg-blue-800"
                  }`}
                >
                  <div className="w-10 flex justify-center">
                    <Users size={22} />
                  </div>

                  <span className="font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Scholars
                  </span>
                </div>

                <div className="hidden group-hover/item:block bg-blue-900">
                  <SubItem to="/scholars" text="All Scholars" active={location.pathname === "/scholars"} />
                  <SubItem to="/msrs" text="MSRS" active={location.pathname === "/msrs"} />
                  <SubItem to="/sikap" text="SIKAP" active={location.pathname === "/sikap"} />
                  <SubItem to="/husay" text="HUSAY" active={location.pathname === "/husay"} />
                </div>
              </div>

              {/* Reports */}
              <SidebarItem
                to="/reports"
                icon={<BarChart3 size={22} />}
                text="Reports"
                active={location.pathname === "/reports"}
              />
            </>
          )}

          {/* SUPERADMIN ONLY */}
          {isSuperAdmin && (
            <SidebarItem
              to="/users"
              icon={<Users size={22} />}
              text="User Management"
              active={location.pathname === "/users"}
            />
          )}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 w-full">
          <SidebarItem
            to="/settings"
            icon={<Settings size={22} />}
            text="Settings"
            active={location.pathname === "/settings"}
          />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 hover:bg-red-600"
          >
            <div className="w-10 flex justify-center">
              <LogOut size={22} />
            </div>

            <span className="opacity-0 group-hover:opacity-100 transition">
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-2">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* Sidebar Item */
const SidebarItem = ({ icon, text, to, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-4 p-4 ${
      active ? "bg-blue-800" : "hover:bg-blue-800"
    }`}
  >
    <div className="w-10 flex justify-center">{icon}</div>

    <span className="font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
      {text}
    </span>
  </Link>
);

/* Sub Item */
const SubItem = ({ to, text, active }) => (
  <Link
    to={to}
    className={`block pl-16 pr-4 py-2 text-sm ${
      active ? "bg-blue-700" : "hover:bg-blue-700"
    }`}
  >
    {text}
  </Link>
);

export default Sidebar;