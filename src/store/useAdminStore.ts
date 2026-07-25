import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Admin, AdminStore } from "@/types";
import adminAccounts from "@/data/admin";

const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1000));

        const account = adminAccounts.find(
          (a) =>
            a.email.toLowerCase() === email.toLowerCase() &&
            a.password === password
        );

        if (!account) {
          set({ isLoading: false });
          throw new Error("Invalid email or password");
        }

        const admin: Admin = {
          ...account.admin,
          lastLogin: new Date().toISOString(),
        };

        set({ admin, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ admin: null, isAuthenticated: false, isLoading: false });
      },
    }),
    {
      name: "chowdeck-admin",
    }
  )
);

export default useAdminStore;
