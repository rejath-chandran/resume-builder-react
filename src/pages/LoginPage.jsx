import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios"; // your axios instance
import { useAuthStore } from "../store/authStore";
import { FaGoogle } from 'react-icons/fa'; // Using react-icons for a Google logo

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { username, password });
      setToken(res.data.accessToken); // Save access token in Zustand
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // This is where you would initiate the Google login flow.
    // For example, you might redirect to a backend endpoint:
    // window.location.href = "/api/auth/google";
    console.log("Initiating Google Login...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans">
      <div className="bg-white/90 rounded-xl shadow-2xl p-8 max-w-sm w-full backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          Log In
        </h1>
        
        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 mb-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full shadow-md flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <path d="M22.56 12.28c0-.78-.07-1.54-.2-2.28H12v4.32h6.05c-.25 1.34-.95 2.47-2 3.23v2.7h3.45c2.02-1.85 3.19-4.58 3.19-8.07z" fill="#4285f4"/>
            <path d="M12 23c3.08 0 5.66-1.02 7.54-2.76l-3.45-2.7c-1.12.76-2.58 1.2-4.09 1.2-3.17 0-5.87-2.14-6.8-5.01H1.5v2.76C3.59 20.31 7.42 23 12 23z" fill="#34a853"/>
            <path d="M5.19 14.28a7.84 7.84 0 010-4.56V7H1.5c-2.42 4.96-2.42 10.96 0 15.92l3.69-2.76c-.22-.72-.34-1.48-.34-2.28z" fill="#fbbc05"/>
            <path d="M12 4.41c1.78 0 3.33.61 4.58 1.79l3.07-3.06C17.65.65 14.93 0 12 0 7.42 0 3.59 2.69 1.5 7h3.69c.93-2.87 3.63-5.01 6.81-5.01z" fill="#ea4335"/>
          </svg>
          <span>Sign In with Google</span>
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
