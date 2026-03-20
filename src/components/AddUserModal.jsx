import { useState } from "react";
import { X, UserPlus } from "lucide-react";

const AddUserModal = ({ isOpen, onClose, onUserAdded }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    middleInitial: "",
    suffix: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to register");

      onUserAdded();
      onClose();

      setForm({
        firstName: "",
        lastName: "",
        middleInitial: "",
        suffix: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl p-6 relative border border-gray-100">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <UserPlus className="text-blue-600" size={22} />
            <h2 className="text-xl font-semibold text-gray-800">
              Create User
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME ROW */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* MIDDLE + SUFFIX */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Middle Initial</label>
              <input
                type="text"
                name="middleInitial"
                maxLength={1}
                value={form.middleInitial}
                onChange={handleChange}
                placeholder="M"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Suffix <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="suffix"
                value={form.suffix}
                onChange={handleChange}
                placeholder="Jr., Sr., III"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="@ched.gov.ph"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-medium text-white transition 
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
              }`}
          >
            {loading ? "Creating user..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;