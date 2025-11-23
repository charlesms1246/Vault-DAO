import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserPreferences } from '@/types';

interface UserStore extends UserPreferences {
  setFavoriteDAOs: (daos: string[]) => void;
  addFavoriteDAO: (id: string) => void;
  removeFavoriteDAO: (id: string) => void;
  setDefaultChain: (chainId: number) => void;
  setCurrency: (currency: 'USD' | 'ETH') => void;
  toggleNotifications: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      favoriteDAOs: [],
      defaultChain: 1,
      currency: 'USD',
      notifications: true,
      setFavoriteDAOs: (daos) => set({ favoriteDAOs: daos }),
      addFavoriteDAO: (id) =>
        set((state) => ({
          favoriteDAOs: [...state.favoriteDAOs, id],
        })),
      removeFavoriteDAO: (id) =>
        set((state) => ({
          favoriteDAOs: state.favoriteDAOs.filter((daoId) => daoId !== id),
        })),
      setDefaultChain: (chainId) => set({ defaultChain: chainId }),
      setCurrency: (currency) => set({ currency }),
      toggleNotifications: () =>
        set((state) => ({ notifications: !state.notifications })),
    }),
    {
      name: 'vault-user-preferences',
    }
  )
);