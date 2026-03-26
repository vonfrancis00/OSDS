import { useState } from "react";
import API_URL from "../utils/api";
import {
  Eye,
  EyeOff,
  CheckCircle,
  Loader2,
  Lock,
} from "lucide-react";

const ChangePassword = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldMap = {
    currentPassword: "current",
    newPassword: "new",
    confirmPassword: "confirm",
  };

  const labels = {
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      {/* MODAL */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn relative">

        {/* SUCCESS */}
        {success && (
          <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-20">
            <CheckCircle className="text-green-500 mb-2" size={42} />
            <p className="text-sm font-medium text-gray-700">
              Password Updated Successfully
            </p>
          </div>
        )}

        {/* LOADING */}
        {loading && !success && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
            <Loader2 className="animate-spin text-blue-600" size={30} />
          </div>
        )}

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                Change Password
              </h2>
              <p className="text-xs text-blue-100">
                Keep your account secure
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="px-6 py-6 space-y-4">

          {Object.keys(form).map((field) => (
            <div key={field} className="space-y-1">
              <label className="text-xs text-gray-500">
                {labels[field]}
              </label>

              <div className="relative">
                <input
                  type={show[fieldMap[field]] ? "text" : "password"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />

                <button
                  type="button"
                  onClick={() => toggleShow(fieldMap[field])}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show[fieldMap[field]] ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* FOOTER */}
        <div className="px-6 pb-6 flex justify-end gap-2">
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
            className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;