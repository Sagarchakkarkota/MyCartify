import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
interface IUser {
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  username: string;
}
type AuthStore = {
  user: IUser | null;
  refreshToken: string | null;
  accessToken: string | null;
  isAuthenticated: () => boolean;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
};
export const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      refreshToken: null,
      accessToken: null,
      isAuthenticated: () => !!get()?.accessToken,
      setTokens: (access: string, refresh: string) =>
        set({ accessToken: access, refreshToken: refresh }),
      logout: () => set({ user: null, refreshToken: null, accessToken: null }),
      setUser: user => set({ user }),
    }),

    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
export const useAuthStore = authStore;
