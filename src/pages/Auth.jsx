import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import API_URL from "../utils/api"; // ✅ ADD THIS

const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("@ched.gov.ph");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    setError("");

    if (!email || email === "@ched.gov.ph" || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // ✅ FIXED LOGIN API
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      // ✅ FIXED USER API
      const userRes = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      });

      const userData = await userRes.json();

      if (!userRes.ok) {
        setError("Failed to fetch user data");
        return;
      }

      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/dashboard");

    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 bg-blue-900 text-white items-center justify-center p-10">
        <div className="max-w-md text-center">

          <div className="flex justify-center items-center gap-6 mb-8 bg-white/50 backdrop-blur-md rounded-xl px-6 py-4">
            <img src="/Bagong_Pilipinas.png" className="w-30 h-30 object-contain" />
            <img src="/ched.png" className="w-30 h-30 object-contain" />
            <img src="/achieve.png" className="w-30 h-30 object-contain" />
          </div>

          <h1 className="text-4xl font-extrabold mb-4 uppercase tracking-wide">
            SCHOLARSHIP ANALYTICS SYSTEM
          </h1>

          <p className="text-blue-100 text-sm">
            Manage scholars, track progress, and generate reports efficiently.
          </p>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">

        <div className="bg-white/90 backdrop-blur-xl w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-200">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          {/* ✅ FORM (ENABLES ENTER KEY SUBMIT) */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* EMAIL */}
            <div className="flex items-center border rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                placeholder="username"
                value={email.replace("@ched.gov.ph", "")}
                onChange={(e) => {
                  const username = e.target.value.replace("@ched.gov.ph", "");
                  setEmail(username + "@ched.gov.ph");
                }}
                className="flex-1 px-4 py-3 bg-transparent outline-none"
              />
              <span className="px-3 text-gray-500 text-sm">
                @ched.gov.ph
              </span>
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 Scholarship Analytics System
          </p>

        </div>
      </div>
    </div>
  );
};

export default Auth;