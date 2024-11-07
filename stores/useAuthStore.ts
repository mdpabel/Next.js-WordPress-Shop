import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: {
    email: string;
    displayName: string;
  } | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setUser: (user: { email: string; displayName: string }) => void;
  login: (token: string, user: { email: string; displayName: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),
      logout: () => {
        localStorage.removeItem('authToken');
        set({ isAuthenticated: false, user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
