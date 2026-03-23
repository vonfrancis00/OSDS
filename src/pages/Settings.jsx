import { useEffect, useState } from "react";
import API_URL from "../utils/api";
import ChangePassword from "../components/ChangePassword";

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

  // ✅ SIMPLE LOADING UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-sm">Loading...</p>
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
              {initials || "U"}
            </div>

            <h2 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-800">
              {fullName || "No Name"}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500">
              {user?.email}
            </p>

            <span className="mt-2 sm:mt-3 px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
              {user?.role?.toUpperCase()}
            </span>
          </div>

          <div className="my-4 sm:my-6 border-t" />

          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="text-gray-500">First Name</span>
              <span className="font-medium text-gray-800">
                {user?.firstName || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Last Name</span>
              <span className="font-medium text-gray-800">
                {user?.lastName || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Middle Initial</span>
              <span className="font-medium text-gray-800">
                {user?.middleInitial || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Suffix</span>
              <span className="font-medium text-gray-800">
                {user?.suffix || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">

          {/* ACCOUNT INFO */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
              Account Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">

              <div>
                <p className="text-gray-500 mb-1">Email Address</p>
                <p className="font-medium text-gray-800">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Account Status</p>
                <p className="font-medium text-green-600">
                  Active
                </p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Account Created</p>
                <p className="font-medium text-gray-800">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Role</p>
                <p className="font-medium text-gray-800">
                  {user?.role}
                </p>
              </div>

            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                Security
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Keep your account safe by updating your password regularly
              </p>
            </div>

            <button
              onClick={() => setShowChangePassword(true)}
              className="bg-blue-600 text-white px-4 sm:px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm w-full sm:w-auto"
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