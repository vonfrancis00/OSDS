import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Shield, Crown, User } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setUsers(data);
  };

  const updateRole = async (id, role) => {
    await fetch(`http://localhost:5000/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ role }),
    });

    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const roleConfig = {
    superadmin: {
      color: "bg-purple-100 text-purple-700",
      icon: <Crown size={14} />,
      label: "Super Admin",
    },
    admin: {
      color: "bg-blue-100 text-blue-700",
      icon: <Shield size={14} />,
      label: "Admin",
    },
    user: {
      color: "bg-gray-100 text-gray-600",
      icon: <User size={14} />,
      label: "User",
    },
  };

  return (
    <MainLayout>
      <div className="p-8 bg-gray-50 min-h-screen">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              User Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage user roles and permissions
            </p>
          </div>

          {/* OPTIONAL ACTION BUTTON */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-sm text-sm">
            + Add User
          </button>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-3 px-6 py-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Email</span>
            <span>Role</span>
            <span>Change Role</span>
          </div>

          {/* USERS */}
          <div className="divide-y">
            {users.map((u) => (
              <div
                key={u._id}
                className="grid grid-cols-3 items-center px-6 py-5 hover:bg-gray-50 transition"
              >
                {/* USER INFO */}
                <div className="flex items-center gap-3">
                  {/* AVATAR */}
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {u.email.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-gray-800 font-medium">
                      {u.email}
                    </p>
                    <p className="text-xs text-gray-400">
                      ID: {u._id.slice(-6)}
                    </p>
                  </div>
                </div>

                {/* ROLE BADGE */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${roleConfig[u.role].color}`}
                  >
                    {roleConfig[u.role].icon}
                    {roleConfig[u.role].label}
                  </span>
                </div>

                {/* DROPDOWN */}
                <div>
                  <select
                    value={u.role}
                    onChange={(e) =>
                      updateRole(u._id, e.target.value)
                    }
                    className="w-full max-w-[180px] border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 rounded-xl text-sm transition shadow-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {users.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No users found.
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default UserManagement;