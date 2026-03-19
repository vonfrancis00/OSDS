import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

const Settings = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your account information and security
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* PROFILE */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Profile
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow">
                {user?.email?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-gray-800 text-base">
                  {user?.name || "No Name"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium text-gray-700">Role:</span>{" "}
                {user?.role || "User"}
              </p>
            </div>
          </div>

          {/* ACCOUNT */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Account
            </h2>

            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {user?.email}
              </p>

              <p>
                <span className="font-medium text-gray-700">Status:</span>{" "}
                <span className="text-green-600 font-medium">Active</span>
              </p>

              <p>
                <span className="font-medium text-gray-700">Created:</span>{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Security
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Update your password to keep your account secure
              </p>
            </div>

            <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
              Change Password
            </button>
          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default Settings;