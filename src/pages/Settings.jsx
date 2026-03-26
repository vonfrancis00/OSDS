import { useEffect, useState } from "react";
import API_URL from "../utils/api";
import ChangePassword from "../components/ChangePassword";
import { Mail, ShieldCheck, Calendar } from "lucide-react";

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

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

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

  const fullName =
    user?.fullName ||
    `${user?.lastName || ""}, ${user?.firstName || ""} ${
      user?.middleInitial ? user.middleInitial + "." : ""
    } ${user?.suffix || ""}`.trim();

  const initials = `${user?.firstName?.[0] || ""}${
    user?.lastName?.[0] || ""
  }`.toUpperCase();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-500 mt-1 text-xs sm:text-sm">
          Manage your account, profile, and security preferences
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {initials || "U"}
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              {fullName || "No Name"}
            </h2>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>

            <span className="mt-3 px-4 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600">
              {user?.role?.toUpperCase()}
            </span>
          </div>

          <div className="my-6 border-t" />

          <div className="space-y-3 text-sm">
            {[
              ["First Name", user?.firstName],
              ["Last Name", user?.lastName],
              ["Middle Initial", user?.middleInitial],
              ["Suffix", user?.suffix],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800">
                  {value || "-"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="xl:col-span-2 space-y-6">

          {/* ACCOUNT INFO */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Account Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">

              <div className="flex items-start gap-3">
                <Mail className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-gray-500 text-xs">Email Address</p>
                  <p className="font-medium text-gray-800">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="text-green-500 mt-1" size={18} />
                <div>
                  <p className="text-gray-500 text-xs">Account Status</p>
                  <p className="font-medium text-green-600">
                    Active
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-gray-500 text-xs">Account Created</p>
                  <p className="font-medium text-gray-800">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-xs mb-1">Role</p>
                <p className="font-medium text-gray-800 capitalize">
                  {user?.role}
                </p>
              </div>

            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-white">
            <div>
              <h2 className="text-lg font-semibold">
                Security
              </h2>
              <p className="text-sm text-blue-100 mt-1">
                Update your password regularly to keep your account secure
              </p>
            </div>

            <button
              onClick={() => setShowChangePassword(true)}
              className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-medium hover:bg-blue-50 transition shadow-sm"
            >
              Change Password
            </button>
          </div>

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

export default Settings;