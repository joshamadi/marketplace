import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthStore } from '@/types';

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      otpSent: false,
      otpEmail: null,

      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1000));
        const user: User = {
          id: 'usr_' + Math.random().toString(36).slice(2, 10),
          firstName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          lastName: '',
          email,
          phone: '+234 801 234 5678',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          addresses: [],
        };
        set({ user, isAuthenticated: true, isLoading: false });
      },

      signup: async (data: { firstName: string; lastName: string; email: string; phone: string; password: string; referralCode?: string }) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1200));
        const user: User = {
          id: 'usr_' + Math.random().toString(36).slice(2, 10),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
          addresses: [],
        };
        set({ user, isAuthenticated: true, isLoading: false, otpSent: false, otpEmail: null });
      },

      verifyOTP: async (_otp: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        set({ isLoading: false, otpSent: false, otpEmail: null });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          otpSent: false,
          otpEmail: null,
        });
      },

      updateProfile: async (updates: Partial<User>) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 600));
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
          isLoading: false,
        }));
      },
    }),
    {
      name: 'chowdeck-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        otpSent: state.otpSent,
        otpEmail: state.otpEmail,
      }),
    }
  )
);

export default useAuthStore;
export { useAuthStore };
