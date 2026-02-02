import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: string;
  mobilenumber: number;
  firstname: string;
  lastname: string;
  vehiclenumber: string;
  upiid: string;
  profileimage?: string | null;
  isriding: boolean;
};

type AuthState = {
  user: User | null;
  token: string | null;
  pushToken: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  updateUser: (user: Partial<User>) => void;
  setPushToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      pushToken: null,
      isLoading: true,
      login: async (token, user) => {
        set({ token, user });
      },
      updateUser: (updatedUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        }));
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
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false;
        }
      },
    },
  ),
);
