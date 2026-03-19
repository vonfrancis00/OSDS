import { useState } from "react";
import MainLayout from "../layout/MainLayout";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess("User created successfully!");
        setEmail("");
        setPassword("");
        setRole("user");
      }
    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">

        <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-lg border border-gray-100">

          {/* HEADER */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Add New User
            </h2>
            <p className="text-sm text-gray-500">
              Create a user and assign a role
            </p>
          </div>

          {/* ERROR / SUCCESS */}
          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm mb-3">{success}</p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-xl outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-xl outline-none text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* ROLE SELECT */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-xl outline-none text-sm"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm shadow-sm transition"
            >
              {loading ? "Creating..." : "Create User"}
            </button>

          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddUser;