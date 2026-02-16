import { create } from 'zustand';

import { supabaseAuthClient } from '../api/authApi';

import { TAuthStore } from './types';

export const useAuthStore = create<TAuthStore>(set => ({
  user: null,

  setUser: user => set({ user }),

  logout: async () => {
    await supabaseAuthClient.signOut();
    localStorage.clear();
    set({ user: null });
  },
}));
