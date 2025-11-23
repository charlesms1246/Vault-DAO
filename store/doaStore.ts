import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DAOConfig } from '@/types';

interface DAOStore {
  selectedDAO: DAOConfig | null;
  customDAOs: DAOConfig[];
  setSelectedDAO: (dao: DAOConfig | null) => void;
  addCustomDAO: (dao: DAOConfig) => void;
  removeCustomDAO: (id: string) => void;
}

export const useDaoStore = create<DAOStore>()(
  persist(
    (set) => ({
      selectedDAO: null,
      customDAOs: [],
      setSelectedDAO: (dao) => set({ selectedDAO: dao }),
      addCustomDAO: (dao) =>
        set((state) => ({ customDAOs: [...state.customDAOs, dao] })),
      removeCustomDAO: (id) =>
        set((state) => ({
          customDAOs: state.customDAOs.filter((dao) => dao.id !== id),
        })),
    }),
    {
      name: 'vault-dao-storage',
    }
  )
);