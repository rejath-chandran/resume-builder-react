import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios"; // your axios instance
import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const { isLogin, token, logout } = useAuthStore();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    }

    api
      .get("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.error("Dashboard Error:", err.response?.data);
        logout(); // clear state if unauthorized
        navigate("/login");
      });
  }, [isLogin, token, navigate, logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-700">{message || "Loading..."}</p>
        <button
          onClick={() => {
            api.post("/api/auth/logout", {}, { headers: { Authorization: `Bearer ${token}` } })
              .finally(() => logout());
          }}
          className="mt-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
