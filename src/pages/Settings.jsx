import { useEffect, useState } from "react";
import API_URL from "../utils/api";

const Settings = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/user`, {
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

  const fullName =
    user?.fullName ||
    `${user?.lastName || ""}, ${user?.firstName || ""} ${
      user?.middleInitial ? user.middleInitial + "." : ""
    } ${user?.suffix || ""}`.trim();

  const initials = `${user?.firstName?.[0] || ""}${
    user?.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account, profile, and security preferences
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {initials || "U"}
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              {fullName || "No Name"}
            </h2>

            <p className="text-sm text-gray-500">{user?.email}</p>

            <span className="mt-3 px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
              {user?.role?.toUpperCase()}
            </span>
          </div>

          <div className="my-6 border-t" />

          <div className="space-y-3 text-sm text-gray-600">
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

        <div className="xl:col-span-2 space-y-6">

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Account Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">

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

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Security
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Keep your account safe by updating your password regularly
              </p>
            </div>

            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
              Change Password
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;