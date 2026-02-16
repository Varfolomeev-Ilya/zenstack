import { User } from '@supabase/supabase-js';

// TODO:Add user types
export interface IAuthState {
  user: User | null;
}

export interface IAuthActions {
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export type TAuthStore = IAuthState & IAuthActions;
