import { create } from 'zustand';

import { supabaseAuthClient } from '../api/auth-api';

import { TAuthStore } from './types';

export const useAuthStore = create<TAuthStore>(set => ({
  user: null,
  userId: null,

  setUserId: userId => set({ userId }),
  setUser: user => set({ user }),
  logout: async () => {
    await supabaseAuthClient.signOut();
    localStorage.clear();
    set({ user: null });
  },
}));
