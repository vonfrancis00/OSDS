import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react";
import API_URL from "../utils/api";

const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("@ched.gov.ph");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || email === "@ched.gov.ph" || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        const userRes = await fetch(`${API_URL}/user`, {
          headers: { Authorization: "Bearer " + data.token },
        });
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();
        localStorage.setItem("user", JSON.stringify(userData));
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F4F7FA] font-sans antialiased overflow-hidden">
      
      {/* --- LEFT PANEL: BRANDING & DECORATION --- */}
      <div className="hidden lg:flex w-[60%] relative bg-[#001f3f] overflow-hidden items-center justify-center">
        {/* Geometric Background Decoration */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] border border-blue-400 rotate-45"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] border border-sky-300 rotate-12"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl text-center px-12">
          {/* Logo Container with Gold Border */}
          <div className="inline-flex justify-center items-center gap-8 mb-10 p-6 rounded-2xl border-7 border-yellow-500/50 bg-white/5 backdrop-blur-sm shadow-2xl">
            <img src="/Bagong_Pilipinas.png" className="h-30 w-auto" alt="Bagong Pilipinas" />
            <img src="/ched.png" className="h-30 w-auto" alt="CHED" />
            <img src="/achieve.png" className="h-30 w-auto" alt="Achieve" />
          </div>

          <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-md">
            Scholarship <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
              Analytics System
            </span>
          </h1>
          
          <div className="h-1.5 w-20 bg-gradient-to-r from-blue-400 to-transparent mx-auto mb-10 rounded-full"></div>
          
          <p className="text-blue-100/70 text-lg font-light leading-relaxed max-w-md mx-auto">
            Empowering education through data-driven insights. Manage, track, and optimize scholarship programs across the region.
          </p>
        </div>
      </div>

      {/* --- RIGHT PANEL: LOGIN FORM --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 bg-white relative">
        
        {/* Subtle Background Glow for Form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60"></div>

        <div className="w-full max-w-[420px]">
          
          {/* Form Card */}
          <div className="bg-white rounded-[2rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-8 md:p-12 relative overflow-hidden">
            
            {/* Form Header */}
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-black text-[#001f3f] tracking-tight">Sign In</h2>
              <p className="text-gray-400 mt-2 text-sm font-medium italic">Enter your CHED credentials to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* USERNAME INPUT */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Username</label>
                <div className="group flex items-center border-2 border-gray-100 rounded-xl bg-gray-50/50 focus-within:border-blue-600 focus-within:bg-white transition-all duration-200">
                  <div className="pl-4 text-gray-400 group-focus-within:text-blue-600">
                    <User size={18} strokeWidth={2.5} />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. juan.delacruz"
                    value={email.replace("@ched.gov.ph", "")}
                    onChange={(e) => {
                      const username = e.target.value.replace("@ched.gov.ph", "");
                      setEmail(username + "@ched.gov.ph");
                    }}
                    className="flex-1 px-3 py-4 bg-transparent outline-none text-gray-700 font-semibold text-sm"
                  />
                  <span className="pr-4 text-gray-300 text-xs font-bold border-l border-gray-100 ml-2 pl-3">
                    @ched.gov.ph
                  </span>
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Password</label>
                <div className="group relative flex items-center border-2 border-gray-100 rounded-xl bg-gray-50/50 focus-within:border-blue-600 focus-within:bg-white transition-all duration-200">
                  <div className="pl-4 text-gray-400 group-focus-within:text-blue-600">
                    <Lock size={18} strokeWidth={2.5} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 px-3 py-4 bg-transparent outline-none text-gray-700 font-semibold text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pr-4 text-gray-300 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* ERROR HANDLING */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-600 px-4 py-3 rounded-r-lg text-xs font-bold flex items-center gap-2">
                  {error}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0056b3] hover:bg-[#003d80] disabled:bg-blue-300 text-white py-4 rounded-xl transition-all duration-300 font-bold text-sm tracking-widest uppercase shadow-xl shadow-blue-200 active:scale-[0.98] flex items-center justify-center mt-4"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In to Dashboard"}
              </button>
            </form>

            <div className="mt-12 pt-6 border-t border-gray-50 flex justify-center">
               <span className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em] text-center">
                 Official System of Commission on Higher Education
               </span>
            </div>
          </div>
          
          <p className="text-center text-[11px] text-gray-400 mt-8 font-medium">
            © 2026 Scholarship Analytics. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;