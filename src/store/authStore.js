// store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isLogin: false,
      setToken: (token) => set({ token, isLogin: true }),
      logout: () => set({ token: null, isLogin: false }),
    }),
    {
      name: 'auth-storage', // key in localStorage
      partialize: (state) => ({
        token: state.token,
        isLogin: state.isLogin,
      }),
    }
  )
);
