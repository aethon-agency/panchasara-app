import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import api from "../services/api";

type User = {
  id: string;
  mobilenumber: string;
  firstname: string;
  middlename: string;
  lastname: string;
  isadmin: boolean;
  location: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  pushToken: string | null;
  authLoading: boolean;
  login: (token: string, user: User) => void;
  updateUser: (user: Partial<User>) => void;
  fetchProfile: () => Promise<void>;
  setPushToken: (token: string | null) => void;
  logout: () => void;
};

import { getUserProfile } from "../services/userServices";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      pushToken: null,
      authLoading: false,
      login: async (token, user) => {
        set({ token, user });
      },
      updateUser: (updatedUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        }));
      },
      fetchProfile: async () => {
        try {
          const response = await getUserProfile();
          if (response.status && response.data) {
            const userData = response.data;
            set({
              user: {
                id: userData.id,
                mobilenumber: userData.mobileNumber?.toString(),
                firstname: userData.firstName,
                lastname: userData.lastName,
                middlename: userData.middleName,
                isadmin: userData.isadmin,
                location: userData.location,
              },
            });
          }
        } catch (error) {
          console.error("[AuthStore] Error fetching profile:", error);
        }
      },
      setPushToken: (pushToken) => {
        set({ pushToken });
      },
      logout: () => {
        set({ token: null, user: null, pushToken: null });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        pushToken: state.pushToken,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("[AuthStore] Rehydration error:", error);
        }
        if (state) {
          state.authLoading = false;
        }
      },
    },
  ),
);

// Register API handlers to break circular dependency
api.setTokenGetter(() => useAuthStore.getState().token);
api.setUnauthorizedHandler(() => useAuthStore.getState().logout());
