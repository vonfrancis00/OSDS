import { useState } from "react";
import API_URL from "../utils/api";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleShow = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (form.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      // ✅ SAFE JSON PARSE (prevents crash)
      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Unexpected server response" };
      }

      if (!res.ok) {
        alert(data.message || "Failed to change password");
        return;
      }

      alert("Password changed successfully!");

      // ✅ Reset form
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // ✅ Close modal AFTER success
      onClose();

      // 🔥 OPTIONAL (recommended security)
      // Uncomment if you want forced logout after password change
      // localStorage.removeItem("token");
      // window.location.href = "/login";

    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Change Password
        </h2>

        <div className="space-y-4">

          {/* CURRENT PASSWORD */}
          <div className="relative">
            <input
              type={show.current ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => toggleShow("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* NEW PASSWORD */}
          <div className="relative">
            <input
              type={show.new ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => toggleShow("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => toggleShow("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

        </div>

        <div className="flex justify-end gap-2 mt-6">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ChangePassword;