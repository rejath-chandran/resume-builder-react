import { useLayoutEffect } from "react";
import { useAuthStore } from "./store/authStore";
import api from "./lib/axios"; // your axios instance

export default function AuthProvider({ children }) {
  const { token, setToken, logout } = useAuthStore();

  useLayoutEffect(() => {
    // Request Interceptor
    const reqInterceptorId = api.interceptors.request.use((config) => {
      const storedToken = useAuthStore.getState().token;
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });

    // Response Interceptor
    const resInterceptorId = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Token expired → try refresh
        if (
          error.response?.status === 403 &&
          error.response?.data?.message === "Token expired." &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const { data } = await api.post("/api/auth/refresh-token");
            setToken(data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest); // retry original request
          } catch (err) {
            logout();
            return Promise.reject(err);
          }
        }

        // Unauthorized → logout
        if (error.response?.status === 401) {
          logout();
        }

        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      api.interceptors.request.eject(reqInterceptorId);
      api.interceptors.response.eject(resInterceptorId);
    };
  }, [token, setToken, logout]);

  return <>{children}</>;
}
