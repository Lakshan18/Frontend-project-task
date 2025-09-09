import { create } from 'zustand';
import type { Borrower } from '@/types';

interface AppState {
  activeTab: string;
  activeBorrower: Borrower | null;
  isLoading: boolean;
}

interface AppActions {
  setActiveTab: (tab: string) => void;
  setActiveBorrower: (borrower: Borrower | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  activeTab: 'new',
  activeBorrower: null,
  isLoading: false,
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
  setLoading: (loading) => set({ isLoading: loading }),
}));