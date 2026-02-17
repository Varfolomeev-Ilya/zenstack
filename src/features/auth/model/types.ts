import { IUserProfile } from '@/features/user/api/user-api.types';

export interface IAuthState {
  user: IUserProfile | null;
  userId?: string | null;
}

export interface IAuthActions {
  setUserId: (userId?: string | null) => void;
  setUser: (user: IUserProfile | null) => void;
  logout: () => Promise<void>;
}

export type TAuthStore = IAuthState & IAuthActions;
