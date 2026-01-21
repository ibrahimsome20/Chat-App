import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import AnimatedBorder from "../component/BorderAnimat.jsx";
import { useNavigate } from "react-router-dom";
import userStore from "../store/User.store.js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { isLogin, login, isAuth, isAuthenticated } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      await isAuthenticated();
      if (isAuth) navigate("/");
    };
    checkAuth();
  }, [isAuth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return toast.error("All fields are required");
    await login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0b1220]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-cyan-400">
          Welcome Back
        </h2>

        <AnimatedBorder>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="mb-1 block text-sm text-cyan-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-500" />
                <input
                  autoComplete="off"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#101A2E] py-2.5 pl-10 pr-3 text-cyan-100 border border-cyan-900 focus:border-cyan-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-sm text-cyan-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-500" />
                <input
                  autoComplete="off"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#101A2E] py-2.5 pl-10 pr-3 text-cyan-100 border border-cyan-900 focus:border-cyan-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Button */}
            <button
              disabled={isLogin}
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-600/10 border border-cyan-500/30 py-2.5 text-cyan-300 font-medium hover:bg-cyan-500/20 transition"
            >
              {isLogin ? <LoaderIcon /> : <><LogIn className="h-5 w-5" /> Login</>}
            </button>
          </form>
        </AnimatedBorder>

        <p className="mt-4 text-center text-sm text-cyan-400/80">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-cyan-400 font-semibold cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
}

const LoaderIcon = () => (
  <svg className="animate-spin h-5 w-5 text-cyan-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
  </svg>
);

export default Login;
