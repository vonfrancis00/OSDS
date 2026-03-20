import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import {
  Shield,
  Crown,
  User,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import AddUserModal from "../components/AddUserModal";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

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

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/users/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ status }),
    });

    fetchUsers();
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
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

  const statusConfig = {
    active: {
      color: "bg-green-100 text-green-700",
      icon: <ToggleRight size={14} />,
      label: "Active",
    },
    inactive: {
      color: "bg-red-100 text-red-600",
      icon: <ToggleLeft size={14} />,
      label: "Inactive",
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
              Manage user roles and account status
            </p>
          </div>

          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-sm text-sm"
          >
            + Register User
          </button>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-5 px-6 py-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Controls</span>
            <span className="text-center">Actions</span>
          </div>

          {/* USERS */}
          <div className="divide-y">
            {users.map((u) => {
              const role = roleConfig[u.role] || roleConfig["user"];
              const status = statusConfig[u.status || "active"];

              return (
                <div
                  key={u._id}
                  className="grid grid-cols-5 items-center px-6 py-5 hover:bg-gray-50 transition"
                >
                  {/* USER */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {u.email?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="text-gray-800 font-medium">{u.email}</p>
                      <p className="text-xs text-gray-400">
                        ID: {u._id.slice(-6)}
                      </p>
                    </div>
                  </div>

                  {/* ROLE */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${role.color}`}
                    >
                      {role.icon}
                      {role.label}
                    </span>
                  </div>

                  {/* STATUS */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </span>
                  </div>

                  {/* CONTROLS */}
                  <div className="flex gap-2">
                    {/* ROLE */}
                    <select
                      value={u.role}
                      onChange={(e) =>
                        updateRole(u._id, e.target.value)
                      }
                      className="border border-gray-200 px-3 py-1 rounded-lg text-sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>

                    {/* STATUS */}
                    <select
                      value={u.status || "active"}
                      onChange={(e) =>
                        updateStatus(u._id, e.target.value)
                      }
                      className="border border-gray-200 px-3 py-1 rounded-lg text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* EMPTY */}
          {users.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No users found.
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onUserAdded={fetchUsers}
      />
    </MainLayout>
  );
};

export default UserManagement;