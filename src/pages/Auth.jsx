import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!email || !password || (!isLogin && !confirmPassword)) {
      setError("Please fill in all fields");
      return;
    }

    if (!isLogin) {
      if (!email.endsWith("@ched.gov.ph")) {
        setError("Only CHED emails are allowed. Please Contact Admin for access.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    try {
      setLoading(true);

      const url = isLogin
        ? "http://localhost:5000/login"
        : "http://localhost:5000/register";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (isLogin) {
        if (data.token) {
          localStorage.setItem("token", data.token);

          // ✅ FIXED (no reload, proper navigation)
          navigate("/dashboard");
        } else {
          setError(data.message || "Login failed");
        }
      } else {
        if (res.ok) {
          setError("Account created successfully! Please login.");
          setIsLogin(true);

          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          setError(data.message || "Registration failed");
        }
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
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

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              {isLogin ? "Sign in to access your dashboard" : "Register to get started"}
            </p>
          </div>

          <div className="flex flex-col gap-5">

            <input
              type="email"
              placeholder="@ched.gov.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />

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

            {!isLogin && (
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Register"}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <p className="text-sm text-center text-gray-500">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <span
                onClick={handleSwitch}
                className="text-blue-600 cursor-pointer font-medium"
              >
                {isLogin ? "Create one" : "Login"}
              </span>
            </p>

          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 Scholarship System - OCDRA III
          </p>

        </div>
      </div>
    </div>
  );
};

export default Auth;